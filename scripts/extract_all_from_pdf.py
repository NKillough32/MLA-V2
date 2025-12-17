"""
Extract ALL conditions from the MBBS Core Conditions All.pdf
This will generate a complete new coreConditions.js file
"""

import PyPDF2
import json
import re
from pathlib import Path
from parse_conditions_advanced import ConditionParser

def read_toc():
    """Read table of contents to get all condition names and page numbers"""
    pdf_path = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\MBBS Core Conditions All.pdf"
    
    print("Reading table of contents...")  
    
    with open(pdf_path, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        
        # Read pages 1-25 to capture full TOC (748 conditions requires ~22-25 pages)
        toc_text = ""
        for i in range(1, 26):
            if i < len(reader.pages):
                text = reader.pages[i].extract_text()
                toc_text += text + "\n"
        
        print(f"   TOC extracted from {min(25, len(reader.pages))} pages")
        return toc_text, len(reader.pages)

def parse_toc(toc_text):
    """Parse TOC to extract condition names and page numbers"""
    conditions = []
    
    # Pattern to match numbered condition entries like:
    # "1. Acute Pain Management  ................................  22"
    # "2. Anaemia  ................................  26"
    # The pattern needs to handle multiple dots and spaces
    # Also match entries with or without spaces before page numbers
    pattern = r'^\s*\d+\.\s+(.+?)\s+\.+\s*(\d+)\s*$'
    
    current_domain = None
    domain_patterns = [
        "ANAESTHESIA AND CRITICAL CARE",
        "BREAST DISEASE",
        "CARE OF THE ELDERLY",
        "CARDIOLOGY",
        "DERMATOLOGY",
        "ENDOCRINOLOGY",
        "ENT",
        "GASTROENTEROLOGY",
        "GENERAL SURGERY",
        "GYNAECOLOGY",
        "HAEMATOLOGY",
        "IMMUNOLOGY",
        "INFECTIOUS DISEASES",
        "MAXILLOFACIAL SURGERY",
        "NEPHROLOGY",
        "NEUROLOGY",
        "OBSTETRICS",
        "ONCOLOGY",
        "OPHTHALMOLOGY",
        "ORTHOPAEDICS",
        "PAEDIATRICS",
        "PALLIATIVE CARE",
        "PLASTIC SURGERY",
        "PRE-OPERATIVE CARE",
        "PSYCHIATRY",
        "RADIOLOGY",
        "RESPIRATORY",
        "RHEUMATOLOGY",
        "UROLOGY",
        "VASCULAR SURGERY"
    ]
    
    for line in toc_text.split('\n'):
        line = line.strip()
        
        # Check if this is a domain header (usually all caps with no dots)
        line_upper = line.upper()
        for domain in domain_patterns:
            # Match domain headers that don't have dots (not TOC entries)
            if domain in line_upper and '.' not in line[:20]:  # No dots in first 20 chars
                current_domain = domain.title()
                print(f"   Found domain: {current_domain}")
                break
        
        # Try to match condition entry
        match = re.match(pattern, line)
        if match and current_domain:
            name = match.group(1).strip()
            page = int(match.group(2))
            
            # Create condition ID from name
            condition_id = name.lower()
            condition_id = re.sub(r'[^a-z0-9\s\-]', '', condition_id)
            condition_id = re.sub(r'\s+', '-', condition_id)
            
            conditions.append({
                "id": condition_id,
                "name": name,
                "page": page,
                "domain": current_domain
            })
    
    return conditions

def extract_all_conditions(conditions, total_pages):
    """Extract content for all conditions"""
    
    pdf_path = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\MBBS Core Conditions All.pdf"
    parser = ConditionParser(pdf_path)
    
    all_conditions = {}
    successful = 0
    failed = 0
    
    print(f"\n{'='*70}")
    print(f"EXTRACTING {len(conditions)} CONDITIONS")
    print(f"{'='*70}\n")
    
    for idx, cond in enumerate(conditions, 1):
        try:
            # Determine end page (start of next condition or end of PDF)
            end_page = conditions[idx]["page"] if idx < len(conditions) else total_pages
            
            print(f"[{idx}/{len(conditions)}] {cond['name']}")
            print(f"   Pages {cond['page']}-{end_page-1}")
            
            # Calculate number of pages for this condition
            num_pages = end_page - cond['page']
            if num_pages > 10:  # Limit to reasonable size
                num_pages = 10
            
            # Extract condition text
            text = parser.extract_condition_text(
                start_page=cond['page'],
                num_pages=num_pages
            )
            
            # Parse the extracted text
            extracted = parser.parse_condition_text(text, cond['name'])
            
            # Add metadata
            extracted['name'] = cond['name']
            extracted['domain'] = cond['domain']
            
            if extracted:
                all_conditions[cond['id']] = extracted
                successful += 1
                print(f"   [OK] Extracted")
            else:
                print(f"   [WARN] No content")
                failed += 1
                
        except Exception as e:
            print(f"   [ERROR] {e}")
            failed += 1
    
    print(f"\n{'='*70}")
    print(f"EXTRACTION COMPLETE")
    print(f"{'='*70}")
    print(f"[OK] Successful: {successful}")
    print(f"[FAIL] Failed: {failed}")
    print(f"[INFO] Total: {len(conditions)}")
    
    return all_conditions

def generate_js_file(conditions):
    """Generate the complete coreConditions.js file"""
    
    output_path = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\coreConditions_NEW.js"
    
    print(f"\nGenerating JavaScript file...")
    
    # Convert to JS format
    js_content = "export const coreConditions = " + json.dumps(conditions, indent=4) + ";\n"
    
    # Write to file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    file_size = Path(output_path).stat().st_size
    print(f"   [OK] Written to: coreConditions_NEW.js")
    print(f"   [INFO] Size: {file_size:,} bytes ({file_size/1024/1024:.2f} MB)")
    
    return output_path

if __name__ == "__main__":
    print("="*70)
    print("FULL CORECONDITIONS.JS GENERATION FROM PDF")
    print("="*70)
    print()
    
    # Step 1: Read TOC
    toc_text, total_pages = read_toc()
    
    # Step 2: Parse TOC
    conditions = parse_toc(toc_text)
    print(f"\nFound {len(conditions)} conditions in TOC")
    
    if len(conditions) == 0:
        print("[ERROR] No conditions found in TOC!")
        exit(1)
    
    # Show first 10 conditions
    print("\nFirst 10 conditions:")
    for c in conditions[:10]:
        print(f"   • {c['name']} (page {c['page']}) - {c['domain']}")
    
    # Step 3: Extract all conditions
    all_conditions = extract_all_conditions(conditions, total_pages)
    
    # Step 4: Generate JS file
    output_file = generate_js_file(all_conditions)
    
    print(f"\n[SUCCESS] Complete! New file: {output_file}")
    print("\nTo use this file:")
    print("   1. Review the generated file")
    print("   2. Backup current coreConditions.js")
    print("   3. Rename coreConditions_NEW.js to coreConditions.js")



"""
Full Extraction Runner - Process all conditions from PDF
"""

import json
import sys
from pathlib import Path

# Import our modules
sys.path.insert(0, str(Path(__file__).parent))

from parse_conditions_advanced import ConditionParser
from update_conditions import ConditionUpdater


def run_full_extraction():
    """Run the complete extraction process"""
    
    pdf_path = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\MBBS Core Conditions All.pdf"
    output_json = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\scripts\extracted_conditions.json"
    output_js = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\scripts\generated_conditions.js"
    
    print("="*70)
    print("FULL CONDITION EXTRACTION - STARTING")
    print("="*70)
    print()
    
    # Expanded condition index with more conditions
    condition_index = [
        # Anaesthesia and Critical Care (from table of contents)
        {"id": "acute-pain-management", "name": "Acute Pain Management", "page": 22, "domain": "Anaesthesia and Critical Care"},
        {"id": "anaemia", "name": "Anaemia", "page": 26, "domain": "Anaesthesia and Critical Care"},
        {"id": "arrhythmias", "name": "Arrhythmias", "page": 30, "domain": "Anaesthesia and Critical Care"},
        {"id": "atrial-arrhythmias", "name": "Atrial Arrhythmias", "page": 35, "domain": "Anaesthesia and Critical Care"},
        {"id": "atrial-fibrillation", "name": "Atrial Fibrillation (AF)", "page": 40, "domain": "Anaesthesia and Critical Care"},
        {"id": "cardiogenic-shock", "name": "Cardiogenic Shock", "page": 44, "domain": "Anaesthesia and Critical Care"},
        {"id": "complete-heart-block", "name": "Complete Heart Block", "page": 48, "domain": "Anaesthesia and Critical Care"},
        {"id": "distributive-shock", "name": "Distributive Shock", "page": 52, "domain": "Anaesthesia and Critical Care"},
        {"id": "hypovolaemic-shock", "name": "Hypovolaemic Shock", "page": 72, "domain": "Anaesthesia and Critical Care"},
        {"id": "obstructive-shock", "name": "Obstructive Shock", "page": 97, "domain": "Anaesthesia and Critical Care"},
        {"id": "ventricular-tachycardia", "name": "Ventricular Tachycardia (VT)", "page": 123, "domain": "Anaesthesia and Critical Care"},
        {"id": "respiratory-failure", "name": "Respiratory Failure", "page": 109, "domain": "Anaesthesia and Critical Care"},
        
        # Add first batch - we'll expand this as we process
    ]
    
    print(f"Processing {len(condition_index)} conditions...")
    print()
    
    all_conditions = {}
    successful = 0
    failed = 0
    
    with ConditionParser(pdf_path) as parser:
        for i, cond_info in enumerate(condition_index, 1):
            print(f"[{i}/{len(condition_index)}] Processing: {cond_info['name']}")
            print(f"  └─ Page {cond_info['page']} | Domain: {cond_info['domain']}")
            
            try:
                # Extract text
                text = parser.extract_condition_text(cond_info['page'], num_pages=4)
                
                # Parse
                condition_data = parser.parse_condition_text(text, cond_info['name'])
                condition_data['domain'] = cond_info['domain']
                
                # Add synonyms if not present
                if not condition_data.get('synonyms'):
                    condition_data['synonyms'] = [cond_info['name']]
                
                # Store
                all_conditions[cond_info['id']] = condition_data
                
                # Show stats
                typical_count = len(condition_data['recognition']['typical'])
                exam_count = len(condition_data['recognition']['examination'])
                inv_count = len(condition_data['investigation']['immediate'])
                mgmt_count = len(condition_data['management']['firstLine']['immediate'])
                
                print(f"  ✓ Extracted: {typical_count} presentations, {exam_count} exam findings, {inv_count} investigations, {mgmt_count} mgmt steps")
                successful += 1
                
            except Exception as e:
                print(f"  ✗ Error: {str(e)[:100]}")
                failed += 1
            
            print()
    
    # Save JSON
    print("="*70)
    print("SAVING EXTRACTED DATA")
    print("="*70)
    print()
    
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(all_conditions, f, indent=2, ensure_ascii=False)
    
    print(f"✓ JSON saved to: {output_json}")
    print(f"  └─ Size: {Path(output_json).stat().st_size / 1024:.2f} KB")
    print()
    
    # Generate JavaScript
    print("="*70)
    print("GENERATING JAVASCRIPT CODE")
    print("="*70)
    print()
    
    updater = ConditionUpdater(r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\coreConditions.js")
    
    js_code = "// GENERATED CONDITIONS - READY TO MERGE\n\n"
    js_code += "export const generatedConditions = {\n\n"
    
    for i, (cond_id, cond_data) in enumerate(all_conditions.items()):
        js_code += updater.generate_condition_js(cond_id, cond_data, cond_data.get('domain', 'Unknown'))
        if i < len(all_conditions) - 1:
            js_code += ",\n\n"
        else:
            js_code += "\n"
    
    js_code += "};\n"
    
    with open(output_js, 'w', encoding='utf-8') as f:
        f.write(js_code)
    
    print(f"✓ JavaScript saved to: {output_js}")
    print(f"  └─ Size: {Path(output_js).stat().st_size / 1024:.2f} KB")
    print()
    
    # Summary
    print("="*70)
    print("EXTRACTION COMPLETE")
    print("="*70)
    print()
    print(f"Results:")
    print(f"  ✓ Successful: {successful}")
    print(f"  ✗ Failed: {failed}")
    print(f"  Total: {len(condition_index)}")
    print()
    print(f"Output files:")
    print(f"  • JSON: {output_json}")
    print(f"  • JavaScript: {output_js}")
    print()
    print("Next steps:")
    print("  1. Review the generated JavaScript code")
    print("  2. Test a few conditions in your application")
    print("  3. Merge into coreConditions.js")
    print("  4. Run validation checks")
    print()
    print("="*70)


if __name__ == "__main__":
    try:
        run_full_extraction()
    except KeyboardInterrupt:
        print("\n\nExtraction cancelled by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n\nFATAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

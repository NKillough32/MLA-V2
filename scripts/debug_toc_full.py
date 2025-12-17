"""
Debug TOC parsing to find all 748 conditions
"""
import PyPDF2
import re

pdf_path = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\MBBS Core Conditions All.pdf"

with open(pdf_path, 'rb') as pdf_file:
    reader = PyPDF2.PdfReader(pdf_file)
    
    print(f"Total pages: {len(reader.pages)}")
    print("\nAnalyzing TOC structure...")
    
    # Read more pages to find all conditions
    all_lines = []
    for i in range(1, 25):  # Extend to page 25
        if i < len(reader.pages):
            text = reader.pages[i].extract_text()
            all_lines.extend(text.split('\n'))
    
    # Try multiple patterns
    pattern1 = r'^\s*\d+\.\s+(.+?)\s+\.+\s*(\d+)\s*$'  # Current pattern
    pattern2 = r'^\s*\d+\.\s+(.+?)\s+(\d+)\s*$'  # Without dots
    pattern3 = r'^\s*\d+\.\s+([^\d]+)\s+(\d{2,4})\s*$'  # Any number of digits
    
    matches1 = []
    matches2 = []
    matches3 = []
    
    for line in all_lines:
        line = line.strip()
        if re.match(pattern1, line):
            matches1.append(line)
        if re.match(pattern2, line):
            matches2.append(line)
        if re.match(pattern3, line):
            matches3.append(line)
    
    print(f"\nPattern 1 (current - with dots): {len(matches1)} matches")
    print(f"Pattern 2 (without dots): {len(matches2)} matches")
    print(f"Pattern 3 (flexible): {len(matches3)} matches")
    
    # Show some lines that don't match
    print("\nSample non-matching numbered lines:")
    count = 0
    for line in all_lines:
        line = line.strip()
        if line.startswith(tuple(f"{i}." for i in range(1, 999))):
            if not re.match(pattern1, line):
                print(f"  {line[:100]}")
                count += 1
                if count >= 20:
                    break
    
    # Check last few pages of TOC
    print(f"\n\nLast few TOC pages (18-21):")
    for i in range(17, 21):
        if i < len(reader.pages):
            print(f"\n=== Page {i+1} ===")
            text = reader.pages[i].extract_text()
            lines = [l for l in text.split('\n') if l.strip()]
            print('\n'.join(lines[:15]))

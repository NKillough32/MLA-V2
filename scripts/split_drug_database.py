#!/usr/bin/env python3
"""
Script to split drugDatabase.js into individual JSON files
"""
import json
import os
import re
from pathlib import Path

# Paths
SCRIPT_DIR = Path(__file__).parent
ROOT_DIR = SCRIPT_DIR.parent
DATABASE_FILE = ROOT_DIR / 'static' / 'js' / 'data' / 'drugDatabase.js'
OUTPUT_DIR = ROOT_DIR / 'static' / 'drugs'

def parse_drug_database(file_path):
    """Parse the drugDatabase.js file and extract drug objects"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the drugDatabase object
    match = re.search(r'const drugDatabase = ({[\s\S]*?})\s*;?\s*//\s*Make drugDatabase', content)
    if not match:
        raise ValueError("Could not find drugDatabase object in file")
    
    js_object = match.group(1)
    
    # Convert JS object to JSON-compatible format
    # Replace single quotes with double quotes (carefully)
    # This is a simplified approach - for complex cases might need a proper JS parser
    
    drugs = {}
    current_drug = None
    current_obj = None
    
    # Split by drug entries (looking for 'drugname': {)
    pattern = r"'([^']+)':\s*\{"
    
    lines = js_object.split('\n')
    in_drug = False
    drug_lines = []
    current_key = None
    
    for line in lines:
        # Check if this line starts a new drug
        match = re.match(r"^\s*'([^']+)':\s*\{", line)
        if match:
            # Save previous drug if exists
            if current_key and drug_lines:
                drug_text = '\n'.join(drug_lines)
                try:
                    # Convert JS object to JSON
                    # Replace escaped single quotes
                    drug_text = drug_text.replace("\\'", "'")
                    # Convert single quotes to double quotes for keys and values
                    drug_text = re.sub(r"(\w+):", r'"\1":', drug_text)
                    drug_text = re.sub(r":\s*'([^']*)'", lambda m: f': "{m.group(1)}"', drug_text)
                    
                    # Try to parse as JSON
                    drug_obj = eval('{' + drug_text + '}')  # Using eval for JS-like object
                    drugs[current_key] = drug_obj
                except Exception as e:
                    print(f"Warning: Could not parse drug {current_key}: {e}")
            
            # Start new drug
            current_key = match.group(1)
            drug_lines = []
            in_drug = True
        elif in_drug:
            # Check if this closes the drug object
            if re.match(r'^\s*\},?\s*$', line):
                # End of current drug
                if current_key and drug_lines:
                    drug_text = '\n'.join(drug_lines)
                    try:
                        # Manual parsing of the object
                        drug_obj = parse_drug_object('\n'.join(drug_lines))
                        drugs[current_key] = drug_obj
                    except Exception as e:
                        print(f"Warning: Could not parse drug {current_key}: {e}")
                in_drug = False
                current_key = None
                drug_lines = []
            else:
                drug_lines.append(line)
    
    return drugs

def parse_drug_object(text):
    """Parse a single drug object from JS text"""
    drug = {}
    
    # Pattern to match key: 'value' pairs
    pattern = r"(\w+):\s*'([^']*(?:\\'[^']*)*)'"
    
    for match in re.finditer(pattern, text):
        key = match.group(1)
        value = match.group(2).replace("\\'", "'")
        drug[key] = value
    
    return drug

def simple_parse():
    """Simpler approach: use regex to extract each drug directly"""
    with open(DATABASE_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    drugs = {}
    
    # Find all drug entries
    # Pattern: 'drugname': { ... },
    pattern = r"'([^']+)':\s*\{([^}]+(?:\}[^}]+)*?)\},"
    
    # More robust pattern that handles nested structures
    drug_pattern = r"'([^']+)':\s*\{((?:[^{}]|\{[^}]*\})*)\}"
    
    matches = re.finditer(drug_pattern, content)
    
    for match in matches:
        drug_id = match.group(1)
        drug_content = match.group(2)
        
        drug_obj = {}
        
        # Extract each field
        field_pattern = r"(\w+):\s*'((?:[^']|\\')*)'"
        
        for field_match in re.finditer(field_pattern, drug_content):
            field_name = field_match.group(1)
            field_value = field_match.group(2).replace("\\'", "'")
            drug_obj[field_name] = field_value
        
        if drug_obj:  # Only add if we extracted fields
            drugs[drug_id] = drug_obj
    
    return drugs

def main():
    """Main function to split the drug database"""
    print(f"Reading drug database from {DATABASE_FILE}")
    
    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Parse the database
    try:
        drugs = simple_parse()
        print(f"Found {len(drugs)} drugs")
        
        if len(drugs) == 0:
            print("ERROR: No drugs found! Check parsing logic")
            return
        
        # Create index
        index = []
        
        # Write individual drug files
        for drug_id, drug_data in drugs.items():
            # Sanitize filename
            filename = f"{drug_id}.json"
            filepath = OUTPUT_DIR / filename
            
            # Write drug JSON
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(drug_data, f, indent=2, ensure_ascii=False)
            
            # Add to index
            index.append({
                'id': drug_id,
                'name': drug_data.get('name', drug_id),
                'class': drug_data.get('class', ''),
                'indication': drug_data.get('indication', '')
            })
            
            print(f"Created {filename}")
        
        # Write index file
        index_file = OUTPUT_DIR / 'index.json'
        with open(index_file, 'w', encoding='utf-8') as f:
            json.dump({
                'drugs': sorted(index, key=lambda x: x['name'].lower()),
                'count': len(index),
                'generated': 'Drug index for MLA-V2'
            }, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ Successfully created {len(drugs)} drug files")
        print(f"✓ Created index.json with {len(index)} entries")
        print(f"✓ Output directory: {OUTPUT_DIR}")
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()

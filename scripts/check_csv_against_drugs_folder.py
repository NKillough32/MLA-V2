#!/usr/bin/env python3
"""
Check which drugs from drugs.csv are present in the static/drugs/ folder
"""
import json
import re
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
ROOT_DIR = SCRIPT_DIR.parent
CSV_FILE = ROOT_DIR / 'docs' / 'drugs.csv'
DRUGS_DIR = ROOT_DIR / 'static' / 'drugs'

def normalize_drug_name(name):
    """Normalize drug name for comparison"""
    # Remove parenthetical content
    name = re.sub(r'\([^)]*\)', '', name)
    # Convert to lowercase
    name = name.lower().strip()
    # Remove extra spaces
    name = re.sub(r'\s+', ' ', name)
    return name

def parse_csv():
    """Parse drugs.csv and extract all drug names"""
    drugs = []
    # Try different encodings
    for encoding in ['utf-8', 'latin-1', 'cp1252']:
        try:
            with open(CSV_FILE, 'r', encoding=encoding) as f:
                lines = f.readlines()[1:]  # Skip header
                break
        except UnicodeDecodeError:
            continue
    else:
        raise ValueError("Could not decode CSV file with any encoding")
    
    for line in lines:
            # Split by comma, but handle quoted strings
            parts = line.strip().split(',', 1)
            if len(parts) < 2:
                continue
            
            drug_class = parts[0].strip()
            drug_names = parts[1].strip().strip('"')
            
            # Split by comma and semicolon
            names = re.split(r'[,;]', drug_names)
            
            for name in names:
                # Clean up the name
                name = name.strip()
                # Remove parenthetical content like "(NSAIDs)" or "(breast)"
                name = re.sub(r'\([^)]*\)', '', name)
                name = name.strip()
                
                # Skip empty names or generic descriptors
                if not name or name.lower() in ['e.g.', 'etc.']:
                    continue
                
                drugs.append({
                    'original': name,
                    'normalized': normalize_drug_name(name),
                    'class': drug_class
                })
    
    return drugs

def get_existing_drugs():
    """Get list of drugs in static/drugs/ folder"""
    drugs = []
    for file in DRUGS_DIR.glob('*.json'):
        if file.name == 'index.json':
            continue
        # Remove .json extension and normalize
        drug_id = file.stem
        drugs.append({
            'filename': file.name,
            'id': drug_id,
            'normalized': normalize_drug_name(drug_id)
        })
    return drugs

def main():
    print("Checking drugs.csv against static/drugs/ folder...\n")
    
    # Parse CSV
    csv_drugs = parse_csv()
    print(f"Found {len(csv_drugs)} drugs in CSV")
    
    # Get existing drugs
    existing_drugs = get_existing_drugs()
    print(f"Found {len(existing_drugs)} drug files in folder\n")
    
    # Create lookup of existing drugs
    existing_normalized = {d['normalized']: d for d in existing_drugs}
    existing_ids = {d['id'].lower(): d for d in existing_drugs}
    
    # Check which CSV drugs are present
    missing = []
    present = []
    
    for csv_drug in csv_drugs:
        normalized = csv_drug['normalized']
        
        # Try exact match on normalized name
        if normalized in existing_normalized:
            present.append(csv_drug)
            continue
        
        # Try with hyphens instead of spaces
        hyphenated = normalized.replace(' ', '-')
        if hyphenated in existing_ids:
            present.append(csv_drug)
            continue
        
        # Try without spaces
        no_spaces = normalized.replace(' ', '')
        if no_spaces in existing_ids:
            present.append(csv_drug)
            continue
        
        # Not found
        missing.append(csv_drug)
    
    print(f"✅ Present: {len(present)}/{len(csv_drugs)} ({len(present)/len(csv_drugs)*100:.1f}%)")
    print(f"❌ Missing: {len(missing)}/{len(csv_drugs)} ({len(missing)/len(csv_drugs)*100:.1f}%)\n")
    
    if missing:
        print("Missing drugs:")
        print("-" * 80)
        current_class = None
        for drug in missing:
            if drug['class'] != current_class:
                current_class = drug['class']
                print(f"\n{current_class}:")
            print(f"  - {drug['original']}")
        
        # Try to find similar matches
        print("\n" + "="*80)
        print("Potential matches (might be named differently):")
        print("="*80)
        for drug in missing:
            normalized = drug['normalized']
            # Find drugs that contain the search term or vice versa
            potential_matches = []
            for existing in existing_drugs:
                if normalized in existing['normalized'] or existing['normalized'] in normalized:
                    potential_matches.append(existing)
            
            if potential_matches:
                print(f"\n'{drug['original']}' might match:")
                for match in potential_matches[:3]:  # Show top 3
                    print(f"  - {match['id']}.json")

if __name__ == '__main__':
    main()

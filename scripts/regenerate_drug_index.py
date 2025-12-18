#!/usr/bin/env python3
"""
Regenerate index.json from all drug JSON files
"""
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
ROOT_DIR = SCRIPT_DIR.parent
DRUGS_DIR = ROOT_DIR / 'static' / 'drugs'

def main():
    index_data = {
        'drugs': [],
        'count': 0,
        'generated': 'Drug index for MLA-V2'
    }
    
    # Find all drug JSON files
    drug_files = sorted([f for f in DRUGS_DIR.glob('*.json') if f.name != 'index.json'])
    
    print(f'Found {len(drug_files)} drug files')
    
    # Load each drug and add to index
    for drug_file in drug_files:
        try:
            with open(drug_file, 'r', encoding='utf-8') as f:
                drug_data = json.load(f)
                
            index_data['drugs'].append({
                'id': drug_file.stem,
                'name': drug_data['name'],
                'class': drug_data['class'],
                'indication': drug_data['indication']
            })
        except Exception as e:
            print(f'Error loading {drug_file.name}: {e}')
    
    # Sort by name
    index_data['drugs'].sort(key=lambda x: x['name'].lower())
    index_data['count'] = len(index_data['drugs'])
    
    # Write index
    index_file = DRUGS_DIR / 'index.json'
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(index_data, f, indent=2, ensure_ascii=False)
    
    print(f'✓ Updated index.json with {index_data["count"]} drugs')

if __name__ == '__main__':
    main()

"""
Regenerate calculator_index.json from all calculator JSON files
Similar to regenerate_drug_index.py
"""

import json
from pathlib import Path
from datetime import date

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
CALCULATORS_DIR = PROJECT_ROOT / 'static' / 'calculators'
INDEX_FILE = CALCULATORS_DIR / 'calculator_index.json'

def regenerate_index():
    """Regenerate the calculator index from all calculator JSON files"""
    print("=" * 60)
    print("Regenerating Calculator Index")
    print("=" * 60)
    
    # Find all calculator JSON files (excluding the index itself)
    calculator_files = sorted([f for f in CALCULATORS_DIR.glob('*.json') if f.name != 'calculator_index.json'])
    
    print(f"Found {len(calculator_files)} calculator files")
    
    calculators = []
    
    for calc_file in calculator_files:
        try:
            with open(calc_file, 'r', encoding='utf-8') as f:
                calc_data = json.load(f)
            
            # Extract minimal info for index
            calculator_entry = {
                'id': calc_data.get('id', calc_file.stem),
                'name': calc_data.get('name', ''),
                'category': calc_data.get('category', ''),
                'file': calc_file.name
            }
            
            calculators.append(calculator_entry)
            
        except Exception as e:
            print(f"Error reading {calc_file.name}: {e}")
    
    # Build index
    index = {
        'version': '1.0.0',
        'generated': str(date.today()),
        'totalCalculators': len(calculators),
        'calculators': calculators
    }
    
    # Write index file
    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        json.dump(index, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Successfully regenerated calculator index")
    print(f"   Total calculators: {len(calculators)}")
    print(f"   Output: {INDEX_FILE}")
    print("=" * 60)

if __name__ == '__main__':
    regenerate_index()

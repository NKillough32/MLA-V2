"""
Split calculators from extracted-calculators.js into individual JSON files
Similar to how drugs were split
"""

import json
import os
import re
from pathlib import Path

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
EXTRACTED_CALC_FILE = PROJECT_ROOT / 'static' / 'js' / 'v2' / 'extracted-calculators.js'
CALCULATORS_DIR = PROJECT_ROOT / 'static' / 'calculators'
REGISTRY_FILE = PROJECT_ROOT / 'static' / 'js' / 'v2' / 'modules' / 'CalculatorRegistry.js'

def extract_calculator_definitions():
    """Extract calculator definitions from CalculatorRegistry.js"""
    print("Reading CalculatorRegistry.js...")
    
    with open(REGISTRY_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the BRIDGE_CALCULATOR_DEFINITIONS array
    match = re.search(r'export const BRIDGE_CALCULATOR_DEFINITIONS = \[(.*?)\];', content, re.DOTALL)
    if not match:
        raise ValueError("Could not find BRIDGE_CALCULATOR_DEFINITIONS")
    
    definitions_text = match.group(1)
    
    # Parse individual calculator definitions
    calculators = []
    calc_pattern = r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
    
    for calc_match in re.finditer(calc_pattern, definitions_text):
        calc_text = calc_match.group(0)
        
        # Extract fields
        calc = {}
        
        # ID
        id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", calc_text)
        if id_match:
            calc['id'] = id_match.group(1)
        
        # Name
        name_match = re.search(r"name:\s*['\"]([^'\"]+)['\"]", calc_text)
        if name_match:
            calc['name'] = name_match.group(1)
        
        # Category
        category_match = re.search(r"category:\s*['\"]([^'\"]+)['\"]", calc_text)
        if category_match:
            calc['category'] = category_match.group(1)
        
        # Description
        desc_match = re.search(r"description:\s*['\"]([^'\"]+)['\"]", calc_text)
        if desc_match:
            calc['description'] = desc_match.group(1)
        
        # Getter
        getter_match = re.search(r"getter:\s*['\"]([^'\"]+)['\"]", calc_text)
        if getter_match:
            calc['getter'] = getter_match.group(1)
        
        # Calculator
        calculator_match = re.search(r"calculator:\s*['\"]([^'\"]+)['\"]", calc_text)
        if calculator_match:
            calc['calculator'] = calculator_match.group(1)
        
        # Keywords
        keywords_match = re.search(r"keywords:\s*\[(.*?)\]", calc_text, re.DOTALL)
        if keywords_match:
            keywords_text = keywords_match.group(1)
            keywords = re.findall(r"['\"]([^'\"]+)['\"]", keywords_text)
            calc['keywords'] = keywords
        
        if 'id' in calc:
            calculators.append(calc)
    
    print(f"Found {len(calculators)} calculator definitions")
    return calculators

def extract_calculator_functions(calc_id, getter_name, calculator_name):
    """Extract the getter and calculator functions from extracted-calculators.js"""
    print(f"  Extracting functions for {calc_id}...")
    
    with open(EXTRACTED_CALC_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    result = {}
    
    # Extract getter function (returns HTML template)
    getter_pattern = rf'{getter_name}\(\)\s*\{{(.*?)\n    \}},'
    getter_match = re.search(getter_pattern, content, re.DOTALL)
    if getter_match:
        function_body = getter_match.group(1).strip()
        # Extract the return statement content
        if 'return `' in function_body:
            template_match = re.search(r'return `(.*?)`\s*;', function_body, re.DOTALL)
            if template_match:
                result['template'] = template_match.group(1)
    
    # Extract calculator function (calculation logic)
    calc_pattern = rf'{calculator_name}\(\)\s*\{{(.*?)\n    \}},'
    calc_match = re.search(calc_pattern, content, re.DOTALL)
    if calc_match:
        function_body = calc_match.group(1).strip()
        result['calculatorFunction'] = function_body
    
    return result

def sanitize_filename(name):
    """Convert calculator name to filename"""
    # Remove special characters and convert to lowercase
    filename = re.sub(r'[^\w\s-]', '', name.lower())
    filename = re.sub(r'[-\s]+', '-', filename)
    return filename

def create_calculator_files(calculators):
    """Create individual JSON files for each calculator"""
    print(f"\nCreating calculator files in {CALCULATORS_DIR}...")
    
    # Ensure calculators directory exists
    CALCULATORS_DIR.mkdir(parents=True, exist_ok=True)
    
    created_count = 0
    
    for calc in calculators:
        calc_id = calc.get('id')
        getter_name = calc.get('getter')
        calculator_name = calc.get('calculator')
        
        if not calc_id or not getter_name or not calculator_name:
            print(f"  Skipping incomplete calculator: {calc}")
            continue
        
        # Extract functions
        functions = extract_calculator_functions(calc_id, getter_name, calculator_name)
        
        # Build complete calculator data
        calculator_data = {
            'id': calc_id,
            'name': calc.get('name', ''),
            'category': calc.get('category', ''),
            'description': calc.get('description', ''),
            'keywords': calc.get('keywords', []),
            'template': functions.get('template', ''),
            'calculatorFunction': functions.get('calculatorFunction', '')
        }
        
        # Create filename
        filename = f"{calc_id}.json"
        filepath = CALCULATORS_DIR / filename
        
        # Write JSON file
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(calculator_data, f, indent=2, ensure_ascii=False)
        
        created_count += 1
        print(f"  Created: {filename}")
    
    print(f"\nCreated {created_count} calculator files")
    return created_count

def create_calculator_index(calculators):
    """Create an index file listing all calculators"""
    print("\nCreating calculator index...")
    
    index = {
        'version': '1.0.0',
        'generated': '2025-12-28',
        'totalCalculators': len(calculators),
        'calculators': [
            {
                'id': calc['id'],
                'name': calc.get('name', ''),
                'category': calc.get('category', ''),
                'file': f"{calc['id']}.json"
            }
            for calc in calculators
        ]
    }
    
    index_path = CALCULATORS_DIR / 'calculator_index.json'
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump(index, f, indent=2, ensure_ascii=False)
    
    print(f"Created calculator index: {index_path}")
    return index

def main():
    print("=" * 60)
    print("Calculator Splitting Script")
    print("=" * 60)
    
    # Extract calculator definitions from registry
    calculators = extract_calculator_definitions()
    
    # Create individual calculator files
    created_count = create_calculator_files(calculators)
    
    # Create index file
    index = create_calculator_index(calculators)
    
    print("\n" + "=" * 60)
    print(f"SUCCESS: Split {created_count} calculators into individual files")
    print(f"Location: {CALCULATORS_DIR}")
    print("=" * 60)

if __name__ == '__main__':
    main()

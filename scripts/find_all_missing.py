#!/usr/bin/env python3
"""Find all truly missing conditions with fuzzy matching"""
import csv
import re
from pathlib import Path
from difflib import get_close_matches

def create_condition_id(condition_name: str) -> str:
    """Create a clean ID from condition name"""
    clean_name = re.sub(r'[^\w\s-]', '', condition_name)
    clean_name = re.sub(r'[-\s]+', '_', clean_name)
    return clean_name.lower()

# Load CSV
csv_path = Path('../static/coreconditions/core_conditions_clean.csv')
csv_conditions = []
with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        condition = row['Core Conditions'].strip()
        domain = row['Domain'].strip()
        csv_conditions.append((condition, domain))

unique_conditions = list(set([c for c, d in csv_conditions]))

# Get existing files  
generated_dir = Path('../static/coreconditions/generated')
existing_files = {}
for f in generated_dir.glob('*.json'):
    if f.name not in ['index.json', 'processing_progress.json']:
        existing_files[f.stem] = f.name

print(f"CSV conditions: {len(unique_conditions)}")
print(f"Generated files: {len(existing_files)}")
print()

# Find missing with fuzzy matching
truly_missing = []
for condition in unique_conditions:
    condition_id = create_condition_id(condition)
    
    if condition_id not in existing_files:
        # Try fuzzy match
        close = get_close_matches(condition_id, existing_files.keys(), n=1, cutoff=0.85)
        if close:
            print(f"~ {condition}")
            print(f"  Expected: {condition_id}.json")
            print(f"  Found: {close[0]}.json")
        else:
            truly_missing.append(condition)

print(f"\n\nTRULY MISSING: {len(truly_missing)} conditions\n")
for condition in sorted(truly_missing):
    print(f"  ✗ {condition}")

# Save to file
with open('truly_missing_conditions.txt', 'w', encoding='utf-8') as f:
    for condition in sorted(truly_missing):
        f.write(f"{condition}\n")

print(f"\nSaved to truly_missing_conditions.txt")

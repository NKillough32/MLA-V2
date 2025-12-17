#!/usr/bin/env python3
"""Check which conditions from CSV are missing from generated files"""
import csv
import re
from pathlib import Path
from collections import defaultdict

def create_condition_id(condition_name: str) -> str:
    """Create a clean ID from condition name - matches processor logic"""
    # Remove special characters and convert to snake_case
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

# Get unique conditions
unique_conditions = list(set([c for c, d in csv_conditions]))
unique_conditions.sort()

print(f"Total rows in CSV: {len(csv_conditions)}")
print(f"Unique conditions in CSV: {len(unique_conditions)}")

# Get existing files
generated_dir = Path('../static/coreconditions/generated')
existing_files = set()
for f in generated_dir.glob('*.json'):
    if f.name not in ['index.json', 'processing_progress.json']:
        existing_files.add(f.stem)

print(f"Generated JSON files: {len(existing_files)}")
print()

# Check which conditions are missing
missing = []
for condition in unique_conditions:
    condition_id = create_condition_id(condition)
    if condition_id not in existing_files:
        missing.append((condition, condition_id))

if missing:
    print(f"MISSING {len(missing)} CONDITIONS:\n")
    for name, cid in missing:
        print(f"  ✗ {name}")
        print(f"    Expected file: {cid}.json")
else:
    print("✓ All conditions from CSV are present!")

# Check for extra files (files that don't match any CSV condition)
csv_ids = {create_condition_id(c) for c in unique_conditions}
extra_files = existing_files - csv_ids

if extra_files:
    print(f"\n\nEXTRA FILES (not in CSV): {len(extra_files)}")
    for f in sorted(list(extra_files))[:20]:
        print(f"  + {f}.json")
    if len(extra_files) > 20:
        print(f"  ... and {len(extra_files) - 20} more")

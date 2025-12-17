#!/usr/bin/env python3
"""Find conditions that were marked as processed but have no JSON file"""
import json
import re
from pathlib import Path

def create_condition_id(condition_name: str) -> str:
    """Create a clean ID from condition name"""
    # Remove special characters and convert to snake_case
    clean_name = re.sub(r'[^\w\s-]', '', condition_name)
    clean_name = re.sub(r'[-\s]+', '_', clean_name)
    return clean_name.lower()

# Load processing progress
progress_file = Path('../static/coreconditions/generated/processing_progress.json')
with open(progress_file, 'r', encoding='utf-8') as f:
    progress = json.load(f)

# Get all existing files
generated_dir = Path('../static/coreconditions/generated')
existing_files = set()
for f in generated_dir.glob('*.json'):
    if f.name not in ['index.json', 'processing_progress.json']:
        existing_files.add(f.stem)

print(f"Processed according to progress file: {len(progress['processed_conditions'])}")
print(f"Actual condition files: {len(existing_files)}")
print(f"Discrepancy: {len(progress['processed_conditions']) - len(existing_files)} missing\n")

# Check each processed condition
missing = []
for condition_name in progress['processed_conditions']:
    condition_id = create_condition_id(condition_name)
    
    if condition_id not in existing_files:
        missing.append((condition_name, condition_id))

print(f"Truly missing conditions: {len(missing)}\n")
for name, cid in missing:
    # Check if maybe there's a similar file
    similar = [f for f in existing_files if cid[:15] in f or f[:15] in cid]
    if similar:
        print(f"✗ {name}")
        print(f"  Expected: {cid}.json")
        print(f"  Similar: {similar}")
    else:
        print(f"✗ {name} -> {cid}.json (completely missing)")

# Save list for regeneration
with open('missing_conditions.txt', 'w', encoding='utf-8') as f:
    for name, _ in missing:
        f.write(f"{name}\n")

print(f"\nSaved {len(missing)} missing condition names to missing_conditions.txt")

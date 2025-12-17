#!/usr/bin/env python3
"""Find missing condition files"""
import json
from pathlib import Path

# Load processing progress
with open('../static/coreconditions/generated/processing_progress.json', 'r', encoding='utf-8') as f:
    progress = json.load(f)

# Get all existing files
generated_dir = Path('../static/coreconditions/generated')
existing_files = {f.stem for f in generated_dir.glob('*.json') if f.name not in ['index.json', 'processing_progress.json']}

# Create IDs from processed conditions
def create_id(name):
    return name.lower().replace(' ', '_').replace('/', '_').replace('?', '').replace('(', '').replace(')', '').replace(',', '').replace("'", '').replace('-', '_')

missing = []
for condition in progress['processed_conditions']:
    cid = create_id(condition)
    if cid not in existing_files:
        missing.append((condition, cid))

print(f'Total processed: {len(progress["processed_conditions"])}')
print(f'Total files: {len(existing_files)}')
print(f'Missing: {len(missing)} conditions')
print()
for name, cid in missing[:50]:
    print(f'  {name} -> {cid}')

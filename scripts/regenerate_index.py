#!/usr/bin/env python3
"""
Regenerate index.json from existing condition files
"""

import json
from pathlib import Path
from datetime import datetime

# Paths
generated_dir = Path("../static/coreconditions/generated")
index_file = generated_dir / "index.json"

# Scan all JSON files (exclude index.json and processing files)
condition_files = [
    f for f in generated_dir.glob("*.json")
    if f.name not in ["index.json", "processing_progress.json"]
]

print(f"Found {len(condition_files)} condition files")

conditions = []
for file_path in condition_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # Clean the name by removing question marks
        clean_name = data["name"].replace('?', '').strip()
        
        conditions.append({
            "id": data["id"],
            "name": clean_name,
            "domains": data["domains"],
            "filename": file_path.name,
            "processed": True
        })
    except Exception as e:
        print(f"Error reading {file_path.name}: {e}")

# Sort by name
conditions.sort(key=lambda x: x["name"])

# Create index
index_data = {
    "generatedAt": datetime.now().isoformat(),
    "totalConditions": len(conditions),
    "processedCount": len(conditions),
    "model": "gpt-4o-mini",
    "conditions": conditions
}

# Save index
with open(index_file, 'w', encoding='utf-8') as f:
    json.dump(index_data, f, indent=2, ensure_ascii=False)

print(f"Generated index with {len(conditions)} conditions")
print(f"  Saved to: {index_file}")

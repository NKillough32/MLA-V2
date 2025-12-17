"""
Clean the generated coreConditions_NEW.js file
- Remove TOC dots from condition names
- Clean up condition IDs
"""

import json
import re

# Read the file
with open(r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\coreConditions_NEW.js", 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON part (after "export const coreConditions = ")
json_start = content.index('{')
json_end = content.rindex(';')
json_str = content[json_start:json_end]

# Parse JSON
data = json.loads(json_str)

print(f"Loaded {len(data)} conditions")

# Clean up the data
cleaned_data = {}
for cond_id, cond_data in data.items():
    # Clean the condition ID (remove trailing dashes, dots)
    clean_id = cond_id.strip('-').strip('.')
    
    # Clean the condition name (remove TOC dots and extra spaces)
    if 'name' in cond_data:
        name = cond_data['name']
        # Remove sequences of dots
        name = re.sub(r'\s*\.{2,}\s*', ' ', name)
        # Remove extra whitespace
        name = re.sub(r'\s+', ' ', name).strip()
        cond_data['name'] = name
    
    cleaned_data[clean_id] = cond_data
    
print(f"Cleaned {len(cleaned_data)} conditions")

# Write back
output = "export const coreConditions = " + json.dumps(cleaned_data, indent=4) + ";\n"

with open(r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\coreConditions.js", 'w', encoding='utf-8') as f:
    f.write(output)

print(f"[OK] Wrote cleaned file: coreConditions.js")
print(f"[INFO] File size: {len(output):,} bytes ({len(output)/1024/1024:.2f} MB)")

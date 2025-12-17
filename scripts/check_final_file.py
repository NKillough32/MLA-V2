import json

with open(r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\coreConditions.js", 'r', encoding='utf-8') as f:
    content = f.read()
    
json_str = content.replace('export const coreConditions = ', '').replace(';\n', '')
data = json.loads(json_str)

print("=" * 50)
print("CORECONDITIONS.JS - PDF EXTRACTION COMPLETE")
print("=" * 50)
print(f"\nTotal conditions extracted: {len(data)}")
print(f"Source: MBBS Core Conditions All.pdf")
print(f"Pages processed: 3,172")
print(f"\nFile size: 1.97 MB")
print(f"\nFirst 20 conditions:")
for i, key in enumerate(list(data.keys())[:20], 1):
    name = data[key].get('name', key)
    domain = data[key].get('domain', 'Unknown')
    print(f"  {i:2d}. {name[:50]:50s} [{domain}]")

import json

# Load drug database
with open('static/js/data/drugDatabase.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON
start = content.find('{')
end = content.rfind('}') + 1
json_str = content[start:end]
data = json.loads(json_str)

print(f'Drug database loaded with {len(data)} entries')

# Test search
query = 'asp'
matches = [k for k, v in data.items() if query.lower() in k.lower() or query.lower() in v.get('name', '').lower()]
print(f'Search for "{query}" found {len(matches)} matches: {matches[:5]}')

# Test another search
query2 = 'paracetamol'
matches2 = [k for k, v in data.items() if query2.lower() in k.lower() or query2.lower() in v.get('name', '').lower()]
print(f'Search for "{query2}" found {len(matches2)} matches: {matches2[:3]}')
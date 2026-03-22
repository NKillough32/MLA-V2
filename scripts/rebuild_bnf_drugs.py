import csv, re, json, os

csv_path = r'c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\assets\PSA\BNF Drug list.csv'
out_path = r'c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\assets\PSA\bnf-drug-names.json'

# Must contain a pharmaceutical form or dose unit
DRUG_FORMS = re.compile(
    r'\b(tablet|capsule|oral|solution|suspension|syrup|elixir|drops|spray|'
    r'cream|gel|ointment|paste|patch|lotion|foam|shampoo|powder|granule|sachet|'
    r'injection|infusion|vial|ampoule|pre-filled|implant|'
    r'inhaler|inhalation|nebuliser|nebulized|aerosol|'
    r'suppository|pessary|enema|lozenge|pastille|effervescent|dispersible|'
    r'modified.release|prolonged.release|slow.release|gastro.resistant|'
    r'orodispersible|film.coated|extended.release|buccal|sublingual|'
    r'\d+\s*(mg|mcg|microgram|nanogram|g\b|ml\b|units?|iu\b|mmol))\b',
    re.IGNORECASE
)

# Exclude devices, appliances, food, dressings
EXCLUDE = re.compile(
    r'\b(catheter|dressing|bandage|cannula|stocking|hosiery|suture|'
    r'glove|lancet|gauze|lint|stockinette|'
    r'peak flow|spacer|spacer device|'
    r'gluten.free|bread|roll\b|cracker|biscuit|cereal|pasta|pizza|flour|'
    r'noodle|loaf\b|crispbread|wafer(?! tablet)|'
    r'colostomy|ileostomy|urostomy|drainable|'
    r'armsleeve|thigh length|below knee|leg ulcer|'
    r'compression bandage|multi.layer|'
    r'test strip(?!.*mg)|testing strip|'
    r'absorbent cotton|absorbent lint|'
    r'wound care|wound dressing|'
    r'hypodermic insulin needles|insulin inj pen|insulin pen reusable|'
    r'needle(?!.*medicine)|pen needle|pen reusable|hypod ins needles|hypod insulin needles|'
    r'electrode|orthotic|prosth|truss|brace|'
    r'urinal\b|incontinence|penile sheath)\b',
    re.IGNORECASE
)

# Strip import/marketing junk but keep strength and form
CLEAN = re.compile(
    r'\s*\((?:Imported|Unlicensed|Special[^)]*)\)[^,]*',
    re.IGNORECASE
)

names = set()

with open(csv_path, encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    next(reader, None)
    for row in reader:
        if not row:
            continue
        raw = row[0].strip().strip('"')
        if not raw or len(raw) < 3:
            continue
        if not DRUG_FORMS.search(raw):
            continue
        if EXCLUDE.search(raw):
            continue
        entry = re.sub(r'\s+', ' ', CLEAN.sub('', raw)).strip(' /-,')
        if entry and 3 <= len(entry) <= 100:
            names.add(entry)

sorted_names = sorted(names, key=lambda x: x.lower())
print(f'Total drug names: {len(sorted_names)}')
low = [n.lower() for n in sorted_names]
print('Foods/devices check:', [n for n in sorted_names if 'bread' in n.lower() or 'catheter' in n.lower() or 'dressing' in n.lower()])
print('Furosemide entries:', [n for n in sorted_names if n.lower().startswith('furosemide')][:6])
print('Amoxicillin entries:', [n for n in sorted_names if n.lower().startswith('amoxicillin')][:6])
print('Aspirin entries:', [n for n in sorted_names if n.lower().startswith('aspirin')][:6])

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(sorted_names, f, ensure_ascii=False)

print(f'Saved: {os.path.getsize(out_path)//1024}KB')

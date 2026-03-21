import re
content = open("static/assets/PSA/psa1_extracted.md", encoding="utf-8").read()
print("CALC:", len(re.findall(r"^### CALC Q", content, re.M)),
      " EX:", len(re.findall(r"^### WORKED", content, re.M)),
      " PRESC:", len(re.findall(r"^### PRESC Q", content, re.M)),
      " REVIEW:", len(re.findall(r"^### REVIEW Q", content, re.M)),
      " MCQ:", len(re.findall(r"^### MCQ Q", content, re.M)))
for val, name in [("0.125","A1 coamox"),("0.015","isotretinoin"),
                  ("19.2","200ng"),("9 drops","alfacalcidol"),("zopiclone","review A8")]:
    found = "FOUND" if val in content else "MISSING"
    print("  " + name + ": " + found)


# Blood Film Images - Current Status

Last updated: January 4, 2026

## ✅ Successfully Downloaded (6/25)

| Filename | Size | Condition | Status |
|----------|------|-----------|--------|
| iron-deficiency.jpg | 2.3 MB | Iron Deficiency Anemia | ✓ Downloaded |
| thalassemia.jpg | 65 KB | Beta Thalassemia (inheritance diagram) | ✓ Downloaded |
| sickle-cell.jpg | 100 KB | Sickle Cell Disease | ✓ Downloaded |
| aml-blasts.jpg | 145 KB | Acute Myeloid Leukemia | ✓ Downloaded |
| megaloblastic.jpg | 25 KB | Megaloblastic Anemia | ✓ Downloaded |
| malaria-falciparum.jpg | 421 KB | Malaria (Plasmodium falciparum) | ✓ Downloaded |

## ⏳ Pending Download (19/25)

Due to Wikimedia rate limiting, the following images need to be downloaded from **ASH Image Bank** or manually from Wikimedia:

### Anemias (8 pending)
- [ ] target-cells.jpg
- [ ] b12-deficiency.jpg
- [ ] hypersegmented-neutrophil.jpg
- [ ] spherocytes.jpg
- [ ] hereditary-spherocytosis.jpg
- [ ] g6pd-bite-cells.jpg
- [ ] schistocytes.jpg
- [ ] basophilic-stippling.jpg

### Leukemias (3 pending)
- [ ] all-blasts.jpg (ALL)
- [ ] cml.jpg
- [ ] cll-smudge-cells.jpg

### Myeloproliferative (3 pending)
- [ ] polycythemia.jpg
- [ ] essential-thrombocythemia.jpg
- [ ] tear-drop-cells.jpg

### Other (5 pending)
- [ ] rouleaux.jpg (Multiple Myeloma)
- [ ] normal-blood-film.jpg
- [ ] howell-jolly-bodies.jpg
- [ ] malaria-vivax.jpg

## 📥 How to Get Missing Images

### Option 1: ASH Image Bank (RECOMMENDED - Best Quality)
1. Register free at: https://imagebank.hematology.org/
2. Search for each condition
3. Download and rename files to match the filenames above
4. Save to this folder (`static/hematology/`)

### Option 2: Wait and Retry Wikimedia Script
Run the script again later (Wikimedia has hourly rate limits):
```powershell
.\download-blood-films.ps1
```

### Option 3: Manual Download from Wikimedia
See `IMAGE_DOWNLOAD_INSTRUCTIONS.md` for individual image URLs

## 💡 Note

The application will work with whatever images are present. Missing images won't cause errors - they simply won't be displayed. Having all images provides the best learning experience, but the comprehensive text descriptions and blood film findings are available for all conditions regardless of image availability.

## 🎯 Priority Images

If downloading manually, prioritize these most commonly seen conditions:
1. ⭐ normal-blood-film.jpg (reference standard)
2. ⭐ hypersegmented-neutrophil.jpg (B12/folate deficiency)
3. ⭐ schistocytes.jpg (DIC/TTP)
4. ⭐ rouleaux.jpg (Multiple myeloma)
5. ⭐ spherocytes.jpg (AIHA, hereditary spherocytosis)
6. ⭐ cll-smudge-cells.jpg (CLL)
7. ⭐ tear-drop-cells.jpg (Myelofibrosis)

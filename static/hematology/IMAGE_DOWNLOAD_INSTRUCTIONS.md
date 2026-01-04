# Hematology Blood Film Images - Download Instructions

## Recommended: ASH Image Bank (Best Quality)

The **American Society of Hematology Image Bank** (https://imagebank.hematology.org/) provides the highest quality, expertly curated hematology images - completely free for educational use.

### Steps to Download from ASH Image Bank:

1. **Register** (free): https://imagebank.hematology.org/Register
2. **Search** for conditions (e.g., "iron deficiency anemia", "sickle cell")
3. **Download** images and save to `static/hematology/` with these filenames:
   - `iron-deficiency.jpg`
   - `thalassemia.jpg`
   - `sickle-cell.jpg`
   - `spherocytes.jpg`
   - `aml-auer-rods.jpg`
   - etc. (see list below)
4. **Attribution**: Images are free for educational use; proper citation provided on each image page

### Benefits of ASH Image Bank:
- ✓ High-resolution professional images
- ✓ Expert-curated content
- ✓ Multiple examples per condition
- ✓ Detailed case information
- ✓ Completely free for education
- ✓ More comprehensive than Wikimedia

---

## Alternative: Wikimedia Commons (Automated)

## Currently Downloaded Images (5/25)

✓ iron-deficiency.jpg
✓ malaria-falciparum.jpg  
✓ sickle-cell.jpg
✓ aml-blasts.jpg
✓ megaloblastic.jpg

## Images to Download

Due to Wikimedia rate limiting, some images need to be downloaded manually or with delays.

### Option 1: Manual Download
Visit these Wikimedia Commons pages and save images:

1. **Target cells**: https://commons.wikimedia.org/wiki/File:Target_cells_(Codocytes).jpg
2. **Thalassemia**: https://commons.wikimedia.org/wiki/File:Thalassemia_minor_blood_film.jpg
3. **B12 deficiency**: https://commons.wikimedia.org/wiki/File:Macrocytosis.jpg
4. **Hypersegmented neutrophil**: https://commons.wikimedia.org/wiki/File:Hypersegmented_neutrophil_B12_def.jpg
5. **Hereditary spherocytosis**: https://commons.wikimedia.org/wiki/File:Hereditary_spherocytosis.jpg
6. **Spherocytes**: https://commons.wikimedia.org/wiki/File:Spherocytes_smear_2010-03-27.JPG
7. **Bite cells (G6PD)**: https://commons.wikimedia.org/wiki/File:Bite_cells.png
8. **Schistocytes**: https://commons.wikimedia.org/wiki/File:Schistocytes.jpg
9. **Rouleaux**: https://commons.wikimedia.org/wiki/File:Rouleaux_3.jpg
10. **Auer rods**: https://commons.wikimedia.org/wiki/File:Auer_rods_in_AML.jpg
11. **ALL blasts**: https://commons.wikimedia.org/wiki/File:Acute_lymphoblastic_leukemia.jpg
12. **CML**: https://commons.wikimedia.org/wiki/File:Chronic_myelogenous_leukemia.jpg
13. **CLL smudge cells**: https://commons.wikimedia.org/wiki/File:Chronic_lymphocytic_leukemia.jpg
14. **Polycythemia**: https://commons.wikimedia.org/wiki/File:Polycythemia_vera.jpg
15. **Tear drop cells**: https://commons.wikimedia.org/wiki/File:Teardrop_cell_smear_2010-03-22.JPG
16. **Thrombocythemia**: https://commons.wikimedia.org/wiki/File:Thrombocytosis_blood_film.jpg
17. **Malaria vivax**: https://commons.wikimedia.org/wiki/File:Plasmodium_vivax_01.jpg
18. **Normal blood film**: https://commons.wikimedia.org/wiki/File:Red_White_Blood_cells.jpg
19. **Basophilic stippling**: https://commons.wikimedia.org/wiki/File:Basophilic_stippling_-_very_high_mag.jpg
20. **Howell-Jolly bodies**: https://commons.wikimedia.org/wiki/File:Howell-Jolly_body_-_closeup.jpg

### Option 2: Automated with Delays
Run the download script with a longer delay (added to prevent rate limiting):

```powershell
# Edit download-blood-films.ps1 and change:
Start-Sleep -Milliseconds 500   
# to:
Start-Sleep -Seconds 3
```

Then run: `.\download-blood-films.ps1`

---

## Required Image Filenames

Ensure downloaded images use these exact filenames:

**Anemias:**
- iron-deficiency.jpg
- thalassemia.jpg
- target-cells.jpg
- b12-deficiency.jpg
- megaloblastic.jpg
- hypersegmented-neutrophil.jpg
- spherocytes.jpg
- hereditary-spherocytosis.jpg
- sickle-cell.jpg
- g6pd-bite-cells.jpg
- schistocytes.jpg

**Leukemias:**
- aml-auer-rods.jpg
- aml-blasts.jpg
- all-blasts.jpg
- cml.jpg
- cll-smudge-cells.jpg

**Myeloproliferative:**
- polycythemia.jpg
- essential-thrombocythemia.jpg
- tear-drop-cells.jpg

**Other:**
- rouleaux.jpg
- normal-blood-film.jpg
- basophilic-stippling.jpg
- howell-jolly-bodies.jpg

---

## Summary

**Best approach**: Use ASH Image Bank for professional-quality images
**Quick approach**: Run the automated Wikimedia download script
**Both work**: The application will display whichever images are present

## License
All images are free for educational use. See ATTRIBUTION.md for details.

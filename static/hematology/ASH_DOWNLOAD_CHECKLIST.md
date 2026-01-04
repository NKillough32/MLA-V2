# ASH Image Bank Download Guide - Missing Images

This guide helps you download the 19 missing blood film images from ASH Image Bank.

## Step 1: Register & Login
1. Go to: https://imagebank.hematology.org/Register
2. Create a free account (takes 2 minutes)
3. Log in to access images

## Step 2: Download Each Missing Image

For each image below:
1. Search for the condition name in ASH Image Bank
2. Select a clear, representative image
3. Download and save with the **exact filename** shown
4. Save to: `C:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\hematology\`

---

### Anemias (8 images needed)

#### ☐ target-cells.jpg
**Search terms:** "target cells" OR "codocytes" OR "thalassemia"
- Look for: Red cells with central hemoglobin surrounded by pale area
- Seen in: Thalassemia, liver disease, asplenia

#### ☐ b12-deficiency.jpg
**Search terms:** "vitamin B12 deficiency" OR "pernicious anemia" OR "macrocytic anemia"
- Look for: Large oval RBCs, macrocytosis
- Key feature: Macrocytic cells

#### ☐ hypersegmented-neutrophil.jpg
**Search terms:** "hypersegmented neutrophil" OR "megaloblastic"
- Look for: Neutrophil with >5 nuclear lobes
- **CRITICAL:** This is pathognomonic for B12/folate deficiency

#### ☐ spherocytes.jpg
**Search terms:** "spherocytes" OR "hereditary spherocytosis" OR "AIHA"
- Look for: Small, round, dense RBCs lacking central pallor
- Seen in: Hereditary spherocytosis, AIHA

#### ☐ hereditary-spherocytosis.jpg
**Search terms:** "hereditary spherocytosis"
- Look for: Multiple spherocytes, polychromasia
- May be same as spherocytes.jpg but shows full blood film

#### ☐ g6pd-bite-cells.jpg
**Search terms:** "bite cells" OR "G6PD deficiency" OR "blister cells"
- Look for: RBCs with "bite" taken out of edge
- Seen during hemolytic episodes

#### ☐ schistocytes.jpg
**Search terms:** "schistocytes" OR "fragmented red cells" OR "DIC" OR "TTP"
- Look for: Helmet cells, fragmented/triangular RBCs
- **HIGH PRIORITY:** Seen in DIC, TTP, MAHA

#### ☐ basophilic-stippling.jpg
**Search terms:** "basophilic stippling" OR "lead poisoning"
- Look for: Fine blue dots throughout RBCs
- Seen in: Lead poisoning, thalassemia, sideroblastic anemia

---

### Leukemias (3 images needed)

#### ☐ all-blasts.jpg
**Search terms:** "acute lymphoblastic leukemia" OR "ALL" OR "lymphoblasts"
- Look for: Small uniform blasts with scant cytoplasm, no granules
- **NO Auer rods** (distinguishes from AML)

#### ☐ cml.jpg
**Search terms:** "chronic myeloid leukemia" OR "CML" OR "chronic myelogenous"
- Look for: Marked WBC elevation, full myeloid spectrum (blasts → mature)
- Key: Basophilia, eosinophilia, left shift

#### ☐ cll-smudge-cells.jpg
**Search terms:** "chronic lymphocytic leukemia" OR "CLL" OR "smudge cells"
- Look for: Small mature lymphocytes + smudge/smear cells
- **CRITICAL:** Smudge cells are pathognomonic for CLL

---

### Myeloproliferative Disorders (3 images needed)

#### ☐ polycythemia.jpg
**Search terms:** "polycythemia vera" OR "polycythaemia"
- Look for: Increased RBC concentration, normal morphology
- Often shows increased WBC and platelets too

#### ☐ essential-thrombocythemia.jpg
**Search terms:** "essential thrombocythemia" OR "thrombocytosis"
- Look for: Markedly increased platelets (>450), variable sizes
- May show giant platelets

#### ☐ tear-drop-cells.jpg
**Search terms:** "tear drop cells" OR "dacrocytes" OR "myelofibrosis"
- Look for: RBCs shaped like teardrops/tadpoles
- **PATHOGNOMONIC** for myelofibrosis

---

### Other Important Findings (5 images needed)

#### ☐ rouleaux.jpg
**Search terms:** "rouleaux" OR "rouleaux formation" OR "multiple myeloma"
- Look for: RBCs stacked like coins
- **HIGH PRIORITY:** Classic for multiple myeloma

#### ☐ normal-blood-film.jpg
**Search terms:** "normal blood smear" OR "normal peripheral blood"
- Look for: Normocytic normochromic RBCs with central pallor
- **REFERENCE STANDARD** - very important!

#### ☐ howell-jolly-bodies.jpg
**Search terms:** "Howell-Jolly bodies" OR "asplenia"
- Look for: Small purple nuclear remnants in RBCs
- Seen in: Post-splenectomy, functional asplenia

#### ☐ malaria-vivax.jpg
**Search terms:** "Plasmodium vivax" OR "malaria vivax"
- Look for: Ring forms or trophozoites in RBCs
- Larger RBCs than P. falciparum

---

## Step 3: Verify Downloads

After downloading all images, run this command to check:
```powershell
cd C:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\hematology
Get-ChildItem -Include "*.jpg","*.png" -Recurse | Select-Object Name, @{Name="Size (KB)";Expression={[math]::Round($_.Length/1KB, 1)}}
```

You should see 25 images total.

---

## Priority Order (if doing in batches)

### Batch 1 - Most Critical (5 images)
1. ☐ normal-blood-film.jpg - Reference standard
2. ☐ hypersegmented-neutrophil.jpg - B12/folate deficiency
3. ☐ schistocytes.jpg - DIC/TTP emergency
4. ☐ rouleaux.jpg - Multiple myeloma
5. ☐ cll-smudge-cells.jpg - CLL diagnosis

### Batch 2 - Very Important (7 images)
6. ☐ spherocytes.jpg - AIHA, hereditary spherocytosis
7. ☐ tear-drop-cells.jpg - Myelofibrosis
8. ☐ target-cells.jpg - Thalassemia, liver disease
9. ☐ b12-deficiency.jpg - Macrocytic anemia
10. ☐ all-blasts.jpg - ALL
11. ☐ cml.jpg - CML
12. ☐ basophilic-stippling.jpg - Lead poisoning

### Batch 3 - Remaining (7 images)
13. ☐ hereditary-spherocytosis.jpg
14. ☐ g6pd-bite-cells.jpg
15. ☐ polycythemia.jpg
16. ☐ essential-thrombocythemia.jpg
17. ☐ howell-jolly-bodies.jpg
18. ☐ malaria-vivax.jpg

---

## Tips for Best Results

1. **Image Quality:** Choose high-magnification images (400x-1000x preferred)
2. **Representative Examples:** Look for images with multiple characteristic cells
3. **Clear Labels:** ASH Image Bank images are already labeled - very helpful!
4. **Attribution:** Note the image ID from ASH for proper attribution
5. **File Size:** Don't worry about large files - quality matters

## Estimated Time

- **Setup (registration):** 2-3 minutes
- **Per image download:** 1-2 minutes
- **Total for all 19 images:** 30-45 minutes
- **Total with Batch 1 priority:** 10 minutes for the 5 most critical

---

## Alternative: Public Domain Sources

If ASH Image Bank is not available, these are public domain alternatives:

- **CDC DPDx:** https://www.cdc.gov/dpdx/ (especially for parasites)
- **Wikimedia Commons:** Direct search (we already tried automated download)
- **UpToDate/Medscape:** May have clinical images (check licensing)

---

## Need Help?

If you encounter any issues:
1. Check IMAGES_STATUS.md for current download status
2. See ATTRIBUTION.md for image credit requirements
3. Images are optional - application works without them

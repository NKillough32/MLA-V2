# ASH Image Bank - Image IDs Reference

This file contains the image IDs for downloading from ASH Image Bank.

## How to Use

1. Visit https://imagebank.hematology.org/
2. Search for a condition
3. Find a good representative image
4. Click on it
5. Copy the image ID from the URL
   - Example: `https://imagebank.hematology.org/image/66051/basophilic-myelocyte`
   - Image ID is: `66051`
6. Add it to `download-from-ash.ps1`

## Currently Configured

- **basophilic-stippling.jpg** - ID: 66051 (from user example)

## Needed Image IDs

Search for these conditions and add their IDs to the download script:

### Priority 1 (Most Critical)
- [ ] **normal-blood-film** - Search: "normal peripheral blood smear"
- [ ] **hypersegmented-neutrophil** - Search: "hypersegmented neutrophil" 
- [ ] **schistocytes** - Search: "schistocytes" OR "fragmented red cells"
- [ ] **rouleaux** - Search: "rouleaux formation"
- [ ] **cll-smudge-cells** - Search: "chronic lymphocytic leukemia smudge"

### Priority 2 (Very Important)
- [ ] **spherocytes** - Search: "spherocytes"
- [ ] **tear-drop-cells** - Search: "dacrocytes" OR "teardrop cells"
- [ ] **target-cells** - Search: "target cells" OR "codocytes"
- [ ] **b12-deficiency** - Search: "megaloblastic anemia"
- [ ] **all-blasts** - Search: "acute lymphoblastic leukemia"
- [ ] **cml** - Search: "chronic myeloid leukemia"

### Priority 3 (Remaining)
- [ ] **hereditary-spherocytosis** - Search: "hereditary spherocytosis"
- [ ] **g6pd-bite-cells** - Search: "bite cells" OR "G6PD"
- [ ] **polycythemia** - Search: "polycythemia vera"
- [ ] **essential-thrombocythemia** - Search: "essential thrombocythemia"
- [ ] **howell-jolly-bodies** - Search: "howell jolly bodies"
- [ ] **malaria-vivax** - Search: "plasmodium vivax"

## Template for Adding to Script

Once you have image IDs, add them to `download-from-ash.ps1` like this:

```powershell
$ashImages = @{
    "basophilic-stippling.jpg" = @{
        id = "66051"
        description = "basophilic-myelocyte"
    }
    
    "schistocytes.jpg" = @{
        id = "YOUR_IMAGE_ID_HERE"
        description = "schistocytes"
    }
    
    "rouleaux.jpg" = @{
        id = "YOUR_IMAGE_ID_HERE"
        description = "rouleaux-formation"
    }
    
    # Add more...
}
```

## Tips

- Choose high-quality images (400x-1000x magnification preferred)
- Look for images with multiple characteristic cells visible
- The `description` field can be anything; it's just part of the URL
- Image IDs are unique numbers (typically 5-6 digits)

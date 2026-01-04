# Hematology Module

Comprehensive hematology reference with blood film presentations, organized by condition type.

## Contents

### Data File
- `haematology_data.js` - Main database with detailed information on:
  - **Anemias**: Microcytic, macrocytic, normocytic, and hemolytic
  - **Leukemias**: AML, ALL, CML, CLL
  - **Myeloproliferative Disorders**: Polycythemia vera, essential thrombocythemia, myelofibrosis
  - **Coagulation Disorders**: Hemophilia, von Willebrand disease, DIC, ITP, TTP
  - **Lymphomas**: Hodgkin and Non-Hodgkin
  - **Plasma Cell Disorders**: Multiple myeloma

### Blood Film Images
Blood smear images are sourced from:
- **Sysmex Europe** (https://www.sysmex-europe.com/academy/library/cell-images/) - Professional cell images (free for education) - **Now with automated scraper!**
- **ASH Image Bank** (https://imagebank.hematology.org/) - Expert-curated images (requires registration)
- **Wikimedia Commons** (CC-licensed or Public Domain) - Automated download via script

**Recommended**: For the best quality educational images, use **Sysmex Europe** or **ASH Image Bank**. The Wikimedia images provide a good starting point.

#### Automated Download Options:

**Option 1: Sysmex Scraper (Python - Best Quality & Coverage)**
```bash
# Install dependencies
pip install -r requirements_scraper.txt

# Scrape the Sysmex website for image links
python scrape_sysmex_images.py

# Download the images
python download_sysmex_images.py
```

**Option 2: Wikimedia Commons (PowerShell - Quick Start)**
```powershell
cd static/hematology
.\download-blood-films.ps1
```

**Option 3: Manual Download**
1. Visit Sysmex Europe or ASH Image Bank
2. Search and download images for each condition
3. Save to the `static/hematology/` folder with matching filenames

See `ATTRIBUTION.md` for full image credits and `IMAGE_DOWNLOAD_INSTRUCTIONS.md` for detailed guidance.

## Structure

Each condition includes:
- **Blood Film Findings**: Detailed morphological features
- **Laboratory Values**: Diagnostic test results
- **Clinical Features**: Signs and symptoms
- **Management**: Treatment approaches
- **Prognosis**: Expected outcomes

## Usage

Import the database in your JavaScript module:
```javascript
import { haematologyDatabase } from './hematology/haematology_data.js';
```

## Image Display

Images are referenced in the data structure with filenames that match downloaded files:
```javascript
bloodFilm: {
    findings: [...],
    image: 'iron-deficiency.jpg',  // Filename in hematology folder
    imageDescription: 'Microcytic hypochromic cells with central pallor'
}
```

## Categories

- `anaemia-microcytic`
- `anaemia-macrocytic`
- `anaemia-normocytic`
- `anaemia-haemolytic`
- `leukaemia`
- `myeloproliferative`
- `coagulation`
- `lymphoma`
- `plasma-cell`

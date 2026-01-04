"""
Download images from Sysmex scraper results
Reads sysmex_cell_images_by_condition.json and downloads matching images
"""

import os
import json
import time
from pathlib import Path
from urllib.parse import urlparse

import requests

# Map Sysmex condition names to our filename convention
FILENAME_MAP = {
    "IRON DEFICIENCY": "iron-deficiency.jpg",
    "IDA": "iron-deficiency.jpg",
    "THALASSAEMIA": "thalassemia.jpg",
    "THALASSEMIA": "thalassemia.jpg",
    "SICKLE CELL": "sickle-cell.jpg",
    "HBSS": "sickle-cell.jpg",
    "SPHEROCYT": "spherocytes.jpg",
    "MEGALOBLASTIC": "megaloblastic.jpg",
    "B12": "megaloblastic.jpg",
    "FOLATE": "megaloblastic.jpg",
    "AML": "aml-blasts.jpg",
    "ACUTE MYELOID LEUKAEMIA": "aml-blasts.jpg",
    "ACUTE MYELOID LEUKEMIA": "aml-blasts.jpg",
    "AUER ROD": "aml-auer-rods.jpg",
    "CLL": "cll-smudge-cells.jpg",
    "CHRONIC LYMPHOCYTIC LEUKAEMIA": "cll-smudge-cells.jpg",
    "SMUDGE CELL": "cll-smudge-cells.jpg",
    "CML": "cml-basophilia.jpg",
    "CHRONIC MYELOID LEUKAEMIA": "cml-basophilia.jpg",
    "ALL": "all-lymphoblasts.jpg",
    "ACUTE LYMPHOBLASTIC LEUKAEMIA": "all-lymphoblasts.jpg",
    "POLYCYTHAEMIA VERA": "polycythaemia-vera.jpg",
    "PV": "polycythaemia-vera.jpg",
    "ESSENTIAL THROMBOCYTHAEMIA": "essential-thrombocythaemia.jpg",
    "ET": "essential-thrombocythaemia.jpg",
    "MYELOFIBROSIS": "myelofibrosis.jpg",
    "MF": "myelofibrosis.jpg",
    "SCHISTOCYTE": "schistocytes.jpg",
    "FRAGMENTOCYTE": "schistocytes.jpg",
    "TARGET CELL": "target-cells.jpg",
    "CODOCYTE": "target-cells.jpg",
    "BASOPHILIC STIPPLING": "basophilic-stippling.jpg",
    "HOWELL": "howell-jolly-bodies.jpg",
    "ROULEAUX": "rouleaux.jpg",
    "PENCIL CELL": "pencil-cells.jpg",
    "ELLIPTOCYTE": "pencil-cells.jpg",
    "TEAR DROP": "tear-drop-cells.jpg",
    "DACROCYTE": "tear-drop-cells.jpg",
    "HYPERSEGMENTED NEUTROPHIL": "hypersegmented-neutrophil.jpg",
    "MALARIA": "malaria-falciparum.jpg",
    "PLASMODIUM": "malaria-falciparum.jpg",
}

HEADERS = {"User-Agent": "Mozilla/5.0 (educational download; contact if needed)"}

def download_image(url: str, filepath: str) -> bool:
    """Download an image from URL to filepath."""
    try:
        r = requests.get(url, headers=HEADERS, timeout=30, stream=True)
        r.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    except Exception as e:
        print(f"  ❌ Failed: {e}")
        return False

def run():
    """Main download function."""
    json_file = "sysmex_cell_images_by_condition.json"
    
    if not os.path.exists(json_file):
        print(f"❌ Error: {json_file} not found!")
        print("Run scrape_sysmex_images.py first to generate the image index.")
        return
    
    print("🩸 Loading Sysmex image index...")
    with open(json_file, 'r', encoding='utf-8') as f:
        grouped = json.load(f)
    
    print(f"📊 Found {len(grouped)} condition groups")
    
    # Track what we want to download
    download_queue = []
    
    for condition, items in grouped.items():
        # Find matching filename
        target_filename = None
        for key, filename in FILENAME_MAP.items():
            if key in condition.upper():
                target_filename = filename
                break
        
        if not target_filename:
            continue
        
        # Skip if already exists
        if os.path.exists(target_filename):
            print(f"⏭️  {target_filename} - already exists, skipping")
            continue
        
        # Pick the best image (first one with good description)
        best_item = None
        for item in items:
            if len(item.get('description', '')) > 50:  # Has decent description
                best_item = item
                break
        
        if not best_item and items:
            best_item = items[0]  # fallback to first
        
        if best_item:
            download_queue.append({
                'condition': condition,
                'filename': target_filename,
                'url': best_item['image_url'],
                'title': best_item.get('title', '')
            })
    
    print(f"\n📥 Downloading {len(download_queue)} images...\n")
    
    success = 0
    failed = 0
    
    for i, item in enumerate(download_queue, 1):
        print(f"[{i}/{len(download_queue)}] {item['filename']}")
        print(f"  Condition: {item['condition']}")
        print(f"  Source: {item['url']}")
        
        if download_image(item['url'], item['filename']):
            file_size = os.path.getsize(item['filename']) / 1024
            print(f"  ✅ Downloaded ({file_size:.1f} KB)")
            success += 1
        else:
            failed += 1
        
        # Be polite with rate limiting
        if i < len(download_queue):
            time.sleep(1)
    
    print(f"\n{'='*60}")
    print(f"✅ Success: {success}")
    print(f"❌ Failed: {failed}")
    print(f"{'='*60}")

if __name__ == "__main__":
    run()

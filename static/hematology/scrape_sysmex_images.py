"""
Sysmex Europe Cell Images Scraper
Crawls https://www.sysmex-europe.com/academy/library/cell-images/
and categorizes images by hematological condition for educational use.
"""

import re
import json
import time
from collections import defaultdict
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE = "https://www.sysmex-europe.com"
START = f"{BASE}/academy/library/cell-images/"

# Add/adjust keywords to match your "conditions" of interest
CONDITION_PATTERNS = [
    r"essential thrombocythaemia|essential thrombocythemia|\bET\b",
    r"polycythaemia vera|polycythemia vera|\bPV\b",
    r"myelofibrosis|\bMF\b",
    r"acute myeloid leukaemia|acute myeloid leukemia|\bAML\b",
    r"chronic myeloid leukaemia|chronic myeloid leukemia|\bCML\b",
    r"acute lymphoblastic leukaemia|acute lymphoblastic leukemia|\bALL\b",
    r"CLL|chronic lymphocytic leukaemia|chronic lymphocytic leukemia",
    r"myelodysplastic|MDS",
    r"g[- ]?csf|granulocyte growth factor",
    r"malaria|plasmodium",
    r"iron deficiency|IDA",
    r"megaloblastic|B12|folate",
    r"sickle cell|HbSS",
    r"thalassaemia|thalassemia",
    r"spherocyt",
    r"schistocyte|fragmentocyte",
    r"target cell|codocyte",
    r"basophilic stippling",
    r"howell.?jolly",
    r"heinz bod",
    r"auer rod",
    r"smudge cell",
    r"rouleaux",
    r"pencil cell|elliptocyte",
    r"tear drop|dacrocyte",
    r"hypersegmented neutrophil",
]
COND_REGEX = [re.compile(pat, re.I) for pat in CONDITION_PATTERNS]

HEADERS = {"User-Agent": "Mozilla/5.0 (educational indexing; contact sysadmin if needed)"}

def fetch(url: str) -> str:
    """Fetch HTML content from URL with error handling."""
    try:
        r = requests.get(url, headers=HEADERS, timeout=30)
        r.raise_for_status()
        return r.text
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return ""

def extract_items(html: str, page_url: str):
    """Extract image items from HTML page."""
    if not html:
        return []
    
    soup = BeautifulSoup(html, "html.parser")

    # Heuristic: capture all images within the main content area.
    # You may need to tweak selectors if Sysmex updates the markup.
    main = soup.find("main") or soup
    imgs = main.find_all("img")

    # Many sites use repeated "card" structures; simplest: pair each img with nearby text.
    # We'll extract the closest heading text + the next paragraph-ish text.
    items = []
    for img in imgs:
        src = img.get("src") or ""
        if not src or "data:" in src:
            continue
        img_url = urljoin(page_url, src)

        # try to find a nearby title/description
        container = img.parent
        for _ in range(4):
            if container and container.name != "body":
                container = container.parent
        text = container.get_text(" ", strip=True) if container else ""

        # crude split: first chunk as title-ish
        title = (img.get("alt") or "").strip()
        desc = text

        # keep only entries that look like gallery items (have meaningful text)
        if len(desc) < 30 and len(title) < 3:
            continue

        items.append({"title": title, "description": desc, "image_url": img_url, "source_page": page_url})
    return items

def assign_condition(desc: str, title: str):
    """Assign a condition category based on text matching."""
    hay = f"{title} {desc}"
    for rx in COND_REGEX:
        m = rx.search(hay)
        if m:
            # normalise to matched phrase
            return m.group(0).upper()
    return "UNCLASSIFIED"

def get_last_page(html: str) -> int:
    """Determine the last page number from pagination."""
    if not html:
        return 1
    
    soup = BeautifulSoup(html, "html.parser")
    # pagination numbers appear as links; pick the max integer we can find
    nums = []
    for a in soup.find_all("a"):
        t = (a.get_text() or "").strip()
        if t.isdigit():
            nums.append(int(t))
    return max(nums) if nums else 1

def run():
    """Main scraper function."""
    print("🩸 Starting Sysmex Europe Cell Images scraper...")
    print(f"📍 Fetching from: {START}")
    
    first = fetch(START)
    if not first:
        print("❌ Failed to fetch start page. Exiting.")
        return
    
    last = get_last_page(first)
    print(f"📄 Found {last} page(s) to process")

    grouped = defaultdict(list)
    total_items = 0

    for p in range(1, last + 1):
        url = START if p == 1 else f"{START}page-{p}/"
        print(f"⏳ Processing page {p}/{last}...", end=" ")
        
        html = fetch(url)
        items = extract_items(html, url)

        for it in items:
            cond = assign_condition(it["description"], it["title"])
            grouped[cond].append(it)
            total_items += 1

        print(f"✅ Found {len(items)} images")
        time.sleep(0.5)  # be polite

    output_file = "sysmex_cell_images_by_condition.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(grouped, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Complete!")
    print(f"📊 Total images found: {total_items}")
    print(f"📁 Wrote {len(grouped)} condition groups to {output_file}")
    print(f"\nCondition breakdown:")
    for cond in sorted(grouped.keys(), key=lambda k: len(grouped[k]), reverse=True):
        print(f"  • {cond}: {len(grouped[cond])} images")

if __name__ == "__main__":
    run()

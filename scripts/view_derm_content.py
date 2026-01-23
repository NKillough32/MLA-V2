"""View dermatology extracted content"""
import json

with open('dermatology_extracted.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total pages: {len(data)}")
print("\n=== Table of Contents Analysis ===")

# Look at first 10 pages for TOC
for page_data in data[:10]:
    page_num = page_data['page']
    text = page_data['text']
    print(f"\n--- Page {page_num} ---")
    print(text[:500])
    print("...")

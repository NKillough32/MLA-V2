#!/usr/bin/env python3
"""
generate_pdf_metadata.py

Scan `static/assets/subjects.csv` and write a compact
`static/assets/pdf_metadata.json` mapping normalized keys
to metadata objects used by the client.

Run:
  python scripts/generate_pdf_metadata.py

This is intentionally dependency-free (uses stdlib only).
"""
import csv
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(__file__))
CSV_PATH = os.path.join(ROOT, 'static', 'assets', 'subjects.csv')
OUT_PATH = os.path.join(ROOT, 'static', 'assets', 'pdf_metadata.json')

def normalize_key(value):
    if not value:
        return ''
    return re.sub(r'[^a-z0-9]+', '', value.lower())

def main():
    if not os.path.exists(CSV_PATH):
        print('subjects.csv not found at', CSV_PATH)
        return 1

    metadata = {}
    with open(CSV_PATH, newline='', encoding='utf-8') as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            # Key fields in the CSV: pdf, subjectTitle, subjectTagline, keywords
            pdf_field = (row.get('pdf') or row.get('PDF') or '').strip()
            subject_title = (row.get('subjectTitle') or row.get('subjectTitle') or row.get('subjectTitle') or '').strip()
            subject_tagline = (row.get('subjectTagline') or row.get('subjectTagline') or '').strip()
            keywords_raw = (row.get('keywords') or row.get('Keywords') or '').strip()

            key = normalize_key(pdf_field or subject_title)
            if not key:
                continue

            keywords = []
            if keywords_raw:
                # CSV contains space-separated keyword tokens in many rows
                # split on whitespace but keep meaningful multi-word tags
                keywords = [k for k in re.split(r"[\s,;]+", keywords_raw) if k]

            metadata[key] = {
                'pdf': pdf_field,
                'subjectTitle': subject_title,
                'subjectTagline': subject_tagline,
                'keywords': keywords
            }

    # Write compact JSON
    with open(OUT_PATH, 'w', encoding='utf-8') as out:
        json.dump(metadata, out, ensure_ascii=False, indent=2)

    print('Wrote', OUT_PATH, 'with', len(metadata), 'entries')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())

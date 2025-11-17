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
SUBJECTS_CSV = os.path.join(ROOT, 'static', 'assets', 'subjects.csv')
CALCULATORS_CSV = os.path.join(ROOT, 'static', 'assets', 'calculators.csv')
OUT_PATH = os.path.join(ROOT, 'static', 'assets', 'pdf_metadata.json')

def normalize_key(value):
    if not value:
        return ''
    return re.sub(r'[^a-z0-9]+', '', value.lower())

def main():
    metadata = {}

    # Helper to insert/merge metadata entries, preferring non-empty fields
    def merge_entry(key, entry):
        if not key:
            return
        existing = metadata.get(key, {})
        merged = existing.copy()
        for k, v in entry.items():
            if v and (not merged.get(k)):
                merged[k] = v
        metadata[key] = merged

    # Parse subjects.csv first
    if os.path.exists(SUBJECTS_CSV):
        with open(SUBJECTS_CSV, newline='', encoding='utf-8') as fh:
            reader = csv.DictReader(fh)
            for row in reader:
                pdf_field = (row.get('pdf') or row.get('PDF') or '').strip()
                subject_title = (row.get('subjectTitle') or row.get('subjectTitle') or row.get('subjectID') or '').strip()
                subject_tagline = (row.get('subjectTagline') or row.get('subjectTagline') or '').strip()
                keywords_raw = (row.get('keywords') or row.get('Keywords') or '').strip()

                key = normalize_key(pdf_field or subject_title)
                if not key:
                    continue

                keywords = []
                if keywords_raw:
                    keywords = [k for k in re.split(r"[\s,;]+", keywords_raw) if k]

                merge_entry(key, {
                    'pdf': pdf_field,
                    'subjectTitle': subject_title,
                    'subjectTagline': subject_tagline,
                    'keywords': keywords
                })

    else:
        print('Warning: subjects.csv not found at', SUBJECTS_CSV)

    # Parse calculators.csv and prefer its title/tagline for matching form files
    if os.path.exists(CALCULATORS_CSV):
        with open(CALCULATORS_CSV, newline='', encoding='utf-8') as fh:
            reader = csv.DictReader(fh)
            for row in reader:
                # calculators.csv may use columns like 'formInfo', 'formRef', 'title', 'tagLine'
                form_info = (row.get('formInfo') or row.get('formRef') or row.get('form') or '').strip()
                title = (row.get('title') or row.get('Title') or '').strip()
                tagLine = (row.get('tagLine') or row.get('tagline') or row.get('tagLine') or '').strip()
                keywords_raw = (row.get('keywords') or row.get('Keywords') or '').strip()

                # The CSV sometimes stores raw identifiers (no extension). Normalize both forms
                candidates = set()
                if form_info:
                    candidates.add(normalize_key(form_info))
                    # also try with common suffixes
                    candidates.add(normalize_key(form_info + '.pdf'))
                if title:
                    candidates.add(normalize_key(title))

                keywords = []
                if keywords_raw:
                    keywords = [k for k in re.split(r"[\s,;]+", keywords_raw) if k]

                for key in candidates:
                    if not key:
                        continue
                    merge_entry(key, {
                        'pdf': form_info,
                        'subjectTitle': title,
                        'subjectTagline': tagLine,
                        'keywords': keywords
                    })
    else:
        print('Warning: calculators.csv not found at', CALCULATORS_CSV)

    # Write compact JSON
    with open(OUT_PATH, 'w', encoding='utf-8') as out:
        json.dump(metadata, out, ensure_ascii=False, indent=2)

    print('Wrote', OUT_PATH, 'with', len(metadata), 'entries')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())

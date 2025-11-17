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
PDFINFO_CSV = os.path.join(ROOT, 'static', 'assets', 'pdfinfo.csv')
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

    # Parse pdfinfo.csv first (authoritative)
    if os.path.exists(PDFINFO_CSV):
        with open(PDFINFO_CSV, newline='', encoding='utf-8') as fh:
            reader = csv.DictReader(fh)
            for row in reader:
                # Expected columns: filename,filetitle,fileinfo,filters
                filename_field = (row.get('filename') or row.get('pdf') or '').strip()
                filetitle = (row.get('filetitle') or row.get('subjectTitle') or '').strip()
                fileinfo = (row.get('fileinfo') or row.get('subjectTagline') or '').strip()
                filters_raw = (row.get('filters') or row.get('keywords') or '').strip()

                key = normalize_key(filename_field or filetitle)
                if not key:
                    continue

                filters = []
                if filters_raw:
                    filters = [k.strip() for k in re.split(r'[;,\|]|\s+', filters_raw) if k.strip()]

                # Use pdfinfo as authoritative values (overwrite existing)
                metadata[key] = {
                    'pdf': filename_field,
                    'subjectTitle': filetitle,
                    'subjectTagline': fileinfo,
                    'keywords': filters
                }
    else:
        print('Warning: pdfinfo.csv not found at', PDFINFO_CSV)

    # Parse subjects.csv as a fallback (only fill missing keys)
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

                # Only merge if the key does not already exist (pdfinfo authoritative)
                if key in metadata:
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

    # Parse calculators.csv as a fallback (only fill missing keys)
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
                    # Only merge if the key does not already exist
                    if key in metadata:
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

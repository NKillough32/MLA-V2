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

# A very small subset of the heuristics the UI applies when it has to guess a
# friendly name for a PDF. Pre-computing this data at build time keeps the JSON
# self-describing and avoids duplicating the same logic in multiple places.
ABBREVIATION_EXPANSIONS = {
    'AX': 'Assessment',
    'MX': 'Management',
    'DX': 'Diagnosis',
    'HX': 'History',
    'PX': 'Prophylaxis',
    'RX': 'Prescription',
    'TX': 'Treatment',
    'FX': 'Fracture',
    'IV': 'Intravenous',
    'IM': 'Intramuscular',
    'PO': 'Oral',
    'PR': 'Rectal',
    'SC': 'Subcutaneous',
    'MSK': 'Musculoskeletal',
    'CV': 'Cardiovascular',
    'GI': 'Gastrointestinal',
    'GU': 'Genitourinary',
    'ENT': 'Ear Nose Throat',
    'COPD': 'Chronic Obstructive Pulmonary Disease',
    'CHF': 'Congestive Heart Failure',
    'MI': 'Myocardial Infarction',
    'PE': 'Pulmonary Embolism',
    'DVT': 'Deep Vein Thrombosis',
    'AKI': 'Acute Kidney Injury',
    'CKD': 'Chronic Kidney Disease',
    'UTI': 'Urinary Tract Infection',
    'SOB': 'Shortness Of Breath',
    'ABG': 'Arterial Blood Gas',
    'GCS': 'Glasgow Coma Scale',
    'NIHSS': 'NIH Stroke Scale',
    'MEWS': 'Modified Early Warning Score',
    'NEWS': 'National Early Warning Score',
    'NEWS2': 'NEWS 2',
    'PHQ': 'Patient Health Questionnaire',
    'GAD': 'General Anxiety Disorder',
    'BSA': 'Body Surface Area',
    'BMI': 'Body Mass Index',
    'MAP': 'Mean Arterial Pressure',
    'LRINEC': 'LRINEC Score',
    'MELD': 'MELD Score',
    'SOFA': 'SOFA Score',
    'QSOFA': 'qSOFA Score',
    'CRP': 'C-Reactive Protein',
    'ESR': 'Erythrocyte Sedimentation Rate',
}

ALWAYS_UPPERCASE_WORDS = {
    'ABG', 'AKI', 'ALS', 'ADHD', 'BMI', 'BSA', 'CAD', 'CKD', 'COPD', 'CT', 'CXR',
    'DM', 'ECG', 'ENT', 'GI', 'GU', 'GFR', 'GCS', 'HIV', 'HTN', 'IBD', 'IBS',
    'INR', 'IV', 'MRI', 'MSK', 'NIHSS', 'NSAID', 'PE', 'PO', 'PR', 'PTT', 'PT',
    'PTA', 'PTSD', 'PVC', 'RX', 'SC', 'SOB', 'TIA', 'UTI', 'WBC', 'NEWS',
    'NEWS2', 'MEWS', 'LRINEC', 'MELD', 'SOFA', 'QSOFA'
}


def split_identifier(value):
    """Split CamelCase or snake_case identifiers into words."""
    if not value:
        return []

    text = re.sub(r'[\-_]+', ' ', value)
    text = re.sub(r'(?<=[a-z])(?=[A-Z0-9])', ' ', text)
    text = re.sub(r'(?<=[0-9])(?=[A-Za-z])', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return [chunk.strip() for chunk in text.split(' ') if chunk.strip()]


def normalize_word(word):
    cleaned = re.sub(r'[^A-Za-z0-9]', '', word)
    if not cleaned:
        return ''
    upper = cleaned.upper()
    if upper in ALWAYS_UPPERCASE_WORDS or re.fullmatch(r'[IVXLCDM]{1,4}', upper):
        return upper
    if re.fullmatch(r'\d+', cleaned):
        return cleaned
    if upper in ABBREVIATION_EXPANSIONS:
        # Return the expansion instead of the abbreviation
        return ABBREVIATION_EXPANSIONS[upper]
    return cleaned.capitalize()


def format_display_title(entry):
    """Derive a human-friendly title for metadata consumers."""
    title = (entry.get('subjectTitle') or '').strip()
    if title:
        return title

    pdf_name = (entry.get('pdf') or '').replace('.pdf', '').strip()
    parts = split_identifier(pdf_name)
    if not parts:
        return pdf_name or 'Medical Reference'

    formatted_parts = []
    for part in parts:
        normalized = normalize_word(part)
        if not normalized:
            continue
        if ' ' in normalized:
            formatted_parts.extend(normalized.split(' '))
        else:
            formatted_parts.append(normalized)
    return ' '.join(formatted_parts) if formatted_parts else pdf_name


def format_display_tagline(entry):
    tagline = (entry.get('subjectTagline') or '').strip()
    if not tagline:
        keywords = entry.get('keywords') or []
        if keywords:
            title_case = [normalize_word(k) for k in keywords[:3] if k]
            tagline = ' • '.join(filter(None, title_case))
    if not tagline:
        return ''
    tagline = tagline[0].upper() + tagline[1:]
    if tagline and tagline[-1] not in '.!?':
        tagline += '.'
    return tagline


def build_keyword_summary(keywords):
    if not keywords:
        return ''
    formatted = []
    for keyword in keywords:
        cleaned = normalize_word(keyword)
        if cleaned:
            formatted.append(cleaned)
        if len(formatted) == 4:
            break
    return ' • '.join(formatted)


def enhance_entry(entry):
    """Return a copy of ``entry`` augmented with friendly display helpers."""
    keywords = entry.get('keywords') or []
    enhanced = entry.copy()
    enhanced['subjectTitle'] = entry.get('subjectTitle', '').strip()
    enhanced['subjectTagline'] = entry.get('subjectTagline', '').strip()
    enhanced['keywords'] = keywords
    enhanced['displayTitle'] = format_display_title(enhanced)
    enhanced['displayTagline'] = format_display_tagline(enhanced)
    keyword_summary = build_keyword_summary(keywords)
    if keyword_summary:
        enhanced['keywordSummary'] = keyword_summary
    return enhanced

def normalize_key(value):
    if not value:
        return ''
    return re.sub(r'[^a-z0-9]+', '', value.lower())

def add_with_aliases(metadata, id_str, entry, overwrite=False):
    """Add an entry to metadata under the normalized id and common alias variants.
    If overwrite is True, always replace existing entries (used for authoritative csv).
    If overwrite is False, only set keys that are missing.
    """
    if not id_str:
        return
    aliases = set()
    aliases.add(normalize_key(id_str))
    aliases.add(normalize_key(id_str + '.pdf'))
    # also add variant with trailing 'pdf' removed (handles ids that already include 'pdf')
    id_no_pdf = re.sub(r'(?i)(?:\.pdf|pdf)$', '', id_str).strip()
    if id_no_pdf:
        aliases.add(normalize_key(id_no_pdf))
    # also add normalized form of any explicit pdf filename in the entry, with and without suffix
    pdfname = (entry.get('pdf') or '').strip()
    if pdfname:
        aliases.add(normalize_key(pdfname))
        pdf_no_pdf = re.sub(r'(?i)(?:\.pdf|pdf)$', '', pdfname).strip()
        if pdf_no_pdf:
            aliases.add(normalize_key(pdf_no_pdf))

    for a in aliases:
        if not a:
            continue
        if overwrite or (a not in metadata):
            metadata[a] = entry.copy()

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

                key = filename_field or filetitle
                if not key:
                    continue

                filters = []
                if filters_raw:
                    filters = [k.strip() for k in re.split(r'[;,\|]|\s+', filters_raw) if k.strip()]

                # Use pdfinfo as authoritative values (overwrite existing)
                entry = enhance_entry({
                    'pdf': filename_field,
                    'subjectTitle': filetitle,
                    'subjectTagline': fileinfo,
                    'keywords': filters
                })
                add_with_aliases(metadata, key, entry, overwrite=True)
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

                key = pdf_field or subject_title
                if not key:
                    continue

                keywords = []
                if keywords_raw:
                    keywords = [k for k in re.split(r"[\s,;]+", keywords_raw) if k]

                entry = enhance_entry({
                    'pdf': pdf_field,
                    'subjectTitle': subject_title,
                    'subjectTagline': subject_tagline,
                    'keywords': keywords
                })
                # Only add aliases for missing keys (do not overwrite authoritative pdfinfo)
                add_with_aliases(metadata, key, entry, overwrite=False)
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

                keywords = []
                if keywords_raw:
                    keywords = [k for k in re.split(r"[\s,;]+", keywords_raw) if k]

                entry = enhance_entry({
                    'pdf': form_info,
                    'subjectTitle': title,
                    'subjectTagline': tagLine,
                    'keywords': keywords
                })

                # Add aliases for the calculator form identifier/title without overwriting
                if form_info:
                    add_with_aliases(metadata, form_info, entry, overwrite=False)
                if title:
                    add_with_aliases(metadata, title, entry, overwrite=False)
    else:
        print('Warning: calculators.csv not found at', CALCULATORS_CSV)

    # Write compact JSON
    with open(OUT_PATH, 'w', encoding='utf-8') as out:
        json.dump(metadata, out, ensure_ascii=False, indent=2)

    print('Wrote', OUT_PATH, 'with', len(metadata), 'entries')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())

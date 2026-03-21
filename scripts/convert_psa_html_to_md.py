"""
Convert PSA Paper HTML files to a single Markdown file for the app.

Question types handled:
  - PRESCRIBING  (10 marks): green #009f4d — drug choice + dose scoring
  - REVIEW       (4 marks):  blue  #1556c7 — prescription review A+B table
  - MCQ          (2 marks):  all other colors
  - CALCULATION  (2 marks):  grey  #e9e9e9

Usage:
  python scripts/convert_psa_html_to_md.py [paper_folder] [output_md]
  python scripts/convert_psa_html_to_md.py "static/assets/PSA/PSA Paper 1" static/assets/PSA/psa-paper1-official.md
"""

import os
import re
import sys
from bs4 import BeautifulSoup, NavigableString

# ── helpers ────────────────────────────────────────────────────────────────

def clean(text: str) -> str:
    """Normalise whitespace and tidy HTML entities."""
    text = text.replace('\xa0', ' ').replace('&nbsp;', ' ')
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def soup_text(tag) -> str:
    """Get clean text from a BS4 tag."""
    if tag is None:
        return ''
    return clean(tag.get_text(separator=' ', strip=True))


def render_inline_html(tag) -> str:
    """Convert a BS4 tag's contents to markdown-ish text preserving sup/sub."""
    parts = []
    for child in tag.descendants:
        if isinstance(child, NavigableString):
            parts.append(str(child))
        elif child.name == 'sup':
            parts.append('^' + child.get_text())
        elif child.name == 'sub':
            parts.append('_' + child.get_text())
        elif child.name == 'strong':
            pass  # handled via NavigableString children
        elif child.name == 'em':
            pass
    result = ''.join(parts)
    result = result.replace('\xa0', ' ')
    result = re.sub(r'[ \t]+', ' ', result)
    return result.strip()


def html_to_md(tag) -> str:
    """Convert an HTML block (with <p>, <br>, <strong>, <em>) to markdown."""
    if tag is None:
        return ''
    html = str(tag)
    # Replace block tags with newlines
    html = re.sub(r'<br\s*/?>', '\n', html, flags=re.IGNORECASE)
    html = re.sub(r'</p>', '\n', html, flags=re.IGNORECASE)
    html = re.sub(r'<p[^>]*>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'<strong>(.*?)</strong>', r'**\1**', html, flags=re.IGNORECASE | re.DOTALL)
    html = re.sub(r'<em>(.*?)</em>', r'*\1*', html, flags=re.IGNORECASE | re.DOTALL)
    html = re.sub(r'<sup>(.*?)</sup>', r'^\1', html, flags=re.IGNORECASE | re.DOTALL)
    html = re.sub(r'<sub>(.*?)</sub>', r'_\1', html, flags=re.IGNORECASE | re.DOTALL)
    # Strip all remaining tags
    html = re.sub(r'<[^>]+>', '', html)
    html = html.replace('&nbsp;', ' ').replace('&#160;', ' ')
    html = html.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    html = html.replace('&sup2;', '^2').replace('&micro;', 'µ')
    lines = [l.strip() for l in html.splitlines()]
    # Collapse blanks
    out = []
    blank = False
    for l in lines:
        if l == '':
            if not blank:
                out.append('')
            blank = True
        else:
            out.append(l)
            blank = False
    return '\n'.join(out).strip()


# ── main parser ────────────────────────────────────────────────────────────

SECTION_MAP = {
    'Prescribing':            ('Prescribing',         'PRESCRIBING'),
    'Prescription Review':    ('Prescription Review', 'REVIEW'),
    'Planning Management':    ('Planning',             'MCQ'),
    'Communicating Information': ('Communicating',    'MCQ'),
    'Calculation Skills':     ('Calculation',         'CALCULATION'),
    'Adverse Drug Reaction':  ('Adverse Drug Reactions', 'MCQ'),
    'Drug Monitoring':        ('Drug Monitoring',     'MCQ'),
    'Data Interpretation':    ('Data Interpretation', 'MCQ'),
}

COLOR_TO_SECTION = {
    '#009f4d': 'Prescribing',
    '#1556c7': 'Prescription Review',
    '#a02c2c': 'Planning Management',
    '#2dc0d8': 'Communicating Information',
    '#e9e9e9': 'Calculation Skills',
    '#e4de18': 'Adverse Drug Reaction',
    '#de890c': 'Drug Monitoring',
    '#9e9797': 'Data Interpretation',
}


def parse_html_file(path: str):
    content = open(path, encoding='utf-8', errors='replace').read()
    soup = BeautifulSoup(content, 'lxml')

    # ── detect question type ────────────────────────────────────────────
    bg_input = soup.find('input', {'id': 'hdnBackgroundColor'})
    bg_color = (bg_input['value'].lower() if bg_input else '').strip()
    raw_section = COLOR_TO_SECTION.get(bg_color, 'Unknown')

    # Refine via spnItemType
    span_type = soup.find(class_='spnItemType')
    if span_type:
        t = span_type.get_text(strip=True)
        for key in SECTION_MAP:
            if key.lower() in t.lower():
                raw_section = key
                break

    section_label, md_type = SECTION_MAP.get(raw_section, (raw_section, 'MCQ'))

    # ── total score ─────────────────────────────────────────────────────
    total_score_m = re.search(r'Total Score - (\d+)/(\d+)', content)
    total_score = (int(total_score_m.group(1)), int(total_score_m.group(2))) if total_score_m else (0, 0)

    # ── case presentation ───────────────────────────────────────────────
    case_div = soup.find(class_='casePresentaion')
    if case_div is None:
        case_div = soup.find(class_=re.compile('casePresent'))
    case_html = html_to_md(case_div) if case_div else ''
    # Remove the "Case presentation" header tag if present; keep body
    case_html = re.sub(r'\*\*Case presentation\*\*\n?', '', case_html).strip()

    # ── specialty inference (simple heuristic from case text) ───────────
    prescribing_req_hint = ''
    req_div2 = soup.find(class_='prescribReq')
    if req_div2:
        prescribing_req_hint = req_div2.get_text(separator=' ', strip=True)
    q_panel2 = soup.find(class_='questionPanel')
    if q_panel2:
        prescribing_req_hint += ' ' + q_panel2.get_text(separator=' ', strip=True)
    specialty = infer_specialty(case_html, prescribing_req_hint)

    result = {
        'type': md_type,
        'section': section_label,
        'specialty': specialty,
        'total_marks': total_score[1],
        'scored_marks': total_score[0],
        'case': case_html,
    }

    if md_type == 'PRESCRIBING':
        result.update(parse_prescribing(soup, content))
    elif md_type == 'REVIEW':
        result.update(parse_review(soup, content))
    elif md_type == 'CALCULATION':
        result.update(parse_calculation(soup, content))
    else:  # MCQ
        result.update(parse_mcq(soup, content, raw_section))

    return result


def infer_specialty(case_text: str, prescribing_request: str = '') -> str:
    """Infer specialty from case text and prescribing request.
    Prioritise the prescribing request / core question over PMH background."""
    # Combine request and end of case (on examination + investigations) to get main clinical context
    main_context = (prescribing_request + ' ' + case_text).lower()
    # Split PMH/DH from the rest
    pmh_start = max(main_context.find('pmh'), main_context.find('past medical'), main_context.find('medical history'))
    pre_pmh = main_context[:pmh_start] if pmh_start > 0 else main_context
    text = pre_pmh  # focus on the non-PMH parts

    if any(w in text for w in ['pulmonary oedema', 'heart failure', 'af ', 'atrial fib', 'cardiac', 'angina', 'mi ', ' ecg ', 'stemi', 'nstemi', 'arrhythmia', 'dvt', 'thromboembolism', 'vte']):
        return 'Cardiology'
    if any(w in text for w in ['asthma', 'copd', 'respiratory', 'chest infection', 'pneumonia', 'inhaler', 'wheeze', 'breathless']):
        return 'Respiratory'
    if any(w in text for w in ['hypoglycaemia', 'hypoglycemia', 'glucose', 'insulin', 'diabetic', 'dka']):
        return 'Endocrinology'
    if any(w in text for w in ['renal', 'kidney', 'aki', 'ckd', 'dialysis', 'transplant', 'hyperkalaemia', 'hyponatraemia']):
        return 'Renal'
    if any(w in text for w in ['surgery', 'surgical', 'post-op', 'hip replacement', 'appendic', 'cholecystect', 'hysterectomy', 'thromboprophylaxis']):
        return 'Surgery'
    if any(w in text for w in ['infect', 'sepsis', 'antibiotic', 'cellulitis', 'uti ', 'urinary tract', 'heroin overdose', 'overdose']):
        return 'Infectious Disease'
    if any(w in text for w in ['liver', 'hepat', 'cirrhosis', 'jaundice', 'naloxone', 'alcohol']):
        return 'Hepatology'
    if any(w in text for w in ["parkinson", 'epilepsy', 'seizure', 'stroke', 'tia', 'neurology', 'migraine', 'dementia']):
        return 'Neurology'
    if any(w in text for w in ['psychiatr', 'depression', 'lithium', 'antidepressant', 'schizophrenia', 'bipolar', 'alcohol withdrawal']):
        return 'Psychiatry'
    if any(w in text for w in ['pregnan', 'obstetric', 'antenatal', 'caesarean', 'postnatal', 'breastfeed']):
        return 'Obstetrics'
    if any(w in text for w in ['paediatric', 'child', 'infant', 'neonatal', '12-year', '10-year', '8-year', 'ringworm', 'tinea']):
        return 'Paediatrics'
    if any(w in text for w in ['gout', 'rheumatoid', 'arthritis', 'sle ', 'lupus']):
        return 'Rheumatology'
    if any(w in text for w in ['thyroid', 'hypothyroid', 'hyperthyroid', 'adrenal', 'diabetes', 'hyperglycaemia']):
        return 'Endocrinology'
    # Fall back to full context
    full = main_context
    if any(w in full for w in ['af ', 'atrial fib', 'heart', 'cardiac', 'ecg', 'bp ', 'blood pressure']):
        return 'Cardiology'
    if any(w in full for w in ['diabetes', 'insulin', 'glucose']):
        return 'Endocrinology'
    if any(w in full for w in ['renal', 'kidney', 'creatinine']):
        return 'Renal'
    if any(w in full for w in ['asthma', 'copd', 'respiratory']):
        return 'Respiratory'
    return 'General Medicine'


# ── PRESCRIBING parser ──────────────────────────────────────────────────────

def parse_prescribing(soup, content):
    """Parse a 10-mark prescribing question with drug-choice + dose scoring."""

    # Prescribing request
    req_div = soup.find(class_='prescribReq')
    prescribing_request = ''
    if req_div:
        prescribing_request = html_to_md(req_div)
        prescribing_request = re.sub(r'\*\*Prescribing request\*\*\n?', '', prescribing_request).strip()

    # What form type (once-only / regular / fluid / GP)
    form_type = 'once-only'
    if 'regular medicines' in prescribing_request.lower():
        form_type = 'regular'
    elif 'fluid' in prescribing_request.lower() or 'infusion' in prescribing_request.lower():
        form_type = 'fluid'
    elif "gp" in prescribing_request.lower() or "outpatient" in prescribing_request.lower():
        form_type = 'gp'

    # The user's own answer (filled in by Nicholas) — shown at top of prescr form
    ans_row = soup.find(class_='answerDiv')
    user_answer = {}
    if ans_row:
        for row in ans_row.find_all(class_='pws-row'):
            fw = row.find(class_='fw-bold')
            fb = row.find(class_='feedback')
            freq_div = row.find(class_='pws-frequecy')
            if fw and (fb or freq_div):
                key = fw.get_text(strip=True).rstrip(':').strip()
                val = fb.get_text(strip=True) if fb else (freq_div.get_text(strip=True) if freq_div else '')
                user_answer[key] = val

    # Feedback panel
    fb_panel = soup.find(class_='feedback-panel')
    drug_choice_fb = ''
    dose_fb = ''
    drug_score_text = ''
    dose_score_text = ''

    if fb_panel:
        # Extract Drug Group Score / Medicine-Dose-Route score texts
        score_divs = soup.find_all(class_='scoreDiv')
        for sd in score_divs:
            txt = sd.get_text(' ', strip=True)
            if 'Drug Group Score' in txt:
                m = re.search(r'Drug Group Score\s*[-–]\s*(\d+)/(\d+)', txt)
                if m:
                    drug_score_text = f"{m.group(1)}/{m.group(2)}"
            elif 'Medicine/Dose/Route' in txt or 'Medicine/dose' in txt.lower():
                m = re.search(r'(\d+)/(\d+)', txt)
                if m:
                    dose_score_text = f"{m.group(1)}/{m.group(2)}"

        # Drug choice feedback
        for p in fb_panel.find_all('p'):
            prev = p.find_previous_sibling()
            prev_txt = soup_text(prev) if prev else ''
            # The first two paragraphs after "Drug choice feedback:" and "Medicine/Dose/Route feedback:"
        # We use text-content scan for the two feedback spans
        all_spans = fb_panel.find_all('span', class_='card-title')
        capture_drug = False
        capture_dose = False
        for span in all_spans:
            txt = span.get_text(strip=True)
            if 'Drug choice feedback' in txt or 'Drug Choice feedback' in txt:
                capture_drug = True
                capture_dose = False
                continue
            if 'Medicine/Dose/Route feedback' in txt or 'Medicine/dose/route' in txt.lower():
                capture_dose = True
                capture_drug = False
                continue
            # Once we hit Optimal Answers or another header, stop
            if 'Optimal' in txt or 'optimal' in txt:
                capture_drug = False
                capture_dose = False

        # Better: extract by looking for the paragraphs following each header span
        fb_body = fb_panel.find(class_='panel-body')
        if fb_body:
            spans = fb_body.find_all('span', class_='card-title')
            for i, span in enumerate(spans):
                txt = span.get_text(strip=True)
                if 'Drug choice feedback' in txt or 'Drug Choice' in txt:
                    p = span.find_next_sibling('p')
                    if p:
                        drug_choice_fb = html_to_md(p)
                elif ('Medicine/Dose' in txt or 'Medicine/dose' in txt):
                    p = span.find_next_sibling('p')
                    if p:
                        dose_fb = html_to_md(p)

    # Optimal answers: each div.feedback-optimal-answer = one drug group
    optimal_groups = []
    for opt_div in soup.find_all(class_='feedback-optimal-answer'):
        spans = opt_div.find_all('span', class_='card-title')
        if not spans:
            continue
        group = {
            'drug': soup_text(spans[0]),
            'drug_feedback': '',
            'dose_options': [],
        }
        # First paragraph after first span = drug choice justification
        first_p = spans[0].find_next_sibling('p')
        if first_p:
            group['drug_feedback'] = html_to_md(first_p)

        # Remaining span/p pairs = dose/route options
        for j in range(1, len(spans)):
            dose_text = soup_text(spans[j])
            dose_p = spans[j].find_next_sibling('p')
            dose_fdbk = html_to_md(dose_p) if dose_p else ''
            group['dose_options'].append({'dose': dose_text, 'feedback': dose_fdbk})

        optimal_groups.append(group)

    return {
        'prescribing_request': prescribing_request,
        'form_type': form_type,
        'drug_score': drug_score_text,
        'dose_score': dose_score_text,
        'drug_choice_feedback': drug_choice_fb,
        'dose_feedback': dose_fb,
        'optimal_groups': optimal_groups,
        'user_answer': user_answer,
    }


# ── REVIEW parser ────────────────────────────────────────────────────────────

def parse_review(soup, content):
    """Parse a 4-mark prescription-review question (Q_A + Q_B drug table)."""
    # Questions A and B
    q_panels = soup.find_all(class_='questionPanel')
    question_a = ''
    question_b = ''
    for qp in q_panels:
        txt = html_to_md(qp)
        txt = re.sub(r'\*\*Question A\*\*\s*', '', txt)
        txt = re.sub(r'\*\*Question B\*\*\s*', '', txt)
        if 'question a' in soup_text(qp).lower() or (question_a == '' and 'column a' in soup_text(qp).lower()):
            question_a = txt.strip()
        elif 'question b' in soup_text(qp).lower() or 'column b' in soup_text(qp).lower():
            question_b = txt.strip()

    # Drug table
    drug_table = []
    table = soup.find('table')
    if table:
        headers = [th.get_text(strip=True) for th in table.find_all('th')]
        for tr in table.find_all('tr', class_='inputTextRow'):
            tds = tr.find_all('td')
            row = {}
            for i, td in enumerate(tds):
                if i < len(headers):
                    row[headers[i]] = td.get_text(strip=True)
                    row[f'_class_{i}'] = ' '.join(td.get('class', []))
            # detect correct A / correct B
            row['correct_A'] = False
            row['correct_B'] = False
            # Actually check td's classes directly
            td_classes = [td.get('class', []) for td in tds]
            if 'A' in headers:
                a_idx = headers.index('A')
                if a_idx < len(td_classes):
                    a_cls = td_classes[a_idx]
                    row['correct_A'] = 'correct-answer' in a_cls or 'desired-answer' in a_cls
            if 'B' in headers:
                b_idx = headers.index('B')
                if b_idx < len(td_classes):
                    b_cls = td_classes[b_idx]
                    row['correct_B'] = 'correct-answer' in b_cls or 'desired-answer' in b_cls
            drug_table.append(row)

    # Feedback
    fb_panel = soup.find(class_='feedback-panel')
    feedback_a = ''
    feedback_b = ''
    correct_a_text = ''
    correct_b_text = ''
    if fb_panel:
        opt_divs = fb_panel.find_all(class_='feedback-optimal-answer')
        for od in opt_divs:
            spans = od.find_all('span', class_='card-title')
            paragraphs = od.find_all('p')
            if not spans:
                continue
            label = soup_text(spans[0])
            if label == 'Question A':
                if paragraphs:
                    correct_a_text = clean(paragraphs[0].get_text())
                if len(spans) > 1 and soup_text(spans[1]) == 'Feedback':
                    p = spans[1].find_next_sibling('p')
                    feedback_a = html_to_md(p) if p else ''
            elif label == 'Question B':
                if paragraphs:
                    correct_b_text = clean(paragraphs[0].get_text())
                if len(spans) > 1 and soup_text(spans[1]) == 'Feedback':
                    p = spans[1].find_next_sibling('p')
                    feedback_b = html_to_md(p) if p else ''

    return {
        'question_a': question_a,
        'question_b': question_b,
        'drug_table': drug_table,
        'correct_a_text': correct_a_text,
        'correct_b_text': correct_b_text,
        'feedback_a': feedback_a,
        'feedback_b': feedback_b,
    }


# ── MCQ parser ─────────────────────────────────────────────────────────────

def parse_mcq(soup, content, raw_section):
    """Parse a 2-mark MCQ question."""
    # Question stem
    q_panel = soup.find(class_='questionPanel')
    question_text = ''
    if q_panel:
        question_text = html_to_md(q_panel)
        question_text = re.sub(r'\*\*Question\*\*\n?', '', question_text).strip()

    # Options from table rows
    options = []
    correct_idx = -1
    option_feedbacks = []

    for i, tr in enumerate(soup.find_all('tr', class_='inputTextRow')):
        td = tr.find('td')
        if td is None:
            continue
        opt_text = clean(td.get_text())
        # Remove the "F" option-feedback button text
        opt_text = re.sub(r'\s*F\s*$', '', opt_text).strip()
        td_classes_list = td.get('class', [])
        td_classes = ' '.join(td_classes_list)
        is_correct = 'correct-answer' in td_classes_list or 'desired-answer' in td_classes_list
        is_incorrect_answered = 'incorrect-answered' in td_classes_list
        options.append({'text': opt_text, 'correct': is_correct, 'chosen_wrong': is_incorrect_answered})
        if is_correct:
            correct_idx = i

        # Option-level feedback
        fb_id = None
        fb_btn = tr.find(class_='option_feedback_button')
        if fb_btn:
            fb_id = fb_btn.get('data-feedback_id')
        if fb_id:
            fb_div = soup.find('div', {'id': f'div_{fb_id}'})
            if fb_div:
                option_feedbacks.append(html_to_md(fb_div.find('div', class_='panel-body')))
            else:
                option_feedbacks.append('')
        else:
            option_feedbacks.append('')

    # Overall feedback
    fb_panel = soup.find(class_='feedback-panel')
    overall_feedback = ''
    if fb_panel:
        # look for correct answer rationale paragraph
        paragraphs = fb_panel.find_all('p')
        for p in paragraphs:
            txt = p.get_text(strip=True)
            if txt:
                overall_feedback = html_to_md(p)
                break

    return {
        'question_text': question_text,
        'options': options,
        'correct_idx': correct_idx,
        'option_feedbacks': option_feedbacks,
        'overall_feedback': overall_feedback,
    }


# ── CALCULATION parser ────────────────────────────────────────────────────

def parse_calculation(soup, content):
    """Parse a 2-mark calculation question."""
    # Question
    q_panel = soup.find(class_='questionPanel')
    question_text = ''
    if q_panel:
        question_text = html_to_md(q_panel)
        question_text = re.sub(r'\*\*Calculation\*\*\n?', '', question_text).strip()

    # Answer and unit
    ans_div = soup.find(class_='answerDiv')
    answer = ''
    unit = ''
    if ans_div:
        cal_box = ans_div.find(class_='calBox')
        if cal_box:
            answer = cal_box.get_text(strip=True)
        fw = ans_div.find(class_='fw-bold')
        if fw:
            unit = fw.get_text(strip=True)

    # Feedback / working
    fb_panel = soup.find(class_='feedback-panel')
    working = ''
    if fb_panel:
        paragraphs = fb_panel.find_all('p')
        for p in paragraphs:
            txt = p.get_text(strip=True)
            if txt:
                working += html_to_md(p) + '\n\n'
        working = working.strip()

    return {
        'question_text': question_text,
        'answer': answer,
        'unit': unit,
        'working': working,
    }


# ── MD renderer ────────────────────────────────────────────────────────────

OPTION_LETTERS = 'ABCDEFGHIJ'


def render_md(q_num: int, data: dict) -> str:
    lines = []
    md_type = data['type']
    section = data['section']
    specialty = data['specialty']
    total_marks = data['total_marks']
    case = data['case']

    # ── header ──────────────────────────────────────────────────────────
    lines.append(f"### Q{q_num} | {md_type} | {section} | {specialty}")
    lines.append('')

    # marks note
    if md_type == 'PRESCRIBING':
        lines.append(f"DRUG_MARKS: 5")
        lines.append(f"DOSE_MARKS: 5")
    elif md_type == 'REVIEW':
        lines.append(f"MARKS_A: 2")
        lines.append(f"MARKS_B: 2")
    elif md_type == 'CALCULATION':
        lines.append(f"MARKS: 2")
    else:
        lines.append(f"MARKS: 2")
    lines.append('')

    # ── case presentation ────────────────────────────────────────────────
    if case:
        lines.append("**Case presentation**")
        lines.append(case)
        lines.append('')

    # ── type-specific body ───────────────────────────────────────────────
    if md_type == 'PRESCRIBING':
        lines += render_prescribing(data)
    elif md_type == 'REVIEW':
        lines += render_review(data)
    elif md_type == 'CALCULATION':
        lines += render_calculation(data)
    else:
        lines += render_mcq(data)

    lines.append('')
    lines.append('---')
    lines.append('')
    return '\n'.join(lines)


def format_dose_with_scores(dose_text: str) -> list:
    """Parse dose strings that contain semicolon-separated options with (N) scores."""
    if ';' not in dose_text or not re.search(r'\(\d\)', dose_text):
        return [f"  DOSE: {dose_text}"]

    parts = [p.strip().rstrip(';').strip() for p in dose_text.split(';') if p.strip()]
    result_lines = []
    volume_prefix = ''

    for part in parts:
        m = re.search(r'\((\d)\)\s*$', part)
        score = int(m.group(1)) if m else None
        part_clean = re.sub(r'\s*\(\d\)\s*$', '', part).strip()

        # Extract volume prefix from first part (e.g. "150 mL")
        if not volume_prefix:
            vol_m = re.match(r'^(\d+\s*(?:mL|mg|g|units|micrograms?)\s+)(over\s+.*)', part_clean, re.IGNORECASE)
            if vol_m:
                volume_prefix = vol_m.group(1)
        elif re.match(r'^over\s+', part_clean, re.IGNORECASE) and volume_prefix:
            # Duration-only part — prepend volume
            part_clean = volume_prefix + part_clean

        score_str = f" [{score}/5]" if score is not None else ''
        result_lines.append(f"  DOSE: {part_clean}{score_str}")

    return result_lines


def render_prescribing(data) -> list:
    lines = []
    req = data.get('prescribing_request', '')
    if req:
        lines.append("**Prescribing request**")
        lines.append(req)
        lines.append('')

    # Drug choice feedback (explains scoring tiers)
    dc_fb = data.get('drug_choice_feedback', '')
    dose_fb = data.get('dose_feedback', '')
    if dc_fb:
        lines.append("**Drug choice**")
        for l in dc_fb.splitlines():
            lines.append(f"> {l}" if l.strip() else '>')
        lines.append('')
    if dose_fb:
        lines.append("**Dose / route / frequency**")
        for l in dose_fb.splitlines():
            lines.append(f"> {l}" if l.strip() else '>')
        lines.append('')

    # Optimal answers
    optimal_groups = data.get('optimal_groups', [])
    if optimal_groups:
        lines.append("**Optimal answers**")
        lines.append('')
        for grp in optimal_groups:
            drug = grp.get('drug', '')
            dose_opts = grp.get('dose_options', [])

            lines.append(f"DRUG_OPTION: {drug}")
            if dose_opts:
                for d in dose_opts:
                    d_text = d.get('dose', '').strip()
                    if d_text:
                        lines.extend(format_dose_with_scores(d_text))
            lines.append('')

    return lines


def render_review(data) -> list:
    lines = []
    qa = data.get('question_a', '')
    qb = data.get('question_b', '')
    table = data.get('drug_table', [])
    correct_a = data.get('correct_a_text', '')
    correct_b = data.get('correct_b_text', '')
    fb_a = data.get('feedback_a', '')
    fb_b = data.get('feedback_b', '')

    lines.append(f"**Part A:** {qa}")
    lines.append('')
    lines.append(f"**Part B:** {qb}")
    lines.append('')

    if table:
        col_keys = [k for k in table[0].keys() if not k.startswith('_') and k not in ('correct_A', 'correct_B')]
        header = '| ' + ' | '.join(col_keys) + ' |'
        sep = '| ' + ' | '.join(['---'] * len(col_keys)) + ' |'
        lines.append(header)
        lines.append(sep)
        for row in table:
            cells = []
            for k in col_keys:
                v = row.get(k, '')
                if k == 'A' and row.get('correct_A'):
                    v = '✓'
                elif k == 'B' and row.get('correct_B'):
                    v = '✓'
                cells.append(v)
            lines.append('| ' + ' | '.join(cells) + ' |')
        lines.append('')

    if correct_a:
        lines.append(f"CORRECT_A: {correct_a}")
    if correct_b:
        lines.append(f"CORRECT_B: {correct_b}")
    lines.append('')

    if fb_a:
        lines.append(f"> **Feedback A:** {fb_a}")
        lines.append('')
    if fb_b:
        lines.append(f"> **Feedback B:** {fb_b}")
        lines.append('')

    return lines


def render_mcq(data) -> list:
    lines = []
    qt = data.get('question_text', '')
    options = data.get('options', [])
    correct_idx = data.get('correct_idx', -1)
    opt_fbs = data.get('option_feedbacks', [])
    overall_fb = data.get('overall_feedback', '')

    if qt:
        lines.append(f"**Question**")
        lines.append(qt)
        lines.append('')

    for i, opt in enumerate(options):
        letter = OPTION_LETTERS[i] if i < len(OPTION_LETTERS) else str(i + 1)
        tick = ' ✓' if opt.get('correct') else ''
        lines.append(f"{letter}. {opt['text']}{tick}")
    lines.append('')

    # Option feedback as quote blocks
    for i, fb in enumerate(opt_fbs):
        if fb:
            letter = OPTION_LETTERS[i] if i < len(OPTION_LETTERS) else str(i + 1)
            lines.append(f"> **{letter}:** {fb}")
    lines.append('')

    return lines


def render_calculation(data) -> list:
    lines = []
    qt = data.get('question_text', '')
    answer = data.get('answer', '')
    unit = data.get('unit', '')
    working = data.get('working', '')

    if qt:
        lines.append(f"**Question**")
        lines.append(qt)
        lines.append('')

    if answer:
        lines.append(f"ANSWER: {answer}")
    if unit:
        lines.append(f"UNIT: {unit}")
    lines.append('')

    if working:
        lines.append("WORKING:")
        for l in working.splitlines():
            lines.append(f"> {l}" if l.strip() else '>')
        lines.append('')

    return lines


# ── entry point ─────────────────────────────────────────────────────────────

def main():
    folder = sys.argv[1] if len(sys.argv) > 1 else 'static/assets/PSA/PSA Paper 1'
    output = sys.argv[2] if len(sys.argv) > 2 else 'static/assets/PSA/psa-paper1-official.md'

    # Infer paper title from folder name
    folder_name = os.path.basename(folder.rstrip('/\\'))
    paper_title = f"PSA {folder_name} (Official)" if folder_name.lower().startswith('psa') else f"PSA {folder_name} (Official)"

    # Determine question number from filename
    def get_q_num(fname):
        # Handles: "1.html", "PSA Assessment.html", "PSA Assessment2.html", "Assessment.html", "Assessment2.html"
        m = re.search(r'Assessment(\d+)\.html$', fname, re.IGNORECASE)
        if m:
            return int(m.group(1))
        if re.search(r'Assessment\.html$', fname, re.IGNORECASE):
            return 1
        m2 = re.match(r'^(\d+)\.html$', fname)
        if m2:
            return int(m2.group(1))
        return 999

    html_files = sorted(
        [f for f in os.listdir(folder) if f.endswith('.html')],
        key=get_q_num
    )

    print(f"Processing {len(html_files)} HTML files from: {folder}")

    # YAML frontmatter
    header = f"""---
title: {paper_title}
source: prescribingsafetyassessment.ac.uk
total_marks: 100
questions: 30
sections:
  - Prescribing (4 × 10 marks)
  - Prescription Review (4 × 4 marks)
  - Planning Management (4 × 2 marks)
  - Communicating Information (3 × 2 marks)
  - Calculation Skills (4 × 2 marks)
  - Adverse Drug Reactions (4 × 2 marks)
  - Drug Monitoring (4 × 2 marks)
  - Data Interpretation (3 × 2 marks)
---

"""

    md_parts = [header]
    counts = {}

    for fname in html_files:
        q_num = get_q_num(fname)
        path = os.path.join(folder, fname)
        try:
            data = parse_html_file(path)
            md = render_md(q_num, data)
            md_parts.append(md)
            t = data['type']
            counts[t] = counts.get(t, 0) + 1
            print(f"  Q{q_num} [{data['type']:<12}] {data['section']} | {data['specialty']} | {data['total_marks']} marks")
        except Exception as e:
            import traceback
            print(f"  ERROR in {fname}: {e}")
            traceback.print_exc()

    full_md = '\n'.join(md_parts)
    os.makedirs(os.path.dirname(output), exist_ok=True)
    with open(output, 'w', encoding='utf-8') as f:
        f.write(full_md)

    total_lines = full_md.count('\n')
    print(f"\nWritten {total_lines} lines -> {output}")
    print("Type counts:", counts)


if __name__ == '__main__':
    main()

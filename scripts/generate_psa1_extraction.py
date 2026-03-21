"""
PSA 1 2026 extractor — 91-slide version (March 2026 update).

The new PPTX has a different structure from the original 135-slide version:
- Calc slides: each slide now contains BOTH Q and A text
- Prescribing slides: mix of Q+A (A1–A7) and Q-only slides (answers on image)
- Review slides: fully answered Q+A with medicine tables
- MCQ slides: fully answered Q+A with option lists

Writes: static/assets/PSA/psa1_extracted.md
"""
import zipfile, re

PPTX = "static/assets/PSA/PSA 1 2026.pptx"
OUT  = "static/assets/PSA/psa1_extracted.md"

# ---------------------------------------------------------------------------
# Per-slide type map (91 slides total)
# CALC_EX  = worked example (calc section)
# CALC_QA  = calc question + answer on same slide
# PRESC_QA = prescribing question + answer extractable from text
# PRESC_Q  = prescribing question only (answer is on prescription form image)
# REVIEW   = prescription review (Q+A with medicine table)
# MCQ      = multiple-choice question (Q+A with options)
# TEMPLATE = blank form template slide (skip)
# SKIP     = duplicate slide (skip)
# ---------------------------------------------------------------------------
SLIDE_TYPE = {
    # ── CALC SECTION (slides 1–36) ────────────────────────────────────────
    1:  "CALC_EX",    # Example 1: gentamicin 5mg/kg
    2:  "CALC_QA",    # A1: co-amoxiclav max dose → 0.125g
    3:  "CALC_QA",    # A2: ibuprofen divided → 240mg
    4:  "CALC_QA",    # isotretinoin 500mcg/kg → 0.015g per dose
    5:  "CALC_EX",    # Example 2: cyclizine 0.18ml
    6:  "CALC_QA",    # A3: lorazepam 25mcg/kg → 0.4ml
    7:  "CALC_QA",    # A4: drug B BSA → 0.75ml
    8:  "CALC_EX",    # Example 3: drug B 1:2 dilution → 640ml
    9:  "CALC_QA",    # A5: drug B 110mcg/kg → 44ml
    10: "CALC_EX",    # Example 4: glucose dilution → 35ml
    11: "CALC_QA",    # A6: drug B NaCl dilution → 9.8ml
    12: "CALC_QA",    # drug B 5mcg/kg 1:10 → 10ml
    13: "CALC_QA",    # drug B 100mcg/kg → 1mg/ml → 8ml
    14: "CALC_QA",    # drug B 5mg/kg 1:20 → 1600ml
    15: "CALC_QA",    # drug B 100mg powder → 10mg/ml → 10ml
    16: "CALC_EX",    # Example 5: drug B rate 5mcg/kg/min → 12ml/h
    17: "CALC_QA",    # A7: drug B 0.5mg/kg/h → 8ml/h
    18: "CALC_EX",    # Example 6: drug B mins → 100 mins
    19: "CALC_QA",    # A8: drug B 1.2g → 1h
    20: "CALC_QA",    # drug B 200ng/kg/min → 19.2ml/h
    21: "CALC_QA",    # drug B 0.001mg/kg/min → 24ml/h
    22: "CALC_QA",    # drug B 0.2mcg/kg/min → 7.68ml/h
    23: "CALC_QA",    # drug B two-phase → 68 mins
    24: "CALC_QA",    # A9: lidocaine 0.5% 10ml → 50mg
    25: "CALC_QA",    # atropine 1% 0.1ml → 1mg
    26: "CALC_QA",    # A10: adrenaline 1:1000 1.5ml → 1.5mg
    27: "CALC_QA",    # adrenaline 1:10,000 35ml → 3.5mg
    28: "CALC_EX",    # Example 7: lidocaine max dose → 18ml
    29: "CALC_QA",    # A11: lidocaine 2% → 1.5ml
    30: "CALC_QA",    # A12: drug B vials 7 days → 70
    31: "CALC_QA",    # A13: drug B bottles 6 weeks → 9
    32: "CALC_QA",    # reducing dose 5mg packs → 6
    33: "CALC_QA",    # uptitration 3yo 13kg → 2 bottles
    34: "CALC_QA",    # A14: FerroEss conversion → 15ml
    35: "CALC_QA",    # A15: morphine syringe driver → 2.92ml/h
    36: "CALC_QA",    # alfacalcidol 50ng/kg 5yo → 9 drops
    # ── PRESCRIBING SECTION (slides 37–65) ───────────────────────────────
    37: "PRESC_QA",   # A1: 66yo hypovolaemia → NaCl 0.9% 500ml 10 mins
    38: "PRESC_QA",   # A2: 73yo hypoglycaemia → glucose 20% 100ml 15 mins
    39: "PRESC_QA",   # A3: 67yo hypercalcaemia → NaCl 0.9% 1000ml 4h
    40: "PRESC_QA",   # A4: 87yo K 2.7 → NaCl 0.9%/KCl 0.3% 1000ml 4h
    41: "PRESC_QA",   # A5: 45yo NBM appendicectomy → maintenance 1000ml 8-12h
    42: "PRESC_Q",    # Q: 60yo COPD pre-op Na 140 (paired Q for A6)
    43: "PRESC_QA",   # A6: 60yo COPD pre-op → glucose 5%/KCl 0.15% 1000ml 8-12h
    44: "PRESC_QA",   # A7: 21yo gastroenteritis K 3.4 → NaCl 0.9%/KCl 0.3% 1000ml 4-6h
    45: "PRESC_Q",    # Q: 82yo stroke NBM Na 145 (answer on image)
    46: "SKIP",       # duplicate of 42/43 COPD case
    47: "PRESC_Q",    # Q: 6yo asthma BP 80/52 haemodynamic shock (answer on image)
    48: "PRESC_Q",    # Q: 9yo post-op ileus NBM (answer on image)
    49: "TEMPLATE",   # blank once-only form template
    50: "TEMPLATE",   # blank regular medicines form template
    51: "TEMPLATE",   # blank GP form template
    52: "PRESC_Q",    # A8: 6yo acute severe asthma (answer on image)
    53: "PRESC_Q",    # Q: 72yo COPD exacerbation (answer on image)
    54: "SKIP",       # duplicate of slide 53
    55: "PRESC_Q",    # Q: 76yo APO bilateral crackles (answer on image)
    56: "SKIP",       # duplicate of slide 55
    57: "PRESC_Q",    # Q: 44yo Addisonian crisis (answer on image)
    58: "SKIP",       # duplicate of slide 57
    59: "PRESC_Q",    # Q: 79yo confirmed DVT (answer on image)
    60: "PRESC_Q",    # Q: 44yo post-appendicectomy pain (answer on image)
    61: "PRESC_Q",    # Q: 46yo Parkinson's PONV (answer on image)
    62: "PRESC_Q",    # Q: 26yo Ca 1.2 post-transfusion (answer on image)
    63: "SKIP",       # duplicate of slide 62
    64: "PRESC_Q",    # Q: 91yo K 6.7 ECG changes (answer on image)
    65: "SKIP",       # duplicate of slide 64
    # ── PRESCRIPTION REVIEW SECTION (slides 66–75) ───────────────────────
    66: "REVIEW",     # A1: levothyroxine units + frequency errors
    67: "REVIEW",     # A2: escitalopram/nebivolol/omeprazole + clotrimazole route
    68: "REVIEW",     # A3: digoxin/prednisolone/tiotropium + risperidone route
    69: "REVIEW",     # A4: insulin lispro/detemir error + furosemide/indapamide gout
    70: "REVIEW",     # A5: co-amoxiclav C.diff + hold amlodipine/bisoprolol/ibuprofen
    71: "REVIEW",     # A6: amoxicillin/Symbicort oral candidiasis + dalteparin stop
    72: "REVIEW",     # A7: metformin units + canagliflozin euDKA
    73: "REVIEW",     # A8: zopiclone 75mg dosing error + amitriptyline/ondansetron/sertraline QT
    74: "REVIEW",     # A9: metoclopramide/olanzapine worsen PD + galactorrhoea
    75: "REVIEW",     # A10: candesartan/gentamicin/naproxen renal + simvastatin hepatic
    # ── MCQ SECTIONS (slides 76–91) ──────────────────────────────────────
    76: "MCQ",        # Planning A1: bacterial vaginosis → metronidazole
    77: "MCQ",        # Planning A2: paracetamol OD → NAC
    78: "MCQ",        # Planning A3: cancer pain → fentanyl 75 patch
    79: "MCQ",        # Planning A4: shingles → aciclovir 800mg 5x/day
    80: "MCQ",        # Communicating A5: clozapine → don't stop abruptly
    81: "MCQ",        # Communicating A6: warfarin → blood in urine
    82: "MCQ",        # Communicating A7: isotretinoin → two forms contraception
    83: "MCQ",        # ADR A8: opioid overdose → naloxone + O2
    84: "MCQ",        # ADR A9: ciprofloxacin → tendonitis
    85: "MCQ",        # ADR A10: metoclopramide → oculogyric crisis → procyclidine
    86: "MCQ",        # ADR A11: tamsulosin → floppy iris syndrome
    87: "MCQ",        # Monitoring A12: fenofibrate → LFTs
    88: "MCQ",        # Monitoring A13: prednisolone → growth monitoring
    89: "MCQ",        # Monitoring A14: lithium → thyroid function
    90: "MCQ",        # Data A15: warfarin INR 5.2 → phytomenadione 1-3mg PO
    91: "MCQ",        # Data A16: eGFR 9 co-amoxiclav → dose reduction
}


# ---------------------------------------------------------------------------
# Text extraction
# ---------------------------------------------------------------------------
def get_slide_texts(path):
    with zipfile.ZipFile(path, "r") as z:
        files = sorted(
            [f for f in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml", f)],
            key=lambda x: int(re.search(r"(\d+)", x.split("/")[-1]).group()),
        )
        result = []
        for idx, sf in enumerate(files, 1):
            xml = z.read(sf).decode("utf-8", errors="ignore")
            runs = re.findall(r"<a:t[^>]*>([^<]+)</a:t>", xml)
            text = " ".join(t.strip() for t in runs if t.strip())
            text = (text.replace("&amp;", "&").replace("&lt;", "<")
                        .replace("&gt;", ">")
                        .replace("\u2713", "✓").replace("\u2714", "✓"))
            text = re.sub(r"\s+", " ", text).strip()
            result.append((idx, text))
    return result


# ---------------------------------------------------------------------------
# Calc extraction helpers
# ---------------------------------------------------------------------------
CALC_CATEGORY_KW = (
    r"Maximal|Volumes|Rates|Dilutions|Percentages|Ratios|Conversions"
    r"|'?How many|'?How much|Steps:|EXAMPLE"
)

def extract_calc_parts(text):
    """Parse a calc Q+A slide that contains both question and answer."""
    parts = {}

    # Unit from "Answer [unit]" at start of slide
    unit_m = re.match(r"Answer\s+(\S+)", text)
    parts["unit"] = unit_m.group(1) if unit_m else ""

    # Answer number: the value that appears just before a category keyword or A-label
    ans_m = re.search(
        r"([\d]+(?:\.\d+)?)\s+(?:" + CALC_CATEGORY_KW + r"|A\d+\b|\bA\b)",
        text
    )
    parts["answer"] = ans_m.group(1) if ans_m else ""

    # Working text: everything between the unit and the answer number
    if unit_m and ans_m:
        parts["working"] = text[unit_m.end():ans_m.start()].strip()
    else:
        parts["working"] = ""

    # Pptx label (A1, A2 … or bare A or nothing)
    label_end = ans_m.end() if ans_m else 0
    label_m = re.search(r"\bA(\d+)\b", text[:label_end + 60] if label_end else text[:200])
    parts["label"] = f"A{label_m.group(1)}" if label_m else ""

    # Case presentation text
    case_m = re.search(r"Case presentation\s+(.+?)(?:Prescribing request|$)", text, re.S)
    parts["case"] = re.sub(r"\s+", " ", case_m.group(1)).strip() if case_m else ""

    # Prescribing request (question)
    req_m = re.search(
        r"Prescribing request\s+(.+?)(?:\(write your answer|\(write answer|Calculation Skills|$)",
        text, re.S
    )
    parts["request"] = re.sub(r"\s+", " ", req_m.group(1)).strip() if req_m else ""

    # Category tag at end
    cat_m = re.search(r"Calculation Skills 2 marks\s*(.*?)$", text)
    parts["category"] = cat_m.group(1).strip() if cat_m else ""

    return parts


def extract_example_parts(text):
    """Parse a worked-example calc slide."""
    parts = {}
    unit_m = re.match(r"Answer\s+(\S+)", text)
    parts["unit"] = unit_m.group(1) if unit_m else ""
    # example number
    ex_m = re.search(r"EXAMPLE\s+(\d+)", text)
    parts["example_num"] = ex_m.group(1) if ex_m else "?"
    # answer value (before EXAMPLE or end of working)
    ans_m = re.search(r"([\d]+(?:\.\d+)?)\s+(?:" + CALC_CATEGORY_KW + r")", text)
    parts["answer"] = ans_m.group(1) if ans_m else ""
    # case + request
    case_m = re.search(r"Case presentation\s+(.+?)(?:Prescribing request|$)", text, re.S)
    parts["case"] = re.sub(r"\s+", " ", case_m.group(1)).strip() if case_m else ""
    req_m = re.search(
        r"Prescribing request\s+(.+?)(?:\(write your answer|\(write answer|Calculation Skills|$)",
        text, re.S
    )
    parts["request"] = re.sub(r"\s+", " ", req_m.group(1)).strip() if req_m else ""
    return parts


# ---------------------------------------------------------------------------
# Prescribing extraction helpers
# ---------------------------------------------------------------------------

FLUID_PATTERN = re.compile(
    r"((?:sodium chloride|glucose|potassium chloride|sodium chloride 0\.9%|"
    r"glucose 5%|glucose 10%|glucose 20%|glucose 50%)"
    r"[\s\w%/\\.]+?)\s+(\d+\s*ml)\s+([\w\s/\-()]+?)(?=\s*(?:Case|Prescribing|Spot|A\d|$))",
    re.I
)


def extract_presc_answer(text):
    """Extract pre-filled prescribing answer from PRESC_QA slide text."""
    # Try fluid pattern
    m = FLUID_PATTERN.search(text)
    if m:
        return f"{m.group(1).strip()} | {m.group(2).strip()} | {m.group(3).strip()}"
    # Fallback: look for drug + volume + time between header and case
    before_case = text.split("Case presentation")[0] if "Case presentation" in text else text[:400]
    after_date = re.split(r"\d{2}/\d{2}/\d{4}", before_case)[-1].strip()
    if after_date and len(after_date) > 5:
        return after_date[:200]
    # Also check between investigations and "Prescribing request"
    inv_split = re.split(r"(capillary glucose[\d.\s]+|Abdomen SNT[^.]*\.)", text)
    if len(inv_split) >= 3:
        middle = inv_split[-2]  # segment after investigations
        presc_idx = text.find("Prescribing request")
        if presc_idx > 0:
            between = text[text.find(middle):presc_idx].strip()
            between = re.sub(r"^[^a-zA-Z]+", "", between)
            if 5 < len(between) < 200:
                return between
    return None


def extract_presc_parts(text):
    """Extract case and request from any prescribing slide."""
    parts = {}
    # Case presentation
    case_m = re.search(r"Case presentation\s+(.+?)(?:Prescribing request|$)", text, re.S)
    parts["case"] = re.sub(r"\s+", " ", case_m.group(1)).strip() if case_m else text[:400]
    # Request
    req_m = re.search(
        r"Prescribing request\s+(.+?)(?:\(use the|Extension questions|A\d+\b|$)",
        text, re.S
    )
    parts["request"] = re.sub(r"\s+", " ", req_m.group(1)).strip() if req_m else ""
    # Question label (A1, A8, etc.)
    label_m = re.search(r"\bA(\d+)\b", text[-200:])
    parts["label"] = f"A{label_m.group(1)}" if label_m else ""
    # Prescription form type
    if "Hospital Fluid" in text:
        parts["form_type"] = "Hospital Fluid"
    elif "Once only" in text or "Once Only" in text:
        parts["form_type"] = "Once Only"
    elif "Regular Medicines" in text:
        parts["form_type"] = "Regular Medicines"
    elif "General Practice" in text or "28 days" in text:
        parts["form_type"] = "General Practice"
    else:
        parts["form_type"] = "Prescribing"
    return parts


# ---------------------------------------------------------------------------
# Review slide extraction
# ---------------------------------------------------------------------------

def extract_review_parts(text):
    """Parse a prescription review slide."""
    parts = {}
    # Answer explanations at top (before "Case presentation")
    top_text = text.split("Case presentation")[0] if "Case presentation" in text else ""
    ans_a_m = re.search(r"\bA:\s+(.+?)(?:\bB:|Medicine\s+Dose|$)", top_text, re.S)
    ans_b_m = re.search(r"\bB:\s+(.+?)(?:Medicine\s+Dose|Case\s+presentation|$)", top_text, re.S)
    parts["answer_a"] = re.sub(r"\s+", " ", ans_a_m.group(1)).strip() if ans_a_m else ""
    parts["answer_b"] = re.sub(r"\s+", " ", ans_b_m.group(1)).strip() if ans_b_m else ""

    # Case presentation
    case_m = re.search(r"Case presentation\s+(.+?)(?:Question A\b|Question B\b|CURRENT|Examination\s+|$)", text, re.S)
    parts["case"] = re.sub(r"\s+", " ", case_m.group(1)).strip() if case_m else ""

    # Exam / observations
    obs_m = re.search(r"(?:Examination|Observations)\s+(.+?)(?:Investigations|Question A|CURRENT|Medicine|$)", text, re.S)
    parts["obs"] = re.sub(r"\s+", " ", obs_m.group(1)).strip() if obs_m else ""

    # Investigations
    inv_m = re.search(r"Investigations[\s:]+(.+?)(?:Question A|CURRENT|Medicine|$)", text, re.S)
    parts["inv"] = re.sub(r"\s+", " ", inv_m.group(1)).strip() if inv_m else ""

    # Question A
    qa_m = re.search(r"Question A\s+(.+?)(?:Question B\b|Medicine\s+Dose|$)", text, re.S)
    parts["q_a"] = re.sub(r"\s+", " ", qa_m.group(1)).strip() if qa_m else ""

    # Question B
    qb_m = re.search(r"Question B\s+(.+?)(?:Medicine\s+Dose|CURRENT PRESCRIPTIONS|$)", text, re.S)
    parts["q_b"] = re.sub(r"\s+", " ", qb_m.group(1)).strip() if qb_m else ""

    # Medicine table
    table_m = re.search(
        r"Medicine\s+Dose\s+Route\s+Frequency(?:\s+A\s+B)?\s+(.+?)(?:A:\s|Question|$)",
        text, re.S
    )
    if table_m:
        raw_rows = table_m.group(1).strip()
        parts["table_raw"] = re.sub(r"\s+", " ", raw_rows)
    else:
        parts["table_raw"] = ""

    # Pptx label (A1–A10)
    label_m = re.search(r"\bA\s*(\d+)\b", text[-300:])
    parts["label"] = f"A{label_m.group(1)}" if label_m else ""

    return parts


def parse_medicine_table(raw):
    """Convert raw medicine table text to markdown table rows."""
    if not raw:
        return []
    # Split into tokens and try to group into rows
    # Expected pattern per row: [drug name] [dose] [route] [freq] [TICK?] [TICK?]
    tokens = raw.split()
    rows = []
    i = 0
    current_drug = []
    current_dose = ""
    current_route = ""
    current_freq = []
    ticks = []

    ROUTES = {"PO", "IV", "SC", "IM", "NEB", "INH", "PV", "PR", "SL", "TOP"}
    FREQS  = {"daily", "twice", "nightly", "BD", "TDS", "QDS", "OD", "PRN",
              "weekly", "monthly", "8", "6", "12", "4", "2", "3", "hourly",
              "three", "four", "once", "2-weekly", "3-monthly", "6-monthly"}

    # Simple heuristic: split on known route keywords
    row_pattern = re.compile(
        r"([A-Za-z][A-Za-z0-9\s®/()\-\.]+?)\s+"    # drug name
        r"(\d[\d.,]* ?(?:mg|mcg|units?|g|ml|mmol|IU|%|ng)[\w/]*)\s+"  # dose
        r"(PO|IV|SC|IM|NEB|INH|PV|PR|SL|inh|neb)\s+"  # route
        r"([\w\s()\-/]+?)\s+"                         # frequency
        r"((?:✓\s*){0,2})"                            # 0–2 ticks
    )
    for m in row_pattern.finditer(raw):
        drug  = m.group(1).strip()
        dose  = m.group(2).strip()
        route = m.group(3).strip()
        freq  = m.group(4).strip()
        tick  = m.group(5).strip()
        col_a = "✓" if tick.count("✓") >= 1 else ""
        col_b = "✓" if tick.count("✓") >= 2 else ""
        rows.append(f"| {drug} | {dose} | {route} | {freq} | {col_a} | {col_b} |")

    return rows


# ---------------------------------------------------------------------------
# MCQ extraction
# ---------------------------------------------------------------------------

def extract_mcq_parts(text):
    """Parse an MCQ slide with options A–E."""
    parts = {}
    # Section type (Planning, Communicating, ADR, Monitoring, Data)
    sec_m = re.match(
        r"(Planning Management|Communicating Information|Adverse Drug Reaction"
        r"|Drug Monitoring|Data Interpretation)\s+2 marks",
        text
    )
    parts["section"] = sec_m.group(1) if sec_m else "MCQ"

    # Pptx label
    label_m = re.search(r"\bA(\d+)\b", text[:100])
    parts["label"] = f"A{label_m.group(1)}" if label_m else ""

    # Case
    case_m = re.search(r"Case presentation\s+(.+?)(?:Question\s+Select|$)", text, re.S)
    parts["case"] = re.sub(r"\s+", " ", case_m.group(1)).strip() if case_m else ""

    # Core question
    q_m = re.search(r"Question\s+Select\s+(.+?)(?:[A-Z][A-Z].*?A\s+[A-Z]|$)", text, re.S)
    parts["question"] = re.sub(r"\s+", " ", q_m.group(1)).strip()[:200] if q_m else "Select the most appropriate option."

    # Options A–E (each option text is followed by a letter label A/B/C/D/E)
    opts = re.findall(r"(.+?)\s+([A-E])\s+(?=.+?\s+[A-E]\s+|How to find|[A-Z][a-z]+:)", text)
    parts["options"] = opts[:5]  # at most 5 options

    # Fallback: find options by the trailing letter
    if not parts["options"]:
        parts["options"] = re.findall(r"(.+?)\s+([A-E])(?=\s)", text[:1200])[:5]

    # Explanation / answer text (after last option E, before "How to find on BNF")
    expl_m = re.search(r"[A-E]\s+(.+?)(?:How to find on BNF|https?://|$)", text, re.S)
    parts["explanation"] = re.sub(r"\s+", " ", expl_m.group(1)).strip()[:600] if expl_m else ""

    return parts


# ---------------------------------------------------------------------------
# Main extraction
# ---------------------------------------------------------------------------
raw_slides = get_slide_texts(PPTX)

SECTION_HEADERS = {
    "CALC":   "## SECTION A — CALCULATION SKILLS (2 marks each)",
    "PRESC":  "## SECTION B — PRESCRIPTION WRITING (10 marks)",
    "REVIEW": "## SECTION C — PRESCRIPTION REVIEW (4 marks each)",
    "MCQ":    "## SECTION D — APPLIED KNOWLEDGE QUESTIONS (2 marks each)",
}

def slide_section(idx):
    if idx <= 36:  return "CALC"
    if idx <= 65:  return "PRESC"
    if idx <= 75:  return "REVIEW"
    return "MCQ"

out = [
    "---",
    "title: PSA 1 2026 — Full Extracted Question Bank",
    f"source: PSA 1 2026.pptx (91 slides, March 2026 update)",
    "note: Auto-extracted via zipfile+XML. Calc Q+A are on single slides.",
    "  Prescribing answers for A1–A7 extracted; A8+ answers are on form images only.",
    "---",
    "",
]

current_section = None
calc_q = 0
calc_ex = 0
presc_q = 0
review_q = 0
mcq_q = 0

for idx, text in raw_slides:
    stype = SLIDE_TYPE.get(idx, "SKIP")
    sec   = slide_section(idx)

    if stype in ("TEMPLATE", "SKIP"):
        continue

    if sec != current_section:
        current_section = sec
        out += ["", SECTION_HEADERS[sec], ""]

    # ── CALC EXAMPLE ──────────────────────────────────────────────────────
    if stype == "CALC_EX":
        calc_ex += 1
        p = extract_example_parts(text)
        out.append(f"### WORKED EXAMPLE {p['example_num']} (slide {idx})")
        out.append("")
        if p["case"]:
            out.append(f"**Case:** {p['case']}")
            out.append("")
        if p["request"]:
            out.append(f"**Question:** {p['request']}")
            out.append("")
        if p["answer"]:
            out.append(f"> ✅ **Answer: {p['answer']} {p['unit']}**")
            out.append("")
        out += ["---", ""]
        continue

    # ── CALC Q+A ──────────────────────────────────────────────────────────
    if stype == "CALC_QA":
        calc_q += 1
        p = extract_calc_parts(text)
        label_str = f"  [{p['label']}]" if p["label"] else ""
        out.append(f"### CALC Q{calc_q}{label_str} (slide {idx})")
        out.append("")
        if p["case"]:
            out.append(f"**Case:** {p['case']}")
            out.append("")
        if p["request"]:
            out.append(f"**Question:** {p['request']}")
            out.append("")
        if p["answer"]:
            out.append(f"> ✅ **Answer: {p['answer']} {p['unit']}**")
            out.append("")
        if p["working"]:
            out.append("**Working:**")
            out.append("")
            out.append(p["working"][:600])
            out.append("")
        out += ["---", ""]
        continue

    # ── PRESC Q+A ─────────────────────────────────────────────────────────
    if stype == "PRESC_QA":
        presc_q += 1
        p = extract_presc_parts(text)
        ans = extract_presc_answer(text)
        label_str = f"  [{p['label']}]" if p["label"] else ""
        form_str  = f"  ({p['form_type']})" if p["form_type"] else ""
        out.append(f"### PRESC Q{presc_q}{label_str}{form_str} (slide {idx})")
        out.append("")
        if p["case"]:
            out.append(f"**Case:** {p['case']}")
            out.append("")
        if p["request"]:
            out.append(f"**Question:** {p['request']}")
            out.append("")
        if ans:
            out.append(f"> ✅ **Answer:** {ans}")
        else:
            out.append("> *Answer shown in prescription form — see original PPTX.*")
        out.append("")
        out += ["---", ""]
        continue

    # ── PRESC Q-only ──────────────────────────────────────────────────────
    if stype == "PRESC_Q":
        presc_q += 1
        p = extract_presc_parts(text)
        label_str = f"  [{p['label']}]" if p["label"] else ""
        form_str  = f"  ({p['form_type']})" if p["form_type"] else ""
        out.append(f"### PRESC Q{presc_q}{label_str}{form_str} (slide {idx})")
        out.append("")
        if p["case"]:
            out.append(f"**Case:** {p['case']}")
            out.append("")
        if p["request"]:
            out.append(f"**Question:** {p['request']}")
            out.append("")
        out.append("> *Answer: see prescription form in original PPTX (image-based).*")
        out.append("")
        out += ["---", ""]
        continue

    # ── REVIEW ────────────────────────────────────────────────────────────
    if stype == "REVIEW":
        review_q += 1
        p = extract_review_parts(text)
        label_str = f"  [{p['label']}]" if p["label"] else ""
        out.append(f"### REVIEW Q{review_q}{label_str} (slide {idx})")
        out.append("")
        if p["case"]:
            out.append(f"**Case:** {p['case']}")
            out.append("")
        if p["obs"]:
            out.append(f"**Observations:** {p['obs']}")
            out.append("")
        if p["inv"]:
            out.append(f"**Investigations:** {p['inv']}")
            out.append("")
        if p["q_a"]:
            out.append(f"**Part A:** {p['q_a']}")
            out.append("")
        if p["q_b"]:
            out.append(f"**Part B:** {p['q_b']}")
            out.append("")
        # Medicine table
        if p["table_raw"]:
            out.append("**Current prescriptions:**")
            out.append("")
            out.append("| Drug | Dose | Route | Frequency | A | B |")
            out.append("|------|------|-------|-----------|---|---|")
            rows = parse_medicine_table(p["table_raw"])
            if rows:
                out.extend(rows)
            else:
                # Fallback: show raw table text
                out.append(f"| *(raw)* | {p['table_raw'][:200]} | | | | |")
            out.append("")
        if p["answer_a"]:
            out.append(f"> **Part A answer:** {p['answer_a'][:400]}")
            out.append("")
        if p["answer_b"]:
            out.append(f"> **Part B answer:** {p['answer_b'][:400]}")
            out.append("")
        out += ["---", ""]
        continue

    # ── MCQ ───────────────────────────────────────────────────────────────
    if stype == "MCQ":
        mcq_q += 1
        p = extract_mcq_parts(text)
        label_str = f"  [{p['label']}]" if p["label"] else ""
        out.append(f"### MCQ Q{mcq_q}  |  {p['section']}{label_str} (slide {idx})")
        out.append("")
        if p["case"]:
            out.append(f"**Case:** {p['case']}")
            out.append("")
        out.append(f"**Question:** {p['question']}")
        out.append("")
        if p["options"]:
            for opt_text, opt_letter in p["options"]:
                out.append(f"{opt_letter}. {opt_text.strip()}")
            out.append("")
        if p["explanation"]:
            out.append(f"> **Answer/Explanation:** {p['explanation'][:400]}")
            out.append("")
        out += ["---", ""]
        continue

# ---------------------------------------------------------------------------
# Footer
# ---------------------------------------------------------------------------
out += [
    "",
    f"*Extraction complete — PSA 1 2026.pptx (91 slides, March 2026 update)*",
    "",
    f"*Totals: {calc_q} Calc Q+A  |  {presc_q} Prescribing  |  {review_q} Review  |  {mcq_q} MCQ*",
    "",
]

with open(OUT, "w", encoding="utf-8") as f:
    f.write("\n".join(out))

print(
    f"Written {len(out)} lines  |  "
    f"{calc_q} Calc + {presc_q} Presc + {review_q} Review + {mcq_q} MCQ  ->  {OUT}"
)

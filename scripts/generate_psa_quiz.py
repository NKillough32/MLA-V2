#!/usr/bin/env python3
"""
PSA Quiz Generator — uses OpenAI to produce a full 60-item, 200-mark PSA assessment
in the application's markdown format.

Usage:
    python generate_psa_quiz.py --api-key sk-... --output ../static/assets/psa-generated.md
    python generate_psa_quiz.py --api-key sk-... --title "PSA Practice Paper 2" --specialty Cardiology
    python generate_psa_quiz.py --api-key sk-... --sections PWS REV CAL  (partial run)
    python generate_psa_quiz.py --api-key sk-... --list-topics

Set OPENAI_API_KEY env variable to avoid passing --api-key each time.
"""

import argparse
import os
import sys
import time
import re
from datetime import datetime
from pathlib import Path
from openai import OpenAI

# ── PSA section configuration ──────────────────────────────────────────────────
SECTIONS = {
    "PWS": {
        "name": "Prescription Writing",
        "type": "PRESCRIPTION",
        "count": 8,
        "marks": 10,
        "description": "Complete a drug chart prescription (drug name, dose, route, frequency, indication). "
                       "Clinical scenario of a patient who needs a new or modified prescription.",
    },
    "REV": {
        "name": "Prescription Review",
        "type": "REVIEW",
        "count": 8,
        "marks": 4,
        "description": "Two linked MCQ questions (Part A + Part B, 2 marks each) based on the same "
                       "clinical scenario with a current prescription that has a problem (wrong drug, "
                       "dangerous interaction, wrong dose, contraindication, monitoring gap).",
    },
    "MAN": {
        "name": "Planning Management",
        "type": "MCQ",
        "count": 8,
        "marks": 2,
        "description": "Single best answer from 5 options. Patient management/treatment decision — "
                       "choosing the most appropriate drug or treatment for a clinical scenario.",
    },
    "COM": {
        "name": "Providing Prescribing Decisions",
        "type": "MCQ",
        "count": 6,
        "marks": 2,
        "description": "Single best answer from 5 options. Communication / counselling — drug counselling, "
                       "patient information, explaining drug risks, consent, sick day rules.",
    },
    "ADR": {
        "name": "Adverse Drug Reactions",
        "type": "MCQ",
        "count": 8,
        "marks": 2,
        "description": "Single best answer from 5 options. Identify a drug-induced adverse effect "
                       "OR choose management of a confirmed ADR OR identify the causative drug.",
    },
    "TDM": {
        "name": "Monitoring Drug Therapy",
        "type": "MCQ",
        "count": 8,
        "marks": 2,
        "description": "Single best answer from 5 options. Drug monitoring — correct monitoring parameters, "
                       "timing of drug levels (trough/peak), interpreting drug concentrations, "
                       "identifying monitoring failures.",
    },
    "DAT": {
        "name": "Data Interpretation",
        "type": "MCQ",
        "count": 6,
        "marks": 2,
        "description": "Single best answer from 5 options. Interpret clinical data (blood results, ECG, "
                       "drug levels, renal function) in a drug prescribing context — identify "
                       "abnormalities requiring prescribing action.",
    },
    "CAL": {
        "name": "Calculation Skills",
        "type": "CALCULATION",
        "count": 8,
        "marks": 2,
        "description": "Numerical answer only. Drug dose or infusion rate calculation — "
                       "volume to administer, infusion rate, dose in mg, number of tablets, unit conversions.",
    },
}

SECTION_ORDER = ["PWS", "REV", "MAN", "COM", "ADR", "TDM", "DAT", "CAL"]

# ── System prompt ───────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are an expert medical educator writing questions for the UK Prescribing Safety Assessment (PSA).
The PSA tests Foundation doctor prescribing competence. Your questions must:
- Reflect real prescribing scenarios encountered by Foundation (FY1/FY2) doctors in NHS hospitals and GP surgeries
- Reference current BNF, NICE guidelines, and NHS Trust policies
- Use UK drug names (not US brand names) and UK conventions (e.g. "OD" not "QD", "BD" not "BID")
- Be clinically accurate with correct doses, routes, frequencies, and monitoring parameters
- Include plausible distractors — never include obviously wrong options
- Follow the EXACT markdown format specified — deviations will break the parser

Output ONLY the raw markdown — no preamble, no commentary, no code fences."""

# ── Format examples for prompts ─────────────────────────────────────────────────
MCQ_FORMAT = """### Q{n} | MCQ | {section_name} | {specialty}

{scenario_text}

**{question_stem}**

A. {opt_A}
B. {opt_B} ✓
C. {opt_C}
D. {opt_D}
E. {opt_E}

> {explanation}"""

CALCULATION_FORMAT = """### Q{n} | CALCULATION | Calculation Skills | {specialty}

{scenario_text}

**{question_stem}**

UNIT: {unit}
ANSWER: {answer}
TOLERANCE: {tolerance}
WORKING:
{working_steps}

> {explanation}"""

PRESCRIPTION_FORMAT = """### Q{n} | PRESCRIPTION | Prescription Writing | {specialty}

{scenario_text}

**Complete a prescription for the most appropriate treatment.**

DRUG: {drug} | {drug_synonym}
DOSE: {dose} | {dose_synonym}
ROUTE: {route_full} | {route_abbrev} | {route_alt}
FREQUENCY: {freq_full} | {freq_abbrev} | {freq_alt}
INDICATION: {indication}

> {explanation}"""

REVIEW_FORMAT = """### Q{n} | REVIEW | Prescription Review | {specialty}

MARKS_A: 2
MARKS_B: 2

{scenario_text}

**Current prescription:**
| Drug | Dose | Route | Frequency | Indication |
|------|------|-------|-----------|------------|
{table_rows}

**Part A: {part_a_stem}**

A. {a_opt_A}
B. {a_opt_B} ✓
C. {a_opt_C}
D. {a_opt_D}
E. {a_opt_E}

**Part B: {part_b_stem}**

A. {a_opt_A2} ✓
B. {b_opt_B}
C. {b_opt_C}
D. {b_opt_D}
E. {b_opt_E}

> {explanation}"""


# ── Per-section prompt builders ─────────────────────────────────────────────────
def build_mcq_prompt(section_code: str, section_cfg: dict, count: int,
                     specialty_hint: str, start_q: int, used_topics: list) -> str:
    avoid = ", ".join(used_topics[-20:]) if used_topics else "none"
    return f"""Generate {count} PSA {section_cfg['name']} ({section_code}) questions.

SECTION DEFINITION: {section_cfg['description']}

FORMAT — each question must follow this EXACT pattern (do NOT add any extra lines):

### Q{{n}} | MCQ | {section_cfg['name']} | {{Specialty}}

{{2-4 sentence clinical scenario with patient age, sex, relevant PMH, medications, examination findings}}

**{{Single question stem ending with a ?}}**

A. {{Option text}}
B. {{Option text}} ✓
C. {{Option text}}
D. {{Option text}}
E. {{Option text}}

> {{Explanation referencing BNF/NICE, correct answer justification, why distractors are wrong, monitoring/management tips. Minimum 3 sentences.}}

RULES:
- Exactly 5 options (A–E). Exactly ONE option has ✓ at the end, no space before ✓.
- Questions numbered Q{start_q} through Q{start_q + count - 1}.
- Use varied specialties (General Medicine, Cardiology, Renal, Respiratory, Neurology, Gastro, Endocrine, Haematology, Infectious Disease, Paediatrics, Obstetrics, Psychiatry, Emergency, Surgery, Elderly Care, GP).
- Preferred specialty hint for variety: {specialty_hint}
- Do NOT repeat clinical themes already used: {avoid}
- Separate each question with a line containing only: ---
- Output ONLY the markdown. No preamble. No commentary. No code fences."""


def build_calc_prompt(count: int, start_q: int, used_topics: list) -> str:
    avoid = ", ".join(used_topics[-10:]) if used_topics else "none"
    return f"""Generate {count} PSA Calculation Skills (CAL) questions.

SECTION DEFINITION: Numerical answer drug calculations for Foundation doctors.

FORMAT — each question must follow this EXACT pattern:

### Q{{n}} | CALCULATION | Calculation Skills | {{Specialty}}

{{Clinical scenario giving patient weight/age/condition if relevant, drug name, dose in mg/kg or total dose, preparation/concentration available}}

**Calculate {{what to calculate}} in {{unit}}.**

UNIT: {{unit}}
ANSWER: {{correct numerical answer, decimal if needed}}
TOLERANCE: {{±tolerance for rounding, e.g. 0.1 for mL, 0.05 for rates}}
WORKING:
Step 1: {{calculation step}}
Step 2: {{calculation step}}
Step 3: {{calculation step if needed}}

> {{Explanation covering therapeutic context, typical doses, important monitoring, clinical pearls. Min 2 sentences.}}

CALCULATION TYPES to include (varied):
- Volume to administer (dose ÷ concentration)
- IV infusion rate in mL/hour
- Weight-based dose (mg/kg × weight)
- Number of tablets
- Drip rate in drops/min (with drop factor)
- Unit conversions (e.g. micrograms to mg)
- Creatinine clearance-based dose adjustment

RULES:
- Questions numbered Q{start_q} through Q{start_q + count - 1}.
- ANSWER must be the mathematically correct result. Triple-check your arithmetic.
- TOLERANCE: use ~5% of the answer, minimum 0.05.
- Working must be step-by-step and verify the answer.
- Do NOT repeat calculation themes: {avoid}
- Separate each question with: ---
- Output ONLY the markdown."""


def build_prescription_prompt(count: int, start_q: int, used_topics: list) -> str:
    avoid = ", ".join(used_topics[-10:]) if used_topics else "none"
    return f"""Generate {count} PSA Prescription Writing (PWS) questions.

SECTION DEFINITION: Complete a drug chart prescription for the optimal drug in a clinical scenario.
This is the highest-weighted section: 10 marks per item.

FORMAT — each question must follow this EXACT pattern:

### Q{{n}} | PRESCRIPTION | Prescription Writing | {{Specialty}}

{{3-5 sentence clinical scenario: patient demographics, presenting complaint, PMH, allergies, relevant obs/labs. Be specific enough that only one drug is correct.}}

**Complete a prescription for the most appropriate {{immediate/first-line/prophylactic}} treatment.**

DRUG: {{correct drug name}} | {{alternative name/brand if applicable}}
DOSE: {{dose with units, e.g. 500 mg}} | {{alternative format, e.g. 0.5 g}} | {{another accepted format}}
ROUTE: {{Full route (Abbreviation)}} | {{Abbreviation only}} | {{another accepted form}}
FREQUENCY: {{Full frequency (Abbreviation)}} | {{Abbreviation only}} | {{another accepted form}}
INDICATION: {{brief indication}}

> {{Explanation: why this drug, dose, route and frequency; first-line evidence (BNF/NICE); alternatives and why they're less optimal; important cautions or monitoring; what would happen with wrong choices. Min 4 sentences.}}

CLINICAL SCENARIOS to include (varied):
- Anaphylaxis → adrenaline IM
- Sepsis empirical antibiotic → piperacillin-tazobactam IV or amoxicillin IV
- Acute asthma → salbutamol nebulised
- Acute COPD exacerbation → salbutamol + ipratropium neb, prednisolone PO
- PE / DVT → LMWH (enoxaparin/dalteparin)
- Acute MI → aspirin loading dose PO
- Hypertensive emergency → labetalol IV
- Type 1 DKA → insulin infusion IV
- UTI (uncomplicated) → nitrofurantoin PO
- Pneumonia (CAP) → amoxicillin PO
- Acute gout → naproxen PO or colchicine PO
- Alcohol withdrawal → chlordiazepoxide PO
- Acute cluster headache → sumatriptan SC
- Postoperative pain → paracetamol IV
- C. difficile → vancomycin PO
- Hyperkalaemia → calcium gluconate IV (cardiac protection)
- Opioid overdose → naloxone IV
- Pulmonary oedema → furosemide IV
- Acute migraine → sumatriptan PO
- AF with fast ventricular rate → bisoprolol PO or digoxin IV

RULES:
- Questions numbered Q{start_q} through Q{start_q + count - 1}.
- DRUG synonyms: include generic name + any key alternative (e.g. "Adrenaline (epinephrine) | Adrenaline | Epinephrine")
- DOSE synonyms: include "500 mg | 500mg | 0.5 g" style variants
- ROUTE synonyms: ALWAYS include bare abbreviation (PO, IV, IM, SC etc.) as a synonym
- FREQUENCY synonyms: ALWAYS include bare abbreviation (OD, BD, TDS, STAT, PRN etc.) as a synonym
- Do NOT repeat clinical scenarios: {avoid}
- Separate each question with: ---
- Output ONLY the markdown."""


def build_review_prompt(count: int, start_q: int, used_topics: list) -> str:
    avoid = ", ".join(used_topics[-10:]) if used_topics else "none"
    return f"""Generate {count} PSA Prescription Review (REV) questions.

SECTION DEFINITION: Two linked MCQ sub-questions based on ONE clinical scenario with a problematic
current prescription. Total 4 marks (2 per part). Part A identifies the problem; Part B selects the action.

FORMAT — each question must follow this EXACT pattern:

### Q{{n}} | REVIEW | Prescription Review | {{Specialty}}

MARKS_A: 2
MARKS_B: 2

{{3-5 sentence clinical scenario with age, sex, PMH, presenting problem, and context for the current prescription}}

**Current prescription:**
| Drug | Dose | Route | Frequency | Indication |
|------|------|-------|-----------|------------|
| {{drug1}} | {{dose}} | {{route}} | {{frequency}} | {{indication}} |
| {{drug2}} | {{dose}} | {{route}} | {{frequency}} | {{indication}} |

**Part A: {{Question identifying/characterising WHAT the problem is?}}**

A. {{Option}}
B. {{Option}} ✓
C. {{Option}}
D. {{Option}}
E. {{Option}}

**Part B: {{Question asking WHAT ACTION to take?}}**

A. {{Option}} ✓
B. {{Option}}
C. {{Option}}
D. {{Option}}
E. {{Option}}

> {{Explanation: nature of the interaction/problem, mechanism if relevant, correct management steps, monitoring required, BNF/NICE reference. Min 4 sentences.}}

PRESCRIBING PROBLEMS to include (varied):
- Drug interactions (warfarin+trimethoprim, ACEi+NSAIDs, SSRIs+tramadol, methotrexate+co-trimoxazole, lithium+diuretics, theophylline+ciprofloxacin, digoxin+amiodarone)
- Contraindication (metformin in AKI, NSAIDs in CKD/heart failure, beta-blockers in acute asthma, opioids in head injury, azathioprine + allopurinol)
- Wrong dose (gentamicin without weight-based calculation, renally impaired patient on standard dose)
- Omitted medication (VTE prophylaxis missing, insulin omitted during NBM, steroid sick day rule)
- Drug allergy prescribing (penicillin allergy patient prescribed amoxicillin)
- Narrow therapeutic index drug at supratherapeutic level (lithium, digoxin, phenytoin, vancomycin)

RULES:
- Questions numbered Q{start_q} through Q{start_q + count - 1}.
- MARKS_A: and MARKS_B: lines must appear immediately after the header, before the scenario text.
- Part A and Part B headings MUST be exactly: **Part A: {{question}}** and **Part B: {{question}}**
- Exactly 5 options per part. Exactly ONE ✓ per part.
- The ✓ may be on any option (A–E), not always B or A — vary the position.
- Do NOT repeat problem types: {avoid}
- Separate each question with: ---
- Output ONLY the markdown."""


# ── API call with retry ─────────────────────────────────────────────────────────
def call_openai(client: OpenAI, prompt: str, model: str, max_retries: int = 3) -> str:
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt},
                ],
                temperature=0.8,
                max_tokens=6000,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            wait = 2 ** attempt * 5
            print(f"  WARNING: API error (attempt {attempt + 1}/{max_retries}): {e}")
            if attempt < max_retries - 1:
                print(f"  Retrying in {wait}s...")
                time.sleep(wait)
            else:
                raise


# ── Post-processing / validation ────────────────────────────────────────────────
def renumber_questions(text: str, start_n: int) -> str:
    """Renumber ### Q{n} headers to be sequential from start_n."""
    counter = [start_n]
    def replacer(m):
        n = counter[0]
        counter[0] += 1
        return f"### Q{n} |{m.group(1)}"
    return re.sub(r"### Q\d+\s*\|([^\n]+)", replacer, text)


def validate_section(text: str, section_code: str, expected_count: int) -> tuple[bool, list[str]]:
    """Basic structural checks on generated markdown. Returns (ok, issues)."""
    issues = []

    headers = re.findall(r"### Q\d+\s*\|", text)
    if len(headers) != expected_count:
        issues.append(f"Expected {expected_count} questions, found {len(headers)}")

    # MCQ/REVIEW: check for ✓
    if section_code in ("MAN", "COM", "ADR", "TDM", "DAT"):
        checks = text.count("✓")
        if checks < expected_count:
            issues.append(f"MCQ section: found {checks} ✓ marks, expected {expected_count}")

    # REVIEW: check Part A / Part B
    if section_code == "REV":
        part_a = len(re.findall(r"\*\*Part A:", text))
        part_b = len(re.findall(r"\*\*Part B:", text))
        if part_a != expected_count:
            issues.append(f"REV: found {part_a} Part A sections, expected {expected_count}")
        if part_b != expected_count:
            issues.append(f"REV: found {part_b} Part B sections, expected {expected_count}")
        marks_lines = len(re.findall(r"^MARKS_A:", text, re.MULTILINE))
        if marks_lines != expected_count:
            issues.append(f"REV: found {marks_lines} MARKS_A: directives, expected {expected_count}")

    # PRESCRIPTION: check DRUG: DOSE: ROUTE: FREQUENCY:
    if section_code == "PWS":
        for field in ("DRUG:", "DOSE:", "ROUTE:", "FREQUENCY:"):
            n = len(re.findall(rf"^{field}", text, re.MULTILINE))
            if n < expected_count:
                issues.append(f"PWS: found {n} {field} lines, expected {expected_count}")

    # CALCULATION: check ANSWER:
    if section_code == "CAL":
        answers = len(re.findall(r"^ANSWER:", text, re.MULTILINE))
        if answers < expected_count:
            issues.append(f"CAL: found {answers} ANSWER: lines, expected {expected_count}")

    return len(issues) == 0, issues


# ── Main generator ──────────────────────────────────────────────────────────────
class PSAQuizGenerator:
    def __init__(self, api_key: str, model: str = "gpt-4o", output_path: str = None,
                 title: str = None, specialty_hint: str = "varied"):
        self.client = OpenAI(api_key=api_key)
        self.model = model
        self.specialty_hint = specialty_hint
        self.title = title or f"PSA Practice Assessment — {datetime.now().strftime('%B %Y')}"
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        # Resolve output path relative to the workspace root (one level up from scripts/)
        _script_dir = Path(__file__).parent
        _default_out = _script_dir.parent / "static" / "assets" / f"psa-{ts}.md"
        self.output_path = Path(output_path) if output_path else _default_out
        self.output_path.parent.mkdir(parents=True, exist_ok=True)
        self.used_topics: list[str] = []

    def _build_prompt(self, code: str, cfg: dict, count: int, start_q: int) -> str:
        if code == "CAL":
            return build_calc_prompt(count, start_q, self.used_topics)
        if code == "PWS":
            return build_prescription_prompt(count, start_q, self.used_topics)
        if code == "REV":
            return build_review_prompt(count, start_q, self.used_topics)
        # MCQ types
        return build_mcq_prompt(code, cfg, count, self.specialty_hint, start_q, self.used_topics)

    def generate_section(self, code: str, cfg: dict, start_q: int) -> str:
        count = cfg["count"]
        print(f"\n  Generating {count} x {code} ({cfg['name']}) questions...")
        prompt = self._build_prompt(code, cfg, count, start_q)

        text = call_openai(self.client, prompt, self.model)

        # Strip any accidental code fences
        text = re.sub(r"^```[a-z]*\n?", "", text, flags=re.MULTILINE)
        text = re.sub(r"^```\s*$", "", text, flags=re.MULTILINE)

        # Renumber to ensure continuity
        text = renumber_questions(text, start_q)

        # Validate
        ok, issues = validate_section(text, code, count)
        if issues:
            print(f"  WARNING: Validation warnings for {code}:")
            for iss in issues:
                print(f"    - {iss}")
        else:
            print(f"  OK: {code} section validated ({count} questions)")

        # Collect themes from scenario lines for diversity tracking
        for line in text.split("\n"):
            if len(line) > 40 and not line.startswith(("#", ">", "|", "A.", "B.", "C.", "D.", "E.")):
                self.used_topics.append(line[:80])
                break

        return text

    def generate(self, sections: list[str] = None) -> str:
        sections = sections or SECTION_ORDER
        print(f"\n{'='*60}")
        print(f"  PSA Quiz Generator")
        print(f"  Model  : {self.model}")
        print(f"  Title  : {self.title}")
        print(f"  Output : {self.output_path}")
        print(f"  Sections: {', '.join(sections)}")
        print(f"{'='*60}")

        # Calculate total items and marks for selected sections
        total_items  = sum(SECTIONS[s]["count"] for s in sections)
        total_marks  = sum(SECTIONS[s]["count"] * SECTIONS[s]["marks"] for s in sections)
        print(f"  Items: {total_items}  |  Marks: {total_marks}")

        # Build header
        parts = []
        specialty_meta = self.specialty_hint if self.specialty_hint != "varied" else "Clinical Pharmacology"
        parts.append(
            f"---\ntitle: {self.title}\nspecialty: {specialty_meta}\npsa: true\n---\n"
        )

        q_number = 1
        section_texts = {}

        for code in sections:
            cfg = SECTIONS[code]
            try:
                text = self.generate_section(code, cfg, q_number)
                section_texts[code] = text
                q_number += cfg["count"]
            except Exception as e:
                print(f"  FAILED to generate {code}: {e}")
                # Insert placeholder so file is still usable
                section_texts[code] = f"<!-- {code} generation failed: {e} -->"
                q_number += cfg["count"]

            # Small pause to be kind to rate limits
            time.sleep(1)

        # Assemble: section headers as Markdown comments + content
        for code in sections:
            cfg = SECTIONS[code]
            marks_note = f"{cfg['count']} × {cfg['marks']} marks"
            parts.append(f"\n<!-- ═══ {code}: {cfg['name']} ({marks_note}) ═══ -->\n")
            # Ensure clean separator between questions from different sections
            block = section_texts[code].strip()
            if not block.startswith("### Q"):
                parts.append(block)
            else:
                parts.append(block)
            parts.append("\n\n---\n")

        final = "\n".join(parts)

        # Write output
        self.output_path.write_text(final, encoding="utf-8")
        print(f"\n{'='*60}")
        print(f"  DONE: Quiz written to: {self.output_path}")
        print(f"  Items: {total_items}  |  Marks: {total_marks}")
        print(f"{'='*60}\n")

        return final

    def print_summary(self, sections: list[str] = None):
        """Print a table of what will be generated."""
        sections = sections or SECTION_ORDER
        print(f"\n{'Code':<6} {'Section':<35} {'Items':>5} {'Marks ea':>8} {'Total':>6}")
        print("-" * 60)
        total_items = 0
        total_marks = 0
        for code in sections:
            cfg = SECTIONS[code]
            items = cfg["count"]
            marks = cfg["marks"]
            total = items * marks
            total_items += items
            total_marks += total
            print(f"{code:<6} {cfg['name']:<35} {items:>5} {marks:>8} {total:>6}")
        print("-" * 60)
        print(f"{'TOTAL':<6} {'':<35} {total_items:>5} {'':<8} {total_marks:>6}")
        print()


# ── CLI ─────────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(
        description="Generate a full PSA assessment using OpenAI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--api-key", default=os.environ.get("OPENAI_API_KEY"),
                        help="OpenAI API key (or set OPENAI_API_KEY env var)")
    parser.add_argument("--model", default="gpt-4o",
                        help="OpenAI model to use (default: gpt-4o)")
    parser.add_argument("--output", default=None,
                        help="Output .md file path (default: ../static/assets/psa-TIMESTAMP.md)")
    parser.add_argument("--title", default=None,
                        help="Quiz title shown in the app (default: auto-generated)")
    parser.add_argument("--specialty", default="varied",
                        help="Preferred specialty theme, e.g. Cardiology (default: varied)")
    parser.add_argument("--sections", nargs="+", choices=list(SECTIONS.keys()),
                        default=None,
                        help="Generate only specific sections (default: all 8)")
    parser.add_argument("--list-topics", action="store_true",
                        help="Print the section table and exit without generating")
    parser.add_argument("--dry-run", action="store_true",
                        help="Print prompts to stdout without calling the API")

    args = parser.parse_args()

    if args.list_topics:
        gen = PSAQuizGenerator.__new__(PSAQuizGenerator)
        gen.print_summary(args.sections)
        return

    if not args.api_key:
        print("Error: OpenAI API key required. Pass --api-key or set OPENAI_API_KEY.")
        sys.exit(1)

    sections = args.sections or SECTION_ORDER

    if args.dry_run:
        print("=== DRY RUN — prompts only ===\n")
        gen = PSAQuizGenerator(
            api_key="dry-run", model=args.model,
            output_path=args.output or "dry-run.md",
            title=args.title, specialty_hint=args.specialty,
        )
        gen.print_summary(sections)
        q = 1
        for code in sections:
            cfg = SECTIONS[code]
            prompt = gen._build_prompt(code, cfg, cfg["count"], q)
            print(f"\n{'-'*60}\n PROMPT FOR {code}\n{'-'*60}")
            print(prompt[:800], "..." if len(prompt) > 800 else "")
            q += cfg["count"]
        return

    gen = PSAQuizGenerator(
        api_key=args.api_key,
        model=args.model,
        output_path=args.output,
        title=args.title,
        specialty_hint=args.specialty,
    )
    gen.print_summary(sections)
    gen.generate(sections)


if __name__ == "__main__":
    main()

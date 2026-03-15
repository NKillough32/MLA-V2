# PSA Question Authoring Guide

This guide explains how to write every item type in the Prescribing Safety Assessment (PSA) format used by this application. Questions are written in plain Markdown files and automatically parsed by the quiz engine.

---

## Overview of the PSA

| Item Type | Code | Marks | Format |
|-----------|------|-------|--------|
| Prescribing | PWS | 10 per item | Full drug prescription form |
| Prescription Review | REV | 4 per item | A + B linked MCQ from same scenario |
| Calculation | CAL | 2 per item | Numeric answer |
| Planning Management | MAN | 2 per item | Single best answer from 5 options |
| Adverse Drug Reactions | ADR | 2 per item | Single best answer from 5 options |
| Drug Monitoring | TDM | 2 per item | Single best answer from 5 options |
| Data Interpretation | DAT | 2 per item | Single best answer from 5 options |
| Communication | COM | 2 per item | Single best answer from 5 options |

**Total: 60 items = 200 marks. No negative marking.**

---

## File Format

Every question file must start with YAML frontmatter, followed by questions separated by `---`:

```markdown
---
title: PSA Practice Set — Core Prescribing
specialty: Clinical Pharmacology
psa: true
---

### Q1 | MCQ | Adverse Drug Reactions | Cardiology
...

---

### Q2 | CALCULATION | Calculation Skills | General Medicine
...
```

### Question Header

```
### Q{n} | TYPE | Section | Specialty
```

| Part | Values |
|------|--------|
| `TYPE` | `MCQ`, `CALCULATION`, `PRESCRIPTION`, `REVIEW` |
| `Section` | See section names table below |
| `Specialty` | Any clinical specialty (e.g. Cardiology, Emergency, Paediatrics) |

### Section Names

| Section Name | PSA Domain |
|-------------|------------|
| `Adverse Drug Reactions` | ADR |
| `Drug Monitoring` | TDM |
| `Data Interpretation` | DAT |
| `Planning Management` | MAN |
| `Communication` | COM |
| `Calculation Skills` | CAL |
| `Prescription Writing` | PWS |
| `Prescription Review` | REV |

---

## Item Type 1: MCQ (MAN / COM / ADR / TDM / DAT)

Used for all **single best answer from 5 options** items. Correct answer scores **2 marks**.

### Format

```markdown
### Q1 | MCQ | Adverse Drug Reactions | Cardiology

A 58-year-old man was started on amiodarone 200 mg OD eight months ago for persistent
atrial fibrillation. He now presents with a six-week history of progressive exertional
dyspnoea and a dry cough. Chest X-ray shows bilateral interstitial infiltrates.

**What is the most likely cause of his current respiratory symptoms?**

A. Acute decompensated heart failure
B. Pulmonary toxicity from amiodarone ✓
C. Community-acquired pneumonia
D. Pulmonary embolism
E. Pleural effusion

> Amiodarone pulmonary toxicity occurs in 5–10% of patients after months to years of
> therapy. Features: progressive dyspnoea, dry cough, bilateral interstitial infiltrates,
> restrictive spirometry. Management: stop amiodarone; consider prednisolone 40–60 mg OD.
```

### Rules

- Always exactly **5 options** labelled `A.` through `E.`
- Mark the single correct option with `✓` at the end of the line
- Bold the question stem: `**Question stem?**`
- Blockquote `>` for the explanation (shown after submission, recommended for all items)
- Distractors should be clinically plausible — avoid obviously wrong options

### MCQ Sub-types

**MAN — Planning Management**: Select the optimal drug/treatment for a given clinical scenario.
> "Which is the most appropriate first-line treatment for…?"

**ADR — Adverse Drug Reactions**: Identify a drug-induced adverse effect, or choose the
most appropriate management of a known ADR.
> "Which drug is most likely responsible for this patient's…?"

**TDM — Therapeutic Drug Monitoring**: Interpret drug levels, identify when to take samples,
or adjust doses based on monitoring data.
> "When is the most appropriate time to take a trough level of vancomycin?"

**DAT — Data Interpretation**: Interpret clinical data (bloods, ECG, drug levels) in the
context of a drug or prescribing decision.
> "Which of the following blood results most urgently requires action?"

**COM — Communication**: Drug counselling, patient information, explaining risks.
> "Which is the most important counselling point for a patient starting warfarin?"

---

## Item Type 2: Calculation (CAL)

Requires entering a **single correct numerical answer**. Correct scores **2 marks**, incorrect 0. No partial credit. A tolerance range allows for rounding.

### Format

```markdown
### Q3 | CALCULATION | Calculation Skills | Paediatrics

A 16 kg child with status asthmaticus requires aminophylline as a loading dose.
The recommended dose is 5 mg/kg IV over 20 minutes. The available preparation is
aminophylline 250 mg in 10 mL (25 mg/mL).

**Calculate the volume of aminophylline solution required for the loading dose.**

UNIT: mL
ANSWER: 3.2
TOLERANCE: 0.1
WORKING:
Step 1: Dose = 16 kg × 5 mg/kg = 80 mg
Step 2: Volume = 80 mg ÷ 25 mg/mL = 3.2 mL

> Aminophylline loading dose: 5 mg/kg IV over 20 min. Omit if already on theophylline.
> Therapeutic range: 10–20 mg/L. Monitor ECG during infusion.
```

### Directives

| Directive | Required | Description |
|-----------|----------|-------------|
| `UNIT:` | Yes | Unit label shown on the input (e.g. `mL`, `mg`, `mL/hour`, `mmol`) |
| `ANSWER:` | Yes | The correct numerical answer (decimal or integer) |
| `TOLERANCE:` | No | Allowed deviation either side (default 0). Set to ~5% of the answer for rounding. |
| `WORKING:` | No | Step-by-step working shown after submission. Multi-line — each step on its own line. |

### Calculation Tips

- Set `TOLERANCE` to account for legitimate rounding: e.g. `TOLERANCE: 0.1` for mL volumes, `TOLERANCE: 0.05` for rates, `TOLERANCE: 5` for whole-number doses.
- `WORKING:` section ends at the first blank line or the blockquote `>`.
- The question stem (bold `**...**`) should clearly specify the unit expected as the answer.
- Common calculation types in PSA:
  - **Volume to administer**: dose ÷ concentration
  - **Infusion rate**: (dose × weight) ÷ concentration
  - **Dose in mg**: weight × dose/kg
  - **Drip rate**: volume ÷ time (in drops/min with drop factor)
  - **Number of tablets**: total dose ÷ tablet strength
  - **mmol from grams**: grams ÷ molecular weight × 1000

---

## Item Type 3: Prescription (PWS)

The most heavily weighted item type: **10 marks per item** (5 for the drug choice + 5 for dose/route/frequency). The user completes a drug chart form with five fields.

### Format

```markdown
### Q6 | PRESCRIPTION | Prescription Writing | Emergency

A 28-year-old woman (weight 68 kg) is brought to the Emergency Department following
a bee sting. She has generalised urticaria, audible stridor, and BP 72/40 mmHg.
She has no known drug allergies.

**Complete a prescription for the most appropriate immediate treatment.**

DRUG: Adrenaline (epinephrine) | Adrenaline | Epinephrine
DOSE: 500 micrograms | 0.5 mg | 500mcg
ROUTE: Intramuscular (IM) | IM | Intramuscular
FREQUENCY: Once (STAT) | STAT | Once | Immediately
INDICATION: Anaphylaxis

> IM adrenaline 500 micrograms (0.5 mL of 1:1000) into the anterolateral thigh is
> first-line for anaphylaxis. Repeat every 5 minutes if no improvement.
> Also give: O₂, IV fluids, chlorphenamine 10 mg IM, hydrocortisone 200 mg IV.
```

### Directives

| Field | Required | Description |
|-------|----------|-------------|
| `DRUG:` | Yes | Correct drug name. Separate accepted synonyms with `\|`. |
| `DOSE:` | Yes | Correct dose with units. Synonyms separated by `\|`. |
| `ROUTE:` | Yes | Route of administration. Include the abbreviation as a synonym. |
| `FREQUENCY:` | Yes | Dosing frequency. Include the abbreviation as a synonym. |
| `INDICATION:` | No | Clinical indication (shown as an optional field in the form). |

### Synonym Rules

The first entry is the "ideal" answer shown in feedback. All pipe-separated values are accepted as correct (case-insensitive):

```
DRUG: Metformin | Metformin hydrochloride | Glucophage
DOSE: 500 mg | 500mg | 0.5 g
ROUTE: Oral (PO) | PO | Oral | By mouth | po
FREQUENCY: Twice daily (BD) | BD | Twice daily | bd | Two times a day | b.d.
```

### Route Abbreviations

Always include both the full form and abbreviation as synonyms:

| Abbreviation | Full Form |
|---|---|
| `PO` | Oral |
| `IV` | Intravenous |
| `IM` | Intramuscular |
| `SC` | Subcutaneous |
| `SL` | Sublingual |
| `PR` | Rectal |
| `IN` | Intranasal |
| `TD` | Transdermal |
| `TOP` | Topical |
| `NEB` | Nebulised |
| `INH` | Inhaled |
| `IO` | Intraosseous |
| `IT` | Intrathecal |

Example: `ROUTE: Intravenous (IV) | IV | Intravenous | IV infusion | IV bolus`

### Frequency Abbreviations

| Abbreviation | Full Form |
|---|---|
| `OD` | Once daily |
| `BD` | Twice daily |
| `TDS` | Three times daily |
| `QDS` | Four times daily |
| `STAT` | Once (immediately) |
| `PRN` | When required |
| `nocte` | At night |
| `mane` | In the morning |

Example: `FREQUENCY: Three times daily (TDS) | TDS | Three times a day | t.d.s.`

### Prescribing Tips

- The **DOSE field** does not have autocomplete — users must type it exactly. Make synonyms generous (include `500 mg`, `500mg`, `0.5 g` etc.).
- For paediatric doses, specify per-kg where appropriate in the scenario.
- For infusions, the frequency may be `FREQUENCY: Once (STAT) | STAT` (for a single loading dose) or a rate expressed in the dose field (e.g. `10 mg/hour`).
- Include the bare abbreviation AND the full form in both ROUTE and FREQUENCY synonyms.

---

## Item Type 4: Prescription Review (REV)

Each REV item presents **one clinical scenario** with a patient's current prescription, then asks **two linked MCQ questions (Part A and Part B)**. Total **4 marks** (divided between A and B). Both questions are shown simultaneously and submitted together.

### Format

```markdown
### Q11 | REVIEW | Prescription Review | General Medicine

MARKS_A: 2
MARKS_B: 2

A 67-year-old man with atrial fibrillation (on warfarin, target INR 2–3) presents to
his GP with a productive cough. He is prescribed co-trimoxazole 960 mg BD for 7 days
by a locum. His most recent INR four days ago was 2.4. He takes no other regular
medications.

**Current prescription:**
| Drug | Dose | Route | Frequency | Indication |
|------|------|-------|-----------|------------|
| Warfarin | 5 mg | Oral | Once daily | AF |
| Co-trimoxazole | 960 mg | Oral | Twice daily | Chest infection |

**Part A: Which of the following most accurately describes the prescribing concern?**

A. Co-trimoxazole is absolutely contraindicated in atrial fibrillation
B. Co-trimoxazole inhibits CYP2C9, increasing warfarin levels and bleeding risk ✓
C. The warfarin dose is too high for this indication
D. These drugs are safe to co-prescribe without additional monitoring
E. Co-trimoxazole reduces warfarin efficacy through enzyme induction

**Part B: What is the most appropriate immediate action?**

A. Continue both drugs and recheck INR in 2 weeks
B. Stop warfarin immediately and restart after completing the antibiotic course
C. Stop co-trimoxazole, prescribe an alternative antibiotic, and check INR within 3–5 days ✓
D. Reduce warfarin to 2.5 mg OD and continue co-trimoxazole
E. Refer urgently to haematology

> Co-trimoxazole (trimethoprim component) inhibits CYP2C9, which metabolises warfarin —
> this significantly raises INR and bleeding risk. **Action:** stop co-trimoxazole and
> prescribe a safe alternative (e.g. amoxicillin or nitrofurantoin depending on the
> infection). Check INR within 3–5 days. If INR >5: withhold warfarin and consider
> vitamin K 1–3 mg oral.
```

### Directives

| Directive | Required | Description |
|-----------|----------|-------------|
| `MARKS_A:` | No | Marks for Part A (default: 2) |
| `MARKS_B:` | No | Marks for Part B (default: 2) |

### REV Rules

- `MARKS_A` and `MARKS_B` must appear **before** the scenario text
- Each part label must use the exact format: `**Part A: Question text?**` and `**Part B: Question text?**`
- Always exactly **5 options** (A–E) for each part
- Mark the correct answer with `✓` — one per part
- The prescription table is optional but strongly recommended for REV items
- Both parts are shown simultaneously; the user selects answers for A and B before submitting
- Scoring: each part is marked independently — it is possible to score 2/4 (one part correct)

### REV Clinical Scenarios

The two parts should build on each other and test complementary knowledge:

| Part A | Part B |
|--------|--------|
| Identify the problem | Select the appropriate action |
| Identify the interacting drug | Choose the appropriate management |
| Which drug is causing the ADR | What monitoring is required |
| What dose adjustment is needed | Why is the adjustment needed |

---

## Complete File Example

```markdown
---
title: PSA Practice Set — Mixed
specialty: Clinical Pharmacology
psa: true
---

### Q1 | MCQ | Adverse Drug Reactions | Cardiology

Scenario...

**Question?**

A. Option
B. Option ✓
C. Option
D. Option
E. Option

> Explanation.

---

### Q2 | CALCULATION | Calculation Skills | General Medicine

Scenario...

**Calculate the volume required in mL.**

UNIT: mL
ANSWER: 4.0
TOLERANCE: 0.1
WORKING:
Step 1: ...
Step 2: ...

> Explanation.

---

### Q3 | PRESCRIPTION | Prescription Writing | Emergency

Scenario...

**Complete a prescription for the most appropriate immediate treatment.**

DRUG: Drug name | Synonym
DOSE: 500 mg | 0.5 g
ROUTE: Intravenous (IV) | IV | Intravenous
FREQUENCY: Once (STAT) | STAT

> Explanation.

---

### Q4 | REVIEW | Prescription Review | General Medicine

MARKS_A: 2
MARKS_B: 2

Scenario...

**Current prescription:**
| Drug | Dose | Route | Frequency |
|------|------|-------|-----------|
| Drug A | 10 mg | Oral | OD |
| Drug B | 500 mg | Oral | BD |

**Part A: Question?**

A. Option
B. Option ✓
C. Option
D. Option
E. Option

**Part B: Question?**

A. Option ✓
B. Option
C. Option
D. Option
E. Option

> Explanation.
```

---

## Marking Summary

| Type | Marks Available | Partial Credit |
|------|-----------------|----------------|
| MCQ (MAN/COM/ADR/TDM/DAT) | 2 | No |
| CAL | 2 | No (tolerance for rounding) |
| PWS | 10 (5 drug + 5 dose/route/frequency) | Synonyms = full credit |
| REV | 4 (MARKS_A + MARKS_B) | Yes — each part marked independently |

---

## Authoring Checklist

Before saving a question file, verify:

- [ ] YAML frontmatter present with `psa: true`
- [ ] Every question has `### Q{n} | TYPE | Section | Specialty` header
- [ ] Questions separated by `---` horizontal rules
- [ ] MCQ/REV-part options always A–E (exactly 5)
- [ ] Exactly one `✓` per MCQ question / per REV part
- [ ] CALCULATION includes `UNIT:` and `ANSWER:`
- [ ] PRESCRIPTION includes at minimum `DRUG:`, `DOSE:`, `ROUTE:`, `FREQUENCY:`
- [ ] PRESCRIPTION synonyms include bare abbreviations (e.g. `IM`, `BD`)
- [ ] REV includes `MARKS_A:` and `MARKS_B:` before the scenario text (if non-default)
- [ ] REV `**Part A/B:**` labels in bold with question text on the same line
- [ ] Explanation `>` blockquote references current BNF/NICE guidance

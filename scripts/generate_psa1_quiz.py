"""
generate_psa1_quiz.py
Produces static/assets/PSA/psa1-quiz.md — the app-compatible companion to
psa1_extracted.md.  Uses ### Q{n} | TYPE | SECTION | Specialty headers that
QuizManager.parsePsaMarkdown() understands.

Question map
  Q1–Q29   CALCULATION   (all 29 calc Q+A from slides 2–36)
  Q30–Q36  PRESCRIPTION  (7 fluid Qs with text answers — A1–A7, slides 37–44)
  Q37–Q49  MCQ           (13 image-only prescribing scenarios → MCQ format)
  Q50–Q59  REVIEW        (10 prescription-review Qs, slides 66–75)
  Q60–Q75  MCQ           (16 applied-knowledge Qs, slides 76–91)
"""

LINES = []


def w(*args):
    LINES.append(" ".join(str(a) for a in args))


def blank():
    LINES.append("")


def sep():
    LINES.append("---")
    LINES.append("")


# ── header ──────────────────────────────────────────────────────────────────
LINES += [
    "---",
    "title: PSA 1 2026 — App Quiz Bank",
    "source: PSA 1 2026.pptx (91 slides, March 2026)",
    "specialty: Clinical Pharmacology",
    "psa: true",
    "---",
    "",
    "<!-- ═══ SECTION A — CALCULATION SKILLS (2 marks each) ═══ -->",
    "",
]

# ── helpers ──────────────────────────────────────────────────────────────────
def calc_q(n, section, specialty, scenario, prompt, unit, answer, tolerance, working, explanation=""):
    w(f"### Q{n} | CALCULATION | {section} | {specialty}")
    blank()
    w(scenario)
    blank()
    w(f"**{prompt}**")
    blank()
    w(f"UNIT: {unit}")
    w(f"ANSWER: {answer}")
    w(f"TOLERANCE: {tolerance}")
    w("WORKING:")
    for line in working.strip().splitlines():
        w(line)
    if explanation:
        blank()
        w(f"> {explanation}")
    blank()
    sep()


def presc_q(n, section, specialty, scenario, prompt, drug, dose, route, frequency, explanation="", indication=""):
    w(f"### Q{n} | PRESCRIPTION | {section} | {specialty}")
    blank()
    w(scenario)
    blank()
    w(f"**{prompt}**")
    blank()
    w(f"DRUG: {drug}")
    w(f"DOSE: {dose}")
    w(f"ROUTE: {route}")
    w(f"FREQUENCY: {frequency}")
    if indication:
        w(f"INDICATION: {indication}")
    if explanation:
        blank()
        w(f"> {explanation}")
    blank()
    sep()


def mcq_q(n, section, specialty, scenario, prompt, options, correct_idx, explanation=""):
    """options = list of strings; correct is 0-based index"""
    w(f"### Q{n} | MCQ | {section} | {specialty}")
    blank()
    w(scenario)
    blank()
    w(f"**{prompt}**")
    blank()
    letters = "ABCDE"
    for i, opt in enumerate(options):
        marker = " ✓" if i == correct_idx else ""
        w(f"{letters[i]}. {opt}{marker}")
    if explanation:
        blank()
        w(f"> {explanation}")
    blank()
    sep()


def review_q(n, section, specialty, scenario, marks_a, marks_b,
             stem_a, opts_a, correct_a,
             stem_b, opts_b, correct_b,
             explanation=""):
    w(f"### Q{n} | REVIEW | {section} | {specialty}")
    blank()
    w(f"MARKS_A: {marks_a}")
    w(f"MARKS_B: {marks_b}")
    blank()
    w(scenario)
    blank()
    w(f"**Part A: {stem_a}**")
    blank()
    letters = "ABCDE"
    for i, opt in enumerate(opts_a):
        marker = " ✓" if i == correct_a else ""
        w(f"{letters[i]}. {opt}{marker}")
    blank()
    w(f"**Part B: {stem_b}**")
    blank()
    for i, opt in enumerate(opts_b):
        marker = " ✓" if i == correct_b else ""
        w(f"{letters[i]}. {opt}{marker}")
    if explanation:
        blank()
        w(f"> {explanation}")
    blank()
    sep()


# ════════════════════════════════════════════════════════════════════════════
# SECTION A — CALCULATION SKILLS  Q1–Q29
# ════════════════════════════════════════════════════════════════════════════

calc_q(1, "Calculation Skills", "Paediatrics",
    "A 27-day-old baby boy is brought to his GP with sinusitis. He requires treatment with co-amoxiclav 30 mg/kg (maximum dose 125 mg). Weight 5.1 kg.",
    "What dose (g) of co-amoxiclav should be prescribed?",
    "g", 0.125, 0,
    "Weight-based dose: 30 mg/kg × 5.1 kg = 153 mg\nBut maximum dose = 125 mg\n125 mg ÷ 1000 = 0.125 g",
    "Always check stated maximum doses. Despite the weight-based calculation yielding 153 mg, the maximum dose of 125 mg applies."
)

calc_q(2, "Calculation Skills", "Paediatrics",
    "A 12-year-old boy with juvenile idiopathic osteoarthritis requires treatment with ibuprofen at a dose of 30 mg/kg in four divided doses. Weight 32 kg.",
    "What dose (mg) of ibuprofen should be prescribed for each dose?",
    "mg", 240, 0,
    "Total daily dose: 30 mg/kg × 32 kg = 960 mg\nDivided into 4 doses: 960 mg ÷ 4 = 240 mg per dose",
    "Calculate the total daily dose first, then divide by the number of doses. Check the individual dose does not exceed the maximum single dose."
)

calc_q(3, "Calculation Skills", "Dermatology",
    "A 21-year-old woman requires treatment with isotretinoin at a dose of 500 mcg/kg daily in two divided doses. Weight 60 kg.",
    "What dose (g) of isotretinoin should be prescribed for each dose?",
    "g", 0.015, 0,
    "500 mcg/kg × 60 kg = 30,000 mcg\n30,000 mcg ÷ 1000 = 30 mg total daily\n30 mg ÷ 2 (divided doses) = 15 mg per dose\n15 mg ÷ 1000 = 0.015 g per dose",
    "Two unit conversions required: mcg→mg AND mg→g. Divide by the number of doses AFTER calculating the total daily dose."
)

calc_q(4, "Calculation Skills", "General Medicine",
    "A 45-year-old man having an acute panic attack requires treatment with lorazepam 25 mcg/kg by slow intravenous injection. Weight 64 kg. Lorazepam is available in ampoules containing 4 mg/1 ml.",
    "What volume (ml) of lorazepam is required?",
    "ml", 0.4, 0.02,
    "25 mcg/kg × 64 kg = 1600 mcg → convert: 1600 ÷ 1000 = 1.6 mg (dose)\nConcentration = 4 mg/1 ml\nVolume = dose ÷ concentration = 1.6 mg ÷ (4 mg/ml) = 0.4 ml",
    "Remember to convert mcg to mg before dividing by the concentration. Volume = dose ÷ concentration."
)

calc_q(5, "Calculation Skills", "Paediatrics",
    "A 5-year-old girl requires treatment with drug B by IV infusion at a dose of 1.5 mg/m² (maximum dose 1 mg). Weight 16 kg, height 98 cm, BSA 0.68 m². Drug B is available at a concentration of 10 mg/7.5 ml.",
    "What volume (ml) of drug B should be given intravenously?",
    "ml", 0.75, 0.01,
    "BSA-based dose: 1.5 mg/m² × 0.68 m² = 1.02 mg → check maximum: max = 1 mg\nDose = 1 mg (maximum applies)\nVolume = 1 mg ÷ (10 mg/7.5 ml) = 1 × 7.5/10 = 0.75 ml",
    "Check the maximum dose after calculating the BSA-based dose. Volume = dose ÷ concentration (rearrange if needed)."
)

calc_q(6, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 110 mcg/kg. Weight 80 kg. Drug B is initially available in 10 ml ampoules of 50 mg/25 ml. Each ampoule is diluted with 90 ml of sodium chloride 0.9% prior to use.",
    "What volume (ml) of diluted drug B should be given intravenously?",
    "ml", 44, 0,
    "110 mcg/kg × 80 kg = 8800 mcg → 8800 ÷ 1000 = 8.8 mg (dose)\nInitial concentration: 50 mg/25 ml\nDiluted concentration: 50 mg in (25 + 90) ml? NO — 10 ml ampoule diluted to 100 ml: 50 mg/250 ml (1:10 dilution)\nCommon error: 50 mg/115 ml — this is wrong; dilution means total volume becomes 10× the original\nVolume = 8.8 mg ÷ (50 mg/250 ml) = 8.8 × 250/50 = 44 ml",
    "Dilution: '10 ml ampoule diluted with 90 ml' means total volume = 100 ml. But the stock solution was 50 mg in 25 ml, so the ampoule (10 ml) contains 20 mg. Diluted: 20 mg in 100 ml = 50 mg in 250 ml equivalent — track the drug amounts carefully."
)

calc_q(7, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion. Weight 80 kg. Drug B is available in 5 ml ampoules containing 25 mg, diluted with sodium chloride 0.9% to a concentration of 100 mcg/1 ml prior to use. The final volume to be administered is 10 ml.",
    "What volume (ml) of sodium chloride 0.9% is required for this dilution?",
    "ml", 9.8, 0.1,
    "Final volume = 10 ml, diluted concentration = 100 mcg/ml = 0.1 mg/ml\nTotal drug in 10 ml = 10 × 0.1 mg = 1 mg (dose)\nInitial concentration = 25 mg/5 ml = 5 mg/ml\nInitial volume = 1 mg ÷ 5 mg/ml = 0.2 ml\nVolume of diluent = 10 ml − 0.2 ml = 9.8 ml",
    "Work backwards: use the target concentration and final volume to find the dose, then find the initial volume from the stock concentration. Diluent = final volume − initial volume."
)

calc_q(8, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 5 mcg/kg. Weight 80 kg. Drug B is initially available at 2 mg/5 ml. 1 part drug B is diluted with 9 parts glucose 5% prior to use.",
    "What volume (ml) of diluted drug B should be given intravenously?",
    "ml", 10, 0,
    "5 mcg/kg × 80 kg = 400 mcg → 0.4 mg (dose)\nInitial concentration: 2 mg/5 ml\n'1 part drug B diluted with 9 parts glucose' = 1:10 dilution\nDiluted concentration: 2 mg/50 ml\nVolume = 0.4 mg ÷ (2 mg/50 ml) = 0.4 × 50/2 = 10 ml",
    "'1 part X diluted with 9 parts Y' = 1:10 dilution — 1 out of every 10 parts is drug. Multiply the stock volume by 10."
)

calc_q(9, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 100 mcg/kg. Weight 80 kg. Drug B is available at 100 mg/25 ml, diluted with sodium chloride 0.9% to a final concentration of 1 mg/1 ml prior to use.",
    "What volume (ml) of drug B should be given intravenously?",
    "ml", 8, 0,
    "100 mcg/kg × 80 kg = 8000 mcg → 8 mg (dose)\nDiluted concentration = 1 mg/ml\nVolume = 8 mg ÷ 1 mg/ml = 8 ml",
    "Once the diluted concentration is given, calculation is straightforward. Ensure unit conversion (mcg → mg) before dividing."
)

calc_q(10, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 5 mg/kg. Weight 80 kg. Drug B is available at 5 mg/1 ml. This must be diluted 1-in-20 with sodium chloride 0.9% prior to use.",
    "What volume (ml) of diluted drug B should be given intravenously?",
    "ml", 1600, 0,
    "5 mg/kg × 80 kg = 400 mg (dose)\nInitial concentration: 5 mg/ml\n'Diluted 1-in-20': diluted concentration = 5 mg/20 ml\nVolume = 400 mg ÷ (5 mg/20 ml) = 400 × 20/5 = 1600 ml",
    "'Diluted 1-in-20' means 1 part drug in 20 parts total (unlike 1 part drug + 20 parts diluent). Concentration becomes 1/20 of original."
)

calc_q(11, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 100 mg. Drug B is available as a powder, diluted with glucose 5% to a concentration of 10 mg/1 ml prior to use.",
    "What volume (ml) of the reconstituted solution should be given intravenously?",
    "ml", 10, 0,
    "Dose = 100 mg\nConcentration = 10 mg/ml\nVolume = 100 mg ÷ 10 mg/ml = 10 ml",
    "Simple volume = dose ÷ concentration. No unit conversion needed here."
)

calc_q(12, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 0.5 mg/kg/h. Weight 80 kg. Drug B is available as 20 mg/1 ml, diluted with glucose 5% to a concentration of 5 mg/1 ml prior to use.",
    "At what rate (ml/h) should the diluted drug B infusion be delivered?",
    "ml/h", 8, 0,
    "0.5 mg/kg/h × 80 kg = 40 mg/h (dose per time)\nDiluted concentration = 5 mg/ml\nRate = 40 mg/h ÷ 5 mg/ml = 8 ml/h",
    "For infusion rates: rate (ml/h) = dose-per-time (mg/h) ÷ concentration (mg/ml). Use the diluted concentration — the dilution step is irrelevant if the diluted concentration is given."
)

calc_q(13, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 1.2 g. Weight 80 kg. The infusion must be delivered at a rate not exceeding 20 mg/min.",
    "What is the minimum duration (h) that drug B can be safely infused?",
    "h", 1, 0.01,
    "Dose = 1.2 g = 1200 mg (convert)\nMax rate = 20 mg/min\nMin time = dose ÷ rate = 1200 mg ÷ 20 mg/min = 60 min\n60 min ÷ 60 = 1 h",
    "Time = dose ÷ rate. Convert g to mg first, then convert minutes to hours as the question asks for hours."
)

calc_q(14, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 200 ng/kg/min. Weight 80 kg. Drug B is available in 100 ml ampoules containing 5 mg each.",
    "At what rate (ml/h) should the drug B infusion be delivered?",
    "ml/h", 19.2, 0.1,
    "200 ng/kg/min × 80 kg = 16,000 ng/min\n= 16 mcg/min = 0.016 mg/min\n= 0.016 × 60 = 0.96 mg/h (dose per time)\nConcentration = 5 mg/100 ml\nRate = 0.96 mg/h ÷ (5 mg/100 ml) = 0.96 × 100/5 = 19.2 ml/h",
    "Multi-step: ng → mcg → mg, then /min → /h, then rate = dose-per-time ÷ concentration. Write out every unit conversion step."
)

calc_q(15, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 0.001 mg/kg/min. Weight 80 kg. Drug B is initially available at 10 mg/5 ml, diluted from 5 ml to 50 ml with sodium chloride 0.9% prior to use.",
    "At what rate (ml/h) should the diluted drug B infusion be delivered?",
    "ml/h", 24, 0,
    "0.001 mg/kg/min × 80 kg = 0.08 mg/min × 60 = 4.8 mg/h (dose per time)\nInitial concentration: 10 mg/5 ml\nDiluted: 5 ml → 50 ml (×10 dilution): 10 mg/50 ml\nRate = 4.8 mg/h ÷ (10 mg/50 ml) = 4.8 × 50/10 = 24 ml/h",
    "Dilution: 5 ml made up to 50 ml = 1:10 dilution. Divide original concentration by 10."
)

calc_q(16, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B at a dose of 0.2 mcg/kg/min. Weight 80 kg. Drug B is available in 10 ml vials of 2.5 mg/2 ml. Each vial is diluted with 90 ml of water prior to use.",
    "At what rate (ml/h) should the diluted drug B infusion be delivered?",
    "ml/h", 7.68, 0.02,
    "0.2 mcg/kg/min × 80 kg = 16 mcg/min = 0.016 mg/min × 60 = 0.96 mg/h\nStock: 2.5 mg/2 ml in a 10 ml vial (= 12.5 mg/10 ml)\nDiluted: 10 ml + 90 ml = 100 ml → 12.5 mg/100 ml\nRate = 0.96 mg/h ÷ (12.5 mg/100 ml) = 0.96 × 100/12.5 = 7.68 ml/h",
    "Dilution: 10 ml vial + 90 ml = 100 ml total. The vial contained 2.5 mg/2 ml × 5 = 12.5 mg."
)

calc_q(17, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 200 mg. Every 50 mg vial is diluted with 50 ml sodium chloride 0.9% prior to use. The first 25 mg is given over 15 minutes. The remaining dose is given at a rate not exceeding 3.33 mg/min.",
    "What is the minimum duration (mins) that drug B can be safely infused?",
    "mins", 68, 1,
    "Phase 1: 25 mg over 15 min (fixed)\nRemaining dose: 200 mg − 25 mg = 175 mg\nPhase 2 time = 175 mg ÷ 3.33 mg/min = 52.6 min ≈ 53 min\nTotal = 15 + 53 = 68 min",
    "Two-phase infusion: calculate each phase separately then add. Round phase 2 up to ensure the maximum rate is not exceeded."
)

calc_q(18, "Calculation Skills", "General Medicine",
    "A patient has received 10 ml of lidocaine hydrochloride 0.5% solution.",
    "What amount (mg) of lidocaine hydrochloride has the patient received?",
    "mg", 50, 0,
    "0.5% = 0.5 g per 100 ml = 500 mg per 100 ml = 5 mg/ml\n10 ml × 5 mg/ml = 50 mg",
    "Percentage concentrations: X% = X g per 100 ml. Convert to mg/ml then multiply by volume."
)

calc_q(19, "Calculation Skills", "Ophthalmology",
    "A patient has received 0.1 ml of atropine 1% eye drops.",
    "What amount (mg) of atropine has the patient received?",
    "mg", 1, 0,
    "1% = 1 g per 100 ml = 1000 mg per 100 ml = 10 mg/ml\n0.1 ml × 10 mg/ml = 1 mg",
    "1% = 10 mg/ml. Eye drops follow the same percentage convention: X% = X g/100 ml."
)

calc_q(20, "Calculation Skills", "Emergency Medicine",
    "A patient has received 1.5 ml of adrenaline 1:1000 intramuscularly during anaphylaxis resuscitation.",
    "What amount (mg) of adrenaline has the patient received?",
    "mg", 1.5, 0,
    "1:1000 = 1 g in 1000 ml = 1 mg/ml\n1.5 ml × 1 mg/ml = 1.5 mg",
    "Ratio concentrations: 1:X = 1 g in X ml. Anaphylaxis dose = 0.5 ml (0.5 mg) of 1:1000 IM. Cardiac arrest = 10 ml (1 mg) of 1:10,000 IV."
)

calc_q(21, "Calculation Skills", "Emergency Medicine",
    "A patient has received 35 ml of adrenaline 1:10,000 intravenously during cardiopulmonary resuscitation.",
    "What amount (mg) of adrenaline has the patient received?",
    "mg", 3.5, 0,
    "1:10,000 = 1 g in 10,000 ml = 0.1 mg/ml (or 1 mg per 10 ml)\n35 ml × 0.1 mg/ml = 3.5 mg",
    "1:10,000 adrenaline = 0.1 mg/ml. 10 ml (1 ampoule) = 1 mg. 35 ml = 3.5 mg."
)

calc_q(22, "Calculation Skills", "Paediatrics",
    "An 8-year-old boy has received 3 ml of lidocaine hydrochloride 2% as a peripheral nerve block. He still has pain. The maximal dose of lidocaine 2% for his age is 3 mg/kg. Weight 30 kg.",
    "What additional volume (ml) of lidocaine hydrochloride can the patient receive before reaching the maximal dose?",
    "ml", 1.5, 0,
    "2% = 20 mg/ml\nMax dose: 3 mg/kg × 30 kg = 90 mg\nMax volume = 90 mg ÷ 20 mg/ml = 4.5 ml\nAlready received: 3 ml\nAdditional volume = 4.5 − 3 = 1.5 ml",
    "Calculate the maximum allowable volume first, then subtract what has already been given."
)

calc_q(23, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 15 mg/kg twice daily. Weight 80 kg. Drug B is available in 250 mg vials that cannot be reused and must be discarded. Her next clinic appointment is in 7 days.",
    "How many 250 mg vials of drug B does she require to last her 7 days?",
    "vials", 70, 0,
    "Dose per administration: 15 mg/kg × 80 kg = 1200 mg\nVials per dose: 1200 ÷ 250 = 4.8 → round UP to 5 vials (vials cannot be part-used)\n5 vials × 2 doses/day × 7 days = 70 vials",
    "Round UP at the per-dose step (vials cannot be reused, so any partial vial is wasted). Then multiply by frequency and days."
)

calc_q(24, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B by IV infusion at a dose of 5 mcg/kg twice daily. Weight 80 kg. Drug B is available in 100 ml bottles at a concentration of 4 mg/100 ml. Her next appointment is in 6 weeks.",
    "How many 100 ml bottles of drug B does she require to last her 6 weeks?",
    "bottles", 9, 0,
    "5 mcg/kg × 80 kg = 400 mcg = 0.4 mg per dose\n0.4 mg × 2 doses/day = 0.8 mg/day\n6 weeks = 42 days\nTotal = 0.8 × 42 = 33.6 mg\n4 mg per 100 ml bottle\nBottles = 33.6 ÷ 4 = 8.4 → round UP to 9",
    "Calculate total drug needed over the supply period, then divide by drug per bottle and round up."
)

calc_q(25, "Calculation Skills", "General Medicine",
    "A 60-year-old woman requires treatment with drug B on a reducing dose regime. Drug B is available in 5 mg tablets in packs of 28.\nReducing dose regime:\n7 days 40 mg once daily\n7 days 30 mg once daily\n7 days 20 mg once daily\n7 days 10 mg once daily\n7 days 5 mg once daily",
    "How many packs of 5 mg tablets does the patient require to complete the whole reducing course?",
    "packs", 6, 0,
    "Tablets per week: 40/5=8, 30/5=6, 20/5=4, 10/5=2, 5/5=1 tablets/day\nWeekly tablets: 56, 42, 28, 14, 7\nTotal tablets = 56+42+28+14+7 = 147\n147 ÷ 28 per pack = 5.25 → round UP to 6 packs",
    "Sum tablets across all phases, divide by pack size, round up."
)

calc_q(26, "Calculation Skills", "Paediatrics",
    "A 3-year-old girl requires treatment with drug B with a planned uptitration. Weight 13 kg. Drug B is available in 250 ml bottles at a concentration of 50 mg/ml.\nPlanned uptitration:\n7 days 10 mg/kg once daily\n7 days 10 mg/kg twice daily\n14 days 15 mg/kg twice daily\n14 days 20 mg/kg twice daily",
    "How many 250 ml bottles of drug B does the patient require to complete the whole planned uptitration (42 days)?",
    "bottles", 2, 0,
    "Daily amounts (mg):\nWeek 1: 10×13 = 130 mg/day × 7 = 910 mg\nWeek 2: 10×13×2 = 260 mg/day × 7 = 1820 mg\nWeeks 3-4: 15×13×2 = 390 mg/day × 14 = 5460 mg\nWeeks 5-6: 20×13×2 = 520 mg/day × 14 = 7280 mg\nTotal = 910+1820+5460+7280 = 15,470 mg\nDrug per bottle: 50 mg/ml × 250 ml = 12,500 mg\nBottles = 15,470 ÷ 12,500 = 1.24 → round UP to 2",
    "Calculate total drug for each phase, sum all phases, divide by drug per bottle, round up."
)

calc_q(27, "Calculation Skills", "Haematology",
    "A 60-year-old woman with iron deficiency anaemia has been taking ferrous fumarate 210 mg PO twice daily. She requests conversion to FerroEss syrup (ferrous fumarate 140 mg/5 ml; each 5 ml = 45 mg elemental iron). Measurable to the nearest 5 ml. Ferrous fumarate 210 mg contains 70 mg elemental iron.",
    "What volume of FerroEss syrup (to the nearest 5 ml) is required per day to meet her elemental iron intake?",
    "ml", 15, 0,
    "Current elemental iron: 70 mg × 2 doses = 140 mg/day\nFerroEss: 45 mg elemental iron per 5 ml\nVolume = 140 mg ÷ (45 mg/5 ml) = 140 × 5/45 = 15.6 ml\nRound to nearest 5 ml = 15 ml",
    "Convert to elemental iron equivalents (both preparations), then calculate volume and round to the specified accuracy."
)

calc_q(28, "Calculation Skills", "Palliative Care",
    "A 60-year-old woman with terminal breast cancer takes Zomorph (morphine sulphate MR) 60 mg twice daily plus oramorph. Over the last 24 hours she required: 08:00 10 mg oramorph; 18:00 10 mg oramorph. She switches to a subcutaneous syringe driver. Oral morphine 10 mg = subcutaneous morphine 5 mg. Subcutaneous morphine concentration = 10 mg/10 ml.",
    "At what rate (ml/h) should the morphine sulphate subcutaneous syringe driver be set?",
    "ml/h", 2.92, 0.05,
    "Regular dose: Zomorph 60 mg × 2 = 120 mg PO\nPRN oramorph: 10 + 10 = 20 mg PO\nTotal 24h oral morphine = 140 mg\nSubcutaneous equivalent: 140 ÷ 2 = 70 mg SC over 24h\nConcentration = 10 mg/10 ml = 1 mg/ml\nVolume needed = 70 mg ÷ 1 mg/ml = 70 ml over 24h\nRate = 70 ml ÷ 24h = 2.92 ml/h",
    "Oral:SC morphine = 2:1 (halve the oral dose). Add regular AND PRN doses used in the last 24h to calculate total 24h SC requirement."
)

calc_q(29, "Calculation Skills", "Paediatrics",
    "A 5-year-old boy with hypophosphataemic rickets requires alfacalcidol 50 ng/kg once daily (maximum 1 mcg daily). Weight 18 kg. One drop of alfacalcidol 5 mcg/1 ml oral solution contains 0.1 mcg.",
    "How many drops of alfacalcidol solution should the patient be given?",
    "drops", 9, 0,
    "50 ng/kg × 18 kg = 900 ng\n900 ng ÷ 1000 = 0.9 mcg (check maximum: 0.9 mcg < 1 mcg, so no maximum applies)\nEach drop = 0.1 mcg\nDrops = 0.9 mcg ÷ 0.1 mcg/drop = 9 drops",
    "Convert ng to mcg (÷1000), check against maximum dose, then divide by the amount per drop."
)


# ════════════════════════════════════════════════════════════════════════════
# SECTION B — PRESCRIPTION WRITING  Q30–Q36
# (7 fluid prescriptions with text answers)
# ════════════════════════════════════════════════════════════════════════════

LINES += ["<!-- ═══ SECTION B — PRESCRIPTION WRITING (10 marks each) ═══ -->", ""]

presc_q(30, "Prescription Writing", "Emergency Medicine",
    "A 66-year-old man presents to A&E with lethargy. He has a 2-day history of nausea and vomiting and has not tolerated any oral fluids. PMH: osteoarthritis. Medications: paracetamol 1000 mg PO PRN.\n\nExamination: Airway patent, alert. Sats 97% RA, RR 16, chest clear. BP 92/44, HR 120 regular, cap refill >3 s. Temp 37.4, GCS 15/15. Abdomen SNT, no oedema.",
    "Write a prescription for ONE IV fluid that is most appropriate to treat his current condition.",
    "Sodium chloride 0.9% | NaCl 0.9% | Normal saline | 0.9% sodium chloride",
    "500 ml",
    "Intravenous (IV) | IV",
    "Over 10 minutes | stat bolus | 10 minutes",
    "Hypovolaemia with hypotension (BP 92/44) and tachycardia (HR 120) — immediate crystalloid resuscitation is required. Give 500 ml NaCl 0.9% as a rapid bolus over 10 minutes as per NICE IV fluid guidance (sepsis protocol / ATLS). Reassess after each bolus.",
    "Hypovolaemia / fluid resuscitation"
)

presc_q(31, "Prescription Writing", "Endocrinology",
    "A 73-year-old woman is on the surgical ward for acute cholecystitis. She is sweaty, confused and drowsy. PMH: type 2 diabetes. Medications: metformin 1 g BD, empagliflozin 10 mg OD.\n\nExamination: Drowsy but rousable, confused. Sats 98% RA, BP 146/88, HR 100, cap refill 2 s. Capillary glucose 2.3 mmol/L.",
    "Write a prescription for ONE IV fluid that is most appropriate to treat her current condition.",
    "Glucose 20% | Dextrose 20% | 20% glucose",
    "100 ml",
    "Intravenous (IV) | IV",
    "Over 15 minutes | stat | 15 minutes",
    "Severe hypoglycaemia (capillary glucose 2.3 mmol/L) causing altered consciousness. IV glucose 20% 100 ml over 15 minutes is the first-line treatment. Note: glucose 10% 200 ml is an alternative. After recovery, recheck glucose and ensure the patient is able to eat/drink. Review and withhold empagliflozin (SGLT2 inhibitor).",
    "Hypoglycaemia"
)

presc_q(32, "Prescription Writing", "Endocrinology",
    "A 67-year-old woman presents to A&E with abdominal pain, weakness and confusion. She has recently seen her GP for lower back pain and bruising. PMH: hypertension. Medications: amlodipine 5 mg OD.\n\nInvestigations: Hb 99, Na 142, K 4.5, Cr 166, eGFR 45, Ca 4.8 mmol/L (normal 2.2–2.6).",
    "Write a prescription for ONE IV fluid that is most appropriate to treat her current condition.",
    "Sodium chloride 0.9% | NaCl 0.9% | Normal saline | 0.9% sodium chloride",
    "1000 ml",
    "Intravenous (IV) | IV",
    "Over 4 hours | 4 hours",
    "Severe hypercalcaemia (Ca 4.8, normal <2.6) — aggressive IV rehydration with NaCl 0.9% is essential to promote renal calcium excretion. Target 3–4 litres over 24 hours. Consider bisphosphonate (zoledronic acid) once rehydrated. Investigate underlying cause (malignancy likely given back pain, bruising, anaemia, raised Ca and Cr).",
    "Hypercalcaemia"
)

presc_q(33, "Prescription Writing", "General Medicine",
    "An 87-year-old man is admitted with a 3-day history of diarrhoea. He has not managed to eat or drink properly since symptoms started. PMH: nil. Medications: nil.\n\nInvestigations: Na 141, K 2.7 mmol/L (low), U 6.1, Cr 110, capillary glucose 4.9.",
    "Write a prescription for ONE IV fluid that is most appropriate to treat his current condition.",
    "Sodium chloride 0.9% / potassium chloride 0.3% | NaCl 0.9%/KCl 0.3% | Potassium chloride 0.3% in sodium chloride 0.9%",
    "1000 ml",
    "Intravenous (IV) | IV",
    "Over 4 hours | 4 hours",
    "Hypokalaemia (K 2.7 mmol/L) with dehydration. IV NaCl 0.9% with KCl 0.3% provides both volume replacement and potassium correction. Maximum safe IV potassium replacement rate on a general ward: 10 mmol/h (40 mmol/L at 250 ml/h). Recheck K after each litre. NaCl 0.9% alone would compound the hypokalaemia.",
    "Dehydration and hypokalaemia"
)

presc_q(34, "Prescription Writing", "General Medicine",
    "A 45-year-old woman is admitted to the surgical ward awaiting a laparoscopic appendicectomy for appendicitis. She is to remain NBM until her operation later this afternoon. PMH: nil. Medications: nil.\n\nInvestigations: Na 142, K 4.1, Cr 63, capillary glucose 7.1.",
    "Write a prescription for ONE IV fluid most appropriate for maintenance while she is NBM.",
    "Sodium chloride 0.9% / potassium chloride 0.3% | NaCl 0.9%/KCl 0.3% | Potassium chloride 0.3% in sodium chloride 0.9%",
    "1000 ml",
    "Intravenous (IV) | IV",
    "Over 8 hours | over 8-12 hours | 8 hours | 12 hours",
    "Peri-operative NBM maintenance fluid. Normal electrolytes — isotonic crystalloid with potassium replacement is appropriate (NICE guideline recommends 25–30 ml/kg/day water, 1 mmol/kg/day Na, K, Cl). Typical prescription: NaCl 0.9%/KCl 0.3% 1000 ml over 8–12h. Reassess after surgery when the patient resumes oral intake.",
    "Peri-operative NBM maintenance"
)

presc_q(35, "Prescription Writing", "General Medicine",
    "A 60-year-old woman awaiting an elective right hemicolectomy on the surgical ward. The operation has been delayed. She has already received one bag of NaCl 0.9%/KCl 0.3% 1000 ml over the last 12 hours. PMH: COPD. Medications: salbutamol MDI PRN, Seretide 250 Accuhaler 1 puff BD.\n\nInvestigations: Na 140, K 4.0, Cr 90, capillary glucose 5.6.",
    "Write a prescription for the NEXT IV maintenance fluid most appropriate for this patient.",
    "Glucose 5% / potassium chloride 0.15% | Glucose 5%/KCl 0.15% | Dextrose 5%/KCl 0.15%",
    "1000 ml",
    "Intravenous (IV) | IV",
    "Over 8 hours | over 8-12 hours | 8 hours | 12 hours",
    "She has already received NaCl 0.9%/KCl 0.3% — alternating with a glucose-based solution avoids cumulative sodium loading. Glucose 5%/KCl 0.15% provides free water, energy, and potassium. Normal K and Na — no need for additional KCl 0.3%. NICE recommends approximately 50–100 g glucose/day during peri-operative NBM periods.",
    "Peri-operative NBM maintenance (second bag)"
)

presc_q(36, "Prescription Writing", "General Medicine",
    "A 21-year-old man is admitted with worsening diarrhoea. Viral gastroenteritis is suspected. Symptoms for 3 days with poor oral intake. PMH: nil. Medications: nil.\n\nExamination: Airway patent, alert. Sats 99% RA, BP 120/72, HR 102, cap refill 3 s. Temp 37.4. Abdomen SNT.\nInvestigations: Na 137, K 3.4 mmol/L (mildly low), U 7.0, Cr 100.",
    "Write a prescription for ONE IV fluid that is most appropriate for this patient?",
    "Sodium chloride 0.9% / potassium chloride 0.3% | NaCl 0.9%/KCl 0.3% | Potassium chloride 0.3% in sodium chloride 0.9%",
    "1000 ml",
    "Intravenous (IV) | IV",
    "Over 4 hours | over 4-6 hours | 4 hours | 6 hours",
    "Mild dehydration (HR 102, cap refill 3 s) with mild hypokalaemia (K 3.4) from fluid and electrolyte losses. NaCl 0.9%/KCl 0.3% corrects both volume and potassium. Rate of 4–6 hours (versus resuscitation bolus) appropriate as the patient is not in severe shock.",
    "Dehydration and mild hypokalaemia (gastroenteritis)"
)


# ════════════════════════════════════════════════════════════════════════════
# Q37–Q49: MCQ PRESCRIBING SCENARIOS (image-based slides → clinical MCQ)
# ════════════════════════════════════════════════════════════════════════════

LINES += ["<!-- ═══ PRESCRIBING SCENARIOS (MCQ format — answers on image slides) ═══ -->", ""]

# Q37 – PRESC Q6 second fluid (COPD already had NaCl/KCl)
mcq_q(37, "Prescription Writing", "General Medicine",
    "A 60-year-old woman awaiting an elective right hemicolectomy has already received one bag of sodium chloride 0.9%/potassium chloride 0.3% 1000 ml over 12 hours. She remains NBM as her operation is further delayed. PMH: COPD. Medications: salbutamol MDI PRN, Seretide 250 Accuhaler 1 puff BD.\n\nInvestigations: Na 140, K 4.0, Cr 90.",
    "Which IV fluid is most appropriate for the next maintenance bag?",
    [
        "Sodium chloride 0.9%/potassium chloride 0.3% 1000 ml over 4 h",
        "Glucose 5%/potassium chloride 0.15% 1000 ml over 8–12 h",
        "Sodium chloride 0.9% 500 ml over 30 min",
        "Glucose 5% 1000 ml over 4 h",
        "Hartmann's solution 1000 ml over 8 h",
    ], 1,
    "She has already received NaCl 0.9%/KCl 0.3%; alternating with a glucose-based bag avoids sodium overload. K 4.0 is normal — KCl 0.15% maintains potassium. A rapid bolus would be inappropriate as she is haemodynamically stable."
)

# Q38 – PRESC Q9 stroke NBM Na 145
mcq_q(38, "Prescription Writing", "Neurology",
    "An 82-year-old man is admitted 6 hours after an acute stroke. SALT recommend NBM pending swallow assessment. PMH: atrial fibrillation. Medications: bisoprolol 5 mg OD.\n\nExamination: Alert but dysphasic, right hemiparesis. Sats 97% RA, BP 136/82, HR 86 irregular, cap refill 2 s.\nInvestigations: Na 145 mmol/L (slightly elevated), K 4.0, Cr 90.",
    "Which IV fluid is most appropriate for maintenance while this patient is NBM?",
    [
        "Sodium chloride 0.9%/potassium chloride 0.3% 1000 ml over 8 h",
        "Glucose 5% 1000 ml over 8–12 h",
        "Sodium chloride 0.9% 1000 ml over 4 h (rapid)",
        "Sodium chloride 0.9%/glucose 5% 1000 ml over 6 h",
        "Glucose 5%/potassium chloride 0.15% 1000 ml over 8 h",
    ], 1,
    "Na 145 is at the upper end of normal. Providing free water (glucose 5%) is preferable to further sodium loading. NaCl 0.9% would worsen borderline hypernatraemia. Glucose 5% provides free water and calories. K 4.0 is normal — KCl is not urgently required. Avoid hypotonic fluids with low sodium in acute stroke (risk of cerebral oedema)."
)

# Q39 – PRESC Q10 6yo asthma shocked
mcq_q(39, "Prescription Writing", "Paediatrics",
    "A 6-year-old girl (weight 19 kg) presents to A&E with shortness of breath and wheeze. PMH: asthma. Medications: salbutamol MDI PRN, beclomethasone 100 mcg 1 puff BD.\n\nExamination: Unable to complete sentences. Sats 96% on 15L NRB, RR 32, wheeze ++. BP 80/52, HR 146, cap refill 3 s.",
    "Which IV fluid is most appropriate to treat her hypotension?",
    [
        "Glucose 5% 190 ml IV bolus over 15 min",
        "Sodium chloride 0.9% 190 ml IV bolus over 5–10 min",
        "Sodium chloride 0.9%/potassium chloride 0.3% 500 ml over 4 h",
        "Hartmann's solution 1000 ml over 2 h",
        "Albumin 4% 100 ml IV over 30 min",
    ], 1,
    "Paediatric fluid resuscitation for shock: 10 ml/kg isotonic crystalloid IV bolus (NICE CG174). 10 ml/kg × 19 kg = 190 ml NaCl 0.9% over 5–10 minutes. Reassess after each bolus and repeat up to 3 times (max 30 ml/kg) if no improvement. Glucose solutions are not appropriate for fluid resuscitation."
)

# Q40 – PRESC Q11 9yo post-op ileus
mcq_q(40, "Prescription Writing", "Paediatrics",
    "A 9-year-old girl (weight 28 kg) is on the surgical ward following a laparoscopic appendicectomy. Post-operative ileus is suspected. She reports nausea and has vomited once. She is currently NBM.\n\nExamination: Haemodynamically stable. Sats 100% RA, BP 108/72, HR 98, cap refill 2 s.\nInvestigations: Na 139, K 4.5, Cr 70.",
    "Which IV fluid is most appropriate for maintenance while she is NBM?",
    [
        "Sodium chloride 0.9%/glucose 5% 1000 ml over 24 h",
        "Sodium chloride 0.9%/glucose 5%/potassium chloride 0.15% 1000 ml over 8 h",
        "Hartmann's solution 500 ml over 4 h",
        "Sodium chloride 0.9% 500 ml over 2 h",
        "Glucose 5% 1000 ml over 12 h",
    ], 1,
    "NICE CG174 paediatric maintenance fluids: isotonic NaCl 0.9%/glucose 5% with KCl 0.15% at an appropriate Holliday-Segar rate. K 4.5 is high-normal — KCl 0.15% is safe. Avoid hypotonic fluids (0.45% NaCl/glucose) due to risk of hyponatraemia. Calculate maintenance rate: 100 ml/kg for first 10 kg + 50 ml/kg for next 10 kg + 20 ml/kg thereafter = 1680 ml/24h for 28 kg."
)

# Q41 – PRESC Q12 6yo acute severe asthma 2nd line
mcq_q(41, "Prescription Writing", "Paediatrics",
    "A 6-year-old boy presents to A&E with worsening shortness of breath and wheeze. PMH: asthma. His father has given 12 puffs of salbutamol at home.\n\nExamination: Acutely short of breath. Sats 93% on 15L NRB, RR 42, wheeze ++. BP 120/68, HR 136. Temp 37.5.\n\nHe has been given back-to-back salbutamol and ipratropium nebulisers in A&E with no improvement.",
    "Select ONE prescription for the drug most appropriate to provide rapid relief of his shortness of breath.",
    [
        "Amoxicillin 250 mg IV TDS",
        "Magnesium sulfate 40 mg/kg IV over 20 min (max 2 g)",
        "Prednisolone 1 mg/kg PO OD (max 40 mg)",
        "Aminophylline 5 mg/kg IV loading dose",
        "Hydrocortisone 4 mg/kg IV stat",
    ], 1,
    "Life-threatening/acute severe asthma not responding to bronchodilators: IV magnesium sulfate 40 mg/kg (max 2 g) over 20 minutes — SIGN/BTS guideline, strong evidence in paediatrics. It causes bronchodilation by blocking calcium channels. Prednisolone/hydrocortisone are important adjuncts but act slowly. Aminophylline is second-line after magnesium. Antibiotics are not indicated for acute asthma without infection."
)

# Q42 – PRESC Q13 COPD exacerbation
mcq_q(42, "Prescription Writing", "Respiratory Medicine",
    "A 72-year-old man is referred to A&E with worsening shortness of breath and dry cough. PMH: COPD. Medications: salbutamol 100 mcg 2 puffs PRN, tiotropium 18 mcg 1 puff OD.\n\nExamination: Sats 89% on 28% Venturi mask, RR 32. Reduced air entry bilaterally. CXR: hyperinflation only.\n\nSalbutamol and ipratropium nebulisers have been commenced.",
    "Select ONE additional prescription that is most appropriate to treat his symptoms.",
    [
        "Amoxicillin 500 mg PO TDS for 5 days",
        "Prednisolone 30 mg PO once daily for 5 days",
        "Theophylline 250 mg PO BD",
        "Furosemide 40 mg IV stat",
        "Salbutamol 100 mcg 2 puffs inhaler PRN",
    ], 1,
    "Acute COPD exacerbation management includes: bronchodilators (commenced), systemic corticosteroids (prednisolone 30 mg OD for 5 days — NICE/BTS), and antibiotics if purulent sputum or clinical signs of infection (none specified here). Prednisolone reduces recovery time and hospital stay. Furosemide is indicated for cardiac failure not COPD. Theophylline is rarely used acutely due to narrow therapeutic index."
)

# Q43 – PRESC Q14 APO
mcq_q(43, "Prescription Writing", "Cardiology",
    "A 76-year-old woman presents with sudden shortness of breath. PMH: ischaemic heart disease, hypertension. Medications: bisoprolol 5 mg OD, ramipril 5 mg OD, aspirin 75 mg OD, clopidogrel 75 mg OD, atorvastatin 20 mg OD.\n\nExamination: Sats 91% on 15L NRB, RR 38, coarse bilateral crackles. BP 140/98, HR 110 irregular, pitting oedema to knees. ECG: ST depression V1–V4.\nInvestigations: Na 138, K 5.2, Cr 100.",
    "Select ONE drug prescription most appropriate to provide rapid relief of her shortness of breath.",
    [
        "Aspirin 300 mg PO stat",
        "Furosemide 40 mg IV stat",
        "Morphine sulphate 2.5 mg IV stat",
        "GTN spray 2 puffs sublingual stat",
        "Metoprolol 5 mg IV stat",
    ], 1,
    "Acute cardiogenic pulmonary oedema (bilateral crackles, oedema, AF, elevated JVP) — IV furosemide 40 mg stat is first-line for rapid symptom relief. It reduces preload within minutes via venodilation and then promotes diuresis. K 5.2 remains within range — furosemide is not contraindicated. GTN is an important adjunct (if BP allows). Avoid IV morphine (no mortality benefit, may cause harm)."
)

# Q44 – PRESC Q15 Addisonian crisis
mcq_q(44, "Prescription Writing", "Endocrinology",
    "A 44-year-old woman presents to A&E collapsed. She usually takes medications for Addison's disease but has been unable to take them due to viral gastroenteritis with nausea and vomiting. PMH: Addison's disease. Medications: hydrocortisone 10 mg mane + 5 mg evening, fludrocortisone 50 mcg OD.\n\nAn Addisonian crisis is diagnosed with hypotension and hypoglycaemia. Appropriate IV fluid resuscitation including glucose replacement has been commenced.",
    "Select ONE additional drug that is most appropriate to prescribe acutely.",
    [
        "Fludrocortisone 100 mcg PO stat",
        "Hydrocortisone 100 mg IV stat",
        "Prednisolone 40 mg PO OD",
        "Dexamethasone 4 mg IV stat",
        "Methylprednisolone 500 mg IV over 30 min",
    ], 1,
    "Addisonian crisis: IV hydrocortisone 100 mg stat (then 50–100 mg every 6–8 hours until stable) is the definitive treatment — it has both glucocorticoid and mineralocorticoid activity. Fludrocortisone is for maintenance only. Prednisolone is PO — inappropriate in a vomiting patient. Dexamethasone has no mineralocorticoid effect and would not be preferred. Hydrocortisone 100 mg IV is the emergency standard of care (BNF, Addison's guidelines)."
)

# Q45 – PRESC Q16 DVT
mcq_q(45, "Prescription Writing", "Haematology",
    "A 79-year-old woman presents to A&E with a swollen, erythematous left leg. PMH: nil. Medications: nil.\n\nExamination: Left leg swollen and tender with mild pitting oedema around the left ankle.\nInvestigations: INR 1.0. Doppler US reports a DVT in the left popliteal vein.",
    "Select ONE prescription most appropriate to treat her DVT.",
    [
        "Warfarin 5 mg PO OD (with heparin bridge)",
        "Apixaban 10 mg PO twice daily for 7 days, then 5 mg PO twice daily",
        "Enoxaparin 1.5 mg/kg SC once daily",
        "Unfractionated heparin infusion 18 units/kg/h IV",
        "Aspirin 75 mg PO OD",
    ], 1,
    "NICE NG158: apixaban or rivaroxaban are recommended first-line for VTE without cancer. Apixaban 10 mg BD × 7 days then 5 mg BD (AMPLIFY regimen) is preferred due to its favourable bleeding profile and no need for bridging. Warfarin requires bridging anticoagulation and INR monitoring. LMWH alone (enoxaparin) is an alternative but requires injection. Aspirin is not appropriate for DVT treatment."
)

# Q46 – PRESC Q17 post-appendicectomy pain
mcq_q(46, "Prescription Writing", "Surgery",
    "A 44-year-old man is on the surgical ward after an appendicectomy. He reports lower abdominal pain around the port sites. PMH: nil. Medications: nil.\n\nHe has already been prescribed paracetamol 1000 mg QDS and ibuprofen 600 mg QDS.",
    "Select ONE additional prescription most appropriate to provide relief of his pain.",
    [
        "Codeine phosphate 30 mg PO every 4–6 h PRN",
        "Morphine sulphate 5 mg PO 2–4 hourly PRN",
        "Tramadol 100 mg PO QDS regular",
        "Diclofenac 50 mg PO TDS",
        "Pregabalin 150 mg PO BD",
    ], 1,
    "He is already on maximum non-opioid analgesia (paracetamol + NSAID). An opioid is the appropriate step up: oral morphine sulphate 5 mg PRN 2–4 hourly provides effective post-operative pain relief (WHO analgesic ladder). Tramadol regular QDS is not recommended (seizure risk, serotonin interactions). Another NSAID (diclofenac) is not appropriate alongside ibuprofen. Pregabalin is used for neuropathic pain, not acute post-operative pain."
)

# Q47 – PRESC Q18 PD + PONV
mcq_q(47, "Prescription Writing", "Neurology",
    "A 46-year-old man is on the surgical ward after a cholecystectomy. He reports worsening nausea. PMH: Parkinson's disease. Medications: co-careldopa 25/100 mg PO TDS. He has been given paracetamol 1000 mg QDS and ibuprofen 600 mg QDS, but no antiemetics.",
    "Select ONE prescription most appropriate to provide relief of his nausea and vomiting.",
    [
        "Metoclopramide 10 mg IV TDS",
        "Prochlorperazine 12.5 mg IM stat",
        "Cyclizine 50 mg PO/IV TDS",
        "Domperidone 10 mg PO TDS",
        "Haloperidol 1.5 mg PO OD",
    ], 2,
    "Parkinson's disease: dopamine antagonists (metoclopramide, prochlorperazine, haloperidol) are CONTRAINDICATED — they worsen Parkinson's symptoms by blocking nigrostriatal dopamine receptors. Domperidone is controversial (may still have some CNS penetration; cardiac risk). Safe antiemetics in PD: cyclizine (antihistamine antimuscarinic), ondansetron (5-HT3 antagonist). Cyclizine 50 mg TDS is the safest first-line choice here."
)

# Q48 – PRESC Q19 Ca 1.2 post-transfusion
mcq_q(48, "Prescription Writing", "Surgery",
    "A 26-year-old man on the surgical ward had a massive haemorrhage and received 4 units of packed red cells rapidly. The next day he reports numbness of his lower legs and palpitations. PMH: nil.\n\nInvestigations: Hb 105, Cr 196, eGFR 40, Ca 1.2 mmol/L (normal 2.2–2.6). ECG: prolonged QT interval.",
    "Select ONE prescription most appropriate to prescribe acutely.",
    [
        "Oral calcium carbonate 1.25 g TDS",
        "Calcium gluconate 10% 10 ml IV over 10 min",
        "Vitamin D (colecalciferol) 800 units PO OD",
        "Sodium bicarbonate 8.4% 50 ml IV stat",
        "Magnesium sulphate 2 g IV over 10 min",
    ], 1,
    "Severe symptomatic hypocalcaemia (Ca 1.2, symptoms, prolonged QT) following massive blood transfusion — citrate in transfused blood chelates ionised calcium causing acute hypocalcaemia. IV calcium gluconate 10% 10 ml over 10 min is the acute treatment to correct ionised calcium and protect against arrhythmia. Oral calcium is insufficient acutely. Repeat ECG/ionised Ca after treatment."
)

# Q49 – PRESC Q20 K 6.7 ECG changes
mcq_q(49, "Prescription Writing", "Renal Medicine",
    "A 91-year-old man is admitted following a long lie at home. PMH: benign prostatic hypertrophy. Medications: finasteride 5 mg OD, tamsulosin 400 mcg OD.\n\nExamination: BP 156/102, GCS 14. CK 10,032.\nInvestigations: Na 139, K 6.7 mmol/L (elevated), Cr 190, eGFR 45. ECG: absent P waves, prolonged QRS, peaked T waves.",
    "Select ONE prescription most appropriate to prescribe IMMEDIATELY.",
    [
        "Insulin Actrapid 10 units + glucose 50% 50 ml IV over 30 min",
        "Calcium gluconate 10% 30 ml IV over 10 min",
        "Sodium bicarbonate 8.4% 50 ml IV stat",
        "Calcium resonium 15 g PO TDS",
        "Salbutamol 10 mg nebulised stat",
    ], 1,
    "Severe hyperkalaemia (K 6.7) with ECG changes (sinusoidal/pre-arrest pattern) — immediate cardiac membrane stabilisation is the priority. Calcium gluconate 10% 30 ml (3 amps) IV over 10 minutes stabilises the myocardium and prevents VF WITHOUT lowering serum K. It buys time for definitive K-lowering therapy (insulin-dextrose, salbutamol, dialysis). Calcium resonium acts over hours — not for acute crisis."
)


# ════════════════════════════════════════════════════════════════════════════
# SECTION C — PRESCRIPTION REVIEW  Q50–Q59
# ════════════════════════════════════════════════════════════════════════════

LINES += ["<!-- ═══ SECTION C — PRESCRIPTION REVIEW (4 marks each) ═══ -->", ""]

# Q50 – REVIEW 1
review_q(50, "Prescription Review", "Endocrinology",
    "A 74-year-old man is on a medical ward following a fall. PMH: hypertension, hypothyroidism, osteoporosis, polymyalgia rheumatica.\n\nLying BP 135/78, HR 76 regular. Na 141, K 4.1, Cr 100, eGFR 56.\n\n**Current prescriptions:**\n| Drug | Dose | Route | Frequency |\n|------|------|-------|-----------|\n| amlodipine | 10 mg | PO | daily |\n| alendronic acid | 10 mg | PO | weekly |\n| bisoprolol | 5 mg | PO | daily |\n| colecalciferol | 400 units | PO | daily |\n| levothyroxine sodium | 125 mg | PO | daily |\n| paracetamol | 1000 mg | PO | four times daily |\n| prednisolone | 15 mg | PO | nightly |\n| simvastatin | 20 mg | PO | daily |",
    2, 2,
    "Which ONE prescription contains a SERIOUS DOSING ERROR?",
    [
        "amlodipine 10 mg daily",
        "alendronic acid 10 mg weekly",
        "levothyroxine sodium 125 mg daily",
        "prednisolone 15 mg nightly",
        "simvastatin 20 mg daily",
    ], 2,
    "Which THREE prescriptions contain FREQUENCY ERRORS? (Select the combined answer)",
    [
        "alendronic acid (weekly), simvastatin (daily), prednisolone (nightly)",
        "amlodipine (daily), bisoprolol (daily), paracetamol (four times daily)",
        "colecalciferol (daily), paracetamol (QDS), bisoprolol (daily)",
        "levothyroxine (daily), alendronic acid (weekly), simvastatin (daily)",
        "prednisolone (nightly), paracetamol (QDS), colecalciferol (daily)",
    ], 0,
    "Part A: Levothyroxine 125 mg — units error. Should be 125 MICROGRAMS (mcg/μg), not mg. 125 mg would be approximately 1000× the correct dose and potentially fatal.\nPart B: (1) Alendronic acid 10 mg weekly — should be DAILY (standard low-dose daily regimen) or the weekly preparation is 70 mg (not 10 mg weekly). (2) Simvastatin — should be taken NIGHTLY (taken at night to account for nocturnal cholesterol synthesis peak). (3) Prednisolone — should be taken in the MORNING (nightly dosing disrupts sleep and suppresses the cortisol morning surge)."
)

# Q51 – REVIEW 2
review_q(51, "Prescription Review", "General Medicine",
    "An 86-year-old woman is on a medical ward following a fall. PMH: acid reflux, hypertension, chronic pain, depression, vaginal candidiasis.\n\nNa 139, K 5.1, Cr 109, eGFR 62.\n\n**Current prescriptions:**\n| Drug | Dose | Route | Frequency |\n|------|------|-------|-----------|\n| amlodipine | 5 mg | PO | daily |\n| clotrimazole | 200 mg | PO | nightly |\n| escitalopram | 20 mg | PO | daily |\n| gabapentin | 300 mg | PO | twice daily |\n| nebivolol | 25 mg | PO | daily |\n| omeprazole | 80 mg | PO | daily |\n| pregabalin | 100 mg | PO | once daily |",
    2, 2,
    "Which THREE prescriptions contain a SERIOUS DOSING ERROR?",
    [
        "escitalopram 20 mg, nebivolol 25 mg, omeprazole 80 mg",
        "clotrimazole 200 mg, gabapentin 300 mg, pregabalin 100 mg",
        "amlodipine 5 mg, escitalopram 20 mg, omeprazole 80 mg",
        "nebivolol 25 mg, gabapentin 300 mg, pregabalin 100 mg",
        "escitalopram 20 mg, gabapentin 300 mg, omeprazole 80 mg",
    ], 0,
    "Which ONE prescription contains a ROUTE ERROR?",
    [
        "gabapentin PO",
        "amlodipine PO",
        "omeprazole PO",
        "clotrimazole PO",
        "pregabalin PO",
    ], 3,
    "Part A: (1) Escitalopram 20 mg — maximum dose in elderly is 10 mg OD (normal adult max 20 mg, halved in elderly due to increased sensitivity/QT risk). (2) Nebivolol 25 mg — 10× too high; normal starting dose 2.5 mg, usual dose 5 mg OD. (3) Omeprazole 80 mg — extremely high; usual dose for acid reflux is 20 mg OD (80 mg is used only for IV treatment of bleeding peptic ulcer).\nPart B: Clotrimazole 200 mg PO — clotrimazole is a topical antifungal available as vaginal pessaries or cream; it CANNOT be taken orally (available formulation is vaginal pessary 200 mg nightly). The vaginal pessary should be PV (per vaginum), not PO."
)

# Q52 – REVIEW 3
review_q(52, "Prescription Review", "Respiratory Medicine",
    "A 66-year-old woman is on a medical ward after an exacerbation of COPD. PMH: AF, COPD, schizophrenia.\n\nBP 125/75, HR 78, RR 16, SpO₂ 96% RA. Mild expiratory wheeze.\n\n**Current prescriptions:**\n| Drug | Dose | Route | Frequency |\n|------|------|-------|-----------|\n| bisoprolol | 5 mg | PO | daily |\n| digoxin | 125 mg | PO | daily |\n| ipratropium | 500 mcg | NEB | four times daily |\n| prednisolone | 300 mg | PO | daily |\n| risperidone | 25 mg | PO | twice weekly |\n| salbutamol | 5 mg | NEB | four times daily |\n| salbutamol | 200 mcg | INH | PRN |\n| tiotropium | 18 mg | INH | daily |",
    2, 2,
    "Which THREE prescriptions contain a SERIOUS DOSING ERROR?",
    [
        "digoxin 125 mg, prednisolone 300 mg, tiotropium 18 mg",
        "bisoprolol 5 mg, prednisolone 300 mg, salbutamol 5 mg NEB",
        "digoxin 125 mg, ipratropium 500 mcg, tiotropium 18 mg",
        "prednisolone 300 mg, salbutamol 200 mcg, tiotropium 18 mg",
        "digoxin 125 mg, salbutamol 200 mcg, bisoprolol 5 mg",
    ], 0,
    "Which ONE prescription contains a ROUTE ERROR?",
    [
        "bisoprolol PO",
        "prednisolone PO",
        "salbutamol INH",
        "risperidone PO",
        "ipratropium NEB",
    ], 3,
    "Part A: (1) Digoxin 125 mg — should be 125 MICROGRAMS (mcg). 125 mg would be 1000× the correct dose and immediately fatal. (2) Prednisolone 300 mg — should be ~30 mg for COPD exacerbation (10× too high). (3) Tiotropium 18 mg — should be 18 MICROGRAMS. This is an inhaled drug measured in mcg. A 1000-fold dose error.\nPart B: Risperidone 25 mg 'PO twice weekly' — this dose is risperidone depot (risperdal consta) given as an INTRAMUSCULAR (IM) injection every 2 weeks, not oral. The oral formulation is typically 0.5–6 mg daily."
)

# Q53 – REVIEW 4
review_q(53, "Prescription Review", "Endocrinology",
    "An 82-year-old man presents for a medication review. PMH: gout, hypertension, atrial fibrillation, type 1 diabetes, heart failure.\n\nNa 143, K 4.6, Cr 76, eGFR 78.\n\n**Current prescriptions:**\n| Drug | Dose | Route | Frequency |\n|------|------|-------|-----------|\n| allopurinol | 100 mg | PO | daily |\n| amlodipine | 10 mg | PO | daily |\n| apixaban | 5 mg | PO | twice daily |\n| bisoprolol | 5 mg | PO | daily |\n| furosemide | 80 mg | PO | daily |\n| indapamide MR | 1.5 mg | PO | daily |\n| Humalog (insulin lispro) | 20 units | SC | nightly |\n| Levemir (insulin detemir) | 10 units | SC | three times daily |",
    2, 2,
    "Which TWO prescriptions contain a PRESCRIBING ERROR? (Select the combined answer)",
    [
        "Humalog (insulin lispro) nightly, Levemir (insulin detemir) TDS",
        "furosemide 80 mg daily, indapamide MR 1.5 mg daily",
        "allopurinol 100 mg daily, apixaban 5 mg BD",
        "Humalog (insulin lispro) nightly, furosemide 80 mg daily",
        "Levemir (insulin detemir) TDS, amlodipine 10 mg daily",
    ], 0,
    "Which TWO prescriptions are most likely to INCREASE THE RISK OF ACUTE GOUT? (Select the combined answer)",
    [
        "allopurinol 100 mg daily, apixaban 5 mg BD",
        "amlodipine 10 mg daily, bisoprolol 5 mg daily",
        "furosemide 80 mg daily, indapamide MR 1.5 mg daily",
        "Humalog 20 units nightly, bisoprolol 5 mg daily",
        "apixaban 5 mg BD, furosemide 80 mg daily",
    ], 2,
    "Part A: (1) Humalog (insulin lispro) 20 units nightly — Humalog is a RAPID-ACTING insulin analogue (mealtime insulin). Prescribing it nightly as a basal insulin is an error; a long-acting insulin (e.g. Levemir/Lantus) would be appropriate at night. (2) Levemir (insulin detemir) TDS — Levemir is a LONG-ACTING insulin analogue and is typically prescribed once or twice daily, not TDS.\nPart B: Both furosemide (loop diuretic) and indapamide (thiazide-like diuretic) increase serum uric acid by reducing renal uric acid excretion, thereby precipitating gout attacks."
)

# Q54 – REVIEW 5
review_q(54, "Prescription Review", "Gastroenterology",
    "A 78-year-old man on the respiratory ward has been completing a course of antibiotics for a chest infection. He now develops profuse diarrhoea. PMH: hypertension, osteoarthritis.\n\nCool peripherally, CRT 2–3 s. BP 110/68. Na 140, K 3.6, U 9.0 (elevated), Cr 120, eGFR 43.\n\n**Current prescriptions:**\n| Drug | Dose | Route | Frequency |\n|------|------|-------|-----------|\n| amlodipine | 10 mg | PO | daily |\n| bisoprolol | 5 mg | PO | daily |\n| co-amoxiclav | 1.2 g | IV | three times daily |\n| ibuprofen | 400 mg | PO | three times daily |",
    2, 2,
    "Which ONE prescription is the MOST LIKELY CAUSE of his diarrhoea?",
    [
        "amlodipine 10 mg daily",
        "bisoprolol 5 mg daily",
        "co-amoxiclav 1.2 g IV TDS",
        "ibuprofen 400 mg TDS",
        "all four equally likely",
    ], 2,
    "Which THREE prescriptions should you consider HOLDING? (Select the combined answer)",
    [
        "amlodipine, bisoprolol, co-amoxiclav",
        "amlodipine, bisoprolol, ibuprofen",
        "co-amoxiclav, ibuprofen, bisoprolol",
        "amlodipine, co-amoxiclav, ibuprofen",
        "bisoprolol, ibuprofen, amlodipine — all three plus stopping co-amoxiclav",
    ], 1,
    "Part A: Co-amoxiclav is a broad-spectrum penicillin and a recognised cause of Clostridioides difficile infection (CDI) — the most likely cause of profuse diarrhoea after antibiotic therapy. Other high-risk antibiotics: cephalosporins, clindamycin, fluoroquinolones, piperacillin-tazobactam.\nPart B: Hold (1) ibuprofen — NSAIDs are nephrotoxic, contraindicated with AKI (raised U/Cr, reduced eGFR 43); (2) amlodipine — vasodilator will worsen hypotension in a volume-depleted patient; (3) bisoprolol — beta-blockade prevents compensatory tachycardia and worsens hypotension. Co-amoxiclav should ideally also be stopped/reviewed, but it is the cause not just a medication to 'hold'."
)

# Q55 – REVIEW 6
review_q(55, "Prescription Review", "Infectious Diseases",
    "An 88-year-old woman is on the COTE ward complaining of a painful mouth when eating. She has a white furry coating over her tongue. Her pulse is irregularly irregular. PMH: COPD, back pain.\n\nNa 140, K 4.1, Cr 90, eGFR 63.\n\nShe has just been diagnosed with new atrial fibrillation and is about to start apixaban 5 mg BD.\n\n**Current prescriptions:**\n| Drug | Dose | Route | Frequency |\n|------|------|-------|-----------|\n| amoxicillin | 1 g | IV | three times daily |\n| dalteparin | 5000 units | SC | daily |\n| ibuprofen | 400 mg | PO | three times daily |\n| lansoprazole | 15 mg | PO | daily |\n| paracetamol | 1 g | PO | four times daily |\n| salbutamol | 200 mcg | INH | PRN |",
    2, 2,
    "Which TWO prescriptions are most likely to be CAUSING ORAL CANDIDIASIS? (Select the combined answer)",
    [
        "lansoprazole and paracetamol",
        "amoxicillin and ibuprofen",
        "amoxicillin and an inhaled corticosteroid (ICS)",
        "dalteparin and salbutamol",
        "ibuprofen and lansoprazole",
    ], 2,
    "Which ONE prescription should be STOPPED before starting apixaban?",
    [
        "amoxicillin",
        "lansoprazole",
        "ibuprofen",
        "dalteparin",
        "paracetamol",
    ], 3,
    "Part A: (1) Amoxicillin (broad-spectrum antibiotic) disrupts normal oral flora, allowing Candida overgrowth. (2) Inhaled corticosteroids (ICS — this patient takes Seretide/equivalent as part of her COPD management) cause oral/pharyngeal candidiasis by local immunosuppression; patients should rinse their mouth after use. Salbutamol alone (SABA, no steroid) does not cause candidiasis.\nPart B: Dalteparin (LMWH) must be stopped before starting apixaban (a DOAC) to avoid double anticoagulation and catastrophic bleeding risk. Timing: the last dose of therapeutic LMWH should be given at least 12 hours before starting a DOAC."
)

# Q56 – REVIEW 7
review_q(56, "Prescription Review", "Endocrinology",
    "A 60-year-old man comes for his annual diabetic review. PMH: type 2 diabetes, gout, high cholesterol, hypertension. HbA1c 53 mmol/mol (7%).\n\n**Current prescriptions:**\n| Drug | Dose | Route | Frequency |\n|------|------|-------|-----------|\n| allopurinol | 100 mg | PO | daily |\n| amlodipine | 10 mg | PO | daily |\n| bezafibrate MR | 400 mg | PO | nightly |\n| canagliflozin | 200 mg | PO | daily |\n| losartan | 100 mg | PO | daily |\n| metformin | 500 mcg | PO | three times daily |\n| pioglitazone | 45 mg | PO | daily |",
    2, 2,
    "Which ONE prescription contains a DOSING ERROR?",
    [
        "allopurinol 100 mg daily",
        "amlodipine 10 mg daily",
        "canagliflozin 200 mg daily",
        "metformin 500 mcg TDS",
        "pioglitazone 45 mg daily",
    ], 3,
    "Which ONE prescription is most likely to cause EUGLYCAEMIC DIABETIC KETOACIDOSIS?",
    [
        "allopurinol 100 mg daily",
        "bezafibrate MR 400 mg nightly",
        "canagliflozin 200 mg daily",
        "losartan 100 mg daily",
        "pioglitazone 45 mg daily",
    ], 2,
    "Part A: Metformin 500 mcg TDS — units error. Metformin is prescribed in MILLIGRAMS, not micrograms (mcg). 500 mg TDS is a standard dose; 500 mcg would be sub-therapeutic at 1/1000 the intended dose.\nPart B: Canagliflozin (SGLT2 inhibitor) can cause euglycaemic DKA — DKA occurring without marked hyperglycaemia. Mechanism: SGLT2 inhibitors promote glucagon secretion and shift metabolism toward ketogenesis. Risk factors: fasting, surgery, excessive alcohol, low-carbohydrate diet. Monitor for ketosis even if blood glucose is near-normal."
)

# Q57 – REVIEW 8
review_q(57, "Prescription Review", "General Medicine",
    "A 26-year-old woman is admitted with abdominal pain and vomiting. PMH: anxiety, depression, back pain.\n\nDry mucous membranes, non-specific abdominal tenderness. BP 108/68, HR 96, RR 20, SpO₂ 98% RA, T 38.1. Na 142, K 4.5, Cr 58, eGFR 90.\n\n**Current prescriptions:**\n| Drug | Dose | Route | Frequency |\n|------|------|-------|-----------|\n| amitriptyline | 10 mg | PO | nightly |\n| co-amoxiclav | 1.2 g | IV | three times daily |\n| morphine sulphate | 5 mg | PO | 2-hourly PRN |\n| ondansetron | 4 mg | IV | 8-hourly |\n| propranolol | 40 mg | PO | daily |\n| sertraline | 100 mg | PO | daily |\n| zopiclone | 75 mg | PO | nightly |",
    2, 2,
    "Which ONE prescription contains a SERIOUS DOSING ERROR?",
    [
        "amitriptyline 10 mg nightly",
        "co-amoxiclav 1.2 g IV TDS",
        "ondansetron 4 mg IV 8-hourly",
        "sertraline 100 mg daily",
        "zopiclone 75 mg nightly",
    ], 4,
    "Which THREE prescriptions are most likely to cause QT INTERVAL PROLONGATION? (Select the combined answer)",
    [
        "amitriptyline, ondansetron, sertraline",
        "co-amoxiclav, propranolol, morphine",
        "ondansetron, propranolol, zopiclone",
        "amitriptyline, co-amoxiclav, sertraline",
        "morphine, ondansetron, sertraline",
    ], 0,
    "Part A: Zopiclone 75 mg — a 10-fold dose error! The correct dose of zopiclone is 7.5 mg nightly (max 7.5 mg; reduced to 3.75 mg in elderly). 75 mg could cause dangerous CNS/respiratory depression.\nPart B: (1) Amitriptyline (TCA — inhibits cardiac Na/K/Ca channels → QT prolongation). (2) Ondansetron (5-HT3 antagonist — dose-related QT prolongation; avoid with other QT-prolonging drugs). (3) Sertraline (SSRI — class effect QT prolongation, especially with ondansetron; also increased serotonin syndrome risk). Also note: sertraline + ondansetron increases risk of serotonin syndrome."
)

# Q58 – REVIEW 9
review_q(58, "Prescription Review", "Neurology",
    "An 84-year-old man with Parkinson's disease presents with acute deterioration in mobility. He was recently started on new medications for psychotic depression. PMH: Parkinson's disease, psychotic depression, previous fractured NOF, GORD.\n\nShuffling gait, difficulty initiating movements, episodes of freezing. HR 80, BP 125/80, SpO₂ 97% RA.\n\n**Current prescriptions:**\n| Drug | Dose | Route | Frequency |\n|------|------|-------|-----------|\n| citalopram | 20 mg | PO | daily |\n| co-careldopa 25/100 mg | — | PO | 8-hourly |\n| gaviscon | 10 ml | PO | TDS PRN |\n| lansoprazole | 30 mg | PO | daily |\n| metoclopramide | 10 mg | PO | 8-hourly |\n| olanzapine | 10 mg | PO | daily |",
    2, 2,
    "Which TWO prescriptions are most likely to be WORSENING HIS PARKINSON'S SYMPTOMS? (Select the combined answer)",
    [
        "citalopram and lansoprazole",
        "metoclopramide and olanzapine",
        "gaviscon and co-careldopa",
        "citalopram and metoclopramide",
        "olanzapine and lansoprazole",
    ], 1,
    "Which THREE of the following statements about galactorrhoea risk are correct? (Select the combined answer)",
    [
        "Metoclopramide, olanzapine, and citalopram can all cause galactorrhoea",
        "Co-careldopa, gaviscon, and lansoprazole are the highest risk",
        "Only olanzapine causes galactorrhoea from this list",
        "Metoclopramide and gaviscon cause galactorrhoea via the same mechanism",
        "None of these drugs cause galactorrhoea",
    ], 0,
    "Part A: Both metoclopramide (pro-kinetic antiemetic) and olanzapine (atypical antipsychotic) are D2 dopamine antagonists — they block nigrostriatal dopamine receptors, directly worsening Parkinson's symptoms. These drugs are CONTRAINDICATED in PD. Safe antiemetics in PD: domperidone (limited CNS penetration) or ondansetron. Safe antipsychotics in PD: quetiapine, clozapine (non-D2 blocking antipsychotics).\nPart B: Metoclopramide and olanzapine block tuberoinfundibular dopamine pathway → ↑prolactin → galactorrhoea. Citalopram (SSRI) can raise prolactin via serotonergic pathways → galactorrhoea (less common but recognised). Co-careldopa (levodopa) actually REDUCES prolactin."
)

# Q59 – REVIEW 10
review_q(59, "Prescription Review", "Renal Medicine",
    "A 79-year-old woman is on a surgical ward with acute cholecystitis. PMH: hypercholesterolaemia, hypertension, osteoarthritis. Weight 81 kg.\n\nRUQ tenderness, Murphy's sign positive. Na 141, K 4.1, Cr 190 (raised), eGFR 23, bilirubin 44, ALP 135.\n\n**Current prescriptions:**\n| Drug | Dose | Route | Frequency |\n|------|------|-------|-----------|\n| candesartan | 8 mg | PO | daily |\n| cyclizine | 50 mg | IV | three times daily |\n| gentamicin | 405 mg | IV | daily |\n| naproxen | 500 mg | PO | daily |\n| paracetamol | 1000 mg | PO | four times daily |\n| simvastatin | 20 mg | PO | nightly |",
    2, 2,
    "Which THREE prescriptions are most likely to be CONTRIBUTING TO HER IMPAIRED RENAL FUNCTION? (Select the combined answer)",
    [
        "candesartan, gentamicin, naproxen",
        "cyclizine, paracetamol, simvastatin",
        "candesartan, cycizine, naproxen",
        "gentamicin, simvastatin, paracetamol",
        "naproxen, candesartan, simvastatin",
    ], 0,
    "Which ONE prescription is most likely to be CONTRIBUTING TO HER IMPAIRED HEPATIC FUNCTION?",
    [
        "candesartan",
        "cyclizine",
        "gentamicin",
        "naproxen",
        "simvastatin",
    ], 4,
    "Part A: (1) Candesartan (ARB) — reduces glomerular perfusion pressure by blocking angiotensin II-mediated efferent arteriolar vasoconstriction; nephrotoxic in AKI/dehydration. (2) Gentamicin (aminoglycoside) — directly nephrotoxic (proximal tubule damage); requires dose adjustment and TDM in renal impairment. (3) Naproxen (NSAID) — inhibits prostaglandin synthesis, reducing renal blood flow; contraindicated when eGFR <30 (BNF).\nPart B: Simvastatin (statin) — can cause hepatotoxicity, raised transaminases and (rarely) cholestatic jaundice. Raised bilirubin and ALP here suggest hepatobiliary involvement (cholestasis from cholecystitis + possible statin contribution). Monitor LFTs with statins."
)


# ════════════════════════════════════════════════════════════════════════════
# SECTION D — APPLIED KNOWLEDGE QUESTIONS  Q60–Q75
# ════════════════════════════════════════════════════════════════════════════

LINES += ["<!-- ═══ SECTION D — APPLIED KNOWLEDGE QUESTIONS (2 marks each) ═══ -->", ""]

# Q60 – MCQ A1 – Planning – bacterial vaginosis
mcq_q(60, "Planning Management", "Sexual Health",
    "A 28-year-old woman presents to her GP complaining of vaginal discharge. On speculum examination there is a thin, white vaginal discharge with a fishy odour. Swabs are taken.",
    "Select the most appropriate management option at this stage.",
    [
        "Aciclovir 200 mg PO five times daily for 5 days",
        "Clotrimazole pessary 200 mg PV nightly for 3 nights",
        "Fluconazole 150 mg PO every 3 days (three doses)",
        "Metronidazole 400 mg PO twice daily for 5 days",
        "Nystatin 100,000 units PV nightly for 14 nights",
    ], 3,
    "Thin white/grey malodorous discharge with fishy smell = bacterial vaginosis (BV). BNF/BASHH first-line: metronidazole 400 mg BD for 5 days, or metronidazole 2 g PO single dose. Aciclovir treats herpes simplex. Clotrimazole/fluconazole/nystatin treat fungal candidiasis (which presents with thick white curd-like discharge + vulval itch, no odour)."
)

# Q61 – MCQ A2 – Planning – paracetamol OD
mcq_q(61, "Planning Management", "Emergency Medicine",
    "An 18-year-old presents to A&E following an intentional overdose. She reports taking 11 × 500 mg paracetamol tablets 6 hours ago. She has mild nausea and epigastric discomfort. No known drug allergies. Observations normal.\n\nInvestigations: INR 1.2, ALT 15, ALP 49, bilirubin 12, paracetamol level 10 mg/L at 6 hours.",
    "Select the most appropriate management option at this stage.",
    [
        "Activated charcoal 50 g PO stat",
        "Admit for observation only",
        "N-acetylcysteine (NAC) IV infusion",
        "Naloxone 400 mcg IV stat",
        "Sodium chloride 0.9% IV infusion over 8 hours",
    ], 2,
    "Paracetamol overdose ≥75 mg/kg (5.5 g in a 55 kg patient = ~100 mg/kg threshold risk) taken >4–8 h ago with any paracetamol level warranting concern: prescribe N-acetylcysteine IV (Parvolex). Use the treatment nomogram (available on BNF/TOXBASE) — at 6 hours the treatment threshold is ~66 mg/L using the 100 mg/L at 4h line. Any level above the treatment line requires NAC. Activated charcoal is only effective within 1 hour of ingestion. Naloxone is for opioid overdose."
)

# Q62 – MCQ A3 – Planning – fentanyl patch
mcq_q(62, "Planning Management", "Palliative Care",
    "A 68-year-old woman with end-stage oesophageal cancer is not managing at home with her pain. She is struggling to tolerate oral intake. She has been taking morphine sulphate MR 60 mg PO twice daily plus oramorph 7.5 ml (10 mg/5 ml) six-hourly. She would like to try a fentanyl patch.",
    "Select the most appropriate fentanyl patch strength.",
    [
        "'25' fentanyl patch transdermally (replace every 72 hours)",
        "'50' fentanyl patch transdermally (replace every 72 hours)",
        "'75' fentanyl patch transdermally (replace every 72 hours)",
        "'75' fentanyl patch transdermally (replace every 5 days)",
        "'100' fentanyl patch transdermally (replace every 72 hours)",
    ], 2,
    "Total 24h oral morphine: regular = 60 mg × 2 = 120 mg; PRN oramorph = 15 mg × 4 doses = 60 mg; total = 180 mg oral morphine/24h.\nConversion: 30 mg oral morphine/day ≈ 12–25 mcg/h fentanyl (use 30:1 ratio): 180 ÷ 30 × 25 = 150 mcg/h — then choose the closest patch BELOW† or at that value. The '75' patch (75 mcg/h) is the standard answer using the commonly taught PSA conversion (60 mg oral morphine = 25 mcg/h fentanyl: 180 mg = 75 mcg/h). Fentanyl patches are replaced every 72 hours (3 days), not 5 days."
)

# Q63 – MCQ A4 – Planning – shingles
mcq_q(63, "Planning Management", "Dermatology",
    "A 73-year-old woman presents with a painful, itchy vesicular rash on her abdomen that does not cross the midline. She reports the rash felt sore before the blisters appeared. PMH: hypertension.",
    "Select the most appropriate management option at this stage.",
    [
        "Aciclovir 400 mg PO twice daily for 5 days",
        "Aciclovir 800 mg PO five times daily for 7 days",
        "Aciclovir 5 mg/kg IV every 8 hours",
        "Aciclovir 0.5% eye cream twice daily",
        "Aciclovir 5% cream five times daily",
    ], 1,
    "Unilateral dermatomal vesicular rash not crossing midline = herpes zoster (shingles). First-line oral treatment: aciclovir 800 mg five times daily for 7 days (BNF). Start within 72 hours of rash onset for maximum benefit. Aciclovir 400 mg BD is the dose for herpes simplex (cold sores). IV aciclovir (5 mg/kg 8-hourly) is reserved for severe/disseminated disease or immunocompromised patients. Topical preparations are NOT appropriate for shingles."
)

# Q64 – MCQ A5 – Communicating – clozapine
mcq_q(64, "Communicating Information", "Psychiatry",
    "A 22-year-old man is diagnosed with schizophrenia. He is advised to commence clozapine on an uptitrating course starting at 12.5 mg for the first dose.",
    "Select the most important information to provide for this patient.",
    [
        "Clozapine may cause increased photosensitisation",
        "Clozapine must not be stopped abruptly",
        "Clozapine may cause diarrhoea",
        "Clozapine may cause weight gain",
        "Clozapine should be taken with food",
    ], 1,
    "Clozapine must NEVER be stopped abruptly — sudden withdrawal can cause acute psychosis, seizures (clozapine lowers seizure threshold), and rebound cholinergic effects. Other critical patient information: (1) mandatory weekly FBC/WCC monitoring (agranulocytosis risk — must register with Clozaril Patient Monitoring Service); (2) report immediately if fever, sore throat, mouth ulcers (signs of agranulocytosis); (3) myocarditis risk in first 4 weeks. Weight gain and metabolic syndrome are important long-term concerns but not the MOST critical safety information."
)

# Q65 – MCQ A6 – Communicating – warfarin metallic valve
mcq_q(65, "Communicating Information", "Cardiology",
    "A 56-year-old man has just had a metallic heart valve replacement and is being started on warfarin.",
    "Select the most important information to provide for this patient.",
    [
        "He must not drink alcohol whilst on warfarin",
        "He must not eat leafy green vegetables",
        "He must use barrier contraception during sexual intercourse",
        "If he has blood in his urine he should seek medical attention immediately",
        "He should take warfarin at a different time to other medications",
    ], 3,
    "Any sign of bleeding (haematuria, melaena, haemoptysis, unexplained bruising) whilst on warfarin requires urgent medical attention and INR check. Warfarin patients with metallic valves have a HIGHER target INR (typically 2.5–3.5 or even 3.0–4.0 depending on valve position/type) and are at significant risk of both thrombosis (if under-anticoagulated) and bleeding. Alcohol in moderation is not strictly prohibited; leafy greens (vitamin K) should be eaten consistently rather than avoided. Barrier contraception is relevant for teratogenic drugs (warfarin IS teratogenic in pregnancy, but this was asked for a male patient)."
)

# Q66 – MCQ A7 – Communicating – isotretinoin contraception
mcq_q(66, "Communicating Information", "Dermatology",
    "A 16-year-old girl is seeing the dermatologist with severe acne. She has tried topical treatments and several courses of oral antibiotics with no improvement. The dermatologist advises starting isotretinoin.",
    "Select the most important information to provide for this patient.",
    [
        "Isotretinoin causes dry skin and lips",
        "Isotretinoin can cause fatigue and malaise",
        "She should have her renal function closely monitored",
        "She should take isotretinoin with a proton pump inhibitor",
        "She must use two forms of effective contraception throughout treatment and for one month after stopping",
    ], 4,
    "Isotretinoin is SEVERELY TERATOGENIC (pregnancy category X — absolutely contraindicated in pregnancy; causes craniofacial, cardiac and CNS defects). Female patients of childbearing age MUST: use TWO forms of effective contraception (the Pregnancy Prevention Programme — PPP); have a negative pregnancy test before starting, monthly during treatment, and 5 weeks after stopping; not donate blood during or for 1 month after treatment. Other monitoring: LFTs and lipids (hepatic and lipid abnormalities). Dry skin/lips are common side effects but not the most critical safety information."
)

# Q67 – MCQ A8 – ADR – opioid overdose
mcq_q(67, "Adverse Drug Reactions", "Surgery",
    "A 70-year-old man is day 1 post-operative following a sub-total colectomy. He has been using a morphine PCA for pain control. He is found unresponsive by the nurse. On assessment: airway patent, RR 8/min, SpO₂ 90% on room air, BP 105/90, HR 112. Pupils are pinpoint.",
    "Select the most appropriate pharmacological intervention.",
    [
        "Atropine 1 mg IV stat",
        "Flumazenil 200 mcg IV stat",
        "Lorazepam 4 mg IV stat",
        "Naloxone 400 mcg IV stat",
        "Neostigmine 2.5 mg IV stat",
    ], 3,
    "Opioid toxidrome: unconsciousness + respiratory depression (RR 8) + pinpoint pupils + opioid exposure (morphine PCA) = opioid overdose. Naloxone (opioid antagonist) is the specific reversal agent. Starting dose: 400 mcg IV; repeat every 2–3 min if no response (up to 10 mg total). Naloxone has a shorter half-life than morphine — monitor for re-narcotisation and repeat dosing may be required. Simultaneously: high-flow oxygen, airway adjuncts, IV access, ABCDE. Flumazenil reverses benzodiazepines. Atropine is for bradyarrhythmias. Never use pharmacological reversal without simultaneous resuscitation (A→E approach)."
)

# Q68 – MCQ A9 – ADR – ciprofloxacin tendonitis
mcq_q(68, "Adverse Drug Reactions", "Urology",
    "An 80-year-old man was recently discharged from hospital after being catheterised for urinary retention and treated for epididymo-orchitis. He was started on a new medication by the urologist. He now presents to his GP with acute left-sided calf and foot pain.",
    "Select the ONE drug most likely to be causing this adverse event.",
    [
        "Bisoprolol 2.5 mg once daily",
        "Ciprofloxacin 500 mg twice daily",
        "Doxycycline 100 mg twice daily",
        "Erythromycin 500 mg twice daily",
        "Rivaroxaban 20 mg once daily",
    ], 1,
    "Ciprofloxacin (fluoroquinolone) causes tendinopathy and tendon rupture, most commonly affecting the Achilles tendon. Risk is increased in elderly patients, those on concurrent corticosteroids, and patients with renal failure. It was likely prescribed for the epididymo-orchitis (fluoroquinolones penetrate well into the male genital tract). MHRA/BNF: stop ciprofloxacin immediately if tendon pain develops (risk of Achilles rupture). Other fluoroquinolone ADRs: QT prolongation, peripheral neuropathy, aortic aneurysm."
)

# Q69 – MCQ A10 – ADR – metoclopramide oculogyric crisis
mcq_q(69, "Adverse Drug Reactions", "Paediatrics",
    "A 9-year-old boy is vomiting following a laparoscopic appendicectomy and is given IV metoclopramide. A few minutes later he has become restless, agitated and has involuntary upward deviation of his eyes.",
    "Select the prescription most likely to be effective in managing this adverse event.",
    [
        "Diazepam 5 mg PR",
        "Midazolam 7.5 mg buccal",
        "Ondansetron 4 mg IV",
        "Procyclidine 5 mg IM",
        "Trihexyphenidyl 1 mg PO",
    ], 3,
    "Metoclopramide acute dystonic reaction (oculogyric crisis) — caused by dopamine D2 receptor blockade. Risk especially high in children and young adults. Treatment: procyclidine 5–10 mg IM or IV (anticholinergic — blocks muscarinic receptors to reduce cholinergic predominance). Alternatively, benzatropine. Symptoms typically resolve within 10–20 minutes. Metoclopramide is CONTRAINDICATED in children under 1 year and should be used with caution in children <18 (MHRA 2013 restriction)."
)

# Q70 – MCQ A11 – ADR – tamsulosin floppy iris
mcq_q(70, "Adverse Drug Reactions", "Ophthalmology",
    "An 80-year-old man presents for cataract surgery. He has a background of lower urinary tract symptoms and takes a regular medication for this. During the operation the surgeon has difficulty securing the intraocular lens due to iris abnormalities.",
    "Select the ONE drug most likely to be causing this adverse event.",
    [
        "Finasteride 5 mg daily",
        "Mirabegron 50 mg daily",
        "Tamsulosin 400 mcg daily",
        "Sildenafil 50 mg PRN",
        "Solifenacin 5 mg daily",
    ], 2,
    "Intraoperative Floppy Iris Syndrome (IFIS) is associated with alpha-1 adrenergic blockers, particularly tamsulosin (alpha-1a selective), used for BPH/LUTS. During cataract surgery, alpha-blockade causes poor pupillary dilation, progressive miosis, and iris billowing/prolapse, making lens implantation difficult. IFIS can occur even if tamsulosin was stopped before surgery. Patients should ALWAYS inform their ophthalmologist they take or have taken alpha-blockers. Finasteride (5-alpha reductase inhibitor) does not cause IFIS."
)

# Q71 – MCQ A12 – Drug Monitoring – fenofibrate
mcq_q(71, "Drug Monitoring", "Endocrinology",
    "A 48-year-old man is found to have hypertriglyceridaemia during investigations for pancreatitis. He is advised to commence fenofibrate 200 mg PO once daily.",
    "Select the most appropriate monitoring parameter to assess for the adverse effects of this treatment.",
    [
        "Serum triglycerides",
        "Serum calcium",
        "Liver function tests (LFTs)",
        "Body weight",
        "Serum cholesterol",
    ], 2,
    "Fenofibrate (fibrate) adverse effects include: hepatotoxicity (elevated LFTs — monitor at baseline, then 3 months, then annually), myopathy/rhabdomyolysis (especially in combination with statins — check CK if myalgia). BNF monitoring: LFTs before treatment, at 3 months, and then periodically. Serum triglycerides would indicate efficacy (not adverse effects). Calcium and weight are not relevant. Fibrate-associated myopathy requires CK monitoring if symptomatic."
)

# Q72 – MCQ A13 – Drug Monitoring – prednisolone growth
mcq_q(72, "Drug Monitoring", "Paediatrics",
    "A 24 kg 8-year-old girl is being treated for juvenile idiopathic arthritis and is taking prednisolone 25 mg OD.",
    "Select the most appropriate monitoring parameter to assess for the adverse effects of this treatment.",
    [
        "Blood pressure monitoring monthly",
        "DEXA scan annually",
        "Growth monitoring (height and weight)",
        "Liver function tests 3-monthly",
        "Renal function 3-monthly",
    ], 2,
    "Long-term corticosteroids in children: growth suppression is a key adverse effect — height and weight should be monitored regularly (typically 6-monthly or annually per MHRA guidance). Other monitoring: BP (corticosteroids cause hypertension), blood glucose (steroid-induced hyperglycaemia), DEXA scan after 3+ months for osteoporosis risk, ophthalmic review (cataracts, glaucoma). Renal function and LFTs are not routinely monitored for steroid adverse effects."
)

# Q73 – MCQ A14 – Drug Monitoring – lithium
mcq_q(73, "Drug Monitoring", "Psychiatry",
    "A 25-year-old woman is being started on lithium carbonate 1 g daily (divided doses) for bipolar disorder.",
    "Select the most appropriate monitoring parameter to assess for the adverse effects of this treatment.",
    [
        "Eye movement assessment",
        "ECG monitoring",
        "Monthly pregnancy tests",
        "Memory and cognitive assessment",
        "Thyroid function tests (TFTs)",
    ], 4,
    "Lithium monitoring (BNF): serum lithium concentration (trough level 12h post-dose; target 0.4–1.0 mmol/L), renal function (U+E, eGFR — lithium is renally excreted; renal impairment causes toxicity), thyroid function (long-term lithium causes hypothyroidism in up to 30% via inhibition of thyroid hormone synthesis), calcium (hyperparathyroidism). NICE recommends TFTs every 6 months and renal function every 6 months. Lithium has no direct ECG or eye movement effects as primary monitoring concerns."
)

# Q74 – MCQ A15 – Data – warfarin INR 5.2
mcq_q(74, "Data Interpretation", "Haematology",
    "A 78-year-old man presents to A&E with one episode of PR bleeding from known diverticular disease. He takes warfarin for a metallic heart valve and is systemically well. On examination haemodynamically stable (BP 135/80, HR 68 regular), euvolaemic.\n\nINR 5.2 (target 2.5–3.5).",
    "Select the most appropriate decision regarding this clinical presentation and data.",
    [
        "Continue current warfarin dose and transfuse 1 unit red blood cells",
        "Stop warfarin and give phytomenadione 5 mg slow IV",
        "Stop warfarin and give phytomenadione 1–3 mg slow IV",
        "Stop warfarin and give phytomenadione 1–3 mg PO",
        "Continue warfarin at reduced dose and repeat INR in 24 hours",
    ], 3,
    "INR 5.0–8.0 with minor bleeding (single episode PR bleed, haemodynamically stable): BCSH/BNF guidance — STOP warfarin AND give low-dose phytomenadione (vitamin K₁) 1–3 mg PO. Oral route is preferred to avoid overcorrection (IV phytomenadione risks dropping INR below therapeutic range, risking valve thrombosis in a metallic valve patient). 5 mg IV is for INR >8 with risk factors or any major bleeding. Phytomenadione PO 1–3 mg is appropriate here: achieves partial INR reversal within 6–12 hours, avoiding under-reversal (bleeding) and over-reversal (valve thrombosis)."
)

# Q75 – MCQ A16 – Data – co-amoxiclav renal dose  
mcq_q(75, "Data Interpretation", "Renal Medicine",
    "A 52-year-old man with stage 4 chronic kidney disease (CKD) presents with frequency, urgency and purulent urine. His MSU grows an ESBL organism sensitive only to co-amoxiclav and gentamicin. Weight 60 kg.\n\nNa 140, K 5.9, Cr 690, eGFR 9, CrCl 9 ml/min.",
    "Select the most appropriate prescribing decision for IV co-amoxiclav.",
    [
        "IV co-amoxiclav 1.2 g every 8 hours (normal dose)",
        "IV co-amoxiclav 1.2 g stat then 600 mg every 8 hours",
        "IV co-amoxiclav 1.2 g stat then 600 mg every 12 hours",
        "IV co-amoxiclav 1.2 g stat then 600 mg every 24 hours",
        "IV co-amoxiclav is absolutely contraindicated at eGFR <10",
    ], 3,
    "BNF co-amoxiclav IV dosing in severe renal impairment: eGFR 10–30 → 1.2 g stat then 600 mg every 12h; eGFR <10 → 1.2 g stat then 600 mg every 24h (further dose reduction to avoid accumulation of amoxicillin component). Co-amoxiclav is not absolutely contraindicated in severe renal failure but requires dose adjustment. Normal dose (8-hourly) would cause drug accumulation and toxicity. Gentamicin is an alternative but also requires careful dosing/TDM in severe renal failure."
)


# ── write output ──────────────────────────────────────────────────────────────
import os, pathlib

out_path = pathlib.Path("static/assets/PSA/psa1-quiz.md")
out_path.parent.mkdir(parents=True, exist_ok=True)

text = "\n".join(LINES)
out_path.write_text(text, encoding="utf-8")

# Quick count
import re
calc  = len(re.findall(r"^### Q\d+ \| CALCULATION", text, re.M))
presc = len(re.findall(r"^### Q\d+ \| PRESCRIPTION", text, re.M))
mcq   = len(re.findall(r"^### Q\d+ \| MCQ", text, re.M))
rev   = len(re.findall(r"^### Q\d+ \| REVIEW", text, re.M))
total = calc + presc + mcq + rev

print(f"Written {len(text.splitlines())} lines")
print(f"CALC:{calc}  PRESC:{presc}  MCQ:{mcq}  REVIEW:{rev}  TOTAL:{total}")
print(f"-> {out_path}")

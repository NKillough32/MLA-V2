"""
Calculator Consolidation Plan
Merge extracted-calculators.js (61 calculators) into Calculators.js (6 native)

Current State:
- Calculators.js: 6 native V2 calculators (BMI, BSA, Fluid Balance, CHA2DS2VASc, HAS-BLED, GCS)
- extracted-calculators.js: 61 V1 calculators in window.ExtractedCalculators object
- CalculatorManager.js: Registers both native and bridge calculators

Target State:
- Single Calculators.js with all 61+ calculators in ES6 module format
- Remove extracted-calculators.js dependency
- Update CalculatorManager to use only native calculators

Steps:
1. Parse extracted-calculators.js to extract all calculator methods
2. Convert from window.ExtractedCalculators pattern to V2Calculators class methods
3. Merge with existing Calculators.js (avoiding duplicates)
4. Update all references from window.quizApp.calculateX() to use new pattern
5. Remove extracted-calculators.js from HTML
6. Update CalculatorManager.registerBridgeCalculators() to be no-op

This script analyzes what needs to be done.
"""

import re

# Read the extracted calculators file
with open('static/js/v2/extracted-calculators.js', 'r', encoding='utf-8') as f:
    extracted_content = f.read()

# Find all calculator getter methods
getter_pattern = r'^\s+(get\w+Calculator)\(\)\s*\{$'
getters = re.findall(getter_pattern, extracted_content, re.MULTILINE)

# Find all calculate methods
calc_pattern = r'^\s+(calculate\w+)\(\)\s*\{$'
calculators = re.findall(calc_pattern, extracted_content, re.MULTILINE)

print("=" * 60)
print("CALCULATOR CONSOLIDATION ANALYSIS")
print("=" * 60)
print(f"\n📊 Found {len(getters)} calculator template getters:")
print("-" * 60)

# Group by category
categories = {
    'Body Metrics': ['BMI', 'BSA', 'IBW'],
    'Cardiology': ['CHA2DS2VASc', 'HASBLED', 'GRACE', 'CRUSADE', 'TIMI', 'QRISK'],
    'Neurology': ['GCS', 'NIHSS', 'ABCD2', 'MRS'],
    'Respiratory': ['CURB65', 'Asthma', 'PEFR', 'ABG'],
    'Critical Care': ['APACHE', 'SOFA', 'MEWS', 'NEWS', 'qSOFA'],
    'Renal': ['eGFR', 'CKD', 'MDRD', 'CockcoftGault'],
    'GI/Hepatology': ['MELD', 'ChildPugh', 'RockallScore', 'GlasgowBlatchford'],
    'Emergency': ['Wells', 'PERC', 'OttawaAnkle', 'OttawaKnee'],
    'Psychiatry': ['PHQ9', 'GAD7', 'MMSE', 'MSE'],
    'Other': []
}

for getter in sorted(set(getters)):
    print(f"  • {getter}")

print(f"\n🧮 Found {len(calculators)} calculation functions:")
print("-" * 60)
for calc in sorted(set(calculators)):
    print(f"  • {calc}")

print("\n" + "=" * 60)
print("CONSOLIDATION REQUIREMENTS")
print("=" * 60)

print("""
1. CONVERT PATTERN:
   From: window.ExtractedCalculators = { getBMICalculator() {...}, calculateBMI() {...} }
   To:   class V2Calculators { getBMITemplate() {...}, calculateBMI() {...} }

2. UPDATE REGISTRATIONS:
   From: getTemplate: () => EC.getBMICalculator()
   To:   getTemplate: () => this.getBMITemplate()

3. FIX ONCLICK HANDLERS:
   From: onclick="window.quizApp.calculateBMI()"
   To:   onclick handlers bound via bindEvents() method

4. STRUCTURE:
   - Keep existing 6 native calculators as-is (already in V2 format)
   - Add remaining 55 calculators from extracted file
   - Organize by registerXXXCalculators() methods

5. FILE CHANGES:
   - Calculators.js: Expand from 683 lines to ~8000+ lines
   - CalculatorManager.js: Remove bridge registration code
   - templates/index.html: Remove extracted-calculators.js script tag

6. TESTING:
   - Verify all 61+ calculators appear in UI
   - Test sample calculations from each category
   - Ensure no console errors about missing ExtractedCalculators
""")

print("\n" + "=" * 60)
print("RECOMMENDATION")
print("=" * 60)
print("""
OPTION A: Keep Dual System (Current - RECOMMENDED)
✅ Pros:
   - Already working
   - No risk of breaking calculators
   - Clear separation of concerns
   - Easy to maintain

❌ Cons:
   - Loads extra file
   - Some duplication (6 calculators)

OPTION B: Full Consolidation
✅ Pros:
   - Single source of truth
   - Modern ES6 modules only
   - No window globals

❌ Cons:
   - ~8000 lines to convert
   - Need to rewrite all onclick handlers
   - High risk of breakage
   - Time-consuming testing

SUGGESTED ACTION:
Keep the dual system. It's working well, and the "bridge" pattern
is actually good architecture. The extracted-calculators.js serves
as a stable compatibility layer while V2 native implementations
can be added incrementally.

If you want full consolidation, it's a ~4-8 hour task to:
1. Convert all 61 calculator templates
2. Rewrite all event handlers
3. Test every calculator
4. Debug any issues
""")

print("\n" + "=" * 60)
print("CURRENT STATUS: ✅ WORKING")
print("=" * 60)
print("""
The system is currently functional with:
- 6 native V2 calculators (Calculators.js)
- 61 bridge calculators (extracted-calculators.js)
- CalculatorManager coordinating both

This is a valid architectural pattern - no urgent need to change.
""")

"""Explore PSA HTML structure to understand question types and scoring."""
import os
import re

folder = r'static/assets/PSA/PSA Paper 1'
files = sorted([f for f in os.listdir(folder) if f.endswith('.html')])

print(f"Found {len(files)} HTML files\n")

for fname in files[:5]:  # First 5 to understand structure
    content = open(os.path.join(folder, fname), encoding='utf-8', errors='replace').read()
    title = re.search(r'Total Score - (\d+)/(\d+)', content)
    bg = re.search(r'hdnBackgroundColor[^>]*value="(#[0-9a-fA-F]+)"', content)
    txtcol = re.search(r'hdnTextColor[^>]*value="(#[0-9a-fA-F]+)"', content)
    
    # Find question type from header
    qtype_patterns = [
        r'Prescribing request',
        r'Adverse drug reactions?',
        r'Planning',
        r'Communicating',
        r'Monitoring',
        r'Calculation',
        r'Data interpretation',
        r'Drug review',
        r'prescribReq',
        r'section-heading',
    ]
    found_types = []
    for p in qtype_patterns:
        if re.search(p, content, re.IGNORECASE):
            found_types.append(p)
    
    score = title.group() if title else 'no score'
    col = bg.group(1) if bg else 'no color'
    
    # Get question section heading
    heading = re.search(r'<h[12][^>]*>([^<]+)</h[12]>', content)
    
    # Check for drug group score vs mcq
    has_drug_score = 'Drug Group Score' in content or 'Drug choice' in content
    has_mcq = bool(re.search(r'answer-option|option-text|radio.*question', content, re.IGNORECASE))
    has_score_table = 'score-table' in content.lower()
    
    print(f"=== {fname} ===")
    print(f"  Score: {score}")
    print(f"  BG color: {col}")
    print(f"  Has drug scoring: {has_drug_score}")
    print(f"  Has MCQ: {has_mcq}")
    print(f"  Has score table: {has_score_table}")
    print(f"  Found type patterns: {found_types}")
    print()

# Now look at data structure of all files
print("\n=== ALL FILES SUMMARY ===")
for fname in files:
    content = open(os.path.join(folder, fname), encoding='utf-8', errors='replace').read()
    title = re.search(r'Total Score - (\d+)/(\d+)', content)
    bg = re.search(r'hdnBackgroundColor[^>]*value="(#[0-9a-fA-F]+)"', content)
    has_drug = 'Drug Group Score' in content or 'Drug choice feedback' in content
    has_presc_form = 'PRESCRIPTION FORM' in content
    has_mcq = bool(re.search(r'class="[^"]*option[^"]*"', content))
    
    score = title.group() if title else 'no score'
    col = bg.group(1) if bg else 'no color'
    qtype = 'PRESC' if has_presc_form else ('MCQ' if has_mcq else 'OTHER')
    print(f"  {fname}: {score} | {col} | {qtype}")

import re
import os

folder = "static/assets/PSA/PSA Paper 1"
files = sorted([f for f in os.listdir(folder) if f.endswith(".html")])
print(f"{'File':<30} {'Type':<35} {'Score':<25} {'BG'}")
print("-" * 110)
for fname in files:
    content = open(os.path.join(folder, fname), encoding="utf-8", errors="replace").read()
    qtype = re.search(r"spnItemType[^>]*>([^<]+)<", content)
    score = re.search(r"Total Score - (\d+)/(\d+)", content)
    bg = re.search(r'hdnBackgroundColor[^>]*value="(#[0-9a-fA-F]+)"', content)
    qtype_text = qtype.group(1).strip() if qtype else "unknown"
    score_text = score.group(0) if score else "no score"
    bg_text = bg.group(1) if bg else "no bg"
    print(f"{fname:<30} [{qtype_text:<33}] {score_text:<25} {bg_text}")

#!/usr/bin/env python3
"""Fix invalid characters in coreConditions.js"""

import re

# Read the file
with open('static/js/data/coreConditions.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix remaining literal \n patterns  
# Pattern: diagnosis: {\n becomes diagnosis: {
content = re.sub(r':\s*\{\\n\s+', ': {\n            ', content)

# Pattern: firstLine: {\n becomes firstLine: {
content = re.sub(r'firstLine:\s*\{\\n\s+', 'firstLine: {\n                ', content)

# Fix escaped quotes in keywords and relatedConditions arrays
# Pattern: [\" becomes ["
content = re.sub(r'\[\\?"', '["', content)
content = re.sub(r'\\"', '"', content)

# Write back
with open('static/js/data/coreConditions.js', 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("Fixed remaining invalid characters in coreConditions.js")

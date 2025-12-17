import io
import os
import re

ROOT = os.path.join(os.path.dirname(__file__), '..')
P = os.path.normpath(os.path.join(ROOT, 'static', 'js', 'data', 'coreConditions.js'))

if not os.path.exists(P):
    print('File not found:', P)
    raise SystemExit(2)

with io.open(P, 'r', encoding='utf-8') as f:
    s = f.read()

# Remove BOM if present
if s.startswith('\ufeff'):
    s = s.lstrip('\ufeff')

# Normalize smart quotes
s = s.replace('\u2018', "'").replace('\u2019', "'")
s = s.replace('\u201C', '"').replace('\u201D', '"')

# Remove other C0 control characters except tab/newline/carriage-return
s = re.sub(r'[\x00-\x08\x0B\x0C\x0E-\x1F]', '', s)

with io.open(P, 'w', encoding='utf-8') as f:
    f.write(s)

print('Cleaned:', P)

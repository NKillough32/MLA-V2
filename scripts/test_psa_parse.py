import sys, logging, types
sys.path.insert(0, 'api')
logging.disable(logging.CRITICAL)

# Load index.py without triggering ensure_asset_manifest() at module level
_src = open('api/index.py', encoding='utf-8').read()
# Replace the two bare module-level calls
_src = _src.replace('\nensure_asset_manifest()\n', '\npass  # patched\n', 2)
idx = types.ModuleType('index')
idx.__file__ = 'api/index.py'
sys.modules['index'] = idx
exec(compile(_src, 'api/index.py', 'exec'), idx.__dict__)

logging.disable(logging.CRITICAL)

for paper, path in [
    ('Paper 1', 'static/assets/PSA/psa-paper1-official.md'),
    ('Paper 2', 'static/assets/PSA/psa-paper2-official.md'),
]:
    try:
        content = open(path, encoding='utf-8').read()
    except FileNotFoundError:
        print(f"{paper}: file not found")
        continue
    qs = idx.PWAQuizLoader._parse_psa_content(content, path)
    types_count = {}
    for q in qs:
        types_count[q['question_type']] = types_count.get(q['question_type'], 0) + 1
    print(f"{paper}: Total={len(qs)} | {types_count}")


for paper, path in [
    ('Paper 1', 'static/assets/PSA/psa-paper1-official.md'),
    ('Paper 2', 'static/assets/PSA/psa-paper2-official.md'),
]:
    try:
        content = open(path, encoding='utf-8').read()
    except FileNotFoundError:
        print(f"{paper}: file not found")
        continue
    qs = idx.PWAQuizLoader._parse_psa_content(content, path)
    types = {}
    for q in qs:
        types[q['question_type']] = types.get(q['question_type'], 0) + 1
    print(f"{paper}: Total={len(qs)} | {types}")

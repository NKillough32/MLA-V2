import sys, logging
sys.path.insert(0, 'api')
logging.disable(logging.CRITICAL)
import index as idx
logging.disable(logging.CRITICAL)

content = open('static/assets/PSA/psa-paper1-official.md', encoding='utf-8').read()
qs = idx.PWAQuizLoader._parse_psa_content(content, 'test')
types = {}
for q in qs:
    types[q['question_type']] = types.get(q['question_type'], 0) + 1
print(f"Total: {len(qs)} | Types: {types}")

q5 = next((q for q in qs if q['id'] == 5), None)
if q5:
    print(f"Q5 correct_a={q5['part_a']['correct']} opts={len(q5['part_a']['options'])}")
    ca = q5['part_a']['correct']
    print(f"Q5 correct drug A: {q5['part_a']['options'][ca] if ca is not None else 'None'}")
    print(f"Q5 exp: {q5.get('explanation','')[:100]}")
else:
    print("Q5 not found!")

q1 = next((q for q in qs if q['id'] == 1), None)
if q1:
    print(f"Q1 type={q1['question_type']} drug_opts={len(q1.get('drug_options',[]))}")

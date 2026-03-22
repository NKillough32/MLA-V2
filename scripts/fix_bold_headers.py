import re

path = r'c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\assets\PSA\psa-paper3-official.md'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix pattern: **Header text\n** → **Header text**\n
# e.g. "**On examination\n**" → "**On examination**\n"
fixed = re.sub(r'\*\*([^\n*]+)\n\*\*', r'**\1**\n', content)

n = len(re.findall(r'\*\*[^\n*]+\n\*\*', content))
print(f'Fixes applied: {n}')

with open(path, 'w', encoding='utf-8') as f:
    f.write(fixed)
print('Done')

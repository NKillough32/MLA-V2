"""
Fix extracted-calculators.js by removing ALL invalid switch case statements
"""

file_path = r"C:\Users\Nicho\Desktop\MLA-V2\static\js\v2\extracted-calculators.js"

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove all switch case blocks (they're not valid in object literal)
# Pattern: case 'xxx': ... break; or default: ... }
import re

# Remove all case blocks between functions
def clean_content(text):
    lines = text.split('\n')
    cleaned_lines = []
    in_switch_block = False
    brace_count = 0
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        
        # Detect start of switch block
        if ('case ' in stripped and stripped.endswith(':')) or stripped == 'default:':
            in_switch_block = True
            continue
            
        # If in switch block, skip until we see a function definition or closing brace at right level
        if in_switch_block:
            # Check if this line starts a new function (method in object)
            if re.match(r'^\s+\w+\([^)]*\)\s*\{', line):
                in_switch_block = False
                cleaned_lines.append(line)
                brace_count = 0
            # Skip break, continue, case statements
            elif 'break;' in stripped or 'continue;' in stripped:
                continue
            # Skip calculatorTitle = or calculatorContent += lines
            elif ('calculatorTitle =' in stripped or 
                  'calculatorContent +=' in stripped or
                  'case ' in stripped):
                continue
            else:
                # Keep other lines but be careful
                if stripped:  # Non-empty line
                    # Only keep if it looks like real code
                    if not (stripped.startswith('case') or stripped == 'break;'):
                        cleaned_lines.append(line)
        else:
            cleaned_lines.append(line)
    
    return '\n'.join(cleaned_lines)

cleaned = clean_content(content)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(cleaned)

print(f"✅ Cleaned extracted-calculators.js")
print(f"Removed all switch case statements")

# Count remaining lines
with open(file_path, 'r', encoding='utf-8') as f:
    final_lines = len(f.readlines())
print(f"Final file: {final_lines} lines")

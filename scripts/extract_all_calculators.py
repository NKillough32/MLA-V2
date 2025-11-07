"""
Extract ALL calculator functions from V1 app.js and create a clean ExtractedCalculators object
"""

import re
from pathlib import Path

# File paths
app_js_path = Path(r"C:\Users\Nicho\Desktop\MLA-V2\static\js\v2\app.js")
output_path = Path(r"C:\Users\Nicho\Desktop\MLA-V2\static\js\v2\extracted-calculators.js")

print("🔍 Reading app.js...")
with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all calculator functions - they exist in TWO formats:
# 1. Class methods:    getBMICalculator() { ... }
# 2. Prototype methods: MLAQuizApp.prototype.getGRACECalculator = function() { ... };

print("🔍 Extracting class method calculators...")
# Match class methods with 4-space indent
class_getter_pattern = r'^\s{4}(get\w+Calculator)\(\)\s*\{([\s\S]*?)^\s{4}\}'
class_getters = re.findall(class_getter_pattern, content, re.MULTILINE)
print(f"   Found {len(class_getters)} class getter methods")

class_calc_pattern = r'^\s{4}(calculate\w+)\(([^)]*)\)\s*\{([\s\S]*?)^\s{4}\}'
class_calcs = re.findall(class_calc_pattern, content, re.MULTILINE)
print(f"   Found {len(class_calcs)} class calculate methods")

print("🔍 Extracting prototype calculators...")
# Match: MLAQuizApp.prototype.getFooCalculator = function() { ... };
proto_getter_pattern = r'MLAQuizApp\.prototype\.(get\w+Calculator)\s*=\s*function\(\)\s*\{([\s\S]*?)^\};'
proto_getters = re.findall(proto_getter_pattern, content, re.MULTILINE)
print(f"   Found {len(proto_getters)} prototype getter functions")

# Match: MLAQuizApp.prototype.calculateFoo = function() { ... };
proto_calc_pattern = r'MLAQuizApp\.prototype\.(calculate\w+)\s*=\s*function\(([^)]*)\)\s*\{([\s\S]*?)^\};'
proto_calcs = re.findall(proto_calc_pattern, content, re.MULTILINE)
print(f"   Found {len(proto_calcs)} prototype calculate functions")

# Combine all matches
print(f"\n✅ Total: {len(class_getters) + len(proto_getters)} getters, {len(class_calcs) + len(proto_calcs)} calculators")

# Build list of getters with proper format
getters = []

# Add class getters
for name, body in class_getters:
    func = f"{name}() {{\n{body}\n    }}"
    getters.append(func)

# Add prototype getters
for name, body in proto_getters:
    func = f"{name}() {{\n{body}\n    }}"
    getters.append(func)

# Build list of calculators with proper format  
calculators = []

# Add class calculators
for name, params, body in class_calcs:
    func = f"{name}({params}) {{\n{body}\n    }}"
    calculators.append(func)

# Add prototype calculators
for name, params, body in proto_calcs:
    func = f"{name}({params}) {{\n{body}\n    }}"
    calculators.append(func)

# Remove duplicates while preserving order
seen_names = set()
unique_getters = []
for getter in getters:
    # Extract function name
    match = re.match(r'(\w+)\(', getter)
    if match:
        name = match.group(1)
        if name not in seen_names:
            seen_names.add(name)
            unique_getters.append(getter)

unique_calculators = []
for calc in calculators:
    # Extract function name
    match = re.match(r'(\w+)\(', calc)
    if match:
        name = match.group(1)
        if name not in seen_names:
            seen_names.add(name)
            unique_calculators.append(calc)

print(f"✅ Unique getters: {len(unique_getters)}")
print(f"✅ Unique calculators: {len(unique_calculators)}")

# Build the ExtractedCalculators object
output_lines = [
    "/**\n",
    " * Extracted Calculators from app.js\n",
    " * Generated: 2025-11-05 (Complete Extraction)\n",
    f" * Total calculator getters: {len(unique_getters)}\n",
    f" * Total calculate functions: {len(unique_calculators)}\n",
    " */\n",
    "\n",
    "const ExtractedCalculators = {\n",
    "\n"
]

# Add all getter functions with commas
for i, getter in enumerate(unique_getters):
    # Indent the function properly (already has 4 space indent, keep it)
    output_lines.append("    " + getter)
    # Add comma after each function except the last
    if i < len(unique_getters) - 1 or len(unique_calculators) > 0:
        output_lines.append(",\n\n")
    else:
        output_lines.append("\n\n")

# Add all calculate functions with commas
for i, calc in enumerate(unique_calculators):
    output_lines.append("    " + calc)
    # Add comma after each function except the last
    if i < len(unique_calculators) - 1:
        output_lines.append(",\n\n")
    else:
        output_lines.append("\n")

# Close the object and export
output_lines.extend([
    "\n};\n",
    "\n",
    "// Export to window for V2 bridge\n",
    "if (typeof window !== 'undefined') {\n",
    "    window.ExtractedCalculators = ExtractedCalculators;\n",
    "}\n",
    "\n",
    f"console.log('✅ ExtractedCalculators loaded: {len(unique_getters)} getters, {len(unique_calculators)} calculate functions');\n"
])

# Write output
print(f"📝 Writing to {output_path}...")
with open(output_path, 'w', encoding='utf-8') as f:
    f.writelines(output_lines)

print(f"✅ DONE! Created extracted-calculators.js")
print(f"   Total lines: {len(output_lines)}")
print(f"   Getters: {len(unique_getters)}")
print(f"   Calculate functions: {len(unique_calculators)}")
print(f"   Total functions: {len(unique_getters) + len(unique_calculators)}")

# List all extracted functions
print("\n📋 Extracted Getter Functions:")
for getter in unique_getters:
    match = re.match(r'(\w+)\(', getter)
    if match:
        print(f"   ✓ {match.group(1)}")

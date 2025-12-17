"""
Merge Completed Conditions into Generated Templates

This script:
1. Reads completed conditions from coreConditions.js
2. Reads template conditions from coreConditions_generated.js
3. Replaces templates with completed versions where they exist
4. Creates a merged file as the new coreConditions.js
"""

import re
from pathlib import Path

def extract_conditions(js_content):
    """Extract individual condition objects from JavaScript file"""
    conditions = {}
    
    # Find all condition entries using regex
    # Pattern: 'condition-id': { ... }
    pattern = r"'([a-z0-9-]+)':\s*\{([\s\S]*?)\n    \}(?=,\n\n    '|,\n\n    //|$)"
    
    matches = re.finditer(pattern, js_content)
    
    for match in matches:
        condition_id = match.group(1)
        condition_content = match.group(2)
        
        # Check if it's a placeholder template
        is_template = 'PLACEHOLDER' in condition_content
        
        conditions[condition_id] = {
            'id': condition_id,
            'content': match.group(0),
            'is_template': is_template
        }
    
    return conditions

def main():
    base_path = Path(__file__).parent.parent
    completed_path = base_path / 'static' / 'js' / 'data' / 'coreConditions.js'
    generated_path = base_path / 'static' / 'js' / 'data' / 'coreConditions_generated.js'
    output_path = base_path / 'static' / 'js' / 'data' / 'coreConditions_merged.js'
    
    print("📖 Reading files...")
    
    # Read completed conditions
    with open(completed_path, 'r', encoding='utf-8') as f:
        completed_content = f.read()
    
    completed_conditions = extract_conditions(completed_content)
    print(f"   Found {len(completed_conditions)} conditions in completed file")
    completed_count = sum(1 for c in completed_conditions.values() if not c['is_template'])
    print(f"   {completed_count} are fully completed")
    
    # Read generated templates
    with open(generated_path, 'r', encoding='utf-8') as f:
        generated_content = f.read()
    
    # Start building the merged file
    print("\n🔄 Merging conditions...")
    
    # We'll work with the generated file as base and replace templates with completed versions
    merged_content = generated_content
    
    # For each completed condition, replace the template in generated file
    replaced_count = 0
    for condition_id, condition_data in completed_conditions.items():
        if not condition_data['is_template']:  # Only use completed conditions
            # Find and replace in merged content
            # Look for the condition in the generated file
            pattern = f"'{condition_id}':\\s*\\{{[\\s\\S]*?\\n    \\}}"
            
            if re.search(pattern, merged_content):
                merged_content = re.sub(pattern, condition_data['content'], merged_content, count=1)
                replaced_count += 1
                print(f"   ✓ Replaced template for: {condition_id}")
    
    print(f"\n📊 Summary:")
    print(f"   Replaced {replaced_count} templates with completed conditions")
    
    # Write merged file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(merged_content)
    
    print(f"\n✅ Merged file created: {output_path}")
    print(f"\n🔧 Next steps:")
    print(f"   1. Review the merged file")
    print(f"   2. If satisfied, rename it to coreConditions.js")
    print(f"   3. Continue filling in PLACEHOLDER content")
    
    # Count remaining templates
    remaining_templates = merged_content.count('PLACEHOLDER')
    total_conditions = len(re.findall(r"'[a-z0-9-]+':\s*\{", merged_content))
    
    print(f"\n📈 Progress:")
    print(f"   Total conditions: {total_conditions}")
    print(f"   Completed: {replaced_count}")
    print(f"   Templates remaining: {total_conditions - replaced_count}")

if __name__ == '__main__':
    main()

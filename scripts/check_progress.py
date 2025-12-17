"""
Core Conditions Progress Tracker

Shows which conditions are completed vs still templates
Helps prioritize which conditions to work on next
"""

import re
from pathlib import Path
from collections import defaultdict

def analyze_conditions(js_content):
    """Analyze conditions in the JavaScript file"""
    
    # Extract all conditions
    pattern = r"'([a-z0-9-]+)':\s*\{[\s\S]*?name:\s*'([^']+)',\s*domain:\s*'([^']+)'[\s\S]*?\n    \}"
    
    matches = re.finditer(pattern, js_content)
    
    conditions_by_domain = defaultdict(list)
    completed_by_domain = defaultdict(int)
    template_by_domain = defaultdict(int)
    
    for match in matches:
        condition_id = match.group(1)
        condition_name = match.group(2)
        domain = match.group(3)
        
        full_match = match.group(0)
        is_template = 'PLACEHOLDER' in full_match
        
        conditions_by_domain[domain].append({
            'id': condition_id,
            'name': condition_name,
            'is_template': is_template
        })
        
        if is_template:
            template_by_domain[domain] += 1
        else:
            completed_by_domain[domain] += 1
    
    return conditions_by_domain, completed_by_domain, template_by_domain

def main():
    base_path = Path(__file__).parent.parent
    conditions_path = base_path / 'static' / 'js' / 'data' / 'coreConditions.js'
    
    print("📊 Core Conditions Progress Report")
    print("=" * 70)
    
    with open(conditions_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    conditions_by_domain, completed_by_domain, template_by_domain = analyze_conditions(content)
    
    # Calculate totals
    total_conditions = sum(len(conds) for conds in conditions_by_domain.values())
    total_completed = sum(completed_by_domain.values())
    total_templates = sum(template_by_domain.values())
    
    print(f"\n📈 Overall Progress:")
    print(f"   Total Conditions: {total_conditions}")
    print(f"   ✅ Completed: {total_completed} ({total_completed/total_conditions*100:.1f}%)")
    print(f"   ⏳ Templates: {total_templates} ({total_templates/total_conditions*100:.1f}%)")
    
    # Progress bar
    completed_blocks = int(total_completed / total_conditions * 50)
    template_blocks = 50 - completed_blocks
    progress_bar = "█" * completed_blocks + "░" * template_blocks
    print(f"\n   [{progress_bar}]")
    
    # By domain
    print(f"\n📚 Progress by Domain:")
    print("-" * 70)
    
    # Sort domains by completion percentage
    sorted_domains = sorted(
        conditions_by_domain.keys(),
        key=lambda d: completed_by_domain[d] / len(conditions_by_domain[d]),
        reverse=True
    )
    
    for domain in sorted_domains:
        total_in_domain = len(conditions_by_domain[domain])
        completed_in_domain = completed_by_domain[domain]
        template_in_domain = template_by_domain[domain]
        completion_pct = completed_in_domain / total_in_domain * 100
        
        # Mini progress bar
        domain_blocks = int(completion_pct / 100 * 20)
        domain_bar = "█" * domain_blocks + "░" * (20 - domain_blocks)
        
        print(f"\n{domain:35} [{domain_bar}] {completion_pct:5.1f}%")
        print(f"   Total: {total_in_domain:3} | ✅ {completed_in_domain:3} | ⏳ {template_in_domain:3}")
    
    # List completed conditions
    print(f"\n\n✅ Completed Conditions ({total_completed}):")
    print("-" * 70)
    
    for domain in sorted(conditions_by_domain.keys()):
        completed_conds = [c for c in conditions_by_domain[domain] if not c['is_template']]
        if completed_conds:
            print(f"\n{domain}:")
            for cond in completed_conds:
                print(f"   • {cond['name']}")
    
    # Suggest priorities
    print(f"\n\n💡 Suggested Priorities:")
    print("-" * 70)
    
    # High-priority domains with low completion
    priority_domains = [
        'Cardiology',
        'Respiratory', 
        'Neurology',
        'Endocrine',
        'Infection',
        'Gastrointestinal'
    ]
    
    for domain in priority_domains:
        if domain in conditions_by_domain:
            total_in_domain = len(conditions_by_domain[domain])
            completed_in_domain = completed_by_domain[domain]
            remaining = total_in_domain - completed_in_domain
            
            if remaining > 0:
                print(f"\n{domain}: {remaining} conditions remaining")
                
                # Show first 5 template conditions
                templates = [c for c in conditions_by_domain[domain] if c['is_template']][:5]
                for cond in templates:
                    print(f"   • {cond['name']}")
                
                if len(templates) < len([c for c in conditions_by_domain[domain] if c['is_template']]):
                    more = len([c for c in conditions_by_domain[domain] if c['is_template']]) - 5
                    print(f"   ... and {more} more")

if __name__ == '__main__':
    main()

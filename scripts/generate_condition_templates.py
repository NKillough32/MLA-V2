"""
Generate Core Conditions Templates from CSV
Reads core_conditions.csv and generates JavaScript condition templates
"""

import csv
import re
from pathlib import Path

def clean_condition_name(name):
    """Remove special characters and clean condition name"""
    # Remove question marks and special characters
    name = name.replace('?', '').replace('�', '')
    # Remove extra whitespace
    name = ' '.join(name.split())
    return name.strip()

def create_condition_id(name):
    """Convert condition name to kebab-case ID"""
    # Clean the name first
    name = clean_condition_name(name)
    # Convert to lowercase and replace spaces/special chars with hyphens
    id_string = name.lower()
    id_string = re.sub(r'[^\w\s-]', '', id_string)
    id_string = re.sub(r'[-\s]+', '-', id_string)
    return id_string.strip('-')

def generate_synonyms(name):
    """Generate common synonyms/abbreviations for a condition"""
    synonyms = []
    
    # Add the full name
    synonyms.append(name)
    
    # Common abbreviations
    abbrev_map = {
        'syndrome': '',
        'disease': '',
        'acute': '',
        'chronic': '',
        'infection': '',
    }
    
    # Generate abbreviated form
    words = name.split()
    if len(words) > 1:
        abbrev = ''.join(w[0].upper() for w in words if w.lower() not in ['and', 'or', 'the', 'of', 'in'])
        if len(abbrev) >= 2 and len(abbrev) <= 6:
            synonyms.append(abbrev)
    
    return synonyms

def generate_template(condition_name, domain):
    """Generate a condition template with placeholder content"""
    import json
    
    condition_id = create_condition_id(condition_name)
    clean_name = clean_condition_name(condition_name)
    synonyms = generate_synonyms(clean_name)
    
    # Convert to JSON for proper escaping
    synonyms_json = json.dumps(synonyms)
    keywords_json = json.dumps([condition_id, clean_name.lower(), "PLACEHOLDER-additional-keywords"])
    related_json = json.dumps(["PLACEHOLDER-related-id-1", "PLACEHOLDER-related-id-2"])
    
    template = f"""
    '{condition_id}': {{
        name: {json.dumps(clean_name)},
        domain: {json.dumps(domain)},
        synonyms: {synonyms_json},
        
        recognition: {{
            typical: [
                'PLACEHOLDER: Common presenting symptoms',
                'PLACEHOLDER: Typical patient demographics',
                'PLACEHOLDER: Key clinical features'
            ],
            atypical: [
                'PLACEHOLDER: Unusual presentations',
                'PLACEHOLDER: Elderly presentation',
                'PLACEHOLDER: Pediatric/special populations'
            ],
            examination: [
                'PLACEHOLDER: Physical examination findings',
                'PLACEHOLDER: Vital signs abnormalities',
                'PLACEHOLDER: Specific examination signs'
            ],
            redFlags: [
                'PLACEHOLDER: Life-threatening features',
                'PLACEHOLDER: Complications requiring urgent action',
                'PLACEHOLDER: Poor prognostic signs'
            ]
        }},
        
        investigation: {{
            immediate: [
                'PLACEHOLDER: First-line bedside tests',
                'PLACEHOLDER: Blood tests',
                'PLACEHOLDER: Imaging'
            ],
            further: [
                'PLACEHOLDER: Specialist investigations',
                'PLACEHOLDER: Advanced imaging',
                'PLACEHOLDER: Diagnostic procedures'
            ],
            interpretation: [
                'PLACEHOLDER: How to interpret key findings',
                'PLACEHOLDER: Diagnostic criteria thresholds',
                'PLACEHOLDER: Differentiating features'
            ]
        }},
        
        diagnosis: {{
            criteria: 'PLACEHOLDER: Diagnostic criteria or clinical diagnosis',
            differential: [
                'PLACEHOLDER: Main differential diagnosis',
                'PLACEHOLDER: Alternative diagnosis',
                'PLACEHOLDER: Red herring conditions'
            ]
        }},
        
        management: {{
            firstLine: {{
                immediate: [
                    'PLACEHOLDER: Emergency/acute management',
                    'PLACEHOLDER: Initial stabilization',
                    'PLACEHOLDER: First-line medications'
                ],
                ongoing: [
                    'PLACEHOLDER: Definitive treatment',
                    'PLACEHOLDER: Monitoring requirements',
                    'PLACEHOLDER: Follow-up plan'
                ]
            }},
            secondLine: [
                'PLACEHOLDER: Alternative therapies',
                'PLACEHOLDER: Specialist interventions',
                'PLACEHOLDER: Refractory case management'
            ],
            complications: [
                'PLACEHOLDER: Common complications',
                'PLACEHOLDER: Management of complications',
                'PLACEHOLDER: Long-term sequelae'
            ]
        }},
        
        clinicalPearls: [
            'PLACEHOLDER: Key clinical pearl or tip',
            'PLACEHOLDER: Common pitfall to avoid',
            'PLACEHOLDER: Examination or investigation tip',
            'PLACEHOLDER: Management pearl'
        ],
        
        prognosis: 'PLACEHOLDER: Natural history, mortality rates, recovery expectations',
        
        keywords: {keywords_json},
        
        relatedConditions: {related_json}
    }}"""
    
    return template

def main():
    # Read the CSV file
    csv_path = Path(__file__).parent.parent / 'docs' / 'core_conditions.csv'
    output_path = Path(__file__).parent.parent / 'static' / 'js' / 'data' / 'coreConditions_generated.js'
    
    conditions = []
    current_domain = ''
    
    print(f"Reading conditions from: {csv_path}")
    
    # Try different encodings
    encodings = ['utf-8', 'utf-8-sig', 'latin-1', 'cp1252', 'iso-8859-1']
    content = None
    
    for encoding in encodings:
        try:
            with open(csv_path, 'r', encoding=encoding) as f:
                content = f.read()
            print(f"Successfully read file with encoding: {encoding}")
            break
        except UnicodeDecodeError:
            continue
    
    if content is None:
        print("Error: Could not read file with any supported encoding")
        return
    
    # Parse CSV from string
    from io import StringIO
    reader = csv.reader(StringIO(content))
    next(reader)  # Skip header
    
    for row in reader:
        if len(row) < 2:
            continue
            
        domain_cell = row[0].strip()
        condition_cell = row[1].strip()
        
        # Update domain if cell has content
        if domain_cell:
            current_domain = clean_condition_name(domain_cell)
        
        # Skip if no condition name
        if not condition_cell or condition_cell.lower() == 'core conditions':
            continue
        
        condition_name = clean_condition_name(condition_cell)
        
        # Skip duplicates
        if any(c['name'] == condition_name and c['domain'] == current_domain for c in conditions):
            continue
        
        conditions.append({
            'name': condition_name,
            'domain': current_domain,
            'id': create_condition_id(condition_name)
        })
    
    print(f"Found {len(conditions)} unique conditions across domains")
    
    # Generate the JavaScript file
    output_content = '''/**
 * MLA Core Conditions Database - GENERATED TEMPLATES
 * 
 * This file contains template structures for all ~600 core conditions.
 * Each template needs to be filled in with comprehensive clinical details.
 * 
 * TEMPLATE STATUS: Generated from CSV - requires clinical content
 * 
 * To complete a condition:
 * 1. Replace all PLACEHOLDER text with accurate clinical information
 * 2. Add appropriate synonyms
 * 3. Update related conditions with actual condition IDs
 * 4. Review and validate all sections
 */

export const coreConditionsDatabase = {
'''
    
    # Group by domain for organization
    domains = {}
    for cond in conditions:
        domain = cond['domain']
        if domain not in domains:
            domains[domain] = []
        domains[domain].append(cond)
    
    # Generate templates by domain
    first_domain = True
    for domain in sorted(domains.keys()):
        if not first_domain:
            output_content += ',\n'
        first_domain = False
        
        output_content += f'\n    // ==========================================\n'
        output_content += f'    // {domain.upper()}\n'
        output_content += f'    // ==========================================\n'
        
        domain_conditions = domains[domain]
        for i, cond in enumerate(domain_conditions):
            template = generate_template(cond['name'], cond['domain'])
            output_content += template
            
            if i < len(domain_conditions) - 1:
                output_content += ','
        
        print(f"Generated {len(domain_conditions)} templates for {domain}")
    
    # Add utility functions
    output_content += '''
};

/**
 * Utility Functions
 */

// Get condition by ID
export function getCondition(conditionId) {
    return coreConditionsDatabase[conditionId];
}

// Search conditions by keyword
export function searchConditions(query) {
    const lowercaseQuery = query.toLowerCase();
    return Object.entries(coreConditionsDatabase)
        .filter(([id, condition]) => {
            return condition.name.toLowerCase().includes(lowercaseQuery) ||
                   condition.domain.toLowerCase().includes(lowercaseQuery) ||
                   condition.synonyms.some(syn => syn.toLowerCase().includes(lowercaseQuery)) ||
                   condition.keywords.some(kw => kw.toLowerCase().includes(lowercaseQuery));
        })
        .map(([id, condition]) => ({ id, ...condition }));
}

// Get conditions by domain
export function getConditionsByDomain(domain) {
    return Object.entries(coreConditionsDatabase)
        .filter(([id, condition]) => condition.domain === domain)
        .map(([id, condition]) => ({ id, ...condition }));
}

// Get all domains
export function getAllDomains() {
    const domains = new Set();
    Object.values(coreConditionsDatabase).forEach(condition => {
        domains.add(condition.domain);
    });
    return Array.from(domains).sort();
}

// Get statistics
export function getStatistics() {
    const domains = getAllDomains();
    const stats = {
        total: Object.keys(coreConditionsDatabase).length,
        byDomain: {},
        completed: 0,
        templates: 0
    };
    
    domains.forEach(domain => {
        stats.byDomain[domain] = getConditionsByDomain(domain).length;
    });
    
    // Count completed vs template conditions
    Object.values(coreConditionsDatabase).forEach(condition => {
        const isTemplate = condition.recognition.typical.some(item => 
            item.includes('PLACEHOLDER')
        );
        if (isTemplate) {
            stats.templates++;
        } else {
            stats.completed++;
        }
    });
    
    return stats;
}

// Check if condition is a template (needs completion)
export function isTemplate(conditionId) {
    const condition = getCondition(conditionId);
    if (!condition) return false;
    
    return condition.recognition.typical.some(item => 
        item.includes('PLACEHOLDER')
    );
}

// Get all template conditions (need completion)
export function getTemplateConditions() {
    return Object.entries(coreConditionsDatabase)
        .filter(([id, condition]) => isTemplate(id))
        .map(([id, condition]) => ({ id, ...condition }));
}

// Get all completed conditions
export function getCompletedConditions() {
    return Object.entries(coreConditionsDatabase)
        .filter(([id, condition]) => !isTemplate(id))
        .map(([id, condition]) => ({ id, ...condition }));
}
'''
    
    # Write to file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output_content)
    
    print(f"\n✅ Generated template file: {output_path}")
    print(f"\n📊 Summary:")
    print(f"   Total conditions: {len(conditions)}")
    print(f"   Domains: {len(domains)}")
    print(f"\n🔧 Next steps:")
    print(f"   1. Review the generated file")
    print(f"   2. Copy completed conditions from coreConditions.js")
    print(f"   3. Systematically fill in PLACEHOLDER content")
    print(f"   4. Use utility functions to track progress")

if __name__ == '__main__':
    main()

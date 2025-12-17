"""
Update coreConditions.js with extracted PDF data
Maps extracted condition data to JavaScript template structure
"""

import json
import re
from pathlib import Path
from typing import Dict, List

class ConditionUpdater:
    def __init__(self, js_file_path: str):
        self.js_file_path = Path(js_file_path)
        self.js_content = ""
        
    def load_js_file(self):
        """Load the JavaScript file"""
        with open(self.js_file_path, 'r', encoding='utf-8') as f:
            self.js_content = f.read()
        print(f"Loaded JS file: {self.js_file_path}")
        
    def find_condition_by_id(self, condition_id: str) -> tuple:
        """Find a condition entry in the JS file by ID"""
        # Pattern to match the condition block
        pattern = rf"'{condition_id}':\s*\{{(.+?)\n\s*\}}(?:,\s*\n|\n\s*\}})"
        match = re.search(pattern, self.js_content, re.DOTALL)
        
        if match:
            return match.start(), match.end(), match.group(0)
        return None, None, None
    
    def format_array_items(self, items: List[str], indent: int = 16) -> str:
        """Format array items with proper indentation"""
        if not items:
            return ""
        
        indent_str = " " * indent
        formatted = []
        for item in items:
            # Escape quotes and format
            escaped = item.replace("'", "\\'")
            formatted.append(f"{indent_str}'{escaped}'")
        
        return ",\n".join(formatted)
    
    def generate_condition_js(self, condition_id: str, condition_data: Dict, domain: str = "Unknown") -> str:
        """Generate JavaScript code for a condition"""
        
        # Helper function to format arrays
        def fmt_array(items, indent=16):
            return self.format_array_items(items, indent)
        
        js = f"    '{condition_id}': {{\n"
        js += f"        name: \"{condition_data.get('name', condition_id.replace('-', ' ').title())}\",\n"
        js += f"        domain: \"{domain}\",\n"
        
        # Synonyms
        synonyms = condition_data.get('synonyms', [])
        if not synonyms:
            synonyms = [condition_data.get('name', condition_id.replace('-', ' ').title())]
        synonym_list = ', '.join([f'"{s}"' for s in synonyms])
        js += f"        synonyms: [{synonym_list}],\n"
        js += f"        \n"
        
        # Recognition section
        recognition = condition_data.get('recognition', {})
        js += f"        recognition: {{\n"
        js += f"            typical: [\n"
        js += fmt_array(recognition.get('typical', ['Clinical presentation data needed']))
        js += f"\n            ],\n"
        js += f"            atypical: [\n"
        js += fmt_array(recognition.get('atypical', ['Atypical presentation data needed']))
        js += f"\n            ],\n"
        js += f"            examination: [\n"
        js += fmt_array(recognition.get('examination', ['Examination findings needed']))
        js += f"\n            ],\n"
        js += f"            redFlags: [\n"
        js += fmt_array(recognition.get('redFlags', ['Red flag signs needed']))
        js += f"\n            ]\n"
        js += f"        }},\n"
        js += f"        \n"
        
        # Investigation section
        investigation = condition_data.get('investigation', {})
        js += f"        investigation: {{\n"
        js += f"            immediate: [\n"
        js += fmt_array(investigation.get('immediate', ['Initial investigation data needed']))
        js += f"\n            ],\n"
        js += f"            further: [\n"
        js += fmt_array(investigation.get('further', ['Further investigation data needed']))
        js += f"\n            ],\n"
        js += f"            interpretation: [\n"
        js += fmt_array(investigation.get('interpretation', ['Interpretation guidance needed']))
        js += f"\n            ]\n"
        js += f"        }},\n"
        js += f"        \n"
        
        # Diagnosis section
        diagnosis = condition_data.get('diagnosis', {})
        criteria = diagnosis.get('criteria', 'Diagnostic criteria needed')
        js += f"        diagnosis: {{\n"
        js += f"            criteria: '{criteria}',\n"
        js += f"            differential: [\n"
        js += fmt_array(diagnosis.get('differential', ['Differential diagnosis needed']))
        js += f"\n            ]\n"
        js += f"        }},\n"
        js += f"        \n"
        
        # Management section
        management = condition_data.get('management', {})
        first_line = management.get('firstLine', {})
        js += f"        management: {{\n"
        js += f"            firstLine: {{\n"
        js += f"                immediate: [\n"
        js += fmt_array(first_line.get('immediate', ['Immediate management data needed']))
        js += f"\n                ],\n"
        js += f"                ongoing: [\n"
        js += fmt_array(first_line.get('ongoing', ['Ongoing management data needed']))
        js += f"\n                ]\n"
        js += f"            }},\n"
        js += f"            secondLine: [\n"
        js += fmt_array(management.get('secondLine', ['Second-line treatment data needed']))
        js += f"\n            ],\n"
        js += f"            complications: [\n"
        js += fmt_array(management.get('complications', ['Complication data needed']))
        js += f"\n            ]\n"
        js += f"        }},\n"
        js += f"        \n"
        
        # Clinical pearls
        js += f"        clinicalPearls: [\n"
        js += fmt_array(condition_data.get('clinicalPearls', ['Clinical pearls needed']))
        js += f"\n        ],\n"
        js += f"        \n"
        
        # Prognosis
        prognosis = condition_data.get('prognosis', 'Prognosis data needed')
        js += f"        prognosis: '{prognosis}',\n"
        js += f"        \n"
        
        # Keywords
        keywords = [condition_id] + condition_data.get('synonyms', [])[:2]
        keyword_list = ', '.join([f'"{k}"' for k in keywords])
        js += f"        keywords: [{keyword_list}],\n"
        js += f"        \n"
        
        # Related conditions
        related = condition_data.get('relatedConditions', [])
        if not related:
            related = []
        related_list = ', '.join([f'"{r}"' for r in related])
        js += f"        relatedConditions: [{related_list}]\n"
        js += f"    }}"
        
        return js
    
    def list_all_condition_ids(self) -> List[str]:
        """Extract all condition IDs from the JavaScript file"""
        pattern = r"'([a-z0-9-]+)':\s*\{"
        matches = re.findall(pattern, self.js_content)
        return matches
    
    def count_placeholders(self) -> int:
        """Count PLACEHOLDER occurrences in the file"""
        return self.js_content.count('PLACEHOLDER')


def main():
    js_file = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\coreConditions.js"
    
    print("="*60)
    print("Core Conditions Updater")
    print("="*60)
    
    updater = ConditionUpdater(js_file)
    updater.load_js_file()
    
    # Analyze current state
    print("\nCurrent state analysis:")
    condition_ids = updater.list_all_condition_ids()
    print(f"Total conditions: {len(condition_ids)}")
    print(f"Total PLACEHOLDERs: {updater.count_placeholders()}")
    
    print("\nFirst 20 condition IDs:")
    for i, cid in enumerate(condition_ids[:20], 1):
        print(f"{i:3}. {cid}")
    
    # Test generation
    print("\n" + "="*60)
    print("Testing condition generation...")
    print("="*60)
    
    test_condition = {
        'name': 'Test Condition',
        'synonyms': ['TC', 'Test'],
        'recognition': {
            'typical': ['Symptom 1', 'Symptom 2'],
            'atypical': ['Unusual presentation'],
            'examination': ['Sign 1', 'Sign 2'],
            'redFlags': ['Emergency sign']
        },
        'investigation': {
            'immediate': ['Blood test', 'ECG'],
            'further': ['CT scan'],
            'interpretation': ['How to interpret']
        },
        'diagnosis': {
            'criteria': 'Clinical diagnosis',
            'differential': ['Alternative 1', 'Alternative 2']
        },
        'management': {
            'firstLine': {
                'immediate': ['Emergency treatment'],
                'ongoing': ['Long-term management']
            },
            'secondLine': ['Alternative therapy'],
            'complications': ['Complication 1']
        },
        'clinicalPearls': ['Pearl 1', 'Pearl 2'],
        'prognosis': 'Generally good'
    }
    
    generated = updater.generate_condition_js('test-condition', test_condition, 'Test Domain')
    print("\nGenerated JavaScript:")
    print(generated)


if __name__ == "__main__":
    main()

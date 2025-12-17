"""
Merge extracted conditions into coreConditions.js
Updates the main file with extracted data while preserving structure
"""

import json
import re
from pathlib import Path
from typing import Dict, List


class ConditionMerger:
    def __init__(self, core_file: str, extracted_json: str):
        self.core_file = Path(core_file)
        self.extracted_json = Path(extracted_json)
        
    def load_extracted_data(self) -> Dict:
        """Load the extracted conditions from JSON"""
        with open(self.extracted_json, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def find_condition_in_file(self, content: str, condition_id: str) -> tuple:
        """Find the start and end position of a condition in the file"""
        # Pattern to match the condition entry
        pattern = rf"'{condition_id}':\s*\{{"
        match = re.search(pattern, content)
        
        if not match:
            return None, None
        
        start = match.start()
        
        # Find the closing brace for this condition
        # Count braces to find the matching close
        brace_count = 0
        in_condition = False
        end = start
        
        for i in range(start, len(content)):
            if content[i] == '{':
                brace_count += 1
                in_condition = True
            elif content[i] == '}':
                brace_count -= 1
                if in_condition and brace_count == 0:
                    end = i + 1
                    # Check if there's a comma after
                    if i + 1 < len(content) and content[i + 1] == ',':
                        end = i + 2
                    break
        
        return start, end
    
    def format_array(self, items: List[str], indent: int = 12) -> str:
        """Format an array of strings for JavaScript"""
        if not items:
            return "\n" + " " * indent
        
        indent_str = " " * indent
        formatted_items = []
        
        for item in items:
            # Escape single quotes in the text
            escaped = item.replace("'", "\\'")
            formatted_items.append(f"{indent_str}'{escaped}'")
        
        return "\n" + ",\n".join(formatted_items) + "\n" + " " * (indent - 4)
    
    def generate_condition_js(self, condition_id: str, data: Dict) -> str:
        """Generate JavaScript code for a condition"""
        name = data.get('name', 'Unknown')
        domain = data.get('domain', 'Unknown')
        synonyms = data.get('synonyms', [name])
        
        recognition = data.get('recognition', {})
        investigation = data.get('investigation', {})
        diagnosis = data.get('diagnosis', {})
        management = data.get('management', {})
        prognosis = data.get('prognosis', '')
        
        # Escape single quotes in prognosis
        prognosis_escaped = prognosis.replace("'", "\\'")
        
        js = f"    '{condition_id}': {{\n"
        js += f"        name: \"{name}\",\n"
        js += f"        domain: \"{domain}\",\n"
        
        # Synonyms
        synonym_list = ', '.join([f'"{s}"' for s in synonyms])
        js += f"        synonyms: [{synonym_list}],\n"
        js += f"        \n"
        
        # Recognition
        js += f"        recognition: {{\n"
        js += f"            typical: [{self.format_array(recognition.get('typical', []))}],\n"
        js += f"            atypical: [{self.format_array(recognition.get('atypical', []))}],\n"
        js += f"            examination: [{self.format_array(recognition.get('examination', []))}],\n"
        js += f"            redFlags: [{self.format_array(recognition.get('redFlags', []))}]\n"
        js += f"        }},\n"
        js += f"        \n"
        
        # Investigation
        js += f"        investigation: {{\n"
        js += f"            immediate: [{self.format_array(investigation.get('immediate', []))}],\n"
        js += f"            further: [{self.format_array(investigation.get('further', []))}],\n"
        js += f"            interpretation: [{self.format_array(investigation.get('interpretation', []))}]\n"
        js += f"        }},\n"
        js += f"        \n"
        
        # Diagnosis
        diag_criteria = diagnosis.get('criteria', '').replace("'", "\\'")
        js += f"        diagnosis: {{\n"
        js += f"            criteria: '{diag_criteria}',\n"
        js += f"            differential: [{self.format_array(diagnosis.get('differential', []))}]\n"
        js += f"        }},\n"
        js += f"        \n"
        
        # Management
        js += f"        management: {{\n"
        js += f"            firstLine: {{\n"
        js += f"                immediate: [{self.format_array(management.get('firstLine', {}).get('immediate', []))}],\n"
        js += f"                ongoing: [{self.format_array(management.get('firstLine', {}).get('ongoing', []))}]\n"
        js += f"            }},\n"
        js += f"            secondLine: [{self.format_array(management.get('secondLine', []))}],\n"
        js += f"            complications: [{self.format_array(management.get('complications', []))}]\n"
        js += f"        }},\n"
        js += f"        \n"
        
        # Clinical Pearls and Prognosis
        js += f"        clinicalPearls: [{self.format_array(data.get('clinicalPearls', []))}],\n"
        js += f"        \n"
        js += f"        prognosis: '{prognosis_escaped}',\n"
        js += f"        \n"
        
        # Keywords and related conditions
        js += f"        keywords: [\"{condition_id}\", \"{name}\"],\n"
        js += f"        \n"
        js += f"        relatedConditions: []\n"
        js += f"    }}"
        
        return js
    
    def merge_conditions(self, backup: bool = True) -> Dict[str, str]:
        """Merge extracted conditions into the core file"""
        print("="*70)
        print("MERGING EXTRACTED CONDITIONS INTO CORE FILE")
        print("="*70)
        
        # Load extracted data
        print("\n📥 Loading extracted conditions...")
        extracted_data = self.load_extracted_data()
        print(f"   Found {len(extracted_data)} conditions to merge")
        
        # Create backup if requested
        if backup:
            backup_path = self.core_file.parent / f"{self.core_file.stem}_backup{self.core_file.suffix}"
            print(f"\n💾 Creating backup: {backup_path.name}")
            with open(self.core_file, 'r', encoding='utf-8') as f:
                backup_content = f.read()
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.write(backup_content)
        
        # Load core file
        print(f"\n📖 Reading core file: {self.core_file.name}")
        with open(self.core_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_size = len(content)
        original_content = content
        
        # Track results
        results = {
            'updated': [],
            'not_found': [],
            'errors': []
        }
        
        # Process each condition
        print(f"\n🔄 Merging conditions...\n")
        for i, (condition_id, condition_data) in enumerate(extracted_data.items(), 1):
            try:
                print(f"[{i}/{len(extracted_data)}] Processing: {condition_id}")
                
                # Pattern to find the entire condition block including the closing brace and comma
                # Match from the ID to the next condition or end of object
                pattern = rf"'{condition_id}':\s*\{{[\s\S]*?\n    \}}(?=,|\s*\n*$)"
                
                match = re.search(pattern, content)
                
                if not match:
                    print(f"   ⚠️  NOT FOUND in core file")
                    results['not_found'].append(condition_id)
                    continue
                
                # Generate new JavaScript
                new_js = self.generate_condition_js(condition_id, condition_data)
                
                # Replace in content
                content = content[:match.start()] + new_js + content[match.end():]
                
                print(f"   ✅ UPDATED")
                results['updated'].append(condition_id)
                
            except Exception as e:
                print(f"   ❌ ERROR: {str(e)}")
                results['errors'].append((condition_id, str(e)))
                # Restore content on error
                content = original_content
        
        # Only write if we had successful updates
        if results['updated']:
            print(f"\n💾 Writing updated file...")
            with open(self.core_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            new_size = len(content)
        else:
            print(f"\n⚠️  No updates made, file unchanged")
            new_size = original_size
        
        # Summary
        print("\n" + "="*70)
        print("MERGE COMPLETE")
        print("="*70)
        print(f"\n📊 Results:")
        print(f"   ✅ Successfully updated: {len(results['updated'])}")
        print(f"   ⚠️  Not found in file: {len(results['not_found'])}")
        print(f"   ❌ Errors: {len(results['errors'])}")
        
        if results['updated']:
            print(f"\n✅ Updated conditions:")
            for cid in results['updated']:
                print(f"      • {cid}")
        
        if results['not_found']:
            print(f"\n⚠️  Conditions not found:")
            for cid in results['not_found']:
                print(f"      • {cid}")
        
        if results['errors']:
            print(f"\n❌ Errors encountered:")
            for cid, error in results['errors']:
                print(f"      • {cid}: {error}")
        
        print(f"\n📦 File size:")
        print(f"   Before: {original_size:,} bytes")
        print(f"   After:  {new_size:,} bytes")
        print(f"   Change: {new_size - original_size:+,} bytes")
        
        if results['updated']:
            print(f"\n✨ Core file updated: {self.core_file}")
        if backup:
            print(f"💾 Backup saved: {backup_path}")
        
        return results


def main():
    # File paths
    core_file = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\coreConditions.js"
    extracted_json = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\scripts\extracted_conditions.json"
    
    # Create merger and run
    merger = ConditionMerger(core_file, extracted_json)
    results = merger.merge_conditions(backup=True)
    
    print("\n" + "="*70)


if __name__ == "__main__":
    main()

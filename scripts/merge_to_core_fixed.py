"""
Fixed Merge Script - Properly replaces conditions in coreConditions.js
Uses character-by-character brace counting for accurate block detection
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional


class ConditionMergerFixed:
    def __init__(self, core_file: str, extracted_json: str):
        self.core_file = Path(core_file)
        self.extracted_json = Path(extracted_json)
        
    def load_extracted_data(self) -> Dict:
        """Load the extracted conditions from JSON"""
        with open(self.extracted_json, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def find_condition_block(self, content: str, condition_id: str) -> Optional[Tuple[int, int]]:
        """Find the exact start and end position of a condition block using brace counting"""
        # Find the condition ID
        pattern = rf"'{condition_id}':\s*{{"
        match = re.search(pattern, content)
        
        if not match:
            return None
        
        start = match.start()
        pos = match.end() - 1  # Position of opening brace
        
        # Count braces to find matching closing brace
        brace_count = 0
        in_string = False
        escape_next = False
        
        for i in range(pos, len(content)):
            char = content[i]
            
            # Handle escape sequences
            if escape_next:
                escape_next = False
                continue
            
            if char == '\\':
                escape_next = True
                continue
            
            # Track string boundaries
            if char in ['"', "'"]:
                in_string = not in_string
                continue
            
            # Only count braces outside of strings
            if not in_string:
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                    
                    # Found the matching closing brace
                    if brace_count == 0:
                        # Check if there's a comma after the closing brace
                        end = i + 1
                        if end < len(content) and content[end] == ',':
                            end += 1
                        # Include trailing newline if present
                        if end < len(content) and content[end] == '\n':
                            end += 1
                        return (start, end)
        
        return None
    
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
        
        js = f"'{condition_id}': {{\n"
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
    
    def merge_conditions(self, backup: bool = True, dry_run: bool = False) -> Dict[str, any]:
        """Merge extracted conditions into the core file"""
        print("="*70)
        print("FIXED MERGE - REPLACING CONDITIONS IN CORE FILE")
        print("="*70)
        
        if dry_run:
            print("\n🔍 DRY RUN MODE - No changes will be written\n")
        
        # Load extracted data
        print("\n📥 Loading extracted conditions...")
        extracted_data = self.load_extracted_data()
        print(f"   Found {len(extracted_data)} conditions to merge")
        
        # Load core file
        print(f"\n📖 Reading core file: {self.core_file.name}")
        with open(self.core_file, 'r', encoding='utf-8') as f:
            original_content = f.read()
        
        original_size = len(original_content)
        modified_content = original_content
        
        # Track results
        results = {
            'updated': [],
            'not_found': [],
            'errors': [],
            'test_matches': []
        }
        
        # Process each condition
        print(f"\n🔄 Processing conditions...\n")
        for i, (condition_id, condition_data) in enumerate(extracted_data.items(), 1):
            try:
                print(f"[{i}/{len(extracted_data)}] {condition_id}")
                
                # Find the condition block
                block_pos = self.find_condition_block(modified_content, condition_id)
                
                if block_pos is None:
                    print(f"   ⚠️  NOT FOUND in core file")
                    results['not_found'].append(condition_id)
                    continue
                
                start, end = block_pos
                
                # Show what we found
                old_snippet = modified_content[start:start+100].replace('\n', ' ')
                print(f"   📍 Found at position {start}-{end} ({end-start} chars)")
                print(f"      Snippet: {old_snippet}...")
                
                # Generate new JavaScript
                new_js = self.generate_condition_js(condition_id, condition_data)
                
                # Test the replacement
                results['test_matches'].append({
                    'id': condition_id,
                    'start': start,
                    'end': end,
                    'old_size': end - start,
                    'new_size': len(new_js)
                })
                
                # Replace in content
                modified_content = modified_content[:start] + new_js + modified_content[end:]
                
                print(f"   ✅ REPLACED (old: {end-start} bytes, new: {len(new_js)} bytes)")
                results['updated'].append(condition_id)
                
            except Exception as e:
                print(f"   ❌ ERROR: {str(e)}")
                results['errors'].append((condition_id, str(e)))
                # Don't modify content on error
                modified_content = original_content
                break
        
        # Write updated content if not dry run
        if not dry_run and results['updated'] and not results['errors']:
            # Create backup if requested
            if backup:
                backup_path = self.core_file.parent / f"{self.core_file.stem}_backup{self.core_file.suffix}"
                print(f"\n💾 Creating backup: {backup_path.name}")
                with open(backup_path, 'w', encoding='utf-8') as f:
                    f.write(original_content)
            
            print(f"\n💾 Writing updated file...")
            with open(self.core_file, 'w', encoding='utf-8') as f:
                f.write(modified_content)
            
            new_size = len(modified_content)
        else:
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
        
        if not dry_run and results['updated']:
            print(f"\n✨ Core file updated: {self.core_file}")
            if backup:
                print(f"💾 Backup saved: {backup_path}")
        elif dry_run:
            print(f"\n🔍 DRY RUN - No changes written")
        
        return results


def main():
    # File paths
    core_file = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\coreConditions.js"
    extracted_json = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\scripts\extracted_conditions.json"
    
    # Create merger and run with dry run first
    merger = ConditionMergerFixed(core_file, extracted_json)
    
    print("\n" + "="*70)
    print("STEP 1: DRY RUN TO TEST PATTERN MATCHING")
    print("="*70)
    
    results = merger.merge_conditions(backup=False, dry_run=True)
    
    if results['updated'] and not results['errors']:
        print("\n\n" + "="*70)
        print("STEP 2: ACTUAL MERGE")
        print("="*70)
        
        input("\nPress ENTER to proceed with actual merge (or Ctrl+C to cancel)...")
        
        results = merger.merge_conditions(backup=True, dry_run=False)
    else:
        print("\n⚠️  Issues found in dry run. Please fix before proceeding.")
    
    print("\n" + "="*70)


if __name__ == "__main__":
    main()

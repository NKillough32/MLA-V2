#!/usr/bin/env python3
"""
Core Conditions Content Generator

This script processes the core_conditions.csv file and generates comprehensive 
medical content for each condition using OpenAI API.

Usage:
    python condition_processor.py --api-key YOUR_OPENAI_API_KEY
"""

import pandas as pd
import json
import os
import re
import argparse
import time
from pathlib import Path
from typing import Dict, List, Set
from openai import OpenAI
from datetime import datetime

class ConditionProcessor:
    def __init__(self, api_key: str, csv_path: str, output_dir: str):
        self.api_key = api_key
        self.csv_path = csv_path
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        
        # Initialize OpenAI client
        self.client = OpenAI(api_key=api_key)
        
        # Content structure template
        self.condition_template = {
            "id": "",
            "name": "",
            "domains": [],
            "lastUpdated": "",
            "content": {
                "overview": {
                    "definition": "",
                    "epidemiology": "",
                    "pathophysiology": ""
                },
                "recognition": {
                    "keySymptoms": [],
                    "keySigns": [],
                    "atypicalPresentations": [],
                    "redFlags": []
                },
                "investigation": {
                    "firstLine": [],
                    "secondLine": [],
                    "specialistTests": []
                },
                "diagnosis": {
                    "criteria": "",
                    "differentials": []
                },
                "management": {
                    "acute": {
                        "firstLine": [],
                        "secondLine": [],
                        "procedures": []
                    },
                    "chronic": {
                        "firstLine": [],
                        "secondLine": [],
                        "monitoring": []
                    },
                    "drugs": [],
                    "procedures": []
                },
                "prognosis": "",
                "complications": [],
                "foundationDoctorRole": "",
                "escalation": "",
                "keySafetyConsiderations": ""
            }
        }
    
    def load_and_clean_data(self) -> pd.DataFrame:
        """Load CSV and clean data"""
        print("Loading and cleaning CSV data...")
        
        # Try different encodings
        encodings = ['latin-1', 'utf-8', 'cp1252', 'utf-16']
        df = None
        
        for encoding in encodings:
            try:
                df = pd.read_csv(self.csv_path, encoding=encoding)
                print(f"Successfully loaded with {encoding} encoding")
                break
            except Exception as e:
                continue
        
        if df is None:
            raise ValueError("Could not read CSV file with any encoding")
        
        # Clean column names
        df.columns = [col.strip().replace('ÿ', '').replace('�', '') for col in df.columns]
        
        # Clean data
        df['Domain'] = df['Domain'].str.strip().replace('ÿ', '').replace('�', '')
        df['Core Conditions'] = df['Core Conditions'].str.strip().replace('ÿ', '').replace('�', '')
        
        # Remove empty rows
        df = df.dropna()
        df = df[df['Domain'].str.len() > 0]
        df = df[df['Core Conditions'].str.len() > 0]
        
        print(f"Cleaned data: {len(df)} rows, {len(df['Core Conditions'].unique())} unique conditions")
        return df
    
    def group_conditions(self, df: pd.DataFrame) -> Dict[str, List[str]]:
        """Group conditions by name, collecting all domains"""
        conditions = {}
        
        for _, row in df.iterrows():
            condition = row['Core Conditions']
            domain = row['Domain']
            
            if condition not in conditions:
                conditions[condition] = []
            
            if domain not in conditions[condition]:
                conditions[condition].append(domain)
        
        return conditions
    
    def create_condition_id(self, condition_name: str) -> str:
        """Create a clean ID from condition name"""
        # Remove special characters and convert to snake_case
        clean_name = re.sub(r'[^\w\s-]', '', condition_name)
        clean_name = re.sub(r'[-\s]+', '_', clean_name)
        return clean_name.lower()
    
    def generate_openai_prompt(self, condition_name: str, domains: List[str]) -> str:
        """Generate comprehensive prompt for OpenAI"""
        domains_text = ", ".join(domains)
        
        return f"""
You are an expert medical educator creating comprehensive content for Foundation Year doctors about "{condition_name}".

This condition appears in the following medical domains: {domains_text}

Create detailed, practical content that enables Foundation doctors to recognize, investigate, diagnose and participate in management with high confidence. Focus on Foundation-level practice.

Structure your response as a comprehensive medical reference covering:

1. OVERVIEW:
- Clear definition and key concepts
- Epidemiology (prevalence, demographics)
- Essential pathophysiology (mechanism, not excessive detail)

2. RECOGNITION:
- Key symptoms (what patients report)
- Key signs (what you find on examination)
- Atypical presentations (elderly, immunocompromised, etc.)
- Red flags requiring immediate action

3. INVESTIGATION:
- First-line investigations (bedside, basic bloods, imaging)
- Second-line investigations (when first-line insufficient)
- Specialist tests (when to refer)

4. DIAGNOSIS:
- Diagnostic criteria or clinical decision rules
- Key differential diagnoses to exclude

5. MANAGEMENT:
- Acute management (emergency/immediate care)
  - First-line treatments
  - Second-line treatments
  - Emergency procedures
- Chronic management (ongoing care)
  - First-line treatments
  - Second-line treatments
  - Monitoring requirements

6. DRUGS & PROCEDURES:
For each drug mentioned, explain:
- Mechanism of action (what it works on)
- Typical dosing range
- Key side effects/contraindications
- When to use vs alternatives

For each procedure mentioned, explain:
- What it involves (concise description)
- Indications
- Key risks/complications

7. PROGNOSIS & COMPLICATIONS:
- Expected outcomes
- Important complications to watch for

8. FOUNDATION DOCTOR ROLE:
- Specific responsibilities and limitations
- When to escalate to senior/specialist
- Key safety considerations

Write in clear, practical language suitable for Foundation doctors. Be specific about doses, timeframes, and decision points. Focus on actionable information.
"""

    def call_openai_api(self, prompt: str, max_retries: int = 3) -> str:
        """Call OpenAI API with retry logic"""
        for attempt in range(max_retries):
            try:
                response = self.client.chat.completions.create(
                    model="gpt-4.1",
                    messages=[{
                        "role": "system", 
                        "content": "You are an expert medical educator specializing in Foundation Year doctor training. Provide comprehensive, practical medical education content."
                    }, {
                        "role": "user", 
                        "content": prompt
                    }],
                    max_tokens=4000,
                    temperature=0.1
                )
                return response.choices[0].message.content
            
            except Exception as e:
                print(f"API call attempt {attempt + 1} failed: {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
                else:
                    raise e
    
    def parse_openai_response(self, response_text: str, condition_name: str, domains: List[str]) -> Dict:
        """Parse OpenAI response into structured format"""
        import re
        
        # Create base structure
        condition_data = self.condition_template.copy()
        condition_data["id"] = self.create_condition_id(condition_name)
        condition_data["name"] = condition_name
        condition_data["domains"] = domains
        condition_data["lastUpdated"] = datetime.now().isoformat()
        
        # Store raw content for backup
        condition_data["content"]["rawContent"] = response_text
        
        try:
            # Parse overview section
            definition_match = re.search(r'### Definition and Key Concepts\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if definition_match:
                condition_data["content"]["overview"]["definition"] = definition_match.group(1).strip()
            
            epidemiology_match = re.search(r'### Epidemiology\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if epidemiology_match:
                condition_data["content"]["overview"]["epidemiology"] = epidemiology_match.group(1).strip()
            
            pathophysiology_match = re.search(r'### Essential Pathophysiology\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if pathophysiology_match:
                condition_data["content"]["overview"]["pathophysiology"] = pathophysiology_match.group(1).strip()
            
            # Parse recognition section
            symptoms_match = re.search(r'### Key Symptoms\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if symptoms_match:
                symptoms_text = symptoms_match.group(1).strip()
                condition_data["content"]["recognition"]["keySymptoms"] = [
                    line.strip('- ').strip() for line in symptoms_text.split('\n') 
                    if line.strip() and line.strip().startswith('-')
                ]
            
            signs_match = re.search(r'### Key Signs\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if signs_match:
                signs_text = signs_match.group(1).strip()
                condition_data["content"]["recognition"]["keySigns"] = [
                    line.strip('- ').strip() for line in signs_text.split('\n') 
                    if line.strip() and line.strip().startswith('-')
                ]
            
            atypical_match = re.search(r'### Atypical Presentations\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if atypical_match:
                atypical_text = atypical_match.group(1).strip()
                condition_data["content"]["recognition"]["atypicalPresentations"] = [
                    line.strip('- ').strip() for line in atypical_text.split('\n') 
                    if line.strip() and (line.strip().startswith('-') or line.strip().startswith('**'))
                ]
            
            red_flags_match = re.search(r'### Red Flags Requiring Immediate Action\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if red_flags_match:
                red_flags_text = red_flags_match.group(1).strip()
                condition_data["content"]["recognition"]["redFlags"] = [
                    line.strip('- ').strip() for line in red_flags_text.split('\n') 
                    if line.strip() and line.strip().startswith('-')
                ]
            
            # Parse investigation section  
            first_line_match = re.search(r'### First-[Ll]ine Investigations\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if first_line_match:
                first_line_text = first_line_match.group(1).strip()
                investigations = []
                for line in first_line_text.split('\n'):
                    line = line.strip()
                    if line and (line.startswith('-') or line.startswith('•')):
                        # Handle both simple and complex bullet points
                        clean_line = line.strip('- •').strip()
                        investigations.append(clean_line)
                condition_data["content"]["investigation"]["firstLine"] = investigations
            
            second_line_match = re.search(r'### Second-[Ll]ine Investigations\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if second_line_match:
                second_line_text = second_line_match.group(1).strip()
                investigations = []
                for line in second_line_text.split('\n'):
                    line = line.strip()
                    if line and (line.startswith('-') or line.startswith('•')):
                        clean_line = line.strip('- •').strip()
                        investigations.append(clean_line)
                condition_data["content"]["investigation"]["secondLine"] = investigations
            
            specialist_tests_match = re.search(r'### Specialist Tests\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if specialist_tests_match:
                specialist_text = specialist_tests_match.group(1).strip()
                tests = []
                for line in specialist_text.split('\n'):
                    line = line.strip()
                    if line and (line.startswith('-') or line.startswith('•')):
                        clean_line = line.strip('- •').strip()
                        tests.append(clean_line)
                condition_data["content"]["investigation"]["specialistTests"] = tests
            
            # Parse diagnosis section
            criteria_match = re.search(r'### Diagnostic Criteria or Clinical Decision Rules\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if criteria_match:
                condition_data["content"]["diagnosis"]["criteria"] = criteria_match.group(1).strip()
            
            # Parse differentials
            differentials_match = re.search(r'### Key Differential Diagnoses to Exclude\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if differentials_match:
                differentials_text = differentials_match.group(1).strip()
                differentials = []
                for line in differentials_text.split('\n'):
                    line = line.strip()
                    if line and (line.startswith('-') or line.startswith('•')):
                        clean_line = line.strip('- •').strip()
                        differentials.append(clean_line)
                condition_data["content"]["diagnosis"]["differentials"] = differentials
            
            # Parse drugs section
            drugs = []
            drug_sections = re.findall(r'#### ([^\n]+)\n- \*\*Mechanism of Action\*\*: ([^\n]+)\n- \*\*Typical Dosing Range\*\*: ([^\n]+)\n- \*\*Key Side Effects/Contraindications\*\*: ([^\n]+)\n- \*\*When to Use vs Alternatives\*\*: ([^\n]+)', response_text)
            
            for drug_name, mechanism, dosing, side_effects, usage in drug_sections:
                drugs.append({
                    "name": drug_name.strip(),
                    "mechanism": mechanism.strip(),
                    "dosing": dosing.strip(),
                    "sideEffects": side_effects.strip(),
                    "usage": usage.strip()
                })
            
            condition_data["content"]["management"]["drugs"] = drugs
            
            # Parse management sections
            acute_first_line_match = re.search(r'#### First-line Treatments\n(.*?)(?=\n####|\n###|\n##|$)', response_text, re.DOTALL)
            if acute_first_line_match:
                acute_text = acute_first_line_match.group(1).strip()
                treatments = []
                for line in acute_text.split('\n'):
                    line = line.strip()
                    if line and (line.startswith('-') or line.startswith('•') or line.startswith('**')):
                        clean_line = line.strip('- •').strip()
                        treatments.append(clean_line)
                condition_data["content"]["management"]["acute"]["firstLine"] = treatments
            
            acute_second_line_match = re.search(r'#### Second-line Treatments\n(.*?)(?=\n####|\n###|\n##|$)', response_text, re.DOTALL)
            if acute_second_line_match:
                acute_text = acute_second_line_match.group(1).strip()
                treatments = []
                for line in acute_text.split('\n'):
                    line = line.strip()
                    if line and (line.startswith('-') or line.startswith('•') or line.startswith('**')):
                        clean_line = line.strip('- •').strip()
                        treatments.append(clean_line)
                condition_data["content"]["management"]["acute"]["secondLine"] = treatments
            
            # Parse procedures from management section
            procedures_in_mgmt = []
            procedure_matches = re.findall(r'#### ([^#\n]+)\n- \*\*What It Involves\*\*: ([^\n]+)\n- \*\*Indications\*\*: ([^\n]+)\n- \*\*Key Risks/Complications\*\*: ([^\n]+)', response_text)
            
            for proc_name, description, indications, risks in procedure_matches:
                procedures_in_mgmt.append({
                    "name": proc_name.strip(),
                    "description": description.strip(),
                    "indications": indications.strip(),
                    "risks": risks.strip()
                })
            
            condition_data["content"]["management"]["procedures"] = procedures_in_mgmt
            
            # Parse acute procedures
            acute_procedures = []
            emergency_proc_match = re.search(r'#### Emergency Procedures\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if emergency_proc_match:
                proc_text = emergency_proc_match.group(1).strip()
                for line in proc_text.split('\n'):
                    line = line.strip()
                    if line and (line.startswith('-') or line.startswith('•')):
                        clean_line = line.strip('- •').strip()
                        acute_procedures.append(clean_line)
            condition_data["content"]["management"]["acute"]["procedures"] = acute_procedures
            
            # Parse chronic management sections
            chronic_first_match = re.search(r'### Chronic Management.*?#### First-line Treatments\n(.*?)(?=\n####|\n###|\n##|$)', response_text, re.DOTALL)
            if chronic_first_match:
                chronic_text = chronic_first_match.group(1).strip()
                treatments = []
                for line in chronic_text.split('\n'):
                    line = line.strip()
                    if line and (line.startswith('-') or line.startswith('•')):
                        clean_line = line.strip('- •').strip()
                        treatments.append(clean_line)
                condition_data["content"]["management"]["chronic"]["firstLine"] = treatments
            
            chronic_second_match = re.search(r'### Chronic Management.*?#### Second-line Treatments\n(.*?)(?=\n####|\n###|\n##|$)', response_text, re.DOTALL)
            if chronic_second_match:
                chronic_text = chronic_second_match.group(1).strip()
                treatments = []
                for line in chronic_text.split('\n'):
                    line = line.strip()
                    if line and (line.startswith('-') or line.startswith('•')):
                        clean_line = line.strip('- •').strip()
                        treatments.append(clean_line)
                condition_data["content"]["management"]["chronic"]["secondLine"] = treatments
            
            # Parse monitoring requirements
            monitoring_match = re.search(r'#### Monitoring Requirements\n(.*?)(?=\n####|\n###|\n##|$)', response_text, re.DOTALL)
            if monitoring_match:
                monitoring_text = monitoring_match.group(1).strip()
                monitoring = []
                for line in monitoring_text.split('\n'):
                    line = line.strip()
                    if line and (line.startswith('-') or line.startswith('•')):
                        clean_line = line.strip('- •').strip()
                        monitoring.append(clean_line)
                condition_data["content"]["management"]["chronic"]["monitoring"] = monitoring
            
            # Parse Foundation doctor role
            foundation_role_match = re.search(r'### Specific Responsibilities and Limitations\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if foundation_role_match:
                condition_data["content"]["foundationDoctorRole"] = foundation_role_match.group(1).strip()
            
            escalation_match = re.search(r'### When to Escalate to Senior/Specialist\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if escalation_match:
                condition_data["content"]["escalation"] = escalation_match.group(1).strip()
            
            # Parse key safety considerations 
            safety_match = re.search(r'### Key Safety Considerations\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if safety_match:
                condition_data["content"]["keySafetyConsiderations"] = safety_match.group(1).strip()
            
            # Parse prognosis
            prognosis_match = re.search(r'### Expected Outcomes\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if prognosis_match:
                condition_data["content"]["prognosis"] = prognosis_match.group(1).strip()
            
            # Parse complications
            complications_match = re.search(r'### Important Complications to Watch For\n(.*?)(?=\n###|\n##|$)', response_text, re.DOTALL)
            if complications_match:
                complications_text = complications_match.group(1).strip()
                condition_data["content"]["complications"] = [
                    line.strip('- ').strip() for line in complications_text.split('\n') 
                    if line.strip() and line.strip().startswith('-')
                ]
            
        except Exception as e:
            print(f"Warning: Error parsing structured content for {condition_name}: {e}")
            print("Falling back to raw content only")
        
        # Clean up any remaining markdown formatting in text fields
        def clean_text(text):
            if isinstance(text, str):
                # Remove excessive asterisks but preserve important formatting
                text = re.sub(r'\*\*([^*]+)\*\*:', r'\1:', text)  # **Drug**: -> Drug:
                return text.strip()
            return text
        
        # Apply cleaning to key text fields
        if condition_data["content"]["foundationDoctorRole"]:
            condition_data["content"]["foundationDoctorRole"] = clean_text(condition_data["content"]["foundationDoctorRole"])
        if condition_data["content"]["escalation"]:
            condition_data["content"]["escalation"] = clean_text(condition_data["content"]["escalation"])
        if condition_data["content"]["keySafetyConsiderations"]:
            condition_data["content"]["keySafetyConsiderations"] = clean_text(condition_data["content"]["keySafetyConsiderations"])
            
        return condition_data
    
    def save_condition(self, condition_data: Dict) -> None:
        """Save condition data to JSON file"""
        filename = f"{condition_data['id']}.json"
        filepath = self.output_dir / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(condition_data, f, indent=2, ensure_ascii=False)
        
        print(f"Saved: {condition_data['name']} -> {filename}")
    
    def generate_index(self, conditions: Dict[str, List[str]]) -> None:
        """Generate an index of all conditions"""
        index_data = {
            "generatedAt": datetime.now().isoformat(),
            "totalConditions": len(conditions),
            "conditions": []
        }
        
        for condition_name, domains in conditions.items():
            condition_id = self.create_condition_id(condition_name)
            index_data["conditions"].append({
                "id": condition_id,
                "name": condition_name,
                "domains": domains,
                "filename": f"{condition_id}.json"
            })
        
        # Sort by name
        index_data["conditions"].sort(key=lambda x: x["name"])
        
        # Save index
        with open(self.output_dir / "index.json", 'w', encoding='utf-8') as f:
            json.dump(index_data, f, indent=2, ensure_ascii=False)
        
        # Generate JavaScript export
        js_content = f"""
// Auto-generated Core Conditions Index
// Generated: {datetime.now().isoformat()}

const coreConditionsIndex = {json.dumps(index_data, indent=2)};

// Export for ES6 modules
export {{ coreConditionsIndex }};

// Export for CommonJS
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {{ coreConditionsIndex }};
}}

// Global export for browser
if (typeof window !== 'undefined') {{
    window.coreConditionsIndex = coreConditionsIndex;
}}
"""
        
        with open(self.output_dir / "index.js", 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"Generated index files with {len(conditions)} conditions")
    
    def process_all_conditions(self, limit: int = None) -> None:
        """Process all conditions from CSV"""
        # Load and clean data
        df = self.load_and_clean_data()
        
        # Group conditions
        conditions = self.group_conditions(df)
        
        print(f"Found {len(conditions)} unique conditions")
        if limit:
            conditions = dict(list(conditions.items())[:limit])
            print(f"Processing first {limit} conditions for testing")
        
        # Generate index first
        self.generate_index(conditions)
        
        # Process each condition
        for i, (condition_name, domains) in enumerate(conditions.items(), 1):
            print(f"\nProcessing {i}/{len(conditions)}: {condition_name}")
            print(f"Domains: {', '.join(domains)}")
            
            try:
                # Generate prompt
                prompt = self.generate_openai_prompt(condition_name, domains)
                
                # Call OpenAI API
                print("Calling OpenAI API...")
                response = self.call_openai_api(prompt)
                
                # Parse and structure response
                condition_data = self.parse_openai_response(response, condition_name, domains)
                
                # Save to file
                self.save_condition(condition_data)
                
                # Add delay to respect rate limits
                time.sleep(1)
                
            except Exception as e:
                print(f"Error processing {condition_name}: {str(e)}")
                continue
        
        print(f"\nCompleted processing {len(conditions)} conditions")
        print(f"Output directory: {self.output_dir}")

def main():
    parser = argparse.ArgumentParser(description='Generate core conditions content using OpenAI')
    parser.add_argument('--api-key', required=True, help='OpenAI API key')
    parser.add_argument('--csv-path', default='../static/coreconditions/core_conditions.csv', help='Path to CSV file')
    parser.add_argument('--output-dir', default='../static/coreconditions/generated', help='Output directory')
    parser.add_argument('--limit', type=int, help='Limit number of conditions (for testing)')
    
    args = parser.parse_args()
    
    processor = ConditionProcessor(
        api_key=args.api_key,
        csv_path=args.csv_path,
        output_dir=args.output_dir
    )
    
    processor.process_all_conditions(limit=args.limit)

if __name__ == "__main__":
    main()
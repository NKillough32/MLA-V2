#!/usr/bin/env python3
"""
Enhanced Condition Processor with progress tracking, resume capability, and robust error handling
"""

import argparse
import json
import os
import re
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
import pandas as pd
from openai import OpenAI
try:
    from jsonschema import validate, ValidationError
    HAS_JSONSCHEMA = True
except ImportError:
    HAS_JSONSCHEMA = False
    print("Warning: jsonschema not installed. Install with: pip install jsonschema")

class EnhancedConditionProcessor:
    def __init__(self, api_key: str, csv_path: str = "../static/coreconditions/core_conditions.csv", 
                 output_dir: str = "../static/coreconditions/generated", model: str = "gpt-4o-mini",
                 chunk_size: int = 50):
        self.client = OpenAI(api_key=api_key)
        self.csv_path = Path(csv_path)
        self.output_dir = Path(output_dir)
        self.model = model
        self.chunk_size = chunk_size
        
        # Progress tracking
        self.progress_file = self.output_dir / "processing_progress.json"
        self.error_log_file = self.output_dir / "processing_errors.log"
        
        # Create output directory
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Initialize progress tracking
        self.progress = self.load_progress()
        
        print(f"Enhanced Condition Processor initialized")
        print(f"Model: {model}")
        print(f"Output directory: {output_dir}")
        print(f"Chunk size: {chunk_size}")
        if self.progress.get('processed_count', 0) > 0:
            print(f"Found existing progress: {self.progress['processed_count']} conditions already processed")
    
    def load_progress(self) -> Dict:
        """Load existing progress or create new progress tracking"""
        if self.progress_file.exists():
            try:
                with open(self.progress_file, 'r', encoding='utf-8') as f:
                    progress = json.load(f)
                    print(f"Loaded existing progress: {progress.get('processed_count', 0)} conditions completed")
                    return progress
            except Exception as e:
                print(f"Warning: Could not load progress file: {e}")
        
        return {
            "started_at": datetime.now().isoformat(),
            "processed_count": 0,
            "total_conditions": 0,
            "processed_conditions": [],
            "failed_conditions": [],
            "estimated_cost": 0.0,
            "actual_cost": 0.0
        }
    
    def save_progress(self) -> None:
        """Save current progress"""
        self.progress["last_updated"] = datetime.now().isoformat()
        try:
            with open(self.progress_file, 'w', encoding='utf-8') as f:
                json.dump(self.progress, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Warning: Could not save progress: {e}")
    
    def log_error(self, condition_name: str, error: str) -> None:
        """Log processing errors"""
        timestamp = datetime.now().isoformat()
        error_entry = f"[{timestamp}] {condition_name}: {error}\n"
        try:
            with open(self.error_log_file, 'a', encoding='utf-8') as f:
                f.write(error_entry)
        except Exception as e:
            print(f"Warning: Could not log error: {e}")
    
    def estimate_cost(self, conditions_count: int) -> Dict[str, float]:
        """Estimate processing costs"""
        # Average tokens per condition (based on testing)
        avg_input_tokens = 800  # Prompt + condition info
        avg_output_tokens = 2000  # Generated content
        
        costs = {}
        
        if self.model == "gpt-4o-mini":
            input_cost = (avg_input_tokens * conditions_count) * (0.15 / 1_000_000)
            output_cost = (avg_output_tokens * conditions_count) * (0.60 / 1_000_000)
            costs["gpt-4o-mini"] = input_cost + output_cost
        
        elif self.model == "gpt-4":
            input_cost = (avg_input_tokens * conditions_count) * (2.00 / 1_000_000)  
            output_cost = (avg_output_tokens * conditions_count) * (8.00 / 1_000_000)
            costs["gpt-4"] = input_cost + output_cost
        
        return costs
    
    def get_default_structure(self) -> Dict:
        """Get the default JSON structure for conditions"""
        return {
            "id": "",
            "name": "",
            "domains": [],
            "generatedAt": datetime.now().isoformat(),
            "model": self.model,
            "rawContent": "",
            "content": {
                "overview": {
                    "definition": "",
                    "epidemiology": "",
                    "pathophysiology": ""
                },
                "recognition": {
                    "symptoms": [],
                    "signs": [],
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
        
        # Clean data - more aggressive cleaning
        df['Domain'] = df['Domain'].astype(str).str.strip().str.replace('ÿ', '').str.replace('�', '').str.replace('\x00', '')
        df['Core Conditions'] = df['Core Conditions'].astype(str).str.strip().str.replace('ÿ', '').str.replace('�', '').str.replace('\x00', '')
        
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
    
    def is_already_processed(self, condition_name: str) -> bool:
        """Check if condition has already been processed"""
        return condition_name in self.progress.get('processed_conditions', [])
    
    def condition_file_exists(self, condition_id: str) -> bool:
        """Check if condition file already exists and is valid"""
        file_path = self.output_dir / f"{condition_id}.json"
        if file_path.exists():
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    # Basic validation
                    return 'content' in data and 'name' in data
            except:
                return False
        return False
    
    def get_json_schema(self) -> Dict:
        """Define the JSON schema for structured outputs"""
        return {
            "name": "condition_content",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "overview": {
                        "type": "object",
                        "properties": {
                            "definition": {"type": "string"},
                            "epidemiology": {"type": "string"},
                            "pathophysiology": {"type": "string"}
                        },
                        "required": ["definition", "epidemiology", "pathophysiology"],
                        "additionalProperties": False
                    },
                    "recognition": {
                        "type": "object",
                        "properties": {
                            "symptoms": {"type": "array", "items": {"type": "string"}},
                            "signs": {"type": "array", "items": {"type": "string"}},
                            "atypicalPresentations": {"type": "array", "items": {"type": "string"}},
                            "redFlags": {"type": "array", "items": {"type": "string"}}
                        },
                        "required": ["symptoms", "signs", "atypicalPresentations", "redFlags"],
                        "additionalProperties": False
                    },
                    "investigation": {
                        "type": "object",
                        "properties": {
                            "firstLine": {"type": "array", "items": {"type": "string"}},
                            "secondLine": {"type": "array", "items": {"type": "string"}},
                            "specialistTests": {"type": "array", "items": {"type": "string"}}
                        },
                        "required": ["firstLine", "secondLine", "specialistTests"],
                        "additionalProperties": False
                    },
                    "diagnosis": {
                        "type": "object",
                        "properties": {
                            "criteria": {"type": "string"},
                            "differentials": {"type": "array", "items": {"type": "string"}}
                        },
                        "required": ["criteria", "differentials"],
                        "additionalProperties": False
                    },
                    "management": {
                        "type": "object",
                        "properties": {
                            "acute": {
                                "type": "object",
                                "properties": {
                                    "firstLine": {"type": "array", "items": {"type": "string"}},
                                    "secondLine": {"type": "array", "items": {"type": "string"}},
                                    "procedures": {"type": "array", "items": {"type": "string"}}
                                },
                                "required": ["firstLine", "secondLine", "procedures"],
                                "additionalProperties": False
                            },
                            "chronic": {
                                "type": "object",
                                "properties": {
                                    "firstLine": {"type": "array", "items": {"type": "string"}},
                                    "secondLine": {"type": "array", "items": {"type": "string"}},
                                    "monitoring": {"type": "array", "items": {"type": "string"}}
                                },
                                "required": ["firstLine", "secondLine", "monitoring"],
                                "additionalProperties": False
                            },
                            "drugs": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "name": {"type": "string"},
                                        "mechanism": {"type": "string"},
                                        "dosing": {"type": "string"},
                                        "sideEffects": {"type": "string"},
                                        "notes": {"type": "string"}
                                    },
                                    "required": ["name", "mechanism", "dosing", "sideEffects", "notes"],
                                    "additionalProperties": False
                                }
                            },
                            "procedures": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "name": {"type": "string"},
                                        "description": {"type": "string"},
                                        "indications": {"type": "string"},
                                        "risks": {"type": "string"}
                                    },
                                    "required": ["name", "description", "indications", "risks"],
                                    "additionalProperties": False
                                }
                            }
                        },
                        "required": ["acute", "chronic", "drugs", "procedures"],
                        "additionalProperties": False
                    },
                    "prognosis": {"type": "string"},
                    "complications": {"type": "array", "items": {"type": "string"}},
                    "foundationDoctorRole": {"type": "string"},
                    "escalation": {"type": "string"},
                    "keySafetyConsiderations": {"type": "string"}
                },
                "required": [
                    "overview", "recognition", "investigation", "diagnosis", 
                    "management", "prognosis", "complications", 
                    "foundationDoctorRole", "escalation", "keySafetyConsiderations"
                ],
                "additionalProperties": False
            }
        }
    
    def validate_response_schema(self, response_json: Dict) -> bool:
        """Validate response against schema using jsonschema"""
        if not HAS_JSONSCHEMA:
            return True  # Skip validation if jsonschema not available
        
        try:
            schema = self.get_json_schema()["schema"]
            validate(instance=response_json, schema=schema)
            return True
        except ValidationError as e:
            print(f"Schema validation failed: {e.message}")
            return False
    
    def generate_openai_prompt(self, condition_name: str, domains: List[str]) -> str:
        """Generate comprehensive prompt for OpenAI with structured output instructions"""
        domains_text = ", ".join(domains)
        
        return f"""Create comprehensive medical education content for Foundation Year doctors about "{condition_name}".

Domains: {domains_text}

Provide detailed, practical information to help Foundation doctors recognize, investigate, diagnose and manage this condition with confidence.

Include:
- Clear definitions and essential pathophysiology
- Key symptoms, signs, atypical presentations, and red flags
- First-line, second-line, and specialist investigations  
- Diagnostic criteria and important differential diagnoses
- Acute and chronic management approaches
- Detailed drug information (mechanism, dosing, side effects, clinical notes)
- Detailed procedure information (description, indications, risks)
- Prognosis and complications
- Foundation doctor responsibilities and escalation criteria
- Critical safety considerations

Focus on practical Foundation-level knowledge."""
    
    def call_openai_api(self, prompt: str, max_retries: int = 3, is_repair_retry: bool = False) -> Dict:
        """Call OpenAI API with structured outputs"""
        for attempt in range(max_retries):
            try:
                # For repair retry, add explicit instruction
                system_message = "You are an expert medical educator focused on Foundation Year doctor training."
                if is_repair_retry:
                    system_message += " Output valid JSON matching the schema exactly. Return only valid JSON."
                
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": system_message},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=4000,
                    temperature=0,  # Set to 0 for maximum consistency
                    response_format={
                        "type": "json_schema",
                        "json_schema": self.get_json_schema()
                    }
                )
                
                # Parse the structured JSON response
                # Parse the structured JSON response
                content_json = json.loads(response.choices[0].message.content)
                
                # Track usage for cost estimation
                if hasattr(response, 'usage'):
                    input_tokens = response.usage.prompt_tokens
                    output_tokens = response.usage.completion_tokens
                    
                    # Estimate cost based on model
                    if self.model == "gpt-4o-mini":
                        cost = (input_tokens * 0.15 / 1_000_000) + (output_tokens * 0.60 / 1_000_000)
                    elif self.model == "gpt-4":
                        cost = (input_tokens * 2.00 / 1_000_000) + (output_tokens * 8.00 / 1_000_000)
                    else:
                        cost = 0.0
                    
                    self.progress['actual_cost'] += cost
                
                return content_json
                
            except Exception as e:
                print(f"API call attempt {attempt + 1} failed: {e}")
                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt  # Exponential backoff
                    print(f"Waiting {wait_time} seconds before retry...")
                    time.sleep(wait_time)
                else:
                    raise e
    
    def validate_generated_content(self, condition_data: Dict) -> bool:
        """Validate the generated content has essential components"""
        try:
            content = condition_data.get('content', {})
            
            # Check for essential structured sections
            essential_checks = [
                content.get('overview', {}).get('definition'),
                len(content.get('recognition', {}).get('symptoms', [])) > 0,
                content.get('foundationDoctorRole')
            ]
            
            # At least 2 out of 3 essential components should be present
            valid_components = sum(1 for check in essential_checks if check)
            return valid_components >= 2
            
        except:
            return False
    
    def generate_markdown_from_structure(self, content: Dict, condition_name: str) -> str:
        """Generate consistent markdown from structured data"""
        md = f"# {condition_name}: Comprehensive Reference for Foundation Year Doctors\n\n"
        
        # Overview
        md += "## 1. OVERVIEW\n\n"
        md += f"### Definition and Key Concepts\n{content['overview']['definition']}\n\n"
        md += f"### Epidemiology\n{content['overview']['epidemiology']}\n\n"
        md += f"### Essential Pathophysiology\n{content['overview']['pathophysiology']}\n\n"
        
        # Recognition
        md += "## 2. RECOGNITION\n\n"
        md += "### Key Symptoms\n"
        for symptom in content['recognition']['symptoms']:
            md += f"- {symptom}\n"
        md += "\n### Key Signs\n"
        for sign in content['recognition']['signs']:
            md += f"- {sign}\n"
        md += "\n### Atypical Presentations\n"
        for presentation in content['recognition']['atypicalPresentations']:
            md += f"- {presentation}\n"
        md += "\n### Red Flags Requiring Immediate Action\n"
        for flag in content['recognition']['redFlags']:
            md += f"- {flag}\n"
        md += "\n"
        
        # Investigation
        md += "## 3. INVESTIGATION\n\n"
        md += "### First-line Investigations\n"
        for inv in content['investigation']['firstLine']:
            md += f"- {inv}\n"
        md += "\n### Second-line Investigations\n"
        for inv in content['investigation']['secondLine']:
            md += f"- {inv}\n"
        md += "\n### Specialist Tests\n"
        for test in content['investigation']['specialistTests']:
            md += f"- {test}\n"
        md += "\n"
        
        # Diagnosis
        md += "## 4. DIAGNOSIS\n\n"
        md += f"### Diagnostic Criteria or Clinical Decision Rules\n{content['diagnosis']['criteria']}\n\n"
        md += "### Key Differential Diagnoses to Exclude\n"
        for diff in content['diagnosis']['differentials']:
            md += f"- {diff}\n"
        md += "\n"
        
        # Management
        md += "## 5. MANAGEMENT\n\n"
        md += "### Acute Management (Emergency/Immediate Care)\n\n"
        md += "#### First-line Treatments\n"
        for treatment in content['management']['acute']['firstLine']:
            md += f"- {treatment}\n"
        md += "\n#### Second-line Treatments\n"
        for treatment in content['management']['acute']['secondLine']:
            md += f"- {treatment}\n"
        md += "\n#### Emergency Procedures\n"
        for proc in content['management']['acute']['procedures']:
            md += f"- {proc}\n"
        md += "\n### Chronic Management (Ongoing Care)\n\n"
        md += "#### First-line Treatments\n"
        for treatment in content['management']['chronic']['firstLine']:
            md += f"- {treatment}\n"
        md += "\n#### Second-line Treatments\n"
        for treatment in content['management']['chronic']['secondLine']:
            md += f"- {treatment}\n"
        md += "\n#### Monitoring Requirements\n"
        for monitoring in content['management']['chronic']['monitoring']:
            md += f"- {monitoring}\n"
        md += "\n"
        
        # Drugs & Procedures
        md += "## 6. DRUGS & PROCEDURES\n\n"
        md += "### Drugs\n\n"
        for drug in content['management']['drugs']:
            md += f"#### {drug['name']}\n"
            md += f"- **Mechanism of Action**: {drug['mechanism']}\n"
            md += f"- **Typical Dosing Range**: {drug['dosing']}\n"
            md += f"- **Key Side Effects/Contraindications**: {drug['sideEffects']}\n"
            md += f"- **When to Use vs. Alternatives**: {drug['notes']}\n\n"
        
        md += "### Procedures\n\n"
        for proc in content['management']['procedures']:
            md += f"#### {proc['name']}\n"
            md += f"- **What it Involves**: {proc['description']}\n"
            md += f"- **Indications**: {proc['indications']}\n"
            md += f"- **Key Risks/Complications**: {proc['risks']}\n\n"
        
        # Prognosis & Complications
        md += "## 7. PROGNOSIS & COMPLICATIONS\n\n"
        md += f"### Expected Outcomes\n{content['prognosis']}\n\n"
        md += "### Important Complications to Watch For\n"
        for comp in content['complications']:
            md += f"- {comp}\n"
        md += "\n"
        
        # Foundation Doctor Role
        md += "## 8. FOUNDATION DOCTOR ROLE\n\n"
        md += f"### Specific Responsibilities and Limitations\n{content['foundationDoctorRole']}\n\n"
        md += f"### When to Escalate to Senior/Specialist\n{content['escalation']}\n\n"
        md += f"### Key Safety Considerations\n{content['keySafetyConsiderations']}\n"
        
        return md
    
    def parse_openai_response(self, structured_json: Dict, condition_name: str, domains: List[str]) -> Dict:
        """Create condition data from structured JSON response"""
        condition_data = self.get_default_structure()
        condition_data["id"] = self.create_condition_id(condition_name)
        condition_data["name"] = condition_name
        condition_data["domains"] = domains
        
        # Use the structured JSON directly as content
        condition_data["content"] = structured_json
        
        # Generate consistent markdown from structured data
        condition_data["rawContent"] = self.generate_markdown_from_structure(structured_json, condition_name)
        
        return condition_data
    
    def save_condition(self, condition_data: Dict) -> None:
        """Save condition data to JSON file"""
        filename = f"{condition_data['id']}.json"
        filepath = self.output_dir / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(condition_data, f, indent=2, ensure_ascii=False)
        
        print(f"Saved: {condition_data['name']} -> {filename}")
    
    def process_condition_batch(self, conditions_batch: Dict[str, List[str]], batch_num: int, total_batches: int) -> None:
        """Process a batch of conditions"""
        print(f"\n{'='*60}")
        print(f"Processing Batch {batch_num}/{total_batches}")
        print(f"Batch size: {len(conditions_batch)} conditions")
        print(f"{'='*60}")
        
        for i, (condition_name, domains) in enumerate(conditions_batch.items(), 1):
            print(f"\n[Batch {batch_num}] Processing {i}/{len(conditions_batch)}: {condition_name}")
            
            # Skip if already processed
            if self.is_already_processed(condition_name):
                print(f"Skipping {condition_name} - already processed")
                continue
            
            # Skip if file exists and is valid
            condition_id = self.create_condition_id(condition_name)
            if self.condition_file_exists(condition_id):
                print(f"Skipping {condition_name} - valid file already exists")
                self.progress['processed_conditions'].append(condition_name)
                self.progress['processed_count'] += 1
                continue
            
            try:
                # Generate prompt
                prompt = self.generate_openai_prompt(condition_name, domains)
                
                # Call OpenAI API
                print("Calling OpenAI API...")
                response = self.call_openai_api(prompt)
                
                # Validate response against schema
                if not self.validate_response_schema(response):
                    print("Schema validation failed. Attempting repair retry...")
                    response = self.call_openai_api(prompt, is_repair_retry=True)
                    if not self.validate_response_schema(response):
                        raise ValueError("Response failed schema validation even after repair retry")
                    print("Repair retry successful")
                
                # Parse and structure response
                condition_data = self.parse_openai_response(response, condition_name, domains)
                
                # Validate content quality
                if not self.validate_generated_content(condition_data):
                    print(f"Warning: Generated content for {condition_name} may be incomplete")
                
                # Save to file
                self.save_condition(condition_data)
                
                # Update progress
                self.progress['processed_conditions'].append(condition_name)
                self.progress['processed_count'] += 1
                self.save_progress()
                
                # Rate limiting delay
                time.sleep(1)
                
                print(f"✓ Successfully processed {condition_name}")
                
            except Exception as e:
                error_msg = f"Error processing {condition_name}: {str(e)}"
                print(error_msg)
                self.log_error(condition_name, str(e))
                self.progress['failed_conditions'].append({
                    "name": condition_name,
                    "error": str(e),
                    "timestamp": datetime.now().isoformat()
                })
                self.save_progress()
                continue
        
        print(f"\nCompleted Batch {batch_num}/{total_batches}")
        print(f"Processed: {self.progress['processed_count']}/{self.progress['total_conditions']}")
        print(f"Failed: {len(self.progress.get('failed_conditions', []))}")
        print(f"Estimated cost so far: ${self.progress.get('actual_cost', 0):.4f}")
    
    def process_all_conditions(self, limit: int = None) -> None:
        """Process all conditions from CSV with chunking and progress tracking"""
        print("Starting enhanced batch processing...")
        
        # Load and clean data
        df = self.load_and_clean_data()
        conditions = self.group_conditions(df)
        
        # Apply limit if specified
        if limit:
            conditions = dict(list(conditions.items())[:limit])
            print(f"Limited to first {limit} conditions for testing")
        
        # Update total count
        self.progress['total_conditions'] = len(conditions)
        
        # Estimate costs
        costs = self.estimate_cost(len(conditions))
        print(f"\nCost estimation:")
        for model, cost in costs.items():
            print(f"  {model}: ${cost:.4f}")
        
        # Filter out already processed conditions
        remaining_conditions = {
            name: domains for name, domains in conditions.items()
            if not self.is_already_processed(name)
        }
        
        print(f"\nProcessing status:")
        print(f"Total conditions: {len(conditions)}")
        print(f"Already processed: {len(conditions) - len(remaining_conditions)}")
        print(f"Remaining to process: {len(remaining_conditions)}")
        
        if not remaining_conditions:
            print("All conditions already processed!")
            return
        
        # Split into chunks
        conditions_items = list(remaining_conditions.items())
        chunks = [dict(conditions_items[i:i + self.chunk_size]) 
                 for i in range(0, len(conditions_items), self.chunk_size)]
        
        print(f"Split into {len(chunks)} chunks of max {self.chunk_size} conditions each")
        
        # Process chunks
        try:
            for i, chunk in enumerate(chunks, 1):
                self.process_condition_batch(chunk, i, len(chunks))
                
                # Save progress after each chunk
                self.save_progress()
                
                # Brief pause between chunks
                if i < len(chunks):
                    print(f"Pausing 5 seconds before next chunk...")
                    time.sleep(5)
            
        except KeyboardInterrupt:
            print("\n\nProcessing interrupted by user")
            self.save_progress()
            print(f"Progress saved. You can resume later.")
            return
        
        # Final summary
        print(f"\n{'='*60}")
        print("FINAL PROCESSING SUMMARY")
        print(f"{'='*60}")
        print(f"Total conditions: {self.progress['total_conditions']}")
        print(f"Successfully processed: {self.progress['processed_count']}")
        print(f"Failed: {len(self.progress.get('failed_conditions', []))}")
        print(f"Total cost: ${self.progress.get('actual_cost', 0):.4f}")
        print(f"Output directory: {self.output_dir}")
        
        if self.progress.get('failed_conditions'):
            print(f"\nFailed conditions:")
            for failure in self.progress['failed_conditions']:
                print(f"  - {failure['name']}: {failure['error']}")
        
        # Generate final index
        self.generate_index(conditions)
    
    def generate_index(self, conditions: Dict[str, List[str]]) -> None:
        """Generate an index of all conditions"""
        index_data = {
            "generatedAt": datetime.now().isoformat(),
            "totalConditions": len(conditions),
            "processedCount": self.progress['processed_count'],
            "model": self.model,
            "conditions": []
        }
        
        for condition_name, domains in conditions.items():
            condition_id = self.create_condition_id(condition_name)
            index_data["conditions"].append({
                "id": condition_id,
                "name": condition_name,
                "domains": domains,
                "filename": f"{condition_id}.json",
                "processed": condition_name in self.progress.get('processed_conditions', [])
            })
        
        # Sort by name
        index_data["conditions"].sort(key=lambda x: x["name"])
        
        # Save index
        with open(self.output_dir / "index.json", 'w', encoding='utf-8') as f:
            json.dump(index_data, f, indent=2, ensure_ascii=False)
        
        print(f"Generated index with {len(conditions)} conditions")

def main():
    parser = argparse.ArgumentParser(description='Enhanced core conditions generator with progress tracking')
    parser.add_argument('--api-key', required=True, help='OpenAI API key')
    parser.add_argument('--csv-path', default='../static/coreconditions/core_conditions.csv', help='Path to CSV file')
    parser.add_argument('--output-dir', default='../static/coreconditions/generated', help='Output directory')
    parser.add_argument('--model', default='gpt-4o-mini', choices=['gpt-4o-mini', 'gpt-4'], help='OpenAI model to use')
    parser.add_argument('--limit', type=int, help='Limit number of conditions (for testing)')
    parser.add_argument('--chunk-size', type=int, default=50, help='Number of conditions to process per chunk')
    parser.add_argument('--resume', action='store_true', help='Resume from previous progress')
    
    args = parser.parse_args()
    
    processor = EnhancedConditionProcessor(
        api_key=args.api_key,
        csv_path=args.csv_path,
        output_dir=args.output_dir,
        model=args.model,
        chunk_size=args.chunk_size
    )
    
    if args.resume:
        print("Resuming from previous progress...")
    
    processor.process_all_conditions(limit=args.limit)

if __name__ == "__main__":
    main()
"""
Advanced PDF Parser for MBBS Core Conditions
Parses individual condition pages and extracts structured medical data
"""

import PyPDF2
import re
import json
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import sys


class ConditionParser:
    def __init__(self, pdf_path: str):
        self.pdf_path = Path(pdf_path)
        self.pdf_file = None
        self.reader = None
        self.condition_index = self._build_condition_index()
        
    def __enter__(self):
        self.open_pdf()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.pdf_file:
            self.pdf_file.close()
        return False
        
    def _build_condition_index(self) -> List[Dict]:
        """Build an index of conditions from the table of contents"""
        # Based on the sample, conditions are numbered and have page numbers
        return [
            # Anaesthesia and Critical Care
            {"id": "acute-pain-management", "name": "Acute Pain Management", "page": 22, "domain": "Anaesthesia and Critical Care"},
            {"id": "anaemia", "name": "Anaemia", "page": 26, "domain": "Anaesthesia and Critical Care"},
            {"id": "arrhythmias", "name": "Arrhythmias", "page": 30, "domain": "Anaesthesia and Critical Care"},
            {"id": "atrial-arrhythmias", "name": "Atrial Arrhythmias", "page": 35, "domain": "Anaesthesia and Critical Care"},
            {"id": "atrial-fibrillation", "name": "Atrial Fibrillation (AF)", "page": 40, "domain": "Anaesthesia and Critical Care"},
            {"id": "cardiogenic-shock", "name": "Cardiogenic Shock", "page": 44, "domain": "Anaesthesia and Critical Care"},
            {"id": "complete-heart-block", "name": "Complete Heart Block", "page": 48, "domain": "Anaesthesia and Critical Care"},
            {"id": "distributive-shock", "name": "Distributive Shock", "page": 52, "domain": "Anaesthesia and Critical Care"},
            # Add more as we process...
        ]
    
    def open_pdf(self):
        """Open the PDF for reading"""
        if self.reader is None:
            self.pdf_file = open(self.pdf_path, 'rb')
            self.reader = PyPDF2.PdfReader(self.pdf_file)
            print(f"PDF opened: {len(self.reader.pages)} pages")
    
    def extract_condition_text(self, start_page: int, num_pages: int = 5) -> str:
        """Extract text for a specific condition"""
        self.open_pdf()
        text = ""
        
        for i in range(num_pages):
            page_num = start_page + i
            if page_num < len(self.reader.pages):
                text += self.reader.pages[page_num].extract_text() + "\n\n"
        
        return text
    
    def parse_condition_text(self, text: str, condition_name: str) -> Dict:
        """Parse extracted text into structured condition data"""
        
        condition = {
            'name': condition_name,
            'synonyms': [],
            'recognition': {
                'typical': [],
                'atypical': [],
                'examination': [],
                'redFlags': []
            },
            'investigation': {
                'immediate': [],
                'further': [],
                'interpretation': []
            },
            'diagnosis': {
                'criteria': '',
                'differential': []
            },
            'management': {
                'firstLine': {
                    'immediate': [],
                    'ongoing': []
                },
                'secondLine': [],
                'complications': []
            },
            'clinicalPearls': [],
            'prognosis': ''
        }
        
        # Common section headers in medical texts
        sections = {
            'Definition': r'(?:Definition|Overview|Introduction)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)',
            'Presentation': r'(?:Clinical Presentation|Presentation|Symptoms|Signs and Symptoms)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)',
            'Pathophysiology': r'(?:Pathophysiology|Pathology|Mechanism)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)',
            'Examination': r'(?:Examination|Physical Examination|Clinical Examination|Findings)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)',
            'Investigations': r'(?:Investigations?|Tests|Diagnostic Tests|Workup)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)',
            'Management': r'(?:Management|Treatment|Therapy|Approach)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)',
            'Complications': r'(?:Complications|Adverse Outcomes)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)',
            'Prognosis': r'(?:Prognosis|Outcome|Long-term Outlook)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)',
            'Red Flags': r'(?:Red Flags|Emergency|Warning Signs|Danger Signs)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)',
            'Differential': r'(?:Differential Diagnosis|Differentials|DD)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)',
        }
        
        # Extract sections
        extracted_sections = {}
        for section_name, pattern in sections.items():
            match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
            if match:
                content = match.group(1).strip()
                # Split by bullet points or newlines
                bullets = self._extract_bullet_points(content)
                extracted_sections[section_name] = bullets
        
        # Map extracted sections to condition structure with quality filtering
        if 'Presentation' in extracted_sections:
            presentations = extracted_sections['Presentation']
            # Filter out investigation/management content that leaked in
            presentations = [p for p in presentations if not any(term in p.lower() for term in ['blood test', 'imaging', 'x-ray', 'ct scan', 'mri', 'echocardiogram', 'treatment', 'therapy', 'medication'])]
            condition['recognition']['typical'] = presentations[:6]
        
        if 'Examination' in extracted_sections:
            examinations = extracted_sections['Examination']
            # Filter out non-examination content
            examinations = [e for e in examinations if not any(term in e.lower() for term in ['summary', 'key points', 'definition'])]
            condition['recognition']['examination'] = examinations[:10]
        
        if 'Red Flags' in extracted_sections:
            condition['recognition']['redFlags'] = extracted_sections['Red Flags'][:8]
        
        if 'Investigations' in extracted_sections:
            inv = extracted_sections['Investigations']
            # Split into immediate and further based on keywords and position
            immediate_keywords = ['urgent', 'immediate', 'bedside', 'ecg', 'vital signs', 'blood pressure', 'oxygen', 'glucose', 'first-line', 'initial']
            immediate = [i for i in inv if any(word in i.lower() for word in immediate_keywords)]
            further = [i for i in inv if i not in immediate]
            
            # Ensure balanced distribution
            condition['investigation']['immediate'] = immediate[:5] if immediate else inv[:2]
            condition['investigation']['further'] = further[:8] if further else inv[2:10]
        
        if 'Management' in extracted_sections:
            mgmt = extracted_sections['Management']
            # Split into immediate and ongoing based on urgency keywords
            immediate_keywords = ['immediate', 'emergency', 'acute', 'urgent', 'first', 'stabilise', 'resuscitate', 'abc', 'airway', 'breathing', 'circulation']
            immediate = [m for m in mgmt if any(word in m.lower() for word in immediate_keywords)]
            ongoing = [m for m in mgmt if m not in immediate]
            
            # Limit to reasonable sizes
            condition['management']['firstLine']['immediate'] = immediate[:6] if immediate else mgmt[:3]
            condition['management']['firstLine']['ongoing'] = ongoing[:8] if ongoing else mgmt[3:11]
        
        if 'Complications' in extracted_sections:
            complications = extracted_sections['Complications']
            # Filter out summary statements
            complications = [c for c in complications if 'summary' not in c.lower() and 'key points' not in c.lower()]
            condition['management']['complications'] = complications[:8]
        
        if 'Differential' in extracted_sections:
            differentials = extracted_sections['Differential']
            condition['diagnosis']['differential'] = differentials[:10]
        
        if 'Prognosis' in extracted_sections:
            prognosis_items = extracted_sections['Prognosis']
            # Join but limit length
            prognosis_text = ' '.join(prognosis_items)
            if len(prognosis_text) > 500:
                prognosis_text = prognosis_text[:497] + '...'
            condition['prognosis'] = prognosis_text
        
        return condition
    
    def _extract_bullet_points(self, text: str) -> List[str]:
        """Extract bullet points from text - properly split and clean"""
        bullets = []
        
        # Remove page numbers and date artifacts first
        text = re.sub(r'\b\d{1,3}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\b', '', text, flags=re.IGNORECASE)
        text = re.sub(r'\s+\d{1,3}\s+(?=[A-Z])', ' ', text)  # Page numbers between sentences
        
        # Remove ALL section headers and numbering
        text = re.sub(r'\d+\.\s+[A-Z][^:]*:', ' ', text)
        text = re.sub(r'[a-d]\)\s+[^:]*:', ' ', text)
        
        # Split by sentence endings (period + capital letter or colon + capital)
        sentences = re.split(r'(?<=[.!?:])\s+(?=[A-Z])', text)
        
        # Filter and clean
        for sent in sentences:
            sent = sent.strip()
            
            # Skip sentences that are too short, too long, or are fragments
            if len(sent) < 40 or len(sent) > 500:
                continue
            
            # Skip if starts with number, or is just a header
            if re.match(r'^\d+\.', sent) or re.match(r'^[A-Z][a-z]+\s*:?$', sent):
                continue
            
            # Skip incomplete sentences lacking subject/verb
            if re.match(r'^(Often|Commonly|Typically|Usually|May be|Can be|Especially|Particularly)\s+[a-z]', sent):
                # Keep these as they often start valid medical statements
                pass
            elif sent.count(' ') < 3:  # Very short fragments
                continue
            
            bullets.append(sent)
        
        # If we didn't get good splits, try colon-based splitting
        if len(bullets) < 3 and ':' in text:
            parts = re.split(r'\s*:\s*', text)
            bullets = [p.strip() + '.' for p in parts if len(p.strip()) > 40]
        
        # Clean up all bullets
        bullets = [self._clean_bullet(b) for b in bullets]
        
        # Filter out artifacts and duplicates
        seen = set()
        unique_bullets = []
        for b in bullets:
            # Additional quality checks
            if not b or len(b) < 30:
                continue
            
            # Skip if it's mostly numbers or symbols
            letter_count = sum(c.isalpha() for c in b)
            if letter_count < len(b) * 0.6:
                continue
            
            # Skip if already seen
            if b in seen:
                continue
            
            seen.add(b)
            unique_bullets.append(b)
        
        return unique_bullets[:10]  # Limit to 10 items
    
    def _clean_bullet(self, text: str) -> str:
        """Clean a bullet point text and fix all formatting issues"""
        # Remove excessive whitespace first
        text = re.sub(r'\s+', ' ', text)
        
        # Remove page number artifacts
        text = re.sub(r'\s+\d{1,3}\s+(?=[A-Z])', ' ', text)
        text = re.sub(r'\s+\d{1,3}$', '', text)
        
        # Remove date artifacts
        text = re.sub(r'\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\b', '', text, flags=re.IGNORECASE)
        
        # Fix spacing before punctuation
        text = re.sub(r'\s+([,;:.])', r'\1', text)
        text = re.sub(r'([,:;])\s*(?=[A-Z])', r'\1 ', text)
        
        # Fix double/triple spaces
        text = re.sub(r'\s{2,}', ' ', text)
        
        # Fix missing first/last letters - comprehensive list
        fixes = {
            # Beginning of line - medical terms
            r'^Ng\s+opioids': 'Strong opioids',
            r'^Of\s+injury': 'Assessment of injury',
            r'^nset\b': 'Onset',
            r'^f\s+injury\b': 'Assessment of injury',
            r'^f\s+the\b': 'Examination of the',
            r'^n\s+a\b': 'On a',
            r'^n\s+the\b': 'On the',
            r'^ry\b': 'History',
            r'^re\s+\d': 'Score ',
            r'^ms\b': 'Symptoms',
            r'^st\s+common\b': 'Most common',
            r'^od\s+Count\b': 'Blood Count',
            r'^ed\s+cell': 'Red cell',
            r'^n\s+Deficiency\b': 'Iron Deficiency',
            r'^mmon\b': 'Common',
            r'^N\s+of\b': 'Definition of',
            r'^nitoring\b': 'Monitoring',
            r'^ecreased\b': 'Decreased',
            r'^levated\b': 'Elevated',
            # Context completers for incomplete starts
            r'^Decreased in': 'The level is decreased in',
            r'^Elevated in': 'The level is elevated in',
            r'^Low in': 'The level is low in',
            r'^High in': 'The level is high in',
            r'^May be caused': 'This condition may be caused',
            r'^Often due to': 'This is often due to',
            r'^Commonly due to': 'This is commonly due to',
            r'^Especially when': 'This occurs especially when',
            r'^Particularly in': 'This is particularly significant in',
            # Middle of text
            r'\bf\s+injury\b': 'of injury',
            r'\bf\s+the\b': 'of the',
            r'\bn\s+a\b': 'on a',
            r'\bn\s+the\b': 'on the',
        }
        
        for pattern, replacement in fixes.items():
            text = re.sub(pattern, replacement, text)
        
        # Remove section markers at start
        text = re.sub(r'^[a-d]\)\s+', '', text)
        text = re.sub(r'^\d+\.\s+', '', text)
        
        # Remove trailing artifacts
        text = text.strip(' .,;:-')
        
        # Ensure proper capitalization at start
        if text and len(text) > 0 and text[0].islower():
            text = text[0].upper() + text[1:]
        
        # Ensure proper ending
        if text and not text.endswith(('.', '!', '?', ':')):
            text += '.'
        
        return text
    
    def extract_all_conditions(self, output_file: str):
        """Extract all conditions and save to JSON"""
        print("Extracting all conditions from PDF...")
        print(f"Total conditions to process: {len(self.condition_index)}")
        
        all_conditions = {}
        
        for i, cond_info in enumerate(self.condition_index, 1):
            print(f"\nProcessing {i}/{len(self.condition_index)}: {cond_info['name']}")
            
            try:
                # Extract text for this condition
                text = self.extract_condition_text(cond_info['page'], num_pages=4)
                
                # Parse the text
                condition_data = self.parse_condition_text(text, cond_info['name'])
                condition_data['domain'] = cond_info['domain']
                
                # Store with ID
                all_conditions[cond_info['id']] = condition_data
                
                print(f"  ✓ Extracted: {len(condition_data['recognition']['typical'])} typical features")
                
            except Exception as e:
                print(f"  ✗ Error: {e}")
        
        # Save to JSON
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_conditions, f, indent=2, ensure_ascii=False)
        
        print(f"\nExtraction complete! Saved to: {output_file}")
        print(f"Total conditions extracted: {len(all_conditions)}")


def main():
    pdf_path = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\MBBS Core Conditions All.pdf"
    output_path = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\scripts\extracted_conditions.json"
    
    print("="*60)
    print("MBBS Core Conditions Advanced Parser")
    print("="*60)
    
    with ConditionParser(pdf_path) as parser:
        # Test with first condition
        print("\nTesting extraction with 'Atrial Fibrillation'...")
        test_text = parser.extract_condition_text(40, num_pages=4)  # AF is on page 40
        
        print("\nExtracted text sample (first 1000 chars):")
        print(test_text[:1000])
        print("\n" + "="*60)
        
        # Parse it
        print("\nParsing condition data...")
        parsed = parser.parse_condition_text(test_text, "Atrial Fibrillation")
        
        print("\nParsed data summary:")
        print(f"  Typical presentations: {len(parsed['recognition']['typical'])}")
        print(f"  Examination findings: {len(parsed['recognition']['examination'])}")
        print(f"  Investigations: {len(parsed['investigation']['immediate'])}")
        print(f"  Management steps: {len(parsed['management']['firstLine']['immediate'])}")
        
        # Show sample
        if parsed['recognition']['typical']:
            print("\nSample typical presentations:")
            for item in parsed['recognition']['typical'][:3]:
                print(f"  • {item}")
        
        # Uncomment to process all:
        # parser.extract_all_conditions(output_path)


if __name__ == "__main__":
    main()

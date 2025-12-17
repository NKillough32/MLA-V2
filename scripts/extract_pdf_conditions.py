"""
PDF Core Conditions Extractor
Extracts condition data from MBBS Core Conditions PDF and maps to JavaScript structure
"""

import PyPDF2
import re
import json
from pathlib import Path
from typing import Dict, List, Optional
import sys

class ConditionExtractor:
    def __init__(self, pdf_path: str):
        self.pdf_path = Path(pdf_path)
        self.conditions = {}
        self.current_condition = None
        
    def extract_text_from_pdf(self, start_page: int = 0, end_page: Optional[int] = None) -> str:
        """Extract text from PDF pages"""
        print(f"Opening PDF: {self.pdf_path}")
        
        try:
            with open(self.pdf_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                total_pages = len(reader.pages)
                print(f"Total pages: {total_pages}")
                
                if end_page is None or end_page > total_pages:
                    end_page = total_pages
                
                text = ""
                for page_num in range(start_page, min(end_page, total_pages)):
                    if page_num % 100 == 0:
                        print(f"Processing page {page_num}/{total_pages}...")
                    
                    page = reader.pages[page_num]
                    text += page.extract_text() + "\n\n"
                
                return text
        except Exception as e:
            print(f"Error reading PDF: {e}")
            return ""
    
    def extract_sample(self, num_pages: int = 10) -> str:
        """Extract a sample of pages for analysis"""
        return self.extract_text_from_pdf(0, num_pages)
    
    def identify_condition_boundaries(self, text: str) -> List[Dict]:
        """Identify where each condition starts and ends in the text"""
        # Common patterns for condition headers
        patterns = [
            r'\n([A-Z][A-Za-z\s\-\']+)\n',  # Title case headers
            r'\n\d+\.\s+([A-Z][A-Za-z\s\-\']+)\n',  # Numbered headers
            r'\n([A-Z\s]+)\n(?=[A-Z][a-z])',  # ALL CAPS followed by content
        ]
        
        boundaries = []
        for pattern in patterns:
            matches = re.finditer(pattern, text)
            for match in matches:
                boundaries.append({
                    'name': match.group(1).strip(),
                    'start': match.start(),
                    'end': match.end()
                })
        
        # Sort by position
        boundaries.sort(key=lambda x: x['start'])
        return boundaries
    
    def parse_condition_section(self, text: str) -> Dict:
        """Parse a single condition's text into structured data"""
        condition = {
            'name': '',
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
        
        # Extract sections using common headers
        sections = {
            'presentation': r'(?:Presentation|Clinical Features|Symptoms|Signs)[\s:]+(.+?)(?=\n[A-Z][a-z]+[\s:]|\Z)',
            'examination': r'(?:Examination|Physical Exam|Clinical Examination)[\s:]+(.+?)(?=\n[A-Z][a-z]+[\s:]|\Z)',
            'investigations': r'(?:Investigations?|Tests?|Diagnostic)[\s:]+(.+?)(?=\n[A-Z][a-z]+[\s:]|\Z)',
            'management': r'(?:Management|Treatment|Therapy)[\s:]+(.+?)(?=\n[A-Z][a-z]+[\s:]|\Z)',
            'differential': r'(?:Differential Diagnosis|Differentials)[\s:]+(.+?)(?=\n[A-Z][a-z]+[\s:]|\Z)',
            'prognosis': r'(?:Prognosis|Outlook)[\s:]+(.+?)(?=\n[A-Z][a-z]+[\s:]|\Z)',
        }
        
        for key, pattern in sections.items():
            match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
            if match:
                content = match.group(1).strip()
                # Split into bullet points
                bullets = [b.strip() for b in re.split(r'\n[-•●]\s*', content) if b.strip()]
                if not bullets:
                    bullets = [line.strip() for line in content.split('\n') if line.strip()]
                
                # Map to appropriate section
                if key == 'presentation':
                    condition['recognition']['typical'] = bullets[:3] if len(bullets) > 3 else bullets
                elif key == 'examination':
                    condition['recognition']['examination'] = bullets
                elif key == 'investigations':
                    condition['investigation']['immediate'] = bullets
                elif key == 'management':
                    condition['management']['firstLine']['immediate'] = bullets
                elif key == 'differential':
                    condition['diagnosis']['differential'] = bullets
                elif key == 'prognosis':
                    condition['prognosis'] = ' '.join(bullets)
        
        return condition
    
    def save_extracted_data(self, output_path: str):
        """Save extracted conditions to JSON file"""
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.conditions, f, indent=2, ensure_ascii=False)
        print(f"Saved extracted data to: {output_path}")
    
    def analyze_pdf_structure(self, sample_text: str):
        """Analyze the structure of the PDF to identify patterns"""
        print("\n=== PDF STRUCTURE ANALYSIS ===\n")
        print("First 3000 characters:")
        print(sample_text[:3000])
        print("\n" + "="*50)
        
        # Look for common patterns
        print("\nSearching for condition headers...")
        boundaries = self.identify_condition_boundaries(sample_text)
        print(f"Found {len(boundaries)} potential condition boundaries")
        if boundaries:
            print("\nFirst 10 boundaries:")
            for b in boundaries[:10]:
                print(f"  - {b['name']}")


def main():
    pdf_path = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\MBBS Core Conditions All.pdf"
    
    print("="*60)
    print("MBBS Core Conditions PDF Extractor")
    print("="*60)
    
    extractor = ConditionExtractor(pdf_path)
    
    # First, extract a sample to analyze structure
    print("\nStep 1: Extracting sample pages for structure analysis...")
    sample = extractor.extract_sample(10)
    
    print("\nStep 2: Analyzing PDF structure...")
    extractor.analyze_pdf_structure(sample)
    
    print("\n" + "="*60)
    print("Sample extraction complete!")
    print("Next steps:")
    print("1. Review the structure analysis above")
    print("2. Adjust parsing patterns if needed")
    print("3. Run full extraction")
    print("="*60)
    
    # Save sample for manual review
    sample_output = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\scripts\pdf_sample.txt"
    with open(sample_output, 'w', encoding='utf-8') as f:
        f.write(sample)
    print(f"\nSample text saved to: {sample_output}")


if __name__ == "__main__":
    main()

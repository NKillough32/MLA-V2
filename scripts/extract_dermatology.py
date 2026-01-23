"""
Extract dermatology content from PDF for web application
"""
import PyPDF2
import re
import json
from pathlib import Path

def extract_pdf_content(pdf_path):
    """Extract text and structure from PDF"""
    content = {
        'title': '',
        'sections': [],
        'total_pages': 0
    }
    
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            content['total_pages'] = len(pdf_reader.pages)
            
            full_text = []
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                full_text.append({
                    'page': page_num + 1,
                    'text': text
                })
            
            # Save raw extracted text
            output_path = Path(__file__).parent / 'dermatology_extracted.json'
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(full_text, f, indent=2, ensure_ascii=False)
            
            print(f"✓ Extracted {len(full_text)} pages")
            print(f"✓ Saved to {output_path}")
            
            # Print first few pages to see structure
            print("\n=== First Page Preview ===")
            if full_text:
                print(full_text[0]['text'][:500])
            
            return full_text
            
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return None

if __name__ == "__main__":
    pdf_path = Path(__file__).parent.parent / 'static' / 'assets' / 'dermatology' / 'Derm_Handbook_3rd-Edition-_Nov_2020.pdf'
    print(f"Extracting from: {pdf_path}")
    extract_pdf_content(pdf_path)

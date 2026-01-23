import PyPDF2
import json

def extract_all_text_with_structure(pdf_path):
    """Extract all text from PDF to manually identify captions"""
    
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        
        all_text = []
        for page_num, page in enumerate(reader.pages, 1):
            text = page.extract_text()
            all_text.append(f"\n=== PAGE {page_num} ===\n{text}")
        
        # Save to file for manual review
        with open('pdf_full_text.txt', 'w', encoding='utf-8') as f:
            f.write('\n'.join(all_text))
    
    print(f"Extracted text from {len(reader.pages)} pages")
    print("Saved to pdf_full_text.txt")
    print("\nSearching for known captions...")
    
    # Search for the captions we know
    full_text = '\n'.join(all_text)
    
    known_captions = [
        "Pigmented melanocytic naevus (mole)",
        "Open comedones",
        "closed comedones",
        "acne",
        "Sunburn"
    ]
    
    for caption in known_captions:
        if caption in full_text:
            # Find context around it
            idx = full_text.find(caption)
            context = full_text[max(0, idx-200):idx+200]
            print(f"\nFound: {caption}")
            print(f"Context: ...{context}...")

if __name__ == "__main__":
    pdf_path = "../static/assets/dermatology/Derm_Handbook_3rd-Edition-_Nov_2020.pdf"
    extract_all_text_with_structure(pdf_path)

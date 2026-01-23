import PyPDF2
import re
import json

def extract_image_captions(pdf_path):
    """Extract text from PDF to identify image captions"""
    
    image_map = {}
    image_counter = 3  # Starting from image 3 as per user confirmation
    
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        
        full_text = ""
        for page in reader.pages:
            full_text += page.extract_text() + "\n"
    
    # Split by common patterns - look for image descriptions
    lines = full_text.split('\n')
    
    # Look for patterns like "(Picture Source: D©nderm)" which indicate image captions
    for i, line in enumerate(lines):
        if 'Picture Source' in line or 'D©nderm' in line or 'Dønderm' in line:
            # The caption is usually on the next line or same line
            if i + 1 < len(lines):
                caption = lines[i + 1].strip()
                if caption:
                    image_map[image_counter] = caption
                    print(f"Image {image_counter}: {caption}")
                    image_counter += 1
            elif line.strip():
                # Sometimes caption is on same line after the source
                parts = line.split(')')
                if len(parts) > 1:
                    caption = parts[1].strip()
                    if caption:
                        image_map[image_counter] = caption
                        print(f"Image {image_counter}: {caption}")
                        image_counter += 1
    
    # Save mapping
    with open('image_caption_mapping.json', 'w', encoding='utf-8') as f:
        json.dump(image_map, f, indent=2, ensure_ascii=False)
    
    print(f"\nTotal images found: {len(image_map)}")
    print("Mapping saved to image_caption_mapping.json")
    
    return image_map

if __name__ == "__main__":
    pdf_path = "../static/assets/dermatology/Derm_Handbook_3rd-Edition-_Nov_2020.pdf"
    extract_image_captions(pdf_path)

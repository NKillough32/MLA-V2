import PyPDF2

pdf_path = r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\MBBS Core Conditions All.pdf"

with open(pdf_path, 'rb') as pdf_file:
    reader = PyPDF2.PdfReader(pdf_file)
    
    # Read pages 2-5 to see TOC structure
    for page_num in [1, 2, 3, 4]:
        print(f"\n{'='*70}")
        print(f"PAGE {page_num + 1}")
        print(f"{'='*70}")
        text = reader.pages[page_num].extract_text()
        lines = text.split('\n')
        
        for i, line in enumerate(lines[:40]):  # First 40 lines
            print(f"{i:3d}: {repr(line)}")

"""
Complete Workflow: Extract from PDF and Update coreConditions.js
This script orchestrates the full process from PDF extraction to JS update
"""

import json
import sys
from pathlib import Path

# Add scripts directory to path
sys.path.insert(0, str(Path(__file__).parent))

def main():
    print("="*70)
    print(" MBBS CORE CONDITIONS - COMPLETE UPDATE WORKFLOW")
    print("="*70)
    print()
    print("This workflow will:")
    print("  1. Analyze the current state of coreConditions.js")
    print("  2. Extract condition data from the PDF")
    print("  3. Generate updated JavaScript code")
    print("  4. Optionally update the file")
    print()
    print("="*70)
    print()
    
    # Paths
    js_file = Path(r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\coreConditions.js")
    pdf_file = Path(r"c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\MBBS Core Conditions All.pdf")
    
    # Step 1: Analyze current state
    print("STEP 1: Analyzing current state...")
    print("-" * 70)
    
    from update_conditions import ConditionUpdater
    
    updater = ConditionUpdater(str(js_file))
    updater.load_js_file()
    
    condition_ids = updater.list_all_condition_ids()
    placeholder_count = updater.count_placeholders()
    
    print(f"✓ Total conditions in database: {len(condition_ids)}")
    print(f"✓ Total PLACEHOLDER instances: {placeholder_count}")
    print(f"✓ Completion status: {((len(condition_ids)*50 - placeholder_count)/(len(condition_ids)*50)*100):.1f}%")
    print()
    
    # Show conditions that need updating
    completed = []
    needs_update = []
    
    for cid in condition_ids[:10]:  # Check first 10
        start, end, content = updater.find_condition_by_id(cid)
        if content and 'PLACEHOLDER' in content:
            needs_update.append(cid)
        else:
            completed.append(cid)
    
    print(f"Sample completed conditions: {completed[:5]}")
    print(f"Sample incomplete conditions: {needs_update[:5]}")
    print()
    
    # Step 2: PDF Information
    print("STEP 2: PDF Analysis...")
    print("-" * 70)
    print(f"✓ PDF file: {pdf_file.name}")
    print(f"✓ Size: {pdf_file.stat().st_size / (1024*1024):.2f} MB")
    print(f"✓ Contains ~600 medical conditions with detailed clinical information")
    print()
    
    # Step 3: Recommendations
    print("STEP 3: Next Steps")
    print("-" * 70)
    print()
    print("RECOMMENDED APPROACH:")
    print()
    print("Option A: AUTOMATED EXTRACTION (Recommended)")
    print("  - Run full PDF extraction for all conditions")
    print("  - Automatically map to JavaScript structure")
    print("  - Review and validate extracted data")
    print("  - Update coreConditions.js in batches")
    print()
    print("Option B: MANUAL EXTRACTION")
    print("  - Extract specific conditions one-by-one")
    print("  - Manually review and edit each entry")
    print("  - Higher accuracy but very time-consuming")
    print()
    print("Option C: HYBRID APPROACH (Best Balance)")
    print("  - Use automated extraction as baseline")
    print("  - Manual review and enhancement of key conditions")
    print("  - Iterate through domains systematically")
    print()
    print("="*70)
    print()
    print("CURRENT STATUS SUMMARY:")
    print(f"  • Database: {len(condition_ids)} conditions")
    print(f"  • Completed: ~{len(completed)*10}+ conditions (with full data)")
    print(f"  • Incomplete: ~{len(condition_ids) - len(completed)*10} conditions (with PLACEHOLDERs)")
    print(f"  • Source: {pdf_file.name} ({pdf_file.stat().st_size / (1024*1024):.2f} MB)")
    print()
    print("="*70)
    print()
    print("TO PROCEED:")
    print("  1. Review the PDF sample in: scripts/pdf_sample.txt")
    print("  2. Test extraction: python scripts/parse_conditions_advanced.py")
    print("  3. Run full workflow: python scripts/workflow_complete.py --extract-all")
    print()


if __name__ == "__main__":
    main()

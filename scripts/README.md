# Core Conditions Update Workflow

## Overview
This directory contains tools to extract medical condition data from the MBBS Core Conditions PDF and update the coreConditions.js file.

## Current Status
- **Total conditions**: 702
- **Completed**: ~20 conditions (2.9%)
- **Incomplete**: ~682 conditions (97.1%)
- **PLACEHOLDER count**: 30,558 instances
- **Source PDF**: 19.49 MB, 3,172 pages

## Files

### Core Scripts

1. **`extract_pdf_conditions.py`**
   - Basic PDF text extraction
   - Structure analysis
   - Sample extraction for testing

2. **`parse_conditions_advanced.py`**
   - Advanced condition parsing
   - Section identification (Presentation, Investigation, Management, etc.)
   - Bullet point extraction
   - Structured data generation

3. **`update_conditions.py`**
   - JavaScript code generation
   - Condition formatting
   - File analysis tools

4. **`workflow_complete.py`**
   - Complete workflow orchestration
   - Status analysis
   - Recommendations

## Usage

### Quick Start

```powershell
# Activate virtual environment
.venv\Scripts\Activate.ps1

# Run workflow analysis
python scripts\workflow_complete.py

# Test extraction on a single condition
python scripts\parse_conditions_advanced.py

# Analyze current database state
python scripts\update_conditions.py
```

### Step-by-Step Process

#### 1. Analyze Current State
```powershell
python scripts\update_conditions.py
```
This shows:
- Total conditions in database
- PLACEHOLDER count
- List of incomplete conditions

#### 2. Test PDF Extraction
```powershell
python scripts\parse_conditions_advanced.py
```
This will:
- Extract "Atrial Fibrillation" from page 40
- Parse the text into structured format
- Display sample data

#### 3. Extract All Conditions (Future)
```python
# In parse_conditions_advanced.py, uncomment:
parser.extract_all_conditions(output_path)
```

#### 4. Update JavaScript File
```python
# Use update_conditions.py to generate JS code
# Then replace in coreConditions.js
```

## Data Structure

### PDF Structure
```
Table of Contents (Pages 1-21)
├── Anaesthesia and Critical Care (Page 22+)
│   ├── 1. Acute Pain Management (Page 22)
│   ├── 2. Anaemia (Page 26)
│   └── ...
├── Cardiology (Page 284+)
├── Dermatology (Page 350+)
└── ...
```

### JavaScript Structure
```javascript
'condition-id': {
    name: "Condition Name",
    domain: "Medical Domain",
    synonyms: ["Synonym 1", "Synonym 2"],
    recognition: {
        typical: [...],
        atypical: [...],
        examination: [...],
        redFlags: [...]
    },
    investigation: {
        immediate: [...],
        further: [...],
        interpretation: [...]
    },
    diagnosis: {
        criteria: "...",
        differential: [...]
    },
    management: {
        firstLine: {
            immediate: [...],
            ongoing: [...]
        },
        secondLine: [...],
        complications: [...]
    },
    clinicalPearls: [...],
    prognosis: "...",
    keywords: [...],
    relatedConditions: [...]
}
```

## Key Issues Addressed

### 1. PLACEHOLDER Text
- **Problem**: 30,558 PLACEHOLDER instances across 682 conditions
- **Solution**: Automated PDF extraction and mapping

### 2. Invalid Related Conditions
- **Problem**: `relatedConditions: ["PLACEHOLDER-related-id-1", "PLACEHOLDER-related-id-2"]`
- **Solution**: Generate proper condition IDs during extraction

### 3. Inconsistent Naming
- **Problem**: Generic IDs like 'distributive', 'obstructive'
- **Solution**: Use full descriptive names from PDF

## Extraction Patterns

The parser looks for these section headers in the PDF:
- **Definition/Overview**: Condition description
- **Clinical Presentation**: Typical symptoms
- **Examination**: Physical findings
- **Red Flags**: Emergency signs
- **Investigations**: Diagnostic tests
- **Management**: Treatment approaches
- **Complications**: Adverse outcomes
- **Prognosis**: Expected outcomes
- **Differential Diagnosis**: Alternative diagnoses

## Recommendations

### Approach: Hybrid (Recommended)
1. **Automated Baseline**
   - Extract all conditions from PDF
   - Generate initial JavaScript structure
   - Populate with extracted data

2. **Manual Review**
   - Review high-priority conditions
   - Enhance clinical pearls
   - Verify related conditions
   - Add missing details

3. **Domain-by-Domain**
   - Complete one medical domain at a time
   - Validate consistency
   - Test in application
   - Iterate

### Priority Order
1. **Anaesthesia and Critical Care** (25 conditions) - HIGH PRIORITY
2. **Cardiology** (21 conditions) - HIGH PRIORITY
3. **Emergency Medicine** - HIGH PRIORITY
4. **Other domains** by frequency of use

## Output Files

- **`pdf_sample.txt`**: Sample extracted text from PDF
- **`extracted_conditions.json`**: Parsed condition data (when full extraction runs)
- **`updated_conditions.js`**: Generated JavaScript code (backup before updating)

## Dependencies

```txt
PyPDF2>=3.0.0
```

## Notes

- PDF text extraction may have formatting issues (line breaks, spacing)
- Some sections may need manual cleanup
- Medical accuracy should be verified by qualified professionals
- Keep backups before updating coreConditions.js

## Next Steps

1. ✅ PDF extraction working
2. ✅ Structure analysis complete
3. ✅ Parser for individual conditions
4. ⏳ Full batch extraction (ready to run)
5. ⏳ JavaScript update automation
6. ⏳ Validation and testing

## Support

For issues or questions:
1. Check the workflow output
2. Review sample extractions
3. Test with individual conditions first
4. Validate medical accuracy before deployment

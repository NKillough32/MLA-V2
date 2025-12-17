# Core Conditions Content Generator

This directory contains the comprehensive medical content for all core conditions, systematically generated using OpenAI.

## Structure

```
generated/
├── index.json              # Master index of all conditions
├── index.js               # JavaScript export of index
├── acute_coronary_syndrome.json
├── cardiac_arrest.json
├── angina.json
└── ... (individual condition files)
```

## File Format

Each condition is stored as a JSON file with this structure:

```json
{
  "id": "acute_coronary_syndrome",
  "name": "Acute coronary syndrome",
  "domains": ["Cardiology", "Emergency Medicine"],
  "lastUpdated": "2024-12-17T...",
  "content": {
    "overview": {
      "definition": "...",
      "epidemiology": "...",
      "pathophysiology": "..."
    },
    "recognition": {
      "keySymptoms": [...],
      "keySigns": [...],
      "atypicalPresentations": [...],
      "redFlags": [...]
    },
    "investigation": {
      "firstLine": [...],
      "secondLine": [...],
      "specialistTests": [...]
    },
    "diagnosis": {
      "criteria": "...",
      "differentials": [...]
    },
    "management": {
      "acute": {
        "firstLine": [...],
        "secondLine": [...],
        "procedures": [...]
      },
      "chronic": {
        "firstLine": [...],
        "secondLine": [...],
        "monitoring": [...]
      },
      "drugs": [...],
      "procedures": [...]
    },
    "prognosis": "...",
    "complications": [...],
    "foundationDoctorRole": "...",
    "escalation": "..."
  }
}
```

## Key Features

### Drug Information
Each drug mentioned includes:
- **Mechanism of action**: What it works on
- **Dosing**: Typical ranges
- **Side effects**: Key contraindications
- **Usage guidelines**: When to use vs alternatives

### Procedure Information
Each procedure includes:
- **Description**: What it involves
- **Indications**: When to use
- **Risks**: Key complications

### Foundation Doctor Focus
Content specifically addresses:
- Recognition and initial assessment
- Appropriate investigations
- When to escalate
- Safe prescribing within competence
- Key safety considerations

## Usage

### Python Integration
```python
import json

# Load a specific condition
with open('acute_coronary_syndrome.json', 'r') as f:
    acs_data = json.load(f)

# Load the index
with open('index.json', 'r') as f:
    index = json.load(f)
```

### JavaScript Integration
```javascript
// Import the index
import { coreConditionsIndex } from './index.js';

// Or in browser
<script src="index.js"></script>
const conditions = window.coreConditionsIndex;

// Load specific condition
fetch('acute_coronary_syndrome.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Generation Process

1. **Data Cleaning**: Remove special characters, handle duplicates
2. **Domain Grouping**: Conditions appearing in multiple domains are merged
3. **OpenAI Processing**: Each condition gets comprehensive content generation
4. **Structured Output**: Consistent JSON format for all conditions
5. **Index Creation**: Master index for easy navigation and search

## Updating Content

To regenerate content:

```bash
cd scripts
python condition_processor.py --api-key YOUR_OPENAI_API_KEY --limit 5  # Test with 5 conditions
python condition_processor.py --api-key YOUR_OPENAI_API_KEY             # Full generation
```

## Quality Assurance

Each generated file includes:
- ✅ Foundation doctor appropriate content
- ✅ Drug mechanisms and contraindications explained
- ✅ Procedures concisely described
- ✅ Atypical presentations covered
- ✅ Clear escalation guidelines
- ✅ Practical, actionable information
# Core Conditions OpenAI Content Generation System

## 🎯 Overview

You now have a complete system to systematically process your 579 core conditions using OpenAI to generate comprehensive medical education content specifically for Foundation Year doctors.

## 📊 What We Built

### 1. **Data Analysis & Cleaning**
- ✅ **579 unique conditions** across **30 medical domains**
- ✅ **Cleaned CSV** with proper encoding and duplicate handling
- ✅ **91 conditions** appear across multiple domains (properly handled)

### 2. **Systematic Processing Pipeline**
- ✅ **Python processor** with OpenAI API integration
- ✅ **Rate limiting** and error handling
- ✅ **Domain-specific content generation**
- ✅ **Duplicate condition merging** (same condition across domains)

### 3. **Content Structure** 
Each generated condition includes:
- **Overview**: Definition, epidemiology, pathophysiology
- **Recognition**: Symptoms, signs, atypical presentations, red flags
- **Investigation**: First/second line tests, specialist referrals
- **Diagnosis**: Criteria and differentials
- **Management**: Acute/chronic care with clear Foundation doctor guidance
- **Drugs**: **Mechanism of action explained** for each medication
- **Procedures**: **Concise explanations** of what they involve
- **Foundation Role**: Specific responsibilities and escalation points

## 🚀 How to Use

### Step 1: Get OpenAI API Key
1. Visit https://platform.openai.com/api-keys
2. Create an API key
3. Keep it secure!

### Step 2: Test the System
```bash
cd scripts
python test_conditions.py  # See system overview
python condition_processor.py --api-key YOUR_KEY --limit 3  # Test with 3 conditions
```

### Step 3: Full Generation
```bash
python condition_processor.py --api-key YOUR_KEY  # Process all 579 conditions
```

### Step 4: Integration
The generated content automatically integrates with your existing MLA system via:
- [EnhancedCoreConditions.js](static/js/v2/modules/EnhancedCoreConditions.js)

## 📁 Output Structure

```
static/coreconditions/generated/
├── index.json                          # Master index
├── index.js                           # JavaScript exports
├── acute_coronary_syndrome.json       # Individual conditions
├── angina.json
├── type_1_diabetes.json
└── ... (579 total files)
```

## 💡 File Format Recommendation: **JSON + JavaScript**

**Why JSON?**
- ✅ **Structured data** - Easy to query and filter
- ✅ **Extensible** - Add new fields over time  
- ✅ **Web-friendly** - Direct integration with existing JS
- ✅ **Version control** - Clear diffs when updating
- ✅ **Searchable** - Easy search implementation

**Alternative formats considered:**
- ❌ **Markdown**: Good for humans, harder to query programmatically
- ❌ **Plain text**: No structure, hard to maintain
- ✅ **JSON**: Perfect balance of structure and usability

## 🎯 Key Features

### Drug Information
Every drug mentioned includes:
```json
{
  "name": "Aspirin",
  "mechanism": "Irreversible COX-1 inhibition, preventing platelet aggregation",
  "dosing": "75-300mg daily",
  "sideEffects": "GI bleeding, peptic ulceration",
  "contraindications": "Active bleeding, severe heart failure",
  "whenToUse": "Secondary prevention post-MI, acute coronary syndrome"
}
```

### Procedure Information
Every procedure includes:
```json
{
  "name": "ECG",
  "description": "12-lead electrocardiogram recording cardiac electrical activity",
  "indications": "Chest pain, arrhythmia assessment, routine screening",
  "risks": "None (non-invasive)",
  "foundationRole": "Perform, interpret basic abnormalities, escalate complex cases"
}
```

### Foundation Doctor Focus
Each condition specifically addresses:
- **What you can manage independently**
- **When to escalate to seniors**
- **Safety considerations**
- **Common pitfalls to avoid**

## 📈 Expected Outcomes

**Processing Time**: ~2-3 hours for all 579 conditions (with API delays)
**Content Quality**: Comprehensive, Foundation-appropriate medical education
**Cost**: ~$50-100 in OpenAI API usage (estimated)
**Maintenance**: Easy to update individual conditions over time

## 🔧 Advanced Options

### Domain-Specific Content
The system recognizes when conditions appear in multiple domains (like "Type 1 diabetes" in Endocrine, Paediatrics, Pre-operative Care) and generates domain-aware content.

### Batch Processing
Process specific subsets:
```bash
python condition_processor.py --api-key YOUR_KEY --domain "Cardiology"
python condition_processor.py --api-key YOUR_KEY --limit 10
```

### Content Updates
Update specific conditions:
```bash
python update_condition.py --api-key YOUR_KEY --condition "Angina"
```

## 🎓 Integration with Existing System

Your existing `CoreConditionsManager.js` gets enhanced with:
- `getComprehensiveContent(conditionName)` - Full OpenAI content
- `getDrugMechanisms(conditionName)` - Drug details with mechanisms
- `getProcedureDetails(conditionName)` - Procedure explanations  
- `getFoundationGuidance(conditionName)` - FY-specific guidance
- `getAtypicalPresentations(conditionName)` - Unusual cases

## 🚨 Important Notes

1. **API Costs**: Monitor your OpenAI usage
2. **Rate Limits**: System handles API limits automatically
3. **Content Review**: Generated content should be clinically reviewed
4. **Updates**: Easy to regenerate individual conditions as needed
5. **Backup**: Keep your API key secure and backed up

## 🎉 Next Steps

1. **Test with sample conditions** to verify quality
2. **Clinical review** of generated content
3. **Full processing** of all conditions
4. **Integration testing** with your existing MLA system
5. **User feedback** and iterative improvements

This system transforms your static condition list into a comprehensive, searchable, Foundation doctor-focused medical education resource with detailed drug mechanisms and procedure explanations exactly as you requested!
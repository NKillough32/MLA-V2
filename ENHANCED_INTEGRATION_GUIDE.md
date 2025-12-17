# Enhanced Core Conditions Integration Guide

## Overview
Your CoreConditionsManager now supports both legacy data and new enhanced OpenAI-generated content. The integration is backwards compatible and will automatically use enhanced content when available.

## Key Changes

### 1. **Automatic Enhanced Content Detection**
The manager now automatically tries to load enhanced content on initialization:
- Looks for `/static/coreconditions/generated/index.json`
- Falls back to legacy system if enhanced content not available
- No code changes needed in existing views

### 2. **New Methods Available**

```javascript
import { coreConditionsManager } from './CoreConditionsManager.js';

// Initialize (now loads both legacy and enhanced)
await coreConditionsManager.initialize();

// Check if enhanced content is available
const hasEnhanced = coreConditionsManager.hasEnhancedContent();

// Get condition (automatically uses enhanced if available)
const condition = await coreConditionsManager.getConditionData('acute-pain-management');

// Get detailed drug information with mechanisms
const drugs = await coreConditionsManager.getDrugInformation('Acute pain management');
// Returns: [{ name, mechanism, dosing, sideEffects, usage }, ...]

// Get procedure information
const procedures = await coreConditionsManager.getProcedureInformation('Acute pain management');
// Returns: [{ name, description, indications, risks }, ...]

// Search enhanced content
const results = coreConditionsManager.searchEnhancedConditions('pain');

// Get enhanced statistics
const stats = coreConditionsManager.getEnhancedStats();
```

### 3. **Enhanced Condition Format**
Enhanced conditions include additional fields:
```javascript
{
  name: "Acute pain management",
  domains: ["Anaesthesia and Critical Care"], 
  recognition: {
    typical: [...],      // Key symptoms
    atypical: [...],     // Atypical presentations  
    examination: [...],  // Key signs
    redFlags: [...]      // Red flags
  },
  investigation: {
    immediate: [...],    // First-line investigations
    further: [...],      // Second-line investigations  
    specialist: [...]    // Specialist tests
  },
  management: {
    acute: {
      firstLine: [...],
      secondLine: [...],
      procedures: [...]
    },
    chronic: {
      firstLine: [...],
      secondLine: [...], 
      monitoring: [...]
    },
    drugs: [             // ✨ NEW: Detailed drug info
      {
        name: "Paracetamol",
        mechanism: "Inhibits prostaglandin synthesis in the CNS",
        dosing: "1g IV/PO every 6 hours (max 4g/day)",
        sideEffects: "Hepatotoxicity in overdose; caution in liver disease",
        usage: "First-line for mild to moderate pain"
      }
    ],
    procedures: [        // ✨ NEW: Detailed procedure info
      {
        name: "Nerve Blocks", 
        description: "Injection of anesthetic near a nerve",
        indications: "Severe localized pain",
        risks: "Infection, hematoma, nerve damage"
      }
    ]
  },
  foundationRole: "...",           // ✨ NEW: FY doctor guidance
  escalation: "...",               // ✨ NEW: When to escalate
  safetyConsiderations: "...",     // ✨ NEW: Safety guidance
  enhanced: true                   // ✨ Flag indicates enhanced content
}
```

### 4. **UI Integration Examples**

#### In your existing condition view components:
```javascript
// Your existing code works unchanged
const condition = await coreConditionsManager.getConditionData(conditionId);

// But now you can also show enhanced features
if (condition.enhanced) {
  // Show drug mechanisms
  condition.management.drugs.forEach(drug => {
    console.log(`${drug.name}: ${drug.mechanism}`);
  });
  
  // Show Foundation doctor guidance
  if (condition.foundationRole) {
    displayFoundationGuidance(condition.foundationRole);
  }
  
  // Show safety considerations
  if (condition.safetyConsiderations) {
    displaySafetyAlert(condition.safetyConsiderations);
  }
}
```

#### Add enhanced features to search results:
```javascript
// Enhanced search includes domain filtering
const searchResults = coreConditionsManager.searchEnhancedConditions(query);
searchResults.forEach(result => {
  console.log(`${result.name} (${result.domains.join(', ')})`);
});
```

### 5. **Development Workflow**

1. **During Development**: The system works with legacy data
2. **After Generation**: Enhanced content automatically becomes available
3. **No Code Changes**: Existing functionality continues to work
4. **Progressive Enhancement**: New features become available when content exists

### 6. **Testing the Integration**

Open `test-enhanced-conditions.html` in your browser to verify:
- Manager initialization
- Enhanced content detection  
- Sample condition loading
- Search functionality

The system is now ready for when you complete the full generation of all 579 conditions!
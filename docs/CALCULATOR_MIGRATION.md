# Calculator JSON Migration

Successfully migrated the calculator system from a monolithic `extracted-calculators.js` file (9,661 lines) to **78 individual JSON files** for better performance, maintainability, and dynamic loading.

## Migration Date
December 28, 2025

## Overview

The calculator system has been modernized to match the drug database architecture, using individual JSON files that are loaded dynamically on-demand.

### Previous Architecture
- Single file: `static/js/v2/extracted-calculators.js` (9,661 lines)
- All 78 calculators loaded immediately on page load
- ~500KB of JavaScript parsed on every page load
- Difficult to maintain and update individual calculators

### New Architecture
1. **`static/calculators/calculator_index.json`** - Lightweight index with all calculator metadata
2. **`static/calculators/*.json`** - 78 individual calculator JSON files
3. **`static/js/data/calculatorLoader.js`** - Dynamic loader module

## Structure

### Calculator Index (`calculator_index.json`)
```json
{
  "version": "1.0.0",
  "generated": "2025-12-28",
  "totalCalculators": 78,
  "calculators": [
    {
      "id": "bmi",
      "name": "BMI Calculator",
      "category": "GENERAL",
      "file": "bmi.json"
    }
  ]
}
```

### Individual Calculator Files
Each calculator JSON file contains:
```json
{
  "id": "bmi",
  "name": "BMI Calculator",
  "category": "GENERAL",
  "description": "Body Mass Index calculation and interpretation",
  "keywords": ["bmi", "body", "mass", "index", "weight", "height", "obesity"],
  "template": "HTML template string...",
  "calculatorFunction": "JavaScript function body..."
}
```

## Files Created

### Core Module
- `static/js/data/calculatorLoader.js` - Calculator loader class with caching

### Calculator Files (78 total)
All located in `static/calculators/`:
- Individual JSON files for each calculator (e.g., `bmi.json`, `gcs.json`, `chads2vasc.json`)
- `calculator_index.json` - Master index

### Scripts
- `scripts/split_calculators.py` - Split monolithic file into individual JSONs
- `scripts/regenerate_calculator_index.py` - Regenerate index from calculator files

## Key Features

### Dynamic Loading
- Calculators load on-demand from JSON files
- Reduces initial page load time
- Maintains backward compatibility with `window.ExtractedCalculators` object

### Caching
- In-memory cache for loaded calculators
- Service worker caches all calculator files for offline use
- Automatic cache invalidation on updates

### Performance Benefits
1. **Faster Initial Load**: Only index loads initially (~10KB vs 500KB)
2. **On-Demand Loading**: Individual calculators load when needed
3. **Better Caching**: Granular cache invalidation per calculator
4. **Offline Support**: All calculators available offline via service worker

### Developer Benefits
1. **Easy Updates**: Modify individual calculator files
2. **Better Organization**: Each calculator in separate file
3. **Version Control**: Clear diffs for calculator changes
4. **Searchable**: Find calculators by ID, name, or category

## Migration Process

### 1. Extract Calculator Definitions
```python
python scripts/split_calculators.py
```
This script:
- Reads `CalculatorRegistry.js` for calculator metadata
- Extracts functions from `extracted-calculators.js`
- Creates individual JSON files
- Generates `calculator_index.json`

### 2. Update System Files
Modified files:
- `index.html` - Load calculatorLoader.js instead of extracted-calculators.js
- `static/js/v2/main.js` - Wait for calculators-loaded event
- `static/js/v2/modules/CalculatorManager.js` - Rebuild registry on load
- `scripts/asset-hash-targets.json` - Update hashed assets

### 3. Backward Compatibility
The system maintains full backward compatibility:
- `window.ExtractedCalculators` object is still created
- All existing calculator function names work unchanged
- Calculator registry automatically rebuilds when calculators load

## API Usage

### Loading Calculator Index
```javascript
const index = await calculatorLoader.loadIndex();
console.log(index.totalCalculators); // 78
```

### Loading Single Calculator
```javascript
const bmiCalc = await calculatorLoader.getCalculator('bmi');
console.log(bmiCalc.name); // "BMI Calculator"
```

### Searching Calculators
```javascript
const results = await calculatorLoader.search('cardiac');
// Returns all calculators matching "cardiac"
```

### Get by Category
```javascript
const cardiology = await calculatorLoader.getCalculatorsByCategory('CARDIOLOGY');
```

## Maintenance

### Adding New Calculator
1. Create new JSON file in `static/calculators/`
2. Run `python scripts/regenerate_calculator_index.py`
3. Calculator automatically available on next page load

### Updating Calculator
1. Edit the calculator's JSON file
2. Changes take effect immediately (with cache refresh)
3. No need to rebuild entire system

### Regenerating Index
```python
python scripts/regenerate_calculator_index.py
```

## Statistics

- **Total Calculators**: 78
- **Categories**: CARDIOLOGY, NEUROLOGY, GENERAL, ASSESSMENT, etc.
- **Total Size**: ~800KB across all files
- **Index Size**: ~10KB
- **Average Calculator Size**: ~10KB

## Calculator Categories

- **CARDIOLOGY**: CHADS2-VASc, HAS-BLED, GRACE, HEART, TIMI, etc.
- **NEUROLOGY**: GCS, NIHSS, Modified Rankin, ABCD2
- **RESPIRATORY**: CURB65, CRB65, PERC, A-a Gradient
- **RENAL**: eGFR, FENa, Cockcroft-Gault
- **HEPATOLOGY**: MELD, Child-Pugh, FIB-4, APRI
- **GENERAL**: BMI, BSA, Fluid Balance
- **PSYCHIATRY**: PHQ-9, GAD-7, MMSE, CIWA
- **And many more...**

## Future Enhancements

Potential improvements:
- Lazy load calculator functions only when needed
- Pre-cache popular calculators
- Add calculator usage analytics
- Version individual calculators independently
- Support calculator plugins/extensions

## Testing

To verify the migration:
1. Open developer console
2. Check for "Calculators loaded" message
3. Test a few calculators to ensure they work
4. Verify offline functionality
5. Check network tab for on-demand loading

## Rollback

If issues occur, can temporarily revert by:
1. Restore `extracted-calculators.js` script tag in index.html
2. Comment out calculatorLoader.js
3. All functionality returns to previous state

## Notes

- All 78 calculators successfully migrated
- No breaking changes to existing code
- Full backward compatibility maintained
- Performance improved significantly
- Easier to maintain and extend

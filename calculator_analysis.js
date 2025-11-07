// Analysis script to compare ExtractedCalculators vs CalculatorManager registrations

// List of all calculators found in ExtractedCalculators (61 total)
const extractedCalculators = [
    'getBMICalculator',
    'getFrailtyCalculator', 
    'getBarthelCalculator',
    'getCHADS2VAScCalculator',
    'getHASBLEDCalculator',
    'getGCSCalculator',
    'getAPACHECalculator',
    'getWellsCalculator',
    'getQRISKCalculator',
    'getMADDERSCalculator',
    'getMEWSCalculator',
    'getCRB65Calculator',
    'getRockallCalculator',
    'getChildPughCalculator',
    'getOttawaAnkleCalculator',
    'getEGFRCalculator',
    'getUreaCreatinineCalculator',
    'getABCD2Calculator',
    'getMUSTCalculator',
    'getWaterlowCalculator',
    'getUnitConverterCalculator',
    'getDrugVolumeCalculator',
    'getNEWS2Calculator',
    'getCURB65Calculator',
    'getPalliativeCalculator',
    'getWellsDVTCalculator',
    'getPERCCalculator',
    'getRCRICalculator',
    'getQTcCalculator',
    'getCorrectedSodiumCalculator',
    'getOsmolalGapCalculator',
    'getCentorCalculator',
    'getAlvaradoCalculator',
    'getGlasgowBlatchfordCalculator',
    'getAPGARCalculator',
    'getBishopCalculator',
    'getMAPCalculator',
    'getAAGradientCalculator',
    'getCorrectedCalciumCalculator',
    'getLDLCalculator',
    'getWintersCalculator',
    'getAsthmaCalculator',
    'getGRACECalculator',
    'getCRUSADECalculator',
    'getPHQ9Calculator',
    'getGAD7Calculator',
    'getMSECalculator',
    'getMMSECalculator',
    'getInsulinSlidingCalculator',
    'getVasopressorCalculator',
    'getPaediatricDosingCalculator',
    'getInfusionRateCalculator',
    'getCockcroftGaultCalculator',
    'getBSACalculator',
    'getFluidBalanceCalculator',
    'getTIMICalculator',
    'getNIHSSCalculator',
    'getModifiedRankinCalculator',
    'getRASSCalculator',
    'getFractureRiskCalculator',
    'getAnionGapCalculator'
];

// List of registered calculator IDs in CalculatorManager (from the grep search results)
const registeredCalculators = [
    'grace',
    'qrisk3', 
    'curb65',
    'pefr',
    'nihss',
    'abcd2',
    'apache',
    'sofa',
    'mews',
    'news2',
    'egfr',
    'meld',
    'child-pugh',
    'anion-gap',
    'corrected-calcium',
    'corrected-sodium',
    'osmolal-gap',
    'map',
    'aa-gradient',
    'perc',
    'timi',
    'rcri',
    'qtc',
    'wells-dvt',
    'wells-pe',
    'rockall',
    'glasgow-blatchford',
    'centor',
    'alvarado',
    'phq9',
    'gad7',
    'mse',
    'mmse',
    'must',
    'waterlow',
    'frailty',
    'barthel',
    'ottawa-ankle',
    'apgar',
    'bishop',
    'palliative',
    'insulin-sliding',
    'vasopressor',
    'infusion-rate',
    'cockcroft-gault',
    'bsa',
    'fluid-balance',
    'rass',
    'fracture-risk',
    'anion-gap',
    'wells-dvt',
    'paediatric-dosing',
    'drug-volume',
    'unit-converter',
    'asthma',
    'winters',
    'grace',
    'crusade'
];

console.log("=== CALCULATOR ANALYSIS ===");
console.log(`ExtractedCalculators has ${extractedCalculators.length} calculators`);
console.log(`CalculatorManager has ${registeredCalculators.length} registrations`);

// Convert ExtractedCalculators function names to likely registration IDs
const extractedIds = extractedCalculators.map(name => {
    return name.replace('get', '')
                .replace('Calculator', '')
                .replace(/([A-Z])/g, '-$1')
                .toLowerCase()
                .replace(/^-/, '');
});

console.log("\n=== MISSING FROM CALCULATORMANAGER ===");
const missing = extractedIds.filter(id => !registeredCalculators.includes(id));
missing.forEach(id => console.log(`- ${id}`));

console.log("\n=== REGISTERED BUT NOT IN EXTRACTEDCALCULATORS ===");  
const extraRegistered = registeredCalculators.filter(id => !extractedIds.includes(id));
extraRegistered.forEach(id => console.log(`- ${id}`));

console.log("\n=== POTENTIAL DUPLICATES IN REGISTERED ===");
const duplicates = registeredCalculators.filter((item, index) => registeredCalculators.indexOf(item) !== index);
duplicates.forEach(id => console.log(`- ${id}`));
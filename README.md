# MLA Quiz V2 - Independent Medical Learning Application

## Overview
MLA Quiz V2 is a modern, modular medical learning application designed for healthcare professionals and students. This is the next-generation version with complete independence from the V1 codebase.

## Features

### 🧮 Medical Calculators
- **Body Metrics**: BMI, BSA, Fluid Balance
- **Cardiology**: CHA₂DS₂-VASc, HAS-BLED, QRISK3
- **Neurology**: Glasgow Coma Scale, NIHSS
- **Emergency Medicine**: Wells PE, Ottawa Rules
- **Critical Care**: APACHE II, SOFA, MEWS

### 🔬 Clinical Decision Support
- **Differential Diagnoses**: Comprehensive differential diagnosis database
- **Clinical Triads**: Key diagnostic triads (Beck's, Virchow's, Cushing's, etc.)
- **Emergency Protocols**: ACLS, Sepsis 6, Anaphylaxis management
- **Interpretation Tools**: ECG, ABG, X-ray interpretation guides

### 🦴 Interactive Anatomy
- High-quality anatomical diagrams
- Bones and muscles layers
- Anterior/posterior views
- Interactive structure information

### 📚 Medical References
- Drug database with interactions
- Lab values with reference ranges
- Clinical guidelines (NICE, ESC, AHA)
- Medical mnemonics

### 📱 Progressive Web App
- Offline functionality
- Mobile-responsive design
- Touch-friendly interface
- Dark/light mode
- Haptic feedback

## Technology Stack

### Frontend
- **JavaScript ES6+**: Modern modular architecture
- **CSS3**: Responsive design with CSS Grid/Flexbox
- **Service Worker**: Offline functionality
- **Web APIs**: Vibration, Storage, Orientation

### Backend
- **Python 3.11**: Flask-based API
- **Vercel**: Serverless deployment platform

### Architecture
- **Event-driven**: Central EventBus for component communication
- **Modular**: Independent managers for each feature
- **Native V2**: No legacy V1 dependencies
- **PWA-ready**: Progressive Web App capabilities

## Installation & Setup

### Prerequisites
- Python 3.11+
- Modern web browser with ES6+ support

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
python api/index.py

# Access at http://localhost:5000
```

### Deployment
The application is configured for Vercel deployment:
```bash
# Deploy to Vercel
vercel --prod
```

## Project Structure
```
MLA-V2/
├── api/                    # Python backend
│   └── index.py           # Flask application
├── static/                # Frontend assets
│   ├── js/
│   │   ├── v2/           # V2 application code
│   │   │   ├── main.js   # Application entry point
│   │   │   └── modules/  # Feature modules
│   │   └── data/         # Clinical databases
│   ├── anatomy/          # Anatomical resources
│   ├── icons/           # PWA icons
│   ├── manifest.json    # PWA manifest
│   └── sw.js           # Service worker
├── templates/           # HTML templates
│   └── index.html      # Main application
├── requirements.txt     # Python dependencies
├── runtime.txt         # Python version
└── vercel.json         # Deployment config
```

## Core Modules

### V2Integration.js
Central coordination and initialization

### Managers
- **AnalyticsManager**: Usage tracking and haptic feedback
- **AnatomyManager**: Interactive anatomy explorer
- **CalculatorManager**: Medical calculator registry
- **Calculators**: Native calculator implementations
- **DifferentialDxManager**: Differential diagnosis system
- **DrugReferenceManager**: Drug database and interactions
- **EmergencyProtocolsManager**: Emergency protocols
- **EventBus**: Application-wide event system
- **ExaminationManager**: Clinical examination guides
- **GuidelinesManager**: Clinical guidelines
- **LabValuesManager**: Laboratory reference values
- **QuizManager**: Quiz functionality
- **StorageManager**: Data persistence
- **TriadsManager**: Clinical triads database
- **UIManager**: User interface coordination
- **UIHelpers**: UI utility functions

### Data Modules
- **clinicalTriads.js**: Diagnostic triads database
- **differentials.js**: Differential diagnoses
- **emergencyProtocols.js**: Emergency management
- **examinationGuides.js**: Clinical examination
- **mnemonics.js**: Medical mnemonics

## Features in Detail

### Medical Calculators
Native implementations of essential medical calculators with:
- Real-time calculation
- Clinical interpretation
- UK-specific guidelines
- Haptic feedback
- Recent tools tracking

### Clinical Decision Support
Comprehensive clinical databases with:
- Evidence-based content
- NICE/ESC/AHA guidelines
- Red flag warnings
- Emergency protocols
- Clinical pearls

### Anatomy Explorer
Interactive anatomical education with:
- SVG-based diagrams
- Structure identification
- Clinical correlations
- Search functionality
- Multi-layer visualization

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing
This is the V2 independent version designed for separation from the V1 codebase. All new features should be implemented using the V2 modular architecture.

## License
Educational use for medical professionals and students.

## Medical Disclaimer
This application is for educational purposes only and should not replace clinical judgment or be used as the sole basis for medical decisions.
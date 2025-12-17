# Configuration for Core Conditions Content Generator

# OpenAI Settings
OPENAI_MODEL = "gpt-4.1"  # Recommended for medical content (Standard tier)
OPENAI_MODEL_BUDGET = "gpt-4o-mini"  # For testing/budget runs  
OPENAI_MAX_TOKENS = 4000
OPENAI_TEMPERATURE = 0.1

# Rate limiting (requests per minute)
API_RATE_LIMIT = 60
RETRY_ATTEMPTS = 3
RETRY_DELAY_BASE = 2  # seconds, exponential backoff

# Content Settings
FOUNDATION_YEAR_FOCUS = True
INCLUDE_DRUG_MECHANISMS = True
INCLUDE_PROCEDURE_DETAILS = True
INCLUDE_ATYPICAL_PRESENTATIONS = True

# Output Settings
OUTPUT_FORMAT = "json"  # json, markdown, both
GENERATE_INDEX = True
GENERATE_JS_EXPORTS = True

# File Settings
ENCODING = "utf-8"
INDENT_SIZE = 2

# Content Structure Requirements
REQUIRED_SECTIONS = [
    "overview",
    "recognition", 
    "investigation",
    "diagnosis",
    "management",
    "prognosis",
    "complications",
    "foundationDoctorRole",
    "escalation"
]

# Drug Information Requirements
DRUG_INFO_FIELDS = [
    "mechanism_of_action",
    "typical_dosing",
    "side_effects", 
    "contraindications",
    "when_to_use"
]

# Procedure Information Requirements
PROCEDURE_INFO_FIELDS = [
    "description",
    "indications",
    "contraindications",
    "key_risks",
    "foundation_role"
]

# Domain-Specific Focus Areas
DOMAIN_FOCUS = {
    "Cardiology": ["ECG interpretation", "chest pain assessment", "heart failure management"],
    "Emergency": ["ABCDE approach", "rapid assessment", "immediate stabilization"],
    "Respiratory": ["chest X-ray interpretation", "arterial blood gas", "oxygen therapy"],
    "Neurology": ["neurological examination", "Glasgow Coma Scale", "stroke assessment"],
    "Psychiatry": ["mental state examination", "risk assessment", "capacity assessment"],
    "Paediatrics": ["age-appropriate assessment", "safeguarding", "growth charts"],
    "Surgery": ["surgical anatomy", "pre/post-operative care", "wound assessment"]
}
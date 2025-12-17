#!/usr/bin/env python3
"""
Test runner for the condition processor - processes a few conditions as examples
"""

import sys
import os
sys.path.append('.')

from condition_processor import ConditionProcessor
import argparse

def test_conditions():
    """Test the system with a few sample conditions"""
    
    # Test conditions (mix of simple and complex)
    test_cases = [
        "Angina",
        "Type 1 diabetes", 
        "Acute coronary syndrome"
    ]
    
    print("=== TESTING CORE CONDITIONS PROCESSOR ===")
    print(f"This will test {len(test_cases)} conditions without using OpenAI API")
    print("To run with real OpenAI API, use: python condition_processor.py --api-key YOUR_KEY --limit 3")
    print()
    
    # Initialize processor (without API key for testing)
    processor = ConditionProcessor(
        api_key="test-key", 
        csv_path="../static/coreconditions/core_conditions_clean.csv",
        output_dir="../static/coreconditions/generated"
    )
    
    # Load and analyze data
    df = processor.load_and_clean_data()
    conditions = processor.group_conditions(df)
    
    print("=== DATA ANALYSIS ===")
    print(f"Total conditions: {len(conditions)}")
    
    # Show test cases
    print(f"\n=== TEST CASES ===")
    for condition_name in test_cases:
        if condition_name in conditions:
            domains = conditions[condition_name]
            condition_id = processor.create_condition_id(condition_name)
            print(f"✓ {condition_name}")
            print(f"  ID: {condition_id}")
            print(f"  Domains: {', '.join(domains)}")
            
            # Show what the prompt would look like
            prompt = processor.generate_openai_prompt(condition_name, domains)
            print(f"  Prompt length: {len(prompt)} characters")
            print(f"  Prompt preview: {prompt[:200]}...")
            print()
        else:
            print(f"✗ {condition_name} - Not found in CSV")
    
    # Generate index
    print("=== GENERATING INDEX ===")
    processor.generate_index(conditions)
    print("✓ Generated index.json and index.js")
    
    # Show some statistics
    print("\n=== STATISTICS ===")
    domain_stats = {}
    for condition_name, domains in conditions.items():
        for domain in domains:
            domain_stats[domain] = domain_stats.get(domain, 0) + 1
    
    print("Top domains by condition count:")
    sorted_domains = sorted(domain_stats.items(), key=lambda x: x[1], reverse=True)
    for domain, count in sorted_domains[:10]:
        print(f"  {domain}: {count} conditions")
    
    # Show overlap analysis
    print(f"\nConditions appearing in multiple domains:")
    multi_domain = {name: domains for name, domains in conditions.items() if len(domains) > 1}
    print(f"  {len(multi_domain)} conditions appear in multiple domains")
    
    for name, domains in sorted(multi_domain.items())[:5]:
        print(f"  • {name}: {', '.join(domains)}")
    
    print("\n=== NEXT STEPS ===")
    print("1. Get an OpenAI API key from https://platform.openai.com/api-keys")
    print("2. Run: python condition_processor.py --api-key YOUR_KEY --limit 5")
    print("3. Check the generated/ folder for output files")
    print("4. Once satisfied, run without --limit to process all conditions")
    print("\nExpected output:")
    print("  - One JSON file per condition with comprehensive medical content")  
    print("  - Drugs explained with mechanism of action")
    print("  - Procedures described concisely")
    print("  - Foundation doctor specific guidance")
    print("  - Atypical presentations covered")

if __name__ == "__main__":
    test_conditions()
#!/usr/bin/env python3
"""
Budget test runner for condition processor - uses gpt-4o-mini for cost-effective testing
"""

import sys
import os
sys.path.append('.')

from condition_processor import ConditionProcessor
import argparse

def run_budget_test():
    """Test with gpt-4o-mini for budget-friendly validation"""
    
    parser = argparse.ArgumentParser(description='Budget test with gpt-4o-mini')
    parser.add_argument('--api-key', required=True, help='OpenAI API key')
    parser.add_argument('--limit', type=int, default=3, help='Number of conditions to test')
    
    args = parser.parse_args()
    
    print("=== BUDGET TEST WITH GPT-4O-MINI ===")
    print(f"Testing {args.limit} conditions with gpt-4o-mini ($0.15/$0.60 per 1M tokens)")
    print("Use this to validate content quality before full gpt-4.1 run")
    print()
    
    # Create processor with budget model
    processor = ConditionProcessor(
        api_key=args.api_key,
        csv_path="../static/coreconditions/core_conditions_clean.csv", 
        output_dir="../static/coreconditions/generated_test"
    )
    
    # Override model to budget version
    processor.budget_mode = True
    
    # Modify the API call method for budget model
    original_call = processor.call_openai_api
    
    def budget_api_call(prompt, max_retries=3):
        """Modified API call for gpt-4o-mini"""
        from openai import OpenAI
        client = OpenAI(api_key=args.api_key)
        for attempt in range(max_retries):
            try:
                response = client.chat.completions.create(
                    model="gpt-4o-mini",  # Budget model
                    messages=[{
                        "role": "system", 
                        "content": "You are an expert medical educator specializing in Foundation Year doctor training. Provide comprehensive, practical medical education content."
                    }, {
                        "role": "user", 
                        "content": prompt
                    }],
                    max_tokens=4000,
                    temperature=0.1
                )
                return response.choices[0].message.content
            except Exception as e:
                print(f"Budget API call attempt {attempt + 1} failed: {str(e)}")
                if attempt < max_retries - 1:
                    import time
                    time.sleep(2 ** attempt)
                else:
                    raise e
    
    processor.call_openai_api = budget_api_call
    
    # Run test with improved parsing
    processor.process_all_conditions(limit=args.limit)
    
    # Calculate cost estimate
    estimated_input_tokens = args.limit * 500
    estimated_output_tokens = args.limit * 4000
    
    cost_input = (estimated_input_tokens / 1_000_000) * 0.15
    cost_output = (estimated_output_tokens / 1_000_000) * 0.60
    total_cost = cost_input + cost_output
    
    print(f"\n=== COST ANALYSIS ===")
    print(f"Estimated input tokens: {estimated_input_tokens:,}")
    print(f"Estimated output tokens: {estimated_output_tokens:,}")
    print(f"Estimated cost: ${total_cost:.3f}")
    print(f"Full 579 conditions cost estimate: ${(total_cost / args.limit) * 579:.2f}")
    
    print(f"\n=== COMPARISON ===")
    full_cost_mini = ((579 * 500 / 1_000_000) * 0.15) + ((579 * 4000 / 1_000_000) * 0.60)
    full_cost_gpt41 = ((579 * 500 / 1_000_000) * 2.00) + ((579 * 4000 / 1_000_000) * 8.00)
    
    print(f"Full project cost with gpt-4o-mini: ${full_cost_mini:.2f}")
    print(f"Full project cost with gpt-4.1: ${full_cost_gpt41:.2f}")
    print(f"Savings with mini model: ${full_cost_gpt41 - full_cost_mini:.2f}")
    
    print(f"\n=== RECOMMENDATION ===")
    print("1. Review the generated test content quality")
    print("2. If quality is acceptable, consider gpt-4o-mini for full run")
    print("3. If higher quality needed, proceed with gpt-4.1")
    print("4. Test output is in: ../static/coreconditions/generated_test/")

if __name__ == "__main__":
    run_budget_test()
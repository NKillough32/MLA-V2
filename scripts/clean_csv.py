#!/usr/bin/env python3
"""
Clean the core_conditions.csv file
"""

import pandas as pd

def clean_csv():
    # Load the CSV with proper encoding
    df = pd.read_csv('../static/coreconditions/core_conditions.csv', encoding='latin-1')
    
    # Clean the data
    df.columns = [col.strip().replace('ÿ', '').replace('�', '') for col in df.columns]
    df['Domain'] = df['Domain'].str.strip().str.replace('ÿ', '').str.replace('�', '')  
    df['Core Conditions'] = df['Core Conditions'].str.strip().str.replace('ÿ', '').str.replace('�', '')
    
    # Remove empty rows
    df = df.dropna()
    df = df[df['Domain'].str.len() > 0]
    df = df[df['Core Conditions'].str.len() > 0]
    
    # Fix specific issues
    df.loc[df['Domain'] == 'Rheumatologyÿ', 'Domain'] = 'Rheumatology'
    df.loc[df['Core Conditions'].str.contains('Endocrine ,', na=False), 'Domain'] = 'Endocrine'
    
    # Remove duplicate entries
    df = df.drop_duplicates()
    
    # Sort by domain then condition
    df = df.sort_values(['Domain', 'Core Conditions'])
    
    print(f'Cleaned CSV: {len(df)} rows')
    print(f'Unique conditions: {len(df["Core Conditions"].unique())}')
    print(f'Unique domains: {len(df["Domain"].unique())}')
    
    # Save cleaned version
    df.to_csv('../static/coreconditions/core_conditions_clean.csv', index=False, encoding='utf-8')
    print('Saved cleaned CSV to core_conditions_clean.csv')
    
    # Show sample
    print('\nSample data:')
    print(df.head(10))
    
    # Show domains
    print('\nDomains:')
    print(df['Domain'].value_counts())

if __name__ == "__main__":
    clean_csv()
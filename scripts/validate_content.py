#!/usr/bin/env python3
"""
Validate existing generated content and identify any issues
"""

import json
import os
from pathlib import Path
from typing import Dict, List

class ContentValidator:
    def __init__(self, generated_dir: str = "../static/coreconditions/generated"):
        self.generated_dir = Path(generated_dir)
        self.issues = []
        
    def validate_file(self, file_path: Path) -> Dict:
        """Validate a single condition file"""
        issues = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Check required top-level fields
            required_fields = ['id', 'name', 'domains', 'content']
            for field in required_fields:
                if field not in data:
                    issues.append(f"Missing required field: {field}")
            
            # Check content structure
            if 'content' in data:
                content = data['content']
                
                # Check overview
                if 'overview' in content:
                    if not content['overview'].get('definition'):
                        issues.append("Missing definition in overview")
                
                # Check recognition
                if 'recognition' in content:
                    recognition = content['recognition']
                    if not recognition.get('symptoms'):
                        issues.append("Missing symptoms in recognition")
                    if not recognition.get('signs'):
                        issues.append("Missing signs in recognition")
                
                # Check management
                if 'management' in content:
                    management = content['management']
                    if 'acute' in management:
                        if not management['acute'].get('firstLine'):
                            issues.append("Missing acute first-line management")
                
                # Check Foundation doctor role
                if not content.get('foundationDoctorRole'):
                    issues.append("Missing Foundation doctor role")
            
            return {
                "file": file_path.name,
                "condition": data.get('name', 'Unknown'),
                "valid": len(issues) == 0,
                "issues": issues,
                "size_kb": file_path.stat().st_size / 1024
            }
            
        except json.JSONDecodeError as e:
            return {
                "file": file_path.name,
                "condition": "Unknown",
                "valid": False,
                "issues": [f"JSON decode error: {e}"],
                "size_kb": 0
            }
        except Exception as e:
            return {
                "file": file_path.name,
                "condition": "Unknown", 
                "valid": False,
                "issues": [f"Error reading file: {e}"],
                "size_kb": 0
            }
    
    def validate_all(self) -> Dict:
        """Validate all condition files"""
        print(f"Validating files in: {self.generated_dir}")
        
        if not self.generated_dir.exists():
            print("Generated directory does not exist")
            return {"total": 0, "valid": 0, "invalid": 0, "results": []}
        
        json_files = list(self.generated_dir.glob("*.json"))
        # Filter out index files
        condition_files = [f for f in json_files if not f.name.startswith("index")]
        
        print(f"Found {len(condition_files)} condition files to validate")
        
        results = []
        valid_count = 0
        
        for file_path in condition_files:
            result = self.validate_file(file_path)
            results.append(result)
            
            if result['valid']:
                valid_count += 1
            else:
                print(f"❌ {result['condition']} ({result['file']})")
                for issue in result['issues']:
                    print(f"   - {issue}")
        
        summary = {
            "total": len(condition_files),
            "valid": valid_count,
            "invalid": len(condition_files) - valid_count,
            "results": results
        }
        
        print(f"\n{'='*50}")
        print("VALIDATION SUMMARY")
        print(f"{'='*50}")
        print(f"Total files: {summary['total']}")
        print(f"Valid files: {summary['valid']}")
        print(f"Invalid files: {summary['invalid']}")
        print(f"Success rate: {(summary['valid']/summary['total']*100) if summary['total'] > 0 else 0:.1f}%")
        
        if summary['invalid'] > 0:
            print(f"\nFiles with issues:")
            for result in results:
                if not result['valid']:
                    print(f"  - {result['condition']} ({result['file']})")
        
        # Size analysis
        sizes = [r['size_kb'] for r in results if r['size_kb'] > 0]
        if sizes:
            avg_size = sum(sizes) / len(sizes)
            min_size = min(sizes)
            max_size = max(sizes)
            print(f"\nFile size analysis:")
            print(f"  Average: {avg_size:.1f} KB")
            print(f"  Range: {min_size:.1f} - {max_size:.1f} KB")
        
        return summary

if __name__ == "__main__":
    validator = ContentValidator()
    validator.validate_all()
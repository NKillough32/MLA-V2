"""
Script to extract complete examination database from V1 and update V2 data file
"""

# Read the V1 app.js file
with open('V1/app.js', 'r', encoding='utf-8') as f:
    v1_lines = f.readlines()

# Find the start and end of the examinationDatabase object
start_line = None
end_line = None

for i, line in enumerate(v1_lines):
    if 'const examinationDatabase = {' in line:
        start_line = i
    if start_line is not None and line.strip() == '};' and i > 18900:
        # The closing brace for the database (around line 18998)
        end_line = i + 1
        break

if start_line and end_line:
    print(f"Found database from line {start_line + 1} to line {end_line + 1}")
    
    # Extract the database content
    db_lines = v1_lines[start_line:end_line]
    
    # Replace 'const examinationDatabase = {' with just the opening brace for export
    db_content = ''.join(db_lines)
    db_content = db_content.replace('const examinationDatabase = {', '{', 1)
    
    # Create the new examinationGuides.js file
    new_file_content = '''/**
 * Clinical Examination Guides Database
 * Extracted from V1 for V2 independence
 * Contains systematic examination approaches for major body systems
 */

export const examinationGuides = ''' + db_content + '''

// Export helper functions
export function searchExaminations(query) {
    const results = [];
    const searchTerm = query.toLowerCase();
    
    Object.keys(examinationGuides).forEach(key => {
        const exam = examinationGuides[key];
        if (exam.title.toLowerCase().includes(searchTerm) || 
            exam.category.toLowerCase().includes(searchTerm)) {
            results.push({ key, ...exam });
        }
        
        // Search within sections
        if (exam.sections) {
            Object.keys(exam.sections).forEach(sectionKey => {
                const section = exam.sections[sectionKey];
                if (section.name.toLowerCase().includes(searchTerm) ||
                    section.technique.toLowerCase().includes(searchTerm)) {
                    results.push({ 
                        key,
                        section: sectionKey, 
                        parentTitle: exam.title,
                        ...section 
                    });
                }
            });
        }
    });
    
    return results;
}

export function getExaminationsByCategory(category) {
    return Object.keys(examinationGuides)
        .filter(key => examinationGuides[key].category === category)
        .map(key => ({ key, ...examinationGuides[key] }));
}

export function getAllCategories() {
    const categories = new Set();
    Object.values(examinationGuides).forEach(exam => {
        categories.add(exam.category);
    });
    return Array.from(categories).sort();
}
'''
    
    # Write the new file
    with open('static/js/data/examinationGuides.js', 'w', encoding='utf-8') as f:
        f.write(new_file_content)
    
    print("✅ Successfully updated examinationGuides.js")
    print(f"Extracted {len(db_lines)} lines from V1")
    print(f"New file length: {len(new_file_content.splitlines())} lines")
    
    # Count examinations
    examinations = db_content.count("title:")
    print(f"Number of examination types: {examinations}")
else:
    print("❌ Could not find database boundaries")
    print(f"start_line: {start_line}, end_line: {end_line}")

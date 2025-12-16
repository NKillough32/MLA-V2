# Accurate drug comparison - handles multi-word names properly

# Parse CSV
$csv = Import-Csv "c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\drugs.csv"
$csvDrugs = @()

foreach($row in $csv) {
    $drugNames = $row.'Drug Name'
    $drugs = $drugNames -split ',\s*'
    
    foreach($drug in $drugs) {
        # Clean but preserve essential structure
        $clean = $drug.Trim()
        $clean = $clean -replace '\s*\([^)]*\)\s*', ''  # Remove parentheses
        $clean = $clean -replace '\?+', ''               # Remove question marks
        $clean = $clean -replace 'e\.g\.\s*', ''         # Remove e.g.
        $clean = $clean -replace '�.*', ''               # Remove special chars
        $clean = $clean.Trim()
        
        # Skip if starts with number or too short or contains "as"
        if ($clean -match '^\d' -or $clean -eq '' -or $clean.Length -lt 3) {
            continue
        }
        
        # Store original (with spaces/hyphens) and normalized version (no spaces)
        $normalized = $clean.ToLower() -replace '[\s\-]', ''
        $csvDrugs += [PSCustomObject]@{
            Original = $clean
            Normalized = $normalized
        }
    }
}

$csvDrugs = $csvDrugs | Sort-Object -Property Normalized -Unique
Write-Host "`nTotal unique drugs in CSV: $($csvDrugs.Count)" -ForegroundColor Green

# Parse drugDatabase.js - extract keys between quotes
$dbContent = Get-Content "c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\drugDatabase.js" -Raw
$matches = [regex]::Matches($dbContent, "^'([^']+)':\s*\{", [System.Text.RegularExpressions.RegexOptions]::Multiline)

$dbDrugs = @()
foreach($match in $matches) {
    $key = $match.Groups[1].Value
    $normalized = $key.ToLower() -replace '[\s\-]', ''
    $dbDrugs += [PSCustomObject]@{
        Original = $key
        Normalized = $normalized
    }
}

$dbDrugs = $dbDrugs | Sort-Object -Property Normalized -Unique
Write-Host "Total drugs in database: $($dbDrugs.Count)" -ForegroundColor Green

# Find truly missing drugs by comparing normalized names
$dbNormalizedSet = $dbDrugs.Normalized
$missing = $csvDrugs | Where-Object { $_.Normalized -notin $dbNormalizedSet }

Write-Host "`n=== TRULY MISSING DRUGS ($($missing.Count)) ===" -ForegroundColor Yellow
if ($missing.Count -gt 0) {
    $missing | ForEach-Object { Write-Host "  - $($_.Original)" -ForegroundColor Red }
} else {
    Write-Host "  All drugs from CSV are present in the database!" -ForegroundColor Green
}

# Show some examples of what's actually in the database
Write-Host "`n=== Sample of drugs in database ===" -ForegroundColor Cyan
$dbDrugs | Select-Object -First 10 | ForEach-Object { 
    $drugName = $_.Original
    Write-Host "  $drugName" 
}

# Compare drugs.csv with drugDatabase.js

# Parse CSV
$csv = Import-Csv "c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\drugs.csv"
$csvDrugs = @()

foreach($row in $csv) {
    $drugNames = $row.'Drug Name'
    # Split on commas and clean each drug name
    $drugs = $drugNames -split ',\s*'
    
    foreach($drug in $drugs) {
        # Remove parentheses content, question marks, etc
        $clean = $drug.Trim()
        $clean = $clean -replace '\s*\([^)]*\)\s*', ''
        $clean = $clean -replace '\?+', ''
        $clean = $clean -replace 'e\.g\.\s*', ''
        $clean = $clean -replace '�.*', ''
        $clean = $clean.Trim()
        
        # Skip numbers, percentages, and empty strings
        if ($clean -match '^\d' -or $clean -eq '' -or $clean.Length -lt 3) {
            continue
        }
        
        $csvDrugs += $clean.ToLower()
    }
}

$csvDrugs = $csvDrugs | Sort-Object -Unique
Write-Host "`nTotal unique drugs in CSV: $($csvDrugs.Count)" -ForegroundColor Green

# Parse drugDatabase.js
$dbContent = Get-Content "c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\drugDatabase.js" -Raw
$matches = [regex]::Matches($dbContent, "^'(\w+)':\s*\{", [System.Text.RegularExpressions.RegexOptions]::Multiline)
$dbDrugs = @()

foreach($match in $matches) {
    $dbDrugs += $match.Groups[1].Value.ToLower()
}

$dbDrugs = $dbDrugs | Sort-Object -Unique
Write-Host "Total drugs in database: $($dbDrugs.Count)" -ForegroundColor Green

# Find missing drugs
$missing = $csvDrugs | Where-Object { $_ -notin $dbDrugs }

Write-Host "`n=== DRUGS IN CSV BUT NOT IN DATABASE ($($missing.Count)) ===" -ForegroundColor Yellow
$missing | Sort-Object | ForEach-Object { Write-Host "  - $_" }

# Group by drug class for missing drugs
Write-Host "`n=== MISSING DRUGS BY CLASS ===" -ForegroundColor Cyan
foreach($row in $csv) {
    $drugNames = $row.'Drug Name' -split ',\s*'
    $hasMissing = $false
    $missingInClass = @()
    
    foreach($drug in $drugNames) {
        $clean = $drug.Trim() -replace '\s*\([^)]*\)\s*', '' -replace '\?+', '' -replace 'e\.g\.\s*', '' -replace '�.*', ''
        $clean = $clean.Trim().ToLower()
        
        if ($clean -in $missing) {
            $hasMissing = $true
            $missingInClass += $clean
        }
    }
    
    if ($hasMissing) {
        Write-Host "`n$($row.'Drug Class'):" -ForegroundColor White
        $missingInClass | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
    }
}

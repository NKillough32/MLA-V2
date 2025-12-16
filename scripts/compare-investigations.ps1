# Compare investigations.csv with labDatabase.js

# Read CSV and parse properly
$csvContent = Get-Content 'c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\docs\investigations.csv' -Raw
$lines = $csvContent -split "`n" | Where-Object { $_ -match '\S' }
$lines = $lines | Select-Object -Skip 1  # Skip header

$investigations = @{}
foreach ($line in $lines) {
    # Handle quoted fields with commas
    if ($line -match '^"([^"]+)",(.+)$') {
        $invName = $matches[1]
        $discipline = $matches[2].Trim()
    } elseif ($line -match '^([^,]+),(.+)$') {
        $invName = $matches[1].Trim()
        $discipline = $matches[2].Trim()
    } else {
        continue
    }
    
    if (-not $investigations.ContainsKey($discipline)) {
        $investigations[$discipline] = @()
    }
    $investigations[$discipline] += $invName
}

Write-Host "=== INVESTIGATIONS BY DISCIPLINE ===" -ForegroundColor Cyan
$investigations.Keys | Sort-Object | ForEach-Object {
    $discipline = $_
    Write-Host "`n$discipline ($($investigations[$discipline].Count)):" -ForegroundColor Yellow
    $investigations[$discipline] | Sort-Object | ForEach-Object {
        Write-Host "  - $_"
    }
}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total disciplines: $($investigations.Keys.Count)"
Write-Host "Total investigations: $(($investigations.Values | ForEach-Object { $_.Count } | Measure-Object -Sum).Sum)"

# Now check labDatabase.js for coverage
$labDbContent = Get-Content 'c:\Users\Nicho\Desktop\MLA-V2\MLA-V2\static\js\data\labDatabase.js' -Raw

# Extract section keys from labDatabase
$labSections = @()
if ($labDbContent -match "window\.labDatabase\s*=\s*\{([^}]+)\}") {
    # Try to find all keys at top level
    $matches = [regex]::Matches($labDbContent, "^\s*'([^']+)':\s*\{", [System.Text.RegularExpressions.RegexOptions]::Multiline)
    $labSections = $matches | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_ -ne '' }
}

Write-Host "`n=== LAB DATABASE SECTIONS ===" -ForegroundColor Cyan
$labSections | Sort-Object | ForEach-Object {
    Write-Host "  - $_"
}
Write-Host "Total sections in labDatabase: $($labSections.Count)"

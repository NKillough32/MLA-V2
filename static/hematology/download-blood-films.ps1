# PowerShell script to download free hematology blood film images
# Sources: 
#   - Wikimedia Commons (CC-licensed or Public Domain)
#   - ASH Image Bank (https://imagebank.hematology.org/) - Free with registration
# Run from the hematology folder

$ErrorActionPreference = "Continue"
$outputDir = $PSScriptRoot

# Create output directory if needed
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

Write-Host "Downloading hematology blood film images..." -ForegroundColor Cyan
Write-Host "Output directory: $outputDir" -ForegroundColor Gray
Write-Host ""
Write-Host "Note: For high-quality educational images, also visit:" -ForegroundColor Yellow
Write-Host "  ASH Image Bank: https://imagebank.hematology.org/ (free, registration required)" -ForegroundColor Gray
Write-Host ""

# Image sources - Direct Wikimedia URLs (verified alternatives)
$images = @{
    # Microcytic Anemias
    "iron-deficiency.jpg" = "https://upload.wikimedia.org/wikipedia/commons/2/27/Iron_deficiency_anemia_blood_film.jpg"
    "thalassemia.jpg" = "https://upload.wikimedia.org/wikipedia/commons/a/a8/Thalassemia_beta.jpg"
    "target-cells.jpg" = "https://upload.wikimedia.org/wikipedia/commons/8/8b/Target_cells_in_asplenia.jpg"
    
    # Macrocytic Anemias
    "megaloblastic.jpg" = "https://upload.wikimedia.org/wikipedia/commons/2/28/Megaloblastic_anemia.jpg"
    "b12-deficiency.jpg" = "https://upload.wikimedia.org/wikipedia/commons/a/a6/Macrocytosis.jpg"
    "hypersegmented-neutrophil.jpg" = "https://upload.wikimedia.org/wikipedia/commons/9/94/Hypersegmented_Neutrophil.JPG"
    
    # Hemolytic Anemias
    "hereditary-spherocytosis.jpg" = "https://upload.wikimedia.org/wikipedia/commons/5/52/Hereditary_spherocytosis.jpg"
    "spherocytes.jpg" = "https://upload.wikimedia.org/wikipedia/commons/f/f0/Spherocytes_smear_2010-03-27.JPG"
    "sickle-cell.jpg" = "https://upload.wikimedia.org/wikipedia/commons/2/29/Sickle_cell_01.jpg"
    "g6pd-bite-cells.jpg" = "https://upload.wikimedia.org/wikipedia/commons/c/c9/Bite_cells.png"
    "schistocytes.jpg" = "https://upload.wikimedia.org/wikipedia/commons/c/c7/Schistocytes.jpg"
    "rouleaux.jpg" = "https://upload.wikimedia.org/wikipedia/commons/0/0a/Rouleaux_3.jpg"
    
    # Leukemias
    "aml-auer-rods.jpg" = "https://upload.wikimedia.org/wikipedia/commons/e/e8/Auer_rods_in_AML.jpg"
    "aml-blasts.jpg" = "https://upload.wikimedia.org/wikipedia/commons/5/5d/AML-M2.jpg"
    "all-blasts.jpg" = "https://upload.wikimedia.org/wikipedia/commons/8/8e/Acute_lymphoblastic_leukemia.jpg"
    "cml.jpg" = "https://upload.wikimedia.org/wikipedia/commons/4/47/Chronic_myelogenous_leukemia.jpg"
    "cll-smudge-cells.jpg" = "https://upload.wikimedia.org/wikipedia/commons/9/94/Chronic_lymphocytic_leukemia.jpg"
    
    # Myeloproliferative
    "polycythemia.jpg" = "https://upload.wikimedia.org/wikipedia/commons/5/56/Polycythemia_vera.jpg"
    "tear-drop-cells.jpg" = "https://upload.wikimedia.org/wikipedia/commons/6/69/Teardrop_cell_smear_2010-03-22.JPG"
    "essential-thrombocythemia.jpg" = "https://upload.wikimedia.org/wikipedia/commons/0/00/Thrombocytosis_blood_film.jpg"
    
    # Parasites
    "malaria-falciparum.jpg" = "https://upload.wikimedia.org/wikipedia/commons/d/de/Plasmodium_falciparum_01.png"
    "malaria-vivax.jpg" = "https://upload.wikimedia.org/wikipedia/commons/e/ee/Plasmodium_vivax_01.jpg"
    
    # Normal and other
    "normal-blood-film.jpg" = "https://upload.wikimedia.org/wikipedia/commons/2/2a/Red_White_Blood_cells.jpg"
    "basophilic-stippling.jpg" = "https://upload.wikimedia.org/wikipedia/commons/0/01/Basophilic_stippling_-_very_high_mag.jpg"
    "howell-jolly-bodies.jpg" = "https://upload.wikimedia.org/wikipedia/commons/e/e6/Howell-Jolly_body_-_closeup.jpg"
}

# Download each image
$success = 0
$failed = 0

foreach ($file in $images.GetEnumerator()) {
    $outputPath = Join-Path $outputDir $file.Key
    
    # Skip if already exists and has size
    if (Test-Path $outputPath) {
        $existingSize = (Get-Item $outputPath).Length
        if ($existingSize -gt 1000) {
            Write-Host "Skipping $($file.Key) (already exists, $([math]::Round($existingSize/1KB, 1)) KB)" -ForegroundColor Cyan
            $success++
            continue
        }
    }
    
    try {
        Write-Host "Downloading $($file.Key)..." -NoNewline
        
        # Use Invoke-WebRequest with proper headers and user agent
        $headers = @{
            'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        Invoke-WebRequest -Uri $file.Value -OutFile $outputPath -Headers $headers -UseBasicParsing -TimeoutSec 30 | Out-Null
        
        if (Test-Path $outputPath) {
            $fileSize = (Get-Item $outputPath).Length
            if ($fileSize -gt 0) {
                Write-Host " OK ($([math]::Round($fileSize/1KB, 1)) KB)" -ForegroundColor Green
                $success++
            } else {
                Write-Host " FAILED (empty file)" -ForegroundColor Red
                Remove-Item $outputPath -Force
                $failed++
            }
        } else {
            Write-Host " FAILED (not saved)" -ForegroundColor Red
            $failed++
        }
    }
    catch {
        Write-Host " FAILED ($($_.Exception.Message))" -ForegroundColor Red
        $failed++
    }
    
    Start-Sleep -Seconds 2  # Be nice to Wikimedia servers - avoid rate limiting
}

Write-Host "`nDownload complete!" -ForegroundColor Cyan
Write-Host "Success: $success | Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Yellow" })

if ($success -gt 0) {
    Write-Host "`nImages saved to: $outputDir" -ForegroundColor Gray
    Write-Host "See ATTRIBUTION.md for image credits and licenses" -ForegroundColor Gray
}

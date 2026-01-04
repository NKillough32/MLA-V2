# PowerShell script to download hematology images from multiple sources
# Sources:
#   - ASH Image Bank (https://imagebank.hematology.org/) - Free for educational use
#   - Sysmex Europe (https://www.sysmex-europe.com/academy/library/cell-images/) - Educational images
# To find image IDs: Visit the site, search for condition, copy image URL/ID

$ErrorActionPreference = "Continue"
$outputDir = $PSScriptRoot

Write-Host "Downloading from ASH Image Bank and Sysmex Europe..." -ForegroundColor Cyan
Write-Host "Output directory: $outputDir" -ForegroundColor Gray
Write-Host ""

# ASH Image Bank URLs - Format: @{ filename = "image_id" }
# To add more: Search on imagebank.hematology.org, copy the image ID from URL
$ashImages = @{
    # Example from user: basophilic-stippling
    "basophilic-stippling.jpg" = @{
        id = "66051"
        description = "basophilic-myelocyte"
    }
    
    # Add more images here by finding their IDs on ASH Image Bank
    # Search for the condition, click on image, copy the ID from URL
    # Example URL: https://imagebank.hematology.org/image/66051/basophilic-myelocyte?type=upload
    #              The ID is: 66051
    
    # "target-cells.jpg" = @{ id = "XXXXX"; description = "target-cells" }
    # "schistocytes.jpg" = @{ id = "XXXXX"; description = "schistocytes" }
    # etc...
}

# Download each image
$success = 0
$failed = 0
$skipped = 0

foreach ($file in $ashImages.GetEnumerator()) {
    $outputPath = Join-Path $outputDir $file.Key
    
    # Skip if already exists and has size
    if (Test-Path $outputPath) {
        $existingSize = (Get-Item $outputPath).Length
        if ($existingSize -gt 1000) {
            Write-Host "Skipping $($file.Key) (already exists)" -ForegroundColor Cyan
            $skipped++
            continue
        }
    }
    
    try {
        $imageId = $file.Value.id
        $description = $file.Value.description
        $url = "https://imagebank.hematology.org/image/${imageId}/${description}?type=upload"
        
        Write-Host "Downloading $($file.Key) (ID: $imageId)..." -NoNewline
        
        $headers = @{
            'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        Invoke-WebRequest -Uri $url -OutFile $outputPath -Headers $headers -UseBasicParsing -TimeoutSec 30 | Out-Null
        
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
    
    Start-Sleep -Seconds 1  # Be respectful to ASH servers
}

Write-Host "`nDownload complete!" -ForegroundColor Cyan
Write-Host "Success: $success | Skipped: $skipped | Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Yellow" })

if ($success -gt 0 -or $skipped -gt 0) {
    Write-Host "`nImages saved to: $outputDir" -ForegroundColor Gray
}

Write-Host "`nTo add more images:" -ForegroundColor Yellow
Write-Host "1. Visit https://imagebank.hematology.org/" -ForegroundColor Gray
Write-Host "2. Search for condition (e.g., 'schistocytes', 'rouleaux')" -ForegroundColor Gray
Write-Host "3. Click on a good image" -ForegroundColor Gray
Write-Host "4. Copy the image ID from URL (e.g., 66051 from .../image/66051/...)" -ForegroundColor Gray
Write-Host "5. Edit this script and add the ID to `$ashImages hashtable" -ForegroundColor Gray

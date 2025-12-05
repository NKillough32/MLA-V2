# PowerShell script to download free ophthalmology teaching images
# Sources: EyeWiki (AAO), Wikimedia Commons - all CC-licensed
# Run from the ophthalmology assets folder

$ErrorActionPreference = "Continue"
$outputDir = $PSScriptRoot

# Create output directory if needed
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

Write-Host "Downloading ophthalmology teaching images..." -ForegroundColor Cyan
Write-Host "Output directory: $outputDir" -ForegroundColor Gray

# Image sources - using Wikimedia Special:FilePath which handles redirects
# Format: @{ filename = "url" }
$images = @{
    # Retinal conditions
    "diabetic-retinopathy.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Fundus_photo_showing_scatter_laser_surgery_for_diabetic_retinopathy_EDA09.JPG"
    "crvo.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Central_retinal_vein_occlusion.jpg"
    "papilloedema.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Papilledema.jpg"
    "amd-drusen.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Intermediate_age_related_macular_degeneration.jpg"
    "glaucoma-cupping.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Cupping_of_the_optic_nerve_as_seen_in_glaucoma..jpg"
    
    # Anterior segment
    "cataract.png" = "https://commons.wikimedia.org/wiki/Special:FilePath/Cataract_in_human_eye.png"
    "hypopyon.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Hypopyon01.jpg"
    "hyphema.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Hyphema_-_occupying_half_of_anterior_chamber_of_eye.jpg"
    "pterygium.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Pterygium.jpg"
    "acute-angle-closure.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Acute_Angle_Closure-glaucoma.jpg"
    "corneal-ulcer.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Corneal_ulcer.JPG"
    
    # External eye
    "subconjunctival-haemorrhage.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Subconjunctival_hemorrhage.jpg"
    "conjunctivitis.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Swollen_eye_with_conjunctivitis.jpg"
    "chalazion.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Chalazion.JPG"
    "stye.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Stye02.jpg"
    "episcleritis.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Episcleritis.jpg"
    "scleritis.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Scleritis.jpg"
    
    # Pupils and motility
    "esotropia.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Childhood_esotropia.jpg"
    "ptosis.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Ptosis.jpg"
    "third-nerve-palsy.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/CN3_palsy.jpg"
    
    # Herpes and infections
    "dendritic-ulcer.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Dendritic_corneal_ulcer.jpg"
    "herpes-zoster-ophthalmicus.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Herpes_zoster_ophthalmicus.jpg"
    "orbital-cellulitis.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Orbital_cellulitis.jpg"
}

$successCount = 0
$failCount = 0

foreach ($image in $images.GetEnumerator()) {
    $filename = $image.Key
    $url = $image.Value
    $outputPath = Join-Path $outputDir $filename
    
    Write-Host "  Downloading $filename..." -NoNewline
    
    try {
        # Use Invoke-WebRequest with TLS 1.2
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        
        if (Test-Path $outputPath) {
            $fileSize = (Get-Item $outputPath).Length
            if ($fileSize -gt 1000) {
                Write-Host " OK ($([math]::Round($fileSize/1KB, 1)) KB)" -ForegroundColor Green
                $successCount++
            } else {
                Write-Host " FAILED (file too small)" -ForegroundColor Red
                Remove-Item $outputPath -Force -ErrorAction SilentlyContinue
                $failCount++
            }
        } else {
            Write-Host " FAILED" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host " FAILED ($($_.Exception.Message))" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "Download complete!" -ForegroundColor Cyan
Write-Host "  Success: $successCount" -ForegroundColor Green
Write-Host "  Failed: $failCount" -ForegroundColor $(if ($failCount -gt 0) { "Yellow" } else { "Green" })
Write-Host ""
Write-Host "Images saved to: $outputDir" -ForegroundColor Gray
Write-Host ""
Write-Host "IMPORTANT: These images are from Wikimedia Commons under CC licenses." -ForegroundColor Yellow
Write-Host "Please verify individual image licenses before redistribution." -ForegroundColor Yellow

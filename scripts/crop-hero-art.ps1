# Recorta solo hero + M 3D del mockup (sin barra "Marcas que confían" ni footer).
Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\public\brand\motans-reference-mockup.png"
$outPath = Join-Path $PSScriptRoot "..\public\brand\motans-hero-art.png"

$img = [System.Drawing.Image]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height

$cropX = 0
$cropY = 0
$cropW = $w
# Cortar ~14% inferior (trust bar del mockup)
$cropH = [int]($h * 0.86)

$bmp = New-Object System.Drawing.Bitmap $cropW, $cropH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$destRect = New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
Write-Output "Wrote $outPath (${cropW}x${cropH})"

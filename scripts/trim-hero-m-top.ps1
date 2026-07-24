Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\public\brand\motans-hero-m-sculpture.png"
$outPath = $srcPath

$img = [System.Drawing.Image]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height

# Quitar negro vacío arriba (~14%) para que la M ocupe más altura al anclar abajo
$cropY = [int]($h * 0.14)
$cropH = $h - $cropY

$bmp = New-Object System.Drawing.Bitmap $w, $cropH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = New-Object System.Drawing.Rectangle 0, $cropY, $w, $cropH
$destRect = New-Object System.Drawing.Rectangle 0, 0, $w, $cropH
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$img.Dispose()

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "Trimmed top 14% -> ${w}x${cropH}"

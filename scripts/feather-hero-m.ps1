Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\public\brand\motans-reference-mockup.png"
$outPath = Join-Path $PSScriptRoot "..\public\brand\motans-hero-m-feathered.png"

$img = [System.Drawing.Image]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height

# Solo hero: escultura + suelo reflectante; sin nav, scroll, marcas ni sección Nosotros
$cropX = [int]($w * 0.535)
$cropY = [int]($h * 0.128)
$cropW = [int]($w * 0.33)
$cropH = [int]($h * 0.58)

$bmp = New-Object System.Drawing.Bitmap $cropW, $cropH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$destRect = New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

# Fundir bordes laterales e inferior al negro; top limpio (sin fade arriba)
$fadeX = 64
$fadeBottom = 56
for ($y = 0; $y -lt $cropH; $y++) {
  for ($x = 0; $x -lt $cropW; $x++) {
    $c = $bmp.GetPixel($x, $y)
    $r = $c.R; $g = $c.G; $b = $c.B
    $max = [Math]::Max($r, [Math]::Max($g, $b))
    $min = [Math]::Min($r, [Math]::Min($g, $b))
    $sat = if ($max -eq 0) { 0 } else { ($max - $min) / $max }
    # Aplastar grises oscuros del mockup (evita franja con mix-blend lighten)
    if ($max -lt 48 -and $sat -lt 0.22) {
      $r = 0; $g = 0; $b = 0
    }
    $dx = [Math]::Min($x, $cropW - 1 - $x)
    $dyBottom = $cropH - 1 - $y
    $factor = 1.0
    if ($dx -lt $fadeX) {
      $factor = [Math]::Min($factor, [Math]::Pow($dx / $fadeX, 1.15))
    }
    if ($dyBottom -lt $fadeBottom) {
      $factor = [Math]::Min($factor, [Math]::Pow($dyBottom / $fadeBottom, 1.1))
    }
    if ($factor -lt 1.0) {
      $r = [int]($r * $factor)
      $g = [int]($g * $factor)
      $b = [int]($b * $factor)
    }
    $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
  }
}

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
Write-Output "Wrote $outPath (${cropW}x${cropH})"

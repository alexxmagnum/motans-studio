Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\public\brand\motans-reference-mockup.png"
$outPath = Join-Path $PSScriptRoot "..\public\brand\motans-hero-m-clean.png"

$img = [System.Drawing.Image]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height

# Solo la escultura M 3D: recorte ajustado, sin nav ni copy
$cropX = [int]($w * 0.54)
$cropY = [int]($h * 0.11)
$cropW = [int]($w * 0.44)
$cropH = [int]($h * 0.74)

$bmp = New-Object System.Drawing.Bitmap $cropW, $cropH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$destRect = New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$cx = $cropW / 2.0
$cy = $cropH / 2.15
$rx = $cropW * 0.46
$ry = $cropH * 0.48

for ($y = 0; $y -lt $cropH; $y++) {
  for ($x = 0; $x -lt $cropW; $x++) {
    $c = $bmp.GetPixel($x, $y)
    $r = $c.R
    $g2 = $c.G
    $b = $c.B

    # Negro puro en sombras — evita caja gris visible con mix-blend
    $lum = [Math]::Max($r, [Math]::Max($g2, $b))
    if ($lum -lt 28) {
      $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 0, 0, 0))
      continue
    }

    # Viñeta elíptica suave (sin bordes rectos)
    $nx = ($x - $cx) / $rx
    $ny = ($y - $cy) / $ry
    $dist = [Math]::Sqrt(($nx * $nx) + ($ny * $ny))
    if ($dist -gt 0.72) {
      $fade = [Math]::Min(1.0, [Math]::Max(0.0, (1.12 - $dist) / 0.4))
      $fade = [Math]::Pow($fade, 1.15)
      $r = [int]($r * $fade)
      $g2 = [int]($g2 * $fade)
      $b = [int]($b * $fade)
      $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g2, $b))
    }
  }
}

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
Write-Output "Wrote $outPath (${cropW}x${cropH})"

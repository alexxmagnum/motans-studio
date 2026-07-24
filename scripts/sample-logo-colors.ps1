Add-Type -AssemblyName System.Drawing
$srcPath = Join-Path $PSScriptRoot "..\public\brand\motans-m-studio.png"
$img = [System.Drawing.Image]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height

function Get-BrightestAtX($x) {
  $best = $null
  $bestScore = -1
  for ($y = [int]($h * 0.35); $y -lt [int]($h * 0.72); $y++) {
    $c = $img.GetPixel($x, $y)
    $max = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
    if ($max -lt 40) { continue }
    $min = [Math]::Min($c.R, [Math]::Min($c.G, $c.B))
    $sat = if ($max -eq 0) { 0 } else { ($max - $min) / $max }
    $score = $max + ($sat * 120)
    if ($score -gt $bestScore) {
      $bestScore = $score
      $best = $c
    }
  }
  return $best
}

Write-Output "Size: ${w}x${h}"
foreach ($xp in @(0.12, 0.22, 0.32, 0.42, 0.50, 0.58, 0.68, 0.78, 0.88)) {
  $x = [int]($w * $xp)
  $c = Get-BrightestAtX $x
  if ($null -eq $c) {
    Write-Output ("{0:P0} -> (no bright pixel)" -f $xp)
  } else {
    Write-Output ("{0:P0} -> #{1:X2}{2:X2}{3:X2}" -f $xp, $c.R, $c.G, $c.B)
  }
}
$img.Dispose()

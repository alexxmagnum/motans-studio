$r = Invoke-WebRequest -Uri "http://127.0.0.1:3001/" -UseBasicParsing -TimeoutSec 120
$out = Join-Path $env:TEMP "msh-home.html"
$r.Content | Out-File -FilePath $out -Encoding utf8
Write-Output "Status: $($r.StatusCode) Length: $($r.Content.Length)"
foreach ($pat in @("motans-hero-m-sculpture", "04a2fb", "msh-hero", "Creemos productos digitales", "Plataformas SaaS")) {
  if ($r.Content -match [regex]::Escape($pat)) { Write-Output "FOUND: $pat" } else { Write-Output "MISSING: $pat" }
}

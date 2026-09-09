<#
.SYNOPSIS
    VietStream Hub - API Health Check & Latency Benchmark
.DESCRIPTION
    Kiem tra tinh san sang (uptime), toc do phan hoi (latency) va tinh toan ven du lieu
    cua cac nguon phim Vietsub (OPhim, KKPhim, NguonC).
#>

[CmdletBinding()]
param ()

$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$sources = @(
    @{
        Name = "KKPhim / PhimAPI"
        Url  = "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1"
        Key  = "items"
    },
    @{
        Name = "NguonC API"
        Url  = "https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1"
        Key  = "items"
    }
)

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host "   VIETSTREAM HUB - HEALTH CHECK & LATENCY TEST        " -ForegroundColor Yellow
Write-Host "=======================================================" -ForegroundColor Cyan

$allHealthy = $true

foreach ($src in $sources) {
    Write-Host "`n[*] Dang kiem tra $($src.Name)..." -ForegroundColor Cyan
    Write-Host "    URL: $($src.Url)"
    
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $resp = Invoke-RestMethod -Uri $src.Url -Method Get -TimeoutSec 10 -UserAgent "VietStreamHub/1.0"
        $sw.Stop()
        
        $itemCount = 0
        if ($resp.items) {
            $itemCount = $resp.items.Count
        } elseif ($resp.data -and $resp.data.items) {
            $itemCount = $resp.data.items.Count
        }

        if ($itemCount -gt 0) {
            Write-Host "    [OK] ONLINE | Latency: $($sw.ElapsedMilliseconds)ms | Loaded: $itemCount titles" -ForegroundColor Green
        } else {
            Write-Host "    [!] WARN | Status 200 nhung khong tim thay danh sach phim" -ForegroundColor Yellow
            $allHealthy = $false
        }
    } catch {
        $sw.Stop()
        Write-Host "    [X] OFFLINE / TIMEOUT: $($_.Exception.Message)" -ForegroundColor Red
        $allHealthy = $false
    }
}

Write-Host "`n-------------------------------------------------------" -ForegroundColor Cyan
if ($allHealthy) {
    Write-Host "Ket luan: TAT CA NGUON PHIM HOAT DONG TOT!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "Ket luan: CO NGUON PHIM BI LOI HOAC CHAT LUONG KEM!" -ForegroundColor Yellow
    exit 1
}

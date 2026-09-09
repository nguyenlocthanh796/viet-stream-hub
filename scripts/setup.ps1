<#
.SYNOPSIS
    VietStream Hub - Bo cai dat 1-Click Phim Vietsub & Thong tin Addon cho Windows
.DESCRIPTION
    Tu dong cai dat Stremio, dang ky Addon nguon phim Viet Nam (KKPhim, NguonC)
    va hien thi huong dan tich hop Cloudstream cho dien thoai va Smart TV.
#>

[CmdletBinding()]
param (
    [switch]$SkipAppInstall = $false
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Clear-Host
Write-Host @"
===================================================================
     VietStream Hub - Trung Tam Phim 4K Vietsub & The Thao
           He sinh thai giai tri mien phi cho nguoi Viet
===================================================================
"@ -ForegroundColor Cyan

$AddonManifestUrl = "https://raw.githubusercontent.com/nguyenlocthanh796/viet-stream-hub/main/stremio/manifest.json"
$CloudstreamRepoUrl = "https://raw.githubusercontent.com/nguyenlocthanh796/viet-stream-hub/main/cloudstream/repo.json"

# 1. Kiem tra va cai dat Stremio tren Windows
if (-not $SkipAppInstall) {
    Write-Host "`n[1/3] Kiem tra ung dung xem phim Stremio tren may tinh..." -ForegroundColor Green
    $stremioPath = Join-Path $env:LOCALAPPDATA "Programs\LNV\Stremio-4\stremio.exe"
    if (Test-Path $stremioPath) {
        Write-Host "    -> Da tim thay Stremio tren may: $stremioPath" -ForegroundColor Cyan
    } else {
        Write-Host "    -> Stremio chua duoc cai dat. Dang tai ban cai dat chinh thuc..." -ForegroundColor Yellow
        $installerPath = Join-Path $env:TEMP "Stremio_Setup.exe"
        curl.exe -L --progress-bar -o $installerPath "https://dl.strem.io/stremio-shell-ng/v5.0.24/StremioSetup-v5.0.24_x64.exe"
        Write-Host "    -> Dang khoi chay trinh cai dat Stremio..." -ForegroundColor Cyan
        Start-Process $installerPath
        Write-Host "    -> Vui long hoan tat cai dat Stremio tren man hinh..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
    }
}

# 2. Dang ky Addon VietStream Hub vao Stremio
Write-Host "`n[2/3] Kich hoat kho nguon phim VietStream Hub vao Stremio..." -ForegroundColor Green
$stremioUri = "stremio://raw.githubusercontent.com/nguyenlocthanh796/viet-stream-hub/main/stremio/manifest.json"
Write-Host "    -> Duong dan Addon: $stremioUri" -ForegroundColor Cyan
try {
    Start-Process $stremioUri
    Write-Host "    -> [OK] Da mo Stremio! Hay bam 'Install' tren ung dung de xac nhan." -ForegroundColor Green
} catch {
    Write-Host "    [!] Khong the tu dong mo giao thuc stremio://. Hay copy link sau va dan vao o tim kiem Addon tren Stremio:" -ForegroundColor Yellow
    Write-Host "        $AddonManifestUrl" -ForegroundColor Cyan
}

# 3. Huong dan su dung Cloudstream cho Dien thoai & Smart TV
Write-Host "`n[3/3] HUONG DAN DANG KY CHO DIEN THOAI & SMART TV (CLOUDSTREAM)" -ForegroundColor Green
Write-Host "-------------------------------------------------------------------" -ForegroundColor Cyan
Write-Host "1. Mo app Cloudstream tren Dien thoai hoac Tivi."
Write-Host "2. Vao Cai dat (Settings) -> Tien ich mo rong (Extensions) -> Them kho luu tru (Add Repository)."
Write-Host "3. Nhap ten kho: VietStream Hub"
Write-Host "4. Nhap URL kho:"
Write-Host "   $CloudstreamRepoUrl" -ForegroundColor Yellow
Write-Host "-------------------------------------------------------------------" -ForegroundColor Cyan

Write-Host "`n[OK] HOAN TAT THIET LAP! CHUC BAN XEM PHIM VUI VE!" -ForegroundColor Green

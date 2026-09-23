# Script tu dong day du an Thi dua 9A4 len GitHub
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   TRIEN KHAI DU AN THI DUA LOP 9A4 LEN GITHUB" -ForegroundColor Yellow
Write-Host "   GVCN: Thay Vo Van Ha" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$gitCmdDir = "$env:LOCALAPPDATA\Programs\Git\cmd"
if (Test-Path "$gitCmdDir\git.exe") {
    $env:PATH = "$gitCmdDir;$env:PATH"
}

$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCmd) {
    Write-Host "[LOI] Khong tim thay Git tren he thong!" -ForegroundColor Red
    Read-Host "Nhan Enter de thoat..."
    exit 1
}

Set-Location -LiteralPath $PSScriptRoot

$userName = git config user.name
if (-not $userName) {
    git config user.name "Vo Van Ha"
    git config user.email "vovanha@users.noreply.github.com"
}

$currentOrigin = git remote get-url origin 2>$null
if (-not $currentOrigin) {
    Write-Host "[BUOC 1] Ban chua lien ket voi Repository GitHub nao." -ForegroundColor Yellow
    Write-Host "Vui long dan link Repository GitHub cua Thay vao day:" -ForegroundColor White
    Write-Host "(Vi du: https://github.com/vovanha/thidua-lop-9a4.git)" -ForegroundColor Gray
    Write-Host ""
    
    $repoUrl = Read-Host ">> Duong dan GitHub"
    if ($repoUrl) { 
        $repoUrl = $repoUrl.Trim() 
    }
    
    if ([string]::IsNullOrWhiteSpace($repoUrl)) {
        Write-Host ""
        Write-Host "[THONG BAO] Thay chua nhap link. Vui long chay lai file sau." -ForegroundColor Red
        Read-Host "Nhan Enter de thoat..."
        exit 1
    }
    
    git remote add origin $repoUrl
    Write-Host ">> Da lien ket voi: $repoUrl" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[*] Repository dang lien ket: $currentOrigin" -ForegroundColor Green
    Write-Host ""
}

Write-Host "[BUOC 2] Luu phien ban ma nguon moi nhat..." -ForegroundColor Cyan
git add .
$status = git status --porcelain
if ($status) {
    git commit -m "Cap nhat du an Thi dua Lop 9A4" | Out-Null
    Write-Host ">> Da tao ban ghi cap nhat." -ForegroundColor Green
} else {
    Write-Host ">> Ma nguon da o phien ban moi nhat." -ForegroundColor Gray
}

Write-Host ""
Write-Host "[BUOC 3] Dang tai ma nguon len nhanh main tren GitHub..." -ForegroundColor Cyan
Write-Host "(Neu co cua so trinh duyet bat len hoi xac nhan GitHub, Thay hay chon Authorize / Sign in)..." -ForegroundColor Gray
Write-Host ""

git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host " DAY LEN GITHUB THANH CONG!" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "De bat trang web truc tuyen (GitHub Pages):" -ForegroundColor Yellow
    Write-Host "1. Vao trang GitHub cua Repository vua tai len." -ForegroundColor White
    Write-Host "2. Nhan vao the Settings -> chon muc Pages o cot trai." -ForegroundColor White
    Write-Host "3. Tai muc Build and deployment:" -ForegroundColor White
    Write-Host "   - Source: chon 'Deploy from a branch'" -ForegroundColor White
    Write-Host "   - Branch: chon 'main', thu muc chon '/ (root)' -> bam 'Save'" -ForegroundColor White
    Write-Host "4. Sau khoang 1-2 phut, web se hoat dong tai link:" -ForegroundColor Yellow
    Write-Host "   https://[ten-tai-khoan].github.io/[ten-repo]/" -ForegroundColor Cyan
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Red
    Write-Host " [LOI] Day ma nguon that bai!" -ForegroundColor Red
    Write-Host "==========================================================" -ForegroundColor Red
    Write-Host "Nguyen nhan co the do:" -ForegroundColor Yellow
    Write-Host "1. Chua tao Repository tren GitHub hoac nhap sai duong link." -ForegroundColor White
    Write-Host "2. Khi tao Repository tren web GitHub, Thay da lo chon 'Add a README file'." -ForegroundColor White
    Write-Host "3. Trinh duyet chua dang nhap GitHub de xac thuc tai khoan." -ForegroundColor White
    Write-Host "==========================================================" -ForegroundColor Red
}

Write-Host ""
Read-Host "Nhan Enter de dong cua so..."

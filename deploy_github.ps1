# Script tu dong day du an Thi dua 9A4 len GitHub
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   TRIỂN KHAI DỰ ÁN THI ĐUA LỚP 9A4 LÊN GITHUB" -ForegroundColor Yellow
Write-Host "   GVCN: Thầy Võ Văn Hà" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# Thiet lap duong dan Git
$gitCmdDir = "$env:LOCALAPPDATA\Programs\Git\cmd"
if (Test-Path "$gitCmdDir\git.exe") {
    $env:PATH = "$gitCmdDir;$env:PATH"
}

$gitInstalled = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitInstalled) {
    Write-Host "[LỖI] Không tìm thấy Git trên hệ thống!" -ForegroundColor Red
    Write-Host "Vui lòng cài đặt Git hoặc khởi động lại máy." -ForegroundColor Yellow
    Read-Host "Nhấn Enter để thoát..."
    exit 1
}

# Di chuyen den thu muc chua du an
Set-Location -LiteralPath $PSScriptRoot

# Cau hinh Git user neu chua co
$userName = git config user.name
if (-not $userName) {
    git config user.name "Vo Van Ha"
    git config user.email "vovanha@users.noreply.github.com"
}

# Kiem tra remote origin
$currentOrigin = git remote get-url origin 2>$null
if (-not $currentOrigin) {
    Write-Host "[BƯỚC 1] Bạn chưa liên kết với Repository GitHub nào." -ForegroundColor Yellow
    Write-Host "Vui lòng dán link Repository GitHub của Thầy vào đây" -ForegroundColor White
    Write-Host "(Ví dụ: https://github.com/vovanha/thidua-lop-9a4.git)" -ForegroundColor Gray
    Write-Host ""
    
    $repoUrl = Read-Host ">> Đường dẫn GitHub"
    $repoUrl = $repoUrl.Trim()
    
    if ([string]::IsNullOrWhiteSpace($repoUrl)) {
        Write-Host ""
        Write-Host "[THÔNG BÁO] Thầy chưa nhập link. Vui lòng tạo repository trên GitHub trước rồi chạy lại file." -ForegroundColor Red
        Read-Host "Nhấn Enter để thoát..."
        exit 1
    }
    
    git remote add origin $repoUrl
    Write-Host ">> Đã liên kết với: $repoUrl" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[*] Repository đang liên kết: $currentOrigin" -ForegroundColor Green
    Write-Host ""
}

Write-Host "[BƯỚC 2] Lưu phiên bản mã nguồn mới nhất..." -ForegroundColor Cyan
git add .
$diff = git status --porcelain
if ($diff) {
    git commit -m "Cap nhat du an Thi dua Lop 9A4" | Out-Null
    Write-Host ">> Đã tạo bản ghi cập nhật." -ForegroundColor Green
} else {
    Write-Host ">> Mã nguồn đã ở phiên bản mới nhất." -ForegroundColor Gray
}

Write-Host ""
Write-Host "[BƯỚC 3] Đang tải mã nguồn lên nhánh 'main' trên GitHub..." -ForegroundColor Cyan
Write-Host "(Nếu có cửa sổ trình duyệt bật lên hỏi xác nhận GitHub, Thầy hãy chọn Authorize/Sign in)..." -ForegroundColor Gray
Write-Host ""

git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host " ĐẨY LÊN GITHUB THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Để bật trang web trực tuyến (GitHub Pages):" -ForegroundColor Yellow
    Write-Host "1. Vào trang GitHub của Repository vừa tải lên." -ForegroundColor White
    Write-Host "2. Nhấn vào thẻ Settings (bánh răng) -> chọn mục Pages ở cột trái." -ForegroundColor White
    Write-Host "3. Tại mục 'Build and deployment':" -ForegroundColor White
    Write-Host "   - Source: chọn 'Deploy from a branch'" -ForegroundColor White
    Write-Host "   - Branch: chọn 'main', thư mục chọn '/ (root)' -> bấm 'Save'" -ForegroundColor White
    Write-Host "4. Sau khoảng 1-2 phút, web sẽ hoạt động trực tuyến tại link:" -ForegroundColor Yellow
    Write-Host "   https://[ten-tai-khoan].github.io/[ten-repo]/" -ForegroundColor Cyan
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Red
    Write-Host " [LỖI] Đẩy mã nguồn thất bại!" -ForegroundColor Red
    Write-Host "==========================================================" -ForegroundColor Red
    Write-Host "Nguyên nhân có thể do:" -ForegroundColor Yellow
    Write-Host "1. Chưa tạo Repository trên GitHub hoặc nhập sai đường link." -ForegroundColor White
    Write-Host "2. Khi tạo Repository trên web GitHub, Thầy đã lỡ chọn 'Add a README file'." -ForegroundColor White
    Write-Host "   (Cách khắc phục: Xóa repo đó đi và tạo lại repo mới KHÔNG tích README)." -ForegroundColor Gray
    Write-Host "3. Trình duyệt chưa đăng nhập GitHub để xác thực tài khoản." -ForegroundColor White
    Write-Host "==========================================================" -ForegroundColor Red
}

Write-Host ""
Read-Host "Nhấn Enter để đóng cửa sổ..."

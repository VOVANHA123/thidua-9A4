@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ==========================================================
echo    TRIỂN KHAI DỰ ÁN THI ĐUA LỚP 9A4 LÊN GITHUB
echo    GVCN: Thầy Võ Văn Hà
echo ==========================================================
echo.

REM Đảm bảo đường dẫn Git được nhận diện
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"

where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [LỖI] Không tìm thấy Git trên hệ thống!
    pause
    exit /b 1
)

cd /d "%~dp0"

REM Kiểm tra remote origin
git remote get-url origin >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [BƯỚC 1] Bạn chưa liên kết với Repository GitHub nào.
    echo.
    echo Vui lòng dán link Repository GitHub của Thầy vào đây
    echo (Ví dụ: https://github.com/vovanha/thidua-9a4.git):
    set /p REPO_URL=">> Đường dẫn GitHub: "
    
    if "!REPO_URL!"=="" (
        echo [THÔNG BÁO] Thầy chưa nhập đường dẫn, vui lòng chạy lại file sau.
        pause
        exit /b 1
    )
    
    git remote add origin !REPO_URL!
    echo Đã thêm remote origin: !REPO_URL!
    echo.
) else (
    for /f "tokens=*" %%i in ('git remote get-url origin') do set CURRENT_REMOTE=%%i
    echo [*] Repository hiện tại: !CURRENT_REMOTE!
    echo.
)

echo [BƯỚC 2] Chuẩn bị mã nguồn và lưu phiên bản mới nhất...
git add .
git commit -m "Cap nhat du an Thi dua Lop 9A4" >nul 2>nul

echo [BƯỚC 3] Đang tải mã nguồn lên nhánh 'main' trên GitHub...
echo (Lưu ý: Nếu trình duyệt hiện popup yêu cầu đăng nhập GitHub, Thầy hãy bấm xác nhận)...
echo.
git branch -M main
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ==========================================================
    echo  ĐẨY LÊN GITHUB THÀNH CÔNG!
    echo.
    echo  Để bật trang web trực tuyến (GitHub Pages):
    echo  1. Vào trang GitHub của Repository
    echo  2. Chọn Settings -> Pages
    echo  3. Tại mục 'Build and deployment', chọn Source là 'Deploy from a branch'
    echo  4. Chọn Branch 'main', thư mục '/ (root)', rồi bấm Save.
    echo  Sau 1-2 phút, web sẽ hoạt động tại link:
    echo  https://[ten-tai-khoan].github.io/[ten-repo]/
    echo ==========================================================
) else (
    echo.
    echo ==========================================================
    echo [LỖI] Đẩy mã nguồn thất bại!
    echo Các nguyên nhân thường gặp:
    echo - Nhập sai đường dẫn Repository hoặc chưa tạo Repository trên GitHub.
    echo - Cần đăng nhập GitHub hoặc cấp quyền Personal Access Token.
    echo ==========================================================
)

echo.
pause

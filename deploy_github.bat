@echo off
setlocal enabledelayedexpansion
title Trien khai Du an Thi dua 9A4 len GitHub

echo ==========================================================
echo    TRIEN KHAI DU AN THI DUA LOP 9A4 LEN GITHUB
echo    GVCN: Thay Vo Van Ha
echo ==========================================================
echo.

set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"

where git >nul 2>nul
if errorlevel 1 goto :no_git

cd /d "%~dp0"

REM Kiem tra user git
git config user.name >nul 2>nul
if errorlevel 1 (
    git config user.name "Vo Van Ha"
    git config user.email "vovanha@users.noreply.github.com"
)

REM Kiem tra remote origin
git remote get-url origin >nul 2>nul
if errorlevel 1 goto :nhap_repo

for /f "tokens=*" %%i in ('git remote get-url origin') do set CURRENT_REMOTE=%%i
echo [*] Repository dang lien ket: !CURRENT_REMOTE!
echo.
goto :bat_dau_day

:nhap_repo
echo [BUOC 1] Ban chua lien ket voi Repository GitHub nao.
echo.
echo Vui long dan link Repository GitHub cua Thay vao day
echo (Vi du: https://github.com/vovanha/thidua-lop-9a4.git)
echo.
set /p REPO_URL=">> Duong dan GitHub: "

if "!REPO_URL!"=="" goto :chua_nhap_link

git remote add origin !REPO_URL!
echo.
echo Da them lien ket den: !REPO_URL!
echo.

:bat_dau_day
echo [BUOC 2] Luu phien ban ma nguon moi nhat...
git add .
git commit -m "Cap nhat du an Thi dua Lop 9A4" >nul 2>nul
echo Da cap nhat ma nguon.
echo.

echo [BUOC 3] Dang tai ma nguon len nhanh 'main' tren GitHub...
echo (Luu y: Neu co trinh duyet mo ra hoi dang nhap, Thay hay bam Authorize/Sign in)...
echo.

git branch -M main
git push -u origin main

if errorlevel 1 goto :that_bai
goto :thanh_cong

:thanh_cong
echo.
echo ==========================================================
echo  DAY LEN GITHUB THANH CONG!
echo ==========================================================
echo.
echo  Cac buoc bat trang web truc tuyen (GitHub Pages):
echo  1. Vao trang web GitHub cua repository vua tao
echo  2. Chon muc Settings (hinh banh rang) -^> chon muc Pages o cot trai
echo  3. Tai muc Build and deployment:
echo     - Source: chon 'Deploy from a branch'
echo     - Branch: chon 'main', thu muc chon '/ (root)', bam Save
echo  4. Sau 1-2 phut, trang web se hoat dong tai link:
echo     https://[ten-tai-khoan].github.io/[ten-repo]/
echo ==========================================================
goto :ket_thuc

:that_bai
echo.
echo ==========================================================
echo  [LOI] Day ma nguon len GitHub that bai!
echo ==========================================================
echo  Nguyen nhan thuong gap:
echo  1. Nhap sai link repo hoac chua tao repo tren web GitHub.
echo  2. Khi tao repo tren GitHub, da lo chon 'Add a README file'.
echo     (Khac phuc: Xoa repo cu tren web va tao lai KHONG tich README)
echo  3. Can dang nhap xac thuc tai khoan GitHub tren trinh duyet.
echo ==========================================================
goto :ket_thuc

:chua_nhap_link
echo.
echo [THONG BAO] Thay chua nhap duong dan. Vui long chay lai file sau.
goto :ket_thuc

:no_git
echo [LOI] Khong tim thay Git tren may tinh!
goto :ket_thuc

:ket_thuc
echo.
echo Nhan phim bat ky de dong cua so...
pause >nul

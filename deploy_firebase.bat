@echo off
echo ==========================================================
echo    XUAT BAN WEBSITE LEN GOOGLE FIREBASE HOSTING
echo    Bang Theo Doi Thi Dua Lop 9A4 - Thay Vo Van Ha
echo ==========================================================
echo.
echo Dang kiem tra va dua trang web len Firebase Hosting...
echo.

call npx -y firebase-tools deploy --only hosting

if %ERRORLEVEL% equ 0 (
    echo.
    echo ==========================================================
    echo  XUAT BAN THANH CONG LEN GOOGLE FIREBASE HOSTING!
    echo  Dia chi web chinh thuc cua lop:
    echo  https://thidua-lop-9a4-79dca.web.app
    echo  https://thidua-lop-9a4-79dca.firebaseapp.com
    echo ==========================================================
) else (
    echo.
    echo [THONG BAO] Neu chua dang nhap Google, vui long chay lenh:
    echo call npx -y firebase-tools login
    echo Sau do bam lai file nay de xuat ban!
)
echo.
pause

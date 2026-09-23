# Ứng Dụng Web Quản Lý Thi Đua Lớp Chủ Nhiệm 9A4 (Chibi Anime PWA)

Ứng dụng web PWA quản lý và theo dõi thi đua toàn diện, sinh động theo phong cách **Chibi Anime học đường tươi sáng**, thiết kế riêng cho lớp chủ nhiệm 9A4 của **Thầy Võ Văn Hà** (dễ dàng tùy biến tên lớp, GVCN và học sinh).

---

## ✨ Tính Năng Nổi Bật

1. 🌸 **Giao Diện Chibi Anime Rực Rỡ & Trải Nghiệm Tương Tác Cao**:
   - Tông màu Pastel dễ thương (Xanh dương, Hồng kẹo ngọt, Vàng cúp, Tím ruy băng).
   - Hiệu ứng thẻ kính Glassmorphism, đổ bóng mềm mại, animation mượt mà.
   - Hiệu ứng **pháo hoa Confetti** khi đạt danh hiệu 5 sao Xuất Sắc hoặc mở Bảng Vàng.
   - **Âm thanh Web Audio API** (Chuông ding-dong Chibi, ting thưởng, thud phạt, kèn fanfare vinh danh).

2. ⚙️ **Quản Lý & Tùy Biến Lớp Học Linh Hoạt**:
   - Thay đổi tên Lớp (VD: 9A4, 8B3, 9A1...) và tên Giáo viên chủ nhiệm.
   - Thêm / Sửa / Xóa học sinh, đổi tổ (Tổ 1 - 4), đổi chức vụ (Lớp trưởng, Lớp phó, Tổ trưởng, Thành viên).
   - Đặt lại mật khẩu tài khoản cho từng học sinh.
   - Lưu trữ tự động `localStorage` kèm tính năng khôi phục dữ liệu mẫu ban đầu.

3. 🔐 **Hệ Thống Phân Quyền 3 Cấp & Đăng Nhập Riêng Biệt**:
   - **Giáo viên chủ nhiệm (Thầy Võ Văn Hà - Admin)**: Toàn quyền chấm điểm 4 tổ, cài đặt lớp, xem Bảng Vàng, viết nhận xét tuần, phát thông báo Broadcast, xuất Excel và in ấn.
   - **Tổ trưởng (Tổ 1, 2, 3, 4)**: Chấm điểm nhanh thành viên trong tổ theo 12 tiêu chí.
   - **Học sinh (40 HS)**: Đăng nhập bằng Mã HS để theo dõi điểm số cá nhân, huy hiệu, biểu đồ, nhận tin nhắn riêng và gửi phản hồi.
   - **Thanh Quick Switcher (1-Click Demo)**: Chuyển đổi nhanh giữa GVCN, các Tổ trưởng và Học sinh mà không cần gõ mật khẩu khi demo.

4. 📱 **Nhận Tin Nhắn & Thông Báo Trên Điện Thoại (PWA Web Push)**:
   - Chuẩn **Progressive Web App (PWA)**: Có thể cài đặt trực tiếp lên màn hình chính điện thoại Android / iOS (*Add to Home Screen*).
   - Hỗ trợ **Web Push Notification API** & **Service Worker** hiển thị tin nhắn ngay trên màn hình khóa điện thoại.
   - Rung điện thoại (`navigator.vibrate`) khi có thông báo hoặc cộng/trừ điểm.

5. 📊 **Xuất Báo Cáo Excel & In Ấn A4 Chuẩn Đẹp**:
   - **Xuất file Excel/CSV** tiếng Việt chuẩn UTF-8 BOM (`\uFEFF`) không bị lỗi font khi mở trên Microsoft Excel.
   - **In ấn A4 ngang (@media print)**: Tối ưu khổ giấy A4 dán bảng tin lớp với tiêu đề, bảng 12 tiêu chí, ô nhận xét của Thầy Võ Văn Hà và chữ ký GVCN & Lớp trưởng.

---

## 🚀 Hướng Dẫn Triển Khai 1-Chạm Lên Vercel

Ứng dụng là **Static Web App** chuẩn tối ưu cho Vercel (đã có sẵn file cấu hình `vercel.json`):

### Cách 1: Triển khai qua GitHub (Khuyên dùng - Cập nhật tự động)
1. Đẩy toàn bộ thư mục mã nguồn lên một Repository GitHub của Thầy.
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
3. Bấm **"Add New..."** $\rightarrow$ **"Project"**.
4. Chọn repository vừa tạo và nhấn **"Deploy"**.
5. Trong vòng 10 giây, Vercel sẽ cung cấp một đường link website hoạt động vĩnh viễn (VD: `https://thidua-9a4.vercel.app`).

### Cách 2: Triển khai trực tiếp qua Vercel CLI
```bash
npm install -g vercel
vercel deploy --prod
```

---

## 📱 Hướng Dẫn Cài Đặt App Trên Điện Thoại

- **Trên iPhone / iPad (Safari)**: Mở đường link web $\rightarrow$ Bấm nút Chia sẻ (biểu tượng hình vuông có mũi tên lên) $\rightarrow$ Chọn **"Thêm vào Màn hình chính" (Add to Home Screen)**.
- **Trên Android (Chrome)**: Mở đường link web $\rightarrow$ Bấm menu 3 chấm ở góc trên bên phải $\rightarrow$ Chọn **"Cài đặt ứng dụng"** hoặc **"Thêm vào màn hình chính"**.

---

## 📋 Tài Khoản Đăng Nhập Mặc Định

| Vai trò | Tên học sinh | Tên tài khoản (Username / Mã HS) | Mật khẩu |
|---|---|---|---|
| **Giáo viên chủ nhiệm (GVCN)** | **Thầy Võ Văn Hà** | `admin` (hoặc `thayvovanha`, `thayha`) | `admin123` |
| **Tổ trưởng Tổ 1** | Nguyễn Ngọc Bảo Anh | `baoanh.nnb` (hoặc `9A401`) | `123456` |
| **Lớp trưởng** | Nguyễn Văn Bảo | `bao.nv` (hoặc `9A402`) | `123456` |
| **Tổ trưởng Tổ 2** | Nguyễn Văn Khang | `khang.nv` (hoặc `9A408`) | `123456` |
| **Lớp phó Học tập** | Võ Trọng Khang | `khang.vt` (hoặc `9A409`) | `123456` |
| **Tổ trưởng Tổ 3** | Lê Trần Quang Nghĩa | `nghia.ltq` (hoặc `9A415`) | `123456` |
| **Lớp phó Lao động** | Võ Quốc Nhựt | `nhut.vq` (hoặc `9A416`) | `123456` |
| **Tổ trưởng Tổ 4** | Huỳnh Nhật Tân | `tan.hn` (hoặc `9A422`) | `123456` |
| **29 Học sinh trong lớp** | 29 HS Lớp 9A4 | `9A401` $\rightarrow$ `9A429` | `123456` |
*(Thầy/Cô có thể đổi mật khẩu, phân lại tổ và chức vụ trong mục Cài Đặt Lớp)*

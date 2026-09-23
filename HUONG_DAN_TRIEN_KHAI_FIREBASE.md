# HƯỚNG DẪN TRIỂN KHAI & ĐỒNG BỘ THỜI GIAN THỰC GOOGLE FIREBASE (LỚP 9A4)
> **Dành cho:** Thầy Võ Văn Hà - Giáo viên chủ nhiệm Lớp 9A4 (Trường THCS Tây Phú)  
> **Khắc phục triệt để:** Vấn đề không lưu dữ liệu mới và không đồng bộ thời gian thực khi dùng Vercel tĩnh.

---

## 🌟 TẠI SAO GOOGLE FIREBASE LÀ GIẢI PHÁP TỐI ƯU NHẤT?

| Tiêu Chí | Vercel Tĩnh (Trước đây) | Google Firebase (Mới) |
| :--- | :--- | :--- |
| **Đồng bộ thời gian thực** | ❌ Không có (Phải tải lại trang) | ⚡ **Tức thì (< 0.2 giây qua WebSocket)** |
| **Lưu dữ liệu mới** | ❌ Dễ mất khi đổi máy/trình duyệt | 🔒 **Lưu vĩnh viễn trên Google Cloud** |
| **Độ ổn định** | ⚠️ Phụ thuộc dịch vụ tạm bên ngoài | 💎 **Hạ tầng 100% của Google, hoạt động 24/7** |
| **Chi phí** | Miễn phí | 🎁 **Hoàn toàn miễn phí 100% (Gói Spark)** |
| **Chế độ Ngoại tuyến (Offline)**| Kém | 📱 **Tự lưu trên máy và tự đồng bộ khi có mạng** |

---

## BƯỚC 1: TẠO CƠ SỞ DỮ LIỆU FIREBASE (Chỉ 2 Phút)

1. Thầy dùng trình duyệt (Chrome/Cốc Cốc) truy cập: **[https://console.firebase.google.com](https://console.firebase.google.com)** (đăng nhập bằng Gmail của Thầy).
2. Bấm nút **"Thêm dự án" (Add project)**:
   - Đặt tên dự án: `thidua-lop-9a4`
   - Bấm **Tiếp tục (Continue)** $\rightarrow$ Bỏ chọn Google Analytics $\rightarrow$ Bấm **Tạo dự án (Create project)**.
3. Khi dự án tạo xong, tại cột menu bên trái:
   - Bấm vào mục **Xây dựng (Build)** $\rightarrow$ Chọn **Realtime Database**.
   - Bấm nút **Tạo cơ sở dữ liệu (Create Database)**.
   - Vị trí cơ sở dữ liệu: Chọn **Singapore (asia-southeast1)** hoặc **Hoa Kỳ (us-central1)** $\rightarrow$ Bấm **Tiếp theo**.
   - Tại màn hình Quy tắc bảo mật: Chọn **Bắt đầu ở chế độ thử nghiệm (Start in test mode)** $\rightarrow$ Bấm **Bật (Enable)**.
4. Chuyển sang tab **Quy tắc (Rules)**, dán đoạn mã sau rồi bấm **Xuất bản (Publish)**:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
5. Nhìn lên trên cùng của bảng dữ liệu, Thầy sẽ thấy một đường link dạng:  
   `https://thidua-lop-9a4-default-rtdb.asia-southeast1.firebasedatabase.app` (hoặc `.firebaseio.com`).  
   👉 **Thầy sao chép đường link này lại!**

---

## BƯỚC 2: DÁN CẤU HÌNH VÀO ỨNG DỤNG THI ĐUA 9A4

1. Thầy mở ứng dụng **Thi Đua 9A4** $\rightarrow$ Đăng nhập tài khoản **Thầy Võ Văn Hà** (`admin123`).
2. Bấm vào nút **⚙️ Cài Đặt** trên thanh công cụ $\rightarrow$ Chọn tab **☁️ Máy Chủ Đám Mây**.
3. Tại ô **1. Database URL**: Thầy dán đường link vừa sao chép ở Bước 1 vào.
4. Bấm **"💾 Lưu Cấu Hình & Kết Nối Lại"**.
5. Bấm nút **"🧪 Kiểm Tra Kết Nối"** $\rightarrow$ Hệ thống hiện thông báo `🟢 Kết Nối Xuất Sắc!` là hoàn tất!
6. Bấm nút **"☁️ Lưu Toàn Bộ Dữ Liệu Lên Firebase Ngay"** để tải toàn bộ danh sách 29 học sinh và dữ liệu điểm ban đầu lên đám mây.

> 💡 **Từ nay về sau:** Bất cứ khi nào Thầy hoặc các bạn Tổ trưởng/Lớp phó chấm điểm trên điện thoại hay máy tính, **mọi thiết bị khác đang mở ứng dụng sẽ lập tức nhảy điểm và phát âm thanh sau 0.2 giây!**

---

## BƯỚC 3: ĐƯA WEBSITE LÊN INTERNET QUA FIREBASE HOSTING (Miễn Phí)

Nếu Thầy muốn có một tên miền miễn phí cực nhanh dạng `https://thidua-lop-9a4.web.app`:

### Cách A: Triển khai bằng lệnh (Khuyên Dùng)
Mở cửa sổ dòng lệnh PowerShell trong thư mục dự án và chạy:
```powershell
# 1. Cài đặt công cụ Firebase
npm install -g firebase-tools

# 2. Đăng nhập Google
firebase login

# 3. Đưa trang web lên mạng
firebase deploy
```
Sau 15 giây, Firebase sẽ cung cấp đường dẫn website chính thức cho Thầy và cả lớp:
👉 **`https://thidua-lop-9a4.web.app`**

---

## BƯỚC 4: HƯỚNG DẪN HỌC SINH CÀI ĐẶT LÊN ĐIỆN THOẠI

1. Học sinh mở đường link website trên điện thoại (Safari trên iPhone hoặc Chrome trên Android).
2. Bấm **Chia sẻ (Share) / Menu (⋮)** $\rightarrow$ Chọn **"Thêm vào Màn hình chính" (Add to Home Screen)**.
3. Biểu tượng **Thi Đua 9A4** sẽ xuất hiện trên màn hình điện thoại giống như một ứng dụng App Store / CH Play thực thụ.
4. Học sinh chọn tên mình trong danh sách và nhập mật khẩu mặc định `123456` để xem bảng xếp hạng và nhận thông báo thi đua của Thầy Hà.

# HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM) - LỚP 9A4
> **Triết lý:** *Kỷ luật trong cấu trúc (Udemy-discipline) – Rực rỡ trong cảm xúc thi đua (Chibi-joy).*  
> **Dự án:** Ứng dụng Quản lý & Theo dõi Thi đua Lớp 9A4 - Trường THCS Tây Phú  
> **Phiên bản:** 2.0 (Hybrid Edition: Udemy Tokens + Scholastic Chibi)

---

## 1. Triết lý Thiết kế (Design Philosophy)

1. **Thân thiện với lứa tuổi THCS (Gamified & Encouraging):**
   * Sử dụng màu sắc biểu trưng cho học đường: Vàng vinh danh (Gold), Xanh hy vọng (Azure), Hồng năng động (Cherry).
   * Khen thưởng rõ ràng, tôn vinh nỗ lực của từng học sinh bằng pháo hoa (Confetti), huy hiệu chibi và âm thanh sinh động.
2. **Kỷ luật cấu trúc chuẩn quốc tế (Lấy cảm hứng từ Udemy):**
   * Bảng màu mực trung tính chống mỏi mắt (`ink`, `paper`, `canvas`).
   * Hệ thống khoảng cách chuẩn **Base 4px** (`4, 8, 12, 16, 20, 24, 32px`).
   * Phân tầng bề mặt có chiều sâu tự nhiên, hạn chế lạm dụng đổ bóng đậm.
3. **Hai chế độ không gian (Dual-Zone Experience):**
   * **Không gian Học sinh:** Tươi vui, nút bấm to bo tròn dạng viên thuốc (Pill), dễ tương tác trên điện thoại.
   * **Không gian Giáo viên & In ấn:** Trang trọng, gọn gàng, viền mảnh hairline chuẩn mực sư phạm để xuất file PDF biên bản.

---

## 2. Hệ Thống Token Màu Sắc (Color Tokens)

### 2.1. Phân tầng bề mặt & Chữ viết (Neutral Surfaces - Kế thừa Udemy)
| Tên Token | Mã màu | Vai trò & Mục đích sử dụng |
| :--- | :--- | :--- |
| `--color-ink` | `#1e293b` | Màu chữ chính, tiêu đề (êm mắt hơn đen tuyền `#000`) |
| `--color-steel` | `#64748b` | Màu chữ phụ, nhãn ghi chú, hướng dẫn mờ |
| `--color-chalk` | `#e2e8f0` | Đường viền thẻ, đường kẻ hairline phân cách |
| `--color-canvas` | `#ffffff` | Bề mặt thẻ học sinh, nền form nhập liệu |
| `--color-paper` | `#f8fafc` | Nền khối phụ, thanh lọc tổ, dải ngăn cách các phần |
| `--color-porcelain`| `#f0f7ff` | Nền toàn trang (Canvas level 0), dịu mát học đường |

### 2.2. Điểm nhấn Thi đua & Trạng thái (Chromatic & Gamification Accents)
| Tên Token | Mã màu | Vai trò & Ý nghĩa |
| :--- | :--- | :--- |
| `--accent-gold` | `#f59e0b` | **Vàng Ánh Kim:** Cúp vinh danh, nút bấm chính CTA (Đăng nhập, Lưu) |
| `--accent-gold-light`| `#fde047` | Viền avatar, huy hiệu tỏa sáng |
| `--accent-azure` | `#3b82f6` | **Xanh Áo Trắng:** Nhận diện THCS Tây Phú, tab đang chọn |
| `--accent-cherry` | `#ec4899` | **Hồng Hoa Phượng:** Pháo hoa chibi, thông báo chúc mừng |
| `--accent-emerald`| `#10b981` | **Xanh Lá Tích Cực:** Điểm cộng thi đua, kết nối Firebase thành công |
| `--accent-crimson`| `#ef4444` | **Đỏ Cảnh Báo:** Điểm trừ vi phạm nội quy, thông báo lỗi |

---

## 3. Hệ Thống Kiểu Chữ (Typography Scale)

* **Font gia đình chính (Main Family):** `'Nunito', 'Quicksand', -apple-system, sans-serif`  
  *(Đường nét tròn trịa, nhân văn, dễ đọc, phù hợp lứa tuổi học sinh)*
* **Font in ấn biên bản (Print Family):** `'Times New Roman', serif` *(Quy chuẩn văn bản hành chính sư phạm)*

| Token Bước chữ | Kích thước | Chiều cao dòng (Line Height) | Độ đậm (Weight) | Ứng dụng |
| :--- | :---: | :---: | :---: | :--- |
| `--text-xs` | `12px` | `1.4` | `600` | Nhãn phụ, badge thời gian, chú thích nhỏ |
| `--text-sm` | `14px` | `1.5` | `600` | Chữ nội dung thẻ, tên học sinh trong bảng |
| `--text-base` | `16px` | `1.5` | `700` | Ô nhập mật khẩu, nhãn form, nút bấm phụ |
| `--text-lg` | `18px` | `1.4` | `800` | Tiêu đề khối thi đua, tên tổ trưởng |
| `--text-xl` | `20px` | `1.3` | `800` | Điểm tổng kết tuần, số thứ tự lớn |
| `--text-2xl` | `24px` | `1.25` | `900` | Tiêu đề trang đăng nhập, tên trường |

---

## 4. Nhịp Điệu Khoảng Cách & Bố Cục (Spacing & Grid)

> **Quy tắc Base 4px:** Mọi khoảng cách lề (margin), đệm (padding) và khoảng cách giữa các phần tử (gap) **bắt buộc** phải là bội số của 4px:

* `--space-4`: `4px` (Khoảng cách giữa icon và chữ)
* `--space-8`: `8px` (Khoảng đệm nội bộ badge, khoảng cách giữa các nút nhỏ)
* `--space-12`: `12px` (Đệm ô input di động, khoảng cách giữa các cột bảng)
* `--space-16`: `16px` (Đệm nội dung thẻ di động, khoảng cách giữa các hàng form)
* `--space-20`: `20px` (Khoảng cách giữa các khối chức năng trên điện thoại)
* `--space-24`: `24px` (Đệm nội dung thẻ trên máy tính, lề an toàn)
* `--space-32`: `32px` (Khoảng cách giữa các phân khu chính)

---

## 5. Quy Chuẩn Bo Góc (Border Radius) & Đổ Bóng (Shadows)

### Bo góc:
* `--radius-sm`: `6px` (Ô nhập liệu nhỏ, huy hiệu STT)
* `--radius-md`: `12px` (Ô input chính, dropdown chọn học sinh)
* `--radius-lg`: `18px` (Thẻ học sinh, khung thông tin tổ)
* `--radius-xl`: `24px` (Hộp đăng nhập chính `.login-portal-card`, popup modal)
* `--radius-pill`: `9999px` (Nút bấm, thanh chuyển tab, badge trạng thái máy chủ)

### Đổ bóng tinh tế:
* `--shadow-flat`: `0 1px 3px rgba(30, 41, 59, 0.06)` (Thẻ trên nền phẳng)
* `--shadow-card`: `0 8px 20px rgba(59, 130, 246, 0.08)` (Thẻ học sinh nổi bật)
* `--shadow-pop`: `0 15px 35px rgba(15, 23, 42, 0.22)` (Khung đăng nhập, modal pop-up)

---

## 6. Quy Tắc Ứng Xử Thành Phần (Component Do's and Don'ts)

### ✅ ĐƯỢC LÀM (DO)
1. **Nút bấm Hành động chính (Primary CTA):** Luôn dùng nền màu vàng kim nổi bật (`--accent-gold`), chữ trắng in hoa đậm (`font-weight: 800`), bo tròn kiểu viên thuốc (`radius-pill`).
2. **Mobile First:** Mọi màn hình phải căn giữa hoàn hảo, thẻ không bao giờ được tràn ra ngoài viền màn hình (chiều ngang tối thiểu kiểm thử: `360px`).
3. **Thanh lọc tổ & Tab:** Dùng thanh cuộn ngang cảm ứng mềm mại (`overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;`).
4. **Bảng thi đua:** Cố định cột STT và Cột Họ tên khi cuộn ngang trên điện thoại để luôn biết đang xem điểm của em nào.

### ❌ KHÔNG ĐƯỢC LÀM (DON'T)
1. **Không dùng màu đen tuyền `#000` cho giao diện web:** Thay bằng màu than mực `--color-ink` (`#1e293b`) để mắt học sinh không bị chói mỏi.
2. **Không biến nút bấm thành dạng viền rỗng đơn điệu (Ghost outline) cho học sinh:** Học sinh cấp 2 cần nhận biết nút bấm rõ ràng bằng khối màu.
3. **Không import thêm các thư viện CSS nặng nề:** Chỉ dùng Vanilla CSS thuần túy kế thừa từ bộ tokens này.
4. **Không bỏ qua tính năng In ấn (Print media):** Khi in biên bản sinh hoạt lớp, bắt buộc ẩn toàn bộ nút bấm, pháo hoa và chuyển font sang *Times New Roman* A4 tiêu chuẩn.

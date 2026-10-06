
function getWeeksInMonth(mVal) {
  const m = parseInt(mVal) || 9;
  const MONTHS_DEFINITION = {
    9: [1, 2, 3, 4],
    10: [5, 6, 7, 8],
    11: [9, 10, 11, 12],
    12: [13, 14, 15, 16],
    1: [17, 18],
    102: [19, 20, 21], // Tháng 1 HK2
    2: [22, 23],
    3: [24, 25, 26, 27],
    4: [28, 29, 30, 31, 32],
    5: [33, 34, 35]
  };
  return MONTHS_DEFINITION[m] || [1, 2, 3, 4];
}


// =========================================================================
// 🔒 KHÓA AN TOÀN NÚT RESET & XÓA SẠCH DỮ LIỆU LỚP
// =========================================================================
function toggleDangerZoneButtons() {
  const container = document.getElementById('danger-zone-buttons-container');
  const textEl = document.getElementById('danger-lock-text');
  const iconEl = document.getElementById('danger-lock-icon');
  const hintEl = document.getElementById('danger-zone-hint');

  if (!container) return;

  const isHidden = container.classList.contains('hidden');
  if (isHidden) {
    container.classList.remove('hidden');
    if (textEl) textEl.innerText = 'Ẩn Nút Xóa';
    if (iconEl) iconEl.setAttribute('data-lucide', 'unlock');
    if (hintEl) hintEl.innerText = '⚠️ Chú ý: Các thao tác xóa này không thể hoàn tác!';
  } else {
    container.classList.add('hidden');
    if (textEl) textEl.innerText = 'Hiện Nút Xóa';
    if (iconEl) iconEl.setAttribute('data-lucide', 'lock');
    if (hintEl) hintEl.innerText = '🔒 Hai nút thao tác nhạy cảm đang được ẩn an toàn để tránh bấm nhầm.';
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}


// =========================================================================
// 🚨 THANH THÔNG BÁO MÀU ĐỎ NỔI BẬT TRÊN MÀN HÌNH (STICKY RED ALERT SYSTEM)
// =========================================================================
let _redAlertTimer = null;

function showRedAlertBanner(title, message) {
  const banner = document.getElementById('sticky-red-alert-banner');
  const titleEl = document.getElementById('red-alert-title');
  const contentEl = document.getElementById('red-alert-content');

  if (!banner) return;

  if (titleEl) titleEl.innerText = title || 'GHI NHẬN THI ĐUA MỚI';
  if (contentEl) contentEl.innerText = message || 'Có thông tin cập nhật mới!';

  banner.classList.remove('hidden');

  if (_redAlertTimer) clearTimeout(_redAlertTimer);
  _redAlertTimer = setTimeout(() => {
    closeRedAlertBanner();
  }, 10000); // Tự động đóng sau 10 giây
}

function closeRedAlertBanner() {
  const banner = document.getElementById('sticky-red-alert-banner');
  if (banner) banner.classList.add('hidden');
}


// =========================================================================
// 🎭 HỆ THỐNG BIỂU CẢM CẢM XÚC HỌC SINH & PHỤ HUYNH (EMOTIONAL MOOD ENGINE)
// =========================================================================
function getConductEmotion(score, rankBadge = '') {
  const s = Number(score) || 100;
  if (s >= 95) {
    return {
      emoji: '🥳',
      animationClass: 'animate-bounce',
      glowColor: 'rgba(52, 211, 153, 0.9)',
      mood: 'Hân hoan (Rất vui)',
      title: 'Tốt Xuất Sắc',
      desc: 'Tuyệt vời! Em đang là tấm gương sáng của lớp!',
      parentDesc: 'Con đang duy trì nề nếp và học tập rất xuất sắc!',
      color: 'text-emerald-300',
      bgGradient: 'from-emerald-950/80 via-slate-900 to-slate-900',
      border: 'border-emerald-500/60',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    };
  } else if (s >= 86) {
    return {
      emoji: '😄',
      animationClass: 'animate-pulse',
      glowColor: 'rgba(74, 222, 128, 0.8)',
      mood: 'Vui vẻ',
      title: 'Tốt Vững Vàng',
      desc: 'Rất tốt! Em hãy tiếp tục giữ vững phong độ nhé!',
      parentDesc: 'Con rèn luyện nề nếp và học tập rất tốt!',
      color: 'text-emerald-400',
      bgGradient: 'from-emerald-950/60 via-slate-900 to-slate-900',
      border: 'border-emerald-500/50',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    };
  } else if (s >= 80) {
    return {
      emoji: '🙂',
      animationClass: 'animate-pulse',
      glowColor: 'rgba(251, 191, 36, 0.7)',
      mood: 'Khá ổn',
      title: 'Tốt (Cận Khá)',
      desc: 'Cố lên em nhé! Cần chú ý nề nếp để không bị rớt hạng!',
      parentDesc: '⚠️ Điểm số của con đang tiệm cận mức dưới, cần động viên con!',
      color: 'text-amber-400',
      bgGradient: 'from-amber-950/60 via-slate-900 to-slate-900',
      border: 'border-amber-500/50',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    };
  } else if (s >= 65) {
    return {
      emoji: '😕',
      animationClass: 'animate-pulse',
      glowColor: 'rgba(245, 158, 11, 0.7)',
      mood: 'Buồn nhẹ',
      title: 'Khá',
      desc: 'Em hãy nỗ lực khắc phục khuyết điểm để vươn lên mức Tốt nhé!',
      parentDesc: 'Con cần cố gắng nhiều hơn để cải thiện hạnh kiểm!',
      color: 'text-amber-500',
      bgGradient: 'from-amber-950/70 via-slate-900 to-slate-900',
      border: 'border-amber-500/60',
      badgeBg: 'bg-amber-500/30 text-amber-200 border-amber-500/50'
    };
  } else if (s >= 50) {
    return {
      emoji: '😟',
      animationClass: 'animate-bounce',
      glowColor: 'rgba(244, 63, 94, 0.8)',
      mood: 'Lo lắng',
      title: 'Đạt',
      desc: 'Cảnh báo nề nếp! Em cần chấn chỉnh ngay tuần tới!',
      parentDesc: '⚠️ Cảnh báo: Con bị trừ nhiều điểm nề nếp, phụ huynh cần phối hợp cùng GVCN!',
      color: 'text-rose-400',
      bgGradient: 'from-rose-950/70 via-slate-900 to-slate-900',
      border: 'border-rose-500/60',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    };
  } else {
    return {
      emoji: '😭',
      animationClass: 'animate-bounce',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      mood: 'Rất buồn (Báo động)',
      title: 'Chưa Đạt',
      desc: 'Báo động vi phạm! Em cần gặp trực tiếp GVCN để được hướng dẫn rèn luyện!',
      parentDesc: '🚨 Báo động: Hạnh kiểm chưa đạt! Kính mời phụ huynh liên hệ gấp với GVCN!',
      color: 'text-rose-500',
      bgGradient: 'from-rose-950/90 via-slate-900 to-slate-900',
      border: 'border-rose-600/80',
      badgeBg: 'bg-rose-600/30 text-rose-200 border-rose-600/50'
    };
  }
}


// =========================================================================
// 👨‍👩‍👧 CỔNG PHỤ HUYNH: BỘ ĐIỀU KHIỂN PHẠM VI XEM HẠNH KIỂM (TUẦN / THÁNG / HK / NĂM)
// =========================================================================
let parentViewScope = 'week';
let parentViewScopeValue = null;

function setParentViewScope(scope) {
  parentViewScope = scope;
  const curWeek = parseInt(appState.classInfo?.currentWeek) || 1;

  if (scope === 'week') {
    parentViewScopeValue = curWeek;
  } else if (scope === 'month') {
    parentViewScopeValue = getMonthFromWeek(curWeek);
  } else if (scope === 'semester') {
    parentViewScopeValue = curWeek <= 18 ? 1 : 2;
  } else if (scope === 'year') {
    parentViewScopeValue = 1;
  }

  ['week', 'month', 'semester', 'year'].forEach(s => {
    const btn = document.getElementById(`parent-scope-btn-${s}`);
    if (btn) {
      btn.className = s === scope
        ? 'py-1.5 text-xs font-bold rounded-xl text-white bg-indigo-600 shadow transition-all active:scale-95'
        : 'py-1.5 text-xs font-semibold rounded-xl text-slate-400 hover:text-white transition-all active:scale-95';
    }
  });

  const labelEl = document.getElementById('parent-scope-select-label');
  if (labelEl) {
    if (scope === 'week') labelEl.innerText = 'Chọn Tuần:';
    else if (scope === 'month') labelEl.innerText = 'Chọn Tháng:';
    else if (scope === 'semester') labelEl.innerText = 'Chọn Học Kỳ:';
    else if (scope === 'year') labelEl.innerText = 'Phạm Vi:';
  }

  renderParentScopeDetailSelector();
  renderParentPortalView();
}

function renderParentScopeDetailSelector() {
  const container = document.getElementById('parent-scope-detail-container');
  if (!container) return;

  const curWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  let html = '';

  if (parentViewScope === 'week') {
    const selectedW = (parentViewScopeValue !== null && parentViewScopeValue !== undefined) ? String(parentViewScopeValue) : String(curWeek);
    html = `<select id="parent-scope-select-val" onchange="onParentScopeValChange(this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-indigo-300 font-bold focus:outline-none focus:border-indigo-500">`;
    for (let w = 1; w <= (appState.classInfo?.totalWeeks || 18); w++) {
      const isSelected = String(w) === selectedW;
      const isLive = Number(w) === curWeek;
      html += `<option value="${w}" ${isSelected ? 'selected' : ''}>Tuần ${w}${isLive ? ' (Hiện tại)' : ''}</option>`;
    }
    html += `<option value="all" ${selectedW === 'all' ? 'selected' : ''}>📂 Tất cả các tuần (Lịch sử)</option>`;
    html += `</select>`;
  } else if (parentViewScope === 'month') {
    const selM = Number(parentViewScopeValue || getMonthFromWeek(curWeek));
    html = `
      <select id="parent-scope-select-val" onchange="onParentScopeValChange(this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500">
        <option value="9" ${selM === 9 ? 'selected' : ''}>Tháng 9 (Tuần 1 - 4)</option>
        <option value="10" ${selM === 10 ? 'selected' : ''}>Tháng 10 (Tuần 5 - 8)</option>
        <option value="11" ${selM === 11 ? 'selected' : ''}>Tháng 11 (Tuần 9 - 12)</option>
        <option value="12" ${selM === 12 ? 'selected' : ''}>Tháng 12 (Tuần 13 - 16)</option>
        <option value="1" ${selM === 1 ? 'selected' : ''}>Tháng 1 (Tuần 17 - 18)</option>
        <option value="102" ${selM === 102 ? 'selected' : ''}>Tháng 1 HK2 (Tuần 19 - 21)</option>
        <option value="2" ${selM === 2 ? 'selected' : ''}>Tháng 2 (Tuần 22 - 23)</option>
        <option value="3" ${selM === 3 ? 'selected' : ''}>Tháng 3 (Tuần 24 - 27)</option>
        <option value="4" ${selM === 4 ? 'selected' : ''}>Tháng 4 (Tuần 28 - 32)</option>
        <option value="5" ${selM === 5 ? 'selected' : ''}>Tháng 5 (Tuần 33 - 35)</option>
      </select>
    `;
  } else if (parentViewScope === 'semester') {
    const selSem = Number(parentViewScopeValue || (curWeek <= 18 ? 1 : 2));
    html = `
      <select id="parent-scope-select-val" onchange="onParentScopeValChange(this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-indigo-300 font-bold focus:outline-none focus:border-indigo-500">
        <option value="1" ${selSem === 1 ? 'selected' : ''}>Học Kỳ 1 (18 Tuần)</option>
        <option value="2" ${selSem === 2 ? 'selected' : ''}>Học Kỳ 2 (17 Tuần)</option>
      </select>
    `;
  } else if (parentViewScope === 'year') {
    html = `<span class="text-xs font-bold text-amber-300 block text-right pr-1">Toàn Năm Học (HK1 + HK2)</span>`;
  }

  container.innerHTML = html;
}

function onParentScopeValChange(val) {
  window._userExplicitlySelectedParentWeek = true;
  parentViewScopeValue = val;
  renderParentPortalView();
}

function buildSchoolHandoverMessage(sName, sCode, adminPin) {
  const appUrl = 'https://quan-li-lop-hoc-two.vercel.app/';
  const pin = adminPin || `${sCode}@34`;
  return `🏫 THÔNG TIN BÀN GIAO HỆ THỐNG SỔ THI ĐUA ĐIỆN TỬ
Trường: ${sName} (Mã Định Danh Trường: ${sCode})

1. Link Truy Cập Hệ Thống:
👉 ${appUrl}

2. Mật Khẩu Ban Giám Hiệu & Đoàn Trường:
🔑 MÃ PIN BGH: ${pin}

👉 HƯỚNG DẪN DÀNH CHO BGH & ĐOÀN TRƯỜNG:
- BGH mở link trên -> Chọn vai trò: "Ban Giám Hiệu / Quản Trị Trường".
- Chọn đúng tên trường [${sName}] -> Nhập mã PIN [${pin}] để đăng nhập.
- Vào mục "Quản Lý Lớp Học" để nạp danh sách các lớp và cấp mã PIN cho GVCN.

📌 QUY TẮC BẮT BUỘC ĐẶT MÃ LỚP & MÃ HỌC SINH (THEO MÃ TRƯỜNG [${sCode}]):
• 1. QUY TẮC MÃ LỚP = [Mã Trường: ${sCode}] + [Tên Lớp]
  Ví dụ:
  - Lớp 10A1 -> Mã Lớp là: ${sCode}10A1
  - Lớp 11B2 -> Mã Lớp là: ${sCode}11B2
  - Lớp 12C3 -> Mã Lớp là: ${sCode}12C3
  (GVCN đăng nhập chỉ cần gõ đúng Mã Lớp này và Mật khẩu do BGH cấp, mặc định là 1234).

• 2. QUY TẮC MÃ HỌC SINH = [Mã Trường: ${sCode}] + [Tên Lớp] + [Số Thứ Tự 2 chữ số]
  Ví dụ học sinh Lớp 10A1 (Mã Lớp ${sCode}10A1):
  - Em số 1: ${sCode}10A101
  - Em số 2: ${sCode}10A102
  - Em số 15: ${sCode}10A115
  - Em số 45: ${sCode}10A145
  (Mã này là tài khoản đăng nhập của Học sinh và Phụ huynh, mật khẩu mặc định: 123456).

Mọi thắc mắc kỹ thuật liên hệ Tác giả hệ thống: 0946775808 (Thầy Phạm Anh Dũng).`;
}


// =========================================================================
// 🚀 QUẢN TRỊ VIÊN TÁC GIẢ: TẠO TRƯỜNG MỚI TRỰC TIẾP TRÊN APP (LƯU SUPABASE)
// =========================================================================
async function createNewSchoolDirectly() {
  const codeEl = document.getElementById('gen-school-code');
  const nameEl = document.getElementById('gen-school-name');
  const pinEl = document.getElementById('gen-school-admin-pin');

  const code = String(codeEl?.value || '').trim().toUpperCase();
  const name = String(nameEl?.value || '').trim();
  const pin = String(pinEl?.value || `${code}@34`).trim();

  if (!code) {
    showToast('Vui lòng nhập Mã Trường (ví dụ: 27, 88)!', 'warning');
    codeEl?.focus();
    return;
  }
  if (!name) {
    showToast('Vui lòng nhập Tên Trường (ví dụ: Trường THPT Tân Châu)!', 'warning');
    nameEl?.focus();
    return;
  }

  const masterConfig = (typeof window !== 'undefined' && window.MASTER_SYSTEM_CONFIG) ? window.MASTER_SYSTEM_CONFIG : null;
  const authSchools = (masterConfig && Array.isArray(masterConfig.authorizedSchools)) ? masterConfig.authorizedSchools : [];

  // 1. KIỂM TRA TRÙNG MÃ TRƯỜNG ĐÃ TỒN TẠI
  const dupSchool = authSchools.find(s => String(s.schoolCode).trim().toUpperCase() === code);
  if (dupSchool) {
    const errMsg = `🚨 CẢNH BÁO TRÙNG MÃ TRƯỜNG!\n\n• Mã trường [${code}] ĐÃ TỒN TẠI trong hệ thống!\n• Đang thuộc về: "${dupSchool.schoolName}"\n• Mã PIN BGH hiện tại: ${dupSchool.adminPin || `${code}@34`}\n\n👉 Vui lòng chọn một Mã Trường khác (ví dụ: 27, 28, 29, 88, 95...) để tránh bị xung đột dữ liệu!`;
    showToast(`🚨 Lỗi: Mã Trường [${code}] đã trùng với "${dupSchool.schoolName}"!`, 'error');
    alert(errMsg);
    codeEl?.focus();
    return;
  }

  showToast('⚡ Đang khởi tạo trường mới trên Server Supabase...', 'info');

  // Việc tạo trường là quyền kỹ thuật: chỉ API server-side có service-role key mới được ghi.
  try {
    const response = await fetch('/api/super-admin-schools', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schoolCode: code, schoolName: name, adminPin: pin })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Không thể tạo trường.');
  } catch (e) {
    showToast(e.message || 'Phiên quản trị đã hết hạn hoặc máy chủ chưa được cấu hình.', 'error');
    return;
  }

  masterConfig.authorizedSchools.unshift({ schoolCode: code, schoolName: name, adminPin: pin, isNew: true });

  // Cập nhật dropdown chọn trường ở trang đăng nhập
  populateSchoolDropdownOptions(); loadAllSchoolsFromSupabase();

  // Chuẩn bị tin nhắn bàn giao gửi Zalo cho BGH trường mới kèm quy tắc đặt mã
  const appUrl = 'https://quan-li-lop-hoc-two.vercel.app/';
  _generatedHandoverText = buildSchoolHandoverMessage(name, code, pin);

  // Hiển thị thẻ kết quả
  const resCodeEl = document.getElementById('res-key-code');
  const resLinkEl = document.getElementById('res-school-link');
  if (resCodeEl) resCodeEl.innerText = `${code} (PIN BGH: ${pin})`;
  if (resLinkEl) resLinkEl.innerText = appUrl;
  document.getElementById('gen-result-card')?.classList.remove('hidden');

  renderSuperAdminSchoolsList();
  playNotificationChime(true);
  showToast(`🎉 Đã tạo thành công [${name}] (Mã ${code}) trên Server!`, 'success');

  // Reset input form
  if (codeEl) codeEl.value = '';
  if (nameEl) nameEl.value = '';
  if (pinEl) pinEl.value = '';
}

// Tự động tải tất cả các trường đã có trên Supabase để hiển thị
async function loadAllSchoolsFromSupabase() {
  try {
    const sb = getSupabaseClient();
    if (!sb) return;
    const { data: configs } = await sb.from('class_configs').select('school_code,school_name,admin_pin');
    if (configs && configs.length > 0) {
      const masterConfig = (typeof window !== 'undefined' && window.MASTER_SYSTEM_CONFIG) ? window.MASTER_SYSTEM_CONFIG : null;
      if (masterConfig && Array.isArray(masterConfig.authorizedSchools)) {
        configs.forEach(c => {
          const sc = String(c.school_code || '').trim().toUpperCase();
          if (sc) {
            const ap = String(c.admin_pin || `${sc}@34`).trim();
            const sName = String(c.school_name || `Trường Mã ${sc}`).trim();
            const existing = masterConfig.authorizedSchools.find(s => String(s.schoolCode).trim().toUpperCase() === sc);
            if (existing) {
              existing.adminPin = ap;
              existing.schoolName = sName;
            } else {
              masterConfig.authorizedSchools.unshift({
                schoolCode: sc,
                schoolName: sName,
                adminPin: ap,
                isDynamic: true
              });
            }
          }
        });
        populateSchoolDropdownOptions();
        renderSuperAdminSchoolsList();
      }
    }
  } catch (e) {
    console.warn('Lỗi load danh sách trường từ Supabase:', e);
  }
}


// =========================================================================
// 🛡️ BỘ KIỂM TRA & CHUẨN HÓA MÃ TRƯỜNG, MÃ LỚP, MÃ HỌC SINH (STRICT VALIDATION)
// =========================================================================
function validateAndFormatClassCode(inputCode, className, schoolCode) {
  const sCode = String(schoolCode || appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const cleanCls = getCleanClassCode(className || inputCode);
  const cleanInput = String(inputCode || '').replace(/lớp/gi, '').replace(/\s+/g, '').toUpperCase();

  const standardCode = `${sCode}${cleanCls}`;

  // Nếu người dùng không nhập hoặc chỉ nhập tên lớp ngắn (vd 10A2)
  if (!cleanInput || cleanInput === cleanCls) {
    return { valid: true, code: standardCode, formatted: true };
  }

  // Nếu nhập có mã trường nhưng sai mã trường (vd trường 87 mà nhập 9010A2)
  if (!cleanInput.startsWith(sCode)) {
    return {
      valid: false,
      code: standardCode,
      error: `🚨 LỖI SAI MÃ TRƯỜNG:\n\n• Mã trường bạn đang chọn là: [${sCode}]\n• Bạn đang nhập Mã: [${cleanInput}] (SAI MÃ TRƯỜNG!)\n\n👉 QUY ƯỚC CHUẨN BẮT BUỘC:\n[Mã Trường: ${sCode}] + [Tên Lớp: ${cleanCls}] = ${standardCode}\n\n💡 Vui lòng sửa lại mã bắt đầu bằng [${sCode}]!`
    };
  }

  return { valid: true, code: cleanInput, formatted: false };
}

function validateAndFormatStudentCode(inputCode, stt, className, schoolCode) {
  const sCode = String(schoolCode || appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const cleanCls = getCleanClassCode(className || appState.classInfo?.className || '10A1');
  const sttStr = String(stt).padStart(2, '0');
  const standardCode = `${sCode}${cleanCls}${sttStr}`;

  if (!inputCode) return standardCode;

  const clean = String(inputCode).trim().toUpperCase();
  if (!clean.startsWith(sCode)) {
    console.warn(`⚠️ Phát hiện Mã HS [${clean}] không khớp Mã Trường [${sCode}], tự động chuẩn hóa về [${standardCode}]`);
    return standardCode;
  }
  return clean;
}

// =========================================================================
// 🚀 SUPABASE HYBRID ENGINE & REALTIME WEBSOCKETS (TỨC THÌ 0.01 GIÂY)
// =========================================================================
function isSupabaseActive() {
  return true;
}

// Chỉ chấp nhận mã đầy đủ bắt đầu bằng một mã trường đã đăng ký. Ưu tiên mã dài
// nhất để không nhầm trường "1" với "10" hoặc "13".
function getSchoolCodeFromFullCode(value) {
  const code = String(value || '').trim().replace(/\s+/g, '').toUpperCase();
  const schools = (window.MASTER_SYSTEM_CONFIG?.authorizedSchools || [])
    .map(s => String(s.schoolCode || '').trim().toUpperCase())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  return schools.find(schoolCode => code.startsWith(schoolCode)) || '';
}

function getSupabaseClient() {
  // Database credentials are deliberately unavailable in the browser.
  return null;
}

// 📡 LẮNG NGHE THỜI GIAN THỰC (REALTIME WEBSOCKETS) TỪ SUPABASE

// =========================================================================
// 📡 ĐỒNG BỘ REALTIME KÉP: WEBSOCKET SUPABASE + SMART POLLING HEARTBEAT
// =========================================================================
let _realtimeHeartbeatTimer = null;
let _lastKnownMaxLogTimestamp = 0;

function initSupabaseRealtime() {
  if (_realtimeHeartbeatTimer) clearInterval(_realtimeHeartbeatTimer);
  _realtimeHeartbeatTimer = setInterval(() => {
    if (navigator.onLine && appState.currentRole) syncFromSecureApi(false);
  }, 3000);
  return;

  if (window._supabaseRealtimeChannel) {
    try { sb.removeChannel(window._supabaseRealtimeChannel); } catch (e) {}
  }

  // 1. KÊNH WEBSOCKET REALTIME TOÀN DIỆN (TẤT CẢ BẢNG DỮ LIỆU)
  const channel = sb.channel('public:school_realtime_' + Date.now())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'conduct_logs' }, payload => {
      if (payload.eventType === 'INSERT') {
        if (payload.new) handleIncomingConductLog(payload.new);
      } else if (payload.eventType === 'DELETE') {
        const delId = payload.old?.id;
        if (delId) {
          appState.logs = (appState.logs || []).filter(l => l.id !== delId);
          saveToLocalStorage();
          refreshAllRealtimeViews();
        }
      }
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, payload => {
      if (payload.eventType === 'INSERT' && payload.new) {
        handleIncomingAnnouncement(payload.new);
      } else if (payload.eventType === 'DELETE') {
        const delId = payload.old?.id;
        if (delId) {
          appState.classAnnouncements = (appState.classAnnouncements || []).filter(a => a.id !== delId);
          saveToLocalStorage();
          refreshAllRealtimeViews();
        }
      }
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, async () => {
      await syncFromSupabase();
      refreshAllRealtimeViews();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'class_configs' }, async () => {
      await syncFromSupabase();
      refreshAllRealtimeViews();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'school_classes' }, async () => {
      await syncFromSupabase();
      renderSchoolGvcnTable();
      renderSchoolDashboard();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'parent_feedbacks' }, async () => {
      await syncFromSupabase();
      renderParentFeedbacksList();
      renderParentPortalView();
    })
    .subscribe((status, err) => {
      console.log('📡 Trạng thái Realtime WebSocket Supabase:', status, err || '');
    });

  window._supabaseRealtimeChannel = channel;

  // 2. KÊNH DỰ PHÒNG CHỐNG RỚT MẠNG (SMART POLLING HEARTBEAT MỖI 3 GIÂY - PHÂN LUỒNG ĐÚNG LỚP)
  if (_realtimeHeartbeatTimer) clearInterval(_realtimeHeartbeatTimer);
  _realtimeHeartbeatTimer = setInterval(async () => {
    if (!navigator.onLine || !isSupabaseActive()) return;
    try {
      const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
      const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');

      let query = sb.from('conduct_logs').select('*').eq('school_code', sCode);
      if (appState.currentRole === 'gvcn' || appState.currentRole === 'student' || appState.currentRole === 'parent') {
        query = query.eq('class_name', curClass);
      }

      const { data: latestLogs } = await query
        .order('created_at', { ascending: false })
        .limit(3);

      if (latestLogs && latestLogs.length > 0) {
        latestLogs.forEach(l => {
          if (!appState.logs.some(existing => existing.id === l.id)) {
            handleIncomingConductLog(l);
          }
        });
      }
    } catch (e) {}
  }, 3000);
}

function handleIncomingConductLog(newLog) {
  if (!newLog || !newLog.id) return;

  const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');
  const logClass = getCleanClassCode(newLog.class_name || '');
  const logSchool = String(newLog.school_code || '').trim().toUpperCase();

  // 1. Lọc theo trường
  if (logSchool && logSchool !== sCode) return;

  // 2. Phân luồng chuẩn xác: GVCN / Học sinh / Phụ huynh chỉ nhận thông báo và dữ liệu của ĐÚNG LỚP ĐANG ĐĂNG NHẬP
  if (appState.currentRole === 'gvcn' || appState.currentRole === 'student' || appState.currentRole === 'parent') {
    if (logClass && logClass !== curClass) {
      // Bản ghi thuộc lớp khác trong cùng trường (ví dụ 11A8 khi đang ở 12A1) -> Bỏ qua, không lưu, không rung chuông
      return;
    }
  }

  if (_lastPlayedLogId === newLog.id) return;
  _lastPlayedLogId = newLog.id;

  const title = newLog.criteria_title || newLog.note || (newLog.type === 'plus' ? 'Khen thưởng thi đua' : 'Vi phạm nề nếp');
  const logObj = {
    id: newLog.id,
    week: parseInt(newLog.week) || 1,
    date: newLog.date || '',
    session: newLog.session || '',
    period: newLog.period || '',
    subject: newLog.subject || '',
    studentId: newLog.student_id,
    studentCode: newLog.student_code,
    studentName: newLog.student_name,
    team: parseInt(newLog.team) || 1,
    type: newLog.type,
    criteriaId: newLog.criteria_id || '',
    critId: newLog.criteria_id || '',
    criteriaTitle: title,
    critTitle: title,
    pts: Number(newLog.pts) || 0,
    note: newLog.note || '',
    recorder: newLog.recorder || '',
    className: newLog.class_name || curClass
  };

  // Thêm vào nhật ký nếu chưa có
  if (!appState.logs.some(l => l.id === logObj.id)) {
    appState.logs.unshift(logObj);
    saveToLocalStorage();
  }

  // QUY TẮC BẢO MẬT & ĐÚNG ĐỐI TƯỢNG (CHỈ THÔNG BÁO CHO: GVCN, BAN CÁN SỰ, CHÍNH HỌC SINH ĐÓ & PHỤ HUYNH EM ĐÓ)
  const isGvcn = appState.currentRole === 'gvcn';
  const isSchoolAdmin = appState.currentRole === 'school_admin' || appState.currentRole === 'doan_truong';
  const isTargetStudent = appState.currentRole === 'student' && appState.currentStudentCode && String(appState.currentStudentCode).toUpperCase() === String(logObj.studentCode).toUpperCase();
  const isTargetParent = appState.currentRole === 'parent' && appState.currentParentStudentCode && String(appState.currentParentStudentCode).toUpperCase() === String(logObj.studentCode).toUpperCase();

  // Kiểm tra quyền Ban cán sự lớp (Lớp trưởng / Lớp phó / Tổ trưởng của tổ học sinh này)
  let isClassLeaderForStudent = false;
  if (appState.currentRole === 'student' && appState.currentStudentCode) {
    const currentStudentObj = (appState.students || []).find(s => s.code && String(s.code).toUpperCase() === String(appState.currentStudentCode).toUpperCase());
    if (currentStudentObj) {
      const role = normalizeRole(currentStudentObj.role);
      if (role === 'monitor' || role === 'vice_monitor') {
        isClassLeaderForStudent = true; // Lớp trưởng / Lớp phó nhận thông báo
      } else if (role === 'leader' && Number(currentStudentObj.team) === Number(logObj.team)) {
        isClassLeaderForStudent = true; // Tổ trưởng nhận thông báo học sinh trong tổ mình
      }
    }
  }

  const shouldNotifyMe = isGvcn || isSchoolAdmin || isTargetStudent || isTargetParent || isClassLeaderForStudent;

  if (shouldNotifyMe) {
    playNotificationChime(true);

    const ptsText = logObj.pts > 0 ? `+${logObj.pts}đ` : `${logObj.pts}đ`;
    const alertTitle = logObj.type === 'plus' ? `🎉 KHEN THƯỞNG: ${logObj.studentName.toUpperCase()}` : `🚨 VI PHẠM: ${logObj.studentName.toUpperCase()}`;
    const alertMsg = `${logObj.critTitle} (${ptsText}) • Lớp ${logObj.className || curClass}`;

    showRedAlertBanner(alertTitle, alertMsg);

    if (isTargetStudent) {
      showToast(`🎉 Em vừa được ghi nhận: ${logObj.critTitle} (${ptsText})!`, logObj.type === 'plus' ? 'success' : 'warning');
    } else if (isTargetParent) {
      showToast(`📢 Con ${logObj.studentName} vừa được ghi nhận: ${logObj.critTitle} (${ptsText})!`, 'info');
    } else if (isGvcn) {
      showToast(`⚡ Ghi nhận thi đua: ${logObj.studentName} - ${logObj.critTitle} (${ptsText})`, logObj.type === 'plus' ? 'success' : 'warning');
    } else if (isClassLeaderForStudent) {
      showToast(`⭐ [Ban Cán Sự] ${logObj.studentName} (Tổ ${logObj.team}): ${logObj.critTitle} (${ptsText})`, 'info');
    }
  }

  refreshAllRealtimeViews();
}

function handleIncomingAnnouncement(newAnn) {
  if (!newAnn || !newAnn.id) return;
  const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');
  const annClass = getCleanClassCode(newAnn.class_name || '');
  const annSchool = String(newAnn.school_code || '').trim().toUpperCase();

  if (annSchool && annSchool !== sCode) return;

  if (appState.currentRole === 'gvcn' || appState.currentRole === 'student' || appState.currentRole === 'parent') {
    if (annClass && annClass !== curClass && newAnn.target !== 'all_school') {
      return;
    }
  }

  playNotificationChime(true);
  showToast(`📢 Thông báo mới: ${newAnn.title}`, 'info');

  const annObj = {
    id: newAnn.id,
    title: newAnn.title,
    content: newAnn.content,
    target: newAnn.target || 'all',
    className: newAnn.class_name || appState.classInfo?.className || '10A1',
    author: newAnn.author || (newAnn.content && newAnn.content.includes('AI') ? 'Trợ Lý AI & GVCN' : 'GVCN'),
    date: newAnn.date || '',
    createdAt: newAnn.created_at || new Date().toISOString(),
    timestamp: newAnn.created_at ? new Date(newAnn.created_at).getTime() : Date.now()
  };

  if (!Array.isArray(appState.classAnnouncements)) appState.classAnnouncements = [];
  if (!Array.isArray(appState.announcements)) appState.announcements = [];

  if (!appState.classAnnouncements.some(a => a.id === annObj.id)) {
    appState.classAnnouncements.unshift(annObj);
  }
  if (!appState.announcements.some(a => a.id === annObj.id)) {
    appState.announcements.unshift(annObj);
  }
  saveToLocalStorage();
  refreshAllRealtimeViews();
}


function refreshAllRealtimeViews() {
  const currentWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  if (!leaderboardScopeValue) leaderboardScopeValue = currentWeek;

  renderStudentList();
  renderLeaderboard();
  renderLogs();
  if (appState.currentRole === 'student') renderStudentPortalView();
  if (appState.currentRole === 'parent') renderParentPortalView();
  updateReportCardPreview();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function secureApi(path, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'x-sync-secret': 'THIDUA9A4_SECURE_TOKEN_2026_TP'
  };
  const response = await fetch(path, { credentials: 'same-origin', cache: 'no-store', ...options, headers: { ...defaultHeaders, ...(options.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Yêu cầu không thành công.');
  return data;
}

async function secureLogin(role, fields) {
  return secureApi('/api/app-auth', { method: 'POST', body: JSON.stringify({ role, ...fields }) });
}

async function syncFromSecureApi(render = true) {
  if (!appState.currentRole) return false;
  const className = getCleanClassCode(appState.classInfo?.className || '');
  try {
    const result = await secureApi(`/api/app-data?className=${encodeURIComponent(className)}`);
    const cfg = (result.configs || []).find(v => getCleanClassCode(v.class_name) === className) || result.configs?.[0];
    if (cfg) {
      const selectedWeek = Number(appState.classInfo?.currentWeek);
      const databaseWeek = Number(cfg.current_week);
      const resolvedWeek = selectedWeek >= 1 && selectedWeek <= 35
        ? selectedWeek
        : (databaseWeek >= 1 && databaseWeek <= 35 ? databaseWeek : getRealTimeCurrentWeek());
      appState.classInfo = { ...appState.classInfo, schoolCode:cfg.school_code, className:cfg.class_name||className, schoolName:cfg.school_name||appState.classInfo.schoolName, teacherName:cfg.teacher_name||'', baseScore:Number(cfg.base_score)||100, currentWeek:resolvedWeek, totalWeeks:Number(cfg.total_weeks)||35, conductConfig:cfg.conduct_config||{}, teacherNote:cfg.teacher_note||'' };
      if (Array.isArray(cfg.conduct_config?.customCriteria)) appState.criteria = cfg.conduct_config.customCriteria;
    }
    appState.students = (result.students || []).map(v => ({ id:v.id, schoolCode:v.school_code, code:v.code, name:v.name, team:Number(v.team)||1, role:normalizeRole(v.role), className:v.class_name, classCode:v.class_code }));
    appState.logs = (result.logs || []).map(l => ({ id:l.id, week:Number(l.week)||1, date:l.date||'', exactDate:l.date||'', session:l.session||'', period:l.period||'', subject:l.subject||'', studentId:l.student_id, studentCode:l.student_code, studentName:l.student_name, team:Number(l.team)||1, type:l.type, criteriaId:l.criteria_id||'', critId:l.criteria_id||'', criteriaTitle:l.criteria_title||l.note||'', critTitle:l.criteria_title||l.note||'', pts:Number(l.pts)||0, note:l.note||'', recorder:l.recorder||'', loggedBy:l.recorder||'', timestamp:l.created_at?new Date(l.created_at).getTime():Date.now(), className:l.class_name }));
    appState.schoolClasses = (result.classes || []).map(v => ({ schoolCode:v.school_code, classCode:v.class_code, className:v.class_name, teacherName:v.teacher_name, studentCount:v.student_count }));
    appState.announcements = (result.announcements || []).map(a => ({ id:a.id,title:a.title,content:a.content,target:a.target||'all',className:a.class_name,date:a.date||'',createdAt:a.created_at,timestamp:a.created_at?new Date(a.created_at).getTime():Date.now() }));
    appState.classAnnouncements = appState.announcements;
    appState.parentFeedbacks = (result.feedbacks || []).map(f => ({ id:f.id,studentCode:f.student_code,studentName:f.student_name,parentName:f.parent_name,content:f.content,reply:f.reply||'',replyTeacher:f.reply_teacher||'',className:f.class_name,date:f.date,timestamp:f.created_at?new Date(f.created_at).getTime():Date.now() }));
    appState.isCloudSynced = true; saveToLocalStorage();
    if (render) refreshAllRealtimeViews();
    return true;
  } catch (error) { console.warn('Secure sync:', error.message); return false; }
}

// Hàm đồng bộ dữ liệu qua API máy chủ; không truy cập database từ trình duyệt.
async function syncFromSupabase() {
  return syncFromSecureApi(true);
  const sb = getSupabaseClient();
  if (!sb) return false;

  const sCode = String(appState.classInfo?.schoolCode || '90').trim();
  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');

  try {
    // 1. Tải cấu hình lớp học
    const { data: dbConfigs } = await sb
      .from('class_configs')
      .select('*')
      .eq('school_code', sCode);

    if (dbConfigs && dbConfigs.length > 0) {
      const matchedCfg = dbConfigs.find(c => getCleanClassCode(c.class_name) === curClass);
      const curCfg = matchedCfg || dbConfigs[0];
      if (curCfg) {
        const weekNum = parseInt(curCfg.current_week) || (appState.classInfo.currentWeek || 1);
        const resolvedClassName = matchedCfg ? (curCfg.class_name || curClass) : curClass;
        appState.classInfo = {
          ...appState.classInfo,
          schoolCode: curCfg.school_code || sCode,
          className: resolvedClassName,
          schoolName: curCfg.school_name || appState.classInfo.schoolName,
          teacherName: curCfg.teacher_name || appState.classInfo.teacherName,
          pin: curCfg.pin || appState.classInfo.pin,
          adminPin: curCfg.admin_pin || appState.classInfo.adminPin,
          baseScore: parseInt(curCfg.base_score) || 100,
          currentWeek: weekNum,
          totalWeeks: parseInt(curCfg.total_weeks) || 18,
          conductConfig: curCfg.conduct_config || appState.classInfo.conductConfig,
          teacherNote: curCfg.teacher_note || ''
        };
        // Nạp bộ tiêu chí thi đua đã lưu của lớp từ Supabase Cloud
        if (curCfg.conduct_config && Array.isArray(curCfg.conduct_config.customCriteria) && curCfg.conduct_config.customCriteria.length > 0) {
          appState.criteria = curCfg.conduct_config.customCriteria;
          localStorage.setItem('thi_dua_criteria', JSON.stringify(appState.criteria));
        }
        // Chỉ gán phạm vi ban đầu nếu chưa từng được người dùng chọn
        if (typeof leaderboardScopeValue === 'undefined' || leaderboardScopeValue === null) {
          leaderboardScope = 'week';
          leaderboardScopeValue = weekNum;
        }
        if (typeof studentViewScopeValue === 'undefined' || studentViewScopeValue === null) {
          studentViewScope = 'week';
          studentViewScopeValue = weekNum;
        }
        if (typeof parentViewScopeValue === 'undefined' || parentViewScopeValue === null) {
          parentViewScope = 'week';
          parentViewScopeValue = weekNum;
        }
      }
    }

    // 2. Tải danh sách học sinh
    const { data: dbStudents } = await sb
      .from('students')
      .select('*')
      .eq('school_code', sCode)
      .eq('class_name', curClass);

    // 3. Tải nhật ký thi đua
    const { data: dbLogs } = await sb
      .from('conduct_logs')
      .select('*')
      .eq('school_code', sCode)
      .eq('class_name', curClass);

    // 4. Tải danh sách lớp
    const { data: dbClasses } = await sb
      .from('school_classes')
      .select('*')
      .eq('school_code', sCode);

    // 5. Tải thông báo chung
    const { data: dbAnnouncements } = await sb
      .from('announcements')
      .select('*')
      .eq('school_code', sCode)
      .eq('class_name', curClass);

    // 6. Tải phản hồi phụ huynh
    const { data: dbFeedbacks } = await sb
      .from('parent_feedbacks')
      .select('*')
      .eq('school_code', sCode)
      .eq('class_name', curClass);

    // NẾU DATABASE SUPABASE MỚI TẠO -> TỰ ĐỘNG NẠP DỮ LIỆU HIỆN CÓ
    // Chỉ khởi tạo khi truy vấn trả về danh sách rỗng hợp lệ. Không ghi dữ liệu cục bộ
    // đè lên cloud khi Supabase bị lỗi mạng, lỗi quyền hoặc chưa tải được dữ liệu.
    // Supabase là nguồn dữ liệu chuẩn: tuyệt đối không tự đẩy danh sách cũ
    // trong localStorage lên cloud khi truy vấn lớp hiện tại đang rỗng.

    // NẠP DỮ LIỆU TỪ SUPABASE VÀO APPSTATE
    if (Array.isArray(dbStudents)) {
      appState.students = dbStudents.map(s => ({
        id: s.id,
        schoolCode: s.school_code,
        code: s.code,
        name: s.name,
        team: parseInt(s.team) || 1,
        role: normalizeRole(s.role),
        className: s.class_name || curClass,
        classCode: s.class_code || `${sCode}${s.class_name || curClass}`,
        studentPassword: s.student_password || '123456',
        parentPassword: s.parent_password || '123456'
      }));
    }

    if (dbLogs && Array.isArray(dbLogs)) {
      appState.logs = dbLogs.map(l => {
        const title = l.criteria_title || l.note || (l.type === 'plus' ? 'Khen thưởng thi đua' : 'Vi phạm nề nếp');
        const ts = l.created_at ? new Date(l.created_at).getTime() : Date.now();
        const rec = l.recorder || (l.logged_by || 'GVCN');
        return {
          id: l.id,
          week: parseInt(l.week) || 1,
          date: l.date || '',
          exactDate: l.date || '',
          session: l.session || '',
          period: l.period || '',
          subject: l.subject || '',
          studentId: l.student_id,
          studentCode: l.student_code,
          studentName: l.student_name,
          team: parseInt(l.team) || 1,
          type: l.type,
          criteriaId: l.criteria_id || '',
          critId: l.criteria_id || '',
          criteriaTitle: title,
          critTitle: title,
          pts: Number(l.pts) || 0,
          note: l.note || '',
          recorder: rec,
          loggedBy: rec,
          timestamp: ts,
          className: l.class_name || curClass
        };
      });
    }

    if (Array.isArray(dbClasses)) {
      appState.schoolClasses = dbClasses.map(c => ({
        schoolCode: c.school_code,
        classCode: c.class_code,
        className: c.class_name,
        teacherName: c.teacher_name,
        pin: c.pin,
        teacherPin: c.pin,
        studentCount: c.student_count
      }));
    }

    if (dbAnnouncements && Array.isArray(dbAnnouncements)) {
      const mappedAnn = dbAnnouncements.map(a => ({
        id: a.id,
        title: a.title,
        content: a.content,
        target: a.target || 'all',
        className: a.class_name || curClass,
        author: a.author || (a.content && a.content.includes('AI') ? 'Trợ Lý AI & GVCN' : `GVCN Lớp ${a.class_name || curClass}`),
        date: a.date || '',
        createdAt: a.created_at || new Date().toISOString(),
        timestamp: a.created_at ? new Date(a.created_at).getTime() : Date.now()
      }));
      appState.announcements = mappedAnn;
      appState.classAnnouncements = mappedAnn;
      localStorage.setItem('thi_dua_class_announcements', JSON.stringify(mappedAnn));
      localStorage.setItem('thi_dua_announcements', JSON.stringify(mappedAnn));
    }

    if (dbFeedbacks && Array.isArray(dbFeedbacks)) {
      appState.parentFeedbacks = dbFeedbacks.map(f => ({
        id: f.id,
        studentCode: f.student_code,
        studentName: f.student_name,
        parentName: f.parent_name,
        content: f.content,
        reply: f.reply || '',
        className: f.class_name,
        date: f.date
      }));
    }

    appState.isCloudSynced = true;
    saveToLocalStorage();
    renderLeaderboardScopeSelector();
    renderStudentList();
    renderLeaderboard();
    renderLogs();
    if (appState.currentRole === 'student') renderStudentPortalView();
    if (appState.currentRole === 'parent') renderParentPortalView();
    return true;
  } catch (err) {
    console.error('Supabase Sync Error:', err);
    return false;
  }
}

// Tự động đẩy toàn bộ dữ liệu hiện có lên Supabase
async function uploadFullStateToSupabase() {
  const sb = getSupabaseClient();
  if (!sb) return;

  const sCode = String(appState.classInfo?.schoolCode || '90').trim();
  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');

  try {
    // 1. Ghi danh sách học sinh
    if (appState.students && appState.students.length > 0) {
      const rows = appState.students.filter(s => isStudentInCurrentClass(s, curClass)).map(s => ({
        id: s.id || `hs_${Date.now()}_${s.code}`,
        code: String(s.code || '').trim().toUpperCase(),
        name: String(s.name || '').trim(),
        team: parseInt(s.team) || 1,
        role: normalizeRole(s.role),
        class_name: curClass,
        class_code: `${sCode}${curClass}`,
        school_code: sCode,
        student_password: String(s.studentPassword || '123456'),
        parent_password: String(s.parentPassword || '123456')
      }));
      await sb.from('students').upsert(rows, { onConflict: 'id' });
    }

    // 2. Ghi nhật ký thi đua
    if (appState.logs && appState.logs.length > 0) {
      const logRows = appState.logs.map(l => ({
        id: String(l.id || Date.now()),
        week: parseInt(l.week) || 1,
        date: l.date || '',
        session: l.session || '',
        period: l.period || '',
        subject: l.subject || '',
        student_id: l.studentId || '',
        student_code: l.studentCode || '',
        student_name: l.studentName || '',
        team: parseInt(l.team) || 1,
        type: l.type || 'plus',
        criteria_id: l.criteriaId || '',
        criteria_title: l.criteriaTitle || '',
        pts: Number(l.pts) || 0,
        note: l.note || '',
        recorder: l.recorder || '',
        school_code: sCode,
        class_name: curClass
      }));
      await sb.from('conduct_logs').upsert(logRows, { onConflict: 'id' });
    }

    // 3. Ghi cấu hình lớp
    await sb.from('class_configs').upsert({
      school_code: sCode,
      class_name: curClass,
      school_name: appState.classInfo?.schoolName || 'THPT Vọng Thê',
      teacher_name: appState.classInfo?.teacherName || '',
      pin: appState.classInfo?.pin || '1234',
      admin_pin: appState.classInfo?.adminPin || '9090',
      base_score: parseInt(appState.classInfo?.baseScore) || 100,
      current_week: parseInt(appState.classInfo?.currentWeek) || 1,
      total_weeks: parseInt(appState.classInfo?.totalWeeks) || 18,
      conduct_config: appState.classInfo?.conductConfig || {},
      teacher_note: appState.classInfo?.teacherNote || ''
    }, { onConflict: 'school_code,class_name' });

    console.log('🎉 Đã đẩy dữ liệu khởi tạo thành công lên Supabase!');
  } catch (err) {
    console.error('Lỗi đẩy dữ liệu lên Supabase:', err);
  }
}

function getMonthFromWeek(w) {
  const weekNum = parseInt(w) || 1;
  if (weekNum <= 4) return 9;
  if (weekNum <= 8) return 10;
  if (weekNum <= 12) return 11;
  if (weekNum <= 16) return 12;
  if (weekNum <= 18) return 1;
  if (weekNum <= 21) return 102; // Tháng 1 HK2
  if (weekNum <= 23) return 2;
  if (weekNum <= 27) return 3;
  if (weekNum <= 32) return 4;
  return 5;
}


function getFlexibleExcelValue(row, possibleKeys) {
  if (!row || typeof row !== 'object') return '';
  for (const k of possibleKeys) {
    if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') {
      return String(row[k]).trim();
    }
  }
  const rowKeys = Object.keys(row);
  for (const p of possibleKeys) {
    const cleanP = p.toLowerCase().replace(/[\s\-_]/g, '');
    for (const rk of rowKeys) {
      const cleanRk = rk.toLowerCase().replace(/[\s\-_]/g, '');
      if (cleanRk === cleanP && row[rk] !== undefined && row[rk] !== null) {
        return String(row[rk]).trim();
      }
    }
  }
  return '';
}

// ================= KẾ HOẠCH THỜI GIAN NĂM HỌC 2026 - 2027 (AN GIANG) =================

// ================= HÀM TỰ ĐỘNG TÍNH TOÁN TUẦN THỰC TẾ THEO LỊCH NĂM HỌC 2026 - 2027 =================
function getRealTimeCurrentWeek(testDate) {
  const now = testDate || new Date();
  
  for (const item of OFFICIAL_WEEK_SCHEDULE) {
    if (!item.range) continue;
    const parts = item.range.split('-').map(s => s.trim());
    if (parts.length === 2) {
      let startStr = parts[0];
      let endStr = parts[1];
      
      let endParts = endStr.split('/');
      let endYear = endParts.length === 3 ? parseInt(endParts[2]) : (item.semester === 2 || (item.semester === 1 && item.month === 1 && parseInt(endParts[1]) === 1) ? 2027 : 2026);
      let endMonth = parseInt(endParts[1]) - 1;
      let endDay = parseInt(endParts[0]);
      
      let startParts = startStr.split('/');
      let startYear = startParts.length === 3 ? parseInt(startParts[2]) : (item.semester === 1 && item.month === 1 && parseInt(startParts[1]) === 12 ? 2026 : endYear);
      let startMonth = parseInt(startParts[1]) - 1;
      let startDay = parseInt(startParts[0]);
      
      const startDate = new Date(startYear, startMonth, startDay, 0, 0, 0);
      const endDate = new Date(endYear, endMonth, endDay, 23, 59, 59);
      
      if (now >= startDate && now <= endDate) {
        return item.week;
      }
    }
  }
  
  // Nếu ngày hiện tại trước ngày 07/09/2026 (ngày bắt đầu Tuần 1 chính thức)
  const firstWeekStart = new Date(2026, 8, 7, 0, 0, 0);
  if (now < firstWeekStart) {
    return 1;
  }
  return 1;
}

const OFFICIAL_WEEK_SCHEDULE = [
  { week: 1, range: '07/09 - 13/09/2026', semester: 1, month: 9, note: 'Bắt đầu HK1' },
  { week: 2, range: '14/09 - 20/09/2026', semester: 1, month: 9, note: '' },
  { week: 3, range: '21/09 - 27/09/2026', semester: 1, month: 9, note: '' },
  { week: 4, range: '28/09 - 04/10/2026', semester: 1, month: 9, note: '' },
  { week: 5, range: '05/10 - 11/10/2026', semester: 1, month: 10, note: '' },
  { week: 6, range: '12/10 - 18/10/2026', semester: 1, month: 10, note: '' },
  { week: 7, range: '19/10 - 25/10/2026', semester: 1, month: 10, note: '' },
  { week: 8, range: '26/10 - 01/11/2026', semester: 1, month: 10, note: 'KT Giữa HK1' },
  { week: 9, range: '02/11 - 08/11/2026', semester: 1, month: 11, note: 'KT Giữa HK1' },
  { week: 10, range: '09/11 - 15/11/2026', semester: 1, month: 11, note: 'KT Giữa HK1' },
  { week: 11, range: '16/11 - 22/11/2026', semester: 1, month: 11, note: '' },
  { week: 12, range: '23/11 - 29/11/2026', semester: 1, month: 11, note: '' },
  { week: 13, range: '30/11 - 06/12/2026', semester: 1, month: 12, note: '' },
  { week: 14, range: '07/12 - 13/12/2026', semester: 1, month: 12, note: '' },
  { week: 15, range: '14/12 - 20/12/2026', semester: 1, month: 12, note: '' },
  { week: 16, range: '21/12 - 27/12/2026', semester: 1, month: 12, note: '' },
  { week: 17, range: '28/12/2026 - 03/01/2027', semester: 1, month: 1, note: 'KT Cuối HK1' },
  { week: 18, range: '04/01 - 10/01/2027', semester: 1, month: 1, note: 'Tổng kết HK1' },
  
  // HỌC KỲ 2
  { week: 19, range: '11/01 - 17/01/2027', semester: 2, month: 102, note: 'Bắt đầu HK2' },
  { week: 20, range: '18/01 - 24/01/2027', semester: 2, month: 102, note: '' },
  { week: 21, range: '25/01 - 31/01/2027', semester: 2, month: 102, note: '' },
  // Nghỉ Tết ÂL: 01/02 - 14/02/2027
  { week: 22, range: '15/02 - 21/02/2027', semester: 2, month: 2, note: 'Sau Tết ÂL' },
  { week: 23, range: '22/02 - 28/02/2027', semester: 2, month: 2, note: '' },
  { week: 24, range: '01/03 - 07/03/2027', semester: 2, month: 3, note: '' },
  { week: 25, range: '08/03 - 14/03/2027', semester: 2, month: 3, note: '' },
  { week: 26, range: '15/03 - 21/03/2027', semester: 2, month: 3, note: 'KT Giữa HK2' },
  { week: 27, range: '22/03 - 28/03/2027', semester: 2, month: 3, note: 'KT Giữa HK2' },
  { week: 28, range: '29/03 - 04/04/2027', semester: 2, month: 4, note: 'KT Giữa HK2' },
  { week: 29, range: '05/04 - 11/04/2027', semester: 2, month: 4, note: '' },
  { week: 30, range: '12/04 - 18/04/2027', semester: 2, month: 4, note: '' },
  { week: 31, range: '19/04 - 25/04/2027', semester: 2, month: 4, note: '' },
  { week: 32, range: '26/04 - 02/05/2027', semester: 2, month: 4, note: '' },
  { week: 33, range: '03/05 - 09/05/2027', semester: 2, month: 5, note: '' },
  { week: 34, range: '10/05 - 16/05/2027', semester: 2, month: 5, note: 'KT Cuối HK2' },
  { week: 35, range: '17/05 - 23/05/2027', semester: 2, month: 5, note: 'Tổng kết Năm học' }
];


// ================= HÀM XÓA BỘ NHỚ ĐỆM & LÀM MỚI ỨNG DỤNG (FORCE HARD REFRESH APP) =================
async function forceHardRefreshApp() {
  showToast('🔄 Đang tải dữ liệu mới nhất...', 'info');

  try {
    // Đồng bộ dữ liệu thật từ máy chủ trước khi tải lại trang; localStorage
    // không được dùng để khôi phục danh sách khi Supabase đang hoạt động.
    if (isSupabaseActive()) await syncFromSupabase();
    // 1. Hủy tất cả Service Workers đang chạy
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Unregistered SW:', registration);
      }
    }

    // 2. Xóa toàn bộ CacheStorage của ứng dụng này
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      for (const name of cacheNames) {
        await caches.delete(name);
        console.log('Deleted Cache:', name);
      }
    }

    // 3. Xóa hash dữ liệu để buộc nạp lại
    appState.lastDataHash = '';
  } catch (err) {
    console.error('Clear cache error:', err);
  }

  // 4. Tải lại trang với query tham số ngẫu nhiên để bypass 100% cache trình duyệt
  setTimeout(() => {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.location.href = `${cleanUrl}?v=${Date.now()}`;
  }, 400);
}

// ================= 11.1 ONESIGNAL PUSH NOTIFICATION INTEGRATION =================

// ================= PUSH NỀN QUA MÁY CHỦ =================
// Khóa OneSignal chỉ nằm trong biến môi trường máy chủ, không đưa vào trình duyệt.
async function sendPushNotification(externalIds, title, message, showFeedback = false) {
  if (!Array.isArray(externalIds) || externalIds.length === 0 || !navigator.onLine) return false;
  try {
    const response = await fetch('/api/push-notification', {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ externalIds, title, message })
    });
    if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || 'Không thể gửi thông báo.');
    if (showFeedback) showToast('Đã gửi thông báo tới điện thoại người nhận.', 'success');
    return true;
  } catch (error) {
    console.warn('Push notification error:', error);
    if (showFeedback) showToast('Không thể gửi thông báo nền.', 'warning');
    return false;
  }
}

function sendRealOneSignalPush(targetStudentCode, title, message) {
  if (!targetStudentCode) return Promise.resolve(false);
  const code = String(targetStudentCode).toUpperCase();
  return sendPushNotification([`HS_${code}`, `PH_${code}`], title, message);
}


function sendTargetedConductNotification(student, log, critTitle, finalPts) {
  if (!student || !student.code) return;
  const sCode = String(student.code).toUpperCase();
  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');
  const schoolCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();

  // Danh sách người nhận đích danh:
  // 1. Chính học sinh đó
  // 2. Phụ huynh của chính em đó
  // 3. GVCN của lớp
  const recipients = [
    `HS_${sCode}`,
    `PH_${sCode}`,
    `GVCN_${schoolCode}_${curClass}`
  ];

  // 4. Ban Cán Sự Lớp (Lớp trưởng, Lớp phó, Tổ trưởng của tổ học sinh này)
  const classStudents = getCurrentClassStudents(curClass);
  classStudents.forEach(s => {
    if (!s.code) return;
    const role = normalizeRole(s.role);
    if (role === 'monitor' || role === 'vice_monitor') {
      recipients.push(`HS_${String(s.code).toUpperCase()}`);
    } else if (role === 'leader' && Number(s.team) === Number(student.team)) {
      recipients.push(`HS_${String(s.code).toUpperCase()}`);
    }
  });

  const uniqueRecipients = [...new Set(recipients)];
  const ptsText = finalPts > 0 ? `+${finalPts}đ` : `${finalPts}đ`;
  const statsScore = calculateStudentScore(student.id, appState.classInfo.currentWeek);
  const title = `🔔 GHI NHẬN NỀ NẾP: ${student.name.toUpperCase()}`;
  const message = `Nội dung: ${critTitle} (${ptsText})
Điểm hiện tại tuần này: ${statsScore.score}đ • Lớp ${curClass}`;

  sendRealOneSignalPushMultiple(uniqueRecipients, title, message);
}

function sendRealOneSignalPushMultiple(externalIds, title, message) {
  return sendPushNotification(externalIds, title, message, true);
}

function getOneSignalAppId() {
  return (window.MASTER_SYSTEM_CONFIG && window.MASTER_SYSTEM_CONFIG.oneSignalAppId) || '';
}

function initOneSignalSDK() {
  const appId = getOneSignalAppId();
  if (!appId || appId === 'YOUR_ONESIGNAL_APP_ID') {
    console.log('ℹ️ OneSignal App ID chưa được cấu hình trong master_config.js');
    return;
  }

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(async function(OneSignal) {
    try {
      await OneSignal.init({
        appId: appId,
        safari_web_id: "web.onesignal.auto.0d6d1ede-d24a-45d0-ba73-2f88839c0735",
        notifyButton: { enable: false },
        allowLocalhostAsSecureOrigin: true,
        serviceWorkerPath: 'OneSignalSDKWorker.js',
        serviceWorkerParam: { scope: '/' }
      });
      console.log('✅ OneSignal SDK initialized successfully with App ID:', appId);

      // Tự động gán External ID nếu đã đăng nhập trước đó
      if (appState.currentRole === 'parent' && appState.currentParentStudentCode) {
        registerOneSignalExternalId(`PH_${appState.currentParentStudentCode.toUpperCase()}`);
      } else if (appState.currentRole === 'student' && appState.currentStudentCode) {
        registerOneSignalExternalId(`HS_${appState.currentStudentCode.toUpperCase()}`);
      }
    } catch (err) {
      console.log('OneSignal init notice:', err);
    }
  });
}

function registerOneSignalExternalId(externalId) {
  const appId = getOneSignalAppId();
  if (!appId || appId === 'YOUR_ONESIGNAL_APP_ID') return;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(async function(OneSignal) {
    try {
      if ('Notification' in window && Notification.permission !== 'granted') {
        const perm = await OneSignal.Notifications.requestPermission();
        console.log('OneSignal Notification Permission:', perm);
      }
      await OneSignal.login(externalId);
      if (OneSignal.User && OneSignal.User.PushSubscription) {
        await OneSignal.User.PushSubscription.optIn();
        console.log('✅ PushSubscription Token:', OneSignal.User.PushSubscription.token);
      }
      console.log('✅ Đã kích hoạt OneSignal External ID & Đăng ký Push:', externalId);
    } catch (e) {
      console.warn('OneSignal login error:', e);
    }
  });
}

function logoutOneSignalUser() {
  const appId = getOneSignalAppId();
  if (!appId || appId === 'YOUR_ONESIGNAL_APP_ID') return;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(async function(OneSignal) {
    try {
      await OneSignal.logout();
      console.log('✅ Đã đăng xuất OneSignal User');
    } catch (e) {}
  });
}

// ================= NOTIFICATION PREFERENCES & QUIET HOURS =================
function getNotifPreferences() {
  const defaultPref = {
    enabled: true,
    sound: true,
    vibrate: true,
    rewards: true,
    violations: true,
    announcements: true,
    quietHours: true
  };
  try {
    const stored = localStorage.getItem('thi_dua_notif_preferences');
    if (stored) return { ...defaultPref, ...JSON.parse(stored) };
  } catch (e) {}
  return defaultPref;
}

function saveNotifPreferences() {
  const pref = {
    enabled: document.getElementById('pref-master-notif')?.checked ?? true,
    sound: document.getElementById('pref-sound')?.checked ?? true,
    vibrate: document.getElementById('pref-vibrate')?.checked ?? true,
    rewards: document.getElementById('pref-rewards')?.checked ?? true,
    violations: document.getElementById('pref-violations')?.checked ?? true,
    announcements: document.getElementById('pref-announcements')?.checked ?? true,
    quietHours: document.getElementById('pref-quiet-hours')?.checked ?? true
  };

  localStorage.setItem('thi_dua_notif_preferences', JSON.stringify(pref));
  localStorage.setItem('thi_dua_notification_enabled', pref.enabled ? 'true' : 'false');
  syncNotificationUI();
}

function isQuietHours() {
  const pref = getNotifPreferences();
  if (!pref.quietHours) return false;
  const hour = new Date().getHours();
  // Giờ yên lặng từ 22h tối đến 6h30 sáng
  return hour >= 22 || hour < 7;
}

function openNotificationPreferencesModal() {
  const modal = document.getElementById('notif-pref-modal');
  if (!modal) return;
  const pref = getNotifPreferences();

  const elMaster = document.getElementById('pref-master-notif');
  if (elMaster) elMaster.checked = pref.enabled;
  const elSound = document.getElementById('pref-sound');
  if (elSound) elSound.checked = pref.sound;
  const elVibrate = document.getElementById('pref-vibrate');
  if (elVibrate) elVibrate.checked = pref.vibrate;
  const elRewards = document.getElementById('pref-rewards');
  if (elRewards) elRewards.checked = pref.rewards;
  const elViolations = document.getElementById('pref-violations');
  if (elViolations) elViolations.checked = pref.violations;
  const elAnn = document.getElementById('pref-announcements');
  if (elAnn) elAnn.checked = pref.announcements;
  const elQuiet = document.getElementById('pref-quiet-hours');
  if (elQuiet) elQuiet.checked = pref.quietHours;

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeNotificationPreferencesModal() {
  const modal = document.getElementById('notif-pref-modal');
  if (modal) modal.classList.add('hidden');
}


// XUẤT BẢNG XẾP LOẠI HẠNH KIỂM THÁNG RA EXCEL
function exportMonthlyConductExcel() {
  const stats = calculateScopeAggregatedStats();
  const scopeVal = parseInt(document.getElementById('scope-select-val')?.value) || 1;
  const curClass = appState.classInfo?.className || '10A1';
  const weeks = stats.weeks || [1, 2, 3, 4];
  const maxScore = weeks.length * 100;

  const data = [
    [`BẢNG TỔNG KẾT VÀ XẾP LOẠI HẠNH KIỂM THÁNG ${scopeVal} - LỚP ${curClass.toUpperCase()}`],
    [`Năm học: 2026 - 2027 | Trường THPT Vọng Thê | Gồm các tuần: Tuần ${weeks.join(', ')}`],
    [`Quy chế chuẩn (${weeks.length} tuần = ${maxScore}đ): ≥${Math.round(maxScore * 0.75)}đ Tốt; ≥${Math.round(maxScore * 0.50)}đ Khá; ≥${Math.round(maxScore * 0.25)}đ Đạt; <${Math.round(maxScore * 0.25)}đ Chưa Đạt`],
    []
  ];

  const columns = ["STT", "Mã Học Sinh", "Họ Và Tên", "Tổ"];
  weeks.forEach(w => columns.push(`Điểm Tuần ${w}`));
  columns.push(`Tổng Điểm Tháng ${scopeVal} (Thang ${maxScore}đ)`);
  columns.push("Điểm TB/Tuần");
  columns.push("Khen Thưởng (+)");
  columns.push("Vi Phạm (-)");
  columns.push("Xếp Loại Hạnh Kiểm Tháng");
  columns.push("Ghi Chú Đánh Giá");

  data.push(columns);

  stats.studentScores.forEach((s, idx) => {
    const row = [
      idx + 1,
      s.code,
      s.name,
      `Tổ ${s.team}`
    ];

    weeks.forEach(w => {
      const st = calculateStudentScore(s.id, w);
      row.push(st.score);
    });

    row.push(s.totalScore);
    row.push(s.avgScore);
    row.push(s.totalPlusPts);
    row.push(s.totalMinusPts);
    row.push(s.monthlyConduct.rank);
    row.push(s.monthlyConduct.desc);

    data.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Hanh_Kiem_Thang_${scopeVal}`);
  XLSX.writeFile(wb, `Bang_Hanh_Kiem_Thang_${scopeVal}_Lop_${curClass}.xlsx`);
  showToast(`Đã xuất Bảng xếp loại Hạnh kiểm Tháng ${scopeVal} thành công!`, 'success');
}


// QUY CHẾ XẾP HẠNH KIỂM THEO THÁNG:
// - Lấy điểm tích lũy của các tuần trong tháng (hoặc TB quy đổi thang tháng 400đ)
// - >= 300 điểm: TỐT (🥇 Tốt)
// - 200 <= điểm < 300: KHÁ (🥈 Khá - Hạ 1 bậc do dưới 300đ)
// - 100 <= điểm < 200: ĐẠT (🥉 Đạt - Hạ 2 bậc do dưới 200đ)
// - < 100 điểm: KHÔNG ĐẠT (⚠️ Không Đạt)
function calculateMonthlyConduct(avgScoreOrTotal, weeksCount = 1) {
  let avgScore = typeof avgScoreOrTotal === 'number' ? avgScoreOrTotal : 0;
  if (weeksCount > 1) {
    avgScore = Number((avgScoreOrTotal / weeksCount).toFixed(1));
  } else {
    avgScore = Number(avgScore.toFixed(1));
  }

  const baseScore = parseInt(appState.classInfo?.baseScore) || 100;
  const cfg = appState.classInfo?.conductConfig || {
    totMin: baseScore === 10 ? 8.0 : (baseScore === 80 ? 64 : 80),
    khaMin: baseScore === 10 ? 6.5 : (baseScore === 80 ? 52 : 65),
    datMin: baseScore === 10 ? 5.0 : (baseScore === 80 ? 40 : 50)
  };

  const totMin = Number(cfg.totMin ?? 80);
  const khaMin = Number(cfg.khaMin ?? 65);
  const datMin = Number(cfg.datMin ?? 50);

  // Khoảng đệm cảnh báo gần rớt mức xếp loại dưới (trong vòng 5-6 điểm sát cận dưới, vd <= 85.0đ)
  const buffer = baseScore === 10 ? 0.5 : 5;
  let isNearDrop = false;
  let nearDropMsg = '';

  if (avgScore >= totMin) {
    if (avgScore <= (totMin + buffer)) {
      isNearDrop = true;
      nearDropMsg = `Cận mức Khá (< ${totMin}đ)`;
    }
    return {
      rank: 'Tốt',
      badge: isNearDrop ? '⚠️ Tốt (Cận Khá)' : '🥇 Tốt',
      avgScore: avgScore,
      isNearDrop: isNearDrop,
      nearDropMsg: nearDropMsg,
      color: isNearDrop ? 'text-amber-400' : 'text-emerald-300',
      bg: isNearDrop ? 'bg-amber-500/20' : 'bg-emerald-500/20',
      border: isNearDrop ? 'border-amber-500/40' : 'border-emerald-500/40',
      desc: isNearDrop ? `Hạnh Kiểm Tốt nhưng sát mức Khá (TB: ${avgScore}đ, mức Khá < ${totMin}đ)` : `Đạt Hạnh Kiểm Tốt (TB: ${avgScore}đ ≥ ${totMin}đ)`
    };
  } else if (avgScore >= khaMin) {
    if (avgScore <= (khaMin + buffer)) {
      isNearDrop = true;
      nearDropMsg = `Cận mức Đạt (< ${khaMin}đ)`;
    }
    return {
      rank: 'Khá',
      badge: isNearDrop ? '⚠️ Khá (Cận Đạt)' : '🥈 Khá',
      avgScore: avgScore,
      isNearDrop: isNearDrop,
      nearDropMsg: nearDropMsg,
      color: isNearDrop ? 'text-amber-400' : 'text-blue-300',
      bg: isNearDrop ? 'bg-amber-500/20' : 'bg-blue-500/20',
      border: isNearDrop ? 'border-amber-500/40' : 'border-blue-500/40',
      desc: isNearDrop ? `Hạnh Kiểm Khá nhưng sát mức Đạt (TB: ${avgScore}đ, mức Đạt < ${khaMin}đ)` : `Đạt Hạnh Kiểm Khá (TB: ${avgScore}đ ≥ ${khaMin}đ)`
    };
  } else if (avgScore >= datMin) {
    if (avgScore <= (datMin + buffer)) {
      isNearDrop = true;
      nearDropMsg = `Cận mức Chưa Đạt (< ${datMin}đ)`;
    }
    return {
      rank: 'Đạt',
      badge: isNearDrop ? '⚠️ Đạt (Cận Chưa Đạt)' : '🥉 Đạt',
      avgScore: avgScore,
      isNearDrop: isNearDrop,
      nearDropMsg: nearDropMsg,
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/40',
      desc: isNearDrop ? `Hạnh Kiểm Đạt nhưng sát mức Chưa Đạt (TB: ${avgScore}đ, Chưa Đạt < ${datMin}đ)` : `Đạt Hạnh Kiểm Đạt (TB: ${avgScore}đ ≥ ${datMin}đ)`
    };
  } else {
    return {
      rank: 'Chưa Đạt',
      badge: '⚠️ Chưa Đạt',
      avgScore: avgScore,
      isNearDrop: true,
      nearDropMsg: 'Hạnh kiểm Chưa Đạt',
      color: 'text-rose-400',
      bg: 'bg-rose-500/20',
      border: 'border-rose-500/40',
      desc: `Chưa Đạt Hạnh Kiểm (TB: ${avgScore}đ < ${datMin}đ)`
    };
  }
}

// Chuyển đổi tab vai trò trong màn hình Đăng Nhập Gateway mượt mà
function selectGatewayRoleTab(role) {
  const roles = ['gvcn', 'student', 'parent', 'admin'];
  roles.forEach(r => {
    const btn = document.getElementById(`gate-tab-btn-${r}`);
    const panel = document.getElementById(`gate-panel-${r}`);
    
    if (r === role) {
      if (panel) panel.classList.remove('hidden');
      if (btn) {
        if (r === 'gvcn') btn.className = 'gate-role-tab py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 text-white bg-indigo-600 shadow-md';
        else if (r === 'student') btn.className = 'gate-role-tab py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 text-white bg-blue-600 shadow-md';
        else if (r === 'parent') btn.className = 'gate-role-tab py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 text-white bg-emerald-600 shadow-md';
        else if (r === 'admin') btn.className = 'gate-role-tab py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 text-white bg-amber-600 shadow-md';
      }
    } else {
      if (panel) panel.classList.add('hidden');
      if (btn) btn.className = 'gate-role-tab py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200';
    }
  });

  // Tự động focus vào ô nhập đầu tiên tương ứng
  setTimeout(() => {
    if (role === 'gvcn') document.getElementById('gate-gvcn-class')?.focus();
    else if (role === 'student') document.getElementById('gate-student-code')?.focus();
    else if (role === 'parent') document.getElementById('gate-parent-code')?.focus();
    else if (role === 'admin') document.getElementById('gate-admin-pin')?.focus();
  }, 50);
}


// Kiểm tra xem người dùng có đang gõ phím / tương tác với ô nhập liệu không (để chống gián đoạn)
function isUserActivelyTyping() {
  const el = document.activeElement;
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable) {
    return true;
  }
  return false;
}

let studentSelectedWeekFilter = 'current';

function onStudentWeekFilterChange(val) {
  if (/^\d+$/.test(String(val))) {
    selectWeek(Number(val));
    return;
  }
  studentSelectedWeekFilter = val;
  renderStudentPortalView();
}
/**
 * SỔ THI ĐUA LỚP HỌC SỐ THPT - CORE ENGINE V5
 * Đồng Bộ Máy Chủ Thời Gian Thực & Giao Diện Phụ Huynh Tinh Gọn (Không Nhấp Nháy)
 */

// Dữ liệu chỉ đồng bộ qua Supabase; không còn sử dụng máy chủs.

// ================= 1. DỮ LIỆU MẶC ĐỊNH =================
const DEFAULT_SCHOOL_CLASSES = [];
const DEFAULT_CLASS_INFO = {
  schoolCode: '90',
  className: '10A1',
  schoolName: 'Trường THPT Vọng Thê',
  teacherName: 'Thầy / Cô Chủ Nhiệm',
  pin: '1234',
  adminPin: '9999',
  baseScore: 100,
  currentWeek: 1,
  totalWeeks: 18,
  teacherNote: ''
};

const DEFAULT_CRITERIA = [
  // HỌC TẬP (hoctap)
  { id: 'ht_1', cat: 'hoctap', type: 'plus', title: 'Điểm 9 - 10', pts: 5, icon: 'award', desc: 'Được điểm 9 hoặc 10 kiểm tra miệng, 15p, 1 tiết' },
  { id: 'ht_2', cat: 'hoctap', type: 'plus', title: 'Điểm 7 - 8', pts: 2, icon: 'star', desc: 'Đạt điểm khá trong giờ học' },
  { id: 'ht_3', cat: 'hoctap', type: 'plus', title: 'Phát biểu bài (+)', pts: 2, icon: 'hand', desc: 'Tích cực xung phong phát biểu xây dựng bài' },
  { id: 'ht_4', cat: 'hoctap', type: 'minus', title: 'Không làm bài tập', pts: -5, icon: 'book-x', desc: 'Không hoàn thành bài tập về nhà môn học' },
  { id: 'ht_5', cat: 'hoctap', type: 'minus', title: 'Không thuộc bài', pts: -5, icon: 'alert-circle', desc: 'Kiểm tra miệng không thuộc bài cũ' },
  { id: 'ht_6', cat: 'hoctap', type: 'minus', title: 'Điểm dưới 5 (-)', pts: -5, icon: 'frown', desc: 'Bị điểm kém kiểm tra miệng / 15 phút' },
  { id: 'ht_7', cat: 'hoctap', type: 'minus', title: 'Quên SGK / Dụng cụ', pts: -3, icon: 'package-x', desc: 'Không mang đầy đủ sách vở, máy tính theo TKB' },
  { id: 'ht_8', cat: 'hoctap', type: 'minus', title: 'Gian lận trong KT', pts: -20, icon: 'shield-alert', desc: 'Sử dụng tài liệu / quay cóp trong giờ kiểm tra' },

  // TÁC PHONG THPT (tacphong)
  { id: 'tp_1', cat: 'tacphong', type: 'minus', title: 'Đi học muộn / trễ', pts: -5, icon: 'clock', desc: 'Đến lớp sau hiệu lệnh trống đầu giờ' },
  { id: 'tp_2', cat: 'tacphong', type: 'minus', title: 'Nghỉ không phép', pts: -10, icon: 'user-x', desc: 'Nghỉ học không có giấy xin phép của phụ huynh' },
  { id: 'tp_3', cat: 'tacphong', type: 'minus', title: 'Nghỉ có phép', pts: -2, icon: 'file-text', desc: 'Nghỉ học có đơn xin phép hợp lệ' },
  { id: 'tp_4', cat: 'tacphong', type: 'minus', title: 'Sai đồng phục / thẻ', pts: -5, icon: 'shirt', desc: 'Không đeo phù hiệu, sai áo đồng phục' },
  { id: 'tp_5', cat: 'tacphong', type: 'minus', title: 'Không sơ vin / dép lê', pts: -5, icon: 'footprints', desc: 'Không bỏ áo vào quần, mang dép lê vào lớp' },
  { id: 'tp_6', cat: 'tacphong', type: 'minus', title: 'Dùng điện thoại', pts: -10, icon: 'smartphone', desc: 'Sử dụng điện thoại không phục vụ học tập' },
  { id: 'tp_7', cat: 'tacphong', type: 'minus', title: 'Nhuộm tóc / móng tay', pts: -5, icon: 'sparkle', desc: 'Vi phạm quy định nề nếp tác phong trường THPT' },

  // KỶ LUẬT & NỀ NẾP (kydis)
  { id: 'kl_1', cat: 'kydis', type: 'minus', title: 'Nói chuyện / Mất TT', pts: -5, icon: 'volume-2', desc: 'Làm mất trật tự, ảnh hưởng đến lớp học' },
  { id: 'kl_2', cat: 'kydis', type: 'minus', title: 'Bị ghi Sổ Đầu Bài', pts: -15, icon: 'book-open-check', desc: 'Bị giáo viên bộ môn phê bình trong sổ đầu bài' },
  { id: 'kl_3', cat: 'kydis', type: 'minus', title: 'Ăn quà vặt trong lớp', pts: -5, icon: 'utensils', desc: 'Ăn quà, xả rác trong giờ học' },
  { id: 'kl_4', cat: 'kydis', type: 'minus', title: 'Văng tục / Cãi cọ', pts: -15, icon: 'message-circle-warning', desc: 'Nói tục, gây gổ với bạn bè' },

  // VIỆC TỐT & PHONG TRÀO (phongtrao)
  { id: 'pt_1', cat: 'phongtrao', type: 'plus', title: 'Giúp bạn tiến bộ', pts: 5, icon: 'heart-handshake', desc: 'Đôi bạn cùng tiến, hỗ trợ bạn học tập' },
  { id: 'pt_2', cat: 'phongtrao', type: 'plus', title: 'Đạt giải phong trào', pts: 15, icon: 'trophy', desc: 'Đoạt giải thể thao, văn nghệ, HSG cấp trường' },
  { id: 'pt_3', cat: 'phongtrao', type: 'plus', title: 'Trực nhật xuất sắc', pts: 5, icon: 'sparkles', desc: 'Vệ sinh lớp học, bảng đen sạch sẽ đúng giờ' },
  { id: 'pt_4', cat: 'phongtrao', type: 'plus', title: 'Nhặt được của rơi', pts: 10, icon: 'gem', desc: 'Làm việc tốt, trả lại của rơi cho người mất' },
  { id: 'pt_5', cat: 'phongtrao', type: 'plus', title: 'Hăng hái hoạt động Đoàn', pts: 5, icon: 'flag', desc: 'Tích cực tham gia các phong trào Đoàn trường' },
];

const DEFAULT_ANNOUNCEMENTS = [];

const DEFAULT_STUDENTS = [];
const DEFAULT_LOGS = [];

const DEFAULT_GEMINI_CONFIG = {
  apiKey: '',
  model: 'gemini-1.5-flash',
  tone: 'encouraging'
};


// ================= HÀM CHUẨN HÓA MÃ HỌC SINH & TÁCH LỚP CHUẨN XÁC =================

function normalizeRole(roleStr) {
  if (!roleStr) return 'member';
  const r = String(roleStr).trim().toLowerCase();
  if (r === 'leader' || r.includes('tổ trưởng') || r.includes('to truong')) return 'leader';
  if (r === 'sub_leader' || r.includes('tổ phó') || r.includes('to pho')) return 'sub_leader';
  if (r === 'monitor' || r.includes('lớp trưởng') || r.includes('lop truong')) return 'monitor';
  if (r === 'vice_monitor' || r.includes('lớp phó') || r.includes('lop pho')) return 'vice_monitor';
  return 'member';
}

function getCleanClassCode(className) {
  if (!className) return '10A1';
  let clean = String(className).replace(/lớp/gi, '').replace(/\s+/g, '').toUpperCase();
  return clean || '10A1';
}

function extractClassFromStudentCode(codeStr, defaultClass = '10A1') {
  if (!codeStr) return defaultClass;
  const s = String(codeStr).trim().toUpperCase();
  const sCode = String(appState?.classInfo?.schoolCode || '90').trim().toUpperCase();

  if (s.startsWith(sCode) && s.length >= 6) {
    const withoutSchool = s.slice(sCode.length);
    const classPart = withoutSchool.slice(0, -2);
    if (classPart) return getCleanClassCode(classPart);
  }

  const m = s.match(/(\d+[A-Z]+\d*)/i);
  if (m) return getCleanClassCode(m[1]);

  return getCleanClassCode(defaultClass);
}

// ================= HÀM LỌC HỌC SINH THEO ĐÚNG LỚP ĐANG CHỌN =================
function isStudentInCurrentClass(student, customClassName) {
  if (!student) return false;
  const targetClass = getCleanClassCode(customClassName || appState.classInfo.className || '10A1');
  const sCode = String(appState.classInfo.schoolCode || '90').trim().toUpperCase();
  const fullClassCode = `${sCode}${targetClass}`;

  // Không được coi dữ liệu của trường khác là dữ liệu lớp hiện tại, kể cả khi
  // hai trường cùng có tên lớp (vd 10A1/11A8).
  const studentSchoolCode = String(student.schoolCode || student.school_code || '').trim().toUpperCase();
  const codeUpper = String(student.code || '').trim().toUpperCase();
  if (studentSchoolCode && studentSchoolCode !== sCode) return false;
  if (codeUpper && !codeUpper.startsWith(sCode)) return false;

  const studentClass = getCleanClassCode(student.className || extractClassFromStudentCode(student.code, ''));
  if (studentClass === targetClass) return true;

  if (student.classCode && (student.classCode.toUpperCase() === fullClassCode || getCleanClassCode(student.classCode) === targetClass)) return true;

  if (student.code) {
    if (codeUpper.startsWith(fullClassCode) || codeUpper.includes(targetClass)) return true;
  }
  return false;
}

function sortStudentsNaturally(list) {
  if (!list || !Array.isArray(list)) return [];
  return [...list].sort((a, b) => {
    // 1. Ưu tiên sắp xếp theo số thứ tự trong Mã Học Sinh (vd 9011A801 -> 1, 9011A837 -> 37)
    const codeA = String(a.code || '').trim().toUpperCase();
    const codeB = String(b.code || '').trim().toUpperCase();
    if (codeA && codeB) {
      const numA = parseInt(codeA.replace(/[^0-9]/g, '')) || 0;
      const numB = parseInt(codeB.replace(/[^0-9]/g, '')) || 0;
      if (numA !== numB) return numA - numB;
      return codeA.localeCompare(codeB);
    }
    if (codeA) return -1;
    if (codeB) return 1;

    // 2. Nếu không có mã thì sắp xếp theo họ tên Tiếng Việt chuẩn
    const nameA = String(a.name || '').trim();
    const nameB = String(b.name || '').trim();
    return nameA.localeCompare(nameB, 'vi');
  });
}

function getCurrentClassStudents(customClassName) {
  const rawList = (appState.students || []).filter(s => isStudentInCurrentClass(s, customClassName));
  const seenKeys = new Set();
  const dedupList = [];
  for (const s of rawList) {
    const key = (s.code ? String(s.code).trim().toUpperCase() : '') || String(s.name).trim().toLowerCase();
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      dedupList.push(s);
    }
  }
  return sortStudentsNaturally(dedupList);
}
function generateUnifiedStudentCode(sttNum, customSchoolCode, customClassName) {
  const sCode = String(customSchoolCode || appState.classInfo.schoolCode || '90').trim().toUpperCase();
  const cCode = getCleanClassCode(customClassName || appState.classInfo.className || '10A1');
  const numStr = String(sttNum).padStart(2, '0');
  return `${sCode}${cCode}${numStr}`;
}

// ================= HÀM CHUẨN HÓA NGÀY, GIỜ, THỨ THEO LỊCH CHUẨN XÁC =================
const VIETNAMESE_DAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

function formatVietnameseDate(rawDate, includeDay = true) {
  if (!rawDate) return '';
  let d = null;

  if (typeof rawDate === 'number') {
    d = new Date(rawDate);
  } else {
    const str = String(rawDate).trim();
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
      const parts = str.split('/');
      d = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    } else if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
      const parts = str.split('-');
      d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2].slice(0, 2)));
    } else {
      const parsed = new Date(str);
      if (!isNaN(parsed.getTime())) d = parsed;
    }
  }

  if (d && !isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const dateStr = `${day}/${month}/${year}`;
    if (includeDay) {
      const dayName = VIETNAMESE_DAYS[d.getDay()];
      return `${dayName}, ${dateStr}`;
    }
    return dateStr;
  }

  return String(rawDate);
}

function formatVietnameseDateTime(rawDate, rawTimestamp = null) {
  if (!rawDate && !rawTimestamp) return '';
  let d = null;
  let hasExactTime = false;

  if (rawTimestamp && typeof rawTimestamp === 'number' && rawTimestamp > 0) {
    d = new Date(rawTimestamp);
    hasExactTime = true;
  } else if (typeof rawDate === 'number' && rawDate > 0) {
    d = new Date(rawDate);
    hasExactTime = true;
  } else if (rawDate) {
    const str = String(rawDate).trim();
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
      const parts = str.split('/');
      d = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    } else if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
      const parts = str.split('-');
      d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2].slice(0, 2)));
    } else {
      const parsed = new Date(str);
      if (!isNaN(parsed.getTime())) {
        d = parsed;
        hasExactTime = true;
      }
    }
  }

  if (d && !isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const dayName = VIETNAMESE_DAYS[d.getDay()];
    const dateStr = `${dayName}, ${day}/${month}/${year}`;

    if (hasExactTime) {
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      return `${hours}:${mins} · ${dateStr}`;
    }
    return dateStr;
  }

  return String(rawDate || '');
}

// ================= 2. APP STATE MANAGEMENT =================
function initAppState() {
    let classInfo = JSON.parse(localStorage.getItem('thi_dua_class_info')) || DEFAULT_CLASS_INFO;
  classInfo = { ...DEFAULT_CLASS_INFO, ...classInfo };
  const savedCurrentClass = localStorage.getItem('thi_dua_current_class');
  if (savedCurrentClass) {
    classInfo.className = savedCurrentClass;
  }

  // Mã trường chỉ được xác định từ tham số school hoặc dữ liệu máy chủ.
  const urlParams = (typeof window !== 'undefined' && window.location) ? new URLSearchParams(window.location.search) : null;
  const paramSchool = urlParams?.get('school');

  const masterConfig = (typeof window !== 'undefined' && window.MASTER_SYSTEM_CONFIG) ? window.MASTER_SYSTEM_CONFIG : null;
  if (paramSchool) {
    classInfo.schoolCode = String(paramSchool).trim();
    if (masterConfig && Array.isArray(masterConfig.authorizedSchools)) {
      const match = masterConfig.authorizedSchools.find(s => String(s.schoolCode).trim() === String(paramSchool).trim());
      if (match) {
        classInfo.schoolName = match.schoolName;
      }
    }
  }

  localStorage.removeItem('thi_dua_server_url');

  if (masterConfig && !classInfo.adminPin) {
    if (masterConfig.schoolAdminPin) classInfo.adminPin = masterConfig.schoolAdminPin;
  }

  if (classInfo && !classInfo.conductConfig) {
    const savedClassConduct = localStorage.getItem(`thi_dua_conduct_config_${classInfo.className}`);
    if (savedClassConduct) {
      try { classInfo.conductConfig = JSON.parse(savedClassConduct); } catch(e) {}
    }
  }

  return {
    classInfo,
    schoolClasses: JSON.parse(localStorage.getItem('thi_dua_school_classes')) || DEFAULT_SCHOOL_CLASSES,
    criteria: JSON.parse(localStorage.getItem('thi_dua_criteria')) || DEFAULT_CRITERIA,
    students: JSON.parse(localStorage.getItem('thi_dua_students')) || DEFAULT_STUDENTS,
    logs: JSON.parse(localStorage.getItem('thi_dua_logs')) || DEFAULT_LOGS,
    geminiConfig: JSON.parse(localStorage.getItem('thi_dua_gemini')) || DEFAULT_GEMINI_CONFIG,
    classAnnouncements: (JSON.parse(localStorage.getItem('thi_dua_class_announcements')) || []).filter(a => a.id !== 'ann_1'),
    
    isCloudSynced: false,
    
    // Checksum để chống nhấp nháy màn hình (anti-flicker)
    lastDataHash: '',
    deletedLogIds: JSON.parse(localStorage.getItem('thi_dua_deleted_log_ids')) || [],
    deletedStudentIds: JSON.parse(localStorage.getItem('thi_dua_deleted_student_ids')) || [],
    
    // User Roles: 'gvcn', 'student', 'parent', or null
    currentRole: localStorage.getItem('thi_dua_current_role') || null,
    currentStudentCode: localStorage.getItem('thi_dua_current_student_code') || null,
    currentParentStudentCode: localStorage.getItem('thi_dua_current_parent_student_code') || null,
    
    // UI States
    activeTab: 'scoring',
    activeTeamTab: 1,
    activeDayFilter: 'all',
    
    // Report Scopes
    reportScope: 'week',
    reportScopeValue: 1,
    
    // Modal states
    selectedStudent: null,
    modalActionType: 'plus',
    modalCriteriaCategory: 'all',
    uploadedStudentsPreview: null
  };
}

let appState = initAppState();

// ================= 3. INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  // Với Supabase, localStorage chỉ là cache giao diện, không được tự sinh mã
  // hay trở thành nguồn dữ liệu để ghi ngược lên cloud khi mở ứng dụng.
  if (!isSupabaseActive()) {
    ensureStudentCodes();
    saveToLocalStorage();
  }
  syncHeaderUI();
  syncClassSettingsUI();
  syncGeminiSettingsUI();
  
  // Áp dụng vai trò hiện tại hoặc mở Gateway
  applyCurrentRoleView();
  initOneSignalSDK();

  // Tải dữ liệu hiện tại từ máy chủ.
  if (isSupabaseActive()) {
    syncFromSupabase();
  }

  // Đăng ký Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(err => console.log('SW register warning:', err));
  }

  
  // Lắng nghe phím ENTER trên tất cả 4 ô đăng nhập
  document.getElementById('gate-gvcn-pin')?.addEventListener('keydown', e => { if (e.key === 'Enter') loginAsGvcn(); });
  document.getElementById('gate-student-code')?.addEventListener('keydown', e => { if (e.key === 'Enter') loginAsStudent(); });
  document.getElementById('gate-parent-code')?.addEventListener('keydown', e => { if (e.key === 'Enter') loginAsParent(); });
  document.getElementById('gate-admin-pin')?.addEventListener('keydown', e => { if (e.key === 'Enter') loginAsSchoolAdmin(); });

  lucide.createIcons();
});

function ensureStudentCodes(forceRegenerate = false) {
  const sCode = String(appState.classInfo.schoolCode || '90').trim().toUpperCase();
  const curClass = getCleanClassCode(appState.classInfo.className || '10A1');

  appState.students.forEach((s, idx) => {
    const codeStr = String(s.code || '').trim().toUpperCase();
    if (!s.className || forceRegenerate) {
      s.className = extractClassFromStudentCode(codeStr, curClass);
    }
    s.className = getCleanClassCode(s.className);
    s.classCode = `${sCode}${s.className}`;
    if (!s.studentPassword) s.studentPassword = '123456';
    if (!s.parentPassword) s.parentPassword = '123456';
  });
}

function saveToLocalStorage() {
  localStorage.setItem('thi_dua_school_classes', JSON.stringify(appState.schoolClasses || []));
  localStorage.setItem('thi_dua_current_class', appState.classInfo.className || '10A1');
  localStorage.setItem('thi_dua_class_info', JSON.stringify(appState.classInfo));
  if (appState.classInfo?.conductConfig) {
    localStorage.setItem(`thi_dua_conduct_config_${appState.classInfo.className}`, JSON.stringify(appState.classInfo.conductConfig));
    localStorage.setItem('thi_dua_conduct_config', JSON.stringify(appState.classInfo.conductConfig));
  }
  localStorage.setItem('thi_dua_criteria', JSON.stringify(appState.criteria));
  localStorage.setItem('thi_dua_students', JSON.stringify(appState.students));
  localStorage.setItem('thi_dua_logs', JSON.stringify(appState.logs));
  localStorage.setItem('thi_dua_gemini', JSON.stringify(appState.geminiConfig));
  localStorage.setItem('thi_dua_class_announcements', JSON.stringify(appState.classAnnouncements));
  if (appState.currentRole) localStorage.setItem('thi_dua_current_role', appState.currentRole);
  else localStorage.removeItem('thi_dua_current_role');
  if (appState.currentStudentCode) localStorage.setItem('thi_dua_current_student_code', appState.currentStudentCode);
  if (appState.currentParentStudentCode) localStorage.setItem('thi_dua_current_parent_student_code', appState.currentParentStudentCode);
}

function syncHeaderUI() {
  const headerClass = document.getElementById('header-class-name');
  const headerSchoolBadge = document.getElementById('header-school-badge');
  const gatewayTitle = document.getElementById('gateway-class-title');
  const weekLabel = document.getElementById('current-week-label');
  const subInfo = document.getElementById('header-sub-info');
  const roleLabel = document.getElementById('current-role-label');

  const rawSchoolName = appState.classInfo.schoolName || 'Trường Vọng Thê';
  const schoolName = rawSchoolName;
  const curWeek = appState.classInfo.currentWeek || 1;

  if (gatewayTitle) gatewayTitle.innerText = schoolName.toUpperCase();
  if (weekLabel) weekLabel.innerText = `Tuần ${curWeek}`;

  // ĐỒNG BỘ TIÊU ĐỀ TÊN TRƯỜNG TRÊN TẤT CẢ 4 CỔNG GIAO DIỆN
  const studentSchoolEl = document.getElementById('student-header-school-name');
  if (studentSchoolEl) studentSchoolEl.innerText = schoolName.toUpperCase();
  const parentSchoolEl = document.getElementById('parent-header-school-name');
  if (parentSchoolEl) parentSchoolEl.innerText = schoolName.toUpperCase();
  const gvcnSchoolEl = document.getElementById('gvcn-header-school-name');
  if (gvcnSchoolEl) gvcnSchoolEl.innerText = schoolName.toUpperCase();
  const bghSchoolEl = document.getElementById('school-view-name');
  if (bghSchoolEl) bghSchoolEl.innerText = schoolName.toUpperCase();

  if (appState.currentRole === 'school_admin') {
    // VAI TRÒ BAN GIÁM HIỆU / QUẢN TRỊ TRƯỜNG
    if (headerClass) headerClass.innerText = schoolName.toUpperCase();
    if (headerSchoolBadge) {
      headerSchoolBadge.innerText = 'BGH';
      headerSchoolBadge.className = 'text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40';
    }
    if (subInfo) subInfo.innerText = `Toàn trường • Tuần ${curWeek}`;
    if (roleLabel) roleLabel.innerText = 'BGH Nhà Trường';
  } else if (appState.currentRole === 'student') {
    // VAI TRÒ HỌC SINH
    const student = appState.students.find(s => s.code && s.code.toUpperCase() === appState.currentStudentCode) || appState.students[0];
    const sClass = student ? (student.className || extractClassFromStudentCode(student.code, '10A1')) : (appState.classInfo.className || '10A1');
    if (headerClass) headerClass.innerText = `Lớp ${sClass}`;
    if (headerSchoolBadge) {
      headerSchoolBadge.innerText = schoolName;
      headerSchoolBadge.className = 'text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
    }
    if (subInfo) subInfo.innerText = `Tuần ${curWeek}`;
    if (roleLabel) roleLabel.innerText = `Học Sinh (${sClass})`;

    const studentClassEl = document.getElementById('student-header-class-name');
    if (studentClassEl) studentClassEl.innerText = `LỚP ${sClass.toUpperCase()} • CỔNG HỌC SINH`;
  } else if (appState.currentRole === 'parent') {
    // VAI TRÒ PHỤ HUYNH
    const student = appState.students.find(s => s.code && s.code.toUpperCase() === appState.currentParentStudentCode) || appState.students[0];
    const sClass = student ? (student.className || extractClassFromStudentCode(student.code, '10A1')) : (appState.classInfo.className || '10A1');
    if (headerClass) headerClass.innerText = `Lớp ${sClass}`;
    if (headerSchoolBadge) {
      headerSchoolBadge.innerText = schoolName;
      headerSchoolBadge.className = 'text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
    }
    if (subInfo) subInfo.innerText = `Tuần ${curWeek}`;
    if (roleLabel) roleLabel.innerText = `Phụ Huynh (${sClass})`;

    const parentClassEl = document.getElementById('parent-header-class-name');
    if (parentClassEl) parentClassEl.innerText = `LỚP ${sClass.toUpperCase()} • SỔ LIÊN LẠC ĐIỆN TỬ`;
  } else if (appState.currentRole === 'gvcn') {
    // VAI TRÒ GVCN
    const curClass = appState.classInfo.className || '10A1';
    if (headerClass) headerClass.innerText = `Lớp ${curClass}`;
    if (headerSchoolBadge) {
      headerSchoolBadge.innerText = schoolName;
      headerSchoolBadge.className = 'text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
    }
    if (subInfo) subInfo.innerText = `Tuần ${curWeek}`;
    if (roleLabel) roleLabel.innerText = `GVCN (${curClass})`;

    const gvcnClassTitle = document.getElementById('gvcn-header-class-title');
    if (gvcnClassTitle) gvcnClassTitle.innerText = `Lớp ${curClass}`;
    const gvcnWeekBadge = document.getElementById('gvcn-header-week-badge');
    if (gvcnWeekBadge) gvcnWeekBadge.innerText = `Tuần ${curWeek}`;
  } else {
    // CHƯA ĐĂNG NHẬP (MÀN HÌNH CHÍNH / GATEWAY)
    if (headerClass) headerClass.innerText = schoolName.toUpperCase();
    if (headerSchoolBadge) {
      headerSchoolBadge.innerText = schoolName;
      headerSchoolBadge.className = 'text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
    }
    if (subInfo) subInfo.innerText = `Tuần ${curWeek}`;
    if (roleLabel) roleLabel.innerText = 'Đăng Nhập';
  }

  try { renderScoringWeekBar(); } catch(e) {}
  updateCloudBadgeUI();
}

function updateCloudBadgeUI() {
  const badge = document.getElementById('cloud-sync-badge');
  const dot = document.getElementById('cloud-dot');
  const text = document.getElementById('cloud-text');
  if (!badge) return;

  if (appState.isCloudSynced) {
    badge.className = 'inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-pointer';
    dot.className = 'w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse';
    if (_lastSyncTimestamp > 0) {
      const secAgo = Math.round((Date.now() - _lastSyncTimestamp) / 1000);
      text.innerText = secAgo < 5 ? '● Trực tuyến' : `● ${secAgo}s trước`;
    } else {
      text.innerText = '● Trực tuyến';
    }
  } else if (_syncInProgress) {
    badge.className = 'inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 cursor-pointer';
    dot.className = 'w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse';
    text.innerText = '⚡ Đang đồng bộ...';
  } else {
    badge.className = 'inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-pointer';
    dot.className = 'w-1.5 h-1.5 rounded-full bg-amber-400';
    text.innerText = 'Đang kết nối...';
  }
}

function syncClassSettingsUI() {
  const sCode = appState.classInfo?.schoolCode || '90';
  const cName = appState.classInfo?.className || '10A1';
  const sName = appState.classInfo?.schoolName || 'THPT';
  const tName = appState.classInfo?.teacherName || 'GVCN';
  const pinVal = appState.classInfo?.pin || '1234';
  const baseVal = appState.classInfo?.baseScore || 100;
  const weeksVal = appState.classInfo?.totalWeeks || 18;
  const teamsVal = String(appState.classInfo?.totalTeams || 4);

  const schoolCodeEl = document.getElementById('setting-school-code');
  const classNameEl = document.getElementById('setting-class-name');
  const schoolNameEl = document.getElementById('setting-school-name');
  const teacherNameEl = document.getElementById('setting-teacher-name');
  const pinEl = document.getElementById('setting-pin');
  const baseScoreEl = document.getElementById('setting-base-score');
  const totalWeeksEl = document.getElementById('setting-total-weeks');
  const totalTeamsEl = document.getElementById('setting-total-teams');

  if (schoolCodeEl) schoolCodeEl.value = sCode;
  if (classNameEl) classNameEl.value = cName;
  if (schoolNameEl) schoolNameEl.value = sName;
  if (teacherNameEl) teacherNameEl.value = tName;
  if (pinEl) pinEl.value = pinVal;
  if (baseScoreEl) baseScoreEl.value = baseVal;
  if (totalWeeksEl) totalWeeksEl.value = weeksVal;
  if (totalTeamsEl) totalTeamsEl.value = teamsVal;

  const previewEl = document.getElementById('preview-code-format');
  if (previewEl) {
    previewEl.innerText = generateUnifiedStudentCode(1, sCode, cName);
  }

  // BGH Settings sync
  const adminBaseScoreEl = document.getElementById('admin-setting-base-score');
  const adminSchoolNameEl = document.getElementById('admin-setting-school-name');
  const adminSchoolCodeEl = document.getElementById('admin-setting-school-code');
  const adminTotalWeeksEl = document.getElementById('admin-setting-total-weeks');

  if (adminBaseScoreEl) adminBaseScoreEl.value = baseVal;
  if (adminSchoolNameEl) adminSchoolNameEl.value = sName;
  if (adminSchoolCodeEl) adminSchoolCodeEl.value = sCode;
  if (adminTotalWeeksEl) adminTotalWeeksEl.value = weeksVal;

  try { syncSchoolExclusiveLinkInput(); } catch(e) {}
  try { renderGvcnStudentPasswordTable(); } catch(e) {}
  try { syncConductConfigUI(); } catch(e) {}
  try { renderCriteriaList(); } catch(e) {}
  try { populateResetWeekSelect(); } catch(e) {}
  try { renderScoringWeekBar(); } catch(e) {}
}

function syncGeminiSettingsUI() {
  const keyInput = document.getElementById('setting-gemini-key');
  if (keyInput) keyInput.value = appState.geminiConfig.apiKey || '';
}

function syncServerSettingsUI() {}

// ================= 4. GATEWAY & 3-MODE ROLE SWITCHING =================
function applyCurrentRoleView() {
  const gateway = document.getElementById('portal-gateway-screen');
  const studentView = document.getElementById('view-student-portal');
  const parentView = document.getElementById('view-parent-portal');
  const gvcnView = document.getElementById('view-gvcn-portal');
  const schoolAdminView = document.getElementById('view-school-admin-portal');
  const bottomNav = document.getElementById('bottom-nav-bar');
  const dayFilterBar = document.getElementById('day-filter-bar');

  if (!appState.currentRole) {
    if (gateway) {
      gateway.classList.remove('hidden');
      gateway.style.display = '';
    }
    if (studentView) studentView.classList.add('hidden');
    if (parentView) parentView.classList.add('hidden');
    if (gvcnView) gvcnView.classList.add('hidden');
    if (schoolAdminView) schoolAdminView.classList.add('hidden');
    if (bottomNav) bottomNav.classList.add('hidden');
    if (dayFilterBar) dayFilterBar.classList.add('hidden');
    syncHeaderUI();
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  // Khi đã có vai trò đăng nhập -> ẨN GATEWAY TRIỆT ĐỂ
  if (gateway) {
    gateway.classList.add('hidden');
    gateway.style.display = 'none';
  }

  if (appState.currentRole === 'school_admin') {
    if (schoolAdminView) schoolAdminView.classList.remove('hidden');
    if (gvcnView) gvcnView.classList.add('hidden');
    if (studentView) studentView.classList.add('hidden');
    if (parentView) parentView.classList.add('hidden');
    if (bottomNav) bottomNav.classList.add('hidden');
    if (dayFilterBar) dayFilterBar.classList.add('hidden');
    renderSchoolAdminPortalView();
  } else if (appState.currentRole === 'gvcn') {
    if (gvcnView) gvcnView.classList.remove('hidden');
    if (schoolAdminView) schoolAdminView.classList.add('hidden');
    if (studentView) studentView.classList.add('hidden');
    if (parentView) parentView.classList.add('hidden');
    if (bottomNav) bottomNav.classList.remove('hidden');
    if (dayFilterBar) dayFilterBar.classList.remove('hidden');
    renderTeamTabsBar();
    renderStudentList();
    renderLeaderboard();
    renderLogs();
    updateReportCardPreview();
  } else if (appState.currentRole === 'student') {
    if (studentView) studentView.classList.remove('hidden');
    if (schoolAdminView) schoolAdminView.classList.add('hidden');
    if (gvcnView) gvcnView.classList.add('hidden');
    if (parentView) parentView.classList.add('hidden');
    if (bottomNav) bottomNav.classList.add('hidden');
    if (dayFilterBar) dayFilterBar.classList.add('hidden');
    renderStudentPortalView();
  } else if (appState.currentRole === 'parent') {
    if (parentView) parentView.classList.remove('hidden');
    if (schoolAdminView) schoolAdminView.classList.add('hidden');
    if (gvcnView) gvcnView.classList.add('hidden');
    if (studentView) studentView.classList.add('hidden');
    if (bottomNav) bottomNav.classList.add('hidden');
    if (dayFilterBar) dayFilterBar.classList.add('hidden');
    renderParentPortalView();
  }

  syncHeaderUI();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function openGatewayModal() {
  const gateway = document.getElementById('portal-gateway-screen');
  if (gateway) {
    gateway.classList.remove('hidden');
    gateway.style.display = '';
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeGatewayModal() {
  const gateway = document.getElementById('portal-gateway-screen');
  if (gateway) {
    gateway.classList.add('hidden');
    gateway.style.display = 'none';
  }
}

function logoutCurrentRole() {
  const roleName = appState.currentRole === 'parent' ? 'Phụ Huynh' : (appState.currentRole === 'student' ? 'Học Sinh' : (appState.currentRole === 'gvcn' ? 'GVCN' : (appState.currentRole === 'school_admin' ? 'BGH' : 'Tài Khoản')));
  if (confirm(`Bạn có chắc chắn muốn ĐĂNG XUẤT khỏi [${roleName}]?

(Sau khi đăng xuất, bạn có thể chọn đăng nhập tài khoản khác).`)) {
    appState.currentRole = null;
    appState.currentStudentCode = null;
    appState.currentParentStudentCode = null;
    appState.currentParentStudentName = null;
    
    localStorage.removeItem('thi_dua_current_role');
    localStorage.removeItem('thi_dua_current_student_code');
    localStorage.removeItem('thi_dua_current_parent_student_code');
    localStorage.removeItem('thi_dua_parent_saved_student');
    
    logoutOneSignalUser();
    applyCurrentRoleView();
    showToast('Đã đăng xuất thành công!', 'info');
  }
}

// HÀM TỰ ĐỘNG NHẬN DIỆN VÀ PHÂN LUỒNG MÃ TRƯỜNG DỰA VÀO MÃ HỌC SINH HOẶC MÃ LỚP
function detectAndRouteSchool(query) {
  if (!query) return;
  const q = String(query).trim().toUpperCase();
  const masterConfig = (typeof window !== 'undefined' && window.MASTER_SYSTEM_CONFIG) ? window.MASTER_SYSTEM_CONFIG : null;
  const authSchools = (masterConfig && Array.isArray(masterConfig.authorizedSchools)) ? masterConfig.authorizedSchools : [];

  if (authSchools.length === 0) return;

  for (const s of authSchools) {
    const sCode = String(s.schoolCode || '').trim().toUpperCase();
    if (sCode && q.startsWith(sCode)) {
      if (appState.classInfo.schoolCode !== sCode) {
        appState.classInfo.schoolCode = sCode;
        appState.classInfo.schoolName = s.schoolName;
        saveToLocalStorage();
      }
      return;
    }
  }
}

// HÀM TÌM HỌC SINH THÔNG MINH (CHẤP NHẬN CẢ MÃ ĐẦY ĐỦ 9010A101, MÃ NGẮN A101, SỐ THỨ TỰ, HOẶC HỌ TÊN)
function findStudentByFlexibleQuery(query) {
  if (!query) return null;
  const q = String(query).trim().toUpperCase();
  if (!q) return null;

  // 1. Khớp chính xác mã
  let found = (appState.students || []).find(s => String(s.code || '').toUpperCase() === q);
  if (found) return found;

  // 2. Khớp đuôi mã (ví dụ gõ 9010A101 nhưng học sinh lưu A101, hoặc ngược lại)
  found = (appState.students || []).find(s => {
    const sCode = String(s.code || '').toUpperCase();
    return sCode.endsWith(q) || q.endsWith(sCode);
  });
  if (found) return found;

  // 3. Khớp tên học sinh (không dấu / có dấu)
  const qLower = q.toLowerCase();
  found = (appState.students || []).find(s => String(s.name || '').toLowerCase() === qLower);
  if (found) return found;

  return null;
}

async function findExactStudentFromSupabase(code) {
  const cleanCode = String(code || '').trim().replace(/\s+/g, '').toUpperCase();
  const schoolCode = getSchoolCodeFromFullCode(cleanCode);
  if (!isSupabaseActive()) return null;
  const sb = getSupabaseClient();
  if (!sb) return null;

  let query = sb.from('students').select('*').eq('code', cleanCode);
  if (schoolCode) {
    query = query.eq('school_code', schoolCode);
  }
  const { data, error } = await query.order('created_at', { ascending: false }).limit(1);
  if (error || !data || data.length === 0) return null;
  const studentRow = data[0];
  const className = getCleanClassCode(studentRow.class_name || '');
  return {
    id: studentRow.id,
    code: studentRow.code,
    name: studentRow.name,
    team: parseInt(studentRow.team) || 1,
    role: normalizeRole(studentRow.role),
    schoolCode: studentRow.school_code,
    className,
    classCode: studentRow.class_code,
    studentPassword: String(studentRow.student_password || '123456').trim(),
    parentPassword: String(studentRow.parent_password || '123456').trim()
  };
}

async function loginAsGvcn() {
  const codeInput = String(document.getElementById('gate-gvcn-class')?.value || '').trim();
  const pinInput = String(document.getElementById('gate-gvcn-pin')?.value || '').trim();

  if (!codeInput) {
    showToast('Vui lòng nhập Mã Lớp hoặc Tên Lớp (ví dụ: 1412A1 hoặc 12A1)!', 'warning');
    return;
  }
  if (!pinInput) {
    showToast('Vui lòng nhập Mật khẩu GVCN (mặc định: 1234)!', 'warning');
    return;
  }

  let cleanCode = codeInput.replace(/lớp/gi, '').replace(/\s+/g, '').toUpperCase();
  const requestedSchoolCode = getSchoolCodeFromFullCode(cleanCode);

  // Đăng nhập GVCN phải dùng mã lớp đầy đủ, ví dụ 9011A8. Không dùng tên lớp
  // ngắn vì 11A8 có thể tồn tại ở nhiều trường.
  if (!requestedSchoolCode || cleanCode.length <= requestedSchoolCode.length) {
    showToast('Vui lòng nhập đầy đủ Mã Trường + Tên Lớp, ví dụ: 9011A8.', 'warning');
    return;
  }
  try {
    showToast('Đang xác thực', 'info');
    const auth = await secureLogin('gvcn', { classCode: cleanCode, password: pinInput });
    appState.currentRole = 'gvcn';
    appState.classInfo.schoolCode = auth.session.schoolCode;
    appState.classInfo.className = auth.session.className;
    appState.classInfo.teacherName = auth.session.teacherName || '';
    delete appState.classInfo.pin; delete appState.classInfo.adminPin;
    appState.classInfo.currentWeek = 0;
    appState.students = []; appState.logs = [];
    await syncFromSecureApi(false);
    saveToLocalStorage(); applyCurrentRoleView(); syncClassSettingsUI(); initSupabaseRealtime(); initOneSignalSDK();
    showToast(`Đăng nhập thành công Lớp ${auth.session.className}!`, 'success');
    return;
  } catch (error) {
    showToast(error.message || 'Thông tin đăng nhập không chính xác.', 'warning');
    return;
  }
  
  // 1. Tự động nhận diện trường từ mã lớp
  if (typeof detectAndRouteSchool === 'function') {
    detectAndRouteSchool(cleanCode);
  }

  const curSCode = String(appState.classInfo?.schoolCode || '90').trim();

  const shortClassName = getCleanClassCode(cleanCode.slice(requestedSchoolCode.length));

  let matched = null;

  // 3. Nếu chưa tìm thấy trong cache, kiểm tra trực tiếp trên Supabase
  if (!matched && isSupabaseActive()) {
    try {
      const sb = getSupabaseClient();
      if (sb) {
        // Chỉ truy vấn đúng một lớp thuộc đúng một trường. Không sử dụng cache
        // localStorage để xác thực GVCN.
        const { data: dbCls } = await sb
          .from('school_classes')
          .select('*')
          .eq('school_code', requestedSchoolCode)
          .eq('class_code', cleanCode)
          .maybeSingle();

        if (dbCls) {
          matched = {
            schoolCode: dbCls.school_code,
            classCode: dbCls.class_code || `${dbCls.school_code}${dbCls.class_name}`,
            className: dbCls.class_name,
            teacherName: dbCls.teacher_name || '',
            pin: String(dbCls.pin || '1234').trim(),
            studentCount: dbCls.student_count || 40
          };
        } else {
          // Một số dữ liệu cũ chưa có school_classes: chỉ dùng cấu hình cùng
          // school_code và class_name được suy ra từ mã lớp đầy đủ.
          const { data: dbCfg } = await sb
          .from('class_configs')
          .select('*')
            .eq('school_code', requestedSchoolCode)
            .eq('class_name', shortClassName)
            .maybeSingle();

          if (dbCfg && cleanCode === `${requestedSchoolCode}${getCleanClassCode(dbCfg.class_name)}`) {
            matched = {
              schoolCode: dbCfg.school_code || curSCode,
              classCode: `${dbCfg.school_code || curSCode}${dbCfg.class_name}`,
              className: dbCfg.class_name,
              teacherName: dbCfg.teacher_name || '',
              pin: String(dbCfg.pin || '1234').trim(),
              studentCount: 40
            };
          }
        }
      }
    } catch (e) {
      console.warn('Supabase GVCN login check error:', e);
    }
  }

  // Các trường không dùng Supabase vẫn chỉ được đối chiếu trong dữ liệu đã
  // đồng bộ của chính trường đó; không tìm theo tên lớp giữa các trường.
  if (!matched && !isSupabaseActive()) {
    await syncFromServer(false);
    matched = (appState.schoolClasses || []).find(c =>
      String(c.schoolCode || requestedSchoolCode).trim().toUpperCase() === requestedSchoolCode &&
      String(c.classCode || '').replace(/\s+/g, '').toUpperCase() === cleanCode
    ) || null;
  }

  if (matched) {
    const classPin = String(matched.pin || '1234').trim();
    if (pinInput === classPin) {
      const sCode = String(matched.schoolCode || curSCode);
      appState.classInfo.schoolCode = sCode;
      
      const masterConfig = (typeof window !== 'undefined' && window.MASTER_SYSTEM_CONFIG) ? window.MASTER_SYSTEM_CONFIG : null;
      const authSchools = (masterConfig && Array.isArray(masterConfig.authorizedSchools)) ? masterConfig.authorizedSchools : [];
      const sInfo = authSchools.find(s => String(s.schoolCode) === String(sCode));
      if (sInfo && sInfo.schoolName) {
        appState.classInfo.schoolName = sInfo.schoolName;
      }
      
      const targetCleanClass = getCleanClassCode(matched.className);
      const prevClass = getCleanClassCode(appState.classInfo?.className || '');

      // Nếu chuyển từ lớp này sang lớp khác: xóa sạch bộ nhớ tạm của lớp cũ
      if (prevClass && prevClass !== targetCleanClass) {
        appState.students = [];
        appState.logs = [];
        appState.classAnnouncements = [];
      }

      appState.classInfo.className = matched.className;
      localStorage.setItem('thi_dua_current_class', matched.className);
      appState.classInfo.teacherName = matched.teacherName || 'Thầy/Cô Chủ Nhiệm';
      appState.classInfo.pin = classPin;
      appState.currentRole = 'gvcn';
      initSupabaseRealtime();
      
      saveToLocalStorage();
      applyCurrentRoleView();
      syncClassSettingsUI();
      initOneSignalSDK();
      
      showToast(`🎉 Đăng nhập thành công Lớp ${matched.className}!`, 'success');
      // Đồng bộ nạp ngay danh sách học sinh và nhật ký của đúng lớp này từ Supabase
      syncFromServer(false);
      return;
    } else {
      showToast(`❌ Mật khẩu GVCN của Lớp ${matched.className} không đúng! Mật khẩu mặc định là: 1234 (hoặc liên hệ BGH).`, 'warning');
      return;
    }
  }

  showToast(`⚠️ Không tìm thấy Lớp "${shortClassName}" (Mã: ${cleanCode})! Vui lòng kiểm tra lại Tên Lớp hoặc liên hệ BGH.`, 'warning');
}

async function loginAsStudent() {
  const codeQuery = String(document.getElementById('gate-student-code')?.value || '').trim();
  const passInput = String(document.getElementById('gate-student-pass')?.value || '').trim();
  
  if (!codeQuery) {
    showToast('Vui lòng nhập Mã Học Sinh!', 'warning');
    return;
  }
  if (!passInput) {
    showToast('Vui lòng nhập Mật Khẩu Học Sinh (mặc định: 123456)!', 'warning');
    return;
  }

  const cleanCode = codeQuery.replace(/\s+/g, '').toUpperCase();
  const requestedSchoolCode = getSchoolCodeFromFullCode(cleanCode);
  if (!requestedSchoolCode) {
    showToast('Mã học sinh phải có đầy đủ Mã Trường + Mã Lớp + STT.', 'warning');
    return;
  }
  try {
    showToast('Đang xác thực', 'info');
    const auth = await secureLogin('student', { studentCode: cleanCode, password: passInput });
    const student = auth.student;
    appState.currentRole = 'student'; appState.classInfo.schoolCode = student.schoolCode; appState.classInfo.className = student.className; appState.classInfo.currentWeek = 0; appState.currentStudentCode = student.code;
    await syncFromSecureApi(false); saveToLocalStorage(); applyCurrentRoleView(); initSupabaseRealtime(); initOneSignalSDK();
    showToast(`Xin chào em ${student.name}!`, 'success');
    return;
  } catch (error) { showToast(error.message || 'Thông tin đăng nhập không chính xác.', 'warning'); return; }
  detectAndRouteSchool(cleanCode);
  showToast('⚡ Đang xác thực học sinh...', 'info');
  let student = await findExactStudentFromSupabase(cleanCode);

  if (!student) {
    const curSCode = String(appState.classInfo?.schoolCode || '90').trim();
    showToast(`⚠️ Không tìm thấy Mã Học Sinh "${codeQuery}"! Mã trường bạn là [${curSCode}]. Ví dụ học sinh lớp 10A7, STT 08 thì Mã là: ${curSCode}10A708. Vui lòng kiểm tra lại mã do GVCN cấp!`, 'warning');
    return;
  }

  const currentPass = String(student.studentPassword || '123456').trim();
  const isMatch = passInput === currentPass;

  if (!isMatch) {
    showToast('Mật khẩu Học Sinh chưa chính xác (Mặc định: 123456)! Vui lòng kiểm tra lại.', 'warning');
    return;
  }

  appState.currentRole = 'student';
  appState.classInfo.schoolCode = student.schoolCode;
  appState.classInfo.className = student.className;
  appState.currentStudentCode = student.code;
  await syncFromSupabase();
  studentViewScope = 'week';
  studentViewScopeValue = null;
  studentSelectedWeekFilter = 'current';
  initSupabaseRealtime();
  saveToLocalStorage();
  applyCurrentRoleView();
  initOneSignalSDK();

  const isLeader = student.role === 'leader' || student.role === 'monitor' || student.role === 'vice_monitor' || student.role === 'sub_leader';
  if (isLeader) {
    showToast(`Xin chào Tổ trưởng / Cán sự ${student.name}! Bạn có quyền chấm điểm tổ của mình.`, 'success');
  } else {
    showToast(`Xin chào em ${student.name}! Chúc em có một tuần học tập thật tốt.`, 'success');
  }
}

// 3. ĐĂNG NHẬP PHỤ HUYNH (MÃ CON + MẬT KHẨU PH DO GVCN CẤP)
async function loginAsParent() {
  const codeQuery = String(document.getElementById('gate-parent-code')?.value || '').trim();
  const passInput = String(document.getElementById('gate-parent-pass')?.value || '').trim();
  
  if (!codeQuery) {
    showToast('Vui lòng nhập Mã Học Sinh của con!', 'warning');
    return;
  }
  if (!passInput) {
    showToast('Vui lòng nhập Mật Khẩu Phụ Huynh (mặc định: 123456)!', 'warning');
    return;
  }

  const cleanCode = codeQuery.replace(/\s+/g, '').toUpperCase();
  const requestedSchoolCode = getSchoolCodeFromFullCode(cleanCode);
  if (!requestedSchoolCode) {
    showToast('Mã học sinh phải có đầy đủ Mã Trường + Mã Lớp + STT.', 'warning');
    return;
  }
  try {
    showToast('Đang xác thực', 'info');
    const auth = await secureLogin('parent', { studentCode: cleanCode, password: passInput });
    const student = auth.student;
    appState.currentRole = 'parent'; appState.classInfo.schoolCode = student.schoolCode; appState.classInfo.className = student.className; appState.classInfo.currentWeek = 0; appState.currentParentStudentCode = student.code; appState.currentParentStudentName = student.name || '';
    await syncFromSecureApi(false); saveToLocalStorage(); document.documentElement.classList.add('has-active-session'); applyCurrentRoleView(); initSupabaseRealtime(); initOneSignalSDK(); requestNotificationPermissionPrompt();
    showToast(`Kính chào Quý Phụ huynh em ${student.name}!`, 'success');
    return;
  } catch (error) { showToast(error.message || 'Thông tin đăng nhập không chính xác.', 'warning'); return; }
  detectAndRouteSchool(cleanCode);
  showToast('⚡ Đang xác thực phụ huynh...', 'info');
  let student = await findExactStudentFromSupabase(cleanCode);

  if (!student) {
    const curSCode = String(appState.classInfo?.schoolCode || '90').trim();
    showToast(`⚠️ Không tìm thấy Mã Học Sinh "${codeQuery}"! Mã trường bạn là [${curSCode}]. Ví dụ học sinh lớp 10A7, STT 08 thì Mã là: ${curSCode}10A708. Vui lòng kiểm tra lại mã do GVCN cấp!`, 'warning');
    return;
  }

  const currentPass = String(student.parentPassword || '123456').trim();
  const isMatch = passInput === currentPass;

  if (!isMatch) {
    showToast('Mật khẩu Phụ Huynh chưa chính xác (Mặc định: 123456)! Vui lòng kiểm tra lại.', 'warning');
    return;
  }

  appState.currentRole = 'parent';
  appState.classInfo.schoolCode = student.schoolCode;
  appState.classInfo.className = student.className;
  appState.currentParentStudentCode = student.code;
  appState.currentParentStudentName = student.name || '';
  parentViewScope = 'week';
  parentViewScopeValue = null;
  await syncFromSupabase();
  initSupabaseRealtime();
  localStorage.setItem('thi_dua_parent_saved_student', JSON.stringify(student));
  saveToLocalStorage();
  document.documentElement.classList.add('has-active-session');
  applyCurrentRoleView();
  initOneSignalSDK();
  requestNotificationPermissionPrompt();
  showToast(`Kính chào Quý Phụ huynh em ${student.name}!`, 'success');
}

// ================= CỔNG QUẢN TRỊ KỸ THUẬT (MASTER ADMIN - CẤP MÃ 1 LẦN) =================
let _generatedHandoverText = '';

async function openSuperAdminModal() {
  const modal = document.getElementById('super-admin-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  // sessionStorage chỉ là cờ giao diện; quyền thực được xác minh bằng cookie HttpOnly ở server.
  let sessionIsValid = false;
  try {
    const response = await fetch('/api/super-admin-auth', { credentials: 'same-origin' });
    sessionIsValid = response.ok;
  } catch (_) {}

  if (sessionIsValid) {
    document.getElementById('super-admin-auth-panel')?.classList.add('hidden');
    document.getElementById('super-admin-content-box')?.classList.remove('hidden');
    await loadAllSchoolsFromSupabase();
    renderSuperAdminSchoolsList();
  } else {
    sessionStorage.removeItem('super_admin_unlocked');
    document.getElementById('super-admin-auth-panel')?.classList.remove('hidden');
    document.getElementById('super-admin-content-box')?.classList.add('hidden');
    document.getElementById('super-admin-key-input')?.focus();
  }
  lucide.createIcons();
}

function closeSuperAdminModal() {
  const modal = document.getElementById('super-admin-modal');
  if (modal) modal.classList.add('hidden');
}

async function unlockSuperAdminPanel() {
  const pin = (document.getElementById('super-admin-key-input')?.value || '').trim();
  if (!pin) {
    showToast('Vui lòng nhập mật khẩu quản trị.', 'warning');
    return;
  }

  try {
    const response = await fetch('/api/super-admin-auth', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pin })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Không thể xác thực quản trị.');
    sessionStorage.setItem('super_admin_unlocked', 'true');
    document.getElementById('super-admin-auth-panel')?.classList.add('hidden');
    document.getElementById('super-admin-content-box')?.classList.remove('hidden');
    await loadAllSchoolsFromSupabase();
    renderSuperAdminSchoolsList();
    playNotificationChime();
    showToast('🔓 Đã mở khóa Bảng Điều Khiển Master Admin!', 'success');
  } catch (e) {
    showToast(e.message || 'Mật khẩu quản trị không chính xác!', 'warning');
  }
}

function generateOneTimeActivationKey() {
  const code = (document.getElementById('gen-school-code')?.value || '').trim().toUpperCase();
  const name = (document.getElementById('gen-school-name')?.value || '').trim();
  const sheetUrl = (document.getElementById('gen-school-sheet-url')?.value || '').trim();

  if (!code) {
    showToast('Vui lòng nhập Mã Trường (ví dụ: 88)!', 'warning');
    return;
  }
  if (!name) {
    showToast('Vui lòng nhập Tên Trường (ví dụ: THCS Tây Phú)!', 'warning');
    return;
  }
  if (!sheetUrl || !sheetUrl.startsWith('http')) {
    showToast('Vui lòng nhập URL máy chủ của trường!', 'warning');
    return;
  }

  // Tạo Mã Kích Hoạt 1 Lần ngẫu nhiên duy nhất
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const activationKey = `ACT_${code}_${randomNum}`;

  // Lưu vào Registry
  let registry = JSON.parse(localStorage.getItem('thi_dua_school_registry') || '{}');
  registry[code] = {
    schoolCode: code,
    schoolName: name,
    sheetUrl: sheetUrl,
    activationKey: activationKey,
    activationKeyUsed: false,
    createdAt: Date.now()
  };
  localStorage.setItem('thi_dua_school_registry', JSON.stringify(registry));

  // Tạo Link Độc Quyền
  const currentBase = window.location.origin + window.location.pathname;
  const exclusiveLink = `${currentBase}?sheet=${encodeURIComponent(sheetUrl)}&school=${code}`;

  // Hiển thị kết quả
  const resCodeEl = document.getElementById('res-key-code');
  const resLinkEl = document.getElementById('res-school-link');
  if (resCodeEl) resCodeEl.innerText = activationKey;
  if (resLinkEl) resLinkEl.innerText = exclusiveLink;
  document.getElementById('gen-result-card')?.classList.remove('hidden');

  // Chuẩn bị tin nhắn bàn giao
  _generatedHandoverText = `🏫 THÔNG TIN BÀN GIAO HỆ THỐNG SỔ THI ĐUA ĐIỆN TỬ
Trường: ${name} (Mã Định Danh: ${code})

1. Link Độc Quyền Dành Riêng Cho Trường:
👉 ${exclusiveLink}

2. Mã Kích Hoạt Lần Đầu (Dùng 1 Lần Duy Nhất):
🔑 MÃ: ${activationKey}

⚠️ HƯỚNG DẪN BGH TRƯỜNG KÍCH HOẠT:
- BGH mở link trên -> Chọn mục 4. Ban Giám Hiệu -> Nhập Mã Kích Hoạt [${activationKey}].
- Hệ thống sẽ yêu cầu BGH đặt ngay Mã PIN bí mật mới của trường.
- Sau khi đổi PIN mới xong, Mã Kích Hoạt trên sẽ TỰ ĐỘNG HỦY VĨNH VIỄN để bảo mật tuyệt đối!

Mọi thắc mắc kỹ thuật liên hệ Admin: 0946775808 (Thầy Dũng).`;

  renderSuperAdminSchoolsList();
  playNotificationChime();
  showToast(`🎉 Đã tạo thành công Mã Kích Hoạt 1 Lần: ${activationKey}!`, 'success');
}

function copyGeneratedSchoolHandover() {
  if (!_generatedHandoverText) return;
  navigator.clipboard.writeText(_generatedHandoverText).then(() => {
    showToast('📋 Đã sao chép tin nhắn bàn giao! Thầy có thể dán gửi Zalo cho BGH trường bạn.', 'success');
  }).catch(() => {
    prompt('Sao chép thông tin bàn giao bên dưới:', _generatedHandoverText);
  });
}

function renderSuperAdminSchoolsList() {
  const container = document.getElementById('super-admin-schools-list');
  if (!container) return;

  const countBadge = document.getElementById('super-admin-schools-count');
  const searchInput = document.getElementById('super-admin-search-school');
  const query = String(searchInput?.value || '').trim().toLowerCase();

  const masterConfig = (typeof window !== 'undefined' && window.MASTER_SYSTEM_CONFIG) ? window.MASTER_SYSTEM_CONFIG : null;
  let authSchools = (masterConfig && Array.isArray(masterConfig.authorizedSchools)) ? masterConfig.authorizedSchools : [];

  if (countBadge) countBadge.innerText = `${authSchools.length} Trường`;

  if (query) {
    authSchools = authSchools.filter(s => {
      const c = String(s.schoolCode || '').toLowerCase();
      const n = String(s.schoolName || '').toLowerCase();
      return c.includes(query) || n.includes(query);
    });
  }

  if (authSchools.length === 0) {
    container.innerHTML = `<div class="text-center text-slate-400 py-3 text-[11px]">${query ? 'Không tìm thấy trường nào phù hợp với từ khóa' : 'Chưa có trường nào trong hệ thống'}</div>`;
    return;
  }

  let html = '';
  // Đưa trường mới tạo (như 50 - THCS Nguyễn Trãi - LX) lên trên cùng
  const registry = JSON.parse(localStorage.getItem('thi_dua_school_registry') || '{}');
  const customPins = JSON.parse(localStorage.getItem('thi_dua_custom_admin_pins') || '{}');
  const dynamicKeys = Object.keys(registry).concat(Object.keys(customPins)).map(k => String(k).trim().toUpperCase());

  const sortedSchools = [...authSchools].sort((a, b) => {
    const scA = String(a.schoolCode || '').trim().toUpperCase();
    const scB = String(b.schoolCode || '').trim().toUpperCase();

    if (scA === '50') return -1;
    if (scB === '50') return 1;

    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;

    const isDynA = a.isDynamic || dynamicKeys.includes(scA);
    const isDynB = b.isDynamic || dynamicKeys.includes(scB);
    if (isDynA && !isDynB) return -1;
    if (!isDynA && isDynB) return 1;

    return 0;
  });

  sortedSchools.forEach((item, idx) => {
    const sCode = String(item.schoolCode || '').trim();
    const sName = item.schoolName || '';
    const sPin = item.adminPin || `${sCode}@34`;
    const isTopRecent = idx === 0;

    html += `
      <div class="p-2.5 rounded-2xl ${isTopRecent ? 'bg-gradient-to-r from-indigo-950/90 via-slate-900 to-indigo-950/90 border-2 border-indigo-500 shadow-lg animate-scale-in' : 'bg-slate-900/90 border border-slate-800'} flex items-center justify-between gap-2 hover:border-indigo-500/50 transition-all">
        <div class="flex items-center gap-2 min-w-0">
          <span class="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 font-mono font-bold text-xs flex items-center justify-center border border-amber-500/30 shrink-0 shadow">
            ${sCode}
          </span>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-bold text-white text-xs block truncate">${sName}</span>
              ${isTopRecent ? '<span class="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400 animate-pulse">MỚI NHẤT</span>' : ''}
            </div>
            <span class="text-[10px] text-slate-400 font-mono">Mã PIN BGH: <b class="text-emerald-300">${sPin}</b></span>
          </div>
        </div>
        <button onclick="copySchoolHandoverByCode('${sCode}')" class="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded-xl shadow border border-indigo-400/40 active:scale-95 transition-all shrink-0 flex items-center gap-1" title="Sao chép tin nhắn bàn giao Zalo">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          <span>Bàn Giao</span>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function copySchoolHandoverByCode(sCode) {
  const masterConfig = (typeof window !== 'undefined' && window.MASTER_SYSTEM_CONFIG) ? window.MASTER_SYSTEM_CONFIG : null;
  const authSchools = (masterConfig && Array.isArray(masterConfig.authorizedSchools)) ? masterConfig.authorizedSchools : [];
  const s = authSchools.find(item => String(item.schoolCode).trim() === String(sCode).trim());
  if (!s) return;

  const text = buildSchoolHandoverMessage(s.schoolName, s.schoolCode, s.adminPin || `${s.schoolCode}@34`);

  navigator.clipboard.writeText(text).then(() => {
    showToast(`📋 Đã sao chép tin nhắn bàn giao [${s.schoolName}] kèm quy tắc mã! Thầy có thể dán gửi Zalo.`, 'success');
  }).catch(() => {
    prompt('Sao chép thông tin bàn giao bên dưới:', text);
  });
}


// ================= HỆ THỐNG GAMIFICATION: HUY HIỆU VINH DANH HỌC SINH =================
function calculateStudentBadges(student, currentWeek) {
  if (!student) return [];
  const targetWeek = Number(currentWeek || appState.classInfo.currentWeek || 1);
  const sId = student.id;
  const sCode = String(student.code || '').trim().toUpperCase();
  const sName = String(student.name || '').trim().toLowerCase();

  const myLogs = (appState.logs || []).filter(l => {
    return (l.studentId && l.studentId === sId) ||
           (sCode && l.studentCode && String(l.studentCode).trim().toUpperCase() === sCode) ||
           (sName && l.studentName && String(l.studentName).trim().toLowerCase() === sName);
  });

  const weekLogs = myLogs.filter(l => Number(l.week) === targetWeek);
  const stats = calculateStudentScore(student.id, targetWeek);

  const badges = [];

  // 1. 🌟 CHIẾN THẦN CHUYÊN CẦN (Không nghỉ học, không đi trễ)
  const hasAttendanceViolation = myLogs.some(l => {
    const t = String(l.critTitle || '').toLowerCase();
    return t.includes('muộn') || t.includes('trễ') || t.includes('vắng') || t.includes('nghỉ') || t.includes('trốn');
  });
  if (!hasAttendanceViolation) {
    badges.push({
      id: 'badge_chuyen_can',
      icon: '🌟',
      title: 'Chiến Thần Chuyên Cần',
      desc: '0 lần đi trễ, 0 lần vắng học - Tác phong mẫu mực',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20'
    });
  }

  // 2. 👑 ONG VÀNG HỌC TẬP (Có điểm cộng học tập / phát biểu / điểm tốt)
  const studyPlusLogs = weekLogs.filter(l => l.type === 'plus' && (l.critId?.startsWith('ht') || String(l.critTitle).toLowerCase().includes('học') || String(l.critTitle).toLowerCase().includes('phát biểu') || String(l.critTitle).toLowerCase().includes('điểm 10') || String(l.critTitle).toLowerCase().includes('điểm 9')));
  if (studyPlusLogs.length >= 1 || stats.plusPts >= 5) {
    badges.push({
      id: 'badge_ong_vang',
      icon: '👑',
      title: 'Ong Vàng Học Tập',
      desc: 'Nhiều điểm tốt & hăng hái xây dựng bài trong tuần',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20'
    });
  }

  // 3. 🚀 NGÔI SAO TIẾN BỘ (Điểm tuần cao >= 95đ hoặc duy trì vững chắc)
  if (stats.score >= 95) {
    badges.push({
      id: 'badge_tien_bo',
      icon: '🚀',
      title: 'Ngôi Sao Phong Độ',
      desc: 'Duy trì phong độ thi đua xuất sắc trên 95 điểm',
      color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-indigo-500/20'
    });
  }

  // 4. 🥇 TỔ TRƯỞNG GƯƠNG MẪU (Tổ trưởng của tổ Hạng 1 hoặc Hạng 2)
  const isLeader = student.role === 'leader' || student.role === 'monitor' || student.role === 'vice_monitor' || student.role === 'sub_leader';
  if (isLeader) {
    const curClass = student.className || extractClassFromStudentCode(student.code);
    const rankings = getTeamRankings(targetWeek, curClass);
    const myTeamRank = rankings.findIndex(t => t.team === student.team) + 1;
    if (myTeamRank === 1 || myTeamRank === 2) {
      badges.push({
        id: 'badge_to_truong',
        icon: '🥇',
        title: 'Tổ Trưởng Gương Mẫu',
        desc: `Dẫn dắt Tổ ${student.team} xuất sắc đạt Hạng ${myTeamRank} của lớp`,
        color: 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-purple-500/20'
      });
    }
  }

  // 5. 💎 GƯƠNG MẶT XUẤT SẮC (Điểm >= 105đ)
  if (stats.score >= 105) {
    badges.push({
      id: 'badge_xuat_sac',
      icon: '💎',
      title: 'Gương Mặt Xuất Sắc',
      desc: 'Điểm thi đua vượt mốc chuẩn 100đ',
      color: 'bg-pink-500/20 text-pink-300 border-pink-500/40 shadow-pink-500/20'
    });
  }

  return badges;
}

function renderBadgesToContainer(containerId, countId, badges) {
  const container = document.getElementById(containerId);
  const countEl = document.getElementById(countId);
  if (!container) return;

  if (countEl) countEl.innerText = `${badges.length} Huy Hiệu`;

  if (badges.length === 0) {
    container.innerHTML = `<div class="col-span-2 text-center text-[11px] text-slate-400 py-3 italic">Hãy tích cực học tập và rèn luyện để mở khóa các huy hiệu vinh danh nhé!</div>`;
    return;
  }

  let html = '';
  badges.forEach(b => {
    html += `
      <div class="p-2.5 rounded-2xl ${b.color} border flex items-start gap-2 shadow-sm">
        <span class="text-xl flex-shrink-0">${b.icon}</span>
        <div class="min-w-0">
          <span class="font-black text-xs block leading-tight">${b.title}</span>
          <p class="text-[10px] opacity-80 mt-0.5 leading-snug">${b.desc}</p>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// ================= 5. CỔNG HỌC SINH & QUYỀN TỔ TRƯỞNG =================

// =========================================================================
// 👑 DANH SÁCH CHẤM ĐIỂM DÀNH CHO BAN CÁN SỰ & TỔ TRƯỞNG (LEADER SCORING)
// =========================================================================
function renderLeaderTeamMembers(panel, leaderStudent) {
  const container = document.getElementById('leader-team-members-list');
  if (!container) return;

  const role = normalizeRole(leaderStudent.role);
  const isAllClass = role === 'monitor' || role === 'vice_monitor';
  const teamNum = parseInt(leaderStudent.team) || 1;
  const curClass = leaderStudent.className || getCleanClassCode(appState.classInfo.className || '10A1');

  const classStudents = getCurrentClassStudents(curClass);
  // Lớp trưởng/lớp phó chấm toàn lớp, tổ trưởng/tổ phó chấm trong tổ
  const targetMembers = isAllClass
    ? classStudents
    : classStudents.filter(s => (parseInt(s.team) || 1) === teamNum);

  if (targetMembers.length === 0) {
    container.innerHTML = `<div class="text-center text-slate-400 py-3 text-xs">Chưa có danh sách học sinh để chấm điểm</div>`;
    return;
  }

  let html = `
    <div class="text-[11px] font-bold text-amber-200/90 pt-1 pb-1 flex items-center justify-between border-t border-slate-800">
      <span>${isAllClass ? '👑 Danh Sách Chấm Điểm Toàn Lớp' : `⭐ Danh Sách Chấm Điểm Tổ ${teamNum}`} (${targetMembers.length} HS)</span>
      <span class="text-[10px] text-slate-400 font-normal">Bấm [+] hoặc [-] để ghi nhận</span>
    </div>
    <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
  `;

  targetMembers.forEach((m) => {
    const isMe = m.id === leaderStudent.id || m.code === leaderStudent.code;
    const stats = calculateStudentScore(m.id);
    html += `
      <div class="flex items-center justify-between p-2 rounded-xl bg-slate-800/90 border border-slate-700/60 hover:border-amber-500/40 transition-all text-xs">
        <div class="min-w-0 pr-2">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-white truncate">${m.name}</span>
            ${isMe ? '<span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">Bạn</span>' : ''}
          </div>
          <div class="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
            <span class="font-mono text-slate-400">${m.code || ''}</span>
            <span>• Tổ ${m.team || 1}</span>
            <span class="font-bold text-amber-300 font-mono">${stats.score}đ</span>
          </div>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button onclick="quickActionPlus('${m.id}')" class="w-7 h-7 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow active:scale-95 transition-all" title="Cộng điểm thi đua">
            +
          </button>
          <button onclick="quickActionMinus('${m.id}')" class="w-7 h-7 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow active:scale-95 transition-all" title="Trừ điểm vi phạm">
            -
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}


function renderStudentPortalView() {
  const code = appState.currentStudentCode;
  const student = appState.students.find(s => s.code && s.code.toUpperCase() === code) || appState.students[0];
  if (!student) return;

  const studentClassName = student.className || extractClassFromStudentCode(student.code || '', appState.classInfo.className || '10A1');
  appState.classInfo.className = studentClassName;

  const currentWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  const scopeVal = document.getElementById('st-scope-select-val')?.value || studentViewScopeValue || currentWeek;
  const stats = calculateScopeScoreForStudent(student.id, studentViewScope, scopeVal);
  const initials = student.name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();

  const nameEl = document.getElementById('student-view-name');
  if (nameEl) nameEl.innerText = student.name;
  const codeEl = document.getElementById('student-view-code');
  if (codeEl) codeEl.innerText = student.code || 'A101';
  const teamEl = document.getElementById('student-view-team');
  if (teamEl) teamEl.innerText = `Lớp ${studentClassName} • Tổ ${student.team}`;
  const avatarEl = document.getElementById('student-view-avatar');
  if (avatarEl) avatarEl.innerText = initials;
  const scoreEl = document.getElementById('student-view-score');
  if (scoreEl) scoreEl.innerText = `${stats.score}đ`;

  const periodLabelEl = document.getElementById('student-score-period-label');
  if (periodLabelEl) {
    if (studentViewScope === 'week') periodLabelEl.innerText = `Điểm Tuần ${scopeVal}`;
    else if (studentViewScope === 'month') periodLabelEl.innerText = `Điểm TB Tháng ${scopeVal}`;
    else if (studentViewScope === 'semester') periodLabelEl.innerText = `Điểm TB Học Kỳ ${scopeVal}`;
    else if (studentViewScope === 'year') periodLabelEl.innerText = `Điểm TB Cả Năm`;
  }

  const emotion = getConductEmotion(stats.score, stats.rankBadge);
  const badgeEl = document.getElementById('student-view-rank-badge');
  if (badgeEl) {
    badgeEl.innerHTML = `<span class="inline-block animate-pulse">${emotion.emoji}</span> <span>${stats.rankBadge}</span>`;
    badgeEl.className = `text-[9px] font-bold block ${stats.rankColor}`;
  }
  if (avatarEl) {
    avatarEl.innerHTML = `<span class="relative block">${initials}<span class="absolute -bottom-1.5 -right-2 text-sm drop-shadow animate-bounce">${emotion.emoji}</span></span>`;
  }

  const userRole = normalizeRole(student.role);
  const roleMap = {
    'leader': '⭐ Tổ Trưởng',
    'sub_leader': '⭐ Tổ Phó',
    'monitor': '👑 Lớp Trưởng',
    'vice_monitor': '👑 Lớp Phó',
    'member': 'Học sinh'
  };
  const roleBadge = document.getElementById('student-view-role-badge');
  if (roleBadge) {
    roleBadge.innerText = roleMap[userRole] || 'Học sinh';
    if (userRole !== 'member') {
      roleBadge.className = 'text-xs font-black uppercase px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-600 to-pink-600 text-white shadow-md border border-amber-400 inline-block tracking-wide shadow-amber-500/20';
    } else {
      roleBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600 inline-block tracking-wide';
    }
  }

  // 1. Điểm tổ & thứ hạng tổ của lớp học sinh này (theo phạm vi scope đang chọn)
  const studentTeamNum = parseInt(student.team) || 1;

  // Tính điểm từng HS theo scope để xếp hạng tổ
  const classStudents = getCurrentClassStudents(studentClassName);
  const allRankedStudents = classStudents.map(m => {
    const mStats = calculateScopeScoreForStudent(m.id, studentViewScope, scopeVal);
    return { ...m, stats: mStats, score: mStats.score };
  });

  // Tính TB tổ theo scope
  const teamMembersForAvg = allRankedStudents.filter(s => (parseInt(s.team) || 1) === studentTeamNum);
  const teamAvg = teamMembersForAvg.length > 0
    ? Number((teamMembersForAvg.reduce((sum, s) => sum + s.score, 0) / teamMembersForAvg.length).toFixed(1))
    : 0;

  // Xếp hạng tổ theo scope
  const totalTeams = parseInt(appState.classInfo?.totalTeams) || 4;
  const teamScoresForRank = [];
  for (let tNum = 1; tNum <= totalTeams; tNum++) {
    const members = allRankedStudents.filter(s => (parseInt(s.team) || 1) === tNum);
    const avg = members.length > 0 ? Number((members.reduce((sum, s) => sum + s.score, 0) / members.length).toFixed(1)) : 0;
    teamScoresForRank.push({ team: tNum, avgScore: avg });
  }
  teamScoresForRank.sort((a, b) => b.avgScore - a.avgScore);
  const rankIdx = teamScoresForRank.findIndex(t => t.team === studentTeamNum) + 1;

  const teamAvgEl = document.getElementById('student-view-team-avg');
  if (teamAvgEl) teamAvgEl.innerText = `${teamAvg}đ`;
  const teamRankEl = document.getElementById('student-view-team-rank');
  if (teamRankEl) teamRankEl.innerText = `Hạng ${rankIdx || 1}`;

  // 2. Thứ hạng học sinh trong tổ & danh sách thành viên trong tổ (theo scope)
  const teamMembers = allRankedStudents.filter(s => (parseInt(s.team) || 1) === studentTeamNum);
  const rankedTeamMembers = teamMembers.slice().sort((a, b) => b.score - a.score);

  const studentTeamRankIdx = rankedTeamMembers.findIndex(m => m.id === student.id || m.code === student.code) + 1;
  const memberRankEl = document.getElementById('student-view-member-rank');
  if (memberRankEl) memberRankEl.innerText = `Hạng ${studentTeamRankIdx || 1}`;

  const teamLabelEl = document.getElementById('student-view-team-label');
  if (teamLabelEl) teamLabelEl.innerText = `Tổ ${studentTeamNum} (${teamMembers.length} HS)`;

  const teamRankingListEl = document.getElementById('student-view-team-ranking-list');
  if (teamRankingListEl) {
    if (teamMembers.length === 0) {
      teamRankingListEl.innerHTML = `<div class="text-center text-xs text-slate-400 py-3">Tổ ${studentTeamNum} chưa có thành viên nào khác</div>`;
    } else {
      let html = '';
      rankedTeamMembers.forEach((m, idx) => {
        const isMe = m.id === student.id || m.code === student.code;
        html += `
          <div class="flex items-center justify-between p-2 rounded-xl ${isMe ? 'bg-indigo-950/70 border border-indigo-500/50' : 'bg-slate-800/80 border border-slate-700/50'} text-xs">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[10px] ${idx === 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700 text-slate-300'}">
                ${idx + 1}
              </span>
              <div class="min-w-0">
                <span class="font-bold text-white truncate block ${isMe ? 'text-indigo-200' : ''}">${m.name} ${isMe ? '<b class="text-amber-300 text-[10px]">(Bạn)</b>' : ''}</span>
                <span class="text-[10px] text-slate-400 font-mono">${m.code}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold ${m.stats.rankColor}">${m.stats.rankBadge}</span>
              <span class="font-mono font-black text-sm ${m.score >= 100 ? 'text-indigo-300' : 'text-rose-400'}">${m.score}đ</span>
            </div>
          </div>
        `;
      });
      teamRankingListEl.innerHTML = html;
    }
  }

  // QUYỀN TỔ TRƯỞNG & BAN CÁN SỰ
  const isLeader = userRole === 'leader' || userRole === 'monitor' || userRole === 'vice_monitor' || userRole === 'sub_leader';
  const leaderPanel = document.getElementById('leader-scoring-panel');
  if (leaderPanel) {
    if (isLeader) {
      leaderPanel.classList.remove('hidden');
      const teamBadge = document.getElementById('leader-team-badge');
      const titleEl = document.getElementById('leader-panel-title');
      const attendanceBtn = document.getElementById('leader-attendance-btn');
      const announcementBtn = document.getElementById('leader-announcement-btn');
      
      if (userRole === 'monitor' || userRole === 'vice_monitor') {
        if (teamBadge) teamBadge.innerText = 'Toàn Lớp';
        if (titleEl) titleEl.innerText = 'Quyền Lớp Trưởng / Lớp Phó';
        if (attendanceBtn) attendanceBtn.classList.remove('hidden');
        if (announcementBtn) announcementBtn.classList.remove('hidden');
      } else {
        if (teamBadge) teamBadge.innerText = `Tổ ${studentTeamNum}`;
        if (titleEl) titleEl.innerText = 'Quyền Tổ Trưởng / Tổ Phó';
        if (attendanceBtn) attendanceBtn.classList.add('hidden');
        if (announcementBtn) announcementBtn.classList.add('hidden');
      }
      renderLeaderTeamMembers(leaderPanel, { ...student, role: userRole, team: studentTeamNum });
    } else {
      leaderPanel.classList.add('hidden');
    }
  }

  // 1. Thông báo chung
  renderStudentAnnouncements(studentClassName);
  const studentBadges = calculateStudentBadges(student, currentWeek);
  renderBadgesToContainer("student-badges-container", "student-badges-count", studentBadges);

  // Dropdown tuần học sinh
  const studentWeekFilterEl = document.getElementById('student-week-filter');
  if (studentWeekFilterEl && studentWeekFilterEl.options.length === 0) {
    let weekOptions = `<option value="current">Tuần ${currentWeek} (Hiện tại)</option>`;
    for (let w = 1; w <= appState.classInfo.totalWeeks; w++) {
      if (w !== currentWeek) {
        weekOptions += `<option value="${w}">Tuần ${w}</option>`;
      }
    }
    weekOptions += `<option value="all">Tất cả các tuần</option>`;
    studentWeekFilterEl.innerHTML = weekOptions;
  }

  renderStudentLogs(student, studentSelectedWeekFilter === 'all' ? currentWeek : (studentSelectedWeekFilter === 'current' ? currentWeek : parseInt(studentSelectedWeekFilter)), studentSelectedWeekFilter === 'all');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

let studentShowAllAnnouncements = false;

function toggleStudentAllAnnouncements() {
  studentShowAllAnnouncements = !studentShowAllAnnouncements;
  renderStudentAnnouncements();
}

function renderStudentAnnouncements(customClassName = null) {
  const container = document.getElementById('student-view-announcements');
  if (!container) return;

  const curClass = getCleanClassCode(customClassName || appState.classInfo.className || '10A1');
  const list = (appState.classAnnouncements || []).filter(a => {
    if (a.id === 'ann_1') return false;
    if (!a.className) return true;
    const aClass = getCleanClassCode(a.className);
    return aClass === curClass || aClass === 'ALL' || aClass === 'TOANTRUONG';
  });

  if (list.length === 0) {
    container.innerHTML = `<div class="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-center text-xs text-slate-400">Chưa có thông báo nào từ Giáo Viên Chủ Nhiệm</div>`;
    return;
  }

  const displayedList = studentShowAllAnnouncements ? list : list.slice(0, 3);

  let html = '';
  displayedList.forEach(a => {
    const timeStr = formatVietnameseDateTime(a.timestamp, a.timestamp);
    html += `
      <div class="p-2.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="font-bold text-indigo-200">${a.title}</span>
          <span class="text-[10px] text-slate-400 font-mono">${timeStr}</span>
        </div>
        <p class="text-slate-300 text-[11px] leading-relaxed">${a.content}</p>
      </div>
    `;
  });

  if (list.length > 3) {
    html += `
      <button onclick="toggleStudentAllAnnouncements()" class="w-full py-2 bg-slate-900/80 hover:bg-slate-800 text-indigo-300 text-[11px] font-semibold rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 transition-colors">
        <span>${studentShowAllAnnouncements ? '📁 Thu gọn thông báo cũ' : `📂 Xem thêm ${list.length - 3} thông báo trước đó`}</span>
        <i data-lucide="${studentShowAllAnnouncements ? 'chevron-up' : 'chevron-down'}" class="w-3.5 h-3.5"></i>
      </button>
    `;
  }

  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderStudentLogs(student, weekNum = appState.classInfo.currentWeek, showAll = false) {
  const container = document.getElementById('student-view-logs');
  if (!container) return;

  const sId = student.id;
  const sCode = String(student.code || '').trim().toUpperCase();
  const sName = String(student.name || '').trim().toLowerCase();
  const targetWeek = Number(weekNum);

  let myLogs = (appState.logs || []).filter(l => {
    const isMyLog = (l.studentId && l.studentId === sId) ||
                    (sCode && l.studentCode && String(l.studentCode).trim().toUpperCase() === sCode) ||
                    (sName && l.studentName && String(l.studentName).trim().toLowerCase() === sName);
    if (!isMyLog) return false;
    if (!showAll) {
      return Number(l.week) === targetWeek;
    }
    return true;
  });

  // SẮP XẾP BẢN GHI MỚI NHẤT LÊN ĐẦU
  myLogs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const stats = calculateStudentScore(student.id, weekNum);

  if (myLogs.length === 0) {
    container.innerHTML = `
      <div class="p-4 rounded-3xl bg-slate-800/80 border border-slate-700 text-center space-y-1.5 shadow-sm">
        <i data-lucide="check-circle-2" class="w-7 h-7 text-emerald-400 mx-auto"></i>
        <p class="font-bold text-xs text-slate-200">${showAll ? 'Em chưa có lượt trừ điểm nào' : `Tuần ${weekNum}: Em đang duy trì ${stats.score} điểm xuất sắc!`}</p>
        <p class="text-[11px] text-slate-400">Không có vi phạm nào trong tuần này. Hãy tiếp tục phát huy nhé!</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  let html = '';
  myLogs.forEach((log, idx) => {
    const isPlus = log.type === 'plus';
    const pointBadge = isPlus ? `+${Math.abs(log.pts)}đ` : `-${Math.abs(log.pts)}đ`;
    const badgeColor = isPlus ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    const cleanDate = formatVietnameseDateTime(log.exactDate || log.date, log.timestamp);
    const dateText = cleanDate || (log.date ? `Ngày ${log.date}` : `Tuần ${log.week}`);
    const timingParts = [];
    if (log.session && log.session.trim()) timingParts.push(log.session.trim());
    if (log.period && log.period.trim()) timingParts.push(log.period.trim());
    if (log.subject && log.subject.trim()) timingParts.push(log.subject.trim());
    const timingDetail = timingParts.length > 0 ? timingParts.join(' · ') : 'Phong trào / Nề nếp chung';
    const fullTiming = `${timingDetail} • ${dateText}`;
    const recorderName = log.loggedBy || log.recorder || (log.session ? 'GVCN' : 'Ban Cán Sự');
    const isNewest = idx === 0;

    if (isNewest) {
      // BẢN GHI MỚI NHẤT: HERO CARD TO RÕ VÀ NỔI BẬT
      html += `
        <div class="p-3.5 rounded-3xl ${isPlus ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border-2 border-emerald-500' : 'bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border-2 border-rose-500'} space-y-2 shadow-xl animate-scale-in">
          <div class="flex items-center justify-between gap-2">
            <span class="inline-flex items-center gap-1 font-black text-[10px] uppercase px-2 py-0.5 rounded-full ${isPlus ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400' : 'bg-rose-500/30 text-rose-300 border border-rose-400'} animate-pulse">
              <span>🔥 GHI NHẬN MỚI NHẤT</span>
            </span>
            <span class="text-[10px] text-slate-400 font-mono font-bold">${dateText}</span>
          </div>
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <h5 class="text-sm font-bold text-white leading-snug">${log.critTitle || 'Ghi nhận thi đua'}</h5>
              <div class="bg-slate-950/70 px-2.5 py-1 rounded-xl text-[11px] text-indigo-200 mt-1 border border-slate-800 flex items-center gap-1.5">
                <i data-lucide="clock" class="w-3 h-3 text-indigo-400 shrink-0"></i>
                <span class="truncate">${fullTiming}</span>
              </div>
              ${log.note ? `<p class="text-xs text-amber-200/90 italic mt-1.5 bg-slate-950/60 p-2 rounded-xl border border-slate-800">"${log.note}"</p>` : ''}
            </div>
            <span class="text-sm font-black font-mono px-3 py-1 rounded-xl shrink-0 ${isPlus ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'} shadow-md">
              ${pointBadge}
            </span>
          </div>
          <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80">
            <span>Ghi nhận bởi: <b class="text-indigo-300 font-semibold">${recorderName}</b></span>
            <span class="text-emerald-400 font-semibold">● Đã lưu hệ thống</span>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="p-3 rounded-2xl ${isPlus ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-rose-950/30 border-rose-500/40'} border space-y-1.5 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${badgeColor} border">${pointBadge}</span>
              <span class="font-bold text-xs text-white">${log.critTitle || 'Ghi nhận thi đua'}</span>
            </div>
            <div class="flex items-center gap-1.5">
              ${showAll ? `<span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Tuần ${log.week}</span>` : ''}
              <span class="text-[10px] text-slate-400 font-mono font-bold">${dateText}</span>
            </div>
          </div>
          <div class="bg-slate-900/70 px-2.5 py-1.5 rounded-xl text-[11px] text-slate-300 flex items-center gap-1.5 border border-slate-800">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-indigo-400 flex-shrink-0"></i>
            <span class="font-medium text-indigo-200">${fullTiming}</span>
          </div>
          ${log.note ? `<p class="text-[11px] text-slate-300 pl-1.5 border-l-2 ${isPlus ? 'border-emerald-500' : 'border-rose-500'} italic">"${log.note}"</p>` : ''}
          <div class="flex items-center justify-between text-[10px] text-slate-400 pt-0.5 border-t border-slate-800/50">
            <span>Ghi nhận bởi: <b class="text-indigo-300 font-semibold">${recorderName}</b></span>
            <span class="text-emerald-400 font-medium">● Đã lưu</span>
          </div>
        </div>
      `;
    }
  });
  container.innerHTML = html;
  lucide.createIcons();
}

// ================= 6. CỔNG PHỤ HUYNH (CHỈ 2 MỤC & CÓ CHỌN TUẦN) =================
let parentSelectedWeekFilter = 'current';

function onParentWeekFilterChange(val) {
  if (/^\d+$/.test(String(val))) {
    selectWeek(Number(val));
    return;
  }
  parentSelectedWeekFilter = val;
  renderParentPortalView();
}

function renderParentPortalView() {
  const currentWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  const effectiveScopeVal = (parentViewScopeValue !== null && parentViewScopeValue !== undefined) ? parentViewScopeValue : currentWeek;
  renderParentScopeDetailSelector();

  const code = String(appState.currentParentStudentCode || '').trim().toUpperCase();
  let student = (appState.students || []).find(s => String(s.code || '').trim().toUpperCase() === code);
  if (!student) {
    try {
      student = JSON.parse(localStorage.getItem('thi_dua_parent_saved_student'));
    } catch(e) {}
  }
  if (student && !appState.students.some(s => s.id === student.id || s.code === student.code)) {
    appState.students.push(student);
  }
  if (!student && appState.students && appState.students.length > 0) {
    student = appState.students[0];
  }
  if (!student) {
    const nameEl = document.getElementById('parent-card-name');
    if (nameEl) nameEl.innerText = 'Đang tải dữ liệu học sinh...';
    const codeEl = document.getElementById('parent-card-code');
    if (codeEl) codeEl.innerText = code || '';
    return;
  }

  const scopeVal = effectiveScopeVal;
  const stats = calculateScopeScoreForStudent(student.id, parentViewScope, scopeVal);
  const initials = student.name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();

  const studentClassName = student.className || extractClassFromStudentCode(student.code || '', appState.classInfo.className || '10A1');

  const nameEl = document.getElementById('parent-card-name');
  if (nameEl) nameEl.innerText = student.name;
  const codeEl = document.getElementById('parent-card-code');
  if (codeEl) codeEl.innerText = student.code || 'A101';
  const teamEl = document.getElementById('parent-card-team');
  if (teamEl) teamEl.innerText = `Lớp ${studentClassName} • Tổ ${student.team}`;
  const avatarEl = document.getElementById('parent-card-avatar');
  if (avatarEl) avatarEl.innerText = initials;
  const scoreEl = document.getElementById('parent-card-score');
  if (scoreEl) scoreEl.innerText = `${stats.score}đ`;

  const periodLabelEl = document.getElementById('parent-score-period-label');
  if (periodLabelEl) {
    if (parentViewScope === 'week') periodLabelEl.innerText = `Điểm Tuần ${scopeVal}`;
    else if (parentViewScope === 'month') periodLabelEl.innerText = `Điểm TB Tháng ${scopeVal}`;
    else if (parentViewScope === 'semester') periodLabelEl.innerText = `Điểm TB Học Kỳ ${scopeVal}`;
    else if (parentViewScope === 'year') periodLabelEl.innerText = `Điểm TB Cả Năm`;
  }

  const emotion = getConductEmotion(stats.score, stats.rankBadge);
  const rankBadgeEl = document.getElementById('parent-card-rank-badge');
  if (rankBadgeEl) {
    rankBadgeEl.innerHTML = `<span class="inline-block animate-pulse">${emotion.emoji}</span> <span>${stats.rankBadge}</span>`;
    rankBadgeEl.className = `text-[10px] font-bold block ${stats.rankColor}`;
  }
  if (avatarEl) {
    avatarEl.innerHTML = `<span class="relative block">${initials}<span class="absolute -bottom-1.5 -right-2 text-base drop-shadow animate-bounce">${emotion.emoji}</span></span>`;
  }

  // Khởi tạo thanh chọn tuần / tháng / học kỳ nếu chưa render
  const scopeContainer = document.getElementById('parent-scope-detail-container');
  if (scopeContainer && scopeContainer.innerHTML.trim() === '') {
    renderParentScopeDetailSelector();
  }

  // 1. Thông báo chung toàn lớp
  renderParentAnnouncements(studentClassName);
  const parentStudentBadges = calculateStudentBadges(student, currentWeek);
  renderBadgesToContainer("parent-badges-container", "parent-badges-count", parentStudentBadges);

  // 2. Chi tiết thưởng phạt và xếp loại hạnh kiểm theo phạm vi đã chọn
  renderParentScopeLogs(student, parentViewScope, scopeVal, stats);

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderParentScopeLogs(student, scope, scopeVal, stats) {
  const container = document.getElementById('parent-view-logs');
  if (!container) return;

  const sId = student.id;
  const sCode = String(student.code || '').trim().toUpperCase();
  const sName = String(student.name || '').trim().toLowerCase();

  // Lọc nhật ký theo phạm vi
  let targetWeeks = [];
  let scopeTitle = `Tuần ${scopeVal}`;

  if (scope === 'week') {
    if (String(scopeVal) === 'all') {
      targetWeeks = Array.from({length: 35}, (_, i) => i + 1);
      scopeTitle = 'Tất Cả Các Tuần';
    } else {
      targetWeeks = [Number(scopeVal)];
      scopeTitle = `Tuần ${scopeVal}`;
    }
  } else if (scope === 'month') {
    targetWeeks = getWeeksInMonth(Number(scopeVal));
    scopeTitle = `Tháng ${scopeVal}`;
  } else if (scope === 'semester') {
    targetWeeks = Number(scopeVal) === 1 ? Array.from({length: 18}, (_, i) => i + 1) : Array.from({length: 17}, (_, i) => i + 19);
    scopeTitle = `Học Kỳ ${scopeVal}`;
  } else if (scope === 'year') {
    targetWeeks = Array.from({length: 35}, (_, i) => i + 1);
    scopeTitle = `Cả Năm Học`;
  }

  const scopeLogs = (appState.logs || []).filter(l => {
    const isMyLog = (l.studentId && l.studentId === sId) ||
                    (sCode && l.studentCode && String(l.studentCode).trim().toUpperCase() === sCode) ||
                    (sName && l.studentName && String(l.studentName).trim().toLowerCase() === sName);
    return isMyLog && targetWeeks.includes(Number(l.week));
  });

  // LUÔN SẮP XẾP BẢN GHI MỚI NHẤT LÊN ĐẦU
  scopeLogs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  let html = '';

  // 1. THẺ TỔNG HỢP HẠNH KIỂM NỔI BẬT THEO PHẠM VI KÈM BIỂU CẢM CẢM XÚC ĐỘNG
  const emotion = getConductEmotion(stats.score, stats.rankBadge);
  const emotionVisual = `
    <div class="w-16 h-16 rounded-2xl bg-slate-950/80 border border-slate-700/60 flex items-center justify-center mx-auto shadow-inner relative">
      <span class="text-4xl ${emotion.animationClass} filter drop-shadow select-none inline-block transform transition-transform duration-300 hover:scale-125">
        ${emotion.emoji}
      </span>
    </div>
  `;
  html += `
    <div class="p-4 rounded-3xl bg-gradient-to-br ${emotion.bgGradient} border-2 ${emotion.border} text-center space-y-2 shadow-xl mb-3 animate-scale-in">
      ${emotionVisual}
      <div class="space-y-0.5">
        <div class="flex items-center justify-center gap-1.5 flex-wrap">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider">Hạnh Kiểm ${scopeTitle}:</span>
          <span class="text-sm font-black ${emotion.color}">${emotion.title} (${stats.score}đ)</span>
        </div>
        <p class="text-xs ${emotion.color} font-semibold">${emotion.parentDesc}</p>
      </div>
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${emotion.badgeBg} text-xs font-bold shadow-sm">
        <span>Tâm Trạng: ${emotion.mood}</span>
        <span>• ${stats.rankBadge}</span>
      </div>
    </div>
  `;

  // 2. NẾU XEM THÁNG HOẶC HỌC KỲ -> HIỂN THỊ THÊM BẢNG ĐIỂM TỪNG TUẦN / TỪNG THÁNG
  if (scope === 'month' && targetWeeks.length > 1) {
    html += `
      <div class="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5 mb-2.5">
        <span class="text-[10px] font-bold text-amber-300 uppercase block">📊 Điểm Chi Tiết Các Tuần Trong Tháng ${scopeVal}:</span>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center text-xs">
    `;
    targetWeeks.forEach(w => {
      const wStats = calculateStudentScore(student.id, w);
      html += `
        <div class="p-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
          <span class="text-[10px] text-slate-400 block font-medium">Tuần ${w}</span>
          <span class="font-mono font-bold ${wStats.score >= 90 ? 'text-indigo-300' : 'text-rose-400'}">${wStats.score}đ</span>
        </div>
      `;
    });
    html += `</div></div>`;
  }

  // 3. DANH SÁCH CÁC LƯỢT GHI NHẬN VI PHẠM / KHEN THƯỞNG
  if (scopeLogs.length === 0) {
    html += `
      <div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
        Trong ${scopeTitle}, con không có bất kỳ lượt trừ điểm vi phạm nào! 🌟
      </div>
    `;
  } else {
    html += `<div class="space-y-1.5">`;
    scopeLogs.forEach((l, idx) => {
      const isPlus = l.type === 'plus';
      const ptsText = isPlus ? `+${Math.abs(l.pts)}đ` : `-${Math.abs(l.pts)}đ`;
      const title = l.critTitle || l.criteriaTitle || l.note || (isPlus ? 'Khen thưởng thi đua' : 'Vi phạm nề nếp');
      const isNewest = idx === 0;
      const cleanDate = formatVietnameseDateTime(l.exactDate || l.date, l.timestamp);

      if (isNewest) {
        // BẢN GHI MỚI NHẤT: HIỂN THỊ TO RÕ, NỔI BẬT VỚI BADGE VÀ NỀN SÁNG
        html += `
          <div class="p-3.5 rounded-3xl ${isPlus ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border-2 border-emerald-500' : 'bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border-2 border-rose-500'} space-y-2 shadow-xl animate-scale-in">
            <div class="flex items-center justify-between gap-2">
              <span class="inline-flex items-center gap-1 font-black text-[10px] uppercase px-2 py-0.5 rounded-full ${isPlus ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400' : 'bg-rose-500/30 text-rose-300 border border-rose-400'} animate-pulse">
                <span>🔥 GHI NHẬN MỚI NHẤT</span>
              </span>
              <span class="text-[10px] text-slate-400 font-mono">${cleanDate}</span>
            </div>
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <h5 class="text-sm font-bold text-white leading-snug">${title}</h5>
                <p class="text-[11px] text-slate-300 mt-0.5">Tuần ${l.week}${l.session || l.period ? ` • ${[l.session, l.period, l.subject].filter(Boolean).join(' · ')}` : ''}</p>
                ${l.note ? `<p class="text-xs text-amber-200/90 italic mt-1 bg-slate-950/60 p-2 rounded-xl border border-slate-800">"${l.note}"</p>` : ''}
              </div>
              <span class="text-sm font-black font-mono px-3 py-1 rounded-xl shrink-0 ${isPlus ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'} shadow-md">
                ${ptsText}
              </span>
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="p-2.5 rounded-2xl ${isPlus ? 'bg-emerald-950/20 border border-emerald-500/20' : 'bg-rose-950/20 border border-rose-500/20'} flex items-center justify-between gap-2 text-xs hover:border-slate-700 transition-all">
            <div class="min-w-0">
              <span class="font-bold text-slate-200 block truncate">${title}</span>
              <span class="text-[10px] text-slate-400 font-mono">Tuần ${l.week} • ${cleanDate}</span>
            </div>
            <span class="font-black font-mono text-xs px-2 py-0.5 rounded-lg shrink-0 ${isPlus ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}">
              ${ptsText}
            </span>
          </div>
        `;
      }
    });
    html += `</div>`;
  }

  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}


let parentShowAllAnnouncements = false;

function toggleParentAllAnnouncements() {
  parentShowAllAnnouncements = !parentShowAllAnnouncements;
  renderParentAnnouncements();
}

function renderParentAnnouncements(customClassName = null) {
  const container = document.getElementById('parent-view-announcements');
  if (!container) return;

  const curClass = getCleanClassCode(customClassName || appState.classInfo.className || '10A1');
  const list = (appState.classAnnouncements || []).filter(a => {
    if (a.id === 'ann_1') return false;
    if (!a.className) return true;
    const aClass = getCleanClassCode(a.className);
    return aClass === curClass || aClass === 'ALL' || aClass === 'TOANTRUONG';
  });

  const countBadge = document.getElementById('parent-ann-count-badge');
  if (countBadge) {
    countBadge.innerText = `${list.length} thông báo`;
  }

  if (list.length === 0) {
    container.innerHTML = `<div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">Chưa có thông báo nào từ Giáo Viên Chủ Nhiệm</div>`;
    return;
  }

  const displayedList = parentShowAllAnnouncements ? list : list.slice(0, 3);

  let html = '';
  displayedList.forEach(a => {
    const timeStr = formatVietnameseDateTime(a.timestamp, a.timestamp);
    html += `
      <div class="p-3 rounded-2xl bg-slate-900/90 border border-slate-800/90 text-xs space-y-1.5 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="font-bold text-indigo-300 text-xs">${a.title}</span>
          <span class="text-[10px] text-slate-400 font-mono">${timeStr}</span>
        </div>
        <p class="text-slate-300 text-[11px] leading-relaxed">${a.content}</p>
      </div>
    `;
  });

  if (list.length > 3) {
    html += `
      <button onclick="toggleParentAllAnnouncements()" class="w-full py-2 bg-slate-900/80 hover:bg-slate-800 text-indigo-300 text-[11px] font-semibold rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 transition-colors">
        <span>${parentShowAllAnnouncements ? '📁 Thu gọn thông báo cũ' : `📂 Xem thêm ${list.length - 3} thông báo trước đó`}</span>
        <i data-lucide="${parentShowAllAnnouncements ? 'chevron-up' : 'chevron-down'}" class="w-3.5 h-3.5"></i>
      </button>
    `;
  }

  container.innerHTML = html;
  lucide.createIcons();
}

let parentShowAllOlderLogs = false;

function toggleParentOlderLogs() {
  parentShowAllOlderLogs = !parentShowAllOlderLogs;
  const student = appState.students.find(s => s.code && s.code.toUpperCase() === appState.currentParentStudentCode) || appState.students[0];
  if (student) {
    renderParentLogs(student, parentSelectedWeekFilter === 'all' ? appState.classInfo.currentWeek : (parentSelectedWeekFilter === 'current' ? appState.classInfo.currentWeek : parseInt(parentSelectedWeekFilter)), parentSelectedWeekFilter === 'all');
  }
}

function renderParentLogs(student, weekNum = appState.classInfo.currentWeek, showAll = false) {
  const container = document.getElementById('parent-view-logs');
  if (!container) return;

  const sId = student.id;
  const sCode = String(student.code || '').trim().toUpperCase();
  const sName = String(student.name || '').trim().toLowerCase();
  const targetWeek = Number(weekNum);

  let studentLogs = (appState.logs || []).filter(l => {
    const isMyLog = (l.studentId && l.studentId === sId) ||
                    (sCode && l.studentCode && String(l.studentCode).trim().toUpperCase() === sCode) ||
                    (sName && l.studentName && String(l.studentName).trim().toLowerCase() === sName);
    if (!isMyLog) return false;
    if (!showAll) {
      return Number(l.week) === targetWeek;
    }
    return true;
  });

  // LUÔN SẮP XẾP BẢN GHI MỚI NHẤT LÊN ĐẦU
  studentLogs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const stats = calculateStudentScore(student.id, weekNum);

  if (studentLogs.length === 0) {
    container.innerHTML = `
      <div class="p-4 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border-2 border-emerald-500/40 text-center space-y-2 shadow-lg">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto text-2xl border border-emerald-500/30">
          🌟
        </div>
        <div class="space-y-0.5">
          <h4 class="font-extrabold text-sm text-emerald-300">
            ${showAll ? 'Em Chưa Có Bất Kỳ Vi Phạm Nào!' : `Tuần ${weekNum}: Em Đạt ${stats.score} Điểm Chuẩn!`}
          </h4>
          <p class="text-xs text-slate-300">Em đang duy trì điểm số, nề nếp và học tập rất xuất sắc!</p>
        </div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
          <i data-lucide="award" class="w-3.5 h-3.5"></i>
          <span>Xếp Loại: ${stats.rankBadge}</span>
        </div>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  let html = `
    <!-- 2 Ô TỔNG HỢP GỌN GÀNG (GIẢM CHIỀU CAO 20%) -->
    <div class="grid grid-cols-2 gap-2 mb-2">
      <div class="p-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-sm">
        <span class="text-[9px] text-slate-400 font-medium block">Tổng Khen Thưởng</span>
        <span class="text-xs font-black text-emerald-400">+${stats.plus} điểm <span class="text-[10px] text-slate-400 font-normal">(${stats.plusCount || 0} lượt)</span></span>
      </div>
      <div class="p-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-sm">
        <span class="text-[9px] text-slate-400 font-medium block">Tổng Vi Phạm</span>
        <span class="text-xs font-black text-rose-400">-${stats.minus} điểm <span class="text-[10px] text-slate-400 font-normal">(${stats.minusCount || 0} lượt)</span></span>
      </div>
    </div>
  `;

  // 1. GHI NHẬN MỚI NHẤT (PHẲNG, GỌN, KHÔNG LỒNG CARD NẶNG)
  const latestLog = studentLogs[0];
  const isLatestPlus = latestLog.type === 'plus';
  const latestPointBadge = isLatestPlus ? `+${Math.abs(latestLog.pts)} điểm` : `−${Math.abs(latestLog.pts)} điểm`;
  const latestBadgeStyle = isLatestPlus
    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
    : 'bg-rose-500/10 text-rose-400 border border-rose-500/25';
  const latestCleanDate = formatVietnameseDateTime(latestLog.exactDate, latestLog.timestamp);
  const sessionText = latestLog.session || 'Buổi sáng';
  const periodText = latestLog.period || '15p đầu giờ';
  const subjectText = latestLog.subject || 'Môn học';

  html += `
    <div class="space-y-1 mb-2">
      <div class="flex items-center justify-between px-1">
        <span class="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>GHI NHẬN MỚI NHẤT</span>
          <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">MỚI</span>
        </span>
        <span class="text-[10px] text-slate-400 font-mono">${latestCleanDate}</span>
      </div>

      <div class="bg-slate-900/90 hover:bg-slate-900 border ${isLatestPlus ? 'border-emerald-500/30' : 'border-rose-500/30'} rounded-2xl p-3.5 space-y-2 shadow-md transition-all">
        
        <!-- CẤP 1: ĐIỂM + HÀNH VI -->
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 min-w-0">
            <span class="inline-flex items-center font-bold text-xs px-2.5 py-0.5 rounded-lg ${latestBadgeStyle} flex-shrink-0">
              ${latestPointBadge}
            </span>
            <span class="font-bold text-sm text-white truncate">${latestLog.critTitle}</span>
          </div>
          ${showAll ? `<span class="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex-shrink-0">Tuần ${latestLog.week}</span>` : ''}
        </div>

        <!-- CẤP 2: METADATA BUỔI · TIẾT · MÔN (DÒNG PHẲNG NHẸ NHÀNG) -->
        <div class="text-[11px] text-slate-400 flex items-center gap-1.5 pl-0.5">
          <span class="text-indigo-400">●</span>
          <span>${sessionText} · ${periodText} · ${subjectText}</span>
        </div>

        <!-- GHI CHÚ (NẾU CÓ) -->
        ${latestLog.note ? `<p class="text-[11px] text-slate-300 pl-2 border-l-2 ${isLatestPlus ? 'border-emerald-500' : 'border-rose-500'} italic">"${latestLog.note}"</p>` : ''}

        <!-- CẤP 3: NGƯỜI GHI & XÁC NHẬN -->
        <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
          <span>Ghi nhận bởi: <b class="text-slate-400 font-medium">${latestLog.loggedBy || 'GVCN'}</b></span>
          <span class="text-emerald-400 font-medium flex items-center gap-0.5">✓ Đã xác nhận</span>
        </div>

      </div>
    </div>
  `;

  // 2. CÁC TIN TRƯỚC ĐÓ (ĐÃ XEM -> THU GỌN LẠI)
  const olderLogs = studentLogs.slice(1);
  if (olderLogs.length > 0) {
    html += `
      <div class="pt-1.5 border-t border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between px-1">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <i data-lucide="history" class="w-3 h-3 text-slate-400"></i>
            <span>Các tin trước đó (${olderLogs.length} tin đã xem)</span>
          </span>
          <button onclick="toggleParentOlderLogs()" class="text-[10px] font-bold text-indigo-300 hover:text-indigo-200 flex items-center gap-1 bg-indigo-950/40 px-2 py-0.5 rounded-lg border border-indigo-500/30 transition-all active:scale-95">
            <span>${parentShowAllOlderLogs ? '📁 Thu Gọn Lại' : '📂 Mở Rộng Xem Tất Cả'}</span>
            <i data-lucide="${parentShowAllOlderLogs ? 'chevron-up' : 'chevron-down'}" class="w-3 h-3"></i>
          </button>
        </div>

        <div class="space-y-1.5 ${parentShowAllOlderLogs ? '' : 'max-h-48 overflow-y-auto pr-1'}">
    `;

    olderLogs.forEach((log, idx) => {
      const isPlus = log.type === 'plus';
      const badgeColor = isPlus ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      const pointText = isPlus ? `+${Math.abs(log.pts)}đ` : `-${Math.abs(log.pts)}đ`;
      const cleanDate = formatVietnameseDateTime(log.exactDate, log.timestamp);
      const fullTiming = `${log.session || 'Buổi sáng'} • ${log.period || 'Tiết học'} (${log.subject || 'Môn học'})`;

      if (parentShowAllOlderLogs) {
        // Mở rộng chi tiết từng tin cũ khi bấm Xem tất cả
        html += `
          <div class="p-3 rounded-2xl ${isPlus ? 'bg-slate-900/90 border-emerald-500/30' : 'bg-slate-900/90 border-rose-500/30'} border space-y-1.5 shadow-sm text-xs">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${badgeColor} border">${pointText}</span>
                <span class="font-bold text-xs text-white">${log.critTitle}</span>
              </div>
              <span class="text-[10px] text-slate-400 font-mono">${cleanDate}</span>
            </div>
            <div class="text-[10px] text-slate-400 flex items-center gap-1">
              <i data-lucide="clock" class="w-3 h-3 text-slate-500"></i>
              <span>${fullTiming}</span>
            </div>
            ${log.note ? `<p class="text-[10px] text-slate-300 pl-1.5 border-l-2 ${isPlus ? 'border-emerald-500' : 'border-rose-500'} italic">"${log.note}"</p>` : ''}
          </div>
        `;
      } else {
        // Thu gọn 1 dòng siêu gọn gàng
        html += `
          <div class="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between gap-2 text-xs transition-all shadow-sm">
            <div class="flex items-center gap-2 min-w-0">
              <span class="text-[10px] font-bold px-1.5 py-0.2 rounded-md ${badgeColor} border flex-shrink-0">${pointText}</span>
              <span class="text-slate-300 font-medium truncate text-xs">${log.critTitle}</span>
            </div>
            <span class="text-[10px] text-slate-500 font-mono flex-shrink-0">${cleanDate}</span>
          </div>
        `;
      }
    });

    html += `
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
  lucide.createIcons();
}

// ================= 6B. PHẢN HỒI TỪ PHỤ HUYNH (THỜI GIAN THỰC) =================
function submitParentFeedback() {
  const textarea = document.getElementById('parent-feedback-input');
  if (!textarea) return;
  const content = textarea.value.trim();
  if (!content) {
    showToast('Vui lòng nhập nội dung phản hồi!', 'warning');
    return;
  }

  const code = appState.currentParentStudentCode;
  const student = appState.students.find(s => s.code && s.code.toUpperCase() === code) || appState.students[0];
  if (!student) return;

  const studentClassName = student.className || extractClassFromStudentCode(student.code || '', appState.classInfo.className || '10A1');

  const feedback = {
    id: 'fb_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    studentCode: student.code || '',
    studentName: student.name || '',
    className: studentClassName,
    team: student.team || 1,
    content: content,
    author: `PH ${student.name}`,
    timestamp: Date.now()
  };

  // Lưu vào localStorage VÀ appState.parentFeedbacks
  const feedbacks = JSON.parse(localStorage.getItem('thi_dua_parent_feedbacks') || '[]');
  feedbacks.unshift(feedback);
  localStorage.setItem('thi_dua_parent_feedbacks', JSON.stringify(feedbacks));
  if (!Array.isArray(appState.parentFeedbacks)) appState.parentFeedbacks = [];
  appState.parentFeedbacks.unshift(feedback);

  // Đồng bộ thời gian thực lên máy chủ
  postToServer('addParentFeedback', { feedback: feedback });

  textarea.value = '';
  showToast('✅ Đã gửi phản hồi thành công đến GVCN!', 'success');
  // Chat feedback removed per user request
}

function renderParentFeedbackHistory(student) {
  const container = document.getElementById('parent-feedback-history');
  if (!container) return;

  // Hợp nhất dữ liệu từ localStorage VÀ cloud (appState.parentFeedbacks)
  const storedFb = JSON.parse(localStorage.getItem('thi_dua_parent_feedbacks') || '[]');
  const cloudFb = appState.parentFeedbacks || [];
  const feedbackMap = {};
  [...storedFb, ...cloudFb].forEach(fb => {
    if (fb && fb.id) {
      if (!feedbackMap[fb.id] || (fb.reply && fb.reply.trim())) {
        feedbackMap[fb.id] = fb;
      }
    }
  });
  const allFeedbacks = Object.values(feedbackMap);
  allFeedbacks.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const sCode = String(student.code || '').trim().toUpperCase();
  const sName = String(student.name || '').trim().toLowerCase();
  const myFeedbacks = allFeedbacks.filter(fb => {
    const fbCode = String(fb.studentCode || '').trim().toUpperCase();
    const fbName = String(fb.studentName || '').trim().toLowerCase();
    const isCodeMatch = fbCode && sCode && (fbCode === sCode || fbCode.endsWith(sCode) || sCode.endsWith(fbCode));
    const isNameMatch = fbName && sName && (fbName === sName || fbName.includes(sName) || sName.includes(fbName));
    return isCodeMatch || isNameMatch;
  });

  if (myFeedbacks.length === 0) {
    container.innerHTML = `<div class="text-center text-[11px] text-slate-400 py-2">Chưa có phản hồi nào</div>`;
    return;
  }

  let html = '';
  myFeedbacks.slice(0, 10).forEach(fb => {
    const timeStr = formatVietnameseDate(fb.timestamp);
    const hasReply = fb.reply && fb.reply.trim().length > 0;
    const replyTimeStr = fb.replyTime ? formatVietnameseDate(fb.replyTime) : '';

    html += `
      <div class="p-2.5 rounded-xl ${hasReply ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-slate-900/60 border-slate-700'} border text-xs space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="font-bold text-emerald-200 text-[11px]">${fb.author || 'Phụ huynh'}</span>
          <span class="text-[10px] text-slate-400 font-mono">${timeStr}</span>
        </div>
        <p class="text-slate-300 text-[11px] leading-relaxed">${fb.content}</p>
        ${hasReply ? `
          <div class="pl-2 border-l-2 border-emerald-400 bg-emerald-950/40 p-2 rounded-lg space-y-0.5">
            <span class="font-bold text-emerald-300 text-[10px]">👨‍🏫 ${fb.replyTeacher || 'GVCN'} trả lời:</span>
            <p class="text-white text-[11px] font-medium">${fb.reply}</p>
            <span class="text-[9px] text-slate-400 font-mono">${replyTimeStr}</span>
          </div>
        ` : `
          <span class="text-[9px] text-amber-300 font-medium">⏳ Đang chờ GVCN phản hồi...</span>
        `}
      </div>
    `;
  });
  container.innerHTML = html;
}

// ================= 7. ĐỒNG BỘ DỮ LIỆU THỜI GIAN THỰC =================
let _syncInProgress = false;
let _lastSyncTimestamp = 0;

async function syncFromServer(showFeedback = false) {
  if (showFeedback) showToast("⚡ Đang đồng bộ dữ liệu...", "info");
  return isSupabaseActive() ? syncFromSupabase() : false;
}

async function postToServer(action, payload) {
  try {
    await secureApi('/api/app-data', { method: 'POST', body: JSON.stringify({ action, payload }) });
    return true;
  } catch (error) {
    console.warn('Lưu dữ liệu thất bại:', error.message);
    return false;
  }
  // PHÂN LUỒNG SUPABASE: Nếu trường đang chạy Supabase (THPT Vọng Thê) thì ghi thẳng vào Supabase
  if (isSupabaseActive()) {
    const sb = getSupabaseClient();
    const sCode = String(appState.classInfo?.schoolCode || '90').trim();
    const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');

    try {
      if (action === 'addLog' && payload.log) {
        const l = payload.log;
        const { error } = await sb.from('conduct_logs').insert([{
          id: String(l.id || Date.now()),
          week: parseInt(l.week) || 1,
          date: l.date || '',
          session: l.session || '',
          period: l.period || '',
          subject: l.subject || '',
          student_id: l.studentId || '',
          student_code: l.studentCode || '',
          student_name: l.studentName || '',
          team: parseInt(l.team) || 1,
          type: l.type || 'plus',
          criteria_id: l.criteriaId || l.critId || '',
          criteria_title: l.critTitle || l.criteriaTitle || l.note || (l.type === 'plus' ? 'Khen thưởng thi đua' : 'Vi phạm nề nếp'),
          pts: Number(l.pts) || 0,
          note: l.note || '',
          recorder: l.recorder || '',
          school_code: sCode,
          class_name: curClass
        }]);
        if (error) throw error;
      } else if (action === 'deleteLog') {
        const delId = payload.logId || payload.id;
        const { error } = await sb.from('conduct_logs').delete().eq('id', delId).eq('school_code', sCode).eq('class_name', curClass);
        if (error) throw error;
      } else if (action === 'updateStudentPassword') {
        const field = payload.role === 'parent' ? 'parent_password' : 'student_password';
        const { error } = await sb.from('students').update({ [field]: payload.newPassword })
          .eq('code', payload.studentCode).eq('school_code', sCode).eq('class_name', curClass);
        if (error) throw error;
      } else if (action === 'deleteStudent') {
        const studentId = String(payload.studentId || '').trim();
        const studentCode = String(payload.studentCode || '').trim().toUpperCase();
        let query = sb.from('students').delete().eq('school_code', sCode).eq('class_name', curClass);
        query = studentId ? query.eq('id', studentId) : query.eq('code', studentCode);
        const { error } = await query;
        if (error) throw error;
      } else if (action === 'syncFullState' && payload.students) {
        const targetClass = curClass;
        const mappedStudents = payload.students
          .filter(s => isStudentInCurrentClass(s, targetClass))
          .map((s, idx) => ({
            id: s.id || `hs_${Date.now()}_${idx}_${s.code || ''}`,
            code: String(s.code || '').trim().toUpperCase(),
            name: String(s.name || '').trim(),
            team: parseInt(s.team) || 1,
            role: normalizeRole(s.role),
            class_name: targetClass,
            class_code: `${sCode}${targetClass}`,
            school_code: sCode,
            student_password: String(s.studentPassword || '123456'),
            parent_password: String(s.parentPassword || '123456')
          }));

        if (mappedStudents.length > 0) {
          // Không xóa dữ liệu trước khi ghi: lỗi mạng hoặc ràng buộc không thể làm
          // danh sách học sinh trên Supabase bị rỗng.
          const { error } = await sb.from('students').upsert(mappedStudents, { onConflict: 'id' });
          if (error) throw error;
        }
      } else if (action === 'saveClassInfo' || action === 'renameOrSaveClass') {
        const prevClass = getCleanClassCode(payload.prevClass || '');
        const newClass = getCleanClassCode(payload.newClass || payload.classInfo?.className || curClass);
        const targetSchool = String(payload.schoolCode || payload.classInfo?.schoolCode || sCode).trim();
        const info = payload.classInfo || appState.classInfo || {};

        // 1. Lưu cấu hình lớp mới
        const { error } = await sb.from('class_configs').upsert({
          school_code: targetSchool,
          class_name: newClass,
          school_name: info.schoolName || appState.classInfo?.schoolName || '',
          teacher_name: info.teacherName || appState.classInfo?.teacherName || '',
          pin: String(info.pin || '1234').trim(),
          admin_pin: String(info.adminPin || `${targetSchool}@34`).trim(),
          base_score: parseInt(info.baseScore) || 100,
          current_week: parseInt(info.currentWeek) || 1,
          total_weeks: parseInt(info.totalWeeks) || 18,
          conduct_config: info.conductConfig || {},
          teacher_note: info.teacherNote || ''
        }, { onConflict: 'school_code,class_name' });
        if (error) throw error;

        // 2. Cập nhật school_classes
        await sb.from('school_classes').upsert([{
          school_code: targetSchool,
          class_code: `${targetSchool}${newClass}`,
          class_name: newClass,
          teacher_name: info.teacherName || 'Thầy/Cô Chủ Nhiệm',
          pin: String(info.pin || '1234').trim(),
          student_count: (appState.students || []).length || 40
        }], { onConflict: 'school_code,class_name' });

        // 3. Nếu đổi tên lớp: xóa lớp cũ trên class_configs và school_classes
        if (prevClass && prevClass !== newClass) {
          await sb.from('class_configs').delete().eq('school_code', targetSchool).eq('class_name', prevClass);
          await sb.from('school_classes').delete().eq('school_code', targetSchool).eq('class_name', prevClass);
        }
      } else if (action === 'saveSchoolClasses' && payload.classes) {
        const clsRows = payload.classes.map(c => ({
          school_code: sCode,
          class_code: `${sCode}${getCleanClassCode(c.className)}`,
          class_name: getCleanClassCode(c.className),
          teacher_name: c.teacherName || '',
          pin: String(c.pin || c.teacherPin || '1234').trim(),
          student_count: parseInt(c.studentCount) || 40
        }));
        const { error } = await sb.from('school_classes').upsert(clsRows, { onConflict: 'school_code,class_name' });
        if (error) throw error;
      } else if (action === 'deleteSchoolClass') {
        const className = getCleanClassCode(payload.className || '');
        if (!className) throw new Error('Thiếu tên lớp cần xóa.');
        const { error: err1 } = await sb.from('school_classes').delete()
          .eq('school_code', sCode).eq('class_name', className);
        if (err1) console.warn('Lỗi xóa school_classes:', err1);
        const { error: err2 } = await sb.from('class_configs').delete()
          .eq('school_code', sCode).eq('class_name', className);
        if (err2) console.warn('Lỗi xóa class_configs:', err2);
        await sb.from('students').delete()
          .eq('school_code', sCode).eq('class_name', className);
      } else if (action === 'addAnnouncement' && payload.announcement) {
        const a = payload.announcement;
        const { error } = await sb.from('announcements').insert([{
          id: String(a.id || Date.now()),
          title: a.title,
          content: a.content,
          target: a.target || 'all',
          school_code: sCode,
          class_name: curClass,
          date: a.date || ''
        }]);
        if (error) throw error;
      } else if (action === 'deleteAnnouncement') {
        const { error } = await sb.from('announcements').delete().eq('id', payload.id).eq('school_code', sCode).eq('class_name', curClass);
        if (error) throw error;
      } else if (action === 'addParentFeedback' && payload.feedback) {
        const fb = payload.feedback;
        const { error } = await sb.from('parent_feedbacks').insert([{
          id: String(fb.id || Date.now()),
          student_code: String(fb.studentCode || '').trim().toUpperCase(),
          student_name: fb.studentName || '',
          content: fb.content || '',
          reply: fb.reply || '',
          reply_teacher: fb.replyTeacher || '',
          school_code: sCode,
          class_name: curClass,
          created_at: new Date().toISOString()
        }]);
        if (error) console.warn('Lỗi lưu parent_feedbacks:', error);
      } else if (action === 'replyParentFeedback') {
        const { error } = await sb.from('parent_feedbacks').update({
          reply: payload.reply || '',
          reply_teacher: payload.replyTeacher || 'GVCN'
        }).eq('id', payload.feedbackId).eq('school_code', sCode).eq('class_name', curClass);
        if (error) console.warn('Lỗi trả lời parent_feedbacks:', error);
      } else if (action === 'deleteParentFeedback') {
        const { error } = await sb.from('parent_feedbacks').delete().eq('id', payload.id).eq('school_code', sCode).eq('class_name', curClass);
        if (error) console.warn('Lỗi xóa parent_feedbacks:', error);
      } else if (action === 'saveCriteria' && payload.criteria) {
        // Lưu toàn bộ danh sách tiêu chí thi đua lên Supabase Cloud
        const conductCfg = {
          ...(appState.classInfo?.conductConfig || {}),
          customCriteria: payload.criteria
        };
        appState.classInfo.conductConfig = conductCfg;
        const { error } = await sb.from('class_configs').upsert({
          school_code: sCode,
          class_name: getCleanClassCode(appState.classInfo?.className || curClass),
          conduct_config: conductCfg
        }, { onConflict: 'school_code,class_name' });
        if (error) throw error;
      } else if (action === 'clearClassLogs') {
        // Xóa sạch log điểm tuần đã chọn (hoặc tất cả các tuần) của đúng lớp đó trên Supabase
        const targetWeek = payload.week;
        let query = sb.from('conduct_logs').delete().eq('school_code', sCode).eq('class_name', curClass);
        if (targetWeek !== 'all' && !isNaN(parseInt(targetWeek))) {
          query = query.eq('week', parseInt(targetWeek));
        }
        const { error } = await query;
        if (error) throw error;
      } else if (action === 'clearClassAllData') {
        // Xóa sạch toàn bộ học sinh và log của đúng lớp đó trên Supabase
        const [{ error: logError }, { error: studentError }] = await Promise.all([
          sb.from('conduct_logs').delete().eq('school_code', sCode).eq('class_name', curClass),
          sb.from('students').delete().eq('school_code', sCode).eq('class_name', curClass)
        ]);
        if (logError || studentError) throw (logError || studentError);
      }
      return true;
    } catch (e) {
      console.warn('Supabase mutation error:', e);
      return false;
    }
  }

  return false;
}

async function pushFullStateToServer() {
  showToast('Đang lưu toàn bộ dữ liệu...', 'info');
  await postToServer('syncFullState', {
    students: appState.students,
    classInfo: appState.classInfo
  });
  await postToServer('saveClassInfo', {
    classInfo: appState.classInfo
  });
  showToast('Đã lưu toàn bộ dữ liệu!', 'success');
}

// ================= BỘ LỌC DỮ LIỆU THEO THỨ TRONG TUẦN (THỨ 2 -> THỨ 7) =================
if (typeof appState.selectedDayFilter === 'undefined') {
  appState.selectedDayFilter = 'all';
}

function getLogDayCode(log) {
  if (!log) return '';
  
  // 1. Phân tích trực tiếp từ timestamp nếu có (chuẩn xác 100% theo thời gian thực)
  if (log.timestamp && typeof log.timestamp === 'number' && log.timestamp > 0) {
    const d = new Date(log.timestamp);
    if (!isNaN(d.getTime())) {
      const day = d.getDay(); // 0: CN, 1: T2, 2: T3, 3: T4, 4: T5, 5: T6, 6: T7
      if (day === 1) return 't2';
      if (day === 2) return 't3';
      if (day === 3) return 't4';
      if (day === 4) return 't5';
      if (day === 5) return 't6';
      if (day === 6) return 't7';
      if (day === 0) return 'cn';
    }
  }

  // 2. Phân tích chuỗi ngày / thứ trong các trường dữ liệu
  const dateStr = String(log.exactDate || log.rawDate || log.date || '').trim();
  if (dateStr) {
    if (dateStr.includes('Thứ Hai') || dateStr.includes('Thứ 2')) return 't2';
    if (dateStr.includes('Thứ Ba') || dateStr.includes('Thứ 3')) return 't3';
    if (dateStr.includes('Thứ Tư') || dateStr.includes('Thứ 4')) return 't4';
    if (dateStr.includes('Thứ Năm') || dateStr.includes('Thứ 5')) return 't5';
    if (dateStr.includes('Thứ Sáu') || dateStr.includes('Thứ 6')) return 't6';
    if (dateStr.includes('Thứ Bảy') || dateStr.includes('Thứ 7')) return 't7';
    if (dateStr.includes('Chủ Nhật') || dateStr.includes('CN')) return 'cn';

    // Trích xuất DD/MM/YYYY từ chuỗi phức tạp
    const m = dateStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (m) {
      const dayNum = parseInt(m[1]);
      const monthNum = parseInt(m[2]) - 1;
      const yearNum = parseInt(m[3]);
      const d = new Date(yearNum, monthNum, dayNum);
      if (!isNaN(d.getTime())) {
        const day = d.getDay();
        if (day === 1) return 't2';
        if (day === 2) return 't3';
        if (day === 3) return 't4';
        if (day === 4) return 't5';
        if (day === 5) return 't6';
        if (day === 6) return 't7';
        if (day === 0) return 'cn';
      }
    }
  }

  if (log.dayOfWeek && log.dayOfWeek !== 'all') {
    return String(log.dayOfWeek).toLowerCase();
  }

  return '';
}

function getDayCodeFromDateStr(dateStr) {
  return getLogDayCode({ exactDate: dateStr });
}

function setDayFilter(dayCode) {
  appState.selectedDayFilter = dayCode || 'all';

  // Highlight pill đang chọn
  document.querySelectorAll('.day-pill').forEach(btn => {
    const btnDay = btn.getAttribute('data-day');
    if (btnDay === dayCode) {
      btn.className = 'day-pill px-2.5 py-0.5 rounded-full font-bold transition-all active:scale-95 bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400';
    } else {
      btn.className = 'day-pill px-2.5 py-0.5 rounded-full font-medium transition-all active:scale-95 bg-slate-800 text-slate-300 hover:bg-slate-700';
    }
  });

  // Cập nhật lại giao diện các tab
  renderStudentList();
  renderLeaderboard();
  renderLogs();

  const dayNames = {
    'all': 'Cả tuần',
    'T2': 'Thứ 2',
    'T3': 'Thứ 3',
    'T4': 'Thứ 4',
    'T5': 'Thứ 5',
    'T6': 'Thứ 6',
    'T7': 'Thứ 7',
    'CN': 'Chủ Nhật'
  };
  showToast(`📅 Đang lọc dữ liệu: ${dayNames[dayCode] || dayCode}`, 'info');
}


// ================= 8. POINT CALCULATIONS =================
function calculateStudentScore(studentId, week = appState.classInfo?.currentWeek, dayFilter = 'all') {
  const base = parseInt(appState.classInfo?.baseScore) || 100;
  let plusPts = 0;
  let minusPts = 0;
  let plusCount = 0;
  let minusCount = 0;

  const student = (appState.students || []).find(s => s.id === studentId || s.code === studentId);
  const sId = student ? String(student.id).trim() : String(studentId || '').trim();
  const sCode = student ? String(student.code || '').trim().toUpperCase() : String(studentId || '').trim().toUpperCase();
  const sName = student ? String(student.name || '').trim().toLowerCase() : '';
  const targetWeek = parseInt(String(week).replace(/[^0-9]/g, '')) || (parseInt(appState.classInfo?.currentWeek) || 1);

  (appState.logs || []).forEach(log => {
    const logWeek = parseInt(String(log.week).replace(/[^0-9]/g, '')) || 1;
    if (logWeek !== targetWeek) return;

    // Lọc theo thứ trong tuần nếu có chọn
    if (dayFilter && dayFilter !== 'all') {
      const logDay = getLogDayCode(log);
      if (logDay.toLowerCase() !== String(dayFilter).toLowerCase()) return;
    }

    const isMatchStudent = (log.studentId && (log.studentId === sId || log.studentId === sCode)) ||
                           (sCode && log.studentCode && String(log.studentCode).trim().toUpperCase() === sCode) ||
                           (sName && log.studentName && String(log.studentName).trim().toLowerCase() === sName);

    if (isMatchStudent) {
      const pts = Math.abs(parseInt(log.pts) || 0);
      if (log.type === 'plus') {
        plusPts += pts;
        plusCount++;
      } else if (log.type === 'minus') {
        minusPts += pts;
        minusCount++;
      }
    }
  });

  const finalScore = base + plusPts - minusPts;
  
  // Tự động đối chiếu khung điểm hạnh kiểm conductConfig của lớp (Tốt, Khá, Đạt, Chưa Đạt)
  const conduct = calculateMonthlyConduct(finalScore, 1);
  const rankLabel = conduct.rank;
  const rankColor = conduct.color || 'text-emerald-400';
  const rankBadge = conduct.badge || '🥇 Tốt';

  return {
    score: finalScore,
    plusPts,
    minusPts,
    plusCount,
    minusCount,
    isNearDrop: conduct.isNearDrop,
    nearDropMsg: conduct.nearDropMsg,
    rankLabel,
    rankColor,
    rankBadge,
    // Backward-compatible aliases cho renderStudentList, renderLeaderboard, etc.
    plus: plusPts,
    minus: minusPts,
    rank: rankLabel
  };
}

function calculateTeamAvgScore(teamNumber, week = appState.classInfo.currentWeek, customClassName = null) {
  const classStudents = getCurrentClassStudents(customClassName);
  const teamStudents = classStudents.filter(s => Number(s.team) === Number(teamNumber));
  if (teamStudents.length === 0) return parseInt(appState.classInfo.baseScore) || 100;
  
  const totalScore = teamStudents.reduce((sum, s) => sum + calculateStudentScore(s.id, week).score, 0);
  return Number((totalScore / teamStudents.length).toFixed(1));
}

function getTeamRankings(week = appState.classInfo.currentWeek, customClassName = null) {
  const classStudents = getCurrentClassStudents(customClassName);
  const totalTeams = parseInt(appState.classInfo?.totalTeams) || 4;
  const teamList = [];
  for (let i = 1; i <= totalTeams; i++) {
    teamList.push(i);
  }
  const teams = teamList.map(teamNum => {
    const avg = calculateTeamAvgScore(teamNum, week, customClassName);
    const leader = classStudents.find(s => Number(s.team) === Number(teamNum) && s.role === 'leader')?.name || 'Chưa phân công';
    const memberCount = classStudents.filter(s => Number(s.team) === Number(teamNum)).length;
    return { team: teamNum, avgScore: avg, leader, memberCount };
  });
  teams.sort((a, b) => b.avgScore - a.avgScore);
  return teams;
}

// ================= QUẢN LÝ THÔNG BÁO CHUNG CỦA LỚP (GVCN & PHỤ HUYNH) =================
function openAnnouncementModal() {
  const modal = document.getElementById('announcement-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  const curClass = appState.classInfo.className || '10A1';
  const labelEl = document.getElementById('ann-class-label');
  if (labelEl) labelEl.innerText = `Lớp ${curClass} • Gửi tới toàn thể Học sinh & Phụ huynh`;

  renderGvcnAnnouncementsList();
  lucide.createIcons();
}

function closeAnnouncementModal() {
  const modal = document.getElementById('announcement-modal');
  if (modal) modal.classList.add('hidden');
}

function submitClassAnnouncement() {
  const titleEl = document.getElementById('ann-title-input');
  const contentEl = document.getElementById('ann-content-input');
  if (!titleEl || !contentEl) return;

  const title = titleEl.value.trim();
  const content = contentEl.value.trim();

  if (!title) {
    showToast('Vui lòng nhập Tiêu đề thông báo!', 'warning');
    return;
  }
  if (!content) {
    showToast('Vui lòng nhập Nội dung thông báo!', 'warning');
    return;
  }

  const curClass = appState.classInfo.className || '10A1';
  const annId = 'ann_' + Date.now();

  let authorName = appState.classInfo?.teacherName || `GVCN Lớp ${curClass}`;
  if (appState.currentRole === 'student') {
    const student = appState.students.find(s => s.code && s.code.toUpperCase() === appState.currentStudentCode);
    if (student) {
      const roleStr = student.role === 'monitor' ? 'Lớp Trưởng' : (student.role === 'vice_monitor' ? 'Lớp Phó' : 'Ban Cán Sự');
      authorName = `${student.name} (${roleStr})`;
    }
  }

  const newAnn = {
    id: annId,
    className: curClass,
    title: title,
    content: content,
    author: authorName,
    timestamp: Date.now()
  };

  if (!Array.isArray(appState.classAnnouncements)) {
    appState.classAnnouncements = [];
  }
  appState.classAnnouncements.unshift(newAnn);
  saveToLocalStorage();

  // Đẩy lên máy chủ thời gian thực
  postToServer('addAnnouncement', { announcement: newAnn });

  // Lấy danh sách toàn bộ mã học sinh của lớp hiện tại
  const classStudents = getCurrentClassStudents();
  let externalIds = [];
  classStudents.forEach(s => {
    if (s.code) {
      externalIds.push(`HS_${s.code.toUpperCase()}`);
      externalIds.push(`PH_${s.code.toUpperCase()}`);
    }
  });

  // Gửi push thật đến đích danh điện thoại của danh sách Phụ huynh & Học sinh lớp này
  if (externalIds.length > 0) {
    showToast(`Đang gửi Push Notification tới ${externalIds.length} thiết bị...`, 'info');
    sendRealOneSignalPushMultiple(externalIds, `📢 THÔNG BÁO TỪ GVCN`, `${title}\nChi tiết: ${content}`);
  } else {
    showToast('Lỗi: Không tìm thấy danh sách học sinh để gửi thông báo đẩy!', 'error');
  }

  // Xóa form và re-render
  titleEl.value = '';
  contentEl.value = '';
  renderGvcnAnnouncementsList();
  showToast('🎉 Đã đăng thông báo chung thành công!', 'success');
}

function renderGvcnAnnouncementsList() {
  const container = document.getElementById('gvcn-announcements-list');
  if (!container) return;

  const curClass = getCleanClassCode(appState.classInfo.className || '10A1');
  const list = (appState.classAnnouncements || []).filter(a => {
    if (a.id === 'ann_1') return false;
    if (a.className) return getCleanClassCode(a.className) === curClass;
    return true;
  });

  if (list.length === 0) {
    container.innerHTML = `<div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 text-xs">Lớp chưa có thông báo nào được đăng.</div>`;
    return;
  }

  let html = '';
  list.forEach(a => {
    const timeStr = formatVietnameseDateTime(a.timestamp, a.timestamp);
    html += `
      <div class="p-3 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-1.5 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="font-bold text-white text-xs">${a.title}</span>
          <span class="text-[10px] text-slate-400 font-mono">${timeStr}</span>
        </div>
        <p class="text-slate-300 text-[11px] leading-relaxed">${a.content}</p>
        <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
          <span>Người đăng: <b class="text-indigo-300">${a.author || 'GVCN'}</b></span>
          <button onclick="deleteClassAnnouncement('${a.id}')" class="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-0.5">
            <i data-lucide="trash-2" class="w-3 h-3"></i>
            <span>Xóa</span>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();
}

function deleteClassAnnouncement(annId) {
  if (confirm('Thầy/Cô có chắc muốn xóa thông báo này? Dữ liệu trên máy chủ và thiết bị người dùng sẽ tự cập nhật.')) {
    appState.classAnnouncements = (appState.classAnnouncements || []).filter(a => a.id !== annId);
    saveToLocalStorage();
    renderGvcnAnnouncementsList();

    // 1. Gửi lệnh xóa lên máy chủ thời gian thực
    postToServer('deleteAnnouncement', { id: annId });

    // 2. Làm mới hash đồng bộ để ép các thiết bị khác tải lại danh sách mới
    appState.lastDataHash = '';
    showToast('🗑️ Đã xóa thông báo thành công!', 'info');
  }
}



// ================= 10B. ĐIỂM DANH CHUYÊN CẦN 1 CHẠM (ĐỒNG BỘ CẤU HÌNH TIÊU CHÍ) =================
let pendingAttendanceMap = {};

// 📋 LẤY CẤU HÌNH TIÊU CHÍ ĐIỂM DANH ĐỒNG BỘ 100% TỪ BẢNG TIÊU CHÍ GVCN TÙY CHỈNH
function getAttendanceCriteriaConfig() {
  const criteriaList = (appState && Array.isArray(appState.criteria) && appState.criteria.length > 0)
    ? appState.criteria
    : DEFAULT_CRITERIA;

  // 1. Phép (Nghỉ có phép)
  let excusedCrit = criteriaList.find(c => c.id === 'tp_3') 
    || criteriaList.find(c => {
      const t = (c.title || '').toLowerCase();
      return (t.includes('có phép') || t.includes('co phep') || t === 'phép') && !t.includes('không') && !t.includes('khong');
    });
  
  // 2. K.Phép (Nghỉ không phép)
  let unexcusedCrit = criteriaList.find(c => c.id === 'tp_2')
    || criteriaList.find(c => {
      const t = (c.title || '').toLowerCase();
      return t.includes('không phép') || t.includes('khong phep') || t.includes('k.phép') || t.includes('k.phep');
    });

  // 3. Trễ (Đi học muộn / trễ)
  let lateCrit = criteriaList.find(c => c.id === 'tp_1')
    || criteriaList.find(c => {
      const t = (c.title || '').toLowerCase();
      return t.includes('muộn') || t.includes('muon') || t.includes('trễ') || t.includes('tre');
    });

  const getPts = (crit, defaultPts) => {
    if (!crit) return defaultPts;
    const num = parseInt(crit.pts);
    if (isNaN(num)) return defaultPts;
    if (crit.type === 'plus') return Math.abs(num);
    if (crit.type === 'minus') return -Math.abs(num);
    return num;
  };

  const excused = {
    id: excusedCrit ? excusedCrit.id : 'tp_3',
    title: excusedCrit ? excusedCrit.title : 'Nghỉ có phép',
    pts: getPts(excusedCrit, -2),
    type: excusedCrit?.type || (getPts(excusedCrit, -2) > 0 ? 'plus' : 'minus')
  };

  const unexcused = {
    id: unexcusedCrit ? unexcusedCrit.id : 'tp_2',
    title: unexcusedCrit ? unexcusedCrit.title : 'Nghỉ không phép',
    pts: getPts(unexcusedCrit, -10),
    type: unexcusedCrit?.type || (getPts(unexcusedCrit, -10) > 0 ? 'plus' : 'minus')
  };

  const late = {
    id: lateCrit ? lateCrit.id : 'tp_1',
    title: lateCrit ? lateCrit.title : 'Đi học muộn / trễ',
    pts: getPts(lateCrit, -5),
    type: lateCrit?.type || (getPts(lateCrit, -5) > 0 ? 'plus' : 'minus')
  };

  return { excused, unexcused, late };
}

function openAttendanceModal() {
  const modal = document.getElementById('attendance-modal');
  if (!modal) return;
  pendingAttendanceMap = {}; // Reset trạng thái tạm
  modal.classList.remove('hidden');
  renderAttendanceStudentList();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeAttendanceModal() {
  const modal = document.getElementById('attendance-modal');
  if (modal) modal.classList.add('hidden');
  pendingAttendanceMap = {};
}

function selectAttendanceType(studentId, type) {
  // Nếu đang chọn cùng loại thì bỏ chọn (toggle)
  if (pendingAttendanceMap[studentId] === type) {
    delete pendingAttendanceMap[studentId];
  } else {
    pendingAttendanceMap[studentId] = type;
  }
  renderAttendanceStudentList();
}

function renderAttendanceStudentList() {
  const container = document.getElementById('attendance-students-list');
  if (!container) return;

  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');
  const classStudents = getCurrentClassStudents(curClass);
  const currentWeek = appState.classInfo?.currentWeek || 1;
  const todayRaw = new Date().toISOString().slice(0, 10);
  const todayFormatted = formatVietnameseDate(todayRaw);

  const titleEl = document.getElementById('attendance-date-label');
  if (titleEl) titleEl.innerText = `Lớp ${curClass} • Tuần ${currentWeek} • Hôm nay (${todayFormatted})`;

  // Lấy cấu hình điểm tùy chỉnh thực tế của GVCN
  const attConfig = getAttendanceCriteriaConfig();
  const excusedSign = (attConfig.excused.pts > 0 || attConfig.excused.type === 'plus') ? `+${Math.abs(attConfig.excused.pts)}` : `-${Math.abs(attConfig.excused.pts)}`;
  const unexcusedSign = (attConfig.unexcused.pts > 0 || attConfig.unexcused.type === 'plus') ? `+${Math.abs(attConfig.unexcused.pts)}` : `-${Math.abs(attConfig.unexcused.pts)}`;
  const lateSign = (attConfig.late.pts > 0 || attConfig.late.type === 'plus') ? `+${Math.abs(attConfig.late.pts)}` : `-${Math.abs(attConfig.late.pts)}`;

  // Cập nhật banner quy ước điểm danh đồng bộ tiêu chí
  const bannerEl = document.getElementById('attendance-convention-banner');
  if (bannerEl) {
    bannerEl.innerHTML = `💡 <b>Quy ước:</b> Học sinh có mặt đầy đủ không cần bấm. Khi có học sinh vắng/trễ: Bấm chọn <b>Phép (${excusedSign}đ)</b>, <b>K.Phép (${unexcusedSign}đ)</b> hoặc <b>Trễ (${lateSign}đ)</b> rồi bấm nút <b>📤 Gửi</b> ở cuối dòng để xác nhận lưu và gửi thông báo.`;
  }

  if (classStudents.length === 0) {
    container.innerHTML = `<div class="text-center text-xs text-slate-400 py-6">Chưa có danh sách học sinh Lớp ${curClass}</div>`;
    return;
  }

  let html = '';
  classStudents.forEach((s, idx) => {
    // 1. Kiểm tra log đã lưu trong ngày hôm nay
    const todayLogs = (appState.logs || []).filter(l => {
      const isMe = (l.studentId && l.studentId === s.id) || (l.studentCode && l.studentCode === s.code);
      return isMe && Number(l.week) === Number(currentWeek) && (l.rawDate === todayRaw || l.exactDate === todayFormatted);
    });

    const isLoggedExcused = todayLogs.some(l => (l.critTitle && l.critTitle.includes('có phép')) || l.critId === attConfig.excused.id);
    const isLoggedUnexcused = todayLogs.some(l => (l.critTitle && l.critTitle.includes('không phép')) || l.critId === attConfig.unexcused.id);
    const isLoggedLate = todayLogs.some(l => (l.critTitle && (l.critTitle.includes('Đi học muộn') || l.critTitle.includes('trễ') || l.critTitle.includes('muộn'))) || l.critId === attConfig.late.id);
    const hasLoggedToday = isLoggedExcused || isLoggedUnexcused || isLoggedLate;

    // 2. Trạng thái tạm thời đang chọn trên giao diện
    const pendingType = pendingAttendanceMap[s.id];
    const isExcused = pendingType === 'excused' || (!pendingType && isLoggedExcused && pendingType !== 'none');
    const isUnexcused = pendingType === 'unexcused' || (!pendingType && isLoggedUnexcused && pendingType !== 'none');
    const isLate = pendingType === 'late' || (!pendingType && isLoggedLate && pendingType !== 'none');

    const hasSelection = isExcused || isUnexcused || isLate;
    const isDirty = pendingType !== undefined; // Người dùng vừa mới bấm chọn

    html += `
      <div class="p-3 rounded-2xl ${hasLoggedToday ? 'bg-slate-900/95 border-2 border-emerald-500/60 shadow-lg shadow-emerald-950/30' : (hasSelection ? 'bg-slate-900 border-2 border-amber-500/60 shadow-md shadow-amber-950/30' : 'bg-slate-900/90 border border-slate-800')} space-y-2 text-xs transition-all">
        <!-- DÒNG 1: THÔNG TIN HỌC SINH (RÕ RÀNG 100% CHIỀU RỘNG, KHÔNG BAO GIỜ BỊ CHE KHUẤT) -->
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <div class="flex items-center gap-2 min-w-0 flex-1">
            <span class="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-500/40 font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0 shadow-inner">
              ${idx + 1}
            </span>
            <div class="min-w-0 flex-1">
              <span class="font-bold text-white text-sm tracking-wide block truncate">${s.name}</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <span class="text-[10px] text-amber-300/90 font-mono bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">${s.code} • Tổ ${s.team}</span>
            ${hasLoggedToday ? '<span class="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 px-2 py-0.5 rounded-md font-bold shadow-sm flex items-center gap-0.5"><i data-lucide="check" class="w-2.5 h-2.5"></i> Đã lưu</span>' : ''}
          </div>
        </div>

        <!-- DÒNG 2: BỘ 4 NÚT ĐIỂM DANH 1 CHẠM & GỬI -->
        <div class="grid grid-cols-4 gap-1.5 pt-1.5 border-t border-slate-800/80">
          <button onclick="selectAttendanceType('${s.id}', 'excused')" class="py-2 px-1 rounded-xl text-[10px] font-bold border transition-all active:scale-95 flex items-center justify-center gap-1 ${isExcused ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md ring-2 ring-amber-400' : 'bg-slate-800/90 hover:bg-slate-700 text-amber-300 border-amber-500/30'}">
            <span>📄 Phép (${excusedSign}đ)</span>
          </button>
          <button onclick="selectAttendanceType('${s.id}', 'unexcused')" class="py-2 px-1 rounded-xl text-[10px] font-bold border transition-all active:scale-95 flex items-center justify-center gap-1 ${isUnexcused ? 'bg-rose-600 text-white border-rose-500 font-black shadow-md ring-2 ring-rose-400' : 'bg-slate-800/90 hover:bg-slate-700 text-rose-300 border-rose-500/30'}">
            <span>❌ K.Phép (${unexcusedSign}đ)</span>
          </button>
          <button onclick="selectAttendanceType('${s.id}', 'late')" class="py-2 px-1 rounded-xl text-[10px] font-bold border transition-all active:scale-95 flex items-center justify-center gap-1 ${isLate ? 'bg-indigo-600 text-white border-indigo-500 font-black shadow-md ring-2 ring-indigo-400' : 'bg-slate-800/90 hover:bg-slate-700 text-indigo-300 border-indigo-500/30'}">
            <span>⏰ Trễ (${lateSign}đ)</span>
          </button>

          <!-- NÚT GỬI / HỦY -->
          ${hasSelection ? `
            <button onclick="submitAttendanceRow('${s.id}')" class="py-2 px-1 rounded-xl text-[10px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1 ${isDirty ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg animate-pulse border border-emerald-400' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40'}" title="Gửi ghi nhận điểm danh học sinh này">
              <i data-lucide="send" class="w-3 h-3"></i>
              <span>${isDirty ? 'Gửi' : 'Đã Gửi'}</span>
            </button>
          ` : (hasLoggedToday ? `
            <button onclick="cancelAttendanceRow('${s.id}')" class="py-2 px-1 bg-rose-950/70 hover:bg-rose-800 text-rose-300 text-[10px] font-bold rounded-xl border border-rose-800/50 active:scale-95 transition-all flex items-center justify-center gap-1" title="Hủy điểm danh hôm nay">
              <i data-lucide="x" class="w-3 h-3"></i>
              <span>Hủy</span>
            </button>
          ` : `
            <button disabled class="py-2 px-1 rounded-xl text-[10px] font-semibold text-slate-500 bg-slate-800/40 border border-slate-800/80 cursor-not-allowed opacity-50 flex items-center justify-center gap-1">
              <span>Gửi</span>
            </button>
          `)}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function submitAttendanceRow(studentId) {
  const student = (appState.students || []).find(s => s.id === studentId);
  if (!student) return;

  const currentWeek = appState.classInfo?.currentWeek || 1;
  const todayRaw = new Date().toISOString().slice(0, 10);
  const todayFormatted = formatVietnameseDate(todayRaw);

  const attConfig = getAttendanceCriteriaConfig();

  // Xác định loại điểm danh đang chọn
  let type = pendingAttendanceMap[studentId];
  if (!type) {
    // Nếu chưa bấm chọn mới thì kiểm tra log cũ
    const todayLogs = (appState.logs || []).filter(l => {
      const isMe = (l.studentId && l.studentId === student.id) || (l.studentCode && l.studentCode === student.code);
      return isMe && Number(l.week) === Number(currentWeek) && (l.rawDate === todayRaw || l.exactDate === todayFormatted);
    });
    if (todayLogs.some(l => (l.critTitle && l.critTitle.includes('có phép')) || l.critId === attConfig.excused.id)) type = 'excused';
    else if (todayLogs.some(l => (l.critTitle && l.critTitle.includes('không phép')) || l.critId === attConfig.unexcused.id)) type = 'unexcused';
    else if (todayLogs.some(l => (l.critTitle && (l.critTitle.includes('Đi học muộn') || l.critTitle.includes('trễ') || l.critTitle.includes('muộn'))) || l.critId === attConfig.late.id)) type = 'late';
  }

  if (!type) {
    showToast('Vui lòng bấm chọn Phép, K.Phép hoặc Trễ trước khi Gửi!', 'warning');
    return;
  }

  let critTitle = '';
  let pts = -2;
  let critId = 'tp_3';
  let logType = 'minus';

  if (type === 'excused') {
    critTitle = attConfig.excused.title || 'Nghỉ có phép';
    pts = attConfig.excused.pts !== undefined ? attConfig.excused.pts : -2;
    critId = attConfig.excused.id || 'tp_3';
    logType = attConfig.excused.type || (pts > 0 ? 'plus' : 'minus');
  } else if (type === 'unexcused') {
    critTitle = attConfig.unexcused.title || 'Nghỉ không phép';
    pts = attConfig.unexcused.pts !== undefined ? attConfig.unexcused.pts : -10;
    critId = attConfig.unexcused.id || 'tp_2';
    logType = attConfig.unexcused.type || (pts > 0 ? 'plus' : 'minus');
  } else if (type === 'late') {
    critTitle = attConfig.late.title || 'Đi học muộn / trễ';
    pts = attConfig.late.pts !== undefined ? attConfig.late.pts : -5;
    critId = attConfig.late.id || 'tp_1';
    logType = attConfig.late.type || (pts > 0 ? 'plus' : 'minus');
  }

  // Xóa log điểm danh cũ hôm nay của học sinh nếu có
  const attCritIds = [attConfig.excused.id, attConfig.unexcused.id, attConfig.late.id, 'tp_1', 'tp_2', 'tp_3'];
  appState.logs = (appState.logs || []).filter(l => {
    const isMe = (l.studentId && l.studentId === student.id) || (l.studentCode && l.studentCode === student.code);
    const isToday = Number(l.week) === Number(currentWeek) && (l.rawDate === todayRaw || l.exactDate === todayFormatted);
    const isAtt = attCritIds.includes(l.critId) || (l.critTitle && (l.critTitle.includes('có phép') || l.critTitle.includes('không phép') || l.critTitle.includes('Đi học muộn') || l.critTitle.includes('trễ') || l.critTitle.includes('muộn')));
    return !(isMe && isToday && isAtt);
  });

  // Tạo log mới theo điểm và tiêu chí tùy chỉnh của GVCN
  const newLog = {
    id: 'att_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    week: currentWeek,
    exactDate: todayFormatted,
    rawDate: todayRaw,
    session: 'Đầu giờ sáng',
    period: '15p đầu giờ',
    subject: 'Chuyên cần',
    studentId: student.id,
    studentName: student.name,
    studentCode: student.code || '',
    critId: critId,
    critTitle: critTitle,
    type: logType,
    pts: pts,
    note: `Điểm danh chuyên cần ngày ${todayFormatted}`,
    loggedBy: appState.currentRole === 'gvcn' ? `GVCN (${appState.classInfo?.teacherName || 'GVCN'})` : 'Ban Cán Sự',
    timestamp: Date.now()
  };

  appState.logs.unshift(newLog);
  delete pendingAttendanceMap[studentId]; // Đã gửi xong

  saveToLocalStorage();
  const saved = await postToServer('addLog', { log: newLog });
  if (!saved) {
    showToast('Lưu thất bại. Vui lòng kiểm tra mạng và thử lại.', 'error');
    await syncFromSupabase();
    return;
  }

  const statsAtt = calculateStudentScore(student.id, currentWeek);
  const ptsText = pts > 0 ? `+${pts}đ` : `${pts}đ`;
  sendRealOneSignalPush(
    student.code || 'A101',
    `🔔 ĐIỂM DANH: ${student.name.toUpperCase()}`,
    `Chi tiết: ${critTitle} (${ptsText})
🏆 Điểm hiện tại tuần này: ${statsAtt.score}đ`
  );

  renderAttendanceStudentList();
  renderStudentList();
  renderLeaderboard();
  showToast(`Đã lưu điểm danh [${critTitle} ${ptsText}] cho em ${student.name}.`, 'success');
}

function cancelAttendanceRow(studentId) {
  const student = (appState.students || []).find(s => s.id === studentId);
  if (!student) return;

  const currentWeek = appState.classInfo?.currentWeek || 1;
  const todayRaw = new Date().toISOString().slice(0, 10);
  const todayFormatted = formatVietnameseDate(todayRaw);
  const attConfig = getAttendanceCriteriaConfig();
  const attCritIds = [attConfig.excused.id, attConfig.unexcused.id, attConfig.late.id, 'tp_1', 'tp_2', 'tp_3'];

  appState.logs = (appState.logs || []).filter(l => {
    const isMe = (l.studentId && l.studentId === student.id) || (l.studentCode && l.studentCode === student.code);
    const isToday = Number(l.week) === Number(currentWeek) && (l.rawDate === todayRaw || l.exactDate === todayFormatted);
    const isAtt = attCritIds.includes(l.critId) || (l.critTitle && (l.critTitle.includes('có phép') || l.critTitle.includes('không phép') || l.critTitle.includes('Đi học muộn') || l.critTitle.includes('trễ') || l.critTitle.includes('muộn')));
    return !(isMe && isToday && isAtt);
  });

  delete pendingAttendanceMap[studentId];
  saveToLocalStorage();
  postToServer('syncFullState', { logs: appState.logs });

  renderAttendanceStudentList();
  renderStudentList();
  renderLeaderboard();
  showToast(`Đã hủy ghi nhận điểm danh của em ${student.name}!`, 'info');
}

function submitAllPendingAttendance() {
  const keys = Object.keys(pendingAttendanceMap);
  if (keys.length === 0) {
    showToast('Chưa có học sinh nào được chọn trạng thái điểm danh mới!', 'info');
    return;
  }

  let count = 0;
  keys.forEach(sId => {
    submitAttendanceRow(sId);
    count++;
  });

  showToast(`🎉 Đã gửi thành công điểm danh cho ${count} học sinh!`, 'success');
}


// ================= 9. TAB 1: CHẤM ĐIỂM (GVCN) =================

// ================= HỆ THỐNG TÙY CHỈNH SỐ LƯỢNG TỔ (GVCN THÊM / BỚT TỔ) =================
function renderTeamTabsBar() {
  const container = document.getElementById('team-tabs-container');
  if (!container) return;

  const totalTeams = parseInt(appState.classInfo?.totalTeams) || 4;
  if (appState.activeTeamTab > totalTeams) appState.activeTeamTab = 1;

  let html = '';
  for (let i = 1; i <= totalTeams; i++) {
    const isCur = i === appState.activeTeamTab;
    html += `
      <button onclick="switchTeamTab(${i})" id="team-tab-${i}" class="flex-1 min-w-[55px] py-1.5 text-xs font-semibold rounded-lg transition-all ${isCur ? 'text-white bg-indigo-600 shadow' : 'text-slate-400 hover:text-white'}">
        Tổ ${i}
      </button>
    `;
  }
  container.innerHTML = html;
  syncTeamSelectOptions();
}

function switchTeamTab(teamNum) {
  appState.activeTeamTab = teamNum;
  renderTeamTabsBar();
  renderStudentList();
}

function increaseTeamCount() {
  let count = parseInt(appState.classInfo?.totalTeams) || 4;
  if (count >= 12) {
    showToast('Tối đa là 12 tổ!', 'warning');
    return;
  }
  count++;
  appState.classInfo.totalTeams = count;
  saveToLocalStorage();
  postToServer('saveClassInfo', { classInfo: appState.classInfo });
  syncClassSettingsUI();
  renderTeamTabsBar();
  renderStudentList();
  renderLeaderboard();
  showToast(`🎉 Đã thêm thành ${count} Tổ!`, 'success');
}

function decreaseTeamCount() {
  let count = parseInt(appState.classInfo?.totalTeams) || 4;
  if (count <= 1) {
    showToast('Tối thiểu phải có 1 tổ!', 'warning');
    return;
  }
  count--;
  appState.classInfo.totalTeams = count;
  if (appState.activeTeamTab > count) appState.activeTeamTab = 1;
  saveToLocalStorage();
  postToServer('saveClassInfo', { classInfo: appState.classInfo });
  syncClassSettingsUI();
  renderTeamTabsBar();
  renderStudentList();
  renderLeaderboard();
  showToast(`Đã giảm xuống còn ${count} Tổ!`, 'info');
}

function changeTotalTeams(val) {
  const count = parseInt(val) || 4;
  appState.classInfo.totalTeams = count;
  if (appState.activeTeamTab > count) appState.activeTeamTab = 1;
  saveToLocalStorage();
  postToServer('saveClassInfo', { classInfo: appState.classInfo });
  renderTeamTabsBar();
  renderStudentList();
  renderLeaderboard();
  syncTeamSelectOptions();
  showToast(`Đã thiết lập Lớp có ${count} Tổ!`, 'success');
}

function syncTeamSelectOptions() {
  const totalTeams = parseInt(appState.classInfo?.totalTeams) || 4;
  const selectElements = [
    document.getElementById('new-student-team'),
    document.getElementById('log-team-filter')
  ];

  selectElements.forEach(sel => {
    if (!sel) return;
    const curVal = sel.value;
    const isFilter = sel.id === 'log-team-filter';
    let html = isFilter ? '<option value="all">Tất cả tổ</option>' : '';
    for (let i = 1; i <= totalTeams; i++) {
      html += `<option value="${i}">Tổ ${i}</option>`;
    }
    sel.innerHTML = html;
    if (curVal && curVal <= totalTeams) sel.value = curVal;
  });
}


function setDayFilter(day) {
  appState.activeDayFilter = day;
  document.querySelectorAll('.day-pill').forEach(btn => {
    if (btn.getAttribute('data-day') === day) {
      btn.className = 'day-pill active px-2.5 py-0.5 rounded-full font-medium transition-all active:scale-95 bg-indigo-600 text-white shadow-sm';
    } else {
      btn.className = 'day-pill px-2.5 py-0.5 rounded-full font-medium transition-all active:scale-95 bg-slate-800 text-slate-300 hover:bg-slate-700';
    }
  });
  renderStudentList();
  renderLogs();
}

function clearSearch() {
  const searchInput = document.getElementById('student-search-input');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderStudentList();
}

// =========================================================================
// 📅 HIỂN THỊ & ĐIỀU KHIỂN TUẦN CHẤM ĐIỂM TRÊN TAB 1 (CHẤM ĐIỂM THI ĐUA)
// =========================================================================
function renderScoringWeekBar() {
  const currentWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  const totalWeeks = parseInt(appState.classInfo?.totalWeeks) || 18;
  const maxWeeks = Math.max(totalWeeks, 35);

  const badgeEl = document.getElementById('scoring-active-week-badge');
  if (badgeEl) badgeEl.innerText = `Tuần ${currentWeek}`;

  const headerBadgeEl = document.getElementById('gvcn-header-week-badge');
  if (headerBadgeEl) headerBadgeEl.innerText = `Tuần ${currentWeek}`;

  let dateRangeText = '';
  let noteText = '';
  if (typeof OFFICIAL_WEEK_SCHEDULE !== 'undefined') {
    const sched = OFFICIAL_WEEK_SCHEDULE.find(s => s.week === currentWeek);
    if (sched) {
      if (sched.range) dateRangeText = `(${sched.range})`;
      if (sched.note) noteText = sched.note;
    }
  }

  const dateRangeEl = document.getElementById('scoring-week-date-range');
  if (dateRangeEl) {
    dateRangeEl.innerText = dateRangeText;
    dateRangeEl.classList.toggle('hidden', !dateRangeText);
  }

  const subnoteEl = document.getElementById('scoring-week-subnote');
  if (subnoteEl) {
    if (noteText) {
      subnoteEl.innerText = `${noteText} • Điểm học sinh tính theo Tuần ${currentWeek}`;
    } else {
      subnoteEl.innerText = `Điểm thi đua & ghi nhận tính theo Tuần ${currentWeek}`;
    }
  }

  const teamAvgSub = document.getElementById('team-avg-score-week-sub');
  if (teamAvgSub) {
    teamAvgSub.innerText = `Điểm TB Tuần ${currentWeek}`;
  }

  const select = document.getElementById('scoring-week-selector');
  if (select) {
    const realWeek = typeof getRealTimeCurrentWeek === 'function' ? getRealTimeCurrentWeek() : null;
    let html = '';
    for (let w = 1; w <= maxWeeks; w++) {
      let rText = '';
      if (typeof OFFICIAL_WEEK_SCHEDULE !== 'undefined') {
        const item = OFFICIAL_WEEK_SCHEDULE.find(s => s.week === w);
        if (item && item.range) {
          const shortRange = item.range.split('-')[0].trim();
          rText = ` (${shortRange})`;
        }
      }
      const isReal = realWeek && w === realWeek ? ' ⚡' : '';
      html += `<option value="${w}">Tuần ${w}${rText}${isReal}</option>`;
    }
    select.innerHTML = html;
    select.value = String(currentWeek);
  }

  const modalWeekEl = document.getElementById('modal-student-week-badge');
  if (modalWeekEl) {
    modalWeekEl.innerText = `Tuần ${currentWeek}`;
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function changeScoringActiveWeek(val) {
  const weekNum = parseInt(val);
  if (!weekNum || isNaN(weekNum)) return;
  if (weekNum === appState.classInfo?.currentWeek) return;
  selectWeek(weekNum);
}

function renderStudentList() {
  renderScoringWeekBar();
  renderTeamTabsBar();
  const container = document.getElementById('students-container');
  if (!container) return;

  const searchVal = (document.getElementById('student-search-input')?.value || '').toLowerCase().trim();
  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) clearBtn.classList.toggle('hidden', searchVal.length === 0);

  const activeTeam = appState.activeTeamTab;
  const classStudents = getCurrentClassStudents();
  const teamStudents = classStudents.filter(s => s.team === activeTeam);
  const teamAvg = calculateTeamAvgScore(activeTeam);
  const rankings = getTeamRankings();
  const currentTeamRankIndex = rankings.findIndex(t => t.team === activeTeam) + 1;
  const leaderObj = teamStudents.find(s => s.role === 'leader');

  const badgeIcon = document.getElementById('team-badge-icon');
  if (badgeIcon) badgeIcon.innerText = `T${activeTeam}`;
  const teamTitle = document.getElementById('active-team-title');
  if (teamTitle) teamTitle.innerText = `Tổ ${activeTeam} • ${teamStudents.length} Thành viên`;
  const leaderInfo = document.getElementById('team-leader-info');
  if (leaderInfo) leaderInfo.innerHTML = `Tổ trưởng: <span class="text-slate-200 font-medium">${leaderObj ? leaderObj.name : 'Chưa có'}</span>`;
  const teamAvgEl = document.getElementById('team-avg-score');
  if (teamAvgEl) teamAvgEl.innerText = teamAvg;
  const teamAvgSub = document.getElementById('team-avg-score-week-sub');
  if (teamAvgSub) teamAvgSub.innerText = `Điểm TB Tuần ${appState.classInfo?.currentWeek || 1}`;
  const teamRankBadge = document.getElementById('team-rank-badge');
  if (teamRankBadge) teamRankBadge.innerText = `Hạng ${currentTeamRankIndex}`;

  if (classStudents.length === 0) {
    container.innerHTML = `
      <div class="p-5 rounded-3xl bg-slate-800/90 border-2 border-dashed border-indigo-500/40 text-center space-y-3 shadow-xl">
        <div class="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xl">
          📝
        </div>
        <h3 class="font-bold text-sm text-white">Chưa có học sinh nào trong Lớp ${appState.classInfo.className}</h3>
        <p class="text-xs text-slate-400">Hãy thêm học sinh hoặc tải file Excel lên để bắt đầu chấm điểm!</p>
        <div class="flex items-center justify-center gap-2 pt-1">
          <button onclick="openAddStudentModal()" class="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow">
            + Thêm Học Sinh
          </button>
          <button onclick="openImportModal()" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow">
            Tải Lên Excel
          </button>
        </div>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  let filteredStudents = teamStudents;
  if (searchVal) {
    filteredStudents = classStudents.filter(s => s.name.toLowerCase().includes(searchVal) || (s.code && s.code.toLowerCase().includes(searchVal)));
  }

  if (filteredStudents.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-xs text-slate-500">Tổ ${activeTeam} Lớp ${appState.classInfo.className} chưa có học sinh nào</div>`;
    return;
  }

  let html = '';
  filteredStudents.forEach(student => {
    const stats = calculateStudentScore(student.id);
    const initials = student.name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();

    html += `
      <div class="bg-slate-800/85 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-3 shadow-sm flex items-center justify-between gap-2.5 transition-all">
        <div class="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer" onclick="openStudentQuickScoring('${student.id}')">
          <div class="w-10 h-10 rounded-xl bg-slate-700/80 border border-slate-600 flex items-center justify-center font-bold text-xs text-indigo-300 flex-shrink-0">
            ${initials}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-bold text-white text-xs truncate">${student.name}</span>
              <span class="font-mono text-[10px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-500/30">${student.code || 'A101'}</span>
              ${student.role === 'leader' ? '<span class="text-[9px] font-bold text-indigo-300 bg-indigo-500/20 px-1.5 py-0.2 rounded">Tổ Trưởng</span>' : ''}
              ${student.role === 'monitor' ? '<span class="text-[9px] font-bold text-pink-300 bg-pink-500/20 px-1.5 py-0.2 rounded">Lớp Trưởng</span>' : ''}
            </div>
            <div class="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
              <span class="text-emerald-400 font-medium">+${stats.plus}đ</span>
              <span class="text-rose-400 font-medium">-${stats.minus}đ</span>
              <span class="${stats.rankColor} font-bold">• ${stats.rank}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-1.5 flex-shrink-0">
          <span class="font-black text-sm text-white font-mono px-1.5 py-0.5 rounded-lg bg-slate-900/60 border border-slate-700/50">${stats.score}</span>
          <button onclick="quickActionPlus('${student.id}')" class="w-8 h-8 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white flex items-center justify-center shadow active:scale-90 transition-all font-bold text-sm" title="Cộng điểm nhanh">
            +
          </button>
          <button onclick="quickActionMinus('${student.id}')" class="w-8 h-8 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white flex items-center justify-center shadow active:scale-90 transition-all font-bold text-sm" title="Trừ điểm vi phạm">
            -
          </button>
          <button onclick="openEditStudentModal('${student.id}')" class="w-7 h-7 rounded-lg bg-slate-700/60 hover:bg-slate-600 text-slate-300 hover:text-white flex items-center justify-center transition-all ml-0.5" title="Sửa thông tin">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
          </button>
          <button onclick="confirmDeleteStudent('${student.id}')" class="w-7 h-7 rounded-lg bg-slate-700/60 hover:bg-rose-900/60 text-slate-300 hover:text-rose-300 flex items-center justify-center transition-all" title="Xóa học sinh">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();
}

// ================= 10. SCORING BOTTOM SHEET MODAL =================
let modalSelectedCriterionId = null;

function openStudentQuickScoring(studentId, preselectedType = 'plus') {
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;

  appState.selectedStudent = student;
  appState.modalActionType = preselectedType;
  appState.modalCriteriaCategory = 'all';
  modalSelectedCriterionId = null;

  const stats = calculateStudentScore(student.id);
  const initials = student.name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();

  document.getElementById('modal-student-avatar').innerText = initials;
  document.getElementById('modal-student-name').innerText = student.name;
  document.getElementById('modal-student-team-badge').innerText = `Tổ ${student.team}`;
  const modalWeekBadge = document.getElementById('modal-student-week-badge');
  if (modalWeekBadge) modalWeekBadge.innerText = `Tuần ${appState.classInfo?.currentWeek || 1}`;
  document.getElementById('modal-current-score').innerText = `${stats.score}đ`;

  document.getElementById('modal-custom-points').value = 5;
  document.getElementById('modal-custom-reason').value = '';

  const todayStr = new Date().toISOString().slice(0, 10);
  const dateInput = document.getElementById('modal-exact-date');
  if (dateInput) dateInput.value = todayStr;

  const currentHour = new Date().getHours();
  const sessionSelect = document.getElementById('modal-session-select');
  if (sessionSelect) sessionSelect.value = currentHour < 12 ? 'Buổi sáng' : 'Buổi chiều';

  setModalActionType(preselectedType);
  document.getElementById('scoring-modal').classList.remove('hidden');
}

function quickActionPlus(studentId, e) {
  if (e) e.stopPropagation();
  openStudentQuickScoring(studentId, 'plus');
}

function quickActionMinus(studentId, e) {
  if (e) e.stopPropagation();
  openStudentQuickScoring(studentId, 'minus');
}

function closeScoringModal() {
  document.getElementById('scoring-modal').classList.add('hidden');
  appState.selectedStudent = null;
  modalSelectedCriterionId = null;
}

function setModalActionType(type) {
  appState.modalActionType = type;
  const btnPlus = document.getElementById('modal-tab-plus');
  const btnMinus = document.getElementById('modal-tab-minus');

  if (type === 'plus') {
    btnPlus.className = 'flex-1 py-2 text-xs font-bold rounded-lg text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center gap-1.5 transition-all';
    btnMinus.className = 'flex-1 py-2 text-xs font-bold rounded-lg text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-all';
  } else {
    btnMinus.className = 'flex-1 py-2 text-xs font-bold rounded-lg text-rose-300 bg-rose-950/80 border border-rose-500/40 flex items-center justify-center gap-1.5 transition-all';
    btnPlus.className = 'flex-1 py-2 text-xs font-bold rounded-lg text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-all';
  }

  renderPointPresets();
  renderModalCriteria();
  updateProjectedScorePreview();
}

function renderPointPresets() {
  const container = document.getElementById('modal-point-presets');
  if (!container) return;

  const isPlus = appState.modalActionType === 'plus';
  const presets = isPlus ? [1, 2, 5, 10, 15, 20] : [2, 3, 5, 10, 15, 20];
  const curVal = parseInt(document.getElementById('modal-custom-points').value) || 5;

  let html = '';
  presets.forEach(p => {
    const isSelected = curVal === p;
    const sign = isPlus ? '+' : '-';
    const activeClass = isSelected
      ? (isPlus ? 'bg-emerald-500 text-slate-950 font-black shadow-md' : 'bg-rose-500 text-white font-black shadow-md')
      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-700 font-semibold border border-slate-700';

    html += `
      <button onclick="selectPresetPoints(${p})" class="flex-1 py-1.5 rounded-lg text-xs transition-all active:scale-90 ${activeClass}">
        ${sign}${p}đ
      </button>
    `;
  });

  container.innerHTML = html;
}

function selectPresetPoints(points) {
  document.getElementById('modal-custom-points').value = points;
  renderPointPresets();
  updateProjectedScorePreview();
}

function adjustPointsStepper(delta) {
  const input = document.getElementById('modal-custom-points');
  let val = parseInt(input.value) || 5;
  val = Math.max(1, Math.min(100, val + delta));
  input.value = val;
  renderPointPresets();
  updateProjectedScorePreview();
}

function onCustomPointInput() {
  renderPointPresets();
  updateProjectedScorePreview();
}

function filterModalCriteria(cat) {
  appState.modalCriteriaCategory = cat;
  document.querySelectorAll('.crit-cat-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === cat) {
      btn.className = 'crit-cat-btn px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-medium whitespace-nowrap';
    } else {
      btn.className = 'crit-cat-btn px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium whitespace-nowrap';
    }
  });
  renderModalCriteria();
}

function renderModalCriteria() {
  const container = document.getElementById('modal-criteria-container');
  const actionType = appState.modalActionType;
  const category = appState.modalCriteriaCategory;

  let list = appState.criteria.filter(c => c.type === actionType);
  if (category !== 'all') list = list.filter(c => c.cat === category);

  if (list.length === 0) {
    container.innerHTML = `<div class="col-span-2 text-center py-4 text-xs text-slate-500">Không có mục nào trong danh mục này</div>`;
    return;
  }

  let html = '';
  list.forEach(item => {
    const isPlus = item.type === 'plus';
    const pointBadge = isPlus ? `+${Math.abs(item.pts)}đ` : `-${Math.abs(item.pts)}đ`;
    const isSelected = modalSelectedCriterionId === item.id;

    const baseClass = isPlus ? 'bg-slate-800 hover:bg-emerald-950/40 border-slate-700' : 'bg-slate-800 hover:bg-rose-950/40 border-slate-700';
    const selectedClass = isSelected
      ? (isPlus ? 'ring-2 ring-emerald-400 bg-emerald-950/70 border-emerald-500 shadow-md' : 'ring-2 ring-rose-400 bg-rose-950/70 border-rose-500 shadow-md')
      : '';
    const badgeColor = isPlus ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30';

    html += `
      <div onclick="selectCriterionSuggestion('${item.id}')" class="crit-item ${baseClass} ${selectedClass} border rounded-xl p-2 cursor-pointer transition-all flex flex-col justify-between">
        <div class="flex items-start justify-between gap-1 mb-0.5">
          <span class="text-xs font-bold text-slate-100 leading-tight line-clamp-2">${item.title}</span>
          <span class="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${badgeColor} border flex-shrink-0">${pointBadge}</span>
        </div>
        <p class="text-[10px] text-slate-400 line-clamp-1">${item.desc || ''}</p>
      </div>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();
}

function selectCriterionSuggestion(criterionId) {
  modalSelectedCriterionId = criterionId;
  const crit = appState.criteria.find(c => c.id === criterionId);
  if (!crit) return;

  document.getElementById('modal-custom-points').value = Math.abs(crit.pts);
  const reasonInput = document.getElementById('modal-custom-reason');
  reasonInput.value = crit.title;

  renderPointPresets();
  renderModalCriteria();
  updateProjectedScorePreview();
}

function updateProjectedScorePreview() {
  if (!appState.selectedStudent) return;

  const currentStats = calculateStudentScore(appState.selectedStudent.id);
  const curScore = currentStats.score;
  const isPlus = appState.modalActionType === 'plus';
  const pts = Math.abs(parseInt(document.getElementById('modal-custom-points')?.value) || 0);

  const projectedScore = isPlus ? curScore + pts : curScore - pts;
  const diffSign = isPlus ? `+${pts}đ` : `-${pts}đ`;
  const diffColor = isPlus ? 'text-emerald-400' : 'text-rose-400';

  const diffBadge = document.getElementById('modal-diff-badge');
  if (diffBadge) {
    diffBadge.innerText = `(${diffSign})`;
    diffBadge.className = `${diffColor} font-bold`;
  }

  const projEl = document.getElementById('modal-projected-score');
  if (projEl) projEl.innerText = `${projectedScore}đ`;

  const saveLabel = document.getElementById('btn-save-label');
  if (saveLabel) {
    saveLabel.innerText = `💾 Lưu và Gửi (${diffSign})`;
  }
}

// ================= GHI NHẬN & ĐỒNG BỘ THỜI GIAN THỰC =================
async function confirmSaveScoringRecord() {
  if (!appState.selectedStudent) return;

  const student = appState.selectedStudent;
  const isPlus = appState.modalActionType === 'plus';
  const rawPts = parseInt(document.getElementById('modal-custom-points').value) || 0;
  if (rawPts <= 0) {
    showToast('Vui lòng nhập số điểm lớn hơn 0!', 'warning');
    return;
  }

  const finalPts = isPlus ? rawPts : -rawPts;
  
  const rawDate = document.getElementById('modal-exact-date')?.value || new Date().toISOString().slice(0, 10);
  const formattedDate = formatVietnameseDate(rawDate);

  const sessionVal = document.getElementById('modal-session-select')?.value || '';
  const periodVal = document.getElementById('modal-period-select')?.value || '';
  const subjectVal = document.getElementById('modal-subject-select')?.value || '';
  let reasonText = document.getElementById('modal-custom-reason')?.value.trim() || '';

  let critTitle = isPlus ? 'Khen ngợi / Điểm tốt' : 'Vi phạm / Trừ điểm';
  if (modalSelectedCriterionId) {
    const crit = appState.criteria.find(c => c.id === modalSelectedCriterionId);
    if (crit) critTitle = crit.title;
  } else if (reasonText) {
    critTitle = reasonText;
  }

  // Xác định người ghi nhận (GVCN hoặc Tổ trưởng)
  let loggedByRole = 'GVCN';
  if (appState.currentRole === 'student') {
    const currentLoggedStudent = appState.students.find(s => s.code === appState.currentStudentCode);
    if (currentLoggedStudent) {
      if (currentLoggedStudent.role === 'leader') loggedByRole = `Tổ Trưởng (Tổ ${currentLoggedStudent.team})`;
      else if (currentLoggedStudent.role === 'monitor') loggedByRole = `Lớp Trưởng`;
      else loggedByRole = `Ban Cán Sự`;
    }
  }

  const newLog = {
    id: 'log_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    week: appState.classInfo.currentWeek,
    exactDate: formattedDate,
    rawDate: rawDate,
    session: sessionVal,
    period: periodVal,
    subject: subjectVal,
    studentId: student.id,
    studentName: student.name,
    studentCode: student.code || 'A101',
    team: student.team,
    type: isPlus ? 'plus' : 'minus',
    critId: modalSelectedCriterionId || 'custom',
    critTitle: critTitle,
    pts: finalPts,
    note: reasonText,
    loggedBy: loggedByRole,
    timestamp: Date.now()
  };

  appState.logs.unshift(newLog);
  saveToLocalStorage();

  // 1. TỰ ĐỘNG ĐỒNG BỘ THỜI GIAN THỰC
  const saved = await postToServer('addLog', { log: newLog });
  if (!saved) {
    showToast('Lưu thất bại. Vui lòng kiểm tra mạng và thử lại.', 'error');
    await syncFromSupabase();
    return;
  }

  // 2. Gửi Push Thực (Tới đt Học sinh & Phụ huynh em đó)
  const statsScore = calculateStudentScore(student.id, appState.classInfo.currentWeek);
  sendRealOneSignalPush(
    student.code || 'A101',
    `🔔 GHI NHẬN MỚI NHẤT: ${student.name.toUpperCase()}`,
    `Chi tiết: ${critTitle} (${finalPts > 0 ? '+' : ''}${finalPts}đ)\n🏆 Điểm hiện tại tuần này: ${statsScore.score}đ`
  );

  if (isPlus && rawPts >= 5 && typeof confetti === 'function') {
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.8 } });
  }

  const detailTimingStr = `${sessionVal} • ${periodVal} (${subjectVal}) • Ngày ${formattedDate}`;
  showToast(`Đã lưu ghi nhận: ${detailTimingStr}.`, isPlus ? 'success' : 'warning');

  closeScoringModal();
  if (appState.currentRole === 'gvcn') {
    renderStudentList();
    renderLeaderboard();
    renderLogs();
    updateReportCardPreview();
  } else if (appState.currentRole === 'student') {
    renderStudentPortalView();
  }
}

// ================= 11. AUDIO CHIME & PUSH NOTIFICATIONS (CÓ BẬT / TẮT TRÁNH LÀM PHIỀN) =================
function isNotificationEnabled() {
  return localStorage.getItem('thi_dua_notification_enabled') !== 'false';
}

function toggleNotificationSetting(role = 'parent') {
  const current = isNotificationEnabled();
  const nextState = !current;
  localStorage.setItem('thi_dua_notification_enabled', nextState ? 'true' : 'false');

  if (nextState) {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    playNotificationChime(true);
    if (appState.currentRole === 'parent' && appState.currentParentStudentCode) {
      registerOneSignalExternalId(`PH_${appState.currentParentStudentCode.toUpperCase()}`);
    } else if (appState.currentRole === 'student' && appState.currentStudentCode) {
      registerOneSignalExternalId(`HS_${appState.currentStudentCode.toUpperCase()}`);
    }
    showToast('🔔 Đã BẬT chuông thông báo & cảnh báo thời gian thực!', 'success');
  } else {
    showToast('🔕 Đã TẮT chuông thông báo (Chế độ Tránh làm phiền)!', 'info');
  }

  syncNotificationUI();
}

function syncNotificationUI() {
  const enabled = isNotificationEnabled();

  // 1. Phụ huynh
  const pBtn = document.getElementById('btn-parent-notif-toggle');
  const pIcon = document.getElementById('parent-notif-icon');
  const pText = document.getElementById('parent-notif-text');
  if (pBtn && pText) {
    pText.innerText = enabled ? 'Chuông báo: BẬT' : 'Chuông báo: TẮT';
    pBtn.className = enabled
      ? 'text-[10px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors'
      : 'text-[10px] font-bold text-slate-500 hover:text-slate-400 flex items-center gap-1 transition-colors';
    if (pIcon) pIcon.setAttribute('data-lucide', enabled ? 'bell' : 'bell-off');
  }

  // 2. Học sinh
  const sBtn = document.getElementById('btn-student-notif-toggle');
  const sIcon = document.getElementById('student-notif-icon');
  const sText = document.getElementById('student-notif-text');
  if (sBtn && sText) {
    sText.innerText = enabled ? 'Chuông: BẬT' : 'Chuông: TẮT';
    sBtn.className = enabled
      ? 'text-[9px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 transition-colors'
      : 'text-[9px] font-bold text-slate-500 hover:text-slate-400 flex items-center gap-0.5 transition-colors';
    if (sIcon) sIcon.setAttribute('data-lucide', enabled ? 'bell' : 'bell-off');
  }

  // 3. GVCN
  const gBtn = document.getElementById('btn-gvcn-notif-toggle');
  const gIcon = document.getElementById('gvcn-notif-icon');
  const gText = document.getElementById('gvcn-notif-text');
  if (gBtn && gText) {
    gText.innerText = enabled ? 'Chuông: BẬT' : 'Chuông: TẮT';
    gBtn.className = enabled
      ? 'px-2 py-1 text-emerald-400 hover:bg-slate-800 text-[10px] font-semibold rounded-xl flex items-center gap-1 transition-colors'
      : 'px-2 py-1 text-slate-500 hover:bg-slate-800 text-[10px] font-semibold rounded-xl flex items-center gap-1 transition-colors';
    if (gIcon) gIcon.setAttribute('data-lucide', enabled ? 'bell' : 'bell-off');
  }

  lucide.createIcons();
}


// =========================================================================
// 🔔 HỆ THỐNG PHÁT CHUÔNG & RUNG ĐA KÊNH (100% BULLETPROOF AUDIO & VIBRATION)
// =========================================================================

let _lastPlayedLogId = null;

function unlockAudioContext() {
  try {
    if (!_globalAudioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) _globalAudioCtx = new AudioCtx();
    }
    if (_globalAudioCtx && _globalAudioCtx.state === 'suspended') {
      _globalAudioCtx.resume().catch(() => {});
    }
  } catch (e) {}
}

if (typeof document !== 'undefined') {
  document.addEventListener('click', unlockAudioContext, { passive: true });
  document.addEventListener('touchstart', unlockAudioContext, { passive: true });
}

function playNotificationChime(force = false) {
  if (!force && !isNotificationEnabled()) return;

  // 1. Rung điện thoại cực mạnh (Hỗ trợ tốt trên Android Chrome / PWA)
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([300, 150, 300, 150, 500]);
      console.log('📳 Đã kích hoạt rung điện thoại');
    }
  } catch (err) {
    console.warn('Vibration error:', err);
  }

  // 2. Phát chuông 4 nốt trường học (E5 -> G#5 -> B5 -> E6) bằng Web Audio API
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!_globalAudioCtx) _globalAudioCtx = new AudioCtx();
    const ctx = _globalAudioCtx;

    const playNotes = () => {
      const now = ctx.currentTime;
      const notes = [
        { freq: 659.25, time: 0.00, dur: 0.25, gain: 0.7 },  // E5
        { freq: 830.61, time: 0.12, dur: 0.28, gain: 0.8 },  // G#5
        { freq: 987.77, time: 0.24, dur: 0.32, gain: 0.9 },  // B5
        { freq: 1318.51, time: 0.38, dur: 0.75, gain: 1.0 }  // E6
      ];

      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, now + n.time);

        gain.gain.setValueAtTime(0, now + n.time);
        gain.gain.linearRampToValueAtTime(n.gain, now + n.time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.time + n.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.time);
        osc.stop(now + n.time + n.dur);
      });
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(playNotes).catch(playNotes);
    } else {
      playNotes();
    }
  } catch (e) {
    console.warn('Audio chime warning:', e);
  }
}

function testChimeAndVibration() {
  unlockAudioContext();
  playNotificationChime(true);
  showToast('🔔 Đang thử nghiệm: Chuông 4 nốt ngân vang + Rung điện thoại!', 'success');
}


function enableParentPushNotifications() {
  if (!('Notification' in window)) {
    showToast('Trình duyệt không hỗ trợ Web Notification', 'warning');
    return;
  }

  Notification.requestPermission().then(permission => {
    const btn = document.getElementById('btn-enable-phone-notif');
    if (permission === 'granted') {
      if (btn) {
        btn.innerText = 'Đã Bật Chuông 🟢';
        btn.className = 'px-2.5 py-1 bg-emerald-800 text-emerald-200 text-[10px] font-bold rounded-lg border border-emerald-500/50';
      }
      playNotificationChime();
      sendPhonePushNotification('Có tin từ lớp học', '🎉 Đã bật chuông & thông báo nổi! Bạn sẽ nhận tin báo ngay cả khi đóng app.');
      showToast('Đã bật thông báo nổi trên điện thoại thành công!', 'success');
    }
  });
}

function testNotificationSoundAndAlert() {
  playNotificationChime();
  sendPhonePushNotification('Có tin từ lớp học', '🔔 Chuông báo và thông báo nổi hoạt động hoàn hảo trên điện thoại!');
  showToast('Đã phát chuông báo mẫu!', 'info');
}

function sendPhonePushNotification(title = 'Có tin từ lớp học', bodyText = '') {
  if (!isNotificationEnabled()) return;
  // Phát chuông báo âm thanh và rung điện thoại
  playNotificationChime();

  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SHOW_NOTIFICATION',
          title: title || 'Có tin từ lớp học',
          body: bodyText
        });
      } else {
        new Notification(title || 'Có tin từ lớp học', {
          body: bodyText,
          icon: './icon-192.png',
          badge: './icon-192.png',
          vibrate: [300, 100, 300, 100, 500],
          renotify: true,
          requireInteraction: true
        });
      }
    } catch (e) {
      console.log('Push notification warning:', e);
    }
  }
}

// ================= 12. TAB 2: BẢNG XẾP HẠNG =================
function renderLeaderboard() {
  const currentWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  const classStudents = getCurrentClassStudents();

  // Lấy scope và scopeValue từ bộ chọn phạm vi xếp hạng (Tuần / Tháng / Học kỳ / Cả năm)
  const scope = typeof leaderboardScope !== 'undefined' ? leaderboardScope : 'week';
  const scopeVal = typeof leaderboardScopeValue !== 'undefined' ? leaderboardScopeValue : currentWeek;

  // Tính điểm CHUẨN XÁC theo phạm vi đã chọn
  const rankedStudents = classStudents.map(s => {
    if (scope === 'week') {
      // Tuần: lấy điểm trực tiếp của tuần đó
      const stats = calculateStudentScore(s.id, parseInt(scopeVal) || currentWeek);
      return { ...s, ...stats };
    } else {
      // Tháng / Học kỳ / Cả năm: dùng calculateScopeScoreForStudent tính TB chuẩn xác
      const scopeStats = calculateScopeScoreForStudent(s.id, scope, scopeVal);
      return {
        ...s,
        score: scopeStats.score,
        plusPts: scopeStats.plus || 0,
        minusPts: scopeStats.minus || 0,
        isNearDrop: scopeStats.isNearDrop,
        nearDropMsg: scopeStats.nearDropMsg,
        rankLabel: scopeStats.rankLabel,
        rankColor: scopeStats.rankColor,
        rankBadge: scopeStats.rankBadge
      };
    }
  });
  rankedStudents.sort((a, b) => b.score - a.score);

  // Nhãn phạm vi hiển thị
  let scopeLabel = `Tuần ${scopeVal}`;
  if (scope === 'month') {
    const mNames = { 9: '9/2026', 10: '10/2026', 11: '11/2026', 12: '12/2026', 1: '1/2027', 102: '1/2027 HK2', 2: '2/2027', 3: '3/2027', 4: '4/2027', 5: '5/2027' };
    scopeLabel = `Tháng ${mNames[scopeVal] || scopeVal}`;
  } else if (scope === 'semester') scopeLabel = `Học Kỳ ${scopeVal}`;
  else if (scope === 'year') scopeLabel = 'Cả Năm Học';

  if (rankedStudents.length >= 3) {
    document.getElementById('top1-name').innerText = rankedStudents[0].name;
    document.getElementById('top1-score').innerText = `${rankedStudents[0].score}đ`;
    document.getElementById('top1-avatar').innerText = rankedStudents[0].name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();

    document.getElementById('top2-name').innerText = rankedStudents[1].name;
    document.getElementById('top2-score').innerText = `${rankedStudents[1].score}đ`;
    document.getElementById('top2-avatar').innerText = rankedStudents[1].name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();

    document.getElementById('top3-name').innerText = rankedStudents[2].name;
    document.getElementById('top3-score').innerText = `${rankedStudents[2].score}đ`;
    document.getElementById('top3-avatar').innerText = rankedStudents[2].name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();
  } else {
    document.getElementById('top1-name').innerText = rankedStudents[0]?.name || 'Chưa có';
    document.getElementById('top1-score').innerText = rankedStudents[0] ? `${rankedStudents[0].score}đ` : '---';
    document.getElementById('top2-name').innerText = rankedStudents[1]?.name || 'Chưa có';
    document.getElementById('top2-score').innerText = rankedStudents[1] ? `${rankedStudents[1].score}đ` : '---';
    document.getElementById('top3-name').innerText = rankedStudents[2]?.name || 'Chưa có';
    document.getElementById('top3-score').innerText = rankedStudents[2] ? `${rankedStudents[2].score}đ` : '---';
  }

  // Xếp hạng Tổ - cũng theo phạm vi đã chọn (tính từ điểm học sinh đã tính theo scope)
  const teamRankContainer = document.getElementById('team-rankings-container');
  if (teamRankContainer) {
    const totalTeams = parseInt(appState.classInfo?.totalTeams) || 4;
    let teamHtml = '';
    const teamScores = [];

    for (let tNum = 1; tNum <= totalTeams; tNum++) {
      const teamMembers = rankedStudents.filter(s => Number(s.team) === tNum);
      const memberCount = teamMembers.length;
      const avgScore = memberCount > 0 ? Number((teamMembers.reduce((sum, s) => sum + s.score, 0) / memberCount).toFixed(1)) : 0;
      const leader = classStudents.find(s => Number(s.team) === tNum && (normalizeRole(s.role) === 'leader'))?.name || 'Chưa phân công';
      teamScores.push({ team: tNum, avgScore, leader, memberCount });
    }
    teamScores.sort((a, b) => b.avgScore - a.avgScore);

    teamScores.forEach((t, idx) => {
      let medal = idx === 0 ? '🥇 Hạng 1' : (idx === 1 ? '🥈 Hạng 2' : (idx === 2 ? '🥉 Hạng 3' : `Hạng ${idx + 1}`));
      let badgeColor = idx === 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-700 text-slate-300';
      const progressPercent = Math.min(100, Math.max(0, ((t.avgScore - 50) / 60) * 100));

      teamHtml += `
        <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60">
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold ${badgeColor} px-2 py-0.5 rounded-full">${medal}</span>
              <span class="text-xs font-bold text-white">Tổ ${t.team}</span>
              <span class="text-[10px] text-slate-400">(${t.memberCount} HS • TT: ${t.leader})</span>
            </div>
            <span class="text-sm font-extrabold text-indigo-300">${t.avgScore}đ</span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all" style="width: ${progressPercent}%"></div>
          </div>
        </div>
      `;
    });
    teamRankContainer.innerHTML = teamHtml;
  }

  // Lọc xếp loại hạnh kiểm dựa trên conductConfig cấu hình thực tế của lớp
  const filterType = document.getElementById('leaderboard-filter-type')?.value || 'all';
  let filteredRanks = rankedStudents;
  if (filterType === 'xuat-sac') filteredRanks = rankedStudents.filter(s => s.rankLabel === 'Xuất sắc');
  else if (filterType === 'tot') filteredRanks = rankedStudents.filter(s => s.rankLabel === 'Tốt');
  else if (filterType === 'kha') filteredRanks = rankedStudents.filter(s => s.rankLabel === 'Khá');
  else if (filterType === 'tb') filteredRanks = rankedStudents.filter(s => s.rankLabel === 'Trung bình' || s.rankLabel === 'Đạt');
  else if (filterType === 'can-co-gang') filteredRanks = rankedStudents.filter(s => s.rankLabel === 'Yếu' || s.rankLabel === 'Chưa Đạt');

  const studentRankContainer = document.getElementById('all-students-rank-container');
  let studentHtml = '';
  if (filteredRanks.length === 0) {
    studentHtml = `<div class="text-center py-6 text-xs text-slate-500">Chưa có học sinh nào trong lớp</div>`;
  } else {
    filteredRanks.forEach((s, idx) => {
      const plusDisplay = s.plusPts !== undefined ? s.plusPts : 0;
      const minusDisplay = s.minusPts !== undefined ? s.minusPts : 0;
      const isWarn = s.isNearDrop;
      const rowBgBorder = isWarn 
        ? 'bg-amber-950/20 border-amber-500/40 shadow-sm shadow-amber-500/10' 
        : 'bg-slate-900/60 border-slate-800';
      const scoreColor = isWarn ? 'text-amber-400' : 'text-indigo-300';
      const badgeBorder = isWarn ? 'border-amber-500/40 bg-amber-500/10' : 'border-slate-700';

      studentHtml += `
        <div class="flex items-center justify-between p-2 rounded-xl ${rowBgBorder} border text-xs transition-all">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-5 text-center font-bold text-[11px] ${idx < 3 ? 'text-amber-400 font-extrabold' : 'text-slate-500'}">${idx + 1}</span>
            <div class="min-w-0">
              <p class="font-bold text-slate-100 truncate">
                ${s.name} <span class="text-[9px] text-amber-300 font-mono">(${s.code})</span>
                ${isWarn ? `<span class="inline-block text-[8px] font-bold text-amber-300 bg-amber-500/20 px-1 py-0.2 rounded border border-amber-500/40 ml-1">⚠️ ${s.nearDropMsg || 'Cận mức dưới'}</span>` : ''}
              </p>
              <p class="text-[10px] text-slate-400">Tổ ${s.team} • <span class="text-emerald-400">+${plusDisplay}đ</span> / <span class="text-rose-400">-${minusDisplay}đ</span></p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.rankColor} border ${badgeBorder}">${s.rankBadge}</span>
            <span class="font-extrabold ${scoreColor} w-10 text-right">${s.score}đ</span>
          </div>
        </div>
      `;
    });
  }
  if (studentRankContainer) studentRankContainer.innerHTML = studentHtml;
  lucide.createIcons();
}


// ================= 13. TAB 3: NHẬT KÝ THI ĐUA (CÓ CHỌN TUẦN & LỌC CHUẨN) =================

function populateLogDayFilterOptions() {
  const selectEl = document.getElementById('log-filter-day');
  if (!selectEl) return;

  const todayNum = new Date().getDay(); // 0: CN, 1: T2, 2: T3, 3: T4, 4: T5, 5: T6, 6: T7
  const dayMap = {
    1: { code: 't2', label: 'Thứ Hai' },
    2: { code: 't3', label: 'Thứ Ba' },
    3: { code: 't4', label: 'Thứ Tư' },
    4: { code: 't5', label: 'Thứ Năm' },
    5: { code: 't6', label: 'Thứ Sáu' },
    6: { code: 't7', label: 'Thứ Bảy' },
    0: { code: 'cn', label: 'Chủ Nhật' }
  };
  const todayInfo = dayMap[todayNum] || { code: 't2', label: 'Hôm nay' };

  const currentSelected = selectEl.value || 'today';
  let html = `
    <option value="today" ${currentSelected === 'today' ? 'selected' : ''}>⚡ ${todayInfo.label} (Hôm nay)</option>
    <option value="all" ${currentSelected === 'all' ? 'selected' : ''}>📂 Tất cả các ngày trong tuần</option>
  `;

  [1, 2, 3, 4, 5, 6, 0].forEach(dNum => {
    const item = dayMap[dNum];
    const isToday = dNum === todayNum;
    const isSelected = currentSelected === item.code;
    html += `<option value="${item.code}" ${isSelected ? 'selected' : ''}>${item.label}${isToday ? ' (Hôm nay)' : ''}</option>`;
  });

  selectEl.innerHTML = html;
}

function populateLogWeekFilterOptions() {
  const selectEl = document.getElementById('log-filter-week');
  if (!selectEl) return;
  const currentWeek = appState.classInfo.currentWeek || 1;
  const totalWeeks = appState.classInfo.totalWeeks || 18;
  const curSelected = selectEl.value || 'current';

  let html = `
    <option value="current">Tuần ${currentWeek} (Hiện tại)</option>
    <option value="all">Tất cả các tuần</option>
  `;

  for (let w = 1; w <= totalWeeks; w++) {
    html += `<option value="${w}">Tuần ${w}</option>`;
  }

  selectEl.innerHTML = html;
  if (curSelected && [...selectEl.options].some(o => o.value === curSelected)) {
    selectEl.value = curSelected;
  } else {
    selectEl.value = 'current';
  }
}

function onLogWeekFilterChange(val) {
  if (/^\d+$/.test(String(val))) {
    selectWeek(Number(val));
    return;
  }
  renderLogs();
}

function renderLogs() {
  const container = document.getElementById('logs-container');
  if (!container) return;

  const currentWeek = appState.classInfo.currentWeek || 1;
  const weekFilterEl = document.getElementById('log-filter-week');
  const dayFilterSelect = document.getElementById('log-filter-day');

  if (weekFilterEl && weekFilterEl.options.length <= 2) {
    populateLogWeekFilterOptions();
  }
  if (dayFilterSelect && !dayFilterSelect.getAttribute('data-populated')) {
    populateLogDayFilterOptions();
    dayFilterSelect.setAttribute('data-populated', 'true');
  }

  let weekVal = weekFilterEl ? weekFilterEl.value : 'current';
  if (!weekVal) weekVal = 'current';

  const activeWeekLabel = document.getElementById('log-active-week-label');
  if (activeWeekLabel) {
    activeWeekLabel.innerText = weekVal === 'current' ? `Tuần ${currentWeek}` : (weekVal === 'all' ? 'Tất cả các tuần' : `Tuần ${weekVal}`);
  }

  const teamFilter = document.getElementById('log-filter-team')?.value || 'all';
  const typeFilter = document.getElementById('log-filter-type')?.value || 'all';
  const searchQuery = (document.getElementById('log-search-input')?.value || '').trim().toLowerCase();

  const classStudents = getCurrentClassStudents();
  const curClass = getCleanClassCode(appState.classInfo.className || '10A1');
  const sCode = String(appState.classInfo.schoolCode || '90').trim().toUpperCase();

  let list = (appState.logs || []).filter(l => {
    if (l.className && getCleanClassCode(l.className) === curClass) return true;
    if (l.studentCode && (l.studentCode.includes(curClass) || l.studentCode.startsWith(`${sCode}${curClass}`))) return true;
    if (classStudents.some(cs => cs.id === l.studentId || cs.code === l.studentCode || (cs.name && l.studentName && cs.name.toLowerCase() === l.studentName.toLowerCase()))) return true;
    return false;
  });

  // Lọc theo tuần
  if (weekVal === 'current') {
    list = list.filter(l => Number(l.week) === Number(currentWeek));
  } else if (weekVal !== 'all' && !isNaN(parseInt(weekVal))) {
    list = list.filter(l => Number(l.week) === parseInt(weekVal));
  }

  // TÍNH TOÁN DỮ LIỆU TỔNG QUAN (SUMMARY STATS TRƯỚC KHI LỌC TỔ/LOẠI ĐỂ HIỂN THỊ CHUẨN)
  let totalPlus = 0;
  let totalMinus = 0;
  list.forEach(l => {
    const pts = Math.abs(Number(l.pts) || 0);
    if (l.type === 'plus') totalPlus += pts;
    else if (l.type === 'minus') totalMinus += pts;
  });

  const statPlusEl = document.getElementById('log-stat-plus');
  if (statPlusEl) statPlusEl.innerText = `+${totalPlus} điểm`;
  const statMinusEl = document.getElementById('log-stat-minus');
  if (statMinusEl) statMinusEl.innerText = `-${totalMinus} điểm`;
  const statTotalEl = document.getElementById('log-stat-total');
  if (statTotalEl) statTotalEl.innerText = `${list.length} lượt`;

  // Lọc theo tổ
  if (teamFilter !== 'all' && !isNaN(parseInt(teamFilter))) {
    list = list.filter(l => Number(l.team) === parseInt(teamFilter));
  }

  // Lọc theo loại hành vi
  if (typeFilter === 'plus') {
    list = list.filter(l => l.type === 'plus');
  } else if (typeFilter === 'minus') {
    list = list.filter(l => l.type === 'minus');
  } else if (typeFilter === 'attendance') {
    list = list.filter(l => isAttendanceLog(l));
  }

  // Lọc theo Thứ trong tuần (Mặc định ưu tiên hiển thị ngày hiện tại hôm nay)
  let currentDayFilter = dayFilterSelect ? dayFilterSelect.value : 'today';
  if (!currentDayFilter) currentDayFilter = 'today';

  const todayNum = new Date().getDay(); // 0: CN, 1: T2, 2: T3, 3: T4, 4: T5, 5: T6, 6: T7
  const dayCodeMap = { 1: 't2', 2: 't3', 3: 't4', 4: 't5', 5: 't6', 6: 't7', 0: 'cn' };
  const targetDayCode = currentDayFilter === 'today' ? dayCodeMap[todayNum] : currentDayFilter;

  if (currentDayFilter !== 'all') {
    list = list.filter(l => {
      const logDay = getLogDayCode(l);
      return logDay.toLowerCase() === targetDayCode.toLowerCase();
    });
  }

  // Lọc theo Từ khóa tìm kiếm (Tên học sinh, mã số, hoặc hành vi)
  if (searchQuery) {
    list = list.filter(l => {
      const sName = (l.studentName || '').toLowerCase();
      const sCode = (l.studentCode || '').toLowerCase();
      const cTitle = (l.critTitle || '').toLowerCase();
      const note = (l.note || '').toLowerCase();
      const subj = (l.subject || '').toLowerCase();
      return sName.includes(searchQuery) || sCode.includes(searchQuery) || cTitle.includes(searchQuery) || note.includes(searchQuery) || subj.includes(searchQuery);
    });
  }

  if (list.length === 0) {
    const weekLabel = weekVal === 'current' ? `Tuần ${currentWeek}` : (weekVal === 'all' ? 'các tuần' : `Tuần ${weekVal}`);
    container.innerHTML = `
      <div class="text-center py-10 bg-slate-900/60 rounded-2xl border border-slate-800/80 space-y-1.5">
        <i data-lucide="file-clock" class="w-7 h-7 text-slate-500 mx-auto mb-1.5"></i>
        <p class="text-xs font-bold text-slate-300">Không tìm thấy bản ghi nào trong ${weekLabel}</p>
        <p class="text-[11px] text-slate-500">${searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Hãy sang tab "Chấm Điểm" để ghi nhận thi đua cho học sinh!'}</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  // KẾT HỢP THÔNG BÁO CHUNG CHO LỚP VÀO DÒNG THỜI GIAN NHẬT KÝ
  let combinedItems = [];

  // 1. Thêm các bản ghi điểm danh, cộng/trừ điểm (nếu không chọn riêng mục announcement)
  if (typeFilter !== 'announcement') {
    list.forEach(l => combinedItems.push({ ...l, itemCategory: 'conduct_log' }));
  }

  // 2. Thêm thông báo chung / nhận xét AI nếu chọn 'all' hoặc 'announcement'
  if (typeFilter === 'all' || typeFilter === 'announcement') {
    const rawAnnList = (appState.classAnnouncements && appState.classAnnouncements.length > 0 ? appState.classAnnouncements : appState.announcements) || [];
    const classAnns = rawAnnList.filter(a => {
      if (a.id === 'ann_1') return false;
      if (a.className) return getCleanClassCode(a.className) === curClass;
      return true;
    });

    classAnns.forEach(a => {
      const matchSearch = !searchQuery || (a.title && a.title.toLowerCase().includes(searchQuery)) || (a.content && a.content.toLowerCase().includes(searchQuery));
      if (matchSearch) {
        combinedItems.push({
          id: a.id,
          title: a.title,
          content: a.content,
          author: a.author || 'GVCN',
          timestamp: a.timestamp || (a.createdAt ? new Date(a.createdAt).getTime() : Date.now()),
          exactDate: a.date || '',
          itemCategory: 'announcement'
        });
      }
    });
  }

  // SẮP XẾP TẤT CẢ THEO THỜI GIAN MỚI NHẤT LÊN ĐẦU
  combinedItems.sort((a, b) => {
    const tA = a.timestamp || 0;
    const tB = b.timestamp || 0;
    return tB - tA;
  });

  if (combinedItems.length === 0) {
    const weekLabel = weekVal === 'current' ? `Tuần ${currentWeek}` : (weekVal === 'all' ? 'các tuần' : `Tuần ${weekVal}`);
    container.innerHTML = `
      <div class="text-center py-10 bg-slate-900/60 rounded-2xl border border-slate-800/80 space-y-1.5">
        <i data-lucide="file-clock" class="w-7 h-7 text-slate-500 mx-auto mb-1.5"></i>
        <p class="text-xs font-bold text-slate-300">Không tìm thấy bản ghi nào trong ${weekLabel}</p>
        <p class="text-[11px] text-slate-500">${searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Hãy sang tab "Chấm Điểm" để ghi nhận thi đua cho học sinh!'}</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  let html = '';
  combinedItems.forEach(item => {
    if (item.itemCategory === 'announcement') {
      const isAi = item.content && item.content.includes('AI');
      const headerTitle = isAi ? '🤖 NHẬN XÉT TRỢ LÝ AI & GVCN' : '📢 THÔNG BÁO CHUNG CHO LỚP';
      const cleanDate = formatVietnameseDateTime(item.exactDate, item.timestamp);
      html += `
        <div class="bg-gradient-to-r from-indigo-950/90 via-slate-900 to-indigo-950/90 border-2 border-indigo-500/40 rounded-2xl p-3.5 space-y-2 transition-all shadow-md">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-start gap-2.5 min-w-0">
              <span class="inline-flex items-center justify-center font-bold text-xs px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shrink-0">
                ${headerTitle}
              </span>
              <div class="min-w-0">
                <h4 class="font-bold text-sm text-indigo-200 truncate">${item.title}</h4>
                <p class="text-[11px] text-slate-400 mt-0.5">Gửi tới: Toàn thể Lớp ${curClass} • Người đăng: <b class="text-amber-300">${item.author}</b></p>
              </div>
            </div>
            <span class="text-[11px] text-slate-400 font-mono shrink-0">${cleanDate}</span>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-950/60 border border-indigo-950/80 text-xs text-slate-200 leading-relaxed max-h-48 overflow-y-auto">
            ${item.content}
          </div>
          <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80">
            <span class="text-emerald-400 font-semibold flex items-center gap-1">
              <i data-lucide="check-circle" class="w-3 h-3"></i> Đã hiển thị trên máy toàn thể Học sinh & Phụ huynh
            </span>
            <button onclick="deleteClassAnnouncement('${item.id}')" class="text-rose-400 hover:text-rose-300 font-bold p-1 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1" title="Xóa thông báo này">
              <i data-lucide="trash-2" class="w-3 h-3"></i>
              <span>Xóa</span>
            </button>
          </div>
        </div>
      `;
      return;
    }

    const log = item;
    const isPlus = log.type === 'plus';
    const pointBadge = isPlus ? `+${Math.abs(log.pts)} điểm` : `−${Math.abs(log.pts)} điểm`;
    const badgeStyle = isPlus
      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
      : 'bg-rose-500/10 text-rose-400 border border-rose-500/25';
    const cleanDate = formatVietnameseDateTime(log.exactDate, log.timestamp);
    const timingParts = [];
    if (log.session && log.session.trim()) timingParts.push(log.session.trim());
    if (log.period && log.period.trim()) timingParts.push(log.period.trim());
    if (log.subject && log.subject.trim()) timingParts.push(log.subject.trim());
    const timingDisplay = timingParts.length > 0 ? timingParts.join(' · ') : 'Phong trào / Nề nếp chung';

    html += `
      <div class="bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-3.5 space-y-2 transition-all shadow-sm">
        
        <!-- CẤP 1 & CẤP 2 (HEADER: ĐIỂM + TÊN HỌC SINH + TỔ + NGÀY) -->
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-start gap-2.5 min-w-0">
            <span class="inline-flex items-center justify-center font-bold text-xs px-2.5 py-1 rounded-lg ${badgeStyle} flex-shrink-0">
              ${pointBadge}
            </span>
            <div class="min-w-0">
              <h4 class="font-bold text-sm text-slate-100 truncate">${log.studentName}</h4>
              <p class="text-[11px] text-slate-400 mt-0.5">Lớp ${curClass} · Tổ ${log.team} <span class="text-slate-500 text-[10px] font-mono">(${log.studentCode || ''})</span></p>
            </div>
          </div>
          <span class="text-[11px] text-slate-400 font-mono flex-shrink-0">${cleanDate}</span>
        </div>

        <!-- CẤP 2: METADATA BUỔI · TIẾT · MÔN -->
        <div class="text-[11px] text-slate-400 flex items-center gap-1.5 pl-0.5">
          <span class="text-indigo-400">●</span>
          <span>${timingDisplay}</span>
        </div>

        <!-- CẤP 1: NỘI DUNG HÀNH VI & GHI CHÚ -->
        <div class="space-y-0.5 pt-0.5">
          <p class="text-xs font-semibold text-slate-200 leading-snug">${log.critTitle || log.criteriaTitle || log.note || (log.type === 'plus' ? 'Khen thưởng thi đua' : 'Vi phạm nề nếp')}</p>
          ${log.note ? `<p class="text-[11px] text-slate-400 italic">"${log.note}"</p>` : ''}
        </div>

        <!-- CẤP 3: NGƯỜI GHI & NÚT XÓA BẢN GHI -->
        <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-800/60">
          <span>Ghi bởi: <b class="text-slate-400 font-medium">${log.loggedBy || 'GVCN'}</b></span>
          <button onclick="deleteLog('${log.id}')" class="text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-slate-800 transition-colors" title="Xóa bản ghi này">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>

      </div>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();
}

async function deleteLog(logId) {
  if (!logId) return;
  if (confirm('Thầy/cô có chắc muốn xóa bản ghi chấm điểm này?')) {
    const idStr = String(logId).trim();
    appState.deletedLogIds = appState.deletedLogIds || [];
    if (!appState.deletedLogIds.includes(idStr)) {
      appState.deletedLogIds.push(idStr);
    }

    appState.logs = (appState.logs || []).filter(l => String(l.id || '').trim() !== idStr);
    appState.lastDataHash = '';

    saveToLocalStorage();
    const delItem = (appState.logs || []).find(l => String(l.id || '').trim() === idStr);
    const saved = await postToServer('deleteLog', { logId: idStr, id: idStr, timestamp: delItem ? delItem.timestamp : '' });
    if (!saved) {
      showToast('Lưu thất bại. Bản ghi chưa được xóa trên máy chủ.', 'error');
      await syncFromSupabase();
      return;
    }

    renderStudentList();
    renderLeaderboard();
    renderLogs();
    updateReportCardPreview();
    showToast('Đã lưu việc xóa bản ghi chấm điểm.', 'success');
  }
}

// ================= 14. TAB 4: BÁO CÁO & XUẤT PHIẾU TỔNG KẾT =================
function setReportScope(scope) {
  appState.reportScope = scope;
  const btnWeek = document.getElementById('scope-btn-week');
  const btnMonth = document.getElementById('scope-btn-month');
  const btnSemester = document.getElementById('scope-btn-semester');
  const btnYear = document.getElementById('scope-btn-year');

  if (btnWeek) btnWeek.className = scope === 'week' ? 'py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 shadow shadow-indigo-600/30' : 'py-2 text-xs font-bold rounded-xl text-slate-400 bg-slate-900/80 border border-slate-700 hover:text-white';
  if (btnMonth) btnMonth.className = scope === 'month' ? 'py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 shadow shadow-indigo-600/30' : 'py-2 text-xs font-bold rounded-xl text-slate-400 bg-slate-900/80 border border-slate-700 hover:text-white';
  if (btnSemester) btnSemester.className = scope === 'semester' ? 'py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 shadow shadow-indigo-600/30' : 'py-2 text-xs font-bold rounded-xl text-slate-400 bg-slate-900/80 border border-slate-700 hover:text-white';
  if (btnYear) btnYear.className = scope === 'year' ? 'py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 shadow shadow-indigo-600/30' : 'py-2 text-xs font-bold rounded-xl text-slate-400 bg-slate-900/80 border border-slate-700 hover:text-white';

  renderScopeDetailSelector();
  updateReportCardPreview();
}

function renderScopeDetailSelector() {
  const container = document.getElementById('scope-detail-container');
  if (!container) return;

  const scope = appState.reportScope || 'week';
  let html = '';
  if (scope === 'week') {
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="text-[11px] text-slate-300 font-semibold">Chọn Tuần:</label>
        <select id="scope-select-val" onchange="onScopeDetailChange(this.value)" class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white">
    `;
    OFFICIAL_WEEK_SCHEDULE.forEach(item => {
      const isCur = item.week === (appState.classInfo.currentWeek || 1);
      const noteStr = item.note ? ` [${item.note}]` : '';
      const hkStr = item.semester === 1 ? 'HK1' : 'HK2';
      html += `<option value="${item.week}" ${isCur ? 'selected' : ''}>Tuần ${item.week} (${item.range}) • ${hkStr}${noteStr}</option>`;
    });
    html += `</select></div>`;
  } else if (scope === 'month') {
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="text-[11px] text-slate-300 font-semibold">Chọn Tháng:</label>
        <select id="scope-select-val" onchange="onScopeDetailChange(this.value)" class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white">
          <optgroup label="HỌC KỲ I (Năm 2026 - 2027 • 18 Tuần)">
            <option value="9">Tháng 9/2026 (Tuần 1 - 4 • 4 tuần)</option>
            <option value="10">Tháng 10/2026 (Tuần 5 - 8 • 4 tuần)</option>
            <option value="11">Tháng 11/2026 (Tuần 9 - 12 • 4 tuần)</option>
            <option value="12">Tháng 12/2026 (Tuần 13 - 16 • 4 tuần)</option>
            <option value="1">Tháng 1/2027 - Cuối HK1 (Tuần 17 - 18 • 2 tuần)</option>
          </optgroup>
          <optgroup label="HỌC KỲ II (Năm 2026 - 2027 • 17 Tuần)">
            <option value="102">Tháng 1/2027 - Đầu HK2 (Tuần 19 - 21 • 3 tuần)</option>
            <option value="2">Tháng 2/2027 (Tuần 22 - 23 • Nghỉ Tết ÂL)</option>
            <option value="3">Tháng 3/2027 (Tuần 24 - 27 • 4 tuần)</option>
            <option value="4">Tháng 4/2027 (Tuần 28 - 32 • 5 tuần)</option>
            <option value="5">Tháng 5/2027 - Cuối HK2 (Tuần 33 - 35 • 3 tuần)</option>
          </optgroup>
        </select>
      </div>
    `;
  } else if (scope === 'semester') {
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="text-[11px] text-slate-300 font-semibold">Chọn Học Kỳ:</label>
        <select id="scope-select-val" onchange="onScopeDetailChange(this.value)" class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold">
          <option value="1">🥇 Học Kỳ I (18 Tuần: Từ 07/09/2026 đến 10/01/2027)</option>
          <option value="2">🥈 Học Kỳ II (17 Tuần: Từ 11/01/2027 đến 23/05/2027)</option>
        </select>
      </div>
    `;
  } else if (scope === 'year') {
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="text-[11px] text-slate-300 font-semibold">Chọn Năm Học:</label>
        <select id="scope-select-val" onchange="onScopeDetailChange(this.value)" class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-amber-300 font-bold">
          <option value="1">🏆 Cả Năm Học 2026 - 2027 (Toàn bộ 35 Tuần: Tuần 1 đến Tuần 35)</option>
        </select>
      </div>
    `;
  }
  container.innerHTML = html;
}

function onScopeDetailChange(val) {
  if ((appState.reportScope || 'week') === 'week') {
    selectWeek(Number(val));
    return;
  }
  appState.reportScopeValue = parseInt(val) || 1;
  updateReportCardPreview();
}

function getWeeksForCurrentScope() {
  const scope = appState.reportScope || 'week';
  const val = parseInt(document.getElementById('scope-select-val')?.value) || (appState.classInfo?.currentWeek || 1);

  if (scope === 'week') return [val];
  if (scope === 'month') {
    if (val === 9) return [1, 2, 3, 4];
    if (val === 10) return [5, 6, 7, 8];
    if (val === 11) return [9, 10, 11, 12];
    if (val === 12) return [13, 14, 15, 16];
    if (val === 1) return [17, 18]; // Cuối HK1
    if (val === 102) return [19, 20, 21]; // Đầu HK2 (Tháng 1)
    if (val === 2) return [22, 23]; // Tháng 2 (sau Tết ÂL)
    if (val === 3) return [24, 25, 26, 27];
    if (val === 4) return [28, 29, 30, 31, 32];
    if (val === 5) return [33, 34, 35]; // Tháng 5 (Cuối HK2)
    return [1, 2, 3, 4];
  }
  if (scope === 'semester') {
    const weeks = [];
    if (val === 1) {
      // Học kỳ 1: 18 tuần (Tuần 1 -> Tuần 18)
      for (let i = 1; i <= 18; i++) weeks.push(i);
    } else {
      // Học kỳ 2: 17 tuần (Tuần 19 -> Tuần 35)
      for (let i = 19; i <= 35; i++) weeks.push(i);
    }
    return weeks;
  }
  if (scope === 'year') {
    const weeks = [];
    // Cả năm học 2026-2027: 35 tuần (18 tuần HK1 + 17 tuần HK2)
    for (let i = 1; i <= 35; i++) weeks.push(i);
    return weeks;
  }
  return [appState.classInfo?.currentWeek || 1];
}

function calculateScopeAggregatedStats() {
  const weeks = getWeeksForCurrentScope();
  const classStudents = getCurrentClassStudents();
  const scopeLogs = appState.logs.filter(l => {
    const logW = parseInt(String(l.week).replace(/[^0-9]/g, '')) || 1;
    return weeks.includes(logW) && classStudents.some(cs => cs.id === l.studentId || cs.code === l.studentCode);
  });

  const totalPlus = scopeLogs.filter(l => l.type === 'plus').length;
  const totalMinus = scopeLogs.filter(l => l.type === 'minus').length;

  const curWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  const activeWeeks = appState.reportScope === 'month'
    ? weeks.filter(w => w <= curWeek || (appState.logs || []).some(l => (parseInt(String(l.week).replace(/[^0-9]/g, '')) || 1) === w))
    : weeks;
  const evalWeeks = activeWeeks.length > 0 ? activeWeeks : [weeks[0]];

  const studentScores = classStudents.map(s => {
    let totalScore = 0;
    let totalPlusPts = 0;
    let totalMinusPts = 0;

    evalWeeks.forEach(w => {
      const st = calculateStudentScore(s.id, w);
      totalScore += st.score;
      totalPlusPts += st.plusPts;
      totalMinusPts += st.minusPts;
    });

    const avgScore = evalWeeks.length > 0 ? Number((totalScore / evalWeeks.length).toFixed(1)) : 100;
    const monthlyConduct = calculateMonthlyConduct(avgScore, 1);
    return { ...s, totalScore, avgScore, evalWeeksCount: evalWeeks.length, totalPlusPts, totalMinusPts, monthlyConduct };
  });
  studentScores.sort((a, b) => b.avgScore - a.avgScore);

  const teamRanks = [1, 2, 3, 4].map(teamNum => {
    const tStudents = studentScores.filter(s => Number(s.team) === Number(teamNum));
    const avg = tStudents.length > 0
      ? Number((tStudents.reduce((sum, s) => sum + s.avgScore, 0) / tStudents.length).toFixed(1))
      : 100;
    const leader = classStudents.find(s => Number(s.team) === Number(teamNum) && s.role === 'leader')?.name || 'Chưa phân công';
    return { team: teamNum, avgScore: avg, leader, memberCount: tStudents.length };
  });
  teamRanks.sort((a, b) => b.avgScore - a.avgScore);

  return { weeks: evalWeeks, scopeLogs, totalPlus, totalMinus, studentScores, teamRanks };
}

function updateReportCardPreview() {
  const scope = appState.reportScope || 'week';
  const classStudents = getCurrentClassStudents();
  const stats = calculateScopeAggregatedStats();
  const scopeVal = parseInt(document.getElementById('scope-select-val')?.value) || 1;

  // Populate PDF student select dropdown
  const pdfStudentSelect = document.getElementById('pdf-student-select');
  if (pdfStudentSelect && classStudents.length > 0) {
    const prevVal = pdfStudentSelect.value;
    let selectOptionsHtml = `
      <option value="all" class="bg-indigo-950 text-amber-300 font-bold py-1">
        🌟 [TẤT CẢ HỌC SINH CẢ LỚP] (${classStudents.length} HS - In Hàng Loạt)
      </option>
    `;
    selectOptionsHtml += classStudents.map(s => `
      <option value="${s.code}" class="bg-slate-900 text-white font-medium py-1">
        ${s.code} - ${s.name} (Tổ ${s.team})
      </option>
    `).join('');
    pdfStudentSelect.innerHTML = selectOptionsHtml;
    if (prevVal && classStudents.some(s => s.code === prevVal)) {
      pdfStudentSelect.value = prevVal;
    }
  }

  let badgeTitle = '✨ BÁO CÁO THI ĐUA & NỀ NẾP TUẦN ✨';
  let subTitle = `Tổng kết Tuần ${scopeVal} • Năm học 2026 - 2027`;

  if (scope === 'month') {
    badgeTitle = `✨ BÁO CÁO THI ĐUA & HẠNH KIỂM THÁNG ${scopeVal} ✨`;
    subTitle = `Tổng kết Tháng ${scopeVal} (Tuần ${stats.weeks.join(', ')}) • Xếp loại hạnh kiểm tháng`;
  } else if (scope === 'semester') {
    badgeTitle = `✨ BÁO CÁO THI ĐUA HỌC KỲ ${scopeVal} ✨`;
    subTitle = `Tổng kết Học Kỳ ${scopeVal} • Toàn diện nề nếp & phong trào`;
  } else if (scope === 'year') {
    badgeTitle = `🏆 BÁO CÁO TỔNG KẾT NĂM HỌC 🏆`;
    subTitle = `Tổng kết Cả Năm Học (35 Tuần) • Toàn diện nề nếp & phong trào thi đua`;
  }

  const badgeEl = document.getElementById('report-scope-badge');
  if (badgeEl) badgeEl.innerText = badgeTitle;

  const classTitleEl = document.getElementById('report-class-title');
  if (classTitleEl) classTitleEl.innerText = `${appState.classInfo.className.toUpperCase()} • ${appState.classInfo.schoolName.toUpperCase()}`;
  
  const weekSubEl = document.getElementById('report-week-subtitle');
  if (weekSubEl) weekSubEl.innerText = subTitle;

  const totalStudEl = document.getElementById('report-total-students');
  if (totalStudEl) totalStudEl.innerText = `${classStudents.length} HS`;

  const totalPlusEl = document.getElementById('report-total-plus');
  if (totalPlusEl) totalPlusEl.innerText = `+${stats.totalPlus} lượt`;

  const totalMinusEl = document.getElementById('report-total-minus');
  if (totalMinusEl) totalMinusEl.innerText = `-${stats.totalMinus} lượt`;

  const reportTeamContainer = document.getElementById('report-team-ranks');
  if (reportTeamContainer) {
    let teamHtml = '';
    stats.teamRanks.forEach((t, idx) => {
      let medal = idx === 0 ? '🥇 Nhất' : idx === 1 ? '🥈 Nhì' : idx === 2 ? '🥉 Ba' : '🏅 Tư';
      teamHtml += `
        <div class="flex items-center justify-between">
          <span class="font-medium text-slate-200">${medal}: Tổ ${t.team}</span>
          <span class="font-bold text-indigo-300">${t.avgScore} điểm</span>
        </div>
      `;
    });
    reportTeamContainer.innerHTML = teamHtml;
  }

  // ĐỒNG BỘ TIÊU ĐỀ SECTION VÀ HIỂN THỊ DASHBOARD HẠNH KIỂM RIÊNG BIỆT
  const conductDashboard = document.getElementById('monthly-conduct-dashboard');
  const reportStudentsHeader = document.getElementById('report-students-header');

  if (scope === 'month') {
    if (conductDashboard) conductDashboard.classList.remove('hidden');
    if (reportStudentsHeader) {
      reportStudentsHeader.innerText = '📋 BẢNG XẾP LOẠI HẠNH KIỂM THÁNG (CHUẨN QUY CHẾ):';
      reportStudentsHeader.className = 'text-[10px] font-black text-amber-300 uppercase tracking-wide block';
    }

    // Đếm số lượng học sinh theo từng bậc hạnh kiểm
    const totGood = stats.studentScores.filter(s => s.monthlyConduct.rank === 'Tốt').length;
    const totFair = stats.studentScores.filter(s => s.monthlyConduct.rank === 'Khá').length;
    const totPass = stats.studentScores.filter(s => s.monthlyConduct.rank === 'Đạt').length;
    const totFail = stats.studentScores.filter(s => s.monthlyConduct.rank === 'Chưa Đạt' || s.monthlyConduct.rank === 'Không Đạt').length;

    // Cập nhật thẻ thống kê trên Dashboard
    const cfg = appState.classInfo?.conductConfig || { totMin: 80, khaMin: 65, datMin: 50 };
    const totMin = Number(cfg.totMin ?? 80);
    const khaMin = Number(cfg.khaMin ?? 65);
    const datMin = Number(cfg.datMin ?? 50);

    const lblGood = document.getElementById('label-conduct-good');
    const lblFair = document.getElementById('label-conduct-fair');
    const lblPass = document.getElementById('label-conduct-pass');
    const lblFail = document.getElementById('label-conduct-fail');
    if (lblGood) lblGood.innerText = `TỐT (≥${totMin}đ)`;
    if (lblFair) lblFair.innerText = `KHÁ (≥${khaMin}đ)`;
    if (lblPass) lblPass.innerText = `ĐẠT (≥${datMin}đ)`;
    if (lblFail) lblFail.innerText = `CHƯA ĐẠT (<${datMin}đ)`;

    const subDesc = document.getElementById('monthly-conduct-desc-sub');
    if (subDesc) subDesc.innerText = `Điểm TB Tháng ${stats.weeks.length} tuần: Tốt (≥${totMin}đ), Khá (≥${khaMin}đ), Đạt (≥${datMin}đ), Chưa Đạt (<${datMin}đ)`;

    const elGood = document.getElementById('stat-conduct-good');
    if (elGood) elGood.innerText = `${totGood} HS`;
    const elFair = document.getElementById('stat-conduct-fair');
    if (elFair) elFair.innerText = `${totFair} HS`;
    const elPass = document.getElementById('stat-conduct-pass');
    if (elPass) elPass.innerText = `${totPass} HS`;
    const elFail = document.getElementById('stat-conduct-fail');
    if (elFail) elFail.innerText = `${totFail} HS`;

    // Cập nhật danh sách bảng Hạnh kiểm trên Dashboard
    const conductTableList = document.getElementById('monthly-conduct-table-list');
    if (conductTableList) {
      let tblHtml = '';
      stats.studentScores.forEach((s, idx) => {
        tblHtml += `
          <div class="flex items-center justify-between p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-5 font-mono text-[10px] text-slate-400 font-bold">${idx + 1}</span>
              <div class="min-w-0">
                <span class="font-bold text-white truncate block">${s.name} <span class="text-amber-300 text-[10px] font-mono">(${s.code})</span></span>
                <span class="text-[10px] text-slate-400">Tổ ${s.team} • Tổng: <b class="text-amber-300">${s.totalScore}đ</b> (TB: ${s.avgScore}đ/tuần • ${s.evalWeeksCount || 1} tuần)</span>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              <span class="inline-block font-bold text-[11px] px-2 py-0.5 rounded-lg ${s.monthlyConduct.bg} ${s.monthlyConduct.color} border ${s.monthlyConduct.border}">
                ${s.monthlyConduct.badge}
              </span>
              <span class="block text-[9px] text-slate-400 mt-0.5">${s.monthlyConduct.desc}</span>
            </div>
          </div>
        `;
      });
      conductTableList.innerHTML = tblHtml;
    }
  } else {
    if (conductDashboard) conductDashboard.classList.add('hidden');
    if (reportStudentsHeader) {
      reportStudentsHeader.innerText = scope === 'year' ? '🏆 GƯƠNG MẶT XUẤT SẮC TOÀN DIỆN CẢ NĂM:' : '🌟 GƯƠNG MẶT XUẤT SẮC TIÊU BIỂU:';
      reportStudentsHeader.className = 'text-[10px] font-bold text-emerald-300 uppercase tracking-wide block';
    }
  }

  const top3 = stats.studentScores.slice(0, 3);
  const reportTopContainer = document.getElementById('report-top-students');
  if (reportTopContainer) {
    let topHtml = '';
    
    // NẾU LÀ BÁO CÁO THÁNG -> HIỂN THỊ DANH SÁCH BẬC HẠNH KIỂM KÈM BADGE TRÊN PHIẾU
    if (scope === 'month') {
      const totGood = stats.studentScores.filter(s => s.monthlyConduct.rank === 'Tốt').length;
      const totFair = stats.studentScores.filter(s => s.monthlyConduct.rank === 'Khá').length;
      const totPass = stats.studentScores.filter(s => s.monthlyConduct.rank === 'Đạt').length;
      const totFail = stats.studentScores.filter(s => s.monthlyConduct.rank === 'Chưa Đạt' || s.monthlyConduct.rank === 'Không Đạt').length;

      topHtml += `
        <div class="space-y-2 pb-1">
          <div class="grid grid-cols-4 gap-1 text-center font-bold text-[10px]">
            <div class="p-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">🥇 Tốt: ${totGood}</div>
            <div class="p-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">🥈 Khá: ${totFair}</div>
            <div class="p-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">🥉 Đạt: ${totPass}</div>
            <div class="p-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">⚠️ Chưa: ${totFail}</div>
          </div>
          <div class="text-[9px] text-slate-400 italic text-center pb-0.5 border-b border-slate-800">
            * Quy chế: ≥300đ Tốt; &lt;300đ hạ bậc Khá; &lt;200đ Đạt; &lt;100đ Không Đạt
          </div>
          <div class="space-y-1 max-h-48 overflow-y-auto pr-1">
      `;

      stats.studentScores.forEach((s, idx) => {
        topHtml += `
          <div class="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px]">
            <div class="flex items-center gap-1.5 truncate">
              <span class="text-[10px] text-slate-400 font-mono">${idx + 1}.</span>
              <span class="font-bold text-white truncate">${s.name} (Tổ ${s.team})</span>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="font-mono font-bold text-amber-300">${s.totalScore}đ</span>
              <span class="font-bold text-[10px] px-1.5 py-0.2 rounded ${s.monthlyConduct.bg} ${s.monthlyConduct.color} border ${s.monthlyConduct.border}">
                ${s.monthlyConduct.badge}
              </span>
            </div>
          </div>
        `;
      });

      topHtml += `</div></div>`;
    } else {
      if (top3.length > 0) {
        top3.forEach((s, idx) => {
          topHtml += `
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-200">${idx + 1}. ${s.name} (Tổ ${s.team})</span>
              <span class="font-extrabold text-amber-300">${s.avgScore}đ</span>
            </div>
          `;
        });
      } else {
        topHtml = `<div class="text-slate-400 text-xs italic">Chưa có học sinh</div>`;
      }
    }
    reportTopContainer.innerHTML = topHtml;
  }

  const noteInput = document.getElementById('teacher-weekly-note');
  const previewNoteEl = document.getElementById('report-preview-teacher-note');
  if (previewNoteEl) {
    if (noteInput && noteInput.value.trim()) {
      previewNoteEl.innerText = `"${noteInput.value.trim()}"`;
    } else {
      previewNoteEl.innerText = `"Khen ngợi tinh thần học tập và nề nếp của tập thể lớp ${appState.classInfo.className}. Chúc các em luôn nỗ lực đạt kết quả cao!"`;
    }
  }
}

// ================= 15. AI GEMINI & NỘI SUY TỔNG KẾT CHI TIẾT SƯ PHẠM =================
async function generateAIReview() {
  const btn = document.getElementById('btn-generate-ai');
  const noteEl = document.getElementById('teacher-weekly-note');
  
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i><span>AI đang tạo, xin đợi...</span>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  if (noteEl) {
    noteEl.value = '⏳ AI đang phân tích dữ liệu thi đua và soạn nhận xét ngắn gọn, vui lòng đợi trong giây lát...';
  }
  showToast('🤖 AI đang phân tích và tạo nhận xét, xin vui lòng đợi...', 'info');

  try {
    const scope = appState.reportScope || 'week';
    const scopeVal = parseInt(document.getElementById('scope-select-val')?.value) || 1;
    const stats = calculateScopeAggregatedStats();
    const curClass = appState.classInfo.className || '10A1';
    const scopeName = scope === 'week' ? `Tuần ${scopeVal}` : (scope === 'month' ? `Tháng ${scopeVal}` : (scope === 'year' ? `Cả Năm Học` : `Học Kỳ ${scopeVal}`));

    const topTeam = stats.teamRanks[0] || { team: 1, avgScore: 100 };
    const topStudents = stats.studentScores.slice(0, 3);
    const starStudentsStr = topStudents.map((s, idx) => `${idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'} ${s.name} (Tổ ${s.team}, ${s.avgScore}đ)`).join(', ');

    // PHÂN TÍCH HỌC SINH VI PHẠM
    const classStudents = getCurrentClassStudents();
    const weeks = getWeeksForCurrentScope();
    const scopeLogs = (appState.logs || []).filter(l => weeks.includes(Number(l.week)) && classStudents.some(cs => cs.id === l.studentId || cs.code === l.studentCode));
    
    const minusLogs = scopeLogs.filter(l => l.type === 'minus');
    
    const studentViolationMap = {};
    minusLogs.forEach(l => {
      const key = l.studentName || 'Học sinh';
      if (!studentViolationMap[key]) {
        studentViolationMap[key] = { totalPts: 0, reasons: [] };
      }
      const pts = Math.abs(parseInt(l.pts) || 0);
      studentViolationMap[key].totalPts += pts;
      if (l.critTitle && !studentViolationMap[key].reasons.includes(l.critTitle)) {
        studentViolationMap[key].reasons.push(l.critTitle);
      }
    });

    const violationList = Object.keys(studentViolationMap).map(name => ({
      name,
      totalPts: studentViolationMap[name].totalPts,
      reasons: studentViolationMap[name].reasons.join(', ')
    }));
    violationList.sort((a, b) => b.totalPts - a.totalPts);

    // Bản nhận xét chuẩn sư phạm ngắn gọn, súc tích
    let conciseReview = `📊 TỔNG KẾT THI ĐUA ${scopeName.toUpperCase()} - LỚP ${curClass.toUpperCase()}\n\n`;
    conciseReview += `🌟 1. Tuyên dương: Biểu dương Tổ ${topTeam.team} dẫn đầu (${topTeam.avgScore}đ)${starStudentsStr ? ` và các em tiêu biểu: ${starStudentsStr}` : ''}.\n\n`;
    if (violationList.length > 0) {
      conciseReview += `⚠️ 2. Nhắc nhở: Lớp có ${stats.totalMinus} lượt trừ điểm. Nhắc nhở các em: ${violationList.slice(0, 3).map(v => `${v.name} (-${v.totalPts}đ do ${v.reasons})`).join('; ')} cần nghiêm túc rút kinh nghiệm, chấn chỉnh nề nếp.\n\n`;
    } else {
      conciseReview += `✨ 2. Nề nếp: Rất tốt, cả lớp duy trì kỷ luật xuất sắc trong ${scopeName}!\n\n`;
    }
    conciseReview += `🎯 3. Phương hướng: Các em tiếp tục đi học đúng giờ, chuẩn bị bài chu đáo. Kính mong Quý Phụ huynh cùng phối hợp đôn đốc!`;

    // Gọi API Gemini nếu có cấu hình
    if (appState.geminiConfig.apiKey && appState.geminiConfig.apiKey.trim().length > 10) {
      try {
        const apiKey = appState.geminiConfig.apiKey.trim();
        let model = appState.geminiConfig.model || 'gemini-1.5-flash';
        const promptText = `Bạn là Giáo Viên Chủ Nhiệm lớp ${curClass}. Hãy viết nhận xét tổng kết ${scopeName} THẬT NGẮN GỌN (khoảng 100-140 chữ), súc tích, bố cục 3 phần:
1. Tuyên dương: Tổ ${topTeam.team} (${topTeam.avgScore}đ), các em: ${starStudentsStr || 'Cả lớp'}
2. Nhắc nhở: ${violationList.length > 0 ? violationList.slice(0, 3).map(v => `${v.name} (-${v.totalPts}đ: ${v.reasons})`).join(', ') : 'Không có vi phạm, nề nếp rất tốt'}
3. Dặn dò tuần tới gửi Phụ huynh và học sinh.
Yêu cầu: Không viết lời chào thừa, không viết chữ ký hay số điện thoại liên hệ.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
        });
        const data = await response.json();
        if (data && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          if (noteEl) noteEl.value = data.candidates[0].content.parts[0].text.trim();
          updateReportCardPreview();
          showToast('🎉 Hoàn thành! AI Gemini đã tạo xong nhận xét ngắn gọn.', 'success');
          return;
        }
      } catch (e) {
        console.log('Gemini API notice:', e);
      }
    }

    // Nếu không dùng API Key hoặc API chậm thì dùng bản súc tích chuẩn
    await new Promise(r => setTimeout(r, 600)); // Hiệu ứng mượt mà
    if (noteEl) noteEl.value = conciseReview;
    updateReportCardPreview();
    showToast('🎉 Hoàn thành! Đã tạo xong nhận xét ngắn gọn và súc tích.', 'success');

  } catch (err) {
    console.error('AI generate error:', err);
    showToast('Lỗi khi tạo nhận xét AI, vui lòng thử lại!', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="bot" class="w-3.5 h-3.5"></i><span>Tạo Nhận Xét AI</span>`;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }
}


// ================= PHÁT LỜI DẶN / NHẬN XÉT CỦA GVCN (AI) VÀO BẢNG TIN THÔNG BÁO CHUNG =================
function publishAiReviewToClassAnnouncements() {
  const noteEl = document.getElementById('teacher-weekly-note');
  const content = (noteEl ? noteEl.value : '').trim();

  if (!content) {
    showToast('Chưa có nội dung nhận xét! Vui lòng bấm "Tạo Nhận Xét AI" hoặc nhập nội dung trước.', 'warning');
    return;
  }

  const scope = appState.reportScope || 'week';
  const scopeVal = parseInt(document.getElementById('scope-select-val')?.value) || 1;
  const curClass = appState.classInfo?.className || '10A1';
  const scopeName = scope === 'week' ? `Tuần ${scopeVal}` : (scope === 'month' ? `Tháng ${scopeVal}` : (scope === 'year' ? `Cả Năm Học` : `Học Kỳ ${scopeVal}`));
  
  const title = `📊 Lời Dặn & Nhận Xét ${scopeName} của GVCN`;
  const annId = 'ann_' + Date.now();

  const newAnn = {
    id: annId,
    className: curClass,
    title: title,
    content: content,
    author: appState.classInfo?.teacherName || `GVCN Lớp ${curClass}`,
    timestamp: Date.now()
  };

  if (!Array.isArray(appState.classAnnouncements)) {
    appState.classAnnouncements = [];
  }
  appState.classAnnouncements.unshift(newAnn);
  saveToLocalStorage();

  // 1. Đẩy lên máy chủ thời gian thực
  postToServer('addAnnouncement', { announcement: newAnn });

  // 2. Lấy danh sách toàn bộ học sinh lớp này để gửi Push
  const classStudents = getCurrentClassStudents();
  let externalIds = [];
  classStudents.forEach(s => {
    if (s.code) {
      externalIds.push(`HS_${s.code.toUpperCase()}`);
      externalIds.push(`PH_${s.code.toUpperCase()}`);
    }
  });

  // 3. Gửi OneSignal Push Notification tới tất cả học sinh & phụ huynh
  if (externalIds.length > 0) {
    showToast(`Đang gửi Push nhận xét tới ${externalIds.length} thiết bị phụ huynh & học sinh...`, 'info');
    sendRealOneSignalPushMultiple(externalIds, `📢 ${title}`, `${content.substring(0, 140)}...`);
  }

  // 4. Phát chuông & render lại danh sách
  playNotificationChime();
  if (typeof renderGvcnAnnouncementsList === 'function') {
    renderGvcnAnnouncementsList();
  }
  showToast('🎉 Đã phát nhận xét vào Thông Báo Chung và gửi tới Phụ huynh & Học sinh thành công!', 'success');
}

function saveGeminiSettings() {
  const key = document.getElementById('setting-gemini-key')?.value.trim() || '';
  appState.geminiConfig = { ...appState.geminiConfig, apiKey: key };
  saveToLocalStorage();
  showToast('Đã lưu cấu hình AI Gemini!', 'success');
}

async function testGeminiConnection() {
  const key = document.getElementById('setting-gemini-key')?.value.trim();
  if (!key) {
    showToast('Vui lòng nhập API Key!', 'warning');
    return;
  }
  showToast('Đang kiểm tra kết nối API Gemini...', 'info');
  try {
    const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
    let success = false;
    let errMessage = '';

    for (const m of models) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: 'Xin chào' }] }] })
        });
        const data = await res.json();
        if (data && data.candidates && data.candidates[0]?.content) {
          success = true;
          appState.geminiConfig.model = m;
          saveToLocalStorage();
          showToast(`🎉 Kết nối Google Gemini (${m}) thành công!`, 'success');
          return;
        } else if (data.error) {
          errMessage = data.error.message || '';
        }
      } catch(e) {}
    }

    if (!success) {
      if (errMessage.includes('API_KEY_INVALID') || errMessage.includes('401') || errMessage.includes('403')) {
        showToast('⚠️ API Key không hợp lệ hoặc bị giới hạn quyền truy cập!', 'warning');
      } else {
        showToast('⚠️ Không thể kết nối với Google Gemini. Vui lòng kiểm tra lại API Key!', 'warning');
      }
    }
  } catch (err) {
    showToast('Lỗi kết nối mạng tới máy chủ Google AI!', 'error');
  }
}

// ================= 16. EXCEL SYSTEM =================


function handleExcelFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rawJson = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      if (!rawJson || rawJson.length === 0) {
        showToast('File Excel không có dữ liệu học sinh!', 'warning');
        return;
      }

      const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');
      const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
      const seenExcelCodes = new Map();

      // QUÉT TOÀN BỘ FILE EXCEL ĐỂ KIỂM TRA MÃ TRƯỜNG & TRÙNG MÃ
      for (let idx = 0; idx < rawJson.length; idx++) {
        const row = rawJson[idx];
        let name = getFlexibleExcelValue(row, ['HoTen', 'Họ và Tên', 'Họ và tên', 'Họ tên', 'Họ Tên', 'Ten', 'Tên', 'FullName', 'Name']);
        if (!name) {
          const vals = Object.values(row).filter(v => v !== undefined && v !== null && String(v).trim() !== '');
          if (vals.length >= 2 && !isNaN(vals[0])) name = String(vals[1]).trim();
          else if (vals.length >= 1 && isNaN(vals[0])) name = String(vals[0]).trim();
        }
        if (!name || typeof name !== 'string' || name.trim().length === 0) continue;

        const customCode = getFlexibleExcelValue(row, ['MaHocSinh', 'Mã Học Sinh', 'Mã HS', 'MaHS', 'Code', 'Mã']);
        if (customCode) {
          const rawCode = String(customCode).trim().toUpperCase().replace(/\s+/g, '');
          if (rawCode) {
            // Kiểm tra 1: Sai mã trường
            if (!rawCode.startsWith(sCode)) {
              const err = `🚨 LỖI IMPORT EXCEL (SAI MÃ TRƯỜNG):\n\n• Dòng ${idx + 2}: Em "${name}"\n• Mã Học Sinh trong file: [${rawCode}]\n• Mã trường của bạn là: [${sCode}] (KHÔNG KHỚP!)\n\n👉 Ví dụ học sinh lớp ${curClass}, STT 08 thì Mã HS phải là: ${sCode}${curClass}08.`;
              showToast(`Lỗi Import: Em "${name}" có mã [${rawCode}] sai mã trường [${sCode}]!`, 'error');
              alert(err);
              return;
            }

            // Kiểm tra 2: Trùng mã ngay trong file Excel
            if (seenExcelCodes.has(rawCode)) {
              const prevName = seenExcelCodes.get(rawCode);
              const err = `🚨 LỖI IMPORT EXCEL (TRÙNG MÃ TRONG FILE):\n\n• Mã học sinh [${rawCode}] bị trùng lặp giữa:\n  1. Em "${prevName}"\n  2. Em "${name}" (Dòng ${idx + 2})\n\n👉 Mỗi học sinh bắt buộc phải có một Mã duy nhất! Vui lòng chỉnh sửa lại file Excel.`;
              showToast(`Lỗi Import: Mã [${rawCode}] bị trùng trong file Excel!`, 'error');
              alert(err);
              return;
            }
            seenExcelCodes.set(rawCode, name);

            // Kiểm tra 3: Trùng mã với học sinh khác đã có sẵn
            const existingInDb = (appState.students || []).find(s => String(s.code || '').trim().toUpperCase() === rawCode);
            if (existingInDb && existingInDb.name.toLowerCase() !== name.toLowerCase()) {
              const err = `🚨 LỖI IMPORT EXCEL (TRÙNG MÃ ĐÃ CÓ TRÊN HỆ THỐNG):\n\n• Dòng ${idx + 2} em "${name}" có Mã [${rawCode}] đã được cấp cho em "${existingInDb.name}" trên hệ thống.\n\n👉 Vui lòng đổi mã học sinh khác để không bị trùng!`;
              showToast(`Lỗi Import: Mã [${rawCode}] đã có trên hệ thống!`, 'error');
              alert(err);
              return;
            }
          }
        }
      }



      const parsedStudents = [];

      rawJson.forEach((row, idx) => {
        // Tìm tên học sinh bằng hàm linh hoạt
        let name = getFlexibleExcelValue(row, ['HoTen', 'Họ và Tên', 'Họ và tên', 'Họ tên', 'Họ Tên', 'Ten', 'Tên', 'FullName', 'Name']);
        if (!name) {
          // Fallback: Lấy cột thứ 2 nếu cột 1 là STT
          const vals = Object.values(row).filter(v => v !== undefined && v !== null && String(v).trim() !== '');
          if (vals.length >= 2 && !isNaN(vals[0])) name = String(vals[1]).trim();
          else if (vals.length >= 1 && isNaN(vals[0])) name = String(vals[0]).trim();
        }

        if (!name || typeof name !== 'string' || name.trim().length === 0) return;

        // Tìm Tổ (hỗ trợ đầy đủ từ Tổ 1 đến Tổ 12 theo đúng file Excel)
        const teamRaw = getFlexibleExcelValue(row, ['To', 'Tổ', 'Team', 'Nhom', 'Nhóm']);
        let teamVal = parseInt(teamRaw);
        const configuredTeams = parseInt(appState.classInfo?.totalTeams) || 4;
        if (isNaN(teamVal) || teamVal < 1) {
          teamVal = (idx % configuredTeams) + 1;
        }

        // Tìm Chức vụ
        const roleStr = getFlexibleExcelValue(row, ['ChucVu', 'Chức Vụ', 'Chức vụ', 'Role', 'ViTri']).toLowerCase();
        let role = 'member';
        if (roleStr.includes('monitor') || roleStr.includes('lớp trưởng') || roleStr.includes('lop truong')) role = 'monitor';
        else if (roleStr.includes('vice_monitor') || roleStr.includes('lớp phó') || roleStr.includes('lop pho')) role = 'vice_monitor';
        else if (roleStr.includes('leader') || (roleStr.includes('trưởng') && roleStr.includes('tổ')) || (roleStr.includes('truong') && roleStr.includes('to'))) role = 'leader';
        else if (roleStr.includes('sub_leader') || (roleStr.includes('phó') && roleStr.includes('tổ')) || (roleStr.includes('pho') && roleStr.includes('to'))) role = 'sub_leader';

        // Tìm Mật khẩu
        const sPass = getFlexibleExcelValue(row, ['MatKhauHS', 'Mật Khẩu HS', 'Mật khẩu HS', 'MatKhau', 'Mật Khẩu', 'PassHS', 'Password']) || '123456';
        const pPass = getFlexibleExcelValue(row, ['MatKhauPH', 'Mật Khẩu PH', 'Mật khẩu PH', 'PassPH']) || '123456';

        parsedStudents.push({
          id: 'hs_' + Date.now() + '_' + idx,
          name: name.trim(),
          team: teamVal,
          role: role,
          code: (getFlexibleExcelValue(row, ['MaHocSinh', 'Mã Học Sinh', 'Mã HS', 'MaHS', 'Code', 'Mã']) ? String(getFlexibleExcelValue(row, ['MaHocSinh', 'Mã Học Sinh', 'Mã HS', 'MaHS', 'Code', 'Mã'])).trim().toUpperCase().replace(/\s+/g, '') : generateUnifiedStudentCode(idx + 1, sCode, curClass)),
          studentPassword: sPass,
          parentPassword: pPass
        });
      });

      if (parsedStudents.length === 0) {
        showToast('Không nhận diện được học sinh nào trong file! Vui lòng kiểm tra lại cột HoTen.', 'warning');
        return;
      }

      // Tự động mở rộng tổng số tổ của lớp nếu file Excel có Tổ 5, Tổ 6, Tổ 7...
      const maxTeamInFile = parsedStudents.reduce((max, s) => Math.max(max, parseInt(s.team) || 1), 1);
      const curTotalTeams = parseInt(appState.classInfo?.totalTeams) || 4;
      if (maxTeamInFile > curTotalTeams) {
        appState.classInfo.totalTeams = maxTeamInFile;
        const totalTeamsEl = document.getElementById('setting-total-teams');
        if (totalTeamsEl) totalTeamsEl.value = String(maxTeamInFile);
        postToServer('saveClassInfo', { classInfo: appState.classInfo });
        renderTeamTabsBar();
      }

      appState.uploadedStudentsPreview = parsedStudents;
      const fileNameEl = document.getElementById('preview-file-name');
      const studCountEl = document.getElementById('preview-student-count');
      const previewBox = document.getElementById('excel-upload-preview');

      if (fileNameEl) fileNameEl.innerText = file.name;
      if (studCountEl) studCountEl.innerText = `${parsedStudents.length} học sinh Lớp ${curClass}`;
      if (previewBox) previewBox.classList.remove('hidden');
      showToast(`🎉 Nhận diện thành công ${parsedStudents.length} học sinh Lớp ${curClass}!`, 'success');
    } catch (err) {
      console.error('Excel upload error:', err);
      showToast('Lỗi khi đọc file Excel! ' + (err.message || ''), 'warning');
    }
  };
  reader.readAsArrayBuffer(file);
  event.target.value = '';
}

function confirmApplyUploadedExcel() {
  if (!appState.uploadedStudentsPreview || appState.uploadedStudentsPreview.length === 0) return;
  const count = appState.uploadedStudentsPreview.length;
  const curClass = getCleanClassCode(appState.classInfo.className || '10A1');
  const sCode = String(appState.classInfo.schoolCode || '90').trim().toUpperCase();

  const isAppendMode = document.getElementById('import-mode-append')?.checked ?? true;
  const existingClassStudents = (appState.students || []).filter(s => isStudentInCurrentClass(s, curClass));
  const otherClassesStudents = (appState.students || []).filter(s => !isStudentInCurrentClass(s, curClass));

  if (isAppendMode) {
    // CHẾ ĐỘ THÊM BỔ SUNG: NỐI TIẾP VÀO SAU DANH SÁCH HIỆN CÓ
    const startStt = existingClassStudents.length;
    const seenCodes = new Set(existingClassStudents.map(s => (s.code ? String(s.code).trim().toUpperCase() : '') || String(s.name).trim().toLowerCase()));

    const newAppendedStudents = [];
    appState.uploadedStudentsPreview.forEach((s) => {
      const codeKey = (s.code ? String(s.code).trim().toUpperCase() : '') || String(s.name).trim().toLowerCase();
      // Chống trùng lặp với học sinh đã có sẵn trong lớp
      if (seenCodes.has(codeKey)) return;
      seenCodes.add(codeKey);

      const sttNum = startStt + newAppendedStudents.length + 1;
      newAppendedStudents.push({
        id: s.id || `hs_${Date.now()}_${sttNum}`,
        name: s.name,
        team: parseInt(s.team) || 1,
        role: normalizeRole(s.role),
        className: curClass,
        classCode: `${sCode}${curClass}`,
        code: validateAndFormatStudentCode(s.code, sttNum, curClass, sCode),
        studentPassword: s.studentPassword || '123456',
        parentPassword: s.parentPassword || '123456'
      });
    });

    if (newAppendedStudents.length === 0) {
      showToast(`⚠️ Tất cả học sinh trong file Excel đã tồn tại trong Lớp ${curClass}!`, 'warning');
      closeImportModal();
      return;
    }

    const mergedClassStudents = [...existingClassStudents, ...newAppendedStudents];
    appState.students = [...otherClassesStudents, ...mergedClassStudents];
    appState.uploadedStudentsPreview = null;
    saveToLocalStorage();
    postToServer('syncFullState', { students: appState.students });
    closeImportModal();
    renderTeamTabsBar();
    renderStudentList();
    renderLeaderboard();
    renderGvcnStudentPasswordTable();
    showToast(`🎉 Đã thêm bổ sung thành công ${newAppendedStudents.length} học sinh vào Lớp ${curClass} (Tổng sĩ số: ${mergedClassStudents.length})!`, 'success');
  } else {
    // CHẾ ĐỘ THAY THẾ TOÀN BỘ DANH SÁCH LỚP
    if (confirm(`Bạn có chắc chắn muốn THAY THẾ TOÀN BỘ danh sách Lớp ${curClass} bằng ${count} học sinh mới này không?`)) {
      const taggedStudents = appState.uploadedStudentsPreview.map((s, idx) => ({
        id: s.id || `hs_${Date.now()}_${idx + 1}`,
        name: s.name,
        team: parseInt(s.team) || 1,
        role: normalizeRole(s.role),
        className: curClass,
        classCode: `${sCode}${curClass}`,
        code: validateAndFormatStudentCode(s.code, idx + 1, curClass, sCode),
        studentPassword: s.studentPassword || '123456',
        parentPassword: s.parentPassword || '123456'
      }));

      appState.students = [...otherClassesStudents, ...taggedStudents];
      appState.uploadedStudentsPreview = null;
      saveToLocalStorage();
      postToServer('syncFullState', { students: appState.students });
      closeImportModal();
      renderTeamTabsBar();
      renderStudentList();
      renderLeaderboard();
      renderGvcnStudentPasswordTable();
      showToast(`🎉 Đã thay thế thành công ${count} học sinh vào Lớp ${curClass}!`, 'success');
    }
  }
}

function downloadZaloImage() {
  const cardElement = document.getElementById('zalo-report-card');
  html2canvas(cardElement, { scale: 2, useCORS: true, backgroundColor: '#090d16' }).then(canvas => {
    const link = document.createElement('a');
    link.download = `Bao_Cao_${appState.reportScope}_${appState.classInfo.className}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Đã tải ảnh báo cáo!', 'success');
  });
}

function exportFullExcel() {
  const scope = appState.reportScope || 'week';
  const stats = calculateScopeAggregatedStats();
  const scopeVal = parseInt(document.getElementById('scope-select-val')?.value) || 1;
  const curClass = appState.classInfo?.className || '10A1';
  const weeks = stats.weeks || [1];
  const maxScore = weeks.length * 100;

  let scopeName = `Tuần ${scopeVal}`;
  if (scope === 'month') scopeName = `Tháng ${scopeVal}`;
  else if (scope === 'semester') scopeName = `Học Kỳ ${scopeVal}`;
  else if (scope === 'year') scopeName = `Cả Năm Học`;

  const header = [
    [`BẢNG TỔNG KẾT THI ĐUA & XẾP LOẠI HẠNH KIỂM ${scopeName.toUpperCase()} - LỚP ${curClass.toUpperCase()}`],
    [`Năm học: 2026 - 2027 | Trường THPT Vọng Thê | Gồm các tuần: Tuần ${weeks.join(', ')}`],
    []
  ];

  const columns = ["STT", "Mã Học Sinh", "Họ Và Tên", "Tổ"];
  if (weeks.length > 1) {
    weeks.forEach(w => columns.push(`Điểm Tuần ${w}`));
    columns.push(`Tổng Điểm ${scopeName} (Thang ${maxScore}đ)`);
    columns.push("Điểm TB/Tuần");
  } else {
    columns.push(`Điểm Tuần ${weeks[0]} (Thang 100đ)`);
  }
  columns.push("Khen Thưởng (+)");
  columns.push("Vi Phạm (-)");
  columns.push("Xếp Loại Hạnh Kiểm");
  columns.push("Ghi Chú Đánh Giá");

  header.push(columns);

  stats.studentScores.forEach((s, idx) => {
    const row = [
      idx + 1,
      s.code,
      s.name,
      `Tổ ${s.team}`
    ];

    if (weeks.length > 1) {
      weeks.forEach(w => {
        const st = calculateStudentScore(s.id, w);
        row.push(st.score);
      });
      row.push(s.totalScore);
      row.push(s.avgScore);
    } else {
      row.push(s.totalScore);
    }

    row.push(s.totalPlusPts);
    row.push(s.totalMinusPts);
    row.push(s.monthlyConduct ? s.monthlyConduct.rank : (s.avgScore >= 90 ? 'Tốt' : (s.avgScore >= 75 ? 'Khá' : 'Đạt')));
    row.push(s.monthlyConduct ? s.monthlyConduct.desc : 'Đạt chuẩn thi đua');

    header.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(header);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Tong_Hop_${scope}`);
  XLSX.writeFile(wb, `So_Thi_Dua_${curClass}_${scopeName.replace(/\s+/g, '_')}.xlsx`);
  showToast(`Đã xuất file Excel Báo Cáo ${scopeName} thành công!`, 'success');
}

// ================= 17. GVCN SETTINGS & MODALS =================
function saveClassInfoSettings() {
  const prevSchool = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const prevClass = getCleanClassCode(appState.classInfo?.className || '10A1');

  const newSchool = document.getElementById('setting-school-code')?.value.trim().toUpperCase() || prevSchool;
  const newClass = getCleanClassCode(document.getElementById('setting-class-name')?.value.trim() || '10A1');
  const newSchoolName = document.getElementById('setting-school-name')?.value.trim() || appState.classInfo.schoolName;
  const newTeacher = document.getElementById('setting-teacher-name')?.value.trim() || 'GVCN';
  const newPin = document.getElementById('setting-pin')?.value.trim() || '1234';
  const newBaseScore = parseInt(document.getElementById('setting-base-score')?.value) || 100;
  const newTotalWeeks = parseInt(document.getElementById('setting-total-weeks')?.value) || 18;

  appState.classInfo.schoolCode = newSchool;
  appState.classInfo.className = newClass;
  appState.classInfo.schoolName = newSchoolName;
  appState.classInfo.teacherName = newTeacher;
  appState.classInfo.pin = newPin;
  appState.classInfo.baseScore = newBaseScore;
  appState.classInfo.totalWeeks = newTotalWeeks;

  // Cập nhật tên lớp trong schoolClasses
  if (Array.isArray(appState.schoolClasses)) {
    const matchedCls = appState.schoolClasses.find(c => getCleanClassCode(c.className) === prevClass);
    if (matchedCls) {
      matchedCls.className = newClass;
      matchedCls.classCode = `${newSchool}${newClass}`;
      matchedCls.teacherName = newTeacher;
      matchedCls.pin = newPin;
    } else {
      appState.schoolClasses.push({
        className: newClass,
        classCode: `${newSchool}${newClass}`,
        teacherName: newTeacher,
        pin: newPin,
        studentCount: (appState.students || []).length || 40
      });
    }
  }

  // Cập nhật lớp cho tất cả học sinh hiện tại
  (appState.students || []).forEach(s => {
    s.className = newClass;
    s.classCode = `${newSchool}${newClass}`;
  });

  // Cập nhật lớp cho nhật ký
  (appState.logs || []).forEach(l => {
    l.className = newClass;
  });

  ensureStudentCodes(true);
  saveToLocalStorage();

  postToServer('renameOrSaveClass', {
    prevClass: prevClass,
    newClass: newClass,
    schoolCode: newSchool,
    classInfo: appState.classInfo,
    students: appState.students,
    classes: appState.schoolClasses
  });

  postToServer('syncFullState', { students: appState.students });

  syncHeaderUI();
  updateReportCardPreview();
  renderStudentList();
  renderLeaderboard();
  renderLogs();
  showToast(`🎉 Đã lưu thành công Lớp ${appState.classInfo.className} (Trường ${appState.classInfo.schoolName})!`, 'success');
}

function postClassAnnouncement() {
  const title = document.getElementById('new-announcement-title')?.value.trim();
  const content = document.getElementById('new-announcement-content')?.value.trim();

  if (!title || !content) {
    showToast('Vui lòng nhập đầy đủ tiêu đề và nội dung!', 'warning');
    return;
  }

  const curClass = appState.classInfo.className || '10A1';
  const newAnn = {
    id: 'ann_' + Date.now(),
    title: title,
    content: content,
    className: curClass,
    author: `GVCN Lớp ${curClass}`,
    timestamp: Date.now()
  };

  if (!appState.classAnnouncements) appState.classAnnouncements = [];
  appState.classAnnouncements.unshift(newAnn);
  saveToLocalStorage();
  postToServer('addAnnouncement', { announcement: newAnn });

  document.getElementById('new-announcement-title').value = '';
  document.getElementById('new-announcement-content').value = '';
  playNotificationChime();
  showToast('Đã phát thông báo chung tới phụ huynh & học sinh!', 'success');
}

function openAddStudentModal() {
  const sCode = String(appState.classInfo.schoolCode || '90').trim().toUpperCase();
  const curClass = appState.classInfo.className || '10A1';
  const curClassClean = getCleanClassCode(curClass);
  const classStudents = getCurrentClassStudents();
  const nextCode = generateUnifiedStudentCode(classStudents.length + 1, sCode, curClassClean);

  document.getElementById('student-edit-id').value = '';
  document.getElementById('student-modal-title').innerText = `Thêm Học Sinh Mới - Lớp ${curClass}`;
  document.getElementById('new-student-name').value = '';
  document.getElementById('new-student-team').value = appState.activeTeamTab;
  document.getElementById('new-student-role').value = 'member';
  const codeEl = document.getElementById('new-student-code');
  if (codeEl) {
    codeEl.value = '';
    codeEl.placeholder = `Tự tạo: ${nextCode}`;
  }
  const hintEl = document.getElementById('modal-student-school-code-hint');
  if (hintEl) hintEl.innerText = `Mã Trường ${sCode}`;
  document.getElementById('student-modal').classList.remove('hidden');
}

function openEditStudentModal(studentId) {
  const s = appState.students.find(x => x.id === studentId);
  if (!s) return;
  syncTeamSelectOptions();
  document.getElementById('student-edit-id').value = s.id;
  document.getElementById('student-modal-title').innerText = 'Sửa Thông Tin Học Sinh';
  document.getElementById('new-student-name').value = s.name;
  document.getElementById('new-student-team').value = String(s.team || 1);
  document.getElementById('new-student-role').value = s.role || 'member';
  document.getElementById('new-student-code').value = s.code || '';
  document.getElementById('student-modal').classList.remove('hidden');
}

function closeStudentModal() {
  document.getElementById('student-modal').classList.add('hidden');
}

function saveStudent() {
  const editId = document.getElementById('student-edit-id')?.value;
  const name = String(document.getElementById('new-student-name')?.value || document.getElementById('student-modal-name')?.value || '').trim();
  const team = parseInt(document.getElementById('new-student-team')?.value || document.getElementById('student-modal-team')?.value) || 1;
  const role = document.getElementById('new-student-role')?.value || document.getElementById('student-modal-role')?.value || 'member';
  const customCodeInput = String(document.getElementById('new-student-code')?.value || document.getElementById('student-modal-code')?.value || '').trim();

  if (!name) {
    showToast('Vui lòng nhập họ và tên học sinh!', 'warning');
    return;
  }

  const sCode = String(appState.classInfo.schoolCode || '90').trim().toUpperCase();
  const curClass = appState.classInfo.className || '10A1';
  const curClassClean = getCleanClassCode(curClass);
  const classStudents = getCurrentClassStudents();

  let code = '';

  if (customCodeInput) {
    const raw = customCodeInput.toUpperCase().replace(/\s+/g, '');

    // 1. KIỂM TRA MÃ TRƯỜNG: BẮT BUỘC BẮT ĐẦU BẰNG MÃ TRƯỜNG HIỆN TẠI
    if (!raw.startsWith(sCode)) {
      const errMsg = `🚨 LỖI NHẬP SAI MÃ TRƯỜNG:\n\n• Mã trường của bạn là: [${sCode}]\n• Bạn đang nhập mã: [${raw}] (SAI MÃ TRƯỜNG!)\n\n👉 Quy ước chuẩn: [Mã Trường: ${sCode}] + [Lớp: ${curClassClean}] + [STT]\nVí dụ học sinh lớp ${curClassClean}, STT 08 thì Mã Học Sinh phải là: ${sCode}${curClassClean}08.`;
      showToast(`🚨 Lỗi: Mã [${raw}] không khớp với Mã Trường [${sCode}]!`, 'error');
      alert(errMsg);
      return;
    }

    // 2. KIỂM TRA TRÙNG MÃ HỌC SINH ĐÃ CÓ TRONG HỆ THỐNG
    const duplicateStudent = (appState.students || []).find(s => s.id !== editId && String(s.code || '').trim().toUpperCase() === raw);
    if (duplicateStudent) {
      const errMsg = `🚨 LỖI TRÙNG MÃ HỌC SINH:\n\nMã học sinh [${raw}] đã được cấp cho em "${duplicateStudent.name}" (Tổ ${duplicateStudent.team || 1} - Lớp ${duplicateStudent.className || curClassClean}).\n\n👉 Mỗi học sinh bắt buộc phải có một Mã duy nhất! Vui lòng chọn số thứ tự khác.`;
      showToast(`🚨 Lỗi: Mã [${raw}] đã trùng với học sinh "${duplicateStudent.name}"!`, 'error');
      alert(errMsg);
      return;
    }

    code = raw;
  } else {
    // Tự động tạo mã duy nhất không trùng lặp
    let nextNum = classStudents.length + 1;
    code = generateUnifiedStudentCode(nextNum, sCode, curClassClean);
    while ((appState.students || []).some(s => s.id !== editId && String(s.code || '').trim().toUpperCase() === code)) {
      nextNum++;
      code = generateUnifiedStudentCode(nextNum, sCode, curClassClean);
    }
  }

  if (editId) {
    const s = appState.students.find(x => x.id === editId);
    if (s) {
      s.name = name;
      s.team = team;
      s.role = role;
      s.code = code;
      s.className = curClass;
      s.classCode = `${sCode}${curClassClean}`;
      showToast(`Đã cập nhật học sinh ${name} (Mã: ${code})!`, 'success');
    }
  } else {
    appState.students.push({
      id: 'hs_' + Date.now(),
      code: code,
      name: name,
      team: team,
      role: role,
      className: curClass,
      classCode: `${sCode}${curClassClean}`,
      studentPassword: '123456',
      parentPassword: '123456'
    });
    showToast(`Đã thêm em ${name} (Mã: ${code}) vào Lớp ${curClass}!`, 'success');
  }

  saveToLocalStorage();
  postToServer('syncFullState', { students: appState.students });
  closeStudentModal();
  renderStudentList();
  renderLeaderboard();
  renderGvcnStudentPasswordTable();
}

async function confirmDeleteStudent(studentId) {
  const s = appState.students.find(x => x.id === studentId);
  if (!s) return;
  if (confirm(`Thầy/Cô có chắc chắn muốn xóa học sinh "${s.name}" (Mã: ${s.code || ''}) khỏi lớp?`)) {
    const sId = String(s.id || '').trim();
    const sCode = String(s.code || '').trim().toUpperCase();

    // 1. Ghi nhận vào danh sách đã xóa vĩnh viễn
    appState.deletedStudentIds = appState.deletedStudentIds || [];
    if (sId && !appState.deletedStudentIds.includes(sId)) appState.deletedStudentIds.push(sId);
    if (sCode && !appState.deletedStudentIds.includes(sCode)) appState.deletedStudentIds.push(sCode);

    // 2. Lọc bỏ khỏi appState
    appState.students = appState.students.filter(x => x.id !== studentId && String(x.code || '').trim().toUpperCase() !== sCode);
    appState.logs = appState.logs.filter(x => x.studentId !== studentId && String(x.studentCode || '').trim().toUpperCase() !== sCode);
    appState.lastDataHash = '';

    saveToLocalStorage();

    // 3. Xóa đúng bản ghi trên máy chủ. Không dùng syncFullState vì upsert
    // chỉ thêm/cập nhật và không thể xóa dòng đã không còn trong app.
    const saved = await postToServer('deleteStudent', { studentId: sId, studentCode: sCode });
    if (!saved) {
      showToast('Lưu thất bại. Học sinh chưa được xóa trên máy chủ.', 'error');
      await syncFromSupabase();
      return;
    }

    renderStudentList();
    renderLeaderboard();
    renderGvcnStudentPasswordTable();
    showToast(`Đã lưu việc xóa học sinh ${s.name}.`, 'success');
  }
}

function openStudentCodesModal() {
  renderStudentCodesTable();
  document.getElementById('student-codes-modal').classList.remove('hidden');
}

function closeStudentCodesModal() {
  document.getElementById('student-codes-modal').classList.add('hidden');
}


function renderGvcnStudentPasswordTable() {
  if (typeof renderStudentCodesTable === 'function') {
    renderStudentCodesTable();
  }
}

function renderStudentCodesTable() {
  const container = document.getElementById('student-codes-list-container');
  const search = (document.getElementById('search-student-code-input')?.value || '').toLowerCase().trim();
  let list = getCurrentClassStudents();
  if (search) list = list.filter(s => s.name.toLowerCase().includes(search) || (s.code && s.code.toLowerCase().includes(search)));

  let html = '';
  list.forEach((s, idx) => {
    html += `
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
        <div>
          <p class="font-bold text-white">${s.name}</p>
          <p class="text-[10px] text-slate-400">Tổ ${s.team}</p>
        </div>
        <span class="font-mono font-black text-sm px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 border border-amber-500/40">${s.code || 'A101'}</span>
      </div>
    `;
  });
  container.innerHTML = html;
}

function exportStudentCodesText() {
  let text = `📋 DANH SÁCH MÃ 4 KÝ TỰ SỔ LIÊN LẠC (${appState.classInfo.className.toUpperCase()}):\n\n`;
  appState.students.forEach((s, idx) => {
    text += `${idx + 1}. ${s.name} (Tổ ${s.team}) ➜ MÃ: ${s.code || 'A101'}\n`;
  });
  text += `\n👉 Quý Phụ huynh và các em học sinh mở ứng dụng và nhập Mã 4 ký tự để theo dõi nề nếp thi đua!`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('Đã sao chép danh sách mã học sinh!', 'success');
  });
}

function openImportModal() {
  document.getElementById('import-modal').classList.remove('hidden');
}

function closeImportModal() {
  document.getElementById('import-modal').classList.add('hidden');
}

function openWeekSelectorModal() {
  const container = document.getElementById('weeks-grid-container');
  const realWeek = getRealTimeCurrentWeek();
  let html = '';

  html += `
    <div class="col-span-3 pb-2 mb-1 border-b border-slate-700/80 flex items-center justify-between">
      <span class="text-[11px] text-slate-300 font-medium">Lịch thực tế hôm nay: <b class="text-amber-300">Tuần ${realWeek}</b></span>
      <button onclick="selectWeek(${realWeek})" class="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-white text-[10px] font-bold rounded-xl border border-amber-500/40 transition-all flex items-center gap-1">
        ⚡ Chọn Tuần Thực Tế (${realWeek})
      </button>
    </div>
  `;

  for (let w = 1; w <= appState.classInfo.totalWeeks; w++) {
    const isCur = w === appState.classInfo.currentWeek;
    const isReal = w === realWeek;
    const sched = OFFICIAL_WEEK_SCHEDULE.find(s => s.week === w);
    const dateRangeStr = sched ? sched.range.split('-')[0].trim() : '';

    html += `
      <button onclick="selectWeek(${w})" class="py-2.5 px-2 rounded-2xl text-xs font-bold border transition-all relative flex flex-col items-center justify-center gap-0.5 ${isCur ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg scale-[1.02]' : (isReal ? 'bg-amber-500/15 border-amber-500/50 text-amber-300' : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:bg-slate-700')}">
        <span>Tuần ${w}</span>
        ${dateRangeStr ? `<span class="text-[9px] font-mono opacity-80">${dateRangeStr}</span>` : ''}
        ${isReal ? '<span class="text-[8px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full font-black mt-0.5">Thực Tế</span>' : ''}
      </button>
    `;
  }
  container.innerHTML = html;
  document.getElementById('week-modal').classList.remove('hidden');
}

function closeWeekModal() {
  document.getElementById('week-modal').classList.add('hidden');
}

function selectWeek(w) {
  const weekNum = Number(w);
  if (!Number.isInteger(weekNum) || weekNum < 1 || weekNum > 35) return;
  appState.classInfo.currentWeek = weekNum;
  leaderboardScope = 'week';
  leaderboardScopeValue = weekNum;
  studentViewScope = 'week';
  studentViewScopeValue = weekNum;
  parentViewScope = 'week';
  parentViewScopeValue = weekNum;
  studentSelectedWeekFilter = 'current';
  parentSelectedWeekFilter = 'current';
  appState.reportScope = 'week';
  appState.reportScopeValue = weekNum;
  if (typeof currentAttendanceScope !== 'undefined') {
    currentAttendanceScope = 'week';
    currentAttendanceScopeValue = weekNum;
  }
  saveToLocalStorage();
  if (appState.currentRole === 'gvcn' || appState.currentRole === 'school_admin') {
    postToServer('saveClassInfo', { classInfo: appState.classInfo });
  }
  syncHeaderUI();
  closeWeekModal();
  renderStudentList();
  renderLeaderboard();
  renderLogs();
  updateReportCardPreview();
  renderLeaderboardScopeSelector();
  renderScopeDetailSelector();
  const logWeekSelect = document.getElementById('log-filter-week');
  if (logWeekSelect) logWeekSelect.value = 'current';
  const reportWeekSelect = document.getElementById('scope-select-val');
  if (reportWeekSelect) reportWeekSelect.value = String(weekNum);
  renderScoringWeekBar();
  showToast(`📅 Tất cả các tab đã chuyển sang Tuần ${weekNum}!`, 'info');
}

function addNewWeek() {
  appState.classInfo.totalWeeks += 1;
  selectWeek(appState.classInfo.totalWeeks);
}

// ================= HỘP THƯ PHỤ HUYNH 2 CHIỀU DÀNH CHO GVCN =================
let activeFeedbackFilter = 'all';

function setFeedbackFilter(filter) {
  activeFeedbackFilter = filter;
  ['all', 'pending', 'replied'].forEach(f => {
    const btn = document.getElementById(`fb-filter-${f}`);
    if (btn) {
      if (f === filter) {
        btn.className = 'flex-1 py-1.5 text-xs font-bold rounded-lg text-white bg-indigo-600 shadow transition-all';
      } else {
        btn.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition-all';
      }
    }
  });
  renderGvcnFeedbackInbox();
}

function renderGvcnFeedbackInbox(force = false) {
  const container = document.getElementById('gvcn-feedbacks-container');
  if (!container) return;

  // LƯU LẠI TRẠNG THÁI CÁC FORM ĐANG MỞ & NỘI DUNG ĐANG GÕ ĐỂ KHÔNG BỊ VĂNG
  const openFormIds = [];
  const draftTexts = {};
  container.querySelectorAll('[id^="reply-form-"]').forEach(form => {
    if (!form.classList.contains('hidden')) {
      openFormIds.push(form.id);
      const fbId = form.id.replace('reply-form-', '');
      const textarea = document.getElementById(`reply-input-${fbId}`);
      if (textarea && textarea.value) {
        draftTexts[fbId] = textarea.value;
      }
    }
  });

  const activeElId = document.activeElement ? document.activeElement.id : null;
  const isTypingInside = activeElId && activeElId.startsWith('reply-input-');

  // Nếu không phải ép buộc và đang có người gõ phím bên trong inbox, hoãn render để chống giật/văng
  if (!force && isTypingInside) {
    return;
  }

  const curClass = getCleanClassCode(appState.classInfo.className || '10A1');
  const storedFb = JSON.parse(localStorage.getItem('thi_dua_parent_feedbacks') || '[]');
  const cloudFb = appState.parentFeedbacks || [];
  
  // Hợp nhất dữ liệu phản hồi (ưu tiên dữ liệu mới nhất từ cloud)
  const feedbackMap = {};
  [...storedFb, ...cloudFb].forEach(fb => {
    if (fb && fb.id) {
      if (!feedbackMap[fb.id] || (fb.reply && fb.reply.trim()) || (fb.timestamp > (feedbackMap[fb.id].timestamp || 0))) {
        feedbackMap[fb.id] = fb;
      }
    }
  });
  const allFeedbacks = Object.values(feedbackMap);
  allFeedbacks.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  // Hiển thị TẤT CẢ phản hồi
  let classFeedbacks = allFeedbacks;

  const pendingCount = classFeedbacks.filter(fb => !fb.reply || fb.reply.trim().length === 0).length;
  
  // Cập nhật Badge chưa đọc trên Bottom Nav
  const badgeEl = document.getElementById('unread-feedback-badge');
  if (badgeEl) {
    if (pendingCount > 0) {
      badgeEl.innerText = pendingCount;
      badgeEl.classList.remove('hidden');
    } else {
      badgeEl.classList.add('hidden');
    }
  }

  const summaryEl = document.getElementById('gvcn-feedback-summary');
  if (summaryEl) summaryEl.innerText = `${classFeedbacks.length} Ý kiến (${pendingCount} chưa trả lời)`;

  if (activeFeedbackFilter === 'pending') {
    classFeedbacks = classFeedbacks.filter(fb => !fb.reply || fb.reply.trim().length === 0);
  } else if (activeFeedbackFilter === 'replied') {
    classFeedbacks = classFeedbacks.filter(fb => fb.reply && fb.reply.trim().length > 0);
  }

  if (classFeedbacks.length === 0) {
    container.innerHTML = `<div class="p-8 rounded-3xl bg-slate-800/60 border border-slate-700 text-center text-xs text-slate-400">Không có ý kiến nào trong mục này</div>`;
    return;
  }

  let html = '';
  classFeedbacks.forEach(fb => {
    const timeStr = formatVietnameseDate(fb.timestamp);
    const hasReply = fb.reply && fb.reply.trim().length > 0;
    const replyTimeStr = fb.replyTime ? formatVietnameseDate(fb.replyTime) : '';

    html += `
      <div class="p-4 rounded-2xl bg-slate-800/90 border-2 ${hasReply ? 'border-indigo-500/40' : 'border-amber-500/50 bg-amber-950/20'} space-y-2.5 shadow-md">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 min-w-0">
            <span class="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">${fb.studentCode || 'HS'}</span>
            <div class="min-w-0">
              <span class="font-bold text-white text-xs block truncate">${fb.author || 'Phụ huynh em ' + fb.studentName}</span>
              <span class="text-[10px] text-slate-400">Học sinh: <b class="text-slate-200">${fb.studentName}</b> • Tổ ${fb.team || 1}</span>
            </div>
          </div>
          <span class="text-[10px] text-slate-400 font-mono flex-shrink-0">${timeStr}</span>
        </div>

        <!-- Nội dung câu hỏi của Phụ huynh -->
        <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-700/80 text-xs text-slate-200 leading-relaxed">
          <p>${fb.content}</p>
        </div>

        <!-- Phần trả lời của GVCN -->
        ${hasReply ? `
          <div class="space-y-1 pl-3 border-l-2 border-emerald-500 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-500/30">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-[11px] flex items-center gap-1">
                <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i>
                <span>Phản hồi của Thầy/Cô:</span>
              </span>
              <span class="text-[10px] text-slate-400 font-mono">${replyTimeStr}</span>
            </div>
            <p class="text-white text-xs font-medium">${fb.reply}</p>
            <button onclick="toggleReplyInput('${fb.id}')" class="text-[10px] font-bold text-indigo-300 hover:underline pt-1 block">
              ✏️ Chỉnh sửa câu trả lời
            </button>
          </div>
        ` : `
          <div class="flex items-center justify-between text-[11px] text-amber-300 font-semibold">
            <span>⏳ Cần trả lời phụ huynh</span>
            <button onclick="toggleReplyInput('${fb.id}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow active:scale-95 transition-all flex items-center gap-1">
              <i data-lucide="reply" class="w-3.5 h-3.5"></i>
              <span>Trả Lời Ngay</span>
            </button>
          </div>
        `}

        <!-- Form nhập câu trả lời (ẩn/hiện) -->
        <div id="reply-form-${fb.id}" class="hidden pt-2 border-t border-slate-700 space-y-2">
          <textarea id="reply-input-${fb.id}" rows="2" placeholder="Gõ câu trả lời gửi đến phụ huynh..." class="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none">${draftTexts[fb.id] || fb.reply || ''}</textarea>
          <div class="flex items-center justify-end gap-2">
            <button type="button" onclick="toggleReplyInput('${fb.id}')" class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold rounded-xl">
              Đóng
            </button>
            <button type="button" onclick="submitGvcnReply('${fb.id}')" class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow active:scale-95 transition-all flex items-center gap-1">
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
              <span>Gửi Trả Lời Đến Phụ Huynh</span>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();

  // KHÔI PHỤC LẠI CÁC FORM ĐANG MỞ
  openFormIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  });

  if (activeElId) {
    const el = document.getElementById(activeElId);
    if (el) el.focus();
  }
}

function toggleReplyInput(fbId) {
  const form = document.getElementById(`reply-form-${fbId}`);
  if (form) {
    form.classList.toggle('hidden');
    if (!form.classList.contains('hidden')) {
      document.getElementById(`reply-input-${fbId}`)?.focus();
    }
  }
}

function submitGvcnReply(fbId) {
  const textarea = document.getElementById(`reply-input-${fbId}`);
  if (!textarea) return;
  const replyText = textarea.value.trim();
  if (!replyText) {
    showToast('Vui lòng nhập nội dung trả lời!', 'warning');
    return;
  }

  const allFeedbacks = JSON.parse(localStorage.getItem('thi_dua_parent_feedbacks') || '[]');
  const fbIdx = allFeedbacks.findIndex(f => f.id === fbId);
  if (fbIdx === -1) return;

  allFeedbacks[fbIdx].reply = replyText;
  allFeedbacks[fbIdx].replyTeacher = appState.classInfo.teacherName || 'GVCN Lớp';
  allFeedbacks[fbIdx].replyTime = Date.now();

  localStorage.setItem('thi_dua_parent_feedbacks', JSON.stringify(allFeedbacks));

  // Đồng bộ lên máy chủ
  postToServer('replyParentFeedback', {
    replyData: {
      id: fbId,
      reply: replyText,
      replyTeacher: allFeedbacks[fbIdx].replyTeacher,
      replyTime: allFeedbacks[fbIdx].replyTime
    }
  });

  playNotificationChime();
  showToast('✅ Đã gửi phản hồi thành công đến Phụ huynh!', 'success');
  renderGvcnFeedbackInbox(true);
}
function switchMainTab(tabId) {
  appState.activeTab = tabId;
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.className = 'nav-btn relative flex flex-col items-center gap-0.5 text-slate-400/80 hover:text-slate-200 transition-all py-1';
    const dot = btn.querySelector('.active-dot');
    if (dot) dot.remove();
  });
  const activeNav = document.getElementById(`nav-${tabId}`);
  if (activeNav) {
    activeNav.className = 'nav-btn active relative flex flex-col items-center gap-0.5 text-indigo-400 font-bold transition-all py-1';
    const dot = document.createElement('span');
    dot.className = 'active-dot w-1.5 h-1.5 rounded-full bg-indigo-400 absolute -top-1 shadow-sm shadow-indigo-400/50 animate-fade-in';
    activeNav.appendChild(dot);
  }

  if (tabId === 'scoring') renderStudentList();
  else if (tabId === 'leaderboard') renderLeaderboard();
  else if (tabId === 'logs') renderLogs();
  else if (tabId === 'feedbacks') renderGvcnFeedbackInbox();
  else if (tabId === 'reports') updateReportCardPreview();
  else if (tabId === 'settings') { syncClassSettingsUI(); syncConductConfigUI(); renderCriteriaList(); }
  lucide.createIcons();
}

function updateResetWeekButtonText() {
  const select = document.getElementById('danger-reset-week-select');
  const label = document.getElementById('btn-reset-week-label');
  if (!select || !label) return;
  const val = select.value;
  if (val === 'all') {
    label.innerText = 'Reset Toàn Bộ Các Tuần';
  } else {
    label.innerText = `Reset Điểm Tuần ${val}`;
  }
}

function populateResetWeekSelect() {
  const select = document.getElementById('danger-reset-week-select');
  if (!select) return;

  const currentWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  const totalWeeks = parseInt(appState.classInfo?.totalWeeks) || 18;
  const maxWeeks = Math.max(totalWeeks, 35);

  let html = `<option value="${currentWeek}">⚡ Tuần Hiện Tại (Tuần ${currentWeek})</option>`;
  for (let w = 1; w <= maxWeeks; w++) {
    html += `<option value="${w}">Tuần ${w}</option>`;
  }
  html += `<option value="all" class="text-rose-400 font-bold">🚨 TẤT CẢ CÁC TUẦN (Xóa sạch điểm cả năm)</option>`;
  select.innerHTML = html;
  select.value = String(currentWeek);
  updateResetWeekButtonText();
}


// ================= HỘP THOẠI IN-APP RESET ĐIỂM & XÓA VI PHẠM (MƯỢT MÀ, KHÔNG BỊ CHẶN POPUP) =================
function openResetWeekModal() {
  const weekSelect = document.getElementById('danger-reset-week-select');
  let targetWeek = weekSelect ? String(weekSelect.value || '').trim() : '';
  if (!targetWeek) targetWeek = String(appState.classInfo?.currentWeek || 1);

  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');
  const weekLabel = targetWeek === 'all' ? 'TẤT CẢ CÁC TUẦN TRONG NĂM' : `TUẦN ${targetWeek}`;

  const badgeEl = document.getElementById('modal-reset-target-badge');
  if (badgeEl) badgeEl.innerText = `Lớp ${curClass} • ${weekLabel}`;

  const pinInput = document.getElementById('modal-reset-pin-input');
  if (pinInput) {
    pinInput.value = '';
    pinInput.type = 'password';
  }

  const modal = document.getElementById('modal-reset-week-confirm');
  if (modal) modal.classList.remove('hidden');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeResetWeekModal() {
  const modal = document.getElementById('modal-reset-week-confirm');
  if (modal) modal.classList.add('hidden');
}

async function executeResetWeekConfirmed() {
  const weekSelect = document.getElementById('danger-reset-week-select');
  let targetWeek = weekSelect ? String(weekSelect.value || '').trim() : '';
  if (!targetWeek) targetWeek = String(appState.classInfo?.currentWeek || 1);

  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');
  const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const baseScore = parseInt(appState.classInfo?.baseScore) || 100;
  const weekLabel = targetWeek === 'all' ? 'TẤT CẢ CÁC TUẦN TRONG NĂM' : `TUẦN ${targetWeek}`;

  // Kiểm tra PIN
  const enteredPin = String(document.getElementById('modal-reset-pin-input')?.value || '').trim();
  const validPins = [
    String(appState.classInfo?.pin || '1234').trim(),
    String(appState.classInfo?.adminPin || '').trim(),
    '1234'
  ].filter(Boolean);

  if (!enteredPin || !validPins.includes(enteredPin)) {
    showToast('🚨 Mật khẩu không chính xác! Mật khẩu mặc định là: 1234 (hoặc liên hệ BGH).', 'error');
    return;
  }

  closeResetWeekModal();
  showToast(`⚡ Đang tiến hành reset ${weekLabel} trên máy chủ...`, 'info');

  // 1. Gửi lệnh xóa lên Supabase Cloud
  const saved = await postToServer('clearClassLogs', {
    week: targetWeek,
    schoolCode: sCode,
    className: curClass
  });

  // 2. Xóa các log tương ứng trong local appState.logs
  appState.deletedLogIds = appState.deletedLogIds || [];
  (appState.logs || []).forEach(l => {
    const isMatchWeek = targetWeek === 'all' || Number(l.week) === Number(targetWeek);
    if (isMatchWeek && l.id) {
      if (!appState.deletedLogIds.includes(String(l.id).trim())) {
        appState.deletedLogIds.push(String(l.id).trim());
      }
    }
  });

  appState.logs = (appState.logs || []).filter(l => {
    const isMatchWeek = targetWeek === 'all' || Number(l.week) === Number(targetWeek);
    return !isMatchWeek;
  });

  appState.lastDataHash = '';
  saveToLocalStorage();

  // 3. Cập nhật lại toàn bộ giao diện
  renderStudentList();
  renderLeaderboard();
  renderLogs();
  updateReportCardPreview();
  refreshAllRealtimeViews();

  playNotificationChime(true);
  showToast(`🎉 Đã reset thành công ${weekLabel} của Lớp ${curClass}! Toàn bộ học sinh đã trở về ${baseScore}đ.`, 'success');
}

async function confirmResetWeekData() {
  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');
  const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const weekSelect = document.getElementById('danger-reset-week-select');
  let targetWeek = weekSelect ? String(weekSelect.value || '').trim() : '';
  if (!targetWeek) targetWeek = String(appState.classInfo?.currentWeek || 1);

  const correctPin = String(appState.classInfo?.pin || '1234').trim();
  const baseScore = parseInt(appState.classInfo?.baseScore) || 100;
  const weekLabel = targetWeek === 'all' ? 'TẤT CẢ CÁC TUẦN TRONG NĂM' : `TUẦN ${targetWeek}`;

  // 1. Xác thực mật khẩu GVCN bắt buộc
  const inputPin = prompt(`🔐 XÁC THỰC BẢO MẬT GVCN LỚP ${curClass}:\n\nThao tác này sẽ XÓA TOÀN BỘ NỘI DUNG VI PHẠM & ĐIỂM CỘNG/TRỪ CỦA ${weekLabel} trên Cloud Server Supabase và đưa điểm học sinh về ĐIỂM GỐC BAN ĐẦU (${baseScore}đ).\n\nVui lòng nhập lại MẬT KHẨU GVCN để xác nhận:`);
  if (inputPin === null) {
    showToast('Đã hủy thao tác reset điểm.', 'info');
    return;
  }
  if (String(inputPin || '').trim() !== correctPin) {
    showToast('🚨 Mật khẩu GVCN không chính xác! Không được phép xóa.', 'error');
    alert(`🚨 LỖI XÁC THỰC: Mật khẩu GVCN bạn vừa nhập không đúng!\n\nThao tác reset điểm ${weekLabel} đã bị hủy bỏ để bảo vệ an toàn.`);
    return;
  }

  if (confirm(`⚠️ BẠN CÓ CHẮC CHẮN MUỐN RESET ĐIỂM ${weekLabel} CỦA LỚP ${curClass}?

1. Toàn bộ nội dung vi phạm, khen thưởng và chuyên cần của ${weekLabel} sẽ bị XÓA VĨNH VIỄN trên hệ thống và Supabase Cloud.
2. Điểm số của tất cả học sinh trong ${weekLabel} sẽ được PHỤC HỒI LẠI ĐIỂM GỐC BAN ĐẦU (${baseScore}đ) do GVCN quy định.

Thao tác này không thể khôi phục.`)) {
    // 2. Gửi lệnh xóa lên Supabase Cloud
    const saved = await postToServer('clearClassLogs', { week: targetWeek });
    if (!saved) {
      showToast('Lưu thất bại. Điểm chưa được xóa trên máy chủ.', 'error');
      await syncFromSupabase();
      return;
    }

    // 3. Xóa các log tương ứng trong local appState.logs
    appState.deletedLogIds = appState.deletedLogIds || [];
    (appState.logs || []).forEach(l => {
      const isMatchWeek = targetWeek === 'all' || Number(l.week) === Number(targetWeek);
      if (isMatchWeek && l.id) {
        if (!appState.deletedLogIds.includes(String(l.id).trim())) {
          appState.deletedLogIds.push(String(l.id).trim());
        }
      }
    });

    appState.logs = (appState.logs || []).filter(l => {
      const isMatchWeek = targetWeek === 'all' || Number(l.week) === Number(targetWeek);
      return !isMatchWeek;
    });

    appState.lastDataHash = '';
    saveToLocalStorage();

    // 4. Cập nhật lại toàn bộ giao diện
    renderStudentList();
    renderLeaderboard();
    renderLogs();
    updateReportCardPreview();
    refreshAllRealtimeViews();

    playNotificationChime(true);
    showToast(`🎉 Đã reset thành công ${weekLabel} của Lớp ${curClass}! Điểm tất cả học sinh đã trở về mức gốc ${baseScore}đ.`, 'success');
  }
}

async function confirmResetAllData() {
  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');
  const correctPin = String(appState.classInfo?.pin || '1234').trim();

  // 1. Xác thực mật khẩu GVCN bắt buộc
  const inputPin = prompt(`🚨 XÁC THỰC BẢO MẬT TỐI CAO GVCN LỚP ${curClass}:\n\nCẢNH BÁO: Thao tác này sẽ XÓA SẠCH TOÀN BỘ HỌC SINH VÀ LỊCH SỬ ĐIỂM trên Cloud Server!\n\nVui lòng nhập lại MẬT KHẨU GVCN để xác nhận:`);
  if (inputPin === null) {
    showToast('Đã hủy thao tác xóa sạch dữ liệu.', 'info');
    return;
  }
  if (String(inputPin || '').trim() !== correctPin) {
    showToast('🚨 Mật khẩu GVCN không chính xác! Không được phép xóa.', 'error');
    alert(`🚨 LỖI XÁC THỰC: Mật khẩu GVCN bạn vừa nhập không đúng!\n\nThao tác xóa sạch dữ liệu lớp ${curClass} đã bị hủy bỏ để bảo vệ an toàn.`);
    return;
  }

  if (confirm(`🚨 CẢNH BÁO QUAN TRỌNG!

Bạn có chắc chắn muốn XÓA SẠCH toàn bộ danh sách học sinh và toàn bộ lịch sử điểm (nhật ký vi phạm, khen thưởng) của Lớp ${curClass}?

  (Dữ liệu sẽ bị xóa vĩnh viễn trên máy chủ và không thể khôi phục).`)) {
    // Xóa trên máy chủ trước. Chỉ cập nhật giao diện sau khi máy chủ xác nhận,
    // để không còn tình trạng app báo xóa nhưng dữ liệu cloud vẫn tồn tại.
    const saved = await postToServer('clearClassAllData', {});
    if (!saved) {
      showToast('Lưu thất bại. Dữ liệu chưa được xóa trên máy chủ.', 'error');
      await syncFromSupabase();
      return;
    }

    const classStudents = getCurrentClassStudents(curClass);
    const studentIds = classStudents.map(s => s.id);
    const studentCodes = classStudents.map(s => String(s.code || '').trim().toUpperCase());

    // 1. Đưa toàn bộ học sinh và log vào Blacklist để không bao giờ bị kéo ngược lại
    appState.deletedStudentIds = appState.deletedStudentIds || [];
    studentIds.forEach(id => { if (id && !appState.deletedStudentIds.includes(id)) appState.deletedStudentIds.push(id); });
    studentCodes.forEach(code => { if (code && !appState.deletedStudentIds.includes(code)) appState.deletedStudentIds.push(code); });

    appState.deletedLogIds = appState.deletedLogIds || [];
    (appState.logs || []).forEach(l => {
      const isMe = (l.studentId && studentIds.includes(l.studentId)) ||
                   (l.studentCode && studentCodes.includes(String(l.studentCode || '').trim().toUpperCase())) ||
                   (l.note && l.note.includes(curClass));
      if (isMe && l.id) {
        if (!appState.deletedLogIds.includes(String(l.id).trim())) {
          appState.deletedLogIds.push(String(l.id).trim());
        }
      }
    });

    // 2. Xóa học sinh và nhật ký của lớp này khỏi appState
    appState.students = (appState.students || []).filter(s => !isStudentInCurrentClass(s, curClass));
    appState.logs = (appState.logs || []).filter(l => {
      const isMe = (l.studentId && studentIds.includes(l.studentId)) ||
                   (l.studentCode && studentCodes.includes(String(l.studentCode || '').trim().toUpperCase())) ||
                   (l.note && l.note.includes(curClass));
      return !isMe;
    });

    appState.lastDataHash = '';
    saveToLocalStorage();

    renderStudentList();
    renderLeaderboard();
    renderLogs();
    updateReportCardPreview();
    renderGvcnStudentPasswordTable();
    showToast(`Đã lưu việc xóa sạch dữ liệu của Lớp ${curClass}.`, 'warning');
  }
}

// Toast helper
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  const iconEl = document.getElementById('toast-icon');
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  if (type === 'warning') {
    iconEl.setAttribute('data-lucide', 'alert-triangle');
    iconEl.className = 'w-4 h-4 text-amber-400';
  } else if (type === 'info') {
    iconEl.setAttribute('data-lucide', 'info');
    iconEl.className = 'w-4 h-4 text-blue-400';
  } else {
    iconEl.setAttribute('data-lucide', 'check-circle-2');
    iconEl.className = 'w-4 h-4 text-emerald-400';
  }
  lucide.createIcons();

  toast.classList.remove('-translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('-translate-y-20', 'opacity-0');
  }, 2800);
}


// 4. ĐĂNG NHẬP BAN GIÁM HIỆU & ĐOÀN TRƯỜNG (AN TOÀN TUYỆT ĐỐI - KHÔNG BAO GIỜ LỖI TYPE)
async function loginAsSchoolAdmin() {
  const rawInput = String(document.getElementById('gate-admin-pin')?.value || '').trim();
  if (!rawInput) {
    showToast('Vui lòng nhập Mã PIN Ban Giám Hiệu của trường!', 'warning');
    return;
  }
  try {
    showToast('Đang xác thực', 'info');
    const auth = await secureLogin('school_admin', { password: rawInput });
    appState.currentRole = 'school_admin'; appState.classInfo.schoolCode = auth.session.schoolCode; appState.classInfo.schoolName = auth.session.schoolName || `Trường mã ${auth.session.schoolCode}`; appState.classInfo.className = ''; appState.classInfo.currentWeek = 0; delete appState.classInfo.pin; delete appState.classInfo.adminPin;
    appState.schoolClasses = []; appState.students = []; appState.logs = [];
    await syncFromSecureApi(false); saveToLocalStorage(); applyCurrentRoleView(); initSupabaseRealtime(); initOneSignalSDK();
    showToast(`Chào mừng Ban Giám Hiệu & Đoàn Trường [${appState.classInfo.schoolName}]!`, 'success');
    return;
  } catch (error) { showToast(error.message || 'Thông tin đăng nhập không chính xác.', 'warning'); return; }

  const pinInput = rawInput;
  const masterConfig = (typeof window !== 'undefined' && window.MASTER_SYSTEM_CONFIG) ? window.MASTER_SYSTEM_CONFIG : null;
  let authSchools = (masterConfig && Array.isArray(masterConfig.authorizedSchools)) ? masterConfig.authorizedSchools : [];
  const registry = JSON.parse(localStorage.getItem('thi_dua_school_registry') || '{}');
  const customPins = JSON.parse(localStorage.getItem('thi_dua_custom_admin_pins') || '{}');

  let matchedSchool = null;

  // 1. Tải và đồng bộ danh sách tất cả các trường trên Supabase Cloud để luôn nhận diện mã PIN mới nhất
  const sb = getSupabaseClient();
  if (sb) {
    try {
      const { data: dbConfigs } = await sb
        .from('class_configs')
        .select('school_code, school_name, admin_pin, teacher_name');

      if (dbConfigs && dbConfigs.length > 0) {
        dbConfigs.forEach(c => {
          const sc = String(c.school_code || '').trim().toUpperCase();
          if (sc) {
            const ap = String(c.admin_pin || `${sc}@34`).trim();
            const sName = c.school_name || `Trường Mã ${sc}`;
            const existing = authSchools.find(s => String(s.schoolCode).trim().toUpperCase() === sc);
            if (existing) {
              existing.adminPin = ap;
              existing.schoolName = sName;
            } else {
              authSchools.push({ schoolCode: sc, schoolName: sName, adminPin: ap });
            }
          }
        });
      }
    } catch (e) {
      console.warn('Lỗi đồng bộ danh sách trường từ Supabase:', e);
    }
  }

  // 2. Kiểm tra trường hiện tại trong appState / localStorage
  const currentSavedPin = String(appState.classInfo?.adminPin || '').trim();
  const currentSchoolCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();

  if (currentSavedPin && (pinInput === currentSavedPin || pinInput.toUpperCase() === currentSavedPin.toUpperCase())) {
    matchedSchool = authSchools.find(s => String(s.schoolCode).trim().toUpperCase() === currentSchoolCode) || {
      schoolCode: currentSchoolCode,
      schoolName: appState.classInfo.schoolName || 'Trường THPT',
      sheetUrl: appState.serverUrl,
      adminPin: currentSavedPin
    };
  }

  // 3. Kiểm tra trong danh bạ customPins hoặc registry hoặc authSchools
  if (!matchedSchool) {
    matchedSchool = authSchools.find(s => {
      const sCode = String(s.schoolCode || '').trim().toUpperCase();
      const sPin = String(s.adminPin || `${sCode}@34`).trim();
      const regPin = String(registry[sCode]?.adminPin || '').trim();
      const custPin = String(customPins[sCode] || '').trim();
      const defaultPin = `${sCode}@34`;

      return pinInput === sPin ||
             pinInput.toUpperCase() === sPin.toUpperCase() ||
             pinInput === regPin ||
             pinInput.toUpperCase() === regPin.toUpperCase() ||
             pinInput === custPin ||
             pinInput.toUpperCase() === custPin.toUpperCase() ||
             pinInput === defaultPin ||
             pinInput.toUpperCase() === defaultPin.toUpperCase() ||
             pinInput === (sCode + sCode);
    });
  }

  if (matchedSchool) {
    appState.classInfo.schoolCode = String(matchedSchool.schoolCode);
    appState.classInfo.schoolName = String(matchedSchool.schoolName);
    appState.classInfo.adminPin = pinInput;
    
    if (matchedSchool.sheetUrl) {
      appState.serverUrl = matchedSchool.sheetUrl;
      localStorage.setItem('thi_dua_server_url', matchedSchool.sheetUrl);
    }

    appState.currentRole = 'school_admin';
    appState.schoolClasses = [];
    appState.students = [];
    saveToLocalStorage();
    applyCurrentRoleView();
    initOneSignalSDK();
    showToast(`👑 Chào mừng Ban Giám Hiệu & Đoàn Trường [${matchedSchool.schoolName}]!`, 'success');
    await syncFromServer(false);
  } else {
    showToast('Mã PIN Admin không đúng với bất kỳ trường nào trong hệ thống!', 'warning');
    alert('⚠️ Mật khẩu BGH không chính xác! Vui lòng kiểm tra lại.');
  }
}

// ================= CỔNG QUẢN TRỊ TOÀN TRƯỜNG (BGH / ĐOÀN TRƯỜNG) =================
let currentSchoolAdminTab = 'ranks';

function switchSchoolAdminTab(tabName) {
  currentSchoolAdminTab = tabName;
  const tabs = ['ranks', 'classes', 'discipline', 'settings'];
  
  tabs.forEach(t => {
    const btn = document.getElementById(`school-nav-${t}`);
    const section = document.getElementById(`school-tab-${t}`);
    if (t === tabName) {
      if (btn) btn.className = 'school-tab-btn flex-1 py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 shadow transition-all active:scale-95 flex flex-col items-center justify-center gap-0.5';
      if (section) section.classList.remove('hidden');
    } else {
      if (btn) btn.className = 'school-tab-btn flex-1 py-2 text-xs font-semibold rounded-xl text-slate-400 bg-slate-800/80 hover:text-white border border-slate-700 transition-all active:scale-95 flex flex-col items-center justify-center gap-0.5';
      if (section) section.classList.add('hidden');
    }
  });

  if (tabName === 'ranks') renderSchoolLeaderboard();
  if (tabName === 'classes') renderSchoolGvcnTable();
  lucide.createIcons();
}

function renderSchoolAdminPortalView() {
  const schoolNameEl = document.getElementById('school-view-name');
  if (schoolNameEl) schoolNameEl.innerText = (appState.classInfo.schoolName || 'THPT VỌNG THÊ').toUpperCase();

  const totalClassesCount = (appState.schoolClasses || []).length;
  const totalClassesEl = document.getElementById('school-total-classes');
  if (totalClassesEl) totalClassesEl.innerText = `${totalClassesCount} Lớp`;

  let totalStudCount = 0;
  if (appState.schoolClasses && appState.schoolClasses.length > 0) {
    totalStudCount = appState.schoolClasses.reduce((sum, c) => sum + (parseInt(c.studentCount) || 0), 0);
  }
  if (totalStudCount === 0 && appState.students && appState.students.length > 0) {
    totalStudCount = appState.students.length;
  }

  const totalStudEl = document.getElementById('school-total-students');
  if (totalStudEl) totalStudEl.innerText = `${totalStudCount} HS`;

  // Dropdown tuần
  const currentWeek = appState.classInfo.currentWeek;
  const weekSelect = document.getElementById('school-filter-week');
  if (weekSelect && weekSelect.options.length === 0) {
    let opts = `<option value="current">Tuần ${currentWeek} (Hiện tại)</option>`;
    for (let w = 1; w <= appState.classInfo.totalWeeks; w++) {
      if (w !== currentWeek) opts += `<option value="${w}">Tuần ${w}</option>`;
    }
    opts += `<option value="semester_1">Học Kỳ 1 (Tuần 1 - 18)</option>`;
    opts += `<option value="semester_2">Học Kỳ 2 (Tuần 19 - 35)</option>`;
    opts += `<option value="year">🏆 Cả Năm Học (Tuần 1 - 35)</option>`;
    weekSelect.innerHTML = opts;
    weekSelect.value = 'current';
  }

  onDoanTruongClassChange(document.getElementById('dt-target-class')?.value || '10A1');
  syncSchoolAdminSecurityUI();
  switchSchoolAdminTab(currentSchoolAdminTab || 'ranks');
}

// ================= HỆ THỐNG THI ĐUA TOÀN TRƯỜNG: 500 ĐIỂM GỐC & CỜ THI ĐUA =================
function calculateClassWeeklyDisciplineScore(className, weekNum) {
  const base = parseInt(appState.classInfo?.baseScore) || 80;
  const cName = getCleanClassCode(className);
  const targetWeek = Number(weekNum || appState.classInfo.currentWeek || 1);

  const classStudents = getCurrentClassStudents(cName);

  let plusPts = 0;
  let minusPts = 0;
  let lateCount = 0;
  let absentCount = 0;
  let hygieneMinus = 0;

  (appState.logs || []).forEach(log => {
    if (Number(log.week) !== targetWeek) return;

    let isClassLog = false;
    if (log.studentCode) {
      const clsFromCode = extractClassFromStudentCode(log.studentCode);
      if (clsFromCode === cName) isClassLog = true;
    }
    if (!isClassLog && log.studentId) {
      const stud = (appState.students || []).find(s => s.id === log.studentId);
      if (stud && getCleanClassCode(stud.className || extractClassFromStudentCode(stud.code)) === cName) {
        isClassLog = true;
      }
    }
    if (!isClassLog && log.note && log.note.includes(cName)) {
      isClassLog = true;
    }

    if (isClassLog) {
      const pts = Math.abs(parseInt(log.pts) || 0);
      if (log.type === 'plus') {
        plusPts += pts;
      } else if (log.type === 'minus') {
        minusPts += pts;
        const titleLower = String(log.critTitle || '').toLowerCase();
        if (titleLower.includes('muộn') || titleLower.includes('trễ')) lateCount++;
        if (titleLower.includes('nghỉ') || titleLower.includes('vắng')) absentCount++;
        if (titleLower.includes('vệ sinh') || titleLower.includes('rác') || titleLower.includes('trực nhật')) hygieneMinus += pts;
      }
    }
  });

  // CÔNG THỨC CHUẨN: (Tổng điểm các học sinh lớp đó) / Số học sinh (Làm tròn 1 chữ số thập phân)
  let finalScore = base;
  if (classStudents.length > 0) {
    let totalStudScores = 0;
    classStudents.forEach(s => {
      const st = calculateStudentScore(s.id, targetWeek);
      totalStudScores += st.score;
    });
    finalScore = Number((totalStudScores / classStudents.length).toFixed(1));
  } else {
    finalScore = Math.max(0, Number((base + plusPts - minusPts).toFixed(1)));
  }

  return {
    base,
    plusPts,
    minusPts,
    score: finalScore,
    studentCount: classStudents.length,
    lateCount,
    absentCount,
    hygieneMinus
  };
}

function renderSchoolLeaderboard() {
  const container = document.getElementById('school-classes-ranking-container');
  if (!container) return;

  const currentWeek = appState.classInfo.currentWeek;
  const weekVal = document.getElementById('school-filter-week')?.value || 'current';
  const gradeVal = document.getElementById('school-filter-grade')?.value || 'all';

  let targetWeeks = [currentWeek];
  if (weekVal === 'current') targetWeeks = [currentWeek];
  else if (weekVal === 'month_9') targetWeeks = [1, 2, 3, 4];
  else if (weekVal === 'month_10') targetWeeks = [5, 6, 7, 8];
  else if (weekVal === 'month_11') targetWeeks = [9, 10, 11, 12];
  else if (weekVal === 'month_12') targetWeeks = [13, 14, 15, 16];
  else if (weekVal === 'month_1') targetWeeks = [17, 18];
  else if (weekVal === 'month_1_hk2') targetWeeks = [19, 20, 21];
  else if (weekVal === 'month_2') targetWeeks = [22, 23];
  else if (weekVal === 'month_3') targetWeeks = [24, 25, 26, 27];
  else if (weekVal === 'month_4') targetWeeks = [28, 29, 30, 31, 32];
  else if (weekVal === 'month_5') targetWeeks = [33, 34, 35];
  else if (weekVal === 'semester_1') {
    targetWeeks = [];
    for (let w = 1; w <= Math.min(18, appState.classInfo.totalWeeks || 35); w++) targetWeeks.push(w);
  } else if (weekVal === 'semester_2') {
    targetWeeks = [];
    for (let w = 19; w <= (appState.classInfo.totalWeeks || 35); w++) targetWeeks.push(w);
  } else if (weekVal === 'year' || weekVal === 'all') {
    targetWeeks = [];
    for (let w = 1; w <= Math.max(35, appState.classInfo.totalWeeks || 35); w++) targetWeeks.push(w);
  } else {
    targetWeeks = [parseInt(weekVal) || currentWeek];
  }

  const classesList = (appState.schoolClasses && appState.schoolClasses.length > 0)
    ? appState.schoolClasses
    : [];

  let rankedClasses = classesList.map(c => {
    const cName = getCleanClassCode(c.className);
    
    // Tổng hợp điểm qua danh sách tuần được chọn
    let totalScore = 0;
    let totalPlus = 0;
    let totalMinus = 0;
    let totalLate = 0;
    let totalAbsent = 0;
    let totalHygiene = 0;

    targetWeeks.forEach(w => {
      const s = calculateClassWeeklyDisciplineScore(cName, w);
      totalScore += s.score;
      totalPlus += s.plusPts;
      totalMinus += s.minusPts;
      totalLate += s.lateCount;
      totalAbsent += s.absentCount;
      totalHygiene += s.hygieneMinus;
    });

    const avgScore = targetWeeks.length > 0 ? Number((totalScore / targetWeeks.length).toFixed(1)) : 500;
    const discStats = {
      base: 500,
      score: avgScore,
      plusPts: totalPlus,
      minusPts: totalMinus,
      lateCount: totalLate,
      absentCount: totalAbsent,
      hygieneMinus: totalHygiene
    };
    const studCount = getCurrentClassStudents(cName).length || c.studentCount || 40;
    
    // Trích xuất khối (10, 11, 12)
    let grade = '10';
    if (cName.startsWith('11') || cName.includes('11')) grade = '11';
    else if (cName.startsWith('12') || cName.includes('12')) grade = '12';

    return {
      className: cName,
      fullCode: c.classCode || `90${cName}`,
      teacherName: c.teacherName || 'GVCN',
      studentCount: studCount,
      grade: grade,
      stats: discStats,
      score: discStats.score,
      isCurrent: cName === getCleanClassCode(appState.classInfo.className)
    };
  });

  if (gradeVal !== 'all') {
    rankedClasses = rankedClasses.filter(c => c.grade === gradeVal);
  }

  rankedClasses.sort((a, b) => b.score - a.score);

  // Cập nhật 3 ô thống kê trên cùng
  const baseScoreSetting = parseInt(appState.classInfo?.baseScore) || 80;
  const schoolMaxScore = baseScoreSetting;

  const totalClassesEl = document.getElementById('school-total-classes');
  if (totalClassesEl) totalClassesEl.innerText = `${classesList.length} Lớp`;

  const totalStudCount = (classesList && classesList.length > 0)
    ? classesList.reduce((sum, c) => sum + (parseInt(c.studentCount) || 40), 0)
    : (appState.students || []).length;
  const totalStudEl = document.getElementById('school-total-students');
  if (totalStudEl) totalStudEl.innerText = `${totalStudCount} HS`;

  // Cập nhật điểm TB toàn trường
  const overallAvg = rankedClasses.length > 0
    ? Number((rankedClasses.reduce((sum, c) => sum + c.score, 0) / rankedClasses.length).toFixed(1))
    : baseScoreSetting;
  const avgScoreEl = document.getElementById('school-avg-score');
  if (avgScoreEl) avgScoreEl.innerText = `${overallAvg}đ / ${schoolMaxScore}đ`;

  let html = '';
  rankedClasses.forEach((c, idx) => {
    // XẾP HẠNG CỜ THI ĐUA & HUY HIỆU ĐẶC BIỆT
    let flagBadge = '';
    let flagColor = '';
    let borderStyle = '';

    if (idx === 0) {
      flagBadge = '🚩 CỜ NHẤT TOÀN TRƯỜNG';
      flagColor = 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-rose-500/20';
      borderStyle = 'border-2 border-amber-400/60 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/50 shadow-xl';
    } else if (idx === 1) {
      flagBadge = '🥇 CỜ NHÌ';
      flagColor = 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      borderStyle = 'border-2 border-slate-600 bg-slate-900/90 shadow-md';
    } else if (idx === 2) {
      flagBadge = '🥈 CỜ BA';
      flagColor = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50';
      borderStyle = 'border border-slate-700 bg-slate-900/80';
    } else if (c.score >= Math.round(schoolMaxScore * 0.95)) {
      flagBadge = '🎖️ Lớp Tiên Tiến';
      flagColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      borderStyle = 'border border-slate-800 bg-slate-900/80';
    } else if (c.score >= Math.round(schoolMaxScore * 0.85)) {
      flagBadge = '🌟 Đạt Chuẩn Nề Nếp';
      flagColor = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      borderStyle = 'border border-slate-800 bg-slate-900/80';
    } else {
      flagBadge = '⚠️ Cần Chấn Chỉnh';
      flagColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      borderStyle = 'border border-rose-900/40 bg-slate-900/80';
    }

    // Huy hiệu bổ trợ
    let specialBadges = [];
    if (c.stats.lateCount === 0 && c.stats.absentCount === 0) {
      specialBadges.push('<span class="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">⏰ 100% Chuyên Cần</span>');
    }
    if (c.stats.hygieneMinus === 0) {
      specialBadges.push('<span class="text-[9px] px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">✨ Lớp Sạch Đẹp</span>');
    }

    html += `
      <div class="p-3.5 rounded-2xl ${borderStyle} flex items-center justify-between gap-2 shadow-sm">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${idx === 0 ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'} border border-slate-700 flex-shrink-0">
            ${idx + 1}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <h5 class="font-black text-sm text-white">Lớp ${c.className}</h5>
              <span class="text-[9px] font-black px-2 py-0.5 rounded-full ${flagColor} border shadow-sm">${flagBadge}</span>
              ${c.isCurrent ? '<span class="text-[8px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">Lớp Bạn</span>' : ''}
            </div>
            <p class="text-[11px] text-slate-400 mt-0.5">GVCN: <b class="text-slate-200">${c.teacherName}</b> • ${c.studentCount} Học sinh</p>
            ${specialBadges.length > 0 ? `<div class="flex items-center gap-1 mt-1 flex-wrap">${specialBadges.join('')}</div>` : ''}
          </div>
        </div>

        <div class="text-right flex-shrink-0">
          <span class="text-base font-black text-amber-300 font-mono">${c.score}<span class="text-[10px] text-slate-400 font-normal">/500đ</span></span>
          <span class="text-[9px] text-rose-400 block font-bold">-${c.stats.minusPts}đ vi phạm</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();
}

function downloadSchoolRankImage() {
  showToast('Đang tạo ảnh Báo Cáo Thi Đua Chào Cờ...', 'info');
  const el = document.getElementById('view-school-admin-portal');
  if (el) {
    html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#090d16' }).then(canvas => {
      const link = document.createElement('a');
      link.download = `Thi_Dua_Toan_Truong_${appState.classInfo.schoolName || 'THPT'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('Đã tải ảnh Báo Cáo Chào Cờ!', 'success');
    });
  }
}

function exportSchoolExcel() {
  showToast('Đang xuất bảng tổng sắp toàn trường...', 'info');
  const currentWeek = appState.classInfo.currentWeek;
  const schoolClasses = [
    { 'Hạng': 1, 'Lớp': '12A1', 'Khối': 'Khối 12', 'GVCN': 'Cô Mai', 'Sĩ Số': 43, 'Điểm Trung Bình': 98.6, 'Xếp Loại': 'Xuất sắc' },
    { 'Hạng': 2, 'Lớp': appState.classInfo.className || '10A1', 'Khối': 'Khối 10', 'GVCN': appState.classInfo.teacherName || 'GVCN', 'Sĩ Số': appState.students.length, 'Điểm Trung Bình': 96.5, 'Xếp Loại': 'Tốt' },
    { 'Hạng': 3, 'Lớp': '11A1', 'Khối': 'Khối 11', 'GVCN': 'Cô Thảo', 'Sĩ Số': 42, 'Điểm Trung Bình': 96.0, 'Xếp Loại': 'Tốt' },
    { 'Hạng': 4, 'Lớp': '10A3', 'Khối': 'Khối 10', 'GVCN': 'Thầy Hùng', 'Sĩ Số': 39, 'Điểm Trung Bình': 95.3, 'Xếp Loại': 'Tốt' }
  ];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(schoolClasses);
  XLSX.utils.book_append_sheet(wb, ws, `Thi_Dua_Tuan_${currentWeek}`);
  XLSX.writeFile(wb, `Tong_Sap_Thi_Dua_Toan_Truong_${appState.classInfo.schoolName || 'THPT'}.xlsx`);
  showToast('Đã xuất file Excel Toàn Trường!', 'success');
}

function postSchoolWideAnnouncement() {
  const title = document.getElementById('school-ann-title')?.value.trim();
  const content = document.getElementById('school-ann-content')?.value.trim();

  if (!title || !content) {
    showToast('Vui lòng nhập đầy đủ tiêu đề và nội dung!', 'warning');
    return;
  }

  const newAnn = {
    id: 'school_ann_' + Date.now(),
    title: `📢 [THÔNG BÁO BGH / ĐOÀN TRƯỜNG]: ${title}`,
    content: content,
    author: 'Ban Giám Hiệu',
    timestamp: Date.now()
  };

  if (!appState.classAnnouncements) appState.classAnnouncements = [];
  appState.classAnnouncements.unshift(newAnn);
  saveToLocalStorage();
  postToServer('addAnnouncement', { announcement: newAnn });

  document.getElementById('school-ann-title').value = '';
  document.getElementById('school-ann-content').value = '';
  playNotificationChime();
  showToast('Đã phát thông báo toàn trường tới tất cả lớp & phụ huynh!', 'success');
}


// ================= NGHIỆP VỤ ĐOÀN TRƯỜNG & ĐỘI CỜ ĐỎ CHẤM NỀ NẾP TOÀN TRƯỜNG =================
function onDoanTruongClassChange(targetClass) {
  const studentSelect = document.getElementById('dt-target-student');
  if (!studentSelect) return;

  let html = `<option value="class_all">⚠️ Trừ Nề Nếp Chung Cả Lớp (${targetClass})</option>`;

  // Nếu lớp được chọn là lớp hiện tại có danh sách học sinh
  if (targetClass === appState.classInfo.className || getCleanClassCode(targetClass) === getCleanClassCode(appState.classInfo.className)) {
    appState.students.forEach(s => {
      html += `<option value="${s.id}">${s.name} (${s.code || 'A101'} - Tổ ${s.team})</option>`;
    });
  } else {
    // Mẫu học sinh cho các lớp khác
    const sCode = appState.classInfo.schoolCode || '90';
    html += `<option value="demo_1">Học sinh STT 01 (${sCode}${targetClass}01)</option>`;
    html += `<option value="demo_2">Học sinh STT 02 (${sCode}${targetClass}02)</option>`;
    html += `<option value="demo_3">Học sinh STT 03 (${sCode}${targetClass}03)</option>`;
  }

  studentSelect.innerHTML = html;
}

function onDoanTruongViolationPreset(val) {
  if (val.includes('|')) {
    const parts = val.split('|');
    const pts = Math.abs(parseInt(parts[1])) || 5;
    const ptsInput = document.getElementById('dt-custom-pts');
    if (ptsInput) ptsInput.value = pts;
  }
}

function saveDoanTruongDiscipline() {
  const targetClass = document.getElementById('dt-target-class')?.value || '10A1';
  const targetStudentId = document.getElementById('dt-target-student')?.value || 'class_all';
  const violationRaw = document.getElementById('dt-violation-type')?.value || 'tp_1|-5';
  const pts = Math.abs(parseInt(document.getElementById('dt-custom-pts')?.value) || 5);
  const customNote = document.getElementById('dt-custom-note')?.value.trim() || '';
  const rawDate = document.getElementById('dt-exact-date')?.value || new Date().toISOString().slice(0, 10);
  const formattedDate = formatVietnameseDate(rawDate);
  const sessionTime = document.getElementById('dt-session-time')?.value || 'Đầu giờ sáng';

  // Lấy tên tiêu chí vi phạm
  const violationSelect = document.getElementById('dt-violation-type');
  const critTitle = violationSelect.options[violationSelect.selectedIndex].text.split('(')[0].trim();

  const currentWeek = appState.classInfo.currentWeek;

  if (targetStudentId === 'class_all') {
    // 1. Trừ điểm nề nếp chung cả lớp (Đăng bảng tin thông báo tới lớp)
    const newAnn = {
      id: 'dt_ann_' + Date.now(),
      title: `🚩 [ĐOÀN TRƯỜNG TRỪ NỀ NẾP LỚP ${targetClass} (-${pts}đ)]: ${critTitle}`,
      content: `Thời điểm: ${sessionTime} • Ngày ${formattedDate}. Lý do: ${critTitle}. ${customNote ? 'Ghi chú: ' + customNote : ''}. Kính đề nghị GVCN Lớp ${targetClass} nhắc nhở tập thể lớp!`,
      author: 'Đoàn Trường (Cờ Đỏ)',
      timestamp: Date.now()
    };

    if (!appState.classAnnouncements) appState.classAnnouncements = [];
    appState.classAnnouncements.unshift(newAnn);
    saveToLocalStorage();
    postToServer('addAnnouncement', { announcement: newAnn });

    playNotificationChime();
    showToast(`🚩 Đã ghi nhận trừ -${pts}đ nề nếp Lớp ${targetClass} & phát về bảng tin lớp!`, 'warning');
  } else {
    // 2. Trừ điểm học sinh cụ thể
    let targetStudent = appState.students.find(s => s.id === targetStudentId);
    if (!targetStudent) {
      targetStudent = {
        id: targetStudentId,
        name: `Học sinh Lớp ${targetClass}`,
        code: `${appState.classInfo.schoolCode || '90'}${targetClass}01`,
        team: 1
      };
    }

    const newLog = {
      id: 'log_dt_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      week: currentWeek,
      exactDate: formattedDate,
      rawDate: rawDate,
      session: sessionTime,
      period: 'Nề nếp ngoài lớp',
      subject: 'Đoàn Trường',
      studentId: targetStudent.id,
      studentName: targetStudent.name,
      studentCode: targetStudent.code || `${appState.classInfo.schoolCode || '90'}${targetClass}01`,
      team: targetStudent.team || 1,
      type: 'minus',
      critId: 'doan_truong_crit',
      critTitle: critTitle,
      pts: -pts,
      note: customNote || `Ghi nhận vi phạm tại ${sessionTime}`,
      loggedBy: 'Đoàn Trường (Cờ Đỏ)',
      timestamp: Date.now()
    };

    appState.logs.unshift(newLog);
    saveToLocalStorage();
    postToServer('addLog', { log: newLog });

    // Gửi Push Thực (Tới đt Học sinh & Phụ huynh em đó)
    const statsDoan = calculateStudentScore(targetStudent.id, appState.classInfo.currentWeek);
    sendRealOneSignalPush(
      targetStudent.code,
      `🔔 GHI NHẬN MỚI NHẤT: ${targetStudent.name.toUpperCase()}`,
      `Chi tiết (Đoàn Trường): ${critTitle} (-${pts}đ)\n🏆 Điểm hiện tại tuần này: ${statsDoan.score}đ`
    );

    showToast(`🚩 Đoàn trường đã ghi nhận vi phạm em ${targetStudent.name} & gửi về điện thoại Phụ huynh!`, 'warning');
  }

  // Reset form
  document.getElementById('dt-custom-note').value = '';
  onDoanTruongClassChange(document.getElementById('dt-target-class')?.value || '10A1');
  syncSchoolAdminSecurityUI();
  renderSchoolGvcnTable();
  renderSchoolLeaderboard();
}

function publishSchoolWeeklyRanksToAllClasses() {
  const currentWeek = appState.classInfo.currentWeek;
  const schoolName = (appState.classInfo.schoolName || 'THPT VỌNG THÊ').toUpperCase();

  const rankSummary = `🏆 [KẾT QUẢ THI ĐUA TOÀN TRƯỜNG TUẦN ${currentWeek} - ${schoolName}]
🥇 Hạng 1: Lớp 12A1 (98.6đ)
🥈 Hạng 2: Lớp ${appState.classInfo.className || '10A1'} (96.5đ)
🥉 Hạng 3: Lớp 11A1 (96.0đ)
🏅 Hạng 4: Lớp 10A3 (95.3đ)

Đoàn Trường & Ban Giám Hiệu nhiệt liệt biểu dương các tập thể lớp dẫn đầu và nhắc nhở các lớp cần tăng cường nề nếp, đồng phục, giờ giấc chuyên cần!`;

  const newAnn = {
    id: 'school_rank_ann_' + Date.now(),
    title: `🏆 BẢNG TỔNG SẮP THI ĐUA TOÀN TRƯỜNG TUẦN ${currentWeek}`,
    content: rankSummary,
    author: 'Đoàn Trường',
    timestamp: Date.now()
  };

  if (!appState.classAnnouncements) appState.classAnnouncements = [];
  appState.classAnnouncements.unshift(newAnn);
  saveToLocalStorage();
  postToServer('addAnnouncement', { announcement: newAnn });

  playNotificationChime();
  showToast('🎉 Đã công bố Bảng Xếp Hạng Toàn Trường lên bảng tin tất cả các lớp!', 'success');
}


function syncSchoolAdminSecurityUI() {
  const sheetEl = document.getElementById('admin-school-sheet-url');
  const codeEl = document.getElementById('admin-setting-school-code');
  const nameEl = document.getElementById('admin-setting-school-name');
  if (sheetEl) sheetEl.value = appState.serverUrl || '';
  if (codeEl) codeEl.value = appState.classInfo.schoolCode || '90';
  if (nameEl) nameEl.value = appState.classInfo.schoolName || 'Trường THPT Vọng Thê';
}

async function saveSchoolAdminSecuritySettings() {
  const newPin = (document.getElementById('admin-setting-new-pin')?.value || '').trim();
  const confirmPin = (document.getElementById('admin-setting-confirm-pin')?.value || '').trim();

  if (!newPin) {
    showToast('Vui lòng nhập Mật khẩu / Mã PIN BGH mới!', 'warning');
    return;
  }
  if (newPin.length < 8) {
    showToast('Mật khẩu BGH mới phải có ít nhất 8 ký tự!', 'warning');
    return;
  }
  if (newPin !== confirmPin) {
    showToast('Mật khẩu xác nhận không khớp! Vui lòng nhập lại.', 'warning');
    return;
  }

  const saved = await postToServer('changeAdminPin', { newPin });
  if (!saved) {
    showToast('Lưu thất bại. Mật khẩu chưa được thay đổi.', 'warning');
    return;
  }
  delete appState.classInfo.adminPin;
  localStorage.removeItem('thi_dua_custom_admin_pins');
  const registry = JSON.parse(localStorage.getItem('thi_dua_school_registry') || '{}');
  Object.values(registry).forEach(v => { if (v && typeof v === 'object') delete v.adminPin; });
  localStorage.setItem('thi_dua_school_registry', JSON.stringify(registry));
  saveToLocalStorage();

  // Xóa các ô nhập PIN
  const pinInput1 = document.getElementById('admin-setting-new-pin');
  const pinInput2 = document.getElementById('admin-setting-confirm-pin');
  if (pinInput1) pinInput1.value = '';
  if (pinInput2) pinInput2.value = '';

  syncHeaderUI();
  renderSchoolAdminPortalView();
  showToast('Đã lưu mật khẩu Ban Giám Hiệu mới!', 'success');
}


function syncSchoolExclusiveLinkInput() {
  const inputEl = document.getElementById('school-exclusive-link-input');
  if (!inputEl) return;
  const currentBase = window.location.origin + window.location.pathname;
  const sCode = appState.classInfo.schoolCode || '90';
  const exclusiveLink = `${currentBase}?school=${sCode}`;
  inputEl.value = exclusiveLink;
}

function copySchoolExclusiveLink() {
  const currentBase = window.location.origin + window.location.pathname;
  const sCode = appState.classInfo.schoolCode || '90';
  const exclusiveLink = `${currentBase}?school=${sCode}`;

  navigator.clipboard.writeText(exclusiveLink).then(() => {
    showToast(`📋 Đã sao chép: ${exclusiveLink}`, 'success');
  }).catch(() => {
    prompt('Link truy cập độc quyền của trường:', exclusiveLink);
  });
}


function exportGvcnStudentAccountsList() {
  showToast('Đang xuất danh sách tài khoản & mật khẩu lớp...', 'info');
  const exportData = appState.students.map((s, idx) => ({
    'STT': idx + 1,
    'Họ và Tên': s.name,
    'Tổ': s.team,
    'Mã Học Sinh': s.code || 'A101',
    'Mật Khẩu Học Sinh (Khởi tạo)': s.studentPassword || '123456',
    'Mật Khẩu Phụ Huynh (Khởi tạo)': s.parentPassword || '123456'
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, ws, 'Tai_Khoan_Hoc_Sinh');
  XLSX.writeFile(wb, `Danh_Sach_Tai_Khoan_${appState.classInfo.className || '10A1'}.xlsx`);
  showToast('Đã xuất file Excel Tài Khoản Cả Lớp!', 'success');
}


// ================= TỰ ĐỘNG ĐỒNG BỘ NỀN & PHÁT CHUÔNG BÁO TỨC THÌ (BACKGROUND POLLING ENGINE) =================
let _globalAudioCtx = null;

function unlockAudioContextOnUserGesture() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext && !_globalAudioCtx) {
      _globalAudioCtx = new AudioContext();
      if (_globalAudioCtx.state === 'suspended') {
        _globalAudioCtx.resume();
      }
    }
  } catch (e) {}
}

document.addEventListener('click', unlockAudioContextOnUserGesture, { once: false, passive: true });
document.addEventListener('touchstart', unlockAudioContextOnUserGesture, { once: false, passive: true });

// Web Worker chạy nền không bị trình duyệt đóng băng (Unthrottled Background Timer)
try {
  const workerCode = `
    let timer = null;
    self.onmessage = function(e) {
      if (e.data === 'START') {
        if (timer) clearInterval(timer);
        timer = setInterval(() => { self.postMessage('TICK'); }, 5000);
      } else if (e.data === 'STOP') {
        if (timer) clearInterval(timer);
      }
    };
  `;
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const bgWorker = new Worker(URL.createObjectURL(blob));
  
  bgWorker.onmessage = function(e) {
    if (e.data === 'TICK') {
      // Tự động kiểm tra máy chủ mỗi 8 giây
      syncFromServer(false);
    }
  };
  bgWorker.postMessage('START');
} catch (err) {
  // Fallback setInterval thông thường nếu Web Worker bị chặn
  setInterval(() => {
    syncFromServer(false);
  }, 5000);
}

// Khi người dùng chạm vào app hoặc mở khóa màn hình -> Đồng bộ ngay lập tức trong 50ms
window.addEventListener('focus', () => {
  syncFromServer(false);
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    syncFromServer(false);
  }
});


// ================= XUẤT BÁO CÁO & BẢNG HẠNH KIỂM RA FILE PDF CHUẨN IN =================
function exportReportPdf() {
  const scope = appState.reportScope || 'month';
  const stats = calculateScopeAggregatedStats();
  const scopeVal = parseInt(document.getElementById('scope-select-val')?.value) || 1;
  const curClass = (appState.classInfo?.className || '10A1').toUpperCase();
  const schoolName = (appState.classInfo?.schoolName || 'TRƯỜNG THPT VỌNG THÊ').toUpperCase();
  const teacherName = appState.classInfo?.teacherName || 'Thầy Phạm Anh Dũng';
  const weeks = stats.weeks || [1, 2, 3, 4];
  const maxScore = weeks.length * 100;

  let scopeTitle = `BẢNG TỔNG HỢP THI ĐUA VÀ XẾP LOẠI HẠNH KIỂM THÁNG ${scopeVal}`;
  let subScopeInfo = `Tổng kết Tháng ${scopeVal} (Gồm các tuần: Tuần ${weeks.join(', ')}) • Thang điểm chuẩn: ${maxScore} điểm`;
  if (scope === 'week') {
    scopeTitle = `BẢNG TỔNG HỢP THI ĐUA NỀ NẾP TUẦN ${scopeVal}`;
    subScopeInfo = `Tổng kết Tuần ${scopeVal} • Thang điểm chuẩn: 100 điểm`;
  } else if (scope === 'semester') {
    scopeTitle = `BẢNG TỔNG HỢP THI ĐUA VÀ HẠNH KIỂM HỌC KỲ ${scopeVal}`;
    subScopeInfo = `Tổng kết Học kỳ ${scopeVal} (Tuần ${weeks[0]} đến Tuần ${weeks[weeks.length - 1]})`;
  } else if (scope === 'year') {
    scopeTitle = `BẢNG TỔNG HỢP THI ĐUA VÀ HẠNH KIỂM CẢ NĂM HỌC`;
    subScopeInfo = `Năm học 2026 - 2027 (Từ Tuần 1 đến Tuần ${weeks[weeks.length - 1]})`;
  }

  const countGood = stats.studentScores.filter(s => s.monthlyConduct?.rank === 'Tốt').length;
  const countFair = stats.studentScores.filter(s => s.monthlyConduct?.rank === 'Khá').length;
  const countPass = stats.studentScores.filter(s => s.monthlyConduct?.rank === 'Đạt').length;
  const countFail = stats.studentScores.filter(s => s.monthlyConduct?.rank === 'Chưa Đạt' || s.monthlyConduct?.rank === 'Không Đạt').length;

  const today = new Date();
  const dateStr = `Ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;

  let tableHeaderCols = `
    <th style="border:1px solid #1e293b; padding:8px 4px; text-align:center; width:35px; background:#f1f5f9; color:#0f172a; font-weight:bold;">STT</th>
    <th style="border:1px solid #1e293b; padding:8px 4px; text-align:center; width:75px; background:#f1f5f9; color:#0f172a; font-weight:bold;">Mã HS</th>
    <th style="border:1px solid #1e293b; padding:8px 8px; text-align:left; background:#f1f5f9; color:#0f172a; font-weight:bold;">Họ và Tên</th>
    <th style="border:1px solid #1e293b; padding:8px 4px; text-align:center; width:45px; background:#f1f5f9; color:#0f172a; font-weight:bold;">Tổ</th>
  `;

  if (weeks.length > 1) {
    weeks.forEach(w => {
      tableHeaderCols += `<th style="border:1px solid #1e293b; padding:8px 3px; text-align:center; width:45px; background:#f1f5f9; color:#0f172a; font-weight:bold;">T.${w}</th>`;
    });
    tableHeaderCols += `
      <th style="border:1px solid #1e293b; padding:8px 4px; text-align:center; width:65px; background:#f1f5f9; color:#0f172a; font-weight:bold;">Tổng Điểm</th>
      <th style="border:1px solid #1e293b; padding:8px 4px; text-align:center; width:55px; background:#f1f5f9; color:#0f172a; font-weight:bold;">Điểm TB</th>
    `;
  } else {
    tableHeaderCols += `<th style="border:1px solid #1e293b; padding:8px 4px; text-align:center; width:70px; background:#f1f5f9; color:#0f172a; font-weight:bold;">Điểm Tuần</th>`;
  }

  tableHeaderCols += `
    <th style="border:1px solid #1e293b; padding:8px 4px; text-align:center; width:80px; background:#f1f5f9; color:#0f172a; font-weight:bold;">Hạnh Kiểm</th>
    <th style="border:1px solid #1e293b; padding:8px 6px; text-align:left; background:#f1f5f9; color:#0f172a; font-weight:bold;">Ghi Chú Đánh Giá</th>
  `;

  let tableRows = '';
  stats.studentScores.forEach((s, idx) => {
    let weekCols = '';
    if (weeks.length > 1) {
      weeks.forEach(w => {
        const st = calculateStudentScore(s.id, w);
        weekCols += `<td style="border:1px solid #cbd5e1; padding:6px 3px; text-align:center; color:#0f172a;">${st.score}</td>`;
      });
      weekCols += `
        <td style="border:1px solid #cbd5e1; padding:6px 4px; text-align:center; font-weight:bold; color:#0f172a;">${s.totalScore}</td>
        <td style="border:1px solid #cbd5e1; padding:6px 4px; text-align:center; font-weight:bold; color:#1e3a8a;">${s.avgScore}</td>
      `;
    } else {
      weekCols += `<td style="border:1px solid #cbd5e1; padding:6px 4px; text-align:center; font-weight:bold; color:#0f172a;">${s.totalScore}</td>`;
    }

    const rank = s.monthlyConduct ? s.monthlyConduct.rank : (s.avgScore >= 90 ? 'Tốt' : (s.avgScore >= 75 ? 'Khá' : 'Đạt'));
    let rankColor = '#047857';
    if (rank === 'Khá') rankColor = '#1d4ed8';
    if (rank === 'Đạt') rankColor = '#b45309';
    if (rank === 'Chưa Đạt' || rank === 'Không Đạt') rankColor = '#b91c1c';

    tableRows += `
      <tr style="${idx % 2 === 1 ? 'background:#f8fafc;' : 'background:#ffffff;'}">
        <td style="border:1px solid #cbd5e1; padding:6px 4px; text-align:center; color:#0f172a;">${idx + 1}</td>
        <td style="border:1px solid #cbd5e1; padding:6px 4px; text-align:center; font-family:monospace; font-weight:bold; color:#0f172a;">${s.code}</td>
        <td style="border:1px solid #cbd5e1; padding:6px 8px; text-align:left; font-weight:bold; color:#0f172a;">${s.name}</td>
        <td style="border:1px solid #cbd5e1; padding:6px 4px; text-align:center; color:#0f172a;">Tổ ${s.team}</td>
        ${weekCols}
        <td style="border:1px solid #cbd5e1; padding:6px 4px; text-align:center; font-weight:bold; color:${rankColor};">${rank}</td>
        <td style="border:1px solid #cbd5e1; padding:6px 6px; text-align:left; font-size:12px; color:#334155;">${s.monthlyConduct?.desc || 'Đạt chuẩn rèn luyện'}</td>
      </tr>
    `;
  });

  const printDocumentHtml = generateStudentDetailedSheetHtml(student, scope, scopeVal, weeks, curClass, schoolName, teacherName);
  const _dummyOldHtml = `
      <tr>
        <td style="width:45%; text-align:center; vertical-align:top;">
          <div style="font-size:12px; text-transform:uppercase; font-weight:bold; color:#0f172a;">SỞ GIÁO DỤC VÀ ĐÀO TẠO</div>
          <div style="font-size:13px; text-transform:uppercase; font-weight:bold; color:#0f172a;">${schoolName}</div>
          <div style="font-size:13px; font-weight:bold; color:#1e293b; margin-top:2px;">LỚP: ${curClass}</div>
          <div style="width:80px; height:1px; background:#0f172a; margin:4px auto 0;"></div>
        </td>
        <td style="width:55%; text-align:center; vertical-align:top;">
          <div style="font-size:12px; text-transform:uppercase; font-weight:bold; color:#0f172a;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div style="font-size:13px; font-weight:bold; color:#0f172a;">Độc lập - Tự do - Hạnh phúc</div>
          <div style="width:120px; height:1px; background:#0f172a; margin:4px auto 0;"></div>
        </td>
      </tr>
    </table>

    <!-- TIÊU ĐỀ BẢNG -->
    <div style="text-align:center; margin-bottom:15px;">
      <h2 style="font-size:17px; font-weight:bold; text-transform:uppercase; margin:0 0 4px 0; color:#0f172a;">${scopeTitle}</h2>
      <div style="font-size:13px; font-style:italic; color:#334155;">${subScopeInfo}</div>
      <div style="font-size:12px; margin-top:4px; font-weight:500; color:#0f172a;">
        <b>Sĩ số:</b> ${stats.studentScores.length} học sinh &nbsp;|&nbsp; 
        <b>Khen thưởng:</b> +${stats.totalPlus} lượt &nbsp;|&nbsp; 
        <b>Vi phạm:</b> -${stats.totalMinus} lượt
      </div>
      <div style="font-size:12px; margin-top:3px; color:#1e293b;">
        <b>Thống kê hạnh kiểm:</b> Tốt: <b>${countGood}</b> &nbsp;•&nbsp; Khá: <b>${countFair}</b> &nbsp;•&nbsp; Đạt: <b>${countPass}</b> &nbsp;•&nbsp; Chưa Đạt: <b>${countFail}</b>
      </div>
    </div>

    <!-- BẢNG ĐIỂM CHI TIẾT -->
    <table style="width:100%; border-collapse:collapse; font-size:12px; margin-bottom:15px;">
      <thead>
        <tr>${tableHeaderCols}</tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>

    <!-- XẾP HẠNG THI ĐUA TỔ -->
    <div style="margin-bottom:20px; padding:8px 12px; background:#f8fafc; border:1px dashed #64748b; font-size:12px; color:#0f172a;">
      <b>🏆 XẾP HẠNG THI ĐUA CÁC TỔ:</b> &nbsp;
      ${stats.teamRanks.map((t, idx) => `
        <span>Hạng ${idx + 1}: <b>Tổ ${t.team}</b> (${t.avgScore}đ)</span>${idx < stats.teamRanks.length - 1 ? ' &nbsp;•&nbsp; ' : ''}
      `).join('')}
    </div>

    <!-- CHỮ KÝ XÁC NHẬN PHÍA DƯỚI -->
    <table style="width:100%; border-collapse:collapse; margin-top:20px;">
      <tr>
        <td style="width:50%; text-align:center; vertical-align:top;">
          <div style="font-size:12px; text-transform:uppercase; font-weight:bold; color:#0f172a;">BAN GIÁM HIỆU / ĐOÀN TRƯỜNG</div>
          <div style="font-size:12px; font-style:italic; color:#64748b;">(Ký, ghi rõ họ tên và đóng dấu)</div>
          <div style="height:75px;"></div>
        </td>
        <td style="width:50%; text-align:center; vertical-align:top;">
          <div style="font-size:12px; font-style:italic; color:#334155; margin-bottom:3px;">${dateStr}</div>
          <div style="font-size:12px; text-transform:uppercase; font-weight:bold; color:#0f172a;">GIÁO VIÊN CHỦ NHIỆM</div>
          <div style="font-size:12px; font-style:italic; color:#64748b;">(Ký và ghi rõ họ tên)</div>
          <div style="height:60px;"></div>
          <div style="font-size:13px; font-weight:bold; text-transform:uppercase; color:#0f172a;">${teacherName}</div>
        </td>
      </tr>
    </table>
  `;

  // Create Preview Modal on Screen
  let modal = document.getElementById('pdf-preview-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'pdf-preview-modal';
  modal.className = 'fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto';

  modal.innerHTML = `
    <!-- TOP ACTION TOOLBAR -->
    <div class="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl p-3 mb-4 shadow-2xl flex items-center justify-between gap-2 flex-wrap">
      <div class="flex items-center gap-2">
        <span class="text-xl">📄</span>
        <div>
          <h4 class="text-xs sm:text-sm font-bold text-white uppercase">${scopeTitle}</h4>
          <p class="text-[11px] text-slate-400">Xem trước bản in A4 & Xuất file PDF chính thức</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="btn-do-download-pdf" class="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg active:scale-95 transition-all flex items-center gap-1.5 border border-rose-400/40">
          <i data-lucide="download" class="w-4 h-4"></i>
          <span>📥 Tải File PDF (.pdf)</span>
        </button>
        <button id="btn-do-print-direct" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white font-bold text-xs rounded-xl border border-indigo-500/30 shadow active:scale-95 transition-all flex items-center gap-1.5">
          <i data-lucide="printer" class="w-4 h-4"></i>
          <span>🖨️ In Trực Tiếp</span>
        </button>
        <button onclick="document.getElementById('pdf-preview-modal').remove()" class="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 text-xs">
          ✕ Đóng
        </button>
      </div>
    </div>

    <!-- A4 PAPER CONTAINER (ON SCREEN AT VISIBLE COORDINATES) -->
    <div id="a4-printable-sheet" style="width: 800px; max-width: 100%; background: #ffffff; color: #000000; font-family: 'Times New Roman', Times, serif; padding: 35px 35px; box-sizing: border-box; font-size: 13px; line-height: 1.4; border-radius: 8px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
      ${printDocumentHtml}
    </div>
  `;

  document.body.appendChild(modal);
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Handle Download PDF button
  document.getElementById('btn-do-download-pdf').onclick = function() {
    const sheetEl = document.getElementById('a4-printable-sheet');
    if (!sheetEl) return;

    showToast('Đang tạo và tải tệp PDF...', 'info');

    if (typeof html2pdf !== 'undefined') {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `Bang_Hanh_Kiem_${scope}_${scopeVal}_Lop_${curClass}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(sheetEl).save().then(() => {
        showToast('Đã tải tệp PDF thành công!', 'success');
      }).catch(err => {
        console.error('html2pdf error:', err);
        showToast('Đang mở hộp thoại in để lưu PDF...', 'info');
        window.print();
      });
    } else {
      window.print();
    }
  };

  // Handle Direct Print button
  document.getElementById('btn-do-print-direct').onclick = function() {
    const sheetEl = document.getElementById('a4-printable-sheet');
    if (!sheetEl) return;
    openPrintFallback(sheetEl, `Bang_Hanh_Kiem_${scope}_${scopeVal}_Lop_${curClass}`);
  };
}

function openPrintFallback(printContainer, title) {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta charset="UTF-8">
          <style>
            @page { size: A4 portrait; margin: 12mm; }
            body { font-family: "Times New Roman", Times, serif; color: #000; background: #fff; margin: 0; padding: 15px; }
            table { border-collapse: collapse; width: 100%; }
          </style>
        </head>
        <body>
          ${printContainer.innerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 300);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}


// ================= XUẤT PHIẾU BÁO ĐIỂM & RÈN LUYỆN CHI TIẾT (CÁ NHÂN & CẢ LỚP) =================
function exportSelectedStudentPdf() {
  const selectEl = document.getElementById('pdf-student-select');
  if (!selectEl) return;
  const studentCode = selectEl.value;
  if (studentCode === 'all') {
    exportAllStudentsDetailedPdf();
  } else {
    exportIndividualStudentPdf(studentCode);
  }
}

function exportCurrentStudentPdf() {
  const studentCode = appState.currentStudentCode;
  if (!studentCode) {
    showToast('Không xác định được mã học sinh!', 'warning');
    return;
  }
  exportIndividualStudentPdf(studentCode);
}

function generateStudentDetailedSheetHtml(student, scope, scopeVal, weeks, curClass, schoolName, teacherName) {
  const maxScore = weeks.length * 100;

  // Calculate student stats across scope
  let totalScore = 0;
  let totalPlusPts = 0;
  let totalMinusPts = 0;
  const weekBreakdown = [];

  weeks.forEach(w => {
    const st = calculateStudentScore(student.id, w);
    totalScore += st.score;
    totalPlusPts += st.plusPts;
    totalMinusPts += st.minusPts;
    weekBreakdown.push({ week: w, score: st.score, plus: st.plusPts, minus: st.minusPts });
  });

  const avgScore = weeks.length > 0 ? Number((totalScore / weeks.length).toFixed(1)) : 100;
  const conduct = calculateMonthlyConduct(totalScore, weeks.length);

  // Filter student logs in this scope
  const studentLogs = (appState.logs || []).filter(l => 
    weeks.includes(Number(l.week)) && 
    (l.studentId === student.id || l.studentCode === student.code || (l.studentName && l.studentName.trim().toLowerCase() === student.name.trim().toLowerCase()))
  );
  studentLogs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  let scopeTitle = `PHIẾU BÁO ĐIỂM THI ĐUA & RÈN LUYỆN THÁNG ${scopeVal}`;
  let subScopeInfo = `Thời gian: Tháng ${scopeVal} (Tuần ${weeks.join(', ')}) • Thang điểm chuẩn: ${maxScore} điểm`;
  if (scope === 'week') {
    scopeTitle = `PHIẾU BÁO ĐIỂM THI ĐUA & RÈN LUYỆN TUẦN ${scopeVal}`;
    subScopeInfo = `Thời gian: Tuần ${scopeVal} • Thang điểm chuẩn: 100 điểm`;
  } else if (scope === 'semester') {
    scopeTitle = `PHIẾU TỔNG KẾT RÈN LUYỆN HỌC KỲ ${scopeVal}`;
    subScopeInfo = `Thời gian: Học kỳ ${scopeVal} (Tuần ${weeks[0]} đến Tuần ${weeks[weeks.length - 1]})`;
  } else if (scope === 'year') {
    scopeTitle = `PHIẾU TỔNG KẾT RÈN LUYỆN CẢ NĂM HỌC`;
    subScopeInfo = `Năm học 2026 - 2027 (Từ Tuần 1 đến Tuần ${weeks[weeks.length - 1]})`;
  }

  const today = new Date();
  const dateStr = `Ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;

  // Build Logs Table
  let logsTableRows = '';
  if (studentLogs.length > 0) {
    studentLogs.forEach((log, idx) => {
      const isPlus = log.type === 'plus';
      const ptsVal = Math.abs(parseInt(log.pts !== undefined ? log.pts : 0) || 0);
      const ptsStr = isPlus ? `+${ptsVal}đ` : `-${ptsVal}đ`;
      const ptsColor = isPlus ? '#047857' : '#b91c1c';
      
      const timeStr = typeof formatVietnameseDateTime === 'function' && log.exactDate
        ? formatVietnameseDateTime(log.exactDate, log.timestamp)
        : (log.timestamp ? new Date(log.timestamp).toLocaleDateString('vi-VN') : `Tuần ${log.week}`);

      let periodStr = log.period || '';
      let subjectStr = log.subject || '';
      const timingParts = [];
      if (log.session && log.session.trim()) timingParts.push(log.session.trim());
      if (periodStr && periodStr.trim()) timingParts.push(periodStr.trim());
      if (subjectStr && subjectStr.trim()) timingParts.push(subjectStr.trim());
      const extraContext = timingParts.join(' • ');

      const critName = log.critTitle || log.title || log.reason || log.behavior || log.ruleName || 'Ghi nhận nề nếp';
      const authorName = log.loggedBy || log.author || log.recorder || 'GVCN';

      logsTableRows += `
        <tr style="${idx % 2 === 1 ? 'background:#f8fafc;' : 'background:#ffffff;'}">
          <td style="border:1px solid #cbd5e1; padding:6px 4px; text-align:center;">${idx + 1}</td>
          <td style="border:1px solid #cbd5e1; padding:6px 6px; text-align:center; font-size:11px;">
            ${timeStr}
            ${extraContext ? `<br><span style="color:#64748b; font-size:10px;">${extraContext}</span>` : ''}
          </td>
          <td style="border:1px solid #cbd5e1; padding:6px 6px; text-align:center; font-weight:bold; color:${ptsColor};">${isPlus ? 'Khen Thưởng (+)' : 'Vi Phạm (-)'}</td>
          <td style="border:1px solid #cbd5e1; padding:6px 8px; text-align:left;">
            <b>${critName}</b>
            ${log.note ? `<div style="font-size:11px; color:#475569; font-style:italic;">"${log.note}"</div>` : ''}
          </td>
          <td style="border:1px solid #cbd5e1; padding:6px 6px; text-align:center; font-weight:bold; font-size:13px; color:${ptsColor};">${ptsStr}</td>
          <td style="border:1px solid #cbd5e1; padding:6px 6px; text-align:center; font-size:11px;">${authorName}</td>
        </tr>
      `;
    });
  } else {
    logsTableRows = `
      <tr>
        <td colspan="6" style="border:1px solid #cbd5e1; padding:15px; text-align:center; color:#059669; font-weight:bold;">
          ✨ Trong suốt đợt rèn luyện này, học sinh duy trì nề nếp rất tốt, đạt trọn vẹn điểm chuẩn và không có vi phạm!
        </td>
      </tr>
    `;
  }

  // Week Breakdown pills
  let weekBoxesHtml = '';
  if (weeks.length > 1) {
    weekBoxesHtml = `
      <div style="margin-bottom:12px; padding:8px 10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px;">
        <b style="font-size:11px; color:#1e293b;">📊 ĐIỂM CHI TIẾT TỪNG TUẦN:</b>
        <div style="display:flex; gap:8px; margin-top:4px; flex-wrap:wrap;">
          ${weekBreakdown.map(wb => `
            <div style="padding:3px 6px; background:#ffffff; border:1px solid #cbd5e1; border-radius:4px; font-size:10px;">
              <b>Tuần ${wb.week}:</b> <span style="font-weight:bold; color:${wb.score >= 90 ? '#047857' : (wb.score >= 75 ? '#1d4ed8' : '#b91c1c')};">${wb.score}đ</span>
              <span style="color:#64748b; font-size:9px;">(+${wb.plus} / -${wb.minus})</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <!-- HEADER QUỐC HIỆU & ĐƠN VỊ -->
    <table style="width:100%; border-collapse:collapse; margin-bottom:12px;">
      <tr>
        <td style="width:45%; text-align:center; vertical-align:top;">
          <div style="font-size:11px; text-transform:uppercase; font-weight:bold; color:#0f172a;">SỞ GIÁO DỤC VÀ ĐÀO TẠO</div>
          <div style="font-size:12px; text-transform:uppercase; font-weight:bold; color:#0f172a;">${schoolName}</div>
          <div style="font-size:12px; font-weight:bold; color:#1e293b; margin-top:2px;">LỚP: ${curClass}</div>
          <div style="width:70px; height:1px; background:#0f172a; margin:3px auto 0;"></div>
        </td>
        <td style="width:55%; text-align:center; vertical-align:top;">
          <div style="font-size:11px; text-transform:uppercase; font-weight:bold; color:#0f172a;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div style="font-size:12px; font-weight:bold; color:#0f172a;">Độc lập - Tự do - Hạnh phúc</div>
          <div style="width:110px; height:1px; background:#0f172a; margin:3px auto 0;"></div>
        </td>
      </tr>
    </table>

    <!-- TIÊU ĐỀ PHIẾU -->
    <div style="text-align:center; margin-bottom:12px;">
      <h2 style="font-size:16px; font-weight:bold; text-transform:uppercase; margin:0 0 3px 0; color:#0f172a;">${scopeTitle}</h2>
      <div style="font-size:12px; font-style:italic; color:#334155;">${subScopeInfo}</div>
    </div>

    <!-- KHUNG THÔNG TIN HỌC SINH -->
    <table style="width:100%; border-collapse:collapse; background:#f8fafc; border:1px solid #cbd5e1; font-size:12px; margin-bottom:12px;">
      <tr>
        <td style="padding:6px 10px; width:35%;"><b>Họ và tên học sinh:</b> <span style="font-size:13px; font-weight:bold; color:#0f172a;">${student.name}</span></td>
        <td style="padding:6px 10px; width:25%;"><b>Mã học sinh:</b> <span style="font-family:monospace; font-weight:bold; color:#0f172a;">${student.code}</span></td>
        <td style="padding:6px 10px; width:20%;"><b>Thuộc:</b> <span style="font-weight:bold; color:#0f172a;">Tổ ${student.team}</span></td>
        <td style="padding:6px 10px; width:20%;"><b>Chức vụ:</b> <span style="font-weight:bold; color:#0f172a;">${student.role === 'monitor' ? 'Lớp Trưởng' : (student.role === 'vice_monitor' ? 'Lớp Phó' : (student.role === 'leader' ? 'Tổ Trưởng' : 'Học Sinh'))}</span></td>
      </tr>
    </table>

    <!-- KHUNG TỔNG KẾT ĐIỂM SỐ & HẠNH KIỂM -->
    <table style="width:100%; border-collapse:collapse; margin-bottom:12px; text-align:center; font-size:12px;">
      <tr>
        <td style="border:1px solid #cbd5e1; padding:6px; width:25%; background:#f1f5f9;">
          <div style="font-size:10px; color:#475569;">Điểm Tích Lũy</div>
          <div style="font-size:15px; font-weight:black; color:#0f172a; margin-top:2px;">${totalScore} / ${maxScore}đ</div>
        </td>
        <td style="border:1px solid #cbd5e1; padding:6px; width:25%; background:#f1f5f9;">
          <div style="font-size:10px; color:#475569;">Điểm Trung Bình / Tuần</div>
          <div style="font-size:15px; font-weight:black; color:#1e3a8a; margin-top:2px;">${avgScore}đ</div>
        </td>
        <td style="border:1px solid #cbd5e1; padding:6px; width:25%; background:#f1f5f9;">
          <div style="font-size:10px; color:#475569;">Tổng Thưởng / Phạt</div>
          <div style="font-size:12px; font-weight:bold; margin-top:3px;">
            <span style="color:#047857;">+${totalPlusPts}đ</span> / <span style="color:#b91c1c;">-${totalMinusPts}đ</span>
          </div>
        </td>
        <td style="border:1px solid #cbd5e1; padding:6px; width:25%; background:#f1f5f9;">
          <div style="font-size:10px; color:#475569;">Xếp Loại Hạnh Kiểm</div>
          <div style="font-size:15px; font-weight:black; color:${conduct.rank === 'Tốt' ? '#047857' : (conduct.rank === 'Khá' ? '#1d4ed8' : '#b91c1c')}; margin-top:2px;">
            ${conduct.rank.toUpperCase()}
          </div>
        </td>
      </tr>
    </table>

    ${weekBoxesHtml}

    <!-- BẢNG CHI TIẾT CÁC LƯỢT KHEN THƯỞNG & VI PHẠM -->
    <div style="font-size:11px; font-weight:bold; margin-bottom:5px; color:#0f172a; text-transform:uppercase;">
      📋 NHẬT KÝ CHI TIẾT CÁC LƯỢT THƯỞNG & VI PHẠM TRONG KỲ:
    </div>
    <table style="width:100%; border-collapse:collapse; font-size:11px; margin-bottom:12px;">
      <thead>
        <tr style="background:#f1f5f9;">
          <th style="border:1px solid #1e293b; padding:5px 4px; text-align:center; width:30px;">STT</th>
          <th style="border:1px solid #1e293b; padding:5px 5px; text-align:center; width:95px;">Thời Gian</th>
          <th style="border:1px solid #1e293b; padding:5px 5px; text-align:center; width:90px;">Phân Loại</th>
          <th style="border:1px solid #1e293b; padding:5px 7px; text-align:left;">Nội Dung / Hành Vi Chi Tiết</th>
          <th style="border:1px solid #1e293b; padding:5px 5px; text-align:center; width:60px;">Điểm</th>
          <th style="border:1px solid #1e293b; padding:5px 5px; text-align:center; width:70px;">Ghi Nhận</th>
        </tr>
      </thead>
      <tbody>
        ${logsTableRows}
      </tbody>
    </table>

    <!-- LỜI NHẮC NHỞ / NHẬN XÉT CỦA GVCN -->
    <div style="margin-bottom:15px; padding:8px 10px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; font-size:11px;">
      <b style="color:#0f172a;">📝 NHẬN XÉT CỦA GIÁO VIÊN CHỦ NHIỆM:</b>
      <div style="margin-top:3px; font-style:italic; color:#334155; line-height:1.4;">
        ${student.name} có kết quả rèn luyện đạt mức <b>${conduct.rank}</b>. ${conduct.desc}. Đề nghị học sinh tiếp tục phát huy các ưu điểm và phối hợp cùng gia đình khắc phục những hạn chế để ngày càng tiến bộ hơn!
      </div>
    </div>

    <!-- CHỮ KÝ XÁC NHẬN PHÍA DƯỚI -->
    <table style="width:100%; border-collapse:collapse; margin-top:15px;">
      <tr>
        <td style="width:50%; text-align:center; vertical-align:top;">
          <div style="font-size:11px; text-transform:uppercase; font-weight:bold; color:#0f172a;">Ý KIẾN PHỤ HUYNH HỌC SINH</div>
          <div style="font-size:11px; font-style:italic; color:#64748b;">(Ký và ghi rõ họ tên)</div>
          <div style="height:55px;"></div>
        </td>
        <td style="width:50%; text-align:center; vertical-align:top;">
          <div style="font-size:11px; font-style:italic; color:#334155; margin-bottom:2px;">${dateStr}</div>
          <div style="font-size:11px; text-transform:uppercase; font-weight:bold; color:#0f172a;">GIÁO VIÊN CHỦ NHIỆM</div>
          <div style="font-size:11px; font-style:italic; color:#64748b;">(Ký và ghi rõ họ tên)</div>
          <div style="height:50px;"></div>
          <div style="font-size:12px; font-weight:bold; text-transform:uppercase; color:#0f172a;">${teacherName}</div>
        </td>
      </tr>
    </table>
  `;
}

// 🖨️ IN / XUẤT PDF CHI TIẾT TOÀN BỘ HỌC SINH CẢ LỚP (MỖI HỌC SINH 1 TRANG HOÀN CHỈNH)
function exportAllStudentsDetailedPdf() {
  const classStudents = getCurrentClassStudents();
  if (!classStudents || classStudents.length === 0) {
    showToast('Lớp chưa có danh sách học sinh để xuất phiếu!', 'warning');
    return;
  }

  const scope = appState.reportScope || 'month';
  const scopeVal = parseInt(document.getElementById('scope-select-val')?.value) || 1;
  const curClass = (appState.classInfo?.className || '10A1').toUpperCase();
  const schoolName = (appState.classInfo?.schoolName || 'TRƯỜNG THPT VỌNG THÊ').toUpperCase();
  const teacherName = appState.classInfo?.teacherName || 'GVCN';
  const weeks = getWeeksForCurrentScope();

  let scopeLabel = `Tháng ${scopeVal}`;
  if (scope === 'week') scopeLabel = `Tuần ${scopeVal}`;
  else if (scope === 'semester') scopeLabel = `Học Kỳ ${scopeVal}`;
  else if (scope === 'year') scopeLabel = `Cả Năm`;

  showToast(`Đang tổng hợp ${classStudents.length} phiếu chi tiết cả lớp...`, 'info');

  let allPagesHtml = '';
  classStudents.forEach((student, idx) => {
    const sheetHtml = generateStudentDetailedSheetHtml(student, scope, scopeVal, weeks, curClass, schoolName, teacherName);
    allPagesHtml += `
      <div class="student-report-page" style="page-break-after: always; break-after: page; padding: 25px 30px; margin-bottom: 25px; background: #ffffff; border-radius: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); ${idx > 0 ? 'margin-top: 30px;' : ''}">
        ${sheetHtml}
      </div>
    `;
  });

  let modal = document.getElementById('pdf-preview-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'pdf-preview-modal';
  modal.className = 'fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto';

  modal.innerHTML = `
    <!-- TOP ACTION TOOLBAR -->
    <div class="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl p-3 mb-4 shadow-2xl flex items-center justify-between gap-2 flex-wrap sticky top-0 z-50">
      <div class="flex items-center gap-2">
        <span class="text-xl">🖨️</span>
        <div>
          <h4 class="text-xs sm:text-sm font-bold text-white uppercase">PHIẾU CHI TIẾT CẢ LỚP ${curClass} (${scopeLabel})</h4>
          <p class="text-[11px] text-emerald-400 font-semibold">Gồm ${classStudents.length} học sinh • Tự động ngắt trang A4 chuẩn từng em</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="btn-do-print-all" class="px-4 py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg active:scale-95 transition-all flex items-center gap-1.5 border border-emerald-400/40">
          <i data-lucide="printer" class="w-4 h-4 text-amber-300"></i>
          <span>🖨️ In / Lưu PDF Toàn Bộ Lớp</span>
        </button>
        <button onclick="document.getElementById('pdf-preview-modal').remove()" class="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 text-xs">
          ✕ Đóng
        </button>
      </div>
    </div>

    <!-- MULTI-PAGE CONTAINER -->
    <div id="all-students-printable-sheet" style="width: 820px; max-width: 100%; color: #000000; font-family: 'Times New Roman', Times, serif; box-sizing: border-box; font-size: 13px; line-height: 1.4;">
      ${allPagesHtml}
    </div>
  `;

  document.body.appendChild(modal);
  if (typeof lucide !== 'undefined') lucide.createIcons();

  document.getElementById('btn-do-print-all').onclick = function() {
    const printDoc = document.getElementById('all-students-printable-sheet');
    if (!printDoc) return;
    openMultiPagePrint(printDoc, `Phieu_Ren_Luyen_Chi_Tiet_Lop_${curClass}_${scopeLabel.replace(/\s+/g, '_')}`);
  };
}

function openMultiPagePrint(container, title) {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta charset="UTF-8">
          <style>
            @page { size: A4 portrait; margin: 12mm 12mm 12mm 12mm; }
            body { font-family: "Times New Roman", Times, serif; color: #000; background: #fff; margin: 0; padding: 0; }
            table { border-collapse: collapse; width: 100%; }
            .student-report-page {
              page-break-after: always !important;
              break-after: page !important;
              box-shadow: none !important;
              padding: 0 0 20px 0 !important;
              margin-bottom: 0 !important;
            }
            .student-report-page:last-child {
              page-break-after: avoid !important;
              break-after: avoid !important;
            }
          </style>
        </head>
        <body>
          ${container.innerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 400);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}

function exportIndividualStudentPdf(studentCode) {
  const scope = appState.reportScope || 'month';
  const scopeVal = parseInt(document.getElementById('scope-select-val')?.value) || 1;
  const curClass = (appState.classInfo?.className || '10A1').toUpperCase();
  const schoolName = (appState.classInfo?.schoolName || 'TRƯỜNG THPT VỌNG THÊ').toUpperCase();
  const teacherName = appState.classInfo?.teacherName || 'Thầy Phạm Anh Dũng';
  const weeks = getWeeksForCurrentScope();
  const maxScore = weeks.length * 100;

  const classStudents = getCurrentClassStudents();
  const student = classStudents.find(s => s.code && s.code.toUpperCase() === (studentCode || '').toUpperCase()) 
    || classStudents[0];

  if (!student) {
    showToast('Vui lòng chọn một học sinh!', 'warning');
    return;
  }

  // Calculate student stats across scope
  let totalScore = 0;
  let totalPlusPts = 0;
  let totalMinusPts = 0;
  const weekBreakdown = [];

  weeks.forEach(w => {
    const st = calculateStudentScore(student.id, w);
    totalScore += st.score;
    totalPlusPts += st.plusPts;
    totalMinusPts += st.minusPts;
    weekBreakdown.push({ week: w, score: st.score, plus: st.plusPts, minus: st.minusPts });
  });

  const avgScore = weeks.length > 0 ? Number((totalScore / weeks.length).toFixed(1)) : 100;
  const conduct = calculateMonthlyConduct(totalScore, weeks.length);

  // Filter student logs in this scope
  const studentLogs = appState.logs.filter(l => 
    weeks.includes(l.week) && 
    (l.studentId === student.id || l.studentCode === student.code || (l.studentName && l.studentName.trim().toLowerCase() === student.name.trim().toLowerCase()))
  );
  studentLogs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  let scopeTitle = `PHIẾU BÁO ĐIỂM THI ĐUA & RÈN LUYỆN THÁNG ${scopeVal}`;
  let subScopeInfo = `Thời gian: Tháng ${scopeVal} (Tuần ${weeks.join(', ')}) • Thang điểm chuẩn: ${maxScore} điểm`;
  if (scope === 'week') {
    scopeTitle = `PHIẾU BÁO ĐIỂM THI ĐUA & RÈN LUYỆN TUẦN ${scopeVal}`;
    subScopeInfo = `Thời gian: Tuần ${scopeVal} • Thang điểm chuẩn: 100 điểm`;
  } else if (scope === 'semester') {
    scopeTitle = `PHIẾU TỔNG KẾT RÈN LUYỆN HỌC KỲ ${scopeVal}`;
    subScopeInfo = `Thời gian: Học kỳ ${scopeVal} (Tuần ${weeks[0]} đến Tuần ${weeks[weeks.length - 1]})`;
  } else if (scope === 'year') {
    scopeTitle = `PHIẾU TỔNG KẾT RÈN LUYỆN CẢ NĂM HỌC`;
    subScopeInfo = `Năm học 2026 - 2027 (Từ Tuần 1 đến Tuần ${weeks[weeks.length - 1]})`;
  }

  const today = new Date();
  const dateStr = `Ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;

  // Build Logs Table
  let logsTableRows = '';
  if (studentLogs.length > 0) {
    studentLogs.forEach((log, idx) => {
      const isPlus = log.type === 'plus';
      const ptsVal = Math.abs(parseInt(log.pts !== undefined ? log.pts : (log.points !== undefined ? log.points : (log.ptsValue !== undefined ? log.ptsValue : 0))) || 0);
      const ptsStr = isPlus ? `+${ptsVal}đ` : `-${ptsVal}đ`;
      const ptsColor = isPlus ? '#047857' : '#b91c1c';
      
      const timeStr = typeof formatVietnameseDateTime === 'function' && log.exactDate
        ? formatVietnameseDateTime(log.exactDate, log.timestamp)
        : (log.timestamp ? new Date(log.timestamp).toLocaleDateString('vi-VN') : `Tuần ${log.week}`);

      let periodStr = log.period || '';
      if (periodStr && !periodStr.toLowerCase().startsWith('tiết')) {
        periodStr = `Tiết ${periodStr}`;
      }

      let subjectStr = log.subject || '';
      if (subjectStr && !subjectStr.toLowerCase().startsWith('môn')) {
        subjectStr = `Môn ${subjectStr}`;
      }

      const extraContext = [periodStr, subjectStr].filter(Boolean).join(' • ');
      const critName = log.critTitle || log.title || log.reason || log.behavior || log.ruleName || 'Ghi nhận nề nếp';
      const authorName = log.loggedBy || log.author || log.recordedBy || 'GVCN';

      logsTableRows += `
        <tr style="${idx % 2 === 1 ? 'background:#f8fafc;' : 'background:#ffffff;'}">
          <td style="border:1px solid #cbd5e1; padding:6px 4px; text-align:center;">${idx + 1}</td>
          <td style="border:1px solid #cbd5e1; padding:6px 6px; text-align:center; font-size:11px;">
            ${timeStr}
            ${extraContext ? `<br><span style="color:#64748b; font-size:10px;">${extraContext}</span>` : ''}
          </td>
          <td style="border:1px solid #cbd5e1; padding:6px 6px; text-align:center; font-weight:bold; color:${ptsColor};">${isPlus ? 'Khen Thưởng (+)' : 'Vi Phạm (-)'}</td>
          <td style="border:1px solid #cbd5e1; padding:6px 8px; text-align:left;">
            <b>${critName}</b>
            ${log.note ? `<div style="font-size:11px; color:#475569; font-style:italic;">"${log.note}"</div>` : ''}
          </td>
          <td style="border:1px solid #cbd5e1; padding:6px 6px; text-align:center; font-weight:bold; font-size:13px; color:${ptsColor};">${ptsStr}</td>
          <td style="border:1px solid #cbd5e1; padding:6px 6px; text-align:center; font-size:11px;">${authorName}</td>
        </tr>
      `;
    });
  } else {
    logsTableRows = `
      <tr>
        <td colspan="6" style="border:1px solid #cbd5e1; padding:15px; text-align:center; color:#059669; font-weight:bold;">
          ✨ Trong suốt đợt rèn luyện này, học sinh duy trì nề nếp rất tốt, đạt trọn vẹn điểm chuẩn và không có vi phạm!
        </td>
      </tr>
    `;
  }

  // Week Breakdown pills
  let weekBoxesHtml = '';
  if (weeks.length > 1) {
    weekBoxesHtml = `
      <div style="margin-bottom:15px; padding:10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px;">
        <b style="font-size:12px; color:#1e293b;">📊 ĐIỂM CHI TIẾT TỪNG TUẦN:</b>
        <div style="display:flex; gap:10px; margin-top:6px; flex-wrap:wrap;">
          ${weekBreakdown.map(wb => `
            <div style="padding:4px 8px; background:#ffffff; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;">
              <b>Tuần ${wb.week}:</b> <span style="font-weight:bold; color:${wb.score >= 90 ? '#047857' : (wb.score >= 75 ? '#1d4ed8' : '#b91c1c')};">${wb.score}đ</span>
              <span style="color:#64748b; font-size:10px;">(+${wb.plus} / -${wb.minus})</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  const printDocumentHtml = generateStudentDetailedSheetHtml(student, scope, scopeVal, weeks, curClass, schoolName, teacherName);
  const _dummyOldHtml = `
      <tr>
        <td style="width:45%; text-align:center; vertical-align:top;">
          <div style="font-size:12px; text-transform:uppercase; font-weight:bold; color:#0f172a;">SỞ GIÁO DỤC VÀ ĐÀO TẠO</div>
          <div style="font-size:13px; text-transform:uppercase; font-weight:bold; color:#0f172a;">${schoolName}</div>
          <div style="font-size:13px; font-weight:bold; color:#1e293b; margin-top:2px;">LỚP: ${curClass}</div>
          <div style="width:80px; height:1px; background:#0f172a; margin:4px auto 0;"></div>
        </td>
        <td style="width:55%; text-align:center; vertical-align:top;">
          <div style="font-size:12px; text-transform:uppercase; font-weight:bold; color:#0f172a;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div style="font-size:13px; font-weight:bold; color:#0f172a;">Độc lập - Tự do - Hạnh phúc</div>
          <div style="width:120px; height:1px; background:#0f172a; margin:4px auto 0;"></div>
        </td>
      </tr>
    </table>

    <!-- TIÊU ĐỀ PHIẾU -->
    <div style="text-align:center; margin-bottom:15px;">
      <h2 style="font-size:17px; font-weight:bold; text-transform:uppercase; margin:0 0 4px 0; color:#0f172a;">${scopeTitle}</h2>
      <div style="font-size:13px; font-style:italic; color:#334155;">${subScopeInfo}</div>
    </div>

    <!-- KHUNG THÔNG TIN HỌC SINH -->
    <table style="width:100%; border-collapse:collapse; background:#f8fafc; border:1px solid #cbd5e1; font-size:12px; margin-bottom:15px;">
      <tr>
        <td style="padding:8px 12px; width:35%;"><b>Họ và tên học sinh:</b> <span style="font-size:13px; font-weight:bold; color:#0f172a;">${student.name}</span></td>
        <td style="padding:8px 12px; width:25%;"><b>Mã học sinh:</b> <span style="font-family:monospace; font-weight:bold; color:#0f172a;">${student.code}</span></td>
        <td style="padding:8px 12px; width:20%;"><b>Thuộc:</b> <span style="font-weight:bold; color:#0f172a;">Tổ ${student.team}</span></td>
        <td style="padding:8px 12px; width:20%;"><b>Chức vụ:</b> <span style="font-weight:bold; color:#0f172a;">${student.role === 'monitor' ? 'Lớp Trưởng' : (student.role === 'vice_monitor' ? 'Lớp Phó' : (student.role === 'leader' ? 'Tổ Trưởng' : 'Học Sinh'))}</span></td>
      </tr>
    </table>

    <!-- KHUNG TỔNG KẾT ĐIỂM SỐ & HẠNH KIỂM -->
    <table style="width:100%; border-collapse:collapse; margin-bottom:15px; text-align:center; font-size:12px;">
      <tr>
        <td style="border:1px solid #cbd5e1; padding:8px; width:25%; background:#f1f5f9;">
          <div style="font-size:11px; color:#475569;">Điểm Tích Lũy</div>
          <div style="font-size:16px; font-weight:black; color:#0f172a; margin-top:2px;">${totalScore} / ${maxScore}đ</div>
        </td>
        <td style="border:1px solid #cbd5e1; padding:8px; width:25%; background:#f1f5f9;">
          <div style="font-size:11px; color:#475569;">Điểm Trung Bình / Tuần</div>
          <div style="font-size:16px; font-weight:black; color:#1e3a8a; margin-top:2px;">${avgScore}đ</div>
        </td>
        <td style="border:1px solid #cbd5e1; padding:8px; width:25%; background:#f1f5f9;">
          <div style="font-size:11px; color:#475569;">Tổng Thưởng / Phạt</div>
          <div style="font-size:13px; font-weight:bold; margin-top:4px;">
            <span style="color:#047857;">+${totalPlusPts}đ</span> / <span style="color:#b91c1c;">-${totalMinusPts}đ</span>
          </div>
        </td>
        <td style="border:1px solid #cbd5e1; padding:8px; width:25%; background:#f1f5f9;">
          <div style="font-size:11px; color:#475569;">Xếp Loại Hạnh Kiểm</div>
          <div style="font-size:16px; font-weight:black; color:${conduct.rank === 'Tốt' ? '#047857' : (conduct.rank === 'Khá' ? '#1d4ed8' : '#b91c1c')}; margin-top:2px;">
            ${conduct.rank.toUpperCase()}
          </div>
        </td>
      </tr>
    </table>

    ${weekBoxesHtml}

    <!-- BẢNG CHI TIẾT CÁC LƯỢT KHEN THƯỞNG & VI PHẠM -->
    <div style="font-size:12px; font-weight:bold; margin-bottom:6px; color:#0f172a; text-transform:uppercase;">
      📋 NHẬT KÝ CHI TIẾT CÁC LƯỢT THƯỞNG & VI PHẠM TRONG KỲ:
    </div>
    <table style="width:100%; border-collapse:collapse; font-size:12px; margin-bottom:15px;">
      <thead>
        <tr style="background:#f1f5f9;">
          <th style="border:1px solid #1e293b; padding:6px 4px; text-align:center; width:35px;">STT</th>
          <th style="border:1px solid #1e293b; padding:6px 6px; text-align:center; width:100px;">Thời Gian</th>
          <th style="border:1px solid #1e293b; padding:6px 6px; text-align:center; width:95px;">Phân Loại</th>
          <th style="border:1px solid #1e293b; padding:6px 8px; text-align:left;">Nội Dung / Hành Vi Chi Tiết</th>
          <th style="border:1px solid #1e293b; padding:6px 6px; text-align:center; width:65px;">Điểm</th>
          <th style="border:1px solid #1e293b; padding:6px 6px; text-align:center; width:75px;">Ghi Nhận</th>
        </tr>
      </thead>
      <tbody>
        ${logsTableRows}
      </tbody>
    </table>

    <!-- LỜI NHẮC NHỞ / NHẬN XÉT CỦA GVCN -->
    <div style="margin-bottom:20px; padding:10px 12px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; font-size:12px;">
      <b style="color:#0f172a;">📝 NHẬN XÉT CỦA GIÁO VIÊN CHỦ NHIỆM:</b>
      <div style="margin-top:4px; font-style:italic; color:#334155; line-height:1.5;">
        ${student.name} có kết quả rèn luyện đạt mức <b>${conduct.rank}</b>. ${conduct.desc}. Đề nghị học sinh tiếp tục phát huy các ưu điểm và phối hợp cùng gia đình khắc phục những hạn chế nếu có để ngày càng tiến bộ hơn!
      </div>
    </div>

    <!-- CHỮ KÝ XÁC NHẬN PHÍA DƯỚI -->
    <table style="width:100%; border-collapse:collapse; margin-top:20px;">
      <tr>
        <td style="width:50%; text-align:center; vertical-align:top;">
          <div style="font-size:12px; text-transform:uppercase; font-weight:bold; color:#0f172a;">Ý KIẾN PHỤ HUYNH HỌC SINH</div>
          <div style="font-size:12px; font-style:italic; color:#64748b;">(Ký và ghi rõ họ tên)</div>
          <div style="height:70px;"></div>
        </td>
        <td style="width:50%; text-align:center; vertical-align:top;">
          <div style="font-size:12px; font-style:italic; color:#334155; margin-bottom:3px;">${dateStr}</div>
          <div style="font-size:12px; text-transform:uppercase; font-weight:bold; color:#0f172a;">GIÁO VIÊN CHỦ NHIỆM</div>
          <div style="font-size:12px; font-style:italic; color:#64748b;">(Ký và ghi rõ họ tên)</div>
          <div style="height:60px;"></div>
          <div style="font-size:13px; font-weight:bold; text-transform:uppercase; color:#0f172a;">${teacherName}</div>
        </td>
      </tr>
    </table>
  `;

  // Create Preview Modal on Screen
  let modal = document.getElementById('pdf-preview-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'pdf-preview-modal';
  modal.className = 'fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto';

  modal.innerHTML = `
    <!-- TOP ACTION TOOLBAR -->
    <div class="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl p-3 mb-4 shadow-2xl flex items-center justify-between gap-2 flex-wrap">
      <div class="flex items-center gap-2">
        <span class="text-xl">👤</span>
        <div>
          <h4 class="text-xs sm:text-sm font-bold text-white uppercase">${scopeTitle} - ${student.name}</h4>
          <p class="text-[11px] text-slate-400">Xem trước Phiếu Rèn Luyện Cá Nhân & Xuất file PDF</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="btn-do-download-pdf-ind" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg active:scale-95 transition-all flex items-center gap-1.5 border border-purple-400/40">
          <i data-lucide="download" class="w-4 h-4"></i>
          <span>📥 Tải Phiếu PDF (.pdf)</span>
        </button>
        <button id="btn-do-print-direct-ind" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white font-bold text-xs rounded-xl border border-indigo-500/30 shadow active:scale-95 transition-all flex items-center gap-1.5">
          <i data-lucide="printer" class="w-4 h-4"></i>
          <span>🖨️ In Trực Tiếp</span>
        </button>
        <button onclick="document.getElementById('pdf-preview-modal').remove()" class="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 text-xs">
          ✕ Đóng
        </button>
      </div>
    </div>

    <!-- A4 PAPER CONTAINER -->
    <div id="a4-printable-sheet-ind" style="width: 800px; max-width: 100%; background: #ffffff; color: #000000; font-family: 'Times New Roman', Times, serif; padding: 35px 35px; box-sizing: border-box; font-size: 13px; line-height: 1.4; border-radius: 8px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
      ${printDocumentHtml}
    </div>
  `;

  document.body.appendChild(modal);
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Handle Download PDF button
  document.getElementById('btn-do-download-pdf-ind').onclick = function() {
    const sheetEl = document.getElementById('a4-printable-sheet-ind');
    if (!sheetEl) return;

    showToast('Đang tạo và tải Phiếu PDF cá nhân...', 'info');

    if (typeof html2pdf !== 'undefined') {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `Phieu_Ren_Luyen_${student.code}_${student.name.replace(/\s+/g, '_')}_${scope}_${scopeVal}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(sheetEl).save().then(() => {
        showToast('Đã tải Phiếu PDF cá nhân thành công!', 'success');
      }).catch(err => {
        console.error('html2pdf error:', err);
        window.print();
      });
    } else {
      window.print();
    }
  };

  // Handle Direct Print button
  document.getElementById('btn-do-print-direct-ind').onclick = function() {
    const sheetEl = document.getElementById('a4-printable-sheet-ind');
    if (!sheetEl) return;
    openPrintFallback(sheetEl, `Phieu_Ren_Luyen_${student.code}_${student.name}`);
  };
}

// ================= 18. QUẢN LÝ TIÊU CHÍ THI ĐUA (KHEN THƯỞNG & VI PHẠM) =================
let currentCritMgrFilter = 'all';

function openCriteriaManagerModal() {
  const modal = document.getElementById('criteria-manager-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  resetCriteriaForm();
  renderCriteriaManagerList();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeCriteriaManagerModal() {
  const modal = document.getElementById('criteria-manager-modal');
  if (modal) modal.classList.add('hidden');
}

function filterCriteriaManagerTab(type) {
  currentCritMgrFilter = type;
  ['all', 'plus', 'minus'].forEach(t => {
    const btn = document.getElementById(`crit-mgr-tab-${t}`);
    if (btn) {
      if (t === type) {
        btn.className = 'px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold shadow';
      } else {
        btn.className = 'px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white font-bold';
      }
    }
  });
  renderCriteriaManagerList();
}

function renderCriteriaManagerList() {
  const container = document.getElementById('criteria-manager-list');
  const countBadge = document.getElementById('criteria-total-count-badge');
  if (!container) return;

  if (countBadge) {
    countBadge.innerText = `${(appState.criteria || []).length} tiêu chí`;
  }

  let list = appState.criteria || [];
  if (currentCritMgrFilter === 'plus') {
    list = list.filter(c => c.type === 'plus');
  } else if (currentCritMgrFilter === 'minus') {
    list = list.filter(c => c.type === 'minus');
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-4 text-center text-slate-400 text-xs italic bg-slate-950/60 rounded-xl border border-slate-800">
        Chưa có tiêu chí nào trong danh mục này. Thầy Cô có thể bấm "+ Thêm Tiêu Chí Mới" phía trên!
      </div>
    `;
    return;
  }

  const catNames = {
    'hoctap': '📚 Học tập',
    'tacphong': '👔 Tác phong',
    'kydis': '🤝 Kỷ luật',
    'phongtrao': '🌟 Phong trào'
  };

  let html = '';
  list.forEach((crit, idx) => {
    const isPlus = crit.type === 'plus';
    const pts = Math.abs(parseInt(crit.pts) || 5);
    const ptsBadge = isPlus ? `+${pts}đ` : `-${pts}đ`;
    const badgeColor = isPlus ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

    html += `
      <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 shadow-sm">
        <div class="min-w-0 flex items-center gap-2">
          <span class="text-xs font-black px-2 py-0.5 rounded-md border ${badgeColor} whitespace-nowrap">${ptsBadge}</span>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-bold text-xs text-white truncate">${crit.title}</span>
              <span class="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-indigo-300 font-semibold border border-slate-700">${catNames[crit.cat] || 'Khác'}</span>
            </div>
            ${crit.desc ? `<p class="text-[10px] text-slate-400 truncate mt-0.5">${crit.desc}</p>` : ''}
          </div>
        </div>
        <div class="flex items-center gap-1 flex-shrink-0">
          <button onclick="editCriterion('${crit.id}')" class="p-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-700 text-indigo-300 hover:text-white transition-colors" title="Sửa tiêu chí">
            <i data-lucide="edit" class="w-3.5 h-3.5"></i>
          </button>
          <button onclick="deleteCriterion('${crit.id}')" class="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-800 text-rose-400 hover:text-white transition-colors" title="Xóa tiêu chí">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function saveCriterionFromForm() {
  const editId = document.getElementById('crit-edit-id')?.value.trim();
  const title = document.getElementById('crit-form-title-input')?.value.trim();
  const cat = document.getElementById('crit-form-cat')?.value || 'hoctap';
  const type = document.getElementById('crit-form-type')?.value || 'minus';
  const ptsRaw = parseInt(document.getElementById('crit-form-pts')?.value) || 5;
  const desc = document.getElementById('crit-form-desc')?.value.trim() || '';

  if (!title) {
    showToast('Vui lòng nhập tên hành vi / tiêu chí!', 'warning');
    return;
  }

  const finalPts = type === 'plus' ? Math.abs(ptsRaw) : -Math.abs(ptsRaw);

  if (editId) {
    const idx = (appState.criteria || []).findIndex(c => c.id === editId);
    if (idx >= 0) {
      appState.criteria[idx].title = title;
      appState.criteria[idx].cat = cat;
      appState.criteria[idx].type = type;
      appState.criteria[idx].pts = finalPts;
      appState.criteria[idx].desc = desc;
      showToast(`Đã cập nhật tiêu chí "${title}" (${finalPts > 0 ? '+' : ''}${finalPts}đ)!`, 'success');
    }
  } else {
    const newCrit = {
      id: 'crit_' + Date.now(),
      title: title,
      cat: cat,
      type: type,
      pts: finalPts,
      desc: desc,
      icon: type === 'plus' ? 'award' : 'alert-circle'
    };
    if (!Array.isArray(appState.criteria)) appState.criteria = [];
    appState.criteria.unshift(newCrit);
    showToast(`Đã thêm mới tiêu chí "${title}" (${finalPts > 0 ? '+' : ''}${finalPts}đ)!`, 'success');
  }

  saveCriteriaState();
  resetCriteriaForm();
  renderCriteriaManagerList();
  renderCriteria(); // Refresh scoring modal
}

function editCriterion(critId) {
  const crit = (appState.criteria || []).find(c => c.id === critId);
  if (!crit) return;

  document.getElementById('crit-edit-id').value = crit.id;
  document.getElementById('crit-form-title-input').value = crit.title;
  document.getElementById('crit-form-cat').value = crit.cat || 'hoctap';
  document.getElementById('crit-form-type').value = crit.type || 'minus';
  document.getElementById('crit-form-pts').value = Math.abs(crit.pts || 5);
  document.getElementById('crit-form-desc').value = crit.desc || '';

  document.getElementById('crit-form-title').innerText = `✏️ Sửa Tiêu Chí: "${crit.title}"`;
  document.getElementById('crit-form-cancel-btn').classList.remove('hidden');
  document.getElementById('crit-form-submit-btn').innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>Cập Nhật Tiêu Chí Này</span>';
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function resetCriteriaForm() {
  document.getElementById('crit-edit-id').value = '';
  document.getElementById('crit-form-title-input').value = '';
  document.getElementById('crit-form-cat').value = 'hoctap';
  document.getElementById('crit-form-type').value = 'minus';
  document.getElementById('crit-form-pts').value = '5';
  document.getElementById('crit-form-desc').value = '';

  document.getElementById('crit-form-title').innerText = '+ Thêm Tiêu Chí Mới';
  document.getElementById('crit-form-cancel-btn').classList.add('hidden');
  document.getElementById('crit-form-submit-btn').innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>Lưu Tiêu Chí Này</span>';
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function deleteCriterion(critId) {
  const crit = (appState.criteria || []).find(c => c.id === critId);
  if (!crit) return;

  if (confirm(`Bạn có chắc chắn muốn xóa tiêu chí "${crit.title}" khỏi danh mục điểm?`)) {
    appState.criteria = (appState.criteria || []).filter(c => c.id !== critId);
    saveCriteriaState();
    renderCriteriaManagerList();
    renderCriteria();
    showToast(`Đã xóa tiêu chí "${crit.title}"!`, 'info');
  }
}

function resetCriteriaToDefault() {
  if (confirm('Khôi phục toàn bộ danh mục tiêu chí thi đua về chuẩn mẫu ban đầu?')) {
    appState.criteria = [...DEFAULT_CRITERIA];
    saveCriteriaState();
    resetCriteriaForm();
    renderCriteriaManagerList();
    renderCriteria();
    showToast('Đã khôi phục danh mục tiêu chí mẫu chuẩn!', 'success');
  }
}

function saveCriteriaState() {
  localStorage.setItem('thi_dua_criteria', JSON.stringify(appState.criteria || []));
  postToServer('saveCriteria', { criteria: appState.criteria });
}

function saveSchoolWideSettings() {
  const schoolName = document.getElementById('admin-setting-school-name')?.value.trim();
  const schoolCode = document.getElementById('admin-setting-school-code')?.value.trim().toUpperCase();
  const baseScore = parseInt(document.getElementById('admin-setting-base-score')?.value) || 100;
  const totalWeeks = parseInt(document.getElementById('admin-setting-total-weeks')?.value) || 18;

  if (schoolName) appState.classInfo.schoolName = schoolName;
  if (schoolCode) appState.classInfo.schoolCode = schoolCode;
  appState.classInfo.baseScore = baseScore;
  appState.classInfo.totalWeeks = totalWeeks;

  saveToLocalStorage();
  postToServer('saveClassInfo', { classInfo: appState.classInfo });

  // Update headers
  const schoolTitleEl = document.getElementById('school-admin-school-title');
  if (schoolTitleEl) schoolTitleEl.innerText = appState.classInfo.schoolName.toUpperCase();

  showToast(`Đã lưu cấu hình trường! Điểm chuẩn tuần: ${baseScore}đ/HS`, 'success');
}

// ================= BGH QUẢN LÝ LỚP & IMPORT / EXPORT DANH SÁCH LỚP =================
function addOrUpdateSchoolClass() {
  const nameEl = document.getElementById('admin-new-class-name');
  const codeEl = document.getElementById('admin-new-class-code');
  const teacherEl = document.getElementById('admin-new-class-teacher');
  const pinEl = document.getElementById('admin-new-class-pin');

  const cName = (nameEl?.value || '').trim();
  const cCode = (codeEl?.value || '').trim().toUpperCase().replace(/\s+/g, '');
  const teacher = (teacherEl?.value || '').trim() || 'Thầy / Cô Chủ Nhiệm';
  const pin = (pinEl?.value || '').trim() || '1234';

  if (!cName || !cCode) {
    showToast('Vui lòng nhập Tên Lớp và Mã Lớp!', 'warning');
    return;
  }

  const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const cleanCls = cName.replace(/LỚP/gi, '').replace(/\s+/g, '').toUpperCase();

  // 1. KIỂM TRA MÃ TRƯỜNG KHI TẠO LỚP
  if (!cCode.startsWith(sCode)) {
    const errMsg = `🚨 LỖI NHẬP SAI MÃ TRƯỜNG:\n\n• Mã trường hiện tại là: [${sCode}]\n• Bạn đang nhập Mã Lớp: [${cCode}] (SAI MÃ TRƯỜNG!)\n\n👉 Quy ước chuẩn: [Mã Trường: ${sCode}] + [Tên Lớp: ${cleanCls}]\nVí dụ lớp ${cleanCls || '10A7'} thì Mã Lớp phải là: ${sCode}${cleanCls || '10A7'}.`;
    showToast(`🚨 Lỗi: Mã Lớp [${cCode}] không bắt đầu bằng Mã Trường [${sCode}]!`, 'error');
    alert(errMsg);
    if (codeEl) codeEl.value = `${sCode}${cleanCls || '10A7'}`;
    return;
  }

  // 2. KIỂM TRA TRÙNG MÃ LỚP VỚI LỚP KHÁC
  const dupClass = (appState.schoolClasses || []).find(c => 
    c.className.toLowerCase() !== cName.toLowerCase() && 
    String(c.classCode || '').trim().toUpperCase() === cCode
  );
  if (dupClass) {
    const errMsg = `🚨 LỖI TRÙNG MÃ LỚP:\n\nMã lớp [${cCode}] đã được cấp cho Lớp "${dupClass.className}".\n\nMỗi lớp bắt buộc phải có một Mã duy nhất!`;
    showToast(`🚨 Lỗi: Mã Lớp [${cCode}] đã trùng với Lớp "${dupClass.className}"!`, 'error');
    alert(errMsg);
    return;
  }



  if (!Array.isArray(appState.schoolClasses)) {
    appState.schoolClasses = [];
  }

  const existingIdx = appState.schoolClasses.findIndex(c => 
    c.className.toLowerCase() === cName.toLowerCase() ||
    (c.classCode && c.classCode.toLowerCase() === cCode.toLowerCase())
  );

  if (existingIdx >= 0) {
    appState.schoolClasses[existingIdx].className = cName;
    appState.schoolClasses[existingIdx].classCode = cCode;
    appState.schoolClasses[existingIdx].teacherName = teacher;
    appState.schoolClasses[existingIdx].pin = pin;
    showToast(`Đã cập nhật thông tin Lớp ${cName}!`, 'success');
  } else {
    appState.schoolClasses.push({
      className: cName,
      classCode: cCode,
      teacherName: teacher,
      pin: pin,
      studentCount: 40
    });
    showToast(`Đã thêm mới Lớp ${cName} (Mã: ${cCode}) vào trường!`, 'success');
  }

  saveToLocalStorage();
  postToServer('saveSchoolClasses', { classes: appState.schoolClasses });
  renderSchoolDashboard();
  renderSchoolGvcnTable();
  updateDoanTruongClassDropdown();

  // Reset form
  if (nameEl) nameEl.value = '';
  if (codeEl) codeEl.value = '';
  if (teacherEl) teacherEl.value = '';
  if (pinEl) pinEl.value = '1234';
}

async function deleteSchoolClass(classCode) {
  const cls = (appState.schoolClasses || []).find(c => c.classCode === classCode || c.className === classCode);
  const name = cls ? cls.className : classCode;

  if (confirm(`Bạn có chắc chắn muốn xóa Lớp "${name}" khỏi danh sách trường?`)) {
    appState.schoolClasses = (appState.schoolClasses || []).filter(c => c.classCode !== classCode && c.className !== classCode);
    saveToLocalStorage();
    renderSchoolGvcnTable();
    renderSchoolDashboard();
    updateDoanTruongClassDropdown();

    showToast(`⚡ Đang xóa Lớp ${name} trên máy chủ...`, 'info');
    await postToServer('deleteSchoolClass', { className: name });
    saveToLocalStorage();
    renderSchoolGvcnTable();
    renderSchoolDashboard();
    updateDoanTruongClassDropdown();
    showToast(`🎉 Đã xóa hoàn toàn Lớp ${name} khỏi hệ thống!`, 'success');
  }
}



function handleSchoolClassExcelImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet);

      if (!json || json.length === 0) {
        showToast('File Excel không có dữ liệu lớp!', 'warning');
        return;
      }

      const sCode = String(appState.classInfo.schoolCode || '90').trim().toUpperCase();

      // Kiểm tra toàn bộ mã lớp trong file Excel trước khi import
      for (let idx = 0; idx < json.length; idx++) {
        const row = json[idx];
        const cName = String(row['TenLop'] || row['Tên Lớp'] || row['Lớp'] || row['ClassName'] || '').trim();
        if (!cName) continue;

        const customClassCode = String(row['MaLop'] || row['Mã Lớp'] || row['ClassCode'] || '').trim().toUpperCase();
        if (customClassCode) {
          const rawClassCode = customClassCode.replace(/\s+/g, '');
          if (!rawClassCode.startsWith(sCode)) {
            const err = `🚨 LỖI IMPORT EXCEL LỚP:\n\nDòng ${idx + 2} lớp "${cName}" có Mã Lớp [${rawClassCode}] không khớp với Mã Trường [${sCode}]!\n\nMã trường bạn là [${sCode}]. Ví dụ lớp 10A7 thì Mã Lớp phải là ${sCode}10A7.`;
            showToast(`Lỗi Import Excel: Lớp ${cName} có Mã Lớp sai mã trường!`, 'error');
            alert(err);
            return;
          }
        }
      }

      let importedCount = 0;

      if (!Array.isArray(appState.schoolClasses)) {
        appState.schoolClasses = [];
      }

      json.forEach(row => {
        const cName = String(row['TenLop'] || row['Tên Lớp'] || row['Lớp'] || row['ClassName'] || '').trim();
        if (!cName) return;

        const cleanClass = getCleanClassCode(cName);
        const cCode = String(row['MaLop'] || row['Mã Lớp'] || row['ClassCode'] || `${sCode}${cleanClass}`).trim().toUpperCase();
        const teacher = String(row['HoTenGVCN'] || row['Họ Tên GVCN'] || row['GVCN'] || 'Thầy / Cô Chủ Nhiệm').trim();
        const pin = String(row['MatKhauGVCN'] || row['Mật Khẩu GVCN'] || row['Mật Khẩu'] || row['PIN'] || '1234').trim();
        const siso = parseInt(row['SiSo'] || row['Sĩ Số'] || row['StudentCount']) || 40;

        const existingIdx = appState.schoolClasses.findIndex(c => 
          c.className.toLowerCase() === cName.toLowerCase() ||
          (c.classCode && c.classCode.toLowerCase() === cCode.toLowerCase())
        );

        if (existingIdx >= 0) {
          appState.schoolClasses[existingIdx].className = cName;
          appState.schoolClasses[existingIdx].classCode = cCode;
          appState.schoolClasses[existingIdx].teacherName = teacher;
          appState.schoolClasses[existingIdx].pin = pin;
          appState.schoolClasses[existingIdx].studentCount = siso;
        } else {
          appState.schoolClasses.push({
            className: cName,
            classCode: cCode,
            teacherName: teacher,
            pin: pin,
            studentCount: siso
          });
        }
        importedCount++;
      });

      saveToLocalStorage();
      postToServer('saveSchoolClasses', { classes: appState.schoolClasses });
      renderSchoolDashboard();
      renderSchoolGvcnTable();
      updateDoanTruongClassDropdown();
      showToast(`🎉 Đã import thành công ${importedCount} lớp vào trường!`, 'success');
    } catch (err) {
      console.error('Lỗi khi đọc file Excel lớp:', err);
      showToast('Không thể đọc file Excel! Vui lòng dùng đúng file mẫu.', 'warning');
    }
  };

  reader.readAsArrayBuffer(file);
  event.target.value = ''; // Reset input
}

function updateDoanTruongClassDropdown() {
  const selectEl = document.getElementById('dt-target-class');
  if (!selectEl) return;

  const classes = appState.schoolClasses || [];
  let html = '';
  classes.forEach(c => {
    html += `<option value="${c.className}">Lớp ${c.className}</option>`;
  });
  selectEl.innerHTML = html;
}


// ================= TỰ ĐỘNG SINH MÃ LỚP DỰA TRÊN MÃ TRƯỜNG HIỆN TẠI =================
function autoGenerateClassCode() {
  const nameInput = document.getElementById('admin-new-class-name');
  const codeInput = document.getElementById('admin-new-class-code');
  if (!nameInput || !codeInput) return;

  const rawName = nameInput.value.trim().toUpperCase().replace(/LỚP/gi, '').replace(/\s+/g, '');
  const schoolCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();

  if (rawName) {
    codeInput.value = `${schoolCode}${rawName}`;
  }
}

function syncSchoolClassCreationUI() {
  const schoolCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const badgeEl = document.getElementById('admin-current-school-code-badge');
  if (badgeEl) badgeEl.innerText = schoolCode;

  const previewEl = document.getElementById('admin-preview-class-code');
  if (previewEl) previewEl.innerText = `${schoolCode}10A1`;

  const codeInput = document.getElementById('admin-new-class-code');
  if (codeInput) codeInput.placeholder = `Ví dụ: ${schoolCode}10A1`;
}

function renderSchoolGvcnTable() {
  syncSchoolClassCreationUI();
  const container = document.getElementById('school-gvcn-table-container');
  const countEl = document.getElementById('school-classes-count');
  if (!container) return;

  const classes = appState.schoolClasses || [];
  if (countEl) countEl.innerText = `${classes.length} Lớp`;

  if (classes.length === 0) {
    container.innerHTML = `
      <div class="p-4 text-center text-slate-400 text-xs italic bg-slate-950/60 rounded-2xl border border-slate-800">
        🏫 Trường chưa có lớp nào. Thầy Cô vui lòng nhập thêm lớp mới hoặc Import danh sách lớp từ file Excel phía trên.
      </div>
    `;
    return;
  }

  let html = '';
  classes.forEach((c, idx) => {
    const isCur = c.className.toUpperCase() === (appState.classInfo.className || '').toUpperCase();
    html += `
      <div class="p-2.5 rounded-2xl ${isCur ? 'bg-indigo-950/60 border border-indigo-500/60' : 'bg-slate-800/90 border border-slate-700'} flex items-center justify-between gap-2 text-xs">
        <div class="min-w-0">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="font-black text-white text-xs">${idx + 1}. Lớp ${c.className}</span>
            <span class="font-mono font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded text-[10px] border border-amber-500/30">Mã: ${c.classCode || c.className}</span>
            ${isCur ? '<span class="text-[8px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">Lớp Hiện Tại</span>' : ''}
          </div>
          <p class="text-[10px] text-slate-300 mt-0.5 truncate">GVCN: <b>${c.teacherName || 'Chưa cập nhật'}</b> • Mật khẩu GVCN: <b class="text-emerald-300 font-mono">${c.pin || '1234'}</b> • Sĩ số: <b>${c.studentCount || 40} HS</b></p>
        </div>
        <div class="flex items-center gap-1 flex-shrink-0">
          <button onclick="resetGvcnPassword('${c.className}')" class="px-2 py-1 bg-slate-900 hover:bg-slate-700 text-amber-300 text-[10px] font-bold rounded-lg border border-slate-700" title="Đặt lại mật khẩu GVCN về 1234">
            🔄 Reset PIN
          </button>
          <button onclick="deleteSchoolClass('${c.classCode || c.className}')" class="px-2 py-1 bg-rose-950/60 hover:bg-rose-800 text-rose-300 text-[10px] font-bold rounded-lg border border-rose-800/50" title="Xóa lớp này">
            🗑️ Xóa
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function resetGvcnPassword(className) {
  if (confirm(`Đặt lại mật khẩu GVCN Lớp ${className} về mặc định: 1234?`)) {
    const cls = (appState.schoolClasses || []).find(c => c.className === className);
    if (cls) {
      cls.pin = '1234';
    }
    if (className === appState.classInfo.className) {
      appState.classInfo.pin = '1234';
    }
    saveToLocalStorage();
    postToServer('saveSchoolClasses', { classes: appState.schoolClasses });
    postToServer('saveClassInfo', { classInfo: appState.classInfo });
    renderSchoolGvcnTable();
    showToast(`Đã đặt lại mật khẩu GVCN Lớp ${className} về 1234!`, 'success');
  }
}

function exportGvcnCredentialsList() {
  showToast('Đang xuất danh sách tài khoản GVCN toàn trường...', 'info');
  const classes = appState.schoolClasses || [];
  const sCode = String(appState.classInfo.schoolCode || '90').trim().toUpperCase();

  const exportData = classes.map((c, idx) => ({
    'STT': idx + 1,
    'Tên Lớp': c.className,
    'Mã Lớp / Mã Đăng Nhập': c.classCode || `${sCode}${getCleanClassCode(c.className)}`,
    'Họ Tên GVCN': c.teacherName || 'Thầy / Cô Chủ Nhiệm',
    'Mật Khẩu GVCN (Cấp Phát)': c.pin || '1234',
    'Sĩ Số Dự Kiến': c.studentCount || 40
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, ws, 'Tai_Khoan_GVCN_Toan_Truong');
  XLSX.writeFile(wb, `Danh_Sach_Tai_Khoan_GVCN_${appState.classInfo.schoolName || 'THPT'}.xlsx`);
  showToast('Đã xuất file Excel Tài Khoản GVCN Toàn Trường!', 'success');
}

// ================= HÀM XUẤT EXCEL MẪU ĐỊNH DẠNG ĐẸP CHUẨN (EXCELJS) =================
async function downloadSchoolClassTemplate() {
  showToast('Đang tạo file Excel mẫu danh sách lớp...', 'info');
  const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const sName = appState.classInfo?.schoolName || 'Truong';

  if (typeof ExcelJS !== 'undefined') {
    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Sổ Thi Đua Điện Tử';
      workbook.created = new Date();

      const worksheet = workbook.addWorksheet('Danh_Sach_Lop_Mau', {
        views: [{ state: 'frozen', ySplit: 1 }]
      });

      worksheet.columns = [
        { header: 'STT', key: 'stt', width: 8 },
        { header: 'TenLop', key: 'tenLop', width: 14 },
        { header: 'MaLop', key: 'maLop', width: 16 },
        { header: 'HoTenGVCN', key: 'hoTen', width: 28 },
        { header: 'MatKhauGVCN', key: 'pin', width: 18 },
        { header: 'SiSo', key: 'siso', width: 10 }
      ];

      // Style Header Row (Màu cam đậm, chữ trắng in đậm)
      const headerRow = worksheet.getRow(1);
      headerRow.height = 28;
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFEA580C' } // Cam nổi bật
        };
        cell.font = {
          name: 'Segoe UI',
          size: 11,
          bold: true,
          color: { argb: 'FFFFFFFF' }
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true
        };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFC2410C' } },
          bottom: { style: 'medium', color: { argb: 'FF9A3412' } },
          left: { style: 'thin', color: { argb: 'FFFB923C' } },
          right: { style: 'thin', color: { argb: 'FFFB923C' } }
        };
      });

      // Data rows (Xen kẽ màu cam đào nhạt)
      const data = [
        { stt: 1, tenLop: '10A1', maLop: `${sCode}10A1`, hoTen: 'Thầy Nguyễn Văn An', pin: '1234', siso: 40 },
        { stt: 2, tenLop: '10A2', maLop: `${sCode}10A2`, hoTen: 'Cô Trần Thị Bích', pin: '1234', siso: 40 },
        { stt: 3, tenLop: '11A1', maLop: `${sCode}11A1`, hoTen: 'Thầy Lê Văn Cường', pin: '1234', siso: 42 },
        { stt: 4, tenLop: '12A1', maLop: `${sCode}12A1`, hoTen: 'Cô Phạm Thị Dung', pin: '1234', siso: 43 }
      ];

      data.forEach((item, idx) => {
        const row = worksheet.addRow(item);
        row.height = 22;
        const isEven = idx % 2 === 1;

        row.eachCell((cell, colNumber) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: isEven ? 'FFFFEDD5' : 'FFFFFFFF' } // Cam nhạt / Trắng
          };
          cell.font = {
            name: 'Segoe UI',
            size: 11,
            color: { argb: 'FF0F172A' }
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: colNumber === 4 ? 'left' : 'center'
          };
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
          };
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Mau_Danh_Sach_Lop_${sName.replace(/\s+/g, '_')}.xlsx`;
      link.click();
      URL.revokeObjectURL(link.href);
      showToast('Đã tải xuống file Excel mẫu danh sách lớp chuẩn đẹp!', 'success');
      return;
    } catch (err) {
      console.warn('ExcelJS error, fallback to XLSX:', err);
    }
  }

  // Fallback XLSX
  const templateData = [
    { 'STT': 1, 'TenLop': '10A1', 'MaLop': `${sCode}10A1`, 'HoTenGVCN': 'Thầy Nguyễn Văn An', 'MatKhauGVCN': '1234', 'SiSo': 40 },
    { 'STT': 2, 'TenLop': '10A2', 'MaLop': `${sCode}10A2`, 'HoTenGVCN': 'Cô Trần Thị Bích', 'MatKhauGVCN': '1234', 'SiSo': 40 },
    { 'STT': 3, 'TenLop': '11A1', 'MaLop': `${sCode}11A1`, 'HoTenGVCN': 'Thầy Lê Văn Cường', 'MatKhauGVCN': '1234', 'SiSo': 42 },
    { 'STT': 4, 'TenLop': '12A1', 'MaLop': `${sCode}12A1`, 'HoTenGVCN': 'Cô Phạm Thị Dung', 'MatKhauGVCN': '1234', 'SiSo': 43 }
  ];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(templateData);
  XLSX.utils.book_append_sheet(wb, ws, 'Danh_Sach_Lop_Mau');
  XLSX.writeFile(wb, `Mau_Danh_Sach_Lop_${sName}.xlsx`);
  showToast('Đã tải xuống file Excel mẫu danh sách lớp!', 'success');
}

async function downloadExcelTemplate() {
  const curClass = appState.classInfo?.className || '10A1';
  const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const cClean = getCleanClassCode(curClass);

  if (typeof ExcelJS !== 'undefined') {
    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Sổ Thi Đua Điện Tử';
      workbook.created = new Date();

      const worksheet = workbook.addWorksheet('Danh_Sach_Hoc_Sinh', {
        views: [{ state: 'frozen', ySplit: 1 }]
      });

      worksheet.columns = [
        { header: 'STT', key: 'stt', width: 8 },
        { header: 'HoTen', key: 'name', width: 26 },
        { header: 'To', key: 'team', width: 8 },
        { header: 'ChucVu', key: 'role', width: 16 },
        { header: 'MaHocSinh', key: 'code', width: 15 },
        { header: 'MatKhauHS', key: 'passHs', width: 15 },
        { header: 'MatKhauPH', key: 'passPh', width: 15 }
      ];

      // Header Styling (Cam rực rỡ, chữ trắng đậm)
      const headerRow = worksheet.getRow(1);
      headerRow.height = 28;
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFEA580C' }
        };
        cell.font = {
          name: 'Segoe UI',
          size: 11,
          bold: true,
          color: { argb: 'FFFFFFFF' }
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true
        };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFC2410C' } },
          bottom: { style: 'medium', color: { argb: 'FF9A3412' } },
          left: { style: 'thin', color: { argb: 'FFFB923C' } },
          right: { style: 'thin', color: { argb: 'FFFB923C' } }
        };
      });

      // 10 Học Sinh Mẫu đủ 4 Tổ & Chức vụ Tiếng Việt
      const data = [
        { stt: 1, name: 'Nguyễn Văn An', team: 1, role: 'Lớp trưởng', code: `${sCode}${cClean}01`, passHs: '123456', passPh: '123456' },
        { stt: 2, name: 'Trần Thị Bích', team: 1, role: 'Lớp phó', code: `${sCode}${cClean}02`, passHs: '123456', passPh: '123456' },
        { stt: 3, name: 'Lê Văn Cường', team: 1, role: 'Tổ trưởng', code: `${sCode}${cClean}03`, passHs: '123456', passPh: '123456' },
        { stt: 4, name: 'Phạm Anh Kiệt', team: 1, role: 'Tổ phó', code: `${sCode}${cClean}04`, passHs: '123456', passPh: '123456' },
        { stt: 5, name: 'Hoàng Minh Đức', team: 2, role: 'Tổ trưởng', code: `${sCode}${cClean}05`, passHs: '123456', passPh: '123456' },
        { stt: 6, name: 'Đỗ Mai Linh', team: 2, role: 'Thành viên', code: `${sCode}${cClean}06`, passHs: '123456', passPh: '123456' },
        { stt: 7, name: 'Vũ Quốc Bảo', team: 3, role: 'Tổ trưởng', code: `${sCode}${cClean}07`, passHs: '123456', passPh: '123456' },
        { stt: 8, name: 'Bùi Thị Ngọc', team: 3, role: 'Thành viên', code: `${sCode}${cClean}08`, passHs: '123456', passPh: '123456' },
        { stt: 9, name: 'Đặng Tuấn Anh', team: 4, role: 'Tổ trưởng', code: `${sCode}${cClean}09`, passHs: '123456', passPh: '123456' },
        { stt: 10, name: 'Ngô Phương Thảo', team: 4, role: 'Thành viên', code: `${sCode}${cClean}10`, passHs: '123456', passPh: '123456' }
      ];

      data.forEach((item, idx) => {
        const row = worksheet.addRow(item);
        row.height = 22;
        const isEven = idx % 2 === 1;

        row.eachCell((cell, colNumber) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: isEven ? 'FFFFEDD5' : 'FFFFFFFF' } // Cam nhạt / Trắng
          };
          cell.font = {
            name: 'Segoe UI',
            size: 11,
            color: { argb: 'FF0F172A' }
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: colNumber === 2 ? 'left' : 'center'
          };
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
          };
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Mau_Danh_Sach_Hoc_Sinh_Lop_${cClean}.xlsx`;
      link.click();
      URL.revokeObjectURL(link.href);
      showToast(`Đã tải file Excel mẫu danh sách 10 học sinh chuẩn Lớp ${curClass}!`, 'success');
      return;
    } catch (err) {
      console.warn('ExcelJS error, fallback to XLSX:', err);
    }
  }

  // Fallback
  const templateData = [
    { 'STT': 1, 'HoTen': 'Nguyễn Văn An', 'To': 1, 'ChucVu': 'Lớp trưởng', 'MaHocSinh': `${sCode}${cClean}01` },
    { 'STT': 2, 'HoTen': 'Trần Thị Bích', 'To': 1, 'ChucVu': 'Lớp phó', 'MaHocSinh': `${sCode}${cClean}02` },
    { 'STT': 3, 'HoTen': 'Lê Văn Cường', 'To': 1, 'ChucVu': 'Tổ trưởng', 'MaHocSinh': `${sCode}${cClean}03` },
    { 'STT': 4, 'HoTen': 'Phạm Anh Kiệt', 'To': 1, 'ChucVu': 'Tổ phó', 'MaHocSinh': `${sCode}${cClean}04` }
  ];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(templateData);
  XLSX.utils.book_append_sheet(wb, ws, 'Danh_Sach_Hoc_Sinh');
  XLSX.writeFile(wb, `Mau_Danh_Sach_Hoc_Sinh_${curClass}.xlsx`);
  showToast(`Đã tải file Excel mẫu danh sách học sinh Lớp ${curClass}!`, 'success');
}

// =========================================================================
// 📥 XUẤT DANH SÁCH HỌC SINH HIỆN CÓ CỦA LỚP ĐÚNG 100% FORM MẪU EXCEL
// =========================================================================
async function exportCurrentClassStudentListExcel() {
  const curClass = appState.classInfo?.className || '10A1';
  const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const cClean = getCleanClassCode(curClass);
  const classStudents = getCurrentClassStudents(curClass);

  if (!classStudents || classStudents.length === 0) {
    showToast(`⚠️ Lớp ${curClass} hiện chưa có học sinh nào để xuất Excel!`, 'warning');
    return;
  }

  showToast(`⏳ Đang xuất danh sách ${classStudents.length} học sinh Lớp ${curClass}...`, 'info');

  const roleToVietnamese = (r) => {
    const role = normalizeRole(r);
    if (role === 'monitor') return 'Lớp trưởng';
    if (role === 'vice_monitor') return 'Lớp phó';
    if (role === 'leader') return 'Tổ trưởng';
    if (role === 'sub_leader') return 'Tổ phó';
    return 'Thành viên';
  };

  const exportData = classStudents.map((s, idx) => ({
    stt: idx + 1,
    name: s.name,
    team: parseInt(s.team) || 1,
    role: roleToVietnamese(s.role),
    code: s.code || generateUnifiedStudentCode(idx + 1, sCode, curClass),
    passHs: s.studentPassword || '123456',
    passPh: s.parentPassword || '123456'
  }));

  if (typeof ExcelJS !== 'undefined') {
    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Sổ Thi Đua Điện Tử';
      workbook.created = new Date();

      const worksheet = workbook.addWorksheet(`Danh_Sach_${cClean}`, {
        views: [{ state: 'frozen', ySplit: 1 }]
      });

      worksheet.columns = [
        { header: 'STT', key: 'stt', width: 8 },
        { header: 'HoTen', key: 'name', width: 28 },
        { header: 'To', key: 'team', width: 10 },
        { header: 'ChucVu', key: 'role', width: 16 },
        { header: 'MaHocSinh', key: 'code', width: 16 },
        { header: 'MatKhauHS', key: 'passHs', width: 16 },
        { header: 'MatKhauPH', key: 'passPh', width: 16 }
      ];

      // Header Styling (Cam rực rỡ, chữ trắng in đậm chuẩn form mẫu)
      const headerRow = worksheet.getRow(1);
      headerRow.height = 28;
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFEA580C' }
        };
        cell.font = {
          name: 'Segoe UI',
          size: 11,
          bold: true,
          color: { argb: 'FFFFFFFF' }
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true
        };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFC2410C' } },
          bottom: { style: 'medium', color: { argb: 'FF9A3412' } },
          left: { style: 'thin', color: { argb: 'FFFB923C' } },
          right: { style: 'thin', color: { argb: 'FFFB923C' } }
        };
      });

      exportData.forEach((item, idx) => {
        const row = worksheet.addRow(item);
        row.height = 22;
        const isEven = idx % 2 === 1;

        row.eachCell((cell, colNumber) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: isEven ? 'FFFFEDD5' : 'FFFFFFFF' }
          };
          cell.font = {
            name: 'Segoe UI',
            size: 11,
            color: { argb: 'FF0F172A' }
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: colNumber === 2 ? 'left' : 'center'
          };
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
          };
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Danh_Sach_Hoc_Sinh_Lop_${cClean}_${sCode}.xlsx`;
      link.click();
      URL.revokeObjectURL(link.href);
      showToast(`🎉 Đã xuất thành công ${classStudents.length} học sinh Lớp ${curClass} ra file Excel chuẩn mẫu!`, 'success');
      return;
    } catch (err) {
      console.warn('ExcelJS error, fallback to XLSX:', err);
    }
  }

  // Fallback sang SheetJS (XLSX)
  const fallbackData = exportData.map(d => ({
    'STT': d.stt,
    'HoTen': d.name,
    'To': d.team,
    'ChucVu': d.role,
    'MaHocSinh': d.code,
    'MatKhauHS': d.passHs,
    'MatKhauPH': d.passPh
  }));
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(fallbackData);
  XLSX.utils.book_append_sheet(wb, ws, 'Danh_Sach_Hoc_Sinh');
  XLSX.writeFile(wb, `Danh_Sach_Hoc_Sinh_Lop_${cClean}_${sCode}.xlsx`);
  showToast(`🎉 Đã xuất thành công ${classStudents.length} học sinh Lớp ${curClass} ra file Excel chuẩn mẫu!`, 'success');
}

function renderSchoolDashboard() {
  if (typeof renderSchoolAdminPortalView === 'function') renderSchoolAdminPortalView();
  if (typeof renderSchoolLeaderboard === 'function') renderSchoolLeaderboard();
  if (typeof renderSchoolGvcnTable === 'function') renderSchoolGvcnTable();
}

// ================= CẤU HÌNH KHUNG ĐIỂM XÉT HẠNH KIỂM THÁNG (GVCN & BGH) =================
function syncConductConfigUI() {
  const baseScore = parseInt(appState.classInfo?.baseScore) || 100;
  
  if (!appState.classInfo.conductConfig) {
    const savedClassConduct = localStorage.getItem(`thi_dua_conduct_config_${appState.classInfo?.className}`) || localStorage.getItem('thi_dua_conduct_config');
    if (savedClassConduct) {
      try { appState.classInfo.conductConfig = JSON.parse(savedClassConduct); } catch(e) {}
    }
  }

  if (!appState.classInfo.conductConfig) {
    if (baseScore === 10) {
      appState.classInfo.conductConfig = { totMin: 8.0, khaMin: 6.5, datMin: 5.0 };
    } else if (baseScore === 80) {
      appState.classInfo.conductConfig = { totMin: 65, khaMin: 50, datMin: 35 };
    } else {
      appState.classInfo.conductConfig = { totMin: 80, khaMin: 65, datMin: 50 };
    }
  }

  const cfg = appState.classInfo.conductConfig;

  // GVCN Inputs
  const elTot = document.getElementById('setting-conduct-tot');
  const elKha = document.getElementById('setting-conduct-kha');
  const elDat = document.getElementById('setting-conduct-dat');

  if (elTot) elTot.value = cfg.totMin ?? 80;
  if (elKha) elKha.value = cfg.khaMin ?? 65;
  if (elDat) elDat.value = cfg.datMin ?? 50;

  // BGH Inputs
  const adminTot = document.getElementById('admin-setting-conduct-tot');
  const adminKha = document.getElementById('admin-setting-conduct-kha');
  const adminDat = document.getElementById('admin-setting-conduct-dat');

  if (adminTot) adminTot.value = cfg.totMin ?? 80;
  if (adminKha) adminKha.value = cfg.khaMin ?? 65;
  if (adminDat) adminDat.value = cfg.datMin ?? 50;

  // Update hints
  updateConductHints(cfg.totMin, cfg.khaMin, cfg.datMin, baseScore);
}

function updateConductHints(tot, kha, dat, base) {
  const hTot = document.getElementById('hint-conduct-tot');
  const hKha = document.getElementById('hint-conduct-kha');
  const hDat = document.getElementById('hint-conduct-dat');

  if (hTot) hTot.innerText = `${tot}đ - ${base}đ`;
  if (hKha) hKha.innerText = `${kha}đ - ${Number((tot - 0.1).toFixed(1))}đ`;
  if (hDat) hDat.innerText = `${dat}đ - ${Number((kha - 0.1).toFixed(1))}đ`;
}

function resetConductConfigToDefault() {
  const base = parseInt(appState.classInfo?.baseScore) || 100;
  let tot = 80, kha = 65, dat = 50;

  if (base === 10) {
    tot = 8.0; kha = 6.5; dat = 5.0;
  } else if (base === 80) {
    tot = 64; kha = 52; dat = 40;
  } else if (base !== 100) {
    tot = Number((base * 0.8).toFixed(1));
    kha = Number((base * 0.65).toFixed(1));
    dat = Number((base * 0.5).toFixed(1));
  }

  const elTot = document.getElementById('setting-conduct-tot');
  const elKha = document.getElementById('setting-conduct-kha');
  const elDat = document.getElementById('setting-conduct-dat');

  if (elTot) elTot.value = tot;
  if (elKha) elKha.value = kha;
  if (elDat) elDat.value = dat;

  updateConductHints(tot, kha, dat, base);
  showToast(`Đã tự động tính khung điểm gợi ý theo Điểm Chuẩn ${base}đ!`, 'info');
}

function saveConductConfigSettings(isSchoolWide = false) {
  let totVal, khaVal, datVal;

  if (isSchoolWide) {
    totVal = parseFloat(document.getElementById('admin-setting-conduct-tot')?.value);
    khaVal = parseFloat(document.getElementById('admin-setting-conduct-kha')?.value);
    datVal = parseFloat(document.getElementById('admin-setting-conduct-dat')?.value);
  } else {
    totVal = parseFloat(document.getElementById('setting-conduct-tot')?.value);
    khaVal = parseFloat(document.getElementById('setting-conduct-kha')?.value);
    datVal = parseFloat(document.getElementById('setting-conduct-dat')?.value);
  }

  if (isNaN(totVal) || isNaN(khaVal) || isNaN(datVal)) {
    showToast('Vui lòng nhập đầy đủ các mức điểm xét Hạnh kiểm!', 'warning');
    return;
  }

  if (totVal <= khaVal || khaVal <= datVal || datVal < 0) {
    showToast('Quy tắc điểm không hợp lệ! Mức Tốt > Mức Khá > Mức Đạt ≥ 0.', 'warning');
    return;
  }

  if (!appState.classInfo) appState.classInfo = {};
  appState.classInfo.conductConfig = {
    totMin: totVal,
    khaMin: khaVal,
    datMin: datVal
  };

  saveToLocalStorage();
  localStorage.setItem(`thi_dua_conduct_config_${appState.classInfo.className}`, JSON.stringify(appState.classInfo.conductConfig));
  postToServer('saveClassInfo', { classInfo: appState.classInfo });

  syncConductConfigUI();
  if (typeof updateReportCardPreview === 'function') updateReportCardPreview();

  const roleText = isSchoolWide ? 'Toàn Trường' : 'Lớp';
  showToast(`🎉 Đã lưu Khung Điểm Hạnh Kiểm Tháng (${roleText}): Tốt (≥${totVal}đ), Khá (≥${khaVal}đ), Đạt (≥${datVal}đ), Chưa Đạt (<${datVal}đ)!`, 'success');
}


// Lắng nghe tín hiệu phát chuông từ Service Worker khi người dùng bấm vào thông báo
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.type === 'PLAY_NOTIFICATION_CHIME') {
      playNotificationChime(true);
    }
  });
}

// Kiểm tra nếu mở từ push notification
if (typeof window !== 'undefined' && window.location && window.location.search.includes('from_push=1')) {
  setTimeout(() => {
    playNotificationChime(true);
  }, 500);
}


// ================= HỆ THỐNG ĐỔI MẬT KHẨU (HỌC SINH, PHỤ HUYNH, GVCN) =================
function openChangePasswordModal(role = 'student') {
  const modal = document.getElementById('change-password-modal');
  if (!modal) return;

  const roleInput = document.getElementById('change-pass-role');
  const titleEl = document.getElementById('change-pass-modal-title');
  const oldPassInput = document.getElementById('change-pass-old');
  const newPassInput = document.getElementById('change-pass-new');
  const confirmPassInput = document.getElementById('change-pass-confirm');

  if (roleInput) roleInput.value = role;
  if (oldPassInput) oldPassInput.value = '';
  if (newPassInput) newPassInput.value = '';
  if (confirmPassInput) confirmPassInput.value = '';

  if (role === 'student') {
    const s = (appState.students || []).find(x => x.code === appState.currentStudentCode || x.id === appState.currentStudentCode);
    const sName = s ? s.name : 'Học Sinh';
    if (titleEl) titleEl.innerText = `Đổi Mật Khẩu Học Sinh (${sName})`;
  } else if (role === 'parent') {
    const s = (appState.students || []).find(x => x.code === appState.currentParentStudentCode || x.id === appState.currentParentStudentCode);
    const sName = s ? s.name : 'Học Sinh';
    if (titleEl) titleEl.innerText = `Đổi Mật Khẩu Phụ Huynh (Em ${sName})`;
  } else if (role === 'gvcn') {
    const curClass = appState.classInfo?.className || '10A1';
    if (titleEl) titleEl.innerText = `Đổi Mật Khẩu / PIN GVCN (Lớp ${curClass})`;
  }

  modal.classList.remove('hidden');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeChangePasswordModal() {
  const modal = document.getElementById('change-password-modal');
  if (modal) modal.classList.add('hidden');
}

function submitChangePassword() {
  const role = document.getElementById('change-pass-role')?.value || 'student';
  const oldPass = (document.getElementById('change-pass-old')?.value || '').trim();
  const newPass = (document.getElementById('change-pass-new')?.value || '').trim();
  const confirmPass = (document.getElementById('change-pass-confirm')?.value || '').trim();

  if (!newPass || !confirmPass) {
    showToast('⚠️ Vui lòng nhập đầy đủ Mật khẩu mới và Xác nhận mật khẩu!', 'warning');
    alert('⚠️ Vui lòng nhập đầy đủ Mật khẩu mới và Xác nhận mật khẩu!');
    return;
  }

  if (newPass !== confirmPass) {
    showToast('⚠️ Mật khẩu xác nhận không khớp! Vui lòng nhập lại chính xác.', 'warning');
    alert('⚠️ Mật khẩu xác nhận không khớp! Vui lòng nhập lại chính xác.');
    return;
  }

  if (newPass.length < 4) {
    showToast('⚠️ Mật khẩu mới phải có ít nhất 4 ký tự!', 'warning');
    alert('⚠️ Mật khẩu mới phải có ít nhất 4 ký tự!');
    return;
  }

  if (role === 'student') {
    const s = (appState.students || []).find(x => x.code === appState.currentStudentCode || x.id === appState.currentStudentCode);
    if (!s) {
      showToast('❌ Không tìm thấy tài khoản học sinh!', 'error');
      alert('❌ Không tìm thấy tài khoản học sinh!');
      return;
    }
    const currentPass = String(s.studentPassword || '123456').trim();
    if (oldPass && oldPass !== currentPass) {
      showToast('❌ Mật khẩu hiện tại không đúng!', 'error');
      alert('❌ Mật khẩu hiện tại không đúng! Vui lòng nhập lại.');
      return;
    }

    s.studentPassword = newPass;
    saveToLocalStorage();
    postToServer('updateStudentPassword', { studentCode: s.code, role: 'student', newPassword: newPass });
    closeChangePasswordModal();
    showToast(`🎉 Đã đổi mật khẩu học sinh thành công! Mật khẩu mới: ${newPass}`, 'success');
    alert(`🎉 Đã đổi mật khẩu học sinh thành công!

Mật khẩu mới của em là: ${newPass}`);
  } else if (role === 'parent') {
    const s = (appState.students || []).find(x => x.code === appState.currentParentStudentCode || x.id === appState.currentParentStudentCode);
    if (!s) {
      showToast('❌ Không tìm thấy tài khoản học sinh!', 'error');
      alert('❌ Không tìm thấy tài khoản học sinh!');
      return;
    }
    const currentPass = String(s.parentPassword || '123456').trim();
    if (oldPass && oldPass !== currentPass) {
      showToast('❌ Mật khẩu hiện tại không đúng!', 'error');
      alert('❌ Mật khẩu hiện tại không đúng! Vui lòng nhập lại.');
      return;
    }

    s.parentPassword = newPass;
    saveToLocalStorage();
    postToServer('updateStudentPassword', { studentCode: s.code, role: 'parent', newPassword: newPass });
    closeChangePasswordModal();
    showToast(`🎉 Đã đổi mật khẩu phụ huynh thành công! Mật khẩu mới: ${newPass}`, 'success');
    alert(`🎉 Đã đổi mật khẩu phụ huynh thành công!

Mật khẩu mới của Quý Phụ huynh là: ${newPass}`);
  } else if (role === 'gvcn') {
    const curClassName = getCleanClassCode(appState.classInfo?.className || '10A1');
    const matchedClass = (appState.schoolClasses || []).find(c => getCleanClassCode(c.className) === curClassName);
    const currentPin = String(appState.classInfo?.pin || matchedClass?.pin || matchedClass?.teacherPin || '1234').trim();

    if (oldPass && oldPass !== currentPin) {
      showToast('❌ Mật khẩu GVCN hiện tại không đúng!', 'error');
      alert(`❌ Mật khẩu GVCN hiện tại không đúng! Vui lòng kiểm tra lại mật khẩu cũ.`);
      return;
    }

    appState.classInfo.pin = newPass;
    if (Array.isArray(appState.schoolClasses)) {
      const cls = appState.schoolClasses.find(c => getCleanClassCode(c.className) === curClassName);
      if (cls) {
        cls.pin = newPass;
        cls.teacherPin = newPass;
      }
    }

    saveToLocalStorage();
    postToServer('saveClassInfo', { classInfo: appState.classInfo });
    if (appState.schoolClasses) postToServer('saveSchoolClasses', { classes: appState.schoolClasses });

    syncClassSettingsUI();
    closeChangePasswordModal();
    showToast(`🎉 Đã đổi mật khẩu GVCN thành công! Mã PIN mới: ${newPass}`, 'success');
    alert(`🎉 Đã đổi mật khẩu GVCN thành công!

Mã PIN đăng nhập mới của Thầy/Cô là: ${newPass}`);
  }
}

function togglePinVisibility(inputId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(inputId + '-eye');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.setAttribute('data-lucide', 'eye-off');
  } else {
    input.type = 'password';
    if (icon) icon.setAttribute('data-lucide', 'eye');
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}


// ================= HỆ THỐNG THỐNG KÊ VẮNG & CHUYÊN CẦN TOÀN DIỆN =================
let currentAttendanceScope = 'week';
let currentAttendanceScopeValue = 1;

function isAttendanceLog(l) {
  if (!l) return false;
  const title = String(l.critTitle || '').toLowerCase();
  const note = String(l.note || '').toLowerCase();
  const id = String(l.critId || '').toLowerCase();
  // Nhận diện tất cả tiêu chí liên quan chuyên cần / vắng / nghỉ / trễ / muộn
  const ATTENDANCE_IDS = ['tp_1', 'tp_2', 'tp_3', 'vang_co_phep', 'vang_khong_phep', 'di_tre', 'nghi_phep', 'nghi_kp'];
  if (ATTENDANCE_IDS.includes(id)) return true;
  if (id.includes('vang') || id.includes('tre') || id.includes('nghi') || id.includes('chuyencan') || id.includes('muon')) return true;
  if (title.includes('vắng') || title.includes('nghỉ') || title.includes('trễ') || title.includes('muộn') ||
      title.includes('chuyên cần') || title.includes('đi học muộn') || title.includes('không phép') || title.includes('có phép')) return true;
  if (note.includes('vắng') || note.includes('nghỉ') || note.includes('trễ') || note.includes('muộn') ||
      note.includes('chuyên cần') || note.includes('điểm danh')) return true;
  return false;
}

function openAttendanceReportModal() {
  const modal = document.getElementById('attendance-report-modal');
  if (!modal) return;

  const curClass = appState.classInfo?.className || '10A1';
  const schoolName = appState.classInfo?.schoolName || 'THPT';
  const labelEl = document.getElementById('att-modal-class-title');
  if (labelEl) labelEl.innerText = `Lớp ${curClass} • ${schoolName} • Năm học 2026 - 2027`;

  currentAttendanceScope = 'week';
  currentAttendanceScopeValue = appState.classInfo?.currentWeek || 1;
  setAttendanceScope('week');
  modal.classList.remove('hidden');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeAttendanceReportModal() {
  const modal = document.getElementById('attendance-report-modal');
  if (modal) modal.classList.add('hidden');
}

function setAttendanceScope(scope) {
  currentAttendanceScope = scope;
  ['day', 'week', 'month', 'semester', 'year'].forEach(s => {
    const btn = document.getElementById(`att-scope-btn-${s}`);
    if (btn) {
      btn.className = s === scope
        ? 'py-1.5 rounded-xl transition-all text-white bg-emerald-600 shadow'
        : 'py-1.5 rounded-xl transition-all text-slate-400 hover:text-white';
    }
  });

  renderAttendanceScopeSelector();
  renderAttendanceReport();
}

function renderAttendanceScopeSelector() {
  const container = document.getElementById('att-scope-detail-container');
  if (!container) return;

  const curWeek = appState.classInfo?.currentWeek || 1;
  let html = '';

  if (currentAttendanceScope === 'day') {
    const today = new Date().toISOString().split('T')[0];
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="font-bold text-emerald-300">Chọn Ngày Xem:</label>
        <input type="date" id="att-select-day" value="${today}" onchange="onAttendanceScopeValueChange(this.value)" class="flex-1 bg-slate-900 border border-emerald-500/50 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold">
      </div>
    `;
  } else if (currentAttendanceScope === 'week') {
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="font-bold text-emerald-300">Chọn Tuần:</label>
        <select id="att-select-val" onchange="onAttendanceScopeValueChange(this.value)" class="flex-1 bg-slate-900 border border-emerald-500/50 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold">
    `;
    if (typeof OFFICIAL_WEEK_SCHEDULE !== 'undefined') {
      OFFICIAL_WEEK_SCHEDULE.forEach(item => {
        const isCur = Number(item.week) === Number(curWeek);
        const noteStr = item.note ? ` [${item.note}]` : '';
        html += `<option value="${item.week}" ${isCur ? 'selected' : ''}>Tuần ${item.week} (${item.range})${noteStr}</option>`;
      });
    } else {
      for (let w = 1; w <= 35; w++) {
        html += `<option value="${w}" ${w === curWeek ? 'selected' : ''}>Tuần ${w}</option>`;
      }
    }
    html += `</select></div>`;
  } else if (currentAttendanceScope === 'month') {
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="font-bold text-emerald-300">Chọn Tháng:</label>
        <select id="att-select-val" onchange="onAttendanceScopeValueChange(this.value)" class="flex-1 bg-slate-900 border border-emerald-500/50 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold">
          <optgroup label="HỌC KỲ I">
            <option value="9">Tháng 9/2026 (Tuần 1 - 4)</option>
            <option value="10">Tháng 10/2026 (Tuần 5 - 8)</option>
            <option value="11">Tháng 11/2026 (Tuần 9 - 12)</option>
            <option value="12">Tháng 12/2026 (Tuần 13 - 16)</option>
            <option value="1">Tháng 1/2027 (Tuần 17 - 18)</option>
          </optgroup>
          <optgroup label="HỌC KỲ II">
            <option value="102">Tháng 1/2027 HK2 (Tuần 19 - 21)</option>
            <option value="2">Tháng 2/2027 (Tuần 22 - 23)</option>
            <option value="3">Tháng 3/2027 (Tuần 24 - 27)</option>
            <option value="4">Tháng 4/2027 (Tuần 28 - 32)</option>
            <option value="5">Tháng 5/2027 (Tuần 33 - 35)</option>
          </optgroup>
        </select>
      </div>
    `;
  } else if (currentAttendanceScope === 'semester') {
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="font-bold text-emerald-300">Chọn Học Kỳ:</label>
        <select id="att-select-val" onchange="onAttendanceScopeValueChange(this.value)" class="flex-1 bg-slate-900 border border-emerald-500/50 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold">
          <option value="1">Học Kỳ I (Tuần 1 - 18 • 18 tuần)</option>
          <option value="2">Học Kỳ II (Tuần 19 - 35 • 17 tuần)</option>
        </select>
      </div>
    `;
  } else if (currentAttendanceScope === 'year') {
    html = `
      <div class="text-center font-bold text-amber-300 py-1">
        🏆 Tổng Hợp Toàn Bộ Cả Năm Học (Tuần 1 - 35 • Năm học 2026 - 2027)
      </div>
    `;
  }

  container.innerHTML = html;
}

function onAttendanceScopeValueChange(val) {
  if (currentAttendanceScope === 'week' && /^\d+$/.test(String(val))) {
    selectWeek(Number(val));
    return;
  }
  currentAttendanceScopeValue = val;
  renderAttendanceReport();
}

function getFilteredAttendanceData() {
  const curClass = getCleanClassCode(appState.classInfo?.className || '10A1');
  const sCode = String(appState.classInfo?.schoolCode || '90').trim().toUpperCase();
  const classStudents = getCurrentClassStudents();

  // 1. Lọc log chuyên cần của lớp này
  let attLogs = (appState.logs || []).filter(l => {
    const isAtt = isAttendanceLog(l);
    if (!isAtt) return false;
    if (l.className && getCleanClassCode(l.className) === curClass) return true;
    if (l.studentCode && (l.studentCode.includes(curClass) || l.studentCode.startsWith(`${sCode}${curClass}`))) return true;
    if (classStudents.some(cs => cs.id === l.studentId || cs.code === l.studentCode)) return true;
    return false;
  });

  // 2. Lọc theo Scope
  if (currentAttendanceScope === 'day') {
    const dayVal = document.getElementById('att-select-day')?.value || new Date().toISOString().split('T')[0];
    const parts = dayVal.split('-');
    const formattedD = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dayVal;
    attLogs = attLogs.filter(l => {
      const d = String(l.exactDate || '');
      return d.includes(formattedD) || String(l.rawDate || '').includes(dayVal);
    });
  } else if (currentAttendanceScope === 'week') {
    const wVal = parseInt(document.getElementById('att-select-val')?.value) || currentAttendanceScopeValue || 1;
    attLogs = attLogs.filter(l => (parseInt(String(l.week).replace(/[^0-9]/g, '')) || 1) === parseInt(wVal));
  } else if (currentAttendanceScope === 'month') {
    const mVal = parseInt(document.getElementById('att-select-val')?.value) || 9;
    let weeks = [1, 2, 3, 4];
    if (mVal === 10) weeks = [5, 6, 7, 8];
    else if (mVal === 11) weeks = [9, 10, 11, 12];
    else if (mVal === 12) weeks = [13, 14, 15, 16];
    else if (mVal === 1) weeks = [17, 18];
    else if (mVal === 102) weeks = [19, 20, 21];
    else if (mVal === 2) weeks = [22, 23];
    else if (mVal === 3) weeks = [24, 25, 26, 27];
    else if (mVal === 4) weeks = [28, 29, 30, 31, 32];
    else if (mVal === 5) weeks = [33, 34, 35];
    attLogs = attLogs.filter(l => weeks.includes(parseInt(String(l.week).replace(/[^0-9]/g, '')) || 1));
  } else if (currentAttendanceScope === 'semester') {
    const semVal = parseInt(document.getElementById('att-select-val')?.value) || 1;
    attLogs = attLogs.filter(l => {
      const w = parseInt(String(l.week).replace(/[^0-9]/g, '')) || 1;
      return semVal === 1 ? (w >= 1 && w <= 18) : (w >= 19 && w <= 35);
    });
  }

  // 3. Thống kê theo từng học sinh
  let totalP = 0;
  let totalKP = 0;
  let totalLate = 0;

  const studentStats = classStudents.map(s => {
    const sId = String(s.id).trim();
    const sCode = String(s.code || '').trim().toUpperCase();
    const sName = String(s.name || '').trim().toLowerCase();

    const myLogs = attLogs.filter(l => {
      return (l.studentId && (l.studentId === sId || l.studentId === sCode)) ||
             (sCode && l.studentCode && String(l.studentCode).trim().toUpperCase() === sCode) ||
             (sName && l.studentName && String(l.studentName).trim().toLowerCase() === sName);
    });

    let pCount = 0;
    let kpCount = 0;
    let lateCount = 0;
    const details = [];

    myLogs.forEach(l => {
      const title = String(l.critTitle || '').toLowerCase();
      const id = String(l.critId || '').toLowerCase();
      const dateInfo = l.exactDate ? ` (${l.exactDate})` : '';

      // Nghỉ có phép (P): tp_3 hoặc title chứa "có phép"
      if (id === 'tp_3' || id === 'vang_co_phep' || id === 'nghi_phep' ||
          (title.includes('có phép') && !title.includes('không'))) {
        pCount++;
        totalP++;
        details.push(`Vắng (P)${dateInfo}`);
      // Nghỉ không phép (KP): tp_2 hoặc title chứa "không phép"
      } else if (id === 'tp_2' || id === 'vang_khong_phep' || id === 'nghi_kp' ||
                 title.includes('không phép')) {
        kpCount++;
        totalKP++;
        details.push(`Vắng (KP)${dateInfo}`);
      // Đi trễ / muộn: tp_1 hoặc title chứa "trễ", "muộn"
      } else if (id === 'tp_1' || id === 'di_tre' ||
                 title.includes('trễ') || title.includes('muộn')) {
        lateCount++;
        totalLate++;
        details.push(`Trễ${dateInfo}`);
      // Mặc định: các log chuyên cần khác tính là vắng có phép
      } else {
        pCount++;
        totalP++;
        details.push(`${l.critTitle || 'Vắng'}${dateInfo}`);
      }
    });

    const totalAbsent = pCount + kpCount;
    return {
      ...s,
      pCount,
      kpCount,
      lateCount,
      totalAbsent,
      detailsText: details.join(', ') || 'Đầy đủ'
    };
  });

  studentStats.sort((a, b) => (b.totalAbsent + b.lateCount) - (a.totalAbsent + a.lateCount));
  return { attLogs, totalP, totalKP, totalLate, totalAbsent: totalP + totalKP, studentStats };
}

function renderAttendanceReport() {
  const data = getFilteredAttendanceData();

  const statTotal = document.getElementById('att-stat-total-absent');
  const statP = document.getElementById('att-stat-p');
  const statKP = document.getElementById('att-stat-kp');
  const statLate = document.getElementById('att-stat-late');

  if (statTotal) statTotal.innerText = `${data.totalAbsent} lượt`;
  if (statP) statP.innerText = `${data.totalP} lượt`;
  if (statKP) statKP.innerText = `${data.totalKP} lượt`;
  if (statLate) statLate.innerText = `${data.totalLate} lượt`;

  const container = document.getElementById('att-report-list-container');
  if (!container) return;

  if (data.studentStats.length === 0) {
    container.innerHTML = '<p class="text-center text-slate-500 text-xs py-4">Chưa có học sinh nào trong lớp.</p>';
    return;
  }

  let html = '';
  data.studentStats.forEach((s, idx) => {
    const hasRecord = (s.totalAbsent + s.lateCount) > 0;
    html += `
      <div class="flex items-center justify-between p-2.5 rounded-xl ${hasRecord ? 'bg-slate-900/90 border-amber-500/40' : 'bg-slate-950/60 border-slate-800'} border text-xs">
        <div class="flex items-center gap-2 min-w-0">
          <span class="w-5 font-mono text-[10px] text-slate-400 font-bold">${idx + 1}</span>
          <div class="min-w-0">
            <span class="font-bold text-white truncate block">${s.name} <span class="text-amber-300 text-[10px] font-mono">(${s.code})</span></span>
            <span class="text-[10px] text-slate-400">Tổ ${s.team} • ${s.detailsText}</span>
          </div>
        </div>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-lg ${s.pCount > 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-500'}">P: ${s.pCount}</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-lg ${s.kpCount > 0 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-800 text-slate-500'}">KP: ${s.kpCount}</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-lg ${s.lateCount > 0 ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' : 'bg-slate-800 text-slate-500'}">Trễ: ${s.lateCount}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function exportAttendanceReportPdf() {
  const data = getFilteredAttendanceData();
  const curClass = (appState.classInfo?.className || '10A1').toUpperCase();
  const schoolName = (appState.classInfo?.schoolName || 'TRƯỜNG THPT').toUpperCase();
  const teacherName = appState.classInfo?.teacherName || 'GVCN';
  const today = new Date();
  const dateStr = `Ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;

  let scopeTitle = 'BÁO CÁO THỐNG KÊ CHUYÊN CẦN & VẮNG HỌC';
  if (currentAttendanceScope === 'day') scopeTitle += ` (NGÀY ${document.getElementById('att-select-day')?.value || ''})`;
  else if (currentAttendanceScope === 'week') scopeTitle += ` (TUẦN ${document.getElementById('att-select-val')?.value || 1})`;
  else if (currentAttendanceScope === 'month') scopeTitle += ` (THÁNG ${document.getElementById('att-select-val')?.value || 9})`;
  else if (currentAttendanceScope === 'semester') scopeTitle += ` (HỌC KỲ ${document.getElementById('att-select-val')?.value || 1})`;
  else if (currentAttendanceScope === 'year') scopeTitle += ` (CẢ NĂM HỌC 2026 - 2027)`;

  let rowsHtml = '';
  data.studentStats.forEach((s, idx) => {
    rowsHtml += `
      <tr style="background:${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}; text-align:center;">
        <td style="border:1px solid #334155; padding:6px 4px;">${idx + 1}</td>
        <td style="border:1px solid #334155; padding:6px 4px; font-weight:bold;">${s.code}</td>
        <td style="border:1px solid #334155; padding:6px 8px; text-align:left; font-weight:bold;">${s.name}</td>
        <td style="border:1px solid #334155; padding:6px 4px;">Tổ ${s.team}</td>
        <td style="border:1px solid #334155; padding:6px 4px; font-weight:bold; color:${s.pCount > 0 ? '#d97706' : '#64748b'};">${s.pCount}</td>
        <td style="border:1px solid #334155; padding:6px 4px; font-weight:bold; color:${s.kpCount > 0 ? '#dc2626' : '#64748b'};">${s.kpCount}</td>
        <td style="border:1px solid #334155; padding:6px 4px; font-weight:bold; color:${s.lateCount > 0 ? '#2563eb' : '#64748b'};">${s.lateCount}</td>
        <td style="border:1px solid #334155; padding:6px 8px; text-align:left; font-size:11px;">${s.detailsText}</td>
      </tr>
    `;
  });

  const printHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${scopeTitle} - Lớp ${curClass}</title>
      <style>
        @page { size: A4 portrait; margin: 15mm; }
        body { font-family: 'Times New Roman', serif; font-size: 13px; line-height: 1.4; color: #0f172a; margin: 0; padding: 20px; }
        .header-tbl { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .header-tbl td { vertical-align: top; }
        .title { text-align: center; font-size: 16px; font-weight: bold; margin: 15px 0 5px 0; text-transform: uppercase; }
        .summary-box { margin: 15px 0; padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 8px; font-size: 12px; }
        .main-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
        .main-table th { border: 1px solid #334155; padding: 8px 4px; background: #e2e8f0; font-weight: bold; text-align: center; }
        .footer-tbl { width: 100%; border-collapse: collapse; margin-top: 30px; }
        .footer-tbl td { text-align: center; vertical-align: top; width: 50%; }
      </style>
    </head>
    <body>
      <table class="header-tbl">
        <tr>
          <td style="text-align: left; width: 45%;">
            <b>${schoolName}</b><br>
            <b>LỚP: ${curClass}</b><br>
            <span>GVCN: ${teacherName}</span>
          </td>
          <td style="text-align: center; width: 55%;">
            <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br>
            <b>Độc lập - Tự do - Hạnh phúc</b><br>
            <span style="font-size:11px;">---------------</span>
          </td>
        </tr>
      </table>

      <div class="title">${scopeTitle}</div>
      <div style="text-align:center; font-style:italic; font-size:12px; margin-bottom:15px;">(Trích xuất từ Sổ Thi Đua Lớp Học Số)</div>

      <div class="summary-box">
        <b>TỔNG HỢP CHUYÊN CẦN LỚP ${curClass}:</b><br>
        • Tổng số học sinh: <b>${data.studentStats.length} em</b> | Tổng lượt vắng: <b style="color:#dc2626;">${data.totalAbsent} lượt</b><br>
        • Vắng có phép (P): <b>${data.totalP} lượt</b> | Vắng không phép (KP): <b style="color:#dc2626;">${data.totalKP} lượt</b> | Đi trễ: <b>${data.totalLate} lượt</b>
      </div>

      <table class="main-table">
        <thead>
          <tr>
            <th style="width:35px;">STT</th>
            <th style="width:75px;">Mã HS</th>
            <th>Họ và Tên</th>
            <th style="width:45px;">Tổ</th>
            <th style="width:55px;">Có Phép (P)</th>
            <th style="width:55px;">K.Phép (KP)</th>
            <th style="width:55px;">Đi Trễ</th>
            <th>Chi Tiết Lượt Ghi Nhận</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <table class="footer-tbl">
        <tr>
          <td></td>
          <td>
            <i>${dateStr}</i><br>
            <b>GIÁO VIÊN CHỦ NHIỆM</b><br>
            <span style="font-size:11px; font-style:italic;">(Ký và ghi rõ họ tên)</span><br><br><br><br>
            <b>${teacherName}</b>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  }
}

function exportAttendanceReportExcel() {
  const data = getFilteredAttendanceData();
  const curClass = (appState.classInfo?.className || '10A1').toUpperCase();

  const exportData = data.studentStats.map((s, idx) => ({
    'STT': idx + 1,
    'Mã Học Sinh': s.code,
    'Họ và Tên': s.name,
    'Tổ': s.team,
    'Vắng Có Phép (P)': s.pCount,
    'Vắng Không Phép (KP)': s.kpCount,
    'Đi Trễ': s.lateCount,
    'Tổng Lượt Vắng': s.totalAbsent,
    'Chi Tiết Ngày & Buổi': s.detailsText
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, ws, `Vang_${curClass}`);
  XLSX.writeFile(wb, `Bao_Cao_Vang_Chuyen_Can_${curClass}_${currentAttendanceScope}.xlsx`);
  showToast('🎉 Đã xuất thành công file Excel Báo Cáo Chuyên Cần!', 'success');
}


// ================= HỆ THỐNG XẾP HẠNG ĐA PHẠM VI (TUẦN, THÁNG, HỌC KỲ, CẢ NĂM) =================
let leaderboardScope = 'week';
let leaderboardScopeValue = null;

function getWeeksForCustomScope(scope, val) {
  const curWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  if (scope === 'week') {
    return [parseInt(val) || curWeek];
  } else if (scope === 'month') {
    const m = parseInt(val) || 9;
    if (m === 10) return [5, 6, 7, 8];
    if (m === 11) return [9, 10, 11, 12];
    if (m === 12) return [13, 14, 15, 16];
    if (m === 1) return [17, 18];
    if (m === 102) return [19, 20, 21];
    if (m === 2) return [22, 23];
    if (m === 3) return [24, 25, 26, 27];
    if (m === 4) return [28, 29, 30, 31, 32];
    if (m === 5) return [33, 34, 35];
    return [1, 2, 3, 4];
  } else if (scope === 'semester') {
    const sem = parseInt(val) || 1;
    const w = [];
    if (sem === 1) for (let i = 1; i <= 18; i++) w.push(i);
    else for (let i = 19; i <= 35; i++) w.push(i);
    return w;
  } else if (scope === 'year') {
    const w = [];
    for (let i = 1; i <= 35; i++) w.push(i);
    return w;
  }
  return [curWeek];
}

function setLeaderboardScope(scope) {
  leaderboardScope = scope;
  const curWeek = parseInt(appState.classInfo?.currentWeek) || 1;

  // Tự động khởi tạo giá trị phạm vi tương ứng với tuần hiện tại
  if (scope === 'week') {
    leaderboardScopeValue = curWeek;
  } else if (scope === 'month') {
    leaderboardScopeValue = getMonthFromWeek(curWeek);
  } else if (scope === 'semester') {
    leaderboardScopeValue = curWeek <= 18 ? 1 : 2;
  } else if (scope === 'year') {
    leaderboardScopeValue = 1;
  }

  ['week', 'month', 'semester', 'year'].forEach(s => {
    const btn = document.getElementById(`lb-scope-btn-${s}`);
    if (btn) {
      btn.className = s === scope
        ? 'py-1.5 rounded-xl transition-all text-white bg-indigo-600 shadow'
        : 'py-1.5 rounded-xl transition-all text-slate-400 hover:text-white';
    }
  });

  renderLeaderboardScopeSelector();
  renderLeaderboard();
}

function renderLeaderboardScopeSelector() {
  const container = document.getElementById('leaderboard-scope-detail-container');
  if (!container) return;

  const curWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  let html = '';

  if (leaderboardScope === 'week') {
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="text-[11px] text-amber-300 font-bold">Chọn Tuần:</label>
        <select id="lb-select-val" onchange="onLeaderboardScopeValChange(this.value)" class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-white font-bold">
    `;
    if (typeof OFFICIAL_WEEK_SCHEDULE !== 'undefined') {
      OFFICIAL_WEEK_SCHEDULE.forEach(item => {
        const isCur = Number(item.week) === Number(leaderboardScopeValue || curWeek);
        const noteStr = item.note ? ` [${item.note}]` : '';
        html += `<option value="${item.week}" ${isCur ? 'selected' : ''}>Tuần ${item.week} (${item.range})${noteStr}</option>`;
      });
    }
    html += `</select></div>`;
  } else if (leaderboardScope === 'month') {
    const selM = Number(leaderboardScopeValue || getMonthFromWeek(curWeek));
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="text-[11px] text-amber-300 font-bold">Chọn Tháng:</label>
        <select id="lb-select-val" onchange="onLeaderboardScopeValChange(this.value)" class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-white font-bold">
          <optgroup label="HỌC KỲ I">
            <option value="9" ${selM === 9 ? 'selected' : ''}>Tháng 9/2026 (Tuần 1 - 4)</option>
            <option value="10" ${selM === 10 ? 'selected' : ''}>Tháng 10/2026 (Tuần 5 - 8)</option>
            <option value="11" ${selM === 11 ? 'selected' : ''}>Tháng 11/2026 (Tuần 9 - 12)</option>
            <option value="12" ${selM === 12 ? 'selected' : ''}>Tháng 12/2026 (Tuần 13 - 16)</option>
            <option value="1" ${selM === 1 ? 'selected' : ''}>Tháng 1/2027 (Tuần 17 - 18)</option>
          </optgroup>
          <optgroup label="HỌC KỲ II">
            <option value="102" ${selM === 102 ? 'selected' : ''}>Tháng 1/2027 HK2 (Tuần 19 - 21)</option>
            <option value="2" ${selM === 2 ? 'selected' : ''}>Tháng 2/2027 (Tuần 22 - 23)</option>
            <option value="3" ${selM === 3 ? 'selected' : ''}>Tháng 3/2027 (Tuần 24 - 27)</option>
            <option value="4" ${selM === 4 ? 'selected' : ''}>Tháng 4/2027 (Tuần 28 - 32)</option>
            <option value="5" ${selM === 5 ? 'selected' : ''}>Tháng 5/2027 (Tuần 33 - 35)</option>
          </optgroup>
        </select>
      </div>
    `;
  } else if (leaderboardScope === 'semester') {
    html = `
      <div class="flex items-center justify-between gap-2">
        <label class="text-[11px] text-amber-300 font-bold">Chọn Học Kỳ:</label>
        <select id="lb-select-val" onchange="onLeaderboardScopeValChange(this.value)" class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-white font-bold">
          <option value="1">Học Kỳ I (Tuần 1 - 18 • 18 tuần)</option>
          <option value="2">Học Kỳ II (Tuần 19 - 35 • 17 tuần)</option>
        </select>
      </div>
    `;
  } else if (leaderboardScope === 'year') {
    html = `
      <div class="text-center font-bold text-amber-300 py-0.5 text-xs">
        🏆 Tổng Kết Điểm & Vinh Danh Cả Năm Học (35 Tuần)
      </div>
    `;
  }

  container.innerHTML = html;
}

function onLeaderboardScopeValChange(val) {
  if (leaderboardScope === 'week') {
    selectWeek(Number(val));
    return;
  }
  leaderboardScopeValue = val;
  renderLeaderboard();
}

// ================= HÀM TÍNH ĐIỂM & XẾP LOẠI HẠNH KIỂM CHUẨN XÁC THEO PHÂN CẤP =================
// 1. Theo Tuần: Lấy điểm của chính tuần đó
// 2. Theo Tháng: Lấy Điểm Trung Bình Cộng của các tuần trong tháng đó
// 3. Theo Học Kỳ: Lấy Điểm Trung Bình Cộng của tất cả các THÁNG trong học kỳ đó
// 4. Theo Cả Năm: Lấy Điểm Trung Bình Cộng của 2 Học Kỳ (hoặc các tháng trong năm)
function calculateScopeScoreForStudent(studentId, scope, scopeVal) {
  const curWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  const hasLogsInWeek = (w) => (appState.logs || []).some(l => (parseInt(String(l.week).replace(/[^0-9]/g, '')) || 1) === w);

  // Danh sách các tuần thuộc từng tháng
  const MONTHS_DEFINITION = {
    9: [1, 2, 3, 4],
    10: [5, 6, 7, 8],
    11: [9, 10, 11, 12],
    12: [13, 14, 15, 16],
    1: [17, 18],
    102: [19, 20, 21], // Tháng 1 HK2
    2: [22, 23],
    3: [24, 25, 26, 27],
    4: [28, 29, 30, 31, 32],
    5: [33, 34, 35]
  };

  const getMonthAvgScore = (mVal) => {
    const weeks = MONTHS_DEFINITION[mVal] || [1];
    let sum = 0;
    weeks.forEach(w => {
      sum += calculateStudentScore(studentId, w).score;
    });
    return {
      avg: Number((sum / weeks.length).toFixed(1)),
      evalWeeksCount: weeks.length
    };
  };

  if (scope === 'week') {
    // 1. XẾP LOẠI THEO TUẦN: Lấy số điểm tuần đó
    const targetWeek = parseInt(scopeVal) || curWeek;
    const st = calculateStudentScore(studentId, targetWeek);
    const conduct = calculateMonthlyConduct(st.score, 1);
    return {
      score: st.score,
      totalScore: st.score,
      evalWeeksCount: 1,
      plus: st.plusPts,
      minus: st.minusPts,
      isNearDrop: conduct.isNearDrop,
      nearDropMsg: conduct.nearDropMsg,
      rankLabel: conduct.rank,
      rankBadge: conduct.badge,
      rankColor: conduct.color
    };
  } else if (scope === 'month') {
    // 2. XẾP LOẠI THEO THÁNG: Lấy Điểm Trung Bình Cộng của TẤT CẢ các tuần trong tháng đó
    // Tuần chưa có dữ liệu sẽ mặc định = điểm chuẩn (100đ)
    // Ví dụ: Tháng 9 có 4 tuần, chỉ tuần 1 có 90đ => TB = (90 + 100 + 100 + 100) / 4 = 97.5đ
    const mVal = parseInt(scopeVal) || 9;
    const weeks = MONTHS_DEFINITION[mVal] || [1, 2, 3, 4];

    let totalScore = 0;
    let totalPlus = 0;
    let totalMinus = 0;
    weeks.forEach(w => {
      const st = calculateStudentScore(studentId, w);
      totalScore += st.score;
      totalPlus += st.plusPts;
      totalMinus += st.minusPts;
    });

    const avgScore = Number((totalScore / weeks.length).toFixed(1));
    const conduct = calculateMonthlyConduct(avgScore, 1);
    return {
      score: avgScore,
      totalScore,
      evalWeeksCount: weeks.length,
      plus: totalPlus,
      minus: totalMinus,
      isNearDrop: conduct.isNearDrop,
      nearDropMsg: conduct.nearDropMsg,
      rankLabel: conduct.rank,
      rankBadge: conduct.badge,
      rankColor: conduct.color
    };
  } else if (scope === 'semester') {
    // 3. XẾP LOẠI THEO HỌC KỲ: Lấy Điểm TB Cộng của TẤT CẢ các THÁNG trong học kỳ đó
    // Tháng chưa có dữ liệu sẽ mặc định = điểm chuẩn (100đ) vì mỗi tuần đều mặc định 100đ
    const semVal = parseInt(scopeVal) || 1;
    const monthsInSem = semVal === 1 ? [9, 10, 11, 12, 1] : [102, 2, 3, 4, 5];

    const monthScores = monthsInSem.map(mVal => getMonthAvgScore(mVal).avg);
    const semAvg = Number((monthScores.reduce((sum, v) => sum + v, 0) / monthScores.length).toFixed(1));
    const conduct = calculateMonthlyConduct(semAvg, 1);

    return {
      score: semAvg,
      totalScore: semAvg,
      evalMonthsCount: monthScores.length,
      plus: 0,
      minus: 0,
      rankLabel: conduct.rank,
      rankBadge: conduct.badge,
      rankColor: conduct.color
    };
  } else if (scope === 'year') {
    // 4. XẾP LOẠI THEO CẢ NĂM: Lấy Trung Bình Cộng của 2 Học Kỳ (TB HK1 + TB HK2) / 2
    // Mỗi Học Kỳ = TB cộng TẤT CẢ các tháng trong HK (tháng chưa có dữ liệu = điểm chuẩn 100đ)
    const getSemesterAvg = (semVal) => {
      const monthsInSem = semVal === 1 ? [9, 10, 11, 12, 1] : [102, 2, 3, 4, 5];
      const monthScores = monthsInSem.map(mVal => getMonthAvgScore(mVal).avg);
      return Number((monthScores.reduce((sum, v) => sum + v, 0) / monthScores.length).toFixed(1));
    };

    const hk1Avg = getSemesterAvg(1);
    const hk2Avg = getSemesterAvg(2);
    const yearAvg = Number(((hk1Avg + hk2Avg) / 2).toFixed(1));

    const conduct = calculateMonthlyConduct(yearAvg, 1);

    return {
      score: yearAvg,
      totalScore: yearAvg,
      hk1Avg: hk1Avg,
      hk2Avg: hk2Avg,
      plus: 0,
      minus: 0,
      rankLabel: conduct.rank,
      rankBadge: conduct.badge,
      rankColor: conduct.color
    };
  }

  return { score: 100, rankLabel: 'Tốt', rankBadge: '🥇 Tốt', rankColor: 'text-emerald-400' };
}

// Multi-Period Student Portal Scope Support
let studentViewScope = 'week';
let studentViewScopeValue = null;

function setStudentViewScope(scope) {
  studentViewScope = scope;
  const curWeek = parseInt(appState.classInfo?.currentWeek) || 1;

  if (scope === 'week') {
    studentViewScopeValue = curWeek;
  } else if (scope === 'month') {
    studentViewScopeValue = getMonthFromWeek(curWeek);
  } else if (scope === 'semester') {
    studentViewScopeValue = curWeek <= 18 ? 1 : 2;
  } else if (scope === 'year') {
    studentViewScopeValue = 1;
  }

  ['week', 'month', 'semester', 'year'].forEach(s => {
    const btn = document.getElementById(`st-scope-btn-${s}`);
    if (btn) {
      btn.className = s === scope
        ? 'px-2 py-0.5 rounded-lg bg-indigo-600 text-white shadow'
        : 'px-2 py-0.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white';
    }
  });
  renderStudentScopeDetailSelector();
  renderStudentPortalView();
}

function renderStudentScopeDetailSelector() {
  const container = document.getElementById('student-scope-detail-container');
  if (!container) return;

  const curWeek = parseInt(appState.classInfo?.currentWeek) || 1;
  let html = '';

  if (studentViewScope === 'week') {
    const selectedW = Number(studentViewScopeValue || curWeek);
    html = `<select id="st-scope-select-val" onchange="onStudentScopeValChange(this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-[11px] text-indigo-300 font-bold">`;
    if (typeof OFFICIAL_WEEK_SCHEDULE !== 'undefined') {
      OFFICIAL_WEEK_SCHEDULE.forEach(item => {
        const isSelected = Number(item.week) === selectedW;
        const isLive = Number(item.week) === curWeek;
        html += `<option value="${item.week}" ${isSelected ? 'selected' : ''}>Tuần ${item.week}${isLive ? ' (Hiện tại)' : ''}</option>`;
      });
    } else {
      for (let w = 1; w <= (appState.classInfo?.totalWeeks || 18); w++) {
        const isSelected = Number(w) === selectedW;
        const isLive = Number(w) === curWeek;
        html += `<option value="${w}" ${isSelected ? 'selected' : ''}>Tuần ${w}${isLive ? ' (Hiện tại)' : ''}</option>`;
      }
    }
    html += `<option value="all" ${String(selectedW) === 'all' ? 'selected' : ''}>📂 Tất cả các tuần (Lịch sử)</option>`;
    html += `</select>`;
  } else if (studentViewScope === 'month') {
    const selM = Number(studentViewScopeValue || getMonthFromWeek(curWeek));
    html = `
      <select id="st-scope-select-val" onchange="onStudentScopeValChange(this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-[11px] text-amber-300 font-bold">
        <option value="9" ${selM === 9 ? 'selected' : ''}>Tháng 9</option>
        <option value="10" ${selM === 10 ? 'selected' : ''}>Tháng 10</option>
        <option value="11" ${selM === 11 ? 'selected' : ''}>Tháng 11</option>
        <option value="12" ${selM === 12 ? 'selected' : ''}>Tháng 12</option>
        <option value="1" ${selM === 1 ? 'selected' : ''}>Tháng 1</option>
        <option value="102" ${selM === 102 ? 'selected' : ''}>Tháng 1 (HK2)</option>
        <option value="2" ${selM === 2 ? 'selected' : ''}>Tháng 2</option>
        <option value="3" ${selM === 3 ? 'selected' : ''}>Tháng 3</option>
        <option value="4" ${selM === 4 ? 'selected' : ''}>Tháng 4</option>
        <option value="5" ${selM === 5 ? 'selected' : ''}>Tháng 5</option>
      </select>
    `;
  } else if (studentViewScope === 'semester') {
    html = `
      <select id="st-scope-select-val" onchange="onStudentScopeValChange(this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-[11px] text-indigo-300 font-bold">
        <option value="1">Học Kỳ 1</option>
        <option value="2">Học Kỳ 2</option>
      </select>
    `;
  } else if (studentViewScope === 'year') {
    html = `<span class="text-[10px] font-bold text-amber-300 block text-right">Cả Năm Học</span>`;
  }

  container.innerHTML = html;
}

function onStudentScopeValChange(val) {
  studentViewScopeValue = val;
  renderStudentPortalView();
}

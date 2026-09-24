/**
 * MAIN CONTROLLER & APPLICATION LOGIC - THI ĐUA CHỦ NHIỆM 9A4
 */

class AppController {
  constructor() {
    this.currentTab = 'table';
    this.currentGroup = 'all';
    this.currentWeek = 1;
    this.currentDay = 'T2';
    this.activeScoringStudentId = null;
    this.activeScoringDay = 'T2';
    this.bienBanWeek = 1;
    this.bienBanMode = 'auto';
  }

  init() {
    this.checkUrlHashSync();
    this.setupEventListeners();
    this.updateViewVisibility();

    // Trigger proactive boot cloud hydration for fresh or returning devices
    this.bootCloudHydration();

    if (window.authManager.isLoggedIn()) {
      this.refreshAll();
    }

    // Listen to Auth Changes
    window.addEventListener('auth:changed', (e) => {
      this.updateViewVisibility();
      if (window.authManager.isLoggedIn()) {
        this.refreshAll();
      }
    });

    // Proactive PWA Service Worker registration & auto-update
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        reg.update();
        reg.onupdatefound = () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                if (window.chibiNotifications) {
                  window.chibiNotifications.showToast('Bản cập nhật mới! ✨', 'Hệ thống đã tự động cập nhật phiên bản mới nhất.', 'info');
                }
                setTimeout(() => window.location.reload(), 1000);
              }
            };
          }
        };
      }).catch(err => {
        console.log('SW registration skipped:', err);
      });

      // Auto check update whenever app becomes active on mobile
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          navigator.serviceWorker.getRegistration().then(reg => {
            if (reg) reg.update();
          });
        }
      });
    }

    console.log('AppController initialized successfully.');
  }

  async bootCloudHydration() {
    const overlay = document.getElementById('cloud-boot-overlay');
    const isFresh = window.classData && (window.classData.isFreshDevice || !window.classData.data.settings || window.classData.data.settings.updatedAt === 0);

    // Show loading overlay on fresh devices or when local data is empty
    if (overlay && isFresh && typeof navigator !== 'undefined' && navigator.onLine) {
      overlay.style.display = 'flex';
      overlay.style.opacity = '1';
    }

    try {
      if (window.classData && typeof navigator !== 'undefined' && navigator.onLine) {
        // Đồng bộ dữ liệu mới nhất từ Firebase khi khởi động (thời gian chờ tối đa 6s)
        const syncPromise = window.classData.syncFromCloud(true);
        const timeoutPromise = new Promise(resolve => setTimeout(resolve, 6000));
        await Promise.race([syncPromise, timeoutPromise]);
      }
    } catch(e) {
      console.warn('Boot cloud hydration non-critical error:', e);
    } finally {
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 300);
      }
      this.populatePortalStudentSelect();
      this.populatePortalTeacherSelect();
      if (window.authManager.isLoggedIn()) {
        this.refreshAll();
      }
    }
  }

  setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.nav-tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', (e) => {
        const tabId = tabBtn.dataset.tab;
        this.switchTab(tabId);
      });
    });

    // Week selector
    const weekSelect = document.getElementById('select-week');
    if (weekSelect) {
      weekSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        this.currentWeek = (val === 'hk1' || val === 'hk2' || val === 'all-year') ? val : parseInt(val, 10);
        this.refreshAll();
        if (window.chibiSound) window.chibiSound.playClick();
      });
    }

    // Sound toggle button
    const btnSound = document.getElementById('btn-sound-toggle');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const isMuted = window.chibiSound.toggleMute();
        btnSound.innerHTML = isMuted ? '🔇' : '🔊';
        btnSound.title = isMuted ? 'Bật âm thanh' : 'Tắt âm thanh';
        if (!isMuted) window.chibiSound.playBell();
      });
      btnSound.innerHTML = window.chibiSound.isMuted() ? '🔇' : '🔊';
    }

    // Push permission request button in banner
    const btnPush = document.getElementById('btn-request-push');
    if (btnPush) {
      btnPush.addEventListener('click', () => {
        window.chibiNotifications.requestMobilePushPermission();
      });
    }

    // Export Excel Button
    const btnExport = document.getElementById('btn-export-excel');
    if (btnExport) {
      btnExport.addEventListener('click', () => this.exportExcel());
    }

    // Print Button
    const btnPrint = document.getElementById('btn-print-table');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => window.print());
    }

    // Header User Account badge click -> Login / Profile Modal
    const userBadge = document.getElementById('header-user-badge');
    if (userBadge) {
      userBadge.addEventListener('click', () => this.openLoginModal());
    }

    // Modal Close buttons
    document.querySelectorAll('.btn-close-modal, .modal-backdrop').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el || e.target.classList.contains('btn-close-modal') || e.target.closest('.btn-close-modal')) {
          this.closeAllModals();
        }
      });
    });

    // Prevent closing when clicking modal content
    document.querySelectorAll('.modal-content').forEach(content => {
      content.addEventListener('click', (e) => e.stopPropagation());
    });

    // Settings Modal Save
    const formSettings = document.getElementById('form-class-settings');
    if (formSettings) {
      formSettings.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveClassSettings();
      });
    }

    // Score Modal Form Save
    const formScore = document.getElementById('form-add-score');
    if (formScore) {
      formScore.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveScoreEvent();
      });
    }

    // Send Message Form Save
    const formMsg = document.getElementById('form-send-message');
    if (formMsg) {
      formMsg.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSendMessage();
      });
    }

    // Login Form Submit (Old Modal)
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
      formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLoginSubmit();
      });
    }

    // Portal Student Login Form Submit
    const formPortalStudent = document.getElementById('form-portal-student-login');
    if (formPortalStudent) {
      formPortalStudent.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentId = document.getElementById('portal-student-select').value;
        const pass = document.getElementById('portal-student-pass').value;
        const btnSubmit = formPortalStudent.querySelector('button[type="submit"]');
        const origText = btnSubmit ? btnSubmit.innerHTML : 'ĐĂNG NHẬP HỌC SINH ✨';

        if (!studentId) {
          alert('Vui lòng chọn tên của em trong danh sách!');
          return;
        }

        if (btnSubmit) {
          btnSubmit.disabled = true;
          btnSubmit.innerHTML = '🔄 Đang xác thực...';
        }

        try {
          const res = await window.authManager.loginStudentById(studentId, pass);
          if (res.success) {
            if (window.chibiSound) window.chibiSound.playPlus();
            if (window.chibiConfetti) window.chibiConfetti.fire({ count: 60 });
            window.chibiNotifications.showToast('Đăng nhập thành công! ✨', `Chào mừng ${res.user.name} (${res.user.roleName})!`, 'success');
            // Chuyển sang bảng thi đua ngay lập tức
            this.updateViewVisibility();
            this.refreshAll();
          } else {
            if (window.chibiSound) window.chibiSound.playMinus();
            alert(res.message);
          }
        } catch(err) {
          console.error('Login student error:', err);
          alert('Lỗi đăng nhập: ' + err.message);
        } finally {
          if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = origText;
          }
        }
      });
    }

    // Portal Teacher Login Form Submit
    const formPortalTeacher = document.getElementById('form-portal-teacher-login');
    if (formPortalTeacher) {
      formPortalTeacher.addEventListener('submit', async (e) => {
        e.preventDefault();
        const teacherUser = document.getElementById('portal-teacher-select') ? document.getElementById('portal-teacher-select').value : 'admin';
        const pass = document.getElementById('portal-teacher-pass').value;
        const btnSubmit = formPortalTeacher.querySelector('button[type="submit"]');
        const origText = btnSubmit ? btnSubmit.innerHTML : 'ĐĂNG NHẬP GIÁO VIÊN 🚀';

        if (btnSubmit) {
          btnSubmit.disabled = true;
          btnSubmit.innerHTML = '🔄 Đang xác thực...';
        }

        try {
          const res = await window.authManager.loginTeacher(pass, teacherUser);
          if (res.success) {
            if (window.chibiSound) window.chibiSound.playPlus();
            if (window.chibiConfetti) window.chibiConfetti.fire({ count: 60 });
            window.chibiNotifications.showToast('Đăng nhập thành công! 🌟', `Chào mừng ${res.user.name}!`, 'success');
            // Chuyển sang bảng thi đua ngay lập tức
            this.updateViewVisibility();
            this.refreshAll();
          } else {
            if (window.chibiSound) window.chibiSound.playMinus();
            alert(res.message);
          }
        } catch(err) {
          console.error('Login teacher error:', err);
          alert('Lỗi đăng nhập: ' + err.message);
        } finally {
          if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = origText;
          }
        }
      });
    }

    // Change Password Form Submit
    const formChangePass = document.getElementById('form-change-password');
    if (formChangePass) {
      formChangePass.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleChangePasswordSubmit();
      });
    }

    // Add Teacher Form Submit
    const formAddTeacher = document.getElementById('form-add-teacher');
    if (formAddTeacher) {
      formAddTeacher.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddTeacherSubmit();
      });
    }

    // Add Criteria Form Submit
    const formAddCriteria = document.getElementById('form-add-criteria');
    if (formAddCriteria) {
      formAddCriteria.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddCriteriaSubmit();
      });
    }

    // Feedback inputs auto-save
    const elTeacher = document.getElementById('input-feedback-teacher');
    if (elTeacher) {
      elTeacher.addEventListener('change', () => this.saveFeedbackData());
    }
  }

  // --- VIEW VISIBILITY (LOGIN PORTAL VS MAIN DASHBOARD) ---
  updateViewVisibility() {
    const isLoggedIn = window.authManager.isLoggedIn();
    const viewLogin = document.getElementById('view-login');
    const viewApp = document.getElementById('view-app');

    if (viewLogin) {
      viewLogin.style.display = isLoggedIn ? 'none' : 'flex';
    }
    if (viewApp) {
      viewApp.style.display = isLoggedIn ? 'flex' : 'none';
    }

    // Luôn cập nhật trạng thái ẩn/hiện tính năng In Biên Bản Tuần
    this.updateBienBanVisibility();

    if (!isLoggedIn) {
      this.populatePortalStudentSelect();
      this.populatePortalTeacherSelect();
    }
  }

  // --- CẬP NHẬT QUYỀN TRUY CẬP TÍNH NĂNG IN BIÊN BẢN TUẦN ---
  updateBienBanVisibility() {
    const isGVCN = Boolean(
      window.authManager &&
      typeof window.authManager.isHomeroomTeacher === 'function' &&
      window.authManager.isHomeroomTeacher()
    );

    if (document.body) {
      document.body.classList.toggle('is-gvcn', isGVCN);
    }

    const btnBienBanHeader = document.getElementById('btn-open-bienban');
    if (btnBienBanHeader) {
      btnBienBanHeader.style.display = isGVCN ? 'inline-flex' : 'none';
    }

    const btnBienBanTable = document.getElementById('btn-open-bienban-table');
    if (btnBienBanTable) {
      btnBienBanTable.style.display = isGVCN ? 'inline-flex' : 'none';
    }

    // Nếu không phải GVCN mà modal đang mở thì đóng ngay lập tức
    if (!isGVCN) {
      const modal = document.getElementById('modal-bienban-sinhoat');
      if (modal && modal.classList.contains('active')) {
        this.closeBienBanModal();
      }
    }
  }

  populatePortalStudentSelect() {
    const select = document.getElementById('portal-student-select');
    if (!select || !window.classData) return;

    select.innerHTML = '<option value="">-- Bấm vào đây để chọn tên của em --</option>';

    for (let g = 1; g <= 4; g++) {
      const groupStudents = window.classData.getStudents(g);
      const optGroup = document.createElement('optgroup');
      optGroup.label = `🌟 TỔ ${g} (${groupStudents.length} Học Sinh)`;
      groupStudents.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = `${s.avatar} ${s.name} (${s.roleName})`;
        optGroup.appendChild(opt);
      });
      select.appendChild(optGroup);
    }
  }

  populatePortalTeacherSelect() {
    const select = document.getElementById('portal-teacher-select');
    if (!select || !window.classData) return;

    select.innerHTML = '';
    const teachers = window.classData.getTeachers();
    teachers.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.username;
      opt.textContent = `${t.avatar} ${t.name} (${t.roleName} - ${t.subject})`;
      select.appendChild(opt);
    });
  }

  switchLoginTab(type) {
    const btnStudent = document.getElementById('btn-tab-student');
    const btnTeacher = document.getElementById('btn-tab-teacher');
    const formStudent = document.getElementById('form-portal-student-login');
    const formTeacher = document.getElementById('form-portal-teacher-login');

    if (btnStudent && btnTeacher && formStudent && formTeacher) {
      if (type === 'student') {
        btnStudent.classList.add('active');
        btnTeacher.classList.remove('active');
        formStudent.classList.add('active');
        formTeacher.classList.remove('active');
      } else {
        btnTeacher.classList.add('active');
        btnStudent.classList.remove('active');
        formTeacher.classList.add('active');
        formStudent.classList.remove('active');
      }
    }
    if (window.chibiSound) window.chibiSound.playClick();
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    const targetPane = document.getElementById(`tab-${tabId}`);
    if (targetPane) {
      targetPane.classList.add('active');
    }

    if (window.chibiSound) window.chibiSound.playClick();

    if (tabId === 'leaderboard') {
      this.renderLeaderboard();
      if (window.chibiConfetti) window.chibiConfetti.fire({ count: 100 });
      if (window.chibiSound) window.chibiSound.playFanfare();
    } else if (tabId === 'stats') {
      this.renderStats();
    } else if (tabId === 'mailbox') {
      this.renderMailbox();
    } else if (tabId === 'duty') {
      this.renderDutyTab();
    }
  }

  refreshAll() {
    this.renderHeaderAndUser();
    this.renderGroupPills();
    this.renderTable();
    this.renderSummaryBoxes();
    this.renderFeedback();
    this.renderLeaderboard();
    this.renderStats();
    this.renderMailbox();
    this.renderDutyTab();
  }

  // --- RENDER HEADER & USER ---
  renderHeaderAndUser() {
    const settings = window.classData.getSettings();
    const user = window.authManager.getCurrentUser();

    // Update School and Class text in header
    const elSchool = document.getElementById('header-school-name');
    if (elSchool) elSchool.textContent = settings.schoolName;

    const elClass = document.getElementById('header-class-name');
    if (elClass) elClass.textContent = settings.className;

    const elTeacher = document.getElementById('header-teacher-name');
    if (elTeacher) elTeacher.textContent = settings.teacherName;

    const elSlogan = document.getElementById('footer-slogan-text');
    if (elSlogan) elSlogan.textContent = settings.slogan;

    // Header User badge
    const elUserName = document.getElementById('header-user-name');
    const elUserRole = document.getElementById('header-user-role');
    const elUserAvatar = document.getElementById('header-user-avatar');

    if (elUserName) elUserName.textContent = user.name;
    if (elUserRole) elUserRole.textContent = user.roleName;
    if (elUserAvatar) elUserAvatar.textContent = user.avatar || '🧑‍🎓';

    // Show/Hide Settings button (Teacher only)
    const btnSettings = document.getElementById('btn-open-settings');
    if (btnSettings) {
      btnSettings.style.display = window.authManager.isTeacher() ? 'inline-flex' : 'none';
    }

    // Show/Hide Weekly Report Printing buttons (Homeroom Teacher / GVCN only)
    this.updateBienBanVisibility();
  }

  // --- RENDER TOP QUICK SWITCHER ---
  renderQuickSwitcher() {
    const user = window.authManager.getCurrentUser();
    document.querySelectorAll('.role-pill').forEach(pill => {
      const roleKey = pill.dataset.role;
      let isActive = false;
      if (roleKey === 'teacher' && user.role === 'teacher') isActive = true;
      else if (roleKey === 'leader-1' && user.group === 1 && user.role === 'leader') isActive = true;
      else if (roleKey === 'leader-2' && user.group === 2 && user.role === 'leader') isActive = true;
      else if (roleKey === 'leader-3' && user.group === 3 && user.role === 'leader') isActive = true;
      else if (roleKey === 'leader-4' && user.group === 4 && user.role === 'leader') isActive = true;
      else if (roleKey === 'member-demo' && user.role === 'member') isActive = true;

      pill.classList.toggle('active', isActive);
      pill.onclick = () => {
        window.authManager.quickSwitchTo(roleKey);
      };
    });
  }

  // --- RENDER GROUP FILTER PILLS BASED ON PERMISSIONS ---
  renderGroupPills() {
    const container = document.querySelector('.group-filter-pills');
    if (!container) return;

    const currentUser = window.authManager.getCurrentUser();
    container.innerHTML = '';

    if (currentUser.role === 'member') {
      // Regular student member: Show only their own personal indicator
      const btn = document.createElement('button');
      btn.className = 'group-pill active';
      btn.style.cursor = 'default';
      btn.innerHTML = `⭐ Kết Quả Thi Đua Cá Nhân: <b>${currentUser.name}</b> (Tổ ${currentUser.group})`;
      container.appendChild(btn);
      return;
    }

    if (currentUser.role === 'leader') {
      // Group leader: Show only their own group
      this.currentGroup = String(currentUser.group);
      const groupStudents = window.classData.getStudents(currentUser.group);
      const btn = document.createElement('button');
      btn.className = 'group-pill active';
      btn.style.cursor = 'default';
      btn.innerHTML = `🌟 Danh Sách Thành Viên Tổ ${currentUser.group} (${groupStudents.length} Học Sinh)`;
      container.appendChild(btn);
      return;
    }

    // Teacher / Admin / Monitor / Vice: Full 4-group selector with dynamic student counts
    const totalStudents = window.classData.data.students.length;
    const g1Count = window.classData.getStudents(1).length;
    const g2Count = window.classData.getStudents(2).length;
    const g3Count = window.classData.getStudents(3).length;
    const g4Count = window.classData.getStudents(4).length;

    const pills = [
      { key: 'all', label: `🌟 Toàn Bộ ${totalStudents} Học Sinh` },
      { key: '1', label: `Tổ 1 (${g1Count} HS)` },
      { key: '2', label: `Tổ 2 (${g2Count} HS)` },
      { key: '3', label: `Tổ 3 (${g3Count} HS)` },
      { key: '4', label: `Tổ 4 (${g4Count} HS)` }
    ];

    pills.forEach(p => {
      const btn = document.createElement('button');
      btn.className = `group-pill ${this.currentGroup === p.key ? 'active' : ''}`;
      btn.dataset.group = p.key;
      btn.textContent = p.label;
      btn.onclick = () => {
        this.currentGroup = p.key;
        this.renderGroupPills();
        this.renderTable();
        this.renderSummaryBoxes();
        if (window.chibiSound) window.chibiSound.playClick();
      };
      container.appendChild(btn);
    });
  }

  // --- RENDER THI ĐUA TABLE ---
  renderTable() {
    const tbody = document.getElementById('thidua-table-body');
    if (!tbody) return;

    const currentUser = window.authManager.getCurrentUser();
    const isTeacher = window.authManager.isTeacher();
    const isMember = currentUser.role === 'member';
    const isLeader = currentUser.role === 'leader';

    let students = [];
    if (isMember) {
      const s = window.classData.getStudentById(currentUser.id);
      students = s ? [s] : [];
    } else if (isLeader) {
      students = window.classData.getStudents(currentUser.group);
    } else {
      students = window.classData.getStudents(this.currentGroup);
    }

    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    tbody.innerHTML = '';

    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="12" style="padding: 24px; color: #64748b;">Chưa có học sinh nào.</td></tr>`;
      return;
    }

    students.forEach((student, index) => {
      const scoreData = window.classData.calculateStudentScore(student.id, this.currentWeek);
      const isCurrentStudent = currentUser.id === student.id;
      const canScore = window.authManager.canScoreStudent(student.id);

      const tr = document.createElement('tr');
      if (isCurrentStudent) {
        tr.style.backgroundColor = '#eff6ff';
        tr.style.fontWeight = '700';
      }

      // STT
      let html = `<td class="col-stt">${index + 1}</td>`;

      // Student Name & Avatar
      html += `
        <td class="col-name">
          <div class="student-row-name">
            <span class="student-avatar-mini">${student.avatar}</span>
            <div>
              <div>${student.name} ${isCurrentStudent ? '⭐ (Bạn)' : ''}</div>
              <small style="color: #64748b; font-size: 0.72rem;">Mã: ${student.code}</small>
            </div>
          </div>
        </td>
      `;

      // Role badge
      let roleClass = 'role-member';
      if (student.role === 'monitor') roleClass = 'role-monitor';
      else if (student.role === 'vice') roleClass = 'role-vice';
      else if (student.role === 'leader') roleClass = 'role-leader';

      html += `<td class="col-role"><span class="student-role-badge ${roleClass}">${student.roleName}</span></td>`;

      // Group
      html += `<td class="col-group"><b>Tổ ${student.group}</b></td>`;

      // Days T2 -> T7
      days.forEach(day => {
        const dayData = scoreData.days[day];
        let dayContent = '<span class="score-neutral">-</span>';

        if (dayData && (dayData.plus > 0 || dayData.minus > 0)) {
          let textParts = [];
          if (dayData.plus > 0) textParts.push(`<span class="score-plus">+${dayData.plus}</span>`);
          if (dayData.minus > 0) textParts.push(`<span class="score-minus">-${dayData.minus}</span>`);
          dayContent = textParts.join(' ');
        }

        if (canScore) {
          html += `
            <td class="col-day">
              <button class="score-cell-btn" data-student-id="${student.id}" data-day="${day}" title="Chấm điểm ngày ${day}">
                ${dayContent}
              </button>
            </td>
          `;
        } else {
          html += `
            <td class="col-day">
              <span class="score-cell-btn view-only" style="cursor: default; opacity: 0.95; background: transparent;" title="Chế độ xem cá nhân (Không thể chỉnh sửa)">
                ${dayContent}
              </span>
            </td>
          `;
        }
      });

      // Total Score
      html += `
        <td class="col-total" style="color: ${scoreData.total >= 150 ? '#ca8a04' : (scoreData.total >= 130 ? '#15803d' : (scoreData.total >= 110 ? '#3730a3' : '#b91c1c'))};">
          ${scoreData.total}
        </td>
      `;

      // Star Rank
      const starIcons = '⭐'.repeat(scoreData.stars);
      html += `
        <td class="col-rank">
          <span class="rank-badge ${scoreData.rankClass}" title="${scoreData.rank}">
            ${starIcons} ${scoreData.rank}
          </span>
        </td>
      `;

      // Actions (Quick score / Message)
      html += `<td class="col-actions no-print">`;
      if (canScore) {
        html += `<button class="btn-icon-sm" style="background:#3b82f6;" title="Chấm điểm nhanh" onclick="window.appController.openScoreModal('${student.id}', 'T2')">➕</button>`;
      }
      html += `<button class="btn-icon-sm" style="background:#ec4899;" title="Gửi tin nhắn" onclick="window.appController.openSendMessageModal('${student.id}')">💬</button>`;
      html += `</td>`;

      tr.innerHTML = html;
      tbody.appendChild(tr);
    });

    // Attach click events on day score buttons (only for authorized scorers)
    tbody.querySelectorAll('button.score-cell-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const studentId = btn.dataset.studentId;
        const day = btn.dataset.day;
        this.openScoreModal(studentId, day);
      });
    });
  }

  // --- RENDER 3 SUMMARY BOXES (MATCHING IMAGE 3) ---
  renderSummaryBoxes() {
    const currentUser = window.authManager.getCurrentUser();
    let students = [];
    if (currentUser.role === 'member') {
      const s = window.classData.getStudentById(currentUser.id);
      students = s ? [s] : [];
    } else if (currentUser.role === 'leader') {
      students = window.classData.getStudents(currentUser.group);
    } else {
      students = window.classData.getStudents(this.currentGroup);
    }

    let totalPlus = 0;
    let totalMinus = 0;

    students.forEach(s => {
      const res = window.classData.calculateStudentScore(s.id, this.currentWeek);
      totalPlus += res.plus;
      totalMinus += res.minus;
    });

    const finalScore = 100 + totalPlus - totalMinus;

    const elPlus = document.getElementById('sum-box-plus');
    if (elPlus) elPlus.textContent = `+${totalPlus}`;

    const elMinus = document.getElementById('sum-box-minus');
    if (elMinus) elMinus.textContent = `-${totalMinus}`;

    const elFinal = document.getElementById('sum-box-final');
    if (elFinal) elFinal.textContent = `${finalScore}`;

    // Dynamically render Box 2 Criteria list and count
    const criteriaList = window.classData.getCriteria();
    const boxTitle = document.getElementById('box-criteria-title');
    if (boxTitle) {
      boxTitle.innerHTML = `<span>📋</span> QUY ĐỊNH CHẤM ĐIỂM (${criteriaList.length} TIÊU CHÍ)`;
    }

    const colContainer = document.getElementById('summary-criteria-columns');
    if (colContainer) {
      const plusList = criteriaList.filter(c => c.type === 'plus');
      const minusList = criteriaList.filter(c => c.type === 'minus');

      colContainer.innerHTML = `
        <div>
          <b style="color:#15803d; display:block; margin-bottom:4px;">➕ ĐIỂM CỘNG (${plusList.length}):</b>
          <ul class="criteria-list">
            ${plusList.map(c => `<li><span>${c.icon || '🌸'} ${c.name}</span> <span class="criteria-tag-plus">+${c.points}</span></li>`).join('')}
          </ul>
        </div>
        <div>
          <b style="color:#b91c1c; display:block; margin-bottom:4px;">➖ ĐIỂM TRỪ (${minusList.length}):</b>
          <ul class="criteria-list">
            ${minusList.map(c => `<li><span>${c.icon || '⚠️'} ${c.name}</span> <span class="criteria-tag-minus">-${c.points}</span></li>`).join('')}
          </ul>
        </div>
      `;
    }
  }

  // --- RENDER FEEDBACK INPUTS ---
  renderFeedback() {
    const fb = window.classData.getFeedback(this.currentWeek);
    const isTeacher = window.authManager.isTeacher();

    let periodLabel = `Tuần ${this.currentWeek}`;
    if (this.currentWeek === 'hk1') periodLabel = 'Học Kỳ I';
    else if (this.currentWeek === 'hk2') periodLabel = 'Học Kỳ II';
    else if (this.currentWeek === 'all-year') periodLabel = 'Cả Năm Học';

    const elTeacher = document.getElementById('input-feedback-teacher');
    if (elTeacher) {
      elTeacher.value = fb.teacher || '';
      elTeacher.readOnly = !isTeacher;
      elTeacher.placeholder = isTeacher ? `Thầy Võ Văn Hà nhập nhận xét, đánh giá tổng kết ${periodLabel}...` : `(Chỉ Giáo viên chủ nhiệm mới có quyền nhập nhận xét)`;
    }
  }

  saveFeedbackData() {
    const elTeacher = document.getElementById('input-feedback-teacher');

    const updateObj = {};
    if (elTeacher && window.authManager.isTeacher()) updateObj.teacher = elTeacher.value;

    window.classData.saveFeedback(this.currentWeek, updateObj);
    if (window.chibiNotifications) {
      window.chibiNotifications.showToast('Đã lưu', 'Nhận xét của thầy đã được cập nhật!', 'success');
    }
  }

  // --- RENDER LEADERBOARD (BẢNG VÀNG) ---
  renderLeaderboard() {
    const lb = window.classData.getLeaderboard(this.currentWeek);
    const topStudents = lb.students.slice(0, 3);

    // Render Podium
    const podium1 = document.getElementById('podium-top1');
    const podium2 = document.getElementById('podium-top2');
    const podium3 = document.getElementById('podium-top3');

    if (topStudents[0] && podium1) {
      podium1.innerHTML = `
        <div class="podium-avatar">${topStudents[0].student.avatar}</div>
        <div style="font-weight: 800; font-size: 0.85rem; color: #1e293b; max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${topStudents[0].student.name}</div>
        <div style="font-size: 0.75rem; color: #d97706; font-weight: bold;">${topStudents[0].total}đ (Tổ ${topStudents[0].student.group})</div>
        <div class="podium-pillar pillar-1">🥇 1</div>
      `;
    }

    if (topStudents[1] && podium2) {
      podium2.innerHTML = `
        <div class="podium-avatar">${topStudents[1].student.avatar}</div>
        <div style="font-weight: 800; font-size: 0.82rem; color: #1e293b; max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${topStudents[1].student.name}</div>
        <div style="font-size: 0.72rem; color: #475569; font-weight: bold;">${topStudents[1].total}đ (Tổ ${topStudents[1].student.group})</div>
        <div class="podium-pillar pillar-2">🥈 2</div>
      `;
    }

    if (topStudents[2] && podium3) {
      podium3.innerHTML = `
        <div class="podium-avatar">${topStudents[2].student.avatar}</div>
        <div style="font-weight: 800; font-size: 0.82rem; color: #1e293b; max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${topStudents[2].student.name}</div>
        <div style="font-size: 0.72rem; color: #b45309; font-weight: bold;">${topStudents[2].total}đ (Tổ ${topStudents[2].student.group})</div>
        <div class="podium-pillar pillar-3">🥉 3</div>
      `;
    }

    // Render Group Ranking Cards
    const groupCardsContainer = document.getElementById('group-ranking-cards');
    if (groupCardsContainer) {
      groupCardsContainer.innerHTML = '';
      lb.groups.forEach((g, idx) => {
        const medal = idx === 0 ? '🏆' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : '🎖️'));
        const bgGrad = idx === 0 ? 'linear-gradient(135deg, #fef08a, #fde047)' : '#f8fafc';
        const card = document.createElement('div');
        card.className = 'group-rank-card';
        card.style.background = bgGrad;
        card.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 1.8rem;">${medal}</div>
            <div>
              <div style="font-family: 'Quicksand'; font-weight: 900; font-size: 1.05rem;">${g.name}</div>
              <div style="font-size: 0.8rem; color: #64748b;">${g.memberCount} thành viên | ${g.fiveStarCount} bạn 5 sao</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-family: 'Quicksand'; font-weight: 900; font-size: 1.2rem; color: #2563eb;">${g.avgScore} đ</div>
            <div style="font-size: 0.72rem; color: #16a34a; font-weight: bold;">+${g.totalPlus} / -${g.totalMinus}</div>
          </div>
        `;
        groupCardsContainer.appendChild(card);
      });
    }

    // Top 10 Student List
    const top10Container = document.getElementById('top10-student-list');
    if (top10Container) {
      top10Container.innerHTML = '';
      lb.students.slice(0, 10).forEach((s, idx) => {
        const item = document.createElement('div');
        item.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.88rem;
        `;
        item.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: 900; width: 22px; color: ${idx < 3 ? '#d97706' : '#64748b'};">${idx + 1}.</span>
            <span>${s.student.avatar}</span>
            <span style="font-weight: 700;">${s.student.name}</span>
            <span style="font-size: 0.75rem; color: #64748b;">(Tổ ${s.student.group})</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="rank-badge ${s.rankClass}">${'⭐'.repeat(s.stars)}</span>
            <span style="font-weight: 800; color: #2563eb;">${s.total}đ</span>
          </div>
        `;
        top10Container.appendChild(item);
      });
    }
  }

  // --- RENDER STATS & CHARTS ---
  renderStats() {
    const lb = window.classData.getLeaderboard(this.currentWeek);
    const statsContainer = document.getElementById('stats-bars-container');
    if (!statsContainer) return;

    statsContainer.innerHTML = '';

    lb.groups.forEach(g => {
      const percentage = Math.min(100, Math.max(10, ((g.avgScore - 90) / 70) * 100));
      const groupColors = {
        1: '#3b82f6',
        2: '#10b981',
        3: '#f59e0b',
        4: '#ec4899'
      };
      const col = groupColors[g.groupId] || '#3b82f6';

      const barRow = document.createElement('div');
      barRow.style.marginBottom = '16px';
      barRow.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 0.88rem; margin-bottom: 4px;">
          <span>${g.name} (${g.fiveStarCount} bạn 5 sao)</span>
          <span style="color: ${col};">${g.avgScore} điểm</span>
        </div>
        <div style="width: 100%; height: 16px; background: #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="width: ${percentage}%; height: 100%; background: ${col}; border-radius: 8px; transition: width 0.6s ease;"></div>
        </div>
      `;
      statsContainer.appendChild(barRow);
    });
  }

  // --- RENDER MAILBOX (HỘP THƯ) ---
  renderMailbox() {
    const user = window.authManager.getCurrentUser();
    const notifs = window.classData.getNotifications(user.id, user.role, user.group);
    const listEl = document.getElementById('mailbox-list');
    const detailEl = document.getElementById('mailbox-detail');

    if (!listEl || !detailEl) return;

    listEl.innerHTML = '';

    if (notifs.length === 0) {
      listEl.innerHTML = `<li style="padding: 24px; text-align: center; color: #94a3b8;">Hộp thư trống.</li>`;
      detailEl.innerHTML = `<div style="text-align: center; color: #94a3b8; margin-top: 100px;">Chọn một tin nhắn để xem nội dung.</div>`;
      return;
    }

    notifs.forEach((n, idx) => {
      const readList = (n && Array.isArray(n.readBy)) ? n.readBy : [];
      const isUnread = !readList.includes(user.id);
      const li = document.createElement('li');
      li.className = `message-item ${idx === 0 ? 'active' : ''} ${isUnread ? 'unread' : ''}`;

      const iconMap = {
        broadcast: '📢',
        praise: '🌟',
        reminder: '⏰',
        direct: '💬'
      };

      li.innerHTML = `
        <div class="message-icon-box" style="background: ${n.type === 'praise' ? '#fef08a' : (n.type === 'reminder' ? '#fee2e2' : '#eff6ff')};">
          ${iconMap[n.type] || '📩'}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-weight: 800; font-size: 0.85rem; color: #1e293b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${n.sender}</span>
            <small style="font-size: 0.7rem; color: #94a3b8;">${n.time.substring(5, 16)}</small>
          </div>
          <div style="font-size: 0.8rem; color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${n.title}</div>
        </div>
      `;

      li.onclick = () => {
        document.querySelectorAll('.message-item').forEach(el => el.classList.remove('active'));
        li.classList.add('active');
        li.classList.remove('unread');
        window.classData.markNotificationAsRead(n.id, user.id);
        window.chibiNotifications.updateBadge();
        this.renderMailDetail(n);
      };

      listEl.appendChild(li);
    });

    // Render first message in detail pane
    this.renderMailDetail(notifs[0]);
    window.classData.markNotificationAsRead(notifs[0].id, user.id);
    window.chibiNotifications.updateBadge();
  }

  renderMailDetail(notif) {
    const detailEl = document.getElementById('mailbox-detail');
    if (!detailEl || !notif) return;

    detailEl.innerHTML = `
      <div style="border-bottom: 2px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 16px;">
        <div style="font-family: 'Quicksand'; font-weight: 900; font-size: 1.25rem; color: #1e293b; margin-bottom: 6px;">${notif.title}</div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.84rem; color: #64748b;">
          <span>Người gửi: <b>${notif.sender}</b></span>
          <span>Thời gian: ${notif.time}</span>
        </div>
      </div>
      <div style="font-size: 0.95rem; line-height: 1.7; color: #334155; white-space: pre-line; flex: 1;">
        ${notif.content}
      </div>
      <div style="margin-top: 20px; display: flex; gap: 10px;">
        <button class="btn-hero btn-gold" onclick="window.appController.openSendMessageModal(null, 'Phản hồi: ${notif.title}')">
          ↩️ Phản hồi tin nhắn
        </button>
      </div>
    `;
  }

  // --- RENDER DUTY (BAN CÁN SỰ) DYNAMICALLY ---
  renderDutyTab() {
    const container = document.getElementById('duty-cards-container');
    const titleEl = document.getElementById('duty-heading-title');
    if (!container) return;

    const settings = window.classData.getSettings();
    if (titleEl) {
      titleEl.textContent = `⭐ NHIỆM VỤ BAN CÁN SỰ ${settings.className.toUpperCase()} ⭐`;
    }

    const students = window.classData.data.students;

    // Find Monitor
    const monitors = students.filter(s => s.role === 'monitor');
    const monitorNames = monitors.length > 0 ? monitors.map(s => `${s.avatar} ${s.name}`).join(', ') : 'Chưa phân công';

    // Find Vice Monitors
    const viceHocTap = students.find(s => s && s.role === 'vice' && String(s.roleName || '').toLowerCase().includes('học tập')) || students.find(s => s && s.role === 'vice');
    const viceLaoDong = students.find(s => s && s.role === 'vice' && String(s.roleName || '').toLowerCase().includes('lao động')) || students.filter(s => s && s.role === 'vice')[1];

    // Find 4 Group Leaders
    const l1 = students.find(s => s.group === 1 && s.role === 'leader');
    const l2 = students.find(s => s.group === 2 && s.role === 'leader');
    const l3 = students.find(s => s.group === 3 && s.role === 'leader');
    const l4 = students.find(s => s.group === 4 && s.role === 'leader');

    container.innerHTML = `
      <!-- Lớp trưởng -->
      <div style="background: #fefce8; border: 2px solid #facc15; border-radius: 16px; padding: 18px; box-shadow: 0 4px 12px rgba(250, 204, 21, 0.15);">
        <div style="font-weight: 900; font-size: 1.05rem; color: #854d0e; margin-bottom: 8px;">
          🌸 1. ${monitorNames} (${monitors.length > 0 ? monitors[0].roleName : 'Lớp trưởng'})
        </div>
        <ul style="font-size: 0.85rem; line-height: 1.6; padding-left: 18px; color: #713f12;">
          <li>Điều hành chung mọi hoạt động thi đua của lớp.</li>
          <li>Nắm sĩ số, nề nếp, tình hình 4 tổ đầu buổi học.</li>
          <li>Tiếp nhận & triển khai thông báo của GVCN ${settings.teacherName}.</li>
          <li>Tổng hợp thi đua báo cáo GVCN vào cuối mỗi tuần.</li>
        </ul>
      </div>

      <!-- Lớp phó học tập -->
      <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 16px; padding: 18px; box-shadow: 0 4px 12px rgba(134, 239, 172, 0.15);">
        <div style="font-weight: 900; font-size: 1.05rem; color: #166534; margin-bottom: 8px;">
          📚 2. ${viceHocTap ? `${viceHocTap.avatar} ${viceHocTap.name} (${viceHocTap.roleName})` : 'Lớp phó Học tập'}
        </div>
        <ul style="font-size: 0.85rem; line-height: 1.6; padding-left: 18px; color: #14532d;">
          <li>Theo dõi việc học tập, làm bài, chuẩn bị bài của cả lớp.</li>
          <li>Ghi nhận các bạn tích cực phát biểu, tiến bộ trong tuần.</li>
          <li>Động viên bạn bè cùng làm bài tập nhóm hiệu quả.</li>
          <li>Báo cáo tình hình học tập cho Lớp trưởng & GVCN.</li>
        </ul>
      </div>

      <!-- Lớp phó lao động / phong trào -->
      <div style="background: #eff6ff; border: 2px solid #93c5fd; border-radius: 16px; padding: 18px; box-shadow: 0 4px 12px rgba(147, 197, 253, 0.15);">
        <div style="font-weight: 900; font-size: 1.05rem; color: #1e40af; margin-bottom: 8px;">
          🧹 3. ${viceLaoDong ? `${viceLaoDong.avatar} ${viceLaoDong.name} (${viceLaoDong.roleName})` : (viceHocTap ? 'Ban Cán Sự Lớp' : 'Lớp phó Lao động')}
        </div>
        <ul style="font-size: 0.85rem; line-height: 1.6; padding-left: 18px; color: #1e3a8a;">
          <li>Kiểm tra vệ sinh lớp, bàn ghế, bảng sạch sẽ.</li>
          <li>Phân công, đôn đốc tổ trực nhật luân phiên hàng ngày.</li>
          <li>Kiểm tra tắt điện, quạt, khóa cửa sổ cuối buổi học.</li>
          <li>Kịp thời báo GVCN khi có thiết bị lớp học cần sửa chữa.</li>
        </ul>
      </div>

      <!-- 4 Tổ trưởng -->
      <div style="background: #fdf2f8; border: 2px solid #f472b6; border-radius: 16px; padding: 18px; box-shadow: 0 4px 12px rgba(244, 114, 182, 0.15);">
        <div style="font-weight: 900; font-size: 1.05rem; color: #9d174d; margin-bottom: 8px;">
          👧 4. Ban Tổ Trưởng (4 Tổ)
        </div>
        <div style="font-size: 0.84rem; color: #831843; font-weight: 700; margin-bottom: 8px; line-height: 1.6;">
          • Tổ 1: ${l1 ? `${l1.avatar} <b>${l1.name}</b>` : 'Chưa phân công'}<br/>
          • Tổ 2: ${l2 ? `${l2.avatar} <b>${l2.name}</b>` : 'Chưa phân công'}<br/>
          • Tổ 3: ${l3 ? `${l3.avatar} <b>${l3.name}</b>` : 'Chưa phân công'}<br/>
          • Tổ 4: ${l4 ? `${l4.avatar} <b>${l4.name}</b>` : 'Chưa phân công'}
        </div>
        <ul style="font-size: 0.82rem; line-height: 1.5; padding-left: 18px; color: #831843;">
          <li>Quản lý và theo dõi các thành viên trong tổ của mình.</li>
          <li>Chấm điểm thi đua hàng ngày đúng tiêu chí, khách quan, công bằng.</li>
          <li>Nhắc nhở nhẹ nhàng, động viên các bạn tiến bộ.</li>
          <li>Báo cáo kết quả thi đua của tổ cho Lớp trưởng/GVCN.</li>
        </ul>
      </div>
    `;

    // Update Print Signatures Monitor name
    const printMon = document.querySelector('.print-signatures .signature-col div:last-child');
    if (printMon && monitors.length > 0) {
      printMon.textContent = monitors[0].name;
    }
  }

  // --- SCORE MODAL CONTROLS ---
  openScoreModal(studentId, day = 'T2') {
    const student = window.classData.getStudentById(studentId);
    if (!student) return;

    if (!window.authManager.canScoreStudent(studentId)) {
      window.chibiNotifications.showToast('Không có quyền', 'Bạn chỉ có quyền chấm điểm cho thành viên trong tổ của mình!', 'warning');
      return;
    }

    this.activeScoringStudentId = studentId;
    this.activeScoringDay = day;

    const modal = document.getElementById('modal-score');
    if (!modal) return;

    const elTitle = document.getElementById('score-modal-student-name');
    if (elTitle) elTitle.textContent = `${student.name} (Tổ ${student.group})`;

    // Populate Week select options (1..35)
    const selectWeek = document.getElementById('score-modal-week');
    if (selectWeek) {
      selectWeek.innerHTML = '';
      for (let i = 1; i <= 35; i++) {
        selectWeek.innerHTML += `<option value="${i}">Tuần ${i}</option>`;
      }
      if (typeof this.currentWeek === 'number' && this.currentWeek >= 1 && this.currentWeek <= 35) {
        selectWeek.value = this.currentWeek;
      } else if (this.currentWeek === 'hk2') {
        selectWeek.value = 19;
      } else {
        selectWeek.value = 1;
      }
    }

    const selectDay = document.getElementById('score-modal-day');
    if (selectDay) selectDay.value = day;

    // Render Criteria select options
    const selectCriteria = document.getElementById('score-modal-criteria');
    if (selectCriteria) {
      selectCriteria.innerHTML = '<option value="">-- Chọn tiêu chí chấm điểm --</option>';
      const criteriaList = window.classData.getCriteria();
      criteriaList.forEach(c => {
        const sign = c.type === 'plus' ? `+${c.points}` : `-${c.points}`;
        selectCriteria.innerHTML += `<option value="${c.id}" data-type="${c.type}" data-points="${c.points}">[${sign}] ${c.icon} ${c.name} (${c.category || ''})</option>`;
      });

      selectCriteria.onchange = (e) => {
        const opt = selectCriteria.selectedOptions[0];
        if (opt && opt.dataset.points) {
          document.getElementById('score-modal-points').value = opt.dataset.points;
          document.getElementById('score-modal-type').value = opt.dataset.type;
        }
      };
    }

    // Render Student Past Events for this period
    this.renderScoreModalHistory(studentId);

    modal.classList.add('show');
    if (window.chibiSound) window.chibiSound.playClick();
  }

  renderScoreModalHistory(studentId) {
    const historyContainer = document.getElementById('score-modal-history');
    if (!historyContainer) return;

    const events = window.classData.getStudentEvents(studentId, this.currentWeek);
    historyContainer.innerHTML = '';

    if (events.length === 0) {
      historyContainer.innerHTML = '<div style="font-size: 0.8rem; color: #94a3b8; text-align: center; padding: 8px;">Chưa có điểm cộng/trừ nào trong đợt này.</div>';
      return;
    }

    const allCriteria = window.classData.getCriteria();
    const canDelete = window.authManager.canDeleteScore();

    events.forEach(e => {
      const cr = allCriteria.find(c => c.id === e.criteriaId);
      const crName = cr ? cr.name : 'Điểm khác';
      const crIcon = cr ? cr.icon : (e.type === 'plus' ? '🌸' : '⚠️');
      const item = document.createElement('div');
      item.style.cssText = `
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 8px 10px;
        margin-bottom: 6px;
      `;
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-weight: 800; color: ${e.type === 'plus' ? '#15803d' : '#b91c1c'}; font-size: 0.88rem;">
              ${e.type === 'plus' ? '🌸 +' : '⚠️ -'}${e.points} điểm
            </span>
            <b style="margin-left: 6px; color: #1e293b;">${crIcon} ${crName}</b>
            <span style="background: #e2e8f0; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; margin-left: 4px; color: #475569; font-weight: 700;">Tuần ${e.week} - ${e.day}</span>
          </div>
          ${canDelete ? `
            <button class="btn-icon-sm" style="background: #ef4444; width: 22px; height: 22px; font-size: 0.7rem;" title="Xóa điểm này (Chỉ Admin)" onclick="window.appController.deleteScore('${e.id}')">🗑️</button>
          ` : ''}
        </div>
        ${e.note ? `<div style="font-size: 0.78rem; color: #475569; margin-top: 3px;">📝 <i>${e.note}</i></div>` : ''}
        <div style="font-size: 0.72rem; color: #64748b; margin-top: 4px; display: flex; align-items: center; gap: 6px; border-top: 1px dashed #e2e8f0; padding-top: 4px;">
          <span>⏰ <b>${e.recordedAt || 'Vừa xong'}</b></span>
          <span>•</span>
          <span>👤 Người chấm: <b style="color: #1e40af;">${e.byName || e.by || 'Thầy Võ Văn Hà'} (${e.byRole || 'GVCN'})</b></span>
        </div>
      `;
      historyContainer.appendChild(item);
    });
  }

  setQuickScore(type, points, defaultCriteriaId, defaultNote) {
    document.getElementById('score-modal-type').value = type;
    document.getElementById('score-modal-points').value = points;
    const select = document.getElementById('score-modal-criteria');
    if (select) select.value = defaultCriteriaId;
    const noteEl = document.getElementById('score-modal-note');
    if (noteEl) noteEl.value = defaultNote;
  }

  saveScoreEvent() {
    if (!this.activeScoringStudentId) return;

    const selectWeek = document.getElementById('score-modal-week');
    const targetWeek = selectWeek ? parseInt(selectWeek.value, 10) : (typeof this.currentWeek === 'number' ? this.currentWeek : 1);
    const day = document.getElementById('score-modal-day').value;
    const criteriaId = document.getElementById('score-modal-criteria').value || 'c1';
    const points = parseFloat(document.getElementById('score-modal-points').value) || 1;
    const type = document.getElementById('score-modal-type').value || 'plus';
    const note = document.getElementById('score-modal-note').value;
    const currentUser = window.authManager.getCurrentUser();

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

    const newEvent = window.classData.addScoreEvent({
      studentId: this.activeScoringStudentId,
      week: targetWeek,
      day: day,
      criteriaId: criteriaId,
      points: points,
      type: type,
      note: note,
      recordedAt: timeStr,
      by: currentUser.role,
      byName: currentUser.name,
      byRole: currentUser.roleName
    });

    // --- AUTOMATIC NOTIFICATION DISPATCH (TO TEACHER & STUDENT, EXCLUDING SCORER) ---
    const targetStudent = window.classData.getStudentById(this.activeScoringStudentId);
    const criteria = window.classData.getCriteriaById(criteriaId) || { name: 'Tiêu chí thi đua', icon: (type === 'plus' ? '🌸' : '⚠️') };
    const sign = type === 'plus' ? '+' : '-';

    if (targetStudent) {
      // 1. Notify the student (if the student is not the scorer)
      if (currentUser.id !== targetStudent.id) {
        window.classData.addNotification({
          sender: `${currentUser.name} (${currentUser.roleName})`,
          senderRole: currentUser.role,
          target: targetStudent.id,
          type: type === 'plus' ? 'praise' : 'reminder',
          title: `${type === 'plus' ? '🌸 Em được cộng điểm thi đua!' : '⚠️ Em bị trừ điểm thi đua'}`,
          content: `Chào em ${targetStudent.name}!\nEm vừa được ${currentUser.name} (${currentUser.roleName}) ghi nhận ${sign}${points} điểm vào ${day} (Tuần ${targetWeek}).\n• Tiêu chí: ${criteria.icon} ${criteria.name}\n• Ghi chú: ${note ? note : 'Không có ghi chú'}\n• Thời gian chấm: ${timeStr}`
        });
      }

      // 2. Notify the Teacher (GVCN) if the scorer is a student / Ban cán sự
      if (currentUser.role !== 'teacher') {
        window.classData.addNotification({
          sender: `${currentUser.name} (${currentUser.roleName})`,
          senderRole: currentUser.role,
          target: 'all', // Broadcast in teacher inbox
          type: type === 'plus' ? 'praise' : 'reminder',
          title: `📢 BCS vừa chấm điểm: [${sign}${points}đ] ${targetStudent.name}`,
          content: `Thầy Hà kính mến!\n${currentUser.name} (${currentUser.roleName}) vừa chấm ${sign}${points} điểm cho bạn ${targetStudent.name} (Tổ ${targetStudent.group}) vào ${day} - Tuần ${targetWeek}.\n• Tiêu chí: ${criteria.icon} ${criteria.name}\n• Ghi chú: ${note ? note : 'Không có ghi chú'}\n• Thời gian: ${timeStr}`
        });
      }

      // 3. Trigger native mobile web push notification if granted
      if (window.chibiNotifications) {
        window.chibiNotifications.sendSystemPush(
          `🌸 Điểm thi đua mới: [${sign}${points}đ] ${targetStudent.name}`,
          `${currentUser.name} (${currentUser.roleName}) đã chấm: ${criteria.icon} ${criteria.name}`
        );
        window.chibiNotifications.updateBadge();
      }
    }

    if (type === 'plus') {
      if (window.chibiSound) window.chibiSound.playPlus();
      if (window.chibiConfetti) window.chibiConfetti.fire({ count: 40 });
    } else {
      if (window.chibiSound) window.chibiSound.playMinus();
    }

    window.chibiNotifications.showToast(
      type === 'plus' ? 'Cộng điểm thành công! 🌟' : 'Đã ghi nhận trừ điểm! ⚠️',
      `Đã lưu ${type === 'plus' ? '+' : '-'}${points} điểm & tự động gửi tin nhắn thông báo!`,
      type === 'plus' ? 'success' : 'warning'
    );

    this.renderTable();
    this.renderSummaryBoxes();
    this.renderLeaderboard();
    this.renderScoreModalHistory(this.activeScoringStudentId);
    this.renderMailbox();

    // Reset fields
    document.getElementById('score-modal-note').value = '';
  }

  deleteScore(eventId) {
    if (!window.authManager.canDeleteScore()) {
      if (window.chibiSound) window.chibiSound.playMinus();
      alert('⛔ Chỉ có tài khoản Giáo viên chủ nhiệm (Admin) mới có quyền xóa điểm thi đua!');
      return;
    }

    if (confirm('Thầy có chắc chắn muốn xóa lượt ghi điểm này không?')) {
      window.classData.deleteScoreEvent(eventId);
      this.renderTable();
      this.renderSummaryBoxes();
      this.renderLeaderboard();
      this.renderScoreModalHistory(this.activeScoringStudentId);
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Đã xóa', 'Điểm đã được xóa khỏi hệ thống.', 'info');
      }
    }
  }

  // --- SEND MESSAGE MODAL ---
  openSendMessageModal(studentId = null, replyTitle = null) {
    const modal = document.getElementById('modal-send-message');
    if (!modal) return;

    const currentUser = window.authManager.getCurrentUser();
    const selectTarget = document.getElementById('msg-target');

    if (selectTarget) {
      selectTarget.innerHTML = '';

      if (currentUser.role === 'teacher') {
        selectTarget.innerHTML += `<option value="all">📢 Toàn bộ 29 học sinh lớp 9A4 (Phát sóng)</option>`;
        selectTarget.innerHTML += `<option value="group1">Tổ 1 (7 HS)</option>`;
        selectTarget.innerHTML += `<option value="group2">Tổ 2 (7 HS)</option>`;
        selectTarget.innerHTML += `<option value="group3">Tổ 3 (7 HS)</option>`;
        selectTarget.innerHTML += `<option value="group4">Tổ 4 (8 HS)</option>`;
        selectTarget.innerHTML += `<optgroup label="Gửi riêng từng học sinh">`;
        window.classData.data.students.forEach(s => {
          selectTarget.innerHTML += `<option value="${s.id}">${s.name} (Tổ ${s.group} - ${s.roleName})</option>`;
        });
        selectTarget.innerHTML += `</optgroup>`;
      } else if (currentUser.role === 'leader') {
        selectTarget.innerHTML += `<option value="teacher">👨‍🏫 Thầy Võ Văn Hà (GVCN)</option>`;
        selectTarget.innerHTML += `<option value="group${currentUser.group}">📢 Toàn bộ thành viên Tổ ${currentUser.group}</option>`;
        selectTarget.innerHTML += `<optgroup label="Thành viên trong Tổ ${currentUser.group}">`;
        const groupStudents = window.classData.getStudents(currentUser.group).filter(s => s.id !== currentUser.id);
        groupStudents.forEach(s => {
          selectTarget.innerHTML += `<option value="${s.id}">${s.name} (${s.roleName})</option>`;
        });
        selectTarget.innerHTML += `</optgroup>`;
      } else {
        // Regular member
        selectTarget.innerHTML += `<option value="teacher">👨‍🏫 Thầy Võ Văn Hà (GVCN)</option>`;
        const leader = window.classData.data.students.find(s => s.group === currentUser.group && s.role === 'leader');
        if (leader) {
          selectTarget.innerHTML += `<option value="${leader.id}">👧 Tổ trưởng ${leader.name} (Tổ ${currentUser.group})</option>`;
        }
      }

      if (studentId) selectTarget.value = studentId;
    }

    const inputTitle = document.getElementById('msg-title');
    if (inputTitle && replyTitle) inputTitle.value = replyTitle;

    modal.classList.add('show');
    if (window.chibiSound) window.chibiSound.playClick();
  }

  handleSendMessage() {
    const target = document.getElementById('msg-target').value;
    const type = document.getElementById('msg-type').value;
    const title = document.getElementById('msg-title').value.trim();
    const content = document.getElementById('msg-content').value.trim();
    const user = window.authManager.getCurrentUser();

    if (!title || !content) {
      alert('Vui lòng nhập đầy đủ tiêu đề và nội dung tin nhắn!');
      return;
    }

    window.chibiNotifications.sendMessage({
      sender: user.name,
      senderRole: user.role,
      target: target,
      type: type,
      title: title,
      content: content
    });

    this.closeAllModals();
    this.renderMailbox();
    document.getElementById('form-send-message').reset();
  }

  // --- LOGIN MODAL ---
  openLoginModal() {
    const modal = document.getElementById('modal-login');
    if (modal) {
      modal.classList.add('show');
      if (window.chibiSound) window.chibiSound.playClick();
    }
  }

  handleLoginSubmit() {
    const username = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;

    const res = window.authManager.login(username, pass);
    if (res.success) {
      if (window.chibiSound) window.chibiSound.playPlus();
      window.chibiNotifications.showToast('Đăng nhập thành công! ✨', `Chào mừng ${res.user.name} (${res.user.roleName})!`, 'success');
      this.closeAllModals();
      document.getElementById('form-login').reset();
    } else {
      if (window.chibiSound) window.chibiSound.playMinus();
      alert(res.message);
    }
  }

  // --- CHANGE PASSWORD MODAL ---
  openChangePasswordModal() {
    const user = window.authManager.getCurrentUser();
    const modal = document.getElementById('modal-change-password');
    if (!modal) return;

    const label = document.getElementById('change-pass-user-label');
    if (label) {
      label.textContent = `${user.name} (${user.roleName || (user.isTeacher ? 'Giáo viên' : 'Học sinh')})`;
    }

    const form = document.getElementById('form-change-password');
    if (form) form.reset();

    modal.classList.add('show');
    if (window.chibiSound) window.chibiSound.playClick();
  }

  handleChangePasswordSubmit() {
    const oldPass = document.getElementById('change-pass-old').value;
    const newPass = document.getElementById('change-pass-new').value;
    const confirmPass = document.getElementById('change-pass-confirm').value;

    if (newPass !== confirmPass) {
      if (window.chibiSound) window.chibiSound.playMinus();
      alert('Mật khẩu mới và mật khẩu xác nhận không khớp nhau!');
      return;
    }

    if (newPass.length < 4) {
      if (window.chibiSound) window.chibiSound.playMinus();
      alert('Mật khẩu mới phải có tối thiểu 4 ký tự!');
      return;
    }

    const res = window.authManager.changeCurrentUserPassword(oldPass, newPass);
    if (res.success) {
      if (window.chibiSound) window.chibiSound.playPlus();
      window.chibiNotifications.showToast('Thành công! 🔑', 'Đã đổi mật khẩu tài khoản thành công. Vui lòng ghi nhớ mật khẩu mới!', 'success');
      this.closeAllModals();
    } else {
      if (window.chibiSound) window.chibiSound.playMinus();
      alert(res.message);
    }
  }

  // --- CLASS SETTINGS & ACCOUNT MANAGEMENT MODAL ---
  openSettingsModal() {
    if (!window.authManager.isTeacher()) {
      alert('Chỉ Giáo viên mới có quyền vào Cài đặt lớp!');
      return;
    }

    const settings = window.classData.getSettings();
    document.getElementById('setting-class-name').value = settings.className;
    document.getElementById('setting-school-name').value = settings.schoolName;
    document.getElementById('setting-teacher-name').value = settings.teacherName;
    document.getElementById('setting-teacher-pass').value = settings.teacherPass || 'admin123';
    document.getElementById('setting-slogan').value = settings.slogan;

    this.switchSettingsSubTab('class');
    this.renderSettingsStudentList();
    this.renderSettingsTeacherList();
    this.renderSettingsCriteriaList();

    const modal = document.getElementById('modal-settings');
    if (modal) {
      modal.classList.add('show');
      if (window.chibiSound) window.chibiSound.playClick();
    }
  }

  switchSettingsSubTab(subTabKey) {
    document.querySelectorAll('.setting-sub-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.setting-tab-pane').forEach(pane => pane.style.display = 'none');

    const activeBtn = document.getElementById(`tab-btn-set-${subTabKey}`);
    const activePane = document.getElementById(`pane-set-${subTabKey}`);

    if (activeBtn) activeBtn.classList.add('active');
    if (activePane) activePane.style.display = 'block';

    if (subTabKey === 'students') {
      this.renderSettingsStudentList();
    } else if (subTabKey === 'teachers') {
      this.renderSettingsTeacherList();
    } else if (subTabKey === 'criteria') {
      this.renderSettingsCriteriaList();
    } else if (subTabKey === 'cloud') {
      this.renderSettingsCloudSync();
    }
  }

  renderSettingsCloudSync() {
    // Hiển thị thông số Firebase
    if (window.firebaseSyncEngine) {
      const fbConfig = window.firebaseSyncEngine.config || {};
      const elUrl = document.getElementById('setting-firebase-url');
      const elProject = document.getElementById('setting-firebase-projectid');
      const elKey = document.getElementById('setting-firebase-apikey');

      if (elUrl) elUrl.value = fbConfig.databaseURL || '';
      if (elProject) elProject.value = fbConfig.projectId || '';
      if (elKey) elKey.value = fbConfig.apiKey || '';
    }

    const elBadge = document.getElementById('cloud-sync-details-badge');
    if (elBadge) {
      const isConnected = window.firebaseSyncEngine ? window.firebaseSyncEngine.isConnected : false;
      const timeStr = window.firebaseSyncEngine && window.firebaseSyncEngine.lastSyncTimestamp
        ? new Date(window.firebaseSyncEngine.lastSyncTimestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : 'Sẵn sàng';
      elBadge.innerHTML = isConnected ? `🟢 Firebase Trực Tuyến (${timeStr}) ⚡` : '🟡 Đang kết nối Firebase...';
      elBadge.style.background = isConnected ? '#dcfce7' : '#fef9c3';
      elBadge.style.color = isConnected ? '#15803d' : '#854d0e';
      elBadge.style.borderColor = isConnected ? '#86efac' : '#fde047';
    }
  }

  saveFirebaseConfig() {
    const elUrl = document.getElementById('setting-firebase-url');
    const elProject = document.getElementById('setting-firebase-projectid');
    const elKey = document.getElementById('setting-firebase-apikey');

    if (!elUrl || !elUrl.value.trim()) {
      alert('Vui lòng nhập Database URL của Firebase (dạng https://...firebaseio.com)!');
      return;
    }

    const newConfig = {
      databaseURL: elUrl.value.trim(),
      projectId: elProject ? elProject.value.trim() : 'thidua-lop-9a4',
      apiKey: elKey ? elKey.value.trim() : ''
    };

    if (window.firebaseSyncEngine) {
      window.firebaseSyncEngine.saveConfig(newConfig);
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Cấu Hình Thành Công! 🔥', 'Đã lưu thông số Firebase và khởi động lại kết nối WebSocket!', 'success');
      }
      if (window.chibiSound) window.chibiSound.playBell();
    }
    this.renderSettingsCloudSync();
  }

  async testFirebaseConnection() {
    if (!window.firebaseSyncEngine || !window.firebaseSyncEngine.database) {
      alert('Firebase chưa được khởi tạo hoặc chưa có Database URL hợp lệ!');
      return;
    }

    try {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Đang Kiểm Tra... 🧪', 'Đang gửi gói tin thử nghiệm lên Firebase Realtime Database...', 'info');
      }
      const testRef = window.firebaseSyncEngine.database.ref('classes/lop9a4/ping');
      await testRef.set({
        pingAt: Date.now(),
        by: 'Thầy Võ Văn Hà (Test)',
        status: 'ok'
      });
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Kết Nối Xuất Sắc! 🟢', 'Đã kết nối thành công tới máy chủ Google Firebase qua WebSocket (< 0.2s)!', 'success');
      }
      if (window.chibiSound) window.chibiSound.playDing();
    } catch (e) {
      alert('Lỗi khi kết nối tới Firebase: ' + e.message + '\n\nVui lòng kiểm tra lại Database URL hoặc Rules (cần đặt ".read": true, ".write": true trong Firebase Console).');
    }
  }

  async forcePushFirebase() {
    if (!window.firebaseSyncEngine) return;
    if (window.chibiNotifications) {
      window.chibiNotifications.showToast('Đang Đẩy Dữ Liệu... ☁️', 'Đang ghi toàn bộ điểm và dữ liệu lớp 9A4 lên Firebase...', 'info');
    }
    const res = await window.firebaseSyncEngine.pushToCloud(window.classData.data);
    if (res && res.success) {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Lưu Thành Công! ⚡', 'Dữ liệu đã được lưu vĩnh viễn trên đám mây Google Firebase!', 'success');
      }
      if (window.chibiSound) window.chibiSound.playPlus();
    } else {
      alert('Không thể lưu lên Firebase: ' + (res.error || res.message));
    }
  }

  async forcePullFirebase() {
    if (!window.firebaseSyncEngine || !window.firebaseSyncEngine.dbRef) {
      alert('Firebase chưa được khởi tạo để tải dữ liệu.');
      return;
    }
    try {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Đang Tải... 📥', 'Đang đọc dữ liệu mới nhất từ Firebase...', 'info');
      }
      const snapshot = await window.firebaseSyncEngine.dbRef.once('value');
      const val = snapshot.val();
      if (val && typeof val === 'object') {
        window.firebaseSyncEngine.handleIncomingCloudData(val);
        if (window.chibiNotifications) {
          window.chibiNotifications.showToast('Tải Thành Công! 🌟', 'Đã nạp toàn bộ dữ liệu mới nhất từ Firebase vào máy này!', 'success');
        }
      } else {
        alert('Cơ sở dữ liệu trên Firebase hiện đang trống. Thầy có thể bấm "Lưu Toàn Bộ Dữ Liệu Lên Firebase Ngay" để khởi tạo lần đầu!');
      }
    } catch (e) {
      alert('Lỗi tải từ Firebase: ' + e.message);
    }
  }

  renderSettingsStudentList() {
    const container = document.getElementById('settings-students-list');
    if (!container) return;

    container.innerHTML = '';
    const students = window.classData.data.students;

    // Header guide row
    const headerRow = document.createElement('div');
    headerRow.style.cssText = `
      display: grid;
      grid-template-columns: 28px 140px 75px 105px 120px 80px 32px;
      gap: 6px;
      align-items: center;
      padding: 6px 8px;
      background: #e2e8f0;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 800;
      color: #334155;
      margin-bottom: 6px;
    `;
    headerRow.innerHTML = `
      <span>STT</span>
      <span>Họ và Tên</span>
      <span>Tổ</span>
      <span>Chức vụ</span>
      <span>Quyền Chấm Điểm</span>
      <span>Mật khẩu</span>
      <span>Xóa</span>
    `;
    container.appendChild(headerRow);

    students.forEach((s, idx) => {
      const row = document.createElement('div');
      row.setAttribute('data-student-id', s.id);
      row.style.cssText = `
        display: grid;
        grid-template-columns: 28px 140px 75px 105px 120px 80px 32px;
        gap: 6px;
        align-items: center;
        margin-bottom: 6px;
        padding: 6px 8px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
      `;
      row.innerHTML = `
        <span style="font-weight: 700; font-size: 0.8rem; text-align: center;">${idx + 1}</span>
        <input type="text" class="form-control st-input-name" value="${s.name}" onchange="window.appController.updateStudentField('${s.id}', 'name', this.value)" style="padding: 4px 6px; font-size: 0.82rem;" />
        <select class="form-control st-select-group" onchange="window.appController.updateStudentField('${s.id}', 'group', parseInt(this.value, 10))" style="padding: 4px 4px; font-size: 0.78rem;">
          <option value="1" ${s.group === 1 ? 'selected' : ''}>Tổ 1</option>
          <option value="2" ${s.group === 2 ? 'selected' : ''}>Tổ 2</option>
          <option value="3" ${s.group === 3 ? 'selected' : ''}>Tổ 3</option>
          <option value="4" ${s.group === 4 ? 'selected' : ''}>Tổ 4</option>
        </select>
        <select class="form-control st-select-role" onchange="window.appController.updateStudentRole('${s.id}', this.value)" style="padding: 4px 4px; font-size: 0.78rem;">
          <option value="member" ${s.role === 'member' ? 'selected' : ''}>Thành viên</option>
          <option value="leader" ${s.role === 'leader' ? 'selected' : ''}>Tổ trưởng</option>
          <option value="vice" ${s.role === 'vice' ? 'selected' : ''}>Lớp phó</option>
          <option value="monitor" ${s.role === 'monitor' ? 'selected' : ''}>Lớp trưởng</option>
        </select>
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <label style="font-size: 0.72rem; display: flex; align-items: center; gap: 4px; cursor: pointer;">
            <input type="checkbox" ${s.canScore ? 'checked' : ''} onchange="window.appController.toggleStudentScoring('${s.id}', this.checked, '${s.scoreScope || 'group'}')" />
            <b style="color: ${s.canScore ? '#15803d' : '#64748b'};">${s.canScore ? 'Được chấm' : 'Khóa'}</b>
          </label>
          ${s.canScore ? `
            <select class="form-control" onchange="window.appController.toggleStudentScoring('${s.id}', true, this.value)" style="padding: 2px; font-size: 0.7rem; height: 22px;">
              <option value="group" ${s.scoreScope === 'group' ? 'selected' : ''}>Tổ của em</option>
              <option value="class" ${s.scoreScope === 'class' ? 'selected' : ''}>Toàn bộ lớp</option>
            </select>
          ` : ''}
        </div>
        <input type="text" class="form-control st-input-pass" value="${s.pass || '123456'}" onchange="window.appController.updateStudentField('${s.id}', 'pass', this.value)" style="padding: 4px 4px; font-size: 0.78rem;" title="Mật khẩu học sinh" />
        <button type="button" class="btn-icon-sm" style="background:#ef4444; width: 28px; height: 28px; font-size: 0.75rem;" onclick="window.appController.deleteStudent('${s.id}')" title="Xóa học sinh">🗑️</button>
      `;
      container.appendChild(row);
    });
  }

  toggleStudentScoring(studentId, canScore, scoreScope = 'group') {
    window.classData.toggleStudentScoringPermission(studentId, canScore, scoreScope);
    this.renderSettingsStudentList();
    this.renderTable();
    window.chibiNotifications.showToast('Phân quyền', canScore ? 'Đã cấp quyền chấm điểm thi đua cho học sinh!' : 'Đã khóa quyền chấm điểm của học sinh.', 'info');
  }

  renderSettingsTeacherList() {
    const container = document.getElementById('settings-teachers-list');
    if (!container) return;

    container.innerHTML = '';
    const teachers = window.classData.getTeachers();

    teachers.forEach((t, idx) => {
      const card = document.createElement('div');
      card.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 10px 14px;
        margin-bottom: 8px;
      `;
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.6rem;">${t.avatar || '👨‍🏫'}</span>
          <div>
            <div style="font-weight: 800; color: #1e293b; font-size: 0.95rem;">
              ${t.name} ${t.isPrimary ? '<span style="background: #fef08a; color: #854d0e; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 800;">GVCN Chính</span>' : '<span style="background: #e0f2fe; color: #0369a1; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;">Bộ môn</span>'}
            </div>
            <div style="font-size: 0.8rem; color: #64748b;">
              Môn: <b>${t.subject}</b> • Đăng nhập: <code>${t.username}</code> • Mật khẩu: <code>${t.pass}</code>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 6px;">
          ${!t.isPrimary ? `
            <button type="button" class="btn-hero btn-white" style="color: #ef4444; padding: 4px 10px; font-size: 0.75rem;" onclick="window.appController.deleteTeacher('${t.id}')">
              🗑️ Xóa GV
            </button>
          ` : `
            <span style="font-size: 0.75rem; color: #94a3b8; font-style: italic;">(Mặc định)</span>
          `}
        </div>
      `;
      container.appendChild(card);
    });
  }

  openAddTeacherModal() {
    const modal = document.getElementById('modal-add-teacher');
    if (modal) {
      document.getElementById('form-add-teacher').reset();
      modal.classList.add('show');
      if (window.chibiSound) window.chibiSound.playClick();
    }
  }

  handleAddTeacherSubmit() {
    const name = document.getElementById('add-teacher-name').value.trim();
    const subject = document.getElementById('add-teacher-subject').value.trim();
    const username = document.getElementById('add-teacher-username').value.trim();
    const pass = document.getElementById('add-teacher-pass').value.trim();

    if (!name || !username || !pass) {
      alert('Vui lòng điền đầy đủ họ tên, tên đăng nhập và mật khẩu!');
      return;
    }

    const newTeacher = window.classData.addTeacher({
      name: name,
      subject: subject,
      username: username,
      pass: pass
    });

    this.populatePortalTeacherSelect();
    this.renderSettingsTeacherList();
    this.closeAllModals();
    this.openSettingsModal();
    this.switchSettingsSubTab('teachers');

    if (window.chibiSound) window.chibiSound.playPlus();
    window.chibiNotifications.showToast('Cấp tài khoản thành công! 👨‍🏫', `Đã tạo tài khoản cho GV: ${newTeacher.name}`, 'success');
  }

  deleteTeacher(id) {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản Giáo viên này không?')) {
      const res = window.classData.deleteTeacher(id);
      if (res.success) {
        this.populatePortalTeacherSelect();
        this.renderSettingsTeacherList();
        window.chibiNotifications.showToast('Đã xóa', 'Tài khoản Giáo viên đã được gỡ bỏ.', 'info');
      } else {
        alert(res.message);
      }
    }
  }

  // --- CRITERIA MANAGEMENT IN SETTINGS ---
  renderSettingsCriteriaList() {
    const container = document.getElementById('settings-criteria-list');
    if (!container) return;

    container.innerHTML = '';
    const criteriaList = window.classData.getCriteria();

    // Guide header
    const headerRow = document.createElement('div');
    headerRow.style.cssText = `
      display: grid;
      grid-template-columns: 36px 1fr 105px 105px 75px 32px;
      gap: 6px;
      align-items: center;
      padding: 6px 8px;
      background: #e2e8f0;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 800;
      color: #334155;
      margin-bottom: 6px;
    `;
    headerRow.innerHTML = `
      <span style="text-align: center;">Icon</span>
      <span>Tên Tiêu Chí Thi Đua</span>
      <span>Lĩnh Vực</span>
      <span>Loại Điểm</span>
      <span style="text-align: center;">Điểm</span>
      <span>Xóa</span>
    `;
    container.appendChild(headerRow);

    criteriaList.forEach(c => {
      const row = document.createElement('div');
      row.style.cssText = `
        display: grid;
        grid-template-columns: 36px 1fr 105px 105px 75px 32px;
        gap: 6px;
        align-items: center;
        margin-bottom: 6px;
        padding: 6px 8px;
        background: ${c.type === 'plus' ? '#f0fdf4' : '#fef2f2'};
        border: 1px solid ${c.type === 'plus' ? '#bbf7d0' : '#fecaca'};
        border-radius: 6px;
      `;
      row.innerHTML = `
        <input type="text" class="form-control" value="${c.icon || (c.type === 'plus' ? '🌸' : '⚠️')}" onchange="window.appController.updateCriteriaField('${c.id}', 'icon', this.value)" style="padding: 4px 2px; font-size: 0.95rem; text-align: center;" title="Biểu tượng" />
        <input type="text" class="form-control" value="${c.name}" onchange="window.appController.updateCriteriaField('${c.id}', 'name', this.value)" style="padding: 4px 6px; font-size: 0.82rem; font-weight: 700; color: ${c.type === 'plus' ? '#15803d' : '#b91c1c'};" />
        <select class="form-control" onchange="window.appController.updateCriteriaField('${c.id}', 'category', this.value)" style="padding: 4px 4px; font-size: 0.76rem;">
          <option value="Học tập" ${c.category === 'Học tập' ? 'selected' : ''}>Học tập</option>
          <option value="Kỷ luật" ${c.category === 'Kỷ luật' ? 'selected' : ''}>Kỷ luật</option>
          <option value="Chuyên cần" ${c.category === 'Chuyên cần' ? 'selected' : ''}>Chuyên cần</option>
          <option value="Đạo đức" ${c.category === 'Đạo đức' ? 'selected' : ''}>Đạo đức</option>
          <option value="Lao động" ${c.category === 'Lao động' ? 'selected' : ''}>Lao động</option>
          <option value="Kỹ năng" ${c.category === 'Kỹ năng' ? 'selected' : ''}>Kỹ năng</option>
          <option value="Phong trào" ${c.category === 'Phong trào' ? 'selected' : ''}>Phong trào</option>
          <option value="Khen thưởng" ${c.category === 'Khen thưởng' ? 'selected' : ''}>Khen thưởng</option>
        </select>
        <select class="form-control" onchange="window.appController.updateCriteriaField('${c.id}', 'type', this.value)" style="padding: 4px 4px; font-size: 0.76rem; font-weight: 700; color: ${c.type === 'plus' ? '#15803d' : '#b91c1c'};">
          <option value="plus" ${c.type === 'plus' ? 'selected' : ''}>🌸 Điểm Cộng (+)</option>
          <option value="minus" ${c.type === 'minus' ? 'selected' : ''}>⚠️ Điểm Trừ (-)</option>
        </select>
        <input type="number" class="form-control" value="${c.points}" min="0.5" max="20" step="0.5" onchange="window.appController.updateCriteriaField('${c.id}', 'points', parseFloat(this.value))" style="padding: 4px 4px; font-size: 0.8rem; font-weight: 800; text-align: center;" title="Số điểm" />
        <button type="button" class="btn-icon-sm" style="background: #ef4444; width: 28px; height: 28px; font-size: 0.75rem;" onclick="window.appController.deleteCriteria('${c.id}')" title="Xóa tiêu chí này">🗑️</button>
      `;
      container.appendChild(row);
    });
  }

  openAddCriteriaModal() {
    const modal = document.getElementById('modal-add-criteria');
    if (modal) {
      document.getElementById('form-add-criteria').reset();
      modal.classList.add('show');
      if (window.chibiSound) window.chibiSound.playClick();
    }
  }

  handleAddCriteriaSubmit() {
    const name = document.getElementById('add-criteria-name').value.trim();
    const type = document.getElementById('add-criteria-type').value;
    const points = parseFloat(document.getElementById('add-criteria-points').value) || 1;
    const icon = document.getElementById('add-criteria-icon').value.trim() || (type === 'minus' ? '⚠️' : '🌸');
    const category = document.getElementById('add-criteria-category').value;

    if (!name) {
      alert('Vui lòng nhập tên tiêu chí!');
      return;
    }

    const newCrit = window.classData.addCriteria({
      name: name,
      type: type,
      points: points,
      icon: icon,
      category: category
    });

    this.renderSettingsCriteriaList();
    this.closeAllModals();
    this.openSettingsModal();
    this.switchSettingsSubTab('criteria');

    if (window.chibiSound) window.chibiSound.playPlus();
    window.chibiNotifications.showToast('Thêm tiêu chí thành công! 🎯', `Đã thêm: [${newCrit.type === 'plus' ? '+' : '-'}${newCrit.points}] ${newCrit.name}`, 'success');
  }

  updateCriteriaField(id, field, value) {
    window.classData.updateCriteria(id, { [field]: value });
    this.renderSettingsCriteriaList();
    window.chibiNotifications.showToast('Đã lưu tiêu chí', 'Cập nhật tiêu chí thi đua thành công!', 'info');
  }

  deleteCriteria(id) {
    if (confirm('Bạn có chắc chắn muốn xóa tiêu chí thi đua này không?')) {
      const res = window.classData.deleteCriteria(id);
      if (res.success) {
        this.renderSettingsCriteriaList();
        window.chibiNotifications.showToast('Đã xóa', 'Tiêu chí thi đua đã được xóa khỏi hệ thống.', 'info');
      } else {
        alert(res.message);
      }
    }
  }

  updateStudentField(id, field, value) {
    window.classData.updateStudent(id, { [field]: value });
    this.renderTable();
  }

  updateStudentRole(id, role) {
    const roleNames = {
      monitor: 'Lớp trưởng',
      vice: 'Lớp phó',
      leader: 'Tổ trưởng',
      member: 'Thành viên'
    };
    const canScore = (role === 'leader' || role === 'monitor' || role === 'vice');
    const scope = (role === 'monitor' || role === 'vice') ? 'class' : (role === 'leader' ? 'group' : 'none');
    window.classData.updateStudent(id, {
      role: role,
      roleName: roleNames[role] || 'Thành viên',
      canScore: canScore,
      scoreScope: scope
    });
    this.renderSettingsStudentList();
    this.renderTable();
  }

  addNewStudent() {
    const name = prompt('Nhập họ và tên học sinh mới:');
    if (!name || !name.trim()) return;

    const group = prompt('Nhập Tổ của học sinh (1, 2, 3 hoặc 4):', '1');
    const roleChoice = prompt('Chức vụ: 1 - Thành viên | 2 - Tổ trưởng | 3 - Lớp phó | 4 - Lớp trưởng (Nhập số 1-4):', '1');

    let role = 'member';
    let roleName = 'Thành viên';
    let canScore = false;
    let scoreScope = 'none';

    if (roleChoice === '2') {
      role = 'leader';
      roleName = 'Tổ trưởng';
      canScore = true;
      scoreScope = 'group';
    } else if (roleChoice === '3') {
      role = 'vice';
      roleName = 'Lớp phó';
      canScore = true;
      scoreScope = 'class';
    } else if (roleChoice === '4') {
      role = 'monitor';
      roleName = 'Lớp trưởng';
      canScore = true;
      scoreScope = 'class';
    }

    window.classData.addStudent({
      name: name.trim(),
      group: parseInt(group, 10) || 1,
      role: role,
      roleName: roleName,
      canScore: canScore,
      scoreScope: scoreScope
    });

    this.populatePortalStudentSelect();
    this.renderSettingsStudentList();
    this.renderTable();
    window.chibiNotifications.showToast('Thành công', 'Đã thêm học sinh mới vào danh sách!', 'success');
  }

  deleteStudent(id) {
    if (confirm('Bạn có chắc chắn muốn xóa học sinh này và toàn bộ điểm đã chấm không?')) {
      window.classData.deleteStudent(id);
      this.populatePortalStudentSelect();
      this.renderSettingsStudentList();
      this.renderTable();
    }
  }

  saveClassSettings() {
    const updated = {
      className: document.getElementById('setting-class-name').value.trim(),
      schoolName: document.getElementById('setting-school-name').value.trim(),
      teacherName: document.getElementById('setting-teacher-name').value.trim(),
      teacherPass: document.getElementById('setting-teacher-pass').value.trim(),
      slogan: document.getElementById('setting-slogan').value.trim()
    };

    // Thu thập toàn bộ chỉnh sửa trên danh sách học sinh (nếu có ô nào đang nhập dở)
    const studentContainer = document.getElementById('settings-students-list');
    let updatedStudents = null;
    if (studentContainer) {
      const rows = studentContainer.querySelectorAll('[data-student-id]');
      if (rows && rows.length > 0) {
        updatedStudents = JSON.parse(JSON.stringify(window.classData.data.students || []));
        rows.forEach(row => {
          const sId = row.getAttribute('data-student-id');
          const student = updatedStudents.find(s => s.id === sId);
          if (student) {
            const elName = row.querySelector('.st-input-name');
            const elGroup = row.querySelector('.st-select-group');
            const elRole = row.querySelector('.st-select-role');
            const elPass = row.querySelector('.st-input-pass');
            if (elName && elName.value.trim()) student.name = elName.value.trim();
            if (elGroup) student.group = parseInt(elGroup.value, 10) || student.group;
            if (elRole) {
              student.role = elRole.value;
              const roleNames = { monitor: 'Lớp trưởng', vice: 'Lớp phó', leader: 'Tổ trưởng', member: 'Thành viên' };
              student.roleName = roleNames[student.role] || 'Thành viên';
            }
            if (elPass && elPass.value.trim()) student.pass = elPass.value.trim();
          }
        });
      }
    }

    window.classData.updateAllSettings(updated, updatedStudents, null);
    this.populatePortalTeacherSelect();
    this.populatePortalStudentSelect();
    this.refreshAll();
    this.closeAllModals();
    window.chibiNotifications.showToast('Đã lưu! 🌟', 'Cài đặt lớp học đã được cập nhật và lưu vĩnh viễn lên đám mây!', 'success');
  }

  resetAllData() {
    if (confirm('Khôi phục toàn bộ danh sách 29 học sinh 9A4 và đưa điểm số về 0 ban đầu?')) {
      window.classData.resetData();
      this.populatePortalStudentSelect();
      this.populatePortalTeacherSelect();
      this.refreshAll();
      this.closeAllModals();
      window.chibiNotifications.showToast('Đã khôi phục', 'Dữ liệu thi đua 9A4 đã được làm mới sạch sẽ!', 'success');
    }
  }

  handleImportConfigFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const res = window.classData.importConfig(e.target.result);
      if (res.success) {
        this.populatePortalStudentSelect();
        this.populatePortalTeacherSelect();
        this.refreshAll();
        this.closeAllModals();
        if (window.chibiSound) window.chibiSound.playPlus();
        window.chibiNotifications.showToast('Nhập file thành công! 📥', 'Đã nạp toàn bộ cấu hình lớp từ file!', 'success');
      } else {
        if (window.chibiSound) window.chibiSound.playMinus();
        alert(res.message);
      }
      event.target.value = '';
    };
    reader.readAsText(file);
  }

  copyConfigCode() {
    const config = {
      settings: window.classData.data.settings,
      criteria: window.classData.data.criteria,
      students: window.classData.data.students,
      teachers: window.classData.data.teachers,
      events: window.classData.data.events || []
    };
    const codeStr = JSON.stringify(config);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(codeStr).then(() => {
        if (window.chibiSound) window.chibiSound.playPlus();
        alert('✅ ĐÃ SAO CHÉP MÃ CẤU HÌNH!\n\nThầy chỉ cần mở Zalo và Bấm "Dán" (Paste) để gửi đoạn mã này sang điện thoại.');
      }).catch(() => {
        prompt('Sao chép toàn bộ đoạn mã bên dưới rồi gửi qua Zalo:', codeStr);
      });
    } else {
      prompt('Sao chép toàn bộ đoạn mã bên dưới rồi gửi qua Zalo:', codeStr);
    }
  }

  pasteConfigCode() {
    const codeStr = prompt('Dán đoạn mã cấu hình Thầy đã gửi từ máy tính (Zalo) vào đây:');
    if (!codeStr || !codeStr.trim()) return;

    const res = window.classData.importConfig(codeStr.trim());
    if (res.success) {
      this.populatePortalStudentSelect();
      this.populatePortalTeacherSelect();
      this.refreshAll();
      this.closeAllModals();
      if (window.chibiSound) window.chibiSound.playPlus();
      if (window.chibiConfetti) window.chibiConfetti.fire({ count: 60 });
      alert('🎉 ĐÃ ĐỒNG BỘ THÀNH CÔNG 100% CẤU HÌNH TỪ MÁY TÍNH VÀO ĐIỆN THOẠI!');
    } else {
      if (window.chibiSound) window.chibiSound.playMinus();
      alert('❌ ' + res.message);
    }
  }

  checkUrlHashSync() {
    try {
      const hash = window.location.hash;
      if (hash && (hash.startsWith('#sync=') || hash.startsWith('#data='))) {
        const raw = hash.replace(/^#(sync|data)=/, '');
        const decoded = decodeURIComponent(escape(atob(raw)));
        const imported = JSON.parse(decoded);
        if (imported && (imported.students || imported.criteria || imported.settings)) {
          window.classData.importConfig(imported);
          history.replaceState(null, null, window.location.pathname);
          setTimeout(() => {
            if (window.chibiConfetti) window.chibiConfetti.fire({ count: 80 });
            if (window.chibiSound) window.chibiSound.playPlus();
            alert('🎉 ĐÃ ĐỒNG BỘ CẤU HÌNH TỪ MÃ QR THÀNH CÔNG 100%!');
          }, 300);
        }
      }
    } catch(e) {
      console.warn('URL Hash sync error:', e);
    }
  }

  openQrSyncModal() {
    const config = {
      settings: window.classData.data.settings,
      criteria: window.classData.data.criteria,
      students: window.classData.data.students,
      teachers: window.classData.data.teachers,
      events: window.classData.data.events || []
    };
    const jsonStr = JSON.stringify(config);
    const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
    const targetUrl = window.location.origin + window.location.pathname + '#sync=' + b64;
    const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(targetUrl)}`;

    const container = document.getElementById('qr-sync-container');
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 6px;">
          <h4 style="color: #1e3a8a; font-weight: 800; font-size: 1rem; margin-bottom: 6px;">📱 Quét Bằng Camera / Zalo Điện Thoại</h4>
          <p style="font-size: 0.8rem; color: #475569; margin-bottom: 12px; line-height: 1.35;">
            Dùng Camera hoặc Zalo trên điện thoại hướng vào mã QR bên dưới, bấm vào đường link hiện ra $\rightarrow$ <b>Điện thoại sẽ tự động nạp 100% cấu hình và điểm số từ máy tính!</b>
          </p>
          <div style="display: inline-block; padding: 10px; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.12); border: 2px solid #93c5fd;">
            <img src="${qrImgUrl}" alt="QR Sync" style="width: 230px; height: 230px; display: block;" />
          </div>
          <div style="margin-top: 14px;">
            <button type="button" class="btn-hero btn-gold btn-block" onclick="navigator.clipboard.writeText('${targetUrl}').then(() => alert('Đã sao chép link đồng bộ! Thầy có thể gửi link này qua Zalo để mở trên điện thoại.'))">
              🔗 Sao Chép Link Đồng Bộ Trực Tiếp
            </button>
          </div>
        </div>
      `;
    }
    const modal = document.getElementById('modal-qr-sync');
    if (modal) modal.classList.add('show');
  }

  closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('show'));
  }

  // --- FORCE APP UPDATE & PURGE CACHE (FOR MOBILE PHONES) ---
  async forceAppUpdate() {
    if (window.chibiNotifications) {
      window.chibiNotifications.showToast('Đang làm mới...', 'Đang giải phóng bộ nhớ đệm và tải phiên bản mới nhất...', 'info');
    }
    if (window.chibiSound) window.chibiSound.playClick();

    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let reg of registrations) {
          await reg.unregister();
        }
      }
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (let name of cacheNames) {
          await caches.delete(name);
        }
      }
    } catch (e) {
      console.warn('Error purging cache:', e);
    }

    setTimeout(() => {
      window.location.href = window.location.pathname + '?reload=' + Date.now();
    }, 400);
  }

  // --- EXPORT EXCEL / CSV (UTF-8 WITH BOM) ---
  exportExcel() {
    const settings = window.classData.getSettings();
    const students = window.classData.data.students;

    let periodTitle = `Tuần ${this.currentWeek}`;
    let fileSuffix = `Tuan${this.currentWeek}`;
    if (this.currentWeek === 'hk1') {
      periodTitle = 'Tổng Kết Học Kỳ I (Tuần 1 - 18)';
      fileSuffix = 'TongKet_HK1';
    } else if (this.currentWeek === 'hk2') {
      periodTitle = 'Tổng Kết Học Kỳ II (Tuần 19 - 35)';
      fileSuffix = 'TongKet_HK2';
    } else if (this.currentWeek === 'all-year') {
      periodTitle = 'Tổng Kết Cả Năm Học (Tuần 1 - 35)';
      fileSuffix = 'TongKet_CaNam';
    }

    let csvContent = '\uFEFF'; // UTF-8 BOM to prevent Excel font glitches
    csvContent += `BẢNG TỔNG HỢP THI ĐUA ${settings.className.toUpperCase()} - ${settings.schoolName.toUpperCase()}\n`;
    csvContent += `Giáo viên chủ nhiệm: ${settings.teacherName} | Đợt đánh giá: ${periodTitle} | Niên khóa: ${settings.academicYear}\n\n`;
    csvContent += `STT,Mã HS,Họ và Tên,Tổ,Chức Vụ,Điểm Cộng,Điểm Trừ,Điểm Tổng Kết,Xếp Loại\n`;

    students.forEach((s, idx) => {
      const score = window.classData.calculateStudentScore(s.id, this.currentWeek);
      csvContent += `${idx + 1},"${s.code}","${s.name}",Tổ ${s.group},"${s.roleName}",${score.plus},${score.minus},${score.total},"${score.rank}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ThiDua_${settings.className}_${fileSuffix}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.chibiSound) window.chibiSound.playPlus();
    window.chibiNotifications.showToast('Xuất file thành công! 📊', 'Bảng điểm Excel (CSV) tiếng Việt UTF-8 đã tải về máy!', 'success');
  }

  // ==========================================================================
  // BIÊN BẢN SINH HOẠT CHỦ NHIỆM TUẦN CONTROLLER
  // ==========================================================================

  openBienBanModal(week = null) {
    const isGVCN = Boolean(
      window.authManager &&
      typeof window.authManager.isHomeroomTeacher === 'function' &&
      window.authManager.isHomeroomTeacher()
    );

    if (!isGVCN) {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Thông báo', 'Chức năng In Biên Bản Tuần chỉ dành riêng cho Giáo Viên Chủ Nhiệm.', 'warning');
      } else {
        alert('Chức năng In Biên Bản Tuần chỉ dành riêng cho Giáo Viên Chủ Nhiệm.');
      }
      return;
    }

    if (week !== null && week !== undefined) {
      this.bienBanWeek = parseInt(week, 10) || 1;
    } else if (typeof this.currentWeek === 'number') {
      this.bienBanWeek = this.currentWeek;
    } else {
      this.bienBanWeek = 1;
    }

    this.populateBienBanWeekSelect();
    this.updateBienBanModeButtons();
    this.renderBienBan();

    const modal = document.getElementById('modal-bienban-sinhoat');
    if (modal) {
      modal.classList.add('show');
    }
  }

  populateBienBanWeekSelect() {
    const sel = document.getElementById('bienban-select-week');
    if (!sel) return;
    let html = '<optgroup label="🌸 HỌC KỲ I (Tuần 1 -> Tuần 18)">';
    for (let w = 1; w <= 18; w++) {
      html += `<option value="${w}">Tuần ${w}</option>`;
    }
    html += '</optgroup><optgroup label="☀️ HỌC KỲ II (Tuần 19 -> Tuần 35)">';
    for (let w = 19; w <= 35; w++) {
      html += `<option value="${w}">Tuần ${w}</option>`;
    }
    html += '</optgroup>';
    sel.innerHTML = html;
    sel.value = this.bienBanWeek;
  }

  onBienBanWeekChange(newWeek) {
    this.bienBanWeek = parseInt(newWeek, 10) || 1;
    this.renderBienBan();
  }

  switchBienBanMode(mode) {
    this.bienBanMode = mode;
    this.updateBienBanModeButtons();
    this.renderBienBan();
  }

  updateBienBanModeButtons() {
    const btnAuto = document.getElementById('btn-mode-auto');
    const btnBlank = document.getElementById('btn-mode-blank');
    if (btnAuto && btnBlank) {
      if (this.bienBanMode === 'auto') {
        btnAuto.classList.add('active');
        btnBlank.classList.remove('active');
      } else {
        btnBlank.classList.add('active');
        btnAuto.classList.remove('active');
      }
    }
  }

  getBienBanData(week) {
    const settings = window.classData.getSettings();
    const className = settings.className || 'Lớp 9A4';
    const schoolName = settings.schoolName || 'TRƯỜNG THCS TÂY PHÚ';
    const teacherName = settings.teacherName || 'Thầy Võ Văn Hà';
    const academicYear = settings.academicYear || '2026 - 2027';

    // Calculate dates (Default starting week 1 on Monday Sep 7, 2026)
    const baseStart = new Date(2026, 8, 7);
    const startD = new Date(baseStart.getTime() + (week - 1) * 7 * 86400000);
    const endD = new Date(startD.getTime() + 5 * 86400000);
    const pad = (n) => n.toString().padStart(2, '0');
    const fmt = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    const fromDate = fmt(startD);
    const toDate = fmt(endD);
    const meetingDate = fmt(endD);

    const students = [...(window.classData.data.students || [])];
    students.sort((a, b) => (a.code || '').localeCompare(b.code || ''));

    // Officers
    const monitor = students.find(s => s && (s.role === 'monitor' || String(s.roleName || '').toLowerCase().includes('lớp trưởng'))) || { name: 'Lê Minh Trí' };
    const secretary = students.find(s => s && (s.role === 'secretary' || String(s.roleName || '').toLowerCase().includes('thư ký') || s.code === '9A405')) || { name: 'Lê Thu Hà' };

    // Group leaders
    const groupLeaders = {
      1: students.find(s => s && s.group === 1 && (s.role === 'leader' || String(s.roleName || '').includes('Tổ trưởng'))) || { name: 'Võ Trọng Khang' },
      2: students.find(s => s && s.group === 2 && (s.role === 'leader' || String(s.roleName || '').includes('Tổ trưởng'))) || { name: 'Lê Thị Mỹ Quyên' },
      3: students.find(s => s && s.group === 3 && (s.role === 'leader' || String(s.roleName || '').includes('Tổ trưởng'))) || { name: 'Lê Thị Trúc Huỳnh' },
      4: students.find(s => s && s.group === 4 && (s.role === 'leader' || String(s.roleName || '').includes('Tổ trưởng'))) || { name: 'Nguyễn Thị Huyền Trang' }
    };

    // Feedback
    const fb = window.classData.getFeedback(week) || {};

    return {
      className,
      schoolName,
      teacherName,
      academicYear,
      week,
      fromDate,
      toDate,
      meetingDate,
      totalStudents: students.length || 29,
      students,
      monitor,
      secretary,
      groupLeaders,
      fb
    };
  }

  renderBienBan() {
    const container = document.getElementById('bienban-paper-container');
    if (!container) return;

    const d = this.getBienBanData(this.bienBanWeek);
    const isBlank = (this.bienBanMode === 'blank');

    const dottedCell = '..................................................<br>..................................................<br>..................................................';
    const dottedLong = '............................................................................................................................';

    // Helper for group table HTML
    const renderGroupTable = (groupNum) => {
      const groupStudents = d.students.filter(s => s.group === groupNum);
      const leader = d.groupLeaders[groupNum] || { name: '' };

      let rowsHtml = '';
      groupStudents.forEach((s, idx) => {
        let badHtml = '';
        let goodHtml = '';
        let fixHtml = '';
        let rankHtml = '';

        if (isBlank) {
          badHtml = `<div class="bb-dotted">${dottedCell}</div>`;
          goodHtml = `<div class="bb-dotted">${dottedCell}</div>`;
          fixHtml = `<div class="bb-dotted">${dottedCell}</div>`;
          rankHtml = `<div class="bb-dotted">...............</div>`;
        } else {
          const events = window.classData.getStudentEvents(s.id, this.bienBanWeek);
          const minusEvents = events.filter(e => e.type === 'minus');
          const plusEvents = events.filter(e => e.type === 'plus');

          // Bad summary
          if (minusEvents.length === 0) {
            badHtml = '<span style="color: #16a34a; font-style: italic;">Không vi phạm</span>';
          } else {
            const mapCrit = new Map();
            minusEvents.forEach(ev => {
              const c = window.classData.getCriteriaById(ev.criteriaId);
              const name = c ? c.name : 'Vi phạm';
              if (!mapCrit.has(name)) mapCrit.set(name, []);
              const note = ev.note ? `: ${ev.note}` : '';
              mapCrit.get(name).push(`${ev.day || 'T'}${note}`);
            });
            const lines = [];
            mapCrit.forEach((occurrences, critName) => {
              lines.push(`• ${critName} [${occurrences.join(', ')}]`);
            });
            badHtml = lines.join('<br>');
          }

          // Good summary
          if (plusEvents.length === 0) {
            goodHtml = '-';
          } else {
            const mapCrit = new Map();
            plusEvents.forEach(ev => {
              const c = window.classData.getCriteriaById(ev.criteriaId);
              const name = c ? c.name : 'Việc tốt';
              if (!mapCrit.has(name)) mapCrit.set(name, []);
              const note = ev.note ? `: ${ev.note}` : '';
              mapCrit.get(name).push(`${ev.day || 'T'}${note}`);
            });
            const lines = [];
            mapCrit.forEach((occurrences, critName) => {
              if (occurrences.length === 1) {
                lines.push(`• ${critName} [${occurrences[0]}]`);
              } else {
                lines.push(`• ${critName} (${occurrences.length} lần)`);
              }
            });
            goodHtml = lines.join('<br>');
          }

          // Fix / proposal
          if (minusEvents.length === 0) {
            fixHtml = (plusEvents.length >= 3) ? 'Biểu dương trước lớp' : 'Tiếp tục phát huy';
          } else {
            const totalMinus = minusEvents.reduce((acc, cur) => acc + (cur.points || 0), 0);
            const isSevere = minusEvents.some(e => (e.points || 0) >= 10 || e.criteriaId === 'c14' || e.criteriaId === 'c16');
            if (isSevere || totalMinus >= 10) {
              fixHtml = 'Viết bản kiểm điểm, báo GVCN và PHHS';
            } else if (minusEvents.length >= 3 || totalMinus >= 5) {
              fixHtml = 'Phê bình trước tổ, nhắc nhở trước lớp';
            } else {
              fixHtml = 'Nhắc nhở, rút kinh nghiệm';
            }
          }

          // Rank / proposal - Đồng bộ chính xác theo thông tin xếp loại bên tab Bảng điểm thi đua
          const scoreObj = window.classData.calculateStudentScore(s.id, this.bienBanWeek);
          const rankMap = {
            'XUẤT SẮC': 'Xuất sắc',
            'TỐT': 'Tốt',
            'CỐ GẮNG': 'Cố gắng',
            'CẦN CỐ GẮNG': 'Cần cố gắng',
            'CẦN CỐ GẮNG HƠN': 'Cần cố gắng'
          };
          rankHtml = rankMap[scoreObj.rank] || scoreObj.rank || 'Cần cố gắng';
        }

        rowsHtml += `
          <tr>
            <td class="center" style="font-weight: bold;">${idx + 1}</td>
            <td style="font-weight: 600;"><span contenteditable="true">${s.name}</span></td>
            <td><span contenteditable="true">${badHtml}</span></td>
            <td><span contenteditable="true">${goodHtml}</span></td>
            <td><span contenteditable="true">${fixHtml}</span></td>
            <td class="center" style="font-weight: 600;"><span contenteditable="true">${rankHtml}</span></td>
          </tr>
        `;
      });

      return `
        <div class="bb-group-title" style="display: flex; justify-content: space-between; align-items: baseline;">
          <span>1.${groupNum}. Tổ ${groupNum}</span>
          <span style="font-size: 11pt; font-weight: normal; font-style: italic;">(Tổ trưởng: <b contenteditable="true">${leader.name}</b>)</span>
        </div>
        <table class="bienban-table">
          <thead>
            <tr>
              <th class="bb-col-stt">TT</th>
              <th class="bb-col-name">Tên HS</th>
              <th class="bb-col-bad">Những việc vi phạm</th>
              <th class="bb-col-good">Những việc tốt</th>
              <th class="bb-col-fix">Đề nghị biện pháp xử lí</th>
              <th class="bb-col-rank">Đề nghị đánh giá</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      `;
    };

    // Teacher feedback from week data
    const teacherFbText = d.fb.teacherFeedback ? d.fb.teacherFeedback : (
      isBlank ? `${dottedLong}<br>${dottedLong}` : 'Biểu dương tinh thần học tập và nề nếp của các tổ đạt kết quả tốt trong tuần. Yêu cầu các học sinh còn vi phạm nghiêm túc khắc phục ngay trong tuần tới.'
    );

    const studentOpinionText = isBlank ? `${dottedLong}<br>${dottedLong}` : 'Tập thể lớp 9A4 nhất trí cao với báo cáo của 4 tổ trưởng và kết quả thi đua trong tuần.';
    const monitorFeedbackText = isBlank ? `${dottedLong}<br>${dottedLong}` : 'Trong tuần qua nhìn chung các tổ duy trì tốt nề nếp xếp hàng, truy bài và vệ sinh lớp học. Tuy nhiên một số bạn còn nói chuyện riêng trong giờ, Ban cán sự lớp sẽ theo dõi chặt chẽ hơn.';
    const nextWeekPlanText = isBlank ? `${dottedLong}<br>${dottedLong}<br>${dottedLong}` : `1. Tiếp tục duy trì nề nếp học tập, chuyên cần, đi học đúng giờ.<br>
2. Chuẩn bị bài chu đáo trước khi đến lớp, tích cực phát biểu xây dựng bài.<br>
3. Thực hiện nghiêm túc vệ sinh phong quang trường lớp, bảo quản tài sản chung.<br>
4. Ban cán sự lớp và các Tổ trưởng tăng cường kiểm tra chéo, đôn đốc các bạn trong tổ.`;

    const html = `
      <div class="bienban-page">
        <!-- HEADER 2 COLUMNS -->
        <div class="bb-header-grid">
          <div class="bb-header-left">
            <div class="bb-school" contenteditable="true">${d.schoolName.toUpperCase()}</div>
            <div class="bb-class">LỚP: <span contenteditable="true">${d.className.toUpperCase().replace('LỚP ', '')}</span></div>
            <div class="bb-line-short"></div>
          </div>
          <div class="bb-header-right">
            <div class="bb-country">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="bb-motto">Độc lập – Tự do – Hạnh phúc</div>
            <div class="bb-line-long"></div>
          </div>
        </div>

        <!-- TITLE -->
        <div class="bb-title-block">
          <h1 class="bb-main-title">BIÊN BẢN</h1>
          <div class="bb-sub-title">
            Về việc sinh hoạt chủ nhiệm tuần <span contenteditable="true" style="border-bottom: 1px dotted #000; padding: 0 4px;">${d.week}</span>
            (từ ngày <span contenteditable="true" style="border-bottom: 1px dotted #000; padding: 0 4px;">${d.fromDate}</span> đến ngày <span contenteditable="true" style="border-bottom: 1px dotted #000; padding: 0 4px;">${d.toDate}</span>)
          </div>
          <div class="bb-year">Năm học <span contenteditable="true">${d.academicYear}</span></div>
        </div>

        <!-- I. THỜI GIAN - ĐỊA ĐIỂM -->
        <div class="bb-section-title">I. THỜI GIAN – ĐỊA ĐIỂM:</div>
        <p class="bb-text-p">
          Hôm nay, vào lúc <span contenteditable="true" style="font-weight: bold; border-bottom: 1px dotted #000; padding: 0 4px;">10</span> giờ <span contenteditable="true" style="font-weight: bold; border-bottom: 1px dotted #000; padding: 0 4px;">15</span> phút, ngày <span contenteditable="true" style="font-weight: bold; border-bottom: 1px dotted #000; padding: 0 4px;">${d.meetingDate}</span>, tại phòng học lớp: <b contenteditable="true">${d.className.replace('Lớp ', '')}</b>.
        </p>

        <!-- II. THÀNH PHẦN -->
        <div class="bb-section-title">II. THÀNH PHẦN:</div>
        <p class="bb-text-p">
          - GVCN lớp: <b contenteditable="true">${d.teacherName}</b>, Ban cán sự lớp.<br>
          - Có mặt: <b contenteditable="true">${d.totalStudents}</b>/<b contenteditable="true">${d.totalStudents}</b> học sinh. - Vắng: (<span contenteditable="true" style="font-style: italic;">Không</span>)
        </p>

        <!-- III. NỘI DUNG -->
        <div class="bb-section-title">III. NỘI DUNG:</div>
        <div class="bb-sub-section-title">1. Tổng kết tuần</div>
        <p class="bb-text-p" style="margin-bottom: 8px;">Các Tổ trưởng báo cáo tình hình của tổ trong tuần:</p>

        <!-- TABLE TỔ 1 -->
        <div class="bb-keep-together">
          ${renderGroupTable(1)}
        </div>

        <!-- TABLE TỔ 2 -->
        <div class="bb-keep-together" style="margin-top: 14px;">
          ${renderGroupTable(2)}
        </div>

        <!-- TABLE TỔ 3 -->
        <div class="bb-keep-together" style="margin-top: 14px;">
          ${renderGroupTable(3)}
        </div>

        <!-- TABLE TỔ 4 -->
        <div class="bb-keep-together" style="margin-top: 14px;">
          ${renderGroupTable(4)}
        </div>

        <!-- 2. Ý KIẾN CỦA HỌC SINH -->
        <div class="bb-keep-together" style="margin-top: 16px;">
          <div class="bb-sub-section-title">2. Ý kiến của học sinh</div>
          <div class="bb-text-p" contenteditable="true" style="min-height: 24px; padding: 2px 4px; border: 1px dashed transparent;">
            ${studentOpinionText}
          </div>
        </div>

        <!-- 3. NHẬN XÉT CÁN BỘ LỚP -->
        <div class="bb-keep-together" style="margin-top: 12px;">
          <div class="bb-sub-section-title">3. Nhận xét Cán bộ lớp</div>
          <div class="bb-text-p" contenteditable="true" style="min-height: 24px; padding: 2px 4px; border: 1px dashed transparent;">
            ${monitorFeedbackText}
          </div>
        </div>

        <!-- 4. Ý KIẾN, NHẬN XÉT, ĐÁNH GIÁ CỦA GVCN -->
        <div class="bb-keep-together" style="margin-top: 12px;">
          <div class="bb-sub-section-title">4. Ý kiến, nhận xét, đánh giá của GVCN</div>
          <div class="bb-text-p" contenteditable="true" style="min-height: 24px; padding: 2px 4px; border: 1px dashed transparent;">
            ${teacherFbText}
          </div>
        </div>

        <!-- 5. GVCN TRIỂN KHAI NỘI DUNG CÔNG VIỆC TUẦN TỚI -->
        <div class="bb-keep-together" style="margin-top: 12px;">
          <div class="bb-sub-section-title">5. GVCN triển khai nội dung công việc tuần tới</div>
          <div class="bb-text-p" contenteditable="true" style="min-height: 36px; padding: 2px 4px; border: 1px dashed transparent;">
            ${nextWeekPlanText}
          </div>
        </div>

        <!-- KẾT THÚC -->
        <p class="bb-text-p" style="margin-top: 16px; font-style: italic;">
          Biên bản kết thúc vào lúc <span contenteditable="true" style="font-weight: bold; border-bottom: 1px dotted #000; padding: 0 4px;">11</span> giờ <span contenteditable="true" style="font-weight: bold; border-bottom: 1px dotted #000; padding: 0 4px;">00</span> cùng ngày và có thông qua trước tập thể lớp.
        </p>

        <!-- CHỮ KÝ 3 CỘT -->
        <div class="bb-signatures">
          <div>
            <div class="bb-sign-role">GVCN</div>
            <div class="bb-sign-sub">(Ký và ghi rõ họ tên)</div>
            <div class="bb-sign-space"></div>
            <div class="bb-sign-name" contenteditable="true">${d.teacherName}</div>
          </div>
          <div>
            <div class="bb-sign-role">TM. BAN CÁN SỰ LỚP</div>
            <div class="bb-sign-sub">(Ký, ghi rõ họ tên và chức vụ)</div>
            <div class="bb-sign-space"></div>
            <div class="bb-sign-name"><span contenteditable="true">Lớp trưởng: ${d.monitor.name}</span></div>
          </div>
          <div>
            <div class="bb-sign-role">THƯ KÝ</div>
            <div class="bb-sign-sub">(Ký và ghi rõ họ tên)</div>
            <div class="bb-sign-space"></div>
            <div class="bb-sign-name" contenteditable="true">${d.secretary.name}</div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  printBienBan() {
    const container = document.getElementById('bienban-paper-container');
    if (!container) return;

    if (window.chibiSound) window.chibiSound.playClick();

    // Clone into printArea as fallback
    const printArea = document.getElementById('bienban-print-area');
    if (printArea) {
      printArea.innerHTML = container.innerHTML;
    }

    try {
      let iframe = document.getElementById('bienban-print-iframe');
      if (iframe) iframe.remove();

      iframe = document.createElement('iframe');
      iframe.id = 'bienban-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.top = '-9999px';
      iframe.style.left = '-9999px';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Biên Bản Sinh Hoạt Tuần ${this.bienBanWeek} - Lớp 9A4</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm 15mm 15mm 20mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              background: #fff;
              color: #000;
              font-family: "Times New Roman", Times, Georgia, serif;
              font-size: 13pt;
              line-height: 1.35;
              margin: 0;
              padding: 0;
            }
            .bienban-page {
              width: 100%;
              background: #fff;
              padding: 0;
              margin: 0;
            }
            .bb-header-grid {
              display: table;
              width: 100%;
              margin-bottom: 16px;
            }
            .bb-header-left {
              display: table-cell;
              width: 42%;
              text-align: center;
              vertical-align: top;
            }
            .bb-header-right {
              display: table-cell;
              width: 58%;
              text-align: center;
              vertical-align: top;
            }
            .bb-school, .bb-class, .bb-country {
              font-weight: bold;
              font-size: 12pt;
            }
            .bb-motto {
              font-weight: bold;
              font-size: 13pt;
            }
            .bb-line-short {
              border-bottom: 1px solid #000;
              width: 90px;
              margin: 4px auto;
            }
            .bb-line-long {
              border-bottom: 1px solid #000;
              width: 150px;
              margin: 4px auto;
            }
            .bb-title-block {
              text-align: center;
              margin: 16px 0 12px 0;
            }
            .bb-main-title {
              font-size: 16pt;
              font-weight: bold;
              text-align: center;
              margin: 4px 0;
            }
            .bb-sub-title, .bb-year {
              font-size: 13pt;
              font-weight: bold;
              text-align: center;
            }
            .bb-section-title {
              font-size: 13pt;
              font-weight: bold;
              margin-top: 12px;
              margin-bottom: 4px;
            }
            .bb-sub-section-title {
              font-size: 13pt;
              font-weight: bold;
              margin-top: 8px;
              margin-bottom: 4px;
            }
            .bb-group-title {
              font-size: 12pt;
              font-weight: bold;
              margin: 10px 0 4px 0;
            }
            .bb-text-p {
              font-size: 13pt;
              line-height: 1.4;
              margin: 4px 0;
            }
            table.bienban-table {
              border-collapse: collapse;
              width: 100%;
              font-size: 11pt;
              margin: 6px 0 12px 0;
            }
            table.bienban-table th, table.bienban-table td {
              border: 1px solid #000000;
              padding: 4px 6px;
              vertical-align: top;
              word-break: break-word;
            }
            table.bienban-table th {
              background-color: #f2f2f2;
              font-weight: bold;
              text-align: center;
            }
            .center { text-align: center; }
            .bb-col-stt { width: 5%; }
            .bb-col-name { width: 22%; }
            .bb-col-bad { width: 33%; }
            .bb-col-good { width: 17%; }
            .bb-col-fix { width: 13%; }
            .bb-col-rank { width: 10%; }
            .bb-signatures {
              display: table;
              width: 100%;
              margin-top: 24px;
              page-break-inside: avoid;
            }
            .bb-signatures > div {
              display: table-cell;
              width: 33.33%;
              text-align: center;
              vertical-align: top;
            }
            .bb-sign-role { font-weight: bold; font-size: 12pt; }
            .bb-sign-sub { font-style: italic; font-size: 11pt; }
            .bb-sign-space { height: 60px; }
            .bb-sign-name { font-weight: bold; font-size: 12pt; }
            .bb-dotted { letter-spacing: 2px; color: #444; line-height: 1.5; }
            .bb-keep-together { page-break-inside: avoid; }
            [contenteditable] { outline: none; }
          </style>
        </head>
        <body>
          ${container.innerHTML}
        </body>
        </html>
      `);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }, 300);
    } catch(err) {
      console.warn('Iframe print fallback to window.print():', err);
      document.body.classList.add('printing-bienban');
      setTimeout(() => {
        window.print();
      }, 200);
    }
  }

  async exportBienBanPdf() {
    const container = document.getElementById('bienban-paper-container');
    if (!container) return;

    if (window.chibiSound) window.chibiSound.playClick();

    if (typeof window.html2pdf === 'undefined') {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Thông báo', 'Đang kết nối thư viện PDF hoặc hệ thống sẽ chuyển sang chế độ in chuẩn...', 'warning');
      }
      return this.printBienBan();
    }

    if (window.chibiNotifications) {
      window.chibiNotifications.showToast('Đang tạo file PDF... ⏳', 'Vui lòng chờ trong giây lát, hệ thống đang kết xuất tài liệu PDF chất lượng cao...', 'info');
    }

    // Clone container to avoid tampering with user UI
    const clone = container.cloneNode(true);
    clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));

    // Prepare wrapper for clean rendering
    const wrapper = document.createElement('div');
    wrapper.className = 'bienban-pdf-render-wrapper';
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '794px'; // A4 width at 96 DPI
    wrapper.style.background = '#ffffff';
    wrapper.style.color = '#000000';
    wrapper.style.fontFamily = '"Times New Roman", Times, Georgia, serif';
    wrapper.style.padding = '0';
    wrapper.style.margin = '0';

    const pageEl = clone.querySelector('.bienban-page') || clone;
    pageEl.style.boxShadow = 'none';
    pageEl.style.borderRadius = '0';
    pageEl.style.padding = '0';
    pageEl.style.margin = '0';
    pageEl.style.minHeight = 'auto';

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    const filename = `BienBan_SinhHoat_Tuan_${this.bienBanWeek}_Lop9A4.pdf`;

    const opt = {
      margin: [12, 12, 12, 15], // top, left, bottom, right in mm
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
        logging: false
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy']
      }
    };

    try {
      await window.html2pdf().set(opt).from(pageEl).save();
      if (window.chibiSound) window.chibiSound.playPlus();
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Xuất PDF thành công! 📕', `Đã tải về file "${filename}"!`, 'success');
      }
    } catch (err) {
      console.error('PDF export error:', err);
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Lỗi xuất PDF', 'Đang chuyển sang tính năng In (chọn "Save as PDF" / Lưu dưới dạng PDF)', 'warning');
      }
      this.printBienBan();
    } finally {
      if (wrapper && wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
    }
  }

  exportBienBanWord() {
    const container = document.getElementById('bienban-paper-container');
    if (!container) return;

    const d = this.getBienBanData(this.bienBanWeek);

    // Clone and strip editable attributes
    const clone = container.cloneNode(true);
    clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));

    const contentHtml = clone.innerHTML;

    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Biên Bản Sinh Hoạt Chủ Nhiệm Tuần ${this.bienBanWeek}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: 21.0cm 29.7cm;
            margin: 2.0cm 1.5cm 2.0cm 2.5cm;
            mso-page-orientation: portrait;
          }
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 13pt;
            line-height: 1.35;
            color: #000000;
          }
          .bb-header-grid {
            display: table;
            width: 100%;
            margin-bottom: 16px;
          }
          .bb-header-left {
            display: table-cell;
            width: 42%;
            text-align: center;
            vertical-align: top;
          }
          .bb-header-right {
            display: table-cell;
            width: 58%;
            text-align: center;
            vertical-align: top;
          }
          .bb-school, .bb-class, .bb-country {
            font-weight: bold;
            font-size: 12pt;
          }
          .bb-motto {
            font-weight: bold;
            font-size: 13pt;
          }
          .bb-line-short {
            border-bottom: 1px solid #000;
            width: 90px;
            margin: 4px auto;
          }
          .bb-line-long {
            border-bottom: 1px solid #000;
            width: 150px;
            margin: 4px auto;
          }
          .bb-title-block {
            text-align: center;
            margin: 18px 0 14px 0;
          }
          .bb-main-title {
            font-size: 16pt;
            font-weight: bold;
            text-align: center;
            margin: 4px 0;
          }
          .bb-sub-title, .bb-year {
            font-size: 13pt;
            font-weight: bold;
            text-align: center;
          }
          .bb-section-title {
            font-size: 13pt;
            font-weight: bold;
            margin-top: 12px;
            margin-bottom: 4px;
          }
          .bb-sub-section-title {
            font-size: 13pt;
            font-weight: bold;
            margin-top: 8px;
            margin-bottom: 4px;
          }
          .bb-group-title {
            font-size: 12pt;
            font-weight: bold;
            margin: 10px 0 4px 0;
          }
          .bb-text-p {
            font-size: 13pt;
            line-height: 1.4;
            margin: 4px 0;
          }
          table.bienban-table {
            border-collapse: collapse;
            width: 100%;
            font-size: 11pt;
            margin: 6px 0 12px 0;
          }
          table.bienban-table th, table.bienban-table td {
            border: 1px solid #000000;
            padding: 4px 6px;
            vertical-align: top;
          }
          table.bienban-table th {
            background-color: #f2f2f2;
            font-weight: bold;
            text-align: center;
          }
          .center { text-align: center; }
          .bb-signatures {
            display: table;
            width: 100%;
            margin-top: 24px;
          }
          .bb-signatures > div {
            display: table-cell;
            width: 33.33%;
            text-align: center;
            vertical-align: top;
          }
          .bb-sign-role { font-weight: bold; font-size: 12pt; }
          .bb-sign-sub { font-style: italic; font-size: 11pt; }
          .bb-sign-space { height: 60px; }
          .bb-sign-name { font-weight: bold; font-size: 12pt; }
        </style>
      </head>
      <body>
        ${contentHtml}
      </body>
      </html>
    `;

    const blob = new Blob(['\uFEFF' + wordHtml], { type: 'application/msword;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `BienBan_SinhHoat_Tuan_${this.bienBanWeek}_Lop9A4.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (window.chibiSound) window.chibiSound.playPlus();
    if (window.chibiNotifications) {
      window.chibiNotifications.showToast('Xuất file thành công! 📄', `Đã tải xuống file Word Biên Bản Tuần ${this.bienBanWeek}!`, 'success');
    }
  }
}

// Instantiate global app controller
window.appController = new AppController();

// Auto boot on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.appController.init();
});

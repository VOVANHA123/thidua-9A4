/**
 * DATA & STATE MANAGEMENT - THI ĐUA CHỦ NHIỆM 9A4 (CHIBI ANIME)
 */

const STORAGE_KEY = 'CHIBI_THIDUA_9A4_DATA_V6';
const STORAGE_BACKUP_KEY = 'CHIBI_THIDUA_SAFETY_BACKUP_V6';

// Default 12 Criteria based on the original template
const DEFAULT_CRITERIA = [
  {
    "id": "c1",
    "name": "Đi học đúng giờ",
    "type": "plus",
    "points": 1,
    "icon": "⏰",
    "category": "Chuyên cần"
  },
  {
    "id": "c2",
    "name": "Chuẩn bị bài đầy đủ",
    "type": "plus",
    "points": 1,
    "icon": "📚",
    "category": "Học tập"
  },
  {
    "id": "c3",
    "name": "Phát biểu xây dựng bài",
    "type": "plus",
    "points": 1,
    "maxDaily": 3,
    "icon": "🙋‍♂️",
    "category": "Học tập"
  },
  {
    "id": "c4",
    "name": "Giúp đỡ bạn tiến bộ",
    "type": "plus",
    "points": 2,
    "icon": "🤝",
    "category": "Đạo đức"
  },
  {
    "id": "c5",
    "name": "Làm việc nhóm tích cực",
    "type": "plus",
    "points": 1,
    "icon": "🧩",
    "category": "Kỹ năng"
  },
  {
    "id": "c6",
    "name": "Giữ gìn vệ sinh tốt",
    "type": "plus",
    "points": 1,
    "icon": "🧹",
    "category": "Lao động"
  },
  {
    "id": "c7",
    "name": "Việc tốt, hành động đẹp",
    "type": "plus",
    "points": 2,
    "icon": "🌟",
    "category": "Đạo đức"
  },
  {
    "id": "c8",
    "name": "Được giáo viên tuyên dương",
    "type": "plus",
    "points": 2,
    "icon": "🏆",
    "category": "Khen thưởng"
  },
  {
    "id": "c9",
    "name": "Đi học muộn",
    "type": "minus",
    "points": 2,
    "icon": "⏱️",
    "category": "Chuyên cần"
  },
  {
    "id": "c10",
    "name": "Không chuẩn bị bài / Không thuộc bài",
    "type": "minus",
    "points": 2,
    "icon": "❌",
    "category": "Học tập"
  },
  {
    "id": "c11",
    "name": "Quên sách vở, đồ dùng học tập",
    "type": "minus",
    "points": 1,
    "icon": "🎒",
    "category": "Học tập"
  },
  {
    "id": "c12",
    "name": "Nói chuyện riêng trong giờ",
    "type": "minus",
    "points": 1,
    "icon": "💬",
    "category": "Kỷ luật"
  },
  {
    "id": "c13",
    "name": "Làm mất trật tự lớp",
    "type": "minus",
    "points": 2,
    "icon": "📢",
    "category": "Kỷ luật"
  },
  {
    "id": "c14",
    "name": "Nói tục, thiếu lễ phép",
    "type": "minus",
    "points": 10,
    "icon": "🚫",
    "category": "Đạo đức"
  },
  {
    "id": "c15",
    "name": "Không hợp tác / lười hoạt động nhóm",
    "type": "minus",
    "points": 2,
    "icon": "🙅‍♂️",
    "category": "Kỹ năng"
  },
  {
    "id": "c16",
    "name": "Vi phạm nội quy nghiêm trọng (đánh nhau, vi phạm giao thông, sử dụng chất kích thích...",
    "type": "minus",
    "points": 20,
    "icon": "⚠️",
    "category": "Kỷ luật"
  }
];

// Danh sách Giáo viên (Bao gồm GVCN Admin & các Giáo viên bộ môn)
const DEFAULT_TEACHERS = [
  {
    id: 'gv01',
    username: 'admin',
    name: 'Thầy Võ Văn Hà',
    role: 'teacher',
    roleName: 'Giáo viên chủ nhiệm (Admin)',
    subject: 'Chủ nhiệm & Vật lý',
    pass: 'admin123',
    avatar: '👨‍🏫',
    isPrimary: true,
    hasChangedPass: false
  }
];

// Danh sách 29 Học sinh chính thức Lớp 9A4 (Chia đều 4 Tổ)
const DEFAULT_STUDENTS = [
  {
    "id": "hs01",
    "code": "9A401",
    "username": "baoanh.nnb",
    "name": "Nguyễn Ngọc Bảo Anh",
    "group": 2,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "👧",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs02",
    "code": "9A402",
    "username": "bao.nv",
    "name": "Nguyễn Văn Bảo",
    "group": 2,
    "role": "monitor",
    "roleName": "Thành viên",
    "avatar": "🌸",
    "pass": "123456",
    "canScore": true,
    "scoreScope": "class",
    "hasChangedPass": false
  },
  {
    "id": "hs03",
    "code": "9A403",
    "username": "dao.nk",
    "name": "Nguyễn Kim Đào",
    "group": 1,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🎀",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs04",
    "code": "9A404",
    "username": "du.ht",
    "name": "Huỳnh Thanh Đủ",
    "group": 4,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "👦",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs05",
    "code": "9A405",
    "username": "ha.lt",
    "name": "Lê Thu Hà",
    "group": 4,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🌷",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs06",
    "code": "9A406",
    "username": "han.ntn",
    "name": "Nguyễn Thị Ngọc Hân",
    "group": 1,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🌼",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs07",
    "code": "9A407",
    "username": "huynh.ltt",
    "name": "Lê Thị Trúc Huỳnh",
    "group": 3,
    "role": "leader",
    "roleName": "Tổ trưởng Tổ 3",
    "avatar": "✨",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs08",
    "code": "9A408",
    "username": "khang.nv",
    "name": "Nguyễn Văn Khang",
    "group": 3,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "👦",
    "pass": "123456",
    "canScore": true,
    "scoreScope": "group",
    "hasChangedPass": false
  },
  {
    "id": "hs09",
    "code": "9A409",
    "username": "khang.vt",
    "name": "Võ Trọng Khang",
    "group": 1,
    "role": "leader",
    "roleName": "Tổ trưởng Tổ 1",
    "avatar": "📚",
    "pass": "123456",
    "canScore": true,
    "scoreScope": "class",
    "hasChangedPass": false
  },
  {
    "id": "hs10",
    "code": "9A410",
    "username": "khanh.pdh",
    "name": "Phạm Đoàn Huy Khánh",
    "group": 4,
    "role": "vice",
    "roleName": "Lớp phó học tập",
    "avatar": "🎯",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs11",
    "code": "9A411",
    "username": "khoi.h",
    "name": "Huỳnh Khôi",
    "group": 3,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🚀",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs12",
    "code": "9A412",
    "username": "lam.ng",
    "name": "Nguyễn Gia Lâm",
    "group": 3,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "⚽",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs13",
    "code": "9A413",
    "username": "long.pv",
    "name": "Phan Văn Long",
    "group": 2,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "👓",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs14",
    "code": "9A414",
    "username": "my.blt",
    "name": "Bùi Lê Trà My",
    "group": 2,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🌻",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs15",
    "code": "9A415",
    "username": "nghia.ltq",
    "name": "Lê Trần Quang Nghĩa",
    "group": 4,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "👦",
    "pass": "123456",
    "canScore": true,
    "scoreScope": "group",
    "hasChangedPass": false
  },
  {
    "id": "hs16",
    "code": "9A416",
    "username": "nhut.vq",
    "name": "Võ Quốc Nhựt",
    "group": 2,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🧹",
    "pass": "123456",
    "canScore": true,
    "scoreScope": "class",
    "hasChangedPass": false
  },
  {
    "id": "hs17",
    "code": "9A417",
    "username": "phat.lt",
    "name": "Lê Thành Phát",
    "group": 3,
    "role": "vice",
    "roleName": "Lớp phó trật tự",
    "avatar": "⚡",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs18",
    "code": "9A418",
    "username": "phong.lh",
    "name": "Lê Hoài Phong",
    "group": 3,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🎨",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs19",
    "code": "9A419",
    "username": "phuong.nv",
    "name": "Nguyễn Vũ Phương",
    "group": 1,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🌿",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs20",
    "code": "9A420",
    "username": "quyen.ltm",
    "name": "Lê Thị Mỹ Quyên",
    "group": 3,
    "role": "leader",
    "roleName": "Tổ trưởng Tổ 2",
    "avatar": "💖",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs21",
    "code": "9A421",
    "username": "quynh.ltn",
    "name": "Lê Thị Ngọc Quỳnh",
    "group": 3,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🌺",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs22",
    "code": "9A422",
    "username": "tan.hn",
    "name": "Huỳnh Nhật Tân",
    "group": 4,
    "role": "vice",
    "roleName": "Lớp phó lao động",
    "avatar": "👦",
    "pass": "123456",
    "canScore": true,
    "scoreScope": "group",
    "hasChangedPass": false
  },
  {
    "id": "hs23",
    "code": "9A423",
    "username": "thao.hp",
    "name": "Hà Phương Thảo",
    "group": 4,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🍀",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs24",
    "code": "9A424",
    "username": "tiem.lv",
    "name": "Lê Văn Tiềm",
    "group": 1,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🎸",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs25",
    "code": "9A425",
    "username": "trang.nth",
    "name": "Nguyễn Thị Huyền Trang",
    "group": 4,
    "role": "leader",
    "roleName": "Tổ trưởng Tổ 4",
    "avatar": "🦄",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs26",
    "code": "9A426",
    "username": "tri.lm",
    "name": "Lê Minh Trí",
    "group": 2,
    "role": "vice",
    "roleName": "Lớp trưởng",
    "avatar": "🏆",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs27",
    "code": "9A427",
    "username": "tuyet.btn",
    "name": "Bùi Thị Như Tuyết",
    "group": 1,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "💎",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs28",
    "code": "9A428",
    "username": "van.ntc",
    "name": "Nguyễn Thị Cẩm Vân",
    "group": 1,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🍓",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  },
  {
    "id": "hs29",
    "code": "9A429",
    "username": "xuyen.bhb",
    "name": "Bùi Huỳnh Bảo Xuyên",
    "group": 3,
    "role": "member",
    "roleName": "Thành viên",
    "avatar": "🌈",
    "pass": "123456",
    "canScore": false,
    "scoreScope": "none",
    "hasChangedPass": false
  }
];

// Thông báo mẫu ban đầu
const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    sender: 'Thầy Võ Văn Hà (GVCN)',
    senderRole: 'teacher',
    target: 'all',
    type: 'broadcast',
    title: 'Chào mừng năm học mới & Khởi động phong trào thi đua!',
    content: 'Chào các em 9A4 thân yêu! Năm học mới 35 tuần đã bắt đầu, thầy chúc cả lớp luôn đoàn kết, chăm chỉ và gặt hái thật nhiều hoa điểm 10. Chúc 4 tổ thi đua sôi nổi và tiến bộ mỗi ngày! 🌟',
    time: '2026-09-01 07:30',
    readBy: []
  }
];

const NTFY_TOPIC = 'thidua9a4_tayphu_2026_sync';
const NTFY_URL = 'https://ntfy.sh/' + NTFY_TOPIC;
const CLIENT_SESSION_ID = 'cli_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwMfX0UumPL2-rKrbsFsaGDKhDAEpNfANyZ2kRpkYF6BO9fOUjD2ANuD7uSNm5pJ8gLAA/exec';

class ClassDataManager {
  constructor() {
    this.CLIENT_SESSION_ID = CLIENT_SESSION_ID;
    this.isFreshDevice = false;
    this.hasSuccessfullySyncedWithCloud = false;
    this.hasUserModification = false;
    this.data = this.loadFromStorage();
    this.isCloudConnected = false;
    this.eventSource = null;
    this.syncInProgress = false;
    this.lastSyncTime = null;
    this.pushTimeout = null;
    this.pollingInterval = null;

    // 1. Start persistent SSE connection & event catchup
    this.initRealtimeSync();

    // 2. Start Smart Realtime Polling loop (ensures updates even when SSE is paused on mobile)
    this.startRealtimePolling();

    // 3. Auto-sync from cloud master on initial load:
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.syncFromCloud(true);
      }, 100);
    }
  }

  getSyncApiUrl() {
    if (this.data && this.data.settings && this.data.settings.customServerUrl) {
      return this.data.settings.customServerUrl.trim();
    }
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      const origin = window.location.origin;
      if (origin.includes('vercel.app')) {
        return '/api/sync';
      }
    }
    return 'https://thidua-lop-9a4-chibi.vercel.app/api/sync';
  }

  async syncFromCloud(force = false) {
    if (this.syncInProgress && this.currentSyncPromise) {
      return this.currentSyncPromise;
    }
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      this.updateCloudStatusUI(false, 'Ngoại Tuyến');
      return { success: false, message: 'Thiết bị đang ngoại tuyến (Offline)' };
    }

    this.syncInProgress = true;
    this.updateCloudStatusUI(true, 'Đang đồng bộ...');

    this.currentSyncPromise = (async () => {
      try {
        return await this._doSyncFromCloud(force);
      } finally {
        this.syncInProgress = false;
        this.currentSyncPromise = null;
      }
    })();

    return this.currentSyncPromise;
  }

  async _doSyncFromCloud(force = false) {
    const fbDirectUrl = 'https://thidua-lop-9a4-79dca-default-rtdb.asia-southeast1.firebasedatabase.app/classes/lop9a4.json';

    // PRIMARY CLOUD SOURCE: Google Firebase Realtime Database
    try {
      const fbController = new AbortController();
      const fbTimeout = setTimeout(() => fbController.abort(), 7000);
      const fbRes = await fetch(fbDirectUrl + '?t=' + Date.now(), {
        signal: fbController.signal,
        cache: 'no-cache'
      });
      clearTimeout(fbTimeout);

      if (fbRes.ok) {
        const fbData = await fbRes.json();
        if (fbData && (fbData.students || fbData.criteria || fbData.settings)) {
          this.isCloudConnected = true;
          this.hasSuccessfullySyncedWithCloud = true;
          const serverUpdated = (fbData.settings && fbData.settings.updatedAt) || 0;
          const localUpdated = (this.data.settings && this.data.settings.updatedAt) || 0;
          const serverEventsLen = (fbData.events || []).length;
          const localEventsLen = (this.data.events || []).length;

          // Nếu máy này vừa sửa cài đặt mới hơn server: Đẩy cấu hình lên Firebase, TUYỆT ĐỐI không đè ngược!
          if (localUpdated > serverUpdated && this.hasUserModification) {
            await this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
            this.lastSyncTime = Date.now();
            this.updateCloudStatusUI(true, 'Đã Đồng Bộ ⚡');
            return { success: true, updated: false, pushed: true, data: this.data, source: 'firebase_realtime' };
          }

          const isServerConfigNewer = serverUpdated > localUpdated;
          const hasNewServerEvents = serverEventsLen > localEventsLen;
          const shouldUpdate = force || this.isFreshDevice || isServerConfigNewer || hasNewServerEvents || (localEventsLen === 0 && serverEventsLen > 0);

          if (shouldUpdate) {
            if (isServerConfigNewer || this.isFreshDevice || force) {
              // Server có cấu hình mới hơn hoặc người dùng chủ động bấm Tải: nhận toàn bộ
              this.data = this.mergeWithDefaults(fbData);
            } else {
              // Server chỉ có thêm sự kiện điểm số (học sinh khác chấm): hợp nhất điểm số, giữ nguyên cấu hình lớp này
              if (Array.isArray(fbData.events)) {
                const eventMap = new Map();
                const deletedSet = new Set([
                  ...(this.data.deletedEventIds || []),
                  ...(fbData.deletedEventIds || [])
                ]);
                this.data.deletedEventIds = Array.from(deletedSet);
                fbData.events.forEach(e => {
                  if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
                });
                (this.data.events || []).forEach(e => {
                  if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
                });
                this.data.events = Array.from(eventMap.values());
              }
            }

            this.isFreshDevice = false;
            this.hasUserModification = false;
            this.saveToStorageLocal();

            if (serverEventsLen > 0) {
              try {
                localStorage.setItem(STORAGE_BACKUP_KEY, JSON.stringify({
                  savedAt: Date.now(),
                  eventCount: (this.data.events || []).length,
                  data: this.data
                }));
              } catch(be) {}
            }

            this.lastSyncTime = Date.now();
            this.updateCloudStatusUI(true, 'Đã Đồng Bộ ⚡');
            if (window.appController) {
              window.appController.populatePortalStudentSelect();
              window.appController.populatePortalTeacherSelect();
              if (window.authManager && window.authManager.isLoggedIn()) {
                window.appController.refreshAll();
              }
            }
            if (force && window.chibiNotifications) {
              window.chibiNotifications.showToast('Đồng Bộ Thành Công! 📥', 'Đã nạp toàn bộ dữ liệu mới nhất từ Google Firebase!', 'success');
            }
            this.syncInProgress = false;
            return { success: true, updated: true, data: this.data, source: 'firebase_realtime' };
          } else {
            this.lastSyncTime = Date.now();
            this.updateCloudStatusUI(true, 'Đã Đồng Bộ ⚡');
            return { success: true, updated: false, data: this.data, source: 'firebase_realtime' };
          }
        }
      }
    } catch(fbErr) {
      console.warn('Firebase sync notice:', fbErr);
    }

    this.lastSyncTime = Date.now();
    this.updateCloudStatusUI(this.hasSuccessfullySyncedWithCloud, this.hasSuccessfullySyncedWithCloud ? 'Đã Đồng Bộ ⚡' : 'Ngoại Tuyến');
    return { success: true, updated: false, data: this.data };
  }

  pushToCloud(immediate = false, extraMeta = {}) {
    if (this.pushTimeout) {
      clearTimeout(this.pushTimeout);
      this.pushTimeout = null;
    }

    const doPush = async () => {
      if (typeof navigator !== 'undefined' && !navigator.onLine) return;

      const fbDirectUrl = 'https://thidua-lop-9a4-79dca-default-rtdb.asia-southeast1.firebasedatabase.app/classes/lop9a4.json';
      const currentUserId = (window.authManager && window.authManager.currentUser && window.authManager.currentUser.id) || 'admin';

      // Phân biệt rõ loại hành động:
      // CHỈ CÓ SCORE_ADD và SCORE_DELETE mới là hành động chấm điểm thuần túy.
      // Tất cả hành động khác (SETTINGS_UPDATE, CONFIG_SYNC, sửa học sinh, sửa tiêu chí, sửa GV, v.v.) là sửa cấu hình!
      const isScoreOnlyAction = Boolean(extraMeta && (extraMeta.recentAction === 'SCORE_ADD' || extraMeta.recentAction === 'SCORE_DELETE'));
      const isSettingsChange = !isScoreOnlyAction;

      // CLIENT SAFEGUARD:
      // Chặn thiết bị mới tinh không có dữ liệu vô tình ghi đè điểm
      if ((!this.hasSuccessfullySyncedWithCloud || this.isFreshDevice) && isScoreOnlyAction && (!extraMeta || !extraMeta.allowEmptyReset)) {
        console.warn('[SAFEGUARD NOTICE] Syncing before score push...');
        try {
          await this.syncFromCloud(true);
        } catch(e) {}
      }

      this.isFreshDevice = false;

      // FETCH-AND-MERGE TRƯỚC KHI PUSH:
      if (!extraMeta || !extraMeta.allowEmptyReset) {
        try {
          const checkRes = await fetch(fbDirectUrl + '?t=' + Date.now(), { cache: 'no-cache' });
          if (checkRes.ok) {
            const remote = await checkRes.json();
            if (remote) {
              // 1. Luôn hợp nhất sự kiện (Events) để không mất điểm đã chấm trên các máy khác
              if (Array.isArray(remote.events)) {
                const remoteEventMap = new Map();
                const deletedSet = new Set([
                  ...(this.data.deletedEventIds || []),
                  ...(remote.deletedEventIds || [])
                ]);
                if (extraMeta.recentAction === 'SCORE_DELETE' && extraMeta.recentData && extraMeta.recentData.eventId) {
                  deletedSet.add(extraMeta.recentData.eventId);
                }
                this.data.deletedEventIds = Array.from(deletedSet);

                remote.events.forEach(e => {
                  if (e && e.id && !deletedSet.has(e.id)) {
                    remoteEventMap.set(e.id, e);
                  }
                });
                if (Array.isArray(this.data.events)) {
                  this.data.events.forEach(e => {
                    if (e && e.id && !deletedSet.has(e.id)) {
                      remoteEventMap.set(e.id, e);
                    }
                  });
                }
                this.data.events = Array.from(remoteEventMap.values());
              }

              // 2. Bảo vệ cài đặt lớp:
              // NẾU là hành động chấm điểm thuần túy (học sinh chấm điểm):
              // Giữ nguyên cài đặt mới nhất từ Firebase, không cho máy học sinh đè cấu hình lớp
              if (isScoreOnlyAction) {
                const remoteUpdated = (remote.settings && remote.settings.updatedAt) || 0;
                const localUpdated = (this.data.settings && this.data.settings.updatedAt) || 0;
                if (remoteUpdated >= localUpdated) {
                  if (remote.settings) this.data.settings = { ...this.data.settings, ...remote.settings };
                  if (remote.students) this.data.students = Array.isArray(remote.students) ? remote.students : Object.values(remote.students);
                  if (remote.criteria) this.data.criteria = Array.isArray(remote.criteria) ? remote.criteria : Object.values(remote.criteria);
                  if (remote.teachers) this.data.teachers = Array.isArray(remote.teachers) ? remote.teachers : Object.values(remote.teachers);
                  this.saveToStorageLocal();
                }
              }
              // NẾU là hành động sửa cài đặt / cấu hình (GVCN lưu hoặc sửa học sinh, tiêu chí, GV):
              // TUYỆT ĐỐI KHÔNG ghi đè ngược! Giữ nguyên cấu hình vừa sửa của Thầy!
            }
          }
        } catch(checkErr) {
          console.warn('Pre-push cloud verification notice:', checkErr);
        }
      }

      if (isSettingsChange) {
        if (!this.data.settings) this.data.settings = {};
        this.data.settings.updatedAt = Date.now();
      }

      const payload = {
        ...this.data,
        clientId: CLIENT_SESSION_ID,
        lastSenderClientId: CLIENT_SESSION_ID,
        lastUpdatedBy: currentUserId,
        ...extraMeta
      };

      // 1. ĐỒNG BỘ TRỰC TIẾP QUA FIREBASE REALTIME DATABASE WEBSOCKET
      if (window.firebaseSyncEngine) {
        window.firebaseSyncEngine.pushToCloud(this.data, {
          ...extraMeta,
          isScoreOnlyAction,
          isSettingsChange,
          clientId: CLIENT_SESSION_ID,
          lastSenderClientId: CLIENT_SESSION_ID
        });
      }

      // 2. ĐẨY TRỰC TIẾP QUA REST API GOOGLE FIREBASE REALTIME DATABASE
      try {
        const fbRes = await fetch(fbDirectUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (fbRes.ok) {
          this.lastSyncTime = Date.now();
          this.hasUserModification = false;
          this.hasSuccessfullySyncedWithCloud = true;
          this.updateCloudStatusUI(true, 'Đã Lưu ⚡');
        }
      } catch (fbErr) {
        console.warn('Firebase direct push warning:', fbErr);
      }
    };

    if (immediate) {
      return doPush();
    } else {
      this.pushTimeout = setTimeout(doPush, 500);
    }
  }

  mergeWithDefaults(incoming) {
    const defaults = this.getDefaultData();
    if (!incoming) return defaults;

    // Helper to safely convert Firebase/GAS objects to arrays
    const toSafeArray = (val, fallback) => {
      if (!val) return fallback;
      if (Array.isArray(val)) return val.length > 0 ? val : fallback;
      if (typeof val === 'object') {
        const arr = Object.values(val);
        return arr.length > 0 ? arr : fallback;
      }
      return fallback;
    };

    const incomingDeleted = toSafeArray(incoming.deletedEventIds, []);
    const localDeleted = (this.data && Array.isArray(this.data.deletedEventIds)) ? this.data.deletedEventIds : [];
    const deletedSet = new Set([...localDeleted, ...incomingDeleted]);

    const incomingEvents = toSafeArray(incoming.events, []);
    // EVENT UNION: Ensure events from server and valid non-deleted local events are retained
    const eventMap = new Map();
    incomingEvents.forEach(e => {
      if (e && e.id && !deletedSet.has(e.id)) {
        eventMap.set(e.id, e);
      }
    });

    // Only union local events if this device is NOT fresh and events are not deleted
    if (this.data && Array.isArray(this.data.events) && !this.isFreshDevice) {
      this.data.events.forEach(e => {
        if (e && e.id && !deletedSet.has(e.id) && !eventMap.has(e.id)) {
          eventMap.set(e.id, e);
        }
      });
    }
    const mergedEvents = Array.from(eventMap.values());

    const merged = {
      settings: { ...defaults.settings, ...(incoming.settings || {}) },
      teachers: toSafeArray(incoming.teachers, defaults.teachers),
      students: toSafeArray(incoming.students, defaults.students),
      criteria: toSafeArray(incoming.criteria, defaults.criteria),
      events: mergedEvents,
      deletedEventIds: Array.from(deletedSet),
      feedback: incoming.feedback || {},
      notifications: toSafeArray(incoming.notifications, defaults.notifications).map(n => ({
        ...n,
        readBy: Array.isArray(n && n.readBy) ? n.readBy : []
      }))
    };

    // Ensure teacher pass stays synchronized with settings
    if (merged.settings && merged.settings.teacherPass && merged.teachers && merged.teachers.length > 0) {
      merged.teachers.forEach(t => {
        if (t.isPrimary || t.id === 'gv01' || t.username === 'admin') {
          if (!t.pass || t.pass === 'admin123') {
            t.pass = merged.settings.teacherPass;
          }
        }
      });
    }

    // Ensure student fields exist
    merged.students.forEach(s => {
      if (s.canScore === undefined) {
        s.canScore = (s.role === 'leader' || s.role === 'monitor' || s.role === 'vice');
      }
      if (s.scoreScope === undefined) {
        s.scoreScope = (s.role === 'monitor' || s.role === 'vice') ? 'class' : (s.role === 'leader' ? 'group' : 'none');
      }
      if (!s.pass) s.pass = '123456';
    });

    return merged;
  }

  // --- SMART REALTIME POLLING (Guarantees Live Updates on Mobile Phones) ---
  startRealtimePolling() {
    if (this.pollingInterval) clearInterval(this.pollingInterval);

    const checkUpdate = async () => {
      if (typeof navigator !== 'undefined' && !navigator.onLine) return;
      if (this.syncInProgress) return;
      // Nếu WebSocket của Firebase đang hoạt động trực tuyến, không cần polling liên tục
      if (window.firebaseSyncEngine && window.firebaseSyncEngine.isConnected) return;

      try {
        const fbDirectUrl = 'https://thidua-lop-9a4-79dca-default-rtdb.asia-southeast1.firebasedatabase.app/classes/lop9a4.json';
        const res = await fetch(fbDirectUrl + '?t=' + Date.now(), { cache: 'no-cache' });
        if (res.ok) {
          const fbData = await res.json();
          if (fbData && (fbData.students || fbData.settings)) {
            const serverUpdated = (fbData.settings && fbData.settings.updatedAt) || 0;
            const localUpdated = (this.data.settings && this.data.settings.updatedAt) || 0;
            const serverEventsLen = (fbData.events || []).length;
            const localEventsLen = (this.data.events || []).length;

            const isServerConfigNewer = serverUpdated > localUpdated;
            const hasNewEvents = serverEventsLen > localEventsLen;
            const needsSync = this.isFreshDevice || hasNewEvents || (localEventsLen === 0 && serverEventsLen > 0) || isServerConfigNewer;

            if (needsSync) {
              if (isServerConfigNewer || this.isFreshDevice) {
                this.data = this.mergeWithDefaults(fbData);
              } else {
                // Chỉ hợp nhất điểm số, giữ nguyên cấu hình lớp của máy này
                if (Array.isArray(fbData.events)) {
                  const eventMap = new Map();
                  const deletedSet = new Set([
                    ...(this.data.deletedEventIds || []),
                    ...(fbData.deletedEventIds || [])
                  ]);
                  this.data.deletedEventIds = Array.from(deletedSet);
                  fbData.events.forEach(e => {
                    if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
                  });
                  (this.data.events || []).forEach(e => {
                    if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
                  });
                  this.data.events = Array.from(eventMap.values());
                }
              }
              this.isFreshDevice = false;
              this.hasUserModification = false;
              this.saveToStorageLocal();

              if (serverEventsLen > 0) {
                try {
                  localStorage.setItem(STORAGE_BACKUP_KEY, JSON.stringify({
                    savedAt: Date.now(),
                    eventCount: (this.data.events || []).length,
                    data: this.data
                  }));
                } catch(be) {}
              }

              this.lastSyncTime = Date.now();
              this.updateCloudStatusUI(true, 'Đã Đồng Bộ ⚡');

              if (window.appController) {
                window.appController.populatePortalStudentSelect();
                window.appController.populatePortalTeacherSelect();
                window.appController.refreshAll();
              }
            }
          }
        }
      } catch (e) {}
    };

    // Heartbeat poll every 4 seconds
    this.pollingInterval = setInterval(checkUpdate, 4000);

    // When phone is unlocked or tab is focused: IMMEDIATELY update!
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          checkUpdate();
          this.connectSSE();
        }
      });
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', () => {
        checkUpdate();
      });
    }
  }

  initRealtimeSync() {
    // Persistent Realtime Stream (SSE) for LIVE events only
    this.connectSSE();

    // 3. Keepalive and auto-reconnect
    setInterval(() => {
      if (!this.eventSource || this.eventSource.readyState === 2) {
        this.connectSSE();
      }
    }, 8000);

    // 4. Listen for network changes
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('online', () => {
        this.syncFromCloud(true);
        this.catchUpEvents();
        this.connectSSE();
      });
    }
  }

  connectSSE() {
    if (typeof EventSource === 'undefined') return;

    if (this.eventSource) {
      try { this.eventSource.close(); } catch(e) {}
    }

    try {
      this.eventSource = new EventSource(NTFY_URL + '/sse');
      this.eventSource.onopen = () => {
        this.isCloudConnected = true;
        this.updateCloudStatusUI(true, 'Trực Tuyến ⚡');
      };

      this.eventSource.onmessage = (event) => {
        try {
          const ntfyData = JSON.parse(event.data);
          if (ntfyData && ntfyData.message) {
            const payload = JSON.parse(ntfyData.message);
            this.handleRealtimeIncoming(payload);
          }
        } catch(e) {}
      };

      this.eventSource.onerror = () => {
        // Non-critical: SSE disconnects are normal on mobile/sleep; fallback polling handles sync
      };
    } catch(e) {
      console.warn('SSE connection non-critical warning:', e);
    }
  }

  async catchUpEvents() {
    if (!navigator.onLine) return;
    try {
      const res = await fetch(`${NTFY_URL}/json?poll=1&since=24h`, { cache: 'no-cache' });
      if (res.ok) {
        const text = await res.text();
        const lines = text.trim().split('\n');
        lines.forEach(line => {
          try {
            if (!line) return;
            const parsed = JSON.parse(line);
            if (parsed.message) {
              const payload = JSON.parse(parsed.message);
              this.handleRealtimeIncoming(payload, true);
            }
          } catch(e) {}
        });
        this.isCloudConnected = true;
        this.updateCloudStatusUI(true, 'Trực Tuyến ⚡');
      }
    } catch(e) {
      console.warn('Catch up events offline fallback:', e);
    }
  }

  async broadcastEvent(actionType, payloadData) {
    if (!navigator.onLine) return;
    const currentUserId = (window.authManager && window.authManager.currentUser && window.authManager.currentUser.id) || 'admin';
    const payload = {
      action: actionType,
      clientId: CLIENT_SESSION_ID,
      senderId: CLIENT_SESSION_ID,
      userId: currentUserId,
      timestamp: Date.now(),
      data: payloadData
    };

    try {
      await fetch(NTFY_URL, {
        method: 'POST',
        headers: { 'Title': 'ThiDua9A4_Live', 'Tags': 'sparkles' },
        body: JSON.stringify(payload)
      });
      this.isCloudConnected = true;
      this.updateCloudStatusUI(true, 'Trực Tuyến ⚡');
    } catch(e) {
      console.warn('Could not broadcast realtime event:', e);
    }
  }

  handleRealtimeIncoming(payload, isCatchUp = false) {
    if (!payload || !payload.action) return;

    // Ignore events originating from this very same browser tab
    if ((payload.clientId === CLIENT_SESSION_ID || payload.senderId === CLIENT_SESSION_ID) && !isCatchUp) {
      return;
    }

    // Handle full server sync broadcast from another device
    if (payload.action === 'FULL_DATA_SYNC') {
      if (!isCatchUp) {
        this.syncFromCloud(false);
      }
      return;
    }

    if (payload.action === 'SCORE_ADD') {
      const ev = payload.data;
      if (ev && ev.id) {
        const exists = this.data.events.some(e => e.id === ev.id);
        if (!exists) {
          this.data.events.push(ev);
          this.saveToStorageLocal();
          if (window.appController) {
            window.appController.refreshAll();
            if (window.appController.activeScoringStudentId === ev.studentId) {
              window.appController.renderScoreModalHistory(ev.studentId);
            }
          }
          if (!isCatchUp) {
            if (window.chibiSound) window.chibiSound.playPlus();
            if (window.chibiNotifications) {
              window.chibiNotifications.showToast('Điểm thi đua mới! 🌸', `${ev.byName || 'Thành viên'} vừa chấm điểm cho học sinh!`, 'info');
            }
          }
        }
      }
    } else if (payload.action === 'SCORE_DELETE') {
      const eventId = (payload.data && payload.data.eventId) || payload.data;
      if (eventId) {
        this.data.events = this.data.events.filter(e => e.id !== eventId);
        this.saveToStorageLocal();
        if (window.appController) {
          window.appController.refreshAll();
        }
      }
    } else if (payload.action === 'CONFIG_SYNC') {
      const incoming = payload.data;
      if (incoming && incoming.students && incoming.settings) {
        this.data = incoming;
        this.saveToStorageLocal();
        if (window.appController) {
          window.appController.populatePortalStudentSelect();
          window.appController.populatePortalTeacherSelect();
          window.appController.refreshAll();
        }
      }
    } else if (payload.action === 'NOTIF_ADD') {
      const notif = payload.data;
      if (notif && notif.id) {
        const exists = this.data.notifications.some(n => n.id === notif.id);
        if (!exists) {
          this.data.notifications.unshift(notif);
          this.saveToStorageLocal();
          if (window.appController) {
            window.appController.renderMailbox();
          }
          if (!isCatchUp && window.chibiSound) {
            window.chibiSound.playDing();
          }
        }
      }
    }
  }

  saveToStorageLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch(e) {}
  }

  updateCloudStatusUI(connected, statusText = null) {
    this.isCloudConnected = connected;
    const el = document.getElementById('cloud-sync-status-badge');
    const elTop = document.getElementById('cloud-sync-status-badge-top');

    const timeStr = this.lastSyncTime
      ? new Date(this.lastSyncTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      : 'Trực tuyến';

    let displayMsg = '';
    if (!connected) {
      displayMsg = '🟠 Đám Mây: Ngoại Tuyến (Offline)';
    } else if (statusText) {
      displayMsg = `🟢 Máy Chủ: ${statusText} (${timeStr}) ⚡`;
    } else {
      displayMsg = `🟢 Máy Chủ: Trực Tuyến (${timeStr}) ⚡`;
    }

    if (el) {
      el.innerHTML = displayMsg;
      el.style.background = connected ? 'rgba(34, 197, 94, 0.2)' : 'rgba(249, 115, 22, 0.2)';
      el.style.color = connected ? '#16a34a' : '#ea580c';
      el.style.borderColor = connected ? '#86efac' : '#fdba74';
    }
    if (elTop) {
      elTop.innerHTML = connected ? `☁️ Máy Chủ: Đã Đồng Bộ (${timeStr}) ⚡` : '☁️ Máy Chủ: Ngoại Tuyến';
      elTop.style.color = connected ? '#86efac' : '#fdba74';
    }
  }

  getDefaultData() {
    return {
      settings: {
        className: 'Lớp 9A4',
        schoolName: 'TRƯỜNG THCS TÂY PHÚ',
        teacherName: 'Thầy Võ Văn Hà',
        teacherPass: 'admin123',
        academicYear: '2026 - 2027',
        currentWeek: 1,
        currentMonth: 9,
        slogan: 'ĐOÀN KẾT – TRUNG THỰC – KỶ LUẬT – TÍCH CỰC – TIẾN BỘ MỖI NGÀY!',
        lockedWeeks: [],
        updatedAt: 0 // Crucial: default template data has timestamp 0, never claims to be newer than server!
      },
      teachers: JSON.parse(JSON.stringify(DEFAULT_TEACHERS)),
      students: JSON.parse(JSON.stringify(DEFAULT_STUDENTS)),
      criteria: JSON.parse(JSON.stringify(DEFAULT_CRITERIA)),
      events: [], // Toàn bộ điểm số bắt đầu từ 0
      deletedEventIds: [],
      feedback: {},
      notifications: JSON.parse(JSON.stringify(DEFAULT_NOTIFICATIONS))
    };
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.students && parsed.settings) {
          // Auto-migration & validation for mobile and desktop
          if (!parsed.criteria || parsed.criteria.length === 0) {
            parsed.criteria = JSON.parse(JSON.stringify(DEFAULT_CRITERIA));
          }
          if (!parsed.teachers || parsed.teachers.length === 0) {
            parsed.teachers = JSON.parse(JSON.stringify(DEFAULT_TEACHERS));
          }
          if (!parsed.deletedEventIds) {
            parsed.deletedEventIds = [];
          }
          if (!parsed.settings.schoolName) {
            parsed.settings.schoolName = 'TRƯỜNG THCS TÂY PHÚ';
          }
          if (!parsed.settings.className) {
            parsed.settings.className = 'LỚP 9A4';
          }

          // Ensure student fields exist
          parsed.students.forEach(s => {
            if (s.canScore === undefined) {
              s.canScore = (s.role === 'leader' || s.role === 'monitor' || s.role === 'vice');
            }
            if (s.scoreScope === undefined) {
              s.scoreScope = (s.role === 'monitor' || s.role === 'vice') ? 'class' : (s.role === 'leader' ? 'group' : 'none');
            }
            if (!s.pass) s.pass = '123456';
          });

          // Check if this device actually has events or real data
          const eventsLen = (parsed.events || []).length;
          if (eventsLen === 0 && (!parsed.settings.updatedAt || parsed.settings.updatedAt === 0)) {
            this.isFreshDevice = true;
          }

          this.saveToStorageLocal(parsed);
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not parse localStorage data, falling back to default:', e);
    }

    // FRESH INSTALL / NEW DEVICE:
    // Mark as fresh device with 0 updatedAt, so it will ALWAYS prioritize pulling from cloud!
    this.isFreshDevice = true;
    const defaultData = this.getDefaultData();
    defaultData.settings.updatedAt = 0;
    this.saveToStorageLocal(defaultData); // Save locally ONLY, NEVER push empty data on boot!
    return defaultData;
  }

  saveToStorage(dataToSave = null, isUserAction = true, isSettingsEdit = false) {
    const d = dataToSave || this.data;
    try {
      if (isSettingsEdit) {
        this.hasUserModification = true;
        this.isFreshDevice = false;
        if (d && d.settings) d.settings.updatedAt = Date.now();
      } else if (isUserAction) {
        this.hasUserModification = true;
        this.isFreshDevice = false;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(d));

      // Save safety snapshot if we have events
      if (d && Array.isArray(d.events) && d.events.length > 0) {
        try {
          localStorage.setItem(STORAGE_BACKUP_KEY, JSON.stringify({
            savedAt: Date.now(),
            eventCount: d.events.length,
            data: d
          }));
        } catch(be) {}
      }

      // Automatically push to cloud master database whenever user makes modifications
      if (this.hasUserModification) {
        this.pushToCloud(false, isSettingsEdit ? { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true } : {});
      }
    } catch (e) {
      console.error('Error saving data to localStorage:', e);
    }
  }

  resetData() {
    this.data = this.getDefaultData();
    this.data.settings.updatedAt = Date.now();
    this.hasUserModification = true;
    this.isFreshDevice = false;
    this.saveToStorageLocal();
    this.pushToCloud(true, { allowEmptyReset: true, actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
    this.broadcastEvent('CONFIG_SYNC', this.data);
    return this.data;
  }

  restoreFromSafetyBackup() {
    try {
      const stored = localStorage.getItem(STORAGE_BACKUP_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.data && parsed.data.students) {
          this.data = this.mergeWithDefaults(parsed.data);
          this.hasUserModification = true;
          this.isFreshDevice = false;
          this.saveToStorage(this.data, true, true);
          this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
          if (window.appController) {
            window.appController.refreshAll();
          }
          return { success: true, eventCount: parsed.eventCount, savedAt: parsed.savedAt };
        }
      }
    } catch(e) {
      console.warn('Safety backup restore error:', e);
    }
    return { success: false, message: 'Không tìm thấy bản sao lưu an toàn trên máy này.' };
  }

  // --- SETTINGS & CLASS CONFIG ---
  getSettings() {
    return this.data.settings;
  }

  updateSettings(newSettings) {
    return this.updateAllSettings(newSettings, null, null);
  }

  updateAllSettings(newSettings, newStudents = null, newCriteria = null) {
    if (newSettings) {
      this.data.settings = { ...this.data.settings, ...newSettings };
      if (newSettings.teacherPass && this.data.teachers && this.data.teachers.length > 0) {
        this.data.teachers.forEach(t => {
          if (t.isPrimary || t.id === 'gv01' || t.username === 'admin') {
            t.pass = newSettings.teacherPass.trim();
            t.hasChangedPass = true;
          }
        });
      }
    }
    if (newStudents && Array.isArray(newStudents) && newStudents.length > 0) {
      this.data.students = newStudents;
    }
    if (newCriteria && Array.isArray(newCriteria) && newCriteria.length > 0) {
      this.data.criteria = newCriteria;
    }
    this.data.settings.updatedAt = Date.now();
    this.hasUserModification = true;
    this.isFreshDevice = false;
    this.saveToStorage(this.data, true, true);
    this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
    this.broadcastEvent('CONFIG_SYNC', this.data);
    return this.data;
  }

  // --- EXPORT & IMPORT CONFIGURATION (SYNC BETWEEN DEVICES) ---
  exportConfig() {
    const config = {
      settings: this.data.settings,
      criteria: this.data.criteria,
      students: this.data.students,
      teachers: this.data.teachers,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CauHinh_Lop9A4_${new Date().toISOString().substring(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  importConfig(jsonString) {
    try {
      const config = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      if (config.students && config.settings) {
        if (config.settings) this.data.settings = { ...this.data.settings, ...config.settings };
        if (config.criteria) this.data.criteria = config.criteria;
        if (config.students) this.data.students = config.students;
        if (config.teachers) this.data.teachers = config.teachers;
        if (!this.data.settings) this.data.settings = {};
        this.data.settings.updatedAt = Date.now();
        this.saveToStorage(this.data, true, true);
        this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
        return { success: true };
      }
      return { success: false, message: 'File cấu hình không hợp lệ!' };
    } catch (e) {
      return { success: false, message: 'Lỗi nạp file: ' + e.message };
    }
  }

  // --- TEACHERS MANAGEMENT ---
  getTeachers() {
    if (!this.data.teachers || this.data.teachers.length === 0) {
      this.data.teachers = JSON.parse(JSON.stringify(DEFAULT_TEACHERS));
      this.saveToStorageLocal();
    }
    return this.data.teachers;
  }

  getTeacherById(id) {
    return this.getTeachers().find(t => t.id === id);
  }

  getTeacherByUsername(username) {
    return this.getTeachers().find(t => t.username.toLowerCase() === username.trim().toLowerCase());
  }

  addTeacher(teacher) {
    const teachers = this.getTeachers();
    const newId = 'gv' + (teachers.length + 1).toString().padStart(2, '0');
    const newTeacher = {
      id: newId,
      username: teacher.username ? teacher.username.trim().toLowerCase() : `gv${teachers.length + 1}`,
      name: teacher.name.trim(),
      role: 'teacher',
      roleName: teacher.roleName || 'Giáo viên bộ môn',
      subject: teacher.subject || 'Bộ môn',
      pass: teacher.pass || '123456',
      avatar: teacher.avatar || '👨‍🏫',
      isPrimary: false,
      hasChangedPass: false
    };
    this.data.teachers.push(newTeacher);
    if (!this.data.settings) this.data.settings = {};
    this.data.settings.updatedAt = Date.now();
    this.saveToStorage(this.data, true, true);
    this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
    return newTeacher;
  }

  updateTeacher(id, updatedFields) {
    const teachers = this.getTeachers();
    const index = teachers.findIndex(t => t.id === id);
    if (index !== -1) {
      this.data.teachers[index] = { ...this.data.teachers[index], ...updatedFields };
      if (!this.data.settings) this.data.settings = {};
      this.data.settings.updatedAt = Date.now();
      this.saveToStorage(this.data, true, true);
      this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
      return this.data.teachers[index];
    }
    return null;
  }

  deleteTeacher(id) {
    const teachers = this.getTeachers();
    const target = teachers.find(t => t.id === id);
    if (target && target.isPrimary) {
      return { success: false, message: 'Không thể xóa tài khoản Giáo viên chủ nhiệm chính!' };
    }
    this.data.teachers = teachers.filter(t => t.id !== id);
    if (!this.data.settings) this.data.settings = {};
    this.data.settings.updatedAt = Date.now();
    this.saveToStorage(this.data, true, true);
    this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
    return { success: true };
  }

  // --- STUDENTS MANAGEMENT ---
  getStudents(group = 'all') {
    if (group === 'all' || !group) return this.data.students;
    const gNum = parseInt(group, 10);
    return this.data.students.filter(s => s.group === gNum);
  }

  getStudentById(id) {
    return this.data.students.find(s => s.id === id);
  }

  getStudentByUsername(username) {
    return this.data.students.find(s => s.username.toLowerCase() === username.toLowerCase());
  }

  updateStudent(id, updatedFields) {
    const index = this.data.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.data.students[index] = { ...this.data.students[index], ...updatedFields };
      if (!this.data.settings) this.data.settings = {};
      this.data.settings.updatedAt = Date.now();
      this.saveToStorage(this.data, true, true);
      this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
      return this.data.students[index];
    }
    return null;
  }

  addStudent(student) {
    const newId = 'hs' + (this.data.students.length + 1).toString().padStart(2, '0');
    const newCode = `9A4${(this.data.students.length + 1).toString().padStart(2, '0')}`;
    const newStudent = {
      id: newId,
      code: student.code || newCode,
      username: student.username || `hs${newId}`,
      name: student.name,
      group: parseInt(student.group, 10) || 1,
      role: student.role || 'member',
      roleName: student.roleName || 'Thành viên',
      avatar: student.avatar || '🧑‍🎓',
      pass: student.pass || '123456',
      canScore: Boolean(student.canScore),
      scoreScope: student.scoreScope || (student.role === 'leader' ? 'group' : (student.role === 'monitor' || student.role === 'vice' ? 'class' : 'none')),
      hasChangedPass: false
    };
    this.data.students.push(newStudent);
    if (!this.data.settings) this.data.settings = {};
    this.data.settings.updatedAt = Date.now();
    this.saveToStorage(this.data, true, true);
    this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
    return newStudent;
  }

  deleteStudent(id) {
    this.data.students = this.data.students.filter(s => s.id !== id);
    this.data.events = this.data.events.filter(e => e.studentId !== id);
    if (!this.data.settings) this.data.settings = {};
    this.data.settings.updatedAt = Date.now();
    this.saveToStorage(this.data, true, true);
    this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
  }

  // --- PASSWORD & PERMISSIONS MANAGEMENT ---
  changePassword(userId, oldPass, newPass) {
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'Mật khẩu mới phải có ít nhất 4 ký tự!' };
    }

    // Check if Teacher
    const teacher = this.getTeacherById(userId) || this.getTeacherByUsername(userId);
    if (teacher) {
      if (oldPass && teacher.pass !== oldPass) {
        return { success: false, message: 'Mật khẩu cũ không chính xác!' };
      }
      teacher.pass = newPass.trim();
      teacher.hasChangedPass = true;
      if (teacher.isPrimary) {
        this.data.settings.teacherPass = newPass.trim();
      }
      if (!this.data.settings) this.data.settings = {};
      this.data.settings.updatedAt = Date.now();
      this.saveToStorage(this.data, true, true);
      this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
      return { success: true, user: teacher };
    }

    // Check if Student
    const student = this.getStudentById(userId) || this.getStudentByUsername(userId);
    if (student) {
      if (oldPass && (student.pass || '123456') !== oldPass) {
        return { success: false, message: 'Mật khẩu cũ không chính xác!' };
      }
      student.pass = newPass.trim();
      student.hasChangedPass = true;
      if (!this.data.settings) this.data.settings = {};
      this.data.settings.updatedAt = Date.now();
      this.saveToStorage(this.data, true, true);
      this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
      return { success: true, user: student };
    }

    return { success: false, message: 'Không tìm thấy tài khoản người dùng!' };
  }

  toggleStudentScoringPermission(studentId, canScore, scoreScope = 'group') {
    const student = this.getStudentById(studentId);
    if (student) {
      student.canScore = Boolean(canScore);
      student.scoreScope = canScore ? scoreScope : 'none';
      if (!this.data.settings) this.data.settings = {};
      this.data.settings.updatedAt = Date.now();
      this.saveToStorage(this.data, true, true);
      this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
      return { success: true, student };
    }
    return { success: false, message: 'Không tìm thấy học sinh!' };
  }

  // --- CRITERIA MANAGEMENT ---
  getCriteria(type = 'all') {
    if (!this.data.criteria || this.data.criteria.length === 0) {
      this.data.criteria = JSON.parse(JSON.stringify(DEFAULT_CRITERIA));
      this.saveToStorage();
    }
    if (type === 'all' || !type) return this.data.criteria;
    return this.data.criteria.filter(c => c.type === type);
  }

  getCriteriaById(id) {
    return this.getCriteria().find(c => c.id === id);
  }

  addCriteria(criteria) {
    const list = this.getCriteria();
    const newId = 'c' + Date.now().toString().slice(-6);
    const newCrit = {
      id: newId,
      name: criteria.name ? criteria.name.trim() : 'Tiêu chí mới',
      type: criteria.type === 'minus' ? 'minus' : 'plus',
      points: Math.max(0.5, parseFloat(criteria.points) || 1),
      icon: criteria.icon ? criteria.icon.trim() : (criteria.type === 'minus' ? '⚠️' : '🌸'),
      category: criteria.category ? criteria.category.trim() : (criteria.type === 'minus' ? 'Kỷ luật' : 'Học tập')
    };
    this.data.criteria.push(newCrit);
    if (!this.data.settings) this.data.settings = {};
    this.data.settings.updatedAt = Date.now();
    this.saveToStorage(this.data, true, true);
    this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
    return newCrit;
  }

  updateCriteria(id, updatedFields) {
    const list = this.getCriteria();
    const idx = list.findIndex(c => c.id === id);
    if (idx !== -1) {
      if (updatedFields.points !== undefined) {
        updatedFields.points = Math.max(0.1, parseFloat(updatedFields.points) || 1);
      }
      this.data.criteria[idx] = { ...this.data.criteria[idx], ...updatedFields };
      if (!this.data.settings) this.data.settings = {};
      this.data.settings.updatedAt = Date.now();
      this.saveToStorage(this.data, true, true);
      this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
      return this.data.criteria[idx];
    }
    return null;
  }

  deleteCriteria(id) {
    const list = this.getCriteria();
    if (list.length <= 1) {
      return { success: false, message: 'Hệ thống cần giữ lại ít nhất 1 tiêu chí thi đua!' };
    }
    this.data.criteria = list.filter(c => c.id !== id);
    if (!this.data.settings) this.data.settings = {};
    this.data.settings.updatedAt = Date.now();
    this.saveToStorage(this.data, true, true);
    this.pushToCloud(true, { actionType: 'SETTINGS_UPDATE', allowSettingsOverwrite: true });
    return { success: true };
  }

  // --- SCORING & EVENTS ---
  addScoreEvent(event) {
    let weekVal = event.week;
    if (weekVal === 'hk1' || weekVal === 'hk2' || weekVal === 'all-year') {
      weekVal = this.data.settings.currentWeek || 1;
    } else {
      weekVal = parseInt(weekVal || this.data.settings.currentWeek || 1, 10);
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

    const newEvent = {
      id: 'ev-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      studentId: event.studentId,
      week: weekVal,
      day: event.day || 'T2',
      criteriaId: event.criteriaId,
      points: parseFloat(event.points) || 0,
      type: event.type || 'plus',
      note: event.note || '',
      recordedAt: event.recordedAt || timeStr,
      timestamp: new Date().toISOString(),
      by: event.by || 'system',
      byName: event.byName || (event.by === 'teacher' ? (this.data.settings.teacherName || 'Thầy Võ Văn Hà') : 'Người chấm'),
      byRole: event.byRole || (event.by === 'teacher' ? 'GVCN (Admin)' : 'Ban cán sự')
    };

    this.data.events.push(newEvent);
    this.saveToStorage();
    this.broadcastEvent('SCORE_ADD', newEvent);
    this.pushToCloud(true, { recentAction: 'SCORE_ADD', recentData: newEvent });
    return newEvent;
  }

  deleteScoreEvent(eventId) {
    this.data.events = this.data.events.filter(e => e.id !== eventId);
    if (!this.data.deletedEventIds) this.data.deletedEventIds = [];
    if (!this.data.deletedEventIds.includes(eventId)) {
      this.data.deletedEventIds.push(eventId);
    }
    this.saveToStorage();
    this.broadcastEvent('SCORE_DELETE', { eventId });
    this.pushToCloud(true, { recentAction: 'SCORE_DELETE', recentData: { eventId } });
  }

  getStudentEvents(studentId, period = null) {
    return this.data.events.filter(e => {
      if (e.studentId !== studentId) return false;
      if (period === null || period === undefined) return true;
      if (period === 'hk1') return e.week >= 1 && e.week <= 18;
      if (period === 'hk2') return e.week >= 19 && e.week <= 35;
      if (period === 'all-year' || period === 'year') return e.week >= 1 && e.week <= 35;
      const w = parseInt(period, 10);
      if (!isNaN(w) && e.week !== w) return false;
      return true;
    });
  }

  calculateStudentScore(studentId, period = 1) {
    const events = this.getStudentEvents(studentId, period);
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    
    const dayBreakdown = {};
    days.forEach(d => {
      dayBreakdown[d] = { plus: 0, minus: 0, total: 0, events: [] };
    });

    let totalPlus = 0;
    let totalMinus = 0;

    events.forEach(e => {
      if (dayBreakdown[e.day]) {
        dayBreakdown[e.day].events.push(e);
        if (e.type === 'plus') {
          dayBreakdown[e.day].plus += e.points;
          totalPlus += e.points;
        } else {
          dayBreakdown[e.day].minus += e.points;
          totalMinus += e.points;
        }
        dayBreakdown[e.day].total = dayBreakdown[e.day].plus - dayBreakdown[e.day].minus;
      }
    });

    // Formula: 100 + Plus - Minus
    const totalScore = 100 + totalPlus - totalMinus;

    // Star Rating
    let rank = 'CẦN CỐ GẮNG';
    let stars = 2;
    let rankClass = 'rank-2star';

    if (totalScore >= 150) {
      rank = 'XUẤT SẮC';
      stars = 5;
      rankClass = 'rank-5star';
    } else if (totalScore >= 130) {
      rank = 'TỐT';
      stars = 4;
      rankClass = 'rank-4star';
    } else if (totalScore >= 110) {
      rank = 'CỐ GẮNG';
      stars = 3;
      rankClass = 'rank-3star';
    }

    return {
      base: 100,
      plus: totalPlus,
      minus: totalMinus,
      total: totalScore,
      stars: stars,
      rank: rank,
      rankClass: rankClass,
      days: dayBreakdown
    };
  }

  calculateGroupSummary(groupId, period = 1) {
    const students = this.getStudents(groupId);
    let totalScore = 0;
    let totalPlus = 0;
    let totalMinus = 0;
    let fiveStarCount = 0;

    students.forEach(s => {
      const res = this.calculateStudentScore(s.id, period);
      totalScore += res.total;
      totalPlus += res.plus;
      totalMinus += res.minus;
      if (res.stars === 5) fiveStarCount++;
    });

    const avgScore = students.length > 0 ? (totalScore / students.length).toFixed(1) : 0;

    return {
      groupId: groupId,
      name: `Tổ ${groupId}`,
      memberCount: students.length,
      totalScore: totalScore,
      avgScore: parseFloat(avgScore),
      totalPlus: totalPlus,
      totalMinus: totalMinus,
      fiveStarCount: fiveStarCount
    };
  }

  getLeaderboard(period = 1) {
    const studentRanks = this.data.students.map(s => {
      const score = this.calculateStudentScore(s.id, period);
      return {
        student: s,
        ...score
      };
    });

    // Sort descending by total score
    studentRanks.sort((a, b) => b.total - a.total);

    const groupRanks = [1, 2, 3, 4].map(g => this.calculateGroupSummary(g, period));
    groupRanks.sort((a, b) => b.avgScore - a.avgScore);

    return {
      period: period,
      students: studentRanks,
      groups: groupRanks
    };
  }

  // --- FEEDBACK & REMARKS ---
  getFeedback(period = 1) {
    const key = typeof period === 'string' ? period : `week-${period}`;
    return (this.data.feedback && this.data.feedback[key]) || { best: '', improve: '', teacher: '' };
  }

  saveFeedback(period, feedbackData) {
    const key = typeof period === 'string' ? period : `week-${period}`;
    if (!this.data.feedback) this.data.feedback = {};
    this.data.feedback[key] = {
      ...(this.data.feedback[key] || {}),
      ...feedbackData
    };
    this.saveToStorage();
  }

  // --- NOTIFICATIONS & MESSAGES ---
  getNotifications(userId = null, role = null, group = null) {
    let list = (this.data.notifications || []).map(n => {
      if (!n || typeof n !== 'object') return n;
      if (!Array.isArray(n.readBy)) n.readBy = [];
      return n;
    });
    if (!userId) return list;

    // Filter relevant notifications for this user
    return list.filter(n => {
      if (!n) return false;
      if (n.target === 'all') return true;
      if (n.target === userId) return true;
      if (group && n.target === `group${group}`) return true;
      if (role === 'teacher') return true;
      return false;
    }).sort((a, b) => new Date(b.time) - new Date(a.time));
  }

  addNotification(notif) {
    const newNotif = {
      id: 'notif-' + Date.now(),
      sender: notif.sender,
      senderRole: notif.senderRole || 'teacher',
      target: notif.target || 'all',
      type: notif.type || 'broadcast',
      title: notif.title,
      content: notif.content,
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      readBy: []
    };
    if (!Array.isArray(this.data.notifications)) this.data.notifications = [];
    this.data.notifications.unshift(newNotif);
    this.saveToStorage();
    this.broadcastEvent('NOTIF_ADD', newNotif);
    return newNotif;
  }

  markNotificationAsRead(notifId, userId) {
    const notif = (this.data.notifications || []).find(n => n && n.id === notifId);
    if (notif) {
      if (!Array.isArray(notif.readBy)) notif.readBy = [];
      if (!notif.readBy.includes(userId)) {
        notif.readBy.push(userId);
        this.saveToStorageLocal();
      }
    }
  }

  getUnreadCount(userId, role, group) {
    const list = this.getNotifications(userId, role, group);
    return list.filter(n => {
      const readList = (n && Array.isArray(n.readBy)) ? n.readBy : [];
      return !readList.includes(userId);
    }).length;
  }
}

// Global Singleton Instance
window.classData = new ClassDataManager();
window.dataManager = window.classData;

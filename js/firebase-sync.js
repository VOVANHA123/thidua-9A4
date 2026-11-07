/**
 * FIREBASE REALTIME DATABASE SYNC ENGINE - THI ĐUA LỚP 9A4
 * Cung cấp khả năng lưu trữ đám mây vĩnh viễn và đồng bộ thời gian thực (Real-time sub-second) qua WebSocket & REST API
 * Thầy Võ Văn Hà - Trường THCS Tây Phú
 */

(function(window) {
  'use strict';

  // Khóa lưu cấu hình Firebase trong localStorage của trình duyệt
  const FB_CONFIG_STORAGE_KEY = 'THIDUA_9A4_FIREBASE_CONFIG_V2';

  // Cấu hình Firebase mặc định của Thầy Hà
  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyDRB7dtXtACb-Fj4WSjUyhfkuoU5RJxDlI",
    authDomain: "thidua-lop-9a4-79dca.firebaseapp.com",
    databaseURL: "https://thidua-lop-9a4-79dca-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "thidua-lop-9a4-79dca",
    storageBucket: "thidua-lop-9a4-79dca.firebasestorage.app",
    messagingSenderId: "23913470129",
    appId: "1:23913470129:web:8183b8ddc217a8e568ea90"
  };

  class FirebaseSyncEngine {
    constructor() {
      this.app = null;
      this.database = null;
      this.dbRef = null;
      this.isConnected = false;
      this.isInitialized = false;
      this.isRemoteUpdate = false;
      this.lastSyncTimestamp = 0;
      this.config = this.loadConfig();

      // Khởi tạo ngay và lắng nghe sự kiện trang tải
      this.init();
      if (typeof window !== 'undefined') {
        window.addEventListener('DOMContentLoaded', () => this.init());
        window.addEventListener('load', () => this.init());
      }
    }

    getCleanDatabaseUrl() {
      let url = (this.config && this.config.databaseURL) || DEFAULT_FIREBASE_CONFIG.databaseURL;
      url = url.trim().replace(/\/+$/, ''); // Bỏ dấu / ở cuối
      url = url.replace(/\.json$/, ''); // Bỏ .json nếu người dùng nhập nhầm
      return url;
    }

    loadConfig() {
      try {
        const saved = localStorage.getItem(FB_CONFIG_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.databaseURL && parsed.databaseURL.startsWith('http')) {
            return { ...DEFAULT_FIREBASE_CONFIG, ...parsed };
          }
        }
      } catch (e) {
        console.warn('Lỗi đọc cấu hình Firebase:', e);
      }
      return { ...DEFAULT_FIREBASE_CONFIG };
    }

    saveConfig(newConfig) {
      this.config = { ...this.config, ...newConfig };
      try {
        localStorage.setItem(FB_CONFIG_STORAGE_KEY, JSON.stringify(this.config));
      } catch (e) {}
      // Khởi động lại kết nối với config mới
      this.init(true);
    }

    init(reconnect = false) {
      const cleanUrl = this.getCleanDatabaseUrl();
      this.config.databaseURL = cleanUrl;

      if (!cleanUrl.startsWith('http')) {
        this.updateStatusBadge('pending', 'Chưa Cấu Hình URL');
        return;
      }

      if (!window.firebase) {
        // Nếu SDK chưa load xong, thử lại sau 300ms
        setTimeout(() => this.init(reconnect), 300);
        return;
      }

      try {
        if (reconnect && window.firebase.apps && window.firebase.apps.length > 0) {
          try {
            window.firebase.app().delete();
          } catch(e) {}
        }

        if (!window.firebase.apps || window.firebase.apps.length === 0) {
          this.app = window.firebase.initializeApp(this.config);
        } else {
          this.app = window.firebase.app();
        }

        this.database = window.firebase.database();
        this.dbRef = this.database.ref('classes/lop9a4');

        // Tự động kết nối Firebase Auth (Anonymous) để đảm bảo có token hợp lệ theo Security Rules
        if (window.firebase.auth) {
          const authObj = window.firebase.auth();
          if (!authObj.currentUser) {
            authObj.signInAnonymously().catch(e => console.warn('Auto anonymous auth notice:', e));
          }
        }

        // Lắng nghe trạng thái kết nối mạng của Firebase (.info/connected)
        const connectedRef = this.database.ref('.info/connected');
        connectedRef.on('value', (snap) => {
          if (snap.val() === true) {
            this.isConnected = true;
            this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢');
            console.log('⚡ Firebase Realtime Database: Đã kết nối thời gian thực qua WebSocket!');
          } else {
            this.isConnected = false;
            this.updateStatusBadge('connected', 'Firebase Sẵn Sàng ⚡');
          }
        });

        // LẮNG NGHE ĐỒNG BỘ THỜI GIAN THỰC (REAL-TIME LISTENER)
        this.dbRef.on('value', (snapshot) => {
          const cloudData = snapshot.val();
          if (cloudData && typeof cloudData === 'object') {
            this.handleIncomingCloudData(cloudData);
          }
        }, (error) => {
          console.warn('Firebase Realtime Database Listen Error:', error);
          this.updateStatusBadge('connected', 'Firebase Sẵn Sàng ⚡');
        });

        this.isInitialized = true;
        this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢');
      } catch (err) {
        console.warn('Khởi tạo Firebase SDK fallback sang REST API:', err);
        this.isInitialized = true; // Vẫn cho phép hoạt động qua REST API
        this.updateStatusBadge('connected', 'Firebase Sẵn Sàng (REST) ⚡');
      }
    }

    /**
     * Nhận dữ liệu tức thời từ đám mây khi có ai đó (Thầy giáo hoặc học sinh khác) thay đổi điểm
     */
    handleIncomingCloudData(cloudData) {
      const dm = window.classData || window.dataManager;
      if (!dm) return;

      const currentClient = (dm && dm.CLIENT_SESSION_ID) || 'unknown';
      if (cloudData.lastSenderClientId && cloudData.lastSenderClientId === currentClient) {
        return; // Bỏ qua nếu chính máy này vừa gửi
      }

      console.log('📥 Nhận cập nhật thời gian thực từ Firebase:', cloudData);

      this.isRemoteUpdate = true;
      try {
        const serverUpdated = (cloudData.settings && cloudData.settings.updatedAt) || 0;
        const localUpdated = (dm.data && dm.data.settings && dm.data.settings.updatedAt) || 0;

        // Đánh dấu thiết bị đã đồng bộ thành công với Cloud
        dm.hasSuccessfullySyncedWithCloud = true;
        dm.isCloudConnected = true;

        // Chỉ cập nhật cài đặt/danh sách học sinh từ cloud khi server thực sự mới hơn hoặc máy mới tinh
        if (serverUpdated > localUpdated || dm.isFreshDevice) {
          if (typeof dm.mergeWithDefaults === 'function') {
            dm.data = dm.mergeWithDefaults(cloudData);
          } else {
            dm.data = cloudData;
          }
        } else {
          // Bảo đảm tiêu chí từ cloud không bị mất nếu server có tiêu chí mới
          if (Array.isArray(cloudData.criteria) && cloudData.criteria.length > 0) {
            if (cloudData.criteria.length > (dm.data.criteria || []).length || dm.isFreshDevice) {
              dm.data.criteria = cloudData.criteria;
            }
          }
          // Chỉ hợp nhất sự kiện điểm số (giữ nguyên cấu hình của máy này)
          const cloudEvents = Array.isArray(cloudData.events) ? cloudData.events : (cloudData.events && typeof cloudData.events === 'object' ? Object.values(cloudData.events) : null);
          if (cloudEvents) {
            const eventMap = new Map();
            const deletedSet = new Set([
              ...(dm.data.deletedEventIds || []),
              ...(cloudData.deletedEventIds || [])
            ]);
            dm.data.deletedEventIds = Array.from(deletedSet);
            cloudEvents.forEach(e => {
              if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
            });
            (dm.data.events || []).forEach(e => {
              if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
            });
            dm.data.events = Array.from(eventMap.values());
          }
        }

        dm.isFreshDevice = false;
        dm.hasUserModification = false;
        if (typeof dm.saveToStorageLocal === 'function') {
          dm.saveToStorageLocal();
        }

        // Làm mới giao diện tức thì (cả màn hình đăng nhập và bảng điểm)
        if (window.appController) {
          if (typeof window.appController.populatePortalStudentSelect === 'function') {
            window.appController.populatePortalStudentSelect();
          }
          if (typeof window.appController.populatePortalTeacherSelect === 'function') {
            window.appController.populatePortalTeacherSelect();
          }
          if (typeof window.appController.refreshAll === 'function') {
            window.appController.refreshAll();
          }
        }

        // Phát âm thanh chuông nhẹ nhàng
        if (window.chibiSound && typeof window.chibiSound.playDing === 'function') {
          window.chibiSound.playDing();
        }

        this.updateStatusBadge('connected', 'Vừa Cập Nhật ⚡');
        setTimeout(() => {
          this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢');
        }, 3000);
      } finally {
        this.isRemoteUpdate = false;
      }
    }

    /**
     * Đồng bộ trực tiếp tiêu chí thi đua qua WebSocket SDK siêu nhanh
     */
    syncCriteriaDirectly(criteria, settings) {
      if (!this.dbRef) return;
      try {
        const now = (settings && settings.updatedAt) || Date.now();
        this.dbRef.child('criteria').set(criteria);
        this.dbRef.child('settings/updatedAt').set(now);
        this.dbRef.child('lastSenderClientId').set((window.classData && window.classData.CLIENT_SESSION_ID) || 'admin_web');
        this.dbRef.child('lastPushedAt').set(now);
        this.updateStatusBadge('connected', 'Đã Lưu Tiêu Chí ⚡');
        setTimeout(() => {
          this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢');
        }, 2000);
      } catch (e) {
        console.warn('Firebase SDK criteria direct sync error:', e);
      }
    }

    /**
     * Đẩy dữ liệu mới lên Firebase Realtime Database
     * CƠ CHẾ BẢO VỆ CHỐNG GHI ĐÈ ĐA TẦNG (BULLETPROOF OVERWRITE SHIELD):
     * 1. SCORE_ADD: Ghi độc lập vào events/{id}, không bao giờ ghi đè danh sách
     * 2. SCORE_DELETE: Xóa độc lập events/{eventId}, không bao giờ ghi đè danh sách
     * 3. SETTINGS_UPDATE: Chỉ cập nhật settings/criteria/students, không chạm vào events
     * 4. FULL SET / SYNC: Luôn kiểm tra Cloud, hợp nhất (Union) và cấm sụt giảm số lượng sự kiện
     */
    async pushToCloud(data, extraMeta = {}) {
      if (this.isRemoteUpdate) {
        return { success: true, skipped: true };
      }

      const dm = window.classData || window.dataManager;
      const cleanUrl = this.getCleanDatabaseUrl();
      const currentClientId = (dm && dm.CLIENT_SESSION_ID) || 'admin_web';
      const now = Date.now();

      // --- TẦNG 1: THÊM 1 ĐIỂM (SCORE_ADD) - GHI ĐỘC LẬP TỪNG PHẦN TỬ ---
      if (extraMeta && extraMeta.recentAction === 'SCORE_ADD' && extraMeta.recentData && extraMeta.recentData.id) {
        const item = extraMeta.recentData;
        let written = false;

        if (this.dbRef) {
          try {
            await this.dbRef.child('events').child(item.id).set(item);
            await this.dbRef.child('lastSenderClientId').set(currentClientId);
            await this.dbRef.child('lastPushedAt').set(now);
            written = true;
          } catch (e) {
            console.warn('Per-event SDK write failed, falling back to REST:', e);
          }
        }

        if (!written) {
          try {
            const r1 = await fetch(`${cleanUrl}/classes/lop9a4/events/${item.id}.json`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item)
            });
            if (r1.ok) {
              fetch(`${cleanUrl}/classes/lop9a4/lastPushedAt.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(now)
              }).catch(() => {});
              written = true;
            }
          } catch(re) {
            console.error('REST per-event score add failed:', re);
          }
        }

        if (written) {
          this.lastSyncTimestamp = now;
          this.updateStatusBadge('connected', 'Đã Lưu Điểm ⚡');
          setTimeout(() => this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢'), 2000);
          return { success: true, method: 'isolated_event_add' };
        }
      }

      // --- TẦNG 2: XÓA 1 ĐIỂM (SCORE_DELETE) - XÓA ĐỘC LẬP TỪNG PHẦN TỬ ---
      if (extraMeta && extraMeta.recentAction === 'SCORE_DELETE' && extraMeta.recentData && extraMeta.recentData.eventId) {
        const delId = extraMeta.recentData.eventId;
        let deleted = false;

        if (this.dbRef) {
          try {
            await this.dbRef.child('events').child(delId).remove();
            await this.dbRef.child('lastSenderClientId').set(currentClientId);
            await this.dbRef.child('lastPushedAt').set(now);
            deleted = true;
          } catch(e) {
            console.warn('Per-event SDK delete failed, falling back to REST:', e);
          }
        }

        if (!deleted) {
          try {
            const r2 = await fetch(`${cleanUrl}/classes/lop9a4/events/${delId}.json`, {
              method: 'DELETE'
            });
            if (r2.ok) {
              fetch(`${cleanUrl}/classes/lop9a4/lastPushedAt.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(now)
              }).catch(() => {});
              deleted = true;
            }
          } catch(re) {
            console.error('REST per-event score delete failed:', re);
          }
        }

        if (deleted) {
          this.lastSyncTimestamp = now;
          this.updateStatusBadge('connected', 'Đã Xóa Điểm ⚡');
          setTimeout(() => this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢'), 2000);
          return { success: true, method: 'isolated_event_delete' };
        }
      }

      // --- TẦNG 3: CẬP NHẬT CÀI ĐẶT / TIÊU CHÍ / HỌC SINH (SETTINGS_UPDATE) ---
      // Chỉ lưu nhánh cấu hình, TUYỆT ĐỐI KHÔNG BAO GIỜ chạm hay ghi đè vào events!
      const isSettingsUpdateOnly = Boolean(extraMeta && (extraMeta.actionType === 'SETTINGS_UPDATE' || extraMeta.allowSettingsOverwrite));
      if (isSettingsUpdateOnly) {
        let payloadSettings = (data && data.settings) ? { ...data.settings, updatedAt: now } : { updatedAt: now };
        let payloadStudents = (data && data.students) ? [...data.students] : [];
        let payloadCriteria = (data && data.criteria) ? [...data.criteria] : [];
        let payloadTeachers = (data && data.teachers) ? [...data.teachers] : [];

        if (dm && dm.data && dm.data.settings) dm.data.settings.updatedAt = now;

        if (this.dbRef) {
          try {
            await this.dbRef.child('settings').set(payloadSettings);
            if (payloadCriteria.length > 0) await this.dbRef.child('criteria').set(payloadCriteria);
            if (payloadStudents.length > 0) await this.dbRef.child('students').set(payloadStudents);
            if (payloadTeachers.length > 0) await this.dbRef.child('teachers').set(payloadTeachers);
            await this.dbRef.child('lastPushedAt').set(now);
          } catch(e) {}
        }

        try {
          fetch(`${cleanUrl}/classes/lop9a4/settings.json`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadSettings)
          }).catch(() => {});
          if (payloadCriteria.length > 0) {
            fetch(`${cleanUrl}/classes/lop9a4/criteria.json`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payloadCriteria)
            }).catch(() => {});
          }
          if (payloadStudents.length > 0) {
            fetch(`${cleanUrl}/classes/lop9a4/students.json`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payloadStudents)
            }).catch(() => {});
          }
        } catch(e) {}

        this.lastSyncTimestamp = now;
        this.updateStatusBadge('connected', 'Đã Lưu Cài Đặt ⚡');
        setTimeout(() => this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢'), 2000);
        return { success: true, method: 'settings_only' };
      }

      // --- TẦNG 4: ĐỒNG BỘ ĐẦY ĐỦ (FULL SET) VỚI KHÓA AN TOÀN CHỐNG GHI ĐÈ ---
      let remoteEventsList = [];
      let canReadRemote = false;

      if (this.dbRef) {
        try {
          const snap = await this.dbRef.child('events').once('value');
          const val = snap.val();
          if (val) {
            remoteEventsList = Array.isArray(val) ? val : Object.values(val);
            canReadRemote = true;
          }
        } catch(e) {}
      }

      if (!canReadRemote) {
        try {
          const res = await fetch(`${cleanUrl}/classes/lop9a4/events.json?t=${Date.now()}`);
          if (res.ok) {
            const val = await res.json();
            if (val) {
              remoteEventsList = Array.isArray(val) ? val : Object.values(val);
              canReadRemote = true;
            }
          }
        } catch(e) {}
      }

      // Chặn thiết bị mới tinh hoặc chưa đồng bộ được cloud mà đòi ghi đè full set
      if (!canReadRemote && (!extraMeta || !extraMeta.allowEmptyReset)) {
        console.warn('[FIREBASE SHIELD] Cannot verify remote events from cloud. Overwrite blocked to protect data.');
        return { success: false, blocked: true, reason: 'CLOUD_VERIFICATION_FAILED' };
      }

      const eventMap = new Map();
      const deletedSet = new Set([...(dm && dm.data && dm.data.deletedEventIds || [])]);

      // Luôn gộp sự kiện remote trước để bảo toàn 100%
      remoteEventsList.forEach(e => {
        if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
      });
      // Gộp thêm sự kiện local của máy này
      (Array.isArray(data.events) ? data.events : []).forEach(e => {
        if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
      });

      const mergedEvents = Array.from(eventMap.values());

      // KHÓA AN TOÀN TUYỆT ĐỐI: Không bao giờ cho phép ghi đè nếu số sự kiện sau khi gộp ít hơn trên Cloud
      if (canReadRemote && remoteEventsList.length > 0 && mergedEvents.length < remoteEventsList.length && (!extraMeta || !extraMeta.allowEmptyReset)) {
        console.warn(`[FIREBASE SHIELD] Overwrite blocked: remote has ${remoteEventsList.length} events, merged only has ${mergedEvents.length}`);
        return { success: false, blocked: true, reason: 'PREVENTED_EVENT_COUNT_DROP' };
      }

      let payloadSettings = (data && data.settings) ? { ...data.settings, updatedAt: now } : { updatedAt: now };
      let payloadStudents = (data && data.students) ? [...data.students] : [];
      let payloadCriteria = (data && data.criteria) ? [...data.criteria] : [];
      let payloadTeachers = (data && data.teachers) ? [...data.teachers] : [];

      const payload = {
        ...data,
        settings: payloadSettings,
        students: payloadStudents,
        criteria: payloadCriteria,
        teachers: payloadTeachers,
        events: mergedEvents,
        lastSenderClientId: currentClientId,
        lastPushedAt: now,
        ...extraMeta
      };

      if (this.dbRef) {
        try {
          await this.dbRef.set(payload);
          this.lastSyncTimestamp = now;
          this.updateStatusBadge('connected', 'Đã Lưu Đám Mây ⚡');
          setTimeout(() => this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢'), 2000);
          return { success: true, method: 'sdk_full' };
        } catch (sdkErr) {
          console.warn('Firebase SDK full set failed, falling back to direct REST:', sdkErr);
        }
      }

      try {
        const restUrl = `${cleanUrl}/classes/lop9a4.json`;
        const res = await fetch(restUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          this.lastSyncTimestamp = now;
          this.updateStatusBadge('connected', 'Đã Lưu Đám Mây ⚡');
          setTimeout(() => this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢'), 2000);
          return { success: true, method: 'rest_full' };
        } else {
          throw new Error('Mã phản hồi: ' + res.status);
        }
      } catch (restErr) {
        console.error('Lỗi khi đẩy lên Firebase REST:', restErr);
        this.updateStatusBadge('error', 'Lỗi Lưu Đám Mây 🔴');
        return { success: false, error: restErr.message };
      }
    }

    /**
     * Kéo dữ liệu mới nhất từ Firebase về máy
     */
    async pullFromCloud() {
      const cleanUrl = this.getCleanDatabaseUrl();

      // Cách 1: Thử qua SDK
      if (this.dbRef) {
        try {
          const snap = await this.dbRef.once('value');
          const val = snap.val();
          if (val && typeof val === 'object') {
            this.handleIncomingCloudData(val);
            return { success: true, data: val };
          }
        } catch (e) {
          console.warn('SDK pull failed, falling back to REST:', e);
        }
      }

      // Cách 2: Kéo trực tiếp qua REST API
      try {
        const restUrl = `${cleanUrl}/classes/lop9a4.json?t=${Date.now()}`;
        const res = await fetch(restUrl, { cache: 'no-cache' });
        if (res.ok) {
          const val = await res.json();
          if (val && typeof val === 'object') {
            this.handleIncomingCloudData(val);
            return { success: true, data: val };
          }
        }
        return { success: false, message: 'Chưa có dữ liệu trên Firebase' };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }

    /**
     * Cập nhật nhãn trạng thái hiển thị trên giao diện người dùng
     */
    updateStatusBadge(status, text) {
      const badge = document.getElementById('cloud-sync-status-badge');
      if (!badge) return;

      badge.className = 'cloud-status-badge';
      if (status === 'connected') {
        badge.classList.add('status-connected');
        badge.innerHTML = `🟢 ${text}`;
        badge.style.background = '#dcfce7';
        badge.style.color = '#15803d';
        badge.style.border = '1px solid #86efac';
      } else if (status === 'pending') {
        badge.classList.add('status-pending');
        badge.innerHTML = `⚙️ ${text}`;
        badge.style.background = '#fef3c7';
        badge.style.color = '#b45309';
        badge.style.border = '1px solid #fcd34d';
      } else if (status === 'disconnected') {
        badge.classList.add('status-disconnected');
        badge.innerHTML = `🟡 ${text}`;
        badge.style.background = '#fef9c3';
        badge.style.color = '#a16207';
        badge.style.border = '1px solid #fde047';
      } else {
        badge.classList.add('status-error');
        badge.innerHTML = `🔴 ${text}`;
        badge.style.background = '#fee2e2';
        badge.style.color = '#b91c1c';
        badge.style.border = '1px solid #fca5a5';
      }
    }
  }

  // Khởi tạo Singleton
  window.firebaseSyncEngine = new FirebaseSyncEngine();

})(window);

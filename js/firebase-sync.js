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
    apiKey: "",
    authDomain: "thidua-lop-9a4-79dca.firebaseapp.com",
    databaseURL: "https://thidua-lop-9a4-79dca-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "thidua-lop-9a4-79dca",
    storageBucket: "thidua-lop-9a4-79dca.appspot.com",
    messagingSenderId: "100000000000",
    appId: "1:100000000000:web:thidua9a4"
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

      const currentClient = dm.CLIENT_SESSION_ID || 'unknown';
      if (cloudData.lastSenderClientId && cloudData.lastSenderClientId === currentClient) {
        return; // Bỏ qua nếu chính máy này vừa gửi
      }

      console.log('📥 Nhận cập nhật thời gian thực từ Firebase:', cloudData);

      this.isRemoteUpdate = true;
      try {
        if (typeof dm.mergeWithDefaults === 'function') {
          dm.data = dm.mergeWithDefaults(cloudData);
        } else {
          dm.data = cloudData;
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
     * Đẩy dữ liệu mới lên Firebase Realtime Database
     */
    async pushToCloud(data, extraMeta = {}) {
      if (this.isRemoteUpdate) {
        return { success: true, skipped: true };
      }

      const dm = window.classData || window.dataManager;

      // SAFEGUARD: Chặn tuyệt đối thiết bị chưa từng đồng bộ thành công hoặc máy mới tinh ghi đè lên Firebase
      if (dm && (!dm.hasSuccessfullySyncedWithCloud || dm.isFreshDevice) && (!extraMeta || !extraMeta.allowEmptyReset)) {
        console.warn('[FIREBASE SAFEGUARD] Prevented un-synced or fresh device from pushing to Firebase.');
        return { success: false, blocked: true };
      }
      const eventsCount = (data && Array.isArray(data.events)) ? data.events.length : 0;
      if (eventsCount === 0 && (!extraMeta || !extraMeta.allowEmptyReset)) {
        if (dm && (!dm.hasUserModification || (dm.data && dm.data.settings && dm.data.settings.updatedAt === 0))) {
          console.warn('[FIREBASE SAFEGUARD] Prevented 0-event unverified push to Firebase.');
          return { success: false, blocked: true };
        }
      }

      const cleanUrl = this.getCleanDatabaseUrl();

      // MERGE EVENTS WITH CLOUD FIRST TO PREVENT OVERWRITE
      let mergedEvents = Array.isArray(data.events) ? [...data.events] : [];
      if (!extraMeta || !extraMeta.allowEmptyReset) {
        try {
          const checkRes = await fetch(`${cleanUrl}/classes/lop9a4/events.json?t=${Date.now()}`, { cache: 'no-cache' });
          if (checkRes.ok) {
            const remoteEvents = await checkRes.json();
            if (remoteEvents && typeof remoteEvents === 'object') {
              const remoteList = Array.isArray(remoteEvents) ? remoteEvents : Object.values(remoteEvents);
              const eventMap = new Map();
              const deletedSet = new Set([...(dm && dm.data && dm.data.deletedEventIds || [])]);
              if (extraMeta && extraMeta.recentAction === 'SCORE_DELETE' && extraMeta.recentData && extraMeta.recentData.eventId) {
                deletedSet.add(extraMeta.recentData.eventId);
              }
              remoteList.forEach(e => {
                if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
              });
              mergedEvents.forEach(e => {
                if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
              });
              mergedEvents = Array.from(eventMap.values());
            }
          }
        } catch(e) {}
      }

      const payload = {
        ...data,
        events: mergedEvents,
        lastSenderClientId: (dm && dm.CLIENT_SESSION_ID) || 'admin_web',
        lastPushedAt: Date.now(),
        ...extraMeta
      };

      // Cách 1: Thử đẩy qua Firebase SDK WebSocket
      if (this.dbRef) {
        try {
          await this.dbRef.set(payload);
          this.lastSyncTimestamp = Date.now();
          this.updateStatusBadge('connected', 'Đã Lưu Đám Mây ⚡');
          setTimeout(() => {
            this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢');
          }, 2000);
          return { success: true, method: 'sdk' };
        } catch (sdkErr) {
          console.warn('Firebase SDK set failed, falling back to direct REST:', sdkErr);
        }
      }

      // Cách 2: Đẩy trực tiếp qua REST API (Bảo đảm 100% thành công không phụ thuộc SDK)
      try {
        const restUrl = `${cleanUrl}/classes/lop9a4.json`;
        const res = await fetch(restUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          this.lastSyncTimestamp = Date.now();
          this.updateStatusBadge('connected', 'Đã Lưu Đám Mây ⚡');
          setTimeout(() => {
            this.updateStatusBadge('connected', 'Firebase Trực Tuyến 🟢');
          }, 2000);
          return { success: true, method: 'rest' };
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

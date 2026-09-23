/**
 * NOTIFICATIONS & MOBILE WEB PUSH SYSTEM
 * Handles In-App Notification Center, PWA Web Push, Vibration API, and Toast popups
 */

class NotificationSystem {
  constructor() {
    this.unreadCount = 0;
    this.permissionState = 'default';
    this.checkPermission();
  }

  checkPermission() {
    if ('Notification' in window) {
      this.permissionState = Notification.permission;
    }
  }

  async requestMobilePushPermission() {
    if (!('Notification' in window)) {
      this.showToast('Thông báo', 'Trình duyệt này không hỗ trợ Web Push Notification.', 'warning');
      return false;
    }

    try {
      const perm = await Notification.requestPermission();
      this.permissionState = perm;
      if (perm === 'granted') {
        this.showToast('Thành công! ✨', 'Đã kích hoạt nhận thông báo thi đua trên màn hình điện thoại!', 'success');
        if (window.chibiSound) window.chibiSound.playPlus();
        
        // Hide push prompt banner if exists
        const banner = document.getElementById('push-permission-banner');
        if (banner) banner.style.display = 'none';

        // Send a test welcome push notification
        this.sendSystemPush('Thi Đua 9A4 - Đã kết nối', 'Bạn sẽ nhận được tin nhắn tức thì từ Thầy Võ Văn Hà & Ban cán sự lớp!', './assets/images/icon.svg');
        return true;
      } else {
        this.showToast('Nhắc nhở', 'Quyền thông báo bị từ chối. Bạn có thể bật lại trong cài đặt trình duyệt.', 'warning');
        return false;
      }
    } catch (e) {
      console.warn('Error requesting notification permission:', e);
      return false;
    }
  }

  // Trigger Native Push Notification on Mobile / Desktop Lock Screen
  async sendSystemPush(title, body, icon = 'assets/images/icon.svg') {
    if (this.permissionState !== 'granted') return;

    // Vibrate device if supported (Mobile phones)
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([200, 100, 200]);
      } catch (e) {}
    }

    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          reg.showNotification(title, {
            body: body,
            icon: icon,
            badge: icon,
            vibrate: [200, 100, 200],
            data: { url: './' }
          });
          return;
        }
      } catch (e) {
        console.warn('Service worker showNotification error:', e);
      }
    }

    // Fallback standard web Notification
    try {
      new Notification(title, { body: body, icon: icon });
    } catch (e) {}
  }

  // Show cute in-app toast notification with sound
  showToast(title, message, type = 'info') {
    let container = document.getElementById('chibi-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'chibi-toast-container';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10001;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
        max-width: 360px;
        width: calc(100% - 40px);
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      background: white;
      border-radius: 16px;
      padding: 12px 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.18);
      border-left: 6px solid ${type === 'success' ? '#10b981' : (type === 'warning' ? '#f59e0b' : (type === 'error' ? '#ef4444' : '#3b82f6'))};
      display: flex;
      align-items: flex-start;
      gap: 12px;
      pointer-events: auto;
      transform: translateX(120%);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      border-top: 1px solid #f1f5f9;
      border-right: 1px solid #f1f5f9;
      border-bottom: 1px solid #f1f5f9;
    `;

    const iconMap = {
      success: '🎉',
      warning: '⚠️',
      error: '❌',
      info: '🔔'
    };

    toast.innerHTML = `
      <div style="font-size: 1.5rem; line-height: 1;">${iconMap[type] || '🔔'}</div>
      <div style="flex: 1;">
        <div style="font-weight: 800; font-size: 0.92rem; color: #1e293b; font-family: 'Quicksand', sans-serif;">${title}</div>
        <div style="font-size: 0.84rem; color: #475569; margin-top: 2px;">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    // Play ding-dong chime
    if (window.chibiSound) {
      if (type === 'success') window.chibiSound.playPlus();
      else window.chibiSound.playBell();
    }

    // Slide in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 50);

    // Auto dismiss after 4.5s
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // Send a new class announcement / message
  sendMessage(messageData) {
    if (!window.classData) return;

    const notif = window.classData.addNotification(messageData);

    // Play Bell
    if (window.chibiSound) window.chibiSound.playBell();

    // Trigger Mobile Web Push Notification
    this.sendSystemPush(`📢 ${notif.sender}: ${notif.title}`, notif.content);

    // Show in-app Toast
    this.showToast(notif.title, notif.content, notif.type === 'praise' ? 'success' : 'info');

    // Update UI badge
    this.updateBadge();

    return notif;
  }

  updateBadge() {
    const user = window.authManager ? window.authManager.getCurrentUser() : null;
    if (!user || !window.classData) return;

    const count = window.classData.getUnreadCount(user.id, user.role, user.group);
    this.unreadCount = count;

    const badgeEl = document.getElementById('notif-badge-count');
    if (badgeEl) {
      if (count > 0) {
        badgeEl.textContent = count > 99 ? '99+' : count;
        badgeEl.style.display = 'inline-flex';
      } else {
        badgeEl.style.display = 'none';
      }
    }
  }
}

// Global Notification Instance
window.chibiNotifications = new NotificationSystem();

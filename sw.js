const CACHE_NAME = 'chibi-thidua-9a4-v71';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/print.css',
  './js/firebase-sync.js',
  './js/data.js',
  './js/auth.js',
  './js/sound.js',
  './js/confetti.js',
  './js/notifications.js',
  './js/bienban-hocsinh.js',
  './js/app.js',
  './assets/images/logo.webp',
  './assets/images/logo.png',
  './assets/images/icon-512.png',
  './assets/images/icon.svg',
  './assets/images/chibi_banner.jpg',
  './assets/images/chibi_duty.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Cache addAll non-critical error:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Clearing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stale-While-Revalidate Strategy for lightning-fast loads with automatic background updates
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip Firebase RTDB and external APIs
  if (url.origin !== self.location.origin && !url.hostname.includes('gstatic.com') && !url.hostname.includes('googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch((err) => {
        // Network failed (offline)
        return cachedResponse;
      });

      // If cached, return immediately for instant render, while network updates in background
      return cachedResponse || fetchPromise;
    }).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});

// Push Notification listener for Mobile App
self.addEventListener('push', (event) => {
  let data = { title: 'Thông Báo Thi Đua 9A4', body: 'Bạn có tin nhắn hoặc cập nhật điểm số mới!', icon: 'assets/images/icon.svg' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || 'assets/images/icon.svg',
    badge: 'assets/images/icon.svg',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || './'
    },
    actions: [
      { action: 'open', title: 'Xem ngay ✨' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow(event.notification.data.url || './');
    })
  );
});

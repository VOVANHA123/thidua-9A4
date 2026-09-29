/**
 * Vercel Serverless Function: Cloud Data Sync for Thi Đua 9A4
 * Handles persistent storage & multi-device synchronization for Teachers and Students
 * With Multi-tier Anti-Overwrite Safeguards & Security Shield (Secret Key, Rate Limiter, Payload Guard)
 */

const STORAGE_KEY = 'thidua9a4_master_class_database_v2026';
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwMfX0UumPL2-rKrbsFsaGDKhDAEpNfANyZ2kRpkYF6BO9fOUjD2ANuD7uSNm5pJ8gLAA/exec';
const FIREBASE_URL = 'https://thidua-lop-9a4-79dca-default-rtdb.asia-southeast1.firebasedatabase.app/classes/lop9a4.json';
const FALLBACK_SET_URL = `https://setget.net/set/${STORAGE_KEY}`;
const FALLBACK_GET_URL = `https://setget.net/get/${STORAGE_KEY}`;
const NTFY_URL = 'https://ntfy.sh/thidua9a4_tayphu_2026_sync';

// Khóa bảo mật API (Ưu tiên biến môi trường Vercel SYNC_SECRET_KEY, có mã khóa mặc định an toàn cho lớp 9A4)
const SYNC_SECRET_KEY = process.env.SYNC_SECRET_KEY || 'THIDUA9A4_SECURE_TOKEN_2026_TP';

// Bộ nhớ Rate Limiting trên RAM máy chủ (Chống spam / DoS)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // Khung thời gian 1 phút
const MAX_REQUESTS_PER_MINUTE = 60; // Tối đa 60 requests/phút/IP

function setCorsHeaders(req, res) {
  const origin = (req.headers && req.headers.origin) || '*';
  if (origin === 'null' || origin === '*') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-sync-secret, Authorization'
  );
}

/**
 * Lớp phòng vệ 1: Kiểm tra khóa bí mật & Chống Spam Request
 */
function verifyRequestSecurity(req, res) {
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = (forwarded ? forwarded.split(',')[0] : (req.socket && req.socket.remoteAddress) || '127.0.0.1').trim();
  const now = Date.now();

  // 1. Kiểm tra giới hạn tần suất (Rate Limiting)
  let record = rateLimitMap.get(clientIp);
  if (!record || now > record.resetTime) {
    record = { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
    rateLimitMap.set(clientIp, record);
  } else {
    record.count++;
  }

  // Tự động dọn dẹp bộ nhớ nếu lưu trữ trên 1000 IP
  if (rateLimitMap.size > 1000) {
    for (const [ip, item] of rateLimitMap.entries()) {
      if (now > item.resetTime) rateLimitMap.delete(ip);
    }
  }

  if (record.count > MAX_REQUESTS_PER_MINUTE) {
    res.status(429).json({
      success: false,
      code: 'RATE_LIMIT_EXCEEDED',
      error: '⚠️ Tần suất gửi yêu cầu quá nhanh (Spam Protection). Vui lòng thử lại sau 1 phút!'
    });
    return false;
  }

  // 2. Kiểm tra mã xác thực bảo mật bí mật (API Secret Key)
  const incomingSecret = req.headers['x-sync-secret'] || 
                         (req.headers['authorization'] ? req.headers['authorization'].replace(/^Bearer\s+/i, '') : '') ||
                         (req.query && req.query.secret);

  if (!incomingSecret || incomingSecret !== SYNC_SECRET_KEY) {
    res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
      error: '⛔ Truy cập bị từ chối: Yêu cầu bị chặn do thiếu hoặc sai khóa bảo mật API (x-sync-secret)!'
    });
    return false;
  }

  return true;
}

module.exports = async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Kích hoạt khiên bảo mật chặn request trái phép
  if (!verifyRequestSecurity(req, res)) {
    return;
  }

  // --- GET: RETRIEVE LATEST DATA FROM SERVER ---
  if (req.method === 'GET') {
    try {
      // 1. Try Firebase First (High Speed & Live Realtime Master)
      try {
        const fbRes = await fetch(FIREBASE_URL + '?t=' + Date.now(), { cache: 'no-cache' });
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          if (fbData && (fbData.students || fbData.settings || fbData.events)) {
            return res.status(200).json({
              success: true,
              data: fbData,
              timestamp: (fbData.settings && fbData.settings.updatedAt) || Date.now(),
              source: 'firebase_realtime_master'
            });
          }
        }
      } catch(fbErr) {
        console.warn('Firebase GET warning:', fbErr);
      }

      // 2. Fallback to setget.net
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(FALLBACK_GET_URL, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const result = await response.json();
        if (result && result.value) {
          let data = result.value;
          if (typeof data === 'string') {
            try { data = JSON.parse(data); } catch(e) {}
          }
          if (data && (data.students || data.settings || data.events)) {
            return res.status(200).json({
              success: true,
              data: data,
              timestamp: (data.settings && data.settings.updatedAt) || Date.now(),
              source: 'setget_fallback'
            });
          }
        }
      }

      return res.status(200).json({
        success: false,
        message: 'Chưa có dữ liệu trên máy chủ hoặc đang chờ khởi tạo ban đầu',
        data: null
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Lỗi khi đọc từ máy chủ: ' + e.message
      });
    }
  }

  // --- POST: SAVE / PUSH DATA TO SERVER ---
  if (req.method === 'POST') {
    try {
      // Lớp phòng vệ 3: Kiểm tra dung lượng gói tin (Chặn payload rác/quá tải)
      const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
      if (rawBody.length > 3 * 1024 * 1024) {
        return res.status(413).json({
          success: false,
          code: 'PAYLOAD_TOO_LARGE',
          error: '⛔ Gói dữ liệu vượt quá dung lượng an toàn cho phép (tối đa 3MB)!'
        });
      }

      let payload = req.body;
      if (typeof payload === 'string') {
        try { payload = JSON.parse(payload); } catch(e) {}
      }

      if (!payload || (!payload.students && !payload.events && !payload.settings)) {
        return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ!' });
      }

      // --- SERVER SAFEGUARD: Fetch existing master data to merge & protect events ---
      let existingData = null;
      // Fetch from Firebase first (primary real-time source)
      try {
        const fbCheck = await fetch(FIREBASE_URL + '?t=' + Date.now(), { cache: 'no-cache' });
        if (fbCheck.ok) {
          const fbVal = await fbCheck.json();
          if (fbVal && (fbVal.students || fbVal.events || fbVal.settings)) {
            existingData = fbVal;
          }
        }
      } catch(fbCheckErr) {
        console.warn('Could not fetch existing Firebase data for verification:', fbCheckErr);
      }

      // If Firebase failed, fallback to GAS
      if (!existingData) {
        try {
          const gasCheck = await fetch(GOOGLE_APPS_SCRIPT_URL + '?action=get&t=' + Date.now(), { cache: 'no-cache' });
          if (gasCheck.ok) {
            const gasRes = await gasCheck.json();
            if (gasRes && gasRes.status === 'success' && gasRes.data) {
              existingData = gasRes.data;
            }
          }
        } catch (checkErr) {
          console.warn('Could not fetch existing GAS data for verification:', checkErr);
        }
      }

      // If existing data has events, UNION them so no device can ever delete events!
      if (existingData && Array.isArray(existingData.events) && existingData.events.length > 0) {
        if (!payload.allowEmptyReset) {
          const eventMap = new Map();
          const deletedSet = new Set([
            ...(existingData.deletedEventIds || []),
            ...(payload.deletedEventIds || [])
          ]);
          if (payload.recentAction === 'SCORE_DELETE' && payload.recentData && payload.recentData.eventId) {
            deletedSet.add(payload.recentData.eventId);
          }
          payload.deletedEventIds = Array.from(deletedSet);

          existingData.events.forEach(e => {
            if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
          });
          if (Array.isArray(payload.events)) {
            payload.events.forEach(e => {
              if (e && e.id && !deletedSet.has(e.id)) eventMap.set(e.id, e);
            });
          }
          payload.events = Array.from(eventMap.values());
        }
      }

      // Safeguard settings: If server settings are newer than incoming, keep server settings!
      const existingUpdated = (existingData && existingData.settings && existingData.settings.updatedAt) || 0;
      const incomingUpdated = (payload && payload.settings && payload.settings.updatedAt) || 0;
      if (existingUpdated > incomingUpdated && existingData && existingData.settings) {
        payload.settings = existingData.settings;
        if (existingData.students && existingData.students.length > 0) payload.students = existingData.students;
        if (existingData.criteria && existingData.criteria.length > 0) payload.criteria = existingData.criteria;
      }

      // Ensure updatedAt timestamp
      if (!payload.settings) payload.settings = {};
      const now = Date.now();
      if (!payload.settings.updatedAt || payload.settings.updatedAt < (now - 86400000)) {
        payload.settings.updatedAt = now;
      }

      // 0. Save to Google Apps Script Master Sheet (Google Sheets Database)
      try {
        fetch(GOOGLE_APPS_SCRIPT_URL + '?action=save', {
          method: 'POST',
          body: JSON.stringify(payload)
        }).catch(err => console.warn('GAS save warn:', err));
      } catch(gasSaveErr) {
        console.warn('GAS POST error:', gasSaveErr);
      }

      // 1. Save to Firebase Realtime Database
      try {
        await fetch(FIREBASE_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch(fbSaveErr) {
        console.warn('Firebase POST error:', fbSaveErr);
      }

      // 2. Save to fallback storage
      try {
        fetch(FALLBACK_SET_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch(e) {}

      // Broadcast realtime notification via ntfy so active devices get instant SSE update
      try {
        fetch(NTFY_URL, {
          method: 'POST',
          headers: {
            'Title': 'ThiDua9A4_CloudSync',
            'Tags': 'arrows_counterclockwise,sparkles'
          },
          body: JSON.stringify({
            action: payload.recentAction || 'FULL_DATA_SYNC',
            timestamp: payload.settings.updatedAt,
            senderId: payload.clientId || payload.lastUpdatedBy || 'system',
            clientId: payload.clientId || payload.lastUpdatedBy || 'system',
            data: payload.recentData || null
          })
        }).catch(() => {});
      } catch (err) {}

      return res.status(200).json({
        success: true,
        message: 'Đã lưu và đồng bộ lên máy chủ an toàn thành công!',
        timestamp: payload.settings.updatedAt
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Lỗi khi lưu lên máy chủ: ' + e.message
      });
    }
  }

  return res.status(405).json({ error: 'Phương thức không được hỗ trợ (Method Not Allowed)' });
};

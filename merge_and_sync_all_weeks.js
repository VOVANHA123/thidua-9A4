/**
 * Merge reconstructed events for Weeks 5, 6, 7, 8 into Firebase RTDB & local backup
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { generateAllWeeksEvents, CRITERIA } = require('./reconstruct_weeks_5_to_8');

const BACKUP_PATH = path.join(__dirname, 'backup_phuc_hoi_2026-11-08.json');
const FIREBASE_BASE = 'https://thidua-lop-9a4-79dca-default-rtdb.asia-southeast1.firebasedatabase.app/classes/lop9a4';

async function putFirebase(path, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${FIREBASE_BASE}/${path}.json`);
    const payload = JSON.stringify(data);
    const req = https.request(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log('1. Đang đọc dữ liệu sao lưu hiện tại...');
  const currentBackup = JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8'));

  // Giữ lại các tuần 1, 2, 3, 4 từ backup gốc
  const w1to4 = currentBackup.events.filter(e => e.week >= 1 && e.week <= 4);
  console.log(`- Sự kiện Tuần 1-4: ${w1to4.length}`);

  // Sinh các sự kiện Tuần 5, 6, 7, 8 từ Biên bản sinh hoạt
  console.log('2. Đang sinh dữ liệu Tuần 5, 6, 7, 8 từ các Biên bản PDF...');
  const w5to8 = generateAllWeeksEvents();
  console.log(`- Sự kiện Tuần 5-8 đã tái tạo: ${w5to8.length}`);

  const countsByWeek = {};
  w5to8.forEach(e => { countsByWeek[e.week] = (countsByWeek[e.week] || 0) + 1; });
  console.log('- Phân bố theo tuần:', countsByWeek);

  // Hợp nhất dữ liệu
  const mergedEvents = [...w1to4, ...w5to8];
  console.log(`3. Tổng số sự kiện sau khi hợp nhất: ${mergedEvents.length}`);

  // Cập nhật criteria đầy đủ 23 tiêu chí
  const fullCriteria = Object.values(CRITERIA);

  // Cập nhật file backup local
  currentBackup.events = mergedEvents;
  currentBackup.criteria = fullCriteria;
  currentBackup.lastUpdated = new Date().toISOString();
  fs.writeFileSync(BACKUP_PATH, JSON.stringify(currentBackup, null, 2), 'utf8');
  console.log(`4. Đã lưu dữ liệu vào ${BACKUP_PATH}`);

  // Đồng bộ lên Firebase RTDB
  console.log('5. Đang cập nhật lên Firebase Realtime Database...');
  await putFirebase('criteria', fullCriteria);
  console.log('- Đã cập nhật 23 tiêu chí lên Firebase.');

  await putFirebase('events', mergedEvents);
  console.log(`- Đã cập nhật ${mergedEvents.length} sự kiện lên Firebase.`);

  // Cập nhật cả thidua9a4_master để đồng bộ toàn diện
  try {
    const masterUrl = 'https://thidua-lop-9a4-79dca-default-rtdb.asia-southeast1.firebasedatabase.app/thidua9a4_master';
    await new Promise((resolve, reject) => {
      const payload = JSON.stringify(fullCriteria);
      const req = https.request(`${masterUrl}/criteria.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
      }, res => resolve());
      req.on('error', resolve);
      req.write(payload);
      req.end();
    });
  } catch (err) {
    console.warn('Lưu master không bắt buộc:', err.message);
  }

  console.log('\n✅ KHÔI PHỤC VÀ ĐỒNG BỘ THÀNH CÔNG!');
}

main().catch(err => {
  console.error('Lỗi khi thực hiện:', err);
  process.exit(1);
});

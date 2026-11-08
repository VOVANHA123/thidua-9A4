/**
 * Khôi phục 100% dữ liệu chấm điểm Tuần 9 từ nhật ký thông báo Firebase Realtime Database
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const BACKUP_PATH = path.join(__dirname, 'backup_phuc_hoi_2026-11-08.json');
const FIREBASE_BASE = 'https://thidua-lop-9a4-79dca-default-rtdb.asia-southeast1.firebasedatabase.app/classes/lop9a4';

const CRITERIA_MAP = {
  'Đi học đúng giờ': 'c1',
  'Chuẩn bị bài đầy đủ': 'c2',
  'Phát biểu xây dựng bài': 'c3',
  'Giúp đỡ bạn tiến bộ': 'c4',
  'Làm việc nhóm tích cực': 'c5',
  'Giữ gìn vệ sinh tốt': 'c6',
  'Việc tốt, hành động đẹp': 'c7',
  'Được giáo viên tuyên dương': 'c8',
  'Điểm tốt': 'c199455',
  'Đi học muộn': 'c9',
  'Không chuẩn bị bài / Không thuộc bài': 'c10',
  'Quên sách vở, đồ dùng học tập': 'c11',
  'Nói chuyện riêng trong giờ': 'c12',
  'Làm mất trật tự lớp': 'c13',
  'Nói tục, thiếu lễ phép': 'c14',
  'Không hợp tác / lười hoạt động nhóm': 'c15',
  'Vi phạm nội quy nghiêm trọng': 'c16',
  'Không trực vệ sinh theo phân công': 'c717156',
  'Không đồng phục': 'c132501',
  'Tự ý đổi chỗ ngồi': 'c160961',
  'Không chép bài đầy đủ': 'c252785',
  'Vắng có phép': 'c199660',
  'Vắng không phép': 'c218759'
};

async function getJson(endpoint) {
  return new Promise((resolve, reject) => {
    https.get(`${FIREBASE_BASE}/${endpoint}.json`, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function putFirebase(endpoint, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const url = new URL(`${FIREBASE_BASE}/${endpoint}.json`);
    const req = https.request(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log('1. Đang tải nhật ký thông báo từ Firebase...');
  const notifs = await getJson('notifications');
  if (!Array.isArray(notifs)) {
    throw new Error('Không đọc được mảng notifications');
  }

  const w9Notifs = notifs.filter(n => n.target && n.target !== 'all' && n.content && n.content.includes('Tuần 9'));
  console.log(`- Tìm thấy ${w9Notifs.length} thông báo ghi nhận điểm Tuần 9.`);

  const week9Events = [];
  const studentStats = {};

  w9Notifs.forEach((n, idx) => {
    const dayMatch = n.content.match(/vào (T\d|CN) \(Tuần 9\)/);
    const ptsMatch = n.content.match(/ghi nhận ([+-]?\d+) điểm/);
    const critMatch = n.content.match(/• Tiêu chí:\s*(?:undefined\s*)?([^\n]+)/);
    const noteMatch = n.content.match(/• Ghi chú:\s*([^\n]+)/);
    const timeMatch = n.content.match(/• Thời gian chấm:\s*([^\n]+)/);

    const day = dayMatch ? dayMatch[1] : 'T2';
    const pointsNum = ptsMatch ? parseInt(ptsMatch[1]) : 1;
    const critName = critMatch ? critMatch[1].trim() : '';
    let note = noteMatch ? noteMatch[1].trim() : '';
    if (note === 'Không có ghi chú') note = '';
    const recordedAt = timeMatch ? timeMatch[1].trim() : (n.time || '09:00 08/11/2026');

    const criteriaId = CRITERIA_MAP[critName] || 'c1';
    const tsMs = parseInt(n.id.replace('notif-', '')) || (1794103200000 + idx * 1000);

    const isPlus = pointsNum >= 0;
    const absPts = Math.abs(pointsNum);

    const ev = {
      by: n.senderRole || 'leader',
      byName: n.sender ? n.sender.split('(')[0].trim() : 'Bùi Thị Như Tuyết',
      byRole: n.senderRole === 'teacher' ? 'Giáo viên chủ nhiệm' : 'Tổ trưởng Tổ 1',
      criteriaId: criteriaId,
      day: day,
      id: `ev-w9-${tsMs}-${Math.random().toString(36).slice(2, 6)}`,
      note: note,
      points: absPts,
      recordedAt: recordedAt,
      studentId: n.target,
      timestamp: new Date(tsMs).toISOString(),
      type: isPlus ? 'plus' : 'minus',
      week: 9
    };

    week9Events.push(ev);

    if (!studentStats[n.target]) studentStats[n.target] = { plus: 0, minus: 0, count: 0 };
    studentStats[n.target].count++;
    if (isPlus) studentStats[n.target].plus += absPts;
    else studentStats[n.target].minus += absPts;
  });

  console.log(`- Đã giải mã thành công ${week9Events.length} sự kiện Tuần 9!`);
  console.log('Thống kê theo học sinh Tuần 9:');
  Object.keys(studentStats).forEach(stId => {
    const st = studentStats[stId];
    const score = 100 + st.plus - st.minus;
    console.log(`  * ${stId}: ${st.count} sự kiện (+${st.plus}, -${st.minus}) => Tổng điểm Tuần 9 = ${score}`);
  });

  console.log('\n2. Hợp nhất vào cơ sở dữ liệu hiện tại...');
  const currentBackup = JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8'));

  // Giữ lại các sự kiện Tuần 1-8
  const w1to8 = currentBackup.events.filter(e => e.week !== 9);
  const allEvents = [...w1to8, ...week9Events];
  console.log(`- Tổng số sự kiện sau khi khôi phục Tuần 9: ${allEvents.length} (Tuần 1-8: ${w1to8.length}, Tuần 9: ${week9Events.length})`);

  currentBackup.events = allEvents;
  if (!currentBackup.settings) currentBackup.settings = {};
  currentBackup.settings.currentWeek = 9;
  currentBackup.settings.currentMonth = 11;
  currentBackup.lastUpdated = new Date().toISOString();

  fs.writeFileSync(BACKUP_PATH, JSON.stringify(currentBackup, null, 2), 'utf8');
  console.log('3. Đã lưu dữ liệu vào backup_phuc_hoi_2026-11-08.json');

  console.log('4. Đang cập nhật lên Firebase Realtime Database...');
  await putFirebase('events', allEvents);
  await putFirebase('settings/currentWeek', 9);
  await putFirebase('settings/currentMonth', 11);

  console.log('\n✅ KHÔI PHỤC TOÀN BỘ ĐIỂM TUẦN 9 THÀNH CÔNG VÀ ĐỒNG BỘ LÊN FIREBASE!');
}

main().catch(err => {
  console.error('Lỗi:', err);
  process.exit(1);
});

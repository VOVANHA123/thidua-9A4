/**
 * Script tái tạo và khôi phục sự kiện chấm điểm Tuần 5, 6, 7, 8 từ các Biên bản sinh hoạt chủ nhiệm PDF
 */
const fs = require('fs');

const CRITERIA = {
  c1: { id: 'c1', name: 'Đi học đúng giờ', type: 'plus', points: 1 },
  c2: { id: 'c2', name: 'Chuẩn bị bài đầy đủ', type: 'plus', points: 1 },
  c3: { id: 'c3', name: 'Phát biểu xây dựng bài', type: 'plus', points: 1 },
  c4: { id: 'c4', name: 'Giúp đỡ bạn tiến bộ', type: 'plus', points: 2 },
  c5: { id: 'c5', name: 'Làm việc nhóm tích cực', type: 'plus', points: 1 },
  c6: { id: 'c6', name: 'Giữ gìn vệ sinh tốt', type: 'plus', points: 1 },
  c7: { id: 'c7', name: 'Việc tốt, hành động đẹp', type: 'plus', points: 2 },
  c8: { id: 'c8', name: 'Được giáo viên tuyên dương', type: 'plus', points: 2 },
  c199455: { id: 'c199455', name: 'Điểm tốt', type: 'plus', points: 3 },
  c9: { id: 'c9', name: 'Đi học muộn', type: 'minus', points: 2 },
  c10: { id: 'c10', name: 'Không chuẩn bị bài / Không thuộc bài', type: 'minus', points: 2 },
  c11: { id: 'c11', name: 'Quên sách vở, đồ dùng học tập', type: 'minus', points: 1 },
  c12: { id: 'c12', name: 'Nói chuyện riêng trong giờ', type: 'minus', points: 1 },
  c13: { id: 'c13', name: 'Làm mất trật tự lớp', type: 'minus', points: 2 },
  c14: { id: 'c14', name: 'Nói tục, thiếu lễ phép', type: 'minus', points: 10 },
  c15: { id: 'c15', name: 'Không hợp tác / lười hoạt động nhóm', type: 'minus', points: 2 },
  c16: { id: 'c16', name: 'Vi phạm nội quy nghiêm trọng', type: 'minus', points: 20 },
  c717156: { id: 'c717156', name: 'Không trực vệ sinh theo phân công', type: 'minus', points: 3 },
  c132501: { id: 'c132501', name: 'Không đồng phục', type: 'minus', points: 2 },
  c160961: { id: 'c160961', name: 'Tự ý đổi chỗ ngồi', type: 'minus', points: 1 },
  c252785: { id: 'c252785', name: 'Không chép bài đầy đủ', type: 'minus', points: 1 },
  c199660: { id: 'c199660', name: 'Vắng có phép', type: 'minus', points: 1 },
  c218759: { id: 'c218759', name: 'Vắng không phép', type: 'minus', points: 2 }
};

const WEEK_DATES = {
  5: { from: '2026-10-05', to: '2026-10-10', baseTs: '2026-10-09T03:35:00.000Z', rec: '10:35 09/10/2026' },
  6: { from: '2026-10-12', to: '2026-10-17', baseTs: '2026-10-15T03:35:00.000Z', rec: '10:35 15/10/2026' },
  7: { from: '2026-10-19', to: '2026-10-24', baseTs: '2026-10-22T03:35:00.000Z', rec: '10:35 22/10/2026' },
  8: { from: '2026-10-26', to: '2026-10-31', baseTs: '2026-10-29T03:35:00.000Z', rec: '10:35 29/10/2026' }
};

const LEADERS = {
  1: { by: 'leader', byName: 'Bùi Thị Như Tuyết', byRole: 'Tổ trưởng Tổ 1' },
  2: { by: 'leader', byName: 'Lê Thị Mỹ Quyên', byRole: 'Tổ trưởng Tổ 2' },
  3: { by: 'leader', byName: 'Lê Thị Ngọc Quỳnh', byRole: 'Tổ trưởng Tổ 3' },
  4: { by: 'leader', byName: 'Lê Thu Hà', byRole: 'Tổ trưởng Tổ 4' }
};

function createEventsForItems(studentId, group, week, items) {
  const evs = [];
  const meta = WEEK_DATES[week];
  const leader = LEADERS[group] || LEADERS[1];
  let counter = 1;

  items.forEach(item => {
    const crit = CRITERIA[item.critId];
    if (!crit) throw new Error(`Unknown criteria: ${item.critId}`);

    const count = item.count || 1;
    for (let i = 0; i < count; i++) {
      const day = (item.days && item.days[i]) ? item.days[i] : (item.day || 'T2');
      const note = (item.notes && item.notes[i]) !== undefined ? item.notes[i] : (item.note || '');
      const id = `ev-w${week}-${studentId}-${crit.id}-${counter++}-${Math.random().toString(36).slice(2, 6)}`;
      
      evs.push({
        by: leader.by,
        byName: leader.byName,
        byRole: leader.byRole,
        criteriaId: crit.id,
        day: day,
        id: id,
        note: note,
        points: crit.points,
        recordedAt: meta.rec,
        studentId: studentId,
        timestamp: meta.baseTs,
        type: crit.type,
        week: week
      });
    }
  });

  return evs;
}

// Data tuần 5
const dataWeek5 = [
  // Tổ 1
  {
    studentId: 'hs02', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 5, days: ['T2', 'T3', 'T2', 'T3', 'T6'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', ''] },
      { critId: 'c14', count: 1, day: 'T4', note: 'Nói tục (đ* m*)' },
      { critId: 'c9', count: 2, days: ['T4', 'T3'], notes: ['Đi học muộn', 'Đi học muộn'] },
      { critId: 'c1', count: 9 },
      { critId: 'c2', count: 6 },
      { critId: 'c5', count: 4 },
      { critId: 'c199455', count: 4 },
      { critId: 'c3', count: 6 },
      { critId: 'c6', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs03', group: 1, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 12 },
      { critId: 'c2', count: 10 },
      { critId: 'c5', count: 3 },
      { critId: 'c199455', count: 4 },
      { critId: 'c3', count: 5 },
      { critId: 'c6', count: 2 }
    ]
  },
  {
    studentId: 'hs06', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c9', count: 3, days: ['T2', 'T2', 'T2'], notes: ['Đi học muộn chiều thứ 2', 'Đi học muộn', 'Đi học muộn'] },
      { critId: 'c12', count: 5, days: ['T2', 'T2', 'T2', 'T2', 'T4'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', '4mtt của phó trật tự'] },
      { critId: 'c160961', count: 1, day: 'T3', note: 'Bị lớp trưởng nhắc ghi vô' },
      { critId: 'c1', count: 10 },
      { critId: 'c2', count: 9 },
      { critId: 'c5', count: 3 },
      { critId: 'c199455', count: 3 },
      { critId: 'c3', count: 4 },
      { critId: 'c6', count: 1, day: 'T3', note: 'Công trình măng non' }
    ]
  },
  {
    studentId: 'hs19', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 4, days: ['T2', 'T2', 'T3', 'T4'], notes: ['', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c9', count: 1, day: 'T4', note: 'Đi học muộn' },
      { critId: 'c1', count: 7 },
      { critId: 'c2', count: 6 },
      { critId: 'c5', count: 3 },
      { critId: 'c199455', count: 3 }
    ]
  },
  {
    studentId: 'hs24', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c9', count: 3, days: ['T2', 'T2', 'T5'], notes: ['Đi học muộn', 'Đi học muộn', 'Đi học muộn'] },
      { critId: 'c12', count: 6, days: ['T2', 'T2', 'T2', 'T3', 'T4', 'T2'], notes: ['', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', '1mtt của phó trật tự', 'Nói chuyện riêng'] },
      { critId: 'c11', count: 1, day: 'T3', note: 'môn Văn' },
      { critId: 'c1', count: 8 },
      { critId: 'c2', count: 3 },
      { critId: 'c5', count: 3 },
      { critId: 'c199455', count: 4 },
      { critId: 'c6', count: 1, day: 'T3', note: 'Công trình măng non' }
    ]
  },
  {
    studentId: 'hs27', group: 1, expectedRank: 'Tốt', items: [
      { critId: 'c11', count: 4, days: ['T2', 'T2', 'T2', 'T5'], notes: ['sách mĩ thật', 'sách mĩ thật', 'quên môn sinh, quên vở cn', 'môn GDCD'] },
      { critId: 'c12', count: 6, days: ['T3', 'T4', 'T3', 'T3', 'T2', 'T2'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c13', count: 2, days: ['T3', 'T2'] },
      { critId: 'c1', count: 10 },
      { critId: 'c3', count: 7 },
      { critId: 'c2', count: 7 },
      { critId: 'c5', count: 3 },
      { critId: 'c199455', count: 5 },
      { critId: 'c6', count: 1, day: 'T3', note: 'Công trình măng non' }
    ]
  },
  {
    studentId: 'hs28', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c9', count: 4, days: ['T2', 'T2', 'T3', 'T2'], notes: ['Đi học muộn chiều thứ 2', 'Đi học muộn', 'Đi học muộn', 'Đi học muộn'] },
      { critId: 'c12', count: 4, days: ['T3', 'T3', 'T5', 'T5'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c13', count: 3, days: ['T3', 'T3', 'T5'] },
      { critId: 'c10', count: 1, day: 'T5', note: 'Môn công nghệ' },
      { critId: 'c1', count: 7 },
      { critId: 'c2', count: 5 },
      { critId: 'c5', count: 3 },
      { critId: 'c199455', count: 4 },
      { critId: 'c6', count: 2 }
    ]
  },

  // Tổ 2
  {
    studentId: 'hs01', group: 2, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 4, days: ['T2', 'T3', 'T2', 'T3'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện với bàn trên + cười giỡn với bàn dưới', 'Nói chuyện riêng'] },
      { critId: 'c13', count: 1, day: 'T4', note: 'Cầm gương rọi khắp lớp bị cô toán nhắc nhở nhiều lần + 3mtt của phó trật tự' },
      { critId: 'c1', count: 10 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 8 },
      { critId: 'c6', count: 2 },
      { critId: 'c5', count: 1, day: 'T6' },
      { critId: 'c199455', count: 1, day: 'T6', note: 'Môn lịch sử 9 điểm' }
    ]
  },
  {
    studentId: 'hs13', group: 2, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 2, days: ['T2', 'T3'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c13', count: 1, day: 'T4', note: 'Mất trật tự nhiều lần ( nói cái gì ko bt nhưng ko liên quan đến bài học VÀ ÂM LƯỢNG QUÁ LỚN)' },
      { critId: 'c1', count: 10 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 2 },
      { critId: 'c5', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs14', group: 2, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 5, days: ['T2', 'T3', 'T3', 'T4', 'T4'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c1', count: 10 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 12 },
      { critId: 'c6', count: 1, day: 'T3', note: 'Dọn vệ sinh tiếp cô Thảo' },
      { critId: 'c4', count: 2 },
      { critId: 'c5', count: 1, day: 'T6' },
      { critId: 'c199455', count: 1, day: 'T6', note: 'Môn lịch sử 9 điểm' }
    ]
  },
  {
    studentId: 'hs20', group: 2, expectedRank: 'Xuất sắc', items: [
      { critId: 'c12', count: 2, days: ['T2', 'T4'], notes: ['Nói chuyện riêng', '3mtt của phó trật tự'] },
      { critId: 'c9', count: 1, day: 'T4', note: 'Đi học muộn' },
      { critId: 'c1', count: 9 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 21 },
      { critId: 'c5', count: 5 },
      { critId: 'c6', count: 1, day: 'T3', note: 'Dọn vệ sinh tiếp cô Thảo' },
      { critId: 'c199455', count: 6 },
      { critId: 'c8', count: 2 }
    ]
  },
  {
    studentId: 'hs22', group: 2, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T2', note: 'Nói chuyện riêng' },
      { critId: 'c13', count: 1, day: 'T4', note: '1mtt của phó trật tự' },
      { critId: 'c1', count: 10 },
      { critId: 'c2', count: 4 },
      { critId: 'c6', count: 1, day: 'T3', note: 'Dọn vệ sinh tiếp cô Thảo' },
      { critId: 'c5', count: 3 }
    ]
  },
  {
    studentId: 'hs26', group: 2, expectedRank: 'Cần cố gắng', items: [
      { critId: 'c12', count: 3, days: ['T2', 'T3', 'T4'], notes: ['', 'Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c160961', count: 3, days: ['T2', 'T3', 'T4'] },
      { critId: 'c13', count: 1, day: 'T2', note: 'Môn âm nhạc bị cô Huyên nhắc' },
      { critId: 'c1', count: 8 },
      { critId: 'c5', count: 2 },
      { critId: 'c6', count: 1, day: 'T3', note: 'Dọn vệ sinh giúp cô Thảo' },
      { critId: 'c2', count: 2 },
      { critId: 'c199455', count: 1, day: 'T6', note: 'Môn lịch sử 9 điểm' }
    ]
  },

  // Tổ 3
  {
    studentId: 'hs07', group: 3, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 5, days: ['T2', 'T4', 'T3', 'T5', 'T5'], notes: ['Cô mĩ thuật nhắc', '1mtt của phó trật tự', 'Nói chuyện riêng với Lâm, Xuyên, Huỳnh', 'Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c10', count: 1, day: 'T5' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 11 },
      { critId: 'c199455', count: 3 },
      { critId: 'c6', count: 5 },
      { critId: 'c5', count: 1, day: 'T4', note: 'tích cực tìm kiếm thông tin để làm file cho nhóm(môn địa)' }
    ]
  },
  {
    studentId: 'hs08', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T2', note: 'Nói linh tinh làm ồn lớp' },
      { critId: 'c13', count: 2, days: ['T4', 'T3'] },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 6 },
      { critId: 'c199455', count: 1, day: 'T2', note: 'Môn GDCD' },
      { critId: 'c6', count: 4 }
    ]
  },
  {
    studentId: 'hs11', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c11', count: 1, day: 'T2', note: 'Quên sách GDCD' },
      { critId: 'c252785', count: 1, day: 'T6', note: 'gv nhắc nhở kh viết bài môn GDĐP' },
      { critId: 'c1', count: 6 },
      { critId: 'c199455', count: 3 }
    ]
  },
  {
    studentId: 'hs12', group: 3, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 3, days: ['T4', 'T4', 'T3'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 11 },
      { critId: 'c199455', count: 3 },
      { critId: 'c6', count: 3 },
      { critId: 'c5', count: 1, day: 'T4', note: 'tham gia nhóm làm file môn địa (tìm kiếm thông tin)' }
    ]
  },
  {
    studentId: 'hs18', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c13', count: 1, day: 'T4', note: 'Cầm máy tính gọi vô mặt bảo anh + 1mtt của phó trật tự' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c199455', count: 3 }
    ]
  },
  {
    studentId: 'hs21', group: 3, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 1, day: 'T5' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 16 },
      { critId: 'c6', count: 5 },
      { critId: 'c199455', count: 5 },
      { critId: 'c5', count: 1, day: 'T4', note: 'tìm kiếm thông tin làm file nhóm (địa lí)' }
    ]
  },
  {
    studentId: 'hs29', group: 3, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 3, days: ['T2', 'T3', 'T4'], notes: ['cô mĩ thuật nhắc', 'Nói chuyện riêng', '1mtt của phó trật tự'] },
      { critId: 'c12', count: 1, day: 'T2', note: 'Nói chuyện với kế bên' },
      { critId: 'c1', count: 7 },
      { critId: 'c2', count: 6 },
      { critId: 'c6', count: 3 },
      { critId: 'c3', count: 11 },
      { critId: 'c199455', count: 2 },
      { critId: 'c5', count: 1, day: 'T4', note: 'làm file nhóm tích cực (địa lí)' }
    ]
  },

  // Tổ 4
  {
    studentId: 'hs04', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 4, days: ['T3', 'T3', 'T2', 'T2'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c13', count: 1, day: 'T2' },
      { critId: 'c1', count: 10 },
      { critId: 'c3', count: 1, day: 'T3', note: 'Phát biểu xây dựng bài' },
      { critId: 'c2', count: 1, day: 'T3', note: 'Chuẩn bị bài đầy đủ' }
    ]
  },
  {
    studentId: 'hs05', group: 4, expectedRank: 'Xuất sắc', items: [
      { critId: 'c1', count: 10 },
      { critId: 'c199455', count: 2 },
      { critId: 'c199455', count: 1, day: 'T4', note: 'Điểm tốt môn địa, tích cực làm việc nhóm 2 (môn địa, sinh), phát biểu sinh - toán 2, đúng giờ 2, đủ bài' },
      { critId: 'c3', count: 2 },
      { critId: 'c2', count: 1, day: 'T6', note: 'Chuẩn bị bài đầy đủ' },
      { critId: 'c6', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs10', group: 4, expectedRank: 'Xuất sắc', items: [
      { critId: 'c12', count: 5, days: ['T4', 'T3', 'T2', 'T2', 'T2'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c13', count: 1, day: 'T2' },
      { critId: 'c1', count: 14 },
      { critId: 'c3', count: 1, day: 'T3', note: 'Phát biểu xây dựng bài' }
    ]
  },
  {
    studentId: 'hs15', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 3, days: ['T3', 'T4', 'T4'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c12', count: 2, days: ['T2', 'T3'], notes: ['Nói chuyện nhắc nhở nhiều Lần không nghe', 'Nói chuyện riêng'] },
      { critId: 'c160961', count: 2, days: ['T4', 'T4'] },
      { critId: 'c1', count: 11 },
      { critId: 'c2', count: 1, day: 'T3', note: 'Chuẩn bị bài đầy đủ' }
    ]
  },
  {
    studentId: 'hs16', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 2, days: ['T4', 'T3'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c1', count: 9 },
      { critId: 'c2', count: 2 },
      { critId: 'c3', count: 2 },
      { critId: 'c199455', count: 1, day: 'T4' }
    ]
  },
  {
    studentId: 'hs17', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 2, days: ['T4', 'T3'], notes: ['Nói chuyện riêng', 'Nói chuyện riêng'] },
      { critId: 'c1', count: 10 },
      { critId: 'c2', count: 1, day: 'T4', note: 'Chuẩn bị bài đầy đủ' },
      { critId: 'c3', count: 1, day: 'T4', note: 'Phát biểu xây dựng bài' },
      { critId: 'c5', count: 1, day: 'T4' }
    ]
  },
  {
    studentId: 'hs23', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 10 }
    ]
  },
  {
    studentId: 'hs25', group: 4, expectedRank: 'Xuất sắc', items: [
      { critId: 'c12', count: 1, day: 'T3', note: 'Nói chuyện riêng' },
      { critId: 'c1', count: 13 },
      { critId: 'c2', count: 1, day: 'T3', note: 'Chuẩn bị bài đầy đủ, đúng giờ 2, phát biểu KHTN 2 - Anh 1 - Văn 3.' }
    ]
  }
];

// Data tuần 6
const dataWeek6 = [
  // Tổ 1
  {
    studentId: 'hs02', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c11', count: 2, days: ['T5', 'T6'], notes: ['sách hdtn', 'quên sách nhạc'] },
      { critId: 'c1', count: 6 },
      { critId: 'c6', count: 4 },
      { critId: 'c3', count: 2 },
      { critId: 'c199455', count: 2 },
      { critId: 'c5', count: 5 },
      { critId: 'c2', count: 3 }
    ]
  },
  {
    studentId: 'hs03', group: 1, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 6 },
      { critId: 'c6', count: 7 },
      { critId: 'c2', count: 6 },
      { critId: 'c5', count: 6 },
      { critId: 'c199455', count: 2 },
      { critId: 'c3', count: 2 }
    ]
  },
  {
    studentId: 'hs06', group: 1, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 3, days: ['T3', 'T5', 'T6'] },
      { critId: 'c1', count: 6 },
      { critId: 'c6', count: 5 },
      { critId: 'c5', count: 7 },
      { critId: 'c199455', count: 2 },
      { critId: 'c3', count: 3 },
      { critId: 'c2', count: 5 }
    ]
  },
  {
    studentId: 'hs19', group: 1, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 6 },
      { critId: 'c6', count: 6 },
      { critId: 'c5', count: 5 },
      { critId: 'c199455', count: 2 },
      { critId: 'c2', count: 4 }
    ]
  },
  {
    studentId: 'hs24', group: 1, expectedRank: 'Cần cố gắng', items: [
      { critId: 'c717156', count: 2, days: ['T2', 'T6'], notes: ['ko trồng cây vào bồn hoa lớp t😥', ''] },
      { critId: 'c9', count: 2, days: ['T3', 'T4'] },
      { critId: 'c12', count: 3, days: ['T3', 'T5', 'T6'] },
      { critId: 'c1', count: 5 },
      { critId: 'c6', count: 2 },
      { critId: 'c5', count: 6 },
      { critId: 'c2', count: 2 },
      { critId: 'c3', count: 1, day: 'T6' },
      { critId: 'c199455', count: 1, day: 'T6', note: 'môn mĩ thuật' }
    ]
  },
  {
    studentId: 'hs27', group: 1, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 2, days: ['T3', 'T5'] },
      { critId: 'c6', count: 6 },
      { critId: 'c1', count: 6 },
      { critId: 'c5', count: 6 },
      { critId: 'c3', count: 4 },
      { critId: 'c199455', count: 2 },
      { critId: 'c2', count: 5 }
    ]
  },
  {
    studentId: 'hs28', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c9', count: 1, day: 'T2' },
      { critId: 'c1', count: 4 },
      { critId: 'c6', count: 2 },
      { critId: 'c5', count: 3 },
      { critId: 'c199455', count: 2 },
      { critId: 'c2', count: 3 }
    ]
  },

  // Tổ 2
  {
    studentId: 'hs01', group: 2, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 2, days: ['T4', 'T4'] },
      { critId: 'c1', count: 8 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 10 },
      { critId: 'c5', count: 4 },
      { critId: 'c6', count: 4 },
      { critId: 'c199455', count: 1, day: 'T3', note: 'Môn comgô nghệ' }
    ]
  },
  {
    studentId: 'hs13', group: 2, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 2, days: ['T3', 'T3'] },
      { critId: 'c132501', count: 1, day: 'T5', note: 'Đạp quái giây' },
      { critId: 'c1', count: 8 },
      { critId: 'c2', count: 4 },
      { critId: 'c3', count: 3 },
      { critId: 'c5', count: 4 },
      { critId: 'c6', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs14', group: 2, expectedRank: 'Xuất sắc', items: [
      { critId: 'c12', count: 3, days: ['T4', 'T4', 'T4'] },
      { critId: 'c1', count: 15 },
      { critId: 'c2', count: 8 },
      { critId: 'c3', count: 12 },
      { critId: 'c6', count: 7 },
      { critId: 'c5', count: 5 },
      { critId: 'c199455', count: 2 }
    ]
  },
  {
    studentId: 'hs20', group: 2, expectedRank: 'Xuất sắc', items: [
      { critId: 'c12', count: 1, day: 'T5' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 8 },
      { critId: 'c3', count: 16 },
      { critId: 'c5', count: 5 },
      { critId: 'c6', count: 5 },
      { critId: 'c199455', count: 3 },
      { critId: 'c4', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs22', group: 2, expectedRank: 'Cần cố gắng', items: [
      { critId: 'c1', count: 3 },
      { critId: 'c2', count: 2 },
      { critId: 'c5', count: 2 },
      { critId: 'c6', count: 1, day: 'T5' },
      { critId: 'c3', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs26', group: 2, expectedRank: 'Cần cố gắng', items: [
      { critId: 'c12', count: 2, days: ['T5', 'T6'] },
      { critId: 'c160961', count: 1, day: 'T5' },
      { critId: 'c1', count: 4 },
      { critId: 'c2', count: 2 },
      { critId: 'c5', count: 2 },
      { critId: 'c3', count: 1, day: 'T6' }
    ]
  },

  // Tổ 3
  {
    studentId: 'hs07', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T3' },
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 12 },
      { critId: 'c199455', count: 2 },
      { critId: 'c5', count: 2 }
    ]
  },
  {
    studentId: 'hs08', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 5 },
      { critId: 'c5', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs11', group: 3, expectedRank: 'Cần cố gắng', items: [
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 2 },
      { critId: 'c3', count: 1, day: 'T6' },
      { critId: 'c5', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs12', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c199660', count: 1, day: 'T4' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 4 },
      { critId: 'c3', count: 9 },
      { critId: 'c199455', count: 1, day: 'T3' },
      { critId: 'c5', count: 2 }
    ]
  },
  {
    studentId: 'hs18', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c5', count: 2 }
    ]
  },
  {
    studentId: 'hs21', group: 3, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 15 },
      { critId: 'c199455', count: 3 },
      { critId: 'c6', count: 1, day: 'T3' },
      { critId: 'c5', count: 2 }
    ]
  },
  {
    studentId: 'hs29', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T3' },
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 10 },
      { critId: 'c5', count: 2 }
    ]
  },

  // Tổ 4
  {
    studentId: 'hs04', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c717156', count: 2, days: ['T2', 'T6'] },
      { critId: 'c218759', count: 1, day: 'T4' },
      { critId: 'c9', count: 1, day: 'T3' },
      { critId: 'c1', count: 7 }
    ]
  },
  {
    studentId: 'hs05', group: 4, expectedRank: 'Xuất sắc', items: [
      { critId: 'c1', count: 8 },
      { critId: 'c3', count: 3 },
      { critId: 'c199455', count: 1, day: 'T6', note: '10d địa , 8,5 mĩ thuật' }
    ]
  },
  {
    studentId: 'hs10', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 6 }
    ]
  },
  {
    studentId: 'hs15', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c1', count: 5 },
      { critId: 'c5', count: 1, day: 'T4', note: 'Làm việc nhóm tích cực môn sinh' }
    ]
  },
  {
    studentId: 'hs16', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c13', count: 1, day: 'T3', note: 'Mất trật tự' },
      { critId: 'c1', count: 7 },
      { critId: 'c5', count: 1, day: 'T4', note: 'Làm việc nhóm tích cực môn sinh' }
    ]
  },
  {
    studentId: 'hs17', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 1, day: 'T3', note: 'Nói chuyện riêng' },
      { critId: 'c1', count: 8 }
    ]
  },
  {
    studentId: 'hs23', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 6 },
      { critId: 'c5', count: 1, day: 'T6', note: 'Làm việc nhóm tích cực môn địa' },
      { critId: 'c4', count: 1, day: 'T6', note: 'Giúp bạn Trang tiến bộ trong môn toán' }
    ]
  },
  {
    studentId: 'hs25', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 7 }
    ]
  }
];

// Data tuần 7
const dataWeek7 = [
  // Tổ 1
  {
    studentId: 'hs02', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 7, days: ['T2', 'T3', 'T3', 'T4', 'T5', 'T5', 'T5'], notes: ['Nói chuyện cười giỡn môn tiếng anh', '', 'nói chuyện trong môn Văn', 'cười vờn nói chy tế trong h học', 'nói chuyện cười vỡn', 'Mtt trong giờ học', 'Mtt trong giờ học'] },
      { critId: 'c13', count: 1, day: 'T6', note: 'Mtt trong giờ học còn nói trừ thì trừ đi' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 8 },
      { critId: 'c5', count: 2 },
      { critId: 'c6', count: 2 },
      { critId: 'c199455', count: 2 }
    ]
  },
  {
    studentId: 'hs03', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c1', count: 7 },
      { critId: 'c5', count: 3 },
      { critId: 'c2', count: 6 },
      { critId: 'c199455', count: 3 }
    ]
  },
  {
    studentId: 'hs06', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 3, days: ['T3', 'T4', 'T5'], notes: ['vờn đánh bn Tiềm', 'nói chy trong h học vờn với bn tiềm', ''] },
      { critId: 'c13', count: 1, day: 'T6', note: 'Mtt trong giờ học' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 7 },
      { critId: 'c5', count: 2 },
      { critId: 'c6', count: 2 },
      { critId: 'c3', count: 1, day: 'T4' },
      { critId: 'c199455', count: 3 }
    ]
  },
  {
    studentId: 'hs19', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 5, days: ['T3', 'T4', 'T3', 'T5', 'T5'], notes: ['', '', '', 'Mtt trong giờ học', 'Mtt trong giờ học'] },
      { critId: 'c1', count: 6 },
      { critId: 'c5', count: 2 },
      { critId: 'c2', count: 7 },
      { critId: 'c199455', count: 1, day: 'T4', note: 'môn sử 9,5' },
      { critId: 'c3', count: 2 }
    ]
  },
  {
    studentId: 'hs24', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 2, days: ['T3', 'T4'], notes: ['đáp trả bn Hân:))', ''] },
      { critId: 'c9', count: 1, day: 'T4' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 7 },
      { critId: 'c5', count: 2 },
      { critId: 'c6', count: 3 }
    ]
  },
  {
    studentId: 'hs27', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c11', count: 1, day: 'T3', note: 'Môn Mĩ thuật quên đem hộp bút' },
      { critId: 'c12', count: 3, days: ['T4', 'T5', 'T5'], notes: ['', '', 'Mtt trong giờ học'] },
      { critId: 'c1', count: 6 },
      { critId: 'c3', count: 4 },
      { critId: 'c5', count: 3 },
      { critId: 'c2', count: 6 },
      { critId: 'c199455', count: 3 }
    ]
  },
  {
    studentId: 'hs28', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 2, days: ['T6', 'T6'], notes: ['Nói truyện với bạn Hân', ''] },
      { critId: 'c11', count: 1, day: 'T6', note: 'môn Văn' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 7 },
      { critId: 'c5', count: 3 },
      { critId: 'c6', count: 3 },
      { critId: 'c199455', count: 1, day: 'T4', note: 'môn sử' }
    ]
  },

  // Tổ 2
  {
    studentId: 'hs01', group: 2, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 2, days: ['T4', 'T6'], notes: ['', 'Mtt trong giờ học'] },
      { critId: 'c13', count: 1, day: 'T5', note: 'Mtt trong giờ học' },
      { critId: 'c1', count: 7 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 7 },
      { critId: 'c5', count: 4 },
      { critId: 'c199455', count: 2 },
      { critId: 'c4', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs13', group: 2, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T2', note: 'Nói chuyện lớn tiếng môn HĐTN' },
      { critId: 'c13', count: 1, day: 'T5', note: 'Mtt trong giờ học' },
      { critId: 'c1', count: 8 },
      { critId: 'c2', count: 6 },
      { critId: 'c5', count: 4 },
      { critId: 'c199455', count: 1, day: 'T4', note: 'Môn sử' },
      { critId: 'c3', count: 3 }
    ]
  },
  {
    studentId: 'hs14', group: 2, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 3, days: ['T5', 'T4', 'T5'], notes: ['Mtt trong giờ học', '', ''] },
      { critId: 'c1', count: 9 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 8 },
      { critId: 'c5', count: 5 },
      { critId: 'c199455', count: 1, day: 'T2', note: 'Tiếng anh' },
      { critId: 'c4', count: 3 }
    ]
  },
  {
    studentId: 'hs20', group: 2, expectedRank: 'Xuất sắc', items: [
      { critId: 'c13', count: 1, day: 'T5', note: 'Mtt trong giờ học' },
      { critId: 'c12', count: 1, day: 'T6', note: 'Mtt trong giờ học' },
      { critId: 'c1', count: 8 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 9 },
      { critId: 'c5', count: 6 },
      { critId: 'c199455', count: 1, day: 'T4', note: 'Môn sinh, sử' },
      { critId: 'c8', count: 1, day: 'T3' },
      { critId: 'c4', count: 5 }
    ]
  },
  {
    studentId: 'hs22', group: 2, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 2, days: ['T5', 'T5'], notes: ['Mtt trong giờ học', ''] },
      { critId: 'c15', count: 1, day: 'T5' },
      { critId: 'c1', count: 8 },
      { critId: 'c2', count: 6 },
      { critId: 'c6', count: 1, day: 'T2' },
      { critId: 'c5', count: 2 },
      { critId: 'c3', count: 2 }
    ]
  },

  // Tổ 3
  {
    studentId: 'hs07', group: 3, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 7 },
      { critId: 'c2', count: 5 },
      { critId: 'c6', count: 5 },
      { critId: 'c3', count: 12 },
      { critId: 'c199455', count: 3 }
    ]
  },
  {
    studentId: 'hs08', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T3' },
      { critId: 'c13', count: 1, day: 'T5', note: 'Mtt trong giờ học' },
      { critId: 'c717156', count: 1, day: 'T5', note: 'giáo viên nhắc mà không đổ rác lúc ra về thứ năm' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 7 },
      { critId: 'c6', count: 4 },
      { critId: 'c199455', count: 1, day: 'T4', note: 'môn sử' },
      { critId: 'c7', count: 2 }
    ]
  },
  {
    studentId: 'hs11', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c252785', count: 1, day: 'T3', note: 'môn KHTN (sinh)' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 4 },
      { critId: 'c6', count: 1, day: 'T5' }
    ]
  },
  {
    studentId: 'hs12', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 4, days: ['T2', 'T4', 'T4', 'T5'], notes: ['nói chuyện với xuyên (môn tiếng Anh)', '', 'Giỡn trong giờ học', 'Giỡn với bạn trong giờ học'] },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 8 },
      { critId: 'c6', count: 5 },
      { critId: 'c199455', count: 2 }
    ]
  },
  {
    studentId: 'hs18', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 4, days: ['T3', 'T3', 'T3', 'T5'], notes: ['', '', '', 'Mtt trong giờ học'] },
      { critId: 'c13', count: 1, day: 'T5', note: 'Mtt trong giờ học' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 4 },
      { critId: 'c199455', count: 1, day: 'T4', note: 'môn sử' }
    ]
  },
  {
    studentId: 'hs21', group: 3, expectedRank: 'Xuất sắc', items: [
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 23 },
      { critId: 'c6', count: 6 },
      { critId: 'c199455', count: 3 }
    ]
  },
  {
    studentId: 'hs26', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 6 },
      { critId: 'c199455', count: 1, day: 'T4', note: 'môn sử' }
    ]
  },
  {
    studentId: 'hs29', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 3, days: ['T2', 'T4', 'T5'], notes: ['nói chuyện với lâm (môn tiếng Anh)', '', 'Giỡn với bạn trong giờ học'] },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 8 },
      { critId: 'c6', count: 5 },
      { critId: 'c199455', count: 1, day: 'T4', note: 'môn sử' }
    ]
  },

  // Tổ 4
  {
    studentId: 'hs04', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c1', count: 9 }
    ]
  },
  {
    studentId: 'hs05', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c6', count: 2 },
      { critId: 'c1', count: 7 },
      { critId: 'c3', count: 1, day: 'T2', note: 'Pb môn anh 3 , di học đuungs giờ' },
      { critId: 'c199455', count: 2 }
    ]
  },
  {
    studentId: 'hs10', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c6', count: 1, day: 'T2' },
      { critId: 'c3', count: 1, day: 'T2' },
      { critId: 'c1', count: 6 }
    ]
  },
  {
    studentId: 'hs15', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c3', count: 1, day: 'T2', note: 'Anh' },
      { critId: 'c1', count: 6 }
    ]
  },
  {
    studentId: 'hs16', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c13', count: 1, day: 'T3', note: 'Mất trật tự' },
      { critId: 'c13', count: 2, days: ['T5', 'T5'], notes: ['Mtt trong giờ học', ''] },
      { critId: 'c6', count: 1, day: 'T2' },
      { critId: 'c3', count: 1, day: 'T2', note: 'Anh' },
      { critId: 'c1', count: 6 }
    ]
  },
  {
    studentId: 'hs17', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c13', count: 2, days: ['T3', 'T3'], notes: ['Mất trật tự', 'Mất trật tự'] },
      { critId: 'c13', count: 1, day: 'T5', note: 'Mtt trong giờ học' },
      { critId: 'c3', count: 1, day: 'T2', note: 'Anh' },
      { critId: 'c4', count: 1, day: 'T2', note: 'giúp Nhựt' },
      { critId: 'c1', count: 7 }
    ]
  },
  {
    studentId: 'hs23', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c6', count: 1, day: 'T2', note: 'vs cầu thang' },
      { critId: 'c3', count: 1, day: 'T2' },
      { critId: 'c1', count: 9 }
    ]
  },
  {
    studentId: 'hs25', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c4', count: 1, day: 'T2' },
      { critId: 'c1', count: 9 }
    ]
  }
];

// Data tuần 8
const dataWeek8 = [
  // Tổ 1
  {
    studentId: 'hs02', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c199660', count: 2, days: ['T3', 'T6'], notes: ['bảo về gần tiết 2 lí do bệnh', 'lí do bệnh'] },
      { critId: 'c12', count: 2, days: ['T4', 'T5'], notes: ['nchy trong h', ''] },
      { critId: 'c1', count: 4 },
      { critId: 'c2', count: 4 },
      { critId: 'c6', count: 3 },
      { critId: 'c5', count: 1, day: 'T4', note: 'làm môn công nghệ rất tích cực' }
    ]
  },
  {
    studentId: 'hs03', group: 1, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 10 },
      { critId: 'c6', count: 7 },
      { critId: 'c5', count: 2 },
      { critId: 'c199455', count: 1, day: 'T3', note: 'môn mĩ thuật' },
      { critId: 'c7', count: 1, day: 'T3', note: 'bn tuyết đi chở bn bảo về bn đào rảnh tay ghi giùm bn tuyết trong môn Văn' },
      { critId: 'c3', count: 1, day: 'T6', note: 'môn anh' }
    ]
  },
  {
    studentId: 'hs06', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 4, days: ['T2', 'T3', 'T4', 'T5'], notes: ['Mtt trong giờ học', 'Nói truyện riêng trong giờ học', '', ''] },
      { critId: 'c9', count: 1, day: 'T3', note: 'đi trễ tiết 1 tiết 2 vô' },
      { critId: 'c1', count: 4 },
      { critId: 'c2', count: 10 },
      { critId: 'c6', count: 4 },
      { critId: 'c5', count: 4 },
      { critId: 'c3', count: 3 }
    ]
  },
  {
    studentId: 'hs19', group: 1, expectedRank: 'Tốt', items: [
      { critId: 'c199660', count: 1, day: 'T2' },
      { critId: 'c12', count: 2, days: ['T4', 'T5'] },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 11 },
      { critId: 'c6', count: 6 },
      { critId: 'c5', count: 2 },
      { critId: 'c199455', count: 1, day: 'T3', note: 'môn mĩ thuật' },
      { critId: 'c3', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs24', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T2' },
      { critId: 'c9', count: 1, day: 'T6' },
      { critId: 'c11', count: 1, day: 'T6', note: 'môn Anh' },
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 10 },
      { critId: 'c6', count: 4 },
      { critId: 'c5', count: 2 }
    ]
  },
  {
    studentId: 'hs27', group: 1, expectedRank: 'Tốt', items: [
      { critId: 'c218759', count: 1, day: 'T2', note: 'hậu quả khi tin đứa nào nói nay học tiết 3,4:))' },
      { critId: 'c12', count: 2, days: ['T4', 'T5'] },
      { critId: 'c11', count: 1, day: 'T6', note: 'quên vở môn Anh' },
      { critId: 'c1', count: 5 },
      { critId: 'c3', count: 3 },
      { critId: 'c6', count: 6 },
      { critId: 'c2', count: 10 },
      { critId: 'c5', count: 2 },
      { critId: 'c199455', count: 1, day: 'T3', note: 'môn mĩ thuật' },
      { critId: 'c7', count: 1, day: 'T3', note: 'xin bn bảo đi về và chở bn bảo về khi bn bị bệnh ko thể học nổi' }
    ]
  },
  {
    studentId: 'hs28', group: 1, expectedRank: 'Cố gắng', items: [
      { critId: 'c9', count: 1, day: 'T3', note: 'đi trễ hết tiết 1 tiết 2 mới vô' },
      { critId: 'c1', count: 4 },
      { critId: 'c2', count: 10 },
      { critId: 'c6', count: 4 },
      { critId: 'c5', count: 2 },
      { critId: 'c3', count: 1, day: 'T6', note: 'môn Anh' }
    ]
  },

  // Tổ 2
  {
    studentId: 'hs01', group: 2, expectedRank: 'Tốt', items: [
      { critId: 'c12', count: 2, days: ['T2', 'T3'] },
      { critId: 'c13', count: 1, day: 'T3' },
      { critId: 'c1', count: 9 },
      { critId: 'c2', count: 6 },
      { critId: 'c3', count: 16 },
      { critId: 'c5', count: 5 },
      { critId: 'c6', count: 7 },
      { critId: 'c199455', count: 2 }
    ]
  },
  {
    studentId: 'hs13', group: 2, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T3' },
      { critId: 'c1', count: 8 },
      { critId: 'c2', count: 6 },
      { critId: 'c5', count: 6 },
      { critId: 'c199455', count: 2 },
      { critId: 'c7', count: 2 }
    ]
  },
  {
    studentId: 'hs14', group: 2, expectedRank: 'Xuất sắc', items: [
      { critId: 'c12', count: 2, days: ['T2', 'T3'], notes: ['', 'Nói truyện riêng trong giờ học'] },
      { critId: 'c9', count: 1, day: 'T2' },
      { critId: 'c1', count: 9 },
      { critId: 'c2', count: 9 },
      { critId: 'c3', count: 14 },
      { critId: 'c4', count: 1, day: 'T2' },
      { critId: 'c5', count: 5 },
      { critId: 'c6', count: 9 },
      { critId: 'c199455', count: 2 },
      { critId: 'c7', count: 2 }
    ]
  },
  {
    studentId: 'hs20', group: 2, expectedRank: 'Xuất sắc', items: [
      { critId: 'c717156', count: 2, days: ['T3', 'T2'] },
      { critId: 'c13', count: 2, days: ['T3', 'T2'], notes: ['', 'Bị cô nhắc trong tiết GDĐP'] },
      { critId: 'c1', count: 7 },
      { critId: 'c2', count: 8 },
      { critId: 'c3', count: 14 },
      { critId: 'c4', count: 1, day: 'T2' },
      { critId: 'c5', count: 7 },
      { critId: 'c6', count: 9 },
      { critId: 'c199455', count: 1, day: 'T3', note: 'Âm nhạc, mỹ thuật' },
      { critId: 'c7', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs22', group: 2, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 2, days: ['T3', 'T3'] },
      { critId: 'c1', count: 4 },
      { critId: 'c2', count: 4 },
      { critId: 'c5', count: 4 },
      { critId: 'c199455', count: 1, day: 'T3', note: 'Âm nhạc' },
      { critId: 'c6', count: 1, day: 'T5' }
    ]
  },

  // Tổ 3
  {
    studentId: 'hs07', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T3' },
      { critId: 'c218759', count: 1, day: 'T6' },
      { critId: 'c1', count: 7 },
      { critId: 'c2', count: 4 },
      { critId: 'c3', count: 17 },
      { critId: 'c199455', count: 1, day: 'T4', note: 'môn mĩ thuật' },
      { critId: 'c5', count: 1, day: 'T4' }
    ]
  },
  {
    studentId: 'hs08', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 10 },
      { critId: 'c5', count: 1, day: 'T4' }
    ]
  },
  {
    studentId: 'hs11', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c5', count: 1, day: 'T4' },
      { critId: 'c3', count: 1, day: 'T6' }
    ]
  },
  {
    studentId: 'hs12', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T4' },
      { critId: 'c218759', count: 1, day: 'T6' },
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 10 },
      { critId: 'c5', count: 1, day: 'T4' },
      { critId: 'c199455', count: 1, day: 'T3', note: 'mĩ thuật' }
    ]
  },
  {
    studentId: 'hs18', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T2' },
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 3 },
      { critId: 'c5', count: 2 }
    ]
  },
  {
    studentId: 'hs21', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T4' },
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 4 },
      { critId: 'c3', count: 14 },
      { critId: 'c199455', count: 1, day: 'T3' },
      { critId: 'c5', count: 1, day: 'T3' }
    ]
  },
  {
    studentId: 'hs26', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T2' },
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 9 },
      { critId: 'c5', count: 1, day: 'T4' }
    ]
  },
  {
    studentId: 'hs29', group: 3, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T3' },
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 5 },
      { critId: 'c3', count: 9 },
      { critId: 'c199455', count: 1, day: 'T3', note: 'Mĩ thuật' },
      { critId: 'c5', count: 1, day: 'T4' }
    ]
  },

  // Tổ 4
  {
    studentId: 'hs04', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c1', count: 4 },
      { critId: 'c3', count: 1, day: 'T2', note: 'phát biểu môn Toán' },
      { critId: 'c2', count: 3 },
      { critId: 'c6', count: 2 }
    ]
  },
  {
    studentId: 'hs05', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 4 },
      { critId: 'c6', count: 2 },
      { critId: 'c3', count: 5 },
      { critId: 'c199455', count: 1, day: 'T3', note: 'Mỹ Thuật' }
    ]
  },
  {
    studentId: 'hs10', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c1', count: 6 },
      { critId: 'c2', count: 4 },
      { critId: 'c3', count: 4 },
      { critId: 'c6', count: 3 }
    ]
  },
  {
    studentId: 'hs15', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T2' },
      { critId: 'c1', count: 5 },
      { critId: 'c2', count: 3 },
      { critId: 'c6', count: 1, day: 'T4' },
      { critId: 'c3', count: 1, day: 'T4' }
    ]
  },
  {
    studentId: 'hs16', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 2, days: ['T2', 'T3'], notes: ['Mtt trong giờ học', 'Nói truyện riêng trong giờ học'] },
      { critId: 'c9', count: 1, day: 'T2' },
      { critId: 'c4', count: 1, day: 'T2', note: 'chỉ điểm sao Phát' },
      { critId: 'c2', count: 4 },
      { critId: 'c3', count: 3 },
      { critId: 'c6', count: 3 },
      { critId: 'c199455', count: 1, day: 'T3', note: 'môn Mỹ Thuật' },
      { critId: 'c1', count: 4 }
    ]
  },
  {
    studentId: 'hs17', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c12', count: 1, day: 'T2', note: 'Mtt trong giờ học' },
      { critId: 'c11', count: 1, day: 'T2' },
      { critId: 'c1', count: 5 },
      { critId: 'c4', count: 1, day: 'T2', note: 'giúp Nhựt làm bài trước khi lên bảng (bạn ấy đúng)' },
      { critId: 'c3', count: 5 },
      { critId: 'c2', count: 3 },
      { critId: 'c6', count: 3 }
    ]
  },
  {
    studentId: 'hs23', group: 4, expectedRank: 'Tốt', items: [
      { critId: 'c2', count: 4 },
      { critId: 'c1', count: 5 },
      { critId: 'c3', count: 5 },
      { critId: 'c6', count: 2 },
      { critId: 'c199455', count: 1, day: 'T3', note: 'Mỹ Thuật' }
    ]
  },
  {
    studentId: 'hs25', group: 4, expectedRank: 'Cố gắng', items: [
      { critId: 'c199660', count: 1, day: 'T2' },
      { critId: 'c3', count: 1, day: 'T2', note: 'phát biểu môn Toán 2 lần' },
      { critId: 'c1', count: 7 },
      { critId: 'c2', count: 5 }
    ]
  }
];

function generateAllWeeksEvents() {
  const all = [];

  // Tuần 5
  dataWeek5.forEach(d => {
    const evs = createEventsForItems(d.studentId, d.group, 5, d.items);
    all.push(...evs);
  });

  // Tuần 6
  dataWeek6.forEach(d => {
    const evs = createEventsForItems(d.studentId, d.group, 6, d.items);
    all.push(...evs);
  });

  // Tuần 7
  dataWeek7.forEach(d => {
    const evs = createEventsForItems(d.studentId, d.group, 7, d.items);
    all.push(...evs);
  });

  // Tuần 8
  dataWeek8.forEach(d => {
    const evs = createEventsForItems(d.studentId, d.group, 8, d.items);
    all.push(...evs);
  });

  return all;
}

// Chạy test và thẩm định điểm số & xếp loại
function validateRankings() {
  const allGenerated = generateAllWeeksEvents();
  console.log('Tổng số sự kiện sinh ra cho Tuần 5, 6, 7, 8:', allGenerated.length);

  const weeks = [
    { num: 5, data: dataWeek5 },
    { num: 6, data: dataWeek6 },
    { num: 7, data: dataWeek7 },
    { num: 8, data: dataWeek8 }
  ];

  let totalStudentsChecked = 0;
  let matches = 0;

  weeks.forEach(w => {
    console.log(`\n--- KIỂM TRA TUẦN ${w.num} ---`);
    w.data.forEach(st => {
      totalStudentsChecked++;
      const stEvents = allGenerated.filter(e => e.studentId === st.studentId && e.week === w.num);
      let totalPlus = 0;
      let totalMinus = 0;
      stEvents.forEach(e => {
        if (e.type === 'plus') totalPlus += e.points;
        else totalMinus += e.points;
      });
      const score = 100 + totalPlus - totalMinus;
      let calcRank = 'CẦN CỐ GẮNG';
      if (score >= 150) calcRank = 'Xuất sắc';
      else if (score >= 130) calcRank = 'Tốt';
      else if (score >= 110) calcRank = 'Cố gắng';

      const isMatch = calcRank.toLowerCase() === st.expectedRank.toLowerCase();
      if (isMatch) matches++;
      else {
        console.log(`⚠️ ${st.studentId} (Tổ ${st.group}): Điểm=${score} (100 + ${totalPlus} - ${totalMinus}) -> Xếp loại tính: ${calcRank} | PDF ghi: ${st.expectedRank}`);
      }
    });
  });

  console.log(`\nKết quả thẩm định xếp loại: ${matches}/${totalStudentsChecked} (${Math.round(matches/totalStudentsChecked*100)}%) khớp chính xác!`);
  return allGenerated;
}

if (require.main === module) {
  validateRankings();
}

module.exports = { generateAllWeeksEvents, CRITERIA };

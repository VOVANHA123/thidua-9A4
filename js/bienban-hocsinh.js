/**
 * HỆ THỐNG BIÊN BẢN THI ĐUA CÁ NHÂN HỌC SINH & DỰ KIẾN XẾP LOẠI RÈN LUYỆN TT22
 * Lớp 9A4 - Trường THCS Tây Phú | Năm học 2026 - 2027
 * Giáo viên chủ nhiệm: Thầy Võ Văn Hà
 *
 * CHỨC NĂNG CHÍNH:
 * 1. Xuất biên bản thi đua cá nhân theo Tuần, Tháng, Học kỳ (HK1, HK2) và Cả năm học.
 * 2. Tự động tính toán dự kiến xếp loại kết quả rèn luyện học sinh theo Thông tư 22/2021/TT-BGDĐT (Điều 8 & 9).
 * 3. Hỗ trợ in ấn khổ giấy chuẩn A4 portrait, xuất file PDF, file Microsoft Word (.doc) cá nhân và toàn bộ 29 học sinh.
 * 4. BẢO MẬT & PHÂN QUYỀN: CHỈ TÀI KHOẢN ADMIN (GVCN THẦY VÕ VĂN HÀ) MỚI ĐƯỢC XEM VÀ THỰC HIỆN TÍNH NĂNG NÀY.
 */

// ================= BẢNG TIÊU CHUẨN XẾP LOẠI RÈN LUYỆN TT22 =================
var TT22_RANKING_RULES = [
  {
    id: 'tot',
    label: 'Tốt',
    display: 'TỐT',
    color: '#15803d',
    bg: '#dcfce7',
    borderColor: '#86efac',
    icon: '🌟',
    tt22Note: 'Điểm TB thi đua ≥ 140 điểm; không có tuần nào bị xếp loại "Cần cố gắng"; tỷ lệ tuần đạt Tốt/Xuất sắc ≥ 70%; không có bất kỳ vi phạm kỷ luật nghiêm trọng nào (Theo Điều 8, 9 Thông tư 22/2021/TT-BGDĐT).'
  },
  {
    id: 'kha',
    label: 'Khá',
    display: 'KHÁ',
    color: '#0369a1',
    bg: '#e0f2fe',
    borderColor: '#7dd3fc',
    icon: '⭐',
    tt22Note: 'Điểm TB thi đua ≥ 120 điểm; tỷ lệ tuần đạt Tốt/Xuất sắc ≥ 50%; không có vi phạm kỷ luật nghiêm trọng (Theo Điều 8, 9 Thông tư 22/2021/TT-BGDĐT).'
  },
  {
    id: 'dat',
    label: 'Đạt',
    display: 'ĐẠT',
    color: '#b45309',
    bg: '#fef3c7',
    borderColor: '#fcd34d',
    icon: '👍',
    tt22Note: 'Điểm TB thi đua ≥ 100 điểm; cơ bản chấp hành tốt nội quy; các lỗi vi phạm đã được khắc phục và có ý thức rèn luyện tiến bộ (Theo Điều 8, 9 Thông tư 22/2021/TT-BGDĐT).'
  },
  {
    id: 'chua_dat',
    label: 'Chưa đạt',
    display: 'CHƯA ĐẠT',
    color: '#b91c1c',
    bg: '#fee2e2',
    borderColor: '#fca5a5',
    icon: '⚠️',
    tt22Note: 'Điểm TB thi đua dưới 100 điểm hoặc có vi phạm nội quy nghiêm trọng chưa tích cực khắc phục (Theo Điều 8, 9 Thông tư 22/2021/TT-BGDĐT).'
  }
];

/**
 * Tính toán xếp loại rèn luyện dự kiến theo Thông tư 22/2021/TT-BGDĐT
 * Dành cho các kỳ: Tháng, Học kỳ I, Học kỳ II, Cả năm học
 */
function calcTT22Ranking(studentId, periodType, periodValue) {
  var data = window.classData;
  if (!data) return null;

  var weeksInHK1 = [];
  var weeksInHK2 = [];
  for (var i = 1; i <= 18; i++) weeksInHK1.push(i);
  for (var i = 19; i <= 35; i++) weeksInHK2.push(i);

  var weeksToCheck = [];
  if (periodType === 'semester') {
    weeksToCheck = (periodValue === 'hk1' || periodValue === '1' || periodValue === 1) ? weeksInHK1 : weeksInHK2;
  } else if (periodType === 'year' || periodType === 'all-year') {
    weeksToCheck = weeksInHK1.concat(weeksInHK2);
  } else if (periodType === 'month') {
    weeksToCheck = data.getWeeksInMonth(parseInt(periodValue, 10));
  }

  if (!weeksToCheck || weeksToCheck.length === 0) {
    weeksToCheck = [data.getSettings().currentWeek || 1];
  }

  var weekResults = weeksToCheck.map(function(w) {
    var score = data.calculateStudentScore(studentId, w);
    return {
      week: w,
      total: score.total,
      plus: score.plus,
      minus: score.minus,
      rank: score.rank
    };
  });

  // Xác định các tuần có phát sinh sự kiện hoặc tính toàn bộ các tuần của kỳ
  var activeWeeks = weekResults.filter(function(w) {
    return data.getStudentEvents(studentId, w.week).length > 0;
  });
  var evalWeeks = activeWeeks.length > 0 ? activeWeeks : weekResults;

  var countTot = 0;
  var countCG = 0;
  var countKCG = 0;
  var totalScore = 0;
  var hasSevereViolation = false;

  evalWeeks.forEach(function(w) {
    totalScore += w.total;
    var rankStr = (w.rank || '').toUpperCase();
    if (rankStr.indexOf('XUẤT SẮC') !== -1 || rankStr.indexOf('XUAT SAC') !== -1 ||
        rankStr.indexOf('TỐT') !== -1 || rankStr.indexOf('TOT') !== -1) {
      countTot++;
    } else if (rankStr.indexOf('CỐ GẮNG') !== -1 || rankStr.indexOf('CO GANG') !== -1) {
      countCG++;
    } else {
      countKCG++;
    }

    var evts = data.getStudentEvents(studentId, w.week);
    evts.forEach(function(ev) {
      if (ev.type === 'minus') {
        if (ev.criteriaId === 'c14' || ev.criteriaId === 'c16' || (ev.points && ev.points >= 10)) {
          hasSevereViolation = true;
        }
      }
    });
  });

  var n = evalWeeks.length || 1;
  var avgScore = totalScore / n;
  var pctTot = countTot / n;

  var ranking;
  if (hasSevereViolation || avgScore < 100) {
    ranking = TT22_RANKING_RULES[3]; // Chưa đạt
  } else if (avgScore >= 140 && countKCG === 0 && pctTot >= 0.70) {
    ranking = TT22_RANKING_RULES[0]; // Tốt
  } else if (avgScore >= 120 && pctTot >= 0.50) {
    ranking = TT22_RANKING_RULES[1]; // Khá
  } else if (avgScore >= 100) {
    ranking = TT22_RANKING_RULES[2]; // Đạt
  } else {
    ranking = TT22_RANKING_RULES[3]; // Chưa đạt
  }

  return {
    ranking: ranking,
    avgScore: Math.round(avgScore * 10) / 10,
    totalEvalWeeks: n,
    weekStats: {
      countTot: countTot,
      countCG: countCG,
      countKCG: countKCG
    },
    hasSevereViolation: hasSevereViolation,
    pctTot: Math.round(pctTot * 100)
  };
}

/**
 * Lấy nhãn thời gian hiển thị tiếng Việt chuẩn
 */
function sbGetPeriodLabel(periodType, periodValue) {
  if (periodType === 'week') {
    return 'Tuần ' + periodValue;
  }
  if (periodType === 'month') {
    var names = {
      9: 'Tháng 9', 10: 'Tháng 10', 11: 'Tháng 11', 12: 'Tháng 12',
      1: 'Tháng 1', 2: 'Tháng 2', 3: 'Tháng 3', 4: 'Tháng 4', 5: 'Tháng 5'
    };
    return names[parseInt(periodValue, 10)] || ('Tháng ' + periodValue);
  }
  if (periodType === 'semester') {
    return (periodValue === 'hk1' || periodValue === '1' || periodValue === 1) ? 'Học Kỳ I' : 'Học Kỳ II';
  }
  return 'Cả Năm Học';
}

/**
 * Tính ngày bắt đầu và kết thúc của tuần học (từ Thứ 2 đến Thứ 7)
 */
function sbGetWeekDateRange(weekNum) {
  var base = new Date(2026, 8, 7); // Thứ 2 ngày 07/09/2026
  var startD = new Date(base.getTime() + (weekNum - 1) * 7 * 86400000);
  var endD = new Date(startD.getTime() + 5 * 86400000); // Thứ 7

  function pad(n) { return n.toString().padStart(2, '0'); }
  function fmt(d) { return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); }

  return {
    from: fmt(startD),
    to: fmt(endD)
  };
}

/**
 * Xây dựng danh sách bảng chi tiết các sự kiện (Điểm trừ / Điểm cộng)
 */
function sbBuildDetailRows(events, isPlus, criteria) {
  if (!events || events.length === 0) {
    var msg = isPlus
      ? 'Trong kỳ đánh giá này, chưa có ghi nhận điểm cộng nào.'
      : 'Trong kỳ đánh giá này, học sinh thực hiện rất tốt nội quy, không có vi phạm nào.';
    var clr = isPlus ? '#15803d' : '#059669';
    return '<tr><td colspan="6" style="text-align:center; padding:10px; font-style:italic; color:' + clr + '; font-weight:600;">' + msg + '</td></tr>';
  }

  return events.map(function(ev, idx) {
    var crit = (criteria || []).find(function(c) { return c.id === ev.criteriaId; }) || {
      name: isPlus ? 'Việc tốt / Tuyên dương' : 'Vi phạm nội quy',
      icon: isPlus ? '✅' : '⚠️'
    };
    var dayLabel = ev.day ? 'Thứ ' + ev.day.replace('T', '') : '';
    var pts = isPlus ? ('+' + ev.points) : ('-' + ev.points);
    var ptsColor = isPlus ? '#15803d' : '#dc2626';
    var weekNote = ev.week ? (' (Tuần ' + ev.week + ')') : '';

    return '<tr>' +
      '<td class="center" style="font-weight:700;">' + (idx + 1) + '</td>' +
      '<td style="white-space:nowrap;">' + (ev.recordedAt || '') + weekNote + '</td>' +
      '<td class="center">' + dayLabel + '</td>' +
      '<td>' + (crit.icon || '') + ' ' + crit.name + '</td>' +
      '<td style="font-style:italic; color:#334155;">' + (ev.note || 'Không có ghi chú thêm') + '</td>' +
      '<td class="center" style="font-weight:800; font-size:11.5pt; color:' + ptsColor + ';">' + pts + '</td>' +
    '</tr>';
  }).join('');
}

/**
 * Bảng tổng hợp điểm thi đua từng tuần (khi xem theo Tháng, Học kỳ hoặc Cả năm)
 */
function sbBuildWeekTable(studentId, periodType, periodValue) {
  if (periodType === 'week') return '';

  var data = window.classData;
  var weekRange = [];

  if (periodType === 'month') {
    weekRange = data.getWeeksInMonth(parseInt(periodValue, 10));
  } else if (periodType === 'semester') {
    if (periodValue === 'hk1' || periodValue === '1' || periodValue === 1) {
      for (var i = 1; i <= 18; i++) weekRange.push(i);
    } else {
      for (var i = 19; i <= 35; i++) weekRange.push(i);
    }
  } else {
    for (var i = 1; i <= 35; i++) weekRange.push(i);
  }

  var rows = weekRange.map(function(w) {
    var sc = data.calculateStudentScore(studentId, w);
    var evts = data.getStudentEvents(studentId, w);
    var dr = sbGetWeekDateRange(w);

    if (evts.length === 0) {
      return '<tr style="color:#64748b;">' +
        '<td class="center" style="font-weight:700;">' + w + '</td>' +
        '<td style="font-size:9.5pt;">' + dr.from + ' - ' + dr.to + '</td>' +
        '<td class="center">+0</td>' +
        '<td class="center">-0</td>' +
        '<td class="center" style="font-weight:700;">100</td>' +
        '<td class="center" style="color:#0369a1; font-weight:600;">Chuẩn nội quy</td>' +
      '</tr>';
    }

    var rankUpper = (sc.rank || '').toUpperCase();
    var rankColor = (rankUpper.indexOf('XUẤT SẮC') !== -1 || rankUpper.indexOf('XUAT SAC') !== -1) ? '#7c3aed'
      : (rankUpper.indexOf('TỐT') !== -1 || rankUpper.indexOf('TOT') !== -1) ? '#0369a1'
      : (rankUpper.indexOf('CỐ GẮNG') !== -1 || rankUpper.indexOf('CO GANG') !== -1) ? '#b45309'
      : '#dc2626';

    return '<tr>' +
      '<td class="center" style="font-weight:700;">Tuần ' + w + '</td>' +
      '<td style="font-size:9.5pt;">' + dr.from + ' - ' + dr.to + '</td>' +
      '<td class="center" style="color:#15803d; font-weight:700;">+' + sc.plus + '</td>' +
      '<td class="center" style="color:#dc2626; font-weight:700;">-' + sc.minus + '</td>' +
      '<td class="center" style="font-weight:800; font-size:11pt;">' + sc.total + '</td>' +
      '<td class="center" style="font-weight:800; color:' + rankColor + ';">' + sc.rank + '</td>' +
    '</tr>';
  });

  return '<div class="bb-section-title" style="margin-top:14px;">BẢNG TỔNG HỢP ĐIỂM THI ĐUA TỪNG TUẦN:</div>' +
    '<table class="bienban-table" style="font-size:10pt;">' +
      '<thead>' +
        '<tr>' +
          '<th style="width:12%;">Tuần học</th>' +
          '<th style="width:26%;">Thời gian thực hiện</th>' +
          '<th style="width:14%;">Điểm cộng</th>' +
          '<th style="width:14%;">Điểm trừ</th>' +
          '<th style="width:14%;">Tổng điểm</th>' +
          '<th style="width:20%;">Xếp loại tuần</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' + rows.join('') + '</tbody>' +
    '</table>';
}

/**
 * Xây dựng khối hiển thị Dự kiến xếp loại rèn luyện theo Thông tư 22
 */
function sbBuildTT22Block(td22, periodLabel) {
  if (!td22) return '';
  var rv = td22.ranking;

  return '<div class="bb-keep-together" style="margin-top:16px; border:2.5px solid ' + rv.color + '; border-radius:8px; background:' + rv.bg + '; padding:14px 16px;">' +
    '<div class="bb-sub-section-title" style="margin:0 0 10px 0; color:' + rv.color + '; font-size:13pt; display:flex; align-items:center; gap:8px;">' +
      '<span>📋</span> DỰ KIẾN XẾP LOẠI KẾT QUẢ RÈN LUYỆN (Theo Thông tư 22/2021/TT-BGDĐT)' +
    '</div>' +
    '<table style="width:100%; border-collapse:collapse; font-size:11.5pt;">' +
      '<tr>' +
        '<td style="width:40%; vertical-align:middle; padding:6px 10px 6px 0;">' +
          '<b>Điểm TB thi đua ' + periodLabel + ':</b><br>' +
          '<span style="font-size:18pt; font-weight:900; color:' + rv.color + ';">' + td22.avgScore + '</span> <span style="font-size:11pt; color:#475569;">điểm / tuần</span>' +
        '</td>' +
        '<td style="width:32%; vertical-align:middle; padding:6px 10px;">' +
          '<b>Số tuần theo dõi:</b> ' + td22.totalEvalWeeks + ' tuần<br>' +
          '<span style="font-size:10pt; color:#475569;">' +
            '• Tốt/Xuất sắc: <b>' + td22.weekStats.countTot + '</b> tuần (' + td22.pctTot + '%)<br>' +
            '• Cố gắng: <b>' + td22.weekStats.countCG + '</b> tuần | Cần cố gắng: <b>' + td22.weekStats.countKCG + '</b> tuần' +
          '</span>' +
        '</td>' +
        '<td style="width:28%; text-align:center; vertical-align:middle; padding:6px;">' +
          '<div style="font-size:10pt; font-weight:700; color:#475569; margin-bottom:4px;">DỰ KIẾN XẾP LOẠI:</div>' +
          '<div style="display:inline-block; background:' + rv.color + '; color:#ffffff; border-radius:8px; padding:8px 18px; font-size:15pt; font-weight:900; letter-spacing:1px; box-shadow:0 3px 8px rgba(0,0,0,0.15);">' +
            rv.icon + ' ' + rv.display +
          '</div>' +
        '</td>' +
      '</tr>' +
    '</table>' +
    '<div style="margin-top:10px; font-size:10.5pt; color:#334155; border-top:1px dashed ' + rv.borderColor + '; padding-top:8px; line-height:1.5;">' +
      '<b>Căn cứ đánh giá:</b> ' + rv.tt22Note +
      (td22.hasSevereViolation ? '<br><b style="color:#b91c1c;">⚠️ Lưu ý: Có phát sinh vi phạm nội quy nghiêm trọng cần tiếp tục theo dõi, uốn nắn.</b>' : '') +
    '</div>' +
  '</div>';
}

// ================= CSS ĐẶC THÙ CHO IN ẤN VÀ FILE WORD =================
var SB_WORD_CSS = '@page{size:21.0cm 29.7cm;margin:2.0cm 1.5cm 2.0cm 2.5cm;mso-page-orientation:portrait;}' +
  'body{font-family:"Times New Roman",Times,serif;font-size:13pt;line-height:1.4;color:#000000;}' +
  '.bb-header-grid{display:table;width:100%;margin-bottom:16px;}' +
  '.bb-header-left{display:table-cell;width:42%;text-align:center;vertical-align:top;}' +
  '.bb-header-right{display:table-cell;width:58%;text-align:center;vertical-align:top;}' +
  '.bb-school,.bb-class,.bb-country{font-weight:bold;font-size:12pt;}' +
  '.bb-motto{font-weight:bold;font-size:13pt;}' +
  '.bb-line-short{border-bottom:1px solid #000;width:90px;margin:4px auto;}' +
  '.bb-line-long{border-bottom:1px solid #000;width:150px;margin:4px auto;}' +
  '.bb-title-block{text-align:center;margin:16px 0 12px 0;}' +
  '.bb-main-title{font-size:16pt;font-weight:bold;margin:4px 0;text-transform:uppercase;}' +
  '.bb-sub-title,.bb-year{font-size:13pt;font-weight:bold;}' +
  '.bb-section-title{font-size:13pt;font-weight:bold;margin-top:14px;margin-bottom:6px;text-transform:uppercase;}' +
  '.bb-sub-section-title{font-size:12pt;font-weight:bold;margin-top:8px;margin-bottom:4px;}' +
  'table.bienban-table{border-collapse:collapse;width:100%;font-size:11pt;margin:6px 0 10px 0;}' +
  'table.bienban-table th,table.bienban-table td{border:1px solid #000;padding:5px 7px;vertical-align:top;}' +
  'table.bienban-table th{background-color:#f2f2f2;font-weight:bold;text-align:center;}' +
  '.center{text-align:center;}' +
  '.bb-signatures{display:table;width:100%;margin-top:28px;page-break-inside:avoid;}' +
  '.bb-signatures>div{display:table-cell;width:33.33%;text-align:center;vertical-align:top;}' +
  '.bb-sign-role{font-weight:bold;font-size:12pt;text-transform:uppercase;}' +
  '.bb-sign-sub{font-style:italic;font-size:11pt;}' +
  '.bb-sign-space{height:60px;}' +
  '.bb-sign-name{font-weight:bold;font-size:12pt;}' +
  '.bb-keep-together{page-break-inside:avoid;}';

var SB_PRINT_CSS = '@page{size:A4 portrait;margin:15mm 15mm 15mm 20mm;}' +
  '*{box-sizing:border-box;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}' +
  'body{font-family:"Times New Roman",Times,serif;font-size:13pt;line-height:1.4;color:#000;background:#fff;margin:0;padding:0;}' +
  '.bb-header-grid{display:table;width:100%;margin-bottom:16px;}' +
  '.bb-header-left{display:table-cell;width:42%;text-align:center;vertical-align:top;}' +
  '.bb-header-right{display:table-cell;width:58%;text-align:center;vertical-align:top;}' +
  '.bb-school,.bb-class,.bb-country{font-weight:bold;font-size:12pt;}' +
  '.bb-motto{font-weight:bold;font-size:13pt;}' +
  '.bb-line-short{border-bottom:1px solid #000;width:90px;margin:4px auto;}' +
  '.bb-line-long{border-bottom:1px solid #000;width:150px;margin:4px auto;}' +
  '.bb-title-block{text-align:center;margin:16px 0 12px 0;}' +
  '.bb-main-title{font-size:16pt;font-weight:bold;margin:4px 0;text-transform:uppercase;}' +
  '.bb-sub-title,.bb-year{font-size:13pt;font-weight:bold;}' +
  '.bb-section-title{font-size:13pt;font-weight:bold;margin-top:14px;margin-bottom:6px;text-transform:uppercase;}' +
  '.bb-sub-section-title{font-size:12pt;font-weight:bold;margin-top:8px;margin-bottom:4px;}' +
  'table.bienban-table{border-collapse:collapse;width:100%;font-size:11pt;margin:6px 0 10px 0;}' +
  'table.bienban-table th,table.bienban-table td{border:1px solid #000;padding:5px 7px;vertical-align:top;}' +
  'table.bienban-table th{background-color:#f2f2f2;font-weight:bold;text-align:center;}' +
  '.center{text-align:center;}' +
  '.bb-signatures{display:table;width:100%;margin-top:28px;page-break-inside:avoid;}' +
  '.bb-signatures>div{display:table-cell;width:33.33%;text-align:center;vertical-align:top;}' +
  '.bb-sign-role{font-weight:bold;font-size:12pt;text-transform:uppercase;}' +
  '.bb-sign-sub{font-style:italic;font-size:11pt;}' +
  '.bb-sign-space{height:60px;}' +
  '.bb-sign-name{font-weight:bold;font-size:12pt;}' +
  '.bb-keep-together{page-break-inside:avoid;}' +
  '[contenteditable]{outline:none;}';

/**
 * Sinh mã HTML hoàn chỉnh cho một Biên bản thi đua cá nhân học sinh
 */
function generateStudentBienBanHtml(student, periodType, periodValue, settings) {
  var data = window.classData;
  var criteria = data.getCriteria();

  var eventsAll = [];
  if (periodType === 'week') {
    eventsAll = data.getStudentEvents(student.id, parseInt(periodValue, 10));
  } else if (periodType === 'month') {
    eventsAll = data.getStudentEvents(student.id, 'month-' + periodValue);
  } else if (periodType === 'semester') {
    eventsAll = data.getStudentEvents(student.id, (periodValue === 'hk1' || periodValue === '1' || periodValue === 1) ? 'hk1' : 'hk2');
  } else {
    eventsAll = data.getStudentEvents(student.id, 'all-year');
  }

  var plusEvents = eventsAll.filter(function(e) { return e.type === 'plus'; });
  var minusEvents = eventsAll.filter(function(e) { return e.type === 'minus'; });
  var totalPlus = plusEvents.reduce(function(s, e) { return s + (e.points || 0); }, 0);
  var totalMinus = minusEvents.reduce(function(s, e) { return s + (e.points || 0); }, 0);

  var periodLabel = sbGetPeriodLabel(periodType, periodValue);
  var typeUpperLabel = { week: 'TUẦN', month: 'THÁNG', semester: 'HỌC KỲ', year: 'CẢ NĂM HỌC' }[periodType] || '';

  // Khoảng thời gian cụ thể
  var dateRangeText = '';
  if (periodType === 'week') {
    var dr = sbGetWeekDateRange(parseInt(periodValue, 10));
    dateRangeText = 'Từ ngày <b>' + dr.from + '</b> đến ngày <b>' + dr.to + '</b>';
  } else if (periodType === 'month') {
    dateRangeText = 'Trong <b>' + periodLabel + '</b> năm học ' + (settings.academicYear || '2026 - 2027');
  } else if (periodType === 'semester') {
    var hkRange = (periodValue === 'hk1' || periodValue === '1' || periodValue === 1) ? 'Tuần 1 đến Tuần 18' : 'Tuần 19 đến Tuần 35';
    dateRangeText = 'Trong <b>' + periodLabel + '</b> (' + hkRange + ') năm học ' + (settings.academicYear || '2026 - 2027');
  } else {
    dateRangeText = 'Trong cả năm học ' + (settings.academicYear || '2026 - 2027') + ' (Tuần 1 đến Tuần 35)';
  }

  // Dự kiến xếp loại rèn luyện TT22 (áp dụng cho Tháng, Học kỳ, Cả năm)
  var td22 = (periodType !== 'week') ? calcTT22Ranking(student.id, periodType, periodValue) : null;

  // Tính điểm tổng và xếp loại thi đua
  var totalScore;
  var rankBand;

  if (periodType === 'week') {
    totalScore = 100 + totalPlus - totalMinus;
    if (totalScore >= 150) {
      rankBand = { label: 'XUẤT SẮC', stars: '⭐⭐⭐⭐⭐', color: '#7c3aed' };
    } else if (totalScore >= 130) {
      rankBand = { label: 'TỐT', stars: '⭐⭐⭐⭐', color: '#0369a1' };
    } else if (totalScore >= 110) {
      rankBand = { label: 'CỐ GẮNG', stars: '⭐⭐⭐', color: '#b45309' };
    } else {
      rankBand = { label: 'CẦN CỐ GẮNG', stars: '⭐⭐', color: '#dc2626' };
    }
  } else {
    // Tháng / Học kỳ / Cả năm: Dựa theo điểm trung bình tuần
    totalScore = td22 ? td22.avgScore : (100 + totalPlus - totalMinus);
    var r = td22 ? td22.ranking : null;
    rankBand = r ? { label: r.display, stars: r.icon, color: r.color } : { label: 'ĐANG CẬP NHẬT', stars: '⭐', color: '#0369a1' };
  }

  // Lời nhận xét sư phạm gợi ý tự động cho GVCN
  var teacherComment = '';
  if (totalMinus === 0 && totalPlus > 0) {
    teacherComment = 'Em ' + student.name + ' có ý thức tự giác rất cao, chấp hành nghiêm túc nội quy trường lớp trong ' + periodLabel + ', tích cực rèn luyện và làm nhiều việc tốt. Giáo viên chủ nhiệm biểu dương em trước tập thể lớp 9A4.';
  } else if (totalMinus > 0) {
    teacherComment = 'Em ' + student.name + ' cơ bản hoàn thành nhiệm vụ rèn luyện trong ' + periodLabel + ', tuy nhiên cần nghiêm túc rút kinh nghiệm và khắc phục dứt điểm các lỗi vi phạm nội quy để đạt kết quả rèn luyện cao hơn trong kỳ tới.';
  } else {
    teacherComment = 'Em ' + student.name + ' duy trì nề nếp ổn định trong ' + periodLabel + ', chấp hành tốt các quy định của nhà trường. Giáo viên chủ nhiệm ghi nhận và khuyến khích em tiếp tục phát huy hơn nữa.';
  }

  // Ngày tháng năm xuất biên bản
  var today = new Date();
  function pad2(n) { return n.toString().padStart(2, '0'); }
  var todayDateStr = 'Ngày ' + pad2(today.getDate()) + ' tháng ' + pad2(today.getMonth() + 1) + ' năm ' + today.getFullYear();

  var teacherName = settings.teacherName || 'Thầy Võ Văn Hà';
  var schoolName = (settings.schoolName || 'TRƯỜNG THCS TÂY PHÚ').toUpperCase();
  var className = (settings.className || 'Lớp 9A4').toUpperCase().replace('LỚP ', '');

  // Nội dung bảng kết quả điểm thi đua
  var scoreTableHtml = '';
  if (periodType === 'week') {
    scoreTableHtml = '<table class="bienban-table" style="font-size:12pt;">' +
      '<thead>' +
        '<tr>' +
          '<th style="width:40%;">Chỉ tiêu đánh giá</th>' +
          '<th style="width:20%;" class="center">Điểm số</th>' +
          '<th style="width:40%;">Ghi chú</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        '<tr>' +
          '<td>Điểm cơ sở đầu tuần</td>' +
          '<td class="center" style="font-weight:800;">100</td>' +
          '<td style="font-style:italic; color:#475569;">Mức điểm khởi đầu tiêu chuẩn</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Tổng điểm <b style="color:#15803d;">CỘNG</b> (thực hiện việc tốt)</td>' +
          '<td class="center" style="font-weight:800; color:#15803d;">+' + totalPlus + '</td>' +
          '<td style="font-style:italic; color:#475569;">' + plusEvents.length + ' lần ghi nhận điểm cộng</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Tổng điểm <b style="color:#dc2626;">TRỪ</b> (vi phạm nội quy)</td>' +
          '<td class="center" style="font-weight:800; color:#dc2626;">-' + totalMinus + '</td>' +
          '<td style="font-style:italic; color:#475569;">' + minusEvents.length + ' lần ghi nhận vi phạm</td>' +
        '</tr>' +
        '<tr style="background:#f8fafc;">' +
          '<td style="font-weight:800; font-size:13pt;">TỔNG ĐIỂM THI ĐUA TUẦN:</td>' +
          '<td class="center" style="font-weight:900; font-size:16pt; color:' + rankBand.color + ';">' + totalScore + '</td>' +
          '<td style="font-weight:800; color:' + rankBand.color + ';">' + rankBand.stars + ' ' + rankBand.label + '</td>' +
        '</tr>' +
      '</tbody>' +
    '</table>';
  } else {
    // Tháng / Học kỳ / Cả năm
    scoreTableHtml = '<table class="bienban-table" style="font-size:12pt;">' +
      '<thead>' +
        '<tr>' +
          '<th style="width:40%;">Chỉ tiêu đánh giá ' + periodLabel + '</th>' +
          '<th style="width:20%;" class="center">Kết quả</th>' +
          '<th style="width:40%;">Ghi chú</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        '<tr>' +
          '<td>Số tuần học theo dõi trong kỳ</td>' +
          '<td class="center" style="font-weight:800;">' + (td22 ? td22.totalEvalWeeks : 1) + ' tuần</td>' +
          '<td style="font-style:italic; color:#475569;">Điểm cơ sở 100 điểm / tuần</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Tổng điểm <b style="color:#15803d;">CỘNG</b> tích lũy toàn kỳ</td>' +
          '<td class="center" style="font-weight:800; color:#15803d;">+' + totalPlus + '</td>' +
          '<td style="font-style:italic; color:#475569;">' + plusEvents.length + ' lần ghi nhận việc tốt</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Tổng điểm <b style="color:#dc2626;">TRỪ</b> tích lũy toàn kỳ</td>' +
          '<td class="center" style="font-weight:800; color:#dc2626;">-' + totalMinus + '</td>' +
          '<td style="font-style:italic; color:#475569;">' + minusEvents.length + ' lần vi phạm nội quy</td>' +
        '</tr>' +
        '<tr style="background:#f8fafc;">' +
          '<td style="font-weight:800; font-size:13pt;">ĐIỂM TRUNG BÌNH THI ĐUA / TUẦN:</td>' +
          '<td class="center" style="font-weight:900; font-size:16pt; color:' + rankBand.color + ';">' + (td22 ? td22.avgScore : totalScore) + '</td>' +
          '<td style="font-weight:800; color:' + rankBand.color + ';">Dự kiến xếp loại: ' + rankBand.label + '</td>' +
        '</tr>' +
      '</tbody>' +
    '</table>';
  }

  return '<div class="bienban-page" style="font-family:\'Times New Roman\',Times,serif; font-size:13pt; line-height:1.4; color:#000000; background:#ffffff; padding:0; margin:0;">' +
    // Header chuẩn hành chính theo Nghị định 30/2020/NĐ-CP
    '<div class="bb-header-grid">' +
      '<div class="bb-header-left">' +
        '<div class="bb-school">' + schoolName + '</div>' +
        '<div class="bb-class">LỚP: <span>' + className + '</span></div>' +
        '<div class="bb-line-short"></div>' +
      '</div>' +
      '<div class="bb-header-right">' +
        '<div class="bb-country">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>' +
        '<div class="bb-motto">Độc lập - Tự do - Hạnh phúc</div>' +
        '<div class="bb-line-long"></div>' +
      '</div>' +
    '</div>' +

    // Tiêu đề biên bản
    '<div class="bb-title-block">' +
      '<h1 class="bb-main-title">BIÊN BẢN THI ĐUA CÁ NHÂN HỌC SINH</h1>' +
      '<div class="bb-sub-title">Kết quả thi đua <b>' + typeUpperLabel + '</b> - ' + periodLabel + '<br><small style="font-weight:normal; font-size:12pt;">(' + dateRangeText + ')</small></div>' +
      '<div class="bb-year">Năm học ' + (settings.academicYear || '2026 - 2027') + '</div>' +
    '</div>' +

    // Phần I: Thông tin học sinh
    '<div class="bb-section-title">I. THÔNG TIN HỌC SINH:</div>' +
    '<table class="bienban-table" style="font-size:12pt;">' +
      '<tbody>' +
        '<tr>' +
          '<td style="width:32%; font-weight:700;">Họ và tên học sinh:</td>' +
          '<td style="font-weight:900; font-size:13.5pt; text-transform:uppercase;">' + student.name + '</td>' +
          '<td style="width:18%; font-weight:700;">Mã số HS:</td>' +
          '<td style="font-weight:700;">' + (student.code || 'Chưa cấp') + '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="font-weight:700;">Lớp:</td>' +
          '<td>' + (settings.className || 'Lớp 9A4') + '</td>' +
          '<td style="font-weight:700;">Tổ sinh hoạt:</td>' +
          '<td>Tổ ' + student.group + '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="font-weight:700;">Chức vụ trong lớp:</td>' +
          '<td>' + (student.roleName || 'Thành viên') + '</td>' +
          '<td style="font-weight:700;">GV Chủ nhiệm:</td>' +
          '<td>' + teacherName + '</td>' +
        '</tr>' +
      '</tbody>' +
    '</table>' +

    // Phần II: Kết quả điểm thi đua
    '<div class="bb-section-title" style="margin-top:14px;">II. KẾT QUẢ ĐIỂM THI ĐUA ' + typeUpperLabel + ':</div>' +
    scoreTableHtml +

    // Bảng tuần (nếu xem Tháng, HK, Cả năm)
    sbBuildWeekTable(student.id, periodType, periodValue) +

    // Phần III: Chi tiết vi phạm
    '<div class="bb-section-title" style="margin-top:14px;">III. CHI TIẾT CÁC LẦN VI PHẠM NỘI QUY:</div>' +
    '<table class="bienban-table" style="font-size:10pt;">' +
      '<thead>' +
        '<tr>' +
          '<th style="width:5%;">TT</th>' +
          '<th style="width:20%;">Thời gian ghi nhận</th>' +
          '<th style="width:10%;">Buổi</th>' +
          '<th style="width:30%;">Nội dung vi phạm</th>' +
          '<th style="width:25%;">Ghi chú</th>' +
          '<th style="width:10%;" class="center">Điểm trừ</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' + sbBuildDetailRows(minusEvents, false, criteria) + '</tbody>' +
    '</table>' +

    // Phần IV: Chi tiết việc tốt
    '<div class="bb-section-title" style="margin-top:14px;">IV. CHI TIẾT CÁC LẦN THỰC HIỆN TỐT / ĐƯỢC KHEN THƯỞNG:</div>' +
    '<table class="bienban-table" style="font-size:10pt;">' +
      '<thead>' +
        '<tr>' +
          '<th style="width:5%;">TT</th>' +
          '<th style="width:20%;">Thời gian ghi nhận</th>' +
          '<th style="width:10%;">Buổi</th>' +
          '<th style="width:30%;">Nội dung thực hiện tốt</th>' +
          '<th style="width:25%;">Ghi chú</th>' +
          '<th style="width:10%;" class="center">Điểm cộng</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' + sbBuildDetailRows(plusEvents, true, criteria) + '</tbody>' +
    '</table>' +

    // Khối dự kiến xếp loại rèn luyện TT22 (nếu có)
    sbBuildTT22Block(td22, periodLabel) +

    // Phần V: Nhận xét của Giáo viên chủ nhiệm
    '<div class="bb-keep-together" style="margin-top:16px;">' +
      '<div class="bb-section-title">V. NHẬN XÉT CỦA GIÁO VIÊN CHỦ NHIỆM:</div>' +
      '<div style="border:1px solid #000000; min-height:65px; padding:8px 12px; font-style:italic; line-height:1.6; font-size:12pt; background:#fafafa;">' +
        '<span contenteditable="true" title="Bấm vào để chỉnh sửa nhận xét">' + teacherComment + '</span>' +
      '</div>' +
    '</div>' +

    // Phần VI: Chữ ký 3 bên
    '<div class="bb-signatures">' +
      '<div>' +
        '<div class="bb-sign-role">HỌC SINH</div>' +
        '<div class="bb-sign-sub">(Ký và ghi rõ họ tên)</div>' +
        '<div class="bb-sign-space"></div>' +
        '<div class="bb-sign-name">' + student.name + '</div>' +
      '</div>' +
      '<div>' +
        '<div style="text-align:center; font-size:11pt; font-style:italic; margin-bottom:4px;">' + todayDateStr + '</div>' +
        '<div class="bb-sign-role">GIÁO VIÊN CHỦ NHIỆM</div>' +
        '<div class="bb-sign-sub">(Ký và ghi rõ họ tên)</div>' +
        '<div class="bb-sign-space"></div>' +
        '<div class="bb-sign-name">' + teacherName + '</div>' +
      '</div>' +
      '<div>' +
        '<div class="bb-sign-role">PHỤ HUYNH HỌC SINH</div>' +
        '<div class="bb-sign-sub">(Ký xác nhận)</div>' +
        '<div class="bb-sign-space"></div>' +
        '<div class="bb-sign-name" style="font-style:italic; font-size:11pt; color:#64748b;">(Phụ huynh ký tên)</div>' +
      '</div>' +
    '</div>' +

  '</div>';
}

// ================= CONTROLLER ĐIỀU KHIỂN GIAO DIỆN BIÊN BẢN =================
var StudentBienBanController = {
  currentStudentId: null,
  currentPeriodType: 'week',
  currentPeriodValue: 1,

  /**
   * Kiểm tra quyền Admin (GVCN Võ Văn Hà).
   * Trả về true nếu là Admin, false nếu không phải.
   */
  _checkAdmin: function() {
    return Boolean(
      window.authManager &&
      typeof window.authManager.canViewStudentBienBan === 'function' &&
      window.authManager.canViewStudentBienBan()
    );
  },

  /**
   * Mở modal biên bản thi đua cá nhân học sinh
   * BẢO VỆ CHẶT CHẼ: CHỈ ADMIN MỚI ĐƯỢC PHÉP MỞ
   */
  open: function(studentId) {
    if (!this._checkAdmin()) {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast(
          'Không có quyền truy cập',
          'Chỉ tài khoản Admin (Thầy Võ Văn Hà - GVCN) mới có thể xem và thực hiện tính năng xuất Biên Bản Thi Đua Cá Nhân.',
          'warning'
        );
      }
      return;
    }

    var allStudents = (window.classData && window.classData.getStudents('all')) || [];
    this.currentStudentId = studentId || (allStudents.length > 0 ? allStudents[0].id : null);

    var settings = window.classData ? window.classData.getSettings() : {};
    this.currentPeriodValue = settings.currentWeek || 1;
    this.currentPeriodType = 'week';

    this._populateStudentSelect(this.currentStudentId);
    this._updatePeriodValueOptions('week');

    var typeSelect = document.getElementById('sb-period-type');
    if (typeSelect) typeSelect.value = 'week';

    this.render();

    var modal = document.getElementById('modal-student-bienban');
    if (modal) {
      modal.classList.add('show');
    }
  },

  /**
   * Đóng modal biên bản thi đua cá nhân
   */
  close: function() {
    var modal = document.getElementById('modal-student-bienban');
    if (modal) {
      modal.classList.remove('show');
    }
    document.body.style.overflow = '';
  },

  _populateStudentSelect: function(selectedId) {
    var sel = document.getElementById('sb-select-student');
    if (!sel || !window.classData) return;

    sel.innerHTML = window.classData.getStudents('all').map(function(s) {
      return '<option value="' + s.id + '"' + (s.id === selectedId ? ' selected' : '') + '>' +
        (s.code ? s.code + ' - ' : '') + s.name + ' (Tổ ' + s.group + ' - ' + s.roleName + ')' +
      '</option>';
    }).join('');
  },

  _updatePeriodValueOptions: function(type) {
    var selValue = document.getElementById('sb-period-value');
    if (!selValue || !window.classData) return;

    var curWeek = (window.classData.getSettings().currentWeek) || 1;
    var html = '';

    if (type === 'week') {
      var hk1 = '';
      var hk2 = '';
      for (var w = 1; w <= 18; w++) {
        hk1 += '<option value="' + w + '"' + (w === curWeek ? ' selected' : '') + '>Tuần ' + w + '</option>';
      }
      for (var w = 19; w <= 35; w++) {
        hk2 += '<option value="' + w + '"' + (w === curWeek ? ' selected' : '') + '>Tuần ' + w + '</option>';
      }
      html = '<optgroup label="Học Kỳ I (Tuần 1 - 18)">' + hk1 + '</optgroup>' +
             '<optgroup label="Học Kỳ II (Tuần 19 - 35)">' + hk2 + '</optgroup>';
    } else if (type === 'month') {
      html = '<option value="9">Tháng 9 (Tuần 1-4)</option>' +
             '<option value="10">Tháng 10 (Tuần 5-8)</option>' +
             '<option value="11">Tháng 11 (Tuần 9-13)</option>' +
             '<option value="12">Tháng 12 (Tuần 14-17)</option>' +
             '<option value="1">Tháng 1 (Tuần 18-21)</option>' +
             '<option value="2">Tháng 2 (Tuần 22-23)</option>' +
             '<option value="3">Tháng 3 (Tuần 24-27)</option>' +
             '<option value="4">Tháng 4 (Tuần 28-32)</option>' +
             '<option value="5">Tháng 5 (Tuần 33-35)</option>';
    } else if (type === 'semester') {
      html = '<option value="hk1">Học Kỳ I (Tuần 1 - 18)</option>' +
             '<option value="hk2">Học Kỳ II (Tuần 19 - 35)</option>';
    } else {
      html = '<option value="all-year">Cả Năm Học (Tuần 1 - 35)</option>';
    }

    selValue.innerHTML = html;
  },

  onTypeChange: function(type) {
    if (!this._checkAdmin()) return;
    this.currentPeriodType = type;
    this._updatePeriodValueOptions(type);
    var sv = document.getElementById('sb-period-value');
    this.currentPeriodValue = sv ? sv.value : 1;
    this.render();
  },

  onValueChange: function(val) {
    if (!this._checkAdmin()) return;
    this.currentPeriodValue = val;
    this.render();
  },

  onStudentChange: function(id) {
    if (!this._checkAdmin()) return;
    this.currentStudentId = id;
    this.render();
  },

  render: function() {
    if (!this._checkAdmin()) return;

    var container = document.getElementById('sb-paper-container');
    var badge = document.getElementById('sb-tt22-badge');
    if (!container || !window.classData) return;

    var student = window.classData.getStudentById(this.currentStudentId);
    if (!student) {
      container.innerHTML = '<p style="padding:40px; text-align:center; color:#94a3b8; font-size:1.1rem;">Vui lòng chọn học sinh để hiển thị biên bản thi đua cá nhân</p>';
      return;
    }

    container.innerHTML = generateStudentBienBanHtml(
      student,
      this.currentPeriodType,
      this.currentPeriodValue,
      window.classData.getSettings()
    );

    // Cập nhật thanh huy hiệu dự kiến xếp loại TT22 trên thanh công cụ
    if (badge) {
      if (this.currentPeriodType !== 'week') {
        var td22 = calcTT22Ranking(this.currentStudentId, this.currentPeriodType, this.currentPeriodValue);
        if (td22) {
          var rv = td22.ranking;
          badge.style.display = 'flex';
          badge.innerHTML = '<span style="background:' + rv.color + '; color:#ffffff; border-radius:6px; padding:4px 12px; font-weight:800; font-size:0.92rem;">' +
            rv.icon + ' Dự kiến TT22: <b>' + rv.display + '</b>' +
          '</span>' +
          '<span style="font-size:0.8rem; color:#475569; margin-left:8px;">' +
            'ĐTB: <b>' + td22.avgScore + '</b> điểm | ' + td22.totalEvalWeeks + ' tuần' +
          '</span>';
        }
      } else {
        badge.style.display = 'none';
      }
    }
  },

  /**
   * In biên bản A4 dọc chuẩn trực tiếp qua chế độ in hệ thống
   */
  print: function() {
    if (!this._checkAdmin()) {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Không có quyền', 'Chỉ tài khoản Admin mới được thực hiện in biên bản.', 'warning');
      }
      return;
    }

    var container = document.getElementById('sb-paper-container');
    var student = window.classData ? window.classData.getStudentById(this.currentStudentId) : null;
    if (!container || !student) return;

    if (window.chibiSound) window.chibiSound.playClick();

    // 1. Đưa nội dung vào print-area chuyên biệt cho biên bản cá nhân
    var printArea = document.getElementById('student-bienban-print-area');
    if (printArea) {
      printArea.innerHTML = container.innerHTML;
    }

    // 2. Kích hoạt lớp in ấn trên thẻ body
    document.body.classList.add('printing-student-bienban');

    // 3. Tự động dọn dẹp sau khi in xong
    var cleanup = function() {
      document.body.classList.remove('printing-student-bienban');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);

    // Bộ hẹn giờ dự phòng dọn dẹp nếu trình duyệt không bắn sự kiện afterprint
    setTimeout(cleanup, 5000);

    // 4. Kích hoạt lệnh in gốc
    setTimeout(function() {
      window.print();
    }, 150);
  },

  /**
   * Xuất file PDF (chuẩn định dạng A4 dọc)
   */
  exportPdf: function() {
    if (!this._checkAdmin()) {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Không có quyền', 'Chỉ tài khoản Admin mới được thực hiện xuất PDF biên bản.', 'warning');
      }
      return;
    }

    var self = this;
    var container = document.getElementById('sb-paper-container');
    var student = window.classData ? window.classData.getStudentById(this.currentStudentId) : null;
    if (!container || !student) return;

    if (typeof window.html2pdf === 'undefined') {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Chế độ In A4', 'Đang mở hộp thoại In để lưu thành PDF...', 'info');
      }
      return this.print();
    }

    if (window.chibiNotifications) {
      window.chibiNotifications.showToast('Đang tạo file PDF...', 'Vui lòng chờ trong giây lát...', 'info');
    }

    var clone = container.cloneNode(true);
    clone.querySelectorAll('[contenteditable]').forEach(function(el) {
      el.removeAttribute('contenteditable');
    });

    var periodLabel = sbGetPeriodLabel(this.currentPeriodType, this.currentPeriodValue);
    var cleanName = student.name.replace(/\s+/g, '_');
    var cleanPeriod = periodLabel.replace(/\s+/g, '_');
    var fname = 'BienBan_ThiDua_' + cleanName + '_' + cleanPeriod + '.pdf';

    var opt = {
      margin: [10, 10, 10, 12],
      filename: fname,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    window.html2pdf().set(opt).from(clone).save()
      .then(function() {
        if (window.chibiSound) window.chibiSound.playPlus();
        if (window.chibiNotifications) {
          window.chibiNotifications.showToast('Xuất PDF thành công! 📕', 'Đã tải về: ' + fname, 'success');
        }
      })
      .catch(function(err) {
        console.warn('PDF error:', err);
        self.print();
      });
  },

  _makeWordBlob: function(bodyHtml, title) {
    var wHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>" + title + "</title><style>" + SB_WORD_CSS + "</style></head>" +
      "<body>" + bodyHtml + "</body></html>";
    return new Blob(['\uFEFF' + wHtml], { type: 'application/msword;charset=utf-8' });
  },

  /**
   * Xuất file Microsoft Word (.doc) cho học sinh hiện tại
   */
  exportWord: function() {
    if (!this._checkAdmin()) {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Không có quyền', 'Chỉ tài khoản Admin mới được thực hiện xuất Word.', 'warning');
      }
      return;
    }

    var container = document.getElementById('sb-paper-container');
    var student = window.classData.getStudentById(this.currentStudentId);
    if (!container || !student) return;

    var clone = container.cloneNode(true);
    clone.querySelectorAll('[contenteditable]').forEach(function(el) {
      el.removeAttribute('contenteditable');
    });

    var periodLabel = sbGetPeriodLabel(this.currentPeriodType, this.currentPeriodValue);
    var cleanName = student.name.replace(/\s+/g, '_');
    var cleanPeriod = periodLabel.replace(/\s+/g, '_');
    var fname = 'BienBan_ThiDua_' + cleanName + '_' + cleanPeriod + '.doc';

    var blob = this._makeWordBlob(clone.innerHTML, fname);
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fname;
    document.body.appendChild(link);
    link.click();
    setTimeout(function() {
      if (link.parentNode) link.parentNode.removeChild(link);
      URL.revokeObjectURL(link.href);
    }, 150);

    if (window.chibiSound) window.chibiSound.playPlus();
    if (window.chibiNotifications) {
      window.chibiNotifications.showToast('Xuất Word thành công! 📄', 'Đã tải về: ' + fname, 'success');
    }
  },

  /**
   * Xuất toàn bộ 29 học sinh trong lớp thành một file Word duy nhất có phân trang A4
   */
  exportAllStudents: function() {
    if (!this._checkAdmin()) {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Không có quyền', 'Chỉ tài khoản Admin mới được thực hiện xuất biên bản toàn lớp.', 'warning');
      }
      return;
    }

    var self = this;
    var settings = window.classData.getSettings();
    var students = (window.classData.data.students || []).slice().sort(function(a, b) {
      return (a.code || '').localeCompare(b.code || '');
    });

    if (students.length === 0) {
      if (window.chibiNotifications) {
        window.chibiNotifications.showToast('Danh sách trống', 'Không tìm thấy dữ liệu học sinh trong lớp.', 'warning');
      }
      return;
    }

    if (window.chibiNotifications) {
      window.chibiNotifications.showToast('Đang tổng hợp biên bản...', 'Đang tạo bộ biên bản cho toàn bộ 29 học sinh...', 'info');
    }

    var allHtml = students.map(function(s, idx) {
      var isLast = idx === students.length - 1;
      var pageBreak = isLast ? '' : 'page-break-after:always;';
      return '<div style="' + pageBreak + '">' +
        generateStudentBienBanHtml(s, self.currentPeriodType, self.currentPeriodValue, settings) +
      '</div>';
    }).join('');

    var periodLabel = sbGetPeriodLabel(this.currentPeriodType, this.currentPeriodValue);
    var fname = 'BienBan_ThiDua_ToanLop9A4_' + periodLabel.replace(/\s+/g, '_') + '.doc';

    var blob = this._makeWordBlob(allHtml, fname);
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fname;
    document.body.appendChild(link);
    link.click();
    setTimeout(function() {
      if (link.parentNode) link.parentNode.removeChild(link);
      URL.revokeObjectURL(link.href);
    }, 150);

    if (window.chibiSound) window.chibiSound.playPlus();
    if (window.chibiNotifications) {
      window.chibiNotifications.showToast(
        'Xuất thành công toàn bộ lớp! 📦',
        'Bộ file Word gồm ' + students.length + ' biên bản thi đua cá nhân đã sẵn sàng.',
        'success'
      );
    }
  }
};

// Đăng ký Controller vào window toàn cục
window.studentBienBanCtrl = StudentBienBanController;

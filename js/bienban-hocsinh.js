/**
 * HỆ THỐNG BIÊN BẢN THI ĐUA CÁ NHÂN HỌC SINH & DỰ KIẾN XẾP LOẠI RÈN LUYỆN TT22
 * Lớp 9A4 - Trường THCS Tây Phú | Năm học 2026 - 2027
 * Giáo viên chủ nhiệm: Thầy Võ Văn Hà
 *
 * QUY CHUẨN THỂ THỨC VĂN BẢN:
 * - Chuẩn thể thức văn bản hành chính theo Nghị định 30/2020/NĐ-CP.
 * - Chuẩn đánh giá xếp loại rèn luyện học sinh THCS theo Thông tư 22/2021/TT-BGDĐT (Điều 8, Điều 9).
 * - Bố cục tối ưu, trang trọng để gửi phụ huynh học sinh (gọn gàng trong 1-2 trang A4, không tràn lan).
 * - Tự động tổng hợp nhóm các việc tốt/khen thưởng giúp phụ huynh dễ theo dõi, không lặp dòng.
 * - Bảo mật: Chỉ tài khoản Admin (Thầy Võ Văn Hà - GVCN) mới có quyền xem và xuất biên bản.
 */

// ================= BẢNG TIÊU CHUẨN XẾP LOẠI RÈN LUYỆN TT22 =================
var TT22_RANKING_RULES = [
  {
    id: 'tot',
    label: 'Tốt',
    display: 'TỐT',
    color: '#15803d',
    bg: '#f0fdf4',
    borderColor: '#16a34a',
    tt22Note: 'Điểm TB thi đua ≥ 140 điểm; không có tuần xếp loại "Cần cố gắng"; tỷ lệ tuần đạt Tốt/Xuất sắc ≥ 70%; không vi phạm kỷ luật nghiêm trọng (Theo Điều 8, 9 Thông tư 22/2021/TT-BGDĐT).'
  },
  {
    id: 'kha',
    label: 'Khá',
    display: 'KHÁ',
    color: '#0369a1',
    bg: '#f0f9ff',
    borderColor: '#0284c7',
    tt22Note: 'Điểm TB thi đua ≥ 120 điểm; tỷ lệ tuần đạt Tốt/Xuất sắc ≥ 50%; không vi phạm kỷ luật nghiêm trọng (Theo Điều 8, 9 Thông tư 22/2021/TT-BGDĐT).'
  },
  {
    id: 'dat',
    label: 'Đạt',
    display: 'ĐẠT',
    color: '#b45309',
    bg: '#fffbeb',
    borderColor: '#d97706',
    tt22Note: 'Điểm TB thi đua ≥ 100 điểm; cơ bản chấp hành tốt nội quy; các khuyết điểm đã khắc phục và có tiến bộ (Theo Điều 8, 9 Thông tư 22/2021/TT-BGDĐT).'
  },
  {
    id: 'chua_dat',
    label: 'Chưa đạt',
    display: 'CHƯA ĐẠT',
    color: '#b91c1c',
    bg: '#fef2f2',
    borderColor: '#dc2626',
    tt22Note: 'Điểm TB thi đua dưới 100 điểm hoặc có vi phạm nội quy nghiêm trọng chưa tích cực khắc phục (Theo Điều 8, 9 Thông tư 22/2021/TT-BGDĐT).'
  }
];

/**
 * Tính toán xếp loại rèn luyện dự kiến theo Thông tư 22/2021/TT-BGDĐT
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
    return (periodValue === 'hk1' || periodValue === '1' || periodValue === 1) ? 'Học kỳ I' : 'Học kỳ II';
  }
  return 'Cả năm học';
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
 * Làm sạch tên tiêu chí, loại bỏ icon emoji để đảm bảo chuẩn văn bản hành chính
 */
function sbCleanText(str) {
  if (!str) return '';
  return str.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
}

/**
 * Bảng chi tiết các lần vi phạm nội quy (Điểm trừ)
 */
function sbBuildMinusDetailRows(events, criteria) {
  if (!events || events.length === 0) {
    return '<tr><td colspan="6" style="text-align:center; padding:12px; font-style:italic; color:#15803d; font-weight:bold;">' +
      'Trong kỳ này, học sinh chấp hành rất tốt nội quy, không có vi phạm nào.' +
    '</td></tr>';
  }

  return events.map(function(ev, idx) {
    var crit = (criteria || []).find(function(c) { return c.id === ev.criteriaId; }) || {
      name: 'Vi phạm nội quy'
    };
    var dayLabel = ev.day ? 'Thứ ' + ev.day.replace('T', '') : '';
    var weekNote = ev.week ? (' (T' + ev.week + ')') : '';
    var cleanName = sbCleanText(crit.name);
    var cleanNote = sbCleanText(ev.note) || 'Đã nhắc nhở rút kinh nghiệm';

    return '<tr>' +
      '<td class="center" style="font-weight:bold;">' + (idx + 1) + '</td>' +
      '<td style="white-space:nowrap;">' + (ev.recordedAt || '') + weekNote + '</td>' +
      '<td class="center">' + dayLabel + '</td>' +
      '<td>' + cleanName + '</td>' +
      '<td style="font-style:italic; color:#334155;">' + cleanNote + '</td>' +
      '<td class="center" style="font-weight:bold; color:#dc2626;">-' + ev.points + '</td>' +
    '</tr>';
  }).join('');
}

/**
 * Nhóm và tổng hợp các việc tốt / điểm cộng theo tiêu chí
 * Giải quyết triệt để lỗi tài liệu bị kéo dài 4-5 trang do 78 lần lặp lại!
 */
function sbBuildPlusSummaryRows(events, criteria, periodType) {
  if (!events || events.length === 0) {
    return '<tr><td colspan="5" style="text-align:center; padding:12px; font-style:italic; color:#64748b;">' +
      'Chưa có lượt ghi nhận việc tốt trong kỳ đánh giá này.' +
    '</td></tr>';
  }

  // Nếu là theo Tuần và số sự kiện ít (<= 8 sự kiện), hiển thị theo từng lượt
  if (periodType === 'week' && events.length <= 8) {
    return events.map(function(ev, idx) {
      var crit = (criteria || []).find(function(c) { return c.id === ev.criteriaId; }) || { name: 'Thực hiện việc tốt' };
      var dayLabel = ev.day ? 'Thứ ' + ev.day.replace('T', '') : '';
      var cleanName = sbCleanText(crit.name);
      var cleanNote = sbCleanText(ev.note) || 'Phát huy tinh thần tốt';

      return '<tr>' +
        '<td class="center" style="font-weight:bold;">' + (idx + 1) + '</td>' +
        '<td>' + cleanName + '</td>' +
        '<td class="center">' + dayLabel + '</td>' +
        '<td style="font-style:italic; color:#334155;">' + cleanNote + '</td>' +
        '<td class="center" style="font-weight:bold; color:#15803d;">+' + ev.points + '</td>' +
      '</tr>';
    }).join('');
  }

  // Nếu là Tháng, Học kỳ, Cả năm: TỰ ĐỘNG TỔNG HỢP THEO TIÊU CHÍ (GROUP BY CRITERIA)
  var map = {};
  events.forEach(function(ev) {
    var cid = ev.criteriaId || 'other';
    if (!map[cid]) {
      var crit = (criteria || []).find(function(c) { return c.id === cid; }) || { name: 'Việc tốt, hoạt động phong trào' };
      map[cid] = {
        name: sbCleanText(crit.name),
        count: 0,
        totalPoints: 0,
        notes: []
      };
    }
    map[cid].count++;
    map[cid].totalPoints += (ev.points || 0);
    if (ev.note && ev.note.trim() && map[cid].notes.length < 2) {
      var n = sbCleanText(ev.note.trim());
      if (n && !map[cid].notes.includes(n)) {
        map[cid].notes.push(n);
      }
    }
  });

  var list = Object.values(map).sort(function(a, b) { return b.count - a.count; });
  var totalPlusPoints = events.reduce(function(s, e) { return s + (e.points || 0); }, 0);

  var rowsHtml = list.map(function(item, idx) {
    var noteStr = item.notes.length > 0 ? item.notes.join('; ') : 'Thực hiện tích cực, gương mẫu';
    return '<tr>' +
      '<td class="center" style="font-weight:bold;">' + (idx + 1) + '</td>' +
      '<td style="font-weight:600;">' + item.name + '</td>' +
      '<td class="center" style="font-weight:bold;">' + item.count + ' lượt</td>' +
      '<td class="center" style="font-weight:bold; color:#15803d;">+' + item.totalPoints + '</td>' +
      '<td style="font-style:italic; color:#334155;">' + noteStr + '</td>' +
    '</tr>';
  }).join('');

  // Hàng tổng kết điểm cộng
  rowsHtml += '<tr style="background:#f8fafc; font-weight:bold;">' +
    '<td colspan="2" style="text-align:right; padding-right:12px; font-weight:bold;">TỔNG CỘNG ĐIỂM CỘNG ĐẠT ĐƯỢC:</td>' +
    '<td class="center" style="font-weight:bold;">' + events.length + ' lượt</td>' +
    '<td class="center" style="font-weight:bold; color:#15803d; font-size:11pt;">+' + totalPlusPoints + '</td>' +
    '<td style="font-style:italic; color:#15803d; font-weight:bold;">Tích cực rèn luyện</td>' +
  '</tr>';

  return rowsHtml;
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
        '<td class="center" style="font-weight:bold;">Tuần ' + w + '</td>' +
        '<td style="font-size:9.5pt;">' + dr.from + ' - ' + dr.to + '</td>' +
        '<td class="center">+0</td>' +
        '<td class="center">-0</td>' +
        '<td class="center" style="font-weight:bold;">100</td>' +
        '<td class="center">Đạt chuẩn</td>' +
      '</tr>';
    }

    var rankUpper = (sc.rank || '').toUpperCase();
    var rankColor = (rankUpper.indexOf('XUẤT SẮC') !== -1 || rankUpper.indexOf('XUAT SAC') !== -1) ? '#7c3aed'
      : (rankUpper.indexOf('TỐT') !== -1 || rankUpper.indexOf('TOT') !== -1) ? '#0369a1'
      : (rankUpper.indexOf('CỐ GẮNG') !== -1 || rankUpper.indexOf('CO GANG') !== -1) ? '#b45309'
      : '#dc2626';

    return '<tr>' +
      '<td class="center" style="font-weight:bold;">Tuần ' + w + '</td>' +
      '<td style="font-size:9.5pt;">' + dr.from + ' - ' + dr.to + '</td>' +
      '<td class="center" style="color:#15803d; font-weight:bold;">+' + sc.plus + '</td>' +
      '<td class="center" style="color:#dc2626; font-weight:bold;">-' + sc.minus + '</td>' +
      '<td class="center" style="font-weight:bold; font-size:10.5pt;">' + sc.total + '</td>' +
      '<td class="center" style="font-weight:bold; color:' + rankColor + ';">' + sc.rank + '</td>' +
    '</tr>';
  });

  return '<div class="bb-section-title" style="margin-top:12px;">BẢNG TỔNG HỢP ĐIỂM THI ĐUA TỪNG TUẦN:</div>' +
    '<table class="bienban-table" style="font-size:10pt;">' +
      '<thead>' +
        '<tr>' +
          '<th style="width:14%;">Tuần học</th>' +
          '<th style="width:28%;">Thời gian thực hiện</th>' +
          '<th style="width:14%;">Điểm cộng</th>' +
          '<th style="width:14%;">Điểm trừ</th>' +
          '<th style="width:14%;">Tổng điểm</th>' +
          '<th style="width:16%;">Xếp loại</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' + rows.join('') + '</tbody>' +
    '</table>';
}

/**
 * Xây dựng khối hiển thị Dự kiến xếp loại rèn luyện theo Thông tư 22
 * Thể thức chuẩn văn bản sư phạm, không sử dụng icon emoji
 */
function sbBuildTT22Block(td22, periodLabel) {
  if (!td22) return '';
  var rv = td22.ranking;

  return '<div class="bb-keep-together" style="margin-top:14px; border:1.5px solid #000000; border-radius:4px; padding:10px 14px; background:#fafafa;">' +
    '<div style="font-weight:bold; font-size:11.5pt; text-transform:uppercase; color:#000000; margin-bottom:6px; border-bottom:1px solid #cbd5e1; padding-bottom:4px;">' +
      'V. DỰ KIẾN KẾT QUẢ XẾP LOẠI RÈN LUYỆN (THEO THÔNG TƯ 22/2021/TT-BGDĐT)' +
    '</div>' +
    '<table style="width:100%; border-collapse:collapse; font-size:10.5pt;">' +
      '<tr>' +
        '<td style="width:64%; vertical-align:top; padding:4px 8px 4px 0; line-height:1.5;">' +
          '• Điểm trung bình thi đua tuần: <b>' + td22.avgScore + ' điểm / tuần</b><br>' +
          '• Số tuần học theo dõi: <b>' + td22.totalEvalWeeks + ' tuần</b> (' +
            'Tốt/Xuất sắc: <b>' + td22.weekStats.countTot + '</b> tuần [' + td22.pctTot + '%]; ' +
            'Cố gắng: <b>' + td22.weekStats.countCG + '</b> tuần; ' +
            'Cần cố gắng: <b>' + td22.weekStats.countKCG + '</b> tuần' +
          ')<br>' +
          '• <i>Căn cứ đánh giá: ' + rv.tt22Note + '</i>' +
          (td22.hasSevereViolation ? '<br><b style="color:#b91c1c;">Lưu ý: Có vi phạm nội quy nghiêm trọng cần tiếp tục uốn nắn, rèn luyện.</b>' : '') +
        '</td>' +
        '<td style="width:36%; text-align:center; vertical-align:middle; border-left:1px dashed #94a3b8; padding:4px 8px;">' +
          '<div style="font-size:10pt; font-weight:bold; color:#475569; text-transform:uppercase; margin-bottom:4px;">Xếp loại rèn luyện:</div>' +
          '<div style="font-size:15pt; font-weight:bold; color:#000000; border:2px solid #000000; border-radius:4px; padding:6px 14px; display:inline-block; letter-spacing:1px;">' +
            rv.display +
          '</div>' +
        '</td>' +
      '</tr>' +
    '</table>' +
  '</div>';
}

// ================= CSS ĐẶC THÙ CHO IN ẤN VÀ FILE WORD =================
var SB_WORD_CSS = '@page{size:21.0cm 29.7cm;margin:1.5cm 1.5cm 1.5cm 1.8cm;mso-page-orientation:portrait;}' +
  'body{font-family:"Times New Roman",Times,serif;font-size:11.5pt;line-height:1.3;color:#000000;}' +
  '.bb-header-grid{display:table;width:100%;margin-bottom:8px;}' +
  '.bb-header-left{display:table-cell;width:46%;text-align:center;vertical-align:top;}' +
  '.bb-header-right{display:table-cell;width:54%;text-align:center;vertical-align:top;}' +
  '.bb-agency{font-weight:bold;font-size:10.5pt;text-transform:uppercase;}' +
  '.bb-school,.bb-class,.bb-country{font-weight:bold;font-size:10.5pt;}' +
  '.bb-motto{font-weight:bold;font-size:11.5pt;}' +
  '.bb-line-short{border-top:1px solid #000;width:70px;margin:3px auto;height:1px;}' +
  '.bb-line-long{border-top:1px solid #000;width:135px;margin:3px auto;height:1px;}' +
  '.bb-title-block{text-align:center;margin:6px 0 10px 0;}' +
  '.bb-main-title{font-size:13.5pt;font-weight:bold;margin:2px 0;text-transform:uppercase;}' +
  '.bb-sub-title,.bb-year{font-size:10.5pt;font-weight:bold;}' +
  '.bb-section-title{font-size:10.5pt;font-weight:bold;margin-top:8px;margin-bottom:3px;text-transform:uppercase;}' +
  'table.bienban-table{border-collapse:collapse;width:100%;font-size:9.5pt;margin:3px 0 6px 0;}' +
  'table.bienban-table th,table.bienban-table td{border:1px solid #000;padding:3px 5px;vertical-align:middle;}' +
  'table.bienban-table th{background-color:#f2f2f2;font-weight:bold;text-align:center;}' +
  '.center{text-align:center;}' +
  '.bb-signatures{display:table;width:100%;margin-top:12px;page-break-inside:avoid;}' +
  '.bb-signatures>div{display:table-cell;width:33.33%;text-align:center;vertical-align:top;}' +
  '.bb-sign-role{font-weight:bold;font-size:10.5pt;text-transform:uppercase;}' +
  '.bb-sign-sub{font-style:italic;font-size:8.5pt;color:#334155;}' +
  '.bb-sign-space{height:40px;}' +
  '.bb-sign-name{font-weight:bold;font-size:10.5pt;}' +
  '.bb-keep-together{page-break-inside:avoid;}' +
  '.sb-screen-only-divider{display:none;}' +
  '.html2pdf__page-break{page-break-before:always;mso-special-character:line-break;clear:both;height:0;margin:0;padding:0;}' +
  '.bb-page2-subhead{display:table;width:100%;border-bottom:1px solid #000;padding-bottom:3px;margin-bottom:6px;font-size:9pt;}';

var SB_PRINT_CSS = '@page{size:A4 portrait;margin:10mm 12mm 10mm 15mm;}' +
  '*{box-sizing:border-box;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}' +
  'body{font-family:"Times New Roman",Times,serif;font-size:11.5pt;line-height:1.25;color:#000;background:#fff;margin:0;padding:0;}' +
  '.bb-header-grid{display:table;width:100%;margin-bottom:8px;}' +
  '.bb-header-left{display:table-cell;width:46%;text-align:center;vertical-align:top;}' +
  '.bb-header-right{display:table-cell;width:54%;text-align:center;vertical-align:top;}' +
  '.bb-agency{font-weight:bold;font-size:10.5pt;text-transform:uppercase;}' +
  '.bb-school,.bb-class,.bb-country{font-weight:bold;font-size:10.5pt;}' +
  '.bb-motto{font-weight:bold;font-size:11.5pt;}' +
  '.bb-line-short{border-top:1px solid #000;width:70px;margin:3px auto;height:1px;}' +
  '.bb-line-long{border-top:1px solid #000;width:135px;margin:3px auto;height:1px;}' +
  '.bb-title-block{text-align:center;margin:6px 0 10px 0;}' +
  '.bb-main-title{font-size:13.5pt;font-weight:bold;margin:2px 0;text-transform:uppercase;}' +
  '.bb-sub-title,.bb-year{font-size:10.5pt;font-weight:bold;}' +
  '.bb-section-title{font-size:10.5pt;font-weight:bold;margin-top:8px;margin-bottom:3px;text-transform:uppercase;}' +
  'table.bienban-table{border-collapse:collapse;width:100%;font-size:9.5pt;margin:3px 0 6px 0;}' +
  'table.bienban-table th,table.bienban-table td{border:1px solid #000;padding:3px 5px;vertical-align:middle;}' +
  'table.bienban-table th{background-color:#f2f2f2;font-weight:bold;text-align:center;}' +
  'table.bienban-table tr{page-break-inside:avoid;break-inside:avoid;}' +
  '.center{text-align:center;}' +
  '.bb-signatures{display:table;width:100%;margin-top:12px;page-break-inside:avoid;break-inside:avoid;}' +
  '.bb-signatures>div{display:table-cell;width:33.33%;text-align:center;vertical-align:top;}' +
  '.bb-sign-role{font-weight:bold;font-size:10.5pt;text-transform:uppercase;}' +
  '.bb-sign-sub{font-style:italic;font-size:8.5pt;color:#334155;}' +
  '.bb-sign-space{height:38px;}' +
  '.bb-sign-name{font-weight:bold;font-size:10.5pt;}' +
  '.bb-keep-together{page-break-inside:avoid;break-inside:avoid;}' +
  '.sb-screen-only-divider{display:none!important;}' +
  '.html2pdf__page-break{page-break-before:always!important;break-before:page!important;clear:both!important;height:0!important;margin:0!important;padding:0!important;border:none!important;}' +
  '.bb-page2-subhead{display:table;width:100%;border-bottom:1px solid #000;padding-bottom:3px;margin-bottom:6px;font-size:9pt;}' +
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

  // Khoảng thời gian cụ thể
  var dateRangeText = '';
  if (periodType === 'week') {
    var dr = sbGetWeekDateRange(parseInt(periodValue, 10));
    dateRangeText = 'Từ ngày ' + dr.from + ' đến ngày ' + dr.to;
  } else if (periodType === 'month') {
    dateRangeText = 'Thực hiện trong ' + periodLabel + ' năm học ' + (settings.academicYear || '2026 - 2027');
  } else if (periodType === 'semester') {
    var hkRange = (periodValue === 'hk1' || periodValue === '1' || periodValue === 1) ? 'Tuần 1 đến Tuần 18' : 'Tuần 19 đến Tuần 35';
    dateRangeText = periodLabel + ' (' + hkRange + ') năm học ' + (settings.academicYear || '2026 - 2027');
  } else {
    dateRangeText = 'Toàn bộ năm học ' + (settings.academicYear || '2026 - 2027') + ' (Tuần 1 đến Tuần 35)';
  }

  // Dự kiến xếp loại rèn luyện TT22 (áp dụng cho Tháng, Học kỳ, Cả năm)
  var td22 = (periodType !== 'week') ? calcTT22Ranking(student.id, periodType, periodValue) : null;

  // Tính điểm tổng và xếp loại thi đua
  var totalScore;
  var rankBand;

  if (periodType === 'week') {
    totalScore = 100 + totalPlus - totalMinus;
    if (totalScore >= 150) {
      rankBand = { label: 'XUẤT SẮC', color: '#7c3aed' };
    } else if (totalScore >= 130) {
      rankBand = { label: 'TỐT', color: '#0369a1' };
    } else if (totalScore >= 110) {
      rankBand = { label: 'CỐ GẮNG', color: '#b45309' };
    } else {
      rankBand = { label: 'CẦN CỐ GẮNG', color: '#dc2626' };
    }
  } else {
    totalScore = td22 ? td22.avgScore : (100 + totalPlus - totalMinus);
    var r = td22 ? td22.ranking : null;
    rankBand = r ? { label: r.display, color: r.color } : { label: 'ĐẠT', color: '#0369a1' };
  }

  // Lời nhận xét sư phạm gợi ý tự động cho GVCN
  var teacherComment = '';
  if (totalMinus === 0 && totalPlus > 0) {
    teacherComment = 'Em ' + student.name + ' có ý thức tự giác rất tốt, chấp hành nghiêm túc mọi nội quy trường lớp trong ' + periodLabel + ', tích cực xây dựng bài và đạt nhiều điểm cộng. Thầy biểu dương em và mong gia đình tiếp tục khích lệ để em phát huy hơn nữa.';
  } else if (totalMinus > 0) {
    teacherComment = 'Em ' + student.name + ' có nhiều cố gắng trong học tập và rèn luyện, tích cực phát biểu xây dựng bài. Tuy nhiên, em vẫn còn vi phạm nội quy (' + totalMinus + ' điểm trừ - cụ thể như bảng chi tiết ở trên). Đề nghị quý Phụ huynh phối hợp nhắc nhở, động viên để em nghiêm túc khắc phục, rèn luyện tốt hơn trong thời gian tới.';
  } else {
    teacherComment = 'Em ' + student.name + ' duy trì nề nếp tương đối ổn định trong ' + periodLabel + '. GVCN đề nghị em tích cực hơn nữa trong các hoạt động phong trào và học tập để đạt kết quả rèn luyện cao hơn.';
  }

  // Ngày tháng năm xuất biên bản
  var today = new Date();
  function pad2(n) { return n.toString().padStart(2, '0'); }
  var todayDateStr = 'ngày ' + pad2(today.getDate()) + ' tháng ' + pad2(today.getMonth() + 1) + ' năm ' + today.getFullYear();

  var teacherName = settings.teacherName || 'Thầy Võ Văn Hà';
  var schoolName = (settings.schoolName || 'TRƯỜNG THCS TÂY PHÚ').toUpperCase();
  var className = (settings.className || 'Lớp 9A4').toUpperCase().replace('LỚP ', '');
  var studentCode = student.code || ('9A4' + (student.id.replace('hs', '').padStart(2, '0')));

  // Cấu trúc bảng kết quả điểm thi đua
  var scoreTableHtml = '';
  if (periodType === 'week') {
    scoreTableHtml = '<table class="bienban-table">' +
      '<thead>' +
        '<tr>' +
          '<th style="width:45%;">Nội dung theo dõi thi đua</th>' +
          '<th style="width:20%;" class="center">Điểm số</th>' +
          '<th style="width:35%;">Ghi chú</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        '<tr>' +
          '<td>Điểm cơ sở đầu tuần</td>' +
          '<td class="center" style="font-weight:bold;">100</td>' +
          '<td style="font-style:italic; color:#475569;">Mức điểm khởi đầu tiêu chuẩn</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Tổng điểm CỘNG (thực hiện việc tốt, khen thưởng)</td>' +
          '<td class="center" style="font-weight:bold; color:#15803d;">+' + totalPlus + '</td>' +
          '<td style="font-style:italic; color:#475569;">' + plusEvents.length + ' lượt ghi nhận</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Tổng điểm TRỪ (vi phạm nội quy trường lớp)</td>' +
          '<td class="center" style="font-weight:bold; color:#dc2626;">-' + totalMinus + '</td>' +
          '<td style="font-style:italic; color:#475569;">' + minusEvents.length + ' lượt ghi nhận</td>' +
        '</tr>' +
        '<tr style="background:#f8fafc;">' +
          '<td style="font-weight:bold;">TỔNG ĐIỂM THI ĐUA TUẦN:</td>' +
          '<td class="center" style="font-weight:bold; font-size:12pt; color:' + rankBand.color + ';">' + totalScore + '</td>' +
          '<td style="font-weight:bold; color:' + rankBand.color + ';">Xếp loại tuần: ' + rankBand.label + '</td>' +
        '</tr>' +
      '</tbody>' +
    '</table>';
  } else {
    // Tháng / Học kỳ / Cả năm
    var evalWeeksCount = td22 ? td22.totalEvalWeeks : 1;
    scoreTableHtml = '<table class="bienban-table">' +
      '<thead>' +
        '<tr>' +
          '<th style="width:48%;">Nội dung theo dõi thi đua (' + periodLabel + ')</th>' +
          '<th style="width:20%;" class="center">Kết quả</th>' +
          '<th style="width:32%;">Ghi chú</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        '<tr>' +
          '<td>Số tuần học theo dõi trong kỳ</td>' +
          '<td class="center" style="font-weight:bold;">' + evalWeeksCount + ' tuần</td>' +
          '<td style="font-style:italic; color:#475569;">Điểm cơ sở 100 điểm / tuần</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Tổng điểm CỘNG tích lũy trong kỳ</td>' +
          '<td class="center" style="font-weight:bold; color:#15803d;">+' + totalPlus + '</td>' +
          '<td style="font-style:italic; color:#475569;">' + plusEvents.length + ' lượt việc tốt</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Tổng điểm TRỪ tích lũy trong kỳ</td>' +
          '<td class="center" style="font-weight:bold; color:#dc2626;">-' + totalMinus + '</td>' +
          '<td style="font-style:italic; color:#475569;">' + minusEvents.length + ' lượt vi phạm</td>' +
        '</tr>' +
        '<tr style="background:#f8fafc;">' +
          '<td style="font-weight:bold;">ĐIỂM TRUNG BÌNH THI ĐUA / TUẦN:</td>' +
          '<td class="center" style="font-weight:bold; font-size:12pt; color:#1e3a8a;">' + (td22 ? td22.avgScore : totalScore) + '</td>' +
          '<td style="font-weight:bold;">Dự kiến xếp loại: ' + rankBand.label + '</td>' +
        '</tr>' +
      '</tbody>' +
    '</table>';
  }

  // Tiêu đề bảng việc tốt
  var plusTableHeader = (periodType === 'week' && plusEvents.length <= 8)
    ? '<thead><tr><th style="width:6%;">TT</th><th style="width:36%;">Nội dung việc tốt</th><th style="width:14%;">Buổi</th><th style="width:32%;">Ghi chú</th><th style="width:12%;" class="center">Điểm cộng</th></tr></thead>'
    : '<thead><tr><th style="width:6%;">TT</th><th style="width:44%;">Nội dung việc tốt / Biểu dương khen thưởng</th><th style="width:16%;" class="center">Số lượt</th><th style="width:16%;" class="center">Điểm cộng</th><th style="width:18%;">Ghi chú</th></tr></thead>';

  // Khối chữ ký chuẩn 3 bên
  var signaturesHtml = '<div class="bb-signatures bb-keep-together" style="margin-top:12px; width:100%; display:table; page-break-inside:avoid; break-inside:avoid;">' +
    '<div style="display:table-cell; width:32%; text-align:center; vertical-align:top;">' +
      '<div class="bb-sign-role" style="font-weight:bold; font-size:10.5pt; text-transform:uppercase;">HỌC SINH</div>' +
      '<div class="bb-sign-sub" style="font-style:italic; font-size:8.5pt; color:#334155;">(Ký và ghi rõ họ tên)</div>' +
      '<div class="bb-sign-space" style="height:38px;"></div>' +
      '<div class="bb-sign-name" style="font-weight:bold; font-size:10.5pt;">' + student.name + '</div>' +
    '</div>' +
    '<div style="display:table-cell; width:34%; text-align:center; vertical-align:top;">' +
      '<div class="bb-sign-role" style="font-weight:bold; font-size:10.5pt; text-transform:uppercase;">Ý KIẾN PHỤ HUYNH</div>' +
      '<div class="bb-sign-sub" style="font-style:italic; font-size:8.5pt; color:#334155;">(Ký và ghi rõ họ tên)</div>' +
      '<div class="bb-sign-space" style="height:38px;"></div>' +
      '<div style="font-style:italic; font-size:9pt; color:#64748b;">(Phụ huynh ký xác nhận)</div>' +
    '</div>' +
    '<div style="display:table-cell; width:34%; text-align:center; vertical-align:top;">' +
      '<div style="text-align:center; font-size:9.5pt; font-style:italic; margin-bottom:2px;">Tây Phú, ' + todayDateStr + '</div>' +
      '<div class="bb-sign-role" style="font-weight:bold; font-size:10.5pt; text-transform:uppercase;">GIÁO VIÊN CHỦ NHIỆM</div>' +
      '<div class="bb-sign-sub" style="font-style:italic; font-size:8.5pt; color:#334155;">(Ký và ghi rõ họ tên)</div>' +
      '<div class="bb-sign-space" style="height:38px;"></div>' +
      '<div class="bb-sign-name" style="font-weight:bold; font-size:10.5pt;">' + teacherName + '</div>' +
    '</div>' +
  '</div>';

  // Khung nhận xét của GVCN
  var teacherCommentBox = '<div class="bb-keep-together" style="margin-top:10px; page-break-inside:avoid; break-inside:avoid;">' +
    '<div class="bb-section-title" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; margin-bottom:3px;">' +
      (periodType === 'week' ? 'V. Ý KIẾN / NHẬN XÉT CỦA GIÁO VIÊN CHỦ NHIỆM:' : 'VI. Ý KIẾN / NHẬN XÉT CỦA GIÁO VIÊN CHỦ NHIỆM:') +
    '</div>' +
    '<div style="border:1px solid #000000; min-height:42px; padding:5px 8px; font-style:italic; line-height:1.4; font-size:10pt; background:#ffffff;">' +
      '<span contenteditable="true" title="Bấm vào để chỉnh sửa lời nhận xét trước khi in hoặc xuất file">' + teacherComment + '</span>' +
    '</div>' +
  '</div>';

  // Header Quốc hiệu, Tiêu ngữ chuẩn Nghị định 30/2020/NĐ-CP (Đúng chuẩn UBND XÃ TÂY PHÚ)
  var docHeaderHtml = '<div class="bb-header-grid" style="display:table; width:100%; margin-bottom:8px;">' +
    '<div class="bb-header-left" style="display:table-cell; width:46%; text-align:center; vertical-align:top;">' +
      '<div class="bb-agency" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; color:#000000;">UBND XÃ TÂY PHÚ</div>' +
      '<div class="bb-school" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; color:#000000;">' + schoolName + '</div>' +
      '<div class="bb-class" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; color:#000000;">LỚP: <span>' + className + '</span></div>' +
      '<div class="bb-line-short" style="border-top:1px solid #000; width:70px; margin:3px auto; height:1px;"></div>' +
    '</div>' +
    '<div class="bb-header-right" style="display:table-cell; width:54%; text-align:center; vertical-align:top;">' +
      '<div class="bb-country" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; color:#000000;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>' +
      '<div class="bb-motto" style="font-size:11.5pt; font-weight:bold; color:#000000;">Độc lập - Tự do - Hạnh phúc</div>' +
      '<div class="bb-line-long" style="border-top:1px solid #000; width:135px; margin:3px auto; height:1px;"></div>' +
    '</div>' +
  '</div>';

  // Tiêu đề biên bản
  var titleBlockHtml = '<div class="bb-title-block" style="text-align:center; margin:6px 0 10px 0;">' +
    '<div class="bb-main-title" style="font-size:13.5pt; font-weight:bold; text-transform:uppercase; letter-spacing:0.5px;">' +
      'PHIẾU THEO DÕI THI ĐUA &amp; RÈN LUYỆN CÁ NHÂN' +
    '</div>' +
    '<div class="bb-sub-title" style="font-size:10.5pt; font-weight:bold; color:#1e293b; margin-top:2px;">' +
      'Kỳ đánh giá: ' + periodLabel + ' • Năm học ' + (settings.academicYear || '2026 - 2027') +
    '</div>' +
    '<div style="font-size:9pt; font-style:italic; color:#475569; margin-top:1px;">' +
      '(' + dateRangeText + ')' +
    '</div>' +
  '</div>';

  // Phần I: Thông tin học sinh
  var studentInfoHtml = '<div class="bb-section-title" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; margin-bottom:3px;">I. THÔNG TIN HỌC SINH:</div>' +
  '<table class="bienban-table" style="font-size:10pt; margin-bottom:6px;">' +
    '<tbody>' +
      '<tr>' +
        '<td style="width:20%; font-weight:bold;">Họ và tên học sinh:</td>' +
        '<td style="width:40%; font-weight:bold; font-size:11pt; text-transform:uppercase;">' + student.name + '</td>' +
        '<td style="width:16%; font-weight:bold;">Mã số HS:</td>' +
        '<td style="width:24%; font-weight:bold;">' + studentCode + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td style="font-weight:bold;">Lớp:</td>' +
        '<td>' + (settings.className || 'Lớp 9A4') + '</td>' +
        '<td style="font-weight:bold;">Tổ sinh hoạt:</td>' +
        '<td>Tổ ' + student.group + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td style="font-weight:bold;">Chức vụ trong lớp:</td>' +
        '<td>' + (student.roleName || 'Thành viên') + '</td>' +
        '<td style="font-weight:bold;">GV chủ nhiệm:</td>' +
        '<td>' + teacherName + '</td>' +
      '</tr>' +
    '</tbody>' +
  '</table>';

  // ================= TRƯỜNG HỢP 1: BÁO CÁO TUẦN (GỌN GÀNG TRỌN VẸN TRONG 1 TRANG A4) =================
  if (periodType === 'week') {
    return '<div class="bienban-page" style="font-family:\'Times New Roman\',Times,serif; font-size:11.5pt; line-height:1.25; color:#000000; background:#ffffff; padding:0; margin:0;">' +
      docHeaderHtml +
      titleBlockHtml +
      studentInfoHtml +

      // Phần II: Điểm thi đua tuần
      '<div class="bb-section-title" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; margin-top:6px; margin-bottom:3px;">II. KẾT QUẢ ĐIỂM THI ĐUA TUẦN:</div>' +
      scoreTableHtml +

      // Phần III: Chi tiết việc tốt tuần
      '<div class="bb-section-title" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; margin-top:6px; margin-bottom:3px;">III. CHI TIẾT VIỆC TỐT ĐẠT ĐIỂM CỘNG TRONG TUẦN:</div>' +
      '<table class="bienban-table" style="font-size:9.5pt;">' +
        plusTableHeader +
        '<tbody>' + sbBuildPlusSummaryRows(plusEvents, criteria, periodType) + '</tbody>' +
      '</table>' +

      // Phần IV: Chi tiết vi phạm nội quy tuần
      '<div class="bb-section-title" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; margin-top:6px; margin-bottom:3px;">IV. CHI TIẾT CÁC LẦN VI PHẠM NỘI QUY TRONG TUẦN:</div>' +
      '<table class="bienban-table" style="font-size:9.5pt;">' +
        '<thead>' +
          '<tr>' +
            '<th style="width:6%;">TT</th>' +
            '<th style="width:20%;">Thời gian</th>' +
            '<th style="width:10%;">Buổi</th>' +
            '<th style="width:34%;">Nội dung vi phạm</th>' +
            '<th style="width:20%;">Ghi chú</th>' +
            '<th style="width:10%;" class="center">Điểm trừ</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' + sbBuildMinusDetailRows(minusEvents, criteria) + '</tbody>' +
      '</table>' +

      // Phần V: Nhận xét GVCN & Chữ ký
      teacherCommentBox +
      signaturesHtml +

    '</div>';
  }

  // ================= TRƯỜNG HỢP 2: THÁNG, HỌC KỲ, CẢ NĂM (PHÂN TRANG 2 TRANG A4 CHUẨN XÁC) =================
  return '<div class="bienban-page" style="font-family:\'Times New Roman\',Times,serif; font-size:11.5pt; line-height:1.25; color:#000000; background:#ffffff; padding:0; margin:0;">' +

    // -------- TRANG 1 --------
    '<div class="bb-page bb-page-1">' +
      docHeaderHtml +
      titleBlockHtml +
      studentInfoHtml +

      // Phần II: Kết quả điểm thi đua kỳ
      '<div class="bb-section-title" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; margin-top:6px; margin-bottom:3px;">II. TỔNG HỢP KẾT QUẢ ĐIỂM THI ĐUA:</div>' +
      scoreTableHtml +

      // Bảng điểm từng tuần
      sbBuildWeekTable(student.id, periodType, periodValue) +

      // Phần III: Tổng hợp việc tốt / điểm cộng (gom theo tiêu chí)
      '<div class="bb-section-title" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; margin-top:8px; margin-bottom:3px;">III. TỔNG HỢP CÁC MẶT TÍCH CỰC &amp; VIỆC TỐT ĐẠT ĐIỂM CỘNG:</div>' +
      '<table class="bienban-table" style="font-size:9.5pt;">' +
        plusTableHeader +
        '<tbody>' + sbBuildPlusSummaryRows(plusEvents, criteria, periodType) + '</tbody>' +
      '</table>' +

      // Chú thích chân trang 1
      '<div style="text-align:right; font-size:8.5pt; font-style:italic; color:#64748b; margin-top:4px;">' +
        '(Phiếu gồm 02 trang • Xem tiếp Trang 2: Chi tiết vi phạm nội quy, Dự kiến xếp loại TT22, Nhận xét GVCN &amp; Chữ ký xác nhận)' +
      '</div>' +
    '</div>' +

    // -------- ĐƯỜNG PHÂN CÁCH TRỰC QUAN MÀN HÌNH PREVIEW --------
    '<div class="sb-screen-only-divider" style="border-top:2px dashed #94a3b8; margin:22px -30px 18px; text-align:center;">' +
      '<span style="background:#f1f5f9; color:#475569; font-size:8.5pt; font-weight:bold; padding:2px 14px; border-radius:999px; position:relative; top:-9px; border:1px solid #cbd5e1; font-family:sans-serif; letter-spacing:0.5px;">--- HẾT TRANG 1 • BẮT ĐẦU TRANG 2 ---</span>' +
    '</div>' +

    // -------- NGẮT TRANG PDF / IN ẤN THỰC TẾ --------
    '<div class="html2pdf__page-break"></div>' +

    // -------- TRANG 2 --------
    '<div class="bb-page bb-page-2">' +
      // Tiêu đề phụ đầu trang 2
      '<div class="bb-page2-subhead" style="display:table; width:100%; border-bottom:1px solid #000; padding-bottom:3px; margin-bottom:6px; font-size:9pt;">' +
        '<div style="display:table-cell; width:50%; text-align:left;"><b>UBND XÃ TÂY PHÚ - TRƯỜNG THCS TÂY PHÚ</b></div>' +
        '<div style="display:table-cell; width:50%; text-align:right;"><b>PHIẾU THEO DÕI RÈN LUYỆN (Trang 2/2)</b> - HS: <b>' + student.name + '</b></div>' +
      '</div>' +

      // Phần IV: Chi tiết các lần vi phạm nội quy (Toàn bộ vi phạm nằm đầu trang 2)
      '<div class="bb-section-title" style="font-size:10.5pt; font-weight:bold; text-transform:uppercase; margin-bottom:3px;">IV. CHI TIẾT CÁC LẦN VI PHẠM NỘI QUY CẦN KHẮC PHỤC:</div>' +
      '<table class="bienban-table" style="font-size:9.5pt;">' +
        '<thead>' +
          '<tr>' +
            '<th style="width:6%;">TT</th>' +
            '<th style="width:20%;">Thời gian ghi nhận</th>' +
            '<th style="width:10%;">Buổi</th>' +
            '<th style="width:32%;">Nội dung vi phạm</th>' +
            '<th style="width:22%;">Ghi chú cụ thể</th>' +
            '<th style="width:10%;" class="center">Điểm trừ</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' + sbBuildMinusDetailRows(minusEvents, criteria) + '</tbody>' +
      '</table>' +

      // Phần V: Dự kiến xếp loại TT22
      sbBuildTT22Block(td22, periodLabel) +

      // Phần VI: Ý kiến / Nhận xét của Giáo viên chủ nhiệm
      teacherCommentBox +

      // Phần VII: Chữ ký 3 bên
      signaturesHtml +
    '</div>' +

  '</div>';
}

// ================= CONTROLLER ĐIỀU KHIỂN GIAO DIỆN BIÊN BẢN =================
var StudentBienBanController = {
  currentStudentId: null,
  currentPeriodType: 'week',
  currentPeriodValue: 1,

  _checkAdmin: function() {
    return Boolean(
      window.authManager &&
      typeof window.authManager.canViewStudentBienBan === 'function' &&
      window.authManager.canViewStudentBienBan()
    );
  },

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
            'Dự kiến TT22: <b>' + rv.display + '</b>' +
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

    // Ép buộc hướng in A4 portrait bằng style động
    var styleId = 'dynamic-bienban-print-style';
    var existStyle = document.getElementById(styleId);
    if (!existStyle) {
      existStyle = document.createElement('style');
      existStyle.id = styleId;
      existStyle.innerHTML = '@page { size: A4 portrait !important; margin: 10mm 12mm 10mm 15mm !important; }';
      document.head.appendChild(existStyle);
    }

    // Đưa nội dung vào print-area chuyên biệt cho biên bản cá nhân
    var printArea = document.getElementById('student-bienban-print-area');
    if (printArea) {
      printArea.innerHTML = container.innerHTML;
      // Xóa triệt để đường phân cách màn hình preview
      printArea.querySelectorAll('.sb-screen-only-divider').forEach(function(el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    }

    // Kích hoạt lớp in ấn trên thẻ body
    document.body.classList.add('printing-student-bienban');

    // Tự động dọn dẹp sau khi in xong
    var cleanup = function() {
      document.body.classList.remove('printing-student-bienban');
      var s = document.getElementById(styleId);
      if (s && s.parentNode) s.parentNode.removeChild(s);
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);

    // Bộ hẹn giờ dự phòng dọn dẹp nếu trình duyệt không phát sự kiện afterprint
    setTimeout(cleanup, 6000);

    // Kích hoạt lệnh in gốc
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

    // Tạo overlay căn giữa màn hình (0,0) - TUYỆT ĐỐI KHÔNG DÙNG left:-9999px gây lệch toạ độ
    var overlay = document.createElement('div');
    overlay.id = 'pdf-render-overlay';
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15,23,42,0.85); z-index:999999; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; overflow-y:auto; padding:20px; box-sizing:border-box;';

    var msg = document.createElement('div');
    msg.style.cssText = 'color:#fde047; font-weight:800; font-size:13pt; margin-bottom:12px; font-family:sans-serif; text-align:center;';
    msg.innerHTML = '📄 Đang tạo file PDF chuẩn A4 cho em ' + student.name + '...';
    overlay.appendChild(msg);

    var paper = document.createElement('div');
    paper.id = 'pdf-paper-render';
    paper.style.cssText = 'width:760px; min-width:760px; max-width:760px; background:#ffffff; padding:0; margin:0; box-sizing:border-box; color:#000000; box-shadow:0 10px 30px rgba(0,0,0,0.5);';
    paper.innerHTML = container.innerHTML;

    // Xóa triệt để đường phân cách màn hình preview khỏi bản in PDF
    paper.querySelectorAll('.sb-screen-only-divider').forEach(function(el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });

    // Bỏ contenteditable
    paper.querySelectorAll('[contenteditable]').forEach(function(el) {
      el.removeAttribute('contenteditable');
    });

    overlay.appendChild(paper);
    document.body.appendChild(overlay);

    var periodLabel = sbGetPeriodLabel(this.currentPeriodType, this.currentPeriodValue);
    var cleanName = student.name.replace(/\s+/g, '_');
    var cleanPeriod = periodLabel.replace(/\s+/g, '_');
    var fname = 'PhieuThiDua_' + cleanName + '_' + cleanPeriod + '.pdf';

    var opt = {
      margin: [8, 8, 8, 8],
      filename: fname,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        width: 760,
        windowWidth: 760,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    window.html2pdf().set(opt).from(paper).save()
      .then(function() {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        if (window.chibiSound) window.chibiSound.playPlus();
        if (window.chibiNotifications) {
          window.chibiNotifications.showToast('Xuất PDF thành công! 📕', 'Đã tải về: ' + fname, 'success');
        }
      })
      .catch(function(err) {
        console.warn('PDF export error:', err);
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
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
    var student = window.classData ? window.classData.getStudentById(this.currentStudentId) : null;
    if (!container || !student) return;

    var clone = container.cloneNode(true);
    clone.style.padding = '0';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';

    // Xóa đường phân cách preview
    clone.querySelectorAll('.sb-screen-only-divider').forEach(function(el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });

    clone.querySelectorAll('[contenteditable]').forEach(function(el) {
      el.removeAttribute('contenteditable');
    });

    var periodLabel = sbGetPeriodLabel(this.currentPeriodType, this.currentPeriodValue);
    var cleanName = student.name.replace(/\s+/g, '_');
    var cleanPeriod = periodLabel.replace(/\s+/g, '_');
    var fname = 'PhieuThiDua_' + cleanName + '_' + cleanPeriod + '.doc';

    var docHtml = clone.innerHTML.replace(
      /<div class="html2pdf__page-break"><\/div>/g,
      '<br clear="all" style="page-break-before:always; mso-special-character:line-break;">'
    );

    var blob = this._makeWordBlob(docHtml, fname);
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
    var fname = 'PhieuThiDua_ToanLop9A4_' + periodLabel.replace(/\s+/g, '_') + '.doc';

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

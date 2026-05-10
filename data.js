// data.js — 資料層
//
// 設計：
//   - 公式單位（標準 SI、地震規模）寫在這份 JS 內，因為要用程式碼定義 toJ/fromJ
//   - 譬喻單位、預設、CO₂ 係數放在 data/*.csv，使用者可用 Excel 直接編輯
//   - 啟動時呼叫 loadData() 拼起來回傳 { UNITS, PRESETS, EMISSION_FACTORS }
//
// 想新增/刪除/編輯資料？請看 DATA_GUIDE.md

// ───── 換算常數 ─────────────────────────────────────────
export const J_PER_CAL     = 4.184;          // thermochemical cal
export const J_PER_KCAL    = 4184;
export const J_PER_KWH     = 3_600_000;
export const J_PER_TON_TNT = 4.184e9;
export const J_PER_HP_S    = 745.7;
export const EV_PER_J      = 6.24150974e18;

// ───── 標準單位（公式定義，不可從 CSV 編輯）────────────
const STANDARD_UNITS = {
  joule:   { label:'焦耳 J',           category:'standard', toJ:v=>v,                  fromJ:j=>j },
  cal:     { label:'卡 cal',           category:'standard', toJ:v=>v*J_PER_CAL,        fromJ:j=>j/J_PER_CAL },
  kcal:    { label:'大卡 kcal',        category:'standard', toJ:v=>v*J_PER_KCAL,       fromJ:j=>j/J_PER_KCAL },
  erg:     { label:'爾格 erg',         category:'standard', toJ:v=>v*1e-7,             fromJ:j=>j*1e7 },
  ev:      { label:'電子伏特 eV',      category:'standard', toJ:v=>v/EV_PER_J,         fromJ:j=>j*EV_PER_J },
  kwh:     { label:'千瓦小時 kWh',     category:'standard', toJ:v=>v*J_PER_KWH,        fromJ:j=>j/J_PER_KWH },
  ton_tnt: { label:'噸 TNT',           category:'standard', toJ:v=>v*J_PER_TON_TNT,    fromJ:j=>j/J_PER_TON_TNT },
  hp_s:    { label:'馬力·秒 hp·s',     category:'standard', toJ:v=>v*J_PER_HP_S,       fromJ:j=>j/J_PER_HP_S },
  // 地震規模（對數）
  richter: { label:'芮氏地震規模 ML',   category:'standard',
             toJ:  v => Math.pow(10, 11.8 + 1.5*v) / 1e7,
             fromJ:j => (Math.log10(j*1e7) - 11.8) / 1.5 },
  mw:      { label:'USGS 地震矩規模 Mw', category:'standard',
             toJ:  v => Math.pow(10, 1.5*v + 4.8),
             fromJ:j => (Math.log10(j) - 4.8) / 1.5 },
};

// ───── CSV 解析（支援註解 # 開頭、引號包字段、UTF-8 BOM）──
function parseCSV(text){
  // 去 BOM
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  const lines = text.split(/\r?\n/);
  // 找第一個非註解非空白的列當 header
  let headerIdx = -1;
  for (let i = 0; i < lines.length; i++){
    const t = lines[i].trim();
    if (t && !t.startsWith('#')) { headerIdx = i; break; }
  }
  if (headerIdx < 0) return [];
  const headers = splitCsvLine(lines[headerIdx]);
  const rows = [];
  for (let i = headerIdx + 1; i < lines.length; i++){
    const t = lines[i].trim();
    if (!t || t.startsWith('#')) continue;
    const cells = splitCsvLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => { row[h] = (cells[idx] ?? '').trim(); });
    rows.push(row);
  }
  return rows;
}

function splitCsvLine(line){
  const out = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++){
    const c = line[i];
    if (inQ){
      if (c === '"'){
        if (line[i+1] === '"'){ cur += '"'; i++; }   // escaped quote
        else { inQ = false; }
      } else {
        cur += c;
      }
    } else {
      if (c === ','){ out.push(cur); cur = ''; }
      else if (c === '"'){ inQ = true; }
      else { cur += c; }
    }
  }
  out.push(cur);
  return out;
}

// ───── 載入 CSV → 拼成最終物件 ─────────────────────────
async function fetchCSV(path){
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: HTTP ${res.status}`);
  return parseCSV(await res.text());
}

function parseBool(v){ return /^(true|1|yes|y|是)$/i.test(String(v).trim()); }
function parseNum(v){
  const n = Number(String(v).trim());
  return isFinite(n) ? n : NaN;
}

// joulesEach 接受兩種格式：
//   "2803280"           → 單一數值（Number）
//   "2594080~3012480"   → 區間（{low, high}）
// 回傳 null 表示無效
function parseJoulesEach(v){
  const s = String(v).trim();
  if (!s) return null;
  if (s.includes('~')){
    const parts = s.split('~').map(p => parseNum(p));
    if (parts.length !== 2 || !parts.every(n => isFinite(n) && n > 0)) return null;
    return { low: Math.min(parts[0], parts[1]), high: Math.max(parts[0], parts[1]) };
  }
  const n = parseNum(s);
  return (isFinite(n) && n > 0) ? n : null;
}

export async function loadData(){
  const [referenceRows, presetRows, emisRows] = await Promise.all([
    fetchCSV('./data/energy_references.csv'),
    fetchCSV('./data/presets.csv'),
    fetchCSV('./data/emissions.csv'),
  ]);

  // 譬喻 / 參考單位
  const referenceUnits = {};
  for (const r of referenceRows){
    if (!r.key) continue;
    const joulesEach = parseJoulesEach(r.joulesEach);
    if (joulesEach === null){
      console.warn('Skipped fun unit with invalid joulesEach:', r);
      continue;
    }
    const u = {
      label: r.label || r.key,
      category: 'fun',
      emoji: r.emoji || '·',
      joulesEach,
    };
    if (r.note) u.note = r.note;
    if (r.source) u.source = r.source;
    if (r.original_value) u.originalValue = r.original_value;
    if (r.archive_path) u.archivePath = r.archive_path;
    if (parseBool(r.override)) u.override = true;
    referenceUnits[r.key] = u;
  }

  const UNITS = { ...STANDARD_UNITS, ...referenceUnits };

  // 預設事件
  const PRESETS = [];
  for (const r of presetRows){
    if (!r.label || !r.unit) continue;
    const value = parseNum(r.value);
    if (!isFinite(value)){
      console.warn('Skipped preset with invalid value:', r);
      continue;
    }
    if (!UNITS[r.unit]){
      console.warn(`Preset "${r.label}" 引用了不存在的單位 "${r.unit}"，跳過`);
      continue;
    }
    const p = {
      group: r.group || '其他',
      label: r.label,
      emoji: r.emoji || '·',
      unit: r.unit,
      value,
    };
    if (r.note) p.note = r.note;
    if (parseBool(r.override)) p.override = true;
    PRESETS.push(p);
  }

  // 排放係數
  const EMISSION_FACTORS = [];
  for (const r of emisRows){
    if (!r.key) continue;
    const k = parseNum(r.kgCO2_per_TJ);
    if (!isFinite(k) || k <= 0) continue;
    const f = {
      key: r.key,
      label: r.label || r.key,
      emoji: r.emoji || '·',
      kgCO2_per_TJ: k,
    };
    if (r.source) f.source = r.source;
    if (r.archive_path) f.archivePath = r.archive_path;
    EMISSION_FACTORS.push(f);
  }

  return { UNITS, PRESETS, EMISSION_FACTORS };
}

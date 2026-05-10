import { loadData } from './data.js';

// ───── DOM ─────────────────────────────────────────────
const valueInput  = document.getElementById('value-input');
const unitSelect  = document.getElementById('unit-select');
const presetList  = document.getElementById('preset-list');
const copyBtn     = document.getElementById('copy-share');
const stdResults  = document.getElementById('standard-results');
const funResults  = document.getElementById('fun-results');
const co2Results  = document.getElementById('co2-results');

// ───── 全域：等 loadData() 後填入 ───────────────────────
let UNITS = {};
let PRESETS = [];
let EMISSION_FACTORS = [];

// ───── Helpers：toJ / fromJ for any unit ────────────────
// 區間檢查
function isRange(v){ return v && typeof v === 'object' && 'low' in v && 'high' in v; }

function unitToJ(key, v){
  const u = UNITS[key];
  if (u.toJ) return u.toJ(v);
  // 區間單位作為輸入：用中位數
  const each = isRange(u.joulesEach)
    ? (u.joulesEach.low + u.joulesEach.high) / 2
    : u.joulesEach;
  return v * each;
}
function unitFromJ(key, j){
  const u = UNITS[key];
  if (u.fromJ) return u.fromJ(j);
  if (isRange(u.joulesEach)){
    // 較大的 joulesEach → 數量較少；所以 low_count = j/high, high_count = j/low
    return { low: j / u.joulesEach.high, high: j / u.joulesEach.low };
  }
  return j / u.joulesEach;
}

// ───── 數字格式化（科學記號 / 千分位 / 有效位數）─────
const SUPER = {'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
function toSuperscript(s){
  return s.replace(/^\+?0*/,'').replace(/[-\d]/g, c => SUPER[c] || c);
}
function formatNumber(n){
  if (!isFinite(n)) return '—';
  if (n === 0) return '0';
  const a = Math.abs(n);
  if (a < 1e-3 || a >= 1e7){
    const [mantissa, exp] = n.toExponential(2).split('e');
    return `${mantissa} × 10${toSuperscript(exp)}`;
  }
  if (a >= 1000){
    return n.toLocaleString('zh-TW', { maximumFractionDigits: 2 });
  }
  return Number(n.toPrecision(4)).toString();
}
// 通用值格式化：支援 number 或 {low, high}
function formatValue(v){
  if (isRange(v)) return `${formatNumber(v.low)} ~ ${formatNumber(v.high)}`;
  return formatNumber(v);
}

// ───── 中文計算單位（萬 / 億 / 兆 / 京）─────────────────
// 顯示在科學記號下方，幫助直觀理解大數
function chineseUnitBody(n){
  if (!isFinite(n) || n === 0) return '';
  const a = Math.abs(n);
  if (a < 1e4 || a >= 1e20) return '';
  let divisor, unit;
  if (a < 1e8)        { divisor = 1e4;  unit = '萬'; }
  else if (a < 1e12)  { divisor = 1e8;  unit = '億'; }
  else if (a < 1e16)  { divisor = 1e12; unit = '兆'; }
  else                { divisor = 1e16; unit = '京'; }
  const v = a / divisor;
  const sign = n < 0 ? '-' : '';
  let body;
  if (v >= 1000)       body = v.toLocaleString('zh-TW', { maximumFractionDigits: 0 });
  else if (v >= 100)   body = v.toFixed(0);
  else if (v >= 10)    body = v.toFixed(1);
  else                 body = v.toFixed(2);
  return `${sign}${body} ${unit}`;
}
function formatChineseUnit(n){
  const body = chineseUnitBody(n);
  return body ? `≈ ${body}` : '';
}
function formatChineseRange(low, high){
  const lo = chineseUnitBody(low);
  const hi = chineseUnitBody(high);
  if (!lo && !hi) return '';
  if (lo && hi){
    // 同單位（萬/億/兆/京）就只標一次
    const loUnit = lo.split(' ').pop();
    const hiUnit = hi.split(' ').pop();
    if (loUnit === hiUnit){
      const loNum = lo.replace(' ' + loUnit, '');
      return `≈ ${loNum} ~ ${hi}`;
    }
    return `≈ ${lo} ~ ${hi}`;
  }
  return `≈ ${lo || ''}${lo && hi ? ' ~ ' : ''}${hi || ''}`;
}
function formatChineseValue(v){
  if (isRange(v)) return formatChineseRange(v.low, v.high);
  return formatChineseUnit(v);
}

// ───── Count-up 動畫 ────────────────────────────────
const _anims = new WeakMap();
function animateNumber(mainEl, chineseEl, target, duration = 250){
  const prev = _anims.get(mainEl);
  if (prev) cancelAnimationFrame(prev.raf);

  // 區間值：直接 snap，不動畫
  if (isRange(target)){
    _anims.delete(mainEl);
    mainEl.textContent = formatValue(target);
    delete mainEl.dataset.value;          // 清除以避免下次數值動畫從錯誤起點開始
    if (chineseEl) chineseEl.textContent = formatChineseValue(target);
    return;
  }

  const start = parseAnimatedValue(mainEl);
  if (start === null){
    mainEl.textContent = formatNumber(target);
    mainEl.dataset.value = String(target);
    if (chineseEl) chineseEl.textContent = formatChineseUnit(target);
    return;
  }
  if (start === target) return;
  const t0 = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const cur = start + (target - start) * eased;
    mainEl.textContent = formatNumber(cur);
    mainEl.dataset.value = String(cur);
    if (chineseEl) chineseEl.textContent = formatChineseUnit(cur);
    if (t < 1){
      _anims.set(mainEl, { raf: requestAnimationFrame(step) });
    } else {
      mainEl.dataset.value = String(target);
      if (chineseEl) chineseEl.textContent = formatChineseUnit(target);
      _anims.delete(mainEl);
    }
  };
  _anims.set(mainEl, { raf: requestAnimationFrame(step) });
}
function parseAnimatedValue(el){
  const raw = el.dataset.value;
  if (raw === undefined) return null;
  const n = Number(raw);
  return isFinite(n) ? n : null;
}

// ───── 渲染：UNIT 下拉、預設按鈕 ────────────────────
function renderUnitSelect(){
  const groups = [
    { label:'正規單位',     keys:Object.keys(UNITS).filter(k => UNITS[k].category === 'standard') },
    { label:'親近的譬喻',   keys:Object.keys(UNITS).filter(k => UNITS[k].category === 'fun') },
  ];
  unitSelect.innerHTML = '';
  for (const g of groups){
    const og = document.createElement('optgroup');
    og.label = g.label;
    for (const k of g.keys){
      const opt = document.createElement('option');
      opt.value = k;
      const u = UNITS[k];
      opt.textContent = u.emoji ? `${u.emoji} ${u.label}` : u.label;
      og.appendChild(opt);
    }
    unitSelect.appendChild(og);
  }
}

function renderPresets(){
  const byGroup = new Map();
  for (const p of PRESETS){
    if (!byGroup.has(p.group)) byGroup.set(p.group, []);
    byGroup.get(p.group).push(p);
  }
  presetList.innerHTML = '';
  for (const [group, items] of byGroup){
    const wrap = document.createElement('div');
    wrap.className = 'preset-group';
    const heading = document.createElement('div');
    heading.className = 'preset-group-title';
    heading.textContent = group;
    wrap.appendChild(heading);
    for (const p of items){
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-btn';
      btn.innerHTML = `<span class="preset-emoji">${p.emoji}</span><span class="preset-label">${p.label}</span>`;
      if (p.override) btn.title = p.note || '此值為權威值覆蓋';
      btn.addEventListener('click', () => {
        unitSelect.value = p.unit;
        valueInput.value = String(p.value);
        recompute();
      });
      wrap.appendChild(btn);
    }
    presetList.appendChild(wrap);
  }
}

// ───── 結果卡片骨架（首次建立，後續只更新 value）─────
function buildResultRow(container, key, u){
  const row = document.createElement('div');
  row.className = 'result-row';
  row.dataset.key = key;
  row.innerHTML = `
    <span class="result-label">${u.emoji ? u.emoji + ' ' : ''}${u.label}</span>
    <div class="result-value-wrap">
      <span class="result-value" data-cell></span>
      <span class="chinese-unit" data-chinese></span>
    </div>
  `;
  if (u.override) {
    row.classList.add('has-override');
    row.title = u.note || '此值為權威值覆蓋';
    row.querySelector('.result-label').insertAdjacentHTML('beforeend', ' <span class="override-mark" title="' + (u.note || '此值為權威值覆蓋') + '">ⓘ</span>');
  }
  container.appendChild(row);
  return {
    main: row.querySelector('[data-cell]'),
    chinese: row.querySelector('[data-chinese]'),
  };
}
function buildFunCard(container, key, u){
  const card = document.createElement('div');
  card.className = 'fun-card';
  card.dataset.key = key;
  card.innerHTML = `
    <div class="fun-emoji">${u.emoji || '·'}</div>
    <div class="fun-text">
      <div class="fun-label">${u.label}</div>
      <div class="fun-value"><span data-cell></span><span class="fun-suffix"> 個 / 份</span></div>
      <div class="chinese-unit" data-chinese></div>
    </div>
  `;
  if (u.override) {
    card.classList.add('has-override');
    card.title = u.note || '此值為權威值覆蓋';
  }
  container.appendChild(card);
  return {
    main: card.querySelector('[data-cell]'),
    chinese: card.querySelector('[data-chinese]'),
  };
}
function buildCo2Row(container, factor){
  const row = document.createElement('div');
  row.className = 'result-row co2-row';
  row.innerHTML = `
    <span class="result-label">${factor.emoji} ${factor.label}</span>
    <div class="result-value-wrap">
      <span class="result-value"><span data-cell></span><span class="result-suffix"> 公斤 CO₂</span></span>
      <span class="chinese-unit" data-chinese></span>
    </div>
  `;
  container.appendChild(row);
  return {
    main: row.querySelector('[data-cell]'),
    chinese: row.querySelector('[data-chinese]'),
  };
}

// ───── 結果儲存：cell 對應表 ─────────────────────────
const cellMap = {};
function renderResultSkeletons(){
  stdResults.innerHTML = '';
  funResults.innerHTML = '';
  co2Results.innerHTML = '';
  for (const k in UNITS){
    const u = UNITS[k];
    if (u.category === 'standard'){
      cellMap[k] = buildResultRow(stdResults, k, u);
    } else {
      cellMap[k] = buildFunCard(funResults, k, u);
    }
  }
  for (const f of EMISSION_FACTORS){
    cellMap['co2_' + f.key] = buildCo2Row(co2Results, f);
  }
}

// ───── 主換算 ───────────────────────────────────────
function recompute(){
  const v = parseFloat(valueInput.value);
  const inputKey = unitSelect.value;
  if (!isFinite(v) || !UNITS[inputKey]){
    for (const k in cellMap){
      cellMap[k].main.textContent = '—';
      if (cellMap[k].chinese) cellMap[k].chinese.textContent = '';
    }
    return;
  }
  const joules = unitToJ(inputKey, v);

  for (const k in UNITS){
    const cell = cellMap[k];
    if (k === inputKey){
      cell.main.textContent = formatNumber(v);
      cell.main.dataset.value = String(v);
      if (cell.chinese) cell.chinese.textContent = formatChineseUnit(v);
      continue;
    }
    const out = unitFromJ(k, joules);
    animateNumber(cell.main, cell.chinese, out);
  }

  for (const f of EMISSION_FACTORS){
    const kg = (joules * f.kgCO2_per_TJ) / 1e9;
    const cell = cellMap['co2_' + f.key];
    animateNumber(cell.main, cell.chinese, kg);
  }
}

// ───── URL share round-trip ─────────────────────────
function loadFromUrl(){
  const p = new URLSearchParams(location.search);
  const u = p.get('u'), v = p.get('v');
  if (u && v && UNITS[u] && isFinite(Number(v))){
    unitSelect.value = u;
    valueInput.value = v;
    return true;
  }
  return false;
}
function buildShareUrl(){
  const url = new URL(location.href);
  url.search = new URLSearchParams({ u: unitSelect.value, v: valueInput.value }).toString();
  return url.toString();
}

// ───── 事件繫結 ─────────────────────────────────────
function bindEvents(){
  valueInput.addEventListener('input', recompute);
  unitSelect.addEventListener('change', recompute);
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(buildShareUrl());
      const original = copyBtn.textContent;
      copyBtn.textContent = '✓ 已複製';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = original;
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (e){
      copyBtn.textContent = '⚠ 複製失敗';
      setTimeout(() => copyBtn.textContent = '🔗 複製分享連結', 2000);
    }
  });
}

// ───── Boot：先讀 CSV，再渲染 ─────────────────────────
async function boot(){
  try {
    const data = await loadData();
    UNITS = data.UNITS;
    PRESETS = data.PRESETS;
    EMISSION_FACTORS = data.EMISSION_FACTORS;

    renderUnitSelect();
    renderPresets();
    renderResultSkeletons();
    bindEvents();
    if (!loadFromUrl()){
      unitSelect.value = 'richter';
      valueInput.value = '7.3';
    }
    recompute();
  } catch (err){
    console.error(err);
    document.body.innerHTML = `
      <div style="padding:40px;text-align:center;color:#fff;">
        <h2>⚠ 載入資料失敗</h2>
        <p>請確認透過 HTTP 開啟（不是直接點 index.html）。</p>
        <p style="font-family:monospace;background:rgba(0,0,0,0.2);padding:12px;border-radius:8px;display:inline-block;">cd C:\\@Workspace\\EenrgyCalculator<br>python -m http.server 8765</p>
        <p style="margin-top:16px;font-size:13px;opacity:0.8;">技術細節：${err.message}</p>
      </div>`;
  }
}

boot();

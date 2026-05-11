# 開發進度紀錄

最後更新：2026-05-11

---

## ✅ 目前已完成

### 資料層（CSV 為主）

- **`data/energy_references.csv`** — 71 條目，11 章分類：
  - A 食物熱量（5 午餐 + 4 點心）
  - B 人體 / 運動（BMR、脂肪、跑/騎/游、馬拉松、鐵人）
  - C 日常電子 / 家電（iPhone、筆電、熱水壺、冷氣）
  - D 交通運輸（機車、Tesla、高鐵）
  - E 燃料（木炭、汽油、LPG、LNG、U-235）
  - F 發電（核四、火力、燃氣 1hr / 水力、風力、太陽 全年）
  - G 武器（鑽地 → 鋁熱 → 原子 → 熱核，共 8）
  - H 災害 / 爆炸事件（八仙、高雄氣爆、貝魯特、觀塘、通古斯）
  - I 地震（8 筆，含 921 / 美濃 / 311 / 汶川 / 南亞海嘯 等）
  - J 自然 / 工程（閃電、Saturn V、Falcon 9/Heavy、Starship、颱風）
  - K 微觀 / 宇宙（LHC 質子 → 天照粒子 → 日照 → 太陽輸出 → 超新星）
- **`data/presets.csv`** — 預設按鈕，已用「指向 ref key + value=1」自動連動 energy_references
- **`data/emissions.csv`** — IPCC 2006 8 種化石燃料排放係數

### 程式層

- **`data.js`** — CSV async loader、區間值（X~Y）解析、5 種地震規模公式（ML/Ms/mb/Mw/Mj）
- **`script.js`** — recompute、formatNumber、formatChineseUnit（萬/億/兆/京）、count-up 動畫、URL share、地震面板雙向同步
- **`style.css`** — GRB token + 1100px 兩欄 + RWD + 地震面板橘色 accent
- **`index.html`** — 含「🌏 地震規模快速輸入」獨立面板（自動偵測 UNITS 內含「規模」標籤）

### Reference 引用庫

- **`Reference/papers/`**（8 學術論文 PDF）：Ainsworth 2011 + SDC1、Hall 2008、Hanks-Kanamori 1979、Kopp & Lean 2011、Pilger 2021 (Beirut)、Selby 2021 (Trinity)、Telescope Array 2023
- **`Reference/gov/`**（2 政府 PDF）：MOE 學校午餐 109.12.28 修訂版、IPCC 2006 Vol 2 Ch 1
- **`Reference/web/`**（48 HTML 快照）：所有 Wikipedia / NOAA / 食藥署 / 經濟部能源署等網頁，含 archived timestamp 標頭
- **`Reference/REFERENCES.md`** — 完整 APA 7th 引用清單（含中文翻譯）+ 引用對照速查表
- **`Reference/PENDING_DOWNLOADS.md`** — 已全部解決
- **`Reference/CANDIDATES.md`** — 第二輪研究的候選清單（已全數採納）

### 文件

- **`README.md`**、**`DATA_GUIDE.md`** — 含「⭐ 連動原則」段落

---

## ⚠️ 下次回來可考慮的事項

### 1. 資料驗證 / 微調（看時間）

- **`lpg`** 條目：目前 37.86 MJ/L，但液態 LPG 典型熱值約 25.6 MJ/L（Wikipedia LPG）。37.86 MJ/L 較接近燃油類。要不要改用 25.6 MJ/L 並加 source？
- **`charcoal_kg`**、**`falcon_9_block_5`**、**`falcon_heavy`**、**`starship`**：當初 user 自加，數值未經 cite-apa 流程驗證。可用 CrossRef / Wikipedia 對一輪。
- **`taoyuan_hr`** archive_path 目前指 `zhwiki_datan_power_plant.html`（與 taichung 共用），可能要找台電大潭專屬頁。

### 2. UI / 功能擴充候選

- 地震面板可考慮加「最近 24h 國內地震」按鈕（接 CWA Open Data API），但會引入 fetch 依賴
- 「複製分享連結」可加 og:image 動態生成（爆炸圖示 + 規模文字），社群分享更吸睛
- 譬喻卡片 emoji 重複的（`💣` 一堆、`🔥` 一堆）可細分；之前考慮過但維持現狀以保簡潔
- CO₂ 子卡可加「= X 棵樹一年吸收量」對照（讓 CO₂ 也有譬喻感）

### 3. 部署

- 還沒實際推到 GitHub Pages。要做時：
  1. 在 GitHub 開新 repo（公開）
  2. `git init` + push（注意排除 `Reference/` 是否要納版控？檔案 ~30MB）
  3. Repo Settings → Pages → main / root
  4. 手機驗證 RWD

### 4. 新類別研究（CANDIDATES.md 列待研究但未做的）

- 大屯山火山活動估計能量（地質研究）
- 921 集集 USGS Mw 7.6 vs CWA ML 7.3 的差異與比較
- 全球一年化石燃料燃燒總能量（IEA）
- 地球公轉動能、地球大氣層全部動能（天文）
- 太陽一秒釋放總輻射（光度 = 3.828e26 W）

---

## 📌 怎麼回到工作狀態

```powershell
cd C:\@Workspace\EenrgyCalculator
python -m http.server 8765
# 開瀏覽器 http://127.0.0.1:8765/
```

主要檔案結構速查：
```
data/                ← 編輯資料的地方（CSV）
data.js              ← 公式單位 + CSV loader
script.js            ← UI 邏輯
style.css            ← 樣式
index.html           ← 結構
DATA_GUIDE.md        ← 編輯說明
Reference/
  REFERENCES.md      ← 全部引用 APA 清單
  papers/            ← 學術 PDF
  gov/               ← 政府 PDF
  web/               ← 網頁快照
能量計算機.xlsx        ← 原始試算表（保留作備份）
```

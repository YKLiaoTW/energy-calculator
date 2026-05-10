# 📝 資料管理指南

所有可編輯的資料都放在 `data/` 目錄底下，共三份 CSV 檔。**用 Excel 直接打開、編輯、存檔，重新整理網頁就會看到變更。**

```
data/
├── presets.csv     ← 左側「快速範例」按鈕
├── energy_references.csv   ← 右側「親近的譬喻」卡片（廣島核彈、營養午餐⋯）
└── emissions.csv   ← 最下方 CO₂ 排放係數
```

> **重要**：CSV 已用 UTF-8 with BOM 編碼，新版 Excel 會自動正確顯示中文與 emoji。如果存檔時 Excel 問你選哪種格式，選 **「CSV UTF-8 (逗號分隔)」**。

---

## 三種常見操作

### ✂️ 我想刪除某筆資料（例：太陽花學運）

1. 用 Excel 打開 `data/presets.csv`
2. 找到「太陽花學運」那一列，整列刪掉
3. 用 Excel 打開 `data/energy_references.csv`
4. 找到 `sunflower` 那一列（key 欄），整列刪掉
5. 存檔 → 重新整理網頁

> 注意順序：先刪預設按鈕、再刪譬喻單位。如果譬喻單位被預設按鈕引用了還沒刪，網頁會在 console 印警告（但不會壞）。

### ➕ 我想新增一筆地震預設（例：2025 某地震 規模 6.8）

1. 用 Excel 打開 `data/presets.csv`
2. 在「地震」分組中加一列：`地震,2025 某地震,🇹🇼,richter,6.8,,`
3. 存檔 → 重新整理網頁

### ✏️ 我想修改某個值（例：把廣島核彈從 16 kt 改成 15 kt）

1. 用 Excel 打開 `data/energy_references.csv`
2. 找 `hiroshima` 那一列
3. 把 `joulesEach` 欄的 `6.6944e13` 改成 `6.276e13`（= 15000 × 4.184e9）
4. 存檔 → 重新整理網頁

---

## 三份 CSV 的欄位說明

### `data/presets.csv` — 預設按鈕

| 欄位 | 說明 | 範例 |
|---|---|---|
| `group` | 分組標籤（按鈕區會依此分區） | `地震` / `武器` / `食物` |
| `label` | 按鈕上顯示的文字 | `1999 集集 921` |
| `emoji` | 按鈕左側的圖示 | `🇹🇼` |
| `unit` | 填入的單位 key（**含 energy_references.csv 的 key**） | `richter` / `ton_tnt` / `hiroshima` |
| `value` | 填入的數值（可用科學記號 `6.006e12`） | `7.3` 或 `1` |
| `note` | 滑鼠停留的提示文字（可空） | `xlsx 9000 cal/L 顯誤` |
| `override` | 標 `true` 會在按鈕上顯示 ⓘ 提示（可空） | `true` |

#### ⭐ 連動原則：unit 直接寫 ref key

預設可以對應到 `energy_references.csv` 單一條目時，**直接把 `unit` 寫該 key、`value=1`**，這樣改 energy_references 數值會自動連動到預設按鈕的能量值。

```csv
# 推薦寫法（連動 energy_references）
武器,廣島核彈,💣,hiroshima,1,,
燃料,LNG 1 公升液態,🛢️,lng_l,1,,
電力,核四 1 小時發電,⚡,nuke4_hr,1,,

# 不推薦（寫死數值，改 energy_references 後會脫鉤）
武器,廣島核彈,💣,ton_tnt,16000,,
```

**何時要寫死數值？** 預設無法對應到單一 energy_references 條目時。例如地震規模每筆都不同（921 = 7.3、311 = 9.1），就用標準單位 `richter` / `mw` + 不同 magnitude。

### `data/energy_references.csv` — 譬喻單位

| 欄位 | 說明 | 範例 |
|---|---|---|
| `key` | 程式內部用的英文鍵（**不能重複、不能有空格**） | `hiroshima` / `lunch_es_low` |
| `label` | 顯示的中文名稱 | `廣島核彈` |
| `emoji` | 卡片左側的圖示 | `💣` |
| `joulesEach` | 「一個 X」等於多少焦耳 J。**支援兩種格式**：單值 `6.6944e13` 或區間 `2594080~3012480` | `6.6944e13` 或 `2594080~3012480` |
| `note` | 覆蓋說明 / 數據來源換算過程（如果 override=true，這裡寫覆蓋理由） | `xlsx 9000 cal/L 顯誤` |
| `override` | `true` = 已用權威值覆蓋試算表 / 已修正原值（會顯示 ⓘ 標記） | `true` |
| `source` | 資料來源 URL | `https://en.wikipedia.org/wiki/Little_Boy` |
| `original_value` | 原始非 J 數據以利溯源（可空） | `620~720 kcal` |
| `archive_path` | 本地檔案路徑（PDF / HTML 快照存於 `Reference/`） | `Reference/papers/Hall_2008_fat_energy_per_kg.pdf` |

#### 學術引用 / 參考文獻

完整書目（APA 7th 格式 + 中文標題翻譯 + 本地 PDF 連結）見 [`Reference/REFERENCES.md`](Reference/REFERENCES.md)。
無法自動下載、需人工取得的 PDF 清單見 [`Reference/PENDING_DOWNLOADS.md`](Reference/PENDING_DOWNLOADS.md)。

`Reference/` 子目錄結構：
- `papers/` — 學術論文 PDF
- `gov/` — 政府/標準文件 PDF（學校午餐、IPCC 等）
- `web/` — 網頁 HTML 快照（檔頭含 `<!-- archived: ISO_TIMESTAMP -->` 註記取用時間）

#### 區間（range）格式怎麼用？

如果某項數值有合理範圍（例如「國小 1-3 年級營養午餐 620~720 kcal」），可以這樣寫：

```csv
lunch_es_low,營養午餐（國小1-3）,🍱,2594080~3012480,熱量 620~720 kcal × 4184,,SOURCE_URL,620~720 kcal
```

UI 會自動顯示成「1.87 × 10⁹ ~ 2.17 × 10⁹ 個/份」與「≈ 18.7 ~ 21.7 億」。當區間單位被當作輸入時（從下拉選單選），會自動用區間中位數計算。

> **`joulesEach` 怎麼算？** 
> 一個 X 等於多少焦耳，公式：
> - 廣島核彈 16 kt TNT → 16000 × 4.184e9 = `6.6944e13`
> - 國小4-6 午餐 770 大卡 → 770 × 4184 = `3221680`
> - 1 小時的 5780 MWh → 5.78e6 × 3.6e6 = `2.0808e13`
>
> 不確定怎麼算的話，告訴我數值與來源，我幫你補。

### `data/emissions.csv` — CO₂ 排放係數

| 欄位 | 說明 | 範例 |
|---|---|---|
| `key` | 程式內部鍵（用底線、不能空格） | `subbituminous` / `heavy_oil` |
| `label` | 顯示名 | `亞煙煤` |
| `emoji` | 圖示 | `🪨` |
| `kgCO2_per_TJ` | 每兆焦耳釋放多少公斤 CO₂（IPCC 2006 預設值） | `96100` |
| `source` | 資料來源 URL | `https://www.ipcc-nggip.iges.or.jp/public/2006gl/` |

---

## 公式單位（不能從 CSV 編輯）

下列 10 個單位寫在 `data.js` 內，因為要用程式碼定義雙向換算公式：

| key | 名稱 | 換算 |
|---|---|---|
| `joule` | 焦耳 J | 基準單位 |
| `cal` | 卡 cal | 1 cal = 4.184 J |
| `kcal` | 大卡 kcal | 1 kcal = 4184 J |
| `erg` | 爾格 erg | 1 erg = 1e-7 J |
| `ev` | 電子伏特 eV | 1 eV = 1.602e-19 J |
| `kwh` | 千瓦小時 kWh | 1 kWh = 3.6e6 J |
| `ton_tnt` | 噸 TNT | 1 ton TNT = 4.184e9 J |
| `hp_s` | 馬力·秒 | 1 hp·s = 745.7 J |
| `richter` | 芮氏地震規模 ML | 對數公式 |
| `mw` | USGS 地震矩規模 Mw | 對數公式 |

要新增第 11 種公式單位（例如新的地震規模公式），需要改 `data.js`。如果只是新增一個常數型的譬喻單位（每一個 X = 多少焦耳），請改 `data/energy_references.csv` 即可。

---

## CSV 的小細節

- **註解**：以 `#` 開頭的列會被忽略，可用來分組或做筆記
- **空白列**：會被自動忽略
- **欄位內含逗號**：用雙引號包起來，例：`"慢跑 1 小時（60kg, 8km/h）"`。**沒包就會被當成多欄，整列會壞掉**
- **欄位內含雙引號**：寫成兩個雙引號，例：`"她說""你好"""`
- **編碼**：必須是 UTF-8（最好帶 BOM）。Excel 存檔時選「CSV UTF-8 (逗號分隔)」
- **區間值**：用 `~` 分隔（不是 `-`），例：`2594080~3012480`

## 出錯了怎麼辦？

打開瀏覽器開發者工具（F12）看 Console。常見訊息：
- `Skipped fun unit with invalid joulesEach` → 某列的 `joulesEach` 欄不是有效數字
- `Preset "X" 引用了不存在的單位 "Y"` → presets.csv 引用了已被刪除的 fun unit
- `Failed to load ./data/...csv` → CSV 路徑或檔名拼錯

如果整個頁面變成「⚠ 載入資料失敗」，表示沒透過 HTTP 開（直接 file:// 點 index.html 不行）。請執行 `python -m http.server 8765` 後開 `http://127.0.0.1:8765/`。

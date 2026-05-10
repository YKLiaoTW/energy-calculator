# ⚡ 能量換算計算機

把抽象能量變成有畫面感的對照 — 地震、核彈、營養午餐、太陽花學運、太陽輻射、天照粒子⋯ 一鍵換算。

> **使用情境**：地震發生 → 輸入規模 → 立刻看到「相當於幾顆廣島核彈、幾億份營養午餐」等對照；按「複製分享連結」即可傳給朋友。

## 線上展示

部署到 GitHub Pages 後：`https://<your-github>.github.io/<repo-name>/`

範例分享連結：
- `?u=richter&v=7.3` → 1999 集集 921
- `?u=mw&v=9.0` → 2011 311 東日本
- `?u=ton_tnt&v=16000` → 廣島核彈

## 功能

- **9 種正規單位**：焦耳、卡、爾格、電子伏特、千瓦小時、噸 TNT、馬力·秒、芮氏地震規模、USGS 地震矩規模
- **20+ 種譬喻單位**：營養午餐（5 級）、廣島核彈、沙皇氫彈、觀塘 LNG 槽爆炸、太陽花學運、香蕉、太陽餅、鳳梨酥、花蓮薯、慢跑、洪荒之力、脂肪、台中火力、核四、風力、筆電 65W、汽油、LNG、U-235、太陽輻射、天照粒子⋯
- **24 個快速範例**：歷年大地震、武器、能源、發電、食物、運動 — 一鍵填入
- **CO₂ 排放對照**：若由亞煙煤 / 天然氣發電產生這些能量會排放多少 CO₂
- **URL 分享**：`?u=richter&v=7.3` 可重現計算狀態
- **RWD 友善**：桌機兩欄、手機自動堆疊單欄

## 技術棧

純 HTML / CSS / Vanilla JS — **無 build step、無依賴、無 npm**。

```
EenrgyCalculator/
├── index.html    # 結構與排版
├── style.css     # 樣式（沿用 GRB 設計系統：紫藍漸層 + Glassmorphism + Noto Sans TC）
├── script.js     # 換算引擎、count-up 動畫、URL share、剪貼簿
├── data.js       # 全部單位、譬喻、預設、CO₂ 係數（資料與邏輯分離）
└── 能量計算機.xlsx  # 原始試算表（資料來源備份）
```

未來新增單位 / 譬喻 / 事件，只要改 `data.js` 即可，UI 自動跟上。

## 本機開發

ES modules 必須走 HTTP（不能直開 `file://`）：

```bash
cd C:\@Workspace\EenrgyCalculator
python -m http.server 8765
# 開 http://127.0.0.1:8765/
```

或用 VSCode 的 Live Server 套件。

## 部署到 GitHub Pages

1. 在 GitHub 開新的公開 repo
2. 推上去（純靜態檔案，沒有 build action 需要設定）
   ```bash
   git remote add origin git@github.com:<user>/<repo>.git
   git push -u origin master
   ```
3. Repo Settings → Pages → Source 選 `master` branch / `(root)`
4. 約 30 秒後 `https://<user>.github.io/<repo>/` 就上線

完全免費、永久保存，每次 push 自動更新。

## 公式驗證

| 輸入 | 結果欄位 | 期望值 | 實測 |
|---|---|---|---|
| `richter = 7.3` (921) | 焦耳 J | ≈ 5.62×10¹⁵ | ✓ |
| `richter = 7.3` | 噸 TNT | ≈ 1.34 Mt | ✓ |
| `richter = 7.3` | 廣島核彈 | ≈ 84 顆 | ✓ |
| `mw = 9.0` (311) | 焦耳 J | ≈ 2.00×10¹⁸ | ✓ |
| `ton_tnt = 16000` | 廣島核彈 | 1.00 顆 | ✓ |
| `kcal = 770` | 國小4-6 午餐 | 1.00 份 | ✓ |
| `kwh = 5.78e6` | 台中火力 1 hr | 1.00 場 | ✓ |
| `joule = 6.264e20` | 太陽花學運 | ≈ 2.49×10⁷ 場 | ✓ |
| `kwh = 1` | 亞煙煤 CO₂ | 345.96 g | ✓ |
| `kwh = 1` | 天然氣 CO₂ | 201.96 g | ✓ |

## 資料保真原則

`data.js` 中每個數值都標明來源：
- `// xlsx R<列號>` — 直接搬自試算表
- `// override` 區塊 — 試算表值與真實世界明顯不符時，採用權威值並寫明 spec / real / reason / source

目前一筆覆蓋：**LNG 一公升液態**（試算表 D27 = 9000 cal/L 顯為單位誤植，採真實值 25 MJ/L，來源 IEA）。覆蓋過的單位在 UI 上會顯示橘色 ⓘ 標記。

## 致謝與引用

- **設計風格**：紫藍漸層 + Glassmorphism + Noto Sans TC，沿襲 [GRB](https://github.com/) 既有設計系統
- **譬喻精神**：致敬 [g0v 核電翻譯機](https://github.com/g0v) — 把抽象數字翻譯成生活化比喻的精神先驅
- **地震資料**：[USGS Earthquake Hazards Program](https://earthquake.usgs.gov/)、[中央氣象署](https://www.cwa.gov.tw/)、[台大地質科學系火山研究中心](http://volcano.gl.ntu.edu.tw/)
- **能源熱值**：[IEA](https://www.iea.org/)、[National Physical Laboratory](http://www.kayelaby.npl.co.uk/atomic_and_nuclear_physics/)
- **核武資料**：[Nuclear Weapon Archive](http://www.nuclearweaponarchive.org/)、[Wikipedia](https://en.wikipedia.org/wiki/Little_Boy)
- **發電資料**：[台灣電力公司](http://www.taipower.com.tw/)
- **營養午餐熱量**：[教育部國民及學前教育署](http://cpd.moe.gov.tw/)
- **物理常數**：thermochemical calorie (4.184 J)、Gutenberg-Richter 公式、Hanks-Kanamori (USGS) Mw 公式

## 授權

資料來源各自版權所屬。本專案程式碼採 MIT License。

---

Made with ❤️ in Taiwan.

# 能量計算機 — 參考文獻清單

> APA 7th edition 格式。每筆引用都附 DOI 或穩定 URL；本地 PDF/HTML 用 [📄] 連結指向 `Reference/` 內檔案。
> 最後更新：2026-05-10

---

## A. 學術期刊文獻

### A.1 體能活動 / 運動代謝

Ainsworth, B. E., Haskell, W. L., Herrmann, S. D., Meckes, N., Bassett, D. R., Tudor-Locke, C., Greer, J. L., Vezina, J., Whitt-Glover, M. C., & Leon, A. S. (2011). 2011 Compendium of Physical Activities: A second update of codes and MET values（2011 體能活動摘要：代碼與 MET 值的第二次更新）. *Medicine & Science in Sports & Exercise*, *43*(8), 1575–1581. https://doi.org/10.1249/MSS.0b013e31821ece12 [📄](papers/Ainsworth_2011_compendium.pdf)

> **附 SDC1 補充資料**：[📄](papers/Ainsworth_2011_compendium_SDC1_full_table.pdf) — 含 821 個活動的完整 MET 對照表（主文僅摘錄；查特定活動的 MET 值請看 SDC1）。

引用於 `energy_references.csv`：jog_hr / jog_km / swim_hr / swim_km / cycle_hr / cycle_km

### A.2 體脂能量

Hall, K. D. (2008). What is the required energy deficit per unit weight loss?（每單位體重減輕所需的能量赤字為何？）. *International Journal of Obesity*, *32*(3), 573–576. https://doi.org/10.1038/sj.ijo.0803720 [📄](papers/Hall_2008_fat_energy_per_kg.pdf)

引用於 `energy_references.csv`：fat_kg

### A.3 太陽輻射 / 太陽常數

Kopp, G., & Lean, J. L. (2011). A new, lower value of total solar irradiance: Evidence and climate significance（總太陽輻照度的新較低值：證據與氣候意義）. *Geophysical Research Letters*, *38*(1), L01706. https://doi.org/10.1029/2010GL045777 [📄](papers/Kopp_Lean_2011_solar_irradiance.pdf)

引用於 `energy_references.csv`：solar_earth_hr / solar_m2_hr

### A.4 高能宇宙射線（天照大神粒子）

Telescope Array Collaboration, Abbasi, R. U., Allen, M. G., Arimura, R., Belz, J. W., Bergman, D. R., Blake, S. A., Shin, B. K., Buckland, I. J., Cheon, B. G., ... Zundel, Z. (2023). An extremely energetic cosmic ray observed by a surface detector array（地表偵測器陣列觀測到的極高能宇宙射線）. *Science*, *382*(6673), 903–907. https://doi.org/10.1126/science.abo5095 [📄](papers/TelescopeArray_2023_Amaterasu_arxiv.pdf)

> 註：上述本地 PDF 為 arXiv 預印本（arXiv:2311.14231），與 *Science* 正式版內容相同。

引用於 `energy_references.csv`：amaterasu

### A.5 Trinity 核試重新評估

Selby, H. D., Hanson, S. K., Meininger, D., Oldham, W. J., Kinman, W. S., Miller, J. L., Reilly, S. D., Wende, A. M., Berger, J. L., Inglis, J., Pollington, A. D., Waidmann, C. R., Meade, R. A., Buescher, K. L., Gattiker, J. R., Vander Wiel, S. A., & Marcy, P. W. (2021). A new yield assessment for the Trinity nuclear test, 75 years later（七十五年後 Trinity 核試的新產量評估）. *Nuclear Technology*, *207*(sup1), 321–325. https://doi.org/10.1080/00295450.2021.1932176 [📄](papers/Selby_2021_Trinity_yield.pdf)

引用於 `energy_references.csv`：trinity

### A.6 地震矩規模

Hanks, T. C., & Kanamori, H. (1979). A moment magnitude scale（地震矩規模）. *Journal of Geophysical Research: Solid Earth*, *84*(B5), 2348–2350. https://doi.org/10.1029/JB084iB05p02348 [📄](papers/Hanks_Kanamori_1979_Mw_scale.pdf)

引用於 `data.js`：mw 單位（Hanks-Kanamori 公式 `log10(E_J) = 4.8 + 1.5 Mw`）

### A.7 2020 貝魯特港爆炸 yield 估計

Pilger, C., Gaebler, P., Hupe, P., Kalia, A. C., Schneider, F. M., Steinberg, A., Sudhaus, H., & Ceranna, L. (2021). Yield estimation of the 2020 Beirut explosion using open access waveform and remote sensing data（運用公開地震波與遙測資料估計 2020 貝魯特爆炸當量）. *Scientific Reports*, *11*(1), Article 14144. https://doi.org/10.1038/s41598-021-93690-y [📄](papers/Pilger_2021_Beirut_yield.pdf)

> 多技術整合分析（地震、水聲、次聲、SAR 遙測）估計爆炸當量為 **0.13–2 kt TNT**，符合 2,750 噸 NH₄NO₃ 庫存量級。

引用於 `energy_references.csv`：beirut_2020

---

## B. 政府 / 國際標準文件

### B.1 教育部國教署 — 學校午餐熱量基準

教育部國民及學前教育署. (2020 年 12 月 28 日修訂). *學校午餐食物內容及營養基準*（109.12.28 修訂版）. 教育部國民及學前教育署學校午餐專區. https://fatraceschool.k12ea.gov.tw/newsattachfiles/4821 [📄](gov/MOE_school_lunch_attached_4821.pdf)

> 已驗證 PDF 第 1 頁標頭顯示「109.12.28」修訂版，與本專案 5 級熱量區間（1-3 620~720 kcal、4-6 720~830、國中 800~930、高中男 900~1050、高中女 680~810）完全吻合。

引用於 `energy_references.csv`：lunch_es_low / lunch_es_high / lunch_jh / lunch_hs_m / lunch_hs_f

### B.2 IPCC 2006 國家溫室氣體清冊指南

IPCC. (2006). *2006 IPCC Guidelines for National Greenhouse Gas Inventories, Volume 2: Energy, Chapter 1: Introduction*（2006 IPCC 國家溫室氣體清冊指南，第二冊：能源，第一章：導論）. Institute for Global Environmental Strategies (IGES), Hayama, Japan. https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_1_Ch1_Introduction.pdf [📄](gov/IPCC_2006_Vol2_Ch1_emission_factors.pdf)

> 引用具體頁碼：Table 1.4 "Default emission factors for stationary combustion" (p. 1.23)，提供 8 種化石燃料的 CO₂ 預設排放係數（kg CO₂ / TJ）。

引用於 `emissions.csv`：8 筆全部（subbituminous / natural_gas / bituminous / gasoline / lpg / heavy_oil / light_oil / diesel）

### B.3 經濟部能源署 — 再生能源發電統計

經濟部能源署. (n.d.). *發電概況*. 中華民國經濟部. 取自 2026-05-10. https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14437 [📄](web/moeaea_renewable_energy_statistics.html)

> 取用 2025 全年加總：太陽光電 159.75 億度、風力 122.02 億度、慣常水力 54.99 億度。

引用於 `energy_references.csv`：solar_2025_year / wind_2025_year / hydro_2025_year

### B.4 衛生福利部食品藥物管理署 — 食品營養成分資料庫

衛生福利部食品藥物管理署. (n.d.). *食品營養成分資料庫*（TFND, Taiwan Food Nutrient Database）. 中華民國衛生福利部. 取自 2026-05-10. https://consumer.fda.gov.tw/Food/TFND.aspx [📄](web/consumer_fda_food_nutrient_db.html)

引用於 `energy_references.csv`：suncake / pineapple_cake / hualien_yam

---

## C. 百科全書 / 線上條目（Wikipedia 類）

> APA 7 規範：Wikipedia 條目作為 work in progress，需附取用日期。

Wikipedia contributors. (n.d.-a). *Amaterasu particle*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Amaterasu_particle [📄](web/wiki_amaterasu_particle.html)

Wikipedia contributors. (n.d.-b). *Father of All Bombs*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Father_of_All_Bombs [📄](web/wiki_father_of_all_bombs.html)

Wikipedia contributors. (n.d.-c). *Fat Man*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Fat_Man [📄](web/wiki_fat_man.html)

Wikipedia contributors. (n.d.-d). *GBU-43/B MOAB*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/GBU-43/B_MOAB [📄](web/wiki_gbu43_moab.html)

Wikipedia contributors. (n.d.-e). *GBU-57A/B MOP*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/GBU-57A/B_MOP [📄](web/wiki_gbu57_mop.html)

Wikipedia contributors. (n.d.-f). *Half marathon*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Half_marathon [📄](web/wiki_half_marathon.html)

Wikipedia contributors. (n.d.-g). *Ironman 70.3*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Ironman_70.3 [📄](web/wiki_ironman_703.html)

Wikipedia contributors. (n.d.-h). *Ironman Triathlon*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Ironman_Triathlon [📄](web/wiki_ironman_triathlon.html)

Wikipedia contributors. (n.d.-i). *Liquefied natural gas*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Liquefied_natural_gas [📄](web/wiki_liquefied_natural_gas.html)

Wikipedia contributors. (n.d.-j). *Little Boy*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Little_Boy [📄](web/wiki_little_boy.html)

Wikipedia contributors. (n.d.-k). *Marathon*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Marathon [📄](web/wiki_marathon.html)

Wikipedia contributors. (n.d.-l). *Metabolic equivalent of task*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Metabolic_equivalent_of_task [📄](web/wiki_metabolic_equivalent_of_task.html)

Wikipedia contributors. (n.d.-m). *Solar constant*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Solar_constant [📄](web/wiki_solar_constant.html)

Wikipedia contributors. (n.d.-n). *Solar irradiance*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Solar_irradiance [📄](web/wiki_solar_irradiance.html)

Wikipedia contributors. (n.d.-o). *Trinity (nuclear test)*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Trinity_(nuclear_test) [📄](web/wiki_trinity_nuclear_test.html)

Wikipedia contributors. (n.d.-p). *Uranium-235*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Uranium-235 [📄](web/wiki_uranium_235.html)

Wikipedia 中文版貢獻者. (n.d.-q). *2014 年高雄氣爆事故*. 收於《維基百科》. 取自 2026-05-10, from https://zh.wikipedia.org/wiki/2014年高雄氣爆事故 [📄](web/zhwiki_2014_kaohsiung_explosion.html)

Wikipedia 中文版貢獻者. (n.d.-r). *八仙樂園彩色派對火災*. 收於《維基百科》. 取自 2026-05-10, from https://zh.wikipedia.org/wiki/八仙樂園彩色派對火災 [📄](web/zhwiki_2015_baxian_dust_explosion.html)

Wikipedia 中文版貢獻者. (n.d.-s). *大潭發電廠*. 收於《維基百科》. 取自 2026-05-10, from https://zh.wikipedia.org/wiki/大潭發電廠 [📄](web/zhwiki_datan_power_plant.html)

Wikipedia contributors. (n.d.-t). *Basal metabolic rate*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Basal_metabolic_rate [📄](web/wiki_basal_metabolic_rate.html)

Wikipedia contributors. (n.d.-u). *Castle Bravo*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Castle_Bravo [📄](web/wiki_castle_bravo.html)

Wikipedia contributors. (n.d.-v). *Large Hadron Collider*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Large_Hadron_Collider [📄](web/wiki_large_hadron_collider.html)

Wikipedia contributors. (n.d.-w). *Lightning*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Lightning [📄](web/wiki_lightning.html)

Wikipedia contributors. (n.d.-x). *Saturn V*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Saturn_V [📄](web/wiki_saturn_v.html)

Wikipedia contributors. (n.d.-y). *Tesla Model 3*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Tesla_Model_3 [📄](web/wiki_tesla_model_3.html)

Wikipedia contributors. (n.d.-z). *Tunguska event*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Tunguska_event [📄](web/wiki_tunguska_event.html)

Wikipedia contributors. (n.d.-aa). *Type Ia supernova*. In *Wikipedia*. Retrieved 2026-05-10, from https://en.wikipedia.org/wiki/Type_Ia_supernova [📄](web/wiki_type_ia_supernova.html)

Wikipedia 中文版貢獻者. (n.d.-ab). *台灣高鐵*. 收於《維基百科》. 取自 2026-05-10, from https://zh.wikipedia.org/wiki/台灣高鐵 [📄](web/zhwiki_taiwan_high_speed_rail.html)

---

## D. 新聞 / 網路文章

CTWANT 編輯部. (n.d.). *一個中油退休人員對「觀塘三接 LNG 儲槽 = 8 萬噸炸藥」的看法*. CTWANT 周刊王. 取自 2026-05-10, from https://www.ctwant.com/article/49684 [📄](web/ctwant_49684_guantang_lng_8wan_ton.html)

> 引用環團對觀塘三接 LNG 儲槽爆炸風險的 81,000 噸 TNT 估計值。

引用於 `energy_references.csv`：guantang_lng

i-fit 愛瘦身. (n.d.). *香蕉一根熱量*（食物熱量資料）. i-fit 愛瘦身. 取自 2026-05-10, from http://www.i-fit.com.tw/context/419.html [📄](web/ifit_banana_calorie.html)

引用於 `energy_references.csv`：banana

NOAA Atlantic Oceanographic and Meteorological Laboratory. (n.d.). *TCFAQ D7: How much energy does a hurricane release?*（颶風一次釋放多少能量？）. 取自 2026-05-10, from https://www.aoml.noaa.gov/hrd/tcfaq/D7.html [📄](web/noaa_aoml_typhoon_faq_d7.html)

> 平均颶風 / 颱風一日凝結潛熱：5.2×10¹⁹ J/day（≈ 全球發電容量 200 倍）。

引用於 `energy_references.csv`：typhoon_per_day

Macworld. (n.d.). *iPhone battery capacity comparison*（iPhone 電池容量對照）. 取自 2026-05-10, from https://www.macworld.com/article/678413/iphone-battery-capacities-compared-all-iphones-battery-life-in-mah-and-wh.html [📄](web/macworld_iphone_battery_capacities.html)

引用於 `energy_references.csv`：iphone_charge

低碳生活部落格. (2013). *電不夠用系列：運輸用電 僅占全國 0.5%*. 取自 2026-05-10, from https://lowestc.blogspot.com/2013/12/05.html [📄](web/lowestc_hsr_energy_consumption_2013.html)

> 引述高鐵 2012 年用電統計：每公里 27.67 度，台北→高雄 345 km ≈ 9,545 度/列車。

引用於 `energy_references.csv`：hsr_tpe_khh

香港 01. (n.d.). *消委會 15 款電熱水煲評測*. 取自 2026-05-10, from https://www.hk01.com/數碼生活/562837/

引用於 `energy_references.csv`：kettle_boil（實測 1.7 L 由冷至滾沸 ≈ 0.27 kWh）

Panasonic 台灣. (n.d.). *家電的耗電功率該如何計算呢？*. 取自 2026-05-10, from https://pstw.panasonic.com.tw/FAQ/Article/1202

引用於 `energy_references.csv`：ac_3500w_hr

工業技術研究院 (ITRI). (n.d.). *車輛耗能研究網站—車輛能效查詢*. 取自 2026-05-10, from https://auto.itri.org.tw/iv_general_qry.aspx

引用於 `energy_references.csv`：moto_125_100km

---

## E. 其他穩定來源（保留原 URL，未本地存檔）

Nuclear Weapon Archive. (n.d.). *Big Ivan, The Tsar Bomba ("King of Bombs")*. https://www.nuclearweaponarchive.org/Russia/TsarBomba.html [📄](web/nuclearweaponarchive_tsar_bomba.html)

引用於 `energy_references.csv`：tsar

台灣電力股份有限公司. (n.d.). *台電全國火力發電廠簡介*. https://www.taipower.com.tw/

> 取用台中火力電廠 5780 MW、核四 2700 MW 等裝置容量資料。

引用於 `energy_references.csv`：taichung_hr / nuke4_hr

---

## 引用對照速查表

| `energy_references.csv` key | 主要引用 | 本地檔 |
|---|---|---|
| lunch_es_low ~ hs_f (5 筆) | 教育部國教署 (2020) | gov/MOE_school_lunch_nutrition_standards.pdf |
| jog/swim/cycle (6 筆) | Ainsworth et al. (2011) | papers/Ainsworth_2011_compendium.pdf (+ SDC1) |
| marathon / triathlon (4 筆) | Wikipedia | web/wiki_marathon.html 等 |
| fat_kg | Hall (2008) | papers/Hall_2008_fat_energy_per_kg.pdf |
| amaterasu | Telescope Array Collab. (2023) | papers/TelescopeArray_2023_Amaterasu_arxiv.pdf |
| solar_earth_hr / solar_m2_hr | Kopp & Lean (2011) | papers/Kopp_Lean_2011_solar_irradiance.pdf |
| trinity | Selby et al. (2021) | papers/Selby_2021_Trinity_yield.pdf |
| hiroshima / nagasaki / moab / foab / gbu-57 | Wikipedia | web/wiki_*.html |
| tsar | Nuclear Weapon Archive | web/nuclearweaponarchive_tsar_bomba.html |
| guantang_lng | CTWANT (n.d.) | web/ctwant_49684_*.html |
| kaohsiung_explosion / ba_xian_dust | Wikipedia 中文 | web/zhwiki_*.html |
| banana | i-fit | web/ifit_banana_calorie.html |
| suncake / pineapple_cake / hualien_yam | 食藥署 TFND | web/consumer_fda_food_nutrient_db.html |
| 2025 太陽能 / 風力 / 水力 (3 筆) | 經濟部能源署 (n.d.) | web/moeaea_renewable_energy_statistics.html |
| lng_l / u235_g | Wikipedia | web/wiki_*.html |
| `emissions.csv` 全部 8 筆 | IPCC (2006) | gov/IPCC_2006_Vol2_Ch1_emission_factors.pdf |
| **— 第二輪擴充 (2026-05-10) —** | | |
| beirut_2020 | Pilger et al. (2021) *Sci Rep* | papers/Pilger_2021_Beirut_yield.pdf |
| lhc_proton | Wikipedia: Large Hadron Collider | web/wiki_large_hadron_collider.html |
| iphone_charge | Macworld | web/macworld_iphone_battery_capacities.html |
| kettle_boil | HK01 消委會評測 | （無快照） |
| human_bmr_day | Wikipedia: Basal metabolic rate | web/wiki_basal_metabolic_rate.html |
| ac_3500w_hr | Panasonic 台灣 | （無快照） |
| moto_125_100km | ITRI 車輛能效查詢 | （無快照） |
| tesla_m3_full | Wikipedia: Tesla Model 3 | web/wiki_tesla_model_3.html |
| hsr_tpe_khh | 低碳生活部落格 (2013) | web/lowestc_hsr_energy_consumption_2013.html |
| lightning_avg | Wikipedia: Lightning | web/wiki_lightning.html |
| saturn_v_chem | Wikipedia: Saturn V | web/wiki_saturn_v.html |
| castle_bravo | Wikipedia: Castle Bravo | web/wiki_castle_bravo.html |
| tunguska_1908 | Wikipedia: Tunguska event | web/wiki_tunguska_event.html |
| typhoon_per_day | NOAA AOML TCFAQ D7 | web/noaa_aoml_typhoon_faq_d7.html |
| supernova_ia | Wikipedia: Type Ia supernova | web/wiki_type_ia_supernova.html |

---

## 維護備註

- 新增引用：先把 PDF/HTML 存到對應子資料夾（papers/gov/web），再依 APA 7 格式新增本檔對應段落，並在 energy_references.csv 的 archive_path 欄填入路徑。
- 待取得 PDF：列入 [PENDING_DOWNLOADS.md](./PENDING_DOWNLOADS.md)。
- 數值與引用不一致時：以引用文獻為準，並在 energy_references.csv 的 note 欄記錄差異。

# 天氣功能使用說明

## 功能介紹

本專案整合了台灣中央氣象署（CWA）開放資料 API，提供 30 天天氣預報月曆視圖。

## 功能特色

### 📅 30 天月曆視圖

- 完整的月曆格式顯示
- 支援月份切換（上一月/下一月）
- 今日日期特殊標記
- 「回到今天」快速導航

### 🌤️ 天氣資訊

- **天氣圖示**: ☀️ 晴天、⛅ 多雲、☁️ 陰天、🌧️ 雨天
- **溫度範圍**: 顯示最高溫/最低溫
- **降雨機率**: 0-100%，顏色分級顯示
- **天氣描述**: 中文天氣狀況描述

### 🎨 視覺設計

- 溫度顏色編碼（冷暖色系）
- 降雨機率分級（低/中/高）
- 響應式設計（手機/平板/桌面）
- 互動動畫效果

## 技術架構

### 檔案結構

```
src/lib/features/weather/
├── types.ts              # TypeScript 型別定義
├── api.ts                # API 整合與資料處理
├── utils.ts              # 工具函式（日期、顏色等）
├── index.ts              # 統一匯出
└── components/
    ├── WeatherCalendar.svelte  # 主月曆元件
    ├── DayCell.svelte          # 單日天氣格子
    ├── LoadingState.svelte     # 載入狀態
    └── ErrorState.svelte       # 錯誤狀態

src/routes/weather/
└── +page.svelte          # 天氣頁面
```

### 核心元件

#### WeatherCalendar

主月曆元件，負責：

- 產生月曆網格
- 處理月份導航
- 渲染天氣資料

#### DayCell

單日天氣格子，顯示：

- 日期
- 天氣圖示
- 溫度範圍
- 降雨機率
- 天氣描述

## 如何串接真實 CWA API

目前使用 Mock 資料，若要串接真實 API：

### 步驟 1: 取得 API Key

1. 前往 [中央氣象署開放資料平台](https://opendata.cwa.gov.tw/)
2. 註冊帳號並登入
3. 申請 Authorization Key

### 步驟 2: 設定 API Key

編輯 `src/lib/features/weather/api.ts`：

```typescript
// 將 YOUR_API_KEY_HERE 替換為您的 API Key
const API_KEY = 'YOUR_API_KEY_HERE';
```

### 步驟 3: 啟用真實 API

在 `get30DaysWeather` 函式中：

```typescript
// 取消註解以下程式碼
const response = await getWeatherForecast(locationName);
const weekData = parseWeatherData(response);

// 註解掉 Mock 資料
// const weekData = generateMockWeatherData(7);
```

## API 限制說明

⚠️ **重要提醒**：

- CWA API 僅提供最多 **7 天**的天氣預報
- 本功能使用 7 天資料**循環填充**至 30 天
- 若需要真實的 30 天預報，需考慮使用其他氣象服務

## 使用方式

### 開發環境

```bash
npm run dev
```

訪問: http://localhost:5173/weather

### 生產環境

```bash
npm run build
npm run preview
```

## 自訂設定

### 更改預設地點

編輯 `src/routes/weather/+page.svelte`：

```typescript
// 將 '臺北市' 改為其他縣市
weatherData = await get30DaysWeather('臺北市');
```

可用地點範例：

- 臺北市
- 新北市
- 桃園市
- 臺中市
- 臺南市
- 高雄市

### 調整月曆樣式

編輯 `src/lib/features/weather/components/WeatherCalendar.svelte` 的 `<style>` 區塊

### 修改溫度顏色

編輯 `src/lib/features/weather/utils.ts` 的 `getTemperatureColorClass` 函式

## 未來改進

- [ ] 新增地點選擇下拉選單
- [ ] 天氣詳細資訊彈窗
- [ ] 天氣預警提示
- [ ] 天氣趨勢圖表
- [ ] 深色模式適配
- [ ] 離線快取功能

## 問題排解

### API 呼叫失敗

1. 檢查 API Key 是否正確
2. 確認網路連線正常
3. 檢查 CWA API 服務狀態

### 畫面顯示異常

1. 清除瀏覽器快取
2. 重新啟動開發伺服器
3. 檢查瀏覽器主控台錯誤訊息

## 相關連結

- [中央氣象署開放資料平台](https://opendata.cwa.gov.tw/)
- [CWA API 文件](https://opendata.cwa.gov.tw/dist/opendata-swagger.html)
- [專案 GitHub](https://github.com/jeby-228/member_API_frontend)

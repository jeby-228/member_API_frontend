<script lang="ts">
import { onMount } from 'svelte';
import {
get30DaysWeather,
WeatherCalendar,
LoadingState,
ErrorState,
type DailyWeather
} from '$lib/features/weather';

let weatherData = $state<DailyWeather[]>([]);
let isLoading = $state(true);
let error = $state<string | null>(null);

async function loadWeather() {
isLoading = true;
error = null;
try {
weatherData = await get30DaysWeather('臺北市');
} catch (err) {
error = err instanceof Error ? err.message : '載入天氣資料失敗';
} finally {
isLoading = false;
}
}

onMount(loadWeather);
</script>

<svelte:head>
<title>30 天天氣預報</title>
</svelte:head>

<div class="weather-page">
<div class="page-header">
<h1>🌤️ 30 天天氣月曆</h1>
<p class="subtitle">台灣天氣預報 - 來自中央氣象署開放資料</p>
</div>

{#if isLoading}
<LoadingState />
{:else if error}
<ErrorState message={error} onRetry={loadWeather} />
{:else}
<WeatherCalendar {weatherData} />
{/if}

<div class="info-section">
<div class="info-card">
<h3>📊 資料說明</h3>
<ul>
<li>資料來源：中央氣象署開放資料平台</li>
<li>預報範圍：未來 30 天天氣預測</li>
<li>更新頻率：每日更新</li>
<li>資料項目：天氣狀況、溫度、降雨機率</li>
</ul>
</div>

<div class="info-card">
<h3>🎨 圖示說明</h3>
<div class="legend">
<div class="legend-item">☀️ 晴天</div>
<div class="legend-item">⛅ 多雲</div>
<div class="legend-item">☁️ 陰天</div>
<div class="legend-item">🌧️ 下雨</div>
<div class="legend-item">⛈️ 雷雨</div>
</div>
</div>

<div class="info-card">
<h3>💧 降雨機率</h3>
<div class="rain-legend">
<div class="rain-item rain-low">0-39% 低</div>
<div class="rain-item rain-medium">40-69% 中</div>
<div class="rain-item rain-high">70-100% 高</div>
</div>
</div>
</div>
</div>

<style lang="scss">
.weather-page {
min-height: 100vh;
background: linear-gradient(to bottom, #e3f2fd 0%, #fff 50%);
padding: 2rem 1rem;
}

.page-header {
text-align: center;
margin-bottom: 2rem;

h1 {
margin: 0 0 0.5rem 0;
font-size: 2.5rem;
color: #1976d2;
}

.subtitle {
color: #666;
font-size: 1.1rem;
margin: 0;
}
}

.info-section {
max-width: 1400px;
margin: 3rem auto 0;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 1.5rem;
padding: 0 1rem;
}

.info-card {
background: white;
padding: 1.5rem;
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

h3 {
margin: 0 0 1rem 0;
color: #333;
font-size: 1.2rem;
}

ul {
margin: 0;
padding-left: 1.5rem;
color: #666;

li {
margin: 0.5rem 0;
}
}
}

.legend {
display: flex;
flex-wrap: wrap;
gap: 0.75rem;

.legend-item {
font-size: 1.1rem;
padding: 0.5rem 1rem;
background: #f5f5f5;
border-radius: 8px;
}
}

.rain-legend {
display: flex;
flex-direction: column;
gap: 0.75rem;

.rain-item {
padding: 0.75rem;
border-radius: 8px;
font-weight: 600;
text-align: center;

&.rain-low {
background: #f1f8e9;
color: #558b2f;
}

&.rain-medium {
background: #f3e5f5;
color: #6a1b9a;
}

&.rain-high {
background: #e3f2fd;
color: #1565c0;
}
}
}

@media (max-width: 768px) {
.weather-page {
padding: 1rem 0.5rem;
}

.page-header {
h1 {
font-size: 1.8rem;
}

.subtitle {
font-size: 0.95rem;
}
}

.info-section {
grid-template-columns: 1fr;
gap: 1rem;
margin-top: 2rem;
}
}
</style>

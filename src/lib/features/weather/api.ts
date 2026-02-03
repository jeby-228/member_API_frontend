// src/lib/features/weather/api.ts

import type { CWAWeatherResponse, DailyWeather } from './types';

// CWA API 端點 (使用 7 天預報)
const CWA_API_BASE = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore';
const FORECAST_DATASET_ID = 'F-D0047-091'; // 全臺灣鄉鎮天氣預報

// 注意：實際使用時需要申請 API Key
// 請至 https://opendata.cwa.gov.tw/ 註冊並取得 Authorization Key
const API_KEY = 'YOUR_API_KEY_HERE';

/**
 * 取得天氣預報資料
 * @param locationName 地點名稱 (例如: "臺北市", "新北市")
 * @returns 天氣預報資料
 */
export async function getWeatherForecast(
	locationName: string = '臺北市'
): Promise<CWAWeatherResponse> {
	const url = `${CWA_API_BASE}/${FORECAST_DATASET_ID}?Authorization=${API_KEY}&locationName=${encodeURIComponent(locationName)}&elementName=WeatherDescription,T,PoP12h,CI`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		throw error;
	}
}

/**
 * 將 CWA API 回應轉換為簡化的每日天氣資料
 * @param response CWA API 回應
 * @returns 每日天氣資料陣列
 */
export function parseWeatherData(response: CWAWeatherResponse): DailyWeather[] {
	if (!response.records?.location?.[0]) {
		return [];
	}

	const location = response.records.location[0];
	const weatherElements = location.weatherElement;

	// 找出各個天氣元素
	const weatherDesc = weatherElements.find((el) => el.elementName === 'WeatherDescription');
	const temperature = weatherElements.find((el) => el.elementName === 'T');
	const pop = weatherElements.find((el) => el.elementName === 'PoP12h');
	const comfort = weatherElements.find((el) => el.elementName === 'CI');

	const dailyWeather: DailyWeather[] = [];

	// 以 12 小時為單位，合併為每日資料
	if (weatherDesc?.time) {
		const processedDates = new Set<string>();

		weatherDesc.time.forEach((timeSlot, index) => {
			const date = new Date(timeSlot.startTime);
			const dateStr = date.toISOString().split('T')[0];

			// 避免重複處理同一天
			if (processedDates.has(dateStr)) {
				return;
			}
			processedDates.add(dateStr);

			// 取得該日的溫度範圍
			const dayTemps = temperature?.time.filter((t) => {
				const tDate = new Date(t.startTime).toISOString().split('T')[0];
				return tDate === dateStr;
			});

			const temps =
				dayTemps?.map((t) => parseFloat(t.parameter.parameterName)).filter((t) => !isNaN(t)) || [];

			// 取得該日的降雨機率
			const dayPop = pop?.time.find((p) => {
				const pDate = new Date(p.startTime).toISOString().split('T')[0];
				return pDate === dateStr;
			});

			// 取得該日的舒適度
			const dayComfort = comfort?.time.find((c) => {
				const cDate = new Date(c.startTime).toISOString().split('T')[0];
				return cDate === dateStr;
			});

			dailyWeather.push({
				date: dateStr,
				weatherDescription: timeSlot.parameter.parameterName || '未知',
				temperature: {
					min: temps.length > 0 ? Math.min(...temps) : 20,
					max: temps.length > 0 ? Math.max(...temps) : 28
				},
				pop: dayPop ? parseInt(dayPop.parameter.parameterName) || 0 : 0,
				comfort: dayComfort?.parameter.parameterName || '舒適'
			});
		});
	}

	return dailyWeather;
}

/**
 * 取得 30 天的天氣資料 (使用 7 天預報循環填充)
 * @param locationName 地點名稱
 * @returns 30 天天氣資料
 */
export async function get30DaysWeather(locationName: string = '臺北市'): Promise<DailyWeather[]> {
	try {
		// 因為實際 API 需要 Key，這裡先使用 Mock 資料
		// 未來串接時取消註解：
		// const response = await getWeatherForecast(locationName);
		// const weekData = parseWeatherData(response);

		// Mock 7 天資料
		const weekData = generateMockWeatherData(7);

		// 循環填充到 30 天
		const thirtyDaysData: DailyWeather[] = [];
		const today = new Date();

		for (let i = 0; i < 30; i++) {
			const date = new Date(today);
			date.setDate(date.getDate() + i);
			const dateStr = date.toISOString().split('T')[0];

			// 使用 7 天資料循環
			const dayData = weekData[i % weekData.length];
			thirtyDaysData.push({
				...dayData,
				date: dateStr
			});
		}

		return thirtyDaysData;
	} catch (error) {
		console.error('Failed to get 30 days weather:', error);
		throw error;
	}
}

/**
 * 產生 Mock 天氣資料 (開發用)
 */
function generateMockWeatherData(days: number = 7): DailyWeather[] {
	const weatherConditions = [
		'晴天',
		'多雲',
		'陰天',
		'陰短暫雨',
		'多雲時晴',
		'陰時多雲短暫雨',
		'晴時多雲'
	];

	const comfortLevels = ['舒適', '悶熱', '稍有寒意', '舒適至悶熱', '悶熱至易中暑'];

	return Array.from({ length: days }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() + i);

		return {
			date: date.toISOString().split('T')[0],
			weatherDescription: weatherConditions[i % weatherConditions.length],
			temperature: {
				min: 18 + Math.floor(Math.random() * 5),
				max: 26 + Math.floor(Math.random() * 6)
			},
			pop: Math.floor(Math.random() * 100),
			comfort: comfortLevels[Math.floor(Math.random() * comfortLevels.length)]
		};
	});
}

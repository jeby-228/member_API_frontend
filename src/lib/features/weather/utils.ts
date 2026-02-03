// src/lib/features/weather/utils.ts

import type { CalendarDay, DailyWeather } from './types';

/**
 * 產生月曆的日期陣列 (包含前後月份以填滿週)
 * @param year 年份
 * @param month 月份 (0-11)
 * @param weatherData 天氣資料
 * @returns 月曆日期陣列
 */
export function generateCalendarDays(
	year: number,
	month: number,
	weatherData: DailyWeather[]
): CalendarDay[] {
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// 計算第一週需要補的天數
	const firstDayOfWeek = firstDay.getDay();
	const startPadding = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // 週一開始

	// 計算最後一週需要補的天數
	const lastDayOfWeek = lastDay.getDay();
	const endPadding = lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek;

	const calendarDays: CalendarDay[] = [];

	// 補上月天數
	for (let i = startPadding; i > 0; i--) {
		const date = new Date(year, month, 1 - i);
		calendarDays.push({
			date,
			weather: getWeatherForDate(date, weatherData),
			isCurrentMonth: false,
			isToday: isSameDay(date, today)
		});
	}

	// 當月天數
	for (let day = 1; day <= lastDay.getDate(); day++) {
		const date = new Date(year, month, day);
		calendarDays.push({
			date,
			weather: getWeatherForDate(date, weatherData),
			isCurrentMonth: true,
			isToday: isSameDay(date, today)
		});
	}

	// 補下月天數
	for (let i = 1; i <= endPadding; i++) {
		const date = new Date(year, month + 1, i);
		calendarDays.push({
			date,
			weather: getWeatherForDate(date, weatherData),
			isCurrentMonth: false,
			isToday: isSameDay(date, today)
		});
	}

	return calendarDays;
}

/**
 * 取得指定日期的天氣資料
 */
function getWeatherForDate(date: Date, weatherData: DailyWeather[]): DailyWeather | null {
	const dateStr = date.toISOString().split('T')[0];
	return weatherData.find((w) => w.date === dateStr) || null;
}

/**
 * 判斷是否為同一天
 */
function isSameDay(date1: Date, date2: Date): boolean {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

/**
 * 取得天氣圖示 emoji
 */
export function getWeatherIcon(description: string): string {
	if (!description) return '❓';

	const desc = description.toLowerCase();

	if (desc.includes('晴')) return '☀️';
	if (desc.includes('多雲') || desc.includes('雲')) return '⛅';
	if (desc.includes('陰')) return '☁️';
	if (desc.includes('雨')) return '🌧️';
	if (desc.includes('雷')) return '⛈️';
	if (desc.includes('雪')) return '❄️';
	if (desc.includes('霧')) return '🌫️';

	return '🌤️';
}

/**
 * 取得溫度顏色類別
 */
export function getTemperatureColorClass(temp: number): string {
	if (temp >= 33) return 'temp-very-hot';
	if (temp >= 28) return 'temp-hot';
	if (temp >= 23) return 'temp-warm';
	if (temp >= 18) return 'temp-cool';
	if (temp >= 13) return 'temp-cold';
	return 'temp-very-cold';
}

/**
 * 取得降雨機率顏色類別
 */
export function getRainColorClass(pop: number): string {
	if (pop >= 70) return 'rain-high';
	if (pop >= 40) return 'rain-medium';
	return 'rain-low';
}

/**
 * 格式化日期為中文
 */
export function formatDateChinese(date: Date): string {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
	const weekDay = weekDays[date.getDay()];

	return `${year}年${month}月${day}日 (${weekDay})`;
}

/**
 * 取得月份名稱
 */
export function getMonthName(month: number): string {
	return `${month + 1}月`;
}

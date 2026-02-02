// src/lib/utils/time.ts

/**
 * 驗證時間格式是否為有效的 HH:MM
 * @param time - 時間字串
 * @returns 是否為有效格式
 */
export function isValidTimeFormat(time: string): boolean {
	const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
	return timeRegex.test(time);
}

/**
 * 解析時間字串為小時和分鐘
 * @param time - 時間字串 (HH:MM)
 * @returns { hours, minutes } 或 null 如果格式無效
 */
export function parseTime(time: string): { hours: number; minutes: number } | null {
	if (!isValidTimeFormat(time)) return null;
	const [hours, minutes] = time.split(':').map(Number);
	return { hours, minutes };
}

/**
 * 將小時和分鐘轉換為 HH:MM 格式
 * @param hours - 小時 (0-23)
 * @param minutes - 分鐘 (0-59)
 * @returns 格式化的時間字串或 null 如果無效
 */
export function formatTime(hours: number, minutes: number): string | null {
	if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

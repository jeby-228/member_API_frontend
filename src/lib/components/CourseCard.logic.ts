import type { Course } from '$lib/types/course';

/**
 * 格式化日期時間為 MM/DD HH:MM 格式
 */
export function formatDateTime(dateString: string): string {
	const date = new Date(dateString);
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${month}/${day} ${hours}:${minutes}`;
}

/**
 * 計算剩餘名額
 */
export function calculateAvailableSeats(course: Course): number {
	return course.capacity - course.enrolled;
}

/**
 * 判斷是否即將額滿 (剩餘名額 <= 5)
 */
export function isAlmostFull(availableSeats: number): boolean {
	return availableSeats <= 5;
}

/**
 * 判斷是否已額滿
 */
export function isFull(availableSeats: number): boolean {
	return availableSeats === 0;
}

/**
 * 取得按鈕文字
 */
export function getButtonText(availableSeats: number): string {
	return availableSeats === 0 ? '已額滿' : '立即預約';
}

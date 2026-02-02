// src/lib/utils/formatCheck.ts

/**
 * TODO: 新增函式說明
 * @param input - 輸入參數
 * @returns 回傳值說明
 */
export function emailExample(num: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(num);
}

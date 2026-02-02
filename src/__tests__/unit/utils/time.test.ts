import { formatTime, isValidTimeFormat, parseTime } from '$lib/utils/time';
import { describe, expect, it } from 'vitest';

describe('Time 工具函式', () => {
	describe('isValidTimeFormat', () => {
		it('應該驗證有效的時間格式 HH:MM', () => {
			expect(isValidTimeFormat('00:00')).toBe(true);
			expect(isValidTimeFormat('12:30')).toBe(true);
			expect(isValidTimeFormat('23:59')).toBe(true);
		});

		it('應該拒絕無效的小時數', () => {
			expect(isValidTimeFormat('24:00')).toBe(false);
			expect(isValidTimeFormat('25:30')).toBe(false);
			expect(isValidTimeFormat('-1:00')).toBe(false);
		});

		it('應該拒絕無效的分鐘數', () => {
			expect(isValidTimeFormat('12:60')).toBe(false);
			expect(isValidTimeFormat('12:-1')).toBe(false);
			expect(isValidTimeFormat('12:99')).toBe(false);
		});

		it('應該拒絕不符合格式的字串', () => {
			expect(isValidTimeFormat('12:3')).toBe(false);
			expect(isValidTimeFormat('1:30')).toBe(false);
			expect(isValidTimeFormat('12-30')).toBe(false);
			expect(isValidTimeFormat('not a time')).toBe(false);
			expect(isValidTimeFormat('')).toBe(false);
		});
	});

	describe('parseTime', () => {
		it('應該解析有效的時間字串', () => {
			const result = parseTime('14:30');
			expect(result).toEqual({ hours: 14, minutes: 30 });
		});

		it('應該處理邊界值', () => {
			expect(parseTime('00:00')).toEqual({ hours: 0, minutes: 0 });
			expect(parseTime('23:59')).toEqual({ hours: 23, minutes: 59 });
		});

		it('應該返回 null 對於無效的格式', () => {
			expect(parseTime('25:00')).toBeNull();
			expect(parseTime('12:60')).toBeNull();
			expect(parseTime('12:3')).toBeNull();
			expect(parseTime('not a time')).toBeNull();
			expect(parseTime('')).toBeNull();
		});

		it('應該正確轉換字串為數字', () => {
			const result = parseTime('09:05');
			expect(result?.hours).toBe(9);
			expect(result?.minutes).toBe(5);
		});
	});

	describe('formatTime', () => {
		it('應該格式化為 HH:MM 格式', () => {
			expect(formatTime(14, 30)).toBe('14:30');
			expect(formatTime(9, 5)).toBe('09:05');
		});

		it('應該處理邊界值', () => {
			expect(formatTime(0, 0)).toBe('00:00');
			expect(formatTime(23, 59)).toBe('23:59');
		});

		it('應該填充零到兩位數', () => {
			expect(formatTime(0, 5)).toBe('00:05');
			expect(formatTime(5, 0)).toBe('05:00');
			expect(formatTime(1, 1)).toBe('01:01');
		});

		it('應該返回 null 對於無效的時間', () => {
			expect(formatTime(24, 0)).toBeNull();
			expect(formatTime(25, 30)).toBeNull();
			expect(formatTime(-1, 30)).toBeNull();
			expect(formatTime(12, 60)).toBeNull();
			expect(formatTime(12, -1)).toBeNull();
		});

		it('應該拒絕超出範圍的值', () => {
			expect(formatTime(23, 100)).toBeNull();
			expect(formatTime(100, 30)).toBeNull();
		});
	});
});

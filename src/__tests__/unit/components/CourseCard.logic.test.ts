import {
	formatDateTime,
	calculateAvailableSeats,
	isAlmostFull,
	isFull,
	getButtonText
} from '$lib/components/CourseCard.logic';
import { describe, it, expect } from 'vitest';
import type { Course } from '$lib/types/course';

describe('CourseCard Logic', () => {
	const mockCourse: Course = {
		id: '1',
		name: '瑜伽基礎班',
		instructor: '張老師',
		startTime: '2026-02-05T09:00:00',
		endTime: '2026-02-05T10:30:00',
		location: '教室 A',
		capacity: 20,
		enrolled: 15,
		description: '適合初學者的瑜伽課程'
	};

	describe('formatDateTime', () => {
		it('應該正確格式化日期時間', () => {
			const result = formatDateTime('2026-02-05T09:00:00');
			expect(result).toBe('02/05 09:00');
		});

		it('應該補零到兩位數', () => {
			const result = formatDateTime('2026-01-05T09:05:00');
			expect(result).toBe('01/05 09:05');
		});

		it('應該處理不同月份', () => {
			expect(formatDateTime('2026-12-25T14:30:00')).toBe('12/25 14:30');
			expect(formatDateTime('2026-03-15T08:15:00')).toBe('03/15 08:15');
		});

		it('應該處理 23:59 時間', () => {
			const result = formatDateTime('2026-06-30T23:59:00');
			expect(result).toBe('06/30 23:59');
		});
	});

	describe('calculateAvailableSeats', () => {
		it('應該正確計算剩餘名額', () => {
			const result = calculateAvailableSeats(mockCourse);
			expect(result).toBe(5);
		});

		it('剩餘名額為 0 時應該回傳 0', () => {
			const fullCourse = { ...mockCourse, enrolled: 20 };
			expect(calculateAvailableSeats(fullCourse)).toBe(0);
		});

		it('無人報名時應該回傳全部名額', () => {
			const emptyCourse = { ...mockCourse, enrolled: 0 };
			expect(calculateAvailableSeats(emptyCourse)).toBe(20);
		});

		it('應該處理大型課程', () => {
			const largeCourse = { ...mockCourse, capacity: 100, enrolled: 75 };
			expect(calculateAvailableSeats(largeCourse)).toBe(25);
		});
	});

	describe('isAlmostFull', () => {
		it('剩餘 5 名額時應該回傳 true', () => {
			expect(isAlmostFull(5)).toBe(true);
		});

		it('剩餘 4 名額時應該回傳 true', () => {
			expect(isAlmostFull(4)).toBe(true);
		});

		it('剩餘 1 名額時應該回傳 true', () => {
			expect(isAlmostFull(1)).toBe(true);
		});

		it('剩餘 0 名額時應該回傳 true', () => {
			expect(isAlmostFull(0)).toBe(true);
		});

		it('剩餘 6 名額時應該回傳 false', () => {
			expect(isAlmostFull(6)).toBe(false);
		});

		it('剩餘 10 名額時應該回傳 false', () => {
			expect(isAlmostFull(10)).toBe(false);
		});
	});

	describe('isFull', () => {
		it('剩餘 0 名額時應該回傳 true', () => {
			expect(isFull(0)).toBe(true);
		});

		it('剩餘 1 名額時應該回傳 false', () => {
			expect(isFull(1)).toBe(false);
		});

		it('剩餘 5 名額時應該回傳 false', () => {
			expect(isFull(5)).toBe(false);
		});

		it('剩餘 10 名額時應該回傳 false', () => {
			expect(isFull(10)).toBe(false);
		});
	});

	describe('getButtonText', () => {
		it('額滿時應該顯示「已額滿」', () => {
			expect(getButtonText(0)).toBe('已額滿');
		});

		it('有名額時應該顯示「立即預約」', () => {
			expect(getButtonText(1)).toBe('立即預約');
			expect(getButtonText(5)).toBe('立即預約');
			expect(getButtonText(10)).toBe('立即預約');
		});
	});

	describe('整合測試', () => {
		it('應該正確處理即將額滿的課程', () => {
			const course = { ...mockCourse, enrolled: 15 };
			const available = calculateAvailableSeats(course);

			expect(available).toBe(5);
			expect(isAlmostFull(available)).toBe(true);
			expect(isFull(available)).toBe(false);
			expect(getButtonText(available)).toBe('立即預約');
		});

		it('應該正確處理已額滿的課程', () => {
			const course = { ...mockCourse, enrolled: 20 };
			const available = calculateAvailableSeats(course);

			expect(available).toBe(0);
			expect(isAlmostFull(available)).toBe(true);
			expect(isFull(available)).toBe(true);
			expect(getButtonText(available)).toBe('已額滿');
		});

		it('應該正確處理名額充足的課程', () => {
			const course = { ...mockCourse, enrolled: 10 };
			const available = calculateAvailableSeats(course);

			expect(available).toBe(10);
			expect(isAlmostFull(available)).toBe(false);
			expect(isFull(available)).toBe(false);
			expect(getButtonText(available)).toBe('立即預約');
		});
	});
});

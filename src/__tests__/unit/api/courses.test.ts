import { getAvailableCourses, getCourseById } from '$lib/api/courses';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Course } from '$lib/types/course';

describe('Courses API', () => {
	beforeEach(() => {
		vi.clearAllTimers();
	});

	describe('getAvailableCourses', () => {
		it('應該回傳課程陣列', async () => {
			const courses = await getAvailableCourses();

			expect(Array.isArray(courses)).toBe(true);
			expect(courses.length).toBeGreaterThan(0);
		});

		it('回傳的課程應該包含必要欄位', async () => {
			const courses = await getAvailableCourses();
			const firstCourse = courses[0];

			expect(firstCourse).toHaveProperty('id');
			expect(firstCourse).toHaveProperty('name');
			expect(firstCourse).toHaveProperty('instructor');
			expect(firstCourse).toHaveProperty('startTime');
			expect(firstCourse).toHaveProperty('endTime');
			expect(firstCourse).toHaveProperty('location');
			expect(firstCourse).toHaveProperty('capacity');
			expect(firstCourse).toHaveProperty('enrolled');
		});

		it('所有課程的 enrolled 應該小於等於 capacity', async () => {
			const courses = await getAvailableCourses();

			courses.forEach((course) => {
				expect(course.enrolled).toBeLessThanOrEqual(course.capacity);
			});
		});

		it('所有課程的 capacity 和 enrolled 應該是正數', async () => {
			const courses = await getAvailableCourses();

			courses.forEach((course) => {
				expect(course.capacity).toBeGreaterThan(0);
				expect(course.enrolled).toBeGreaterThanOrEqual(0);
			});
		});

		it('課程時間應該是有效的 ISO 日期字串', async () => {
			const courses = await getAvailableCourses();

			courses.forEach((course) => {
				const startDate = new Date(course.startTime);
				const endDate = new Date(course.endTime);

				expect(startDate.toString()).not.toBe('Invalid Date');
				expect(endDate.toString()).not.toBe('Invalid Date');
				expect(endDate.getTime()).toBeGreaterThan(startDate.getTime());
			});
		});

		it('應該模擬 API 延遲', async () => {
			const startTime = Date.now();
			await getAvailableCourses();
			const endTime = Date.now();

			const duration = endTime - startTime;
			expect(duration).toBeGreaterThanOrEqual(400);
		});
	});

	describe('getCourseById', () => {
		it('應該回傳正確的課程', async () => {
			const courses = await getAvailableCourses();
			const targetId = courses[0].id;

			const course = await getCourseById(targetId);

			expect(course).not.toBeNull();
			expect(course?.id).toBe(targetId);
		});

		it('應該回傳包含所有欄位的課程', async () => {
			const courses = await getAvailableCourses();
			const course = await getCourseById(courses[0].id);

			expect(course).toHaveProperty('id');
			expect(course).toHaveProperty('name');
			expect(course).toHaveProperty('instructor');
			expect(course).toHaveProperty('startTime');
			expect(course).toHaveProperty('endTime');
			expect(course).toHaveProperty('location');
			expect(course).toHaveProperty('capacity');
			expect(course).toHaveProperty('enrolled');
		});

		it('找不到課程時應該回傳 null', async () => {
			const course = await getCourseById('non-existent-id');

			expect(course).toBeNull();
		});

		it('應該模擬 API 延遲', async () => {
			const startTime = Date.now();
			await getCourseById('1');
			const endTime = Date.now();

			const duration = endTime - startTime;
			expect(duration).toBeGreaterThanOrEqual(250);
		});

		it('不同 ID 應該回傳不同課程', async () => {
			const course1 = await getCourseById('1');
			const course2 = await getCourseById('2');

			if (course1 && course2) {
				expect(course1.id).not.toBe(course2.id);
				expect(course1.name).not.toBe(course2.name);
			}
		});
	});

	describe('Mock 資料完整性', () => {
		it('所有課程應該有唯一 ID', async () => {
			const courses = await getAvailableCourses();
			const ids = courses.map((c) => c.id);
			const uniqueIds = new Set(ids);

			expect(uniqueIds.size).toBe(ids.length);
		});

		it('所有課程名稱應該是非空字串', async () => {
			const courses = await getAvailableCourses();

			courses.forEach((course) => {
				expect(typeof course.name).toBe('string');
				expect(course.name.length).toBeGreaterThan(0);
			});
		});

		it('所有教練名稱應該是非空字串', async () => {
			const courses = await getAvailableCourses();

			courses.forEach((course) => {
				expect(typeof course.instructor).toBe('string');
				expect(course.instructor.length).toBeGreaterThan(0);
			});
		});

		it('所有地點應該是非空字串', async () => {
			const courses = await getAvailableCourses();

			courses.forEach((course) => {
				expect(typeof course.location).toBe('string');
				expect(course.location.length).toBeGreaterThan(0);
			});
		});
	});
});

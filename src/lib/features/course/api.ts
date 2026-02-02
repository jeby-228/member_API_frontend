// src/lib/features/course/api.ts

import type { Course } from './types';

// Mock 資料
const mockCourses: Course[] = [
	{
		id: '1',
		name: '瑜伽基礎班',
		instructor: '張老師',
		startTime: '2026-02-05T09:00:00',
		endTime: '2026-02-05T10:30:00',
		location: '教室 A',
		capacity: 20,
		enrolled: 15,
		description: '適合初學者的瑜伽課程，著重基礎動作與呼吸調整'
	},
	{
		id: '2',
		name: '高強度間歇訓練',
		instructor: '李教練',
		startTime: '2026-02-05T14:00:00',
		endTime: '2026-02-05T15:00:00',
		location: '健身房',
		capacity: 15,
		enrolled: 12,
		description: 'HIIT 訓練課程，提升心肺功能與燃脂效率'
	},
	{
		id: '3',
		name: '皮拉提斯進階',
		instructor: '王老師',
		startTime: '2026-02-06T10:00:00',
		endTime: '2026-02-06T11:30:00',
		location: '教室 B',
		capacity: 12,
		enrolled: 8,
		description: '進階皮拉提斯課程，強化核心肌群與身體平衡'
	},
	{
		id: '4',
		name: '拳擊有氧',
		instructor: '陳教練',
		startTime: '2026-02-06T18:00:00',
		endTime: '2026-02-06T19:00:00',
		location: '健身房',
		capacity: 20,
		enrolled: 18,
		description: '結合拳擊動作的有氧運動，釋放壓力並鍛鍊全身'
	},
	{
		id: '5',
		name: '拳擊無氧',
		instructor: '劉教練',
		startTime: '2026-02-06T18:00:00',
		endTime: '2026-02-06T19:00:00',
		location: '健身房',
		capacity: 20,
		enrolled: 18,
		description: '結合拳擊動作的無氧運動，提升肌力與爆發力'
	},
	{
		id: '6',
		name: '伸展放鬆課',
		instructor: '林老師',
		startTime: '2026-02-07T19:00:00',
		endTime: '2026-02-07T20:00:00',
		location: '教室 A',
		capacity: 25,
		enrolled: 10,
		description: '緩和伸展運動，適合運動後放鬆或久坐族群'
	}
];

/**
 * 取得可預約課程列表
 */
export async function getAvailableCourses(): Promise<Course[]> {
	// 模擬 API 延遲
	await new Promise((resolve) => setTimeout(resolve, 500));

	// 未來串接實際 API 時替換成：
	// const response = await fetch('/api/courses?status=available');
	// if (!response.ok) throw new Error('Failed to fetch courses');
	// return response.json();

	return mockCourses;
}

/**
 * 取得單一課程
 */
export async function getCourseById(id: string): Promise<Course | null> {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return mockCourses.find((course) => course.id === id) || null;
}

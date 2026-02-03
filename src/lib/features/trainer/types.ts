// src/lib/features/trainer/types.ts

import type { TrainerProfile } from '../auth/types';

/**
 * 教練卡牌資料 (顯示用)
 */
export interface TrainerCard extends TrainerProfile {
	id: string;
	rating?: number; // 評分
	reviewCount?: number; // 評論數
	isAvailable?: boolean; // 目前是否可預約
}

/**
 * 教練搜尋/篩選參數
 */
export interface TrainerFilterParams {
	specialties?: string[]; // 專業領域篩選
	priceRange?: {
		min?: number;
		max?: number;
	};
	minRating?: number; // 最低評分
	sortBy?: 'rating' | 'price' | 'experience'; // 排序方式
	sortOrder?: 'asc' | 'desc';
}

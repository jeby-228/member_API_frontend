// src/lib/features/profile/types.ts

import type { StudentProfile, TrainerProfile } from '../auth/types';

export type { StudentProfile, TrainerProfile };

/**
 * 專業領域標籤
 */
export const specialtyTags = [
	'重量訓練',
	'有氧運動',
	'瑜伽',
	'皮拉提斯',
	'拳擊',
	'HIIT',
	'核心訓練',
	'伸展放鬆',
	'體能訓練',
	'功能性訓練',
	'營養指導',
	'復健訓練'
] as const;

export type SpecialtyTag = (typeof specialtyTags)[number];

/**
 * 性別選項
 */
export const genderOptions = [
	{ value: 'male', label: '男性' },
	{ value: 'female', label: '女性' },
	{ value: 'other', label: '其他' }
] as const;

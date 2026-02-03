// src/lib/features/trainer/api.ts

import type { TrainerCard, TrainerFilterParams } from './types';

// Mock 教練資料
const mockTrainers: TrainerCard[] = [
	{
		id: '1',
		userId: '101',
		name: '張教練',
		specialties: ['重量訓練', '體能訓練', '營養指導'],
		priceRange: { min: 800, max: 1500 },
		yearsOfExperience: 5,
		bio: '專精於重量訓練與體能提升，協助過上百位學員達成健身目標。持有NSCA-CPT國際認證。',
		certifications: ['/assets/certs/cert-1.jpg'],
		rating: 4.8,
		reviewCount: 45,
		isAvailable: true
	},
	{
		id: '2',
		userId: '102',
		name: '李教練',
		specialties: ['瑜伽', '皮拉提斯', '伸展放鬆'],
		priceRange: { min: 600, max: 1200 },
		yearsOfExperience: 7,
		bio: '瑜伽與皮拉提斯資深教練，專注於身心平衡與柔軟度訓練。',
		certifications: ['/assets/certs/cert-2.jpg'],
		rating: 4.9,
		reviewCount: 67,
		isAvailable: true
	},
	{
		id: '3',
		userId: '103',
		name: '王教練',
		specialties: ['拳擊', 'HIIT', '有氧運動'],
		priceRange: { min: 700, max: 1400 },
		yearsOfExperience: 4,
		bio: '前職業拳擊手，擅長高強度訓練與爆發力訓練。',
		certifications: ['/assets/certs/cert-3.jpg'],
		rating: 4.7,
		reviewCount: 38,
		isAvailable: true
	},
	{
		id: '4',
		userId: '104',
		name: '陳教練',
		specialties: ['核心訓練', '功能性訓練', '復健訓練'],
		priceRange: { min: 900, max: 1800 },
		yearsOfExperience: 8,
		bio: '物理治療背景，專精於復健與功能性訓練，協助運動傷害恢復。',
		certifications: ['/assets/certs/cert-4.jpg'],
		rating: 5.0,
		reviewCount: 92,
		isAvailable: false
	},
	{
		id: '5',
		userId: '105',
		name: '林教練',
		specialties: ['重量訓練', '營養指導'],
		priceRange: { min: 1000, max: 2000 },
		yearsOfExperience: 6,
		bio: '健美選手出身，專業營養規劃與增肌減脂訓練。',
		certifications: ['/assets/certs/cert-5.jpg'],
		rating: 4.6,
		reviewCount: 28,
		isAvailable: true
	},
	{
		id: '6',
		userId: '106',
		name: '黃教練',
		specialties: ['瑜伽', '伸展放鬆'],
		priceRange: { min: 500, max: 1000 },
		yearsOfExperience: 3,
		bio: '親和力佳的瑜伽老師，適合初學者與壓力族群。',
		certifications: [],
		rating: 4.5,
		reviewCount: 15,
		isAvailable: true
	}
];

/**
 * 取得所有教練列表
 */
export async function getAllTrainers(filters?: TrainerFilterParams): Promise<TrainerCard[]> {
	await new Promise((resolve) => setTimeout(resolve, 500));

	let filtered = [...mockTrainers];

	// 篩選專業領域
	if (filters?.specialties && filters.specialties.length > 0) {
		filtered = filtered.filter((trainer) =>
			filters.specialties!.some((specialty) => trainer.specialties.includes(specialty))
		);
	}

	// 篩選價格範圍
	if (filters?.priceRange) {
		if (filters.priceRange.min !== undefined) {
			filtered = filtered.filter((trainer) => trainer.priceRange.max >= filters.priceRange!.min!);
		}
		if (filters.priceRange.max !== undefined) {
			filtered = filtered.filter((trainer) => trainer.priceRange.min <= filters.priceRange!.max!);
		}
	}

	// 篩選最低評分
	if (filters?.minRating) {
		filtered = filtered.filter((trainer) => (trainer.rating || 0) >= filters.minRating!);
	}

	// 排序
	if (filters?.sortBy) {
		filtered.sort((a, b) => {
			let comparison = 0;

			switch (filters.sortBy) {
				case 'rating':
					comparison = (b.rating || 0) - (a.rating || 0);
					break;
				case 'price':
					comparison = a.priceRange.min - b.priceRange.min;
					break;
				case 'experience':
					comparison = b.yearsOfExperience - a.yearsOfExperience;
					break;
			}

			return filters.sortOrder === 'asc' ? -comparison : comparison;
		});
	}

	return filtered;
}

/**
 * 取得單一教練詳細資料
 */
export async function getTrainerById(id: string): Promise<TrainerCard | null> {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return mockTrainers.find((trainer) => trainer.id === id) || null;
}

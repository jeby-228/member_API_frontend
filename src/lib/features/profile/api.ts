// src/lib/features/profile/api.ts

import type { StudentProfile, TrainerProfile } from './types';

// Mock 資料儲存
const mockStudentProfiles = new Map<string, StudentProfile>();
const mockTrainerProfiles = new Map<string, TrainerProfile>();

/**
 * 取得學員個人資料
 */
export async function getStudentProfile(userId: string): Promise<StudentProfile | null> {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return mockStudentProfiles.get(userId) || null;
}

/**
 * 更新學員個人資料
 */
export async function updateStudentProfile(profile: StudentProfile): Promise<StudentProfile> {
	await new Promise((resolve) => setTimeout(resolve, 500));
	mockStudentProfiles.set(profile.userId, profile);
	return profile;
}

/**
 * 取得教練個人資料
 */
export async function getTrainerProfile(userId: string): Promise<TrainerProfile | null> {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return mockTrainerProfiles.get(userId) || null;
}

/**
 * 更新教練個人資料
 */
export async function updateTrainerProfile(profile: TrainerProfile): Promise<TrainerProfile> {
	await new Promise((resolve) => setTimeout(resolve, 500));
	mockTrainerProfiles.set(profile.userId, profile);
	return profile;
}

/**
 * 上傳證照圖片
 */
export async function uploadCertification(file: File): Promise<string> {
	await new Promise((resolve) => setTimeout(resolve, 800));

	// 模擬圖片上傳，實際應該上傳到雲端儲存
	const mockUrl = `/uploads/certifications/${Date.now()}_${file.name}`;
	return mockUrl;
}

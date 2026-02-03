// src/lib/features/auth/types.ts

/**
 * 使用者角色
 */
export type UserRole = 'student' | 'trainer';

/**
 * 使用者資料型別
 */
export interface User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	createdAt: string;
}

/**
 * 學員個人資料
 */
export interface StudentProfile {
	userId: string;
	name: string;
	gender: 'male' | 'female' | 'other';
	experience?: string;
}

/**
 * 教練個人資料
 */
export interface TrainerProfile {
	userId: string;
	name: string;
	specialties: string[]; // 專業領域 tags
	priceRange: {
		min: number;
		max: number;
	};
	yearsOfExperience: number; // 教練年資
	bio?: string; // 個人經驗概述
	certifications?: string[]; // 證照（圖片 URL）
	availableTimeSlots?: TimeSlot[];
}

/**
 * 時間區段
 */
export interface TimeSlot {
	id: string;
	dayOfWeek: number; // 0-6 (Sunday-Saturday)
	startTime: string; // HH:mm format
	endTime: string; // HH:mm format
}

/**
 * 登入請求
 */
export interface LoginRequest {
	email: string;
	password: string;
}

/**
 * 登入回應
 */
export interface LoginResponse {
	user: User;
	token: string;
}

/**
 * 註冊請求
 */
export interface RegisterRequest {
	email: string;
	password: string;
	name: string;
	role: UserRole;
}

/**
 * 註冊回應
 */
export interface RegisterResponse {
	user: User;
	token: string;
}

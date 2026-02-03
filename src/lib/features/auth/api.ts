// src/lib/features/auth/api.ts

import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from './types';

// Mock 使用者資料
const mockUsers: User[] = [
	{
		id: '1',
		email: 'trainer@example.com',
		name: '張教練',
		role: 'trainer',
		createdAt: '2026-01-01T00:00:00Z'
	},
	{
		id: '2',
		email: 'student@example.com',
		name: '李同學',
		role: 'student',
		createdAt: '2026-01-02T00:00:00Z'
	}
];

/**
 * 登入
 */
export async function login(request: LoginRequest): Promise<LoginResponse> {
	// 模擬 API 延遲
	await new Promise((resolve) => setTimeout(resolve, 800));

	// 簡單驗證 (實際應該呼叫後端 API)
	const user = mockUsers.find((u) => u.email === request.email);

	if (!user) {
		throw new Error('Email 或密碼錯誤');
	}

	// 模擬 JWT token
	const token = `mock_token_${user.id}_${Date.now()}`;

	return {
		user,
		token
	};
}

/**
 * 註冊
 */
export async function register(request: RegisterRequest): Promise<RegisterResponse> {
	// 模擬 API 延遲
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// 檢查 email 是否已存在
	if (mockUsers.some((u) => u.email === request.email)) {
		throw new Error('此 Email 已被註冊');
	}

	// 建立新使用者
	const newUser: User = {
		id: `${mockUsers.length + 1}`,
		email: request.email,
		name: request.name,
		role: request.role,
		createdAt: new Date().toISOString()
	};

	mockUsers.push(newUser);

	// 模擬 JWT token
	const token = `mock_token_${newUser.id}_${Date.now()}`;

	return {
		user: newUser,
		token
	};
}

/**
 * 登出
 */
export async function logout(): Promise<void> {
	await new Promise((resolve) => setTimeout(resolve, 300));
	// 清除本地儲存的 token
	if (typeof localStorage !== 'undefined') {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('user');
	}
}

/**
 * 驗證 token
 */
export async function verifyToken(token: string): Promise<User | null> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	// 簡單驗證 (實際應該呼叫後端 API)
	const userId = token.split('_')[2];
	return mockUsers.find((u) => u.id === userId) || null;
}

/**
 * 取得當前使用者
 */
export async function getCurrentUser(): Promise<User | null> {
	if (typeof localStorage === 'undefined') {
		return null;
	}

	const token = localStorage.getItem('auth_token');
	if (!token) {
		return null;
	}

	return verifyToken(token);
}

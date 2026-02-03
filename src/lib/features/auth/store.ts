// src/lib/features/auth/store.ts

import { writable } from 'svelte/store';
import type { User } from './types';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from './api';
import type { LoginRequest, RegisterRequest } from './types';

interface AuthState {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	error: string | null;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		user: null,
		token: null,
		isLoading: false,
		error: null
	});

	return {
		subscribe,
		/**
		 * 登入
		 */
		login: async (request: LoginRequest) => {
			update((state) => ({ ...state, isLoading: true, error: null }));

			try {
				const response = await apiLogin(request);

				// 儲存到 localStorage
				if (typeof localStorage !== 'undefined') {
					localStorage.setItem('auth_token', response.token);
					localStorage.setItem('user', JSON.stringify(response.user));
				}

				update((state) => ({
					...state,
					user: response.user,
					token: response.token,
					isLoading: false,
					error: null
				}));

				return response;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : '登入失敗';
				update((state) => ({
					...state,
					isLoading: false,
					error: errorMessage
				}));
				throw error;
			}
		},

		/**
		 * 註冊
		 */
		register: async (request: RegisterRequest) => {
			update((state) => ({ ...state, isLoading: true, error: null }));

			try {
				const response = await apiRegister(request);

				// 儲存到 localStorage
				if (typeof localStorage !== 'undefined') {
					localStorage.setItem('auth_token', response.token);
					localStorage.setItem('user', JSON.stringify(response.user));
				}

				update((state) => ({
					...state,
					user: response.user,
					token: response.token,
					isLoading: false,
					error: null
				}));

				return response;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : '註冊失敗';
				update((state) => ({
					...state,
					isLoading: false,
					error: errorMessage
				}));
				throw error;
			}
		},

		/**
		 * 登出
		 */
		logout: async () => {
			update((state) => ({ ...state, isLoading: true }));

			try {
				await apiLogout();

				set({
					user: null,
					token: null,
					isLoading: false,
					error: null
				});
			} catch (error) {
				update((state) => ({
					...state,
					isLoading: false,
					error: error instanceof Error ? error.message : '登出失敗'
				}));
			}
		},

		/**
		 * 從 localStorage 恢復登入狀態
		 */
		restoreSession: () => {
			if (typeof localStorage === 'undefined') {
				return;
			}

			const token = localStorage.getItem('auth_token');
			const userStr = localStorage.getItem('user');

			if (token && userStr) {
				try {
					const user = JSON.parse(userStr);
					update((state) => ({
						...state,
						user,
						token
					}));
				} catch {
					// 清除無效資料
					localStorage.removeItem('auth_token');
					localStorage.removeItem('user');
				}
			}
		},

		/**
		 * 清除錯誤訊息
		 */
		clearError: () => {
			update((state) => ({ ...state, error: null }));
		}
	};
}

export const authStore = createAuthStore();

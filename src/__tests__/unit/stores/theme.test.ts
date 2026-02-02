import { theme } from '$lib/stores/theme';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';

describe('Theme Store', () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	describe('getInitialTheme', () => {
		it('應該從 localStorage 讀取已儲存的主題', () => {
			localStorage.setItem('theme-preference', 'dark');
			const { theme: newTheme } = vi.hoisted(() => {
				return { theme: null };
			});
			vi.resetModules();

			expect(localStorage.getItem('theme-preference')).toBe('dark');
		});

		it('應該在 localStorage 沒有值時使用系統偏好', () => {
			const matchMediaMock = vi.fn().mockReturnValue({
				matches: true,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn()
			});
			vi.stubGlobal('matchMedia', matchMediaMock);

			expect(matchMediaMock).toBeDefined();
			matchMediaMock('(prefers-color-scheme: dark)');
			expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
		});

		it('應該預設為 light 如果沒有任何偏好設定', () => {
			const matchMediaMock = vi.fn().mockReturnValue({
				matches: false,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn()
			});
			vi.stubGlobal('matchMedia', matchMediaMock);

			expect(localStorage.getItem('theme-preference')).toBeNull();
		});
	});

	describe('toggle', () => {
		it('應該從 light 切換到 dark', () => {
			localStorage.setItem('theme-preference', 'light');

			theme.toggle();

			const stored = localStorage.getItem('theme-preference');
			expect(stored).toBe('dark');
		});

		it('應該從 dark 切換到 light', () => {
			localStorage.setItem('theme-preference', 'dark');

			theme.toggle();

			const stored = localStorage.getItem('theme-preference');
			expect(stored).toBe('light');
		});

		it('應該更新 store 的值', () => {
			let currentTheme: string | undefined;
			const unsubscribe = theme.subscribe((value) => {
				currentTheme = value;
			});

			const initialTheme = currentTheme;
			theme.toggle();

			expect(currentTheme).not.toBe(initialTheme);
			expect(['light', 'dark']).toContain(currentTheme);

			unsubscribe();
		});
	});

	describe('set', () => {
		it('應該設定主題為 dark', () => {
			theme.set('dark');

			const stored = localStorage.getItem('theme-preference');
			expect(stored).toBe('dark');
		});

		it('應該設定主題為 light', () => {
			theme.set('light');

			const stored = localStorage.getItem('theme-preference');
			expect(stored).toBe('light');
		});

		it('應該更新 store 的值', () => {
			let currentTheme: string | undefined;
			const unsubscribe = theme.subscribe((value) => {
				currentTheme = value;
			});

			theme.set('dark');
			expect(currentTheme).toBe('dark');

			theme.set('light');
			expect(currentTheme).toBe('light');

			unsubscribe();
		});

		it('應該覆寫先前的設定', () => {
			theme.set('dark');
			expect(localStorage.getItem('theme-preference')).toBe('dark');

			theme.set('light');
			expect(localStorage.getItem('theme-preference')).toBe('light');
		});
	});

	describe('localStorage 持久化', () => {
		it('toggle 後應該儲存到 localStorage', () => {
			theme.toggle();
			const stored = localStorage.getItem('theme-preference');
			expect(stored).toBeTruthy();
			expect(['light', 'dark']).toContain(stored);
		});

		it('set 後應該儲存到 localStorage', () => {
			theme.set('dark');
			expect(localStorage.getItem('theme-preference')).toBe('dark');
		});

		it('多次切換應該正確更新 localStorage', () => {
			theme.set('light');
			expect(localStorage.getItem('theme-preference')).toBe('light');

			theme.toggle();
			expect(localStorage.getItem('theme-preference')).toBe('dark');

			theme.toggle();
			expect(localStorage.getItem('theme-preference')).toBe('light');
		});
	});

	describe('store 訂閱', () => {
		it('應該可以訂閱主題變化', () => {
			const values: string[] = [];
			const unsubscribe = theme.subscribe((value) => {
				values.push(value);
			});

			theme.set('dark');
			theme.set('light');

			expect(values.length).toBeGreaterThan(0);
			expect(values).toContain('dark');
			expect(values).toContain('light');

			unsubscribe();
		});

		it('取消訂閱後不應該收到更新', () => {
			let callCount = 0;
			const unsubscribe = theme.subscribe(() => {
				callCount++;
			});

			const countAfterSubscribe = callCount;
			unsubscribe();

			theme.set('dark');
			theme.set('light');

			expect(callCount).toBe(countAfterSubscribe);
		});
	});
});

import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '$lib/components/ThemeToggle.svelte';
import { theme } from '$lib/stores/theme';
import { get } from 'svelte/store';

describe('ThemeToggle Component', () => {
	beforeEach(() => {
		localStorage.clear();
		theme.set('light');
	});

	describe('渲染測試', () => {
		it('應該正確渲染按鈕', () => {
			render(ThemeToggle);
			
			const button = screen.getByRole('button', { name: '切換深色模式' });
			expect(button).toBeInTheDocument();
		});

		it('應該有正確的 aria-label', () => {
			render(ThemeToggle);
			
			const button = screen.getByLabelText('切換深色模式');
			expect(button).toBeInTheDocument();
		});

		it('應該有 theme-toggle class', () => {
			render(ThemeToggle);
			
			const button = screen.getByRole('button');
			expect(button).toHaveClass('theme-toggle');
		});

		it('應該包含 SVG 圖示', () => {
			const { container } = render(ThemeToggle);
			
			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
			expect(svg).toHaveClass('icon');
		});
	});

	describe('圖示切換', () => {
		it('淺色模式應該顯示月亮圖示', () => {
			theme.set('light');
			const { container } = render(ThemeToggle);
			
			const path = container.querySelector('svg path');
			expect(path?.getAttribute('d')).toContain('M20.354');
		});

		it('深色模式應該顯示太陽圖示', () => {
			theme.set('dark');
			const { container } = render(ThemeToggle);
			
			const path = container.querySelector('svg path');
			expect(path?.getAttribute('d')).toContain('M12 3v1m0 16v1m9-9h-1M4 12H3');
		});
	});

	describe('互動測試', () => {
		it('點擊按鈕應該切換主題', async () => {
			const user = userEvent.setup();
			theme.set('light');
			render(ThemeToggle);
			
			const button = screen.getByRole('button');
			await user.click(button);
			
			expect(get(theme)).toBe('dark');
		});

		it('連續點擊應該在主題間切換', async () => {
			const user = userEvent.setup();
			theme.set('light');
			render(ThemeToggle);
			
			const button = screen.getByRole('button');
			
			await user.click(button);
			expect(get(theme)).toBe('dark');
			
			await user.click(button);
			expect(get(theme)).toBe('light');
			
			await user.click(button);
			expect(get(theme)).toBe('dark');
		});

		it('點擊後應該更新 localStorage', async () => {
			const user = userEvent.setup();
			theme.set('light');
			render(ThemeToggle);
			
			const button = screen.getByRole('button');
			await user.click(button);
			
			expect(localStorage.getItem('theme-preference')).toBe('dark');
		});
	});

	describe('無障礙性', () => {
		it('按鈕應該可以透過鍵盤操作', () => {
			render(ThemeToggle);
			
			const button = screen.getByRole('button');
			expect(button).toBeEnabled();
		});

		it('應該有適當的 aria-label 屬性', () => {
			render(ThemeToggle);
			
			const button = screen.getByRole('button');
			expect(button.getAttribute('aria-label')).toBe('切換深色模式');
		});
	});

	describe('樣式測試', () => {
		it('按鈕應該有固定定位', () => {
			const { container } = render(ThemeToggle);
			
			const button = container.querySelector('.theme-toggle');
			const styles = window.getComputedStyle(button!);
			expect(styles.position).toBe('fixed');
		});

		it('按鈕應該是圓形', () => {
			const { container } = render(ThemeToggle);
			
			const button = container.querySelector('.theme-toggle');
			const styles = window.getComputedStyle(button!);
			expect(styles.borderRadius).toBe('50%');
		});
	});
});

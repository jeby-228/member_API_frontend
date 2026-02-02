/**
 * UI Configuration Store
 * 全域 UI 配置，設計師可在此統一調整視覺元素
 */

import { writable } from 'svelte/store';
import type { LoadingAnimationType } from '$lib/design/animation-tokens';

interface UIConfig {
	loading: {
		defaultType: LoadingAnimationType;
		defaultSize: 'sm' | 'md' | 'lg';
		defaultSpeed: 'slow' | 'normal' | 'fast';
		gifPath: string; // GIF 動畫路徑
		showMessage: boolean;
		messages: {
			default: string;
			course: string;
			user: string;
			data: string;
		};
	};
}

const defaultConfig: UIConfig = {
	loading: {
		defaultType: 'gif', // 'spinner' | 'dots' | 'pulse' | 'gif'
		defaultSize: 'md',
		defaultSpeed: 'normal',
		gifPath: '/src/lib/assets/loading/loading-1.gif', // 自訂 GIF 路徑
		showMessage: true,
		messages: {
			default: '載入中...',
			course: '載入課程中...',
			user: '載入使用者資料...',
			data: '載入資料中...'
		}
	}
};

export const uiConfig = writable<UIConfig>(defaultConfig);

// 便利方法：切換 Loading 動畫類型
export function setLoadingAnimation(type: LoadingAnimationType) {
	uiConfig.update((config) => ({
		...config,
		loading: {
			...config.loading,
			defaultType: type
		}
	}));
}

// 便利方法：設定自訂 GIF
export function setLoadingGif(gifPath: string) {
	uiConfig.update((config) => ({
		...config,
		loading: {
			...config.loading,
			defaultType: 'gif',
			gifPath
		}
	}));
}

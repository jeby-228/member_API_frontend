/**
 * Animation Tokens - Loading 動畫系統
 * 統一管理所有 Loading 動畫的視覺參數
 */

import { colors, sizing, transitions } from './tokens';

// ============================================
// Loading 動畫類型
// ============================================
export type LoadingAnimationType = 'spinner' | 'dots' | 'pulse' | 'gif';

// ============================================
// Spinner 動畫 Token
// ============================================
export const spinnerAnimation = {
	size: sizing.spinner,
	borderWidth: {
		sm: '2px',
		md: '4px',
		lg: '6px'
	},
	color: {
		border: colors.gray[200], // 底色
		active: colors.primary // 旋轉色
	},
	speed: {
		slow: '1.5s',
		normal: '1s',
		fast: '0.5s'
	}
};

// ============================================
// Dots 動畫 Token
// ============================================
export const dotsAnimation = {
	count: 3,
	size: {
		sm: '8px',
		md: '12px',
		lg: '16px'
	},
	spacing: {
		sm: '6px',
		md: '8px',
		lg: '12px'
	},
	color: colors.primary,
	duration: '1.4s',
	delay: '0.16s' // 每個點的延遲
};

// ============================================
// Pulse 動畫 Token
// ============================================
export const pulseAnimation = {
	size: sizing.spinner,
	color: colors.primary,
	duration: '1.5s',
	opacity: {
		min: 0.3,
		max: 1
	},
	scale: {
		min: 0.8,
		max: 1.2
	}
};

// ============================================
// GIF 動畫 Token (新增)
// ============================================
export const gifAnimation = {
	size: {
		sm: '64px',
		md: '128px',
		lg: '200px'
	},
	// 預設 GIF 路徑（可在 ui-config 覆蓋）
	defaultPath: '/src/lib/assets/loading/loading-1.gif',
	// GIF 庫（設計師可新增更多）
	library: {
		loading1: '/src/lib/assets/loading/loading-1.gif',
		loading2: '/src/lib/assets/loading/loading-2.gif',
		loading3: '/src/lib/assets/loading/loading-3.gif'
	}
};

// ============================================
// Loading 容器樣式
// ============================================
export const loadingContainer = {
	padding: '3rem 1rem',
	textAlign: 'center' as const,
	message: {
		marginTop: '1rem',
		fontSize: '1.125rem',
		color: 'var(--text-secondary)'
	}
};

// ============================================
// 預設配置
// ============================================
export const defaultLoadingConfig = {
	type: 'spinner' as LoadingAnimationType,
	size: 'md' as 'sm' | 'md' | 'lg',
	speed: 'normal' as 'slow' | 'normal' | 'fast',
	gifPath: gifAnimation.defaultPath, // GIF 路徑
	showMessage: true,
	messages: {
		default: '載入中...',
		course: '載入課程中...',
		user: '載入使用者資料...',
		data: '載入資料中...'
	}
};

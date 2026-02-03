/**
 * Component Tokens - 元件專屬的設計 Token
 * 為每個元件類型定義統一的樣式規範
 */

import { spacing, borders, shadows, transitions, typography } from './tokens';

// ============================================
// Button Token
// ============================================
export const button = {
	padding: {
		sm: `${spacing.sm} ${spacing.md}`, // 0.5rem 1rem
		md: `${spacing.md} ${spacing.lg}`, // 1rem 1.5rem
		lg: `${spacing.lg} ${spacing.xl}` // 1.5rem 2rem
	},
	fontSize: {
		sm: typography.fontSize.sm,
		md: typography.fontSize.base,
		lg: typography.fontSize.lg
	},
	fontWeight: typography.fontWeight.medium,
	borderRadius: borders.radius.md,
	transition: transitions.smooth,
	boxShadow: {
		default: shadows.button,
		hover: shadows.md
	}
};

// ============================================
// Card Token
// ============================================
export const card = {
	padding: spacing.xl, // 1.5rem
	borderRadius: borders.radius.lg, // 8px
	border: `${borders.width.thin} solid var(--border-color)`,
	background: 'var(--card-bg)',
	boxShadow: {
		default: shadows.none,
		hover: shadows.cardHover
	},
	transition: `box-shadow ${transitions.duration.normal} ${transitions.timing.ease}`
};

// ============================================
// Badge Token
// ============================================
export const badge = {
	padding: `${spacing.xs} ${spacing.md}`, // 0.25rem 0.75rem
	fontSize: typography.fontSize.sm,
	fontWeight: typography.fontWeight.medium,
	borderRadius: borders.radius.full, // 藥丸形狀
	colors: {
		success: {
			text: '#10b981',
			background: '#d1fae5'
		},
		warning: {
			text: '#f59e0b',
			background: '#fef3c7'
		},
		danger: {
			text: '#dc3545',
			background: '#fee2e2'
		},
		info: {
			text: '#17a2b8',
			background: '#cff4fc'
		},
		default: {
			text: 'var(--text-color)',
			background: 'var(--bg-secondary)'
		}
	}
};

// ============================================
// Input Token
// ============================================
export const input = {
	padding: `${spacing.sm} ${spacing.md}`,
	fontSize: typography.fontSize.base,
	border: `${borders.width.thin} solid var(--border-color)`,
	borderRadius: borders.radius.md,
	background: 'var(--bg-color)',
	color: 'var(--text-color)',
	transition: `border-color ${transitions.duration.normal} ${transitions.timing.ease}`,
	focus: {
		borderColor: 'var(--primary)',
		boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
	},
	disabled: {
		background: 'var(--bg-secondary)',
		cursor: 'not-allowed',
		opacity: '0.6'
	}
};

// ============================================
// Modal Token
// ============================================
export const modal = {
	backdrop: {
		background: 'rgba(0, 0, 0, 0.5)',
		backdropFilter: 'blur(4px)'
	},
	content: {
		padding: spacing['2xl'],
		borderRadius: borders.radius.xl,
		background: 'var(--card-bg)',
		boxShadow: shadows.modal,
		maxWidth: '600px'
	}
};

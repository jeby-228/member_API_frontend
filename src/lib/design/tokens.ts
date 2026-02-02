/**
 * Design Tokens - 設計系統的基礎視覺元素
 * 所有視覺樣式的單一來源（Single Source of Truth）
 */

// ============================================
// 1. 顏色系統 (Colors)
// ============================================
export const colors = {
	// 主要色彩
	primary: '#2563eb',
	primaryHover: '#1d4ed8',
	primaryLight: '#3b82f6',
	primaryDark: '#1e40af',

	// 語義色彩
	success: '#10b981',
	successBg: '#d1fae5',
	warning: '#f59e0b',
	warningBg: '#fef3c7',
	danger: '#dc3545',
	dangerBg: '#fee2e2',
	info: '#17a2b8',
	infoBg: '#cff4fc',

	// 中性色
	white: '#ffffff',
	black: '#000000',
	gray: {
		50: '#fcfcfd',
		100: '#f8f9fa',
		200: '#e9ecef',
		300: '#dee2e6',
		400: '#ced4da',
		500: '#adb5bd',
		600: '#6c757d',
		700: '#495057',
		800: '#343a40',
		900: '#212529'
	}
};

// ============================================
// 2. 間距系統 (Spacing)
// ============================================
export const spacing = {
	xs: '0.25rem', // 4px
	sm: '0.5rem', // 8px
	md: '1rem', // 16px
	lg: '1.5rem', // 24px
	xl: '2rem', // 32px
	'2xl': '3rem', // 48px
	'3xl': '4rem', // 64px
	'4xl': '6rem' // 96px
};

// ============================================
// 3. 字體系統 (Typography)
// ============================================
export const typography = {
	fontFamily: {
		base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
		mono: "'Courier New', Courier, monospace"
	},
	fontSize: {
		xs: '0.75rem', // 12px
		sm: '0.875rem', // 14px
		base: '1rem', // 16px
		lg: '1.125rem', // 18px
		xl: '1.25rem', // 20px
		'2xl': '1.5rem', // 24px
		'3xl': '2rem', // 32px
		'4xl': '2.5rem' // 40px
	},
	lineHeight: {
		tight: 1.2,
		base: 1.5,
		relaxed: 1.75,
		loose: 2
	},
	fontWeight: {
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700
	},
	letterSpacing: {
		tighter: '-0.05em',
		tight: '-0.025em',
		normal: '0',
		wide: '0.025em',
		wider: '0.05em'
	}
};

// ============================================
// 4. 陰影系統 (Shadows)
// ============================================
export const shadows = {
	none: 'none',
	xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
	sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
	md: '0 4px 8px rgba(0, 0, 0, 0.1)',
	lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
	xl: '0 12px 24px rgba(0, 0, 0, 0.2)',
	'2xl': '0 24px 48px rgba(0, 0, 0, 0.25)',

	// 語義化陰影
	card: '0 4px 12px var(--card-hover-shadow)',
	cardHover: '0 8px 16px rgba(0, 0, 0, 0.15)',
	button: '0 2px 4px rgba(0, 0, 0, 0.1)',
	dropdown: '0 8px 16px rgba(0, 0, 0, 0.15)',
	modal: '0 24px 48px rgba(0, 0, 0, 0.3)',

	// 內陰影
	inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',

	// 彩色發光
	primaryGlow: '0 4px 12px rgba(37, 99, 235, 0.3)',
	dangerGlow: '0 4px 12px rgba(220, 53, 69, 0.3)'
};

// ============================================
// 5. 邊框系統 (Borders)
// ============================================
export const borders = {
	width: {
		none: '0',
		thin: '1px',
		medium: '2px',
		thick: '4px'
	},
	style: {
		solid: 'solid',
		dashed: 'dashed',
		dotted: 'dotted',
		none: 'none'
	},
	radius: {
		none: '0',
		sm: '0.25rem', // 4px
		md: '0.375rem', // 6px
		lg: '0.5rem', // 8px
		xl: '0.75rem', // 12px
		'2xl': '1rem', // 16px
		full: '9999px' // 圓形/藥丸
	}
};

// ============================================
// 6. 過渡與動畫 (Transitions & Animations)
// ============================================
export const transitions = {
	duration: {
		instant: '0s',
		fast: '0.1s',
		normal: '0.2s',
		slow: '0.3s',
		slower: '0.5s'
	},
	timing: {
		linear: 'linear',
		ease: 'ease',
		easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
		easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
		easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
		bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
	},
	// 常用組合
	smooth: 'all 0.3s ease',
	fade: 'opacity 0.2s ease-in-out',
	slideUp: 'transform 0.3s ease-out'
};

// ============================================
// 7. 透明度 (Opacity)
// ============================================
export const opacity = {
	transparent: '0',
	faint: '0.1',
	light: '0.25',
	medium: '0.5',
	strong: '0.75',
	opaque: '1',

	// 語義化
	disabled: '0.4',
	hover: '0.8',
	loading: '0.6',
	overlay: '0.5'
};

// ============================================
// 8. Z-Index 層級
// ============================================
export const zIndex = {
	base: 0,
	dropdown: 1000,
	sticky: 1020,
	fixed: 1030,
	modalBackdrop: 1040,
	modal: 1050,
	popover: 1060,
	tooltip: 1070,
	notification: 1080
};

// ============================================
// 9. 游標 (Cursor)
// ============================================
export const cursors = {
	auto: 'auto',
	default: 'default',
	pointer: 'pointer',
	notAllowed: 'not-allowed',
	wait: 'wait',
	text: 'text',
	move: 'move',
	grab: 'grab',
	grabbing: 'grabbing'
};

// ============================================
// 10. 響應式斷點 (Breakpoints)
// ============================================
export const breakpoints = {
	xs: '320px',
	sm: '576px',
	md: '768px',
	lg: '992px',
	xl: '1200px',
	'2xl': '1400px'
};

// ============================================
// 11. 尺寸系統 (Sizing)
// ============================================
export const sizing = {
	icon: {
		xs: '1rem', // 16px
		sm: '1.25rem', // 20px
		md: '1.5rem', // 24px
		lg: '2rem', // 32px
		xl: '3rem' // 48px
	},
	button: {
		sm: '2rem', // 32px
		md: '2.5rem', // 40px
		lg: '3rem' // 48px
	},
	spinner: {
		sm: '24px',
		md: '48px',
		lg: '64px'
	}
};

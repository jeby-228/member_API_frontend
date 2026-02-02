# Design System 使用指南

> 本專案的設計系統基於 Design Token，設計師可以統一調整全站視覺風格。

## 📁 檔案結構

```
src/lib/
├── design/                      # 設計 Token
│   ├── tokens.ts                # 基礎 Token（顏色、間距、字體等）
│   ├── animation-tokens.ts      # 動畫 Token（Loading 動畫參數）
│   ├── component-tokens.ts      # 元件 Token（Button、Card 等）
│   └── index.ts                 # 統一匯出
├── components/
│   └── atoms/                   # 原子元件
│       ├── Spinner.svelte       # 旋轉 Loading
│       ├── DotsAnimation.svelte # 三點跳動
│       ├── PulseAnimation.svelte# 脈衝動畫
│       └── LoadingAnimation.svelte # Loading 統一入口
└── stores/
    └── ui-config.ts             # 全域 UI 配置
```

---

## 🎨 設計師快速操作指南

### 1️⃣ 切換全站 Loading 動畫

#### **方法 A：修改配置檔（推薦）**

編輯 `src/lib/stores/ui-config.ts`：

```typescript
const defaultConfig: UIConfig = {
	loading: {
		defaultType: 'dots', // ← 改這裡！'spinner' | 'dots' | 'pulse'
		defaultSize: 'lg', // 尺寸：'sm' | 'md' | 'lg'
		defaultSpeed: 'fast' // 速度：'slow' | 'normal' | 'fast'
		// ...
	}
};
```

**效果：全站所有 Loading 動畫立即更新！**

---

#### **方法 B：使用指令行（最快）**

```bash
# 切換為 Dots 動畫
just set-loading dots

# 切換為 Pulse 動畫
just set-loading pulse

# 切換回 Spinner
just set-loading spinner
```

---

### 2️⃣ 調整 Loading 動畫參數

#### **Spinner 參數**

編輯 `src/lib/design/animation-tokens.ts`：

```typescript
export const spinnerAnimation = {
	size: {
		sm: '24px',
		md: '48px', // ← 改這裡調整大小
		lg: '64px'
	},
	borderWidth: {
		sm: '2px',
		md: '4px', // ← 改這裡調整線條粗細
		lg: '6px'
	},
	color: {
		border: '#e5e7eb', // ← 底色
		active: '#2563eb' // ← 旋轉色
	},
	speed: {
		slow: '1.5s',
		normal: '1s', // ← 改這裡調整速度
		fast: '0.5s'
	}
};
```

---

#### **Dots 參數**

```typescript
export const dotsAnimation = {
	count: 3, // ← 點的數量
	size: {
		sm: '8px',
		md: '12px', // ← 點的大小
		lg: '16px'
	},
	spacing: {
		sm: '6px',
		md: '8px', // ← 點之間的間距
		lg: '12px'
	},
	color: '#2563eb', // ← 點的顏色
	duration: '1.4s', // ← 動畫時間
	delay: '0.16s' // ← 每個點的延遲
};
```

---

#### **Pulse 參數**

```typescript
export const pulseAnimation = {
	size: {
		sm: '24px',
		md: '48px', // ← 圓形大小
		lg: '64px'
	},
	color: '#2563eb', // ← 顏色
	duration: '1.5s', // ← 脈衝週期
	opacity: {
		min: 0.3, // ← 最小透明度
		max: 1 // ← 最大透明度
	},
	scale: {
		min: 0.8, // ← 最小縮放
		max: 1.2 // ← 最大縮放
	}
};
```

---

### 3️⃣ 修改全站顏色

編輯 `src/lib/design/tokens.ts`：

```typescript
export const colors = {
	primary: '#2563eb', // ← 主色調
	primaryHover: '#1d4ed8', // ← Hover 顏色
	success: '#10b981', // ← 成功色
	warning: '#f59e0b', // ← 警告色
	danger: '#dc3545' // ← 危險色
	// ...
};
```

**效果：**

- 按鈕顏色統一更新
- Badge 顏色統一更新
- Loading 動畫顏色統一更新

---

### 4️⃣ 調整間距系統

編輯 `src/lib/design/tokens.ts`：

```typescript
export const spacing = {
	xs: '0.25rem', // 4px
	sm: '0.5rem', // 8px
	md: '1rem', // 16px  ← 改這裡調整標準間距
	lg: '1.5rem', // 24px
	xl: '2rem' // 32px
	// ...
};
```

---

### 5️⃣ 修改動畫速度

編輯 `src/lib/design/tokens.ts`：

```typescript
export const transitions = {
	duration: {
		instant: '0s',
		fast: '0.1s',
		normal: '0.2s', // ← 改這裡調整標準速度
		slow: '0.3s',
		slower: '0.5s'
	},
	timing: {
		ease: 'ease',
		easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // ← 緩動函數
		bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
	}
};
```

---

## 🎬 Loading 動畫預覽

### Spinner（旋轉）

```
⭕ → 旋轉圓圈
適合：通用場景
```

### Dots（三點跳動）

```
● ○ ○ → ○ ● ○ → ○ ○ ●
適合：輕量級、可愛風格
```

### Pulse（脈衝）

```
● → ◎ → ◯ → ◎ → ●
適合：呼吸感、柔和風格
```

---

## 🚀 測試變更

### 1. 啟動開發伺服器

```bash
just run
```

### 2. 訪問測試頁面

```
http://localhost:5173
```

### 3. 測試 Loading 動畫

- 頁面載入時會顯示 Loading
- 可切換深色模式查看效果

---

## 📋 常見問題

### Q1：如何臨時改變某個頁面的 Loading 動畫？

**A：** 在元件中傳入 props：

```svelte
<!-- 使用不同的動畫 -->
<LoadingAnimation type="dots" size="lg" message="載入中..." />

<!-- 使用預設配置 -->
<LoadingAnimation />
```

---

### Q2：如何新增自訂動畫？

**A：** 三步驟：

1. 在 `src/lib/components/atoms/` 建立新元件（如 `WaveAnimation.svelte`）
2. 在 `animation-tokens.ts` 定義參數
3. 在 `LoadingAnimation.svelte` 加入條件判斷

---

### Q3：改完 Token 需要重啟伺服器嗎？

**A：** 不需要！Vite 會自動熱更新（HMR），儲存檔案後瀏覽器立即更新。

---

### Q4：如何確保深色模式正常？

**A：** Token 使用 CSS 變數，深色模式會自動切換。檢查 `src/styles/global.scss` 中的 `:root.dark` 設定。

---

## 🎯 最佳實踐

1. ✅ **修改 Token，不改元件** - 讓元件讀取 Token 值
2. ✅ **使用語義化命名** - `--btn-primary` 比 `--blue` 好
3. ✅ **測試深色模式** - 確保兩種模式都正常
4. ✅ **保持一致性** - 所有按鈕用同一套參數
5. ✅ **文件化變更** - 在 Git 提交訊息說明改了什麼

---

## 📞 需要幫助？

- 查看 `src/lib/design/` 目錄下的註解
- 參考現有元件的使用方式
- 聯繫開發團隊

---

**設計系統版本：1.0.0**  
**最後更新：2026-02-02**

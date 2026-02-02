# 🎬 GIF Loading 動畫使用指南

> 如何使用自訂 GIF 作為 Loading 動畫

## 📁 檔案位置

將 GIF 檔案放在：

```
src/lib/assets/loading/
├── loading-1.gif  ← 你的 GIF
├── loading-2.gif
└── loading-3.gif
```

---

## 🚀 使用方式

### **方法 1：使用指令行（推薦）**

```bash
# 使用預設 GIF
just set-loading gif

# 使用自訂 GIF
just set-loading-gif /src/lib/assets/loading/loading-1.gif
```

---

### **方法 2：修改配置檔**

編輯 `src/lib/stores/ui-config.ts`：

```typescript
const defaultConfig: UIConfig = {
	loading: {
		defaultType: 'gif', // ← 改成 'gif'
		gifPath: '/src/lib/assets/loading/loading-1.gif' // ← 你的 GIF 路徑
		// ...
	}
};
```

---

### **方法 3：在元件中直接使用**

```svelte
<script>
	import { LoadingAnimation } from '$lib/components/atoms';
</script>

<!-- 使用自訂 GIF -->
<LoadingAnimation
	type="gif"
	gifPath="/src/lib/assets/loading/loading-1.gif"
	size="lg"
	message="載入中..."
/>
```

---

### **方法 4：使用測試頁面（視覺化）**

1. 啟動開發伺服器：`just run`
2. 訪問：http://localhost:5173/demo
3. 選擇「GIF（自訂動畫）」
4. 輸入 GIF 路徑
5. 點擊「套用到全站」

---

## 🎨 GIF 動畫建議規格

### **尺寸**

- **小型（sm）**：64x64 px
- **中型（md）**：128x128 px（推薦）
- **大型（lg）**：200x200 px

### **檔案大小**

- 建議 < 500 KB（載入快速）
- 最大不超過 1 MB

### **格式建議**

- ✅ GIF（動畫）
- ✅ APNG（更高畫質）
- ✅ WebP（更小檔案）

### **背景**

- 建議使用透明背景
- 或純色背景（深色模式會自動調整）

---

## 📦 GIF 動畫庫

你可以在 `animation-tokens.ts` 定義 GIF 庫：

```typescript
// src/lib/design/animation-tokens.ts
export const gifAnimation = {
	library: {
		loading1: '/src/lib/assets/loading/loading-1.gif',
		loading2: '/src/lib/assets/loading/loading-2.gif',
		loading3: '/src/lib/assets/loading/loading-3.gif',
		cute: '/src/lib/assets/loading/cute-cat.gif',
		spinner: '/src/lib/assets/loading/spinner.gif'
	}
};
```

然後在程式中使用：

```typescript
import { gifAnimation } from '$lib/design/animation-tokens';

// 使用預定義的 GIF
const gifPath = gifAnimation.library.cute;
```

---

## 🎯 實際範例

### **範例 1：課程頁面使用自訂 GIF**

```svelte
<!-- src/lib/features/course/components/LoadingState.svelte -->
<script lang="ts">
	import { LoadingAnimation } from '$lib/components/atoms';
</script>

<LoadingAnimation
	type="gif"
	gifPath="/src/lib/assets/loading/loading-1.gif"
	message="載入課程中..."
/>
```

---

### **範例 2：條件式切換動畫**

```svelte
<script>
	import { LoadingAnimation } from '$lib/components/atoms';

	let useGif = $state(true); // 根據需求切換
</script>

{#if isLoading}
	{#if useGif}
		<LoadingAnimation type="gif" gifPath="/src/lib/assets/loading/loading-1.gif" />
	{:else}
		<LoadingAnimation type="spinner" />
	{/if}
{/if}
```

---

### **範例 3：根據主題切換 GIF**

```svelte
<script>
	import { theme } from '$lib/stores/theme';
	import { LoadingAnimation } from '$lib/components/atoms';

	const gifPath = $derived(
		$theme === 'dark'
			? '/src/lib/assets/loading/dark-loading.gif'
			: '/src/lib/assets/loading/light-loading.gif'
	);
</script>

<LoadingAnimation type="gif" {gifPath} />
```

---

## 💡 進階用法

### **動態載入 GIF**

```typescript
// src/lib/design/animation-tokens.ts
export const gifAnimation = {
	// 根據環境載入不同 GIF
	getGifPath(env: string) {
		const paths = {
			production: '/assets/loading/production.gif',
			development: '/assets/loading/dev.gif',
			test: '/assets/loading/test.gif'
		};
		return paths[env] || paths.development;
	}
};
```

---

### **隨機 GIF**

```typescript
// 隨機選擇一個 GIF
import { gifAnimation } from '$lib/design/animation-tokens';

const gifLibrary = Object.values(gifAnimation.library);
const randomGif = gifLibrary[Math.floor(Math.random() * gifLibrary.length)];
```

---

## 🔧 調整 GIF 大小

編輯 `src/lib/design/animation-tokens.ts`：

```typescript
export const gifAnimation = {
	size: {
		sm: '64px', // 改成你想要的尺寸
		md: '150px', // 預設 128px
		lg: '250px' // 預設 200px
	}
};
```

---

## 📊 效能考量

### **GIF vs CSS 動畫效能比較**

| 項目     | GIF       | CSS 動畫       |
| -------- | --------- | -------------- |
| 檔案大小 | 50-500 KB | 0 KB（純 CSS） |
| CPU 使用 | 中等      | 低（GPU 加速） |
| 可客製化 | 低        | 高             |
| 載入時間 | 需下載    | 即時           |
| 適合場景 | 品牌動畫  | 通用場景       |

### **建議**

- ✅ 品牌識別、特殊動畫 → 使用 GIF
- ✅ 一般 Loading → 使用 CSS 動畫（Spinner/Dots/Pulse）
- ✅ 混合使用：主要頁面用 GIF，次要頁面用 CSS

---

## 🎨 尋找 GIF 資源

### **免費 GIF 網站**

- [LottieFiles](https://lottiefiles.com/) - 高品質動畫（需轉換）
- [Giphy](https://giphy.com/) - 海量 GIF
- [Loading.io](https://loading.io/) - 專業 Loading 動畫

### **自製 GIF 工具**

- Adobe After Effects + LottieFiles Plugin
- Figma + Figmotion Plugin
- Online GIF Maker

---

## ⚠️ 注意事項

1. **版權問題**：確保你有使用 GIF 的權利
2. **檔案大小**：過大的 GIF 會拖慢載入速度
3. **深色模式**：確保 GIF 在兩種模式下都可見
4. **無障礙**：記得加上 `alt` 文字描述

---

## 🐛 常見問題

### Q1：GIF 不顯示？

**A：** 檢查路徑是否正確，確保 GIF 在 `src/lib/assets/loading/` 資料夾

### Q2：GIF 太大載入慢？

**A：** 使用線上工具壓縮 GIF（如 ezgif.com）

### Q3：深色模式下 GIF 看不清？

**A：** 使用透明背景的 GIF，或準備兩個版本

### Q4：如何在多個頁面使用不同 GIF？

**A：** 在元件中直接傳入 `gifPath` prop

---

## 📖 相關文件

- [Design System 使用指南](Design_System.md)
- [Animation Tokens 說明](../src/lib/design/animation-tokens.ts)
- [UI Config Store](../src/lib/stores/ui-config.ts)

---

**更新日期：2026-02-02**  
**版本：1.1.0**

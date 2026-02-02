---
description: Copilot AI 協作指引 - 程式碼風格與開發原則
---

# Copilot 指引

## 核心原則

1. **簡單至上**：不要過度設計功能和架構，保持程式碼簡潔易懂
2. **一件事做好**：每個函式、元件、模組只負責一項職責
3. **清晰優於聰明**：程式碼應該易於閱讀和維護，而不是追求最少行數
4. **測試先行**：在實作新功能前考慮如何測試

## 專案技術棧

- **框架**：SvelteKit 5+
- **語言**：TypeScript
- **樣式**：Svelte 內建 scoped CSS 或 Tailwind CSS
- **狀態管理**：Svelte stores
- **部署**：Vercel
- **CI/CD**：GitHub Actions 搭配 just

## 程式碼風格

### 一般原則

- 程式只做好一件事
- 避免不必要的註解（程式碼應該自我說明）
- 使用小寫字母並儘量簡短
- 資料應該儲存為文字檔案（JSON、YAML）
- 可移植性比效率更重要

### UNIX 哲學

- 小即是美
- 讓程式只做好一件事
- 儘可能早地建立原型
- 沉默是金（減少不必要的日誌輸出）
- 並列地思考
- 部分加部分大於整體

## 命名規則

- **變數**：camelCase（JavaScript/TypeScript 標準）
  - 布林變數用 `is` 或 `has` 開頭：`isVisible`、`hasError`
  - 陣列變數用複數：`users`、`items`
- **函式**：動詞開頭，使用 camelCase
  - 查詢函式：`getUserById()`、`fetchData()`
  - 變更函式：`updateUser()`、`deleteItem()`
  - 檢查函式：`isValid()`、`hasPermission()`
- **常數**：UPPER_SNAKE_CASE
  - 例：`API_BASE_URL`、`DEFAULT_TIMEOUT`
- **元件**：PascalCase
  - 例：`UserCard.svelte`、`LoginForm.svelte`

## SvelteKit 開發規範

### 路由與檔案結構

```
src/
├── routes/                # 路由（基於檔案系統）
│   ├── +layout.svelte     # 根布局
│   ├── +page.svelte       # 首頁
│   └── [id]/
│       └── +page.svelte   # 動態路由
├── lib/
│   ├── components/        # 可重用 Svelte 元件
│   ├── stores/            # Svelte stores（狀態管理）
│   ├── api/               # API 呼叫函式
│   ├── utils/             # 工具函式
│   └── config.ts          # 全域設定
└── styles/                # 全域樣式（如有）
```

### 元件設計

- 一個檔案一個元件
- 元件名稱用 PascalCase
- Props 定義使用 `let` 宣告：
  ```svelte
  <script lang="ts">
  	export let title: string;
  	export let count: number = 0;
  </script>
  ```
- 事件分發使用 `createEventDispatcher`
- Svelte 內建 scoped CSS，避免全域樣式污染

### 狀態管理

- 使用 Svelte stores 管理共享狀態
- Store 檔案放在 `src/lib/stores/`
- 使用 `writable`、`readable`、`derived` stores
- 避免過度複雜的狀態樹

### TypeScript 使用

- 所有檔案使用 `.ts` 或 `.svelte` 擴展名
- 定義 types 和 interfaces 在 `lib/types/` 或檔案頂部
- 不要使用 `any` 型別，儘量精確定義

## API 串接原則

### RESTful 設計

- 使用適當的 HTTP 方法：GET（獲取）、POST（建立）、PUT（更新）、DELETE（刪除）
- 清晰且有意義的端點命名（複數名詞）：`/api/users`、`/api/posts`
- 路徑層級不超過 2 層：`/api/users/:id/posts`
- 使用標準的 HTTP 狀態碼：
  - 200 OK、201 Created
  - 400 Bad Request、401 Unauthorized、403 Forbidden
  - 404 Not Found、500 Internal Server Error
- 提供分頁、篩選、排序功能
- 使用 JSON 作為資料交換格式
- 提供詳細的錯誤訊息（含 error code 和 message）
- 保持向後相容性

### API 呼叫封裝

在 `src/lib/api/` 中建立 API 函式：

```typescript
// src/lib/api/users.ts
export async function getUser(id: string) {
	const response = await fetch(`/api/users/${id}`);
	if (!response.ok) throw new Error('Failed to fetch user');
	return response.json();
}
```

## UI 設計原則

### 視覺設計

- **一致性（Consistency）**：統一色彩、字型、間距，建立識別系統
- **簡潔性（Simplicity）**：內容優先，減少不必要的視覺元素
- **視覺層級（Hierarchy）**：透過尺寸、顏色、對比引導使用者注意力
- **即時回饋（Feedback）**：所有互動都應有視覺反應（loading、error、success）
- **心理預期（Mental Models）**：遵守使用者既有認知（如放大鏡代表搜尋）

### 無障礙性（A11y）

- 使用語意化 HTML：`<button>`、`<nav>`、`<main>`
- 為互動元素提供 `aria-label` 或 `title` 屬性
- 確保顏色對比度足夠（WCAG AA 標準）
- 支援鍵盤導航（Tab、Enter、Escape）

## 開發流程

### 優先使用justfile 提供的任務來解決問題

### Commit 規範

使用清晰的 commit 訊息：

```
feat: 新增使用者登入功能
fix: 修復路由導航錯誤
docs: 更新 README 文件
style: 調整元件樣式
refactor: 優化 API 呼叫邏輯
test: 新增單元測試
chore: 更新依賴套件
```

### 測試

- 撰寫單元測試涵蓋核心邏輯
- 使用 Vitest 或 Jest 進行測試
- 測試檔案放在 `src/__tests__/` 或元件同級目錄

### 建置與部署

- 使用 `npm run build` 建置
- 使用 `just` 執行常見任務（見 justfile）
- CI 會自動測試、建置並部署到 Vercel

---
description: GitHub Copilot 協作指引 - SvelteKit 5 專案開發規範
---

# GitHub Copilot 指引

> 本指引定義專案的開發規範、架構模式和最佳實踐，確保程式碼品質與一致性。

## 核心原則

### 1. 簡單至上（KISS - Keep It Simple, Stupid）

- ✅ 不要過度設計功能和架構
- ✅ 保持程式碼簡潔易懂
- ✅ 優先使用標準方案，避免過度抽象
- ❌ 不要為了「可能」的需求預先建立複雜架構

### 2. 單一職責（SRP - Single Responsibility Principle）

- ✅ 每個函式只負責一項工作
- ✅ 每個元件只處理一個功能
- ✅ 每個模組有清楚的邊界
- ❌ 不要建立「萬能」函式或元件

### 3. 可讀性優先（Code Readability）

- ✅ 程式碼應該自我說明
- ✅ 清晰的命名比聰明的實作重要
- ✅ 複雜邏輯必須加上註解說明
- ❌ 不要為了減少行數犧牲可讀性

### 4. 測試先行（Test-First）

- ✅ 工具函式必須撰寫單元測試（覆蓋率 ≥ 80%）
- ✅ API 使用整合測試（MSW 或真實環境）
- ✅ 複雜邏輯抽離到 utils 層並測試
- ❌ 不要 Mock fetch 測試 API（無法測試真實行為）

### 5. UNIX 哲學

- ✅ 小即是美（Small is beautiful）
- ✅ 讓程式只做好一件事（Do one thing well）
- ✅ 儘早建立原型（Build prototypes quickly）
- ✅ 資料儲存為文字格式（JSON、YAML）
- ✅ 可移植性比效率重要
---

## 技術棧

| 技術           | 版本 | 用途               |
| -------------- | ---- | ------------------ |
| **SvelteKit**  | 5+   | 前端框架           |
| **TypeScript** | 5+   | 型別系統           |
| **Vite**       | 6+   | 建置工具           |
| **Vitest**     | 2+   | 測試框架           |
| **MSW**        | 2+   | API Mock（測試用） |
| **Prettier**   | -    | 程式碼格式化       |
| **Just**       | -    | 任務執行器         |

---

## 專案架構

### 檔案結構

```
src/
├── routes/              # SvelteKit 路由
├── lib/
│   ├── features/        # 功能模組（推薦）
│   │   └── course/
│   │       ├── components/  # 功能專屬元件
│   │       ├── api.ts       # API 函式
│   │       ├── types.ts     # 型別定義
│   │       ├── store.ts     # 狀態管理
│   │       ├── utils.ts     # 工具函式
│   │       └── index.ts     # 統一匯出
│   ├── components/      # 通用元件
│   │   ├── atoms/       # 原子元件
│   │   ├── molecules/   # 分子元件
│   │   └── organisms/   # 有機體元件
│   ├── api/             # API 函式（傳統架構）
│   ├── utils/           # 工具函式
│   └── stores/          # 全域狀態
└── __tests__/           # 測試檔案
    ├── unit/            # 單元測試
    ├── integration/     # 整合測試
    └── mocks/           # MSW Handlers
```

---

## 測試策略

### 測試金字塔

```
        /\
       /E2E\        ← 少量（關鍵流程）
      /____\
     /      \
    /  API   \      ← 適量（整合測試）
   /__________\
  /            \
 /    Utils     \   ← 大量（單元測試）
/________________\
```

### 測試範圍

| 層級         | 測試方式 | 工具                   | 覆蓋率目標 |
| ------------ | -------- | ---------------------- | ---------- |
| **Utils 層** | 單元測試 | Vitest                 | ≥ 80%      |
| **API 層**   | 整合測試 | MSW                    | 主要 API   |
| **元件層**   | 元件測試 | Testing Library (可選) | 關鍵元件   |
| **頁面層**   | E2E 測試 | Playwright (可選)      | 關鍵流程   |

### ❌ 錯誤的測試方式

```typescript
// ❌ 不要 Mock fetch 測試 API
describe('getUser', () => {
	it('should fetch user', async () => {
		global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => ({ id: '1' }) }));
		const user = await getUser('1');
		expect(user.id).toBe('1');
	});
});
```

**問題：**

- 只測試了 fetch 的呼叫，沒有測試真實 API
- API 行為改變時測試不會發現
- 維護成本高

### ✅ 正確的測試方式

#### 1. 工具函式用單元測試

```typescript
// src/lib/features/course/utils.ts
export function calculateAvailableSeats(course: Course): number {
	return course.capacity - course.enrolled;
}
```

```typescript
// tests/unit/features/course/utils.test.ts
import { describe, it, expect } from 'vitest';
import { calculateAvailableSeats } from '$lib/features/course/utils';

describe('calculateAvailableSeats', () => {
	it('should calculate correctly', () => {
		const course = { capacity: 20, enrolled: 15 };
		expect(calculateAvailableSeats(course)).toBe(5);
	});
});
```

#### 2. API 用整合測試（MSW）

```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('/api/users/:id', ({ params }) => {
		return HttpResponse.json({
			id: params.id,
			name: 'Test User'
		});
	})
];
```

```typescript
// tests/integration/api/users.test.ts
import { describe, it, expect } from 'vitest';
import { getUser } from '$lib/api/users';

describe('Users API', () => {
	it('should get user', async () => {
		const user = await getUser('1');
		expect(user.name).toBe('Test User');
	});
});
```

---

## 命名規則

| 類型       | 規則             | 範例                                  |
| ---------- | ---------------- | ------------------------------------- |
| **元件**   | PascalCase       | `UserCard.svelte`, `LoginForm.svelte` |
| **函式**   | camelCase        | `getUserById()`, `formatDate()`       |
| **變數**   | camelCase        | `userName`, `isActive`, `courseList`  |
| **常數**   | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRY`           |
| **布林值** | is/has 開頭      | `isVisible`, `hasError`, `canEdit`    |

---

## 元件開發

### Svelte 5 語法

```svelte
<script lang="ts">
	interface Props {
		name: string;
		count?: number;
	}
	let { name, count = 0 }: Props = $props();

	let value = $state(0);
	let doubled = $derived(value * 2);

	$effect(() => {
		console.log('value changed:', value);
	});
</script>

<button onclick={() => (value += 1)}>
	{name}: {doubled}
</button>
```

---

## API 開發

### RESTful 原則

1. **HTTP 方法**
   - GET：獲取資源
   - POST：建立資源
   - PUT：完整更新
   - PATCH：部分更新
   - DELETE：刪除資源

2. **端點命名**
   - 使用複數名詞：`/api/users`、`/api/courses`
   - 層級不超過 2 層

3. **狀態碼**
   - 200 OK、201 Created
   - 400 Bad Request、401 Unauthorized
   - 404 Not Found、500 Internal Server Error

---

## Git 提交規範

| Type       | 說明     | 範例                       |
| ---------- | -------- | -------------------------- |
| `feat`     | 新增功能 | `feat: 新增使用者登入表單` |
| `fix`      | 修復 Bug | `fix: 修復路由導航錯誤`    |
| `docs`     | 文件更新 | `docs: 更新 API 文件`      |
| `test`     | 新增測試 | `test: 新增 API 整合測試`  |
| `refactor` | 重構     | `refactor: 優化 API 邏輯`  |
| `chore`    | 雜項     | `chore: 更新依賴套件`      |

---

## Just 指令

### 常用指令

```bash
just                # 列出所有指令
just init           # 安裝依賴
just run            # 啟動開發伺服器
just test           # 執行測試
just test-coverage  # 產生覆蓋率報告
just fmt            # 格式化程式碼
just check          # 型別檢查
```

### 建立範本

```bash
# 傳統架構
just new-util validation        # 工具函式 + 測試
just new-component UserCard     # Svelte 元件
just new-api users              # RESTful API

# 模組化架構（推薦）
just new-feature course                      # 功能模組
just new-feature-component course CourseCard # 為模組新增元件
```

---

## 最佳實踐

### ✅ 應該做的

1. **保持簡單** - 不要過度設計
2. **單一職責** - 每個函式/元件只做一件事
3. **型別安全** - 充分利用 TypeScript
4. **測試工具函式** - 覆蓋率 ≥ 80%
5. **API 整合測試** - 使用 MSW
6. **功能模組化** - 大專案使用 features/
7. **統一匯出** - 簡化 import
8. **清晰命名** - 程式碼自我說明

### ❌ 不應該做的

1. **過度抽象** - 不要預先建立複雜架構
2. **忽略測試** - 工具函式必須測試
3. **Mock fetch 測試 API** - 改用 MSW
4. **使用 any** - 避免使用 any 型別
5. **相對路徑** - 使用 $lib 別名
6. **巨大元件** - 拆分成小元件
7. **硬編碼** - 使用環境變數
8. **無意義註解** - 程式碼應該自我說明

---

## 參考資源

### 專案文件

- [API_Testing_Strategy.md](./docs/API_Testing_Strategy.md) - API 測試策略完整指南
- [Quick_Start.md](./docs/Quick_Start.md) - 快速開始指南
- [Component_Architecture.md](./docs/Component_Architecture.md) - 元件抽象層架構
- [API_Guide.md](./docs/API_Guide.md) - API 開發完整指南
- [Architecture_Patterns.md](./docs/Architecture_Patterns.md) - 架構模式比較

---

**記住：API 是整合點，用整合測試；商業邏輯是單元，用單元測試。** 🧪

_最後更新：2026-02-02_

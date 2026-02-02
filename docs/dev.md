## 新增元件

- 基礎檢查物件需要新增的檔案如下
  測試:

函式庫:
src/utils/validation.ts
主程式(引用):

## 測試策略

### 測試範圍

- **工具函式（Utils）**：必須撰寫單元測試，覆蓋率目標 80%+
- **API 呼叫**：不撰寫測試（直接與後端整合）
- **Svelte 元件**：依需求測試主要互動流程

### 測試工具

- **框架**：Vitest 2.x
- **測試庫**：@testing-library/svelte
- **覆蓋率**：@vitest/coverage-v8
- **環境**：jsdom（模擬瀏覽器環境）

### 測試檔案結構

```
src/__tests__/
├── setup.ts                    # 測試環境設定（cleanup、mock）
└── unit/
    ├── utils/                  # 工具函式單元測試
    │   └── [功能名稱].test.ts
    └── components/             # 元件測試（可選）
        └── [元件名稱].test.ts
```

### 執行測試

```bash
npm test              # 監看模式
npm run test:ui       # UI 介面
npm run test:coverage # 產生覆蓋率報告
```

### 撰寫測試原則

1. **一個工具函式一個測試檔案**：命名為 `[函式名稱].test.ts`
2. **使用 describe 分組**：依功能分組測試案例
3. **測試案例涵蓋**：
   - 正常情境（Happy Path）
   - 邊界值（Boundary Cases）
   - 錯誤處理（Error Handling）
   - 特殊格式（Edge Cases）
4. **測試描述清晰**：使用中文描述測試目的

### 測試範例

參考 `src/__tests__/unit/utils/time.test.ts`：

```typescript
describe('工具函式名稱', () => {
	describe('函式名稱', () => {
		it('應該處理正常情境', () => {
			expect(功能(輸入)).toBe(預期輸出);
		});

		it('應該拒絕無效輸入', () => {
			expect(功能(無效輸入)).toBe(false);
		});
	});
});
```

### 新增工具函式 Checklist

建立新的工具函式時，請依序完成：

1. ✅ 執行 `just new-util [名稱]` 自動建立檔案範本
2. ✅ 在 `src/lib/utils/[名稱].ts` 實作函式邏輯
3. ✅ 在 `src/__tests__/unit/utils/[名稱].test.ts` 撰寫測試案例
4. ✅ 執行 `just test` 確認測試通過
5. ✅ 執行 `just test-coverage` 確認覆蓋率達標
6. ✅ 確保所有測試通過後再 commit

### 快速建立工具函式

```bash
just new-util validation  # 建立 validation.ts 和對應測試
```

自動產生檔案：

- `src/lib/utils/validation.ts` - 函式實作檔案（含範本）
- `src/__tests__/unit/utils/validation.test.ts` - 測試檔案（含範本）

### 維護問題

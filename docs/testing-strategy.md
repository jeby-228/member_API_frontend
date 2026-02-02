# 測試策略文件

## 當前測試狀態

### ✅ 已完成測試 (46 tests)

1. **Theme Store** (15 tests) - `src/__tests__/unit/stores/theme.test.ts`
   - localStorage 持久化
   - toggle() 切換功能  
   - set() 設定主題
   - store 訂閱機制
   - SSR 環境處理

2. **Courses API** (15 tests) - `src/__tests__/unit/api/courses.test.ts`
   - getAvailableCourses() 資料驗證
   - getCourseById() 查詢功能
   - API 延遲模擬
   - Mock 資料完整性

3. **Time Utils** (13 tests) - `src/__tests__/unit/utils/time.test.ts`
   - 時間格式驗證
   - 時間解析
   - 時間格式化

4. **Format Check Utils** (3 tests) - `src/__tests__/unit/utils/formatCheck.test.ts`
   - 基礎格式檢查

---

## 測試覆蓋率

### 已測試
- ✅ Store 層 (theme.ts)
- ✅ API 層 (courses.ts)
- ✅ Utils 層 (time.ts, formatCheck.ts)

### 待測試
- ⚠️ **Svelte 元件** (ThemeToggle, CourseCard)
  - **原因**: Svelte 5 + Vitest 配置衝突
  - **方案**: 等待 `@testing-library/svelte` 正式支援 Svelte 5
  - **替代方案**: 使用 E2E 測試 (Playwright)

- 📝 **頁面元件** (+page.svelte, +layout.svelte)
  - **建議**: 使用 E2E 測試更合適

---

## 執行測試

```bash
# 執行所有測試
just test

# 執行測試並查看覆蓋率
just test-coverage

# 執行測試 UI
just test-ui
```

---

## 測試架構

```
src/__tests__/
├── setup.ts                    # 全域測試設定
├── mocks/
│   └── $app/
│       └── environment.ts      # SvelteKit mock
└── unit/
    ├── api/
    │   └── courses.test.ts     # ✅ API 測試
    ├── stores/
    │   └── theme.test.ts       # ✅ Store 測試
    └── utils/
        ├── time.test.ts        # ✅ Utils 測試
        └── formatCheck.test.ts # ✅ Utils 測試
```

---

## 已知問題

### Svelte 5 元件測試衝突

**問題描述**:
- `@sveltejs/vite-plugin-svelte` 與 Vitest 的 HMR 配置衝突
- 錯誤: `TypeError: Cannot convert undefined or null to object`

**追蹤**: 
- https://github.com/testing-library/svelte-testing-library/issues/290
- https://github.com/sveltejs/vite-plugin-svelte/issues/700

**解決方案** (待官方支援):
1. 等待 `@testing-library/svelte` v5 正式發布
2. 使用 Playwright 進行元件級 E2E 測試

---

## 測試原則

1. **簡單至上**: 測試程式碼保持簡潔易懂
2. **一件事做好**: 每個測試只測一個功能點
3. **清晰優於聰明**: 測試名稱清楚描述測試目的
4. **測試先行**: 新功能先考慮如何測試

---

## 下一步

- [ ] 等待 Svelte 5 測試工具成熟
- [ ] 考慮引入 Playwright 進行 E2E 測試
- [ ] 提升測試覆蓋率至 80%+

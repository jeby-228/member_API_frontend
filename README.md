## 環境需求

- linux OR macOS
- Node.js 20+
- npm
- just (recommended)

## 技術棧

- Svelte 5
- SvelteKit
- TypeScript

### 套件

- Tailwind CSS
- daisyUI

### 格式化工具

- Eslint
- Prettier

## gitflow

![GitFlow](gitflow.svg)

## 部屬策略

部屬依賴在 Vercel 平台上，採用自動化部屬策略。

![deployFlow](deploy.svg)

## 🎨 Design System

本專案採用 **Design Token** 系統，統一管理所有視覺元素。

### 快速切換 Loading 動畫

```bash
# 切換為三點跳動
just set-loading dots

# 切換為脈衝動畫
just set-loading pulse

# 切換回旋轉 Spinner
just set-loading spinner
```

### 測試頁面

訪問 [http://localhost:5173/demo](http://localhost:5173/demo) 查看所有 Loading 動畫效果。

### 文件

- 📘 [Design System 使用指南](docs/Design_System.md) - 設計師必讀
- �� [Design Token 實作報告](docs/Design_Token_Implementation.md) - 技術細節
- 📕 [完成報告](DESIGN_TOKEN_COMPLETE.md) - 快速總覽

### 可用的 Token

- ✅ 顏色系統（11 大類）
- ✅ 間距系統（8 個級別）
- ✅ 字體系統（完整）
- ✅ 陰影系統（7 個級別）
- ✅ Loading 動畫（3 種）
- ✅ 深色模式支援

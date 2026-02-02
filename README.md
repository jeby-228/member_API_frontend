# Member API Frontend

SvelteKit 前端專案

## 環境需求

- Node.js 20+
- npm
- just

## CI/CD

專案使用 GitHub Actions 自動部署到 Vercel。

每次 push 到 `main` 分支會自動：

- 安裝依賴
- 建置專案
- 部署到 Vercel

### 設定 GitHub Secrets

需要在 GitHub Repository Settings → Secrets 中設定：

- `VERCEL_TOKEN` - Vercel API Token
- `VERCEL_ORG_ID` - Vercel 組織 ID
- `VERCEL_PROJECT_ID` - Vercel 專案 ID

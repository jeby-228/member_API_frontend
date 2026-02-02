# Member API Frontend

SvelteKit 前端專案

## 環境需求

- linux OR macOS
- Node.js 20+
- npm
- just (recommended)

## gitflow

![GitFlow](gitflow.svg)

## CI/CD 與部署

此專案使用 GitHub Actions 進行自動部署，主要流程定義於：

- `.github/workflows/deploy.yml`

部署流程會使用以下 GitHub Repository Secrets 來與 Vercel 溝通：

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

請確認在設定專案時，已於 GitHub 專案的 Settings → Secrets and variables → Actions 中設定上述值，才能讓 CI/CD 部署流程正常運作。

# Member API Frontend

SvelteKit 前端專案

## 環境需求

- linux OR macOS
- Node.js 20+
- npm
- just (recommended)

## gitflow

![GitFlow](gitflow.svg)

## 部屬策略

部屬依賴在 Vercel 平台上，採用自動化部屬策略。

```mermaid
graph LR
    A[程式碼推送] --> B{分支類型}
    B -->|main 分支| C[自動部屬至正式環境<br/>Production]
    B -->|其餘分支| D[開啟 Pull Request]
    D --> E[自動部屬至測試環境<br/>Preview]
    C --> F[正式環境上線]
    E --> G[預覽測試環境]
```

| 分支     | 部屬環境   | 觸發條件          |
| -------- | ---------- | ----------------- |
| main     | Production | 推送至 main 分支  |
| 其餘分支 | Preview    | 開啟 Pull Request |

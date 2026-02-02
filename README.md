# Member API Frontend

SvelteKit 前端專案

## 功能

- ✅ 會員登入頁面 (`/login`)
- 表單驗證和錯誤處理
- 響應式設計

## 環境需求

- Node.js 20+
- npm
- just (可選，用於簡化開發流程)

## 安裝 Just

```bash
https://just.systems/man/en/packages.html
```

## 開發指令

### 環境設定

複製 `.env.example` 並創建 `.env` 檔案：

```bash
cp .env.example .env
```

編輯 `.env` 設定後端 API 網址（預設為 `http://localhost:8080`）。

### 查看所有可用指令

```bash
just
```

### 初始化專案

```bash
just init
```

### 啟動開發伺服器

```bash
just run
```

### 建置專案

```bash
just build
```

### 預覽建置結果

```bash
just preview
```

### 格式化程式碼

```bash
just fmt
```

### 檢查格式

```bash
just fmt-check
```

### 檢查型別

```bash
just check
```

### 檢查 Svelte 語法

```bash
just check-svelte
```

### 執行所有檢查

```bash
just lint
```

### 自動修正格式並檢查

```bash
just fix
```

### 部署到 Vercel

```bash
just deploy
```

## 開發流程

1. **初始化專案**

   ```bash
   just init
   ```

2. **啟動開發環境**

   ```bash
   just run
   ```

3. **開發時自動格式化**

   ```bash
   just fmt
   ```

4. **提交前檢查**

   ```bash
   just lint
   ```

5. **部署**
   ```bash
   just deploy
   ```

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

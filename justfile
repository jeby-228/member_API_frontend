default:
    @just --list

init:
    npm install
    npx playwright install --with-deps chromium   

build:
    npm run build

run:
    npm run dev

lint:
    npm run lint

fmt:
    npm run format

test:
    npm run test

check:
    npm run check

# 快速檢查（跳過測試和建置，適合開發時使用）
quick:
    just check
    just lint

# 完整 CI 檢查（包含測試和建置）
ci:
    just check
    just lint
    just test
    just build


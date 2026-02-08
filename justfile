default:
    @just --list
run:
    npm run dev

init:
    npm install

build:
    npm run build
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
    just test
    just check
    just lint
    just build


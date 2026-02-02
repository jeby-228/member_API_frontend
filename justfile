default:
    @just --list

init:
    npm install

run:
    npm run dev

build:
    npm run build

preview:
    npm run preview

test:
    npm run test

test-ui:
    npm run test:ui

test-coverage:
    npm run test:coverage

fmt:
    npx prettier --write .

fmt-check:
    npx prettier --check .

check:
    npm run check

check-svelte:
    npx svelte-check --tsconfig ./tsconfig.json

lint-test:
    just test
    just fmt-check
    just check

fix:
    just fmt
    just check

# 新增工具函式和對應測試檔案
new-util name:
    @echo "正在建立工具函式：{{name}}"
    @if [ -f "src/lib/utils/{{name}}.ts" ]; then \
        echo "❌ 錯誤：src/lib/utils/{{name}}.ts 已存在"; \
        exit 1; \
    fi
    @if [ -f "src/__tests__/unit/utils/{{name}}.test.ts" ]; then \
        echo "❌ 錯誤：src/__tests__/unit/utils/{{name}}.test.ts 已存在"; \
        exit 1; \
    fi
    @mkdir -p src/lib/utils src/__tests__/unit/utils
    @printf '// src/lib/utils/{{name}}.ts\n\n/**\n * TODO: 新增函式說明\n * @param input - 輸入參數\n * @returns 回傳值說明\n */\nexport function example(input: string): boolean {\n    // TODO: 實作函式邏輯\n    return input.length > 0;\n}\n' > "src/lib/utils/{{name}}.ts"
    @printf "import { example } from '"'$'"lib/utils/{{name}}';\nimport { describe, expect, it } from 'vitest';\n\ndescribe('{{name}} 工具函式', () => {\n    describe('example', () => {\n        it('應該處理正常情境', () => {\n            expect(example('test')).toBe(true);\n        });\n\n        it('應該處理邊界值', () => {\n            expect(example('')).toBe(false);\n        });\n\n        it('應該處理錯誤情境', () => {\n            // TODO: 新增更多測試案例\n        });\n    });\n});\n" > "src/__tests__/unit/utils/{{name}}.test.ts"
    @echo "✅ 已建立檔案："
    @echo "   📄 src/lib/utils/{{name}}.ts"
    @echo "   🧪 src/__tests__/unit/utils/{{name}}.test.ts"
    @echo ""
    @echo "📝 下一步："
    @echo "   1. 編輯 src/lib/utils/{{name}}.ts 實作函式邏輯"
    @echo "   2. 編輯 src/__tests__/unit/utils/{{name}}.test.ts 新增測試案例"
    @echo "   3. 執行 'just test' 確認測試通過"

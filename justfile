default:
    @just --list

# ============================================
# 設計系統指令
# ============================================

# 設定 Loading 動畫類型 (spinner | dots | pulse | gif)
set-loading TYPE:
	@echo "🎨 切換 Loading 動畫為：{{TYPE}}"
	@sed -i "s/defaultType: '[^']*'/defaultType: '{{TYPE}}'/" src/lib/stores/ui-config.ts
	@echo "✅ 完成！請重新整理瀏覽器查看效果"

# 設定自訂 GIF Loading 動畫
set-loading-gif PATH:
	@echo "🎨 設定自訂 GIF Loading：{{PATH}}"
	@sed -i "s|gifPath: '[^']*'|gifPath: '{{PATH}}'|" src/lib/stores/ui-config.ts
	@sed -i "s/defaultType: '[^']*'/defaultType: 'gif'/" src/lib/stores/ui-config.ts
	@echo "✅ 完成！請重新整理瀏覽器查看效果"

# 查看當前 Loading 動畫設定
show-loading:
	@echo "📋 當前 Loading 動畫配置："
	@grep -A 5 "defaultType:" src/lib/stores/ui-config.ts

# ============================================
# 開發指令
# ============================================

init:
    sudo apt update
    sudo apt-get install nodejs
    sudo apt install npm
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
    just check-svelte
    just fmt-check
    just check

fix:
    just fmt
    just check

# 新增工具函式和對應測試檔案
new-util name:
    @echo "正在建立工具函式：{{name}}"
    @test -f "src/lib/utils/{{name}}.ts" && { echo "❌ 錯誤：src/lib/utils/{{name}}.ts 已存在"; exit 1; } || true
    @test -f "src/__tests__/unit/utils/{{name}}.test.ts" && { echo "❌ 錯誤：src/__tests__/unit/utils/{{name}}.test.ts 已存在"; exit 1; } || true
    @mkdir -p src/lib/utils src/__tests__/unit/utils
    @sed "s/NAME/{{name}}/g" .just-templates/util.ts.tmpl > "src/lib/utils/{{name}}.ts"
    @sed "s/NAME/{{name}}/g" .just-templates/util.test.ts.tmpl > "src/__tests__/unit/utils/{{name}}.test.ts"
    @echo "✅ 已建立檔案："
    @echo "   📄 src/lib/utils/{{name}}.ts"
    @echo "   🧪 src/__tests__/unit/utils/{{name}}.test.ts"
    @echo ""
    @echo "📝 下一步："
    @echo "   1. 編輯 src/lib/utils/{{name}}.ts 實作函式邏輯"
    @echo "   2. 編輯 src/__tests__/unit/utils/{{name}}.test.ts 新增測試案例"
    @echo "   3. 執行 'just test' 確認測試通過"
    @just fmt

# 新增 Svelte 元件
new-component name:
    @echo "正在建立元件：{{name}}"
    @test -f "src/lib/components/{{name}}.svelte" && { echo "❌ 錯誤：src/lib/components/{{name}}.svelte 已存在"; exit 1; } || true
    @mkdir -p src/lib/components
    @sed "s/NAME/{{name}}/g" .just-templates/component.svelte.tmpl > "src/lib/components/{{name}}.svelte"
    @echo "✅ 已建立檔案："
    @echo "   🎨 src/lib/components/{{name}}.svelte"
    @echo ""
    @echo "📝 下一步:"
    @echo "   1. 編輯 src/lib/components/{{name}}.svelte 實作元件邏輯"
    @echo "   2. 在頁面中使用："
    @echo "      import {{name}} from '\$$lib/components/{{name}}.svelte';"
    @echo "      <{{name}} />"
    @just fmt

# 新增 API 函式
new-api name:
    @echo "正在建立 API 函式：{{name}}"
    @test -f "src/lib/api/{{name}}.ts" && { echo "❌ 錯誤：src/lib/api/{{name}}.ts 已存在"; exit 1; } || true
    @mkdir -p src/lib/api
    @sed "s/NAME/{{name}}/g" .just-templates/api.ts.tmpl > "src/lib/api/{{name}}.ts"
    @echo "✅ 已建立檔案："
    @echo "   🌐 src/lib/api/{{name}}.ts"
    @echo ""
    @echo "📝 下一步："
    @echo "   1. 編輯 src/lib/api/{{name}}.ts 定義型別和實作函式"
    @echo "   2. 在元件中使用："
    @echo "      import { list{{name}}, get{{name}}, create{{name}} } from '$$lib/api/{{name}}';"
    @echo "   3. 設定環境變數 VITE_API_BASE_URL（如需要）"
    @just fmt

# 新增功能模組（Feature Module）
new-feature name:
    @echo "正在建立功能模組：{{name}}"
    @test -d "src/lib/features/{{name}}" && { echo "❌ 錯誤：src/lib/features/{{name}} 已存在"; exit 1; } || true
    @mkdir -p src/lib/features/{{name}}/components
    @sed "s/NAME/{{name}}/g" .just-templates/feature-api.ts.tmpl > "src/lib/features/{{name}}/api.ts"
    @sed "s/NAME/{{name}}/g" .just-templates/feature-types.ts.tmpl > "src/lib/features/{{name}}/types.ts"
    @sed "s/NAME/{{name}}/g" .just-templates/feature-store.ts.tmpl > "src/lib/features/{{name}}/store.ts"
    @sed "s/NAME/{{name}}/g" .just-templates/feature-index.ts.tmpl > "src/lib/features/{{name}}/index.ts"
    @touch "src/lib/features/{{name}}/README.md"
    @echo "# {{name}} 功能模組" > "src/lib/features/{{name}}/README.md"
    @echo "" >> "src/lib/features/{{name}}/README.md"
    @echo "## 結構" >> "src/lib/features/{{name}}/README.md"
    @echo "- \`api.ts\` - API 呼叫函式" >> "src/lib/features/{{name}}/README.md"
    @echo "- \`types.ts\` - TypeScript 型別定義" >> "src/lib/features/{{name}}/README.md"
    @echo "- \`store.ts\` - Svelte 狀態管理" >> "src/lib/features/{{name}}/README.md"
    @echo "- \`components/\` - 功能專屬元件" >> "src/lib/features/{{name}}/README.md"
    @echo "- \`index.ts\` - 統一匯出" >> "src/lib/features/{{name}}/README.md"
    @echo "" >> "src/lib/features/{{name}}/README.md"
    @echo "## 使用方式" >> "src/lib/features/{{name}}/README.md"
    @echo "\`\`\`typescript" >> "src/lib/features/{{name}}/README.md"
    @echo "import { list{{name}}, get{{name}}, type {{name}} } from '$$lib/features/{{name}}';" >> "src/lib/features/{{name}}/README.md"
    @echo "\`\`\`" >> "src/lib/features/{{name}}/README.md"
    @echo "✅ 已建立功能模組："
    @echo "   📁 src/lib/features/{{name}}/"
    @echo "   ├── 📁 components/     (元件資料夾)"
    @echo "   ├── 📄 api.ts          (API 函式)"
    @echo "   ├── 📄 types.ts        (型別定義)"
    @echo "   ├── 📄 store.ts        (狀態管理)"
    @echo "   ├── 📄 index.ts        (統一匯出)"
    @echo "   └── 📄 README.md       (說明文件)"
    @echo ""
    @echo "📝 下一步："
    @echo "   1. 編輯 types.ts 定義資料型別"
    @echo "   2. 編輯 api.ts 實作 API 函式"
    @echo "   3. 使用 'just new-feature-component {{name}} CardName' 建立元件"
    @echo "   4. 在頁面中使用："
    @echo "      import { list{{name}}, type {{name}} } from '$$lib/features/{{name}}';"
    @just fmt

# 為功能模組新增元件
new-feature-component feature component:
    @echo "正在為 {{feature}} 模組建立元件：{{component}}"
    @test ! -d "src/lib/features/{{feature}}" && { echo "❌ 錯誤：功能模組 {{feature}} 不存在"; echo "請先執行：just new-feature {{feature}}"; exit 1; } || true
    @test -f "src/lib/features/{{feature}}/components/{{component}}.svelte" && { echo "❌ 錯誤：元件已存在"; exit 1; } || true
    @mkdir -p "src/lib/features/{{feature}}/components"
    @sed "s/NAME/{{feature}}/g" .just-templates/feature-component.svelte.tmpl | sed "s/{{feature}}-card/{{component}}/g" > "src/lib/features/{{feature}}/components/{{component}}.svelte"
    @echo "✅ 已建立元件："
    @echo "   🎨 src/lib/features/{{feature}}/components/{{component}}.svelte"
    @echo ""
    @echo "📝 記得在 index.ts 中匯出："
    @echo "   export { default as {{component}} } from './components/{{component}}.svelte';"
    @just fmt

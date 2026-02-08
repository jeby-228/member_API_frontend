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


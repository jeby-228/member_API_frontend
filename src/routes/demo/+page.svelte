<script lang="ts">
	import { LoadingAnimation } from '$lib/components/atoms';
	import { uiConfig, setLoadingAnimation, setLoadingGif } from '$lib/stores/ui-config';
	import type { LoadingAnimationType } from '$lib/design/animation-tokens';

	let selectedType = $state<LoadingAnimationType>('spinner');
	let selectedSize = $state<'sm' | 'md' | 'lg'>('md');
	let selectedSpeed = $state<'slow' | 'normal' | 'fast'>('normal');
	let customGifPath = $state('/src/lib/assets/loading/loading-1.gif');

	function applyGlobal() {
		if (selectedType === 'gif') {
			setLoadingGif(customGifPath);
		} else {
			setLoadingAnimation(selectedType);
		}
		alert(`✅ 已將全站 Loading 動畫設定為：${selectedType}`);
	}
</script>

<svelte:head>
	<title>Loading 動畫測試 - Design System</title>
</svelte:head>

<div class="container">
	<header class="page-header">
		<h1>🎨 Loading 動畫測試頁面</h1>
		<p class="subtitle">測試不同的 Loading 動畫效果</p>
	</header>

	<div class="controls">
		<h2>控制面板</h2>

		<div class="control-group">
			<label for="type">動畫類型：</label>
			<select id="type" bind:value={selectedType}>
				<option value="spinner">Spinner（旋轉）</option>
				<option value="dots">Dots（三點跳動）</option>
				<option value="pulse">Pulse（脈衝）</option>
				<option value="gif">GIF（自訂動畫）</option>
			</select>
		</div>

		{#if selectedType === 'gif'}
			<div class="control-group">
				<label for="gifPath">GIF 路徑：</label>
				<input
					id="gifPath"
					type="text"
					bind:value={customGifPath}
					placeholder="/src/lib/assets/loading/loading-1.gif"
				/>
			</div>
		{/if}

		<div class="control-group">
			<label for="size">尺寸：</label>
			<select id="size" bind:value={selectedSize}>
				<option value="sm">Small</option>
				<option value="md">Medium</option>
				<option value="lg">Large</option>
			</select>
		</div>

		{#if selectedType !== 'gif'}
			<div class="control-group">
				<label for="speed">速度：</label>
				<select id="speed" bind:value={selectedSpeed}>
					<option value="slow">Slow</option>
					<option value="normal">Normal</option>
					<option value="fast">Fast</option>
				</select>
			</div>
		{/if}

		<button class="apply-btn" onclick={applyGlobal}>套用到全站</button>
	</div>

	<div class="preview-section">
		<h2>預覽效果</h2>

		<div class="preview-box">
			<h3>當前設定</h3>
			<LoadingAnimation
				type={selectedType}
				size={selectedSize}
				speed={selectedSpeed}
				message={`${selectedType} 動畫 (${selectedSize}, ${selectedSpeed})`}
			/>
		</div>

		<div class="preview-box">
			<h3>全域預設配置</h3>
			<LoadingAnimation type={$uiConfig.loading.defaultType} message="使用全域設定的動畫" />
			<p class="config-info">
				目前全站預設：<strong>{$uiConfig.loading.defaultType}</strong>
			</p>
		</div>
	</div>

	<div class="all-types">
		<h2>所有動畫類型</h2>

		<div class="type-grid">
			<div class="type-card">
				<h3>Spinner</h3>
				<LoadingAnimation type="spinner" message="旋轉圓圈" />
			</div>

			<div class="type-card">
				<h3>Dots</h3>
				<LoadingAnimation type="dots" message="三點跳動" />
			</div>

			<div class="type-card">
				<h3>Pulse</h3>
				<LoadingAnimation type="pulse" message="脈衝動畫" />
			</div>
		</div>
	</div>

	<div class="instructions">
		<h2>📝 如何使用</h2>
		<ol>
			<li>使用上方控制面板調整參數</li>
			<li>觀察預覽效果</li>
			<li>點擊「套用到全站」按鈕更新全域配置</li>
			<li>或直接執行指令：</li>
		</ol>

		<div class="code-block">
			<code># 切換為預設動畫</code><br />
			<code>just set-loading dots</code><br />
			<code>just set-loading pulse</code><br />
			<br />
			<code># 使用自訂 GIF</code><br />
			<code>just set-loading-gif /src/lib/assets/loading/loading-1.gif</code>
		</div>

		<h3>💡 提示</h3>
		<ul>
			<li>GIF 檔案放在 <code>src/lib/assets/loading/</code> 資料夾</li>
			<li>修改 <code>src/lib/design/animation-tokens.ts</code> 可調整動畫參數</li>
			<li>修改 <code>src/lib/stores/ui-config.ts</code> 可改變預設值</li>
			<li>所有變更即時生效（HMR）</li>
		</ul>
	</div>

	<div class="back-link">
		<a href="/">← 返回首頁</a>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.page-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.page-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-color);
		margin: 0 0 0.5rem 0;
	}

	.subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.controls {
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.controls h2 {
		margin-top: 0;
		color: var(--text-color);
	}

	.control-group {
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.control-group label {
		min-width: 100px;
		font-weight: 500;
		color: var(--text-color);
	}

	.control-group select {
		flex: 1;
		padding: 0.5rem;
		border: 1px solid var(--border-color);
		border-radius: 6px;
		background: var(--bg-color);
		color: var(--text-color);
		font-size: 1rem;
	}

	.control-group input[type='text'] {
		flex: 1;
		padding: 0.5rem;
		border: 1px solid var(--border-color);
		border-radius: 6px;
		background: var(--bg-color);
		color: var(--text-color);
		font-size: 0.875rem;
		font-family: monospace;
	}

	.control-group input[type='text']:focus {
		outline: none;
		border-color: var(--btn-primary, #2563eb);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	.apply-btn {
		width: 100%;
		padding: 0.75rem;
		margin-top: 1rem;
		font-size: 1rem;
		font-weight: 500;
		color: white;
		background: var(--btn-primary, #2563eb);
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.apply-btn:hover {
		background: var(--btn-primary-hover, #1d4ed8);
	}

	.preview-section {
		margin-bottom: 3rem;
	}

	.preview-section h2 {
		color: var(--text-color);
		margin-bottom: 1.5rem;
	}

	.preview-box {
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 2rem;
		margin-bottom: 1.5rem;
	}

	.preview-box h3 {
		margin-top: 0;
		color: var(--text-color);
		text-align: center;
	}

	.config-info {
		text-align: center;
		color: var(--text-secondary);
		margin-top: 1rem;
		margin-bottom: 0;
	}

	.all-types {
		margin-bottom: 3rem;
	}

	.all-types h2 {
		color: var(--text-color);
		margin-bottom: 1.5rem;
	}

	.type-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.type-card {
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 2rem;
	}

	.type-card h3 {
		margin-top: 0;
		color: var(--text-color);
		text-align: center;
	}

	.instructions {
		background: var(--bg-secondary);
		border-radius: 8px;
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.instructions h2,
	.instructions h3 {
		color: var(--text-color);
	}

	.instructions ol,
	.instructions ul {
		color: var(--text-color);
	}

	.instructions code {
		background: var(--card-bg);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-family: monospace;
		color: var(--btn-primary, #2563eb);
		font-size: 0.875rem;
	}

	.code-block {
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 6px;
		padding: 1rem;
		margin: 1rem 0;
		font-family: monospace;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.code-block code {
		background: transparent;
		padding: 0;
		color: var(--text-color);
	}

	.back-link {
		text-align: center;
		padding: 2rem 0;
	}

	.back-link a {
		color: var(--btn-primary, #2563eb);
		text-decoration: none;
		font-size: 1.125rem;
		font-weight: 500;
	}

	.back-link a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.page-header h1 {
			font-size: 2rem;
		}

		.control-group {
			flex-direction: column;
			align-items: flex-start;
		}

		.control-group label {
			min-width: auto;
		}

		.control-group select {
			width: 100%;
		}

		.type-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

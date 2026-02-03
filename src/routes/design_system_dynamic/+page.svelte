<script lang="ts">
	import {
		colors,
		spacing,
		typography,
		shadows,
		borders,
		transitions,
		opacity,
		sizing
	} from '$lib/design';
	import {
		spinnerAnimation,
		dotsAnimation,
		pulseAnimation,
		gifAnimation
	} from '$lib/design/animation-tokens';
	import { button, card, badge, input, modal } from '$lib/design/component-tokens';

	let hoveredCard = $state<string | null>(null);
	let activeButton = $state<string | null>(null);

	// 顏色物件轉陣列
	const colorPalette = [
		{ name: 'Primary', value: colors.primary, key: 'primary' },
		{ name: 'Success', value: colors.success, key: 'success' },
		{ name: 'Warning', value: colors.warning, key: 'warning' },
		{ name: 'Danger', value: colors.danger, key: 'danger' },
		{ name: 'Info', value: colors.info, key: 'info' }
	];

	const grayScale = Object.entries(colors.gray).map(([key, value]) => ({
		name: `Gray ${key}`,
		value,
		key
	}));

	const spacingScale = Object.entries(spacing).map(([key, value]) => ({
		name: key.toUpperCase(),
		value,
		key
	}));

	const fontSizes = Object.entries(typography.fontSize).map(([key, value]) => ({
		name: key,
		value,
		key
	}));

	const shadowLevels = [
		{ name: 'Small', value: shadows.sm, key: 'sm' },
		{ name: 'Medium', value: shadows.md, key: 'md' },
		{ name: 'Large', value: shadows.lg, key: 'lg' },
		{ name: 'XL', value: shadows.xl, key: 'xl' }
	];

	const radiusLevels = Object.entries(borders.radius)
		.filter(([key]) => key !== 'none' && key !== 'full')
		.map(([key, value]) => ({ name: key.toUpperCase(), value, key }));
</script>

<div class="container demo-page">
	<!-- Header -->
	<header class="demo-header">
		<h1>設計規範展示 動態渲染</h1>
	</header>

	<!-- Typography Section -->
	<section class="demo-section">
		<h2 class="section-title">字型系統</h2>

		<div class="subsection">
			<h3 class="subsection-title">字體大小 (動態)</h3>
			<div class="content-box">
				<div class="token-grid">
					{#each fontSizes as { name, value }}
						<div class="token-item">
							<div class="font-preview" style="font-size: {value}">Aa</div>
							<div class="token-info">
								<strong>{name}</strong>
								<code>{value}</code>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">標題層級</h3>
			<div class="content-box">
				<h1>H1 標題 - 1.5rem</h1>
				<h2>H2 標題 - 1.25rem</h2>
				<h3>H3 標題 - 1.125rem</h3>
				<h4>H4 標題 - 1rem</h4>
				<h5>H5 標題 - 1rem</h5>
				<h6>H6 標題 - 1rem</h6>
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">段落與連結</h3>
			<div class="content-box">
				<p>這是一段普通的段落文字。Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				<p>這是一段包含 <a href="#">連結文字</a> 的段落，滑鼠移到連結上會有效果。</p>
			</div>
		</div>
	</section>

	<!-- Colors Section -->
	<section class="demo-section">
		<h2 class="section-title">顏色系統 (動態)</h2>

		<div class="subsection">
			<h3 class="subsection-title">主題色</h3>
			<div class="content-box">
				<div class="color-grid">
					{#each colorPalette as { name, value, key }}
						<div class="color-card">
							<div class="color-swatch" style="background-color: {value}"></div>
							<div class="color-info">
								<strong>{name}</strong>
								<code>{value}</code>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">灰階色</h3>
			<div class="content-box">
				<div class="gray-grid">
					{#each grayScale as { name, value }}
						<div
							class="gray-card"
							style="background-color: {value}; color: {parseInt(name.split(' ')[1]) > 400
								? '#fff'
								: '#000'}"
						>
							<div class="gray-label">{name}</div>
							<code>{value}</code>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Spacing Section -->
	<section class="demo-section">
		<h2 class="section-title">間距系統 (動態)</h2>

		<div class="subsection">
			<div class="content-box">
				<div class="spacing-grid">
					{#each spacingScale as { name, value }}
						<div class="spacing-item">
							<div class="spacing-label">{name}</div>
							<div class="spacing-bar" style="width: {value}; height: 2rem"></div>
							<code>{value}</code>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Shadows Section -->
	<section class="demo-section">
		<h2 class="section-title">陰影系統 (動態)</h2>

		<div class="subsection">
			<div class="content-box">
				<div class="shadow-grid">
					{#each shadowLevels as { name, value }}
						<div
							class="shadow-card"
							style="box-shadow: {value}"
							onmouseenter={() => (hoveredCard = name)}
							onmouseleave={() => (hoveredCard = null)}
						>
							<strong>{name}</strong>
							<code>{value}</code>
							{#if hoveredCard === name}
								<span class="hover-indicator">✨ Hover</span>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Border Radius Section -->
	<section class="demo-section">
		<h2 class="section-title">圓角系統 (動態)</h2>

		<div class="subsection">
			<div class="content-box">
				<div class="radius-grid">
					{#each radiusLevels as { name, value }}
						<div class="radius-card" style="border-radius: {value}">
							<strong>{name}</strong>
							<code>{value}</code>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Component Tokens Section -->
	<section class="demo-section">
		<h2 class="section-title">元件 Token (動態)</h2>

		<div class="subsection">
			<h3 class="subsection-title">按鈕樣式</h3>
			<div class="content-box">
				<div class="component-demo">
					<button
						class="dynamic-btn"
						style="padding: {button.padding.md}; 
                       font-size: {button.fontSize.md}; 
                       border-radius: {button.borderRadius}; 
                       background-color: {colors.primary}; 
                       color: white;"
						onmousedown={() => (activeButton = 'primary')}
						onmouseup={() => (activeButton = null)}
						onmouseleave={() => (activeButton = null)}
					>
						動態按鈕 (Medium)
					</button>
					<div class="token-display">
						<code>padding: {button.padding.md}</code>
						<code>fontSize: {button.fontSize.md}</code>
						<code>borderRadius: {button.borderRadius}</code>
					</div>
				</div>
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">卡片樣式</h3>
			<div class="content-box">
				<div
					class="dynamic-card"
					style="padding: {card.padding}; 
                   border-radius: {card.borderRadius}; 
                   border: {card.border}; 
                   background: {card.background};"
				>
					<h4>動態卡片</h4>
					<p>這是使用 TypeScript Design Token 渲染的卡片</p>
					<div class="token-display">
						<code>padding: {card.padding}</code>
						<code>borderRadius: {card.borderRadius}</code>
					</div>
				</div>
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">Badge 樣式</h3>
			<div class="content-box">
				<div class="badge-demo">
					{#each Object.entries(badge.colors) as [type, colorConfig]}
						<span
							class="dynamic-badge"
							style="padding: {badge.padding}; 
                       font-size: {badge.fontSize}; 
                       border-radius: {badge.borderRadius}; 
                       color: {colorConfig.text}; 
                       background-color: {colorConfig.background};"
						>
							{type}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Animation Tokens Section -->
	<section class="demo-section">
		<h2 class="section-title">動畫 Token (動態)</h2>

		<div class="subsection">
			<h3 class="subsection-title">Spinner 動畫參數</h3>
			<div class="content-box">
				<div class="animation-demo">
					<div
						class="spinner"
						style="width: {spinnerAnimation.size.md}; 
                       height: {spinnerAnimation.size.md}; 
                       border: {spinnerAnimation.borderWidth.md} solid {spinnerAnimation.color
							.border}; 
                       border-top-color: {spinnerAnimation.color.active};"
					></div>
					<div class="token-display">
						<code>size: {spinnerAnimation.size.md}</code>
						<code>borderWidth: {spinnerAnimation.borderWidth.md}</code>
						<code>speed: {spinnerAnimation.speed.normal}</code>
					</div>
				</div>
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">Transition 設定</h3>
			<div class="content-box">
				<div class="transition-demo">
					<div
						class="transition-box"
						style="transition: all {transitions.duration.normal} {transitions.timing.ease}"
					>
						Hover Me
					</div>
					<div class="token-display">
						<code>duration: {transitions.duration.normal}</code>
						<code>timing: {transitions.timing.ease}</code>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.demo-page {
		padding: 2rem 0;
	}

	/* Header */
	.demo-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 3rem;
		padding-bottom: 1.5rem;
		border-bottom: 2px solid var(--border-color);
	}

	.demo-header h1 {
		margin: 0;
		font-size: 2rem;
	}

	.theme-toggle {
		padding: 0.5rem 1.5rem;
		font-size: 1rem;
		background-color: var(--btn-primary);
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.theme-toggle:hover {
		background-color: var(--btn-primary-hover);
		transform: translateY(-2px);
	}

	/* Section */
	.demo-section {
		margin-bottom: 3rem;
		padding: 2rem;
		background-color: var(--card-bg);
		border-radius: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.section-title {
		margin: 0 0 2rem 0;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
		font-size: 1.5rem;
		color: var(--text-color);
	}

	/* Subsection */
	.subsection {
		margin-bottom: 2rem;
	}

	.subsection:last-child {
		margin-bottom: 0;
	}

	.subsection-title {
		margin: 0 0 1rem 0;
		font-size: 1.125rem;
		color: var(--text-secondary);
	}

	.content-box {
		padding: 1.5rem;
		background-color: var(--bg-color);
		border: 1px solid var(--border-color);
		border-radius: 0.5rem;
	}

	/* Button Group */
	.button-group {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	/* Form */
	.form-demo {
		max-width: 600px;
	}

	.form-demo p {
		margin-bottom: 1rem;
	}

	.form-demo label {
		display: inline-block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	.form-demo input,
	.form-demo textarea,
	.form-demo select {
		width: 100%;
		max-width: 500px;
	}

	/* List Grid */
	.list-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}

	.list-grid h4 {
		margin-top: 0;
	}

	/* Dynamic Token Displays */
	.token-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 1.5rem;
	}

	.token-item {
		text-align: center;
	}

	.font-preview {
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--bg-secondary);
		border-radius: 0.5rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}

	.token-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.token-info strong {
		font-size: 0.875rem;
		color: var(--text-color);
	}

	.token-info code {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	/* Color Grid */
	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 1.5rem;
	}

	.color-card {
		text-align: center;
	}

	.color-swatch {
		height: 100px;
		border-radius: 0.5rem;
		margin-bottom: 0.75rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.color-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.color-info strong {
		font-size: 0.875rem;
	}

	.color-info code {
		font-size: 0.75rem;
	}

	/* Gray Grid */
	.gray-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 0.5rem;
	}

	.gray-card {
		padding: 1rem;
		border-radius: 0.375rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		transition: transform 0.2s;
	}

	.gray-card:hover {
		transform: scale(1.05);
	}

	.gray-label {
		font-weight: 600;
		font-size: 0.875rem;
	}

	.gray-card code {
		font-size: 0.75rem;
		background: none;
		padding: 0;
	}

	/* Spacing Grid */
	.spacing-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.spacing-item {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.spacing-label {
		width: 60px;
		font-weight: 600;
		font-size: 0.875rem;
	}

	.spacing-bar {
		background: linear-gradient(90deg, var(--btn-primary), var(--btn-primary-hover));
		border-radius: 0.25rem;
	}

	.spacing-item code {
		font-size: 0.875rem;
	}

	/* Shadow Grid */
	.shadow-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 2rem;
	}

	.shadow-card {
		padding: 2rem;
		background-color: var(--card-bg);
		border-radius: 0.5rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		transition: all 0.3s ease;
		position: relative;
	}

	.shadow-card:hover {
		transform: translateY(-4px);
	}

	.hover-indicator {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		font-size: 0.75rem;
		color: var(--btn-primary);
		font-weight: 600;
	}

	/* Radius Grid */
	.radius-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1.5rem;
	}

	.radius-card {
		padding: 2rem;
		background: linear-gradient(135deg, var(--btn-primary), var(--btn-primary-hover));
		color: white;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		transition: transform 0.2s;
	}

	.radius-card:hover {
		transform: scale(1.05);
	}

	.radius-card code {
		background: rgba(255, 255, 255, 0.2);
		color: white;
	}

	/* Component Demo */
	.component-demo {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
	}

	.dynamic-btn {
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.dynamic-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
	}

	.dynamic-btn:active {
		transform: translateY(0);
	}

	.token-display {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.token-display code {
		font-size: 0.875rem;
		padding: 0.25rem 0.5rem;
		background-color: var(--bg-secondary);
		border-radius: 0.25rem;
	}

	.dynamic-card {
		width: 100%;
		max-width: 600px;
	}

	.dynamic-card h4 {
		margin-top: 0;
	}

	.dynamic-card p {
		margin: 0.5rem 0;
	}

	/* Badge Demo */
	.badge-demo {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.dynamic-badge {
		display: inline-block;
		font-weight: 500;
		transition: transform 0.2s;
	}

	.dynamic-badge:hover {
		transform: scale(1.1);
	}

	/* Animation Demo */
	.animation-demo {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	.spinner {
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.transition-demo {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
	}

	.transition-box {
		padding: 2rem 3rem;
		background-color: var(--btn-primary);
		color: white;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}

	.transition-box:hover {
		background-color: var(--btn-primary-hover);
		transform: scale(1.05);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.demo-page {
			padding: 1rem 0;
		}

		.demo-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.demo-section {
			padding: 1.5rem;
		}

		.content-box {
			padding: 1rem;
		}

		.list-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { TrainerCard, getAllTrainers, type TrainerCard as TrainerCardType, type TrainerFilterParams } from '$lib/features/trainer';
	import { specialtyTags } from '$lib/features/profile';
	import { LoadingAnimation } from '$lib/components/atoms';

	let trainers = $state<TrainerCardType[]>([]);
	let filteredTrainers = $state<TrainerCardType[]>([]);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	// 篩選器狀態
	let selectedSpecialties = $state<string[]>([]);
	let minPrice = $state<number | undefined>(undefined);
	let maxPrice = $state<number | undefined>(undefined);
	let minRating = $state<number | undefined>(undefined);
	let sortBy = $state<'rating' | 'price' | 'experience'>('rating');
	let showFilters = $state(false);

	onMount(async () => {
		await loadTrainers();
	});

	async function loadTrainers() {
		isLoading = true;
		error = null;

		try {
			const filters: TrainerFilterParams = {
				specialties: selectedSpecialties.length > 0 ? selectedSpecialties : undefined,
				priceRange: minPrice || maxPrice ? { min: minPrice, max: maxPrice } : undefined,
				minRating,
				sortBy,
				sortOrder: 'desc'
			};

			trainers = await getAllTrainers(filters);
			filteredTrainers = trainers;
		} catch (err) {
			error = err instanceof Error ? err.message : '載入教練列表失敗';
		} finally {
			isLoading = false;
		}
	}

	function toggleSpecialty(specialty: string) {
		if (selectedSpecialties.includes(specialty)) {
			selectedSpecialties = selectedSpecialties.filter((s) => s !== specialty);
		} else {
			selectedSpecialties = [...selectedSpecialties, specialty];
		}
	}

	function clearFilters() {
		selectedSpecialties = [];
		minPrice = undefined;
		maxPrice = undefined;
		minRating = undefined;
		sortBy = 'rating';
	}

	function applyFilters() {
		loadTrainers();
	}

	function handleTrainerClick(trainerId: string) {
		// 導航到教練詳細頁面
		console.log('Navigate to trainer:', trainerId);
		// 未來實作: goto(`/trainers/${trainerId}`)
	}
</script>

<svelte:head>
	<title>教練列表 - Workoutcome</title>
</svelte:head>

<div class="trainers-page">
	<div class="page-header">
		<h1>尋找您的專屬教練</h1>
		<p class="subtitle">精選專業健身教練，為您量身打造訓練計畫</p>
	</div>

	<div class="page-content">
		<!-- 篩選區域 -->
		<aside class="filters-sidebar" class:show={showFilters}>
			<div class="filters-header">
				<h2>篩選條件</h2>
				<button class="close-filters" onclick={() => (showFilters = false)}>✕</button>
			</div>

			<div class="filter-section">
				<h3>專業領域</h3>
				<div class="specialty-filters">
					{#each specialtyTags as tag}
						<button
							class="filter-tag"
							class:selected={selectedSpecialties.includes(tag)}
							onclick={() => toggleSpecialty(tag)}
						>
							{tag}
						</button>
					{/each}
				</div>
			</div>

			<div class="filter-section">
				<h3>價格範圍 (元/小時)</h3>
				<div class="price-inputs">
					<input type="number" bind:value={minPrice} placeholder="最低" min="0" />
					<span>~</span>
					<input type="number" bind:value={maxPrice} placeholder="最高" min="0" />
				</div>
			</div>

			<div class="filter-section">
				<h3>最低評分</h3>
				<select bind:value={minRating}>
					<option value={undefined}>不限</option>
					<option value={4.5}>4.5 ⭐ 以上</option>
					<option value={4.0}>4.0 ⭐ 以上</option>
					<option value={3.5}>3.5 ⭐ 以上</option>
				</select>
			</div>

			<div class="filter-section">
				<h3>排序方式</h3>
				<select bind:value={sortBy}>
					<option value="rating">評分高到低</option>
					<option value="price">價格低到高</option>
					<option value="experience">經驗多到少</option>
				</select>
			</div>

			<div class="filter-actions">
				<button class="clear-btn" onclick={clearFilters}>清除</button>
				<button class="apply-btn" onclick={applyFilters}>套用</button>
			</div>
		</aside>

		<!-- 教練列表 -->
		<main class="trainers-main">
			<div class="trainers-toolbar">
				<button class="show-filters-btn" onclick={() => (showFilters = !showFilters)}>
					🔍 篩選
				</button>
				<div class="results-count">
					{#if !isLoading}
						找到 {filteredTrainers.length} 位教練
					{/if}
				</div>
			</div>

			{#if isLoading}
				<div class="loading-container">
					<LoadingAnimation size="lg" />
					<p>載入教練列表中...</p>
				</div>
			{:else if error}
				<div class="error-container">
					<p class="error-message">{error}</p>
					<button onclick={loadTrainers}>重試</button>
				</div>
			{:else if filteredTrainers.length === 0}
				<div class="empty-state">
					<p>😕 找不到符合條件的教練</p>
					<button onclick={clearFilters}>清除篩選</button>
				</div>
			{:else}
				<div class="trainers-grid">
					{#each filteredTrainers as trainer (trainer.id)}
						<TrainerCard {trainer} onClick={() => handleTrainerClick(trainer.id)} />
					{/each}
				</div>
			{/if}
		</main>
	</div>
</div>

<style>
	.trainers-page {
		max-width: 1400px;
		margin: 0 auto;
		padding: var(--spacing-lg);
	}

	.page-header {
		text-align: center;
		margin-bottom: var(--spacing-2xl);
	}

	.page-header h1 {
		margin: 0 0 var(--spacing-sm);
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.subtitle {
		margin: 0;
		font-size: var(--font-size-lg);
		color: var(--text-secondary);
	}

	.page-content {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: var(--spacing-2xl);
	}

	/* 篩選側邊欄 */
	.filters-sidebar {
		background-color: var(--card-bg);
		border-radius: var(--border-radius-lg);
		padding: var(--spacing-lg);
		height: fit-content;
		position: sticky;
		top: 80px;
		border: 1px solid var(--border-color);
	}

	.filters-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.filters-header h2 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.close-filters {
		display: none;
		background: none;
		border: none;
		font-size: var(--font-size-xl);
		cursor: pointer;
		color: var(--text-secondary);
	}

	.filter-section {
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-lg);
		border-bottom: 1px solid var(--border-color);
	}

	.filter-section:last-of-type {
		border-bottom: none;
	}

	.filter-section h3 {
		margin: 0 0 var(--spacing-sm);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--text-color);
	}

	.specialty-filters {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
	}

	.filter-tag {
		padding: var(--spacing-xs) var(--spacing-sm);
		font-size: var(--font-size-sm);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-full);
		background-color: var(--bg-primary);
		color: var(--text-color);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.filter-tag:hover {
		border-color: var(--btn-primary);
		background-color: var(--bg-secondary);
	}

	.filter-tag.selected {
		background-color: var(--btn-primary);
		color: var(--btn-text);
		border-color: var(--btn-primary);
	}

	.price-inputs {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.price-inputs input {
		flex: 1;
		padding: var(--spacing-xs) var(--spacing-sm);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		background-color: var(--bg-primary);
		color: var(--text-color);
	}

	.price-inputs span {
		color: var(--text-secondary);
	}

	select {
		width: 100%;
		padding: var(--spacing-xs) var(--spacing-sm);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		background-color: var(--bg-primary);
		color: var(--text-color);
		cursor: pointer;
	}

	.filter-actions {
		display: flex;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-md);
	}

	.clear-btn,
	.apply-btn {
		flex: 1;
		padding: var(--spacing-sm);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		border: none;
		border-radius: var(--border-radius-md);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.clear-btn {
		background-color: var(--bg-secondary);
		color: var(--text-color);
	}

	.apply-btn {
		background-color: var(--btn-primary);
		color: var(--btn-text);
	}

	.apply-btn:hover {
		background-color: var(--btn-primary-hover);
	}

	/* 主要內容區 */
	.trainers-main {
		min-width: 0;
	}

	.trainers-toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.show-filters-btn {
		display: none;
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--btn-primary);
		color: var(--btn-text);
		border: none;
		border-radius: var(--border-radius-md);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		cursor: pointer;
	}

	.results-count {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
	}

	.trainers-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--spacing-lg);
	}

	.loading-container,
	.error-container,
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md);
		min-height: 400px;
		text-align: center;
	}

	.error-message {
		color: var(--danger-color);
	}

	.empty-state p {
		font-size: var(--font-size-lg);
		color: var(--text-secondary);
	}

	@media (max-width: 1024px) {
		.page-content {
			grid-template-columns: 1fr;
		}

		.filters-sidebar {
			position: fixed;
			top: 0;
			left: -100%;
			width: 80%;
			max-width: 320px;
			height: 100vh;
			z-index: 1000;
			transition: left 0.3s ease;
			overflow-y: auto;
		}

		.filters-sidebar.show {
			left: 0;
		}

		.close-filters {
			display: block;
		}

		.show-filters-btn {
			display: block;
		}
	}

	@media (max-width: 768px) {
		.trainers-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

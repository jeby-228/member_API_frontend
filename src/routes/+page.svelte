<script lang="ts">
	import { onMount } from 'svelte';
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { getAvailableCourses } from '$lib/api/courses';
	import type { Course } from '$lib/types/course';

	let courses: Course[] = $state([]);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	onMount(async () => {
		try {
			courses = await getAvailableCourses();
		} catch (err) {
			error = err instanceof Error ? err.message : '載入課程失敗';
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="container">
	<header class="page-header">
		<h1>可預約課程</h1>
		<p class="subtitle">選擇您喜歡的課程，立即預約</p>
	</header>

	{#if isLoading}
		<div class="loading">
			<div class="spinner"></div>
			<p>載入課程中...</p>
		</div>
	{:else if error}
		<div class="error">
			<p>{error}</p>
			<button onclick={() => window.location.reload()}>重新載入</button>
		</div>
	{:else if courses.length === 0}
		<div class="empty">
			<p>目前沒有可預約的課程</p>
		</div>
	{:else}
		<div class="courses-grid">
			{#each courses as course (course.id)}
				<CourseCard {course} />
			{/each}
		</div>
	{/if}
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

	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.loading,
	.error,
	.empty {
		text-align: center;
		padding: 3rem 1rem;
	}

	.loading .spinner {
		width: 48px;
		height: 48px;
		margin: 0 auto 1rem;
		border: 4px solid #e5e7eb;
		border-top-color: #2563eb;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading p,
	.error p,
	.empty p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.error button {
		margin-top: 1rem;
		padding: 0.5rem 1.5rem;
		font-size: 1rem;
		color: white;
		background: #2563eb;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}

	.error button:hover {
		background: #1d4ed8;
	}

	@media (max-width: 768px) {
		.page-header h1 {
			font-size: 2rem;
		}

		.courses-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getAvailableCourses,
		CourseList,
		LoadingState,
		ErrorState,
		EmptyState,
		type Course
	} from '$lib/features/course';

	let courses = $state<Course[]>([]);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	async function loadCourses() {
		isLoading = true;
		error = null;
		try {
			courses = await getAvailableCourses();
		} catch (err) {
			error = err instanceof Error ? err.message : '載入課程失敗';
		} finally {
			isLoading = false;
		}
	}

	onMount(loadCourses);
</script>

<div class="container">
	<header class="page-header">
		<h1>可預約課程</h1>
		<p class="subtitle">選擇您喜歡的課程，立即預約</p>
	</header>

	{#if isLoading}
		<LoadingState />
	{:else if error}
		<ErrorState message={error} onRetry={loadCourses} />
	{:else if courses.length === 0}
		<EmptyState />
	{:else}
		<CourseList {courses} />
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

	@media (max-width: 768px) {
		.page-header h1 {
			font-size: 2rem;
		}
	}
</style>

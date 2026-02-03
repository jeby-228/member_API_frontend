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

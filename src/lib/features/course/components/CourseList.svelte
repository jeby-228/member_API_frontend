<script lang="ts">
	import type { Course } from '../types';
	import CourseCard from './CourseCard.svelte';

	interface Props {
		courses: Course[];
	}

	let { courses }: Props = $props();
</script>

<div class="courses-grid">
	{#each courses as course (course.id)}
		<CourseCard {course} />
	{/each}
</div>

<style>
	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	@media (max-width: 768px) {
		.courses-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

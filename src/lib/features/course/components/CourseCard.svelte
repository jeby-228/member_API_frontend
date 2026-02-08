<script lang="ts">
	import type { Course } from '../types';
	import {
		formatDateTime,
		calculateAvailableSeats,
		isAlmostFull,
		isFull,
		getButtonText
	} from '../utils';

	interface Props {
		course: Course;
	}

	let { course }: Props = $props();

	const availableSeats = $derived(calculateAvailableSeats(course));
	const almostFull = $derived(isAlmostFull(availableSeats));
	const fullCourse = $derived(isFull(availableSeats));
	const buttonText = $derived(getButtonText(availableSeats));
</script>

<article class="course-card">
	<div class="course-header">
		<h3 class="course-name">{course.name}</h3>
		<span class="seats" class:warning={almostFull}>
			剩餘 {availableSeats} 名額
		</span>
	</div>

	<div class="course-info">
		<div class="info-item">
			<span class="label">教師：</span>
			<span class="value">{course.instructor}</span>
		</div>
		<div class="info-item">
			<span class="label">時間：</span>
			<span class="value"
				>{formatDateTime(course.startTime)} - {formatDateTime(course.endTime)}</span
			>
		</div>
		<div class="info-item">
			<span class="label">地點：</span>
			<span class="value">{course.location}</span>
		</div>
	</div>

	{#if course.description}
		<p class="course-description">{course.description}</p>
	{/if}

	<button class="book-button" disabled={fullCourse}>
		{buttonText}
	</button>
</article>

<style>
	.course-card {
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 1.5rem;
		transition: box-shadow 0.2s ease;
	}

	.course-card:hover {
		box-shadow: 0 4px 12px var(--card-hover-shadow);
	}

	.course-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: 1rem;
	}

	.course-name {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-color);
		margin: 0;
	}

	.seats {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--badge-success-text, #10b981);
		background: var(--badge-success-bg, #d1fae5);
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		white-space: nowrap;
	}

	.seats.warning {
		color: var(--badge-warning-text, #f59e0b);
		background: var(--badge-warning-bg, #fef3c7);
	}

	.course-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.info-item {
		display: flex;
		font-size: 0.875rem;
	}

	.label {
		color: var(--text-secondary);
		min-width: 3.5rem;
	}

	.value {
		color: var(--text-color);
	}

	.course-description {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.5;
		margin: 0 0 1rem 0;
	}

	.book-button {
		width: 100%;
		padding: 0.75rem;
		font-size: 1rem;
		font-weight: 500;
		color: white;
		background: var(--btn-primary, #2563eb);
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.book-button:hover:not(:disabled) {
		background: var(--btn-primary-hover, #1d4ed8);
	}

	.book-button:disabled {
		background: var(--btn-disabled, #9ca3af);
		cursor: not-allowed;
	}
</style>

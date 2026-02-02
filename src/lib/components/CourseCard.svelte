<script lang="ts">
	import type { Course } from '$lib/types/course';

	interface Props {
		course: Course;
	}

	let { course }: Props = $props();

	function formatDateTime(dateString: string): string {
		const date = new Date(dateString);
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${month}/${day} ${hours}:${minutes}`;
	}

	const availableSeats = $derived(course.capacity - course.enrolled);
	const isAlmostFull = $derived(availableSeats <= 5);
</script>

<article class="course-card">
	<div class="course-header">
		<h3 class="course-name">{course.name}</h3>
		<span class="seats" class:warning={isAlmostFull}>
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

	<button class="book-button" disabled={availableSeats === 0}>
		{availableSeats === 0 ? '已額滿' : '立即預約'}
	</button>
</article>

<style>
	.course-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		padding: 1.5rem;
		transition: box-shadow 0.2s ease;
	}

	.course-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
		color: #111827;
		margin: 0;
	}

	.seats {
		font-size: 0.875rem;
		font-weight: 500;
		color: #10b981;
		background: #d1fae5;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		white-space: nowrap;
	}

	.seats.warning {
		color: #f59e0b;
		background: #fef3c7;
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
		color: #6b7280;
		min-width: 3.5rem;
	}

	.value {
		color: #374151;
	}

	.course-description {
		font-size: 0.875rem;
		color: #6b7280;
		line-height: 1.5;
		margin: 0 0 1rem 0;
	}

	.book-button {
		width: 100%;
		padding: 0.75rem;
		font-size: 1rem;
		font-weight: 500;
		color: white;
		background: #2563eb;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.book-button:hover:not(:disabled) {
		background: #1d4ed8;
	}

	.book-button:disabled {
		background: #9ca3af;
		cursor: not-allowed;
	}
</style>

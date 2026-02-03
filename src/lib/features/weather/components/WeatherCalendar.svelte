<script lang="ts">
	import type { DailyWeather } from '../types';
	import { generateCalendarDays, getMonthName } from '../utils';
	import DayCell from './DayCell.svelte';

	interface Props {
		weatherData: DailyWeather[];
		currentDate?: Date;
	}

	let { weatherData, currentDate = new Date() }: Props = $props();

	let displayDate = $state(new Date(currentDate));

	const year = $derived(displayDate.getFullYear());
	const month = $derived(displayDate.getMonth());
	const calendarDays = $derived(generateCalendarDays(year, month, weatherData));

	const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

	function previousMonth() {
		displayDate = new Date(year, month - 1, 1);
	}

	function nextMonth() {
		displayDate = new Date(year, month + 1, 1);
	}

	function goToToday() {
		displayDate = new Date();
	}
</script>

<div class="weather-calendar">
	<div class="calendar-header">
		<button class="nav-button" onclick={previousMonth}>◀</button>
		<div class="month-display">
			<h2>{year}年 {getMonthName(month)}</h2>
		</div>
		<button class="nav-button" onclick={nextMonth}>▶</button>
	</div>

	<div class="today-button-wrapper">
		<button class="today-button" onclick={goToToday}>回到今天</button>
	</div>

	<div class="calendar-grid">
		<div class="weekday-header">
			{#each weekDays as day}
				<div class="weekday">{day}</div>
			{/each}
		</div>

		<div class="days-grid">
			{#each calendarDays as day (day.date.toISOString())}
				<DayCell {day} />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.weather-calendar {
		max-width: 1400px;
		margin: 0 auto;
		padding: 1rem;
	}

	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
		padding: 1rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 12px;
		color: white;

		.month-display {
			flex: 1;
			text-align: center;

			h2 {
				margin: 0;
				font-size: 1.8rem;
				font-weight: 600;
			}
		}

		.nav-button {
			padding: 0.75rem 1.25rem;
			font-size: 1.2rem;
			background: rgba(255, 255, 255, 0.2);
			border: none;
			border-radius: 8px;
			color: white;
			cursor: pointer;
			transition: all 0.2s;

			&:hover {
				background: rgba(255, 255, 255, 0.3);
				transform: scale(1.05);
			}

			&:active {
				transform: scale(0.95);
			}
		}
	}

	.today-button-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;

		.today-button {
			padding: 0.5rem 1.5rem;
			font-size: 0.95rem;
			background: #2196f3;
			border: none;
			border-radius: 20px;
			color: white;
			cursor: pointer;
			transition: all 0.2s;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

			&:hover {
				background: #1976d2;
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
			}
		}
	}

	.calendar-grid {
		background: white;
		border-radius: 12px;
		padding: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.weekday-header {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
		margin-bottom: 8px;

		.weekday {
			text-align: center;
			font-weight: 600;
			color: #666;
			padding: 0.5rem;
			background: #f5f5f5;
			border-radius: 4px;
		}
	}

	.days-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
	}

	@media (max-width: 1200px) {
		.calendar-header {
			.month-display h2 {
				font-size: 1.5rem;
			}
		}
	}

	@media (max-width: 768px) {
		.weather-calendar {
			padding: 0.5rem;
		}

		.calendar-header {
			padding: 0.75rem;

			.month-display h2 {
				font-size: 1.2rem;
			}

			.nav-button {
				padding: 0.5rem 0.75rem;
				font-size: 1rem;
			}
		}

		.days-grid {
			gap: 4px;
		}
	}
</style>

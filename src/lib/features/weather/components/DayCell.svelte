<script lang="ts">
	import type { CalendarDay } from '../types';
	import { getWeatherIcon, getTemperatureColorClass, getRainColorClass } from '../utils';

	interface Props {
		day: CalendarDay;
	}

	let { day }: Props = $props();

	const dayNumber = $derived(day.date.getDate());
	const hasWeather = $derived(day.weather !== null);
	const weatherIcon = $derived(hasWeather ? getWeatherIcon(day.weather!.weatherDescription) : '');
	const tempColorClass = $derived(
		hasWeather ? getTemperatureColorClass(day.weather!.temperature.max) : ''
	);
	const rainColorClass = $derived(hasWeather ? getRainColorClass(day.weather!.pop) : '');
</script>

<div
	class="day-cell"
	class:not-current-month={!day.isCurrentMonth}
	class:is-today={day.isToday}
	class:has-weather={hasWeather}
>
	<div class="day-number">{dayNumber}</div>

	{#if hasWeather && day.weather}
		<div class="weather-info">
			<div class="weather-icon">{weatherIcon}</div>
			<div class="temperature {tempColorClass}">
				<span class="temp-max">{day.weather.temperature.max}°</span>
				<span class="temp-min">{day.weather.temperature.min}°</span>
			</div>
			<div class="rain-chance {rainColorClass}">
				💧 {day.weather.pop}%
			</div>
			<div class="weather-desc">{day.weather.weatherDescription}</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.day-cell {
		min-height: 120px;
		padding: 8px;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		background: white;
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;

		&:hover {
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
			transform: translateY(-2px);
		}

		&.not-current-month {
			opacity: 0.4;
			background: #f5f5f5;
		}

		&.is-today {
			border: 2px solid #2196f3;
			background: #e3f2fd;
		}
	}

	.day-number {
		font-size: 1.1rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 4px;
	}

	.weather-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 0.85rem;
	}

	.weather-icon {
		font-size: 2rem;
		text-align: center;
		margin: 4px 0;
	}

	.temperature {
		display: flex;
		justify-content: space-between;
		font-weight: 600;
		padding: 2px 4px;
		border-radius: 4px;

		.temp-max {
			color: #d32f2f;
		}

		.temp-min {
			color: #1976d2;
		}

		&.temp-very-hot {
			background: #ffebee;
		}
		&.temp-hot {
			background: #fff3e0;
		}
		&.temp-warm {
			background: #fff9c4;
		}
		&.temp-cool {
			background: #e1f5fe;
		}
		&.temp-cold {
			background: #e0f2f1;
		}
		&.temp-very-cold {
			background: #e8eaf6;
		}
	}

	.rain-chance {
		font-size: 0.8rem;
		padding: 2px 4px;
		border-radius: 4px;

		&.rain-high {
			background: #e3f2fd;
			color: #1565c0;
			font-weight: 600;
		}

		&.rain-medium {
			background: #f3e5f5;
			color: #6a1b9a;
		}

		&.rain-low {
			background: #f1f8e9;
			color: #558b2f;
		}
	}

	.weather-desc {
		font-size: 0.75rem;
		color: #666;
		text-align: center;
		margin-top: 2px;
	}
</style>

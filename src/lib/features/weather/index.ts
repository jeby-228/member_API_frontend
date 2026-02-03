// src/lib/features/weather/index.ts

// Types
export type { DailyWeather, CalendarDay, CWAWeatherResponse, LocationWeather } from './types';

// API Functions
export { get30DaysWeather, getWeatherForecast, parseWeatherData } from './api';

// Utils
export {
	generateCalendarDays,
	getWeatherIcon,
	getTemperatureColorClass,
	getRainColorClass,
	formatDateChinese,
	getMonthName
} from './utils';

// Components
export { default as WeatherCalendar } from './components/WeatherCalendar.svelte';
export { default as DayCell } from './components/DayCell.svelte';
export { default as LoadingState } from './components/LoadingState.svelte';
export { default as ErrorState } from './components/ErrorState.svelte';

// src/lib/features/weather/types.ts

/**
 * 天氣元素資料
 */
export interface WeatherElement {
	elementName: string;
	time: WeatherTime[];
}

/**
 * 天氣時間資料
 */
export interface WeatherTime {
	startTime: string;
	endTime: string;
	parameter: {
		parameterName: string;
		parameterValue?: string;
		parameterUnit?: string;
	};
	elementValue?: Array<{
		value: string;
		measures: string;
	}>;
}

/**
 * 地點天氣資料
 */
export interface LocationWeather {
	locationName: string;
	weatherElement: WeatherElement[];
}

/**
 * CWA API 回應格式
 */
export interface CWAWeatherResponse {
	success: string;
	result: {
		resource_id: string;
		fields: Array<{
			id: string;
			type: string;
		}>;
	};
	records: {
		datasetDescription: string;
		location: LocationWeather[];
	};
}

/**
 * 簡化的每日天氣資料
 */
export interface DailyWeather {
	date: string; // YYYY-MM-DD
	weatherDescription: string; // 天氣描述
	temperature: {
		min: number;
		max: number;
	};
	pop: number; // 降雨機率 (0-100)
	comfort: string; // 舒適度
}

/**
 * 月曆日期資料
 */
export interface CalendarDay {
	date: Date;
	weather: DailyWeather | null;
	isCurrentMonth: boolean;
	isToday: boolean;
}

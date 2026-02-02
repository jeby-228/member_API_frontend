// src/lib/features/course/types.ts

/**
 * 課程資料型別
 */
export interface Course {
	id: string;
	name: string;
	instructor: string;
	startTime: string;
	endTime: string;
	location: string;
	capacity: number;
	enrolled: number;
	description?: string;
}

/**
 * 建立課程的請求資料
 */
export interface CreateCourseRequest {
	name: string;
	instructor: string;
	startTime: string;
	endTime: string;
	location: string;
	capacity: number;
	description?: string;
}

/**
 * 更新課程的請求資料
 */
export interface UpdateCourseRequest {
	name?: string;
	instructor?: string;
	startTime?: string;
	endTime?: string;
	location?: string;
	capacity?: number;
	description?: string;
}

/**
 * 分頁查詢參數
 */
export interface ListCourseParams {
	page?: number;
	limit?: number;
	sort?: string;
	order?: 'asc' | 'desc';
	status?: 'available' | 'full' | 'all';
}

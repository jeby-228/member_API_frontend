// src/lib/features/course/store.ts

import { writable } from 'svelte/store';
import type { Course } from './types';

/**
 * 選中的課程
 */
export const selectedCourse = writable<Course | null>(null);

/**
 * 課程列表
 */
export const courseList = writable<Course[]>([]);

/**
 * Loading 狀態
 */
export const isLoading = writable(false);

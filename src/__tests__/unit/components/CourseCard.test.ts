import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, beforeEach } from 'vitest';
import CourseCard from '$lib/components/CourseCard.svelte';
import type { Course } from '$lib/types/course';

describe('CourseCard Component', () => {
	const mockCourse: Course = {
		id: '1',
		name: '瑜伽基礎班',
		instructor: '張老師',
		startTime: '2026-02-05T09:00:00',
		endTime: '2026-02-05T10:30:00',
		location: '教室 A',
		capacity: 20,
		enrolled: 15,
		description: '適合初學者的瑜伽課程'
	};

	describe('渲染測試', () => {
		it('應該正確顯示課程名稱', () => {
			render(CourseCard, { props: { course: mockCourse } });
			
			expect(screen.getByText('瑜伽基礎班')).toBeInTheDocument();
		});

		it('應該正確顯示教師名稱', () => {
			render(CourseCard, { props: { course: mockCourse } });
			
			expect(screen.getByText('張老師')).toBeInTheDocument();
		});

		it('應該正確顯示地點', () => {
			render(CourseCard, { props: { course: mockCourse } });
			
			expect(screen.getByText('教室 A')).toBeInTheDocument();
		});

		it('應該顯示課程描述', () => {
			render(CourseCard, { props: { course: mockCourse } });
			
			expect(screen.getByText('適合初學者的瑜伽課程')).toBeInTheDocument();
		});

		it('沒有描述時不應該顯示描述區塊', () => {
			const courseWithoutDesc = { ...mockCourse, description: undefined };
			const { container } = render(CourseCard, { props: { course: courseWithoutDesc } });
			
			const description = container.querySelector('.course-description');
			expect(description).not.toBeInTheDocument();
		});
	});

	describe('日期格式化', () => {
		it('應該正確格式化開始時間', () => {
			render(CourseCard, { props: { course: mockCourse } });
			
			expect(screen.getByText(/02\/05 09:00/)).toBeInTheDocument();
		});

		it('應該正確格式化結束時間', () => {
			render(CourseCard, { props: { course: mockCourse } });
			
			expect(screen.getByText(/10:30/)).toBeInTheDocument();
		});

		it('應該補零到兩位數', () => {
			const course = {
				...mockCourse,
				startTime: '2026-01-05T09:05:00',
				endTime: '2026-01-05T10:05:00'
			};
			render(CourseCard, { props: { course } });
			
			expect(screen.getByText(/01\/05 09:05/)).toBeInTheDocument();
			expect(screen.getByText(/10:05/)).toBeInTheDocument();
		});
	});

	describe('剩餘名額計算', () => {
		it('應該正確計算剩餘名額', () => {
			render(CourseCard, { props: { course: mockCourse } });
			
			expect(screen.getByText('剩餘 5 名額')).toBeInTheDocument();
		});

		it('名額充足時不應該有警告樣式', () => {
			const course = { ...mockCourse, enrolled: 10 };
			const { container } = render(CourseCard, { props: { course } });
			
			const seatsSpan = container.querySelector('.seats');
			expect(seatsSpan).not.toHaveClass('warning');
		});

		it('名額少於等於 5 時應該有警告樣式', () => {
			const course = { ...mockCourse, enrolled: 15 };
			const { container } = render(CourseCard, { props: { course } });
			
			const seatsSpan = container.querySelector('.seats');
			expect(seatsSpan).toHaveClass('warning');
		});

		it('剩餘 1 名額時應該顯示警告', () => {
			const course = { ...mockCourse, enrolled: 19 };
			const { container } = render(CourseCard, { props: { course } });
			
			expect(screen.getByText('剩餘 1 名額')).toBeInTheDocument();
			const seatsSpan = container.querySelector('.seats');
			expect(seatsSpan).toHaveClass('warning');
		});

		it('額滿時應該顯示 0 名額', () => {
			const course = { ...mockCourse, enrolled: 20 };
			render(CourseCard, { props: { course } });
			
			expect(screen.getByText('剩餘 0 名額')).toBeInTheDocument();
		});
	});

	describe('預約按鈕', () => {
		it('有名額時應該顯示「立即預約」', () => {
			render(CourseCard, { props: { course: mockCourse } });
			
			const button = screen.getByRole('button', { name: '立即預約' });
			expect(button).toBeInTheDocument();
			expect(button).toBeEnabled();
		});

		it('額滿時應該顯示「已額滿」', () => {
			const course = { ...mockCourse, enrolled: 20 };
			render(CourseCard, { props: { course } });
			
			const button = screen.getByRole('button', { name: '已額滿' });
			expect(button).toBeInTheDocument();
		});

		it('額滿時按鈕應該被禁用', () => {
			const course = { ...mockCourse, enrolled: 20 };
			render(CourseCard, { props: { course } });
			
			const button = screen.getByRole('button');
			expect(button).toBeDisabled();
		});

		it('有名額時按鈕應該可用', () => {
			render(CourseCard, { props: { course: mockCourse } });
			
			const button = screen.getByRole('button');
			expect(button).toBeEnabled();
		});
	});

	describe('邊界值測試', () => {
		it('capacity 和 enrolled 相同時應該額滿', () => {
			const course = { ...mockCourse, capacity: 10, enrolled: 10 };
			render(CourseCard, { props: { course } });
			
			expect(screen.getByText('剩餘 0 名額')).toBeInTheDocument();
			expect(screen.getByRole('button')).toBeDisabled();
		});

		it('enrolled 為 0 時應該顯示全部名額', () => {
			const course = { ...mockCourse, enrolled: 0 };
			render(CourseCard, { props: { course } });
			
			expect(screen.getByText('剩餘 20 名額')).toBeInTheDocument();
		});

		it('剩餘 6 名額時不應該有警告樣式', () => {
			const course = { ...mockCourse, capacity: 20, enrolled: 14 };
			const { container } = render(CourseCard, { props: { course } });
			
			expect(screen.getByText('剩餘 6 名額')).toBeInTheDocument();
			const seatsSpan = container.querySelector('.seats');
			expect(seatsSpan).not.toHaveClass('warning');
		});

		it('剩餘 5 名額時應該有警告樣式', () => {
			const course = { ...mockCourse, capacity: 20, enrolled: 15 };
			const { container } = render(CourseCard, { props: { course } });
			
			expect(screen.getByText('剩餘 5 名額')).toBeInTheDocument();
			const seatsSpan = container.querySelector('.seats');
			expect(seatsSpan).toHaveClass('warning');
		});
	});

	describe('樣式測試', () => {
		it('應該有 course-card class', () => {
			const { container } = render(CourseCard, { props: { course: mockCourse } });
			
			const card = container.querySelector('.course-card');
			expect(card).toBeInTheDocument();
		});

		it('應該使用 article 標籤', () => {
			const { container } = render(CourseCard, { props: { course: mockCourse } });
			
			const article = container.querySelector('article');
			expect(article).toBeInTheDocument();
		});

		it('課程名稱應該是 h3 標籤', () => {
			const { container } = render(CourseCard, { props: { course: mockCourse } });
			
			const heading = container.querySelector('h3.course-name');
			expect(heading).toBeInTheDocument();
			expect(heading?.textContent).toBe('瑜伽基礎班');
		});
	});
});

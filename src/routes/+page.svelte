<script lang="ts">
	import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/svelte';

	let currentDate = $state(new Date());
	let selectedDate = $state<Date | null>(null);

	interface CoachClass {
		id: string;
		coachName: string;
		className: string;
		time: string;
		color: string;
	}

	let coachClasses: Record<string, CoachClass[]> = $state({
		'2026-02-10': [
			{ id: '1', coachName: '張教練', className: '瑜伽课', time: '10:00', color: 'bg-blue-500' },
			{ id: '2', coachName: '李教練', className: '健身课', time: '14:00', color: 'bg-green-500' }
		],
		'2026-02-12': [
			{ id: '3', coachName: '王教練', className: '游泳課', time: '09:00', color: 'bg-purple-500' }
		],
		'2026-02-15': [
			{
				id: '4',
				coachName: '陳教練',
				className: '拳擊課',
				time: '16:00',
				color: 'bg-orange-500'
			},
			{ id: '5', coachName: '張教練', className: '瑜珈課', time: '18:00', color: 'bg-blue-500' }
		],
		'2026-02-20': [
			{ id: '6', coachName: '李教練', className: '健身課', time: '10:00', color: 'bg-green-500' }
		]
	});

	let calendarDays = $derived(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const startDay = firstDay.getDay();
		const daysInMonth = lastDay.getDate();

		const days: (Date | null)[] = [];

		for (let i = 0; i < startDay; i++) {
			const prevDate = new Date(year, month, -startDay + i + 1);
			days.push(prevDate);
		}

		for (let i = 1; i <= daysInMonth; i++) {
			days.push(new Date(year, month, i));
		}

		const remainingDays = 42 - days.length;
		for (let i = 1; i <= remainingDays; i++) {
			days.push(new Date(year, month + 1, i));
		}

		return days;
	});

	function getClassesForDate(date: Date | null): CoachClass[] {
		if (!date) return [];
		const dateKey = formatDateKey(date);
		return coachClasses[dateKey] || [];
	}

	function formatDateKey(date: Date): string {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	}

	function isCurrentMonth(date: Date | null): boolean {
		if (!date) return false;
		return date.getMonth() === currentDate.getMonth();
	}

	function isToday(date: Date | null): boolean {
		if (!date) return false;
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	}

	function isSelected(date: Date | null): boolean {
		if (!date || !selectedDate) return false;
		return (
			date.getDate() === selectedDate.getDate() &&
			date.getMonth() === selectedDate.getMonth() &&
			date.getFullYear() === selectedDate.getFullYear()
		);
	}

	function prevMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
	}

	function nextMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
	}

	function goToToday() {
		currentDate = new Date();
		selectedDate = new Date();
	}

	function selectDate(date: Date | null) {
		if (date) {
			selectedDate = date;
		}
	}

	let monthYear = $derived(
		currentDate.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' })
	);
</script>

<div class="container mx-auto max-w-7xl p-4 dark:bg-surface-950 dark:text-surface-50">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold">教練課程月曆</h1>
		<button onclick={goToToday} class="btn preset-tonal"> 今天 </button>
	</div>

	<div class="card preset-filled p-6 dark:bg-surface-900">
		<div class="mb-6 flex items-center justify-between">
			<button onclick={prevMonth} class="btn-icon hover:preset-tonal" aria-label="上個月">
				<ChevronLeftIcon class="size-6" />
			</button>
			<h2 class="text-2xl font-semibold">{monthYear}</h2>
			<button onclick={nextMonth} class="btn-icon hover:preset-tonal" aria-label="下個月">
				<ChevronRightIcon class="size-6" />
			</button>
		</div>

		<div class="mb-2 grid grid-cols-7 gap-2">
			{#each ['日', '一', '二', '三', '四', '五', '六'] as day, index (index)}
				<div class="text-center text-sm font-semibold text-surface-400 dark:text-surface-500">
					{day}
				</div>
			{/each}
		</div>

		<div class="grid grid-cols-7 gap-2">
			{#each calendarDays() as date, index (index)}
				{@const classes = getClassesForDate(date)}
				{@const isCurrent = isCurrentMonth(date)}
				{@const isTodayDate = isToday(date)}
				{@const isSelectedDate = isSelected(date)}

				<button
					onclick={() => selectDate(date)}
					class="relative min-h-24 rounded-lg border-2 p-2 text-left transition-all hover:border-primary-500
						{isCurrent
						? 'border-surface-700 bg-surface-800 dark:border-surface-600 dark:bg-surface-800'
						: 'border-surface-800 bg-surface-900 opacity-50 dark:border-surface-700 dark:bg-surface-900'}
						{isTodayDate ? 'ring-2 ring-primary-500' : ''}
						{isSelectedDate ? 'border-primary-500 bg-primary-500/10' : ''}"
				>
					<div
						class="mb-1 text-sm font-semibold
						{isTodayDate
							? 'flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white'
							: ''}"
					>
						{date?.getDate()}
					</div>

					{#if classes.length > 0}
						<div class="space-y-1">
							{#each classes.slice(0, 2) as classItem (classItem.id)}
								<div
									class="{classItem.color} truncate rounded px-1.5 py-0.5 text-xs text-white"
									title="{classItem.coachName} - {classItem.className} ({classItem.time})"
								>
									{classItem.coachName}
								</div>
							{/each}
							{#if classes.length > 2}
								<div class="text-xs text-surface-400 dark:text-surface-500">
									+{classes.length - 2} 更多
								</div>
							{/if}
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	{#if selectedDate}
		{@const selectedClasses = getClassesForDate(selectedDate)}
		<div class="mt-6 card preset-tonal p-6 dark:bg-surface-800">
			<h3 class="mb-4 text-xl font-semibold">
				{selectedDate.toLocaleDateString('zh-TW', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})} 的課程
			</h3>

			{#if selectedClasses.length > 0}
				<div class="space-y-3">
					{#each selectedClasses as classItem (classItem.id)}
						<div class="flex items-center gap-4 card preset-filled p-4 dark:bg-surface-900">
							<div class="{classItem.color} h-12 w-1 rounded"></div>
							<div class="flex-1">
								<h4 class="font-semibold">{classItem.className}</h4>
								<p class="text-sm text-surface-400 dark:text-surface-500">
									教練: {classItem.coachName}
								</p>
							</div>
							<div class="text-right">
								<p class="font-semibold">{classItem.time}</p>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-surface-400 dark:text-surface-500">目前沒有安排課程</p>
			{/if}
		</div>
	{/if}

	<!-- 图例 -->
	<div class="mt-6 card preset-outlined p-6 dark:border-surface-700 dark:bg-surface-800">
		<h3 class="mb-3 text-lg font-semibold">教練圖例</h3>
		<div class="flex flex-wrap gap-4">
			<div class="flex items-center gap-2">
				<div class="h-4 w-4 rounded bg-blue-500"></div>
				<span class="text-sm">張教練</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="h-4 w-4 rounded bg-green-500"></div>
				<span class="text-sm">李教練</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="h-4 w-4 rounded bg-purple-500"></div>
				<span class="text-sm">王教練</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="h-4 w-4 rounded bg-orange-500"></div>
				<span class="text-sm">陳教練</span>
			</div>
		</div>
	</div>
</div>

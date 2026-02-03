<script lang="ts">
	import { theme } from '$lib/stores/theme';
</script>

<button class="theme-toggle" onclick={() => theme.toggle()} aria-label="切換深色模式">
	{#if $theme === 'light'}
		<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
	{:else}
		<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
			/>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: 0.375rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		z-index: 99;
		cursor: pointer;
		padding: 0;
	}

	.theme-toggle:hover {
		transform: scale(1.05);
		background: var(--btn-primary);
		color: white;
		box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
	}

	.icon {
		width: 1.25rem;
		height: 1.25rem;
		color: inherit;
	}

	/* 深色模式：使用設計規範的顏色和陰影 */
	:global(html.dark) .theme-toggle {
		background: var(--btn-primary);
		color: white;
		border-color: var(--btn-primary);
		box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
	}

	:global(html.dark) .theme-toggle:hover {
		background: #3b82f6;
		box-shadow: 0 8px 16px rgba(37, 99, 235, 0.4);
		transform: scale(1.1);
	}

	@media (max-width: 768px) {
		.theme-toggle {
			width: 2rem;
			height: 2rem;
			bottom: 1rem;
			right: 1rem;
		}

		.icon {
			width: 1rem;
			height: 1rem;
		}
	}
</style>

<script lang="ts">
	interface Props {
		message?: string;
		onRetry?: () => void;
	}

	let { message = '載入天氣資料失敗', onRetry }: Props = $props();
</script>

<div class="error-container">
	<div class="error-icon">⚠️</div>
	<h3>發生錯誤</h3>
	<p>{message}</p>
	{#if onRetry}
		<button class="retry-button" onclick={onRetry}>重新載入</button>
	{/if}
</div>

<style lang="scss">
	.error-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 400px;
		gap: 1rem;
		padding: 2rem;
	}

	.error-icon {
		font-size: 4rem;
	}

	h3 {
		color: #d32f2f;
		margin: 0;
	}

	p {
		color: #666;
		text-align: center;
		max-width: 500px;
	}

	.retry-button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		color: white;
		background: #2196f3;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background 0.2s;

		&:hover {
			background: #1976d2;
		}

		&:active {
			background: #0d47a1;
		}
	}
</style>

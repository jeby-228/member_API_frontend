<script lang="ts">
	interface Props {
		message: string;
		onRetry?: () => void;
	}

	let { message, onRetry }: Props = $props();
</script>

<div class="error">
	<p>{message}</p>
	{#if onRetry}
		<button onclick={onRetry}>重新載入</button>
	{/if}
</div>

<style>
	.error {
		text-align: center;
		padding: 3rem 1rem;
	}

	.error p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0 0 1rem 0;
	}

	.error button {
		padding: 0.5rem 1.5rem;
		font-size: 1rem;
		color: white;
		background: #2563eb;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}

	.error button:hover {
		background: #1d4ed8;
	}
</style>

<script lang="ts">
	interface Props {
		title?: string;
		message?: string;
		imagePath?: string;
	}

	let {
		title = '施工中',
		message = '此頁面正在開發中，敬請期待！',
		imagePath = '/assets/WIP/WIP-1.png'
	}: Props = $props();
</script>

<div class="wip-container">
	<div class="wip-content">
		<h1>{title}</h1>
		<img src={imagePath} alt="Under Construction" width="400" />
		<p>{message}</p>
		<slot />
	</div>
</div>

<style>
	.wip-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - 200px);
		padding: 2rem 1rem;
	}

	.wip-content {
		text-align: center;
	}

	.wip-content h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-color);
		margin-bottom: 2rem;
	}

	.wip-content img {
		margin-bottom: 2rem;
		max-width: 100%;
		height: auto;
	}

	.wip-content p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0;
	}

	:global(.wip-content > *) {
		margin-bottom: 1rem;
	}

	:global(.wip-content > *:last-child) {
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		.wip-content h1 {
			font-size: 1.75rem;
		}

		.wip-content img {
			width: 300px;
		}
	}
</style>

<script lang="ts">
	import { gifAnimation } from '$lib/design/animation-tokens';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		gifPath?: string;
		alt?: string;
	}

	let {
		size = 'md',
		gifPath = gifAnimation.defaultPath,
		alt = 'Loading animation'
	}: Props = $props();

	const gifSize = $derived(gifAnimation.size[size]);
</script>

<div class="gif-container" role="status" aria-label="載入中">
	<img
		src={gifPath}
		{alt}
		class="gif-loading"
		style="--gif-size: {gifSize};"
		loading="eager"
		data-unoptimized="true"
	/>
</div>

<style>
	.gif-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.gif-loading {
		width: var(--gif-size);
		height: var(--gif-size);
		object-fit: contain;
		user-select: none;
		pointer-events: none;
	}

	/* 確保 GIF 在深色模式下正常顯示 */
	@media (prefers-color-scheme: dark) {
		.gif-loading {
			filter: brightness(0.9);
		}
	}
</style>

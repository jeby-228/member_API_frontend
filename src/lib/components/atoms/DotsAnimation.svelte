<script lang="ts">
	import { dotsAnimation } from '$lib/design/animation-tokens';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		color?: string;
	}

	let { size = 'md', color = dotsAnimation.color }: Props = $props();

	const dotSize = $derived(dotsAnimation.size[size]);
	const spacing = $derived(dotsAnimation.spacing[size]);
</script>

<div class="dots-container" role="status" aria-label="載入中">
	{#each Array(dotsAnimation.count) as _, i}
		<div
			class="dot"
			style="
        --dot-size: {dotSize};
        --dot-spacing: {spacing};
        --dot-color: {color};
        --animation-delay: {i * parseFloat(dotsAnimation.delay)}s;
      "
		></div>
	{/each}
</div>

<style>
	.dots-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--dot-spacing);
	}

	.dot {
		width: var(--dot-size);
		height: var(--dot-size);
		background-color: var(--dot-color);
		border-radius: 50%;
		animation: bounce 1.4s ease-in-out infinite;
		animation-delay: var(--animation-delay);
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: scale(0);
			opacity: 0.5;
		}
		40% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>

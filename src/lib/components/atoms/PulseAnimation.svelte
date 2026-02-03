<script lang="ts">
	import { pulseAnimation } from '$lib/design/animation-tokens';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		color?: string;
	}

	let { size = 'md', color = pulseAnimation.color }: Props = $props();

	const circleSize = $derived(pulseAnimation.size[size]);
</script>

<div
	class="pulse"
	style="
    --pulse-size: {circleSize};
    --pulse-color: {color};
    --pulse-duration: {pulseAnimation.duration};
  "
	role="status"
	aria-label="載入中"
></div>

<style>
	.pulse {
		width: var(--pulse-size);
		height: var(--pulse-size);
		margin: 0 auto;
		background-color: var(--pulse-color);
		border-radius: 50%;
		animation: pulse var(--pulse-duration) ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(0.8);
			opacity: 0.3;
		}
		50% {
			transform: scale(1.2);
			opacity: 1;
		}
	}
</style>

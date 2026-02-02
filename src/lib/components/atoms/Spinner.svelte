<script lang="ts">
	import { spinnerAnimation } from '$lib/design/animation-tokens';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		speed?: 'slow' | 'normal' | 'fast';
		color?: string;
	}

	let { size = 'md', speed = 'normal', color = spinnerAnimation.color.active }: Props = $props();
</script>

<div
	class="spinner"
	style="
    --spinner-size: {spinnerAnimation.size[size]};
    --border-width: {spinnerAnimation.borderWidth[size]};
    --border-color: {spinnerAnimation.color.border};
    --spinner-color: {color};
    --animation-speed: {spinnerAnimation.speed[speed]};
  "
	role="status"
	aria-label="載入中"
></div>

<style>
	.spinner {
		width: var(--spinner-size);
		height: var(--spinner-size);
		margin: 0 auto;
		border: var(--border-width) solid var(--border-color);
		border-top-color: var(--spinner-color);
		border-radius: 50%;
		animation: spin var(--animation-speed) linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>

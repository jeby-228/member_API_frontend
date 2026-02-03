<script lang="ts">
	import Spinner from './Spinner.svelte';
	import DotsAnimation from './DotsAnimation.svelte';
	import PulseAnimation from './PulseAnimation.svelte';
	import GifAnimation from './GifAnimation.svelte';
	import { loadingContainer, type LoadingAnimationType } from '$lib/design/animation-tokens';

	interface Props {
		type?: LoadingAnimationType;
		size?: 'sm' | 'md' | 'lg';
		speed?: 'slow' | 'normal' | 'fast';
		message?: string;
		color?: string;
		gifPath?: string;
	}

	let {
		type = 'gif',
		size = 'md',
		speed = 'normal',
		message,
		color,
		gifPath
	}: Props = $props();
</script>

<div class="loading-container">
	{#if type === 'spinner'}
		<Spinner {size} {speed} {color} />
	{:else if type === 'dots'}
		<DotsAnimation {size} {color} />
	{:else if type === 'pulse'}
		<PulseAnimation {size} {color} />
	{:else if type === 'gif'}
		<GifAnimation {size} {gifPath} />
	{/if}

	{#if message}
		<p class="loading-message">{message}</p>
	{/if}
</div>

<style>
	.loading-container {
		text-align: center;
		padding: 3rem 1rem;
	}

	.loading-message {
		margin-top: 1rem;
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin-bottom: 0;
	}
</style>

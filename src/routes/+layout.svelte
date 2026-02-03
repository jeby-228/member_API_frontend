<script lang="ts">
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import favicon from '$lib/assets/favicon.svg';
	import '../styles/global.scss';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';

	let { children } = $props();
	injectSpeedInsights();
	$effect(() => {
		if (browser) {
			document.documentElement.classList.toggle('dark', $theme === 'dark');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<ThemeToggle />

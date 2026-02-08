<script lang="ts">
	// vercel speed insights
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectSpeedInsights();
	//
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import AppHeader from '$lib/components/AppHeader.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();
	let showSidebar = $state(false);
	let showSearch = $state(false);
	let searchQuery = $state('');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<AppHeader bind:showSearch bind:searchQuery onMenuToggle={() => (showSidebar = !showSidebar)} />

<div class="relative flex h-[calc(100vh-4rem)]">
	<Sidebar bind:show={showSidebar} />

	<!-- Main Content -->
	<main class="flex-1 overflow-y-auto p-4">
		{@render children()}
	</main>
</div>

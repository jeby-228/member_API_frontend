<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { slide } from 'svelte/transition';
	import {
		CalendarIcon,
		CircleUserIcon,
		MenuIcon,
		SearchIcon,
		GithubIcon,
		HomeIcon,
		UserIcon,
		SettingsIcon,
		HelpCircleIcon
	} from '@lucide/svelte';
	import { AppBar, Navigation } from '@skeletonlabs/skeleton-svelte';
	import { env } from '$env/dynamic/public';
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';

	let repo_name = env.PUBLIC_GITHUB_REPO;
	let { children, data } = $props();
	let showSidebar = $state(false);
	let showSearch = $state(false);
	let searchQuery = $state('');

	// 判斷當前路由是否為活動狀態
	function isActive(path: string) {
		return $page.url.pathname === path;
	}

	// 搜尋功能
	function handleSearch() {
		showSearch = !showSearch;
		if (!showSearch) {
			searchQuery = '';
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<style>${data.css}</style>`}
</svelte:head>

<AppBar>
	<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
		<AppBar.Lead>
			<button
				type="button"
				class="btn-icon btn-icon-lg hover:preset-tonal"
				onclick={() => (showSidebar = !showSidebar)}
				aria-label="切換選單"
			>
				<MenuIcon />
			</button>
		</AppBar.Lead>
		<AppBar.Headline>
			<a href={resolve('/')} class="text-2xl transition-opacity hover:opacity-80">Skeleton</a>
		</AppBar.Headline>
		<AppBar.Trail>
			<button
				type="button"
				class="btn-icon hover:preset-tonal"
				onclick={handleSearch}
				aria-label="搜尋"
			>
				<SearchIcon class="size-6" />
			</button>
			<button type="button" class="btn-icon hover:preset-tonal" aria-label="行事曆">
				<CalendarIcon class="size-6" />
			</button>
			<button type="button" class="btn-icon hover:preset-tonal" aria-label="使用者資料">
				<CircleUserIcon class="size-6" />
			</button>
		</AppBar.Trail>
	</AppBar.Toolbar>
	{#if showSearch}
		<div transition:slide={{ duration: 200 }} class="px-4 pb-4">
			<input type="search" bind:value={searchQuery} placeholder="搜尋..." class="input w-full" />
		</div>
	{/if}
</AppBar>

<div class="flex h-[calc(100vh-4rem)]">
	<!-- Sidebar -->
	{#if showSidebar}
		<div transition:slide={{ duration: 300, axis: 'x' }} class="h-full">
			<Navigation layout="sidebar" class="flex h-full flex-col">
				<Navigation.Header>
					<h2 class="text-lg font-bold">選單</h2>
				</Navigation.Header>
				<Navigation.Content class="flex-1">
					<Navigation.Group>
						<Navigation.Label>主要</Navigation.Label>
						<Navigation.Menu>
							<Navigation.TriggerAnchor
								href={resolve('/')}
								class={isActive('/') ? 'preset-filled' : ''}
							>
								<HomeIcon class="mr-2 size-5" />
								<Navigation.TriggerText>儀表板</Navigation.TriggerText>
							</Navigation.TriggerAnchor>
							<Navigation.TriggerAnchor
								href={resolve('/profile' as '/')}
								class={isActive('/profile') ? 'preset-filled' : ''}
							>
								<UserIcon class="mr-2 size-5" />
								<Navigation.TriggerText>個人資料</Navigation.TriggerText>
							</Navigation.TriggerAnchor>
						</Navigation.Menu>
					</Navigation.Group>
					<Navigation.Group>
						<Navigation.Label>設定</Navigation.Label>
						<Navigation.Menu>
							<Navigation.TriggerAnchor
								href={resolve('/preferences' as '/')}
								class={isActive('/preferences') ? 'preset-filled' : ''}
							>
								<SettingsIcon class="mr-2 size-5" />
								<Navigation.TriggerText>偏好設定</Navigation.TriggerText>
							</Navigation.TriggerAnchor>
							<Navigation.TriggerAnchor
								href={resolve('/help' as '/')}
								class={isActive('/help') ? 'preset-filled' : ''}
							>
								<HelpCircleIcon class="mr-2 size-5" />
								<Navigation.TriggerText>幫助與支援</Navigation.TriggerText>
							</Navigation.TriggerAnchor>
						</Navigation.Menu>
					</Navigation.Group>
				</Navigation.Content>
				<Navigation.Footer class="mt-auto">
					<div class="border-t border-surface-700 pt-4">
						<div class="flex items-center gap-3 px-4 py-2">
							<div class="flex-1">
								<p class="text-sm font-semibold">Jeby</p>
								<p class="text-xs text-surface-400">開發者</p>
							</div>
							<a
								href={repo_name}
								target="_blank"
								rel="noopener noreferrer"
								class="btn-icon hover:preset-tonal"
								aria-label="GitHub 儲存庫"
							>
								<GithubIcon class="size-5" />
							</a>
						</div>
					</div>
				</Navigation.Footer>
			</Navigation>
		</div>
	{/if}

	<!-- Main Content -->
	<main class="flex-1 overflow-y-auto p-4">
		{@render children()}
	</main>
</div>

<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../styles/global.scss';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';

	let { children } = $props();
	let isNavVisible = $state(true);
	let lastScrollY = $state(0);

	$effect(() => {
		if (browser) {
			document.documentElement.classList.toggle('dark', $theme === 'dark');
		}
	});

	$effect(() => {
		if (!browser) return;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// 往下滑動時隱藏 nav（向下滑動超過 50px）
			if (currentScrollY > lastScrollY && currentScrollY > 50) {
				isNavVisible = false;
			}
			// 往上滑動時顯示 nav
			else if (currentScrollY < lastScrollY) {
				isNavVisible = true;
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="layout-nav" class:hidden={!isNavVisible}>
	<div class="nav-brand">Member API</div>
	<div class="nav-links">
		<a href="/">Home</a>
		<a href="/demo">Demo</a>
		<a href="/login">Login</a>
	</div>
	<div class="nav-actions">
		<ThemeToggle />
	</div>
</nav>

<main>
	{@render children()}
</main>

<footer>
	<div>website design by Jeby</div>
	<a
		href="https://github.com/jeby-228/member_API_frontend"
		target="_blank"
		rel="noopener noreferrer"
	>
		github link
		<img class="github-icon" src="/assets/icons/github.svg" alt="GitHub Logo" />
	</a>
</footer>

<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		padding-top: 2rem;
		padding-bottom: 3rem;
	}

	.layout-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		padding: 1rem 2rem;
		background-color: var(--card-bg);
		border-bottom: 1px solid var(--border-color);
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		transition: all 0.3s ease;
		transform: translateY(0);
	}

	.layout-nav.hidden {
		transform: translateY(-100%);
		box-shadow: none;
	}

	.nav-brand {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--btn-primary);
		white-space: nowrap;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
	}

	.layout-nav a {
		color: var(--text-color);
		text-decoration: none;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		transition: all 0.3s ease;
		position: relative;
		font-size: 0.95rem;
	}

	.layout-nav a:hover {
		color: var(--btn-primary);
		background-color: var(--bg-secondary);
	}

	.layout-nav a::after {
		content: '';
		position: absolute;
		bottom: 6px;
		left: 1rem;
		width: calc(100% - 2rem);
		height: 2px;
		background-color: var(--btn-primary);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s ease;
		border-radius: 2px;
	}

	.layout-nav a:hover::after {
		transform: scaleX(1);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	footer {
		margin-top: auto;
		padding: 2rem;
		border-top: 1px solid var(--border-color);
		background-color: var(--card-bg);
		color: var(--text-secondary);
		transition: background-color 0.3s ease;
		position: relative;
		z-index: 10;
	}

	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		text-align: center;
	}

	footer > div {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	footer a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
		text-decoration: none;
		transition: all 0.3s ease;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
	}

	footer a:hover {
		color: var(--text-color);
		background-color: var(--bg-secondary);
		transform: translateY(-2px);
	}

	.github-icon {
		width: 24px;
		height: 24px;
		transition:
			transform 0.3s ease,
			filter 0.3s ease;
	}

	footer a:hover .github-icon {
		transform: scale(1.1);
	}

	:global(html.dark) .github-icon {
		filter: invert(1);
	}

	@media (max-width: 768px) {
		.layout-nav {
			padding: 1rem;
			gap: 1rem;
		}

		.nav-brand {
			font-size: 1rem;
			min-width: auto;
		}

		.nav-links {
			gap: 0.5rem;
			flex: 0;
		}

		.layout-nav a {
			padding: 0.4rem 0.75rem;
			font-size: 0.85rem;
		}

		.layout-nav a::after {
			left: 0.75rem;
			width: calc(100% - 1.5rem);
		}

		footer {
			padding: 1.5rem 1rem;
		}
	}
</style>

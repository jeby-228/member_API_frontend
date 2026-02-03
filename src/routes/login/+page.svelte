<script lang="ts">
	import { LoginForm, RegisterForm } from '$lib/features/auth';
	import { goto } from '$app/navigation';

	let mode = $state<'login' | 'register'>('login');

	function handleLoginSuccess() {
		goto('/');
	}

	function handleRegisterSuccess() {
		goto('/');
	}

	function switchToRegister() {
		mode = 'register';
	}

	function switchToLogin() {
		mode = 'login';
	}
</script>

<svelte:head>
	<title>{mode === 'login' ? '登入' : '註冊'} - Workoutcome</title>
</svelte:head>

{#if mode === 'login'}
	<LoginForm onSuccess={handleLoginSuccess} onSwitchToRegister={switchToRegister} />
{:else}
	<RegisterForm onSuccess={handleRegisterSuccess} onSwitchToLogin={switchToLogin} />
{/if}

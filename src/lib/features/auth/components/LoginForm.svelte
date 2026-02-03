<script lang="ts">
	import { authStore } from '../store';
	import { LoadingAnimation } from '$lib/components/atoms';
	import type { LoginRequest } from '../types';

	interface Props {
		onSuccess?: () => void;
		onSwitchToRegister?: () => void;
	}

	let { onSuccess, onSwitchToRegister }: Props = $props();

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let localError = $state<string | null>(null);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		localError = null;

		// 基本驗證
		if (!email || !password) {
			localError = '請輸入 Email 和密碼';
			return;
		}

		if (!email.includes('@')) {
			localError = 'Email 格式不正確';
			return;
		}

		const request: LoginRequest = { email, password };

		try {
			await authStore.login(request);
			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			localError = error instanceof Error ? error.message : '登入失敗';
		}
	}

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	// 示範帳號快速填入
	function fillDemoAccount(role: 'trainer' | 'student') {
		if (role === 'trainer') {
			email = 'trainer@example.com';
			password = 'password';
		} else {
			email = 'student@example.com';
			password = 'password';
		}
	}
</script>

<div class="login-form-container">
	<form class="login-form" onsubmit={handleSubmit}>
		<h2>會員登入</h2>

		{#if localError}
			<div class="error-message" role="alert">
				{localError}
			</div>
		{/if}

		<div class="form-group">
			<label for="email">
				<span>Email</span>
				<span class="required">*</span>
			</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				placeholder="請輸入 Email"
				required
				autocomplete="email"
			/>
		</div>

		<div class="form-group">
			<label for="password">
				<span>密碼</span>
				<span class="required">*</span>
			</label>
			<div class="password-input-wrapper">
				<input
					id="password"
					type={showPassword ? 'text' : 'password'}
					bind:value={password}
					placeholder="請輸入密碼"
					required
					autocomplete="current-password"
				/>
				<button
					type="button"
					class="password-toggle"
					onclick={togglePasswordVisibility}
					aria-label={showPassword ? '隱藏密碼' : '顯示密碼'}
				>
					{showPassword ? '👁️' : '👁️‍🗨️'}
				</button>
			</div>
		</div>

		<button type="submit" class="submit-btn" disabled={$authStore.isLoading}>
			{#if $authStore.isLoading}
				<LoadingAnimation size="sm" />
			{:else}
				登入
			{/if}
		</button>

		<div class="form-footer">
			<p>
				還沒有帳號？
				<button type="button" class="link-btn" onclick={onSwitchToRegister}>立即註冊</button>
			</p>
		</div>

		<div class="demo-accounts">
			<p class="demo-title">快速測試：</p>
			<div class="demo-buttons">
				<button type="button" class="demo-btn" onclick={() => fillDemoAccount('trainer')}>
					教練帳號
				</button>
				<button type="button" class="demo-btn" onclick={() => fillDemoAccount('student')}>
					學員帳號
				</button>
			</div>
		</div>
	</form>
</div>

<style>
	.login-form-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 60vh;
		padding: var(--spacing-md);
	}

	.login-form {
		width: 100%;
		max-width: 420px;
		padding: var(--spacing-2xl);
		background-color: var(--card-bg);
		border-radius: var(--border-radius-lg);
		box-shadow: var(--shadow-md);
	}

	h2 {
		margin: 0 0 var(--spacing-xl);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
		text-align: center;
	}

	.error-message {
		margin-bottom: var(--spacing-md);
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--danger-bg);
		color: var(--danger-color);
		border-radius: var(--border-radius-md);
		font-size: var(--font-size-sm);
	}

	.form-group {
		margin-bottom: var(--spacing-lg);
	}

	label {
		display: block;
		margin-bottom: var(--spacing-sm);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-color);
	}

	.required {
		color: var(--danger-color);
	}

	input[type='email'],
	input[type='password'],
	input[type='text'] {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: var(--font-size-base);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		background-color: var(--bg-primary);
		color: var(--text-color);
		transition: all 0.3s ease;
	}

	input:focus {
		outline: none;
		border-color: var(--btn-primary);
		box-shadow: 0 0 0 3px var(--btn-primary-hover);
	}

	.password-input-wrapper {
		position: relative;
	}

	.password-toggle {
		position: absolute;
		right: var(--spacing-sm);
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		padding: var(--spacing-xs);
		font-size: 1.25rem;
		opacity: 0.6;
		transition: opacity 0.3s ease;
	}

	.password-toggle:hover {
		opacity: 1;
	}

	.submit-btn {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--btn-text);
		background-color: var(--btn-primary);
		border: none;
		border-radius: var(--border-radius-md);
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
	}

	.submit-btn:hover:not(:disabled) {
		background-color: var(--btn-primary-hover);
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.form-footer {
		margin-top: var(--spacing-lg);
		text-align: center;
	}

	.form-footer p {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
	}

	.link-btn {
		background: none;
		border: none;
		color: var(--btn-primary);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		text-decoration: underline;
		padding: 0;
	}

	.link-btn:hover {
		color: var(--btn-primary-hover);
	}

	.demo-accounts {
		margin-top: var(--spacing-xl);
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--border-color);
	}

	.demo-title {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		text-align: center;
		margin-bottom: var(--spacing-sm);
	}

	.demo-buttons {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: center;
	}

	.demo-btn {
		padding: var(--spacing-xs) var(--spacing-md);
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.demo-btn:hover {
		color: var(--text-color);
		background-color: var(--bg-tertiary);
		border-color: var(--btn-primary);
	}

	@media (max-width: 768px) {
		.login-form {
			padding: var(--spacing-lg);
		}
	}
</style>

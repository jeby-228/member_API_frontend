<script lang="ts">
	import { authStore } from '../store';
	import { LoadingAnimation } from '$lib/components/atoms';
	import type { RegisterRequest, UserRole } from '../types';

	interface Props {
		onSuccess?: () => void;
		onSwitchToLogin?: () => void;
	}

	let { onSuccess, onSwitchToLogin }: Props = $props();

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let name = $state('');
	let role = $state<UserRole>('student');
	let showPassword = $state(false);
	let localError = $state<string | null>(null);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		localError = null;

		// 基本驗證
		if (!email || !password || !name) {
			localError = '請填寫所有必填欄位';
			return;
		}

		if (!email.includes('@')) {
			localError = 'Email 格式不正確';
			return;
		}

		if (password.length < 6) {
			localError = '密碼長度至少 6 個字元';
			return;
		}

		if (password !== confirmPassword) {
			localError = '密碼與確認密碼不一致';
			return;
		}

		const request: RegisterRequest = {
			email,
			password,
			name,
			role
		};

		try {
			await authStore.register(request);
			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			localError = error instanceof Error ? error.message : '註冊失敗';
		}
	}

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

<div class="register-form-container">
	<form class="register-form" onsubmit={handleSubmit}>
		<h2>會員註冊</h2>

		{#if localError}
			<div class="error-message" role="alert">
				{localError}
			</div>
		{/if}

		<!-- 角色選擇 -->
		<div class="form-group role-selection">
			<label>
				<span>選擇身分</span>
				<span class="required">*</span>
			</label>
			<div class="role-options">
				<label class="role-option" class:selected={role === 'student'}>
					<input type="radio" name="role" value="student" bind:group={role} />
					<div class="role-card">
						<div class="role-icon">🎓</div>
						<div class="role-title">學員</div>
						<div class="role-desc">尋找適合的健身教練</div>
					</div>
				</label>

				<label class="role-option" class:selected={role === 'trainer'}>
					<input type="radio" name="role" value="trainer" bind:group={role} />
					<div class="role-card">
						<div class="role-icon">💪</div>
						<div class="role-title">教練</div>
						<div class="role-desc">提供專業健身指導</div>
					</div>
				</label>
			</div>
		</div>

		<div class="form-group">
			<label for="name">
				<span>姓名</span>
				<span class="required">*</span>
			</label>
			<input id="name" type="text" bind:value={name} placeholder="請輸入姓名" required />
		</div>

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
					placeholder="至少 6 個字元"
					required
					autocomplete="new-password"
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

		<div class="form-group">
			<label for="confirmPassword">
				<span>確認密碼</span>
				<span class="required">*</span>
			</label>
			<input
				id="confirmPassword"
				type={showPassword ? 'text' : 'password'}
				bind:value={confirmPassword}
				placeholder="再次輸入密碼"
				required
				autocomplete="new-password"
			/>
		</div>

		<button type="submit" class="submit-btn" disabled={$authStore.isLoading}>
			{#if $authStore.isLoading}
				<LoadingAnimation size="sm" />
			{:else}
				註冊
			{/if}
		</button>

		<div class="form-footer">
			<p>
				已有帳號？
				<button type="button" class="link-btn" onclick={onSwitchToLogin}>立即登入</button>
			</p>
		</div>
	</form>
</div>

<style>
	.register-form-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 60vh;
		padding: var(--spacing-md);
	}

	.register-form {
		width: 100%;
		max-width: 500px;
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

	/* 角色選擇樣式 */
	.role-selection label {
		display: block;
		margin-bottom: var(--spacing-md);
	}

	.role-options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-md);
	}

	.role-option {
		margin: 0;
		cursor: pointer;
	}

	.role-option input[type='radio'] {
		display: none;
	}

	.role-card {
		padding: var(--spacing-lg);
		border: 2px solid var(--border-color);
		border-radius: var(--border-radius-md);
		text-align: center;
		transition: all 0.3s ease;
		background-color: var(--bg-primary);
	}

	.role-option.selected .role-card {
		border-color: var(--btn-primary);
		background-color: var(--btn-primary-hover);
	}

	.role-option:hover .role-card {
		border-color: var(--btn-primary);
		transform: translateY(-2px);
		box-shadow: var(--shadow-sm);
	}

	.role-icon {
		font-size: 2.5rem;
		margin-bottom: var(--spacing-sm);
	}

	.role-title {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--text-color);
		margin-bottom: var(--spacing-xs);
	}

	.role-desc {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
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

	@media (max-width: 768px) {
		.register-form {
			padding: var(--spacing-lg);
		}

		.role-options {
			grid-template-columns: 1fr;
		}
	}
</style>

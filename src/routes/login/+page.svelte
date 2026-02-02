<script lang="ts">
	import { goto } from '$app/navigation';
	import { API_BASE_URL } from '$lib/config';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	const apiUrl = `${API_BASE_URL}/auth/login`;

	async function handleLogin() {
		error = '';
		loading = true;

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			if (!response.ok) {
				const errorData = await response.json();
				error = errorData.message || '登入失敗，請檢查您的帳號和密碼';
				return;
			}

			const data = await response.json();

			if (data.token) {
				localStorage.setItem('token', data.token);
				await goto('/');
			} else {
				error = '登入失敗，未收到授權憑證';
			}
		} catch (err) {
			error = '無法連接到伺服器，請稍後再試';
			console.error('Login error:', err);
		} finally {
			loading = false;
		}
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		handleLogin();
	}
</script>

<div class="login-container">
	<div class="login-box">
		<div class="login-header">
			<h1>歡迎回來</h1>
			<p>請登入您的帳號</p>
		</div>

		<form onsubmit={handleSubmit}>
			<div class="form-group">
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="電子郵件"
					aria-label="電子郵件"
					required
					disabled={loading}
				/>
			</div>

			<div class="form-group">
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="密碼"
					aria-label="密碼"
					required
					disabled={loading}
				/>
			</div>

			{#if error}
				<div class="error-message">
					{error}
				</div>
			{/if}

			<button type="submit" class="login-button" disabled={loading}>
				{loading ? '登入中...' : '登入'}
			</button>
		</form>
	</div>
</div>

<style>
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 20px;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	}

	.login-box {
		background: white;
		padding: 50px 45px;
		border-radius: 16px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		width: 100%;
		max-width: 420px;
	}

	.login-header {
		text-align: center;
		margin-bottom: 40px;
	}

	.login-header h1 {
		color: #1a1a1a;
		margin: 0 0 8px 0;
		font-size: 32px;
		font-weight: 700;
		letter-spacing: -0.5px;
	}

	.login-header p {
		color: #666;
		margin: 0;
		font-size: 16px;
		font-weight: 400;
	}

	.form-group {
		margin-bottom: 20px;
	}

	input {
		width: 100%;
		padding: 16px 20px;
		border: 2px solid #e8e8e8;
		border-radius: 10px;
		font-size: 16px;
		transition: all 0.3s ease;
		box-sizing: border-box;
		background-color: #fafafa;
	}

	input::placeholder {
		color: #999;
	}

	input:focus {
		outline: none;
		border-color: #667eea;
		background-color: white;
		box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
	}

	input:disabled {
		background-color: #f5f5f5;
		cursor: not-allowed;
		opacity: 0.6;
	}

	.login-button {
		width: 100%;
		padding: 16px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 10px;
		font-size: 17px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 10px;
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
	}

	.login-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
	}

	.login-button:active:not(:disabled) {
		transform: translateY(0);
	}

	.login-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		box-shadow: none;
	}

	.error-message {
		background-color: #fff5f5;
		color: #e53e3e;
		padding: 14px 18px;
		border-radius: 10px;
		margin-bottom: 20px;
		text-align: center;
		font-size: 14px;
		border: 1px solid #feb2b2;
	}
</style>

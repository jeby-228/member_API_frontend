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
		<h1>會員登入</h1>

		<form onsubmit={handleSubmit}>
			<div class="form-group">
				<label for="email">電子郵件</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="請輸入電子郵件"
					required
					disabled={loading}
				/>
			</div>

			<div class="form-group">
				<label for="password">密碼</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="請輸入密碼"
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
	}

	.login-box {
		background: white;
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
		width: 100%;
		max-width: 400px;
	}

	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 30px;
		font-size: 28px;
	}

	.form-group {
		margin-bottom: 20px;
	}

	label {
		display: block;
		margin-bottom: 8px;
		color: #555;
		font-weight: 500;
	}

	input {
		width: 100%;
		padding: 12px;
		border: 1px solid #ddd;
		border-radius: 5px;
		font-size: 16px;
		transition: border-color 0.3s;
		box-sizing: border-box;
	}

	input:focus {
		outline: none;
		border-color: #667eea;
	}

	input:disabled {
		background-color: #f5f5f5;
		cursor: not-allowed;
	}

	.login-button {
		width: 100%;
		padding: 12px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s;
	}

	.login-button:hover:not(:disabled) {
		transform: translateY(-2px);
	}

	.login-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.error-message {
		background-color: #fee;
		color: #c33;
		padding: 12px;
		border-radius: 5px;
		margin-bottom: 20px;
		text-align: center;
		font-size: 14px;
	}
</style>

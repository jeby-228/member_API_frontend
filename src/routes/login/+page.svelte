<script>
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	let email = '';
	let password = '';
	let isLoading = false;

	export let form;
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200">
	<div class="card w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">會員登入</h2>
			{#if form?.error}
				<div class="alert alert-error">{form.error}</div>
			{/if}
			<form
				method="POST"
				use:enhance={() => {
					isLoading = true;
					return ({ update }) => {
						isLoading = false;
						update();
					};
				}}
				class="space-y-4"
			>
				<input
					type="email"
					name="email"
					bind:value={email}
					placeholder="電子郵件"
					class="input input-bordered w-full"
					required
					disabled={isLoading}
				/>
				<input
					type="password"
					name="password"
					bind:value={password}
					placeholder="密碼"
					class="input input-bordered w-full"
					required
					disabled={isLoading}
				/>
				<button type="submit" class="btn btn-primary w-full" disabled={isLoading}>
					{isLoading ? '執行中...' : '登入'}
				</button>
			</form>
			<div class="divider"></div>
			<a href={resolve('/forgot-password')} class="link link-primary">忘記密碼？</a>
			<a href={resolve('/register')} class="link link-primary">註冊帳號</a>
		</div>
	</div>
</div>

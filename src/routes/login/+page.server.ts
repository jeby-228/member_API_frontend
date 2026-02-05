import { redirect, type Actions, type Load } from '@sveltejs/kit';

export const load: Load = ({ url }) => {
	return {
		preloadPath: url.searchParams.get('redirect') || '/'
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (!response.ok) {
				return { error: '登入失敗' };
			}

			const result = await response.json();
			localStorage.setItem('authToken', result.token);

			throw redirect(303, '/');
		} catch (err) {
			const error = err as { status?: number } | null;
			if (error?.status === 303) throw err;
			return { error: err instanceof Error ? err.message : '發生錯誤' };
		}
	}
};

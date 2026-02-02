<div class="loading">
	<div class="spinner"></div>
	<p>載入課程中...</p>
</div>

<style>
	.loading {
		text-align: center;
		padding: 3rem 1rem;
	}

	.loading .spinner {
		width: 48px;
		height: 48px;
		margin: 0 auto 1rem;
		border: 4px solid #e5e7eb;
		border-top-color: #2563eb;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0;
	}
</style>

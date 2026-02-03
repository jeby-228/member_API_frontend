<script lang="ts">
	import { LoadingAnimation } from '$lib/components/atoms';
</script>

<div class="loading-container">
	<LoadingAnimation />
	<p>載入天氣資料中...</p>
</div>

<style lang="scss">
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 400px;
		gap: 1rem;

		p {
			color: #666;
			font-size: 1.1rem;
		}
	}
</style>

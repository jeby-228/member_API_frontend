<script lang="ts">
	interface Props {
		message?: string;
	}

	let { message = '目前沒有可預約的課程' }: Props = $props();
</script>

<div class="empty">
	<p>{message}</p>
</div>

<style>
	.empty {
		text-align: center;
		padding: 3rem 1rem;
	}

	.empty p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0;
	}
</style>

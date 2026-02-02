<script lang="ts">
	import { LoadingAnimation } from '$lib/components/atoms';

	interface Props {
		type?: 'spinner' | 'dots' | 'pulse';
		message?: string;
	}

	let { type = 'spinner', message = '載入課程中...' }: Props = $props();
</script>

<LoadingAnimation {type} {message} />

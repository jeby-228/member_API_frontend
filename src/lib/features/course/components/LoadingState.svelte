<script lang="ts">
	import { LoadingAnimation } from '$lib/components/atoms';
	import { uiConfig } from '$lib/stores/ui-config';

	interface Props {
		type?: 'spinner' | 'dots' | 'pulse' | 'gif';
		message?: string;
	}

	let { type, message = '載入課程中...' }: Props = $props();

	// 如果沒有指定 type，使用全域配置
	const loadingType = $derived(type || $uiConfig.loading.defaultType);
	const gifPath = $derived($uiConfig.loading.gifPath);
</script>

<LoadingAnimation type={loadingType} {gifPath} {message} />

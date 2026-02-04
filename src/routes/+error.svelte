<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container">
	<div class="error-content">
		<h1 class="--badge-warning">{$page.status} {$page.error?.message || '發生錯誤'}</h1>
	</div>
</div>

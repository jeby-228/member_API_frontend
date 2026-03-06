<script lang="ts">
	// @ts-expect-error injected at build time
	const branch = __GIT_BRANCH__;
	// @ts-expect-error injected at build time
	const version = __GIT_VERSION__;
</script>

<span class="text-xs text-surface-400">
	{branch} @ {version}
</span>

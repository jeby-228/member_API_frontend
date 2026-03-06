<script lang="ts">
	// @ts-expect-error injected at build time
	const branch = __GIT_BRANCH__;
	// @ts-expect-error injected at build time
	const version = __GIT_VERSION__;
    // last commit time
    // @ts-expect-error injected at build time
    const last_commit_time = __GIT_LAST_COMMIT_TIME__;
    // @ts-expect-error injected at build time
    const isDirty = __IS_DIRTY__;
</script>

<span class="text-xs text-surface-400">
    {branch} @ {version} (Last commit: {last_commit_time}) {isDirty ? ' (dirty)' : ''}  
</span>


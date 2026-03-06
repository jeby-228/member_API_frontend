import { json } from '@sveltejs/kit';

declare const __GIT_BRANCH__: string;
declare const __GIT_VERSION__: string;
declare const __GIT_LAST_COMMIT_TIME__: string;
declare const __IS_DIRTY__: boolean;
declare const __COMMIT_HASH__: string;

export function GET() {
	return json({
		branch: __GIT_BRANCH__,
		version: __GIT_VERSION__,
		hash: __COMMIT_HASH__,
		last_commit_time: __GIT_LAST_COMMIT_TIME__,
		is_dirty: __IS_DIRTY__
	});
}

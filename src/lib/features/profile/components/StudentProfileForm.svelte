<script lang="ts">
	import { LoadingAnimation } from '$lib/components/atoms';
	import { updateStudentProfile } from '../api';
	import { genderOptions, type StudentProfile } from '../types';

	interface Props {
		profile: StudentProfile | null;
		onSave?: (profile: StudentProfile) => void;
	}

	let { profile, onSave }: Props = $props();

	let name = $state(profile?.name || '');
	let gender = $state<'male' | 'female' | 'other'>(profile?.gender || 'male');
	let experience = $state(profile?.experience || '');

	let isLoading = $state(false);
	let error = $state<string | null>(null);
	let successMessage = $state<string | null>(null);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = null;
		successMessage = null;

		// 驗證
		if (!name) {
			error = '請輸入姓名';
			return;
		}

		isLoading = true;

		try {
			const updatedProfile: StudentProfile = {
				userId: profile?.userId || '',
				name,
				gender,
				experience
			};

			await updateStudentProfile(updatedProfile);
			successMessage = '個人資料已儲存';

			if (onSave) {
				onSave(updatedProfile);
			}
		} catch (err) {
			error = err instanceof Error ? err.message : '儲存失敗';
		} finally {
			isLoading = false;
		}
	}
</script>

<form class="student-profile-form" onsubmit={handleSubmit}>
	<h2>學員個人資料</h2>

	{#if error}
		<div class="message error" role="alert">{error}</div>
	{/if}

	{#if successMessage}
		<div class="message success" role="status">{successMessage}</div>
	{/if}

	<!-- 姓名 -->
	<div class="form-group">
		<label for="name">
			<span>姓名</span>
			<span class="required">*</span>
		</label>
		<input id="name" type="text" bind:value={name} placeholder="請輸入姓名" required />
	</div>

	<!-- 性別 -->
	<div class="form-group">
		<label>
			<span>性別</span>
			<span class="required">*</span>
		</label>
		<div class="gender-options">
			{#each genderOptions as option}
				<label class="gender-option" class:selected={gender === option.value}>
					<input type="radio" name="gender" value={option.value} bind:group={gender} />
					<span>{option.label}</span>
				</label>
			{/each}
		</div>
	</div>

	<!-- 個人經驗概述 -->
	<div class="form-group">
		<label for="experience">個人經驗概述</label>
		<textarea
			id="experience"
			bind:value={experience}
			placeholder="請簡述您的運動經驗、目標或需求..."
			rows="5"
		/>
	</div>

	<!-- 提交按鈕 -->
	<button type="submit" class="submit-btn" disabled={isLoading}>
		{#if isLoading}
			<LoadingAnimation size="sm" />
		{:else}
			儲存
		{/if}
	</button>
</form>

<style>
	.student-profile-form {
		max-width: 600px;
		margin: 0 auto;
		padding: var(--spacing-2xl);
		background-color: var(--card-bg);
		border-radius: var(--border-radius-lg);
		box-shadow: var(--shadow-md);
	}

	h2 {
		margin: 0 0 var(--spacing-xl);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.message {
		margin-bottom: var(--spacing-md);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--border-radius-md);
		font-size: var(--font-size-sm);
	}

	.message.error {
		background-color: var(--danger-bg);
		color: var(--danger-color);
	}

	.message.success {
		background-color: var(--success-bg);
		color: var(--success-color);
	}

	.form-group {
		margin-bottom: var(--spacing-lg);
	}

	label {
		display: block;
		margin-bottom: var(--spacing-sm);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-color);
	}

	.required {
		color: var(--danger-color);
	}

	input[type='text'],
	textarea {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: var(--font-size-base);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		background-color: var(--bg-primary);
		color: var(--text-color);
		transition: all 0.3s ease;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--btn-primary);
		box-shadow: 0 0 0 3px var(--btn-primary-hover);
	}

	textarea {
		resize: vertical;
		font-family: inherit;
	}

	/* 性別選項 */
	.gender-options {
		display: flex;
		gap: var(--spacing-md);
	}

	.gender-option {
		flex: 1;
		position: relative;
		cursor: pointer;
		margin: 0;
	}

	.gender-option input[type='radio'] {
		display: none;
	}

	.gender-option span {
		display: block;
		padding: var(--spacing-sm) var(--spacing-md);
		text-align: center;
		border: 2px solid var(--border-color);
		border-radius: var(--border-radius-md);
		background-color: var(--bg-primary);
		color: var(--text-color);
		transition: all 0.3s ease;
	}

	.gender-option:hover span {
		border-color: var(--btn-primary);
		background-color: var(--bg-secondary);
	}

	.gender-option.selected span {
		border-color: var(--btn-primary);
		background-color: var(--btn-primary);
		color: var(--btn-text);
	}

	/* 提交按鈕 */
	.submit-btn {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--btn-text);
		background-color: var(--btn-primary);
		border: none;
		border-radius: var(--border-radius-md);
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
	}

	.submit-btn:hover:not(:disabled) {
		background-color: var(--btn-primary-hover);
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.student-profile-form {
			padding: var(--spacing-lg);
		}

		.gender-options {
			flex-direction: column;
		}
	}
</style>

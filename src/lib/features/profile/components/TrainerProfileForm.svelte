<script lang="ts">
	import { LoadingAnimation } from '$lib/components/atoms';
	import { updateTrainerProfile, uploadCertification } from '../api';
	import { specialtyTags, type TrainerProfile } from '../types';

	interface Props {
		profile: TrainerProfile | null;
		onSave?: (profile: TrainerProfile) => void;
	}

	let { profile, onSave }: Props = $props();

	let name = $state(profile?.name || '');
	let specialties = $state<string[]>(profile?.specialties || []);
	let priceMin = $state(profile?.priceRange.min || 500);
	let priceMax = $state(profile?.priceRange.max || 2000);
	let yearsOfExperience = $state(profile?.yearsOfExperience || 0);
	let bio = $state(profile?.bio || '');
	let certifications = $state<string[]>(profile?.certifications || []);

	let isLoading = $state(false);
	let isUploading = $state(false);
	let error = $state<string | null>(null);
	let successMessage = $state<string | null>(null);

	function toggleSpecialty(tag: string) {
		if (specialties.includes(tag)) {
			specialties = specialties.filter((s) => s !== tag);
		} else {
			specialties = [...specialties, tag];
		}
	}

	async function handleCertificationUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		const files = input.files;

		if (!files || files.length === 0) return;

		isUploading = true;
		error = null;

		try {
			const uploadPromises = Array.from(files).map((file) => uploadCertification(file));
			const urls = await Promise.all(uploadPromises);
			certifications = [...certifications, ...urls];
		} catch (err) {
			error = err instanceof Error ? err.message : '上傳失敗';
		} finally {
			isUploading = false;
		}
	}

	function removeCertification(index: number) {
		certifications = certifications.filter((_, i) => i !== index);
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = null;
		successMessage = null;

		// 驗證
		if (!name) {
			error = '請輸入姓名';
			return;
		}

		if (specialties.length === 0) {
			error = '請至少選擇一個專業領域';
			return;
		}

		if (priceMin < 0 || priceMax < 0 || priceMin > priceMax) {
			error = '價格範圍設定不正確';
			return;
		}

		if (yearsOfExperience < 0) {
			error = '年資不能為負數';
			return;
		}

		isLoading = true;

		try {
			const updatedProfile: TrainerProfile = {
				userId: profile?.userId || '',
				name,
				specialties,
				priceRange: { min: priceMin, max: priceMax },
				yearsOfExperience,
				bio,
				certifications
			};

			await updateTrainerProfile(updatedProfile);
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

<form class="trainer-profile-form" onsubmit={handleSubmit}>
	<h2>教練個人資料</h2>

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

	<!-- 專業領域 -->
	<div class="form-group">
		<label>
			<span>專業領域</span>
			<span class="required">*</span>
		</label>
		<div class="specialty-tags">
			{#each specialtyTags as tag}
				<button
					type="button"
					class="tag"
					class:selected={specialties.includes(tag)}
					onclick={() => toggleSpecialty(tag)}
				>
					{tag}
				</button>
			{/each}
		</div>
	</div>

	<!-- 價格範圍 -->
	<div class="form-group">
		<label>
			<span>課程價格範圍 (元/小時)</span>
			<span class="required">*</span>
		</label>
		<div class="price-range">
			<input type="number" bind:value={priceMin} min="0" placeholder="最低價格" />
			<span class="separator">~</span>
			<input type="number" bind:value={priceMax} min="0" placeholder="最高價格" />
		</div>
	</div>

	<!-- 教練年資 -->
	<div class="form-group">
		<label for="years">
			<span>教練年資 (年)</span>
			<span class="required">*</span>
		</label>
		<input id="years" type="number" bind:value={yearsOfExperience} min="0" required />
	</div>

	<!-- 個人經驗概述 -->
	<div class="form-group">
		<label for="bio">個人經驗概述</label>
		<textarea id="bio" bind:value={bio} placeholder="請簡述您的教學經驗與專長..." rows="5" />
	</div>

	<!-- 證照上傳 -->
	<div class="form-group">
		<label for="certifications">證照上傳</label>
		<input
			id="certifications"
			type="file"
			accept="image/*"
			multiple
			onchange={handleCertificationUpload}
			disabled={isUploading}
		/>

		{#if isUploading}
			<div class="uploading-status">
				<LoadingAnimation size="sm" />
				<span>上傳中...</span>
			</div>
		{/if}

		{#if certifications.length > 0}
			<div class="certification-list">
				{#each certifications as cert, i}
					<div class="certification-item">
						<img src={cert} alt="證照 {i + 1}" />
						<button type="button" class="remove-btn" onclick={() => removeCertification(i)}>
							✕
						</button>
					</div>
				{/each}
			</div>
		{/if}
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
	.trainer-profile-form {
		max-width: 700px;
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
	input[type='number'],
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

	/* 專業領域標籤 */
	.specialty-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.tag {
		padding: var(--spacing-xs) var(--spacing-md);
		font-size: var(--font-size-sm);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-full);
		background-color: var(--bg-primary);
		color: var(--text-color);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.tag:hover {
		border-color: var(--btn-primary);
		background-color: var(--bg-secondary);
	}

	.tag.selected {
		background-color: var(--btn-primary);
		color: var(--btn-text);
		border-color: var(--btn-primary);
	}

	/* 價格範圍 */
	.price-range {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.price-range input {
		flex: 1;
	}

	.separator {
		color: var(--text-secondary);
	}

	/* 證照上傳 */
	.uploading-status {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-sm);
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
	}

	.certification-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: var(--spacing-md);
		margin-top: var(--spacing-md);
	}

	.certification-item {
		position: relative;
		aspect-ratio: 1;
		border-radius: var(--border-radius-md);
		overflow: hidden;
		border: 1px solid var(--border-color);
	}

	.certification-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.remove-btn {
		position: absolute;
		top: var(--spacing-xs);
		right: var(--spacing-xs);
		width: 24px;
		height: 24px;
		border: none;
		border-radius: 50%;
		background-color: rgba(220, 53, 69, 0.9);
		color: white;
		font-size: var(--font-size-sm);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
	}

	.remove-btn:hover {
		background-color: var(--danger-color);
		transform: scale(1.1);
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
		.trainer-profile-form {
			padding: var(--spacing-lg);
		}

		.certification-list {
			grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
		}
	}
</style>

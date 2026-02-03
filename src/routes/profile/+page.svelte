<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/features/auth';
	import { TrainerProfileForm, StudentProfileForm } from '$lib/features/profile';
	import { getTrainerProfile, getStudentProfile } from '$lib/features/profile/api';
	import { LoadingAnimation } from '$lib/components/atoms';
	import { goto } from '$app/navigation';
	import type { TrainerProfile, StudentProfile } from '$lib/features/profile';

	let trainerProfile = $state<TrainerProfile | null>(null);
	let studentProfile = $state<StudentProfile | null>(null);
	let isLoading = $state(true);

	onMount(async () => {
		// 檢查登入狀態
		if (!$authStore.user) {
			goto('/login');
			return;
		}

		// 載入個人資料
		try {
			if ($authStore.user.role === 'trainer') {
				const profile = await getTrainerProfile($authStore.user.id);
				if (profile) {
					trainerProfile = profile;
				} else {
					// 建立新的個人資料
					trainerProfile = {
						userId: $authStore.user.id,
						name: $authStore.user.name,
						specialties: [],
						priceRange: { min: 500, max: 2000 },
						yearsOfExperience: 0,
						bio: '',
						certifications: []
					};
				}
			} else {
				const profile = await getStudentProfile($authStore.user.id);
				if (profile) {
					studentProfile = profile;
				} else {
					// 建立新的個人資料
					studentProfile = {
						userId: $authStore.user.id,
						name: $authStore.user.name,
						gender: 'male',
						experience: ''
					};
				}
			}
		} finally {
			isLoading = false;
		}
	});

	function handleSave(profile: TrainerProfile | StudentProfile) {
		// 更新成功
		console.log('Profile saved:', profile);
	}
</script>

<svelte:head>
	<title>個人資料 - Workoutcome</title>
</svelte:head>

<div class="profile-page">
	{#if isLoading}
		<div class="loading-container">
			<LoadingAnimation size="lg" />
			<p>載入個人資料...</p>
		</div>
	{:else if $authStore.user?.role === 'trainer'}
		<TrainerProfileForm profile={trainerProfile} onSave={handleSave} />
	{:else}
		<StudentProfileForm profile={studentProfile} onSave={handleSave} />
	{/if}
</div>

<style>
	.profile-page {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--spacing-lg);
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md);
		min-height: 400px;
	}

	.loading-container p {
		color: var(--text-secondary);
		font-size: var(--font-size-base);
	}
</style>

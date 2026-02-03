<script lang="ts">
	import type { TrainerCard } from '../types';

	interface Props {
		trainer: TrainerCard;
		onClick?: () => void;
	}

	let { trainer, onClick }: Props = $props();

	function formatPrice(min: number, max: number): string {
		return `NT$ ${min} - ${max}`;
	}

	function renderStars(rating: number): string {
		const fullStars = Math.floor(rating);
		const halfStar = rating % 1 >= 0.5 ? 1 : 0;
		const emptyStars = 5 - fullStars - halfStar;

		return '⭐'.repeat(fullStars) + (halfStar ? '✨' : '') + '☆'.repeat(emptyStars);
	}
</script>

<div class="trainer-card" class:unavailable={!trainer.isAvailable} onclick={onClick} role="button" tabindex="0">
	<div class="card-header">
		<div class="trainer-avatar">
			<span class="avatar-text">{trainer.name.charAt(0)}</span>
		</div>
		<div class="trainer-basic-info">
			<h3 class="trainer-name">{trainer.name}</h3>
			<div class="trainer-experience">
				{trainer.yearsOfExperience} 年經驗
			</div>
		</div>
		{#if !trainer.isAvailable}
			<div class="unavailable-badge">暫不接單</div>
		{/if}
	</div>

	<div class="card-body">
		<!-- 專業領域 -->
		<div class="specialties">
			{#each trainer.specialties.slice(0, 3) as specialty}
				<span class="specialty-tag">{specialty}</span>
			{/each}
			{#if trainer.specialties.length > 3}
				<span class="specialty-tag more">+{trainer.specialties.length - 3}</span>
			{/if}
		</div>

		<!-- 個人簡介 -->
		{#if trainer.bio}
			<p class="bio">{trainer.bio.slice(0, 80)}{trainer.bio.length > 80 ? '...' : ''}</p>
		{/if}

		<!-- 評分 -->
		{#if trainer.rating}
			<div class="rating">
				<span class="stars">{renderStars(trainer.rating)}</span>
				<span class="rating-value">{trainer.rating.toFixed(1)}</span>
				{#if trainer.reviewCount}
					<span class="review-count">({trainer.reviewCount})</span>
				{/if}
			</div>
		{/if}
	</div>

	<div class="card-footer">
		<div class="price">
			<span class="price-label">價格範圍</span>
			<span class="price-value">{formatPrice(trainer.priceRange.min, trainer.priceRange.max)}</span>
		</div>
		<button class="view-btn" onclick={onClick}>
			查看詳情
		</button>
	</div>
</div>

<style>
	.trainer-card {
		display: flex;
		flex-direction: column;
		padding: var(--spacing-lg);
		background-color: var(--card-bg);
		border-radius: var(--border-radius-lg);
		border: 1px solid var(--border-color);
		transition: all 0.3s ease;
		cursor: pointer;
		height: 100%;
	}

	.trainer-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--btn-primary);
	}

	.trainer-card.unavailable {
		opacity: 0.7;
	}

	.trainer-card.unavailable:hover {
		transform: translateY(-2px);
	}

	.card-header {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-md);
		position: relative;
	}

	.trainer-avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--btn-primary), var(--btn-primary-hover));
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.avatar-text {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: white;
	}

	.trainer-basic-info {
		flex: 1;
	}

	.trainer-name {
		margin: 0 0 var(--spacing-xs);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.trainer-experience {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
	}

	.unavailable-badge {
		position: absolute;
		top: 0;
		right: 0;
		padding: var(--spacing-xs) var(--spacing-sm);
		background-color: var(--danger-bg);
		color: var(--danger-color);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		border-radius: var(--border-radius-full);
	}

	.card-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.specialties {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
	}

	.specialty-tag {
		padding: var(--spacing-xs) var(--spacing-sm);
		background-color: var(--bg-secondary);
		color: var(--text-color);
		font-size: var(--font-size-xs);
		border-radius: var(--border-radius-full);
		border: 1px solid var(--border-color);
	}

	.specialty-tag.more {
		background-color: var(--bg-tertiary);
		font-weight: var(--font-weight-semibold);
	}

	.bio {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.rating {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: var(--font-size-sm);
	}

	.stars {
		color: #FFD700;
	}

	.rating-value {
		font-weight: var(--font-weight-semibold);
		color: var(--text-color);
	}

	.review-count {
		color: var(--text-secondary);
	}

	.card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: var(--spacing-md);
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--border-color);
	}

	.price {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.price-label {
		font-size: var(--font-size-xs);
		color: var(--text-secondary);
	}

	.price-value {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--btn-primary);
	}

	.view-btn {
		padding: var(--spacing-sm) var(--spacing-lg);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--btn-text);
		background-color: var(--btn-primary);
		border: none;
		border-radius: var(--border-radius-md);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.view-btn:hover {
		background-color: var(--btn-primary-hover);
		transform: scale(1.05);
	}

	@media (max-width: 768px) {
		.trainer-card {
			padding: var(--spacing-md);
		}

		.card-footer {
			flex-direction: column;
			align-items: stretch;
			gap: var(--spacing-sm);
		}

		.view-btn {
			width: 100%;
		}
	}
</style>

<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';

	import { Carousel } from '@skeletonlabs/skeleton-svelte';

	const slides = [
		{ title: 'Slide 1' },
		{ title: 'Slide 2' },
		{ title: 'Slide 3' },
		{ title: 'Slide 4' },
		{ title: 'Slide 5' },
		{ title: 'Slide 6' },
		{ title: 'Slide 7' },
		{ title: 'Slide 8' },
		{ title: 'Slide 9' },
		{ title: 'Slide 10' }
	];
</script>

<div class="flex items-center gap-8">
	<!-- Small -->
	<Avatar class="size-10">
		<Avatar.Image src="https://i.pravatar.cc/40?img=48" alt="small" />
		<Avatar.Fallback>SK</Avatar.Fallback>
	</Avatar>
	<!-- Base -->
	<Avatar>
		<Avatar.Image src="https://i.pravatar.cc/60?img=48" alt="base" />
		<Avatar.Fallback>SK</Avatar.Fallback>
	</Avatar>
	<!-- Large -->
	<Avatar class="size-20">
		<Avatar.Image src="https://i.pravatar.cc/80?img=48" alt="large" />
		<Avatar.Fallback>SK</Avatar.Fallback>
	</Avatar>
</div>

<Carousel slideCount={slides.length} slidesPerPage={3} spacing="16px" loop>
	<Carousel.Control class="mb-4 flex justify-between">
		<Carousel.PrevTrigger class="btn preset-filled">
			<span>&larr;</span>
			<span>Back</span>
		</Carousel.PrevTrigger>
		<Carousel.AutoplayTrigger class="btn preset-tonal">Toggle Autoplay</Carousel.AutoplayTrigger>
		<Carousel.NextTrigger class="btn preset-filled">
			<span>Next</span>
			<span>&rarr;</span>
		</Carousel.NextTrigger>
	</Carousel.Control>
	<Carousel.ItemGroup>
		{#each slides as slide, i}
			<Carousel.Item
				index={i}
				class="flex h-50 items-center justify-center card bg-surface-100-900 p-4"
			>
				{slide.title}
			</Carousel.Item>
		{/each}
	</Carousel.ItemGroup>
	<Carousel.IndicatorGroup>
		<Carousel.Context>
			{#snippet children(carousel)}
				{#each carousel().pageSnapPoints as _, index}
					<Carousel.Indicator {index} />
				{/each}
			{/snippet}
		</Carousel.Context>
	</Carousel.IndicatorGroup>
</Carousel>

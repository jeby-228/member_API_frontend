import { skeleton } from '@skeletonlabs/skeleton/tailwind';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [forms, typography, skeleton()]
};

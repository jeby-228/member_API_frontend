import { cleanup } from '@testing-library/svelte';
import { afterEach, vi } from 'vitest';

afterEach(() => {
	cleanup();
});

// Mock fetch
globalThis.fetch = vi.fn() as any;

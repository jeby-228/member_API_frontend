import { describe, expect, it } from 'vitest';

describe('範例單元測試', () => {
	it('should pass this example test', () => {
		expect(1 + 1).toBe(2);
	});

	it('should handle string validation', () => {
		const email = 'user@example.com';
		expect(email).toContain('@');
	});
});

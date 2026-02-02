import { describe, expect, it } from 'vitest';
import { emailExample } from '$lib/utils/formatCheck';


describe('emailExample', () => {
	it('should return true for valid email addresses', () => {
		expect(emailExample('test@example.com')).toBe(true);
	});

	it('should return false for invalid email addresses', () => {
		expect(emailExample('invalid-email')).toBe(false);
	});
});
import { describe, expect, it, vi } from 'vitest';
import { load } from './+page';

// Mock SvelteKit error function
vi.mock('@sveltejs/kit', () => ({
	error: vi.fn((status: number, message: string) => {
		const error = new Error(message);
		(error as any).status = status;
		throw error;
	}),
}));

describe('breadcrumbs +page.ts load function', () => {
	it('should be a function that loads copy content', async () => {
		// ✅ ROBUST: Test essential behavior, not implementation details
		expect(typeof load).toBe('function');

		const result = await load();

		// Test that it returns the expected structure
		expect(result).toHaveProperty('Copy');
		expect(typeof result.Copy).toBe('function');
	});

	it('should return a Copy component function', async () => {
		// ✅ ROBUST: Test successful behavior
		const result = await load();

		// Verify the Copy function exists and is callable
		expect(result.Copy).toBeDefined();
		expect(typeof result.Copy).toBe('function');

		// Actually call the Copy function to get function coverage
		const copy_result = result.Copy();
		expect(copy_result).toBeDefined();
	});
});

import { defineConfig } from 'vite-plus';

export default defineConfig({
	fmt: {
		useTabs: true,
		singleQuote: true,
		printWidth: 70,
		trailingComma: 'all',
		proseWrap: 'always',
		svelte: true,
	},
	lint: {
		ignorePatterns: [
			'.svelte-kit/**',
			'build/**',
			'dist/**',
			'apps/*/.svelte-kit/**',
			'apps/*/build/**',
			'apps/*/dist/**',
			'packages/*/.svelte-kit/**',
			'packages/*/build/**',
			'packages/*/dist/**',
		],
		options: {
			typeAware: false,
			typeCheck: false,
		},
	},
});

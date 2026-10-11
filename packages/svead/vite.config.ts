import { svelte } from '@sveltejs/vite-plugin-svelte';
import { coverageConfigDefaults, defineConfig } from 'vite-plus';
import { playwright } from 'vite-plus/test/browser-playwright';

export default defineConfig({
	plugins: [svelte()],
	test: {
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }],
					},
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
				},
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
				},
			},
		],
		coverage: {
			include: ['src/**/*.{ts,svelte}'],
			reporter: ['text-summary', 'html'],
			exclude: [
				...coverageConfigDefaults.exclude,
				'**/config.{js,ts,cjs}',
				'**/*.config.{js,ts,cjs}',
				'**/lib/index.ts',
				'**/lib/types/**',
			],
			thresholds: {
				statements: 75,
				branches: 84,
				functions: 68,
				lines: 75,
			},
		},
	},
});

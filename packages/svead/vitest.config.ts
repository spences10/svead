import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			include: ['src/**/*.test.{js,ts,svelte}'],
			globals: true,
			environment: 'jsdom',
			coverage: {
				all: false,
				thresholds: {
					statements: 75,
					branches: 84,
					functions: 68,
					lines: 75,
				},
			},
		},
	}),
);

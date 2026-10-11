import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 4173,
	},
	// End-to-end tests sit beside the routes and components they cover
	testDir: 'src',
	testMatch: '**/*.e2e.{ts,js}',
});

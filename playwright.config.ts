import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 4173,
		timeout: 2 * 60 * 1000,
	},
	testDir: 'tests',
	projects: [
		{
			name: 'Chromium',
			use: { browserName: 'chromium' },
		},
		{
			name: 'Firefox',
			use: { browserName: 'firefox' },
		},
		{
			name: 'WebKit',
			use: { browserName: 'webkit' },
		},
	],
}

export default config

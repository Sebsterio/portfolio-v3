import { defineConfig, devices } from '@playwright/test';

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		viewport: { width: 1440, height: 900 },
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry',
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		// { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		// { name: 'webkit', use: { ...devices['Desktop Safari'] } },

		// { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
		// { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
		// { name: 'Microsoft Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
		// { name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
	],

	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://localhost:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});

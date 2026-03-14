import { defineConfig, devices } from '@playwright/test';

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// const isDev = !!process.env.DEV;

const isCI = process.env.CI != null && process.env.CI !== '0';

const CI_PORT = 3004;
const DEV_PORT = 3000;

export default defineConfig({
	testDir: './e2e/tests',
	snapshotDir: './e2e/snapshots',
	snapshotPathTemplate: '{snapshotDir}/{projectName}/{arg}{ext}',
	outputDir: './artifacts/e2e-results',
	reporter: [
		['html', { outputFolder: './artifacts/e2e-report' /* , open: 'never' */ }], //
		['list'],
	],
	retries: isCI ? 2 : 0,
	workers: isCI ? 1 : undefined,
	forbidOnly: isCI,
	fullyParallel: true,
	use: {
		baseURL: isCI ? `http://localhost:${CI_PORT}` : `http://localhost:${DEV_PORT}`,
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
		trace: 'on-first-retry',
		viewport: { width: 1440, height: 900 },
		deviceScaleFactor: 1,
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

	webServer: {
		command: isCI ? `next start -p ${CI_PORT}` : `next dev -p ${DEV_PORT}`,
		url: isCI ? `http://localhost:${CI_PORT}` : `http://localhost:${DEV_PORT}`,
		reuseExistingServer: !isCI,
		timeout: 120_000,
	},
});

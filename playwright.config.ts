import { defineConfig, devices } from '@playwright/test';

type Mode = 'quick' | 'full';

const DEV_PORT = 3000;
const CI_PORT = 3004;

const isAI = process.env.AI === '1';
const isCI = process.env.CI === '1';
const isDev = process.env.DEV === '1';
const mode: Mode = process.env.MODE ?? 'quick';

export default defineConfig({
	testDir: './e2e/tests',
	snapshotDir: './e2e/snapshots',
	snapshotPathTemplate: '{snapshotDir}/{projectName}/{arg}{ext}',
	outputDir: './artifacts/e2e-results',
	reporter: [
		['html', { outputFolder: './artifacts/e2e-report', open: isAI || isCI ? 'never' : 'on-failure' }], //
		['list'],
	],
	retries: isCI ? 2 : 0,
	workers: isCI ? 1 : undefined,
	forbidOnly: isCI,
	fullyParallel: true,
	use: {
		baseURL: isDev ? `http://localhost:${DEV_PORT}` : `http://localhost:${CI_PORT}`,
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
		trace: 'on-first-retry',
		viewport: { width: 1440, height: 900 },
		deviceScaleFactor: 1,
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		...((mode === 'full' && [
			{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
			{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
			{ name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
		]) ||
			[]),
	],
	webServer: {
		command: isDev ? `next dev -p ${DEV_PORT}` : `next start -p ${CI_PORT}`,
		url: isDev ? `http://localhost:${DEV_PORT}` : `http://localhost:${CI_PORT}`,
		reuseExistingServer: isDev,
		timeout: 120_000,
	},
});

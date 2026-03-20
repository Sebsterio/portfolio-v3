import { defineConfig, devices, type PlaywrightTestConfig, type Project } from '@playwright/test';

const getProjects = (...names: (typeof PROJECTS)[number]['name'][]) => PROJECTS.filter((p) => names.includes(p.name));

const isAI = process.env.AI === '1';
const isCI = process.env.CI === '1';
const isDev = process.env.DEV === '1';
const mode = process.env.MODE ?? 'quick';

const DEV_PORT = 3000;
const CI_PORT = 3004;

const VIEWPORTS = {
	sm: { width: 360, height: 680 },
	md: { width: 820, height: 1112 },
	lg: { width: 1440, height: 900 },
} as const;

const PROJECTS = [
	{ name: 'chromium-sm', use: { ...devices['Desktop Chrome'], viewport: VIEWPORTS.sm, deviceScaleFactor: 1 } },
	{ name: 'chromium-md', use: { ...devices['Desktop Chrome'], viewport: VIEWPORTS.md, deviceScaleFactor: 1 } },
	{ name: 'chromium-lg', use: { ...devices['Desktop Chrome'], viewport: VIEWPORTS.lg, deviceScaleFactor: 1 } },
	{ name: 'firefox-lg', use: { ...devices['Desktop Firefox'], viewport: VIEWPORTS.lg } },
	{ name: 'webkit-lg', use: { ...devices['Desktop Safari'], viewport: VIEWPORTS.lg } },
	{ name: 'safari-sm', use: { ...devices['iPhone 12'], viewport: VIEWPORTS.sm } },
] satisfies Project[];

const config: PlaywrightTestConfig = {
	testDir: './e2e/tests',
	snapshotDir: './e2e/snapshots',
	snapshotPathTemplate: '{snapshotDir}/{projectName}/{arg}{ext}',
	outputDir: './artifacts/e2e-results',
	reporter: [['html', { outputFolder: './artifacts/e2e-report', open: isAI || isCI ? 'never' : 'on-failure' }], ['list']],
	retries: isCI ? 2 : 0,
	workers: isCI ? 1 : undefined,
	forbidOnly: isCI,
	fullyParallel: true,
	use: {
		baseURL: isDev ? `http://localhost:${DEV_PORT}` : `http://localhost:${CI_PORT}`,
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
		trace: 'on-first-retry',
		viewport: VIEWPORTS.lg,
		deviceScaleFactor: 1,
	},
	projects: {
		full: getProjects('chromium-sm', 'chromium-md', 'chromium-lg', 'firefox-lg', 'webkit-lg', 'safari-sm'),
		quick: getProjects('chromium-lg'),
		mobile: getProjects('chromium-sm', 'safari-sm'),
		vendors: getProjects('chromium-lg', 'firefox-lg', 'webkit-lg', 'safari-sm'),
		responsive: getProjects('chromium-sm', 'chromium-md', 'chromium-lg'),
	}[mode],
	webServer: {
		command: isDev ? `next dev -p ${DEV_PORT}` : `next start -p ${CI_PORT}`,
		url: isDev ? `http://localhost:${DEV_PORT}` : `http://localhost:${CI_PORT}`,
		reuseExistingServer: isDev,
		timeout: 120_000,
	},
};

export default defineConfig(config);

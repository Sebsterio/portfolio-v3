import { defineConfig, devices, type PlaywrightTestConfig, type Project } from '@playwright/test';

const getProjects = (...names: (typeof PROJECTS)[number]['name'][]) => PROJECTS.filter((p) => names.includes(p.name));

const mode = process.env.MODE ?? 'basic';
const isAI = process.env.AI === '1';
const isCI = process.env.CI === '1';
const isDev = process.env.DEV === '1';
const isQuick = process.env.QUICK === '1';

const DEV_PORT = 3000;
const CI_PORT = 3004;

const VIEWPORTS = {
	sm: { width: 360, height: 680 },
	md: { width: 768, height: 1000 },
	lg: { width: 1024, height: 720 },
	xl: { width: 1280, height: 900 },
} as const;

const PROJECTS: Project[] = [
	{ name: 'chromium-sm', use: { ...devices['Desktop Chrome'], viewport: VIEWPORTS.sm, deviceScaleFactor: 1 } },
	{ name: 'chromium-md', use: { ...devices['Desktop Chrome'], viewport: VIEWPORTS.md, deviceScaleFactor: 1 } },
	{ name: 'chromium-lg', use: { ...devices['Desktop Chrome'], viewport: VIEWPORTS.lg, deviceScaleFactor: 1 } },
	{ name: 'chromium-xl', use: { ...devices['Desktop Chrome'], viewport: VIEWPORTS.xl, deviceScaleFactor: 1 } },
	{ name: 'firefox-lg', use: { ...devices['Desktop Firefox'], viewport: VIEWPORTS.lg } },
	{ name: 'webkit-lg', use: { ...devices['Desktop Safari'], viewport: VIEWPORTS.lg } },
	{ name: 'safari-sm', use: { ...devices['iPhone 12'], viewport: VIEWPORTS.sm } },
];

const config: PlaywrightTestConfig = {
	testDir: './e2e/tests',
	outputDir: './artifacts/e2e-results',
	snapshotDir: './e2e/snapshots',
	snapshotPathTemplate: '{snapshotDir}/{projectName}/{arg}{ext}',
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
		trace: !isQuick ? 'on-first-retry' : 'off',
		video: !isQuick ? 'retain-on-failure' : 'off',
		screenshot: !isQuick ? 'only-on-failure' : 'off',
	},
	projects: {
		full: getProjects('chromium-sm', 'chromium-md', 'chromium-lg', 'chromium-xl', 'firefox-lg', 'webkit-lg', 'safari-sm'),
		basic: getProjects('chromium-xl'),
		mobile: getProjects('chromium-sm', 'safari-sm'),
		vendors: getProjects('chromium-lg', 'firefox-lg', 'webkit-lg', 'safari-sm'),
		responsive: getProjects('chromium-sm', 'chromium-md', 'chromium-lg', 'chromium-xl'),
	}[mode],

	webServer: {
		command: isDev ? `next dev -p ${DEV_PORT}` : `next start -p ${CI_PORT}`,
		url: isDev ? `http://localhost:${DEV_PORT}` : `http://localhost:${CI_PORT}`,
		reuseExistingServer: isDev,
		timeout: 120_000,
	},
};

export default defineConfig(config);

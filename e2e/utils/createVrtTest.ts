import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

type Route = `/${string}`; // Absolute paths not allowed - baseUrl varies by env
type VrtOptions = {
	name?: string;
	timeout?: number;
	fullPage?: boolean;
	beforeScreenshot?: (page: Page) => Promise<void>;
};

function normalizeName(route: string) {
	if (route === '/') return 'home';
	return route.replace(/\//g, '_').replace(/^_/, '');
}

export function createVrtTest(route: Route, config: VrtOptions = {}) {
	const {
		name: snapshotName = normalizeName(route), //
		beforeScreenshot = async () => {},
		fullPage = true,
		timeout = 15000,
	} = config;

	test(`VRT: ${route}`, async ({ page }) => {
		await page.goto(route, { waitUntil: 'domcontentloaded' });
		await beforeScreenshot(page);
		await expect(page).toHaveScreenshot(`VRT-${snapshotName}.png`, { fullPage, timeout });
	});
}

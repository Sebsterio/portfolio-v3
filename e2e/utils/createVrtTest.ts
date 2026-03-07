import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
// import { safeMode } from './safeMode';

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

export function createVrtTest(route: string, config: VrtOptions = {}) {
	const {
		name: snapshotName = normalizeName(route), //
		beforeScreenshot = async () => {},
		fullPage = true,
		timeout = 15000,
	} = config;

	test(`VRT: ${route}`, async ({ page }) => {
		await page.goto(`http://localhost:3000${route}`, { waitUntil: 'domcontentloaded' });

		// await safeMode(page);

		await beforeScreenshot(page);

		await expect(page).toHaveScreenshot(`${snapshotName}.png`, { fullPage, timeout });
	});
}

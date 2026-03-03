import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { disableAnimations } from './disableAnimations';

type VrtOptions = {
	name?: string;
	fullPage?: boolean;
	beforeScreenshot?: (page: Page) => Promise<void>;
};

function normalizeName(route: string) {
	if (route === '/') return 'home';
	return route.replace(/\//g, '_').replace(/^_/, '');
}

export function createVrtTest(route: string, options?: VrtOptions) {
	const { name, fullPage = true, beforeScreenshot } = options ?? {};
	const snapshotName = name ?? normalizeName(route);

	test(`VRT: ${route}`, async ({ page }) => {
		await page.goto(`http://localhost:3000${route}`);
		await page.waitForLoadState('networkidle');

		await disableAnimations(page);

		if (beforeScreenshot) await beforeScreenshot(page);

		await expect(page).toHaveScreenshot(`${snapshotName}.png`, { fullPage });
	});
}

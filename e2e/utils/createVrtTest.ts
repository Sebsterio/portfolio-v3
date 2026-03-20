import type { Page, TestDetails } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { disableAnimations, loadLazyContent, waitForImages } from './safeMode';

type Route = `/${string}`; // Absolute paths not allowed - baseUrl varies by env
type VrtOptions = TestDetails & {
	name?: string;
	timeout?: number;
	fullPage?: boolean;
	beforeScreenshot?: (page: Page) => Promise<void>;
};

function normalizeSnapshotName(route: string) {
	if (route === '/') return 'home';
	return route.replace(/\//g, '_').replace(/^_/, '');
}

export function createVrtTest(route: Route, config: VrtOptions = {}) {
	const {
		name = normalizeSnapshotName(route), //
		timeout = 15000,
		fullPage = true,
		beforeScreenshot = async () => {},
		...details
	} = config;

	test(`VRT: ${route}`, details, async ({ page }) => {
		await page.goto(route, { waitUntil: 'domcontentloaded' });

		await disableAnimations(page);
		await loadLazyContent(page);
		await waitForImages(page);
		await beforeScreenshot(page);

		await expect(page).toHaveScreenshot(`VRT-${name}.png`, { fullPage, timeout });
	});
}

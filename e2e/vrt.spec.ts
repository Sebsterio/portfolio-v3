import { test, expect } from '@playwright/test';

import { disableAnimations } from './utils/disableAnimations';
test('homepage visual regression', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.waitForLoadState('networkidle');

	await disableAnimations(page);

	await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
});

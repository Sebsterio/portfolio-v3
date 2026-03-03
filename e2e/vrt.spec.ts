import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveScreenshot('homepage.png', {
		fullPage: true,
	});
});

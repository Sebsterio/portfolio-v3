import { Page } from '@playwright/test';

export async function disableAnimations(page: Page) {
	await page.addStyleTag({
		content: `
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
      }
    `,
	});
}

export async function stabilizeStyles(page: Page) {
	await disableAnimations(page);
	await page.addStyleTag({
		content: `
      *,
      *::before,
      *::after {
        caret-color: transparent !important;
        filter: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      html {
        scroll-behavior: auto !important;
        overflow-y: scroll !important;
      }
      [data-scroll],
      [data-parallax] {
        transform: none !important;
      }
    `,
	});
}

export async function disableIntersectionObserver(page: Page) {
	return await page.addInitScript(() => {
		class NoopObserver {
			observe() {}
			unobserve() {}
			disconnect() {}
		}
		// @ts-ignore
		window.IntersectionObserver = NoopObserver;
	});
}

export async function waitForImages(page: Page) {
	return page.waitForFunction(() => Array.from(document.images).every((img) => img.complete));
}

export async function waitForStableLayout(page: Page, timeout = 3000) {
	const start = Date.now();
	let previousHeight = 0;

	while (Date.now() - start < timeout) {
		const currentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
		if (currentHeight === previousHeight) {
			await page.waitForTimeout(200);
			const confirmHeight = await page.evaluate(() => document.documentElement.scrollHeight);
			if (confirmHeight === currentHeight) return;
		}
		previousHeight = currentHeight;
		await page.waitForTimeout(200);
	}
}

export async function safeMode(page: Page) {
	await disableIntersectionObserver(page);
	await page.locator('body').waitFor();
	await stabilizeStyles(page);
	await waitForImages(page);
	await waitForStableLayout(page);
}

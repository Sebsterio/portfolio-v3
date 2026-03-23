import { Page } from '@playwright/test';

export async function disableAnimations(page: Page) {
	await page.addStyleTag({
		content: `
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `,
	});
}

export async function disableFilters(page: Page) {
	await page.addStyleTag({
		content: `
      *,
      *::before,
      *::after {
        filter: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
    `,
	});
}

export async function stabilizeStyles(page: Page) {
	await disableAnimations(page);
	await disableFilters(page);
	await page.addStyleTag({
		content: `
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
		// @ts-expect-error - Overriding IntersectionObserver for e2e tests
		window.IntersectionObserver = NoopObserver;
	});
}

export const loadLazyContent = (page: Page) =>
	page.evaluate(async () => {
		while (window.scrollY + window.innerHeight < document.body.scrollHeight) {
			window.scrollBy(0, 500);
			await new Promise((r) => setTimeout(r, 50));
		}
		window.scrollTo(0, 0);
		await new Promise((r) => setTimeout(r, 100));
	});

export async function waitForImages(page: Page) {
	return await page.waitForFunction(async () => Array.from(document.images).every((img) => img.complete));
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
	await loadLazyContent(page);
	await waitForImages(page);
	await waitForStableLayout(page);
}

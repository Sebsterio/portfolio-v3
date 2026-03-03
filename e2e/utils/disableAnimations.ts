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
      html {
        scroll-behavior: auto !important;
      }
    `,
	});
}

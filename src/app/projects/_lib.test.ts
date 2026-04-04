import { describe, expect, test } from 'vitest';
import { getProjectThemeBySlug, getProjectThemeLookup } from './_lib';

const PROJECT_THEME_CASES = [
	['bounce-luggage', 'violet'],
	['underground-meco', 'amber'],
	['tt-education', 'emerald'],
	['tokensite', 'crimson'],
	['ao-payments', 'lime'],
	['animalysis', null],
	['narbon-ecommerce', 'rose'],
	['portfolio-v2', null],
] as const;

describe('project theme helpers', () => {
	test('reads the project-owned theme by slug', () => {
		for (const [slug, theme] of PROJECT_THEME_CASES) {
			expect(getProjectThemeBySlug(slug)).toBe(theme);
		}
	});

	test('exposes a lookup for all configured project themes', () => {
		const projectThemes = getProjectThemeLookup();

		for (const [slug, theme] of PROJECT_THEME_CASES) {
			expect(projectThemes[slug]).toBe(theme);
		}
	});
});

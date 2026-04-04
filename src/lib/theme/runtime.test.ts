import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { commitRootTheme, resolvePathTheme } from './runtime';
import type { ProjectThemeLookup } from './types';

const PROJECT_THEMES = {
	'bounce-luggage': 'violet',
	'underground-meco': 'amber',
	'tt-education': 'emerald',
	tokensite: 'crimson',
	'ao-payments': 'lime',
	animalysis: null,
	'narbon-ecommerce': 'rose',
	'portfolio-v2': null,
} as const satisfies ProjectThemeLookup;

const PROJECT_THEME_CASES = Object.entries(PROJECT_THEMES);

describe('theme runtime', () => {
	beforeEach(() => {
		document.documentElement.removeAttribute('data-theme');
	});

	afterEach(() => {
		vi.restoreAllMocks();
		document.documentElement.removeAttribute('data-theme');
	});

	test('resolves timeline detail routes to the project theme', () => {
		for (const [slug, theme] of PROJECT_THEME_CASES) {
			expect(resolvePathTheme(`/projects/timeline/${slug}`, PROJECT_THEMES)).toBe(theme);
			expect(resolvePathTheme(`/projects/timeline/${slug}/`, PROJECT_THEMES)).toBe(theme);
		}
	});

	test('resolves cards detail routes to the same project theme', () => {
		for (const [slug, theme] of PROJECT_THEME_CASES) {
			expect(resolvePathTheme(`/projects/cards/${slug}`, PROJECT_THEMES)).toBe(theme);
		}
	});

	test('keeps list and non-project routes on the base palette', () => {
		expect(resolvePathTheme('/', PROJECT_THEMES)).toBeNull();
		expect(resolvePathTheme('/about', PROJECT_THEMES)).toBeNull();
		expect(resolvePathTheme('/projects/timeline', PROJECT_THEMES)).toBeNull();
		expect(resolvePathTheme('/projects/cards', PROJECT_THEMES)).toBeNull();
		expect(resolvePathTheme('/projects/magazine', PROJECT_THEMES)).toBeNull();
		expect(resolvePathTheme('/projects/magazine/tokensite', PROJECT_THEMES)).toBeNull();
	});

	test('returns the base palette for unknown slugs', () => {
		expect(resolvePathTheme('/projects/timeline/unknown-project', PROJECT_THEMES)).toBeNull();
		expect(resolvePathTheme('/projects/cards/unknown-project', PROJECT_THEMES)).toBeNull();
	});

	test('ignores query strings and hashes when resolving themed detail routes', () => {
		expect(resolvePathTheme('/projects/timeline/tokensite?panel=details', PROJECT_THEMES)).toBe('crimson');
		expect(resolvePathTheme('/projects/cards/narbon-ecommerce#overview', PROJECT_THEMES)).toBe('rose');
	});

	test('dedupes unchanged root theme writes', () => {
		const root = document.documentElement;
		root.setAttribute('data-theme', 'emerald');
		const setAttribute = vi.spyOn(root, 'setAttribute');
		const removeAttribute = vi.spyOn(root, 'removeAttribute');

		expect(commitRootTheme('emerald', root)).toBe(false);
		expect(setAttribute).not.toHaveBeenCalled();
		expect(removeAttribute).not.toHaveBeenCalled();
	});

	test('removes the root theme attribute for the base palette', () => {
		const root = document.documentElement;
		root.setAttribute('data-theme', 'amber');
		const removeAttribute = vi.spyOn(root, 'removeAttribute');

		expect(commitRootTheme(null, root)).toBe(true);
		expect(removeAttribute).toHaveBeenCalledWith('data-theme');
		expect(root.hasAttribute('data-theme')).toBe(false);
	});
});

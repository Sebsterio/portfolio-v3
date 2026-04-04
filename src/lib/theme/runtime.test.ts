import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { commitRootTheme, getProjectThemeBySlug, resolvePathTheme } from './runtime';

describe('theme runtime', () => {
	beforeEach(() => {
		document.documentElement.removeAttribute('data-theme');
	});

	afterEach(() => {
		vi.restoreAllMocks();
		document.documentElement.removeAttribute('data-theme');
	});

	test('reads the project-owned theme by slug', () => {
		expect(getProjectThemeBySlug('bounce-luggage')).toBe('emerald');
		expect(getProjectThemeBySlug('tokensite')).toBe('violet');
		expect(getProjectThemeBySlug('tt-education')).toBeNull();
	});

	test('resolves timeline detail routes to the project theme', () => {
		expect(resolvePathTheme('/projects/timeline/bounce-luggage')).toBe('emerald');
		expect(resolvePathTheme('/projects/timeline/ao-payments/')).toBe('rose');
	});

	test('resolves cards detail routes to the same project theme', () => {
		expect(resolvePathTheme('/projects/cards/bounce-luggage')).toBe('emerald');
		expect(resolvePathTheme('/projects/cards/narbon-ecommerce')).toBe('crimson');
	});

	test('keeps list and non-project routes on the base palette', () => {
		expect(resolvePathTheme('/')).toBeNull();
		expect(resolvePathTheme('/about')).toBeNull();
		expect(resolvePathTheme('/projects/timeline')).toBeNull();
		expect(resolvePathTheme('/projects/cards')).toBeNull();
		expect(resolvePathTheme('/projects/magazine')).toBeNull();
		expect(resolvePathTheme('/projects/magazine/tokensite')).toBeNull();
	});

	test('returns the base palette for unknown slugs', () => {
		expect(resolvePathTheme('/projects/timeline/unknown-project')).toBeNull();
		expect(resolvePathTheme('/projects/cards/unknown-project')).toBeNull();
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

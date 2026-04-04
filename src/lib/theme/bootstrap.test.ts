import { Script } from 'node:vm';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { buildThemeBootstrapScript } from './bootstrap';
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

const runBootstrap = (pathname: string) => {
	window.history.replaceState({}, '', pathname);
	const script = new Script(buildThemeBootstrapScript(PROJECT_THEMES));
	script.runInThisContext();
};

describe('theme bootstrap', () => {
	beforeEach(() => {
		document.documentElement.removeAttribute('data-theme');
	});

	afterEach(() => {
		window.history.replaceState({}, '', '/');
		document.documentElement.removeAttribute('data-theme');
	});

	test('applies the project theme on themed detail routes before hydration', () => {
		runBootstrap('/projects/timeline/bounce-luggage');
		expect(document.documentElement.getAttribute('data-theme')).toBe('violet');

		runBootstrap('/projects/cards/ao-payments');
		expect(document.documentElement.getAttribute('data-theme')).toBe('lime');
	});

	test('keeps non-themed routes on the base palette', () => {
		document.documentElement.setAttribute('data-theme', 'amber');

		runBootstrap('/projects/magazine');
		expect(document.documentElement.hasAttribute('data-theme')).toBe(false);

		document.documentElement.setAttribute('data-theme', 'rose');
		runBootstrap('/about');
		expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
	});
});

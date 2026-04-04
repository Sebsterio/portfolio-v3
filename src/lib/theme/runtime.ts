import type { ProjectThemeLookup, ThemeName } from './types';

const THEMED_PROJECT_ROUTE_MODES = new Set(['timeline', 'cards']);

const normalizePathname = (pathname: string) => {
	const normalized = (pathname || '/').split(/[?#]/, 1)[0] || '/';
	return normalized.length > 1 && normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
};

const decodePathSegment = (segment: string) => {
	try {
		return decodeURIComponent(segment);
	} catch {
		return segment;
	}
};

const getThemedProjectSlug = (pathname: string) => {
	const segments = normalizePathname(pathname).split('/');

	if (segments.length !== 4) return null;

	const [, section, mode, slug] = segments;
	if (section !== 'projects' || !THEMED_PROJECT_ROUTE_MODES.has(mode) || !slug) return null;

	return decodePathSegment(slug);
};

export const resolvePathTheme = (pathname: string, projectThemes: ProjectThemeLookup): ThemeName | null => {
	const slug = getThemedProjectSlug(pathname);
	return slug ? projectThemes[slug] ?? null : null;
};

export const commitRootTheme = (theme: ThemeName | null, root: HTMLElement = document.documentElement) => {
	const currentTheme = root.getAttribute('data-theme');

	if (theme === null) {
		if (currentTheme === null) return false;
		root.removeAttribute('data-theme');
		return true;
	}

	if (currentTheme === theme) return false;

	root.setAttribute('data-theme', theme);
	return true;
};

import { projects } from '@/app/projects/_content';
import type { ThemeName } from './types';

const PROJECT_DETAIL_ROUTE_PATTERN = '^/projects/(?:timeline|cards)/([^/]+)$';
const PROJECT_DETAIL_ROUTE_REGEX = new RegExp(PROJECT_DETAIL_ROUTE_PATTERN);

const PROJECT_THEME_BY_SLUG = Object.fromEntries(projects.map(({ slug, theme }) => [slug, theme ?? null])) as Record<string, ThemeName | null>;

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

export const getProjectThemeBySlug = (slug: string): ThemeName | null => PROJECT_THEME_BY_SLUG[decodePathSegment(slug)] ?? null;

export const resolvePathTheme = (pathname: string): ThemeName | null => {
	const match = PROJECT_DETAIL_ROUTE_REGEX.exec(normalizePathname(pathname));
	if (!match) return null;
	return getProjectThemeBySlug(match[1]);
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

export const getThemeBootstrapScript = () => {
	const projectThemeMap = JSON.stringify(PROJECT_THEME_BY_SLUG).replace(/</g, '\\u003c');
	const routePattern = JSON.stringify(PROJECT_DETAIL_ROUTE_PATTERN);

	return [
		'(function(){',
		`var projectThemes=${projectThemeMap};`,
		`var routePattern=new RegExp(${routePattern});`,
		"var pathname=window.location.pathname||'/';",
		"if(pathname.length>1&&pathname.endsWith('/'))pathname=pathname.slice(0,-1);",
		'var match=routePattern.exec(pathname);',
		'var slug=match?match[1]:null;',
		'if(slug){try{slug=decodeURIComponent(slug);}catch(_error){}}',
		'var theme=slug?projectThemes[slug]??null:null;',
		'var root=document.documentElement;',
		"if(theme){if(root.getAttribute('data-theme')!==theme)root.setAttribute('data-theme',theme);}",
		"else if(root.hasAttribute('data-theme')){root.removeAttribute('data-theme');}",
		'})();',
	].join('');
};

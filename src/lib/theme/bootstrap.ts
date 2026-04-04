import type { ProjectThemeLookup } from './types';

const serializeProjectThemes = (projectThemes: ProjectThemeLookup) => JSON.stringify(projectThemes).replace(/</g, '\\u003c');

export const buildThemeBootstrapScript = (projectThemes: ProjectThemeLookup) => `(() => {
  const projectThemes = ${serializeProjectThemes(projectThemes)};
  let pathname = (window.location.pathname || '/').split(/[?#]/, 1)[0] || '/';

  if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);

  const segments = pathname.split('/');
  let slug = null;

  if (segments.length === 4 && segments[1] === 'projects' && (segments[2] === 'timeline' || segments[2] === 'cards') && segments[3]) {
    slug = segments[3];

    try {
      slug = decodeURIComponent(slug);
    } catch (_error) {}
  }

  const theme = slug ? projectThemes[slug] ?? null : null;
  const root = document.documentElement;

  if (theme === null) {
    if (root.hasAttribute('data-theme')) root.removeAttribute('data-theme');
    return;
  }

  if (root.getAttribute('data-theme') !== theme) root.setAttribute('data-theme', theme);
})();`;

import { buildThemeBootstrapScript } from '../bootstrap';
import type { ProjectThemeLookup } from '../types';

type ThemeBootstrapScriptProps = {
	projectThemes: ProjectThemeLookup;
};

export function ThemeBootstrapScript({ projectThemes }: ThemeBootstrapScriptProps) {
	const script = buildThemeBootstrapScript(projectThemes);

	return <script id='theme-bootstrap' dangerouslySetInnerHTML={{ __html: script }} />;
}

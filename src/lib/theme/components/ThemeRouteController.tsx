'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { commitRootTheme, resolvePathTheme } from '../runtime';
import type { ProjectThemeLookup } from '../types';

type ThemeRouteControllerProps = {
	projectThemes: ProjectThemeLookup;
};

export function ThemeRouteController({ projectThemes }: ThemeRouteControllerProps) {
	const pathname = usePathname();

	useLayoutEffect(() => {
		commitRootTheme(resolvePathTheme(pathname, projectThemes));
	}, [pathname, projectThemes]);

	return null;
}

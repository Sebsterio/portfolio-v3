import type React from 'react';

import { getProjectThemeLookup } from '@/app/projects/_lib';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav-items';
import { TransitionProvider } from '@/lib/transitions/components/TransitionProvider';
import { ThemeBootstrapScript } from '@/lib/theme/components/ThemeBootstrapScript';
import { ThemeRouteController } from '@/lib/theme/components/ThemeRouteController';

import { AppHeader } from './_components/AppHeader';
import { AppBackground } from './_components/AppBackground';
import { dmSans, urbanist } from './fonts';

import '@/styles/globals.css';

export { metadata, viewport } from './_config/metadata';

type RootLayoutProps = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	const projectThemes = getProjectThemeLookup();

	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<ThemeBootstrapScript projectThemes={projectThemes} />
			</head>
			<body
				className={cn(
					[urbanist.variable, dmSans.variable, 'antialiased'],
					'relative flex min-h-screen flex-col',
					'gap-16 md:gap-24 lg:gap-28',
					'px-2 py-4 lg:py-6',
				)}
			>
				<ThemeRouteController projectThemes={projectThemes} />
				<TransitionProvider>
					<div className='overlay-page overflow-hidden'>
						<AppBackground />
					</div>

					<header className='content-container'>
						<AppHeader logo='PORTFOLIO' navItems={navItems} className='px-6 py-4 lg:px-8 lg:py-5 lg:pr-9' />
					</header>

					<main className='relative content-container flex flex-1 flex-col px-2 md:px-4 lg:px-8'>
						<>{children}</>
					</main>

					<footer className='h-px' />
				</TransitionProvider>
			</body>
		</html>
	);
}

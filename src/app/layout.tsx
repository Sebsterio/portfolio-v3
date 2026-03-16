import type React from 'react';

import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav-items';
import { TransitionProvider } from '@/lib/transitions/components/TransitionProvider';

import { AppHeader } from './_components/AppHeader';
import { AppBackground } from './_components/AppBackground';
import { dmSans, urbanist } from './fonts';

import '@/styles/globals.css';

export { metadata, viewport } from './_config/metadata';

type RootLayoutProps = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html lang='en'>
			<head />
			<body
				className={cn(
					[urbanist.variable, dmSans.variable, 'antialiased'],
					'relative flex min-h-screen flex-col',
					'gap-16 md:gap-24 lg:gap-28',
					'px-4 sm:px-6 md:px-8',
					'pt-6 md:pt-10',
					'pb-12 md:pb-20 lg:pb-28', // rm when adding Footer
				)}
			>
				<TransitionProvider>
					<div className='pointer-events-none fixed inset-0 overflow-hidden'>
						<AppBackground />
					</div>

					<header className='content-container'>
						<AppHeader logo='PORTFOLIO' navItems={navItems} />
					</header>

					<main className='relative content-container flex flex-1 flex-col sm:px-5 md:px-7'>
						<>{children}</>
					</main>
				</TransitionProvider>
			</body>
		</html>
	);
}

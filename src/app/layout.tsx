import type React from 'react';

import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav-items';
import { TransitionProvider } from '@/lib/transitions/TransitionProvider';
import { BackgroundTransitionContainer } from '@/components/animation/BackgroundTransitionContainer';
import { ChromeBackground } from '@/components/background/ChromeBackground';
import { QuantumBackground } from '@/components/background/QuantumBackground';

import { dmSans, urbanist } from './_config/fonts';
import { AppHeader } from './_components/AppHeader';

import './globals.css';

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
					'relative min-h-screen flex flex-col',
					'gap-20 md:gap-28 px-3 pt-4 md:pt-6 md:pb-28',
					'pb-8' // rm when adding Footer
				)}
			>
				<TransitionProvider>
					<div className='fixed inset-0 pointer-events-none overflow-hidden'>
						<BackgroundTransitionContainer bgKey='default'>
							<ChromeBackground />
							<QuantumBackground />
						</BackgroundTransitionContainer>
					</div>

					<header className='content-container'>
						<AppHeader logo='PORTFOLIO' navItems={navItems} />
					</header>

					<main className='relative flex-1 content-container sm:px-5 md:px-7 flex flex-col'>
						<>{children}</>
					</main>
				</TransitionProvider>
			</body>
		</html>
	);
}

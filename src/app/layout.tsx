import type React from 'react';

import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav-items';
import { TransitionProvider } from '@/lib/transitions/TransitionProvider';
import { BackgroundTransitionContainer } from '@/components/animation/BackgroundTransitionContainer';
import { HeaderContainer } from '@/components/layout/HeaderContainer';
import { ContentContainer } from '@/components/layout/ContentContainer';
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
			<body className={cn(urbanist.variable, dmSans.variable, 'antialiased')}>
				<>
					<TransitionProvider>
						{/* App Background */}
						<div className='fixed inset-0 pointer-events-none overflow-hidden'>
							<BackgroundTransitionContainer bgKey='default'>
								<ChromeBackground />
								<QuantumBackground />
							</BackgroundTransitionContainer>
						</div>

						{/* App Content */}
						<div className='relative min-h-screen'>
							<HeaderContainer width='content'>
								<AppHeader logo='PORTFOLIO' navItems={navItems} />
							</HeaderContainer>

							<ContentContainer className='relative overflow-hidden'>
								<>{children}</>
							</ContentContainer>
						</div>
					</TransitionProvider>
				</>
			</body>
		</html>
	);
}

import type React from 'react';
import { Urbanist, DM_Sans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav-items';
// import { SITE_VERIFICATION } from '@/lib/constants';
import { BackgroundTransitionContainer } from '@/components/animation/BackgroundTransitionContainer';
import { HeaderContainer } from '@/components/layout/HeaderContainer';
import { ContentContainer } from '@/components/layout/ContentContainer';
import { ChromeBackground } from '@/components/background/ChromeBackground';
import { QuantumBackground } from '@/components/background/QuantumBackground';

import { AppHeader } from './_components/AppHeader';

import './globals.css';
import { PageTransitionProvider } from '@/lib/transitions';

export { metadata } from './_metadata';

const urbanist = Urbanist({
	subsets: ['latin'],
	variable: '--font-urbanist',
	weight: ['300', '500', '700', '800'],
});

const dmSans = DM_Sans({
	subsets: ['latin'],
	variable: '--font-dm-sans',
	weight: ['400', '500', '700'],
});

// const SiteVerificationMeta = SITE_VERIFICATION && <meta name='google-site-verification' content={SITE_VERIFICATION} />;

type RootLayoutProps = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html lang='en'>
			<head />
			<body className={cn(urbanist.variable, dmSans.variable, 'antialiased')}>
				<>
					<PageTransitionProvider>
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
					</PageTransitionProvider>
				</>
			</body>
		</html>
	);
}

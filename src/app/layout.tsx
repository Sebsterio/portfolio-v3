import type React from 'react';
import { Exo_2, Source_Code_Pro } from 'next/font/google';
// import { SITE_VERIFICATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { QuantumBackground, QuantumHeader } from '@/components';

import './globals.css';

export { metadata } from './_metadata';

const exo2 = Exo_2({
	subsets: ['latin'],
	variable: '--font-exo',
	weight: ['400', '600', '700', '800'],
});

const sourceCodePro = Source_Code_Pro({
	subsets: ['latin'],
	variable: '--font-source-code',
	weight: ['400', '600'],
});

// const SiteVerificationMeta = SITE_VERIFICATION && <meta name='google-site-verification' content={SITE_VERIFICATION} />;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<head></head>

			<body className={cn(exo2.variable, sourceCodePro.variable, `font-source-code antialiased`)}>
				<div className='relative min-h-screen bg-black overflow-hidden'>
					<div className='fixed inset-0 pointer-events-none overflow-hidden'>
						<QuantumBackground />
					</div>
					<div className={'relative z-10 max-w-[1400px] mx-auto px-10'}>
						<QuantumHeader />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}

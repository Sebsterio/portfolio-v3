import type React from 'react';
import { metadata } from '@/components/Metadata';
import { SITE_VERIFICATION } from '@/lib/constants';

import '@/styles/globals.css';

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
				{SITE_VERIFICATION && <meta name='google-site-verification' content={SITE_VERIFICATION} />}
			</head>

			{children}
		</html>
	);
}

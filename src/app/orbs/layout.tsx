import type React from 'react';
import { Poppins } from 'next/font/google';

import './styles.css';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
	display: 'swap',
});

export default function OrbsBodyLayout({ children }: { children: React.ReactNode }) {
	return <body className={poppins.className}>{children}</body>;
}

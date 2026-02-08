import type React from 'react';
import { Syne, Azeret_Mono } from 'next/font/google';

import { cn } from '@/lib/utils';

import './styles.css';

const syne = Syne({
	subsets: ['latin'],
	weight: ['400', '700', '800'],
	display: 'swap',
});

const azeretMono = Azeret_Mono({
	subsets: ['latin'],
	weight: ['400', '600'],
	display: 'swap',
});

export default function LiquidBodyLayout({ children }: { children: React.ReactNode }) {
	return <body className={cn(syne.className, azeretMono.className)}>{children}</body>;
}

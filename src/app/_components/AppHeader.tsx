'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useGetIsCurrentPage } from '@/lib/transitions/components/TransitionProvider';
import { TransitionLink as Link } from '@/lib/transitions/components/TransitionLink';
import { HamburgerButton } from './HamburgerButton';
import { MobileMenuOverlay } from './MobileMenuOverlay';
import { Glass } from '@/components/ui/Glass';
import { VT } from '@/lib/transitions/components/TransitionSlot';

type NavItem = {
	label: string;
	href: string;
};

type AppHeaderProps = {
	logo: string;
	navItems: NavItem[];
	className?: string;
};

export const AppHeader = ({ logo, navItems, className }: AppHeaderProps) => {
	const getIsCurrentPage = useGetIsCurrentPage();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<VT name='app-header'>
			<nav className='relative'>
				{/* Main Nav */}
				<Glass
					edgeGlow
					className={cn('z-50 rounded-full', [
						'glass-surface-1 glass-elevation-1',
						'flex items-center justify-between transition-opacity duration-300',
						[isMenuOpen && 'opacity-0.2 pointer-events-none', className],
					])}
				>
					{/* Logo */}
					<Link href='/' className='font-urbanist text-xl font-extrabold tracking-tight select-none md:text-2xl'>
						<span className='inline-block gradient-brand-logo gradient-text'>{logo}</span>
					</Link>

					{/* Desktop Navigation */}
					<ul className='hidden list-none gap-12 md:flex'>
						{navItems.map((item) => {
							const isCurrent = getIsCurrentPage(item.href);
							return (
								<li key={item.label}>
									<Link
										href={item.href}
										className={cn(
											'group relative text-[13px] font-semibold tracking-wider uppercase select-none',
											isCurrent
												? 'pointer-events-none text-primary' //
												: 'text-muted transition-all duration-300 hover:text-primary',
										)}
									>
										{item.label}
										{!isCurrent && (
											<span className='absolute -bottom-1.5 left-1/2 h-[2px] w-0 -translate-x-1/2 glow-brand-underline transition-all duration-300 gradient-brand-underline group-hover:w-full' />
										)}
									</Link>
								</li>
							);
						})}
					</ul>
				</Glass>

				<HamburgerButton
					className='absolute top-1/2 right-3 z-70 -translate-y-1/2 md:hidden' // always visible (above overlay)
					isOpen={isMenuOpen}
					onClick={() => setIsMenuOpen((v) => !v)}
				/>

				<MobileMenuOverlay className='overlay-page z-50' isOpen={isMenuOpen} navItems={navItems} onClose={() => setIsMenuOpen(false)} />
			</nav>
		</VT>
	);
};

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from '@/lib/transitions/TransitionLink';
import { HamburgerButton } from './HamburgerButton';
import { MobileMenuOverlay } from './MobileMenuOverlay';
import { useGetIsCurrentPage } from '@/lib/transitions/TransitionProvider';

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
		<>
			<div className='relative'>
				{/* Main Nav */}
				<nav
					className={cn(
						'relative z-[50] rounded-full',
						'-mx-2 sm:mx-0 -mt-2 sm:mt-0',
						'px-6 md:px-10 py-3 md:py-5 ',
						'flex justify-between items-center',
						'bg-[rgba(13,13,13,0.5)] backdrop-blur-[30px] backdrop-brightness-[1.2]',
						'border border-chrome-silver/[0.08]',
						'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(240,240,240,0.1)]',
						'transition-opacity duration-300',
						isMenuOpen && 'opacity-0.2 pointer-events-none',
						className
					)}
				>
					{/* Logo */}
					<Link href='/' className='font-urbanist text-xl md:text-2xl font-extrabold tracking-tight'>
						<span
							className='bg-clip-text text-transparent'
							style={{
								backgroundImage: 'linear-gradient(135deg, #f0f0f0 20%, #3b82f6 80%)',
							}}
						>
							{logo}
						</span>
					</Link>

					{/* Desktop Navigation */}
					<ul className='hidden md:flex gap-12 list-none'>
						{navItems.map((item) => {
							const isCurrent = getIsCurrentPage(item.href);
							return (
								<li key={item.label}>
									<Link
										href={item.href}
										className={cn(
											'group relative text-[13px] font-semibold tracking-wider uppercase',
											isCurrent
												? 'text-chrome-silver pointer-events-none'
												: 'text-chrome-silver/60 hover:text-chrome-silver  transition-all duration-300'
										)}
									>
										{item.label}
										{!isCurrent && (
											<span
												className='absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-full'
												style={{
													background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
													boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
												}}
											/>
										)}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* Hamburger (always visible, above overlay) */}
				<div className='absolute right-3 top-1/2 -translate-y-1/2 z-[70] md:hidden overflow-visible'>
					<HamburgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((v) => !v)} />
				</div>
			</div>

			{/* Mobile Overlay */}
			<MobileMenuOverlay isOpen={isMenuOpen} navItems={navItems} onClose={() => setIsMenuOpen(false)} />
		</>
	);
};

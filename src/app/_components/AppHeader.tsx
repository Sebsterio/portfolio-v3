'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

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
	return (
		<nav
			className={cn(
				'flex justify-between items-center',
				'px-10 py-5 rounded-full',
				'bg-[rgba(13,13,13,0.5)] backdrop-blur-[30px] backdrop-brightness-[1.2]',
				'border border-chrome-silver/[0.08]',
				'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(240,240,240,0.1)]',
				className
			)}
		>
			{/* Logo */}
			<Link href='/' className='font-urbanist text-2xl font-extrabold tracking-tight'>
				<span
					className='bg-clip-text text-transparent'
					style={{ backgroundImage: 'linear-gradient(135deg, #f0f0f0 20%, #3b82f6 80%)' }} // TODO extract
				>
					{logo}
				</span>
			</Link>

			{/* Navigation Links */}
			<ul className='flex gap-12 list-none'>
				{navItems.map((item) => (
					<li key={item.label}>
						<Link
							href={item.href}
							className='group relative text-chrome-silver/60 text-[13px] font-semibold tracking-wider uppercase transition-all duration-400 hover:text-chrome-silver'
						>
							{item.label}
							<span
								className='absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-400 group-hover:w-full'
								style={{
									background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
									boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
								}}
							/>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

import Link from 'next/link';
import { cn } from '@/lib/utils';

type NavItem = {
	label: string;
	href: string;
};

type MobileMenuOverlayProps = {
	isOpen: boolean;
	navItems: NavItem[];
	onClose: () => void;
};

export const MobileMenuOverlay = ({ isOpen, navItems, onClose }: MobileMenuOverlayProps) => {
	return (
		<div
			className={cn(
				'fixed inset-0 z-50',
				'bg-black/80 backdrop-blur-md',
				'transition-opacity duration-300 ease-out',
				isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
			)}
			aria-hidden={!isOpen}
		>
			<div className='flex flex-col items-center justify-center h-full gap-8'>
				{navItems.map((item) => (
					<Link
						key={item.label}
						href={item.href}
						onClick={onClose}
						className='text-chrome-silver text-2xl font-semibold tracking-wide uppercase transition-colors duration-300 hover:text-accent-blue py-3 px-6'
					>
						{item.label}
					</Link>
				))}
			</div>
		</div>
	);
};

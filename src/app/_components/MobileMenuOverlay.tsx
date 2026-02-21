import { cn } from '@/lib/utils';
import { useGetIsCurrentPage } from '@/lib/transitions/TransitionProvider';
import { TransitionLink as Link } from '@/lib/transitions/TransitionLink';

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
	const getIsCurrentPage = useGetIsCurrentPage();

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
						className={cn(
							'text-2xl font-semibold tracking-wide uppercase transition-all duration-300 py-3 px-6',
							getIsCurrentPage(item.href) ? 'text-accent-blue pointer-events-none' : 'text-chrome-silver hover:text-accent-blue'
						)}
					>
						{item.label}
					</Link>
				))}
			</div>
		</div>
	);
};

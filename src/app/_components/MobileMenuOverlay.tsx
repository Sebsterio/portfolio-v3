import { cn } from '@/lib/utils';
import { useGetIsCurrentPage } from '@/lib/transitions/components/TransitionProvider';
import { TransitionLink as Link } from '@/lib/transitions/components/TransitionLink';

type NavItem = {
	label: string;
	href: string;
};

type MobileMenuOverlayProps = {
	isOpen: boolean;
	navItems: NavItem[];
	onClose: () => void;
	className?: string;
};

export const MobileMenuOverlay = ({ isOpen, navItems, className, onClose }: MobileMenuOverlayProps) => {
	const getIsCurrentPage = useGetIsCurrentPage();

	return (
		<div
			className={cn('bg-black/80 backdrop-blur-md transition-opacity duration-200 ease-out', [
				isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
				className,
			])}
			aria-hidden={!isOpen}
		>
			<div className='flex h-full flex-col items-center justify-center gap-8'>
				{navItems.map((item) => (
					<Link
						key={item.label}
						href={item.href}
						onClick={onClose}
						delay={200}
						className={cn(
							'px-6 py-3 text-2xl font-semibold tracking-wide uppercase transition-all duration-300',
							getIsCurrentPage(item.href) ? 'pointer-events-none text-accent-blue' : 'text-chrome-silver hover:text-accent-blue',
						)}
					>
						{item.label}
					</Link>
				))}
			</div>
		</div>
	);
};

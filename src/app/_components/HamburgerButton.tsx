import { cn } from '@/lib/utils';
import { HamburgerIcon } from './HamburgerIcon';

type HamburgerIconProps = {
	isOpen: boolean;
	onClick: () => void;
	className?: string;
};

export const HamburgerButton = ({ isOpen, onClick, className }: HamburgerIconProps) => {
	return (
		<button
			onClick={onClick}
			aria-label='Toggle menu'
			aria-expanded={isOpen}
			className={cn('rounded-lg p-3', [
				'hover:scale-110',
				'focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-blue/60',
				className,
			])}
		>
			<HamburgerIcon isOpen={isOpen} />
		</button>
	);
};

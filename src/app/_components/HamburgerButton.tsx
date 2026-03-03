import { HamburgerIcon } from './HamburgerIcon';

type HamburgerIconProps = {
	isOpen: boolean;
	onClick: () => void;
};

export const HamburgerButton = ({ isOpen, onClick }: HamburgerIconProps) => {
	return (
		<button
			onClick={onClick}
			aria-label='Toggle menu'
			aria-expanded={isOpen}
			className='p-3 relative z-60 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-blue/60 rounded-lg overflow-visible'
		>
			<HamburgerIcon isOpen={isOpen} />
		</button>
	);
};

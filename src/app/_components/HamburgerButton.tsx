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
			className='relative z-60 overflow-visible rounded-lg p-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-blue/60'
		>
			<HamburgerIcon isOpen={isOpen} />
		</button>
	);
};

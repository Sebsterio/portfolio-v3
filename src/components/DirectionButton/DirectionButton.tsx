import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ChevronLeft, ChevronRight, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationButtonClassName } from './styles';

type DirectionButtonProps = {
	icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
	onClick: () => void;
	className?: string;
};

function DirectionButton({ icon: Icon, className, ...props }: DirectionButtonProps) {
	return (
		<button type='button' className={cn(navigationButtonClassName, className)} {...props}>
			<Icon className='size-6 text-primary md:h-7 md:w-7' />
		</button>
	);
}

export const PrevButton = (props: { onClick: () => void; className?: string }) => <DirectionButton {...props} icon={ChevronLeft} />;

export const NextButton = (props: { onClick: () => void; className?: string }) => <DirectionButton {...props} icon={ChevronRight} />;

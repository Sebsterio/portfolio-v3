import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ChevronLeft, ChevronRight, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavigationButtonProps = {
	icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
	onClick: () => void;
};

function NavigationButton({ icon: Icon, ...props }: NavigationButtonProps) {
	return (
		<button
			type='button'
			className={cn('flex size-12 items-center justify-center rounded-full select-none md:size-14', [
				'transition-[colors,scale] duration-300 bg-fill-md hover:scale-110 hover:bg-fill-xl',
			])}
			{...props}
		>
			<Icon className='size-6 text-primary md:h-7 md:w-7' />
		</button>
	);
}

export const PrevButton = (props: { onClick: () => void }) => <NavigationButton {...props} icon={ChevronLeft} />;

export const NextButton = (props: { onClick: () => void }) => <NavigationButton {...props} icon={ChevronRight} />;

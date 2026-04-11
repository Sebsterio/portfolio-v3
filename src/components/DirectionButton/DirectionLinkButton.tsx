import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ChevronLeft, ChevronRight, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransitionLink, TransitionLinkProps } from '@/lib/transitions/components/TransitionLink';
import { navigationButtonClassName } from './styles';

type DirectionLinkButtonProps = TransitionLinkProps & {
	icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
};

function DirectionLinkButton({ icon: Icon, className, ...props }: DirectionLinkButtonProps) {
	return (
		<TransitionLink className={cn(navigationButtonClassName, className)} {...props}>
			<Icon className='size-6 text-primary md:h-7 md:w-7' />
		</TransitionLink>
	);
}

export const PrevLinkButton = (props: Omit<DirectionLinkButtonProps, 'icon'>) => <DirectionLinkButton {...props} icon={ChevronLeft} />;

export const NextLinkButton = (props: Omit<DirectionLinkButtonProps, 'icon'>) => <DirectionLinkButton {...props} icon={ChevronRight} />;

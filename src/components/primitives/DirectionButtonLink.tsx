import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ChevronLeft, ChevronRight, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransitionLink, TransitionLinkProps } from '@/lib/transitions/components/TransitionLink';
import { navigationButtonClassName } from './DirectionButton.styles';

type DirectionButtonLinkProps = TransitionLinkProps & {
	icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
};

function DirectionButtonLink({ icon: Icon, className, ...props }: DirectionButtonLinkProps) {
	return (
		<TransitionLink className={cn(navigationButtonClassName, className)} {...props}>
			<Icon className='size-6 text-primary md:h-7 md:w-7' />
		</TransitionLink>
	);
}

export const PrevLinkButton = (props: Omit<DirectionButtonLinkProps, 'icon'>) => <DirectionButtonLink {...props} icon={ChevronLeft} />;

export const NextLinkButton = (props: Omit<DirectionButtonLinkProps, 'icon'>) => <DirectionButtonLink {...props} icon={ChevronRight} />;

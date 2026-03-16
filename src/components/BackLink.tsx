import { ComponentProps } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransitionLink } from '@/lib/transitions/components/TransitionLink';

type BackLinkProps = ComponentProps<typeof TransitionLink> & {
	children: React.ReactNode;
};

export const BackLink = ({ href, children, className, ...props }: BackLinkProps) => (
	<TransitionLink
		href={href}
		className={cn('text-muted inline-flex items-center gap-2 text-sm transition-colors hover:text-accent-cyan', className)}
		{...props}
	>
		<ArrowLeft className='h-4 w-4' />
		{children}
	</TransitionLink>
);

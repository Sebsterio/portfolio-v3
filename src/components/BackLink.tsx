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
		className={cn('inline-flex items-center gap-2 text-sm text-muted hover:text-accent-cyan transition-colors', className)}
		{...props}
	>
		<ArrowLeft className='w-4 h-4' />
		{children}
	</TransitionLink>
);

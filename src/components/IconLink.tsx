import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip } from './Tooltip';

type IconLinkProps = {
	url: string;
	icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
	label: string;
	disabled?: boolean;
	className?: string;
};

export const IconLink = ({ url, label, className, icon: Icon, disabled }: IconLinkProps) => {
	return (
		<div className='group/tooltip relative flex'>
			<a
				href={url}
				target={url.startsWith('mailto:') ? '_self' : '_blank'}
				rel='noopener noreferrer'
				className={cn(
					'rounded-xl border border-solid p-4',
					!disabled && 'hover:animate-pop-up',
					disabled && 'cursor-default',
					className, //
				)}
				aria-label={label}
			>
				<Icon className='size-6' />
			</a>
			{!disabled && <Tooltip>{label}</Tooltip>}
		</div>
	);
};

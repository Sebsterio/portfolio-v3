import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

type IconLinkProps = {
	url: string;
	label: string;
	bgColor: string;
	iconColor: string;
	icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
};

export const IconLink = ({ url, label, bgColor, iconColor, icon: Icon }: IconLinkProps) => {
	return (
		<a
			href={url}
			target={url.startsWith('mailto:') ? '_self' : '_blank'}
			rel='noopener noreferrer'
			className={cn('relative rounded-xl border border-solid p-4', 'hover:animate-pop-up', bgColor)}
			aria-label={label}
		>
			<Icon className={cn('size-6', iconColor)} />
		</a>
	);
};

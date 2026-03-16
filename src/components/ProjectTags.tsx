import { cn } from '@/lib/utils';

type ProjectTagsProps = {
	tags: string[];
	limit?: number;
	variant?: 'default' | 'highlight' | 'muted';
	size?: 'sm' | 'md' | 'lg';
	className?: string;
};

const variantClasses = {
	default: 'text-accent-cyan surface-tag',
	muted: 'text-chrome-silver/80 surface-tag', // AboutPage only
	highlight: 'text-accent-cyan font-semibold surface-tag-highlight surface-tag-highlight-hover transition-all duration-300', // Magazine/SectionA only
};

const sizeClasses = {
	sm: 'size-tag-sm text-xs',
	md: 'size-tag-md text-xs', // AboutPage only
	lg: 'size-tag-lg text-xs md:text-sm',
};

export const ProjectTags = ({ tags, limit, variant = 'default', size = 'md', className }: ProjectTagsProps) => {
	const displayTags = limit ? tags.slice(0, limit) : tags;

	return (
		<div className={cn('flex flex-wrap gap-2', className)}>
			{displayTags.map((tag) => (
				<span key={tag} className={cn(variantClasses[variant], sizeClasses[size])}>
					{tag}
				</span>
			))}
		</div>
	);
};

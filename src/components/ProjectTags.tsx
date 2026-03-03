import { cn } from '@/lib/utils';

type ProjectTagsProps = {
	tags: string[];
	limit?: number;
	size?: 'sm' | 'md';
	className?: string;
};

export const ProjectTags = ({ tags, limit, size = 'md', className }: ProjectTagsProps) => {
	const displayTags = limit ? tags.slice(0, limit) : tags;
	const sizeClasses = {
		sm: 'px-2 py-1 rounded-sm text-xs',
		md: 'px-4 py-2 rounded-lg text-sm',
	};

	return (
		<div className={cn('flex flex-wrap gap-2', className)}>
			{displayTags.map((tag) => (
				<span key={tag} className={cn(sizeClasses[size], 'bg-accent-blue/10 text-accent-cyan border border-accent-blue/20')}>
					{tag}
				</span>
			))}
		</div>
	);
};

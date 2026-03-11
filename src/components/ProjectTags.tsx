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
		sm: 'tech-tag-static-sm',
		md: 'tech-tag-static',
	};

	return (
		<div className={cn('flex flex-wrap gap-2', className)}>
			{displayTags.map((tag) => (
				<span key={tag} className={cn(sizeClasses[size])}>
					{tag}
				</span>
			))}
		</div>
	);
};

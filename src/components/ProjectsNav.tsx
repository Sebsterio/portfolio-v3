import { cn } from '@/lib/utils';
import type { Project } from '@/types';

export type ProjectNavItem = Pick<Project, 'id' | 'slug'>;

type ProjectsNavProps = {
	projects: ProjectNavItem[];
	currentIndex: number;
	onNavigate: (slug: string) => void;
	className?: string;
};

export function ProjectsNav({ projects, currentIndex, onNavigate, className, ...props }: ProjectsNavProps) {
	return (
		<div className={cn('flex items-center gap-2 select-none', className)} {...props}>
			{projects.map((item, index) => {
				const isCurent = index === currentIndex;
				return (
					<button
						key={item.id}
						onClick={() => onNavigate(item.slug)}
						type='button'
						className={cn(
							'h-2 rounded-full transition-colors duration-300',
							isCurent ? 'w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40',
						)}
					/>
				);
			})}
		</div>
	);
}

'use client';

import type { ComponentProps, ReactNode } from 'react';
import type { ProjectNavItem } from '@/types';
import { cn } from '@/lib/utils';
import { TransitionLink } from '@/lib/transitions/components/TransitionLink';

type ProjectsPaginationProps = {
	projects: ProjectNavItem[];
	children: (item: ProjectNavItem & { index: number }) => ReactNode;
	className?: string;
};
type ProjectsPaginationItemButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
	current?: boolean;
	onClick?: () => void;
};
type ProjectsPaginationItemLinkProps = Omit<ComponentProps<typeof TransitionLink>, 'children'> & {
	current?: boolean;
};

export const ProjectsPagination = Object.assign(ProjectsPaginationRoot, {
	Button: ProjectsPaginationButton,
	Link: ProjectsPaginationLink,
});

function ProjectsPaginationRoot({ projects, children, className }: ProjectsPaginationProps) {
	return (
		<div className={cn('flex items-center gap-2 select-none', className)}>
			{projects.map((item, index) => children({ ...item, index }))}
		</div>
	);
}

function getPaginationItemClassName(current?: boolean, className?: string) {
	return cn(
		'block h-2 rounded-full transition-colors duration-300',
		current ? 'pointer-events-none w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40',
		className,
	);
}

function ProjectsPaginationButton({ current, className, type = 'button', ...props }: ProjectsPaginationItemButtonProps) {
	return (
		<button
			type={type}
			className={getPaginationItemClassName(current, className)}
			aria-current={current ? 'page' : undefined}
			aria-disabled={current || undefined}
			{...props}
		/>
	);
}

function ProjectsPaginationLink({ current, className, ...props }: ProjectsPaginationItemLinkProps) {
	return (
		<TransitionLink
			className={getPaginationItemClassName(current, className)}
			aria-current={current ? 'page' : undefined}
			aria-disabled={current || undefined}
			{...props}
		/>
	);
}

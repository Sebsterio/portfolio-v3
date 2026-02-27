import type { Metadata } from 'next';
import { projects } from './_content';

// TODO
export const metadata: Metadata = {
	title: 'Projects | Sebastian Rosloniec',
	description: 'Case studies & development work from recent years',
};

type ProjectsLayoutProps = {
	children: React.ReactNode;
};

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
	return (
		<div className='w-full space-y-8'>
			<>{children}</>
		</div>
	);
}

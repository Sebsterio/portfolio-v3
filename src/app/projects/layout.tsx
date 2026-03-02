import { Suspense } from 'react';
import { ProjectsPageHeader } from './_components/ProjectsPageHeader';
import { DisplayModeSwitcher } from './_components/DisplayModeSwitcher';
import { ProjectsPageHeader_Client } from './_components/ProjectsPageHeader_Client';

type ProjectsLayoutProps = {
	children: React.ReactNode;
};

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
	return (
		<div className='w-full space-y-16'>
			<div className='vt-p-header space-y-8'>
				{/* TODO: transition, id */}
				<Suspense fallback={<ProjectsPageHeader />}>
					<ProjectsPageHeader_Client />
				</Suspense>

				{/* TODO: loader; pass to header ? */}
				<Suspense fallback={<div style={{ width: 120 }} />}>
					<DisplayModeSwitcher />
				</Suspense>
			</div>

			<div
				className='relative w-full' //
			>
				{children}
			</div>
		</div>
	);
}

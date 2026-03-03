import { Suspense } from 'react';
import { DisplayModeSwitcher } from './_components/DisplayModeSwitcher';
import { PROJECT_PAGE_TITLE_ID } from './_config';
import { header } from './_content';

type ProjectsLayoutProps = {
	children: React.ReactNode;
};

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
	return (
		<div className='w-full space-y-16'>
			<div className='vt-p-header space-y-8 flex flex-col items-center'>
				<div className='text-center space-y-4' id={PROJECT_PAGE_TITLE_ID}>
					<h1 className='font-urbanist text-5xl md:text-6xl font-bold bg-linear-to-r from-white to-accent-cyan bg-clip-text text-transparent'>
						{header.title}
					</h1>
					<p className='text-chrome-silver/60 text-lg'>{header.subtitle}</p>
				</div>

				<Suspense fallback={<div className='h-[44px] w-[340px]' />}>
					<DisplayModeSwitcher />
				</Suspense>
			</div>

			<div className='relative w-full'>{children}</div>
		</div>
	);
}

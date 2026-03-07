import { Suspense } from 'react';
import { TextBlock, Title } from '@/components/typography';
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
					<Title variant='projects'>{header.title}</Title>
					<TextBlock>{header.subtitle}</TextBlock>
				</div>

				<Suspense fallback={<div className='h-11 w-85' />}>
					<DisplayModeSwitcher />
				</Suspense>
			</div>

			<div className='relative w-full'>{children}</div>
		</div>
	);
}

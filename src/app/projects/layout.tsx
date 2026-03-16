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
			<div className='flex flex-col items-center space-y-8 vt-p-header'>
				<div className='space-y-4 text-center' id={PROJECT_PAGE_TITLE_ID}>
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

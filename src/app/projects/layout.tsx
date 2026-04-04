import { Suspense } from 'react';
import { TextBlock, Title } from '@/components/typography';
import { DisplayModeSwitcher } from './_components/DisplayModeSwitcher';
import { PROJECT_PAGE_TITLE_ID } from './_config';
import { header } from './_content';
import { VT } from '@/lib/transitions/components/ViewTransition';

type ProjectsLayoutProps = {
	children: React.ReactNode;
};

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
	return (
		<div className='w-full stack-xl'>
			<VT.Div name='p-header' className='flex flex-col items-center gap-8'>
				<div className='stack-sm text-center' id={PROJECT_PAGE_TITLE_ID}>
					<Title variant='projects'>{header.title}</Title>
					<TextBlock>{header.subtitle}</TextBlock>
				</div>
				<Suspense fallback={<div className='h-11 w-85' />}>
					<DisplayModeSwitcher />
				</Suspense>
			</VT.Div>

			<div className='relative w-full'>{children}</div>
		</div>
	);
}

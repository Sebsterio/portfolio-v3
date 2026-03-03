import { PROJECT_PAGE_TITLE_ID } from '../_config';

type HeaderTitleProps = {
	title?: string;
	subtitle?: string;
};

export const ProjectsPageHeader = ({
	title = 'Projects',
	subtitle = 'Case studies & development work from recent years',
}: HeaderTitleProps) => {
	return (
		<div className='text-center space-y-4' id={PROJECT_PAGE_TITLE_ID}>
			<h1 className='font-urbanist text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent'>
				{title}
			</h1>
			{subtitle && <p className='text-chrome-silver/60 text-lg'>{subtitle}</p>}
		</div>
	);
};

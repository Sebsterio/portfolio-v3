type HeaderTitleProps = {
	title?: string;
	subtitle?: string;
};

export const ProjectsPageHeader = ({
	title = 'Projects',
	subtitle = 'Case studies & development work from recent years',
}: HeaderTitleProps) => {
	return (
		<div className='text-center space-y-4'>
			<h1
				className='font-urbanist text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent'
				style={{ viewTransitionName: 'project-title' }} //
			>
				{title}
			</h1>
			{subtitle && <p className='text-chrome-silver/60 text-lg'>{subtitle}</p>}
		</div>
	);
};

/* id={PROJECT_PAGE_TITLE_ID}
		className='text-4xl md:text-5xl  text-chrome-silver' 
<p className='text-chrome-silver/70'>*/

'use client';

import { useParams } from 'next/navigation';
import { getProjectCompany, getProjectName, getProjectPeriod } from '../_lib';
import { ProjectsPageHeader } from './ProjectsPageHeader';

export function ProjectsPageHeader_Client() {
	const params = useParams<{ slug?: string }>();

	if (!params.slug) return <ProjectsPageHeader />;
	return (
		<ProjectsPageHeader
			title={getProjectName(params.slug)}
			subtitle={`${getProjectCompany(params.slug)} · ${getProjectPeriod(params.slug)}`}
		/>
	);
}

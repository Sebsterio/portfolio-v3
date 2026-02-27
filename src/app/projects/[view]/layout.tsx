import type { DisplayMode } from '@/types';
import { PageTransition } from '@/lib/transitions/PageTransition';

import { generateViewParams } from '../_config';

export { generateViewParams as generateStaticParams };

type ProjectsViewLayoutProps = {
	children: React.ReactNode;
	params: { view: DisplayMode };
};

export default function ProjectsViewLayout({ children }: ProjectsViewLayoutProps) {
	return <PageTransition>{children}</PageTransition>;
}

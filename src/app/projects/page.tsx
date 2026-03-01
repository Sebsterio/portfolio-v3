import { redirect, RedirectType } from 'next/navigation';

export default function ProjectsPage() {
	redirect('/projects/timeline', RedirectType.replace);
}

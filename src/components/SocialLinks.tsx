import { Github, Linkedin, Mail, Codepen, ExternalLink } from 'lucide-react';
import { LEGACY_SITE_URL as V2_URL, GITHUB_URL, LINKEDIN_URL, CODEPEN_URL, EMAIL_URL } from '@/lib/constants';
import { IconLink } from './IconLink';

export const SocialLinks = () => {
	return (
		<>
			<IconLink icon={Github} url={GITHUB_URL} label='GitHub' className='border-gray-200/50 bg-gray-800/50 text-white' />
			<IconLink icon={Linkedin} url={LINKEDIN_URL} label='LinkedIn' className='border-blue-600 bg-blue-600/25 text-white' />
			<IconLink icon={ExternalLink} url={V2_URL} label='Portfolio v2' className='border-amber-500 bg-amber-500/25 text-white' />
			<IconLink icon={Codepen} url={CODEPEN_URL} label='CodePen' className='border-green-600 bg-green-600/25 text-white' />
			<IconLink disabled icon={Mail} url={EMAIL_URL} label='Email' className='border-gray-700 bg-gray-700/25 text-gray-700' />
		</>
	);
};

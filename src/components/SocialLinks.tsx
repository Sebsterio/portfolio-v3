import { Github, Linkedin, Mail, Codepen, ExternalLink } from 'lucide-react';
import { LEGACY_SITE_URL as V2_URL, GITHUB_URL, LINKEDIN_URL, CODEPEN_URL, EMAIL_URL } from '@/lib/constants';
import { IconLink } from './IconLink';

export const SocialLinks = () => {
	return (
		<>
			<IconLink icon={Github} url={GITHUB_URL} label='GitHub' bgColor='bg-gray-800/25 border-gray-800' iconColor='text-white' />
			<IconLink icon={Linkedin} url={LINKEDIN_URL} label='LinkedIn' bgColor='bg-blue-600/25 border-blue-600' iconColor='text-white' />
			<IconLink icon={ExternalLink} url={V2_URL} label='Portfolio v2' bgColor='bg-amber-500/25 border-amber-500' iconColor='text-white' />
			<IconLink icon={Codepen} url={CODEPEN_URL} label='CodePen' bgColor='bg-green-600/25 border-green-600' iconColor='text-white' />
			<IconLink icon={Mail} url={EMAIL_URL} label='Email' bgColor='bg-gray-700/25 border-gray-700' iconColor='text-gray-700' />
		</>
	);
};

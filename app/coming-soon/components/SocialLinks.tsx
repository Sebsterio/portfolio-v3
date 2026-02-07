import { Github, Linkedin, Mail, Codepen, ExternalLink } from 'lucide-react';
import { LEGACY_SITE_URL, GITHUB_URL, LINKEDIN_URL, CODEPEN_URL, EMAIL_URL } from '../../../lib/constants';

const socialProfiles = [
	{
		url: GITHUB_URL,
		icon: Github,
		label: 'GitHub',
		bgColor: 'bg-gray-800/25 border-gray-800	',
		iconColor: 'text-white',
	},
	{
		url: LINKEDIN_URL,
		icon: Linkedin,
		label: 'LinkedIn',
		bgColor: 'bg-blue-600/25 border-blue-600',
		iconColor: 'text-white',
	},
	{
		url: LEGACY_SITE_URL,
		icon: ExternalLink,
		label: 'Portfolio v2',
		bgColor: 'bg-amber-500/25 border-amber-500',
		iconColor: 'text-white',
	},
	{
		url: CODEPEN_URL,
		icon: Codepen,
		label: 'CodePen',
		bgColor: 'bg-green-600/25 border-green-600',
		iconColor: 'text-white',
	},
	{
		url: EMAIL_URL,
		icon: Mail,
		label: 'Email',
		bgColor: 'bg-gray-700/25 border-gray-700', // TEMP
		iconColor: 'text-gray-700', // TEMP
	},
];

export default function SocialLinks() {
	return (
		<div className='flex flex-wrap gap-4 justify-center'>
			{socialProfiles.map((social, index) => {
				const Icon = social.icon;
				return (
					<a
						key={index}
						href={social.url}
						target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
						rel='noopener noreferrer'
						className={`social-hover relative p-4 rounded-xl ${social.bgColor} border border-solid transition-all duration-300 shadow-lg hover:shadow-xl`}
						aria-label={social.label}
					>
						<Icon className={`w-6 h-6 ${social.iconColor}`} />

						{/* Tooltip */}
						<div className='absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-slate-200 text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap'>
							{social.label}
							<div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800' />
						</div>
					</a>
				);
			})}
		</div>
	);
}

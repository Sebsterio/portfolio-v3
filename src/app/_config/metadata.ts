import type { Metadata } from 'next';

import { SITE_URL, IMAGE_URL } from '@/lib/constants';

// TODO
// import { SITE_URL, IMAGE_URL, THUMBNAIL_URL, GITHUB_URL, LINKEDIN_URL, CODEPEN_URL, EMAIL_URL, LICENCE_URL } from '@/lib/constants';
// import { SITE_VERIFICATION } from '@/lib/constants';
// const SiteVerificationMeta = <meta name='google-site-verification' content={SITE_VERIFICATION} />;

export const viewport = {
	width: 'device-width',
	initialScale: 1,
};

const description = 'Portfolio of Sebastian Rosloniec, an experienced web developer with expertise in modern web technologies.';

export const metadata: Metadata = {
	title: 'Sebastian Rosloniec - Web Developer | Portfolio',
	description,
	keywords:
		'Sebastian Rosloniec, web developer, front-end developer, full-stack developer, React, React Native, Next.js, JavaScript, TypeScript, Node.js, MongoDB, UI/UX designer, MERN stack developer, software engineer, web development portfolio, responsive design, SEO, freelance web developer, web app developer, PWA, web design',
	authors: [{ name: 'Sebastian Rosloniec' }],
	creator: 'Sebastian Rosloniec',
	publisher: 'Sebastian Rosloniec',
	robots: 'index, follow',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: SITE_URL,
		title: 'Sebastian Rosloniec - Web Developer | Portfolio',
		description,
		siteName: 'Sebastian Rosloniec Portfolio',
		images: [
			{
				url: IMAGE_URL,
				width: 1200,
				height: 630,
				alt: 'Sebastian Rosloniec - Web Developer Portfolio',
			},
		],
	},
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: SITE_URL,
	},
	// Schema Markup (Structured Data)
	// structuredData: {
	// 	'@context': 'https://schema.org',
	// 	'@type': 'Person',
	// 	name: 'Sebastian Rosloniec',
	// 	jobTitle: 'Web Developer',
	// 	url: SITE_URL,
	// 	sameAs: [GITHUB_URL, LINKEDIN_URL, CODEPEN_URL, EMAIL_URL, SITE_URL],
	// 	worksFor: {
	// 		'@type': 'Organization',
	// 		name: 'Sebastian Rosloniec Portfolio',
	// 	},
	// 	image: IMAGE_URL,
	// 	description,
	// 	hasOccupation: {
	// 		'@type': 'Occupation',
	// 		name: 'Web Developer',
	// 		startDate: '2017-01',
	// 		endDate: 'present',
	// 	},
	// },
	// // Portfolio Schema Markup
	// portfolio: {
	// 	'@context': 'https://schema.org',
	// 	'@type': 'CreativeWork',
	// 	name: 'Sebastian Rosloniec - Web Developer Portfolio',
	// 	url: SITE_URL,
	// 	description,
	// 	creator: {
	// 		'@type': 'Person',
	// 		name: 'Sebastian Rosloniec',
	// 	},
	// 	genre: 'Web Development, Full-Stack, Front-End, UI/UX',
	// 	license: LICENCE_URL,
	// 	image: THUMBNAIL_URL,
	// },
};

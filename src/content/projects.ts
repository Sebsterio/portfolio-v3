import { Project } from '@/types';

export const header = {
	title: 'Projects',
	subtitle: 'Case studies & development work from recent years',
} as const;

export const projects: Project[] = [
	{
		id: 'bounce',
		slug: 'bounce-luggage',
		theme: 'violet',
		title: 'Cross-Platform Component Library',
		company: 'Bounce.com',
		period: 'Oct 2024 - Aug 2025',
		year: '2024-2025',
		location: 'Lisbon, PT',
		role: 'Software Engineer (Contract)',
		label: 'Leading Travel Startup',
		tags: ['Next.js', 'React Native', 'TypeScript', 'Tailwind', 'Storybook', 'Design System', 'Monorepo', 'Accessibility'],
		summary: 'Leading travel startup experiencing UI fragmentation across web and mobile products',
		intro:
			'Led the architecture and delivery of a production-ready cross-platform component library serving web, iOS, and Android platforms. This foundational system unified the design language across all Bounce products while reducing technical debt and enabling faster feature development.',
		description: [
			'Architected and delivered a production-ready **cross-platform component library** serving web, iOS, and Android platforms. This foundational system unified the design language across all Bounce products while reducing technical debt and enabling faster feature development.',
			'Led the migration from legacy components and established clear patterns, comprehensive Storybook documentation, and technical guidance for organization-wide adoption. The system enabled the product teams to work independently while reducing code repetition, ensuring adherence to the design system, and decreasing time-to-market for new features.',
		],
		challenge:
			'Bounce had grown rapidly across multiple platforms, resulting in fragmented UI components, inconsistent user experiences, and duplicated effort across web and mobile teams. The company needed a unified design system that could scale across platforms while maintaining native performance and platform-specific conventions.',
		solution:
			'I architected a monorepo-based component library using Next.js for web and React Native for mobile platforms. The system featured shared component logic with platform-specific rendering adapters, type-safe APIs using TypeScript generics, integration with translation service, comprehensive Storybook documentation, automated testing suite covering unit/integration/visual regression, and CI/CD pipeline with automated publishing.',
		impact: [
			'Reduced UI inconsistencies and bundle size across all platforms',
			'Improved accessibility and adherence to web standards',
			'Optimised perfomance through utilisation of CSS for interaction styles',
			'Established clear patterns and documentation for ongoing adoption',
		],
		link: 'https://bounce.com',
		images: {
			logo: '',
			thumbnail: '/assets/projects/bounce/comp-sm-3.png',
			main: '/assets/projects/bounce/comp-md.png',
			promo: [
				'/assets/projects/bounce/comp-1.png',
				'/assets/projects/bounce/marketing.webp',
				// '/assets/projects/bounce/comp-md-alpha-sm.png',
				'', //
			],
			screens: [
				'/assets/projects/bounce/map 2.jpg',
				'/assets/projects/bounce/mobile screen device.jpg',
				'/assets/projects/bounce/mobile screens.webp',
			],
		},
	},

	{
		id: 'meco',
		slug: 'underground-meco',
		theme: 'amber',
		title: 'Event Management Ecosystem',
		company: 'Underground Meco',
		period: 'Feb 2024 - Oct 2024',
		year: '2024',
		location: 'Lisbon, PT',
		role: 'Full-Stack Developer (Contract)',
		label: 'Music Festival',
		tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'PWA', 'CMS', 'UX Design'],
		summary: 'Music festival requiring modern digital infrastructure for operations and customer engagement',
		intro:
			'Developed comprehensive event management ecosystem consisting of internal back-office solution and customer-facing progressive web app. The system streamlined operations, financial tracking, and attendee experience for a major music festival.',
		description: [
			'Developed a comprehensive event management ecosystem that significantly improved operational efficiency for this music festival. The solution included a back-office platform for real-time inventory management, financial reporting, dashboards, and analytics.',
			'Built a customer-facing progressive web app with custom CMS, integrated payments processing via Stripe, geolocation services for venue navigation, and social media features to enhance attendee engagement. The system streamlined operations and created a seamless experience for both organizers and attendees.',
		],
		challenge:
			'Manual processes for inventory, payments, and customer communication created operational bottlenecks. No unified system existed for managing festival logistics, financial reporting, or attendee experience. The festival needed real-time operational visibility and seamless customer interactions.',
		solution:
			'Built dual-application ecosystem: back-office dashboard with live inventory tracking, financial analytics, and automated reporting; customer PWA featuring event scheduling, social features, payment integration, and offline-capable functionality. Integrated real-time data sync and geolocation services with custom CMS.',
		impact: [
			'Reduced inventory management overhead by 70%',
			'Prevented losses from payment failures by adding new transaction methods',
			'Enabled real-time operational decisions via live dashboards',
			'Improved attendee satisfaction through mobile-first experience',
		],
		images: {
			logo: '',
			thumbnail: '',
			main: '',
			promo: ['', '', ''],
			screens: ['', '', ''],
		},
	},

	{
		id: 'tt',
		slug: 'tt-education',
		theme: 'emerald',
		title: 'Platform Modernization',
		company: 'TT Education',
		period: 'Jul 2023 - Feb 2024',
		year: '2023-2024',
		location: 'Colchester, UK',
		role: 'Senior Front-End Developer',
		label: 'School Management Software',
		tags: ['React', 'Next.js', 'AngularJS', 'MSAL', 'Tailwind', 'Testing', 'AI', `Performance`],
		summary: 'School-management software built on legacy architecture requiring modernization',
		intro:
			'Led comprehensive platform modernization effort for school-management SaaS, rebuilding critical features while maintaining service continuity for thousands of active users. Implemented modern authentication, comprehensive testing, and accessibility compliance.',
		description: [
			'Led the modernization of a legacy education platform by reimplementing critical features including authentication, API integration, and checkout flows. Replaced outdated systems and enhanced stability, performance, and user experience across the platform.',
			'Implemented cross-product authentication using MSAL, enabling incremental replacement of legacy systems. Developed the interface for an AI chat feature, created a comprehensive design system, and added full accessibility compliance along with an extensive testing suite using Jest and Playwright.',
		],
		challenge:
			'Critical features built on outdated systems caused stability issues and blocked new development. No testing infrastructure or accessibility compliance existed. Multiple products had siloed authentication creating friction for users accessing different tools.',
		solution:
			'Implemented incremental modernization: rebuilt core features in modern React with backward compatibility, established comprehensive testing suite with Jest/RTL, implemented cross-product SSO with MSAL, achieved WCAG AA compliance, built AI chat interface for user support, and created design system with a centralised component library.',
		impact: [
			'Eliminated authentication-related support tickets',
			'Achieved 90% test coverage on critical paths',
			'Improved page load performance by 60%',
			'Enabled accelerated feature development velocity',
		],
		link: 'https://www.tteducation.co.uk/',
		images: {
			logo: '',
			thumbnail: '',
			main: '/assets/projects/tt/comp-pro-1.png',
			promo: ['/assets/projects/tt/comp-pro-2.png', '', ''],
			screens: [
				'/assets/projects/tt/desktop-top.png',
				'/assets/projects/tt/desktop-mid.png',
				'/assets/projects/tt/desktop-bottom.png', //
			],
		},
	},
	{
		id: 'ebit',
		slug: 'tokensite',
		theme: 'crimson',
		title: 'Blockchain Analytics Platform',
		company: 'eBit Labs',
		period: 'Oct 2021 - Feb 2023',
		year: '2021-2023',
		location: 'London, UK',
		role: 'Software Developer (Contract)',
		label: 'Blockchain Analytics Startup',
		tags: ['Web3', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'Architecture', 'Design System', 'CI/CD', `SEO`],
		summary: 'Blockchain analytics startup building first product with no existing frontend infrastructure',
		intro:
			'Served as founding frontend developer, establishing entire frontend architecture, development workflow, and code standards from scratch. Built production application with complex Web3 integrations while mentoring junior developers.',
		description: [
			'Served as the principal front-end developer and first front-end hire for this blockchain analytics startup. Architected and built tokensite.com from the ground up, featuring Web3 integration, a custom component library, and a complete CI/CD workflow using modern tooling.',
			"Led and mentored junior developers as the team grew, establishing front-end best practices and coding standards. Created reusable components that became the foundation for the company's design system, enabling rapid feature development while maintaining code quality and consistency across the application.",
		],
		challenge:
			'As first frontend developer, needed to architect scalable React application, establish CI/CD pipeline, implement Web3 wallet integration, and create reusable component library while building core product features simultaneously.',
		solution:
			'Architected scalable React application with custom component library, established CI/CD pipeline with automated deployment, implemented Web3 wallet integration with robust state management and error handling, created technical documentation and code review processes.',
		impact: [
			'Launched MVP with solo frontend development',
			'Built reusable component library enabling rapid iteration',
			'Mentored 2 junior developers to production-ready skill level',
			'Achieved 99.9% uptime with zero critical production incidents',
		],
		link: 'https://app.tokensite.com/',
		images: {
			logo: '',
			thumbnail: '/assets/projects/ebit/tokensite-portfolio-spotlight.webp',
			main: '/assets/projects/ebit/comp-md.png',
			promo: [
				'/assets/projects/ebit/comp.png',
				'/assets/projects/ebit/comp.png',
				'', //
			],
			screens: [
				'/assets/projects/ebit/tokensite-home-page.webp',
				'/assets/projects/ebit/tokensite-portfolio-spotlight.webp',
				'/assets/projects/ebit/tokensite-series-table.webp',
			],
		},
	},
	{
		id: 'ao',
		slug: 'ao-payments',
		theme: 'lime',
		title: 'Centralized Payment System',
		company: 'AO.com',
		period: 'Nov 2020 - Oct 2021',
		year: '2020-2021',
		location: 'Bolton, UK',
		role: 'Front-End Developer',
		roleDetail: 'Payments Team',
		label: 'E-Commerce Platform',
		tags: ['React', 'TypeScript', 'SCSS', 'Micro Frontend', 'Payment Integration', 'End-to-End Testing', 'Monorepo'],
		summary: 'Major e-commerce platform with fragmented payment provider integrations',
		intro:
			'Architected and built centralized micro frontend for payment processing, creating unified API layer abstracted from provider specifics. Enabled multiple teams to integrate payment methods without touching core system.',
		description: [
			'Sole front-end developer in the Payments Team, responsible for integrating and maintaining payment and finance services across the e-commerce platform. Architected, built, and maintained a centralized payment system distributed as a micro frontend across multiple teams.',
			'This system replaced legacy payment implementations and streamlined the process of integrating new payment providers. Also maintained the finance application website section, implementing improvements that reduced errors and saved the company £16,000 per month through enhanced validation and error handling.',
		],
		challenge:
			'Each team maintained separate payment integrations, causing code duplication and making new provider integration painfully slow. Payment-related bugs in finance section caused substantial losses.',
		solution:
			'Architected centralized micro frontend for payment processing with unified API layer and plugin architecture. Refactored finance application section fixing critical bugs. Reduced payment provider integration time from weeks to days.',
		impact: [
			'Saved £16k monthly through bug fixes in finance section',
			'Reduced new provider integration time by 80%',
			'Enabled all teams to share payment infrastructure',
			'Improved checkout conversion rate by 5%',
		],
		link: 'https://ao.com/',
		images: {
			logo: '',
			thumbnail: '/assets/projects/ao/comp-sm.png',
			main: '/assets/projects/ao/comp-md.png',
			promo: [
				'/assets/projects/ao/comp.png',
				'/assets/projects/ao/comp-sm-alpha-sm.png',
				'', //
			],
			screens: [
				'/assets/projects/ao/after-desktop.png',
				'/assets/projects/ao/journey-mobile.gif',
				'/assets/projects/ao/journey-tablet.gif',
			],
		},
	},
	{
		id: 'animalysis',
		freelance: true,
		slug: 'animalysis',
		theme: null,
		title: 'Vet Clinic Management System',
		company: 'Animalysis',
		period: 'Nov 2017 - Nov 2020',
		year: '2017-2020',
		location: 'London, UK',
		role: 'Web Developer & Designer (Freelance)',
		label: 'Pre-Seed Startup',
		tags: ['PWA', 'React', 'Node.js', 'MongoDB', 'Material UI', 'UX Design'],
		summary: 'Vet clinics struggling with inefficient paper-based pet health reporting',
		intro:
			"Designed and built intelligent survey system that dynamically generates personalized questions based on pet's symptoms, characteristics, and previous reports. Created admin portal for clinics to customize surveys and search case history.",
		description: [
			'Built a full-stack progressive web app that streamlines the process of reporting pet health problems to vet clinics through dynamically generated, personalized surveys. Developed the accompanying vet clinic management system for searching report history and survey customization.',
		],
		challenge:
			'Pet owners unable to accurately describe symptoms, leading to incomplete information before appointments. Clinics had no searchable history of cases. Process was slow and error-prone.',
		solution:
			'Delivered PWA enabling pet owners to complete detailed health reports from home with guided questionnaire. Built clinic dashboard for report management and analytics. Implemented cloud infrastructure for performance and scalability.',
		impact: [
			'Reduced appointment time through pre-visit information gathering',
			'Prevented unnecessary vet visits through better at-home care guidance',
			'Improved diagnostic accuracy through structured data',
			'Enabled clinics to identify health trends across patient base',
		],
		link: '',
		images: {
			logo: '',
			thumbnail: '/assets/projects/anim/animalysis.jpg',
			main: '/assets/projects/anim/animalysis.jpg',
			promo: ['/assets/projects/anim/animalysis.jpg', '', ''],
			screens: ['/assets/projects/anim/animalysis.jpg', '', ''],
		},
	},
	{
		id: 'narbon',
		freelance: true,
		slug: 'narbon-ecommerce',
		theme: 'rose',
		title: 'E-Commerce Progressive Web App',
		company: 'Narbon',
		period: 'Nov 2017 - Nov 2020',
		year: '2017-2020',
		location: 'London, UK',
		role: 'Web Developer & Designer (Freelance)',
		label: 'Fashion Brand',
		tags: ['E-Commerce', 'React', 'Redux', 'Firebase', 'Stripe', 'Styled Components', 'UX Design'],
		summary: 'Fashion brand requiring modern e-commerce platform with seamless mobile experience',
		intro:
			'Built modern PWA using React and Redux for state management. Integrated Firebase for authentication and real-time inventory, Stripe for payment processing. Implemented service workers for offline catalog browsing.',
		description: [
			'Created a modern e-commerce progressive web app using React, Redux, and Node.js. Implemented Firebase user authentication and database integration, Stripe payments processing, and cloud infrastructure optimization using Heroku, Atlas, and Cloudinary to minimize server load and maximize performance.',
		],
		challenge:
			'Existing platform was slow, not mobile-optimized, and lacked modern payment options. High cart abandonment rate. Manual inventory management caused frequent out-of-stock issues.',
		solution:
			'Delivered fast, mobile-first e-commerce experience with offline capabilities, secure authentication, and streamlined checkout. Implemented real-time inventory sync and order management dashboard.',
		impact: [
			'Reduced mobile cart abandonment by 60%',
			'Improved page load time from 6s to 1.2s',
			'Increased conversion by enabling session persistence and account registration',
			'Prevented out-of-stock issues through real-time inventory integration',
		],
		link: 'https://narbon.netlify.app',
		images: {
			logo: '',
			thumbnail: '/assets/projects/narbon/shop-desktop-md.png',
			main: '/assets/projects/narbon/comp.png',
			promo: ['/assets/projects/narbon/comp-1.png', '', ''],
			screens: [
				'/assets/projects/narbon/product-mobile-md.png',
				'/assets/projects/narbon/checkout-desktop-md.png',
				'/assets/projects/narbon/shop-desktop-md.png',
			],
		},
	},

	{
		id: 'v2',
		personal: true,
		brief: true,
		slug: 'portfolio-v2',
		theme: null,
		title: 'Previous Portfolio',
		company: 'Personal',
		period: '',
		year: '2020',
		location: '',
		role: '',
		label: '',
		tags: ['HTML', 'SCSS', 'Firebase', 'Gulp', 'UX Design'],
		summary: 'The previous version of my portfolio',
		intro: '',
		description: [''],
		challenge: '',
		solution: '',
		impact: [],
		link: 'https://v2.sebster.dev/',
		images: {
			logo: '',
			thumbnail: '',
			main: '',
			promo: ['', '', ''],
			screens: ['', '', ''],
		},
	},
];

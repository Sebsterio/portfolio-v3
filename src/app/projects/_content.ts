import { Project } from './types';

export const projects: Project[] = [
	{
		id: '1',
		slug: 'bounce-component-library',
		title: 'Cross-Platform Component Library',
		company: 'Bounce.com',
		period: 'Oct 2024 – Aug 2025',
		year: '2024–2025',
		location: 'Lisbon, PT',
		role: 'Software Engineer (Contract)',
		tags: ['Next.js', 'React Native', 'TypeScript', 'Storybook', 'Monorepo'],
		thumbnail: '/projects/bounce-thumbnail.jpg',
		summary: 'Leading travel startup experiencing UI fragmentation across web and mobile products',
		intro:
			'Led the architecture and delivery of a production-ready cross-platform component library serving web, iOS, and Android platforms. This foundational system unified the design language across all Bounce products while reducing technical debt and enabling faster feature development.',
		challenge:
			'Bounce had grown rapidly across multiple platforms, resulting in fragmented UI components, inconsistent user experiences, and duplicated effort across web and mobile teams. The company needed a unified design system that could scale across platforms while maintaining native performance and platform-specific conventions.',
		solution:
			'I architected a monorepo-based component library using Next.js for web and React Native for mobile platforms. The system featured shared component logic with platform-specific rendering adapters, type-safe APIs using TypeScript generics, comprehensive Storybook documentation, automated testing suite covering unit/integration/visual regression, and CI/CD pipeline with automated publishing.',
		impact: [
			'Reduced UI inconsistencies by 80% across all platforms',
			'Decreased time-to-market for new features by 40%',
			'Enabled 3 product teams to work independently with shared components',
			'Established clear patterns and documentation for ongoing adoption',
		],
		link: 'https://bounce.com',
	},
	{
		id: '2',
		slug: 'underground-meco-event-platform',
		title: 'Event Management Ecosystem',
		company: 'Underground Meco',
		period: 'Feb 2024 – Oct 2024',
		year: '2024',
		location: 'Lisbon, PT',
		role: 'Full-Stack Developer (Contract)',
		tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'PWA'],
		thumbnail: '/projects/meco-thumbnail.jpg',
		summary: 'Music festival requiring modern digital infrastructure for operations and customer engagement',
		intro:
			'Developed comprehensive event management ecosystem consisting of internal back-office solution and customer-facing progressive web app. The system streamlined operations, financial tracking, and attendee experience for a major music festival.',
		challenge:
			'Manual processes for inventory, payments, and customer communication created operational bottlenecks. No unified system existed for managing festival logistics, financial reporting, or attendee experience. The festival needed real-time operational visibility and seamless customer interactions.',
		solution:
			'Built dual-application ecosystem: back-office dashboard with live inventory tracking, financial analytics, and automated reporting; customer PWA featuring event scheduling, social features, payment integration, and offline-capable functionality. Integrated real-time data sync and geolocation services with custom CMS.',
		impact: [
			'Reduced inventory management overhead by 70%',
			'Processed 5000+ transactions with zero payment failures',
			'Enabled real-time operational decisions via live dashboards',
			'Improved attendee satisfaction through mobile-first experience',
		],
	},
	{
		id: '3',
		slug: 'tt-education-modernization',
		title: 'Platform Modernization',
		company: 'TT Education',
		period: 'Jul 2023 – Feb 2024',
		year: '2023–2024',
		location: 'Colchester, UK',
		role: 'Senior Front-End Developer',
		tags: ['React', 'MSAL', 'Testing', 'Accessibility', 'AI'],
		thumbnail: '/projects/tt-thumbnail.jpg',
		summary: 'School-management software built on legacy architecture requiring modernization',
		intro:
			'Led comprehensive platform modernization effort for school-management SaaS, rebuilding critical features while maintaining service continuity for thousands of active users. Implemented modern authentication, comprehensive testing, and accessibility compliance.',
		challenge:
			'Critical features built on outdated systems caused stability issues and blocked new development. No testing infrastructure or accessibility compliance existed. Multiple products had siloed authentication creating friction for users accessing different tools.',
		solution:
			'Implemented incremental modernization: rebuilt core features in modern React with backward compatibility, established comprehensive testing suite with Jest/RTL, implemented cross-product SSO with MSAL, achieved WCAG AA compliance, built AI chat interface for user support, and created design system with 30+ documented components.',
		impact: [
			'Eliminated authentication-related support tickets (100% reduction)',
			'Achieved 95% test coverage on critical paths',
			'Improved page load performance by 40%',
			'Enabled accelerated feature development velocity',
		],
		link: 'https://www.tteducation.co.uk/',
	},
	{
		id: '4',
		slug: 'tokensite-blockchain-analytics',
		title: 'Blockchain Analytics Platform',
		company: 'eBit labs',
		period: 'Oct 2021 – Feb 2023',
		year: '2021–2023',
		location: 'London, UK',
		role: 'Software Developer (Contract)',
		tags: ['Web3', 'React', 'TypeScript', 'CI/CD'],
		thumbnail: '/projects/tokensite-thumbnail.jpg',
		summary: 'Blockchain analytics startup building first product with no existing frontend infrastructure',
		intro:
			'Served as founding frontend developer, establishing entire frontend architecture, development workflow, and code standards from scratch. Built production application with complex Web3 integrations while mentoring junior developers.',
		challenge:
			'As first frontend developer, needed to architect scalable React application, establish CI/CD pipeline, implement Web3 wallet integration, and create reusable component library while building core product features simultaneously.',
		solution:
			'Architected scalable React application with custom component library, established CI/CD pipeline with automated deployment, implemented Web3 wallet integration with robust state management and error handling, created technical documentation and code review processes, and mentored junior developers.',
		impact: [
			'Launched MVP in 4 months with solo frontend development',
			'Built reusable component library enabling rapid iteration',
			'Mentored 2 junior developers to production-ready skill level',
			'Achieved 99.9% uptime with zero critical production incidents',
		],
		link: 'https://app.tokensite.com/',
	},
	{
		id: '5',
		slug: 'ao-payment-system',
		title: 'Centralized Payment System',
		company: 'AO.com',
		period: 'Nov 2020 – Oct 2021',
		year: '2020–2021',
		location: 'Bolton, UK',
		role: 'Front-End Developer',
		tags: ['React', 'Micro Frontend', 'Payment Integration'],
		thumbnail: '/projects/ao-thumbnail.jpg',
		summary: 'Major e-commerce platform with fragmented payment provider integrations',
		intro:
			'Architected and built centralized micro frontend for payment processing, creating unified API layer abstracted from provider specifics. Enabled multiple teams to integrate payment methods without touching core system.',
		challenge:
			'Each team maintained separate payment integrations, causing code duplication and making new provider integration painfully slow. Payment-related bugs in finance section cost £16k monthly in lost revenue.',
		solution:
			'Architected centralized micro frontend for payment processing with unified API layer and plugin architecture. Refactored finance application section fixing critical bugs. Reduced payment provider integration time from weeks to days.',
		impact: [
			'Saved £16k monthly through bug fixes in finance section',
			'Reduced new provider integration time by 80%',
			'Enabled 4 teams to share payment infrastructure',
			'Improved checkout conversion rate by 3%',
		],
		link: 'https://ao.com/',
	},
	{
		id: '6',
		slug: 'animalysis-vet-clinic',
		title: 'Vet Clinic Management System',
		company: 'Animalysis',
		period: 'Nov 2017 – Nov 2020',
		year: '2017–2020',
		location: 'London, UK',
		role: 'Web Developer & Designer (Freelance)',
		tags: ['PWA', 'React', 'Node.js', 'UX Design'],
		thumbnail: '/projects/animalysis-thumbnail.jpg',
		summary: 'Vet clinics struggling with inefficient paper-based pet health reporting',
		intro:
			'Designed and built intelligent survey system that dynamically generates personalized questions based on pet type and symptoms. Created admin portal for clinics to customize surveys and search case history.',
		challenge:
			'Pet owners unable to accurately describe symptoms, leading to incomplete information before appointments. Clinics had no searchable history of cases. Process was slow and error-prone.',
		solution:
			'Delivered PWA enabling pet owners to complete detailed health reports from home with guided questionnaire. Built clinic dashboard for report management and analytics. Implemented cloud infrastructure for performance and scalability.',
		impact: [
			'Reduced appointment time by 15 minutes on average',
			'Improved diagnostic accuracy through structured data',
			'Enabled clinics to identify health trends across patient base',
			'Achieved 4.8/5 user satisfaction rating',
		],
		link: 'http://www.animalysis.com/demo',
	},
	{
		id: '7',
		slug: 'narbon-ecommerce',
		title: 'E-Commerce Progressive Web App',
		company: 'Narbon Fashion',
		period: 'Nov 2017 – Nov 2020',
		year: '2017–2020',
		location: 'London, UK',
		role: 'Web Developer & Designer (Freelance)',
		tags: ['E-Commerce', 'React', 'Redux', 'Firebase', 'Stripe'],
		thumbnail: '/projects/narbon-thumbnail.jpg',
		summary: 'Fashion brand requiring modern e-commerce platform with seamless mobile experience',
		intro:
			'Built modern PWA using React and Redux for state management. Integrated Firebase for authentication and real-time inventory, Stripe for payment processing. Implemented service workers for offline catalog browsing.',
		challenge:
			'Existing platform was slow, not mobile-optimized, and lacked modern payment options. High cart abandonment rate on mobile devices. No offline capabilities for browsing catalog.',
		solution:
			'Delivered fast, mobile-first e-commerce experience with offline capabilities, secure authentication, and streamlined checkout. Implemented real-time inventory sync and order management dashboard.',
		impact: [
			'Reduced mobile cart abandonment by 35%',
			'Improved page load time from 8s to 1.2s',
			'Enabled offline product browsing',
			'Increased mobile conversion rate by 28%',
		],
		link: 'https://www.shop.narbonpatricia.com',
	},
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

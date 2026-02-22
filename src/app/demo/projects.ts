export type Project = {
	id: string;
	title: string;
	company: string;
	period: string;
	location: string;
	tags: string[];
	summary: string;
	problem: string;
	approach: string;
	solution: string;
	impact: string[];
	link?: string;
};

export const projects: Project[] = [
	{
		id: 'bounce',
		title: 'Cross-Platform Component Library',
		company: 'Bounce.com',
		period: '10.2024 - 08.2025',
		location: 'Lisbon, PT',
		tags: ['Next.js', 'React Native', 'TypeScript', 'Design Systems', 'Storybook'],
		summary: 'Leading travel startup experiencing UI fragmentation across web and mobile products',
		problem: 'Multiple teams were building similar components independently, leading to inconsistent UX, duplicated effort, and mounting technical debt. No shared design language existed across web, iOS, and Android platforms.',
		approach: 'Architected a unified component library leveraging React Native Web for true cross-platform code sharing. Established clear API patterns, comprehensive documentation, and incremental adoption strategy to minimize disruption.',
		solution: 'Delivered production-ready library with 40+ components, automated visual regression testing, and Storybook documentation. Created migration guides and provided hands-on technical guidance to product teams.',
		impact: [
			'Reduced component development time by 60%',
			'Achieved consistent UX across all platforms',
			'Enabled 3 product teams to migrate legacy code incrementally',
			'Established foundation for design system evolution'
		],
		link: 'https://bounce.com'
	},
	{
		id: 'underground-meco',
		title: 'Event Management Ecosystem',
		company: 'Underground Meco',
		period: '02.2024 - 10.2024',
		location: 'Lisbon, PT',
		tags: ['Full-Stack', 'React', 'Node.js', 'MongoDB', 'Stripe', 'PWA'],
		summary: 'Music festival requiring modern digital infrastructure for operations and customer engagement',
		problem: 'Manual processes for inventory, payments, and customer communication created operational bottlenecks. No unified system for managing festival logistics, financial reporting, or attendee experience.',
		approach: 'Built comprehensive dual-application ecosystem: internal back-office for operations team and customer-facing PWA. Integrated real-time data sync, payment processing, and geolocation services with custom CMS for content management.',
		solution: 'Delivered back-office dashboard with live inventory tracking, financial analytics, and automated reporting. Customer app featured event scheduling, social features, payment integration, and offline-capable PWA functionality.',
		impact: [
			'Reduced inventory management overhead by 70%',
			'Processed 5000+ transactions with zero payment failures',
			'Enabled real-time operational decisions via live dashboards',
			'Improved attendee satisfaction through mobile-first experience'
		]
	},
	{
		id: 'tt-education',
		title: 'Platform Modernization',
		company: 'TT Education',
		period: '07.2023 - 02.2024',
		location: 'Colchester, UK',
		tags: ['React', 'MSAL', 'Testing', 'Accessibility', 'Design Systems', 'AI'],
		summary: 'School-management software built on legacy architecture requiring modernization without disrupting active users',
		problem: 'Critical features (auth, payments, API integration) built on outdated systems caused stability issues and blocked new development. No testing infrastructure or accessibility compliance. Multiple products with siloed authentication.',
		approach: 'Implemented incremental modernization strategy: rebuilt core features in modern React while maintaining backward compatibility. Established comprehensive testing suite, implemented cross-product SSO with MSAL, and created new design system.',
		solution: 'Migrated authentication to Microsoft SSO enabling single sign-on across product suite. Built AI chat interface for user support. Delivered full test coverage with Jest/RTL and WCAG AA compliance. Created design system with 30+ documented components.',
		impact: [
			'Eliminated authentication-related support tickets (100% reduction)',
			'Achieved 95% test coverage on critical paths',
			'Improved page load performance by 40%',
			'Enabled accelerated feature development velocity'
		],
		link: 'https://www.tteducation.co.uk/'
	},
	{
		id: 'tokensite',
		title: 'Blockchain Analytics Platform',
		company: 'eBit labs',
		period: '10.2021 - 02.2023',
		location: 'London, UK',
		tags: ['Web3', 'React', 'TypeScript', 'CI/CD', 'Component Library'],
		summary: 'Blockchain analytics startup building first product with no existing frontend infrastructure',
		problem: 'As first frontend developer, needed to establish entire frontend architecture, development workflow, and code standards from scratch. Complex Web3 integrations required robust state management and error handling.',
		approach: 'Architected scalable React application with custom component library, established CI/CD pipeline, and implemented Web3 wallet integration. Mentored junior developers while building core product features.',
		solution: 'Delivered tokensite.com with full Web3 functionality, automated deployment pipeline, comprehensive component library, and technical documentation. Established frontend best practices and code review processes.',
		impact: [
			'Launched MVP in 4 months with solo frontend development',
			'Built reusable component library enabling rapid feature iteration',
			'Mentored 2 junior developers to production-ready skill level',
			'Achieved 99.9% uptime with zero critical production incidents'
		],
		link: 'https://app.tokensite.com/'
	},
	{
		id: 'ao-payments',
		title: 'Centralized Payment System',
		company: 'AO.com',
		period: '11.2020 - 10.2021',
		location: 'Bolton, UK',
		tags: ['Micro Frontend', 'React', 'Payment Integration', 'Architecture'],
		summary: 'Major e-commerce platform with fragmented payment provider integrations across teams',
		problem: 'Each team maintained separate payment integrations, causing code duplication and making new provider integration painfully slow. Payment-related bugs in finance section cost £16k monthly in lost revenue.',
		approach: 'Architected centralized micro frontend for payment processing, creating unified API layer abstracted from provider specifics. Designed plugin architecture enabling teams to add payment methods without touching core system.',
		solution: 'Built and deployed payment micro frontend consumed by 4 product teams. Refactored finance application section, fixing critical bugs and improving UX. Reduced payment provider integration time from weeks to days.',
		impact: [
			'Saved £16k monthly through bug fixes in finance section',
			'Reduced new provider integration time by 80%',
			'Enabled 4 teams to share payment infrastructure',
			'Improved checkout conversion rate by 3%'
		],
		link: 'https://ao.com/'
	},
	{
		id: 'animalysis',
		title: 'Vet Clinic Management System',
		company: 'Animalysis',
		period: '11.2017 - 11.2020',
		location: 'London, UK',
		tags: ['PWA', 'React', 'Node.js', 'Full-Stack', 'UX Design'],
		summary: 'Vet clinics struggling with inefficient paper-based pet health reporting process',
		problem: 'Pet owners unable to accurately describe symptoms, leading to incomplete information before appointments. Clinics had no searchable history of cases. Process was slow and error-prone.',
		approach: 'Designed intelligent survey system that dynamically generates personalized questions based on pet type, symptoms, and previous responses. Built admin portal for clinics to customize surveys and search case history.',
		solution: 'Delivered PWA enabling pet owners to complete detailed health reports from home with guided questionnaire. Built clinic dashboard for report management and analytics. Implemented cloud infrastructure for performance and scalability.',
		impact: [
			'Reduced appointment time by 15 minutes on average',
			'Improved diagnostic accuracy through structured data collection',
			'Enabled clinics to identify health trends across patient base',
			'Achieved 4.8/5 user satisfaction rating'
		],
		link: 'http://www.animalysis.com/demo'
	},
	{
		id: 'narbon',
		title: 'E-Commerce Progressive Web App',
		company: 'Narbon Fashion',
		period: '11.2017 - 11.2020',
		location: 'London, UK',
		tags: ['E-Commerce', 'React', 'Redux', 'Firebase', 'Stripe', 'PWA'],
		summary: 'Fashion brand requiring modern e-commerce platform with seamless mobile experience',
		problem: 'Existing platform was slow, not mobile-optimized, and lacked modern payment options. High cart abandonment rate on mobile devices. No offline capabilities for browsing catalog.',
		approach: 'Built modern PWA using React and Redux for state management. Integrated Firebase for authentication and real-time inventory, Stripe for payment processing. Implemented service workers for offline catalog browsing.',
		solution: 'Delivered fast, mobile-first e-commerce experience with offline capabilities, secure authentication, and streamlined checkout. Implemented real-time inventory sync and order management dashboard.',
		impact: [
			'Reduced mobile cart abandonment by 35%',
			'Improved page load time from 8s to 1.2s',
			'Enabled offline product browsing',
			'Increased mobile conversion rate by 28%'
		],
		link: 'https://www.shop.narbonpatricia.com'
	}
];

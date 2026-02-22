export const projectsContent = {
	bounce: {
		number: '01',
		company: 'Bounce.com',
		role: 'Software Engineer (Contract) · Leading Travel Startup',
		description: [
			'Architected and delivered a production-ready cross-platform component library serving web, iOS, and Android platforms. This foundational system unified the design language across all Bounce products while reducing technical debt and enabling faster feature development.',
			'Led the migration from legacy components and established clear patterns, comprehensive Storybook documentation, and technical guidance for organization-wide adoption. The system enabled three product teams to work independently while maintaining consistency, reducing UI inconsistencies by 80% and decreasing time-to-market for new features by 40%.',
		],
		tags: ['Next.js', 'React Native', 'TypeScript', 'Storybook', 'Monorepo'],
	},
	meco: {
		number: '02',
		label: 'Music Festival · Lisbon',
		title: 'Underground Meco',
		role: 'Full-Stack Developer (Contract)',
		description: [
			'Developed a comprehensive event management ecosystem that significantly improved operational efficiency for this music festival. The solution included a back-office platform for real-time inventory management, financial reporting, dashboards, and analytics.',
			'Built a customer-facing progressive web app with custom CMS, integrated payments processing via Stripe, geolocation services for venue navigation, and social media features to enhance attendee engagement. The system streamlined operations and created a seamless experience for both organizers and festival-goers.',
		],
	},
	ttEducation: {
		number: '03',
		title: 'TT Education',
		role: 'Senior Front-End Developer · School Management Software',
		description: [
			'Led the modernization of a legacy education platform by reimplementing critical features including authentication, API integration, and checkout flows. Replaced outdated systems and enhanced stability, performance, and user experience across the platform.',
			'Implemented cross-product authentication using MSAL, enabling incremental replacement of legacy systems. Developed the interface for an AI chat feature, created a comprehensive design system, and added full accessibility compliance along with an extensive testing suite using Jest and Playwright.',
		],
	},
	ebit: {
		number: '04',
		title: 'eBit labs',
		role: 'Software Developer (Contract) · Blockchain Analytics Startup',
		description: [
			'Served as the principal front-end developer and first front-end hire for this blockchain analytics startup. Architected and built tokensite.com from the ground up, featuring Web3 integration, a custom component library, and a complete CI/CD workflow using modern tooling.',
			"Led and mentored junior developers as the team grew, establishing front-end best practices and coding standards. Created reusable components that became the foundation for the company's design system, enabling rapid feature development while maintaining code quality and consistency across the application.",
		],
	},
	ao: {
		number: '05',
		label: 'E-Commerce Platform',
		title: 'AO.com',
		role: 'Front-End Developer · Payments Team',
		description: [
			'Sole front-end developer in the Payments Team, responsible for integrating and maintaining payment and finance services across the e-commerce platform. Architected, built, and maintained a centralized payment system distributed as a micro frontend across multiple teams.',
			'This system replaced legacy payment implementations and streamlined the process of integrating new payment providers. Also maintained the finance application website section, implementing improvements that reduced errors and saved the company £16,000 per month through enhanced validation and error handling.',
		],
	},
	freelance: {
		number: '06 — FREELANCE',
		title: 'Freelance Projects',
		role: 'Web Developer & Designer · Various Clients',
		projects: [
			{
				name: 'Animalysis',
				description:
					'Built a full-stack progressive web app that streamlines the process of reporting pet health problems to vet clinics through dynamically generated, personalized surveys. Developed the accompanying vet clinic management system for searching report history and survey customization.',
			},
			{
				name: 'Narbon Fashion',
				description:
					'Created a modern e-commerce progressive web app using React, Redux, and Node.js. Implemented Firebase user authentication and database integration, Stripe payments processing, and cloud infrastructure optimization using Heroku, Atlas, and Cloudinary to minimize server load and maximize performance.',
			},
		],
	},
};

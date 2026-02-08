'use client';

import { cn } from '@/lib/utils';
import { SidePanel } from './SidePanel';

interface LandingPageLayoutProps {
	backgroundJsx: React.ReactElement;
	headerJsx: React.ReactNode;
	heroJsx: React.ReactNode;
	panelJsx: React.ReactNode;
}

// THEME: Quantu₼
export const LandingPageLayout = ({ backgroundJsx, headerJsx, heroJsx, panelJsx }: LandingPageLayoutProps) => {
	return (
		<div className='relative min-h-screen bg-black overflow-hidden'>
			{backgroundJsx}

			<div className='relative z-10 container max-w-[1400px] mx-auto px-10'>
				{headerJsx}

				<section className='min-h-[calc(100vh-180px)] flex items-center py-20'>
					<div className={cn('w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center')}>
						{heroJsx}

						<div className='flex justify-center lg:justify-end w-full'>
							<SidePanel>{panelJsx}</SidePanel>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

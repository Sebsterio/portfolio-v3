import { cn } from '@/lib/utils';
import { ProjectImage } from '@/components/ProjectImage';

interface MagazineSectionMultiProps {
	number: string;
	title: string;
	subtitle: string;
	entries: Array<{
		sectionId: string;
		title: string;
		description: string[];
		image: string;
	}>;
}

export function MagazineSectionMulti({ number, title, subtitle, entries }: MagazineSectionMultiProps) {
	const [entry0, entry1] = entries;

	return (
		<section className='group relative -mt-8 xl:ml-12'>
			<div className='space-y-4'>
				<div className='font-urbanist text-lg font-black tracking-wider text-label md:text-xl'>{number}</div>
				<h3 className='font-urbanist text-4xl leading-[0.85] font-black text-white transition-colors duration-300 group-hover:text-label md:text-5xl lg:text-6xl xl:text-[5.5rem]'>
					{title}
				</h3>
				<p className='mb-10 text-base text-muted md:text-lg'>{subtitle}</p>
			</div>

			<div className='mmg-grid mx-5 sm:mx-10 md:mx-16 lg:mr-0 xl:ml-20'>
				<div id={entry0.sectionId} className={cn('mmg-e0-text', 'space-y-3 transition-[translate] duration-400 hover:translate-x-4')}>
					<h4 className={cn('font-urbanist text-2xl font-bold text-label', 'md:text-3xl')}>{entry0.title}</h4>
					<p className='text-sm leading-relaxed text-secondary md:text-base'>{entry0.description}</p>
				</div>

				<div className='mmg-images'>
					<div className='mmg-e0-img'>
						<ProjectImage
							src={entry0.image}
							gradient='bg-gradient-freelance-main'
							className={cn('magazine-image aspect-[16/9] w-full md:aspect-square lg:h-[360px] lg:w-[360px]', [
								'shadow-editorial-freelance border-4 border-white/90 md:border-6 lg:border-0',
								'hover:scale-[1.02] hover:rotate-1',
							])}
							overlayType='light'
							glintOnHover
						>
							<div className='overlay-full bg-linear-to-t from-transparent via-transparent to-black/30' />
						</ProjectImage>
					</div>

					<div className='mmg-e1-img'>
						<ProjectImage
							src={entry1.image}
							gradient='bg-gradient-freelance-small'
							className={cn('magazine-image aspect-[16/9] w-full md:aspect-square lg:w-[180px]', [
								'border-4 border-white/90 lg:border-8 lg:shadow-image-md-strong',
								'hover:scale-105 lg:rotate-[8deg] lg:hover:rotate-[5deg]',
							])}
							glintOnHover
						/>
					</div>
				</div>

				<div className='mmg-divider border-b border-accent-2/15' />

				<div id={entry1.sectionId} className={cn('mmg-e1-text', 'space-y-3 transition-[translate] duration-400 hover:translate-x-4')}>
					<h4 className={cn('font-urbanist text-2xl font-bold text-label', 'md:text-3xl')}>{entry1.title}</h4>
					<p className='text-sm leading-relaxed text-secondary md:text-base'>{entry1.description}</p>
				</div>
			</div>
		</section>
	);
}

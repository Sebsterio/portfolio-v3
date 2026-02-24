import { BounceProject } from './magazine/BounceProject';
import { MecoProject } from './magazine/MecoProject';
import { TTProject } from './magazine/TTProject';
import { EbitProject } from './magazine/EbitProject';
import { AOProject } from './magazine/AOProject';
import { FreelanceProject } from './magazine/FreelanceProject';
import { Project } from '@/types';

function MagazineCollectionPageDecorations() {
	return (
		<>
			{/* Decorative Circles */}
			<div className='deco-circle w-[140px] h-[140px] top-[10%] right-[8%]' />
			<div className='deco-circle w-[100px] h-[100px] top-[48%] left-[3%]' />
			<div className='deco-circle w-[120px] h-[120px] bottom-[18%] right-[15%]' />

			{/* Decorative Lines */}
			<div className='deco-line top-[26%] left-0 w-[40%]' />
			<div className='deco-line bottom-[32%] right-0 w-[35%]' />
			<div className='deco-line top-[60%] left-[20%] w-[25%] rotate-[15deg]' />
		</>
	);
}

type MagazineCollectionPageProps = {
	projects: Project[];
};

export const MagazineCollectionPage = ({ projects }: MagazineCollectionPageProps) => {
	const [bounce, meco, tt, ebit, ao, animalysis, narbon] = projects;

	return (
		<div className='relative pt-20'>
			<MagazineCollectionPageDecorations />

			<div className='relative z-10 space-y-24 md:space-y-40 lg:space-y-32'>
				<BounceProject {...bounce} number='01' role={`${bounce.role} · ${bounce.label}`} />

				<MecoProject {...meco} number='02' title={meco.company} label={`${meco.label} · ${meco.location}`} />

				<TTProject number='03' {...tt} title={tt.company} role={`${tt.role} · ${tt.label}`} />

				<EbitProject {...ebit} number='04' title={ebit.company} role={`${ebit.role} · ${ebit.label}`} />

				<AOProject {...ao} number='05' title={ao.company} role={`${ao.role} · ${ao.roleDetail}`} />

				<FreelanceProject
					number='06 — FREELANCE'
					title='Freelance Projects'
					role='Web Developer & Designer · Various Clients'
					projects={[
						{ name: animalysis.company, description: animalysis.description[0] },
						{ name: narbon.company, description: narbon.description[0] },
					]}
				/>
			</div>
		</div>
	);
};

import { Project } from '@/types';
import { MagazineSectionA } from './MagazineSectionA';
import { MagazineSectionB } from './MagazineSectionB';
import { MagazineSectionC } from './MagazineSectionC';
import { MagazineSectionD } from './MagazineSectionD';
import { MagazineSectionE } from './MagazineSectionE';
import { MagazineSectionMulti } from './MagazineSectionMulti';
import { getProjectAnchorId } from '../../_lib';

const MagazineCollectionPageDecorations = () => (
	<>
		<div className='deco-circle top-[10%] right-[8%] h-35 w-35' />
		<div className='deco-circle top-[48%] left-[3%] h-25 w-25' />
		<div className='deco-circle right-[15%] bottom-[18%] h-30 w-30' />
		<div className='deco-line top-[26%] left-0 w-[40%]' />
		<div className='deco-line right-0 bottom-[32%] w-[35%]' />
		<div className='deco-line top-[60%] left-[20%] w-[25%] rotate-15' />
	</>
);

const getNumberProp = (i: number) => (i + 1).toString().padStart(2, '0');

type MagazineCollectionPageProps = {
	projects: Project[];
};

export const MagazineCollectionPage = ({ projects }: MagazineCollectionPageProps) => {
	const freelanceIndex = projects.findIndex((p) => p.id === 'animalysis');
	const freelanceProjects = projects.filter((p) => p.freelance);

	return (
		<div className='relative pt-20 vt-m-page'>
			<MagazineCollectionPageDecorations />

			<div className='relative z-10 space-y-24 md:space-y-40 lg:space-y-32'>
				{projects.map(({ id, company, role, roleDetail, label, location, ...project }, index) =>
					id === 'bounce' ? (
						<MagazineSectionA
							{...project}
							key={id}
							sectionId={getProjectAnchorId(id)}
							number={getNumberProp(index)}
							megaTitle='BOUNCE'
							title={company}
							subtitle={`${role} · ${label}`}
						/>
					) : id === 'meco' ? (
						<MagazineSectionB
							{...project}
							key={id}
							sectionId={getProjectAnchorId(id)}
							number={getNumberProp(index)}
							megaTitle='MECO'
							title={company}
							preTitle={`${label} · ${location}`}
							subtitle={role}
						/>
					) : id === 'tt' ? (
						<MagazineSectionC
							{...project}
							key={id}
							sectionId={getProjectAnchorId(id)}
							number={getNumberProp(index)}
							title={company}
							subTitle={`${role} · ${label}`}
						/>
					) : id === 'ebit' ? (
						<MagazineSectionD
							{...project}
							key={id}
							sectionId={getProjectAnchorId(id)}
							number={getNumberProp(index)}
							title={company}
							subtitle={`${role} · ${label}`}
						/>
					) : id === 'ao' ? (
						<MagazineSectionE
							{...project}
							key={id}
							sectionId={getProjectAnchorId(id)}
							number={getNumberProp(index)}
							megaTitle='AO.COM'
							preTitle={label}
							title={company}
							subtitle={`${role} · ${roleDetail}`}
						/>
					) : null,
				)}
				<MagazineSectionMulti
					number={`${getNumberProp(freelanceIndex)} — FREELANCE`}
					title='Freelance Projects'
					subtitle='Web Developer & Designer · Various Clients'
					entries={freelanceProjects.map(({ id, company, description }) => ({
						sectionId: id,
						title: company,
						description,
					}))}
				/>
			</div>
		</div>
	);
};

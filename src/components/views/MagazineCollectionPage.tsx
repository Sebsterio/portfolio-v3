import { Project } from '@/types';
import { VT } from '@/lib/transitions/components/ViewTransition';
import { getProjectAnchorId } from '@/app/projects/_lib';
import { MagazineSectionA } from '@/components/content/MagazineSectionA';
import { MagazineSectionB } from '@/components/content/MagazineSectionB';
import { MagazineSectionC } from '@/components/content/MagazineSectionC';
import { MagazineSectionD } from '@/components/content/MagazineSectionD';
import { MagazineSectionE } from '@/components/content/MagazineSectionE';
import { MagazineSectionMulti } from '@/components/content/MagazineSectionMulti';

const MagazineCollectionPageDecorations = () => (
	<>
		<div className='decorative-circle top-[10%] right-[8%] h-35 w-35' />
		<div className='decorative-circle top-[48%] left-[3%] h-25 w-25' />
		<div className='decorative-circle right-[15%] bottom-[18%] h-30 w-30' />
		<div className='decorative-line top-[26%] left-0 w-[40%]' />
		<div className='decorative-line right-0 bottom-[32%] w-[35%]' />
		<div className='decorative-line top-[60%] left-[20%] w-[25%] rotate-15' />
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
		<VT.Div slot='vt-right' className='relative pt-20'>
			<MagazineCollectionPageDecorations />

			<div className='relative z-10 space-y-24 md:space-y-40 lg:space-y-36'>
				{projects.map(({ id, company, role, roleDetail, label, location, images, ...project }, index) =>
					id === 'bounce' ? (
						<MagazineSectionA
							{...project}
							key={id}
							sectionId={getProjectAnchorId(id)}
							number={getNumberProp(index)}
							megaTitle='BOUNCE'
							title={company}
							subtitle={`${role} · ${label}`}
							imageMain={images.promo[0]}
							imageAside={images.promo[1]}
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
							imageMain={images.promo[0]}
						/>
					) : id === 'ebit' ? (
						<MagazineSectionD
							{...project}
							key={id}
							sectionId={getProjectAnchorId(id)}
							number={getNumberProp(index)}
							title={company}
							subtitle={`${role} · ${label}`}
							imageMain={images.promo[0]}
							imageAside={images.promo[1]}
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
							imageMain={images.promo[0]}
							imageAside={images.promo[1]}
						/>
					) : null,
				)}
				<MagazineSectionMulti
					number={`${getNumberProp(freelanceIndex)} — FREELANCE`}
					title='Freelance Projects'
					subtitle='Web Developer & Designer · Various Clients'
					entries={freelanceProjects.map(({ id, company, description, images }) => ({
						sectionId: id,
						title: company,
						description,
						image: images.promo[0],
					}))}
				/>
			</div>
		</VT.Div>
	);
};

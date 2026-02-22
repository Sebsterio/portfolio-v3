import { BounceProject } from './magazine/BounceProject';
import { MecoProject } from './magazine/MecoProject';
import { TTEducationProject } from './magazine/TTEducationProject';
import { EbitProject } from './magazine/EbitProject';
import { AOProject } from './magazine/AOProject';
import { FreelanceProject } from './magazine/FreelanceProject';

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

export const MagazineCollectionPage = () => {
	return (
		<div className='relative pt-20'>
			<MagazineCollectionPageDecorations />

			<div className='relative z-10 space-y-24 md:space-y-40 lg:space-y-32'>
				<BounceProject />
				<MecoProject />
				<TTEducationProject />
				<EbitProject />
				<AOProject />
				<FreelanceProject />
			</div>
		</div>
	);
};

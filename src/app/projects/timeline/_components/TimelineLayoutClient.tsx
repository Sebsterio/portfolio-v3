'use client';

// import { PageTransition } from '@/lib/transitions/PageTransition';
import { useParams } from 'next/navigation';

type Props = {
	list: React.ReactNode;
	detail: React.ReactNode;
	hasDetail: boolean;
};

export function TimelineLayoutClient({ list, detail, hasDetail }: Props) {
	return (
		<div>
			<h1>TESTING</h1>

			<div className={hasDetail ? 'hidden' : ''}>
				<>{list}</>
			</div>

			<div className={!hasDetail ? 'hidden' : ''}>
				<>{detail}</>
			</div>
		</div>
	);

	// return (
	// 	<div className={`flex transition-all duration-300 ${hasDetail ? 'gap-8' : ''}`}>
	// 		<div className={`shrink-0 transition-all duration-300 ${hasDetail ? 'w-72' : 'w-full'}`}>
	// 			<>{list}</>
	// 		</div>
	// 		<>{detail}</>
	// 	</div>
	// );
}

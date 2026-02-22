interface TechTagsProps {
	tags: string[];
}

export function TechTags({ tags }: TechTagsProps) {
	return (
		<div className='flex flex-wrap gap-2 md:gap-2.5 mt-6 md:mt-8'>
			{tags.map((tag) => (
				<span key={tag} className='tech-tag'>
					{tag}
				</span>
			))}
		</div>
	);
}

interface TechTagsProps {
	tags: string[];
}

export function TechTags({ tags }: TechTagsProps) {
	return (
		<div className='mt-6 flex flex-wrap gap-2 md:mt-8 md:gap-2.5'>
			{tags.map((tag) => (
				<span key={tag} className='tech-tag'>
					{tag}
				</span>
			))}
		</div>
	);
}

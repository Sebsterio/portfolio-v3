interface PanelContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function PanelContainer({ children, className }: PanelContainerProps) {
	return (
		<div className={className}>
			<div
				className='absolute inset-0 rounded-[28px] pointer-events-none'
				style={{
					background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 20%, transparent 50%)`,
				}}
			/>
			<div className='relative z-10'>{children}</div>
		</div>
	);
}

import './styles.css';

interface ShowcaseCardProps {
	icon: string;
	title: string;
	text: string;
}

const ShowcaseCard = ({ icon, title, text }: ShowcaseCardProps) => {
	return (
		<div className='showcase-card'>
			<div className='card-icon'>{icon}</div>
			<div className='card-title'>{title}</div>
			<div className='card-text'>{text}</div>
		</div>
	);
};

export default ShowcaseCard;

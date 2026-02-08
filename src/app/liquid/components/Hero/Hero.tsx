import './styles.css';
import ShowcaseCard from '../ShowcaseCard/ShowcaseCard';

const Hero = () => {
	return (
		<section className='hero'>
			<div className='hero-content'>
				<div className='hero-label'>Senior Developer</div>
				<h1>
					<span className='chrome-text'>CRAFTING</span>
					<span className='accent-word'>LIQUID</span>
					<span className='chrome-text'>INTERFACES</span>
				</h1>
				<p className='hero-description'>
					Where design meets performance. Creating fluid, responsive experiences that push the boundaries of modern web development.
				</p>
				<div className='btn-group'>
					<a href='#work' className='btn btn-primary'>
						Explore Portfolio
					</a>
					<a href='#contact' className='btn btn-secondary'>
						Let's Collaborate
					</a>
				</div>
			</div>

			<div className='showcase-cards'>
				<ShowcaseCard icon='⚡' title='Blazing Fast' text='Optimized performance with Core Web Vitals scores in the 90s' />
				<ShowcaseCard icon='🎨' title='Pixel Perfect' text='Meticulous attention to design details and fluid animations' />
				<ShowcaseCard icon='🚀' title='Future Ready' text='Built with cutting-edge tech and scalable architecture' />
			</div>
		</section>
	);
};

export default Hero;

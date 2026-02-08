import LiquidBackground from './components/LiquidBackground/LiquidBackground';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

export default function LiquidPage() {
	return (
		<main>
			<LiquidBackground />
			<div className='container'>
				<Header />
				<Hero />
			</div>
		</main>
	);
}

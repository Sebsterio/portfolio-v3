import './styles.css';

const Header = () => {
	return (
		<header>
			<nav>
				<div className='logo'>FLUX</div>
				<ul className='nav-links'>
					<li>
						<a href='#work'>Work</a>
					</li>
					<li>
						<a href='#expertise'>Expertise</a>
					</li>
					<li>
						<a href='#about'>About</a>
					</li>
					<li>
						<a href='#contact'>Contact</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;

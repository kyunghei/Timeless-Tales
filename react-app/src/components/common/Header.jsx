import hourglass from '../../assets/hourglass.png';

function Header() {
    return (
        <header className='header'>
            <img src={hourglass} alt="Logo image of an hourglass with stars and swirls" className='header-logo' />
            <a href="/" className='header-text'>Timeless Tales</a>
        </header>
    );
}

export default Header
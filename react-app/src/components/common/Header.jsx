import logo from '../../assets/logo.webp';

function Header() {
    return (
        <header>
            <img src={logo} alt="Logo" width="50px" height="50px" />
            <a href="/">Timeless Tales</a>
        </header>
    );
}

export default Header
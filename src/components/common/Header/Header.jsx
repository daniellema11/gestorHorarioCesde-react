import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../../assets/images/logo.png'

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Logo CESDE" />
      </Link>
      <nav className="header__nav">
        <Link to="/login">Iniciar Sesión</Link>
        <Link to="/soporte">Soporte</Link>
      </nav>
    </header>
  )
}

export default Header

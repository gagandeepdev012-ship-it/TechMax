import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Navbar() {
  const { user, logout, dark, toggle } = useAuth(), nav = useNavigate();
  const L = (to, t) => <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : '')}>{t}</NavLink>;
  return <nav><div className="wrap"><Link to="/" className="logo">TECH<b>MAX</b></Link>
    {user?.role === 'admin' ? <>{L('/admin', 'Dashboard')}{L('/admin', 'Queries')}</> : <>{L('/', 'Home')}{L('/ask', 'Ask Query')}{user && L('/my-queries', 'My Queries')}{user && L('/profile', 'Profile')}{L('/#about', 'About')}</>}
    {user ? <><span className="mute">{user.name}</span><a href="#" onClick={(e) => { e.preventDefault(); logout(); nav('/'); }}>Logout</a></> : <>{L('/login', 'Login')}{L('/register', 'Register')}</>}
    <a href="#" onClick={(e) => { e.preventDefault(); toggle(); }}>{dark ? 'Light' : 'Dark'}</a></div></nav>;
}

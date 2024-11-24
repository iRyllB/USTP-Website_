import { useState } from 'react'
import './navBar.css'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/logo.png'

export default function NavigationBar() {
    const [navbar, setNavbar] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const changeBackground = () => {
        if (window.scrollY >= 300) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', changeBackground)

    const NavLinkStyle = ({ isActive }) => ({
        color: isActive ? '#ffffffff' : '#000000',
        fontWeight: isActive ? 'medium' : 'bold',
        backgroundColor: isActive ? '#498CF6' : null,
        paddingTop: isActive ? 5 : null,
        paddingBottom: isActive ? 5 : null,
        paddingRight: isActive ? 12 : null,
        paddingLeft: isActive ? 12 : null,
        borderRadius: isActive ? 20 : null,
    })

    const NavLinkStyleTwo = ({ isActive }) => ({
        color: isActive ? '#ffffffff' : '#000000',
        fontWeight: isActive ? 'medium' : 'bold',
        backgroundColor: isActive ? '#EB483B' : null,
        paddingTop: isActive ? 5 : null,
        paddingBottom: isActive ? 5 : null,
        paddingRight: isActive ? 12 : null,
        paddingLeft: isActive ? 12 : null,
        borderRadius: isActive ? 20 : null,
    })

    const NavLinkStyleThree = ({ isActive }) => ({
        color: isActive ? '#ffffffff' : '#000000',
        fontWeight: isActive ? 'medium' : 'bold',
        backgroundColor: isActive ? '#4EA865' : null,
        paddingTop: isActive ? 5 : null,
        paddingBottom: isActive ? 5 : null,
        paddingRight: isActive ? 12 : null,
        paddingLeft: isActive ? 12 : null,
        borderRadius: isActive ? 20 : null,
    })

    const NavLinkStyleFour = ({ isActive }) => ({
        color: isActive ? '#ffffffff' : '#000000',
        fontWeight: isActive ? 'medium' : 'bold',
        backgroundColor: isActive ? '#ffce44' : null,
        paddingTop: isActive ? 5 : null,
        paddingBottom: isActive ? 5 : null,
        paddingRight: isActive ? 12 : null,
        paddingLeft: isActive ? 12 : null,
        borderRadius: isActive ? 20 : null,
    })

    return (
        <nav className={navbar ? "nav-bar" : "nav-bar active"}>
            <div className='top-left'>
                <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                    <img src={Logo} alt='GDSC' />
                </NavLink>
            </div>

            <div className="hamburger" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`top-center ${isOpen ? 'mobile-menu-active' : ''}`}>
                <ul>
                    <li>
                        <NavLink style={NavLinkStyle} to="/" className='items' onClick={() => setIsOpen(false)}>Home</NavLink>
                    </li>

                    <li>
                        <NavLink style={NavLinkStyleTwo} to="/aboutus" className='items' onClick={() => setIsOpen(false)}>About us</NavLink>
                    </li>

                    <li>
                        <NavLink style={NavLinkStyleThree} to="/news" className='items' onClick={() => setIsOpen(false)}>News</NavLink>
                    </li>

                    <li>
                        <NavLink style={NavLinkStyleFour} to="/events" className='items' onClick={() => setIsOpen(false)}>Events</NavLink>
                    </li>
                    
                    <li className="mobile-register">
                        <button className={navbar ? "reg-btn active" : "reg-btn"}>
                            Register Now
                        </button>
                    </li>
                </ul>
            </div>

            <div className='top-right'>
                <button className={navbar ? "reg-btn active" : "reg-btn"}>
                    Register Now
                </button>
            </div>
        </nav>
    )
}

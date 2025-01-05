import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <NavLink to="/virtual-try-on-modes" className="nav-link"
                    style={({ isActive }) => ({
                        textDecoration: isActive ? 'underline' : 'none',
                        marginLeft: '180px'
                    })}>
                    Virtual Try On
                </NavLink>
                <NavLink to="/foundation-shade-match" className="nav-link"
                    style={({ isActive }) => ({
                        textDecoration: isActive ? 'underline' : 'none'
                    })}>
                    Foundation Shade Match
                </NavLink>
                <NavLink to="/best-sellers" className="nav-link"
                    style={({ isActive }) => ({
                        textDecoration: isActive ? 'underline' : 'none'
                    })}>
                    Best Sellers
                </NavLink>
                <NavLink to="/makeup" className="nav-link"
                    style={({ isActive }) => ({
                        textDecoration: isActive ? 'underline' : 'none'
                    })}>
                    Makeup
                </NavLink>
                <NavLink to="/accessory-catalog" className="nav-link"
                    style={({ isActive }) => ({
                        textDecoration: isActive ? 'underline' : 'none'
                    })}>
                    Accessories
                </NavLink>
            </div>
            <div className="navbar-icons">
                <a href="#"><FontAwesomeIcon icon={faSearch} /></a>
                <a href="#"><FontAwesomeIcon icon={faShoppingCart} /></a>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            {isOpen && (
                <div className="mobile-menu">
                    <div className="mobile-navbar-links">
                        <NavLink to="/virtual-try-on-modes" className="nav-link" onClick={closeMenu}>
                            Virtual Try On
                        </NavLink>
                        <NavLink to="/foundation-shade-match" className="nav-link" onClick={closeMenu}>
                            Foundation Shade Match
                        </NavLink>
                        <NavLink to="/best-sellers" className="nav-link" onClick={closeMenu}>
                            Best Sellers
                        </NavLink>
                        <NavLink to="/makeup" className="nav-link" onClick={closeMenu}>
                            Makeup
                        </NavLink>
                        <NavLink to="/accessory-catalog" className="nav-link" onClick={closeMenu}>
                            Accessories
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

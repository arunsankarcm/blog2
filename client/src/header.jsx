import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Make sure to create a corresponding CSS file

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>#theBlog</h1>
            </div>
            <nav className="navigation">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </nav>
        </header>
    );
};

export default Header;

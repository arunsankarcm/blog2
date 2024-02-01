import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext'; // Import useAuth hook
import './header.css';

const PostsHeader = () => {
    const { logout } = useAuth(); // Access logout function
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the logout function from auth context
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>#theBlog</h1>
            </div>
            <nav className="navigation">
                <Link to="/create-post">Create a post</Link>
                <button onClick={handleLogout} className="button-style">Logout</button>
            </nav>
        </header>
    );
};

export default PostsHeader;

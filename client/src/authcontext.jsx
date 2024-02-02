import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Add an admin state

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const adminStatus = localStorage.getItem('isAdmin') === 'true'; // Get the admin status from localStorage
        if (token) {
            setIsLoggedIn(true);
            setIsAdmin(adminStatus); // Set admin status
        }
    }, []);

    const login = (token, adminStatus) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('isAdmin', adminStatus); // Store the admin status
        setIsLoggedIn(true);
        setIsAdmin(adminStatus); // Update the admin state
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin'); // Remove the admin status
        setIsLoggedIn(false);
        setIsAdmin(false); // Update the admin state
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

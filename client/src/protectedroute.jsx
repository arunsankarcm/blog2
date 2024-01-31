import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authcontext'; // Import useAuth

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth(); // Use the AuthContext

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

import React, { useState } from 'react';
import axios from 'axios'; 
import { useAuth } from './authcontext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/login', { username, password });
            localStorage.setItem('authToken', response.data.token);
            login(response.data.token);
            navigate('/posts');
            // Handle response (e.g., storing the JWT, navigating to another page)
        } catch (error) {
            console.error('Login error:', error);
            // Handle error (e.g., showing an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

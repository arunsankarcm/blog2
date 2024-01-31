import React, { useState } from 'react';
import axios from 'axios';



const Signup = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/users/signup', userData);
            // Handle success (e.g., show success message, redirect to login)
        } catch (error) {
            console.error('Signup error:', error);
            // Handle error (e.g., show error message)
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;

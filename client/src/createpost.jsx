import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/createpost.css';

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            await axios.post('http://localhost:3000/posts/create-post', 
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/posts');
            // Handle the successful creation (e.g., redirecting to the posts page)
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle errors (e.g., displaying an error message)
        }
    };

    return (
        <div className='create-post-container'>
            <form className="create-post-form" onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;

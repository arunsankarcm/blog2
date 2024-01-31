import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './posts.css';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:3000/posts', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handlePostClick = (postID) => {
        navigate(`/posts/${postID}`);
    };

    const handleCreatePostClick = () => {
        navigate('/create-post');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={handleCreatePostClick} className="create-post-button">Create Post</button>
            <div className="posts-grid">
                {posts.map(post => (
                    <div key={post._id} className="post-card" onClick={() => handlePostClick(post._id)}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './posts.css';
import { useNavigate } from 'react-router-dom';
import PostsHeader from './postsheader';


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



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <PostsHeader />
            <div className="posts-grid">
                {posts.map(post => (
                    <div key={post._id} className="post-card" onClick={() => handlePostClick(post._id)}>
                        <h2>{post.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Post;

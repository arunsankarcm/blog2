import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { postID } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const postResponse = await axios.get(`http://localhost:3000/posts/${postID}`, config);
                setPost(postResponse.data);

                const commentsResponse = await axios.get(`http://localhost:3000/posts/${postID}/comments`, config);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postID]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post(
                `http://localhost:3000/posts/${postID}/add-comment`,
                { message: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };
    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <h3>Comments:</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment._id}>{comment.message}</li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <button type="submit">Submit Comment</button>
            </form>
        </div>
    );
};

export default PostDetails;

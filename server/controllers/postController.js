const Post = require('../models/post');
const Comment = require('../models/comment')

//get posts
exports.getPost = async(req,res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
};

// POST create a new post
exports.createPost = async (req,res) => {
    try {
        const { title, content, publish } = req.body;
        if(!title || !content) {
            return res.status(400).json({message:'Title and content are required'});
        }
        const newPost = new Post({
            title,
            content,
            publish: typeof publish === 'boolean' ? publish : true,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }catch(err) {
        res.status(500).json({message:err.message});
    }
};

//get particular post
exports.getPostbyID = async(req,res) => {
    try{
        const postID = req.params.postID;
        const post = await Post.findById(postID);
        if(!postID){
            res.status(404).json({message:'post not found'})
        }
        res.status(200).json(post);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

// DELETE a post by ID
exports.deletePost = async (req, res) => {
    try {
        const postID = req.params.postID;
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await Post.deleteOne({ _id: postID });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//add comment
exports.addCommentToPost = async (req, res) => {
    try {
        const { postID } = req.params;
        const { message } = req.body;
        const userId = req.user.userId; // Assuming the JWT includes the user ID

        const comment = new Comment({ message, user: userId });
        const savedComment = await comment.save();

        await Post.findByIdAndUpdate(postID, { $push: { comments: savedComment._id } });

        res.status(201).json({ message: 'Comment added successfully', comment: savedComment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//delete comment
exports.deleteComment = async (req, res) => {
    const { postID, commentID } = req.params;
    try {
        // Find the post
        const post = await Post.findById(postID);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the comment exists in the post
        const commentExists = post.comments.includes(commentID);
        if (!commentExists) {
            return res.status(404).json({ message: 'Comment not found in the post' });
        }

        // Delete the comment from the comments collection
        await Comment.findByIdAndDelete(commentID);

        // Remove the comment reference from the post
        await Post.findByIdAndUpdate(postID, { $pull: { comments: commentID } });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
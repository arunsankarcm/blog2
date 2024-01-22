const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

router.get('/:postID', post_controller.getPostbyID);
router.get('/', post_controller.getPost);

router.post('/create-post', authenticateToken, post_controller.createPost)
router.delete('/delete-post/:postID', authenticateToken, isAdmin, post_controller.deletePost)

router.post('/add-comment/:postID', authenticateToken, post_controller.addCommentToPost);
router.delete('/delete-comment/:postID/:commentID', authenticateToken, isAdmin, post_controller.deleteComment);



module.exports = router;


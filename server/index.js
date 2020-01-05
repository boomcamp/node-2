const express = require('express');

const { user } = require('./userControllers/user');
const { profile } = require('./userControllers/userProfiles');
const { createPost, getUserPosts, getPost } = require('./userControllers/posts');
const { comments } = require('./userControllers/comments');

const db = {
	users: {
		id: 0,
		data: []
	},
	profiles: {
		id: 0,
		data: []
	},
	posts: {
		id: 0,
		data: []
	},
	comments: {
		id: 0,
		data: []
	}
};

const app = express()
app.use(express.json())

app.set('db', db)
// Users
app.post('/sign-up', user)
//Profiles
app.patch('/profile/:userId', profile)
// Posts
app.post('/posts', createPost)
app.get('/user/:userId/posts', getUserPosts)
app.get('/posts/:postId', getPost)
// Comments
app.post('/comments', comments)
// Debug
app.get('/debug', (req, res) => {
	res.status(200).json(req.app.get('db'))
})

const PORT = 3000

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
})
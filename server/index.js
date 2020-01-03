const express = require('express');

const { signUp } = require('./controllers/signUp');
const { updateProfile } = require('./controllers/profiles');
const { createPost, getUserPosts, getPost } = require('./controllers/posts');
const { createComments } = require('./controllers/comments');

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

const app = express();
app.use(express.json());

app.set('db', db);
// Users
app.post('/sign-up', signUp);
//Profiles
app.patch('/profile/:userId', updateProfile);
// Posts
app.post('/posts', createPost);
app.get('/user/:userId/posts', getUserPosts);
app.get('/posts/:postId', getPost);
// Comments
app.post('/comments', createComments);
// Debug
app.get('/debug', (req, res) => {
	res.status(200).json(req.app.get('db'));
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

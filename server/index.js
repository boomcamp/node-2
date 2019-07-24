const express = require('express');

const users = require('./file/users.js');
const profiles = require('./file/profiles.js');
const posts = require('./file/posts.js');
const comments = require('./file/comments.js');

const db = {
  users: {
    id: 0,
    data: [],
  },
  profiles: {
    id: 0,
    data: [],
  },
  posts: {
    id: 0,
    data: [],
  },
  comments: {
    id: 0,
    data: [],
  },
};
const app = express();
app.use(express.json());
app.set('db', db);

const port = 3000;

app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});

app.post('/sign-up', users.signUp);

app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
});

app.patch('/profiles/:userId', profiles.updateProf);

app.post('/posts', posts.createPost);

app.post('/comments', comments.createCom);

app.get('/profile', profiles.getProf);

app.get('/user/:userId/posts', posts.userPosts)

app.get('/posts/:postId', posts.postComments)



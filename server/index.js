const express = require('express');

const users = require('./controllers/users.js');
const profiles = require('./controllers/profiles.js');
const posts = require('./controllers/posts.js');
const comments = require('./controllers/comments.js');

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

app.post('/sign-up', users.signUp);

app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
});

app.get('/profile', profiles.getProf);
app.patch('/profiles/:userId', profiles.updateProf);

app.post('/posts', posts.createPost);

app.post('/comments', comments.createCom);

app.get('/user/:userId/posts', posts.userPosts)

const port = 3000;

app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});




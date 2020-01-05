const express = require('express');
const users = require('./controllers/users.js');
const profile = require('./controllers/profiles.js');
const posts = require('./controllers/posts.js');
const comments = require('./controllers/comments');

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

app.set('db', db);
app.use(express.json());

//User
app.post('/sign-up', users.createUser);
//Profile
app.patch('/profile/:userID', profile.update);
app.get('/profile', profile.fetchProfile);
//Posts
app.post('/posts', posts.createPost);
//Comments
app.post('/comments', comments.addComment);
app.get('/user/:userID/posts', posts.fetchUserPosts)
app.get('/posts/:postID', posts.fetchPost)
//Output database
app.get('/debug', (req, res) => {
  res.status(200).json(req.app.get('db'))
})

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})
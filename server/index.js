const express = require('express');
const su = require('./controller/createUsers.js');
const profile = require('./controller/profile.js');
const posts = require('./controller/posts.js');
const comments = require('./controller/comments.js');

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
app.post('/sign-up', su.createUser)
app.get('/profile', profile.get);
app.patch('/profile/:userId', profile.update);
app.post('/posts', posts.create);
app.get('/user/:userId/posts', posts.getUserPosts)
app.get('/posts/:postId', posts.getPost)
app.post('/comments', comments.create);
app.get('/debug', (req, res) => {
  res.status(200).json(req.app.get('db'))
})

const port = 3002;

app.listen(port, () => { console.log(`Server listening on port: ${port}`); });
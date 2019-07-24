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

const express = require('express');
const signup = require('./sign_up.js');
const profile = require('./profile.js');
const posts = require('./post.js');
const comments = require('./comments.js');
const app = express();

app.set('db', db);

app.use(express.json());

app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
})

app.post('/signup', signup.signup);

app.get('/profiles/',(req, res) => {
    const db = req.app.get('db')
    res.status(200).json(db.profiles.data)
});
app.get('/profile',profile.profile)
app.patch('/profile/:userId',profile.update)

app.post('/posts', posts.create);
app.get('/user/:userId/posts', posts.userposts)
app.get('/posts/:postId', posts.comments)

app.post('/comments', comments.create);


const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const express = require('express');
const signup = require('./sign-up.js');
const profile = require('./profiles.js');
const posts = require('./posts.js');
const comments = require('./comments.js');

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

app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
})

app.post('/signup', signup.signUp); 

app.get('/profiles/',(req, res) => {
    const db = req.app.get('db')
    res.status(200).json(db.profiles.data)
});
app.get('/profile',profile.profiles)
app.patch('/profile/:userId',profile.update)

app.post('/posts', posts.create);
app.get('/user/:userId/posts', posts.userPosts)
app.post('/posts', posts.create); 

app.get('/posts/:postId', posts.comments)
app.post('/comments', comments.create);


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
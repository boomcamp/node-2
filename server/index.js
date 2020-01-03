const express = require('express');

const user = require('./controllers/user');
const profile = require('./controllers/userProfile');
const posts = require('./controllers/post');
const comment = require('./controllers/comments');

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

// new user
app.post('/sign-up', user.signUp);

// profile
app.patch('/profile', profile.userProfile);
app.get('/profile/:userId', profile.getProfile);

// posts
app.post('/posts', posts.newPost);
app.get('/posts/:userId/posts', getAllPost)
app.get('/posts/:postId', posts.getPosts)

// comments
app.post('/comments', comment.newComment);

app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
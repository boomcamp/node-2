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

app.post('/sign-up', user.signUp);
app.patch('/profile', profile.userProfile);
app.post('/posts', posts.post);
app.post('/comments', comment.comment);
app.get('/profile?email');

app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
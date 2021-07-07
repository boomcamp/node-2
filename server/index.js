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

// Step 3 & 4: Creating Users, Creating User Profiles
app.post('/sign-up', user.signUp);

// Step 5: Creating Posts
app.post('/posts', posts.newPost);

// Step 6: Adding Comment to Posts
app.post('/comments', comment.newComment);

// Step 7: Fetching our Profiles
app.get('/profile', profile.getProfile);
// Step 7: Fetching our Profiles by param(ID) and query(email)
app.get('/profile/:userId', profile.updateProfile);

// Step 8: Fetching all posts
app.get('/posts/:userId/posts', posts.getAllPost);

//Step 9: Viewing Post
app.get('/posts/:postId', posts.getPosts);




app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
});

const port = 3002;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
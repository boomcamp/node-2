const express = require('express')
const user = require('./controllers/userController')
const profile = require('./controllers/profileController')
const post = require('./controllers/postController')
const comment = require('./controllers/commentController')

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

const PORT = 3000

//user
app.post('/sign-up', user.createUser)

//profile
app.patch('/update/:id', profile.updateProfile)
app.get('/profile', profile.fetchProfile)

//posts
app.get('/posts/:postId', post.viewPost);
app.post('/posts', post.createPost)
app.get('/user/:userId/posts', post.getPosts);

//comments
app.post('/comments', comment.addComment)

//debug
app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});


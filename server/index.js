const express = require('express');
const user = require('./controllers.js')

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

// MIDDLEWARE
app.use(express.json())
app.use(express.static(`${__dirname}/../build`));


// endpoints

app.post('/sign-up', user.signUp);

app.patch('/updateProfile/:id', user.updateProfile);

app.post('/posts', user.posts);

app.post('/comments', user.comments);

app.get('/profile', user.viewProfile);

app.get('/user/:userId/posts', user.viewMyProfile);

app.get('/posts/:postId', user.viewSinglePost);

app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
  })


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running to port ${PORT}`)
})
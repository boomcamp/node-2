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

const express = require('express')
const user = require('./controllers/User')
const profile = require('./controllers/Profile')
const posts = require('./controllers/Posts')
const comments = require('./controllers/Comments')

const app = express();
app.use(express.json())
app.set('db', db);
  

  app.get('/debug', user.debug)

  app.post('/sign-up', user.createUser)

  app.get('/profile', profile.getProfile)
  app.patch('/profile/:id', profile.updateProfile)

  app.post('/posts', posts.createPost)
  app.get('/user/:userId/posts', posts.getAllposts)
  app.get('/posts/:postId', posts.getPost)

  app.post('/comments', comments.createComment)
  



  const PORT = 3003
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
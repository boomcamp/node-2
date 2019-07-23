const express = require('express');
const sign_up = require('./controllers/sign-up')
const profiles= require('./controllers/profile')
const userPost = require('./controllers/posts')
const comment = require('./controllers/comments')

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
app.set('db',db);
app.use(express.json());
//sign-up
app.post('/sign-up', sign_up.signUp,(req,res)=>{
    res.json({message:'You have log in'});
})

//Profile
 app.get('/profile/',(req, res) => {
    const db = req.app.get('db')
    res.status(200).json(db.profiles.data)
 })

 app.get('/profiles',profiles.profiles)
 app.patch('/profiles/:userId',profiles.update)

 //Post
 app.post('/userPost', userPost.createPost);
 app.get('/userPost/:userId/posts', userPost.userPost)

 app.post('/comments', comment.createComment);

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
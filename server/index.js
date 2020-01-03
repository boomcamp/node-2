const express = require('express')

//Imports
const user = require('./controller/User')
const profile = require('./controller/Profile')
const post = require('./controller/Post')
const comment = require('./controller/Comment')

//Database
const db = require('./Db')

const app = express()

app.set('db', db);

app.use(express.json());

//Users
app.post('/sign-up', user.create)
app.get('/debug', (req, res) => {
  res.status(200).json(req.app.get('db'))
})

//Profiles
app.patch('/profile/:id', profile.updateProfile);
app.get('/profile', profile.fetchProfile);


//Comments
app.post("/comments", comment.Comment);

//Posts
app.post("/posts", post.create);
app.get("/posts/:postId", post.view);
app.get("/user/:userId/posts", post.getPosts);


const port = 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
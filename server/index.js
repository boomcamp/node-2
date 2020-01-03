const express = require('express');
const users = require('./controllers/users.js');
const profile = require('./controllers/profiles.js');
// const posts = require('./controllers/post.jss');
// const comments = require('./controllers/comments.js');

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

app.post('/sign-up', users.createUser);
app.get('/profile', profile.get);
app.patch('/profile/:userId', profile.update);
app.get('/debug', (req, res) => {
  res.status(200).json(req.app.get('db'))
})

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})
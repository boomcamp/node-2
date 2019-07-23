const express = require('express');

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
app.use(express.json());
app.set('db', db);

const port = 3000;

app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});

app.post('/sign-up', (req, res) => {
  const db = req.app.get('db')
  const { email, password } = req.body;
  const newUser = {id:db.users.id, password, email}

  db.users.data.push(newUser);
  db.users.id++;

  db.profiles.data.push({ userId: newUser.id, thumbnail: null, about: ''});
  db.profiles.id++;

  res.status(201).json(newUser);
});

app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
});

app.patch('/profiles/:userId', (req, res) => {
  const db = req.app.get('db');  
  const {userId} = req.params;
  const {email, password} = req.body;
  const profile = db.profiles.data.findIndex(prof => prof.userid === parseInt(userId));

  if(profile){
    db.user.data[userId] = {email, password}
  }else{
    res.status(500).send('Error')
  }

});

app.post('/posts', (req, res) => {
  const db = req.app.get('db');
  const { userId, post } = req.body;

  const newPost = {id: db.posts.id, userId, post};

  db.posts.data.push(newPost);
  db.posts.id++;

  res.status(201).json(newPost);
})

app.post('/comments', (req, res) => {
  const db = req.app.get('db');
  const {userId, postId, comment} = req.body;

  const newComment = {id: db.comments.id, userId, postId, comment};

  db.comments.data.push(newComment);
  db.comments.id++;

  res.status(200).json(newComment);
})

app.get('/profile', (req, res) => {
  const db = req.app.get('db');

})


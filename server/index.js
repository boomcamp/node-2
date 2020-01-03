const express = require('express');
const su = require('./controller/createUsers.js');

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

app.post('/sign-up', su.createUser)
app.get('/debug', (req, res) => {
  res.status(200).json(req.app.get('db'))
})

const port = 3002;

app.listen(port, () => { console.log(`Server listening on port: ${port}`); });
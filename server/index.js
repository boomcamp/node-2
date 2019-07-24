const express = require('express');

//Controller
const dc = require('./controllers/databaseController.js');

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

//Middleware
app.use(express.json());
app.use(function(req, res, next) {
	const logString = `[+] ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`;
	console.log(logString)
	next();
})

//Routes
app.get('/debug', dc.debug);

app.post('/sign-up', dc.createUser);
app.patch('/profile/:user', dc.updateProfile);
app.get('/profile', dc.getProfile)
app.post('/posts/:user', dc.createPost);
app.get('/post/:post', dc.getPost);
app.get('/user/:userId/posts', dc.getPosts);
app.post('/comments', dc.createComment);
//

//Listener
const PORT = 3002;
app.listen(PORT, () => {
	console.log(`[+] Server listening on PORT: ${PORT}`);
});
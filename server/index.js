const express = require("express");

//CONTROLLERS
const user = require("./controllers/user");
const profile = require("./controllers/profiles");
const post = require("./controllers/posts");
const comment = require("./controllers/comments");

//DATASTORE
const db = {
  users: {
    id: 0,
    data: []
  },
  profiles: {
    id: 0,
    data: []
  },
  posts: {
    id: 0,
    data: []
  },
  comments: {
    id: 0,
    data: []
  }
};

const app = express();

//MIDDLEWARE
app.set("db", db);
app.use(express.json());

//DEBUG
app.get("/debug", (req, res) => {
  res.status(200).json(req.app.get("db"));
});
//USERS
app.post("/sign-in", user.signIn);
app.post("/sign-up", user.signUp);
//PROFILES
app.get("/profile", profile.fetch);
app.patch("/profile/:userId", profile.update);
//POSTS
app.post("/posts", post.createPost);
app.get("/user/:userId/posts", post.postPerUser);
app.get("/posts/:postId", post.fetchAPost);
//COMMENTS
app.post("/comment", comment.createComment);

//PORT
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server listening d(-_-)b on port ${PORT}`);
});

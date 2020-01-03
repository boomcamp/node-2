const express = require("express");

const user = require("./controllers/user.js");
const profile = require("./controllers/profiles.js");
const posts = require("./controllers/posts.js");
const comments = require("./controllers/comments.js");

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

const PORT = 3000;
const app = express();

app.set("db", db);
app.use(express.json());

// Users
app.post("/sign-up", user.signUp);

// Profiles
app.get("/profile", profile.get);
app.patch("/profile/:userId", profile.update);

// Posts
app.post("/posts", posts.create);
app.get("/user/:userId/posts", posts.getUserPosts);
app.get("/posts/:postId", posts.getPost);

// Comments
app.post("/comments", comments.create);

// Debug
app.get("/debug", (req, res) => {
  res.status(200).json(req.app.get("db"));
});

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});

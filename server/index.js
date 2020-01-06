const express = require("express");

// controllers
const user = require("./controllers/userController");
const profile = require("./controllers/profilesController");
const posts = require("./controllers/postsController");
const comments = require("./controllers/commentsController");

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
app.set("db", db);

app.use(express.json());

const PORT = process.env.PORT || 3007;
// Users
app.post("/sign-up", user.signUp);

// Profiles
app.get("/profile", profile.getProfile);
app.patch("/profile/:userId", profile.updateProfile);

// Posts
app.post("/posts", posts.create);
app.get("/user/:userId/posts", posts.getUserPosts);
app.get("/posts/:postId", posts.getPost);

// Comments
app.post("/comments", comments.createComment);

// Debug
app.get("/debug", (req, res) => {
  res.status(200).json(req.app.get("db"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

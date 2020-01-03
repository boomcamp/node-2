const express = require("express");

const user = require("./controllers/user.js");
const profile = require("./controllers/profiles.js");
const post = require("./controllers/posts.js");
const comment = require("./controllers/comments.js");

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

app.post("/sign-up", user.signUp);
app.post("/sign-in", user.signIn);

app.get("/profile", profile.get);
app.patch("/profile/:userId", profile.update);

app.post("/posts", post.create);
app.get("/user/:userId/posts", post.userPost);
app.get("/posts/:postId", post.posts);

app.post("/comments", comment.create);

app.get("/debug", (req, res) => {
  res.status(200).json(req.app.get("db"));
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const express = require("express");

const signUp = require("./controllers/user");
const profile = require("./controllers/profiles");
const posts = require("./controllers/posts");
const comments = require("./controllers/comments");

const app = express();

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

const port = 3000;

app.set("db", db);
app.use(express.json());

//user
app.post("/sign-up", signUp.createUser);
app.get("/user", signUp.getuser);
//Profiles
app.get("/profile", profile.get);
app.patch("/profile/:userId", profile.update);
//post
app.post("/posts", posts.create);
app.get("/user/:userId/posts", posts.getUserPosts);
app.get("/posts/:postId", posts.getPost);
//comments
app.post("/comments", comments.create);

app.get("/debug", (req, res) => {
  res.status(200).json(req.app.get("db"));
});

app.listen(port, () => console.log(`Server is ready!!`));

const express = require("express");
const signUp = require("./userControllers/signUp.js");
const profile = require("./userControllers/userProfile.js");
const post = require("./userControllers/createPost.js");
const comment = require("./userControllers/comment");

const db = {
  users: {
    id: 0,
    data: []
  },
  profiles: {
    id: 0,
    data: []
  },
  post: {
    id: 0,
    data: []
  },
  comment: {
    id: 0,
    data: []
  }
};
const app = express();

app.set("db", db);

app.use(express.json());

app.post("/signUp", signUp.signUp); //user

app.get("/profile", profile.get); //userProfile

app.patch("/profile/:userId", profile.update); //update profile

app.post("/post", post.create); //create post
app.get("/user/:userId/post", post.getUserPosts); //fetch post

app.post("/comment", comment.comment); // add comment

app.get("/debug", (req, res) => {
  res.status(200).json(req.app.get("db"));
});

const port = 3003;

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});

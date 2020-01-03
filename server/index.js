const express = require("express");

//controller
const addUser = require("./controller/addUser.js");
const addPost = require("./controller/addPosts.js");
const addComment = require("./controller/addComments.js");
const updateProfile = require("./controller/updateProfile.js");
const db = {
  users: {
    data: []
  },
  profiles: {
    data: []
  },
  posts: {
    data: []
  },
  comments: {
    data: []
  }
};

const app = express();

app.set("db", db);
app.use(express.json());
app.use(express.static(__dirname + "/../build"));

const PORT = 4000;

//GetAll data part
app.get("/alldata", function(req, res) {
  res.status(200).json(req.app.get("db"));
});

// Users part
app.post("/sign-up", addUser.register);

//Profile part
app.get("/profile", updateProfile.doGet);
app.patch("/profile/:userId", updateProfile.doUpdate);

//Posts part
app.post("/posts", addPost.createPost);
app.get("/user/:userId/posts", addPost.getUserPosts);
app.get("/posts/:postId", addPost.getPost);

//Comments Part
// Comments
app.post("/comments", addComment.createComment);

//Debugging part
app.get("/debug", (req, res) => {
  res.status(200).json(req.app.get("db"));
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});

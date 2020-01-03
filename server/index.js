const express = require("express");
const user = require("./controllers/users");
const profile = require("./controllers/profiles");
const post = require("./controllers/posts");
const comment = require("./controllers/comments");

const db = {
  users: {
    data: []
  },
  profiles: {
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

const PORT = 3005;

app.get("/all", function(req, res) {
  res.status(200).send(db);
});
//user
app.post("/sign-up", user.User);

//profile
app.patch("/update/:id", profile.updateProf);
app.get("/profile", profile.fetchProf);

//comments
app.post("/comments", comment.Comment);

//posts
app.get("/posts/:postId", post.view);
app.post("/posts", post.create);
app.get("/user/:userId/posts", post.getPosts);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

//debug
app.get("/debug", (req, res) => {
  res.status(200).json(req.app.get("db"));
});

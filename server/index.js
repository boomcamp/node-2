const express = require("express");
const uh = require("./controllers/userHandlers");
const pfh = require("./controllers/profileHandlers");
const ph = require("./controllers/postHandlers");
const ch = require("./controllers/commentHandler");

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

app.set("db", db);

app.use(express.json());

app.post("/sign-up", uh.create);
app.get("/debug", uh.debug);
app.patch("/update-profile/:profileId", pfh.update);
app.post("/addpost", ph.addpost);
app.post("/comment", ch.addcomment);
app.get("/profile", pfh.retrieve);
app.get("/user/:userId/posts", ph.userpost);
app.get("/posts/:postId", ph.getpost)

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`);
});

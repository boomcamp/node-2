const express = require("express");
const fn = require("./endpoints/endpoints");
const db = {
  users: [],
  profiles: [],
  posts: [],
  comments: []
};
const app = express();
const port = 4001;
const baseUrl = `http://localhost:${port}`;

//database
app.set("db", db);

//middleware
app.use(express.json());

//routes
app.post("/sign-in", fn.signIn);
app.post("/sign-up", fn.signUp);

app.patch("/user/:id", fn.updateProfile);
app.post("/posts", fn.createPost);
app.post("/comments", fn.addComment);
app.get("/user/:userId/posts", fn.userPosts);
app.get("/profile", fn.profile);
app.get("/posts/:postId", fn.viewPost);

//database status
app.get("/debug", fn.debug);

app.listen(port, () => {
  console.clear();
  console.log(`Server is running on port ${port} (^.^)\n\n`);
  console.log(` ${baseUrl}/debug`);
});

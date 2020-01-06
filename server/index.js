const express = require("express");

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

//Create User
app.post("/sign-up", (req, res) => {
  const { email, password } = req.body;
  const user = {
    id: db.users.id,
    email,
    password
  };

  db.users.data.push(user);
  db.users.id++;

  const emptyProfile = {
    userId: user.id,
    thumbnail: "",
    about: ""
  };
  db.profiles.data.push(emptyProfile);
  db.profiles.id++;

  res.status(201).json(db);
});

//update user profile
app.patch("/profile/:userId", (req, res) => {
  const { thumbnail, about } = req.body;
  const { userId } = req.params;

  const userIndex = db.users.data.findIndex(
    user => user.id === parseInt(userId)
  );

  if (userIndex === -1) {
    console.log("User not found in the api");
    res.status(500).send("User not found in api");
  } else {
    db.profiles.data[userIndex] = {
      userId: userIndex,
      thumbnail,
      about
    };

    res.status(200).json(db);
  }
});

//creating post
app.post("/posts", (req, res) => {
  const { userId, content } = req.body;

  const userIndex = db.users.data.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    console.log("User not found in the api");
    res.status(500).send("User not found in api");
  } else {
    const userPost = {
      id: db.posts.id,
      userId: userIndex,
      content
    };

    db.posts.data.push(userPost);
    db.posts.id++;

    res.status(201).json(db);
  }
});

//adding comment
app.post("/comments", (req, res) => {
  const { userId, postId, comment } = req.body;

  const userIndex = db.users.data.findIndex(user => user.id === userId);
  const postIndex = db.posts.data.findIndex(post => post.id === postId);

  if (userIndex === -1) {
    console.log("User not found in the api");
    res.status(500).send("User not found in api");
  } else if (postIndex === -1) {
    console.log("Post not found in the api");
    res.status(500).send("Post not found in api");
  } else {
    const userComment = {
      id: db.comments.id,
      userId: userIndex,
      postId: postIndex,
      comment
    };

    db.comments.data.push(userComment);
    db.comments.id++;

    res.status(201).json(db);
  }
});

//fetching our profile by email or userId
// parameter can have email or id value

app.get("/profile", (req, res) => {
  const { email, userId } = req.query;

  if (userId) {
    const userData = db.users.data.find(user => user.id === parseInt(userId));

    const userProfile = db.profiles.data.find(
      prof => prof.userId === userData.id
    );

    res.status(200).json(userProfile);
  }

  if (email) {
    const userData = db.users.data.find(user => user.email === email);

    const userProfile = db.profiles.data.find(
      prof => prof.userId === userData.id
    );

    res.status(200).json(userProfile);
  }
});

//fetching all of our posts
app.get("/user/:userId/posts", (req, res) => {
  const { userId } = req.params;

  const userPostData = db.posts.data.filter(
    user => user.userId === parseInt(userId)
  );

  res.status(200).json(userPostData);
});

//Viewing post
app.get("/posts/:postId", (req, res) => {
  const { postId } = req.params;

  const postData = db.posts.data.find(p => p.id === parseInt(postId));
  const comments = db.comments.data.filter(p => p.postId === parseInt(postId));

  const post = {
    postData,
    comments
  };

  res.status(200).json(post);
});

//debug
app.get("/debug", (req, res) => {
  res.status(200).json(db);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

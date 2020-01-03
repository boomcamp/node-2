let id = 1;
let postId = 0;
let commentId = 0;

module.exports = {
  debug: (req, res) => res.status(200).send(req.app.get("db")),
  signIn: (req, res) => {
    const { users } = req.app.get("db");
    const { email, password } = req.body;
    const user = users.find(x => x.email === email);
    if (user) {
      if (user.password === password) {
        res.status(200).send({ message: "user found!" });
      } else {
        res.status(400).send({ error: "invalid password" });
      }
    } else {
      res.status(400).send({ error: "user not found!" });
    }
  },
  signUp: (req, res) => {
    const { users, profiles } = req.app.get("db");
    const { email, password } = req.body;
    const userObj = {
      id: id,
      email: email,
      password: password
    };
    const profileObj = {
      userId: id,
      thumbnail: null,
      about: null
    };
    if (users.length > 0) {
      const user = users.find(x => x.email === email);
      if (!user) {
        users.push(userObj);
        profiles.push(profileObj);
        res.status(200).send({ message: "successfully added!" });
      } else {
        res.status(400).send({ error: "email is already used!" });
      }
    } else {
      users.push(userObj);
      profiles.push(profileObj);
      res.status(200).send({ message: "successfully added!" });
    }
    id++;
  },
  updateProfile: (req, res) => {
    const { profiles } = req.app.get("db");
    const { id } = req.params;
    const { thumbnail, about } = req.body;
    const user = profiles.find(x => x.userId === Number(id));
    if (user) {
      Object.assign(user, {
        ...(thumbnail && { thumbnail }),
        ...(about && { about })
      });
      res.status(200).send({ message: "successfully updated!" });
    } else {
      res.status(400).send({ error: "user not found!" });
    }
  },
  createPost: (req, res) => {
    const { posts, users } = req.app.get("db");
    const { userId, content } = req.body;
    const validUser = users.find(x => x.id === Number(userId));
    if (validUser) {
      posts.push({
        id: postId,
        userId: userId,
        content: content
      });
      res.status(200).send({ message: "successfully added a new post" });
      postId++;
    } else {
      res.status(400).send({ error: "invalid user!" });
    }
  },
  addComment: (req, res) => {
    const { comments, posts } = req.app.get("db");
    const { userId, postId, comment } = req.body;
    const validPost = posts.find(x => x.id === Number(postId));
    if (validPost) {
      comments.push({
        id: commentId,
        userId: userId,
        postId: postId,
        comment: comment
      });
      res.status(200).send({ message: "successfully added a new comment" });
      commentId++;
    } else {
      res.status(400).send({ error: "post not available!" });
    }
  },
  userPosts: (req, res) => {
    const { posts, users } = req.app.get("db");
    const { userId } = req.params;
    const validUser = users.find(x => x.id === Number(userId));
    if (validUser) {
      const postList = posts.filter(x => x.userId === userId);
      if (postList.length > 0) {
        res.status(200).send(postList);
      } else {
        res.status(400).send({ error: "no post available" });
      }
    } else {
      res.status(400).send({ error: "invalid user!", validUser });
    }
  },
  profile: (req, res) => {
    const { profiles, users } = req.app.get("db");
    const { email } = req.query;
    if (email) {
      const user = users.find(x => x.email.match(email));
      user
        ? res.status(200).send(user)
        : res.status(400).send({ error: "user not found" });
    } else {
      res.status(200).send(profiles);
    }
  },
  viewPost: (req, res) => {
    const { posts, comments } = req.app.get("db");
    const { postId } = req.params;
    const { comment } = req.query;
    const post = posts.find(x => x.id === Number(postId));
    if (post) {
      if (comment === "true") {
        const commentList = comments.filter(x => x.postId === postId);

        res.status(200).send({ post: post, comments: commentList });
      } else {
        res.status(200).send({ post: post });
      }
    } else {
      res.status(400).send({ error: "post not available!" });
    }
  }
};

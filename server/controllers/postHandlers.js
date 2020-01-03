module.exports = {
  addpost: (req, res) => {
    const db = req.app.get("db");
    const { content, userId } = req.body;
    db.posts.data.push({ postId: db.posts.id, userId, content });
    db.posts.id++;
    res.status(200).json(db);
  },
  userpost: (req, res) => {
    const db = req.app.get("db");
    const { userId } = req.params;

    const posts = db.posts.data.filter(
      post => parseInt(post.userId) === parseInt(userId)
    );

    res.status(200).json(posts);
  },
  getpost: (req, res) => {
    const db = req.app.get("db");
    const { postId } = req.params;

    const post = db.posts.data.find(
      post => parseInt(post.postId) === parseInt(postId)
    );

    console.log(req.query.comments);

    if (req.query.comments) {

      const comments = db.comments.data.filter(
        comment => parseInt(comment.postId) === parseInt(postId)
      );

      if (comments) {
        post.comments = { comments: comments };
      }
    }else if(!req.query.comments){
      post.comments = null;
    }

    if (post) {
      res.status(200).json(post);
    }
  }
};

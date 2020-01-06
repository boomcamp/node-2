module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { userId, postId, comment } = req.body;

    const newComment = Object.assign(
      {},
      { id: db.comments.id, userId, postId, comment }
    );

    db.comments.data.push(newComment);
    db.comments.id++;

    res.status(201).json(newComment);
  }
};

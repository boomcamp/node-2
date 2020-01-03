module.exports = {
  Comment: (req, res) => {
    const db = req.app.get("db");
    const { userId, postId, comment } = req.body;
    const newComment = { id: db.comments.id, userId, postId, comment };
    console.log(newComment);
    db.comments.data.push(newComment);
    db.comments.id++;
    res.status(201).json(db);
  }
};

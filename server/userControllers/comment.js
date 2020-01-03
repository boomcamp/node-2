function comment(req, res) {
  const db = req.app.get("db");

  const { userId, postId, comment } = req.body;

  const newComment = { id: db.comment.id, userId, postId, comment };

  db.comment.data.push(newComment);
  db.comment.id++;

  res.status(201).json(newComment);
}
module.exports = {
  comment
};

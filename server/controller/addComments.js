function createComment(req, res) {
  const db = req.app.get("db");

  const { postId, userId, comment } = req.body;

  const addComments = { postId, userId, comment };

  db.comments.data.push(addComments);

  res.status(201).json(addComments);
}
module.exports = {
  createComment
};

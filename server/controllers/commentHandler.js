module.exports = {
  addcomment: (req, res) => {
    const db = req.app.get("db");
    const { userId, postId, comment } = req.body;
    db.comments.data.push({ userId, postId, comment });
    res.status(200).json(db);
  }
};
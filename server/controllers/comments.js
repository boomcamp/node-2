function comments(req, res) {
    const db = req.app.get('db');

    const { userID, postId, comment } = req.body;
    const newComment = { idd: db.newComment.id, userId, postId, comment };

    db.comments.data.push(newComment);
    db.comments.id++;

    res.status(201).json(newComment);
}

module.exports = { comments }
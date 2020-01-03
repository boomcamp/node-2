function newComment(req, res) {
    const db = req.app.get('db');

    const { userId, postId, comment } = req.body;
    const newCom = { id: db.comments.id, userId, postId, comment };

    db.comments.data.push(newCom);
    db.comments.id++;

    res.status(201).json(newCom);
}

module.exports = { newComment }
module.exports = {
    addComment: (req, res) => {
        const db = req.app.get('db');
        const { userID, postID, comment } = req.body;

        const commentInPost = { id: db.comments.id, userID, postID, comment };

        db.comments.data.push(commentInPost);
        db.comments.id++;

        res.status(201).send(db.comments.data);
    }
}
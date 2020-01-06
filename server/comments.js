const comments = (req, res) => {
	const db = req.app.get("db");
	const { userId, postId, comment } = req.body;

	const newComment = { id: db.comments.id, userId, postId, comment };

	db.comments.data.push(newComment);
	db.comments.id++;

	res.status(200).send(db.comments);
};

module.exports = comments;

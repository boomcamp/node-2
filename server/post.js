const createPost = (req, res) => {
	const db = req.app.get("db");
	const { userId, content } = req.body;

	const newPost = { id: db.posts.id, userId, content };

	db.posts.data.push(newPost);
	db.posts.id++;

	res.status(201).json(db.posts);
};

const getAllPost = (req, res) => {
	const db = req.app.get("db");
	const { userId } = req.params;
	const allPost = db.posts.data.filter(p => p.userId === parseInt(userId));

	res.status(200).json(allPost);
};

const viewPost = (req, res) => {
	const db = req.app.get("db");
	const { comments } = req.query;
	const { postId } = req.params;

	const result = db.posts.data.find(p => p.id === parseInt(postId));
	if (comments) {
		const postComments = db.comments.data.filter(c => c.postId === parseInt(postId));
		result.comments = postComments;
	}

	res.status(200).json(result);
};

module.exports = { createPost, getAllPost, viewPost };

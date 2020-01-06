module.exports = {
	createPost: (req, res) => {
		const db = req.app.get("db");

		const { userId, content } = req.body;
		newPost = Object.assign({}, { postId: db.posts.id, userId, content });

		db.posts.data.push(newPost);
		db.posts.id++;

		res.status(201).json(newPost);
	},
	postPerUser: (req, res) => {
		const db = req.app.get("db");
		const posts = db.posts.data.filter(
			p => p.userId === req.params.userId
		);
		res.status(200).json(posts);
	},
	fetchAPost: (req, res) => {
		const db = req.app.get("db");
		const { comments } = req.query;

		const postRes = db.posts.data.find(
			p => p.postId === parseInt(req.params.postId)
		);
		if (comments) {
			const postComments = db.comments.data.filter(
				c => c.postId === req.params.postId
			);
			postRes.comments = postComments;
		}

		res.status(200).json(postRes);
	}
};

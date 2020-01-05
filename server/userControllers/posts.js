const createPost = (req, res) => {
	const db = req.app.get('db');

	const { userId, content } = req.body;
	const newPost = { id: db.posts.id, userId, content };

	db.posts.data.push(newPost);
	db.posts.id++;

	res.status(201).json(newPost);
};

const getUserPosts = (req, res) => {
	
	const db = req.app.get('db');
	const { userId } = req.params;

	const posts = db.posts.data.filter(post => post.userId === parseInt(userId));

	return res.status(200).json(posts);
};

const getPost = (req, res) => {
	
	const db = req.app.get('db');
	const { postId } = req.params;

	const postRes = db.posts.data.find(elem => elem.id === parseInt(postId));

	if (postRes) {
		res.status(200).json(postRes);
	}
	return res.status(404).send({ error: 'Could not find user ID.' });
};

module.exports = {
	createPost,
	getUserPosts,
	getPost
};
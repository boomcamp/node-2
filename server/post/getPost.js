const posts = function(req,res) {
	const db = req.app.get('db')
	const { postId } = req.params 

	const post = db.posts.data.find(post => post.postId === parseInt(postId))
	const comments = db.comments.data.filter(comment => comment.postId === parseInt(postId));
	if(!post) { return res.status(500).send('Post was not found')}
	const postsWithComment  = ({post,comments})
	res.status(200).json(postsWithComment)
}
module.exports = { posts }
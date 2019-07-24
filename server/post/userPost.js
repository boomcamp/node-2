const userPost = function(req,res){
	const db = req.app.get('db')
	const { userId } = req.params
	const posts = db.posts.data.filter(post => post.userId === parseInt(userId))
	if(!posts.length) {
		return res.status(500).send('User did not post anything')
	}
	res.status(200).json(posts)
}
module.exports = { userPost }
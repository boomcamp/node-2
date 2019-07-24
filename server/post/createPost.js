const newPost = function(req,res){
	const db = req.app.get('db')
	const { postContent, userId } = req.body
	const newPost = {postId:db.posts.id, postContent, userId}
	
	db.posts.data.push(newPost)
	db.posts.id++
	res.status(201).json(db)
}
module.exports = { newPost }
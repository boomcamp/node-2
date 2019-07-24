const newComment = function(req,res){
	const db = req.app.get('db')
	const { userId, postId , comment} = req.body
	const newComment = {commentId:db.comments.id,userId, postId, comment }
	db.comments.data.push(newComment)
	db.comments.id++;
	res.status(201).json(db)
}
module.exports = { newComment }
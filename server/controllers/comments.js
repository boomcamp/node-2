function Comment(req, res) {
    const db = req.app.get('db')
    const { userId, postId, comment } = req.body

    const newComm= { id: db.comments.id, userId, postId, comment }
    console.log(newComm)
    db.comments.data.push(newComm)
    db.comments.id++
    res.status(201).json(db)
}

module.exports = {
    Comment
};
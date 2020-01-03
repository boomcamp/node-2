module.exports = {
    createComment: (req, res) => {
        const db = req.app.get('db')
        const { userId, postId, comment} = req.body;
    
    
        db.comments.data.push({
          "id": db.comments.id,
          userId,
          postId,
          comment
        })
    
        db.comments.id++;
    
        res.status(200).json(req.app.get('db'))
    }
}
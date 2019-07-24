module.exports = {
    create:function(req, res){
        const db = req.app.get('db')
        const {userId, postId, comment} = req.body
        if(userId !== '' && postId !== '' && comment !== ''){
            const newComment ={id: db.comments.id, userId, postId, comment};
            db.comments.data.push(newComment)
            db.comments.id++
            res.status(201).json(db.comments.data)
        } else {
            res.status(500).send(`the userId & postId & comment is empty! `)
        }
    },
}
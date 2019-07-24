module.exports = {
    //createPost
    create:function(req, res){
        const db = req.app.get('db')
        const {userId, content} = req.body
        if(userId !== '' && content !== ''){
            const addPost ={id: db.posts.id, userId, content};
            db.posts.data.push(addPost)
            db.posts.id++
            res.status(201).json(db.posts.data)
        } else {
            res.status(500).send(`the userId & content is empty! `)
        }
    },
    //userPost
    userPosts:function(req, res){
        const db = req.app.get('db')
        const {userId} = req.params
        const index = db.posts.data.find(data => data.userId === parseInt(userId))
        if(index){
            es.status(200).json(index)
        } else {
            res.status(500).send(`no data match `)
        }
    },
    //Comments
    comments:function(req, res){
       
        const db = req.app.get('db')
        const {postId} = req.params
        const post = db.posts.data.find(data => data.postId === parseInt(postId))
        if(post){
            const comments = db.comments.data.filter(data => data.postId === parseInt(postId))
            const posts= ({post,comments})
            res.status(200).json(posts)
        } else{
            res.status(500).send(`no data match `)
            
        }
    }
}
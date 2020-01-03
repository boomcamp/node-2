module.exports = {
    createPost: (req, res) => {
        const db = req.app.get('db')
        const { userId, content} = req.body;
    
        db.posts.data.push({
          "id": db.posts.id,
          userId,
          content
        })
    
        db.posts.id++;
    
        res.status(200).json(req.app.get('db'))
    },
    getAllposts: (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.params

        const posts = db.posts.data.filter(x => x.userId === parseInt(userId));

        res.status(200).json(posts);

    },
    getPost: (req, res) => {
        const db = req.app.get('db')
        const {comments} = req.query
        const {postId} = req.params

        const posts = db.posts.data.find(x => x.id === parseInt(postId));
        if (comments == 'true'){
            const postComments = db.comments.data.filter(x => x.postId === parseInt(postId))
            
            posts.comments = postComments
        }
        else if(comments == 'false' || !comments)
            posts.comments = null
        
        res.status(200).json(posts);
    }
}
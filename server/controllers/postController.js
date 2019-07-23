function createPost(req, res) {
    const db = req.app.get('db')
    const { userId, content } = req.body
    const newPost = { postId: db.posts.id, userId, content }

    db.posts.data.push(newPost)
    db.posts.id++

    res.status(201).json(db)
}

function getPosts(req, res) {
    const db = req.app.get('db')
    const posts = db.posts.data.filter(post => Number(req.params.userId) === post.userId);
    res.status(200).json(posts)
}

function viewPost(req, res) {
    const db = req.app.get('db')
    const { comments } = req.query
    const { postId } = req.params

    const result = db.posts.data.find(post => Number(postId) === post.postId);
    
    if (comments) {
        const comments = db.comments.data.filter(comment => Number(postId) === comment.postId);
        result.comments = comments
    }
    
    res.status(200).json(result)
}


module.exports = {
    createPost,
    getPosts,
    viewPost
};
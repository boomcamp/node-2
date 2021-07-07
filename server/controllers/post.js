function newPost(req, res) {
    const db = req.app.get('db');

    const { userId, content } = req.body;
    const newP = { id: db.posts.id, userId, content };

    db.posts.data.push(newP);
    db.posts.id++;

    res.status(201).json(newP);
}

function getAllPost(req, res) {
    const db = req.app.get('db');

    const { userId } = req.body;
    const allPost = db.posts.data.filter(post => post.userId === Number(userId));

    res.status(200).json(allPost);
}

function getPosts(req, res) {
    const db = req.app.get('db');

    const { comment } = req.query;
    const { postId } = req.params;

    const getP = db.posts.data.find(post => post.id === Number(postId));
    if (comment) {
        const commentedPost = db.posts.data.find(post => post.postId === Number(postId));
        getP.comments = commentedPost;
    }
    res.status(200).json(getP)
}

module.exports = { newPost, getAllPost, getPosts }
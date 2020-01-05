module.exports = {
    createPost: (req, res) => {
        const db = req.app.get('db');
        const { userID, post } = req.body;            
        if(post){
            db.posts.data.push({ id: db.posts.id, userID, post });
            db.posts.id++;
            res.status(201).send(db);        
        }
        res.status(404).send('Error!');
    },
    fetchUserPosts: (req, res) => {
        const db = req.app.get('db');
        const { userID } = req.params;
        const posts = db.posts.data.filter(post => post.userID === Number(userID));
      
        res.status(200).json(posts);
    },
    fetchPost: (req, res ) => {
        const db = req.app.get('db')
        const { comments } = req.query
        const { postID } = req.params

        const postRes = db.posts.data.find(post => post.id === parseInt(postID))
        if (comments) {
            const postComments = db.comments.data.filter(c => c.postID === parseInt(postID))
            postRes.comments = postComments
        }

        res.status(200).json(postRes)
    }
}
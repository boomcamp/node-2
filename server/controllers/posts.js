module.exports = {
    createPost: function(req, res){
      const db = req.app.get('db');
	  const { userId, content } = req.body;

	  const newPost = {id: db.posts.id, userId, content};

	  db.posts.data.push(newPost);
	  db.posts.id++;

	  res.status(201).json(newPost);
    },

    userPosts: function(req, res){
      const db = req.app.get('db');
	  const { userId } = req.params;
	  const userPosts = db.posts.data.filter(post => post.userId === parseInt(userId));

	  res.status(200).json(userPosts)
    }
}
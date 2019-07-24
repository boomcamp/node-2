
module.exports = {
    createPost: function(req, res){
      const db = req.app.get('db');
	  const { userId, content } = req.body;

	  const newPost = {id: db.posts.id, userId, content};

	  db.posts.data.push(newPost);
	  db.posts.id++;

	  res.status(201).json(newPost);
    },

    postComments: function(req, res){
      const db = req.app.get('db');
	  const { comments } = req.query;
	  const { postId } = req.params;

	  const posts = db.posts.data.find(post => post.id === parseInt(postId))
	  if(comments) {
	    const pCom = db.comments.data.filter(com => com.postId === parseInt(postId))
	    posts.comments = pCom;
	    }

	    res.status(200).json(posts)
	  // }else{
	  //   res.status(500).send('No comment on this post')
	  // }
    },

    userPosts: function(req, res){
      const db = req.app.get('db');
	  const { userId } = req.params;
	  const userPosts = db.posts.data.filter(post => post.userId === parseInt(userId));

	  res.status(200).json(userPosts)
    }
}
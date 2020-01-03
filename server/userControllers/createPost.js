function create(req, res) {
  const db = req.app.get("db");

  const { userId, content } = req.body;

  const newPost = { id: db.post.id, userId, content };

  db.post.data.push(newPost);
  //   console.log(userId, content);
  db.post.id++;

  res.status(201).json(newPost);
}

function getUserPosts(req, res) {
  const db = req.app.get("db");
  const { userId } = req.params;
  const post = db.post.data.filter(p => p.userId === parseInt(userId));

  res.status(200).json(post);
}
module.exports = {
  create,
  getUserPosts
};

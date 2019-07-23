function createPost(req, res) {
    const db = req.app.get('db');
  
    const { userId, input } = req.body;
  
    const newPost = { id: db.posts.id, userId, input };
  
    db.posts.data.push(newPost);
    db.posts.id++;
  
    res.status(201).json(newPost);
  }

  function userPost(req, res){
    const db = req.app.get('db')
    const {userId} = req.params
    const index = db.posts.data.find(data => data.userId === parseInt(userId))
    if(index){
        es.status(200).json(index)
    } else {
        res.status(500).send(`no data match `)
    }


}
  module.exports = {
    createPost,userPost
  }
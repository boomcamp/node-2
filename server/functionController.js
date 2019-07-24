function debug(req, res){
  res.status(200).json(req.app.get('db'))
}

function signup(req, res) {
  const db = req.app.get('db')
  const { email, password } = req.body;
  const u_id = db.users.id;
  db.users.data.push({ u_id, email, password })
  db.users.id++;
  
  const p_id = db.profiles.id;
  db.profiles.data.push({ p_id })
  db.profiles.id++;
  res.status(201).json(db.users.data)
}

function profile(req, res) {
  const db = req.app.get('db');
  const { usersId } = req.params;
  
  const profileIndex = db.profiles.data.findIndex(prof => prof.p_id === parseInt(usersId));
  
  const profile = [db.profiles.data[profileIndex]];
  Object.assign(...profile, req.body);

  res.status(201).json(profile)
}

function post(req, res) {
  const db = req.app.get('db');
  const post_id = db.posts.id;
  const { post, u_id } = req.body;

  db.posts.data.push({ post_id, u_id, post })
  db.posts.id++;
  res.status(201).json(db.posts.data)
}

function comment(req, res) {
  const db = req.app.get('db');
  const c_id = db.comments.id;
  const { u_id, post_id, comment } = req.body;

  db.comments.data.push({ c_id, u_id, post_id, comment })
  db.comments.id++;
  res.status(201).json(db.comments.data)
}

function fetchProfile(req, res) {
  const db = req.app.get('db');

  if(req.query.email){
    const userIndex = db.users.data.findIndex(user => user.email.toLowerCase() === req.query.email.toLowerCase());
    const profileIndex = db.profiles.data.findIndex(profile => profile.p_id === parseInt(db.users.data[userIndex].u_id));
    res.status(201).json(db.profiles.data[profileIndex])
  } 

  if(req.query.id){
    const userIndex = db.users.data.findIndex(user => user.u_id === parseInt(req.query.id));
    const profileIndex = db.profiles.data.findIndex(profile => profile.p_id === parseInt(db.users.data[userIndex].u_id));
    res.status(200).json(db.profiles.data[profileIndex])
  }
  
}

function fetchPost(req, res) {
  const db = req.app.get('db');
  const { usersId } = req.params
  let posts = [];

  db.posts.data.map(post => {
    if(post.u_id === parseInt(usersId)){
      posts.push(post);
    }
    return posts;
  })
  res.status(200).json(posts)
}

function viewPost(req, res) {
  const db = req.app.get('db');
  const { postId } = req.params;
  let comments = [];
    if(req.query.comments === ''){
      db.comments.data.map(comment => {
        if(comment.post_id === parseInt(postId)){
          comments.push(comment)
        }
        return comments;
      })
    }
    else{
      const postIndex = db.posts.data.findIndex(post => post.post_id === parseInt(postId));
      comments.push(db.posts.data[postIndex])
    }
    res.status(200).json(comments)
}

module.exports = {
    debug,
    signup,
    profile,
    post,
    comment,
    fetchProfile,
    fetchPost,
    viewPost,
}
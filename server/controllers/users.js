function User(req, res) {
    const db = req.app.get('db')
    let counter = db.users.data.map(item => { return item })
    const { email, password } = req.body
    const newUser = { id: parseInt(counter.length), password, email }
  
    db.users.data.push(newUser)
    
    db.profiles.data.push({ userId: newUser.id, thumbnail: null, about: '' })
  
    res.status(201).json(newUser)
  }
  
  module.exports = {
    User
  };
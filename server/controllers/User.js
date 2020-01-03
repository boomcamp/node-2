module.exports = {
  debug: (req, res) => {
    res.status(200).json(req.app.get('db'))
  },
  createUser: (req, res) => {
    const db = req.app.get('db')
    const { email, password } = req.body

    db.users.data.push({
      "id": db.users.id,
      email,
      password
    })

    db.profiles.data.push({
      "userId": db.users.id,
      "thumbnail": "",
      "about": ""
    })

    db.users.id++;

    res.status(200).json(req.app.get('db'))
  },
  
}
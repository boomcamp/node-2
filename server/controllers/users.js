module.exports = {
  createUser: (req, res) => {
    const db = req.app.get('db');
    const { email, password } = req.body;
    db.users.data.push({id: db.users.id, email, password});
    db.users.id++;
    db.profiles.data.push({id: db.profiles.id, name: '', age: 0, bio: ''});
    db.profiles.id++;

    res.status(200).json(db)
  }
}
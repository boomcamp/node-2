module.exports = {
  createUser: (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const user = { id: db.users.id, email, password };

    db.users.data.push(user);
    db.users.id++;

    db.profiles.data.push({ userId: user.id, thumbnail: null, about: "" });
    db.profiles.id++;
    res.status(200).json(user);
  },
  getuser: (req, res) => {
    const db = req.app.get("db");
    res.status(200).send(db.users);
  }
};

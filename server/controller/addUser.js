function register(req, res) {
  const db = req.app.get("db");
  const x = db.users.data.map(item => {
    return item;
  });
  const { email, password } = req.body;
  const newUser = { id: parseInt(x.length), password, email };

  db.users.data.push(newUser);

  db.profiles.data.push({ userId: newUser.id, thumbnail: null, about: "" });

  res.status(201).json(newUser);
}

module.exports = {
  register
};

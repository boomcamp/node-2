module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { email, password, thumbnail, about } = req.body;
    db.users.data.push({ id:db.users.id, email, password });
    db.profiles.data.push({ userId: db.profiles.id, thumbnail, about });
    db.users.id++;
    db.profiles.id++;
    res.status(200).json(db);
  },
  debug: (req, res) => {
    res.status(200).json(req.app.get("db"));
  }
};

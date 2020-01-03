
module.exports = {
  create: (req,res) => {
    const db = req.app.get('db')
    let counter = db.users.data.map(item => {return item})
    const {email, password} = req.body;
    let user = {
      id: parseInt(counter.length),
      email,
      password,
    };
    db.users.data.push(user);

    let profile = {
      userId: parseInt(counter.length),
      thumbnail: null,
      about: '',
    }
    db.profiles.data.push(profile);

    counter.length++;
    res.status(200).send(db);
  }
}
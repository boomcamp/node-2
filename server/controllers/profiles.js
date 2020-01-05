function findProfileByUserID(db, id) {
  const index = db.profiles.data.findIndex(p => p.userID === Number(id));
  return {
    index,
    data: db.profiles.data[index],
  };
}

function findProfileByUserEmail(db, email) {
  const user = db.users.data.find(user => user.email === email)
  return db.profiles.data.find(profile => profile.userID === user.id)
}

module.exports = {
  update: (req, res) => {
    const db = req.app.get('db');
    const { name, age, bio } = req.body;

    const profile = findProfileByUserID(db, req.params.userID);

    const updatedProfile = {
      ...profile.data,
      ...(name && { name }),    
      ...(age && { age }),
      ...(bio && { bio })
    };

    db.profiles.data.splice(profile.index, 1, updatedProfile);

    res.status(200).send(db);
  },
  fetchProfile: (req, res) => {
    const db = req.app.get('db')
    const { email, userID }= req.query

    let fetchedData;
    if (email) {
      fetchedData = findProfileByUserEmail(db, email)
    } else if (userID) {
      fetchedData = db.profiles.data.find(profile => profile.userID === Number(userID))
    }

    res.status(201).send(fetchedData)
  }
}
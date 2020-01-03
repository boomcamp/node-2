function byId(db, id) {
  const i = db.profiles.data.findIndex(prof => prof.userId === parseInt(id));
  return {
    i,
    data: db.profiles.data[i]
  };
}
function findProfileByUserEmail(db, email) {
  const user = db.users.data.find(u => u.email === email);
  return db.profiles.data.find(p => p.userId === user.id);
}

function update(req, res) {
  const db = req.app.get("db");
  const { about } = req.body;

  const userProfile = byId(db, req.params.userId);

  const updatedProfile = {
    ...userProfile.data,
    ...(about && { about })
  };
  db.profiles.data.splice(userProfile.i, 1, updatedProfile);

  res.status(200).json(updatedProfile);

  //   console.log("rrrrrr");
}
function get(req, res) {
  const db = req.app.get("db");
  const { email, userId } = req.query;

  let result;
  if (email) {
    result = findProfileByUserEmail(db, email);
  } else if (userId) {
    result = db.profiles.data.find(p => p.userId === parseInt(userId));
  }

  res.status(200).json(result);
}

module.exports = {
  byId,
  update,
  get
};

module.exports = {
  update: (req, res) => {
    const db = req.app.get("db");
    const { profileId } = req.params;
    const { email, password, thumbnail, about } = req.body;
    const userIndex = db.users.data.findIndex(
      user => user.id === parseInt(profileId)
    );

    // const profileIndex = db.profiles.data.findIndex(
    // //   profile => profile.id === parseInt(profileId)
    // );

    db.users.data[userIndex] = {
      ...db.users.data[userIndex],
      ...(email && { email }),
      ...(password && { password })
    };

    db.profiles.data[userIndex] = {
      ...db.profiles.data[userIndex],
      ...(thumbnail && { thumbnail }),
      ...(about && { thumbnail })
    };

    res.status(200).json(db);
  },
  retrieve: (req, res) => {
    const db = req.app.get("db");

    if (req.query.email) {
      const user = db.users.data.find(user => user.email === req.query.email);

      if (user) {
        console.info(req.query.email);

        const profile = db.profiles.data.find(
          profile => profile.userId === user.id
        );

        res.status(200).json(profile);
      }
    }

    res.status(204).json(db);
  }
};

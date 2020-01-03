module.exports ={
    updateProfile: (req, res) =>{
      const db = req.app.get('db')
      const profileToUpdate = db.profiles.data.find(profile => Number(req.params.id) === profile.userId);
      if (profileToUpdate) {
          const { thumbnail, about } = req.body;
          Object.assign(profileToUpdate, {
              ...(thumbnail && { thumbnail }),
              ...(about && { about }),
          });
          return res.status(200).send(db);
      }
      return res.status(404).send({ error: 'Could not find specified profile.' });
    },
    fetchProfile: (req, res) =>{
      const db = req.app.get('db')
      if (req.query.email){
          const userToFetch = db.users.data.find(user => req.query.email === user.email);
          if (userToFetch) {
              const profileToFetch = db.profiles.data.find(profile => profile.userId === userToFetch.id) 
              return res.status(200).json(profileToFetch);
          }
          else return res.status(404).send({ error: 'Could not find specified profile.' });
      }
      else if (req.query.userId) {
          const profileToFetch = db.profiles.data.find(profile => profile.userId === Number(req.query.userId))
          if (profileToFetch) return res.status(200).json(profileToFetch);
          else return res.status(404).send({ error: 'Could not find specified profile.' });
      }
      else return res.status(404).send({ error: 'Could not find specified profile.' });
    }
  ​
  }
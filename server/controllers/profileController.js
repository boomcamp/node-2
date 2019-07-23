function updateProfile(req, res) {
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
    return res.status(404).send({ error: 'Could not find specified book.' });
}

function fetchProfile(req, res) {
    const db = req.app.get('db')
    const { email, userId } = req.query    
    if (email){
        console.log(email)
        const userToFetch = db.users.data.find(user => email === user.email);
        if (userToFetch) {
            const profileToFetch = db.profiles.data.find(profile => profile.userId === userToFetch.id) 
            return res.status(200).json(profileToFetch);
        }
        else return res.status(404).send({ error: 'Could not find specified user.' });
    }
    else if (userId) {
        const profileToFetch = db.profiles.data.find(profile => profile.userId === Number(userId))
        if (profileToFetch) return res.status(200).json(profileToFetch);
        else return res.status(404).send({ error: 'Could not find specified user.' });
    }
    else return res.status(404).send({ error: 'Could not find specified user.' });
}

module.exports = {
    updateProfile,
    fetchProfile
}
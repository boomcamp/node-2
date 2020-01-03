function profileUserId(db, id) {
    const i = db.profiles.data.findIndex(user => user.userId === parseInt(id));
    return {
        i,
        data: db.profiles.data[i],
    };
}

function profileUserEmail(db, email) {
    const user = db.users.data.find(user => user.email === email)
    return db.profiles.data.find(p => p.userId === user.id)
}

function getProfile(req, res) {
    const db = req.app.get('db');

    const { email, userId } = req.query;

    let result;
    if (email) {
        result = profileUserEmail(db, email);
    } else if (userId) {
        result = db.profiles.data.find(i => i.userId === Number(userId));
    }
}

function updateProfile(req, res) {
    const db = req.app.get('db');

    const { thumbnail, about } = req.body;

    const profile = profileUserId(db, req.params.userId)

    const profileUpdated = {
        ...profile.data,
        ...(thumbnail && { thumbnail }),
        ...(about && { about })
    };
    db.profiles.data.splice(profile.index, 1, profileUpdated);

    res.status(200).json(profileUpdated);
}


module.exports = { getProfile, updateProfile }
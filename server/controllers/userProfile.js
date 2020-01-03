function userProfile(req, res) {
    const db = req.app.get('db');

    const { userId, thumbnail, about } = req.body;
}

function getProfile(req, res) {
    const db = req.app.get('db');
}

module.exports = { userProfile, getProfile }
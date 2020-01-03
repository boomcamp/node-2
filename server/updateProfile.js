const updateProfile = (req, res) => {
	const db = req.app.get("db");

	id = req.url.replace(/\//g, "");

	res.status(200).send(db.profiles.data[id]);
};

module.exports = updateProfile;

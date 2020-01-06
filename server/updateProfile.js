const updateProfile = (req, res) => {
	const { thumbnail, about } = req.body;
	const db = req.app.get("db");

	const { userId } = req.params;

	//console.log(db.profiles);
	db.profiles.data[parseInt(userId)].thumbnail = thumbnail;
	db.profiles.data[parseInt(userId)].about = about;

	res.status(200).send(db);
};

const getProfileByEmail = (req, res) => {
	const db = req.app.get("db");
	const { email, userId } = req.query;

	let result;
	if (email) {
		result = findProfileByUserEmail(db, email);
	} else if (userId) {
		result = db.profiles.data.find(p => p.userId === parseInt(userId));
	}

	res.status(200).json(result);
};

module.exports = { updateProfile, getProfileByEmail };

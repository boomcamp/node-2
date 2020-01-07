const updateProfile = (req, res) => {
	const { thumbnail, about } = req.body;
	const db = req.app.get("db");

	const { userId } = req.params;

	//console.log(db.profiles);
	db.profiles.data[parseInt(userId)].thumbnail = thumbnail;
	db.profiles.data[parseInt(userId)].about = about;

	res.status(200).send(db);
};

const profile = (db, email) => {
	const user = db.users.data.find(result => result.email === email);

	console.log(user);
	return db.profiles.data.find(result => result.id === user.id);
};

const getProfileByEmail = (req, res) => {
	const db = req.app.get("db");
	const { email, userId } = req.query;

	let result;

	if (email) {
		result = profile(db, email);
	} else if (userId) {
		console.log(userId);
		result = db.profiles.data.find(p => p.userId === parseInt(userId));
	}

	res.status(200).json(result);
};

module.exports = { updateProfile, getProfileByEmail };

findByUserId = (db, id) => {
	const index = db.profiles.data.findIndex(p => p.userId === parseInt(id));
	return {
		index,
		data: db.profiles.data[index]
	};
};

findByUserEmail = (db, email) => {
	const user = db.users.data.find(u => u.email === email);
	return db.profiles.data.find(p => p.userId === user.id);
};

module.exports = {
	fetch: (req, res) => {
		const db = req.app.get("db");
		const { email, userId } = req.query;

		let result;
		if (email) {
			result = findByUserEmail(db, email);
		} else if (userId) {
			result = db.profiles.data.find(
				p => p.userId === parseInt(userId)
			);
		}

		res.status(200).json(result);
	},
	update: (req, res) => {
		const db = req.app.get("db");
		const { thumbnail, about } = req.body;

		const profile = findByUserId(db, req.params.userId);

		const updatedProfile = Object.assign(
			{},
			{
				...profile.data,
				...(thumbnail && { thumbnail }),
				...(about && { about })
			}
		);

		db.profiles.data.splice(profile.index, 1, updatedProfile);

		res.status(200).json(updatedProfile);
	}
};

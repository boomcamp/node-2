let id = 0;

const signUp = (req, res) => {
	const { email, password } = req.body;
	const db = req.app.get("db");

	db.users.data.push({ id, email, password });
	db.users = { ...db.users, id };

	db.profiles.data.push({ id });
	db.profiles = { ...db.profiles, id };

	id++;
	res.status(200).send(db);
};

module.exports = signUp;

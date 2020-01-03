let id = 0;

const signUp = (req, res) => {
	const { email, password } = req.body;
	const db = req.app.get("db");

	data = db.users.data;
	data.push([id, email, password]);

	db.users = { ...db.users, id, data };
	id++;
	res.status(200).send(db);
};

module.exports = signUp;

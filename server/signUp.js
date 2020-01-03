const signUp = (req, res) => {
	const db = req.app.get("db");
	res.status(200).send(db);
};

module.exports = signUp;

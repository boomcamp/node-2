module.exports = {
	signUp: (req, res) => {
		const db = req.app.get("db");

		const { email, password } = req.body;
		newUser = Object.assign({}, { id: db.users.id, password, email });

		db.users.data.push(newUser);
		db.users.id++;

		db.profiles.data.push({
			userId: newUser.id,
			thumbnail: null,
			about: ""
		});
		db.profiles.id++;
		res.status(201).json(newUser);
	},
	signIn: (req, res) => {
		const db = req.app.get("db");
		const { email, password } = req.body;

		const user = db.users.data.find(
			u => u.email === email && u.password === password
		);
		user
			? res.status(201).send({ message: "Successfully Log in" })
			: res.status(400).send({ message: "User Not Found" });
	}
};

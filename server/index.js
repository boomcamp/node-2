const express = require("express");
const signUp = require("./signUp");
const db = {
	users: {
		id: 0,
		data: []
	},
	profiles: {
		id: 0,
		data: []
	},
	posts: {
		id: 0,
		data: []
	},
	comments: {
		id: 0,
		data: []
	}
};
const app = express();
app.use(express.json());

app.set("db", db);
const PORT = 3002;

app.post("/sign-up", signUp);

app.get("/debug", (req, res) => {
	res.status(200).json(req.app.get("db"));
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

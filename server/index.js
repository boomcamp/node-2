const express = require("express");
const PORT = 3000;
const app = express();

const fc = require("./functionController");
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

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

app.set("db", db);

app.get("/debug", fc.debug);
app.post("/sign-up", fc.signup);
app.patch("/profile/:usersId", fc.profile);
app.post("/posts", fc.post);
app.post("/comments", fc.comment);
app.get("/fetchProfile/", fc.fetchProfile);
app.get("/user/:usersId/posts", fc.fetchPost);
app.get("/posts/:postId", fc.viewPost);

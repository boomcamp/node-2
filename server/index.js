const express = require("express");

//controllers

const user = require("./controllers/user");
const profile = require("./controllers/profiles");
const post = require("./controllers/posts");
const comment = require("./controllers/comments");

//datastore

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

//middleware

app.set("db", db);
app.use(express.json());

//debug

app.get("/debug", (req, res) => {
	res.status(200).json(req.app.get("db"));
});

//users

app.post("/sign-in", user.signIn);
app.post("/sign-up", user.signUp);

//profiles

app.get("/profile", profile.fetch);
app.patch("/profile/:userId", profile.update);

//posts

app.post("/posts", post.createPost);
app.get("/user/:userId/posts", post.postPerUser);
app.get("/posts/:postId", post.fetchAPost);

//comments

app.post("/comment", comment.createComment);

//port

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

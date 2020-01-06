const express = require("express");
const signUp = require("./signUp");
const profile = require("./updateProfile");
const post = require("./post");
const addComments = require("./comments");

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
const PORT = 3001;

//signup
app.post("/sign-up", signUp);

//profile
app.patch(`/profile/:userId`, profile.updateProfile);
app.get("/profile", profile.getProfileByEmail);

//post
app.post("/post", post.createPost);
app.get("/user/:userId/posts", post.getAllPost);
app.get("/posts/:postId", post.viewPost);

//comments
app.post("/comments", addComments);

//debugging
app.get("/debug", (req, res) => {
	res.status(200).json(req.app.get("db"));
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

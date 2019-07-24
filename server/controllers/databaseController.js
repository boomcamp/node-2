
function createUser(req, res) {
	const db = req.app.get('db');
	const { email, password } = req.body;
	db.users.data.push(
		{
			"id": db.users.id,
			"email": email,
			"password": password
		});
	db.profiles.data.push(
		{
			"id": db.profiles.id,
			"userId": db.users.id,
			"thumbnail": "",
			"about": "",
		})
	db.users.id++;
	db.profiles.id++;
	res.status(201).json(db);
	console.log(`[!] Alert: A new user has been added.`);
}

function updateProfile(req, res) {
	const db = req.app.get('db');
	const { thumbnail, about } = req.body;
	const { user } = req.params;
	const userIndex = db.users.data.findIndex(result => result.id === parseInt(user));
	if(userIndex != -1) {
		db.profiles.data[userIndex] =
		{
			"id": db.profiles.data[userIndex].id,
			"userId": parseInt(user),
			"thumbnail": thumbnail,
			"about": about
		};
		res.status(201).json(db);
		console.log(`[!] Alert: A user profile has been Updated.`);
	} else {
		res.status(500).send('Not found');
		console.log(`[!] Error: The user does not exist in this world.`);
	}
	
	
}

function createPost(req, res) {
	const db = req.app.get('db');
	const { content } = req.body;
	const { user } = req.params;
	const userIndex = db.users.data.findIndex(result => result.id === parseInt(user));
	if(userIndex != -1 && user.length != 0) {
		db.posts.data.push(
		{
			"id": db.posts.id,
			"userId": parseInt(user),
			"content": content
		});
		db.posts.id++;
		res.status(201).json(db);
		console.log(`[!] Alert: A post has been added.`);
	} else {
		res.status(500).send('Error: Invalid User or Content.');
		console.log(`[!] Error: Invalid User or Content.`);
	}
}

function createComment(req, res) {
	const db = req.app.get('db');
	const { userId, postId, comment } = req.body;
	db.comments.data.push(
		{
			"id": db.comments.id,
			"userId": userId,
			"postId": postId,
			"comment": comment
		});
	db.comments.id++;
	res.status(201).json(db);
	console.log(`[!] Alert: A Comment has been added.`);
}

function getProfile(req, res) {
	const db = req.app.get('db');
	const { email, userId } = req.query;
	if(email) {
		let userIndex = db.users.data.find(result => result.email === email);
		const profile = db.profiles.data.find(res => res.userId === userIndex.id);
		res.status(200).send(profile);
	}
	else if(userId) {
		
		const profile = db.profiles.data.find(res => res.userId === parseInt(userId));
		console.log(profile)
		res.status(200).send(profile);
	}
	console.log(`[+] Alert: User profile queried.`);
}

function getPosts(req, res) {
	const db = req.app.get('db');
	const { userId } = req.params;
	const posts = db.posts.data.filter(p => p.userId === parseInt(userId));
	if(posts.length != 0) {
		res.status(200).json(posts);
		console.log(`[!] Alert: User posts queried.`);
	} else {
		res.status(500).send(`No posts found!`);
		console.log(`[!] Alert: No posts found.`);
	}
}

function getPost(req, res) {
	const db = req.app.get('db');
	const { post } = req.params;
	const { comments } = req.query;
	const posts = db.posts.data.filter(p => p.userId === parseInt(post));
	if(posts.length != 0) {
		if(comments) {
			const comm = db.comments.data.filter(x => x.postId === parseInt(post));
			const data = [posts, comm];
			res.status(200).json(data);
			console.log(data)
			console.log(`[!] Alert: Posts and comments queried.`);
		} else {
			const data = [posts];
			res.status(200).json(data);
			console.log(`[!] Alert: Posts queried.`);
		}
		
	} else {
		res.status(500).send(`No post found!`);
		console.log(`[!] Alert: No post found.`);
	}
}

function debug(req, res) {
	const db = req.app.get('db');
	res.status(200).send(db);
}

module.exports = {
	createUser,
	updateProfile,
	createComment,
	createPost,
	getProfile,
	getPosts,
	getPost,
	debug
}
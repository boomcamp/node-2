const express = require('express')
const signIn = require('../request/sign_up')
console.log(signIn)
const db = {
  users: {
    id: 0,
    data: [],
  },
  profiles: {
    id: 0,
    data: [],
  },
  posts: {
    id: 0,
    data: [],
  },
  comments: {
    id: 0,
    data: [],
  },
};
const PORT = 3001
const app = express()
app.set('db',db)
app.use(express.json())

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})

app.get('/', (req,res) => {
	res.status(200).json(req.app.get('db'))
})
app.post('/sign-up', signIn.signIn)
app.patch('/profiles/:userId',(req,res) => {
	const { userId } = req.params
	const { email, password } = req.body
	const db = req.app.get('db')
	const profile = db.profiles.data.find(prof => prof.userId === parseInt(userId))

	if(profile) {
		db.users.data[userId] = { email, password }
		res.status(201).json(db.users.data[userId])
	}
	else {
		res.status(500).send('Profile not found')
	}
})
app.post('/posts',(req,res) => {
	const db = req.app.get('db')
	const { postContent, userId } = req.body
	const newPost = {postId:db.posts.id, postContent, userId}
	
	db.posts.data.push(newPost)
	db.posts.id++
	res.status(201).json(db)

})
app.post('/comments',(req,res) => {
	const db = req.app.get('db')
	const { userId, postId , comment} = req.body
	const newComment = {commentId:db.comments.id,userId, postId, comment }
	db.comments.data.push(newComment)
	db.comments.id++;
	res.status(201).json(db)
})

app.get('/profile',(req,res) => {
	const db = req.app.get('db')
	if(req.query.email) {
		const {email} = req.query

		const info = db.users.data.find(data => data.email === email)
		if(!info) { return res.status(500).send('Email is not on the list') }
		const profile = db.profiles.data.find(prof => prof.userId === parseInt(info.id))
		return res.status(200).json(profile)
	}
		res.status(200).send(db.users.data)
})
app.get('/profile',(req,res) => {
	const db = req.app.get('db')
	if(req.query.userId) {
		const {userId} = req.query

		const profile = db.profiles.data.find(prof => prof.userId === parseInt(userId))
		if(!profile) { return res.status(500).send('User id is not on the list')  }
		return res.status(200).json(profile)
	}
		res.status(200).send(db.users.data)
})

app.get('/user/:userId/posts',(req,res) => {
	const db = req.app.get('db')
	const { userId } = req.params
	const posts = []
	db.posts.data.forEach(post => {
		if(post.userId === parseInt(userId)) {
			posts.push(post)
		}
	})
	if(!posts.length) {
		return res.status(500).send('User did not post anything')
	}

	res.status(200).json(posts)
})

app.get('/post/:postId', (req,res) => {
	const db = req.app.get('db')
	const { postId } = req.params 

	const post = db.posts.data.find(post => post.postId === parseInt(postId))
	const comments = []
	if(!post) { return res.status(500).send('Post was not found')}
	db.comments.data.forEach(comment => {
		if(comment.postId === parseInt(postId)) {
			comments.push(comment)
		}
	})
	const postsWithComment  = ({post,comments})
	res.status(200).json(postsWithComment)
})
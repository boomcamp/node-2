const express = require('express')

// modules
const signIn = require('./account/sign_up')
const update = require('./account/update_prof')
const createPost = require('./post/createPost')
const createComment = require('./comment/createComment')
const findProfile = require('./account/findProfile')
const userPost = require('./post/userPost')
const posts = require('./post/getPost')

//database
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
//server config
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
//accounts 
app.post('/sign-up', signIn.signIn)
app.patch('/profiles/:userId', update.update)

//searchUsingEmailAddress
app.get('/profile',findProfile.profile)
//searchUsingId
app.get('/profile',(req,res) => {
	const db = req.app.get('db')
	if(req.query.userId) {
		const {userId} = req.query
		const profile = db.profiles.data.find(prof => prof.userId === parseInt(userId))
		if(!profile) { return res.status(500).send('User id is not on the list')  }
		return res.status(200).json(profile)
	}	
})
//createNewPost
app.post('/posts', createPost.newPost )

app.post('/comments', createComment.newComment )

app.get('/user/:userId/posts', userPost.userPost)

app.get('/post/:postId', posts.posts)
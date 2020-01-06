const express = require('express')
const profile = require('./controller/profileController')
const app = express()
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
}

app.set('db', db)
app.use(express.json())

const port = 3001

app.post('/api/sign-up', profile.create)
app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
})
app.patch('/api/patch/:userId', profile.update)
app.post('/api/post/:postId', profile.post)
app.post('/comments/:commentId', profile.comment)

app.listen(port, err =>{
    if(err){
        console.log(`Unable to d(-,-)b to Port ${port}`)
    }
    console.log(`Listening to Port ${port}`)
})
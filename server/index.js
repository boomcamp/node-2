const express = require('express');

const user = require('./controllers/user')

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

const app = express();

app.set('db', db);

app.post('/sign-up', user.signUp);

app.get('/debug', (req, res) => {
    res.status(200).json(req.app.get('db'))
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
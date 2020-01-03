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

const express = require('express');

const app = express();

app.set('db', db);

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
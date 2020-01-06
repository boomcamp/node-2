module.exports = {
    create:(req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body;
        let user = {
            id: db.users.id,
            password,
            email
        }
        let profile = {
            userId: db.profiles.id,
            thumbnail: null,
            about: ''
        }
        db.users.data.push(user)
        db.users.id++;
        db.profiles.data.push(profile)
        db.profiles.id++
        res.status(201).json(user)
    },
    read:(req, res) => {},
    update:(req, res) => {
        const db = req.app.get('db');
        const toUpdate = db.profiles.data.find(p => p.userId === parseInt(req.params.userId));
        console.log(toUpdate)
        if (toUpdate) {
            const { thumbnail, about } = req.body;
            
            Object.assign(toUpdate, {
                ...(thumbnail && { thumbnail }),
                ...(about && { about }),
            });
            return res.status(200).send(toUpdate);
        }
        res.status(200).json(toUpdate);
    },
    post: (req, res) => {
        const db = req.app.get('db');
        const { post } = req.body;
        let posts = {
            userId: db.posts.id,
            post: post
        }
        db.posts.data.push(posts)
        db.posts.id++;
        res.status(201).json(posts)
    },
    comment: (req, res) =>{
        const db = req.app.get('db');
        const { comment } = req.body;
        let comments = {
            userId: db.comments.id,
            comment: comment
        }
        db.comments.data.push(comments)
        db.comments.id++;
        res.status(201).json(comments);
    },
    delete:(req, res) => {}
}
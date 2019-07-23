function signUp(req, res){
    const db = req.app.get('db')

    // get requests
    const { email, password, thumbnail, about } = req.body;

    // objects
    const newUser = {id: db.users.id, email, password}
    const newProfile = {userId: db.profiles.id, thumbnail, about}

    // insert into fake db
    db.users.data.push(newUser);
    db.profiles.data.push(newProfile)

    // increment
    db.users.id++;
    db.profiles.id++;

    res.status(200).send(newUser)
}

function updateProfile(req, res){
    const db = req.app.get('db')

    const toBeUpdated = db.profiles.data.find(profile => profile.userId === parseInt(req.params.id))
    
    if(toBeUpdated){
        // get requests
        const { thumbnail, about } = req.body;

        Object.assign(toBeUpdated, {
            ...(thumbnail && { thumbnail }), 
            ...(about && { about }), 
          });

        res.status(200).send(toBeUpdated)
    }

    res.status(500).send('Profile not found!')
    
}

function posts(req, res){
    const db = req.app.get('db')

    // get requests
    const { userId, content } = req.body;

    // object
    const newPost = {postId: db.posts.id, userId, content}

    // insert into fake db
    db.posts.data.push(newPost);

    // increment
    db.posts.id++;

    res.status(200).send(newPost)
}

function comments(req, res){
    const db = req.app.get('db')

    // get requests
    const { postId, comment } = req.body;

    // objects
    const newComment = {userId: db.comments.id, postId, comment}

    //insert into fake db
    db.comments.data.push(newComment);

    // increment
    db.comments.id++;

    res.status(200).send(newComment)
}

function viewProfile(req, res){
    const db = req.app.get('db')

    if(req.params.userId){

        const userId = db.users.data.find(user => user.id === parseInt(req.params.userId))

        if(userId){

            const findProfile = db.profiles.data.find(profile => profile.userId === userId.id)

            res.status(200).send(findProfile)
        }
        
    }

else{

    const userId = db.users.data.find(user => user.email === req.query.email)

    if(userId){

        const findProfile = db.profiles.data.find(profile => profile.userId === userId.id)

        res.status(200).send(findProfile)

    }
}
    
    

    res.status(500).send('Profile does not exist!');
}

function viewMyProfile(req, res){
    const db = req.app.get('db')

    const myPosts = db.posts.data.filter(post => post.userId === parseInt(req.params.userId))

    if(myPosts){

        res.status(200).send(myPosts)
    }

    res.status(500).send('You have no post/s')
}

function viewSinglePost(req, res){
    const db = req.app.get('db')

    const singlePost = db.posts.data.find(post => post.postId === parseInt(req.params.postId))

    if(singlePost){

        if(req.query.comments){

            const ccomments = db.comments.data.filter(comment => parseInt(comment.postId) === singlePost.postId)
            singlePost.comments = ccomments;

        }

        res.status(200).send(singlePost)
    }

    res.status(500).send('Post is not found')
}

module.exports = { signUp, posts, comments, updateProfile, viewProfile, viewMyProfile, viewSinglePost }
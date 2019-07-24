module.exports = {
    signUp:function(req, res) {
        const db = req.app.get('db')
        const {email, password} = req.body;
        if(email !== '' && password !== ''){
                const User ={id: db.users.id, email, password};
                //Users
                db.users.data.push(User)
                db.users.id++ 
                //Profiles
                db.profiles.data.push( {userId:User.id,thumbnail: '',about: ''} )
                db.profiles.id++
                res.status(201).json(db)
        } else{
            res.status(500).send(`the email address & password is empty! `)
        }   
     }
}
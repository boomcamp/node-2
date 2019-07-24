
module.exports = {
    signup:function(req, res) {
        const db = req.app.get('db')
        const {email, password} = req.body;
        if(email !== '' && password !== ''){
                const addUser ={id: db.users.id, email, password};
                db.users.data.push(addUser)
                db.users.id++ 
                db.profiles.data.push( {userId:addUser.id,thumbnail: '',about: ''} )
                db.profiles.id++
                res.status(201).json(db)
        } else{
            res.status(500).send(`the email address & password is empty! `)
        }
        
     },

    
}
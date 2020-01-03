module.exports = {
    updateProfile: (req, res) => {
        const db = req.app.get('db')
        const { thumbnail, about } = req.body;
        let { id } = req.params
    
        const userIndex = db.profiles.data.findIndex(x => x.userId === parseInt(id))
    
        db.profiles.data[userIndex] = { 
          "userId": parseInt(id), 
          thumbnail, 
          about 
        }
        
        res.status(200).json(req.app.get('db'))
    },
    getProfile: (req, res) => {
        const db = req.app.get('db')
        const {email, userId} = req.query
        let result;

        if(email){
            const user = db.users.data.find(x => x.email === email)
            result = db.profiles.data.find(p => p.userId === user.id)
        }
        else if(userId){
            const index = db.profiles.data.findIndex(p => p.userId === parseInt(userId));
            result = {
              index,
              data: db.profiles.data[index],
            };
        }

        res.status(200).json(result)
    }
}
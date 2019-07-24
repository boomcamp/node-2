 function update(req, res){
    const db = req.app.get('db')
    const {userId} = req.params
    const {email,password} = req.body
    
    const index = db.profiles.data.find(data => data.userId === parseInt(userId))
    
    if(index){
        db.users.data[userId] = {id: parseInt(userId),email,password}
        res.status(200).json(db.users.data)
    } else {
        res.status(500).send(`no data match ${index}`)
    }

}

function profiles(req, res){
    const db = req.app.get('db')
    if(req.query.email){
        const { email } = req.query
        const item = db.users.data.find(data => data.email === req.query.email)
        if(item){
            const profile = db.profiles.data.filter(data => data.userId === parseInt(item.id))
            const info = ({item,profile})
            res.status(200).json(info)
        } else {
            res.status(500).send(`no data match`)
        }
        
    } else {
        res.status(500).send(`no data match`)
    }
}

module.exports = {
    update,profiles
  }
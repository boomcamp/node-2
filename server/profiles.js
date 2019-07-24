module.exports = {
    update:function(req, res){
        const db = req.app.get('db')
        const {userId} = req.params
        const {thumbnail,about} = req.body
        const index = db.profiles.data.find(data => data.userId === parseInt(userId))
        
        if(index){
            db.profiles.data[userId] = {id: parseInt(userId),thumbnail,about}
            res.status(200).json(db.profiles.data)
        } else {
            res.status(500).send(`no data match ${index}`)
        }
    },
    profiles:function(req, res){
        const db = req.app.get('db')

        if(req.query.email){
            const { email } = req.query
            const item = db.users.data.find(data => data.email === req.query.email)
            if(item){
                const profile = db.profiles.data.find(data => data.userId === parseInt(item.id))
                const info = ({item,profile})
                res.status(200).json(info)
            } else {
                res.status(500).send(`no data match`)
            }
            
        } else {
            res.status(500).send(`no data match`)
        }
    }
}
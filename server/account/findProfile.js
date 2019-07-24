//getByEmailAddress 
const profile = function(req,res){
	const db = req.app.get('db')
	if(req.query.email) {
		const {email} = req.query

		const info = db.users.data.find(data => data.email === email)
		if(!info) { return res.status(500).send('Email is not on the list') }
		const profile = db.profiles.data.find(prof => prof.userId === parseInt(info.id))
		res.status(200).json(profile)
	}
		res.status(200).send(db.users.data)
}
module.exports = { profile }
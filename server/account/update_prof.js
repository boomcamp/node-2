const update = function(req,res){
	const { userId } = req.params
	const { email, password } = req.body
	const db = req.app.get('db')
	const profile = db.profiles.data.find(prof => prof.userId === parseInt(userId))

	if(profile) {
		db.users.data[userId] = {id:parseInt( userId ), email, password }
		res.status(201).json(db)
	}
	else {
		res.status(500).send('Profile not found')
	}
}

module.exports = { update }
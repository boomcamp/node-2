const update = function(req,res){
	const { userId } = req.params
	const { thumbnail, about } = req.body
	const db = req.app.get('db')
	const profile = db.profiles.data.find(prof => prof.userId === parseInt(userId))

	if(profile) {
		db.profiles.data[userId] = {userId:parseInt( userId ), thumbnail, about }
		res.status(201).json(db)
	}
	else {
		res.status(500).send('Profile not found')
	}
}

module.exports = { update }
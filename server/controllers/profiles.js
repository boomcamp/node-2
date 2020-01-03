module.exports = {
    updateProf: function(req, res){
      const db = req.app.get('db');  
	  const {userId} = req.params;
	  const {thumbnail, about} = req.body;
	  const profile = db.profiles.data.find(data => data.userId === parseInt(userId));

	  if(profile){
	      db.profiles.data[userId] = {userId: parseInt(userId), thumbnail, about}
	      res.status(200).json(db);
	   } 
	   else {
	       res.status(500).send(`no data match ${profile}`)
	   }
    },

    getProf: function(req, res){
	    const db = req.app.get('db');
	  	res.status(200).json(db.profiles.data)
    }
}
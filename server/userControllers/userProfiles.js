const profile = (req, res) => {
	const db = req.app.get('db');
	const index = db.profiles.data.find(
		prof => parseInt(req.params.userId) === prof.userId
	);

	console.log(index);
	if (index) {
		const { thumbnail, about } = req.body;

		Object.assign(index, {
			...(thumbnail && { thumbnail }),
			...(about && { about })
		});
		return res.status(200).send(index);
	}
	return res.status(404).send({ error: 'Could not find user ID.' });
};

module.exports = {
	profile
};
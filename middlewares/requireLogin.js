// next is a callback to to say done w/ this middleware go to next one!
module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in!' });
	}
	// if a user is found then continue on you are authorized to continue...
	next();
};

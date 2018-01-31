module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		// return here is important.......
		return res.status(403).send({
			creditsError: 'Not enough credits, please add credits to continue.',
			testError: 'test error'
		});
	}
	// user has enough credits cont....
	next();
};

// back end only config for keys...
// heroku specificially sets this node_env
// require into files to use key
// const key = require('../config/keys'); keys.SECRET_KEY_NAME
if (process.env.NODE_ENV === 'production') {
	// we are in production
	module.exports = require('./prod');
} else {
	// return dev keys
	module.exports = require('./dev'); // pull in dev keys and export them
}

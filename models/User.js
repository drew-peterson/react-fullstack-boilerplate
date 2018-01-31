const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	_oAuthId: {
		type: String
	},
	credits: {
		type: Number,
		default: 0
	}
});

mongoose.model('user', userSchema);

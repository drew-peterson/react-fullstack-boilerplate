const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subdocument

const recipientSchema = new Schema({
	email: String,
	responded: {
		type: Boolean,
		default: false
	}
});

module.exports = recipientSchema; // we export subdocuments....

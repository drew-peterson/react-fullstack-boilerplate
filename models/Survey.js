const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

// there is a 4mb storage limit for each document
// if you made surveys a subdocuemtn on user then a user can only ever create X amount of survey before they run out
// if you make survey its own collection then a user can have unlimted surveys but each survey can only have X amount of recipets

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema], // subdocument array of objects
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	},
	_user: {
		type: Schema.Types.ObjectId, // store objectId of user
		ref: 'User' // use User collection
	},
	// used to see if survey is still active
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);

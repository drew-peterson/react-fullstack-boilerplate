const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.SENDGRID_KEY);

// https://www.npmjs.com/package/@sendgrid/mail
class Mailer {
	constructor({ subject, recipients }, template) {
		this.subject = subject;
		this.html = template;
		this.from = 'weeznog@gmail.com';
		this.to = this.formatAddresses(recipients);
		this.text = 'test text';
		// this.tracking_settings = {
		// 	click_tracking: {
		// 		enable: true
		// 	}
		// };
		// this.sandbox_mode = false;
	}

	async send() {
		return await sgMail.send(this);
	}

	formatAddresses(recipients) {
		return recipients.map(({ email }) => email);
	}
}

module.exports = Mailer;

const keys = require('../../config/keys');

module.exports = user => {
	console.log('keys', keys);
	return `
		<html>
			<body>
				<div style="text-align: center">
					<h3>Reset Password</h3>
					<p>Hey ${user.firstName} press the link below to reset password</p>
					<div>
						<a href="${keys.REDIRECT_DOMAIN}/resetPassword/${user.resetPasswordToken}">Reset Password</a>
					</div>
				</div>
			</body>
		</html>
	`;
};

const keys = require('../../config/keys');

module.exports = user => {
  return `
		<html>
			<body>
				<div style="text-align: center">
					<h3>Your password was recently updated</h3>
					<p>Hey ${
            user.firstName
          } Your password was recently updated, if you did not do this please contact: #email-here</p>
					<div>
						<a href="${keys.REDIRECT_DOMAIN}/login">Login</a>
					</div>
				</div>
			</body>
		</html>
	`;
};

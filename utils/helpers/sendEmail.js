import mailgun from 'mailgun-js';
import ErrorResponse from './errorResponse.js';
const mg = mailgun({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN,
});

const sendEmail = async ({ from, to, subject, html }, next) => {
	try {
		const data = {
			from: `Mobile Patient <${from}>`,
			to,
			subject,
			html,
		};
		const response = await mg.messages().send(data);
		return response;
	} catch (error) {
		return next(new ErrorResponse(error.message, 422));
	}
};

export default sendEmail;

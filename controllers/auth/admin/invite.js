import { customAlphabet } from 'nanoid';
import cache from '../../../configs/cache.js';
import asyncHandler from '../../../middlewares/async.js';
import sendEmail from '../../../utils/helpers/sendEmail.js';

const nanoid = customAlphabet('0123456789', 6);

const invite = asyncHandler(async (req, res, next) => {
	const { email } = req.body;

	const inviteCode = nanoid(6);

	console.log(inviteCode);

	const emailData = {
		to: email,
		from: process.env.TEST_EMAIL,
		subject: 'Admin Invite',
		html: `
    <h2>Hi ${email.split('@')[0]}!</h2>
    <p>You have been invited as an admin on Mobile wallet, please button below to accept.</p>
    <a target="_blank" href="http://localhost:3001/auth/admin?inviteCode=${inviteCode}" style="color: #fff; text-decoration: none">
    <button
    style="
      background: #000;
      border: none;
      width: max-content;
      margin: 10px auto 0;
      padding: 10px;
      color: #fff;
    "
  >
  Register
  </button>
    </a>
    `,
	};

	const emailResponse = await sendEmail(emailData, next);

	console.log('EMAIL RESPONSE: ', emailResponse);

	cache.set(email, inviteCode, 60 * 10);

	if (emailResponse) {
		return res.status(200).json({
			status: true,
			message: 'invite sent',
		});
	}
});

export default invite;

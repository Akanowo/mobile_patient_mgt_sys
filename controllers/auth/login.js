import bcrypt from 'bcrypt';
import asyncHandler from '../../middlewares/async.js';
import { User } from '../../models/user/User.js';
import ErrorResponse from '../../utils/helpers/errorResponse.js';
import generateAccessToken from '../../utils/helpers/generateAccessToken.js';

const handleLogin = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) return next(new ErrorResponse('invalid email or password', 401));

	if (!(await bcrypt.compare(password, user.password)))
		return next(new ErrorResponse('invalid email or password', 401));

	// generate access token
	const access_token = generateAccessToken({ _id: user._id, type: user.type });

	const returnData = {
		access_token,
		...user._doc,
	};

	delete returnData.password;
	return res.status(200).json({
		status: true,
		message: 'login successful',
		data: returnData,
	});
});

export default handleLogin;

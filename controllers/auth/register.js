import { nanoid } from 'nanoid';
import cache from '../../configs/cache.js';

import asyncHandler from '../../middlewares/async.js';
import Record from '../../models/record/record.js';
import { Patient, Admin, User, Staff } from '../../models/user/User.js';
import ErrorResponse from '../../utils/helpers/errorResponse.js';
import generateAccessToken from '../../utils/helpers/generateAccessToken.js';
import hashText from '../../utils/helpers/hashText.js';

const register = asyncHandler(async (req, res, next) => {
	const {
		firstName,
		lastName,
		email,
		password,
		address,
		gender,
		type,
		inviteCode,
		matricNumber,
	} = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		return next(new ErrorResponse('user with email already exists', 400));
	}

	let data = {
		firstName,
		lastName,
		email,
		password: await hashText(password),
		address,
		gender,
		type,
	};

	let newUser;

	if (type === 'PATIENT') {
		data.patientId = `${firstName[0]}${lastName[0]}-${nanoid(8)}`;
		data.matricNumber = matricNumber;
		newUser = new Patient(data);
	}

	if (type === 'ADMIN' || type === 'STAFF') {
		data.staffId = nanoid(10);

		const cachedCode = cache.take(email);

		if (cachedCode !== inviteCode)
			return next(new ErrorResponse('Invalid code or code expired', 403));

		if (type === 'ADMIN') {
			newUser = new Admin(data);
		} else {
			newUser = new Staff(data);
		}
	}

	const doc = await newUser.save();

	// create record if patient
	if (doc.type === 'PATIENT') {
		await Record.create({ user: doc._id });
	}

	const access_token = generateAccessToken({ _id: doc._id, type: doc.type });

	const returnData = { user: doc._doc, access_token };

	delete returnData.user.password;

	return res.status(200).json({
		status: true,
		message: 'signup successful',
		data: returnData,
	});
});

export default register;

import jwt from 'jsonwebtoken';
import { User } from '../models/user/User.js';

import ErrorResponse from '../utils/helpers/errorResponse.js';
import asyncHandler from './async.js';

export const authenticate = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) return next(new ErrorResponse('No token passed', 401));

	const token = authorization.split(' ')[1];

	if (!token) return next(new ErrorResponse('No token passed', 401));

	jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
		if (err) return next(new ErrorResponse(err.message, 401));

		const { _id } = payload;

		const user = await User.findById(_id);
		if (!user) return next(new ErrorResponse('Invalid token', 401));

		req.user = user;
		next();
	});
});

export const authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.type))
			return next(
				new ErrorResponse('Not permitted to carry out that action', 403)
			);
		next();
	};
};

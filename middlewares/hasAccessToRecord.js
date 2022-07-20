import { ObjectId } from 'mongodb';
import Record from '../models/record/record.js';
import ErrorResponse from '../utils/helpers/errorResponse.js';
import asyncHandler from './async.js';

const hasAccessToRecord = asyncHandler(async (req, res, next) => {
	const { user } = req;
	const { recordId } = req.params;

	if (user.type === 'PATIENT') {
		const hasAccess = await Record.findOne({
			_id: new ObjectId(recordId),
			user: user._id,
		}).lean();

		if (!hasAccess)
			return next(
				new ErrorResponse('You are not allowed to access this record', 403)
			);

		next();
	}

	if (user.type === 'STAFF') {
		const hasAccess = await Record.findOne({
			_id: new ObjectId(recordId),
			hasAccess: { $in: [user._id] },
		}).lean();

		if (!hasAccess)
			return next(
				new ErrorResponse('You are not allowed to access this record', 403)
			);
		next();
	} else {
		next();
	}
});

export default hasAccessToRecord;

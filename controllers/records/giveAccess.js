import asyncHandler from '../../middlewares/async.js';
import Record from '../../models/record/record.js';
import ErrorResponse from '../../utils/helpers/errorResponse.js';
import { ObjectId } from 'mongodb';
import { Staff, User } from '../../models/user/User.js';

const giveAccess = asyncHandler(async (req, res, next) => {
	const { recordId } = req.params;

	const { staffId } = req.body;

	const record = await Record.findById(recordId);

	if (!record) return next(new ErrorResponse('Record not found', 404));

	const staff = await Staff.findOne({ staffId });

	const updatedRecord = await Record.updateOne(
		{ _id: new ObjectId(recordId) },
		{
			$push: { hasAccess: staff._id },
		},
		{ new: true }
	);

	return res.status(200).json({
		status: true,
		message: 'access granted successfully',
		data: updatedRecord,
	});
});

export default giveAccess;

import { ObjectId } from 'mongodb';
import asyncHandler from '../../middlewares/async.js';
import Record from '../../models/record/record.js';

const createRecord = asyncHandler(async (req, res, next) => {
	const { userId } = req.body;

	const record = await Record.create({ user: new ObjectId(userId) });

	return res.status(201).json({
		status: true,
		message: 'Record created successfully',
		data: record,
	});
});

export default createRecord;

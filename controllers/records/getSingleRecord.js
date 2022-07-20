import asyncHandler from '../../middlewares/async.js';
import Record from '../../models/record/record.js';
import ErrorResponse from '../../utils/helpers/errorResponse.js';

const getSingleRecord = asyncHandler(async (req, res, next) => {
	const { recordId } = req.params;

	const record = await Record.findById(recordId).populate('user services');

	if (!record) return next(new ErrorResponse('Record not found', 404));

	return res.status(200).json({
		status: true,
		message: 'Record fetced successfully',
		data: record,
	});
});

export default getSingleRecord;

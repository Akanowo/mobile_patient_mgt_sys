import asyncHandler from '../../middlewares/async.js';
import Record from '../../models/record/record.js';
import ErrorResponse from '../../utils/helpers/errorResponse.js';
import { ObjectId } from 'mongodb';
import Service from '../../models/services/Service.js';
import Bill from '../../models/bill/bill.js';

const attachServiceToRecord = asyncHandler(async (req, res, next) => {
	const { recordId } = req.params;

	const { services } = req.body;

	const record = await Record.findById(recordId);

	if (!record) return next(new ErrorResponse('Record not found', 404));

	const updatedRecord = await Record.updateOne(
		{ _id: new ObjectId(recordId) },
		[
			{
				$set: {
					services,
				},
			},
		],
		{ new: true }
	);

	const ids = services.map((service) => new ObjectId(service));

	console.log('IDS: ', ids);

	const dbServices = await Service.find({ _id: { $in: [ids] } });

	let totalBill = 0;

	const charges = dbServices.map((service) => service.charge);

	totalBill = charges.reduce(
		(prevValue, currentValue) => prevValue + currentValue,
		totalBill
	);

	// Create bill
	const newBill = await Bill.create({ amount: totalBill, record: recordId });

	return res.status(200).json({
		status: true,
		message: 'services attached successfully',
		data: {
			recordUpdate: updatedRecord,
			bill: newBill,
		},
	});
});

export default attachServiceToRecord;

import asyncHandler from '../../middlewares/async.js';
import Service from '../../models/services/Service.js';

const getServices = asyncHandler(async (req, res, next) => {
	const services = await Service.find()
		.populate([
			{
				path: 'createdBy',
				select: '-password -__v',
			},
		])
		.sort('-createdAt');

	return res.status(200).json({
		status: 200,
		message: 'services fetched successfully',
		count: services.length,
		data: services,
	});
});

export default getServices;

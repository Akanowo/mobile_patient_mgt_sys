import asyncHandler from '../../middlewares/async.js';
import Service from '../../models/services/Service.js';

const createService = asyncHandler(async (req, res, next) => {
	const { name, description, charge } = req.body;

	const newService = await Service.create({
		name,
		description,
		charge,
		createdBy: req.user._id,
	});

	return res.status(200).json({
		status: 200,
		message: 'service created successfully',
		data: newService,
	});
});

export default createService;

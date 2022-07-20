import asyncHandler from '../../middlewares/async.js';
import Service from '../../models/services/Service.js';
import ErrorResponse from '../../utils/helpers/errorResponse.js';

const deleteService = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	const deletedService = await Service.findByIdAndDelete(id);

	if (!deletedService) {
		return next(new ErrorResponse('Invalid service id', 400));
	}

	return res.status(200).json({
		status: 200,
		message: 'service deleted successfully',
	});
});

export default deleteService;

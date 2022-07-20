import ErrorResponse from '../utils/helpers/errorResponse.js';

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	console.log(err.stack.red);
	console.log(err.name);

	if (err.name === 'CastError') {
		const message = `Resource with id ${error.value} not found`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value entered';
		error = new ErrorResponse(message, 400);
	}

	// Mongoose Validation Error
	if (err.name === 'ValidationError') {
		try {
			const errorObject = Object.values(err.errors);
			console.log(errorObject);
			const message = Object.values(err.errors).map((val) => val.message);
			error = new ErrorResponse(message, 400);
		} catch (error) {
			error = new ErrorResponse('SERVER ERROR', 500);
		}
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server Error',
	});
};

export default errorHandler;

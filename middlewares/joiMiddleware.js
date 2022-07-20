import ErrorResponse from '../utils/helpers/errorResponse.js';

const joiMiddleware = (validator) => async (req, res, next) => {
	try {
		await validator.validateAsync(req.body);

		if (req.body.type) {
			if (req.body.type === 'PATIENT' && !req.body.matricNumber) {
				return next(
					new ErrorResponse('matric number is required for patient', 400)
				);
			}

			if (req.body.type === 'ADMIN' && !req.body.inviteCode) {
				return next(
					new ErrorResponse('invite code is required for admin', 400)
				);
			}
		}
		next();
	} catch (error) {
		next(error);
	}
};

export default joiMiddleware;

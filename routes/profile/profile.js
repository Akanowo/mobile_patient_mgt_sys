import { Router } from 'express';
import updateProfile from '../../controllers/profile/updateProfile.js';
import { authenticate, authorize } from '../../middlewares/authenticate.js';
import joiMiddleware from '../../middlewares/joiMiddleware.js';
import { updateProfileValidator } from '../../validators/index.js';

const profileRouter = Router();

profileRouter
	.route('/:id')
	.put(
		authenticate,
		authorize('PATIENT'),
		joiMiddleware(updateProfileValidator),
		updateProfile
	);

export default profileRouter;

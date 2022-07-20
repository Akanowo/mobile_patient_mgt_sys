import { Router } from 'express';
import invite from '../../controllers/auth/admin/invite.js';
import handleLogin from '../../controllers/auth/login.js';
import register from '../../controllers/auth/register.js';
import { authenticate, authorize } from '../../middlewares/authenticate.js';
import joiMiddleware from '../../middlewares/joiMiddleware.js';
import {
	inviteValidator,
	loginValidator,
	registerValidator,
} from '../../validators/index.js';

const authRouter = Router();

authRouter
	.route('/invite')
	.post(
		authenticate,
		authorize('SUPERADMIN', 'ADMIN'),
		joiMiddleware(inviteValidator),
		invite
	);

authRouter.route('/login').post(joiMiddleware(loginValidator), handleLogin);

authRouter.route('/register').post(joiMiddleware(registerValidator), register);

export default authRouter;

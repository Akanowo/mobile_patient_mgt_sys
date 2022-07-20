import { Router } from 'express';
import createService from '../../controllers/services/createService.js';
import deleteService from '../../controllers/services/deleteService.js';
import getServices from '../../controllers/services/getServices.js';
import { authenticate, authorize } from '../../middlewares/authenticate.js';
import joiMiddleware from '../../middlewares/joiMiddleware.js';
import { createServiceValidator } from '../../validators/index.js';

const serviceRouter = Router();

serviceRouter
	.route('/:id')
	.delete(authenticate, authorize('SUPERADMIN', 'ADMIN'), deleteService);

serviceRouter
	.route('/')
	.get(authenticate, authorize('SUPERADMIN', 'ADMIN', 'STAFF'), getServices)
	.post(
		authenticate,
		authorize('SUPERADMIN', 'ADMIN'),
		joiMiddleware(createServiceValidator),
		createService
	);

export default serviceRouter;

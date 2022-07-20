import { Router } from 'express';
import createPayment from '../../controllers/payment/createPayment.js';
import verifyPayment from '../../controllers/payment/verifyPayment.js';
import { authenticate, authorize } from '../../middlewares/authenticate.js';
import joiMiddleware from '../../middlewares/joiMiddleware.js';

const paymentRouter = Router();

paymentRouter
	.route('/:billId/verify')
	.post(authenticate, authorize('PATIENT'), verifyPayment);

paymentRouter
	.route('/:billId')
	.post(authenticate, authorize('PATIENT'), createPayment);

export default paymentRouter;

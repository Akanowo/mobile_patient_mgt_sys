import { Router } from 'express';

import authRouter from './auth/auth.js';
import paymentRouter from './payment/payment.js';
import profileRouter from './profile/profile.js';
import recordsRouter from './records/records.js';
import serviceRouter from './services/services.js';

const v1Router = Router();

// v1 routes
v1Router.use('/auth', authRouter);
v1Router.use('/services', serviceRouter);
v1Router.use('/records', recordsRouter);
v1Router.use('/payment', paymentRouter);
v1Router.use('/profile', profileRouter);

export default v1Router;

import { Router } from 'express';
import attachServiceToRecord from '../../controllers/records/attachServiceToRecord.js';
import createRecord from '../../controllers/records/createRecord.js';
import getRecords from '../../controllers/records/getRecords.js';
import getSingleRecord from '../../controllers/records/getSingleRecord.js';
import giveAccess from '../../controllers/records/giveAccess.js';
import { authenticate, authorize } from '../../middlewares/authenticate.js';
import hasAccessToRecord from '../../middlewares/hasAccessToRecord.js';

const recordsRouter = Router();

recordsRouter
	.route('/user/:userId')
	.get(authenticate, authorize('SUPERADMIN', 'ADMIN', 'STAFF'));

recordsRouter
	.route('/:recordId/grantaccess')
	.patch(authenticate, authorize('SUPERADMIN', 'ADMIN'), giveAccess);

recordsRouter
	.route('/:recordId/service')
	.patch(
		authenticate,
		authorize('SUPERADMIN', 'ADMIN', 'STAFF'),
		hasAccessToRecord,
		attachServiceToRecord
	);

recordsRouter
	.route('/:recordId')
	.get(
		authenticate,
		authorize('SUPERADMIN', 'ADMIN', 'STAFF', 'PATIENT'),
		hasAccessToRecord,
		getSingleRecord
	);

recordsRouter
	.route('/')
	.get(
		authenticate,
		authorize('SUPERADMIN', 'ADMIN', 'STAFF', 'PATIENT'),
		getRecords
	)
	.post(authenticate, authorize('SUPERADMIN', 'ADMIN'), createRecord);

export default recordsRouter;

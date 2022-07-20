import asyncHandler from '../../middlewares/async.js';
import { nanoid } from 'nanoid';
import Bill from '../../models/bill/bill.js';
import Transaction from '../../models/transactions/transaction.js';
import ErrorResponse from '../../utils/helpers/errorResponse.js';

const createPayment = asyncHandler(async (req, res, next) => {
	const { billId } = req.params;

	const bill = await Bill.findById(billId)
		.populate('record')
		.populate([
			{
				path: 'record.user',
				select: 'firstName lastName email',
			},
		]);

	console.log(bill);

	const payload = {
		tx_ref: nanoid(),
		amount: `${bill.amount}`,
		currency: bill.currency,
		redirect_url:
			process.env.NODE_ENV === 'production'
				? 'https://mobile-patient-mgt-sys.netlify.app/payment/verify'
				: 'http://localhost:3000/payment/verify',
		customer: {
			email,
			name: `${bill.record.user.firstName} ${bill.record.user.lastName}`,
		},
		// customizations: {
		//   title: 'Afrocamgist',
		//   logo: 'https://afrocamgist.com/images/logo.png',
		// },
	};

	const configs = {
		headers: {
			authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
		},
	};

	console.log(configs);

	const response = await axios.post(
		'https://api.flutterwave.com/v3/payments',
		payload,
		configs
	);

	if (response.data.status === 'error') {
		return next(new ErrorResponse(response.data.message, 422));
	}

	// create payment in db
	const data = {
		amount,
		tx_ref: payload.tx_ref,
		currency: payload.currency,
	};

	await Transaction.create(data);

	return res.status(200).json({
		status: true,
		message: 'payment created successfully',
		data: response.data.data,
	});
});

export default createPayment;

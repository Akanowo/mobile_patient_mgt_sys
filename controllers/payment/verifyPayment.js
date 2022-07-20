import asyncHandler from '../../middlewares/async.js';
import Bill from '../../models/bill/bill.js';
import Transaction from '../../models/transactions/transaction.js';
import flwClient from '../../utils/flutterwave.js';
import ErrorResponse from '../../utils/helpers/errorResponse.js';

const verifyPayment = asyncHandler(async (req, res, next) => {
	const { txt_ref, transaction_id } = req.body;

	console.log(txt_ref);
	const transaction = await Transaction.findOne({ txt_ref });

	if (!transaction) {
		return next(new ErrorResponse('Invalid reference', 400));
	}

	const verifiedPayment = await flwClient.Transaction.verify({
		id: transaction_id,
	});

	console.log('Flutterwave verified payment: ', verifiedPayment);

	if (!verifiedPayment) {
		return next(
			new ErrorResponse('Something unexpected happened, please try again', 422)
		);
	}

	if (!verifiedPayment.data) {
		return next(
			new ErrorResponse('Something unexpected happened, please try again', 422)
		);
	}

	if (verifiedPayment.status === 'error') {
		return next(new ErrorResponse(verifiedPayment.message, 400));
	}

	if (verifiedPayment.data.status !== 'successful') {
		return next(new ErrorResponse('Payment unsuccessful', 422));
	}

	if (
		transaction.amount !== verifiedPayment.data.amount &&
		transaction.currency !== verifiedPayment.data.currency
	) {
		return next(new ErrorResponse('Invalid transaction', 400));
	}

	const updateData = {
		...verifiedPayment.data,
	};

	const updatedTransaction = await Transaction.findByIdAndUpdate(
		transaction._id,
		updateData
	);

	// update bill document
	const { billId } = req.params;

	const billUpdate = await Bill.findByIdAndUpdate(billId, {
		paid: true,
		transaction: updatedTransaction._id,
	});

	return res.status(200).json({
		status: true,
		message: 'Payment complete',
		data: {
			payment: verifiedPayment.data,
			billUpdate,
		},
	});
});

export default verifyPayment;

import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const transactionSchema = new Schema(
	{
		id: String,
		tx_ref: String,
		flw_ref: String,
		amount: String,
		charged_amount: String,
		app_fee: String,
		processor_response: String,
		auth_model: String,
		currency: String,
		ip: String,
		app_fee: String,
		narration: String,
		status: String,
		auth_url: String,
		payment_type: String,
		plan: String,
		fraud_status: String,
		charge_type: String,
		customer: Object,
	},
	{ strict: false, timestamps: true }
);

const Transaction = model('Transaction', transactionSchema);

export default Transaction;

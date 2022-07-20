import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const billSchema = new Schema(
	{
		record: {
			type: Types.ObjectId,
			ref: 'Record',
			required: true,
		},
		currency: {
			type: String,
			default: 'NGN',
		},
		amount: {
			type: Number,
			required: true,
		},
		paid: {
			type: Boolean,
			default: false,
		},
		transaction: {
			type: Types.ObjectId,
			ref: 'Transaction',
		},
	},
	{ timestamps: true }
);

const Bill = model('Bill', billSchema);

export default Bill;

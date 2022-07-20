import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const recordSchema = new Schema(
	{
		services: {
			type: [Types.ObjectId],
			ref: 'Service',
		},
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		hasAccess: {
			type: [Types.ObjectId],
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Record = model('Record', recordSchema);

export default Record;

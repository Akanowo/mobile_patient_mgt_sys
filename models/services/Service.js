import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const serviceSchema = new Schema(
	{
		name: {
			type: String,
			max: 50,
			required: [1, 'service name is required'],
		},
		description: {
			type: String,
			maxLength: 250,
		},
		charge: {
			type: Number,
			default: 0,
		},
		createdBy: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const Service = model('Service', serviceSchema);

export default Service;

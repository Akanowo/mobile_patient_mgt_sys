import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import {
	emailRegex,
	hostels,
	bloodGroups,
	genotypes,
} from '../../utils/constants/constants.js';

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [1, 'user firstname is required'],
		},
		lastName: {
			type: String,
			required: [1, 'user lastname is required'],
		},
		gender: {
			type: String,
			enum: ['MALE', 'FEMALE'],
			required: [1, 'user gender is required'],
		},
		address: {
			type: String,
		},
		email: {
			type: String,
			required: [1, 'user email is required'],
			match: [emailRegex, 'invalid email address'],
		},
		password: {
			type: String,
			required: [1, 'user password is required'],
		},
		type: {
			type: String,
			enum: ['SUPERADMIN', 'ADMIN', 'STAFF', 'PATIENT'],
		},
	},
	{ timestamps: true }
);

const adminSchema = new Schema({
	staffId: {
		type: String,
		required: [1, 'staff id is required'],
	},
});

const staffSchema = new Schema({
	staffId: {
		type: String,
		required: [1, 'staff id is required'],
	},
});

const patientSchema = new Schema({
	patientId: {
		type: String,
		required: [1, 'patient id is required'],
	},
	age: {
		type: Number,
	},
	matricNumber: {
		type: String,
		required: [1, 'matric number is required'],
	},
	hostel: {
		type: String,
		enum: hostels,
	},
	allergies: String,
	bloodGroup: {
		type: String,
		enum: bloodGroups,
	},
	genotype: {
		type: String,
		enum: genotypes,
	},
	department: String,
});

export const User = model('User', userSchema);

export const Patient = User.discriminator('Patient', patientSchema);

export const Admin = User.discriminator('Doctor', adminSchema);

export const Staff = User.discriminator('Staff', staffSchema);

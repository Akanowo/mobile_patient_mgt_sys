import Joi from 'joi';
import {
	bloodGroups,
	genotypes,
	hostels,
} from '../utils/constants/constants.js';

const loginValidator = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

const registerValidator = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string().email().required(),
	gender: Joi.string().required().valid('MALE', 'FEMALE'),
	address: Joi.string().required(),
	password: Joi.string().required(),
	type: Joi.string().required().valid('ADMIN', 'STAFF', 'PATIENT'),
	inviteCode: Joi.string(),
	matricNumber: Joi.string(),
});

const inviteValidator = Joi.object({
	email: Joi.string().email().required(),
});

const createServiceValidator = Joi.object({
	name: Joi.string().required().max(50),
	description: Joi.string().max(250),
	charge: Joi.number(),
});

const updateProfileValidator = Joi.object({
	genotype: Joi.string().valid(...genotypes),
	bloodGroup: Joi.string().valid(...bloodGroups),
	age: Joi.number(),
	hostel: Joi.string().valid(...hostels),
	allergies: Joi.string(),
	department: Joi.string(),
});

export {
	loginValidator,
	registerValidator,
	inviteValidator,
	createServiceValidator,
	updateProfileValidator,
};

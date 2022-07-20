import { ObjectId } from 'mongodb';
import asyncHandler from '../../middlewares/async.js';
import Record from '../../models/record/record.js';

const getRecords = asyncHandler(async (req, res, next) => {
	let query;

	// Copy req.query
	const reqQuery = { ...req.query };

	console.log(req.query);

	const { user } = req;

	// Fields to exculde
	const removeFields = ['select', 'sort', 'page', 'limit'];

	if (user.type === 'PATIENT') removeFields.push('user');

	// Loop over removeFields and delete them from reqQuery
	// @ts-ignore
	removeFields.forEach((param) => delete reqQuery[param]);

	if (reqQuery.user) {
		reqQuery.user = new ObjectId(reqQuery.user);
	}

	// Create query string
	let queryStr = JSON.stringify(reqQuery);

	// Create operators ($gt, $lt, etc)
	queryStr = queryStr.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);

	if (user.type === 'PATIENT') {
		query = Record.find({ user: user._id, ...JSON.parse(queryStr) }).populate(
			'user services'
		);
	} else if (user.type === 'STAFF') {
		query = Record.find({
			hasAccess: { $in: [user._id] },
			...JSON.parse(queryStr),
		}).populate('user services');
	} else {
		query = Record.find(JSON.parse(queryStr)).populate('user services');
	}

	// Select Fields
	if (req.query.select) {
		// @ts-ignore
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	// Sort
	if (req.query.sort) {
		// @ts-ignore
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('-createdAt');
	}

	// Pagination
	// @ts-ignore
	const page = parseInt(req.query.page, 10) || 1;
	// @ts-ignore
	const limit = parseInt(req.query.limit, 10) || 10;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await (await Record.find(JSON.parse(queryStr))).length;

	query = query.skip(startIndex).limit(limit);

	// Execute query
	const records = await query.exec();

	// Pagination result
	const pagination = {
		totalRecords: total,
		pageTotal: Math.ceil(total / limit),
	};

	if (endIndex < total) {
		// @ts-ignore
		pagination.next = {
			page: page + 1,
			limit,
		};
	}

	if (startIndex > 0) {
		// @ts-ignore
		pagination.prev = {
			page: page - 1,
			limit,
		};
	}

	return res.status(200).json({
		status: true,
		count: records.length,
		message: 'Records fetched successfully',
		pagination,
		data: records,
	});
});

export default getRecords;

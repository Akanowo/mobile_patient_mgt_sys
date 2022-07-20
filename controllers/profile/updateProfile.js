import { User } from '../../models/user/User.js';
import asyncHandler from '../../middlewares/async.js';

const updateProfile = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const { ...update } = req.body;

	console.log(update);

	const profileUpdate = await User.findByIdAndUpdate(
		id,
		{ update },
		{ new: true }
	).select('-password -__v');

	return res.status(200).json({
		status: true,
		message: 'profile update successfully',
		data: profileUpdate,
	});
});

export default updateProfile;

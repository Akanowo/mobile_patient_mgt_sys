import 'dotenv/config';
import { User } from './models/user/User.js';

import { dbConnect } from './configs/dbConnect.js';
import hashText from './utils/helpers/hashText.js';

const importData = async () => {
	await dbConnect();
	const defaultAdmins = [
		{
			firstName: 'Akanowo',
			lastName: 'Uko',
			email: 'ukoakanowo98@gmail.com',
			password: await hashText('password123'),
			address: 'Bells University',
			type: 'SUPERADMIN',
			gender: 'MALE',
		},
	];

	const admins = await User.insertMany(defaultAdmins);

	console.log('inserted admins: ', admins);
	process.exit();
};

const deleteData = async () => {
	await dbConnect();

	const admins = await User.deleteMany({ type: 'SUPERADMIN' });

	console.log('deleted admins: ', admins);
	process.exit();
};

console.log('argument: ', process.argv[2]);

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
} else {
	console.log('invalid argument passed');
	process.exit();
}

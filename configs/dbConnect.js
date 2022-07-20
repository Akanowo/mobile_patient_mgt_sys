import mongoose from 'mongoose';

export const dbConnect = async () => {
	return mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
		})
		.then(() => {
			console.log('DB connection established');
		})
		.catch((err) => {
			console.log('Error connecting to db: ', err);
		});
};

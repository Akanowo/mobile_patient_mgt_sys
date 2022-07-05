const mongoose = require('mongoose');

const connectDB = async () => {
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

module.exports = connectDB;

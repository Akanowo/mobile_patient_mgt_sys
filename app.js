const express = require('express');
require('dotenv').config();
const connectDB = require('./configs/dbConnect');
const v1Router = require('./routes');

const PORT = process.env.PORT || 8080;

const app = express();

console.log(app.get('env'));

// app setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize mongodb connection
connectDB();

// routes
app.use('/api/v1', v1Router);

app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
});

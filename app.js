import 'dotenv/config';
import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import v1Router from './routes/index.js';
import { dbConnect } from './configs/dbConnect.js';

const PORT = process.env.PORT || 8080;

const app = express();

console.log(app.get('env'));

// app setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize mongodb connection
dbConnect();

// routes
app.use('/api/v1', v1Router);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
});

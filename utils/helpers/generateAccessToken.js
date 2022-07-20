import jwt from 'jsonwebtoken';

const generateAccessToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

	return token;
};

export default generateAccessToken;

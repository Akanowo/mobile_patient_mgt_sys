import bcrypt from 'bcrypt';

const hashText = async (text) => {
	const hashedValue = await bcrypt.hash(text, 10);

	return hashedValue;
};

export default hashText;

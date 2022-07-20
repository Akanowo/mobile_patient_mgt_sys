const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const hostels = [
	'MALE SILVER 1',
	'MALE SILVER 2',
	'MALE SILVER 3',
	'FEMALE SILVER',
	'FEMALE BRONZE',
	'FEMALE BRONZE ANNEX',
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const genotypes = ['AA', 'AS', 'SS', 'AC'];

export { emailRegex, hostels, bloodGroups, genotypes };

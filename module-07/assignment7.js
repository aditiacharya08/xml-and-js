const data = [
	{ born: 1870, died: 1924 },
	{ born: 1893, died: 1976 },
	{ born: 1869, died: 1948 },
	{ born: 1901, died: 1989 },
];

const age = data.map(({ born, died }) => died - born);
console.log("Age: ",age);

const filtered = age.filter((age) => age > 75);
console.log('Filered age: ', filtered);

const oldest = filtered.reduce((accum, age) => {
	if (age > accum) {
		accum = age;
	}
	return accum;
}, 0);
console.log(`Highest age : `, oldest);

const age_chaining = data
	.map(({ born, died }) => died - born)
	.filter((age_chaining)=> age_chaining > 75)
	.reduce((age_chaining, temp) => {
		if (age_chaining > temp) {
			temp = age_chaining;
		}
		return temp;
	}, 0);
console.log('Highest age obtained by chaining: ',age_chaining)
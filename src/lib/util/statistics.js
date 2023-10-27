export function count(list, property, value) {
	let amount = 0;
	for (const item of list) {
		if (item[property] === value) {
			amount++;
		}
	}
	return amount;
}

export function countParties(parties) {
	let amounts = [];
	for (const [party, candidates] of Object.entries(parties)) {
		amounts.push([party, candidates.length]);
	}
	amounts.sort(function(a, b) {
		return b[1] - a[1];
	});
	return amounts;
}

export function countUnkowns(list, property) {
	let amounts = {};

	
	for (const [key, item] of Object.entries(list)) {
		const value = item[property[0]][property[1]][property[2]];
		if (value in amounts) {
			amounts[value] += 1;
		} else {
			amounts[value] = 1;
		}
	}

	let arrayAmounts = [];
	for (const [key, value] of Object.entries(amounts)) {
		arrayAmounts.push([key, value]);
	}
	arrayAmounts.sort(function(a, b) {
		return b[1] - a[1];
	});

	return arrayAmounts;
}

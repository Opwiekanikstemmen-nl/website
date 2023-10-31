import { slugify } from '$lib/util/candidates';

// Function to get a nested property from an object using dot notation
function getNestedProperty(obj, keyPath) {
	const keys = keyPath.split('.');
	let current = obj;

	for (const key of keys) {
		if (current == null) return null;
		current = current[key];
	}

	return current;
}

// Function to check if a value is present in an array or is equal to a given value
function matchesFilter(key, value, filter) {
	if (value == null) {
		if (key ==='geslacht' && filter.includes('o') && value === null) return true;
		return false;
	}

	if (key === 'naam' && typeof filter === 'string') {
		return value.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
	}

	if (key === 'geslacht' && typeof filter === 'string') {
		return value.includes(filter);
	}

	if (key === 'verkiezingen.tk2023.kieskringen' && typeof filter === 'string') {
		return value.includes(filter);
	}

	if (key === 'verkiezingen.tk2023.woonplaats' && typeof filter === 'string') {
		return value.includes(filter);
	}

	if (key === 'verkiezingen.tk2023.gemeente.stedelijkheid' && typeof filter === 'string') {
		return value.includes(filter);
	}


	if (Array.isArray(filter) && filter.length) {
		return filter.includes(slugify(value));
	}

	return value === filter;
}

// Function to apply multiple filters to an array
export function applyFilters(data, filters) {
	return data.filter(item => {
		return Object.keys(filters).every(key => {
			const filterValue = filters[key];

			// Skip empty filters
			if (filterValue == null || (Array.isArray(filterValue) && filterValue.length === 0)) {
				return true;
			}
			const value = getNestedProperty(item, key);

			return matchesFilter(key, value, filters[key]);
		});
	});
}

// Function to sort an array of objects by a given key in ascending or descending order
export function sortData(data, key, direction = 'asc') {
	return data.sort((a, b) => {
		const valueA = getNestedProperty(a, key);
		const valueB = getNestedProperty(b, key);
		if (valueA < valueB) return direction === 'asc' ? -1 : 1;
		if (valueA > valueB) return direction === 'asc' ? 1 : -1;
		return 0;
	});
}
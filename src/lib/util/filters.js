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
	if (value == null) return false;

	if (key === 'naam' && typeof filter === 'string') {
		return value.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
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
			const value = getNestedProperty(item, key);
			return matchesFilter(key, value, filters[key]);
		});
	});
}
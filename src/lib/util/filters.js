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

function resolvePeilingpositie(candidate, partiesByName) {
	if (!candidate || !candidate.verkiezingen?.tk2025) return null;

	const partijNaam = candidate.verkiezingen.tk2025.partij_naam;
	const lijstnummer = Number(candidate.verkiezingen.tk2025.lijstnummer);
	const partij =
		partiesByName?.get?.(partijNaam) ??
		(partiesByName && partijNaam ? partiesByName[partijNaam] : null);

	if (!partij || !partij.polls || Number.isNaN(lijstnummer)) {
		return 'kleine-kans';
	}

	const min = Number(partij.polls.min);
	const max = Number(partij.polls.max);

	if (Number.isFinite(min) && lijstnummer < min) {
		return 'grote-kans';
	}

	if (Number.isFinite(max) && lijstnummer < max) {
		return 'redelijke-kans';
	}

	return 'kleine-kans';
}

// Function to check if a value is present in an array or is equal to a given value
function matchesFilter(key, value, filter, item, context = {}) {
	if (key === 'leeftijd') {
		let min = parseInt(filter['min']);
		let max = parseInt(filter['max']);
		if ((min || max) && filter['onbekend'] == 'true' && value == null) return true;
		if (min && max && max >= min) {
			return value >= min && value <= max;
		} else if (min) {
			return value >= min;
		} else if (max) {
			return value <= max;
		} else {
			return true;
		}
	}

	if (key === 'naam' && typeof filter === 'string') {
		return value.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
	}

	if (key === 'geslacht' && typeof filter === 'string') {
		return value.includes(filter);
	}

	if (key === 'verkiezingen.tk2025.kieskringen' && typeof filter === 'string') {
		return value.includes(filter);
	}

	if (key === 'verkiezingen.tk2025.woonplaats' && typeof filter === 'string') {
		return value.includes(filter);
	}

	if (key === 'verkiezingen.tk2025.gemeente.stedelijkheid' && typeof filter === 'string') {
		return value.includes(filter);
	}

	if (key === 'rainbowvote' || key === 'kleurdekamer' || key === 'vinddebeta' || key === 'nerdvote') {
		return value == true;
	}

	if (key === 'tweedekamer.member' || key === 'eerstekamer.member') {
		return value == true;
	}

	if (key === 'peilingpositie') {
		const chance = resolvePeilingpositie(item, context.partiesByName);
		if (Array.isArray(filter) && filter.length) {
			return filter.includes(chance);
		}
		return true;
	}

	if (value == null) {
		if (key === 'geslacht' && filter.includes('o') && value === null) return true;
		return false;
	}


	if (Array.isArray(filter) && filter.length) {
		return filter.includes(slugify(value));
	}

	return value === filter;
}

// Function to apply multiple filters to an array
export function applyFilters(data, filters, options = {}) {
	return data.filter(item => {
		return Object.keys(filters).every(key => {
			const filterValue = filters[key];

			// Skip empty filters
			if (filterValue == null || (Array.isArray(filterValue) && filterValue.length === 0)) {
				return true;
			}
			const value = getNestedProperty(item, key);

			return matchesFilter(key, value, filters[key], item, options);
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

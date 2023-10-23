import data from '$lib/data/kandidaten.json';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		kandidaten: data,
	};
}
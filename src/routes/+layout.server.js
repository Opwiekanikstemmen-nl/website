import kandidaten from '$lib/data/kandidaten.json';
import partijen from '$lib/data/partijen.json';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		kandidaten: kandidaten,
		partijen: partijen,
	};
}
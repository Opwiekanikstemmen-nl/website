import kandidaten from '$lib/data/kandidaten.json';
import partijen from '$lib/data/partijen.json';
import kieskringen from '$lib/data/gemeente-kieskringen.json';
import provincies from '$lib/data/provincies.json';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		kandidaten: kandidaten,
		partijen: partijen,
		kieskringen: kieskringen,
		provincies: provincies,
	};
}
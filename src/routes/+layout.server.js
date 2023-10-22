import data from '$lib/data/kandidaten.json';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		kandidaten: data,
		gesorteerdeKandidaten: [...data].sort((a, b) => {
			return (a.naam > b.naam) ? -1 : (a.naam > b.naam) ? 1 : 0;
		})
	};
}
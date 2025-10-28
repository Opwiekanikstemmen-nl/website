import { writable } from 'svelte/store';

export const filters = writable({
	'naam': '',
	'geslacht': [],
	'leeftijd': {"onbekend":[]},
	'verkiezingen.tk2025.partij_naam': [],
	'verkiezingen.tk2025.gemeente.stedelijkheid': [],
	'verkiezingen.tk2025.kieskringen': [],
	'verkiezingen.tk2025.woonplaats': [],
	'peilingpositie': [],
	'rainbowvote': [],
	'kleurdekamer': [],
	'vinddebeta': [],
	'nerdvote': [],
	'tweedekamer.member': [],
	'eerstekamer.member': []
});

export const user = writable({
	'stemlocatie': '',
});

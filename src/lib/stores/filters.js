import { writable } from 'svelte/store';

export const filters = writable({
	'naam': '',
	'geslacht': [],
	'verkiezingen.tk2023.partij_naam': [],
	'verkiezingen.tk2023.gemeente.stedelijkheid': [],
	'verkiezingen.tk2023.kieskringen': [],
	'verkiezingen.tk2023.woonplaats': [],
});

export const user = writable({
	'stemlocatie': '',
})
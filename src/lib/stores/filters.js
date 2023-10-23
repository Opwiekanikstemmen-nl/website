import { writable } from 'svelte/store';

export const filters = writable({
	'naam': '',
	'verkiezingen.tk2023.partij_naam': [],
});
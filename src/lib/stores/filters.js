import { writable } from 'svelte/store';

export const filters = writable({
	name: '',
	party: [],
});
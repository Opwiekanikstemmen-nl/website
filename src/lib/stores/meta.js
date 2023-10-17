import { writable } from 'svelte/store';

export const meta = writable({
	kandidaten: 0,
	partijen: 0
});

import { writable } from 'svelte/store';

export const red = writable(0);
export const green = writable(0);
export const blue = writable(0);
export const dragging = writable(false);
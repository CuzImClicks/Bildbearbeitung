
import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

export const red = writable(0);
export const green = writable(0);
export const blue = writable(0);
export const dragging = writable(false);
export const darkenPercentage = writable(0.2);

export const brushSize = writable(1);
export const brushType = writable('circle');

export const outerWidth = writable(0);
export const innerWidth = writable(0);
export const outerHeight = writable(0);
export const innerHeight = writable(0);

export const image: Writable<Array<Array<Array<number>>>> = writable([[[]]]);

import type {Writable} from 'svelte/store';
import {writable} from 'svelte/store';
import {browser} from "$app/environment";

/**
 * Enthält alle globalen Variablen, die von mehreren Komponenten verwendet werden.
 */

/**
 * Globale Variablen, die die Farbe des Pinsels speichern.
 */
export const red = writable(0);
export const green = writable(0);
export const blue = writable(0);

/**
 * Globale Variable, die angibt, ob der Benutzer gerade die Maus gedrückt hält.
 */
export const dragging = writable(false);

/**
 * Einstellung um wie viel Prozent das Bild abgedunkelt werden soll.
 */
export const darkenPercentage = writable(20);

/**
 * Einstellungen für die größe des Pinsels.
 */
export const brushSize = writable(1);
/**
 * Einstellungen für die Art des Pinsels.
 */
export const brushType = writable('circle');

/**
 * Globale Variablen, die die Größe des Bildschirms und Fenster speichern.
 */
export const outerWidth = writable(0);
export const outerHeight = writable(0);
export const innerWidth = writable(0);
export const innerHeight = writable(0);

/**
 * 3D Array: [x][y][r,g,b]
 * Enthält die Farbwerte des Bildes.
 * @type {Writable<Array<Array<Array<number>>>>}
 */
let stored = [[[0,0,0]]];
if (browser) {
    let image = localStorage["image"];
    if (image !== undefined) {
        stored = JSON.parse(image);
    }
}
export const image: Writable<Array<Array<Array<number>>>> = writable(stored);
image.subscribe((value) => {
    if (browser) {
        localStorage["image"] = JSON.stringify(value);
    }
})

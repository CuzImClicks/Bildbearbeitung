import {blue, brushType, green, red} from "./store";
import {get} from "svelte/store";

/**
 * Definiert den Aufbau eines Pinsels
 */
export type Brush = {
    name: string,
    brush: (x: number, y: number, brushSize: number, image: Array<Array<Array<number>>>) => Array<Array<Array<number>>>,
    brushType: string
}

/**
 * Alle verfügbaren Pinsel
 */
export const brushes: Array<Brush> = [
    {
        name: 'Circle',
        brush: circleBrush,
        brushType: 'circle'
    },
    {
        name: 'Square',
        brush: squareBrush,
        brushType: 'square'
    },
    {
        name: 'Fill',
        brush: fill,
        brushType: 'fill'
    },
];

/**
 * Zeichnet einen Kreis von dem Punkt (x|y) mit dem Radius brushSize
 * @param x Die x-Koordinate (Index) des Mittelpunktes
 * @param y Die y-Koordinate (Index) des Mittelpunktes
 * @param brushSize Der Radius des Kreises
 * @param image Das Bild, auf dem gezeichnet werden soll
 */
export function circleBrush(x: number, y: number, brushSize: number, image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    let minX = Math.max(0, x-brushSize);                // 0 oder x-brushSize als obere linke Ecke
    let maxX = Math.min(image[0].length, x+brushSize +1);      // Die Breite des Bildes oder x+brushSize+1 als obere rechte Ecke
    let minY = Math.max(0, y-brushSize);                // 0 oder y-brushSize als untere linke Ecke
    let maxY = Math.min(image.length, y+brushSize+1);          // Die Höhe des Bildes oder y+brushSize+1 als untere rechte Ecke
    for (let i = minY; i<maxY; i++) {
        for (let j = minX; j < maxX; j++) {
            if (Math.sqrt(((i-y)**2)+((j-x)**2)) <= brushSize) { // Berechnet den Abstand zum Mittelpunkt mit dem Satz des Pythagoras
                image[i][j] = [get(red), get(green), get(blue)]; // Setzt die Farbe auf die aktuelle Farbe des Pinsels
            }
        }
    }
    return image;
}

/**
 * Zeichnet ein Quadrat von dem Punkt (x|y) mit der Seitenlänge brushSize
 * @param x Die x-Koordinate (Index) des Mittelpunktes
 * @param y Die y-Koordinate (Index) des Mittelpunktes
 * @param brushSize Der Abstand vom Mittelpunkt zu den Seiten
 * @param image Das Bild, auf dem gezeichnet werden soll
 */
export function squareBrush(x: number, y: number, brushSize: number, image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    let minX = 0;
    let maxX = image[0].length
    let minY = 0;
    let maxY = image.length;
    for (let i = minY; i<maxY; i++) {
        for (let j = minX; j < maxX; j++) {
            if (Math.abs(i-y) <= brushSize && Math.abs(j-x) <= brushSize) {
                image[i][j] = [get(red), get(green), get(blue)];
            }
        }
    }
    return image;
}

/**
 * Füllt den Bereich von allen Pixeln mit der gleichen Farbe um den Punkt (x|y) mit der Farbe des Pinsels
 * @param x
 * @param y
 * @param brushSize
 * @param image
 */
export function fill(x: number, y: number, brushSize: number, image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    let blocks: number[][] = []; // Alle Blöcke die gefüllt werden sollen
    let queue: number[][] = [[x, y]]; // Alle Blöcke die noch überprüft werden müssen
    let checked: number[][] = []; // Alle Blöcke die schon überprüft wurden
    let start = image[y][x]; // Die Farbe des Startpunktes
    while (queue.length > 0 && blocks.length < 10000) { // Solange noch Blöcke überprüft werden müssen und die maximale Anzahl an Blöcken noch nicht erreicht wurde
        let block = queue.shift();
        if (block === undefined
            || block.length !== 2
            || block[0] < 0
            || block[0] >= image[0].length
            || block[1] < 0
            || block[1] >= image.length
            || checked.includes(block)) { // Wenn der Block nicht existiert, ungültig ist oder schon überprüft wurde
            continue;
        }
        let color = image[block[1]][block[0]]; // Die Farbe des aktuellen Blocks

        if (color[0] !== start[0] || color[1] !== start[1] || color[2] !== start[2]
            // @ts-ignore because we know the length is 2
        || blocks.findIndex((it) => it[0] === block[0] && it[1] === block[1]) !== -1) {
            // Wenn die Farbe des Blocks nicht der Startfarbe entspricht oder der Block schon in der Liste ist
            checked.push(block); // Block als überprüft markieren
            continue;
        }
        blocks.push(block); // Block zur Liste hinzufügen
        let additional = [[block[0] + 1, block[1]], [block[0] - 1, block[1]], [block[0], block[1] + 1], [block[0], block[1] - 1]];
        for (let n of additional) { // eigentlich nicht notwendig aber Javascript überprüft, ob dasselbe Objekt schon in der Liste ist und nicht das Gleiche
            if (!queue.includes(n) && !checked.includes(n)) {
                queue.push(n);
            }
        }
    }
    for (let block of blocks) {
        image[block[1]][block[0]] = [get(red), get(green), get(blue)]; // Alle Blöcke mit der Farbe des Pinsels füllen
    }
    return image;
}

/**
 * Zeichnet mit dem Pinsel an der Stelle (x|y) auf das Bild
 */
export function brush(x: number, y: number, brushSize: number, image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    const type = brushes.find((it:Brush) => it.brushType === get(brushType));
    if (type) {
        return type.brush(x, y, brushSize, image);
    }
    throw new Error(`Brush '${get(brushType)}' not found`);
}

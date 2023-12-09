import {blue, brushType, green, red} from "./store";
import {get} from "svelte/store";

type Brush = {
    name: string,
    brush: (x:number, y:number, brushSize:number, image: Array<Array<Array<number>>>) => Array<Array<Array<number>>>,
    brushType: string
}

export const brushes = [
    {
        name: 'Circle',
        brush: circleBrush,
        brushType: 'circle'
    },
    {
        name: 'Square',
        brush: squareBrush,
        brushType: 'square'
    }
];

export function circleBrush(x:number, y:number, brushSize:number, image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    let minX = 0;
    let maxX = image[0].length
    let minY = 0;
    let maxY = image.length;
    for (let i = minY; i<maxY; i++) {
        for (let j = minX; j < maxX; j++) {
            if (Math.sqrt(((i-y)**2)+((j-x)**2)) <= brushSize) {
                image[i][j] = [get(red), get(green), get(blue)];
            }
        }
    }
    return image;
}

export function squareBrush(x:number, y:number, brushSize:number, image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
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

export function brush(x:number, y:number, brushSize:number, image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    const type = brushes.find((it:Brush) => it.brushType === get(brushType));
    if (type) {
        return type.brush(x, y, brushSize, image);
    }
    throw new Error(`Brush '${get(brushType)}' not found`);
}

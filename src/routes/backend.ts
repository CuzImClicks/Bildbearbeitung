import { get } from "svelte/store"
import { blue, green, red } from "./store"

export function mirrorVertically(image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    for (let i = 0; i < image.length / 2; i++) {
        const temp = image[i]
        image[i] = image[image.length - 1 - i]
        image[image.length - 1 - i] = temp
    }
    return image
}

export function mirrorHorizontally(image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    for (let i = 0; i < image[0].length / 2; i++) {
        for (let j = 0; j < image.length; j++) {
            const temp = image[j][i]
            image[j][i] = image[j][image[0].length - 1 - i]
            image[j][image[0].length - 1 - i] = temp
        }
    }
    return image
}

export function mirrorDiagonally(image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    const newImage: Array<Array<Array<number>>> = []
    for (let i = 0; i < image[0].length; i++) {
        newImage.push([])
        for (let j = 0; j < image.length; j++) {
            newImage[i].push(image[j][i])
        }
    }
    return newImage
}

export function rotate(image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    const newImage: Array<Array<Array<number>>> = []
    for (let i = 0; i < image[0].length; i++) {
        newImage.push([])
        for (let j = 0; j < image.length; j++) {
            newImage[i][j] = image[image.length - (j + 1)][i]
        }
    }
    return newImage
}

export function blackAndWhite(image:Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[0].length; j++) {
            let prev = 0;
            let value = image[i][j].reduce((prev, cur) => prev += cur, prev) / image[i][j].length;
            image[i][j] = [value, value, value];
        }
    }
    return image;
}

export function invertColors(image:Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[0].length; j++) {
            image[i][j] = image[i][j].flatMap((it) => 255 - it);
        }
    }
    return image;
}

export function brush(x:number, y:number, brushSize:number, image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    let minX = 0;//Math.max(x-brushSize, 0);
    let maxX = image[0].length//Math.min(x+brushSize, image[0].length);
    let minY = 0;//Math.max(y-brushSize, 0);
    let maxY = image.length;//Math.min(x+brushSize, image.length);
    for (let i = minY; i<maxY; i++) {
        for (let j = minX; j < maxX; j++) {
            if (Math.sqrt(((i-y)**2)+((j-x)**2)) <= brushSize) {
                image[i][j] = [get(red), get(green), get(blue)];
            }
        }
    }
    return image;
}
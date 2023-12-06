
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

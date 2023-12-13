/**
 * Spiegelt das Bild an einer horizontalen Achse
 * @param image Das Bild, welches gespiegelt werden soll
 */
export function mirrorVertically(image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    for (let i = 0; i < image.length / 2; i++) { // Wie im Unterricht besprochen nur in Typescript
        const temp = image[i]
        image[i] = image[image.length - 1 - i]
        image[image.length - 1 - i] = temp
    }
    return image
}

/**
 * Spiegelt das Bild an einer vertikalen Achse
 * @param image Das Bild, welches gespiegelt werden soll
 */
export function mirrorHorizontally(image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    for (let i = 0; i < image[0].length / 2; i++) { // Aufbau wie im Unterricht besprochen
        for (let j = 0; j < image.length; j++) {
            const temp = image[j][i]
            image[j][i] = image[j][image[0].length - 1 - i]
            image[j][image[0].length - 1 - i] = temp
        }
    }
    return image
}

/**
 * Spiegelt das Bild an einer Diagonalen Achse (von links oben nach rechts unten)
 * @param image Das Bild, welches gespiegelt werden soll
 */
export function mirrorDiagonally(image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    const newImage: Array<Array<Array<number>>> = []
    for (let i = 0; i < image[0].length; i++) {
        newImage.push([])
        for (let j = 0; j < image.length; j++) {
            newImage[i].push(image[j][i]) // fügt den Wert von z.B. links unten an das Ende der ersten Zeile an
        }
    }
    return newImage
}

/**
 * Rotiert das Bild um 90° nach im Uhrzeigersinn
 * @param image Das Bild, welches rotiert werden soll
 */
export function rotate(image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    const newImage: Array<Array<Array<number>>> = []
    for (let i = 0; i < image[0].length; i++) {
        newImage.push([])
        for (let j = 0; j < image.length; j++) {
            newImage[i][j] = image[image.length - (j + 1)][i] // fügt den Wert von z.B. links unten an den Anfang der ersten Zeile an
        }
    }
    return newImage
}

/**
 * Macht das Bild schwarz-weiß
 * @param image Das Bild, welches schwarz-weiß gemacht werden soll
 */
export function blackAndWhite(image:Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[0].length; j++) {
            let prev = 0;
            let value = image[i][j].reduce((prev, cur) => prev += cur, prev) / image[i][j].length; // Durchschnitt der Farbwerte
            image[i][j] = [value, value, value]; // Setzt alle Farbwerte auf den Durchschnitt
        }
    }
    return image;
}

/**
 * Verändert die Helligkeit des Bildes
 * @param percentage Der Prozentsatz, um den die Helligkeit verändert werden soll
 * @param image Das Bild, welches verändert werden soll
 */
export function darken(percentage: number, image:Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[0].length; j++) {
            image[i][j] = image[i][j].map((it) => it * (1 - percentage / 100)); // Multipliziert jeden Farbwert mit dem Prozentsatz
        }
    }
    return image;
}

/**
 * Invertiert die Farben des Bildes
 * @param image Das Bild, welches invertiert werden soll
 */
export function invertColors(image: Array<Array<Array<number>>>): Array<Array<Array<number>>> {
    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[0].length; j++) {
            image[i][j] = image[i][j].map((it) => 255 - it); // Berechnet den Farbwert als Differenz zu 255
        }
    }
    return image;
}

/**
 * Prüft, ob das Bild rechteckig ist
 * @param image Das Bild, welches geprüft werden soll
 */
export function isValidImage(image: Array<Array<Array<number>>>): boolean {
    let len = image[0].length;
    let prev = true;
    return image.flatMap((it) => it.length == len).reduce((prev, cur) => prev && cur, prev); // Prüft, ob alle Zeilen die gleiche Länge haben
}

/**
 * Konvertiert einen String von einem dreidimensionalen Array in ein Dreidimensionales Array
 * @param text
 */
export function stringToArray(text: string) {
    return text.trim().replace("\r", "").split("\n").map((row) => // Teilt den String in Zeilen auf
            row.trim().replace(/;$/, "").split(";").map((pixel) => // Teilt den string an jedem Semikolon auf
            pixel.trim().split(" ").map((color) => parseInt(color, 10)) // Teilt den String an jedem Leerzeichen auf und konvertiert die Farbwerte in Zahlen
        )
    );
}

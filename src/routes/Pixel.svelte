<script lang="ts">

    import {blue, brushSize, dragging, green, image, red} from "./store";
    import {brush} from "./brushes";

    export let y: number; // y Position (Index) des Pixels
    export let x: number; // x Position (Index) des Pixels
    export let r: number; // Rot
    export let g: number; // Grün
    export let b: number; // Blau
    export let size: number; // Größe des Pixels
</script>

<div class="caret-transparent p-0 m-0 cursor-crosshair" style="height: {size}px; width: {size}px; background-color: rgb({r}, {g}, {b});"
        on:mousedown={(event) => {
            event.preventDefault(); // Verhindert, dass der Browser das Element verschiebt

            $image = brush(x, y,$brushSize, $image); // Wenn die linke Maustaste gedrückt wird, wird der Pixel mit der aktuellen Farbe bemalt
            $dragging = true; // Die globale Variable dragging wird auf true gesetzt
        }}
        on:mouseup={() => {
            $dragging = false; // Wenn die linke Maustaste losgelassen wird, wird die globale Variable dragging auf false gesetzt
        }}
        on:mouseenter={() => {
            if($dragging) { // Wenn die linke Maustaste gedrückt wird und die Maus sich über das Element bewegt
                $image = brush(x, y,$brushSize, $image); // wird der Pixel mit der aktuellen Farbe bemalt.
            }
        }}
     role="none">
</div>

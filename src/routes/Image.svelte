<!--
Erstellt aus der Liste von Farben eine Liste von Quadraten, die auf dem Bildschirm angezeigt werden können.
Die Sammlung an Pixeln ist in einer Scrollable Komponente eingebettet, die es ermöglicht, das Bild zu verschieben und zu zoomen.
-->
<script lang="ts">
    import Pixel from "./Pixel.svelte";
    import {image, innerHeight, innerWidth} from "./store";
    import Scrollable from "./Scrollable.svelte";

    let sc = 10; // Die Größe der Pixel

    /**
     * Passt die Größe der Pixel an, wenn die Maus gescrollt wird.
     * @param event
     */
    function zoom(event: WheelEvent) {
        if (!event.ctrlKey) return; // Nur wenn die Strg-Taste gedrückt ist
        event.preventDefault(); // Verhindert das Scrollen/Zoomen der Seite

        sc = Math.min(Math.max(8, sc + (event.deltaY / 50) * -2), 50);
        // Teilt die Scroll-Distanz durch 50 und multipliziert sie mit -2, um die Pixelgröße zu verändern.
        // Begrenzt die Pixelgröße auf 10 bis 50.
    }
</script>

<Scrollable top={$innerHeight / 2} left={$innerWidth / 2} translateX={true} translateY={true}
            horizontalScrolling={true} padding={sc}>
    <div class="flex justify-center items-center flex-col bg-gray-100 h-full w-full divide-y divide-gray-400 divide-opacity-50"
         on:wheel={zoom}>
        {#each $image as row, y}
            <div class="flex divide-x divide-gray-400 divide-opacity-50">
                {#each row as pixel, x}
                    <Pixel bind:r={pixel[0]}
                           bind:g={pixel[1]}
                           bind:b={pixel[2]}
                           bind:size={sc}
                           x={x}
                           y={y}
                    />
                {/each}
            </div>
        {/each}
    </div>
</Scrollable>

<script lang="ts">

    import {blue, brushSize, dragging, green, image, red} from "./store";
    import {brush} from "./brushes";

    export let y: number;
    export let x: number;
    export let r: number;
    export let g: number;
    export let b: number;
    export let size: number;
</script>

<div class="caret-transparent p-0 m-0 cursor-crosshair" style="height: {size}px; width: {size}px; background-color: rgb({r}, {g}, {b});"
        on:click="{() => {r=$red; g=$green; b=$blue}}"
        on:mousedown={(event) => {
            $image = brush(x, y,$brushSize, $image);

            $dragging = true;
            event.preventDefault();
        }}
        on:mouseup={() => {
            $dragging = false;
        }}
        on:mouseenter={() => {
            if($dragging) {
                $image = brush(x, y,$brushSize, $image);
            }
        }}
     role="none">
</div>

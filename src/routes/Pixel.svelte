<script lang="ts">

    import {blue, brushSize, dragging, green, red} from "./store";
    import { brush } from "./backend";
    
    export let y: number;
    export let x: number;
    export let r: number;
    export let g: number;
    export let b: number;
    export let size: number;
    export let image: Array<Array<Array<number>>>;
</script>

<div class="border-none caret-transparent p-0 m-0 cursor-crosshair" style="height: {size}px; width: {size}px; background-color: rgb({r}, {g}, {b});"
        on:click="{() => {r=$red; g=$green; b=$blue}}"
        on:mousedown={(event) => {
            image = brush(x, y,$brushSize, image);
            
            r=$red; g=$green; b=$blue
            $dragging = true;
            event.preventDefault();
        }}
        on:mouseup={() => {
            $dragging = false;
        }}
        on:mouseenter={() => {
            if($dragging) {
                r=$red; g=$green; b=$blue;
            }
        }}
     role="control">
</div>

<script lang="ts">

    import {blue, dragging, green, red} from "./store";

    export let r: number;
    export let g: number;
    export let b: number;
    export let size: number;
</script>

<div class="border-none caret-transparent p-0 m-0 cursor-crosshair" style="height: {size}px; width: {size}px; background-color: rgb({r}, {g}, {b});"
        on:click="{() => {r=$red; g=$green; b=$blue}}"
        on:mousedown={(event) => {
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

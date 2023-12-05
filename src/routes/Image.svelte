<script lang="ts">
    import Pixel from "./Pixel.svelte";
    import {scale} from "svelte/transition";

    export let image: Array<Array<Array<number>>>;
    export let size: number;
    let sc = 10;

    function zoom(event: WheelEvent) {
        if (!event.ctrlKey) return;
        event.preventDefault();

        sc += event.deltaY * -0.1;
        sc = Math.min(Math.max(10, sc), 100);
    }
</script>

<div class="flex justify-center items-center flex-col bg-gray-100 h-full w-full" on:wheel={zoom}>
    {#each image as row}
        <div class="flex">
            {#each row as pixel}
                <Pixel
                    bind:r={pixel[0]}
                    bind:g={pixel[1]}
                    bind:b={pixel[2]}
                    bind:size={sc}
                />
            {/each}
        </div>
    {/each}
</div>

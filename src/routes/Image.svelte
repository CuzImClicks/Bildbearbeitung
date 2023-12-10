<script lang="ts">
    import Pixel from "./Pixel.svelte";
    import {image, innerHeight, innerWidth} from "./store";
    import Scrollable from "./Scrollable.svelte";

    let sc = 10;

    function zoom(event: WheelEvent) {
        if (!event.ctrlKey) return;
        event.preventDefault();

        sc = Math.max(10, sc + (event.deltaY / 50) * -2);
        console.log(event.deltaY, sc);
        sc = Math.min(sc, 50);
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

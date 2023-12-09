<script lang="ts">
    import Pixel from "./Pixel.svelte";

    export let image: Array<Array<Array<number>>>;
    let sc = 10;

    function zoom(event: WheelEvent) {
        if (!event.ctrlKey) return;
        event.preventDefault();

        sc += event.deltaY * -0.1;
        sc = Math.min(Math.max(10, sc), 100);
    }
</script>

<div class="flex justify-center items-center flex-col bg-gray-100 h-full w-full" on:wheel={zoom}>
    {#each image as row, y}
        <div class="flex">
            {#each row as pixel, x}
                <Pixel
                    bind:r={pixel[0]}
                    bind:g={pixel[1]}
                    bind:b={pixel[2]}
                    bind:size={sc}
                    x={x}
                    y={y}
                    bind:image={image}
                />
                <script lang="ts">
                    y+=1;
                </script>
            {/each}
        </div>
        <script lang="ts">
            x+=1;
            y=0;
        </script>
    {/each}
    <script lang="ts">
        x=0;
        y=0;
    </script>
</div>

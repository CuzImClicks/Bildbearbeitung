<script lang="ts">
    import { split } from "postcss/lib/list";
import Pixel from "./Pixel.svelte";

    export let image: Array<Array<string>>;
</script>

<div class="flex bg-gray-100 h-full w-full">
    {#each image as row}
        {#each row as pixel}
            <Pixel 
                r={parseInt(pixel.split(" ")[0])} 
                g={parseInt(pixel.split(" ")[0])} 
                b={parseInt(pixel.split(" ")[0])}
                size={1}
            />
        {/each}
    {/each}
</div>

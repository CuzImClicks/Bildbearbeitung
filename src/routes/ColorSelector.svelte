<script lang="ts">
    import ColorSelectorPixel from "./ColorSelectorPixel.svelte";
    import {blue, green, red, outerHeight} from "./store";
    import Draggable from "./Draggable.svelte";

    let colors = [
        [0,0,0],
        [255,255,255],
        [255,0,0],
        [255,127,0],
        [255,255,0],
        [127,255,0],
        [0,255,0],
        [0,255,127],
        [0,255,255],
        [0,127,255],
        [0,0,255],
        [127,0,255],
        [255,0,255],
        [255,0,127],
    ];

    let customVisible = false;
</script>

{#if $outerHeight > 0}
        <Draggable left={0} top={($outerHeight / 2)}>
            <div class="">
                {#each colors as color}
                    <ColorSelectorPixel bind:r={color[0]} bind:g={color[1]} bind:b={color[2]} size={15}/>
                {/each}
                <div class="flex">
                    <div class="w-[15px] h-[15px] border-[2px] border-black flex items-center justify-center"
                         on:click={() => customVisible = !customVisible} role="none">
                        <i class="fa-solid fa-plus scale-[70%] color"></i>
                    </div>
                </div>
                {#if customVisible}
                    <div class="w-max rounded h-max bg-gray-600 bg-opacity-90 flex items-center justify-center p-4 flex-col">
                        <input class="mb-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded p-1"
                               bind:value={$red}>
                        <input class="mb-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded p-1"
                               bind:value={$green}>
                        <input class="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded p-1"
                               bind:value={$blue}>
                    </div>
                {/if}
            </div>
        </Draggable>
{/if}

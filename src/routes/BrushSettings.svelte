<script lang="ts">

    import Draggable from "./Draggable.svelte";
    import {brushSize, brushType, innerHeight} from "./store";
    import {brushes} from "./brushes";
</script>

<Draggable top={$innerHeight * 0.6}>
    <div class="flex flex-col w-max h-max justify-center bg-gray-300 rounded p-4 divide-y-4 divide-transparent bg-opacity-70">
        <div class="w-full">
            Brush Settings
        </div>
        <div class="flex items-center w-max justify-between">
            <span class="">Size</span>
            <input class="border border-transparent focus:outline-none focus:ring-2 focus:border-transparent rounded p-1 text-right w-1/2 "
                bind:value={$brushSize}
            >

        </div>
        <div class="flex items-center w-full justify-between">
            <span class="">Brush Type</span>
            <select bind:value={$brushType}>
                {#each brushes as brush}
                    <option value={brush.brushType}>
                        {brush.name}
                    </option>
                {/each}
            </select>
        </div>
    </div>
</Draggable>

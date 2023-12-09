<script lang="ts">
    import {blue, green, image, red} from "./store";

    export let visible = false;

    let height = 16;
    let width = 16;
</script>

<div class="flex items-center bg-gray-600 rounded p-8 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 backdrop-blur z-50">
    <div>
        <div class="flex justify-between p-2">
            <span class="mr-4">Height:</span>
            <input class="border border-transparent focus:outline-none focus:ring-2 focus:border-transparent rounded p-1 text-right"
                   style="--tw-ring-color: rgb({$red}, {$green}, {$blue});"
                   bind:value={height}>
        </div>
        <div class="flex justify-between p-2">
            <span class="mr-4">Width:</span>
            <input class="border border-transparent focus:outline-none focus:ring-2 focus:border-transparent rounded p-1 text-right"
                   style="--tw-ring-color: rgb({$red}, {$green}, {$blue});"
                   bind:value={width}>
        </div>
        <div class="flex justify-evenly pt-4">
            <div class="p-2 flex justify-center cursor-pointer bg-gray-400 hover:bg-gray-200 rounded-md" on:click={() => {
                $image = Array.from({length: height}, () => Array.from({length: width}, () => [255, 255, 255]));
                visible = false;
                }} role="none">
                Confirm
            </div>
            <div class="p-2 flex justify-center cursor-pointer bg-gray-400 hover:bg-gray-200 rounded-md" on:click={() => {
                visible = false;
            }} role="none">
                Close
            </div>
        </div>
    </div>
</div>

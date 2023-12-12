<script lang="ts">
    import Image from "./Image.svelte";
    import { isValidImage, stringToArray } from "./backend";
    import { image } from "./store";

    export let visible = false;

    let files: FileList;
    $: if (files) {
        files[0].text().then((v) => {
            let img = stringToArray(v);
            if (!isValidImage(img)) {
                return;
            }
            $image = img;
            visible = false;
        });
    }
</script>

<div class="flex items-center bg-gray-300 rounded p-8 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 backdrop-blur z-50">
    <div>
        <div class="">
            <input type="file" bind:files>
        </div>
    </div>
</div>
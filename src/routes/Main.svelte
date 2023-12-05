
<script lang="ts">
    import Image from "./Image.svelte";

    let image = [["0 0 0", "255 255 255"]]
</script>

<div class="h-screen flex justify-center p-32 bg-gray-200">
    <div class="h-full w-1/3 p-4 text-7xl">
        Henrik, Kai
    </div>
    <div class="w-full">
        {#if image != null && image != undefined}
            <Image image={image} />
        {/if}
    </div>    
</div>

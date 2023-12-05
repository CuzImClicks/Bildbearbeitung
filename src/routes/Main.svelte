
<script lang="ts">
    import Image from "./Image.svelte";
    import Navbar from "./Navbar.svelte";

    let image: Array<Array<Array<number>>> = [[[]]]
        //[
        //[[0, 0, 0], [148, 0, 211], [75, 0, 130], [0, 0, 255], [0, 255, 0], [255, 255, 0], [255, 127, 0], [255, 0, 0], [255, 255, 255]],
        //[[255, 255, 255], [0, 0, 255], [255, 0, 0], [255, 127, 0], [255, 255, 0], [0, 255, 0], [0, 0, 255], [148, 0, 211], [0, 0, 0]],
        //]
    // 255 255 255; 0 0 0; 0 0 255;
    // 255 255 255; 0 0 0; 0 0 255;
    let size = 1;

</script>


<div class="h-screen w-full overflow-hidden">
    <Navbar bind:image={image}/>
    <div class="w-full h-full overflow-visible">
        {#if image != null && image !== undefined}
            <Image bind:image={image} bind:size={size}/>
        {/if}
    </div>
</div>

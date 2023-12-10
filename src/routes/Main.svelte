
<script lang="ts">
    import ColorSelector from "./ColorSelector.svelte";
    import Image from "./Image.svelte";
    import Navbar from "./Navbar.svelte";
    import {dragging, outerHeight, outerWidth, innerHeight, innerWidth, image} from "./store";
    import BrushSettings from "./BrushSettings.svelte";

        //[
        //[[0, 0, 0], [148, 0, 211], [75, 0, 130], [0, 0, 255], [0, 255, 0], [255, 255, 0], [255, 127, 0], [255, 0, 0], [255, 255, 255]],
        //[[255, 255, 255], [0, 0, 255], [255, 0, 0], [255, 127, 0], [255, 255, 0], [0, 255, 0], [0, 0, 255], [148, 0, 211], [0, 0, 0]],
        //]
    // 255 255 255; 0 0 0; 0 0 255;
    // 255 255 255; 0 0 0; 0 0 255;

    $: $outerWidth = 0
    $: $innerWidth = 0
    $: $outerHeight = 0
    $: $innerHeight = 0
</script>

<svelte:window bind:innerWidth={$innerWidth} bind:outerWidth={$outerWidth} bind:innerHeight={$innerHeight} bind:outerHeight={$outerHeight} />



<div class="z-50 absolute">
    <ColorSelector />
</div>
<div class="z-50 absolute">
    <BrushSettings />
</div>
<div class="h-screen w-full overflow-hidden" on:mouseup={() => $dragging = false} role="none">
<!--    <div class="w-full h-full overflow-visible">-->
    <div class="z-50">
        <Navbar/>
    </div>
    {#if $image != null && $image !== undefined}
        <Image/>
    {/if}
    <!--</div>-->
</div>
